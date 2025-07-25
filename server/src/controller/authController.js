const users = require('../models/Users');
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const { request, response } = require('express');
const secret = process.env.JWT_secret;

const authConntroller = {
    login: async(request,response)=>{
        try {
            const  {email,password} = request.body;
            const user = await Users.findOne({email});
            if(!user){
                return response.status(404).json({error: 'User Not registered with this email'});
            }
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                return response.status(400).json({error: 'Invalid Password'});
            }
            const userDetails = {
            id:user._id,
            name:user.name,
            email: user.email,
            // password: user.password,
            role:'admin'
            }
            const token = jwt.sign(userDetails,secret,{expiresIn:'2m'});

            response.cookie('jwtToken',token,{
                httpOnly:true,
                domain:'localhost',
                path:'/',
                secure: false,
            })
            return response.status(201).json({message:'Logged In Successfully'});
        
        } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Internal server error' }); 
        }

    },
    register: async(request,response)=>{
        try{
            const {name,email, password} = request.body;

        const isUserAlready = await Users.findOne({email:email});
        if(isUserAlready){
            return response.status(400).json({message:'User already exists'});
        }

        const encryptedPassword = await bcrypt.hash(password,10);

        const newUser = new Users({
            name:name,
            email: email,
            password: encryptedPassword,
            role:'admin'
        })
        await newUser.save();
        const userDetails = {
            name:name,
            email: email,
            // password: encryptedPassword, // never store pwd in jwt
            role:'admin'
        }
        const token = jwt.sign(userDetails,secret,{expiresIn:'2m'});

        response.cookie('jwtToken',token,{
            httpOnly:true,
            domain:'localhost',
            path:'/',
            secure: false,
        })
        
        // return response.json({message:'user authenticated',userDetails:userDetails});
        return response.status(201).json({message :"user created succesfully"});
    }
    catch(error){
        console.log(error);
        return response.status(500).json({ message: 'Internal server error' }); 
    }

    },
    isUserLoggedIn: async (request,response)=>{
        try {
            
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: 'Internal server error' }); 
            
        }
    }


}

module.exports = authConntroller;