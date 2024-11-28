import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';

const Appliedjobs = () => {
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
                    {[1, 2, 3, 4].map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>dd-mm-yyyy</TableCell>
                            <TableCell>Frontend Developer</TableCell>
                            <TableCell>Google</TableCell>
                            <TableCell className="text-right">
                                <Badge className="bg-green-100 text-green-700">Selected</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Appliedjobs;
