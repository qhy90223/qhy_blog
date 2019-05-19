const redis = require('redis');
const {REDIS_CONF} = require('../config/db');
const redisClient = redis.createClient(REDIS_CONF);
redisClient.on('error',(err)=>{
  console.log(err); 
})
module.exports=redisClient