import Navbar from '@/components/public/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useGetAllAdminJobs from '@/Custom hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';
import AdminJobsTable from './AdminJobsTable';

const AdminJobs = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [input, setInput] = useState("");
    useGetAllAdminJobs()

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input])

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto my-10 p-4">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <Input
                        className="w-72 border-gray-300 rounded-md shadow-sm"
                        placeholder="Filter by name, role   "
                        onChange = {(e) => setInput(e.target.value)}
                    />
                    <Button
                        onClick={() => navigate("/admin/jobs/create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
                    >
                        New Job
                    </Button>
                </div>

                {/* Table Section */}
                <AdminJobsTable />
            </div>
        </div>
    );
};

export default AdminJobs;
