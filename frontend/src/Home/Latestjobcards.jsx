import { Badge } from '@/components/ui/badge';
import React from 'react';
import { MapPin, Clock, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Latestjobcards({ job }) {
    const navigate = useNavigate();

    // Calculate dynamic "days ago"
    const calculateDaysAgo = (date) => {
        const createdAtDate = new Date(date);
        const currentDate = new Date();
        const differenceInTime = currentDate - createdAtDate;
        const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
        return differenceInDays === 0 ? 'Today' : `${differenceInDays} days ago`;
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300 space-y-4 dark:bg-slate-800 dark:text-white">
            {/* Company Section */}
            <div className="flex justify-between items-center dark:bg-slate-800 dark:text-white">
                <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-bold text-gray-800 dark:bg-slate-800 dark:text-white">{job?.company?.name}</h3>
                    <Badge variant="secondary" className="flex items-center space-x-1">
                        <Clock size={14} className="text-gray-500" />
                        <span dark:bg-slate-800 dark:text-white >{calculateDaysAgo(job?.createdAt)}</span>
                    </Badge>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className=' dark:bg-slate-800 dark:text-white' size={16} />
                    <span className="text-sm dark:bg-slate-800 dark:text-white">{job?.location || 'India'}</span>
                </div>
            </div>

            {/* Job Details Section */}
            <div className="space-y-2 ">
                <h2 className="text-xl font-semibold text-gray-900 dark:bg-slate-800 dark:text-white">{job?.title}</h2>
                <p className="text-gray-600 line-clamp-3 dark:bg-slate-800 dark:text-white">{job?.description}</p>
            </div>

            {/* Badges Section */}
            <div className="flex space-x-2">
                <Badge variant="outline" className="flex items-center space-x-1 dark:bg-slate-800 dark:text-white">
                    <Briefcase size={14} />
                    <span>{job?.positions} Positions</span>
                </Badge>
                <Badge className="dark:bg-slate-800 dark:text-white" variant="outline">{job?.jobtype}</Badge>
                <Badge className=" dark:bg-slate-800 dark:text-white" variant="outline">{job?.location}</Badge>
            </div>

            {/* Apply Button */}
            <button
                onClick={() => navigate(`/jobs/${job._id}`)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 mt-4 flex items-center justify-center space-x-2"
            >
                <span>Apply Now</span>
            </button>
        </div>
    );
}

export default Latestjobcards;
