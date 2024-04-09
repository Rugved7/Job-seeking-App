import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Provide Title"],
    minLength: [3],
    maxLength: [20],
  },
  description: {
    type: String,
    required: true,
    minLength: [20],
    maxLength: [300],
  },
  category: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    minLength: [5],
    maxLength: [9],
  },
  salaryFrom: {
    type: Number,
    minLength: [4],
    maxLength: [9],
  },
  salaryTo: {
    type: Number,
    minLength: [4],
    maxLength: [9],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
