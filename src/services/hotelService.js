const Hotel = require('../models/Hotel');

exports.addHotel = (data) => Hotel.create(data);

exports.getAllHottels = () => Hotel.find({});