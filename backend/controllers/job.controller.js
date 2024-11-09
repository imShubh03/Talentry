import Job from "../models/job.model.js";

// "company": "6728bfcbff0ed6c0fe89cd5a", im getting id but i want all details like name, descr
// so i use populate

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, experience, salary, location, jobtype, positions, company } = req.body;

        if (!title || !description || !requirements || !experience || !salary || !location || !jobtype || !positions || !company) {
            return res.status(400).json({
                message: 'All fields are required',
                success: false
            });
        }

        const newJob = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            experience,
            salary,
            location,
            jobtype,
            positions,
            company,
            created_by: req.id // Ensuring req.id from isAuthenticated is used
        });

        return res.status(201).json({
            message: 'New Job posted successfully',
            success: true,
            job: newJob 
        });
        
    } catch (error) {
        console.error('Error posting job:', error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};


export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query)
            .populate({
                path: "company"
            })
            .sort({ createdAt: -1 });
        
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: 'Jobs not found',
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.error('Error fetching jobs:', error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};


export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        
        // Find job by ID
        const job = await Job.findById(jobId)

        // Check if job exists
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Return job details if found
        return res.status(200).json({
            job,
            success: true
        });

    } catch (error) {
        console.error('Error fetching job by ID:', error);
        
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


export const getAdminJob = async (req, res) => {
    try {
        const adminId = req.id;

        // Find jobs created by the logged-in admin
        const jobs = await Job.find({ created_by: adminId })

        // If no jobs are found for the admin
        if (!jobs) {
            return res.status(404).json({
                message: "No jobs found for this admin",
                success: false
            });
        }

        // Return jobs created by the admin
        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.error('Error fetching admin jobs:', error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
