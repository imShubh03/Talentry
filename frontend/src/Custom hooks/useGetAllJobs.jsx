import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_ENDPOINT } from '@/utils/constant';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job)

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const response = await axios.get(`${JOB_API_ENDPOINT}/alljobs?keyword=${searchedQuery}`, { withCredentials: true });
                if (response.data.success) {
                    dispatch(setAllJobs(response.data.jobs));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchAllJobs();
    }, []);
};

export default useGetAllJobs;
