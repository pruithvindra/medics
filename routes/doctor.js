const { Router } = require('express') ;
const{createDoctor, getDoctors} =  require( "../controllers/Doctor");

const router = Router();

router.post('/createDoctor',createDoctor);
router.get('/doctors',getDoctors);




module.exports = router;