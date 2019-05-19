const {ErrorModel} = require('../model/basicModel')
// const router =require('koa-router')()
const loginCheck=async (ctx,next) =>{
  console.log(ctx.session.username,'ctxsessionusername');
  if(ctx.session.username){
    await next()
    return
  }
  ctx.status=401
  ctx.body=new ErrorModel({redirect:'/cms/user/login'},'尚未登录，请登录')

 
}
const userAuthority=async (ctx,next) => {
  if(ctx.session.userAuthority==='0'){
    return await next()
  }else if(ctx.session.userId===ctx.request.body.authorId){
    return await next()
  }else{
   
    
    ctx.body=new ErrorModel('只能修改自己的博客！')
  }
}

module.exports= {
  loginCheck,
  userAuthority
}