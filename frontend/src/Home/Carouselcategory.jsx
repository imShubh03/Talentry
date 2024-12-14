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

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Scientist",
    "UI/UX Designer"
];

function CarouselCategory() {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse")
    }

    return (
        <>
            <div className="w-full max-w-xl mx-auto my-4 px-4 dark:bg-slate-800 dark:text-white">
                <Carousel className="relative w-full dark:bg-slate-800 dark:text-white">
                    <CarouselContent className="flex gap-2 sm:gap-4">
                        {categories.map((cat, ind) => (
                            <CarouselItem
                                key={ind}
                                className="flex-shrink-0 w-[75%] sm:w-[50%] lg:w-[33.33%] dark:bg-slate-800 dark:text-white"
                            >
                                <Button
                                    onClick={() => searchJobHandler(cat)}
                                    variant="outline"
                                    className="w-full py-3 bg-blue-600 text-white hover:bg-sky-400 rounded-lg text-sm sm:text-base dark:bg-slate-800 dark:text-white"
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Navigation Buttons */}
                    <div className="hidden sm:block">
                        <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 md:h-10 md:w-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md" />
                        <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 md:h-10 md:w-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md" />
                    </div>
                </Carousel>
            </div>
        </>
    );
}

export default CarouselCategory;
