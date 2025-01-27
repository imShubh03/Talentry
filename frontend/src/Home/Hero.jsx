import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button.jsx';
import { Search, CheckCircle, Award, Target } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice.js';

function Hero() {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse")
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchJobHandler();
        }
    }

    const features = [
        {
            icon: <CheckCircle className="w-10 h-10 text-blue-600" />,
            title: "Easy Applications",
            description: "Streamlined application process"
        },
        {
            icon: <Award className="w-10 h-10 text-green-600" />,
            title: "Top Recruiters",
            description: "Connect with industry leaders"
        },
        {
            icon: <Target className="w-10 h-10 text-purple-600" />,
            title: "Personalized Jobs",
            description: "Tailored recommendations"
        }
    ];

    return (
        <div className="relative bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 py-20 px-4 overflow-hidden">
            {/* Subtle Background Shapes */}
            <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-100 dark:bg-blue-900 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-100 dark:bg-purple-900 rounded-full opacity-20 blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Hero Content */}
                <div className="text-center max-w-4xl mx-auto">
                    <h3 className="text-xl md:text-2xl font-medium text-blue-600 dark:text-blue-400 mb-4">
                        The <span className="font-bold text-orange-600">No. 1 Job</span> Hunting Platform
                    </h3>

                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 
                        text-transparent bg-clip-text bg-gradient-to-r 
                        from-blue-600 via-purple-600 to-pink-600 
                        dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                        Discover Opportunities That Match Your Ambitions
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
                        Empowering professionals to find tailored jobs and connect with top recruiters, effortlessly.
                    </p>

                    {/* Search Component */}
                    <div className="w-full max-w-3xl mx-auto mb-12">
                        <div className="relative flex shadow-lg rounded-full overflow-hidden">
                            <div className="flex-grow">
                                <input
                                    type="text"
                                    placeholder="Search jobs here..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="w-full h-14 px-6 text-lg 
                                        border-none 
                                        bg-white dark:bg-slate-700 
                                        text-gray-900 dark:text-white
                                        focus:outline-none 
                                        focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                onClick={searchJobHandler}
                                className="w-16 md:w-20 bg-blue-600 hover:bg-blue-700 
                                    flex items-center justify-center 
                                    transition-colors duration-300 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <Search className="text-white w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Call to Action Buttons */}
                    <div className="flex justify-center space-x-4 mb-16">
                        <Link to="/signup">
                            <Button className="
                                bg-blue-600 text-white 
                                hover:bg-blue-700 
                                px-8 py-3 
                                rounded-full 
                                shadow-lg 
                                hover:shadow-xl 
                                transition-all 
                                duration-300">
                                Get Started
                            </Button>
                        </Link>
                        <Link to="/jobs">
                            <Button variant="outline" className="
                                border-2 border-blue-600 
                                text-blue-600 
                                hover:bg-blue-50 
                                px-8 py-3 
                                rounded-full 
                                transition-colors 
                                duration-300">
                                Explore Jobs
                            </Button>
                        </Link>
                    </div>

                    {/* Features Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {features.map((feature, index) => (
                            <div 
                                key={index} 
                                className="
                                    bg-white dark:bg-slate-800 
                                    p-6 rounded-xl 
                                    shadow-lg hover:shadow-xl 
                                    transition-all duration-300 
                                    transform hover:-translate-y-2
                                    border border-gray-100 dark:border-slate-700"
                            >
                                <div className="mb-4 flex justify-center">
                                    {feature.icon}
                                </div>
                                <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                                    {feature.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;