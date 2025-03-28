import express from 'express';
import userAuth from '../middlewares/authmiddleware.js';
import { createJobConstroller, getAllJobsController } from '../controllers/jobsController.js';

const router = express.Router();

//routes
//create jobs
router.post('/create-job', userAuth, createJobConstroller);

//get jobs
router.get('/get-job', userAuth, getAllJobsController);;

export default router;