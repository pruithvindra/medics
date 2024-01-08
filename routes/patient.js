const { Router } = require('express') ;
const{createPatient,getAllPatients,updatePatient,getPatient} =  require( "../controllers/patient");
const authController = require("../controllers/authController");
const router = Router();

router.use(authController.protect);

router.route("/").
get(getAllPatients).
post(createPatient);

router.route('/:id').
  patch(updatePatient).get(getPatient);


module.exports = router;