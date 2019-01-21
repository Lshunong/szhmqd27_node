//导包
const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')

//创建app
const app = express()

// parse application/x-www-form-urlencoded 解析url
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 解析json
app.use(bodyParser.json())

// Use the session middleware 解析数字验证码图片路径 放入session
//app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 600000 }}))
app.use(session({ secret: 'keyboard cat',resave:false,saveUninitialized:false, cookie: { maxAge: 600000 }}))
//进行登录请求判断


//设置静态资源 根目录
app.use(express.static(path.join(__dirname,'public')))



//导入路由对象 路由中间件写在最后
const accountRouter =require(path.join(__dirname,'./routers/accountRouter.js'))
//一级路径account
app.use('/account',accountRouter)

//启动
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }


    console.log("start ok")
})