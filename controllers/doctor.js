const Doctor = require( "../models/doctor_schema");

exports. createDoctor = (req,res,next)=>{

    const  doctor = new Doctor({
        description: req.body.description,

        expierence:req.body.expierence,

        imageUrl: req.body.imageUrl,

        title: req.body.title,
        
    }
    );
    doctor.save().then(u=>{
        console.log("done ret");
        res.send(doctor);
    console.log("here 1");

}).catch(err=>{
    res.send(err);
})

    }
    exports .getDoctors=(req,res,next)=>{


    Doctor.find().then(d=>{
        res.send(d);
    });


    }

