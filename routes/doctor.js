const { Router } = require('express') ;
const{createDoctor, getDoctor,getAllDoctor,updateDoctor} =  require( "../controllers/Doctor");

const router = Router();


router.route("/").
post(createDoctor).get(getAllDoctor);

router.route('/:id').patch(updateDoctor).get(getDoctor);


module.exports = router;