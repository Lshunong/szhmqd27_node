
const path = require('path')
const MongoClient = require("mongodb").MongoClient;
//验证码第三方包
const captchapng = require('captchapng')

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "szhmqd27";

/* 
    导出一个方法 获取注册页面
*/
exports.getRegisterPage = (req,res)=>{
    //res.send('我是注册页面')
    // 内部就是对 fs.readFile 的封装
    res.sendFile(path.join(__dirname,'../public/views/register.html'))
}

/* 
导出注册方法
*/
exports.register = (req,res)=>{
    const result = {
        status:0,
        message:'注册成功'
    }

    //1.拿到浏览器传输过来的数据
    const {username} = req.body
    console.log(username)

    //2、先判断数据库中用户名，是否存在，如果存在返回提示 (mongodb)
    MongoClient.connect(url,
        {useNewUrlParser:true},
        function(err, client) {

        //拿到db
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection('accountInfo');

        //查询一个
        collection.findOne({username},(err,doc)=>{

            if(doc){//存在
                result.status=1;
                result.message='用户名已经存在';

                //关闭数据库
                client.close();
                //返回
                res.json(result);
            }else{
                //3、如果用户名不存在，插入到数据库中
                 // result2 有值，代表成功 result2 为null就是失败
                collection.insertOne(req.body,(err,result2)=>{

                    if(!result2){//失败
                        result.status=2;
                        result.message='注册失败';
                    }
                        //关闭数据库
                        client.close();
                        //返回
                        res.json(result);
                    })
                }
            })
        }          
    )      
}

//导出获取登录页面的方法  给路由调用
exports.getLoginPage=(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/views/login.html"))
}

//导出获取验证码  用到第三方包captchapng
exports.getVcodeImage=(req,res)=>{
    //1.利用一个第三方的包生成 一张带数字的图片
    const vcode = parseInt(Math.random()*9000+1000)
    //2.把vcode保存到session对象中去   方面后面登录
    req.session.vcode =vcode
    //图片宽高
    var p = new captchapng(80,30,vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    //返回 并告知是一张图片
    res.end(imgbase64);
}


//导出一个方法  处理登录请求
exports.login = (req,res)=>{
    const result = {
        status:0,
        message:'登录成功'
    }
    //1.拿到浏览器传输过来的数据
    const {username,password,vcode} = req.body

    //2.验证码验证
    if(vcode != req.session.vcode){
        result.status =1
        result.message = '验证码错误'

        res.json(result)
        return
    }

    //3.验证用户名和密码
    //先判断数据库中用户名和密码，是否存在，如果存在返回提示 (mongodb)
    MongoClient.connect(url, 
        function(err, client) {

        //拿到db
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection('accountInfo');
        //查询一个
        collection.findOne({username,password},(err,doc)=>{
            if(doc == null){//没查询到
                result.status = 2
                result.message = "用户名或密码错误"
              }else{
                req.session.loginedName = username
              }

              res.json(result)
        })
        
      });
}