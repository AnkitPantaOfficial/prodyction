import React, { useState } from 'react';

import { Link } from "react-router-dom";
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    
                    <div className="relative group">
                        <button
                            onClick={toggleDropdown} // Toggle the dropdown when the button is clicked
                            className="text-white cursor-pointer"
                        >
                            Display Page
                        </button>

                        <button className="text-white cursor-pointer">
                    
                                    <Link to="/map" className="block px-4 py-2">
                                        Map
                                    </Link>
                                
                        </button>
                        <button className="text-white cursor-pointer">
                    
                        <Link to="/winner" className="block px-4 py-2">
                                        Winner
                                    </Link>
                                
                        </button>
                        <button className="text-white cursor-pointer">
                    
                        <Link to="/coming" className="block px-4 py-2">
                                        COMING UP NEXT
                                    </Link>
                                
                        </button>
                        <button className="text-white cursor-pointer">
                    
                        <Link to="/display" className="block px-4 py-2">
                                        DISPLAY
                                    </Link>
                                
                        </button>
                        <button className="text-white cursor-pointer">
                    
                        <Link to="/schedule" className="block px-4 py-2">
                                        Schedule
                                    </Link>
                                
                        </button>
                        <button className="text-white cursor-pointer">
                    
                        <Link to="/alive" className="block px-4 py-2">
                                        alive
                                    </Link>
                                
                        </button>
                        <button className="text-white cursor-pointer">
                    
                        <Link to="/alert" className="block px-4 py-2">
                                        alert
                                    </Link>
                                
                        </button>
                        {isOpen && ( // Conditionally render the dropdown content
                            <ul className="absolute space-y-1 bg-gray-500 z-50 w-56 text-white">
                                <li>
                                    <Link to="/matchstandings" className="block px-4 py-2">
                                        Matchstanging1
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/matchstandings2" className="block px-4 py-2">
                                        Matchstanging2
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/overallstandings" className="block px-4 py-2">
                                        Overall Standing
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/topfraggers" className="block px-4 py-2">
                                        Top Fraggers
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/overallfragger" className="block px-4 py-2">
                                        Overall Fragger
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/schedule" className="block px-4 py-2">
                                        Schedule
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/coming" className="block px-4 py-2">
                                        COMING UP NEXT
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/mvp" className="block px-4 py-2">
                                        MVP
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/overmvp" className="block px-4 py-2">
                                        Overall MVP
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/wwcd" className="block px-4 py-2">
                                        WWCD
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/map" className="block px-4 py-2">
                                        Map
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}