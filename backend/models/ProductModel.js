const mongoose = require('mongoose')
const { Schema } = mongoose;

const productSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    image: { 
        type: Array, 
        default:[] 
    },
    title: { 
        type: String, 
    },
    description: { 
        type: String,
    },
    price: { 
        type: Number, 
        default: 0, 
    },
    category: { 
        type: String, 
        default:1
    },
    countInStock: { 
        type: Number, 
        default: 0,
    },
    delivery:{
        type: Number,
        default:1,
    },
    
});
productSchema.index({ 
    title:'text',
    description: 'text',
}, {
    weights: {
        name: 5,
        description: 1,
    }
}) 

const ProductModel = mongoose.model("Product", productSchema);
// ProductModel.createIndexes()

module.exports= ProductModel;