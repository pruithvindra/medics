const {signup,signin} = require('../controllers/authController');
const{getAllUsers} =  require( "../controllers/user");
const { Router } = require('express') ;

const router = Router();

router.route("/").
get(getAllUsers);
router.post('/signup', signup).post('/signin', signin);
//router.post('/login', authController.login);




module.exports = router;