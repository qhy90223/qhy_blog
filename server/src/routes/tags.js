const router = require('koa-router')();
const tagController = require('../controller/tag');
const {SuccessModel,ErrorModel} = require('../model/basicModel')
const {loginCheck,userAuthority} = require('../middleware/loginCheck')
const adminCheck =require('../middleware/adminCheck')

router.prefix('/api/tag')
router.get('/list',async (ctx,next) => {
  const query =ctx.query
  const getTagList = await tagController.getTagList(query)
  ctx.body= new SuccessModel(getTagList)
})
router.post('/create',adminCheck,async (ctx,next) => {
  const postBody=ctx.request.body;
  const resultCreate = await tagController.createTag(postBody)
  if(resultCreate){
    ctx.body= new SuccessModel('创建成功')
  }else{
    ctx.body= new ErrorModel('创建失败')
  }
})
router.post('/update',adminCheck,async (ctx,next) => {
  const postBody=ctx.request.body;
  const resultUpdate = await tagController.updateTag(postBody)
  if(resultUpdate){
    ctx.body= new SuccessModel('更新成功')
  }else{
    ctx.body= new ErrorModel('更新失败')
  }
})
router.post('/delete',adminCheck,async (ctx,next) => {
  const postBody=ctx.request.body;
  const resultDelete = await tagController.deleteTag(postBody)
  if(resultDelete){
    ctx.body= new SuccessModel('删除成功')
  }else{
    ctx.body= new ErrorModel('删除失败')
  }
})
module.exports=router