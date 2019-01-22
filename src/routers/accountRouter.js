
/* 
注册和登录的处理
*/
const express = require('express')
const path = require('path')

//创建路由对象
const accountRouter = express.Router()

//导入控制器模块
const accountController = require(path.join(__dirname,'../controllers/accountController.js'))

//MVC 获取注册页面
accountRouter.get('/register',accountController.getRegisterPage)
//处理注册
accountRouter.post('/register',accountController.register)
//获取登录页面  调用getLoginPage
accountRouter.get('/login',accountController.getLoginPage)
//获取验证码   调用getVcodeImage方法
accountRouter.get('/vcode',accountController.getVcodeImage)
//处理登录请求  并写个login方法传给控制器
accountRouter.post('/login',accountController.login)

//导出路由对象
module.exports =accountRouter