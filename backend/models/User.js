const mongoose = require("mongoose");

const bcrypt = require("bcryptjs"); //used for hashing passwords!

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true } // automatically adds two fields in DB that is created_at and updated_at
);

//hash password before saving it in DB!

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//compare Passowrds
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('User', userSchema);
