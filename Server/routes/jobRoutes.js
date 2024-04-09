import express from "express";
import {
  deleteJobs,
  getAllJobs,
  updateJobs,
} from "../controllers/jobController.js";
import { isAuthorized } from "../middleware/auth.js";
import { createJob, getMyjobs } from "../controllers/jobController.js";

const router = express.Router();

router.get("/getAll", getAllJobs);
router.post("/createJob", isAuthorized, createJob);
router.get("/getMyJobs", isAuthorized, getMyjobs);
router.put("/update/:id", isAuthorized, updateJobs);
router.delete("/delete/:id", isAuthorized, deleteJobs);
export default router;
