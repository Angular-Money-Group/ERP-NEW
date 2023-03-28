import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    priceCost: Number,
    priceSell: Number,
    barCode: String,
    description: String,
    category: String,
    moveStock: Number,
    realStock: Number,
    initialStock: Number,
    createdAt: Date,
    updatedAt: Date
});

const productsSchema = mongoose.model('Product', schema)

export default productsSchema;