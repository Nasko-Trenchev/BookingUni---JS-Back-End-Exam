const User = require('../models/User');
const jwt = require('../lib/jsonwebtoken');
const config = require('../config')


exports.register = async (username, email, password, rePassword) => {
    
   const existingUser = await this.findByUsername(username);

   if(existingUser){

        throw "This user exists!";
    }

    if(password !== rePassword){

        throw "Password missmatch!";
    }
    try{
        await User.create({username, email, password})

    }
    catch(err) {
        const errors = Object.keys(err.errors).map(key => err.errors[key].message)
        throw `${errors[0]}` 
    }    
    return this.login(username, password);
};

exports.findByUsername = (username) => User.findOne({username});

exports.findByEmail = (username) => User.findOne({username});

exports.login = async (username, password) => {

    const user = await this.findByEmail(username);

    if(!user){

        throw "User or password don`t match!"
    }

    const isValid = await user.validatePassword(password);

    if(!isValid){

        throw "User or password don`t match!"
    }

    const payload = {_id: user._id, user: user.username, email: user.email}
    const token = await jwt.sign(payload, config.SECRET, {expiresIn: '2h'})
    return token;
}
