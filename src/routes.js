const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authControler');
const hotelController = require('./controllers/hotelController');

const {isAuthenticated} = require('./middlewares/authMiddleware')

router.get('/', homeController.getHomePage);

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.get('/logout', authController.getLogout);


router.get('/create', hotelController.getCreatePage);
router.post('/create', hotelController.postCreatePage);

router.get('/details/:id', isAuthenticated, hotelController.getDetails);

router.get('/book/:id', isAuthenticated, hotelController.bookHotel);
router.get('/delete/:id', isAuthenticated, hotelController.deleteHotel);
router.get('/edit/:id', hotelController.getEditPage);
router.post('/edit/:id', hotelController.postEditPage);
//TODO: Routes

module.exports = router;