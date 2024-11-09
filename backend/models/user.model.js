import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },
    profile: {
        bio: {
            type: String,
            default: ""
        },
        skills: [{
            type: String
        }],
        resume: {
            type: String // URL to the resume file
        },
        resumeName: {
            type: String
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },
        profilePhoto: {
            type: String, // URL to the profile photo
            default: ""
        }
    }
}, { timestamps: true }); // Adds 'createdAt' and 'updatedAt' timestamps

const User = mongoose.model("User", userSchema);

export default User;
