import Navbar from '@/components/public/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useGetCompanyById from '@/Custom hooks/useGetCompanyById.jsx';
import { COMPANY_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
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
                file: singleCompany.file || null, // Clear file input on load
            });
        }
    }, [singleCompany]);

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
                <form onSubmit={submitHandler}>
                    <div className="flex items-center gap-4 mb-6">
                        <Button variant="outline" onClick={() => navigate('/admin/companies')}>
                            <ArrowLeft />
                            <span className="ml-2">Back</span>
                        </Button>
                        <h1 className="text-2xl font-semibold text-gray-800">Company Setup</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Enter company name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Company Description</Label>
                            <Input
                                type="text"
                                name="description"
                                placeholder="Enter company description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Company Website</Label>
                            <Input
                                type="text"
                                name="website"
                                placeholder="https://example.com"
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Company Location</Label>
                            <Input
                                type="text"
                                name="location"
                                placeholder="Enter company location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            type="submit"
                            disabled={loading}
                            className={`bg-blue-600 text-white hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Updating...' : 'Update'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
