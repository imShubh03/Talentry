import Navbar from '@/components/public/Navbar.jsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Contact, Mail, Pen, FileText, UserCircle } from 'lucide-react';
import React, { useState } from 'react';
import Appliedjobs from './Appliedjobs.jsx';
import UpdateProfileDialog from './UpdateProfileDialog.jsx';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/Custom hooks/useGetAppliedJobs.jsx';

function Profile() {
    useGetAppliedJobs();

    const haveResume = true;
    const [open, setOpen] = useState(false)

    const {user} = useSelector(store => store.auth)

    // Function to get initials for avatar fallback
    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'UN';
    }

    return (
        <div className="bg-gray-50 min-h-screen mt-16">
            <Navbar />
            <div className="max-w-5xl mx-auto p-4">
                {/* Main Container with Enhanced Shadow and Border */}
                <div className="bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden">
                    {/* Profile Header with Gradient Background */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6">
                        <div className="flex flex-col md:flex-row items-center md:items-start justify-between space-y-6 md:space-y-0">
                            <div className="flex items-center gap-6">
                                <Avatar className="h-28 w-28 border-4 border-white shadow-md">
                                    <AvatarImage
                                        alt="profile"
                                        src={user?.profile?.profilePhoto}
                                    />
                                    <AvatarFallback className="bg-blue-100 text-blue-600">
                                        {getInitials(user?.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-800">{user?.name}</h1>
                                    <p className="text-sm text-gray-600">
                                        {user?.profile?.bio || 'No bio available'}
                                    </p>
                                </div>
                            </div>
                            <Button 
                                variant="outline" 
                                size="icon" 
                                onClick={() => setOpen(true)} 
                                className="hover:bg-blue-50 transition-colors"
                            >
                                <Pen className="w-4 h-4 text-gray-600" />
                            </Button>
                        </div>
                    </div>

                    {/* Profile Details Container */}
                    <div className="p-6 space-y-6">
                        {/* Contact Information */}
                        <div className="border-b pb-6">
                            <div className="flex items-center gap-3 text-sm text-gray-700">
                                <Mail className="w-5 h-5 text-blue-600" />
                                <span className="font-medium">{user?.email}</span>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <UserCircle className="w-5 h-5 text-blue-600" />
                                <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {user?.profile?.skills.length !== 0
                                    ? user?.profile?.skills.map((item, index) => (
                                        <Badge 
                                            key={index} 
                                            variant="secondary" 
                                            className="px-3 py-1 rounded-full"
                                        >
                                            {item}
                                        </Badge>
                                    ))
                                    : <span className="text-sm text-gray-500">No skills added</span>}
                            </div>
                        </div>

                        {/* Resume Section */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-600" />
                                <Label className="text-base font-semibold text-gray-800">Resume</Label>
                            </div>
                            {haveResume ? (
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={user?.profile?.resume}
                                    className="text-blue-600 hover:underline text-sm flex items-center gap-2 bg-blue-50 p-2 rounded-md"
                                >
                                    <FileText className="w-4 h-4" />
                                    {user?.profile?.resumeName || 'View Resume'}
                                </a>
                            ) : (
                                <span className="text-sm text-gray-500">No resume uploaded</span>
                            )}
                        </div>

                        {/* Applied Jobs */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 border-t pt-6">
                                <Contact className="w-5 h-5 text-blue-600" />
                                <h1 className="text-lg font-semibold text-gray-800">Applied Jobs</h1>
                            </div>
                            <Appliedjobs />
                        </div>
                    </div>
                </div>

                <UpdateProfileDialog open={open} setOpen={setOpen} />
            </div>
        </div>
    );
}

export default Profile;