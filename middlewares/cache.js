const redis = require('async-redis');

const checkCache = async (ctx, next) => {
  try {   
    const { id } = ctx.params;
    const { redis } = ctx;
    const value = await redis.get(id);
    if (!value) {
      return await next();
    } else {
      console.log('Getting value from redis');
      ctx.body = value;
    }
  } catch (error) {
    throw new Error('Error when getting values from redis');
  }
}

const addCache = async (ctx, next) => {
  try {
    const REDIS_PORT = process.env.REDIS || 6379;
    const client = redis.createClient(REDIS_PORT);
    ctx.redis = client;
    return await next();
  } catch (error) {
    throw new Error('Couldnt connect to redis')
  }
}

module.exports = {
  checkCache,
  addCache
};
