

// import crypto from 'crypto';
// import { promisify } from 'util';
const  jwt = require( 'jsonwebtoken');
const User = require ( './../models/user');
const catchAsync = require( './../utils/catchAsync');
//import AppError from './../utils/appError.js';

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
  
    // res.cookie('jwt', token, {
    //   expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    //   httpOnly: true, // cookie cannot be accessed or modified in any way by the browser
    //   secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    // });
  
    // Remove password from output
    user.password = undefined;
  
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  };


exports.signup = catchAsync(async (req, res, next) => {
  console.log(req.body.age);
 let  newUser ;
  if(req.body.role !== undefined && req.body.role ==='patient'){
    newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      role:req.body.role,
      photo: req.body.photo,
      gender: req.body.gender,
      address: req.body.address,
      emergencyContact:req.body.emergencyContact,
      phone: req.body.phone,
      passwordConfirm: req.body.passwordConfirm
    });
  
  } else  if(req.body.role !== undefined && req.body.role ==='doctor'){
    newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      role:req.body.role,
      photo: req.body.photo,
      gender: req.body.gender,
      phone: req.body.phone,
      consultationFee: req.body.consultationFee,
      description: req.body.description,
      expierence: req.body.expierence,
      specialization: req.body.specialization,
      workingDays: req.body.workingDays,
      passwordConfirm: req.body.passwordConfirm,
    });
  
  }
  else{
    newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,role:req.body.role,
      password: req.body.password, gender: req.body.gender,
      passwordConfirm: req.body.passwordConfirm
    });
  }
  

  //const url = `${req.protocol}://${req.get('host')}/me`;
//  await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, req, res);
});

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});
