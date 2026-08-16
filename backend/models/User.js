// ============================================================
// models/User.js — MongoDB schema for a user (for login/signup).
//
// TODO here:
// 1. Import mongoose
// 2. Define a Schema with fields:
//    - name (String, required)
//    - email (String, required, unique)
//    - password (String, required) -> store the HASHED password, never plain text
//    - createdAt (Date, default: Date.now)
// 3. Export the model: module.exports = mongoose.model('User', userSchema)
//
// Reminder: hash the password with bcryptjs BEFORE saving —
// usually done in the controller (authController.js) or via a
// pre('save') hook on this schema.
// ============================================================

const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})
module.exports=mongoose.model('User',userSchema);