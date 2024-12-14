import React from 'react';
import Latestjobcards from '../Home/Latestjobcards.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Latestjobs() {
    const { allJobs } = useSelector(store => store.job);
    const navigate = useNavigate()
    return (
        <div className=' max-w-7xl mx-auto my-10 dark:bg-slate-800 dark:text-white'>
            <h1 className="text-center text-xl font-semibold ">Latest Job Openings</h1>
            {/* Cards */}
            <div className="grid  sm:grid-cols-2 md:grid-cols-3 gap-3 m-4">
                {
                    allJobs.length <= 0 ? <span>no job available</span> : allJobs?.slice(0, 6).map((job) => <Latestjobcards  key={job._id} job={job} />)
                }
            </div>
        </div>
    );
}

export default Latestjobs;
