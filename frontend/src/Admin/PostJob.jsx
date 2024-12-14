import Navbar from '@/components/public/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JOB_API_ENDPOINT } from '@/utils/constant';
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
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-full min-h-screen bg-gray-100'>
                <form onSubmit={submitHandler} className='w-full sm:w-3/4 lg:w-1/2 bg-white p-8 rounded-lg shadow-lg'>
                    <h2 className='text-2xl font-semibold text-center mb-6'>Post a Job</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" type="text" name="title" value={input.title} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" type="text" name="description" value={input.description} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label htmlFor="requirements">Requirements (comma-separated)</Label>
                            <Input id="requirements" type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label htmlFor="salary">Salary</Label>
                            <Input id="salary" type="text" name="salary" value={input.salary} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" type="text" name="location" value={input.location} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label htmlFor="jobtype">Job Type</Label>
                            <Input id="jobtype" type="text" name="jobtype" value={input.jobtype} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label htmlFor="experience">Experience</Label>
                            <Input id="experience" type="text" name="experience" value={input.experience} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label htmlFor="positions">Positions</Label>
                            <Input id="positions" type="number" name="positions" value={input.positions} onChange={changeEventHandler} />
                        </div>
                        {companies.length > 0 && (
                            <Select onValueChange={selectChangeHandler}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a company" />
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
                        )}
                    </div>
                    <div className="mt-6 text-center">
                        {loading ? (
                            <Button className="w-full my-4">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4">
                                Post new Job
                            </Button>
                        )}
                        {companies.length === 0 && <p className='text-sm text-red-600'>*Please register a company first</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PostJob;
