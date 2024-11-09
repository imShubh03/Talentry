import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        // Checking if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists.",
                success: false
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        // Send success response
        return res.status(201).json({
            message: "User registered successfully.",
            success: true
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        // Check if the user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User does not exist.",
                success: false
            });
        }

        // Match the password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Incorrect password.",
                success: false
            });
        }

        // Check if the role matches
        if (role !== user.role) {
            return res.status(400).json({
                message: "No account found with this role.",
                success: false
            });
        }

        // Generate token
        const tokenPayload = {
            userId: user._id,
        };

        const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Prepare user data to return
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profile: user.profile
        };

        // Store the token in cookies and return user data
        return res.status(200)
            .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
            .json({
                message: `Welcome back, ${user.name}!`,
                user: userData,
                success: true
            });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false
        });
    }
};

export const logout = async (req, res) => {
    try {
        // Set the "token" cookie to an empty value with an immediate expiration time
        return res.status(200).cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: 'strict' })
            .json({
                message: "Logged out successfully.",
                success: true
            });

    } catch (error) {
        console.error("Error:", error);
        // Return a 500 status code with an error message if something goes wrong
        return res.status(500).json({
            message: "Failed to log out. Please try again later.",
            success: false
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { name, email, bio, skills } = req.body;

        // Get user ID from middleware
        const userId = req.id;

        console.log("User ID from request:", userId); // Debugging log

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }

        // Update only the provided fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (bio) user.bio = bio;

        // Convert skills from a comma-separated string to an array if provided
        if (skills) {
            user.skills = skills.split(",").map(skill => skill.trim());
        }

        // Save the updated user data
        await user.save();

        // Return a success response
        return res.status(200).json({
            message: "Profile updated successfully.",
            success: true,
            user
        });

    } catch (error) {
        console.error("Error:", error);
        // Return a 500 status code with an error message if something goes wrong
        return res.status(500).json({
            message: "Failed to update profile. Please try again later.",
            success: false
        });
    }
};
