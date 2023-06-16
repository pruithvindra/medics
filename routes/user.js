const {signup,signin} = require('../controllers/authController');
const{getAllUsers,updateUser,getUser,updateUser1} =  require( "../controllers/user");
const authController = require("../Controllers/authController");
const { Router } = require('express') ;

const router = Router();

router.route("/").
get(authController.protect
    ,(req, res, next)=>{
    console.log(req.query);
next();

}
, authController.accessTo('sub-admin', 'admin'),getAllUsers);
router.post('/signup', signup).post('/signin', signin);
router.route('/:id').
  patch(authController.protect
    ,    
    updateUser).get(authController.protect
    ,getUser)
//router.post('/login', authController.login);




module.exports = router;