//学生管理列表路由
//导包
const express = require("express");
const path = require("path");

//创建路由对象
const studentManagerRouter = express.Router()

//导入控制器
const studentManagerController = require(path.join(
    __dirname,'../controllers/studentManagerController.js'))


//处理get请求 调用控制器的getStudentListPage方法获取学生列表页面
studentManagerRouter.get("/list",studentManagerController.getStudentListPage)

//处理get请求 获取新增页面
studentManagerRouter.get("/add",studentManagerController.getAddStudentPage)
//处理新增学生信息
studentManagerRouter.post("/add",studentManagerController.addStudent)

//获取修改页面
//要根据id获取对应内容  动态路径参数 以冒号开头
studentManagerRouter.get("/edit/:studentId",studentManagerController.getEditStudentPage)
//修改学生的信息
studentManagerRouter.post("/edit/:studentId",studentManagerController.editStudent)

//删除学生信息
studentManagerRouter.get("/delete/:studentId",studentManagerController.deleteStudent)



//导出路由对象  给app调用
module.exports = studentManagerRouter;