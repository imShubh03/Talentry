import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJob, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

// Route for creating a new job
router.route('/post').post(isAuthenticated, postJob);

// Route for fetching all jobs with optional search by keyword
router.route('/alljobs').get(isAuthenticated, getAllJobs);

// Route for fetching a job by its ID
router.route('/jobs/:id').get(isAuthenticated, getJobById );

// Route for admin to fetch all jobs they've posted
router.route('/adminjobs').get(isAuthenticated, getAdminJob );

export default router;
