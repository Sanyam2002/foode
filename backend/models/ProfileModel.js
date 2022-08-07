const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProfileSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
    address:{
        type: String
    },
    city:{
        type: String
    },
    state:{
        type: String
    },
    pincode:{
        type: Number
    },
    country:{
        type: String,
        default: 'India'
    },
    phone:{
        type: Number
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('profile' , ProfileSchema)