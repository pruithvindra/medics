//const  crypo = require(  'crypto';
const  bcrypt = require('bcryptjs');
const  mongoose = require(  'mongoose');
const  validator = require(  'validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provied a valid email']
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'sub-admin', 'admin'],
    default: 'sub-admin'
  },
  password: {
    type: String,
    required: [true, 'Please provied a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  //patient
  age: { type: Number ,
    select: true,
    required:[function() {
      return this.role === 'patient' || this.role === 'doctor'
    }, 'age is required!' ],
  
  },
   //patient
    gender: { type: String,
      required:[true, 'gender is required!' ],
      enum: ['male', 'female', 'other']},
     // all
    phone: { 
      type: String,  
      required:[true,'phone number is required!' ],
  }, 
  createdAt: {
    type: Date,
    default: Date.now(),
  //  select: false
  },
    //patient
    address: { type: String }, 
    //patient
    emergencyContact: {
        name: { type: String },
        phone: { type: String },
        relation: { type: String }
    },
    //dr
    workingDays: {
      type: [String],
      // required: [function() {
      //   return this.role === 'doctor'
      // }, 'workingDays is required!' ],
      default : function() {
        if( this.role === 'doctor' ){
         return  [1,2,3,4,5,6,7]
        }
     }
      
    },
    //dr
    specialization: {
      type: String,
      // required: [function() {
      //   return this.role === 'doctor'
      // }, 'specialization is required!' ],
  
      default : function() {
         if( this.role === 'doctor' ){
          return "general med"
         }
      }
    },
    //dr
    expierence: {  
      type: Number,
       required: [function() {
        return this.role === 'doctor'
      }, 'expierence is required!' ],
    },
    //dr
    description: {
      type: String,
      required: [function() {
        return this.role === 'doctor'
      }, 'description is required!' ],
    },
    //dr
    consultationFee: {
      type: Number,
      required: [function() {
        return this.role === 'doctor'
      }, 'consultationFee is required!' ],
    },
  passwordChangedAt: Date,
//   passwordResetToken: String,
//   passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  console.log ("000-0-000");
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  var vaoo = await bcrypt.compare(candidatePassword, userPassword)
  console.log(vaoo);
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWTTimestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};

// userSchema.methods.createPasswordResetToken = function() {
//   const resetToken = crypo.randomBytes(32).toString('hex');

//   this.passwordResetToken = crypo
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex');

//   // console.log({ resetToken }, this.passwordResetToken);

//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

//   return resetToken;
// };

const User = mongoose.model('User', userSchema);

module.exports =User;
