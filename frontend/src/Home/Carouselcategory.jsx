import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext
} from '../components/ui/carousel.jsx';
import { Button } from '../components/ui/button.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice.js';
import { Code, Database, PenTool, Layers } from 'lucide-react';

const categories = [
    { 
        name: "Frontend Developer", 
        icon: <Code className="w-6 h-6 mr-2" />,
        color: "text-blue-600"
    },
    { 
        name: "Backend Developer", 
        icon: <Database className="w-6 h-6 mr-2" />,
        color: "text-green-600"
    },
    { 
        name: "Data Scientist", 
        icon: <Layers className="w-6 h-6 mr-2" />,
        color: "text-purple-600"
    },
    { 
        name: "UI/UX Designer", 
        icon: <PenTool className="w-6 h-6 mr-2" />,
        color: "text-pink-600"
    }
];

function CarouselCategory() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse")
    }

    return (
        <div className="w-full py-8 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 
                    text-transparent bg-clip-text 
                    bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
                    dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                    Explore Job Categories
                </h2>
                
                <Carousel 
                    opts={{
                        align: "start",
                        slidesToScroll: 1,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="flex gap-4">
                        {categories.map((cat, ind) => (
                            <CarouselItem 
                                key={ind} 
                                className="basis-[80%] sm:basis-[50%] lg:basis-[25%] p-1"
                            >
                                <div className="p-1">
                                    <Button
                                        onClick={() => searchJobHandler(cat.name)}
                                        variant="outline"
                                        className={`
                                            w-full h-full py-4 px-4
                                            flex items-center justify-center
                                            border-2 border-transparent
                                            bg-white dark:bg-slate-800
                                            hover:border-blue-500
                                            transition-all duration-300
                                            group
                                            shadow-lg hover:shadow-xl
                                            rounded-xl
                                        `}
                                    >
                                        <div className="flex flex-col items-center justify-center">
                                            <div className={`
                                                mb-3 
                                                ${cat.color}
                                                group-hover:scale-110 
                                                transition-transform 
                                                duration-300
                                            `}>
                                                {cat.icon}
                                            </div>
                                            <span className="
                                                text-sm md:text-base 
                                                font-semibold 
                                                text-gray-800 
                                                dark:text-white 
                                                group-hover:text-blue-600 
                                                dark:group-hover:text-blue-400 
                                                transition-colors
                                            ">
                                                {cat.name}
                                            </span>
                                        </div>
                                    </Button>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Navigation Buttons */}
                    <div className="hidden sm:block">
                        <CarouselPrevious className="
                            absolute -left-12 top-1/2 -translate-y-1/2 
                            w-10 h-10 
                            bg-white dark:bg-slate-800 
                            text-blue-600 
                            border-2 border-blue-600 
                            hover:bg-blue-50 
                            dark:hover:bg-slate-700 
                            rounded-full 
                            shadow-lg 
                            hover:shadow-xl 
                            transition-all 
                            duration-300
                        "/>
                        <CarouselNext className="
                            absolute -right-12 top-1/2 -translate-y-1/2 
                            w-10 h-10 
                            bg-white dark:bg-slate-800 
                            text-blue-600 
                            border-2 border-blue-600 
                            hover:bg-blue-50 
                            dark:hover:bg-slate-700 
                            rounded-full 
                            shadow-lg 
                            hover:shadow-xl 
                            transition-all 
                            duration-300
                        "/>
                    </div>
                </Carousel>
            </div>
        </div>
    );
}

export default CarouselCategory;