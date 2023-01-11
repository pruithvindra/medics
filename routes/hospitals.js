const { Router } = require('express') ;
const{createHospital, getHospitals} =  require( "../controllers/hospital");

const router = Router();

router.post('/createHospital',createHospital);
router.get('/Hospitals',getHospitals);




module.exports = router;