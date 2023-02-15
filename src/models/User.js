const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userShema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email should be valid E-Mail"],
        unique: true
    },
    password: {
        type: String,
        required: true,
        match: [/^[\w-]+$/, "Password should be only letters and digits"],
        minLength: 5
    }
})

userShema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    })
})

userShema.method('validatePassword', function(password) {

    return bcrypt.compare(password, this.password);

})

const User = mongoose.model('User', userShema);

module.exports = User;