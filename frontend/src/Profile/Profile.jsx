import Navbar from '@/components/public/Navbar';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Contact, Mail, Pen } from 'lucide-react';
import React from 'react';
import Appliedjobs from './Appliedjobs.jsx';

const skills = ['html', 'css', 'js', 'react'];

function Profile() {
    const haveResume = true;

    return (
        <div>
            <Navbar />
            <div className="max-w-5xl mx-auto p-4">
                {/* Main Container with Shadow and Border */}
                <div className="border shadow-md rounded-lg p-6 space-y-8">
                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between space-y-6 md:space-y-0">
                        <div className="flex items-center gap-6">
                            <Avatar className="h-24 w-24">
                                <AvatarImage
                                    alt="profile"
                                    src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                                />
                            </Avatar>
                            <div  >
                                <h1 className="text-lg font-bold dark:bg-slate-800 dark:text-white">Full Name</h1>
                                <p className="text-sm text-gray-500 dark:bg-slate-800 dark:text-white">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia, dolore itaque sit aliquid veniam ea!
                                </p>
                            </div>
                        </div>
                        <Button className=' bg-white '>
                            <Pen className="w-4 h-4 bg-white text-black " />
                        </Button>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-4 h-4 dark:bg-slate-800 dark:text-white" />
                            <span className=' dark:bg-slate-800 dark:text-white'>max@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Contact className="w-4 h-4 dark:bg-slate-800 dark:text-white" />
                            <span className=' dark:bg-slate-800 dark:text-white'>9999999999</span>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div>
                        <h2 className="text-lg font-semibold">Skills</h2>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {skills.length !== 0
                                ? skills.map((item, index) => (
                                    <Badge key={index} className="bg-blue-50 text-blue-700">
                                        {item}
                                    </Badge>
                                ))
                                : <span className="text-sm text-gray-500">NA</span>}
                        </div>
                    </div>

                    {/* Resume Section */}
                    <div className="grid w-full space-y-2">
                        <Label className="text-sm font-semibold">Resume</Label>
                        {haveResume ? (
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="#"
                                className="text-blue-600 hover:underline text-sm"
                            >
                                Shubham resume
                            </a>
                        ) : (
                            <span className="text-sm text-gray-500">NA</span>
                        )}
                    </div>

                    {/* Applied Jobs */}
                    <div>
                        <h1 className="text-lg font-semibold mb-4">Applied Jobs</h1>
                        <Appliedjobs />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
