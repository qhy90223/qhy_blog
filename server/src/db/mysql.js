const mysql = require('mysql');
const {MYSQL_CONF} = require('../config/db') 
const con = mysql.createConnection(MYSQL_CONF)


con.connect()

//统一执行函数

const exec = (sql) => {

 
  
  const promise =new Promise((resolve,reject) => {
    con.query(sql,(err,result,field) => {
      if(err){
        // console.log(err,'err');
        
        return reject(err)
      }
      // console.log(rows);
      
      return resolve(result)
    })
  })
  return promise
}

module.exports={
  exec,
  escape: mysql.escape
}