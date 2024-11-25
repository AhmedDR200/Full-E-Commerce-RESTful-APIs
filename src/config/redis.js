// redisClient.js
const { Redis } = require('@upstash/redis');

if (!process.env.UPSTASH_REDIS_URL || !process.env.UPSTASH_REDIS_TOKEN) {
  throw new Error("Upstash Redis URL and Token must be set in environment variables.");
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

module.exports = redis;
