const hotelService = require('../services/hotelService');

exports.getHomePage = async (req, res) => {

    let allHotels = await hotelService.getAllHottels().lean();

    allHotels = allHotels.sort(function(a,b) {
        return b.freeRooms - a.freeRooms
     });
    res.render('home', {allHotels});
}

exports.getProfilePage = async (req, res) =>{

    const user = req.user;
    const bookings = await hotelService.findReservation(req.user._id).lean();
    res.render('profile', {user, bookings});
}