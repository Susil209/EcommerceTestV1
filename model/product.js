const mongoose = require('mongoose');
const {Schema} = mongoose;

//schema
const productSchema = new Schema({
    title: {type: String, required : true , unique: true},
    description: String,
    price: {type: Number, min:[0, 'wrong price'], required : true},
    discountPercentage: {type: Number, min:[0, 'wrong discount']},
    rating: {type: Number, min:[0, 'wrong discount'],max:[5, 'cannot exceed max amount'] , default:0},
    stock: Number,
    brand: {type: String, required : true},
    category: {type: String, required : true},
    thumbnail: {type: String, required : true},
    images: [String]
})

//Model
exports.Product = mongoose.model("Product",productSchema);