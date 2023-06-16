const user = require( "../models/user");
const factory = require( "./factory_handler");
const catchAsync = require('../utils/catchAsync');
const _ = require('lodash');
// exports.createPatient =factory.createOne(Patient);
exports.getAllUsers=factory.getAll(user);
exports.updateUser1 = factory.updateOne(user);
exports.getUser  = factory.getOne(user);

exports.updateUser = catchAsync(async (req, res, next) => {
  let body = {};

  if(req.user.role === 'admin'){
    const pickedValues = _.pick(req.body, ['name','consultationFee','email','role','photo','description','age', 'expierence', 'gender', 'phone', 'workingDays', 'specialization']);
    body =  pickedValues
 
  }else{ 
    const pickedValues = _.pick(req.body, ['name','consultationFee','photo','description','age', 'expierence', 'gender', 'phone', 'workingDays', 'specialization']);
    body.name =  pickedValues
   
  }
  
  req.body = body
  console.log(req.params.id);
  console.log(req.user.id);
  console.log(req.body);
    const doc =  await user.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
   

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  
  
    });
