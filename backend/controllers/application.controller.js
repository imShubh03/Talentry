import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            });
        }

        // Check if user already applied
        const existApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        // Add application to job's applications array
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Application submitted successfully",
            success: true,
            application: newApplication // Return the created application details
        });

    } catch (error) {
        console.error('Error applying for job:', error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        // Find applications by this user and populate job details
        const applications = await Application.find({ applicant: userId }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } }
            }
        });

        // If no applications are found
        if (!applications) {
            return res.status(404).json({
                message: 'No applications found',
                success: false
            });
        }
        

        // Return success response with applied jobs
        return res.status(200).json({
            success: true,
            jobs: applications
        });

    } catch (error) {
        console.error('Error fetching applied jobs:', error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Fetch job by ID and populate applications along with applicant details
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant', //  'applicant' is a reference in applications
            }
        });

        // Check if job exists
        if (!job) {
            return res.status(404).json({
                message: 'Job not found',
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.error('Error fetching applicants:', error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: 'Status is required',
                success: false
            });
        }

        // Find the application by application ID
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: 'Application not found',
                success: false
            });
        }

        // Update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: 'Application status updated successfully',
            success: true,
            application
        });

    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};
