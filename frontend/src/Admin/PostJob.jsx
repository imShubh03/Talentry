import Navbar from '@/components/public/Navbar.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JOB_API_ENDPOINT } from '@/utils/constant.js';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function PostJob() {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobtype: "",
        experience: "",
        positions: 1,
        companyId: "",
    });

    const [loading, setLoading] = useState(false);
    const { companies = [] } = useSelector((store) => store.company);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        if (selectedCompany) {
            setInput({ ...input, companyId: selectedCompany._id });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!input.companyId) {
            toast.error("Please select a company");
            return;
        }
        if (!input.title || !input.description || !input.requirements || !input.salary || !input.location || !input.jobtype || !input.experience || !input.positions) {
            toast.error("Please fill all required fields");
            return;
        }

        try {
            setLoading(true);

            const formattedInput = {
                ...input,
                company: input.companyId,
                requirements: input.requirements.split(","),
            };

            const res = await axios.post(`${JOB_API_ENDPOINT}/post`, formattedInput, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-16 px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={submitHandler} className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900">Post a New Job</h2>
                            <p className="mt-2 text-sm text-gray-600">Fill in the details below to create a new job posting</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-sm font-medium">Job Title</Label>
                                <Input 
                                    id="title" 
                                    type="text" 
                                    name="title" 
                                    value={input.title} 
                                    onChange={changeEventHandler}
                                    className="w-full focus:ring-2 focus:ring-blue-500" 
                                    placeholder="e.g. Senior Developer"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                                <Input 
                                    id="description" 
                                    type="text" 
                                    name="description" 
                                    value={input.description} 
                                    onChange={changeEventHandler}
                                    className="w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Brief job description"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="requirements" className="text-sm font-medium">Requirements</Label>
                                <Input 
                                    id="requirements" 
                                    type="text" 
                                    name="requirements" 
                                    value={input.requirements} 
                                    onChange={changeEventHandler}
                                    className="w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Separate with commas"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="salary" className="text-sm font-medium">Salary</Label>
                                <Input 
                                    id="salary" 
                                    type="text" 
                                    name="salary" 
                                    value={input.salary} 
                                    onChange={changeEventHandler}
                                    className="w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. 10LPA"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                                <Input 
                                    id="location" 
                                    type="text" 
                                    name="location" 
                                    value={input.location} 
                                    onChange={changeEventHandler}
                                    className="w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g.Pune"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="jobtype" className="text-sm font-medium">Job Type</Label>
                                <Input 
                                    id="jobtype" 
                                    type="text" 
                                    name="jobtype" 
                                    value={input.jobtype} 
                                    onChange={changeEventHandler}
                                    className="w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. Full-time"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="experience" className="text-sm font-medium">Experience</Label>
                                <Input 
                                    id="experience" 
                                    type="text" 
                                    name="experience" 
                                    value={input.experience} 
                                    onChange={changeEventHandler}
                                    className="w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. 3 years"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="positions" className="text-sm font-medium">Number of Positions</Label>
                                <Input 
                                    id="positions" 
                                    type="number" 
                                    name="positions" 
                                    value={input.positions} 
                                    onChange={changeEventHandler}
                                    className="w-full focus:ring-2 focus:ring-blue-500"
                                    min="1"
                                />
                            </div>

                            {companies.length > 0 && (
                                <div className="space-y-2 sm:col-span-2">
                                    <Label className="text-sm font-medium">Select Company</Label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Choose a company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {companies.map((company) => (
                                                    <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                                        {company.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        <div className="pt-4">
                            {loading ? (
                                <Button disabled className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                                    Processing...
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                                >
                                    Post Job
                                </Button>
                            )}
                            
                            {companies.length === 0 && (
                                <p className="mt-4 text-sm text-center text-red-600 font-medium">
                                    * Please register a company before posting a job
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PostJob;