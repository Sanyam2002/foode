const mongoose = require('mongoose')
const {Schema} = mongoose;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    cart:{
        type:Array,
        default:[]
    },
    history:{
        type:Array,
        default:[]
    },
    timestamp:{
        type: Date,
        default: Date.now
    },
    
});
const User = mongoose.model('user' , UserSchema)
module.exports = User
