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
        <div className="overflow-x-auto dark:bg-slate-800 dark:text-white">
            <Table className="w-full border border-gray-300 rounded-lg shadow-sm">
                <TableCaption className="text-sm text-gray-600">
                    List of recently posted jobs
                </TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="text-left text-sm font-semibold dark:bg-slate-800 dark:text-white">Company Name</TableHead>
                        <TableHead className="text-left text-sm font-semibold dark:bg-slate-800 dark:text-white">Role</TableHead>
                        <TableHead className="text-left text-sm font-semibold dark:bg-slate-800 dark:text-white">Date</TableHead>
                        <TableHead className="text-right text-sm font-semibold dark:bg-slate-800 dark:text-white">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJob.length > 0 ? (
                        filterJob.map((job, index) => (
                            <TableRow key={job._id || index} className="hover:bg-gray-50">
                                <TableCell className="text-gray-800  dark:bg-slate-800 dark:text-white">{job?.company?.name || 'N/A'}</TableCell>
                                <TableCell className="text-gray-600  dark:bg-slate-800 dark:text-white">{job?.title || 'N/A'}</TableCell>
                                <TableCell className="text-gray-600 dark:bg-slate-800 dark:text-white">
                                    {job?.createdAt
                                        ? new Date(job.createdAt).toLocaleDateString()
                                        : 'N/A'}
                                </TableCell>
                                <TableCell className="text-right  dark:bg-slate-800 dark:text-white">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="text-gray-600 hover:text-gray-800">
                                                <MoreHorizontal className="cursor-pointer dark:bg-slate-800 dark:text-white" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 bg-white rounded-lg shadow-lg p-2">
                                            <div className=' dark:bg-slate-800 dark:text-white'>
                                                <button
                                                    onClick={() =>
                                                        navigate(`/admin/companies/${job._id}`)
                                                    }
                                                    className="flex items-center gap-2 text-gray-800 hover:bg-gray-100 px-2 py-1 rounded-md w-full dark:bg-slate-800 dark:text-white"
                                                >
                                                    <Edit2 className="w-4 h-4 dark:bg-slate-800 dark:text-white" />
                                                    <span className="text-sm dark:bg-slate-800 dark:text-white">Edit</span>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        navigate(`/admin/jobs/${job._id}/applicants`)
                                                    }
                                                    className="flex items-center gap-2 text-gray-800 hover:bg-gray-100 px-2 py-1 rounded-md w-full dark:bg-slate-800 dark:text-white"
                                                >
                                                    <Eye className="w-4 h-4 dark:bg-slate-800 dark:text-white" />
                                                    <span className="text-sm dark:bg-slate-800 dark:text-white">Applicants</span>
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
