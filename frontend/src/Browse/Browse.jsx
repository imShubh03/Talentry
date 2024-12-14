import Navbar from '@/components/public/Navbar.jsx';
import useGetAllJobs from '@/Custom hooks/useGetAllJobs';
import JobCard from '@/Jobs/JobCard';
import { setSearchedQuery } from '@/redux/jobSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

function Browse() {
    useGetAllJobs()
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch()

    // clean up query text when new route
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""))
        }
    },[])

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10 px-4">
                <h1 className="font-bold text-lg mb-6">
                    Search Results ({allJobs.length})
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allJobs.map((job) => (
                        <JobCard  key={job._id}  job={job} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Browse;
