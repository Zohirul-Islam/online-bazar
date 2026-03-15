import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from 'validator';
import jwt from 'jsonwebtoken';
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}
const userRegister = async (req, res) => {
try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required !" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({success:false,message:"user already exists"})
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({success:false,message:"Enter valid email !"})
    }
    if (password.length < 8) {
        return res.status(400).json({success:false,message:"password length must be over 8 character !"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
        name,email,password:hashedPassword
    })
    const user = await newUser.save();
    const token = createToken(user._id);
    console.log(user);
    res.status(201).json({ success: true, message:"user registration success",token });
} catch (error) {
    res.status(500).json({
        success: false,
        message:error.message
    })
}
}
const userLogin = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found.please enter valid email" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            return res.status(200).json({ success: true, token, message: "Login successful" });
        } else {
            return res.status(400).json({ success: false, message: "wrong password" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message})
    }
}
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.status(200).json({ success: true, token, message:"Login Success"});
        } else {
            res.status(200).json({ success: false, message:"Enter valid email or password"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message})
    }
}

export {userLogin,userRegister,adminLogin}