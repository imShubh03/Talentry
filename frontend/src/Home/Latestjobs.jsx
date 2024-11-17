import React from 'react';
import Latestjobcards from '../Home/Latestjobcards.jsx';

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

function Latestjobs() {
    return (
        <div className=' max-w-7xl mx-auto my-10 dark:bg-slate-800 dark:text-white'>
            <h1 className="text-center text-xl font-semibold ">Latest Job Openings</h1>
            {/* Cards */}
            <div className="grid  sm:grid-cols-2 md:grid-cols-3 gap-3 m-4">
                {
                    randomJobs.slice(0, 6).map((item, ind) => <Latestjobcards key={ind} />)
                }
            </div>
        </div>
    );
}

export default Latestjobs;
