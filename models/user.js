const mongoose=require('mongoose');

const User=mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    usertype:{
        type:Number,
        require:true
    }
})

module.exports=mongoose.model("User",User);