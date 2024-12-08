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
    const [filterCompany, setFilterCompany] = useState(companies)

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if(!searchCompanyByText){
                return true
            }

            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setFilterCompany(filteredCompany)
    }, [companies, searchCompanyByText])

    return (
        <div className="overflow-x-auto">
            <Table className="w-full border border-gray-300 rounded-lg shadow-sm">
                <TableCaption className="text-sm text-gray-600">
                    List of recently registered companies
                </TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="text-left text-sm font-semibold">Logo</TableHead>
                        <TableHead className="text-left text-sm font-semibold">Name</TableHead>
                        <TableHead className="text-left text-sm font-semibold">Date</TableHead>
                        <TableHead className="text-right text-sm font-semibold">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                    filterCompany.length > 0 ? (
                        filterCompany.map((company, index) => (
                            <TableRow key={company._id || index} className="hover:bg-gray-50">
                                <TableCell>
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage
                                            src={company.logo || 'https://via.placeholder.com/150'}
                                            alt={`${company.name} logo`}
                                        />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="text-gray-800">{company.name}</TableCell>
                                <TableCell className="text-gray-600">
                                    {company.createdAt 
                                        ? new Date(company.createdAt).toLocaleDateString() 
                                        : 'N/A'}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-gray-800" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 bg-white rounded-lg shadow-lg p-2">
                                            <div onClick={() => navigate(`/admin/companies/${company._id}`) } className="flex items-center gap-2 text-gray-800 hover:bg-gray-100 px-2 py-1 rounded-md cursor-pointer">
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
                            <TableCell colSpan={4} className="text-center text-gray-600">
                                No companies registered yet.
                            </TableCell>
                        </TableRow>
                    )
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default CompaniesTable;