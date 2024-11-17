import { Badge } from '@/components/ui/badge';
import React from 'react';
import { MapPin } from 'lucide-react';

function Latestjobcards() {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200 dark:bg-slate-800 dark:text-white">
            {/* Company Section */}
            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800 dark:bg-slate-800 dark:text-white">Company Name</h2>
                    <span className="text-sm text-blue-600 font-medium">2 days ago</span>
                </div>
                <div className="flex items-center mt-1 text-gray-600">
                    <MapPin size={16} className="mr-1 dark:bg-slate-800 dark:text-white" />
                    <p className="text-sm dark:bg-slate-800 dark:text-white">India</p>
                </div>
            </div>

            {/* Job Details Section */}
            <div className="mb-4">
                <h1 className="text-xl font-bold text-blue-700 mb-2">Job Title</h1>
                <p className="text-sm text-gray-600 leading-relaxed dark:bg-slate-800 dark:text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, eum.
                </p>
            </div>

            {/* Badges Section */}
            <div className="flex flex-wrap gap-2 ">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-slate-800 dark:text-white dark:border-white">
                    12 positions
                </Badge>
                <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100 dark:bg-slate-800 dark:text-white dark:border-white">
                    Full Time
                </Badge>
                <Badge variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-slate-800 dark:text-white dark:border-white">
                    Remote
                </Badge>
            </div>

            {/* Apply Button */}
            <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200">
                    Apply Now
                </button>
            </div>
        </div>
    );
}

export default Latestjobcards;