const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const json =require('koa-json')
const helmet = require('koa-helmet');
const respond = require('koa-respond');
const logger = require('koa-logger');
const serve = require('koa-static');
const path = require('path');
const session = require('koa-generic-session')
// const session = require("koa-session2") 
const redisStore = require('koa-redis')
const app = new Koa();
// const router = new Router();
const port = process.env.PORT || 3000;
const {REDIS_CONF}=require('./config/db')

const passport = require(__dirname + '/auth/passport_config.js')
const staticHtml = require('./static/')
//引入路由
const users=require('./routes/users')
const blogs=require('./routes/blogs')
const tags=require('./routes/tags')
const cates=require('./routes/cates')
const comments =require('./routes/comment')
// require('./routes/blogs')(router)
// session 配置
app.proxy = true    
app.keys = ['WJiol#23123_']

app
  .use(cors())
  .use(logger())
  // .use(session({}))
  .use(bodyParser({enableTypes:['json', 'form', 'text']}))
  .use(json())
  .use(helmet())
  .use(respond())
  
  .use(session({
    // 配置 cookie
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    },
    // 配置 redis
    store: redisStore({
      // all: '127.0.0.1:6379'   // 写死本地的 redis
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
  }))
  // .use(passport.initialize())
  // .use(passport.session())
  //路由
  .use(users.routes(),users.allowedMethods())
  .use(blogs.routes(),blogs.allowedMethods())
  .use(cates.routes(),cates.allowedMethods())
  .use(tags.routes(),tags.allowedMethods())
  .use(comments.routes(),comments.allowedMethods())
  .use(serve(path.join(process.cwd(), '../client/build')))
  .use(async (ctx,next)=>{
    ctx.type = 'text/html;charset=utf-8';
    ctx.body = blogs
  })
  .listen(port, () => {
    console.log('The server is running at:');
    console.log(
      `    - Local:  http://localhost:${port}`
    );
  });
