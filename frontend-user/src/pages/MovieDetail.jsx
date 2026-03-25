import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import moviesData from '../../../data/movies.json';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import Navbar from '../components/common/Navbar';
import BreadCrumb from '../components/common/BreadCrumb';
import Footer from '../components/layout/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthProvider';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const movie = (moviesData || []).find((m) => String(m.id) === String(id));
  
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // NETTOYAGE : Suppression de l'état local showAddedNotice
  // const [showAddedNotice, setShowAddedNotice] = useState(false);

  // NETTOYAGE : On n'a plus besoin de setCartNotification ici
  const { addToCart, isInCart, isRented, rentMovie, getRentalByMovieId } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Loading />;

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Film introuvable</h2>
          <p className="text-gray-300 mb-8">Le film que vous recherchez n'existe pas ou a été supprimé.</p>
          <div className="flex justify-center">
            <Button
              onClick={() => navigate('/')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded shadow-lg"
            >
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const rented = isRented(movie.id);
  const inCart = isInCart(movie.id);
  const rentalInfo = rented ? getRentalByMovieId(movie.id) : null;

  const formatDate = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleDateString('fr-FR');
  };

  const handleAddToCart = () => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: location } });
      return;
    }
    // NETTOYAGE : addToCart du contexte gère maintenant la notification tout seul
    addToCart(movie);
  };

  const handleRentNow = () => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: location } });
      return;
    }
    rentMovie(movie);
    navigate('/my-rentals');
  };

  return (
    <>
      <Navbar movies={moviesData} onSearch={() => {}} transparentWhenScrolled />
      <main className="min-h-screen bg-black text-white pt-20">
        <div
          className="relative h-[60vh] w-full bg-black bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
          <div className="absolute left-0 right-0 bottom-16 z-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <BreadCrumb
                  items={[
                    { label: 'Films', path: '/search' },
                    { label: movie.genre },
                    { label: movie.title },
                  ]}
                />
                <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white drop-shadow-lg leading-tight">{movie.title}</h1>
                <div className="flex flex-wrap items-center gap-3 mt-8 mb-6">
                  <span className="bg-primary px-3 py-1 rounded text-sm font-bold">{movie.rating}/10</span>
                  <span className="text-gray-300">{movie.year}</span>
                  <span className="text-gray-300">{movie.duration} min</span>
                  <span className="border border-gray-500 px-2 py-0.5 text-sm rounded">{movie.genre}</span>
                </div>

                <div className="flex items-center gap-3 mb-2 mt-2">
                  <button
                    onClick={() => setIsLiked((s) => !s)}
                    className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-all cursor-pointer ${isLiked ? 'bg-red-600 text-white' : 'bg-white/10 text-white'}`}>
                    {isLiked ? '♥ Aimé' : "♡ J'aime"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 mt-8">
          <div className="grid md:grid-cols-4 gap-6 items-start">
            <div className="md:col-span-3">
              <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
              <p className="text-gray-300 leading-relaxed mb-6">{movie.description}</p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-10">
                <Button 
                    onClick={() => navigate('/')} 
                    className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded font-bold transition-colors cursor-pointer flex items-center justify-center"
                >
                     Retour à l'accueil
                </Button>

                {rented ? (
                  <div className="bg-green-900/40 border border-green-500 text-green-400 px-6 py-3 rounded font-semibold flex items-center justify-center w-full sm:w-auto">
                    ✓ Film loué jusqu'au {formatDate(rentalInfo?.expiryDate)}
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handleRentNow}
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-bold transition-colors cursor-pointer flex items-center justify-center"
                    >
                      Louer maintenant - {movie.price}€
                    </button>

                    <button
                      onClick={inCart ? null : handleAddToCart}
                      className={`px-8 py-3 rounded font-bold transition-colors flex items-center justify-center ${
                        inCart
                          ? 'bg-gray-800 border border-gray-500 text-white cursor-default'
                          : 'bg-gray-700 hover:bg-gray-600 text-white cursor-pointer'
                      }`}
                    >
                      {inCart ? '✓ Dans le panier' : '+ Ajouter au panier'}
                    </button>
                  </>
                )}
              </div>

              <div className="bg-gray-900 p-4 rounded">
                <h4 className="font-semibold mb-2">Informations</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li><strong>Genre:</strong> <span className="ml-2">{movie.genre}</span></li>
                  <li><strong>Année:</strong> <span className="ml-2">{movie.year}</span></li>
                  <li><strong>Durée:</strong> <span className="ml-2">{movie.duration} min</span></li>
                  <li><strong>Note:</strong> <span className="ml-2">{movie.rating}/10</span></li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-1 flex justify-center md:justify-end relative mt-6 md:mt-0">
              <img src={movie.poster} alt={`${movie.title} poster`} className="w-56 md:w-80 rounded shadow-lg" />
              
              {/* NETTOYAGE : L'ancienne notification locale a été supprimée d'ici */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MovieDetail;