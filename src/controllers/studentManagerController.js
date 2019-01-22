//学生管理系统列表控制器
const path = require("path");
const template = require("art-template");
const databasetool = require(path.join(__dirname,"../tools/databasetool.js"))


const getStudentListPage =(req,res)=>{
    //判断获取 搜索输入的内容
    const keyword = req.query.keyword || ''
    console.log(req.query.keyword)

    //调用tool中的findMany方法 
    databasetool.findMany('studentInfo',{name:{$regex:keyword}},(err,docs)=>{
        // 这个里面的代码，是当databasetool中findMany执行了callback
        // callback中会把 err,docs传递过来
        // 渲染页面的代码 
        const html = template(path.join(__dirname,"../public/views/list.html"),{students:docs,keyword});
        
        res.send(html);
    })
}

//导出对象
module.exports = {
    getStudentListPage
}