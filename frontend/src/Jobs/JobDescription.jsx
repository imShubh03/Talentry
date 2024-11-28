import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React from 'react';

const JobDescription = () => {
    const isApplied = true;

    return (
        <div className="max-w-5xl mx-auto mt-7 p-8 shadow-xl rounded-lg bg-gradient-to-b from-white via-gray-100 to-gray-50 border border-gray-200">
            {/* Job Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-4">Frontend Developer</h1>
                    <div className="flex flex-wrap gap-3">
                        <Badge className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                            12 positions
                        </Badge>
                        <Badge className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                            Part-time
                        </Badge>
                        <Badge className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                            24 LPA
                        </Badge>
                    </div>
                </div>
                <Button
                    disabled={isApplied}
                    className={`px-8 py-3 font-semibold text-lg transition-all ${
                        isApplied
                            ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                    } rounded-lg`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-300"></div>

            {/* Job Description */}
            <div>
                <h2 className="text-xl font-bold text-gray-700 mb-6">Job Description</h2>
                <div className="space-y-5">
                    <div className="flex items-center gap-3">
                        <h3 className="text-sm font-semibold text-gray-600">Role:</h3>
                        <span className="text-gray-800">Frontend Developer</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <h3 className="text-sm font-semibold text-gray-600">Location:</h3>
                        <span className="text-gray-800">Remote</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <h3 className="text-sm font-semibold text-gray-600">Experience:</h3>
                        <span className="text-gray-800">2-5 years</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <h3 className="text-sm font-semibold text-gray-600">Skills:</h3>
                        <span className="text-gray-800">React, JavaScript, CSS</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <h3 className="text-sm font-semibold text-gray-600">Posted On:</h3>
                        <span className="text-gray-800">10th Nov 2024</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <h3 className="text-sm font-semibold text-gray-600">Deadline:</h3>
                        <span className="text-gray-800">25th Nov 2024</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;
