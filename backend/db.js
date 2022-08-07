const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/foode?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected");
    })
}
module.exports = connectToMongo
