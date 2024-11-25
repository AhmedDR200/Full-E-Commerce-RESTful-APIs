const redis = require("../config/redis");

exports.cacheMiddleware = (key, ttl = 3600) => async (req, res, next) => {
  try {
    // Generate a unique cache key based on the provided key and query params
    const cacheKey = `${key}:${JSON.stringify(req.query)}`;

    // Attempt to retrieve cached data
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      // Ensure the cached data is a valid JSON string before parsing it
      try {
        // Check if it's a string before parsing it
        if (typeof cachedData === 'string') {
          const parsedData = JSON.parse(cachedData);
          console.log("Cache hit");
          return res.status(200).json(parsedData);
        } else {
          console.error("Cached data is not a valid JSON string");
        }
      } catch (parseError) {
        console.error("Error parsing cached data:", parseError);
        // Proceed to fetch fresh data if cached data is corrupted
      }
    }

    console.log("Cache miss");

    // Save the original `res.json` method
    const originalJson = res.json.bind(res);

    // Override `res.json` to cache the response
    res.json = async (body) => {
      try {
        // Ensure only JSON-compatible data is cached
        const stringifiedBody = JSON.stringify(body);

        // Cache the response with a configurable TTL
        await redis.set(cacheKey, stringifiedBody, { ex: ttl });
      } catch (err) {
        console.error("Error caching response:", err);
      }

      // Send the response as usual
      return originalJson(body);
    };

    // Proceed to the next middleware
    next();
  } catch (err) {
    console.error("Redis error:", err);

    // Ensure the middleware doesn't break the request chain
    next();
  }
};
