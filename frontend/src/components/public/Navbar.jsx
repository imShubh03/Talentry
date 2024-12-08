import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { LogOut, User2, Sun, Moon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

function Navbar() {
    const [theme, setTheme] = useState('light');
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Logout failed. Please try again.');
        }
    };

    return (
        <div className={`navbar ${theme === 'light' ? 'bg-white text-black' : 'dark:bg-slate-800 dark:text-white'} flex items-center justify-between`}>
            <div className="navbar-start">
                <div className="dropdown lg:hidden">
                    <label tabIndex={0} role="button" className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className={`menu menu-sm dropdown-content mt-3 w-52 p-2 ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} rounded-box`}
                    >
                        {user?.role === 'recruiter' ? (
                            <>
                                <li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                                <li><Link to="/browse">Browse</Link></li>
                            </>
                        )}
                        {!user ? (
                            <>
                                <Link to="/signup"><Button className="border-2 bg-blue-600 rounded-md">Signup</Button></Link>
                                <Link to="/login"><Button className="border-2 bg-blue-600 hover:bg-yellow-500">Login</Button></Link>
                            </>
                        ) : null}
                    </ul>
                </div>
                <a className={`btn btn-ghost text-xl ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                    <Link to="/">Talentry</Link>
                </a>
            </div>

            <div className="navbar-center flex-grow hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-4">
                    {user?.role === 'recruiter' ? (
                        <>
                            <li><Link to="/admin/companies">Companies</Link></li>
                            <li><Link to="/admin/jobs">Jobs</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/jobs">Jobs</Link></li>
                            <li><Link to="/browse">Browse</Link></li>
                        </>
                    )}
                </ul>
            </div>

            <div className="navbar-end flex items-center gap-4">
                <button onClick={toggleTheme} className="btn btn-ghost">
                    {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>
                {!user ? (
                    <div className="flex items-center gap-3">
                        <Link to="/signup"><Button className="border-2 bg-blue-600 rounded-md">Signup</Button></Link>
                        <Link to="/login"><Button className="border-2 bg-blue-600 hover:bg-yellow-500">Login</Button></Link>
                    </div>
                ) : (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="cursor-pointer">
                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.name || "User"} />
                                <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className={`w-72 ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
                            <div className="flex gap-3 mb-2">
                                <Avatar>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.name || "User"} />
                                    <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4>{user?.name}</h4>
                                    <p className={`text-sm ${theme === 'light' ? 'text-black' : 'text-white'}`}>{user?.profile?.bio}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-start my-0.5">
                                {user?.role === 'student' && (
                                    <div className="flex items-center cursor-pointer">
                                        <User2 />
                                        <Button
                                            variant="link"
                                            className={`text-sm ${theme === 'light' ? 'text-black' : 'text-white'}`}
                                        >
                                            <Link to="/profile">View Profile</Link>
                                        </Button>
                                    </div>
                                )}
                                <div className="flex items-center cursor-pointer">
                                    <LogOut />
                                    <Button onClick={logoutHandler} variant="link" className={`text-sm ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                )}
            </div>
        </div>
    );
}

export default Navbar;
