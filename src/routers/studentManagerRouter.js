//学生管理列表路由
//导包
const express = require("express");
const path = require("path");

//创建路由对象
const studentManagerRouter = express.Router()

//导入控制器
const studentManagerController = require(path.join(
    __dirname,'../controllers/studentManagerController.js'))


//处理get请求 调用控制器的getStudentListPage方法获取列表页面
studentManagerRouter.get("/list",studentManagerController.getStudentListPage)

//导出
module.exports = studentManagerRouter;