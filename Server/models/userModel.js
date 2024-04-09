import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must contain atleast 3 characters"],
    maxLength: [15, "Name must not contain more than 3 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone number should contain minimum of 10 Numbers"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8],
    select: false,
  },
  role: {
    type: String,
    required: [true],
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hashing the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare the Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generating jsonwebtoken for auth
userSchema.methods.getJWTtoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

export const User = mongoose.model("User", userSchema);
