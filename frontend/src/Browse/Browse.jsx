import Navbar from '@/components/public/Navbar.jsx';
import useGetAllJobs from '@/Custom hooks/useGetAllJobs';
import Footer from '@/Home/Footer.jsx';
import JobCard from '@/Jobs/JobCard.jsx';
import { setSearchedQuery } from '@/redux/jobSlice.js';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Browse() {
    useGetAllJobs();
    const { allJobs } = useSelector((store) => store.job);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Clear query text on unmount
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(''));
        };
    }, [dispatch]);

    return (
        <div className="min-h-screen mt-16 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:bg-slate-800 dark:text-white">
            <Navbar />
            <div className="max-w-7xl mx-auto my-14 px-6 dark:bg-slate-800 dark:text-white">
                {/* Search Results Header */}
                <h1 className="text-2xl font-extrabold text-gray-800 mb-8 dark:bg-slate-800 dark:text-white">
                    Search Results <span className="text-blue-600">({allJobs.length})</span>
                </h1>
                {/* Job Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 dark:bg-slate-800 dark:text-white">
                    {allJobs.length > 0 ? (
                        allJobs.map((job) => (
                            <div
                                key={job._id}
                                className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-lg transition-shadow dark:bg-slate-800 dark:text-white"
                            >
                                <h3 className="text-xl font-bold text-blue-800 dark:bg-slate-800 dark:text-white">
                                    {job?.company?.name}
                                </h3>
                                {/* Job Title */}
                                <h5 className="text-lg font-bold text-gray-800 truncate dark:bg-slate-800 dark:text-white">
                                    {job.title}
                                </h5>

                                {/* Job Meta Information */}
                                <div className="flex flex-wrap items-center gap-2 mt-3 dark:bg-slate-800 dark:text-white dark:border-white">
                                    <span className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full dark:bg-slate-800 dark:text-white">
                                        {job.jobtype}
                                    </span>
                                    <span className="bg-green-100 text-green-600 text-sm font-medium px-3 py-1 rounded-full dark:bg-slate-800 dark:text-white">
                                        {job.salary} LPA
                                    </span>
                                    <span className="bg-yellow-100 text-yellow-600 text-sm font-medium px-3 py-1 rounded-full dark:bg-slate-800 dark:text-white">
                                        {job.location}
                                    </span>
                                </div>

                                {/* Job Posted Date */}
                                <div className="mt-4 text-sm text-gray-600 dark:bg-slate-800 dark:text-white">
                                    <span className="font-semibold dark:bg-slate-800 dark:text-white">Posted On: </span>
                                    {job.createdAt.split('T')[0]}
                                </div>

                                {/* Description */}
                                <p className="mt-4 text-sm text-gray-700 line-clamp-3 dark:bg-slate-800 dark:text-white">
                                    {job.description}
                                </p>

                                {/* View Button */}
                                <button
                                    className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition dark:bg-slate-200 dark:text-black"
                                    onClick={() => navigate(`/jobs/${job._id}`)}
                                >
                                    View Job
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500 dark:bg-slate-800 dark:text-white">
                            No jobs found. Try adjusting your search.
                        </div>
                    )}
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Browse;

