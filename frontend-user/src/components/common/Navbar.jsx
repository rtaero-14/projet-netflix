import { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import SearchBar from './SearchBar';
import CartButton from './CartButton';

function Navbar({ movies = [], onSearch = () => {}, transparentWhenScrolled = false }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        navigate('/');
    };

    const navBackground = transparentWhenScrolled
        ? (isScrolled ? 'bg-transparent' : 'bg-black/70')
        : (isScrolled ? 'bg-black' : 'bg-linear-to-b from-black/80 to-transparent');

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-colors duration-300 ${navBackground}`}
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/*Logo*/}
                    <div className="flex items-center space-x-8">
                        <h1 className="text-primary text-3xl font-bold tracking-tight">ASTÉRIX</h1>

                        {/*Liens de navigation*/}
                        <ul className="hidden md:flex space-x-6">
                            <li>
                                <NavLink to="/" className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-gray-300 hover:text-white' }>
                                    Accueil
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/search" className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-gray-300 hover:text-white' }>
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
                        {isAuthenticated() ? (
                            <div className="relative">
                                <button 
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-2 cursor-pointer"
                                >
                                    <img 
                                        src={user.avatar} 
                                        alt={user.name} 
                                        className="w-8 h-8 rounded cursor-pointer hover:ring-2 hover:ring-primary transition"
                                    />
                                    <span className="hidden md:block text-sm text-white">{user.name}</span>
                                </button>

                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-lg border border-gray-800 rounded-lg shadow-xl py-2">
                                        <NavLink 
                                            to="/profile" 
                                            className="block px-4 py-2 text-white hover:bg-gray-800 transition"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            Mon profil
                                        </NavLink>
                                        <NavLink 
                                            to="/my-rentals" 
                                            className="block px-4 py-2 text-white hover:bg-gray-800 transition"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            Mes locations
                                        </NavLink>
                                        <hr className="border-gray-800 my-2" />
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 transition cursor-pointer"
                                        >
                                            Déconnexion
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login">
                                <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded transition cursor-pointer">
                                    Connexion
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;