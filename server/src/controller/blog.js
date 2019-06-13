const {exec,escape} = require('../db/mysql');
const xss = require('xss')
class blogController{
  async getBlogList(query){
    let {blogState,currentPage,pageSize}=query;
    pageSize=pageSize?pageSize:5;
    currentPage=currentPage?(currentPage):1;
    const sql=`SELECT 
    a.id ,a.title,a.content,a.create_time,a.last_update_time,a.state,a.desc,
    b.id AS cate_id,b.cate_name,
    c.id AS tag_id,c.tag_name,
    d.id AS author_id,d.realname AS author 
    FROM blogs AS a 
    LEFT JOIN cates AS b ON a.cate_id = b.id
    LEFT JOIN tags AS c ON a.tag_id=c.id
    LEFT JOIN users AS d on a.author_id=d.id
    ${!blogState||blogState=='0'?'':`WHERE  a.state=${blogState}`}
    ORDER BY a.create_time DESC
    LIMIT ${(currentPage-1)*pageSize},${pageSize};
    SELECT count(id) AS totalCount from blogs ${!blogState||blogState=='0'?'':`WHERE  state=${blogState}`};

    `
    console.log(sql,'sql')
   return  exec(sql).then(res => {
      return {
        entityData:res[0],
        totalCount:res[1][0].totalCount,
        currentPage:currentPage?Number(currentPage):1,
        pageSize:pageSize?Number(pageSize):5,
        totalPage:Math.ceil(res[1][0].totalCount/pageSize)
      }
    })
  }
  async getDetailBlog(id){
    const sql =`SELECT * from blogs Where id='${id}'`
    return exec(sql)
  }
  async updateBlog(info){
    let {id,title,content,cate_id,tag_id,state}=info
    content=xss(content)
    content=escape(content)
    const sql=`UPDATE blogs SET 
    title='${title}',
    content=${content},
    state=${state},
    last_update_time=NOW()
    WHERE id='${id}'`
    
    
    return exec(sql).then(rows => {
      if(rows.affectedRows){
        return true
      }else{
        return false
      }
    })
  }
  async createBlog(postBody){
    let  {title,content,tag_id,cate_id,author_id}=postBody;
    content=xss(content)
    content=escape(content)
    
    const sql=`INSERT INTO blogs (title,content,cate_id,tag_id,author_id,state,create_time,last_update_time) 
    VALUES('${title}',${content},'${cate_id}','${tag_id}','${author_id}','1',NOW(),NOW())`
  
    console.log(sql,'sql');
    
    return exec(sql).then(rows => {
      if(rows.affectedRows){
        return true
      }else{
        return false
      }
    })
  }
  async deleteBlog(postBody){
    let {ids}=postBody
    // ids=JSON.parse(ids)
    let sql_ids=''
    ids.forEach((e,i,c) => {
      if(i==c.length-1){
        sql_ids+=e
      }else{
        sql_ids+=e+','
      }
    });
    const sql=`delete from blogs where id in (${sql_ids})`
    return exec(sql).then(rows => {
      if(rows.affectedRows){
        return true
      }else{
        return false
      }
    })
  }
}
module.exports=new blogController