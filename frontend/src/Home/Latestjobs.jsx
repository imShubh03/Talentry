
import LatestJobCard from '../Home/Latestjobcards.jsx';
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Briefcase, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Latestjobs() {
    const { allJobs } = useSelector(store => store.job);

    const navigate = useNavigate();

    return (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 bg-blue-50 dark:bg-slate-700 px-4 py-2 rounded-full mb-4">
                        <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm text-blue-800 dark:text-blue-300">
                            Latest Opportunities
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                        Explore Recent Job Openings
                    </h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                        Discover exciting career opportunities across various industries and roles.
                    </p>
                </motion.div>

                {allJobs.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 dark:bg-slate-800 rounded-xl">
                        <Search className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-6" />
                        <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-3">
                            No Jobs Available
                        </h3>
                        <p className="text-gray-500 dark:text-gray-500">
                            Check back later or explore other opportunities
                        </p>
                    </div>
                ) : (
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { 
                                opacity: 1,
                                transition: {
                                    delayChildren: 0.2,
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                        className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
                    >
                        {allJobs.slice(0, 6).map((job) => (
                            <LatestJobCard key={job._id} job={job} />
                        ))}
                    </motion.div>
                )}

                {allJobs.length > 6 && (
                    <div className="text-center mt-10">
                        <button 
                            onClick={() => navigate(`/jobs`)}
                            className="
                                px-8 py-3 
                                bg-blue-600 text-white 
                                rounded-full 
                                hover:bg-blue-700 
                                transition-colors 
                                duration-300 
                                shadow-lg 
                                hover:shadow-xl
                            "
                        >
                            View All Jobs
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Latestjobs;