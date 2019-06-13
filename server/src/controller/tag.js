const {exec,escape} = require('../db/mysql');
class tagController{
  async getTagList(query){
    let {currentPage,pageSize}=query;
    pageSize=pageSize?pageSize:5;
    currentPage=currentPage?(currentPage):1;
    const sql=`SELECT 
    a.id AS tagId,a.tag_name AS tagName, a.tag_shortname AS tagShortName,COUNT(b.tag_id) AS articleNums,
    a.create_time AS createTime,a.last_update_time AS lastUpdateTime
    FROM 
    tags AS a LEFT JOIN blogs AS b 
    ON  b.tag_id = a.id 
    GROUP BY a.tag_name
    ORDER BY a.create_time DESC
    LIMIT ${(currentPage-1)*pageSize},${pageSize};
    SELECT count(id) AS totalCount from tags;`
    return exec(sql).then(res => {
      return {
        totalCount:res[1][0].totalCount,
        entityData:res[0],
        pageSize:parseInt(pageSize),
        currentPage:parseInt(currentPage),
        totalPage:Math.ceil(res[1][0].totalCount/pageSize)
      }
    })
  }
  async createTag(postBody){
    let {tagName,tagShortName} =postBody;
    const sql=`INSERT INTO tags 
    (tag_name,tag_shortname,create_time,last_update_time) VALUES 
    ('${tagName}','${tagShortName}',NOW(),NOW())`
    console.log(sql,'sql');
    
    return exec(sql).then(result => {
      if(result.affectedRows){
        return true
      }else{
        return false
      }
    })
  }
  async updateTag(postBody){
    let {tagName,tagShortName,tagId} =postBody;
    const sql=`UPDATE tags SET 
    tag_name='${tagName}',
    tag_shortname='${tagShortName}',
    last_update_time= NOW() WHERE id ='${tagId}';`
   
    
    return exec(sql).then(result => {
      if(result.affectedRows){
        return true
      }else{
        return false
      }
    })
  }
  async deleteTag(postBody){
    let {ids}=postBody
    
    let sql_ids=''
    ids.forEach((e,i,c) => {
      if(i==c.length-1){
        sql_ids+=e
      }else{
        sql_ids+=e+','
      }
    });
    const sql=`delete from tags where id in (${sql_ids})`
    return exec(sql).then(rows => {
      if(rows.affectedRows){
        return true
      }else{
        return false
      }
    })
  }

}
module.exports=new tagController