const mongoose = require('mongoose');
const {Schema} = mongoose;

const ContactSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String
    },
    email:{
        type: String
    },
    message:{
        type: String
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('query' , ContactSchema)