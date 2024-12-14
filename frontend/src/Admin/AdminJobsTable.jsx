import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';

const AdminJobsTable = () => {
    const { allAdminJobs = [], searchJobByText } = useSelector((store) => store.job || {});
    const navigate = useNavigate();
    const [filterJob, setFilterJob] = useState(allAdminJobs);

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
        setFilterJob(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="overflow-x-auto">
            <Table className="w-full border border-gray-300 rounded-lg shadow-sm">
                <TableCaption className="text-sm text-gray-600">
                    List of recently posted jobs
                </TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="text-left text-sm font-semibold">Company Name</TableHead>
                        <TableHead className="text-left text-sm font-semibold">Role</TableHead>
                        <TableHead className="text-left text-sm font-semibold">Date</TableHead>
                        <TableHead className="text-right text-sm font-semibold">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJob.length > 0 ? (
                        filterJob.map((job, index) => (
                            <TableRow key={job._id || index} className="hover:bg-gray-50">
                                <TableCell className="text-gray-800">{job?.company?.name || 'N/A'}</TableCell>
                                <TableCell className="text-gray-600">{job?.title || 'N/A'}</TableCell>
                                <TableCell className="text-gray-600">
                                    {job?.createdAt
                                        ? new Date(job.createdAt).toLocaleDateString()
                                        : 'N/A'}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="text-gray-600 hover:text-gray-800">
                                                <MoreHorizontal className="cursor-pointer" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 bg-white rounded-lg shadow-lg p-2">
                                            <div>
                                                <button
                                                    onClick={() =>
                                                        navigate(`/admin/companies/${job._id}`)
                                                    }
                                                    className="flex items-center gap-2 text-gray-800 hover:bg-gray-100 px-2 py-1 rounded-md w-full"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                    <span className="text-sm">Edit</span>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        navigate(`/admin/jobs/${job._id}/applicants`)
                                                    }
                                                    className="flex items-center gap-2 text-gray-800 hover:bg-gray-100 px-2 py-1 rounded-md w-full"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    <span className="text-sm">Applicants</span>
                                                </button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-600">
                                No companies registered yet.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
