import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { APPLICATION_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const shortlistingStatus = ["selected", "rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application)

    const updateStatusHandler = async(status, id) => {
        try {
            axios.defaults.withCredentials= true;
            const res = await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update` ,{status},)
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <Table>
                <TableCaption className="text-gray-500">Recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item?.applicant?.name}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>
                                    {
                                        item?.applicant?.profile?.resume ? <a className=" text-blue-600" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeName}</a> : <span>NA</span>
                                    }
                                    
                                </TableCell>
                                <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="cursor-pointer" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {shortlistingStatus.map((status, index) => (
                                                <div
                                                    onClick={() => updateStatusHandler(status, item?._id)}
                                                    key={index}
                                                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                                >
                                                    {status}
                                                </div>
                                            ))}
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;