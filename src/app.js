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

//拦截到所有请求 *代表所有
app.all('/*',(req,res,next)=>{
    if(req.url.includes('account')){
        //next执行下一个中间件
        next()
    }else{// 除开account一级路由的请求之外，其它都得判断是否登录
        if(req.session.loginedName){//获取到登录名 表示已经登录执行下一个中间件
            next()
        }else{//没有登录就拦截并提示
            res.send(`<script>alert("您还没有登录,请先登录!");location.href='/account/login'</script>`)
        }
    }
})


//导入路由对象 路由中间件写在最后
const accountRouter =require(path.join(__dirname,'./routers/accountRouter.js'))
const studentManagerRouter =require(path.join(__dirname,'./routers/studentManagerRouter.js'))
//一级路径account
app.use('/account',accountRouter)
app.use('/studentmanager',studentManagerRouter)

//启动
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }


    console.log("start ok")
})