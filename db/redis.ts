import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    password: process.env.REDIS_PASSWORD
});
export default redis;
    