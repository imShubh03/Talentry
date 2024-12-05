import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { setSingleJob } from '@/redux/jobSlice';
import store from '@/redux/store';
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from '@/utils/constant';
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
                setIsApplied(true); // Update local state
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }],
                };
                dispatch(setSingleJob(updatedSingleJob)); // Realtime updates
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
                    setIsApplied(response.data.job.applications.some((application) => application.applicant === user?._id)); // Sync data
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch, user._id]);

    return (
        <div className="max-w-5xl mx-auto mt-7 p-8 shadow-xl rounded-lg bg-gradient-to-b from-white via-gray-100 to-gray-50 border border-gray-200">
            {/* Job Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-4">{singleJob?.title}</h1>
                    <div className="flex flex-wrap gap-3">
                        <Badge className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                            {singleJob?.positions} positions
                        </Badge>
                        <Badge className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                            {singleJob?.jobtype}
                        </Badge>
                        <Badge className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
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
                <h2 className="text-xl font-bold text-gray-700 mb-6">{singleJob?.title}</h2>
                <div className="space-y-5">
                    <div className="flex items-center gap-3">
                        <h3 className="text-sm font-semibold text-gray-600">Role:</h3>
                        <span className="text-gray-800">{singleJob?.description}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <h3 className="text-sm font-semibold text-gray-600">Location:</h3>
                        <span className="text-gray-800">{singleJob?.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <h3 className="text-sm font-semibold text-gray-600">Experience:</h3>
                        <span className="text-gray-800">{singleJob?.experience}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <h3 className="text-sm font-semibold text-gray-600">Skills:</h3>
                        <span className="text-gray-800">React, JavaScript, CSS</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <h3 className="text-sm font-semibold text-gray-600">Total applicants:</h3>
                        <span className="text-gray-800">{singleJob?.applications?.length}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <h3 className="text-sm font-semibold text-gray-600">Posted On:</h3>
                        <span className="text-gray-800">{singleJob?.createdAt.split('T')[0]}</span>
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
