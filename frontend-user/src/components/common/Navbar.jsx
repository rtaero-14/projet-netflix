import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import CartButton from './CartButton';

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
                    {/*Logo*/}
                    <div className="flex items-center space-x-8">
                        <h1 className="text-primary text-3xl font-bold tracking-tight">MONSIEUR MINGO EST GÉNIAL</h1>

                        {/*Liens de navigation*/}
                        <ul className="hidden md:flex space-x-6">
                            <li>
                                <NavLink to="/" className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-gray-300 hover:text-white' }>
                                    Accueil
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/movies" className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-gray-300 hover:text-white' }>
                                    Films
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/my-rentals" className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-gray-300 hover:text-white' }>
                                    Mes locations
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/*Section de l'utilisateur*/}
                    <div className="flex items-center space-x-4">
                        {/*Barre de recherche*/}
                        <SearchBar movies={movies} onSearch={onSearch} />

                        {/*Panier*/}
                        <CartButton />

                        {/*Profil utilisateur*/}
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