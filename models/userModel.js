const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const validator = require('validator');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      select: false,
    },
    displayName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide an email'],
    },
    salt: {
      type: String,
      select: false,
    },
    hash: {
      type: String,
      select: false,
    },
    passwordResetToken: String,
    passwordChangedAt: Date,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};



// UserSchema.post('findOneAndDelete', async function (user) {
//   console.log('user', user);

//   if (user) {
//     const classrooms = await Classroom.find({ owner: user._id });

//     console.log('classrooms', classrooms);

//     await Promise.all(
//       classrooms.map(async (classroom) => {
//         const deletedClassroom = await Classroom.findByIdAndDelete(
//           classroom._id
//         );
//         console.log('deletedClassroom', deletedClassroom);
//       })
//     );
//   }
// });

module.exports = mongoose.model('User', UserSchema);
