import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { setUser } from '@/redux/authSlice';
import { USER_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import { Loader2, X } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name: user?.name,
        email: user?.email,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills,
        file: null,
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('email', input.email);
        formData.append('bio', input.bio);
        formData.append('skills', input.skills);

        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            setLoading(true)
            const res = await axios.post(
                `${USER_API_ENDPOINT}/profile/update`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Corrected typo: 'muiltipart' -> 'multipart'
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(error?.response?.data?.message || 'An error occurred.');
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                className="sm:max-w-[425px] w-full"
                onInteractOutside={handleClose}
            >
                <DialogClose
                    className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                    onClick={handleClose}
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>

                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:items-center sm:gap-4">
                            <Label htmlFor="name" className="sm:col-span-1">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="sm:col-span-3 w-full"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:items-center sm:gap-4">
                            <Label htmlFor="email" className="sm:col-span-1">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                type="email"
                                className="sm:col-span-3 w-full"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:items-center sm:gap-4">
                            <Label htmlFor="bio" className="sm:col-span-1">
                                Bio
                            </Label>
                            <Input
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className="sm:col-span-3 w-full"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:items-center sm:gap-4">
                            <Label htmlFor="skills" className="sm:col-span-1">
                                Skills
                            </Label>
                            <Input
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="sm:col-span-3 w-full"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:items-center sm:gap-4">
                            <Label htmlFor="resume" className="sm:col-span-1">
                                Resume
                            </Label>
                            <Input
                                id="resume"
                                type="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className="sm:col-span-3 w-full"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            className={`w-full bg-blue-600 text-white py-2 rounded-md flex items-center justify-center ${
                                loading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please Wait
                                </>
                            ) : (
                                'Update'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;
