import mongoose from "mongoose";
import validator from "validator";

const appSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2],
    maxLength: [15],
  },
  email: {
    type: String,
    required: true,
    validator: [validator.isEmail, "Please provide a valid email"],
  },
  coverLetter: {
    type: String,
    required: true,
    maxLength: [500],
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  applicantId: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Job Seeker"],
      required: true,
    },
  },
  employerId: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer"],
      required: true,
    },
  },
});

export const Application = mongoose.model("Application", appSchema);
