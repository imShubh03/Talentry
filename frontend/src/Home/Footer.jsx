import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, GithubIcon } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-white text-gray-200 dark:bg-slate-800 dark:text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info Section */}
                    <div className="space-y-4 ">
                        <h3 className="text-2xl font-bold text-gray-800 dark:bg-slate-800 dark:text-white">Talentry</h3>
                        <p className="text-gray-600 text-sm dark:bg-slate-800 dark:text-white">
                            Connecting talent with opportunities. Your trusted partner in career growth and professional development.
                        </p>
                        <div className="flex items-center space-x-4 pt-4 ">
                            <a href="https://github.com/imShubh03" className="text-gray-800 hover:text dark:bg-slate-800 dark:text-white">
                                <GithubIcon size={20} />
                            </a>
                            <a href="https://x.com/Shubham3102003" className="text-gray-800 hover:text dark:bg-slate-800 dark:text-white">
                                <Twitter size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/shubham-sonake-410241231" className="text-gray-800 hover:text dark:bg-slate-800 dark:text-white">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://www.instagram.com/_shubham17_/" className="text-gray-800 hover:text dark:bg-slate-800 dark:text-white">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* For Job Seekers */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-800 dark:bg-slate-800 dark:text-white">For Job Seekers</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/jobs" className="text-gray-600 hover:text-blue-500 transition-colors dark:bg-slate-800 dark:text-white">Browse Jobs</Link>
                            </li>
                            <li>
                                <Link to="/profile" className="text-gray-600 hover:text-blue-500 transition-colors dark:bg-slate-800 dark:text-white">View Profile</Link>
                            </li>
                        </ul>
                    </div>

                    {/* For Employers */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-800 dark:bg-slate-800 dark:text-white">For Employers</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/admin/jobs/create" className="text-gray-600 hover:text-blue-500 transition-colors dark:bg-slate-800 dark:text-white">Post a Job</Link>
                            </li>
                            <li>
                                <Link to="/admin/jobs" className="text-gray-600 hover:text-blue-500 transition-colors dark:bg-slate-800 dark:text-white">Browse Resumes</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-800 dark:bg-slate-800 dark:text-white">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-3">
                                <Mail size={18} className="text-gray-600 dark:bg-slate-800 dark:text-white" />
                                <span className="text-gray-600 dark:bg-slate-800 dark:text-white">support@12.com</span>
                            </li>
                            <li className="flex items-center space-x-3 ">
                                <Phone size={18} className="text-gray-600 dark:bg-slate-800 dark:text-white" />
                                <span className="text-gray-600 dark:bg-slate-800 dark:text-white">+91 9876543210</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <MapPin size={18} className="text-gray-600 dark:bg-slate-800 dark:text-white" />
                                <span className="text-gray-600 dark:bg-slate-800 dark:text-white">Maharshtra, India</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm text-gray-600 dark:bg-slate-800 dark:text-white">
                            © 2024 Talentry. All rights reserved.
                        </div>
                        <div className="flex space-x-6 text-sm">
                            <Link to="/privacy" className="text-gray-600 hover:text-blue-500 transition-colors dark:bg-slate-800 dark:text-white">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-gray-600 hover:text-blue-500 transition-colors dark:bg-slate-800 dark:text-white">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
