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

    const bookings = hotel.bookedUsers.some(id => id == req.user._id);
    const isOwner = hotel.owner == req.user._id;

    res.render('details', {hotel, bookings, isOwner});
}

exports.bookHotel = async (req, res) =>{

    await hotelService.bookHotel(req.params.id, req.user._id);

    res.redirect(`/details/${req.params.id}`);
}

exports.deleteHotel = async (req, res) =>{

    await hotelService.deleteHotel(req.params.id);

    res.redirect('/');
}

exports.getEditPage = async (req, res) =>{

    const hotel = await hotelService.findHotelById(req.params.id).lean();

    res.render('edit', {hotel});
}

exports.postEditPage = async (req, res) =>{

    const {hotel: name, city, freeRooms, imgUrl} = req.body;

    await hotelService.editHotel(req.params.id, {name, city, freeRooms, imgUrl})

    res.redirect(`/details/${req.params.id}`)
}