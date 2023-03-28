import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'employee'],
        required: true
    },
    cpfCnpj: {
        type: String,
        required: true
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    clients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }],
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    patrimony:[ { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patrimony'
    }],
    sales: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sale'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;