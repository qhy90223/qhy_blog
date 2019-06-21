const redis = require('redis');
const {REDIS_CONF} = require('../config/db');
const redisClient = redis.createClient(REDIS_CONF);
redisClient.on('error',(err)=>{
  console.log(err); 
})
const redisGet = (name) => {
  const promise = new Promise((resolve,reject) => {
    redisClient.get(name,(err,data) => {
      if(err){
        return reject(err)
      }
      return resolve(JSON.parse(data))
    })
  })
  return promise
}
const redisSet = async (name,value) =>{
    const res = await redisClient.set(name,JSON.stringify(value))
    if(res){
      return Promise.resolve(true)
    }else{
      return Promise.resolve(false)
    }
}
module.exports={redisClient,redisGet,redisSet}