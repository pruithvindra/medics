

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
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  //const url = `${req.protocol}://${req.get('host')}/me`;
//  await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, req, res);
});