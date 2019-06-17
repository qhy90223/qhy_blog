const {exec,escape} = require('../db/mysql')
class CommentController{
    async getCommentList (query){
        let {blogId,currentPage,pageSize,order,seeWritterOnly}=query;
        let [blogSearch,order1]=['','DESC'];
        if(order==1) order1 = 'ASC';
        if(blogId!==undefined) blogSearch = `and a.blog_id = ${blogId}`
        if(seeWritterOnly === 'true'){
            seeWritterOnly =`LEFT JOIN blogs as c ON a.user_id = c.author_id`
        }else{
            seeWritterOnly=''
        }
        pageSize=pageSize?pageSize:5;
        currentPage=currentPage?currentPage:1;
        const sql=`
        SELECT 
        a.id as id,
        a.last_time as commentTime,
        a.content as commentValue,
        b.username as userName ,
        b.realname as realName from comments as a
        LEFT JOIN users as b ON a.user_id=b.id
        WHERE 1 = 1 
        ${blogSearch}
        ORDER BY a.last_time ${order1}
        LIMIT ${(currentPage-1)*pageSize},${pageSize};
        SELECT COUNT(a.id) as totalCount FROM comments as a WHERE blog_id = '${blogId}';
        `
        console.log(sql,'sql');
        
        // console.log(sql,'sql');
        return exec(sql).then(data => {
            return {
                currentPage,
                pageSize,
                totalCount:data[1][0].totalCount,
                totalPage:Math.ceil(data[1][0].totalCount/pageSize),
                list:data[0]
            }
        })
    }
    async createComment (postBody){
        const {blogId,content,userId} = postBody
        const sql = `INSERT INTO comments (blog_id,user_id,content,last_time) VALUES ('${blogId}','${userId}','${content}',now())`
        return exec(sql).then(data => {
           if(data.affectedRows){
                return true
            }else{
                return false
            }
            
        })
    }
    async deletetComment(postBody) {
        const {commentId} = postBody;
        const sql = `DELETE FROM comments WHERE id = '${commentId}';`
        return  exec(sql).then(data => {
            console.log(data.affectedRows,111);
            if(data.affectedRows){
                return true
            }else{
                return false
            }
        })
    }
}
module.exports=new CommentController