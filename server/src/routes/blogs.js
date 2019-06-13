const router = require('koa-router')();
const blogController = require('../controller/blog');
const {SuccessModel,ErrorModel} = require('../model/basicModel')
const {loginCheck,userAuthority} = require('../middleware/loginCheck')
router.prefix('/api/blog');
router.get('/list',async (ctx,next)=> {
  
  const query=ctx.query;
  const {currentPage,pageSize}=query;
  let blogList=[] ; 
  if(query){
    blogList= await blogController.getBlogList(query)
  }else{
    blogList= await blogController.getBlogList()
  }
  
  ctx.body=new SuccessModel(blogList)
})
router.get('/detail',async (ctx,next) => {
  const {id} = ctx.query;
  const detailBlog = await blogController.getDetailBlog(id)
  ctx.body=new SuccessModel(detailBlog)
})
router.post('/update',loginCheck,userAuthority,async (ctx,next) => {
  
  const postBody=ctx.request.body;
  let updateResult= await blogController.updateBlog(postBody)
  if(updateResult){
    ctx.body = new SuccessModel('更新成功');
  }else{
    ctx.body = new ErrorModel('更新失败');
  }
})
router.post('/create',loginCheck,async (ctx,next)=> {
  let postBody = ctx.request.body;
  postBody.author_id=ctx.session.userId;
  const createResult = await blogController.createBlog(postBody)
  if(createResult){
    ctx.body = new SuccessModel('创建成功');
  }else{
    ctx.body = new ErrorModel('创建失败');
  }
  
})
router.post('/delete',loginCheck,userAuthority,async(ctx,next) => {
  const postBody=ctx.request.body;
  const deleteResult = await blogController.deleteBlog(postBody)
  if(deleteResult){
    ctx.body = new SuccessModel('删除成功');
  }else{
    ctx.body = new ErrorModel('删除失败');
  }
})
module.exports=router