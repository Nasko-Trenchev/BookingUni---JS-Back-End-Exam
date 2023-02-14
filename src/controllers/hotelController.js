const hotelService = require('../services/hotelService');

exports.getCreatePage = async (req, res) =>{

    res.render('create');
}

exports.postCreatePage = async (req, res) =>{

    const {hotel: name, city, freeRooms, imgUrl} = req.body;

    try{
        const newHotel = await hotelService.addHotel({name, city, imgUrl, freeRooms, owner: req.user._id})
    }
    catch(err){
        const errors = Object.keys(err.errors).map(key => err.errors[key].message)
        return res.render('create', {error: errors[0]})
    }

    res.redirect('/');
}

exports.getDetails = async (req, res) =>{

    const hotel = await hotelService.findHotelById(req.params.id).lean();

    res.render('details', {hotel});
}