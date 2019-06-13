/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-12 16:06:36
 * @LastEditTime: 2019-06-13 21:13:02
 * @LastEditors: Please set LastEditors
 */
const router = require('koa-router')()
const commentController = require('../controller/comment');
const {loginCheck} = require('../middleware/loginCheck')
const {SuccessModel,ErrorModel} = require('../model/basicModel')
router.prefix('/api/comment')
router.get('/list',async (ctx,next) => {
    const query = ctx.query;
    const result = await commentController.getCommentList(query)
    if(result){
        ctx.body = new SuccessModel(result)
    }else{
        ctx.body = new ErrorModel('获取评论出错')
    }
    
})
router.post('/create',loginCheck,async (ctx,next) => {
    const postBody = ctx.request.body;
    postBody.userId=ctx.session.userId;
    const result = await commentController.createComment(postBody)
    if(result){
        ctx.body = new SuccessModel('创建成功')
    }else{
        ctx.body = new ErrorModel('创建失败')
    }
})
router.post('/delete',loginCheck,async (ctx,next) => {
    const postBody = ctx.request.body;
    const result = await commentController.deletetComment(postBody)
   
    
    if(result){
        ctx.body = new SuccessModel('删除成功')
    }else{
        ctx.body = new ErrorModel('删除失败')
    }
})

module.exports = router