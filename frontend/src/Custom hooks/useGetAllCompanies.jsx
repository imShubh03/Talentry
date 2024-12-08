import { setCompanies } from '@/redux/companySlice';
import { COMPANY_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(`${COMPANY_API_ENDPOINT}/companies`, { withCredentials: true });
                if (response.data.success) {
                    dispatch(setCompanies(response.data.companies));
                } else {
                    console.error('Failed to fetch companies:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching company details:', error);
            }
        };

        fetchCompanies();
    }, [dispatch]);
};

export default useGetAllCompanies;
