import Navbar from '@/components/public/Navbar.jsx';
import React, { useEffect, useState } from 'react';
import Filter from './Filter.jsx';
import JobCard from './JobCard.jsx';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

function Jobs() {
    const { allJobs = [], searchedQuery } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState([]);

    useEffect(() => {
        // Filter jobs based on searchedQuery
        const filteredJobs = searchedQuery
            ? allJobs.filter((job) =>
                [job.title, job.description, job.location]
                    .filter(Boolean) // Ensure no undefined values
                    .some((field) =>
                        field.toLowerCase().includes(searchedQuery.toLowerCase())
                    )
            )
            : allJobs;

        setFilterJobs(filteredJobs);
    }, [allJobs, searchedQuery]);

    return (
        <div className="bg-gray-50 dark:bg-slate-900 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto mt-8 px-4">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar Filter */}
                    <div className="w-full md:w-1/4 p-4 rounded-lg shadow-md bg-white dark:bg-slate-800">
                        <Filter />
                    </div>

                    {/* Job Listings */}
                    <div className="flex-1 h-[88vh] overflow-y-auto bg-white dark:bg-slate-800 rounded-lg shadow-md p-4">
                        {filterJobs.length === 0 ? (
                            <span className="block text-center text-gray-500 dark:text-gray-400 text-lg">
                                Job not found
                            </span>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        key={job?._id}
                                        className="p-4 rounded-lg shadow-md bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition"
                                    >
                                        <JobCard job={job} />
                                    </motion.div>
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
