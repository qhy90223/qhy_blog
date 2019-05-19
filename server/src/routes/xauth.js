/ 路由相关
const Router = require('koa-router')
// 初始化路由
const router = new Router()
// 认证相关
const passport = require(__dirname + '/passport_config.js')

/**
 * 认证登录
 */
router.post('/xauth/login', function (ctx, next) {
    return passport.authenticate('local', function (err, user, info, status) {
        if (user) {
            ctx.body = 'Y'
            return ctx.login(user)
        } else {
            ctx.body = info
        }
    })(ctx, next)
})

/**
 * 认证登出
 */
router.get('/xauth/logout', function (ctx, next) {
    ctx.logout()
    ctx.body = 'Y'
})

// 以下为自定义需要身份认证的路由
router.post('/xauth/test', function (ctx, next) {
    if (ctx.isAuthenticated()) {
        ctx.body = '认证通过'
    } else {
        ctx.throw(401)
        ctx.body = '非法访问'
    }
})

module.exports = router