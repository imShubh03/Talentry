import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit2, MoreHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies = [], searchCompanyByText } = useSelector(store => store.company || {});
    const navigate = useNavigate();
    const [filterCompany, setFilterCompany] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Adjust this number as needed

    useEffect(() => {
        // Filter companies based on search text
        const filteredCompany = companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        
        setFilterCompany(filteredCompany);
        setCurrentPage(1); // Reset to first page when filter changes
    }, [companies, searchCompanyByText]);

    // Calculate pagination
    const totalPages = Math.ceil(filterCompany.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCompanies = filterCompany.slice(startIndex, endIndex);

    return (
        <div className="space-y-4 dark:bg-slate-800 dark:text-white">
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <Table>
                    <TableCaption className="text-sm text-gray-600">
                        Showing {filterCompany.length} companies
                    </TableCaption>
                    <TableHeader>
                        <TableRow className="bg-gray-50 ">
                            <TableHead className="text-left text-sm font-semibold dark:bg-slate-800 dark:text-white">Logo</TableHead>
                            <TableHead className="text-left text-sm font-semibold dark:bg-slate-800 dark:text-white">Name</TableHead>
                            <TableHead className="text-left text-sm font-semibold dark:bg-slate-800 dark:text-white">Date</TableHead>
                            <TableHead className="text-right text-sm font-semibold dark:bg-slate-800 dark:text-white">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentCompanies.length > 0 ? (
                            currentCompanies.map((company, index) => (
                                <TableRow key={company._id || index} className="hover:bg-gray-50">
                                    <TableCell>
                                        <Avatar className="w-10 h-10 dark:bg-slate-800 dark:text-white">
                                            <AvatarImage
                                                src={company.logo || 'https://via.placeholder.com/150'}
                                                alt={`${company.name} logo`}
                                            />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium dark:bg-slate-800 dark:text-white">{company.name}</TableCell>
                                    <TableCell className="text-gray-600 dark:bg-slate-800 dark:text-white">
                                        {company.createdAt 
                                            ? new Date(company.createdAt).toLocaleDateString() 
                                            : 'N/A'}
                                    </TableCell>
                                    <TableCell className="text-right dark:bg-slate-800 dark:text-white">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-gray-800 dark:bg-slate-800 dark:text-white" />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32 p-2">
                                                <div 
                                                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                    className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-100"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                    <span className="text-sm">Edit</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                    No companies found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-1 text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default CompaniesTable;