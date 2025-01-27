import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { LogOut, User2, Sun, Moon, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

function Navbar() {
    const [theme, setTheme] = useState('light');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Apply theme class to the document element
        document.documentElement.className = theme;

        // Save theme to localStorage
        localStorage.setItem("theme", theme);
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

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const renderNavLinks = (isMobile = false) => {
        const linkClasses = `
            ${isMobile ? 'block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700' : 'px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md'}
            transition-colors duration-200 ease-in-out
        `;

        return user?.role === 'recruiter' ? (
            <>
                <Link to="/admin/companies" className={linkClasses}>Companies</Link>
                <Link to="/admin/jobs" className={linkClasses}>Jobs</Link>
            </>
        ) : (
            <>
                <Link to="/" className={linkClasses}>Home</Link>
                <Link to="/jobs" className={linkClasses}>Jobs</Link>
                <Link to="/browse" className={linkClasses}>Browse</Link>
            </>
        );
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 
            ${theme === 'light'
                ? 'bg-white shadow-sm border-b border-gray-200'
                : 'bg-slate-900 border-b border-gray-700 text-white'}
            py-3 px-4 md:px-6 transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className={`text-2xl font-bold tracking-tight
                    ${theme === 'light' ? 'text-black' : 'text-white'}
                    hover:opacity-80 transition-opacity`}>
                    Talentry
                </Link>

                <div className="hidden md:flex items-center space-x-4">
                    <div className="flex space-x-3">
                        {renderNavLinks()}
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </button>
                        {!user ? (
                            <div className="flex items-center space-x-2">
                                <Link to="/login">
                                    <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="ring-2 ring-blue-500/30 hover:ring-blue-500/50 transition-all cursor-pointer">
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt={user?.name || "User"}
                                            className="object-cover"
                                        />
                                        <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-48 p-1">
                                    <div className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-300">
                                        My Account
                                    </div>
                                    <div className="border-t dark:border-gray-700">
                                        {user?.role === 'student' && (
                                            <Link
                                                to="/profile"
                                                className="block px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                                            >
                                                <User2 className="w-4 h-4" />
                                                <span>View Profile</span>
                                            </Link>
                                        )}
                                        <button
                                            onClick={logoutHandler}
                                            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                </div>

                <div className="md:hidden flex items-center space-x-2">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </button>
                    <button
                        onClick={toggleMobileMenu}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className={`md:hidden fixed inset-x-0 top-16 bottom-0
                        ${theme === 'light' ? 'bg-white' : 'bg-slate-900'}
                        transition-transform duration-300 ease-in-out`}>
                        <div className="flex flex-col p-4 space-y-2">
                            {renderNavLinks(true)}
                            {!user ? (
                                <div className="space-y-2 mt-4">
                                    <Link to="/login" className="block w-full">
                                        <Button variant="outline" className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/signup" className="block w-full">
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                            Signup
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-2 mt-4">
                                    {user?.role === 'student' && (
                                        <Link to="/profile" className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md transition-colors">
                                            <User2 className="w-5 h-5" />
                                            <span>View Profile</span>
                                        </Link>
                                    )}
                                    <button
                                        onClick={logoutHandler}
                                        className="w-full flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md transition-colors text-left">
                                        <LogOut className="w-5 h-5" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
