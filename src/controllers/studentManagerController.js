//学生管理系统列表控制器
const path = require("path");
const template = require("art-template");
const databasetool = require(path.join(__dirname,"../tools/databasetool.js"))

/**
 * 返回列表页面
 * 参数:
 * @param {*} req
 * @param {*} res
 */
const getStudentListPage =(req,res)=>{
    //判断获取搜索输入的内容  如果没有传递默认给空值
    const keyword = req.query.keyword || ''
    //console.log(req.query.keyword)

    //调用tool中的findMany方法 
    databasetool.findMany('studentInfo',{name:{$regex:keyword}},(err,docs)=>{
        // 这个里面的代码，是当databasetool中findMany执行了callback
        // callback中会把 err,docs传递过来
        // 渲染页面的代码 
        const html = template(path.join(__dirname,"../public/views/list.html"),{
            students:docs,
            keyword,
            loginedName:req.session.loginedName
        });
        //返回浏览器页面
        res.send(html);
    })
}

/**
 * 返回新增页面
 * 参数:
 * @param {*} req
 * @param {*} res
 */
const getAddStudentPage = (req,res) =>{
    // 渲染页面的代码 
    const html = template(path.join(__dirname,"../public/views/add.html"),{
        loginedName:req.session.loginedName
    });
    //返回浏览器页面
    res.send(html);
}

//新增学生信息
const addStudent = (req,res)=>{
    //调用databasetool
    databasetool.insertSingle('studentInfo',req.body,(err,result)=>{
        if(!result){
            res.send(`<script>alert("插入失败!")</script>`)
        }else{
            res.send(`<script>location.href='/studentmanager/list'</script>`)
        }
    })
}

//获取修改页面
const getEditStudentPage = (req,res)=>{
    // 必须按照它mongodb规定的处理，你才能拿到数据
    const _id=databasetool.ObjectId(req.params.studentId);
    databasetool.findYige('studentInfo',{_id},(err,doc)=>{
        doc.loginedName=req.session.loginedName
        //根据数据  重新渲染得到新页面
        const html = template(path.join(__dirname,"../public/views/edit.html"),doc);
        //返回浏览器页面
        res.send(html);
    })
}

//处理修改信息
const editStudent = (req,res) =>{
    // 必须按照它mongodb规定的处理，你才能拿到数据
    const _id=databasetool.ObjectId(req.params.studentId);
    databasetool.updateYige('studentInfo',{_id},req.body,(err,doc)=>{
        if(!doc){
            res.send(`<script>alert("插入失败!")</script>`)
        }else{
            res.send(`<script>location.href='/studentmanager/list'</script>`)
        }
    })
}

//处理点击删除学生信息
const deleteStudent = (req,res) =>{
    // 必须按照它mongodb规定的处理，你才能拿到数据
    const _id=databasetool.ObjectId(req.params.studentId);
    databasetool.deleteYige('studentInfo',{_id},(err,doc)=>{
        if(!doc){
            res.send(`<script>alert("删除失败!")</script>`)
        }else{
            res.send(`<script>location.href='/studentmanager/list'</script>`)
        }
    })
}

//导出对象  给路由调用
module.exports = {
    getStudentListPage,
    getAddStudentPage,
    addStudent,
    getEditStudentPage,
    editStudent,
    deleteStudent

}