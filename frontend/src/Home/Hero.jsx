import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button.jsx';
import { Search } from 'lucide-react';

function Hero() {
    return (
        <>
            <div className="bg-white text-blue-700 py-20 px-6 dark:bg-slate-800 dark:text-white">
                {/* Container for central alignment of content */}
                <div className="max-w-7xl mx-auto text-center">
                    {/* Subheading */}
                    <h3 className="text-2xl font-semibold">
                        The <span className="text-orange-700">No. 1 Job</span> Hunting Platform
                    </h3>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight text-blue-700 dark:bg-slate-800 dark:text-white">
                        Discover Opportunities That Match Your Ambitions
                    </h1>

                    {/* Paragraph with a brief description */}
                    <p className="mt-4 mb-8 text-lg md:text-xl text-blue-700 dark:bg-slate-800 dark:text-white">
                        Empowering professionals to find tailored jobs and connect with top recruiters, effortlessly.
                    </p>

                    
                    {/* Search Component with proper spacing */}
                    <div className="w-full max-w-3xl mx-auto px-4 mb-8">
                        <div className="flex items-stretch gap-0">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Search jobs here"
                                    className="w-full h-11 px-4 rounded-l-lg border border-r-0 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-slate-800 dark:text-white"
                                />
                            </div>
                            <button
                                className="h-11 px-4 bg-blue-600 hover:bg-blue-700 rounded-r-lg border border-blue-600 hover:border-blue-700 transition-colors duration-200 flex items-center justify-center group"
                            >
                                <Search
                                    className="text-white group-hover:scale-105 transition-transform duration-200"
                                    size={20}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-4">
                        {/* Sign-Up Button */}
                        <Link to="/signup">
                            <Button className="bg-blue-700 text-white hover:bg-sky-700 py-3 px-6 rounded-md font-semibold">
                                Get Started
                            </Button>
                        </Link>

                        {/* Jobs Exploration Button */}
                        <Link to="/jobs">
                            <Button className="bg-gray-100 border border-gray-300 text-gray-800 hover:bg-gray-200 py-3 px-6 rounded-md font-semibold">
                                Explore Jobs
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Feature Icons Section */}
                <div className="mt-10 flex justify-center gap-8">
                    {/* Easy Applications Feature */}
                    <div className="flex flex-col items-center">
                        <div className="bg-gray-100 text-gray-800 p-4 rounded-full shadow-md">
                            <svg className="h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11M9 21v-6m5-4V3l7 7-7 7z" />
                            </svg>
                        </div>
                        <p className="mt-4 text-lg text-gray-700 dark:bg-slate-800 dark:text-white">Easy Applications</p>
                    </div>

                    {/* Top Recruiters Feature */}
                    <div className="flex flex-col items-center">
                        <div className="bg-gray-100 text-gray-800 p-4 rounded-full shadow-md">
                            <svg className="h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12h5m-2.5-2.5V21m0 0L12 18.5m0 0L5 21V9m12.5-2.5H20m0-5H5" />
                            </svg>
                        </div>
                        <p className="mt-4 text-lg text-gray-700 dark:bg-slate-800 dark:text-white">Top Recruiters</p>
                    </div>

                    {/* Personalized Jobs Feature */}
                    <div className="flex flex-col items-center">
                        <div className="bg-gray-100 text-gray-800 p-4 rounded-full shadow-md">
                            <svg className="h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0-5c7.18 0 13 5.82 13 13s-5.82 13-13 13S-1 18.18-1 11C-1 3.82 4.82-1 12-1z" />
                            </svg>
                        </div>
                        <p className="mt-4 text-lg text-gray-700 dark:bg-slate-800 dark:text-white">Personalized Jobs</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero;