const Hospital = require( "../models/hospital_schema");
const Doctor = require( "../models/doctor_schema");
const mongoose = require( "mongoose");
const { populate } = require("../models/hospital_schema");

exports. createHospital= (req,res,next)=>{
 
    const  hospital = new Hospital({
        description: req.body.description,
        Address:req.body.Address,
        imageUrl: req.body.imageUrl,
        title: req.body.title,
        doctors:(req.body.doctors?? [] ).map(element =>mongoose.Types.ObjectId(element)  ),
        
    }
    );

    hospital.save().then(u=>{
        console.log("done ret");
        res.send(hospital);
    console.log("here 1");

}).catch(err=>{
    res.send(err);
})

    }
    

exports.getHospitals =(req,res,next)=>{


        Hospital.find().
        then( data=>{


 var response = []
 var populatePromise = new Promise((resolve, reject) => {
    console.log(data);
    if(data.length  == 0){
        res.send(    
            response);
    }
  
    data.forEach( (hospital,index, array)=>  {
        if(array.length  == 0){
            console.log("response");
              resolve();
        }
      
        hospital.populate('doctors').then((s)=> {
           response.push(s);
           if (index === array.length -1) resolve();
          // console.log(response);
       }) 
   }
   )
});

populatePromise.then(() => {
 
    res.send(    
        response);
    console.log('All done!');
});

    });


    }

