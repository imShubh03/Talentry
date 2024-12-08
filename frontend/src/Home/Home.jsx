import React, { useEffect } from 'react'
import Navbar from '../components/public/Navbar.jsx'
import Hero from '../Home/Hero.jsx'
import CarouselCategory from '../Home/Carouselcategory.jsx'
import Latestjobs from '../Home/Latestjobs.jsx'
import Footer from '../Home/Footer.jsx'
import useGetAllJobs from '@/Custom hooks/useGetAllJobs.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
    useGetAllJobs()

    const { user } = useSelector(store => store.auth)
    const navigate = useNavigate();

    useEffect(() => {
        if(user?.role === 'recruiter'){
            navigate("/admin/companies");
        }
    }, [])
    return (
        <div>
            <Navbar />
            <Hero/>
            <CarouselCategory/>
            <Latestjobs/>
            <Footer/>
        </div>
    )
}

export default Home