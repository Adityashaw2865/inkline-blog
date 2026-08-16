// ============================================================
// controllers/authController.js — logic for signup & login.
//
// TODO here:
//
// signupUser(req, res):
//   1. Get name, email, password from req.body
//   2. Check if a user with that email already exists (User.findOne)
//   3. Hash the password using bcryptjs: await bcrypt.hash(password, 10)
//   4. Create the user: await User.create({ name, email, password: hashedPassword })
//   5. Generate a JWT token (see utils/generateToken.js)
//   6. Send back res.status(201).json({ user, token })
//
// loginUser(req, res):
//   1. Get email, password from req.body
//   2. Find the user by email
//   3. Compare password: await bcrypt.compare(password, user.password)
//   4. If valid, generate a token and send it back
//   5. If invalid, send res.status(401).json({ message: 'Invalid credentials' })
//
// module.exports = { signupUser, loginUser }
// ============================================================

const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');


async function signupUser(req, res) {
    const{name,email,password}=req.body;

    const existingUser=await User.findOne({email});


    if(existingUser){
        return res.status(400).json({message:'User already exists'});
    }
    const hashedPassword = await bcrypt.hash(password, 10);



const user=await User.create({
    name,email,password:hashedPassword
});
const token=generateToken(user._id);
res.status(201).json({
    user,token
});
}

async function loginUser(req,res){
    const{email,password}=req.body;
    const user=await User.findOne({email});

    if(!user){
        return res.status(404).json({message:'user not found '})
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(401).json({message:'Invalid credentials'});

    }
    const token=generateToken(user._id);
    res.status(200).json({user,token});

}

module.exports={signupUser,loginUser};
