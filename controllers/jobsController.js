import jobsModel from "../models/jobsModel.js";

// create job controller
export const createJobConstroller = async (req, res) => {
    const { company, position, status, workType, workLocation } = req.body;
    // check for empty fields
    if (!company || !position || !workLocation) {
        res.status(400).json({
            success: false,
            message: "Please fill all the fields",
        });
    }
    req.body.createdBy = req.user._id;
    // create job
    const job = await jobsModel.create(req.body);
    res.status(201).json({
        success: true,
        message: "Job created successfully",
        job,
    });
};

// get all jobs controller
export const getAllJobsController = async (req, res, next) => {
    const jobs = await jobsModel.find({ createdBy: req.user.userId }).sort("-createdAt");
    res.status(200).json({
        totalJobs: jobs.length,
        success: true,
    })
};