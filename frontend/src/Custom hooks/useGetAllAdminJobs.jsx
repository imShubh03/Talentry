import { setAllAdminJobs } from '@/redux/jobSlice';
import { JOB_API_ENDPOINT } from '@/utils/constant';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const response = await axios.get(`${JOB_API_ENDPOINT}/adminjobs`, { withCredentials: true });
                if (response.data.success) {
                    dispatch(setAllAdminJobs(response.data.jobs));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchAllAdminJobs();
    }, [dispatch]);
};

export default useGetAllAdminJobs;
