const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authControler');
const hotelController = require('./controllers/hotelController');

router.get('/', homeController.getHomePage);

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.get('/logout', authController.getLogout);


router.get('/create', hotelController.getCreatePage);
router.post('/create', hotelController.postCreatePage);
//TODO: Routes

module.exports = router;