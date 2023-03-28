import mongoose from "mongoose";

const logsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' || 'Employee'
    },
    action: String,
    date: Date,
    description: String,
});

const logsModel = mongoose.model('Logs', logsSchema)

export default logsModel;