import Navbar from '@/components/public/Navbar.jsx';
import JobCard from '@/Jobs/JobCard';
import React from 'react';

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

function Browse() {
    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10 px-4">
                <h1 className="font-bold text-lg mb-6">
                    Search Results ({randomJobs.length})
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {randomJobs.map((item, index) => (
                        <JobCard key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Browse;
