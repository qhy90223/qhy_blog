const {exec,escape} = require('../db/mysql')
// const {redisClient,redisGet,redisSet} = require('../db/redis')
const {genPassword} = require('../utils/cryp')
class GithubController {
    async create(postBody){
        let {
          userName,realName,password,eMail,
          created_at,avatar_url,phone,website,desc,github_id}=postBody
          password=password!==undefined?genPassword(password):genPassword(1)
          const sql =`INSERT INTO users (
            github_id,
            username,
            realname,
            password,
            e_mail,
            register_time,
            avatar_url,
            phone,
            website,
            description,
            authority,
            state
            ) VALUES
          (
            ${escape(github_id)},
            ${escape(userName)},
            ${escape(realName)},
            ${escape(password)},
            ${escape(eMail)},
            ${escape(created_at)},
            ${escape(avatar_url)},
            ${escape(phone)},
            ${escape(website)},
            ${escape(desc)},
            '0','1');
            SELECT  * FROM users WHERE github_id ='${postBody.github_id}'`
            return exec(sql).then(res => {
               
                
                if(res[0].affectedRows){
                    return res[1][0]
                }else{
                    return false
                }
            })
      }
    async update(postBody){
        let {
          userName,realName,eMail,
          created_at,avatar_url,
          phone,website,desc,password,github_id
        }=postBody
        password=password!==undefined?`password=${escape(genPassword(password))},`:""
          const sql =`UPDATE users SET
            github_id=${escape(github_id)},
            username=${escape(userName)},
            ${password}
            realname=${escape(realName)},
            e_mail=${escape(eMail)},
            register_time=${escape(created_at)},
            avatar_url=${escape(avatar_url)},
            phone=${escape(phone)},
            website=${escape(website)},
            description=${escape(desc)}
            WHERE github_id='${github_id}';
            SELECT id,username,realname,authority From users WHERE github_id='${github_id}';`
            
            
          return exec(sql).then(res => {
            if(res[0].affectedRows){
              return res[1][0]
            }else{
              return false
            }
          })
      }
    async findUserInMysql(github_id){
        const sql=`SELECT * FROM users WHERE github_id ='${github_id}';`;
        return exec(sql).then(data =>{
            if(data.length){
                return data[0]
            }else{
                return {}
            }
        })
    }
    async findGitHubUser(id){
        const sql=`SELECT * FROM users WHERE id ='${id}';`;
        return exec(sql).then(res => {
            return res[0]
        })
    }
}
module.exports = new GithubController()