import React from 'react';

const Header = () => {
    return (
        <header className="fixed w-full bg-white shadow-md z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-blue-600">VIRALOAB</div>
                <nav>
                    <ul className="flex space-x-8">
                        <li><a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About Us</a></li>
                        <li><a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a></li>
                        <li><a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Our Works</a></li>
                        <li><a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header; 