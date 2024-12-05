import Navbar from '@/components/public/Navbar.jsx';
import React from 'react';
import Filter from './Filter.jsx';
import JobCard from './JobCard.jsx';
import { useSelector } from 'react-redux';

const jobArray = [1, 2, 3, 4, 5, 6, 7, 8];

function Jobs() {
    const { allJobs } = useSelector(store => store.job);
    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto mt-8 px-4 ">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Sidebar Filter */}
                    <div className="w-full md:w-1/4 p-4 rounded shadow-md">
                        <Filter />
                    </div>

                    {/* Job Listings */}
                    <div className="flex-1 h-[88vh] overflow-y-auto">
                        {allJobs.length <= 0 ? (
                            <span className="block text-center text-gray-500 text-lg">
                                Job not found
                            </span>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {allJobs.map((job) => (
                                    <div key={job?._id} className="p-4  rounded shadow-md hover:bg-gray-100 transition dark:bg-slate-800 dark:text-white">
                                        <JobCard job={job} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Jobs;
