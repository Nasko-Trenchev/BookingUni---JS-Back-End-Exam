const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minLength: 4,
        unique: true
        
    },
    city: {
        type: String,
        required: true,
        minLength: 3
    },
    imgUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\//, "Invalid URL"]
    },
    freeRooms: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    bookedUsers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
