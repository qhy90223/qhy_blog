const {ErrorModel} = require('../model/basicModel')
const router =require('koa-router')()
const adminCheck = async (ctx,next) => {
 
  if(ctx.session.userAuthority=='0'){
    await next();
    return
  }
  if(ctx.session.username){
    ctx.body=new ErrorModel('不是管理员，无相应权限！')
  }
  ctx.status=401
  ctx.body=new ErrorModel({redirect:'/cms/user/login'},'尚未登录，请登录')
      
  

}
module.exports=adminCheck;