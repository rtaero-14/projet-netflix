import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import moviesData from '../../../data/movies.json';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const movie = (moviesData || []).find((m) => String(m.id) === String(id));
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const handleAddToCart = () => {
    const isAuthenticated = localStorage.getItem('user') !== null;
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }

    window.dispatchEvent(new CustomEvent('add-to-cart', { detail: movie }));
  };

  return (
    <>
      <Navbar movies={moviesData} onSearch={() => {}} />
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
                <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white drop-shadow-lg leading-tight">{movie.title}</h1>
                <div className="flex flex-wrap items-center gap-3 mt-2 mb-3">
                  <span className="bg-primary px-3 py-1 rounded text-sm font-bold">{movie.rating}/10</span>
                  <span className="text-gray-300">{movie.year}</span>
                  <span className="text-gray-300">{movie.duration} min</span>
                  <span className="border border-gray-500 px-2 py-0.5 text-sm rounded">{movie.genre}</span>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <Button size="md" className="px-3 py-2" onClick={handleAddToCart}>
                    ▶ Louer {movie.price}€
                  </Button>
                  <button
                    onClick={() => setIsLiked((s) => !s)}
                    className={`ml-2 inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-semibold transition-all cursor-pointer ${isLiked ? 'bg-red-600 text-white' : 'bg-white/10 text-white'}`}>
                    {isLiked ? '♥ Aimé' : "♡ J'aime"}
                  </button>
                  <Button onClick={() => navigate('/')} className="ml-3 bg-red-600 hover:bg-red-700 text-white px-3 py-2">
                    Retour à l'accueil
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

  <div className="container mx-auto px-4 py-8 mt-8">
          <div className="grid md:grid-cols-4 gap-6 items-start">
            <div className="md:col-span-3">
              {/* Actions moved into the hero overlay above; content starts below the hero */}

              <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
              <p className="text-gray-300 leading-relaxed mb-6">{movie.description}</p>

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

            <div className="md:col-span-1 flex justify-center md:justify-end">
              <img src={movie.poster} alt={`${movie.title} poster`} className="w-56 md:w-80 rounded shadow-lg" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MovieDetail;
