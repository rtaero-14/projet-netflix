import { useState } from 'react';
import SearchBar from './SearchBar';

function Navbar({ movies = [], onSearch = () => {} }) {
    const [isScrolled, _setIsScrolled] = useState(false);
    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
                isScrolled
                    ? 'bg-black'
                    : 'bg-linear-to-b from-black/80 to-transparent'
            }`}
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-8">
                        <h1 className="text-primary text-3xl font-bold tracking-tight">MONSIEUR MINGO EST GÉNIAL</h1>

                        {/* Navigation Links */}
                        <ul className="hidden md:flex space-x-6">
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors">
                                    Accueil
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors">
                                    Films
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors">
                                    Mes locations
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* User Section */}
                    <div className="flex items-center space-x-4">
                        {/* Search Icon (receives movies and onSearch from parent) */}
                        <SearchBar movies={movies} onSearch={onSearch} />
                        
                        {/* User Avatar */}
                        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center cursor-pointer hover:bg-primary-dark transition-colors">
                            <span className="text-sm font-bold">U</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;