const Hotel = require('../models/Hotel');

exports.addHotel = (data) => Hotel.create(data);

exports.getAllHottels = () => Hotel.find({});

exports.findHotelById = (id) => Hotel.findById(id);

exports.bookHotel = async (hotelId, userId) =>{

    const hotel = await this.findHotelById(hotelId);
    hotel.bookedUsers.push(userId);
    await hotel.save();
}

exports.deleteHotel = (id) => Hotel.findByIdAndDelete(id);

exports.editHotel = (id, data) => Hotel.findByIdAndUpdate(id, data, {runValidators: true})

exports.findReservation = (id) => Hotel.find({bookedUsers: {$in: [`${id}`]}})
