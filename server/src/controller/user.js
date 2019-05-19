const userService = require('../service/user');
const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

// const { genPassword } = require('../utils/cryp')
class UserController {
  async getUserList(){
    const sql = `SELECT 
    a.id AS userId,
		a.username AS userName,
		a.realname AS realName,
    a.e_mail AS eMail,
		a.authority,
		a.state,
		b.articleNums AS articleNums,
		c.commentNums AS commentNums,
		a.register_time AS registerTime, 
		a.lastlogin_time AS LastLoginTime
    FROM users AS a 
		LEFT JOIN (select count(author_id) articleNums,author_id from blogs GROUP BY author_id) b
		on b.author_id = a.id
		LEFT JOIN (SELECT count(content) commentNums,user_id from comments  GROUP BY user_id) c
		on c.user_id = a.id
		` 
    return exec(sql)
  }
  async createUser(postBody){
    let {userName,realName,password,eMail,authority,state}=postBody
    password=genPassword(password)
    const sql =`INSERT INTO users (username,realname,password,e_mail,register_time,authority,state) VALUES
    (${escape(userName)},${escape(realName)},${escape(password)},${escape(eMail)},NOW(),${escape(authority)},${escape(state)})`
    console.log(sql,'sql');
    return exec(sql).then(rows => {
      if(rows.affectedRows){
        return true
      }else{
        return false
      }
    })
  }
  async updateUser(postBody){
    let {userId,userName,realName,password,eMail,authority,state}=postBody
    password=genPassword(password)
    const sql=`UPDATE users SET 
    username=${escape(userName)},
    realname=${escape(realName)},
    password=${escape(password)},
    e_mail=${escape(eMail)},
    authority=${escape(authority)},
    state=${escape(state)} 
    WHERE id=${escape(userId)}`
    return exec(sql).then(rows => {
      if(rows.affectedRows){
        return true
      }else{
        return false
      }
    })
  }
  async deleteUser(postBody){
    let {ids}=postBody
   
    let sql_ids=''
    ids.forEach((e,i,c) => {
      if(i==c.length-1){
        sql_ids+=e
      }else{
        sql_ids+=e+','
      }
    });
    const sql=`delete from users where id in (${sql_ids})`
    return exec(sql).then(rows => {
      if(rows.affectedRows){
        return true
      }else{
        return false
      }
    })
  }
  async rePasswd(ctx){
    const userId=ctx.session.userId
    let {password}=ctx.request.body
    
    
    const sql = `UPDATE users SET password = ${escape(password)} WHERE id='${userId}'`
    return exec(sql).then(data=>{
      if(data.affectedRows){
        return true
      }else{
        return false
      }
    })
  }
  async profile(ctx) {
    const res = await userService.profile();
    ctx.body = res.data;
  }
  async login(username,password) {
    
    username = escape(username)
    password = genPassword(password)
    password = escape(password)
    const sql = `select username, password,realname ,id,authority from users where username=${username} and password=${password}`
    const rows = await exec(sql)
    if(rows[0]){
      const sql1=`UPDATE users SET lastlogin_time=NOW() WHERE id='${rows[0].id}'`
      const res = await exec(sql1)
      return rows[0]
    }else{
      return  {}
    }
  }

  async register(ctx) {
    ctx.body = {
      status: 200,
      statusText: 'ok',
      currentAuthority: 'user',
    };
  }

  async logout(ctx) {
    ctx.body = {
      status: 200,
      statusText: 'ok',
      currentAuthority: 'guest',
    };
  }
}

module.exports = new UserController();
