const { Router } = require('express') ;
const{createDoctor, getDoctor,getAllDoctor,updateDoctor} =  require( "../controllers/Doctor");
const authController = require("../Controllers/authController");
const router = Router();

router.use(authController.protect);
router.route("/").
post(createDoctor).get(getAllDoctor);

router.route('/:id').patch(updateDoctor).get(getDoctor);


module.exports = router;