import React, { useState } from 'react'
import Navbar from '../public/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'

function Login() {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    });

    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.email || !input.password || !input.role) {
            toast.error("Please fill out all fields.");
            return;
        }

        try {
            const resp = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (resp.data.success) {
                navigate("/");
                toast.success("Login successful!");
            } else {
                toast.error(resp.data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during login.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md bg-white">
                <form onSubmit={submitHandler}>
                    <h1 className="text-2xl text-center font-semibold mb-6">Login</h1>

                    {/* Email Field */}
                    <div className="mb-4">
                        <Label className="block mb-1">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <Label className="block mb-1">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    {/* Radio Button Group */}
                    <div className="mb-4">
                        <Label className="block mb-1">Role</Label>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="mr-2 cursor-pointer"
                                />
                                <Label htmlFor="role-student" className="cursor-pointer">Student</Label>
                            </div>
                            <div className="flex items-center">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="mr-2 cursor-pointer"
                                />
                                <Label htmlFor="role-recruiter" className="cursor-pointer">Recruiter</Label>
                            </div>
                        </div>
                    </div>

                    {/* Login Button */}
                    <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
                        Login
                    </Button>

                    {/* Don't have an account? Signup */}
                    <p className="text-center mt-4">
                        Don’t have an account?{' '}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Signup
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;
