
const router = require('koa-router')();
const userController = require('../controller/user');
const {SuccessModel,ErrorModel} = require('../model/basicModel')
const adminCheck = require('../middleware/adminCheck');
const {loginCheck} = require('../middleware/loginCheck')
const path = require('path');
// const passport = require(path.join(__dirname,'../auth/passport_config'))
router.prefix('/api/user');
router.post('/login',async (ctx,next) => {
  let { username, password ,isCryp} = ctx.request.body;
  const result= await userController.login(username, password,isCryp)
  if(result.username){
    ctx.session.userId=result.id;
    ctx.session.username=result.username;
    ctx.session.realname=result.realname;
    ctx.session.userAuthority=result.authority
    ctx.body=new SuccessModel({
          currentPath:'/cms/blog/list',
          entity:result
      })
    } else {
      ctx.body = new ErrorModel('用户名或密码错误')
    }
})

router.get('/list',async (ctx,next) => {
  let query = ctx.query
  
  const getUserList=await userController.getUserList(query)
  ctx.body=new SuccessModel(getUserList)
})
router.post('/create',adminCheck,async (ctx,next) => {
  const postBody=ctx.request.body;
  const resultCreate = await userController.createUser(postBody)
  if(resultCreate){
    ctx.body=new SuccessModel('创建成功')
  }else{
    ctx.body= new ErrorModel('创建失败')
  }
})

router.post('/update',adminCheck,async (ctx,next) => {
  const postBody=ctx.request.body;
  const resultUpdate=await userController.updateUser(postBody)
  if(resultUpdate&&resultUpdate.id){
    ctx.body=new SuccessModel(resultUpdate)
  }else{
    ctx.body=new ErrorModel('更新失败')
  }
})
router.post('/delete',adminCheck,async (ctx,next) => {
  const postBody=ctx.request.body;
  const resultDelete = await userController.deleteUser(postBody)
  if(resultDelete){
    ctx.body=new SuccessModel('删除成功')
  }else{
    ctx.body=new ErrorModel('删除失败')
  }
})
router.post('/repassword',loginCheck,async (ctx,next)=>{
  
  const resultRepasswd= await userController.rePasswd(ctx)
  if(resultRepasswd){
    ctx.body=new SuccessModel('密码修改成功')
  }else{
    ctx.body=new ErrorModel('密码修改错误')
  }
})
router.get('/logout',async (ctx,next) => {
  ctx.session=null;
  ctx.body=new SuccessModel('安全退出成功')
})
module.exports = router 