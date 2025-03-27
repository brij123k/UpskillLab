import React, { useState } from 'react';

function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <header className="bg-white shadow-md">
            <nav className="w-full px-4 xl:px-8 py-4 flex items-center justify-between">

                <div className="flex lg:gap-2 xl:gap-6">
                    <img src="/images/Logo.png" className="h-8" />


                </div>


                <div className="hidden lg:flex gap-2 xl:gap-4">
                    <div className="hidden md:flex space-x-6 items-center font-light text-md text-[#1D1D1D]">
                        <a href="#" className=" hover:text-gray-900">Courses</a>
                        <a href="#" className=" hover:text-gray-900">Success Stories</a>
                        <a href="#" className=" hover:text-gray-900">Upcoming Batches</a>
                        <a href="#" className=" hover:text-gray-900">Student Blog</a>
                        <a href="#" className=" hover:text-gray-900">Contact us</a>
                    </div>
                    <button className="bg-[#4D2C5E] text-white px-2 xl:px-4 py-2 rounded-full hover:bg-purple-700">
                        ENROLL NOW
                    </button>
                    <button className="bg-[#FF7426] text-white px-2 xl:px-4 py-2 rounded-full hover:bg-orange-600">
                        SIGN UP
                    </button>
                </div>

                <div className="hidden">
                    <div className='mr-4 lg:hidden  sm:flex gap-2'>


                        <button className="bg-[#4D2C5E] text-white px-2 xl:px-4 py-2 rounded-full hover:bg-purple-700">
                            ENROLL NOW
                        </button>
                        <button className="bg-[#FF7426] text-white px-2 xl:px-4 py-2 rounded-full hover:bg-orange-600">
                            SIGN UP
                        </button>
                    </div>
                    <button onClick={toggleDrawer} className="text-gray-600 focus:outline-none bg-transparent">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </nav>

            <div
                className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">

                    <div className="flex justify-end p-4">
                        <button onClick={toggleDrawer} className="text-gray-600 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-col space-y-4 px-4 py-4">
                        <a href="#" className="text-gray-600 hover:text-gray-900">Courses</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900">Success Stories</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900">Upcoming Batches</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900">Student Blog</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900">Contact us</a>
                        <button className="bg-[#4D2C5E] text-white px-4 py-2 rounded hover:bg-purple-700">
                            ENROLL NOW
                        </button>
                        <button className="bg-[#FF7426] text-white px-4 py-2 rounded hover:bg-orange-600">
                            SIGN UP
                        </button>
                    </div>
                </div>
            </div>

            {isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-transparent bg-opacity-50 z-40 md:hidden"
                    onClick={toggleDrawer}
                ></div>
            )}
        </header>
    );
}

export default Header;