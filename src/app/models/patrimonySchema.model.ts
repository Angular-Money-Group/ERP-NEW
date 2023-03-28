import mongoose from "mongoose";

export const patrimonySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    priceCost: Number,
    description: String,
    category: String,
    patrimonyNumber: Number,
    moveStock: Number,
    realStock: Number,
    initialStock: Number,
    isActive: Boolean,
    observation: String,
    createdAt: Date,
    updatedAt: Date,
})

const patrimonyModel = mongoose.model('Patrimony', patrimonySchema)

export default patrimonyModel;