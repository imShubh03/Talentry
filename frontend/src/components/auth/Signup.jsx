import React, { useState } from 'react';
import Navbar from '../public/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react'; // Ensure this is correctly imported.

function Signup() {
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        file: null,
    });

    const { loading } = useSelector((state) => state.auth); // Adjust state path if needed
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.name || !input.email || !input.password || !input.role) {
            toast.error('All fields are required.');
            return;
        }

        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('email', input.email);
        formData.append('password', input.password);
        formData.append('role', input.role);
        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            dispatch(setLoading(true));
            const resp = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });

            if (resp.data.success) {
                toast.success(resp.data.message);
                navigate('/login');
            }
        } catch (error) {
            toast.error('Registration failed. Please try again.');
            console.error('Error during signup:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md bg-white">
                <form onSubmit={submitHandler}>
                    <h1 className="text-2xl text-center font-semibold mb-6">Signup</h1>

                    <div className="mb-4">
                        <Label htmlFor="name" className="block mb-1">Name</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={input.name}
                            onChange={changeEventHandler}
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="email" className="block mb-1">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="password" className="block mb-1">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

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

                    <div className="mb-4">
                        <Label htmlFor="file" className="block mb-1">Profile Picture</Label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            accept="image/*"
                            onChange={changeFileHandler}
                            className="w-full border border-gray-300 rounded-md p-2 cursor-pointer"
                        />
                    </div>

                    {loading ? (
                        <Button className="w-full bg-blue-600 text-white py-2 rounded-md" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
                            Signup
                        </Button>
                    )}

                    <p className="text-center mt-4">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
