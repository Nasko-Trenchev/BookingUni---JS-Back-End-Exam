const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    freeRooms: {
        type: Number,
        required: true,
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
