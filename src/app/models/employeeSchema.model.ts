import mongoose from "mongoose"

const EmployeeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    cpf: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['adm', 'vend'],
        required: true
    },
    isTemporary: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const EmployeeModel = mongoose.model('Employee', EmployeeSchema)

export default EmployeeModel