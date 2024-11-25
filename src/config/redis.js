const { Redis } = require("@upstash/redis");
const dotenv = require("dotenv");
const figlet = require("figlet");

dotenv.config();

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

// Test the Redis connection
(async () => {
  try {
    await redis.set("connection_test", "success", { ex: 10 }); // Test write operation
    const result = await redis.get("connection_test"); // Test read operation
    if (result === "success") {
      figlet("Redis Connected!", (err, data) => {
        if (err) {
          console.log("Error with Figlet:", err);
        } else {
          console.log(data); // Display ASCII art
        }
      });
    } else {
      console.error("Redis connection test failed.");
    }
  } catch (error) {
    figlet("Redis Error!", (err, data) => {
      if (err) {
        console.log("Error with Figlet:", err);
      } else {
        console.log(data); // Display ASCII art for the error
      }
    });
    console.error("Error connecting to Redis:", error);
  }
})();

module.exports = redis;
