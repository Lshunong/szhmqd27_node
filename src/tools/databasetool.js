//导入包
//mongodb的代码
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

// Connection URL
const url = "mongodb://localhost:27017";


// Database Name 数据库
const dbName = "szhmqd27";

/**
 * 1.暴露出一个方法，插入一条数据
 * @param {*} collectionName 集合名称
 * @param {*} data 数据
 * @param {*} callback 回调，把结果告知控制器
 */
const insertSingle = (collectionName,data,callback)=>{
    console.log(callback)
    MongoClient.connect(
        url,
        {useNewUrlParser:true}, 
        function(err, client) {

        //拿到db
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection(collectionName);

        collection.insertOne(data,(err,result)=>{
            //关闭数据库
            client.close();
            //执行回调函数   传递结果给控制器
            callback(err,result)
        })       
    });
}

/**
 * 2.暴露出一个方法，查询一条数据
 * @param {*} collectionName 集合名称
 * @param {*} data 数据
 * @param {*} callback 回调，把结果告知控制器
 */
const findYige = (collectionName,data,callback)=>{
    console.log(callback)
    MongoClient.connect(
        url,
        {useNewUrlParser:true}, 
        function(err, client) {

        //拿到db
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection(collectionName);
        //调用mongodb的findOne方法
        collection.findOne(data,(err,doc)=>{
            //console.log(doc)这是根据id获取到的内容
            //关闭数据库
            client.close();
            //执行回调函数   传递结果给控制器   并渲染到页面
            callback(err,doc)
        })       
    });
}


/**
 * 3.暴露出一个方法，查询多条数据
 * @param {*} collectionName 集合名称
 * @param {*} data 数据
 * @param {*} callback 回调，把结果告知控制器
 */
const findMany = (collectionName,data,callback)=>{
    console.log(callback)
    MongoClient.connect(
        url,
        {useNewUrlParser:true}, 
        function(err, client) {

        //拿到db
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection(collectionName);
        //调用mongodb的find方法  查询多个
        collection.find(data).toArray((err,docs)=>{
            //关闭数据库
            client.close();
            //执行回调函数   传递结果给调用它的控制器
            callback(err,docs)
        })       
    });
}

/**
 * 3.暴露出一个方法，修改一条数据
 * @param {*} collectionName 集合名称
 * @param {*} condition 条件
 * @param {*} data 数据
 * @param {*} callback 回调，把结果告知控制器
 */
const updateYige = (collectionName,condition,data,callback)=>{
    console.log(callback)
    MongoClient.connect(
        url,
        {useNewUrlParser:true}, 
        function(err, client) {

        //拿到db
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection(collectionName);
        //调用mongodb的updateOne方法  
        collection.updateOne(condition,{$set:data},(err,docs)=>{
            //关闭数据库
            client.close();
            //执行回调函数   传递结果给调用它的控制器
            callback(err,docs)
        })       
    });
}

/**
 * 3.暴露出一个方法，删除一条数据
 * @param {*} collectionName 集合名称
 * @param {*} data 数据
 * @param {*} callback 回调，把结果告知控制器
 */
const deleteYige = (collectionName,data,callback)=>{
    console.log(callback)
    MongoClient.connect(
        url,
        {useNewUrlParser:true}, 
        function(err, client) {

        //拿到db
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection(collectionName);

        //调用mongodb的find方法  查询多个
        collection.deleteOne(data,(err,docs)=>{
            //关闭数据库
            client.close();
            //执行回调函数   传递结果给调用它的控制器
            callback(err,docs)
        })       
    });
}


//const  定义
//导出方法  给控制器调用
module.exports ={
    insertSingle,
    findYige,
    findMany,
    ObjectId,
    updateYige,
    deleteYige
}