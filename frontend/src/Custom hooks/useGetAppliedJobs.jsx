import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { APPLICATION_API_ENDPOINT } from '@/utils/constant';
import { setAllAppliedJobs } from '@/redux/jobSlice';

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, { withCredentials: true });
                console.log("API Response:", res.data); // Log the entire API response
    
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.jobs));
                } else {
                    console.log("Error: API did not return success.");
                }
            } catch (error) {
                console.log('Error fetching applied jobs:', error);
            }
        };
    
        fetchAppliedJobs();
    }, [dispatch]);
    
}

export default useGetAppliedJobs;