const {githubOauth_dev,githubOauth_pro} = require('../config/oauth');
const {SuccessModel,ErrorModel} = require('../model/basicModel');
const moment = require('moment');
//在node-login/routes/github.js
let githubOauth =githubOauth_dev;
console.log('--------------------------------');

console.log(process.env.NODE_ENV,'process.env.NODE_ENV');

if(process.env.NODE_ENV==='production'){
     githubOauth =githubOauth_pro;
}
const GithubController = require('../controller/github')
const router = require('koa-router')();
const fetch = require('node-fetch');

const fetchPostHeader=(params) => {
   return   {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            }
}
router.prefix('/api/oauth/github')


router.get('/login', async (ctx) => {
        var dataStr = (new Date()).valueOf();
        //重定向到认证接口,并配置参数
        var path = "https://github.com/login/oauth/authorize";
        path += '?client_id=' + githubOauth.client_id;
        path += '&scope=' + githubOauth.scope;
        path += '&state=' + dataStr;
        //转发到授权服务器
        ctx.redirect(path);
})
//重定向回来再发请求拿token
router.get('/callback', async (ctx) => {
    const code = ctx.query.code;
    let path = 'https://github.com/login/oauth/access_token';
    const params = {
        client_id: githubOauth.client_id,
        client_secret: githubOauth.client_secret,
        code: code
    }
    const getAccessTokenRes=await fetch(path,fetchPostHeader(params))
    const getAccessTokenResBody =  await getAccessTokenRes.text()
    const args = getAccessTokenResBody.split('&');
    let arg = args[0].split('=');
    const access_token = arg[1];
    //根据token 请求用户信息
    const url = ' https://api.github.com/user?access_token=' + access_token;
    const getGithubUserInfo =await fetch(url)
    const userInfo =await getGithubUserInfo.json()
    const postBody={
        userName:userInfo.login,
        realName:userInfo.name,
        password:null,
        eMail:userInfo.email,
        created_at:moment(userInfo.created_at).format("YYYY-MM-DD HH:mm:ss"),
        avatar_url:userInfo.avatar_url,
        phone:null,
        website:userInfo.html_url,
        desc:userInfo.bio,
        github_id:userInfo.id
    }
    
    //拿到oauth数据，去查mysql，
    const findUserInMysql=await GithubController.findUserInMysql(userInfo.id);
   
    
    if(findUserInMysql.id){
        //如果有返回，更新mysql数据，设置session，调回主页
        const updateResult=await GithubController.update(postBody);
        ctx.session.userId=updateResult.id;
        ctx.session.username=updateResult.username;
        ctx.session.realname=findUserInMysql.realname;
        ctx.session.userAuthority=findUserInMysql.authority;
        ctx.redirect(global.jumpPath);
    }else{
        //如果没有，创建新数据，初始密码为1
        const createResult=await GithubController.create(postBody);
        if(createResult.id){
            ctx.session.userId=createResult.id;
            ctx.session.username=createResult.username;
            ctx.session.realname=createResult.realname;
            ctx.session.userAuthority=createResult.authority;
            ctx.redirect(`${global.jumpPath}github/setuser`)
        }
    }
})
router.post('/syncuser',async (ctx,next) => {
    const postBody=ctx.request.body;
    const syncResult = await GithubController.update(postBody);
    if(syncResult.id){
        ctx.body = new SuccessModel(syncResult)
    }else{
        ctx.body = new ErrorModel('同步失败')
    }
})
router.get('/getuser',async (ctx) => {
    const id = ctx.session.userId;
    if(!id){
        ctx.body=new ErrorModel('没有获取到用户信息，尚未登录')
    }
    const result =  await GithubController.findGitHubUser(id)
    if(result.id){
        ctx.body=new SuccessModel(result)
    }else{
        ctx.body=new ErrorModel('没有查询到用户信息，尚未登录')
    }
})


module.exports = router;