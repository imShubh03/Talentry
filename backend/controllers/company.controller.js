import Company from "../models/company.model.js";

import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Name is required",
                success: false
            });
        }
        // Check if company already exists
        const existCompany = await Company.findOne({ name });
        if (existCompany) {
            return res.status(400).json({
                message: "Company already exists",
                success: false
            });
        }

        // Ensure `req.id` is set and valid
        if (!req.id) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        // Create the new company
        const newCompany = await Company.create({
            name: name,
            userId: req.id
        });

        // Respond with success and the created company details
        return res.status(201).json({
            message: "Company registered successfully",
            success: true,
            company: newCompany
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false
        });
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged-in user ID from authentication middleware

        // Find companies associated with the logged-in user
        const companies = await Company.find({ userId });

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "No companies found for this user.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Companies retrieved successfully.",
            success: true,
            companies
        });

    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false
        });
    }
};


export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id; // Company ID from route parameters

        // Find company by ID
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company retrieved successfully.",
            success: true,
            company
        });

    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.id;

        // Extract fields from the request body
        const { name, description, location, website } = req.body;
        const file = req.file;

        let logo;

        // Upload the file to Cloudinary if provided
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                folder: "company_logos", // Optional: specify a folder for better organization
            });
            logo = cloudResponse.secure_url;
        }

        // Prepare the fields for updating
        const updatedData = {};
        if (name) updatedData.name = name;
        if (description) updatedData.description = description;
        if (location) updatedData.location = location;
        if (website) updatedData.website = website;
        if (logo) updatedData.logo = logo;

        // Update the company by ID with the provided data
        const updatedCompany = await Company.findByIdAndUpdate(companyId, updatedData, { new: true });

        if (!updatedCompany) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company updated successfully.",
            success: true,
            updatedCompany,
        });
    } catch (error) {
        console.error("Error updating company:", error);
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
        });
    }
};