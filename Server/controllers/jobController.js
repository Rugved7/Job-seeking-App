import { catchAsyncError } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import { Job } from "../models/jobModel.js";

export const getAllJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

// Create Jobs
export const createJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler(
        "Person seeking Jobs is not allowed to access this resources",
        400
      )
    );
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    salary,
    salaryFrom,
    salaryTo,
  } = req.body;
  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please Provide full jobs details", 400));
  }
  if ((!salaryFrom || !salaryTo) && !salary) {
    return next(new ErrorHandler("Plaase Provide the Salary Parameter"));
  }
  if (salaryFrom && salaryTo && salary) {
    return next(new ErrorHandler("Cannot add both Salary Parameters"));
  }
  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    salary,
    salaryFrom,
    salaryTo,
    postedBy,
  });
  res.status(200).json({
    success: true,
    message: "Job Successfully Posted",
    job,
  });
});

// get job by id
export const getMyjobs = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job seeker cannot access this role", 400));
  }
  const myjobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myjobs,
  });
});

// Update Jobs
export const updateJobs = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job seeker cannot access this role", 400));
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Oops! Job not found", 400));
  }
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    job,
    message: "Job Updated Successfully",
  });
});

// Delete Jobs
export const deleteJobs = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job seeker cannot access this role", 400));
  }
  const { id } = req.params;
  let job = await Job.findById(id)
  if (!job) {
    return next(new ErrorHandler("Oops! Job not found", 400));
  }
  await Job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Jobs Deleted Successfully",
  });
});
