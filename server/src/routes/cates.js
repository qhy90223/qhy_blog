const router = require('koa-router')();
const cateController = require('../controller/cate');
const {SuccessModel,ErrorModel} = require('../model/basicModel')
const {loginCheck,userAuthority} = require('../middleware/loginCheck')
const adminCheck =require('../middleware/adminCheck')
router.prefix('/api/cate')
router.get('/list',adminCheck,async (ctx,next) => {
  const getCateList = await cateController.getCateList()
  ctx.body= new SuccessModel(getCateList)
})
router.post('/create',adminCheck,async (ctx,next) => {
  const postBody=ctx.request.body;
  const resultCreate = await cateController.createCate(postBody)
  if(resultCreate){
    ctx.body= new SuccessModel('创建成功')
  }else{
    ctx.body= new ErrorModel('创建失败')
  }
})

router.post('/update',adminCheck,async (ctx,next) => {
  const postBody=ctx.request.body;
  const resultUpdate = await cateController.updateCate(postBody)
  if(resultUpdate){
    ctx.body= new SuccessModel('更新成功')
  }else{
    ctx.body= new ErrorModel('更新失败')
  }
})
router.post('/delete',adminCheck,async (ctx,next) => {
  const postBody=ctx.request.body;
  const resultDelete = await cateController.deleteCate(postBody)
  if(resultDelete){
    ctx.body= new SuccessModel('删除成功')
  }else{
    ctx.body= new ErrorModel('删除失败')
  }
})
module.exports=router