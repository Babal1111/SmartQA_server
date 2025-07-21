const users = require('../models/Users');
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');

const authConntroller = {
    register: async(request,response)=>{
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
        return response.status(201).json({message :"user created succesfully"});
    }

}

module.exports = authConntroller;