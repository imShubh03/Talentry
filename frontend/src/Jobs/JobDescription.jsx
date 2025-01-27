import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { setSingleJob } from '@/redux/jobSlice.js';
import store from '@/redux/store.js';
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from '@/utils/constant.js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const JobDescription = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const jobId = params._id;

    const { user } = useSelector((store) => store.auth);
    const { singleJob } = useSelector((store) => store.job);

    const isInitiallyApplied = singleJob?.applications?.some((application) => application.applicant === user?._id) || false;

    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }],
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log('error', error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const response = await axios.get(`${JOB_API_ENDPOINT}/jobs/${jobId}`, { withCredentials: true });
                if (response.data.success) {
                    dispatch(setSingleJob(response.data.job));
                    setIsApplied(response.data.job.applications.some((application) => application.applicant === user?._id));
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch, user._id]);

    return (
        <div className="max-w-4xl mx-auto  p-8 rounded-xl shadow-2xl bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-200 dark:bg-slate-800 dark:text-white">
            {/* Job Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">{singleJob?.title}</h1>
                    <div className="flex flex-wrap gap-3 mt-4">
                        <Badge className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
                            {singleJob?.positions} positions
                        </Badge>
                        <Badge className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-semibold">
                            {singleJob?.jobtype}
                        </Badge>
                        <Badge className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                            {singleJob?.salary} LPA
                        </Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? undefined : applyJobHandler}
                    disabled={isApplied}
                    className={`px-8 py-3 font-semibold text-lg transition-all ${
                        isApplied
                            ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl'
                    } rounded-full`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-300"></div>

            {/* Job Description */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Job Details</h2>
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <h3 className="text-md font-medium text-gray-600">Role:</h3>
                        <span className="text-gray-800">{singleJob?.description}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <h3 className="text-md font-medium text-gray-600">Location:</h3>
                        <span className="text-gray-800">{singleJob?.location}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <h3 className="text-md font-medium text-gray-600">Experience:</h3>
                        <span className="text-gray-800">{singleJob?.experience}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <h3 className="text-md font-medium text-gray-600">Skills:</h3>
                        <span className="text-gray-800">React, JavaScript, CSS</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <h3 className="text-md font-medium text-gray-600">Total Applicants:</h3>
                        <span className="text-gray-800">{singleJob?.applications?.length}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <h3 className="text-md font-medium text-gray-600">Posted On:</h3>
                        <span className="text-gray-800">{singleJob?.createdAt.split('T')[0]}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <h3 className="text-md font-medium text-gray-600">Deadline:</h3>
                        <span className="text-gray-800">25th Nov 2024</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;
