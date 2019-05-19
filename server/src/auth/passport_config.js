const passport = require('koa-passport')
const LocalStrategy = require('passport-local')
const {exec} = require('../db/mysql');
const userController = require('../controller/user')
const { genPassword } = require('../utils/cryp')
// 用户名密码验证策略
passport.use(new LocalStrategy(
    /**
     * @param username 用户输入的用户名
     * @param password 用户输入的密码
     * @param done 验证验证完成后的回调函数，由passport调用
     */
    function (username, password, done) {
        userController.login(username,password).then(function (result) {
            if (result != null) {
                if (result.password == genPassword(password)) {
                    return done(null, result)
                } else {
                    return done(null, false, '用户名或密码错误')
                }
            } else {
                return done(null, false, '未知用户')
            }
        }).catch(function (err) {
            log.error(err.message)
            return done(null, false, { message: err.message })
        })
    }
))

// serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中
passport.serializeUser(function (user, done) {
    done(null, user)
})

// deserializeUser 在每次请求的时候将从 session 中读取用户对象
passport.deserializeUser(function (user, done) {
    return done(null, user)
})

module.exports = passport