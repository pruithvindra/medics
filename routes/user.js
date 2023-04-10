const {signup} = require('../controllers/authController');
const { Router } = require('express') ;

const router = Router();


router.post('/signup', signup);
//router.post('/login', authController.login);




module.exports = router;