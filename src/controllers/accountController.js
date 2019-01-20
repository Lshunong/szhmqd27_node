
const path = require('path')
/* 
    导出一个方法 获取注册页面
*/

exports.getRegisterPage = (req,res)=>{
    //res.send('我是注册页面')
    // 内部就是对 fs.readFile 的封装
    res.sendFile(path.join(__dirname,'../public/views/register.html'))
}