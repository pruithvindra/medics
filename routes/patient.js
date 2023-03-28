const { Router } = require('express') ;
const{createPatient,getAllPatients,updatePatient,getPatient} =  require( "../controllers/patient");

const router = Router();


router.route("/").
get(getAllPatients).
post(createPatient);

router.route('/:id').
  patch(updatePatient).get(getPatient);


module.exports = router;