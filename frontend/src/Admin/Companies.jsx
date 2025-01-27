import Navbar from '@/components/public/Navbar.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import CompaniesTable from './CompaniesTable.js';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/Custom hooks/useGetAllCompanies.js';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice.js';

const Companies = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [input, setInput] = useState("");
    useGetAllCompanies();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input])

    return (
        <div className="min-h-screen bg-gray-5 dark:bg-slate-800 dark:text-white">
            <Navbar />
            <div className="pt-16"> {/* Add padding-top to prevent navbar overlap */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 dark:bg-slate-800 dark:text-white">
                        <Input
                            className="w-full sm:w-72 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:text-white"
                            placeholder="Filter by name..."
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button
                            onClick={() => navigate("/admin/companies/create")}
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                        >
                            New Company
                        </Button>
                    </div>

                    {/* Table Section with shadow and rounded corners */}
                    <div className="bg-white rounded-lg shadow-md">
                        <CompaniesTable />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Companies;