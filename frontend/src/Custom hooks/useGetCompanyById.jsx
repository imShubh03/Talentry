import { setSingleCompany } from '@/redux/companySlice';
import { COMPANY_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const response = await axios.get(`${COMPANY_API_ENDPOINT}/company/${companyId}`, { withCredentials: true });
                
                
                if (response.data.success) {
                    dispatch(setSingleCompany(response.data.company));
                }

            } catch (error) {
                console.error('Error fetching company details:', error);
            }
        };

        if (companyId) {
            fetchSingleCompany();
        }
    }, [companyId, dispatch]);
};

export default useGetCompanyById;
