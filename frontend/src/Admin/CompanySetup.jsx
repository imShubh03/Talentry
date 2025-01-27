import Navbar from '@/components/public/Navbar.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useGetCompanyById from '@/Custom hooks/useGetCompanyById.jsx';
import { COMPANY_API_ENDPOINT } from '@/utils/constant.js';
import axios from 'axios';
import { ArrowLeft, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    
    const [input, setInput] = useState({
        name: '',
        description: '',
        website: '',
        location: '',
        file: null,
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('description', input.description);
        formData.append('website', input.website);
        formData.append('location', input.location);

        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(
                `${COMPANY_API_ENDPOINT}/update/${params.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                }
            );
            setLoading(false);

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/companies');
            } else {
                toast.error(res.data.message || 'Failed to update company.');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
            toast.error(error.response?.data?.message || 'Something went wrong!');
        }
    };

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || '',
                description: singleCompany.description || '',
                website: singleCompany.website || '',
                location: singleCompany.location || '',
                file: singleCompany.file || null,
            });
        }
    }, [singleCompany]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-800 dark:text-white">
            <Navbar />
            <div className="pt-16 px-4 sm:px-6 lg:px-8 py-8 dark:bg-slate-800 dark:text-white">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={submitHandler} className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-8 dark:bg-slate-800 dark:text-white">
                        <div className="flex items-center gap-4 border-b pb-6">
                            <Button 
                                variant="outline" 
                                onClick={() => navigate('/admin/companies')}
                                className="flex items-center gap-2 hover:bg-gray-700 dark:bg-slate-800 dark:text-white"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </Button>
                            <h1 className="text-2xl font-bold text-gray-900 dark:bg-slate-800 dark:text-white">Company Setup</h1>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Company Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Enter company name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    className="w-full focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Company Description</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    placeholder="Enter company description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    className="w-full focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Company Website</Label>
                                <Input
                                    type="text"
                                    name="website"
                                    placeholder="https://example.com"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    className="w-full focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Company Location</Label>
                                <Input
                                    type="text"
                                    name="location"
                                    placeholder="Enter company location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    className="w-full focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                                />
                            </div>
                            
                            <div className="space-y-2 md:col-span-2">
                                <Label className="text-sm font-medium">Company Logo</Label>
                                <Input
                                    type="file"
                                    name="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                    className="w-full cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:bg-slate-800 dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="pt-6 border-t">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    'Update Company'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CompanySetup;