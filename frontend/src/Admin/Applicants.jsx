import Navbar from '@/components/public/Navbar.jsx';
import React, { useEffect } from 'react';
import ApplicantsTable from './ApplicantsTable.jsx';
import axios from 'axios';
import { APPLICATION_API_ENDPOINT } from '@/utils/constant.js';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice.js';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {applicants = []} = useSelector(store => store.application)


    useEffect(() => {
        const fetchAllApplicants = async() => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`, { withCredentials:true});
                dispatch(setAllApplicants(res.data.job))
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllApplicants();
    }, [])

    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-4">
                    Total Applicants <span className="text-gray-600">{applicants?.applications?.length}</span>
                </h1>
                <ApplicantsTable />
            </div>
        </div>
    );
};

export default Applicants;
