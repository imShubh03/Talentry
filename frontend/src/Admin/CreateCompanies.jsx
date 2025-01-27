import Navbar from '@/components/public/Navbar.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { setSingleCompany } from '@/redux/companySlice.js';
import { COMPANY_API_ENDPOINT } from '@/utils/constant.js';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CreateCompanies = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState(''); // Initialize with empty string
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        // Add validation to ensure company name is not empty
        if (!companyName.trim()) {
            toast.error('Company name is required');
            return;
        }

        try {
            const res = await axios.post(
                `${COMPANY_API_ENDPOINT}/register`,
                { 
                    name: companyName.trim() // Use 'name' instead of 'companyName'
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            } else {
                toast.error(res?.data?.message || 'Failed to register company.');
            }
        } catch (error) {
            console.error('Error:', error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || 'Something went wrong!');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Your Company Name</h2>
                    <p className="text-gray-600 mt-2">
                        What would you like to name your company? You can change this later.
                    </p>
                </div>

                <div className="mb-4">
                    <Label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
                        Company Name
                    </Label>
                    <Input
                        id="company-name"
                        type="text"
                        placeholder="e.g., Microsoft"
                        className="mt-1 block w-full border-black"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                <div className="flex justify-center gap-4 mt-6">
                    <Button
                        variant="outline"
                        onClick={() => navigate('/admin/companies')}
                        className="bg-gray-100 text-gray-700  hover:bg-gray-200 px-6 py-2"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={registerNewCompany}
                        className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2"
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreateCompanies;