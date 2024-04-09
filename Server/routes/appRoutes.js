import express from "express";
import {
  applicantGetAllApplications,
  createApplication,
  employerGetAllApplications,
  jobSeekerDeleteApplication,
} from "../controllers/appController.js";
import { isAuthorized } from "../middleware/auth.js";
const router = express.Router();

router.get("/jobseeker/getAll", isAuthorized, applicantGetAllApplications);
router.get("/employer/getAll", isAuthorized, employerGetAllApplications);
router.delete("/delete/:id", isAuthorized, jobSeekerDeleteApplication);
router.post("/createApplication", isAuthorized, createApplication);
export default router;
