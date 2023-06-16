const { Router } = require('express') ;
const{createAppointment,getAllAppointment,updateAppointment,getAppointment} =  require( "../controllers/appointment");
const authController = require("../Controllers/authController");
const router = Router();

router.use(authController.protect);
router.route("/").
get(getAllAppointment).post(createAppointment);

router.route('/:id').
  patch(updateAppointment).get(getAppointment)


module.exports = router;