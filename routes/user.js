const {signup,signin} = require('../controllers/authController');
const{getAllUsers,updateUser,getUser,updateUser1} =  require( "../controllers/user");
const authController = require("../controllers/authController");
const { Router } = require('express') ;

const router = Router();

router.route("/").
get(authController.protect
  
, authController.accessTo('sub-admin', 'admin'),getAllUsers);
router.post('/signup', signup).post('/signin', signin);
router.post('/updatePassword',authController.protect,authController.updatePassword ).post(`/forgotPassword`,authController.forgotPassword).post('/resetPassword/:token',(req, res, next)=>{
  console.log("llll");
  console.log(req.params.token);
  next();},authController.resetPassword);

router.route('/:id').
  patch(authController.protect,updateUser).get(authController.protect,getUser)
//router.post('/login', authController.login);




module.exports = router;