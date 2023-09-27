const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    tax:{
        type: Number,
        required:true
    },
    shippingFee:{
        type: Number,
        required:true
    },
    subtotal:{
        type: Number,
        required:true
    },
    total:{
        type: Number,
        required:true
    },
    orderItems:{
        type: [],
        required:true
    },
    status:{
        type: String,
        required:true
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    clientSecret:{
        type: String,
        required:true
        
    },
    paymentId:{
        type: String,
        required:true
        
    },
 
},{timestamps:true})


module.exports= mongoose.model('Order', OrderSchema)