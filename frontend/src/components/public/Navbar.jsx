import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { LogOut, User2, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [theme, setTheme] = useState('light');
    const user = false;

    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className={`navbar ${theme === 'light' ? 'bg-white text-black' : 'dark:bg-slate-800 dark:text-white'} flex items-center justify-between`}>
            {/* Navbar Start */}
            <div className="navbar-start">
                <div className="dropdown lg:hidden">
                    <label tabIndex={0} role="button" className="btn btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className={`menu menu-sm dropdown-content mt-3 w-52 p-2 ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} rounded-box`}
                    >
                        <li><a>Home</a></li>
                        <li><a>Jobs</a></li>
                        <li><a>Browse</a></li>
                        {!user ? (
                            <>
                                <Link to="/signup"><Button className="border-2 bg-blue-600 rounded-md">Signup</Button></Link>
                                <Link to="/login"><Button className="border-2 bg-blue-600 hover:bg-yellow-500">Login</Button></Link>
                            </>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className={`w-72 ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
                                    <div className="flex gap-3 mb-2">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4>Shubham Sonake</h4>
                                            <p className={`text-sm ${theme === 'light' ? 'text-black' : 'text-white'}`}>Lorem ipsum dolor sit amet.</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start my-0.5">
                                        <div className="flex items-center cursor-pointer">
                                            <User2 />
                                            <Button variant="link" className={`text-sm ${theme === 'light' ? 'text-black' : 'text-white'}`}>View Profile</Button>
                                        </div>
                                        <div className="flex items-center cursor-pointer">
                                            <LogOut />
                                            <Button variant="link" className={`text-sm ${theme === 'light' ? 'text-black' : 'text-white'}`}>Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </ul>
                </div>
                <a className={`btn btn-ghost text-xl ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                    <Link to="/">Talentry</Link>
                </a>
            </div>

            {/* Navbar End for Larger Screens */}
            <div className="navbar-center flex-grow hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-4">
                    <li><a>Home</a></li>
                    <li><a>Jobs</a></li>
                    <li><a>Browse</a></li>
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
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className={`w-72 ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
                            <div className="flex gap-3 mb-2">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4>Shubham Sonake</h4>
                                    <p className={`text-sm ${theme === 'light' ? 'text-black' : 'text-white'}`}>Lorem ipsum dolor sit amet.</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-start my-0.5">
                                <div className="flex items-center cursor-pointer">
                                    <User2 />
                                    <Button variant="link" className={`text-sm ${theme === 'light' ? 'text-black' : 'text-white'}`}>View Profile</Button>
                                </div>
                                <div className="flex items-center cursor-pointer">
                                    <LogOut />
                                    <Button variant="link" className={`text-sm ${theme === 'light' ? 'text-black' : 'text-white'}`}>Logout</Button>
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
