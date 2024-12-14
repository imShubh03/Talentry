import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';
import { useSelector } from 'react-redux';

const Appliedjobs = () => {
    const { allAppliedJobs = [] } = useSelector(store => store.job)

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'rejected':
                return 'bg-red-100 text-red-600'; // Red badge for rejected
            case 'selected':
                return 'bg-green-100 text-green-600'; // Green badge for selected
            case 'pending':
                return 'bg-yellow-100 text-yellow-600'; // Yellow badge for pending
            default:
                return 'bg-gray-100 text-gray-600'; // Default gray badge
        }
    };

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg p-4">
            <Table className="min-w-full">
                <TableCaption className="text-right">*List of applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? (
                            <span>not applied to any job</span>
                        ) : (
                            allAppliedJobs.map((appliedJob) => (
                                <TableRow key={appliedJob._id}>
                                    <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                                    <TableCell>{appliedJob.job?.title}</TableCell>
                                    <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge className={getStatusClass(appliedJob.status)}>
                                            {appliedJob.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default Appliedjobs;
