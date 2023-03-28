const { Router } = require('express') ;
const{createAppointment,getAllAppointment,updateAppointment,getAppointment} =  require( "../controllers/appointment");

const router = Router();


router.route("/").
get(getAllAppointment).post(createAppointment);

router.route('/:id').
  patch(updateAppointment).get(getAppointment)


module.exports = router;