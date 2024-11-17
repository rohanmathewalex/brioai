const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async(req,res) => {
    const {name, email, password} = req.body;

    try {
        //Check if user exists
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg: 'User already exists'});
        }
        //Create new User
        user = new  User({name, email, password});
        await user.save();

        //Generate JWT
        const payload = {user:{id:user.id}};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(201).json({token, user});
    } catch (error) {
        console.error(err.message);
        res.status(500).json({msg: 'Server Error'});
    }
}

const loginUser = async(req,res)=> {
    const {email, password} = req.body;
    try {
        //Check for User
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: "Invalid Credentials"});
        }
        //check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg:'Invalid Credentials'});
        }

        //Generate JWT
        const payload = {user:{is:user.id}};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});

        return res.status(200).json({msg:'Login success', token, user});
         
    } catch (error) {
        console.error(err.message);
        res.status(500).json({msg: 'Server Error'});
        
    }
}
module.exports = { registerUser, loginUser };