const {exec,escape} = require('../db/mysql');
class cateController{
  async getCateList(){
    const sql=`
    SELECT a.id AS cateId,a.cate_name AS cateName,
    a.cate_shortname AS cateShortName,COUNT(b.cate_id) AS articleNums,
    a.create_time AS createTime,
    a.last_update_time AS lastUpdateTime 
    FROM cates AS a LEFT JOIN blogs AS b 
    ON  b.cate_id = a.id 
    GROUP BY a.cate_name
    ORDER BY a.last_update_time DESC;`
    return exec(sql)
  }
  async createCate(postBody){
    let {cateName,cateShortName} =postBody;
    const sql=`INSERT INTO cates 
    (cate_name,cate_shortname,create_time,last_update_time) 
    VALUES ('${cateName}','${cateShortName}',NOW(),NOW())`
    return exec(sql).then(result => {
      if(result.affectedRows){
        return true
      }else{
        return false
      }
    })
  }
  async updateCate(postBody){
    let {cateName,cateShortName,cateId} =postBody;
    const sql=`UPDATE cates SET 
    cate_name='${cateName}',
    cate_shortname='${cateShortName}',
    last_update_time=NOW()
    WHERE id ='${cateId}';`
    
    
    return exec(sql).then(result => {
      if(result.affectedRows){
        return true
      }else{
        return false
      }
    })
  }
  async deleteCate(postBody){
    let {ids}=postBody
    
    let sql_ids=''
    ids.forEach((e,i,c) => {
      if(i==c.length-1){
        sql_ids+=e
      }else{
        sql_ids+=e+','
      }
    });
    const sql=`delete from cates where id in (${sql_ids})`
    return exec(sql).then(rows => {
      if(rows.affectedRows){
        return true
      }else{
        return false
      }
    })
  }

}
module.exports=new cateController