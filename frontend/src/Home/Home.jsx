import React from 'react'
import Navbar from '../components/public/Navbar.jsx'
import Hero from '../Home/Hero.jsx'
import CarouselCategory from '../Home/Carouselcategory.jsx'
import Latestjobs from '../Home/Latestjobs.jsx'
import Footer from '../Home/Footer.jsx'

function Home() {
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