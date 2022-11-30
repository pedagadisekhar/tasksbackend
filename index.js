const express = require("express");
const app = express();
const mongoose = require("mongoose")
const Tasks = require("./model")

app.use(express.json())

mongoose.connect("mongodb+srv://todolist:todolist@cluster0.7fz99q2.mongodb.net/?retryWrites=true&w=majority").then(
    ()=>{console.log("connected to db")}
).catch((e)=>{console.log("error",e)})
// app.get("/",(req,res)=>{
//     res.send("hello world")
// })

app.post("/add",async(req,res)=>{
      try {
        const user = await Tasks.create(req.body)
        res.send({
            message:"success",
            user
        })
      } catch (error) {
        res.send({
            message:error.message
        })
      }
})

app.get("/gettask",async(req,res)=>{
    try {
        const data = await Tasks.find()
        res.send({
            status:400,
            data})

    } catch (error) {
        res.send(
            {  
                 status:404,
                message:error.message
            })
    }
})

app.get("/gettask/:id",async(req,res)=>{
    try {
        const data = await Tasks.findById(req.params.id)
        res.send(data)

    } catch (error) {
        res.send(
            {message:error.message})
    }
})
app.delete("/deletetask/:id",async(req,res)=>{
    try {
        const data = await Tasks.findByIdAndDelete(req.params.id)
        res.send({
            status:204,
            message:"deleted succes",
            data})

    } catch (error) {
        res.send(
            {message:error.message})
    }
})

app.delete("/deleteall",async(req,res)=>{
    try {
        const data = await Tasks.deleteMany()
        res.send({
            status:204,
            message:"deleted succes",
            data})

    } catch (error) {
        res.send(
            {message:error.message})
    }
})

app.put("/update:id",async(req,res)=>{
    try {
        const data = await Tasks.updateOne({_id:req.params.id},req.body)
        res.send({
            status:204,
            message:"updated success",
            data
        })     //{_id:req.params.id},req.body
    } catch (error) {
        res.send(
            {message:error.message})
    }
})


app.post("/add/bulk",async(req,res)=>{
    try {
      const user = await Tasks.insertMany(req.body)
      res.send({
        status:201,
          message:"success",
          user
      })
    } catch (error) {
      res.send({
          message:error.message
      })
    }
})

app.listen(8080,()=>{console.log("server running")})


// "_id": "63877128f3dc7e3a434b824e",
//         "title": "work",
//         "iscompleted": true,
//         "__v": 0
//     },
//     {
//         "_id": "638772a93d16b0f52d876ab3",
//         "title": "dooodaa",
//         "iscompleted": false,
//         "__v": 0
//     },
//     {
//         "_id": "638775ab09aec816e663a870",
//         "title": "testcase1add",
//         "iscompleted": true,
//         "__v": 0
//     },
//     {
//         "_id": "638775b509aec816e663a872",
//         "title": "testcase2add",
//         "iscompleted": true,
//         "__v": 0
//     },
//     {
//         "_id": "638775c009aec816e663a874",
//         "title": "testcase3add",
//         "iscompleted": false,
//         "__v": 0
//     },
//     {
//         "_id": "638775c809aec816e663a876",
//         "title": "testcase4add",
//         "iscompleted": false,
//         "__v": 0
//     }
// ]