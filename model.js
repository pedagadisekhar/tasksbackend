const mongoose = require("mongoose");
const Tasks = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    iscompleted:{
        type:Boolean,
        required:true
    }
})

module.exports = mongoose.model("Tasks",Tasks)