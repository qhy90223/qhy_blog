const env=process.env.NODE_ENV||'dev';
let MYSQL_CONF={};
let REDIS_CONF={};


if(env==='dev'){
  MYSQL_CONF={
    host:'localhost',
    user:'root',
    password:'123456',
    database:'qhy_blog',
    timezone:"08:00"
  }
  REDIS_CONF={
    host:'127.0.0.1',
    port: 6379
  }
}else if(env==="production"){
  MYSQL_CONF={
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456',
    databases:'qhy_blog',
    timezone:"08:00"
  }
  REDIS_CONF={
    host:'127.0.0.1',
    port: 6379
  }
}
module.exports={
  REDIS_CONF,
  MYSQL_CONF
}