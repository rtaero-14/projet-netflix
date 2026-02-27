import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer';

const getRentalsForCurrentUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user?.email) return [];

    const rentalsByUser = JSON.parse(localStorage.getItem('netflix_rentals_by_user') || '{}');
    return Array.isArray(rentalsByUser[user.email]) ? rentalsByUser[user.email] : [];
  } catch {
    return [];
  }
};

export default function MyRentals() {
  const navigate = useNavigate();
  const [rentals, setRentals] = useState(() => getRentalsForCurrentUser());

  useEffect(() => {
    const syncRentals = () => {
      setRentals(getRentalsForCurrentUser());
    };

    window.addEventListener('rentals-updated', syncRentals);
    window.addEventListener('storage', syncRentals);

    return () => {
      window.removeEventListener('rentals-updated', syncRentals);
      window.removeEventListener('storage', syncRentals);
    };
  }, []);

  const formatRentedDate = (rentedAt) => {
    if (!rentedAt) return 'Date indisponible';
    const parsed = new Date(rentedAt);
    if (Number.isNaN(parsed.getTime())) return 'Date indisponible';
    return parsed.toLocaleDateString('fr-FR');
  };

  return (
    <main className="min-h-screen bg-black text-white pt-20 flex flex-col">
      <div className="container mx-auto px-4 py-12 flex-1">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Mes locations</h1>

        {rentals.length === 0 ? (
          <p className="text-gray-300">Vous n'avez encore aucune location.</p>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rentals.map((rental) => (
                <article
                  key={rental.id}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-3 cursor-pointer hover:border-red-500 transition-colors"
                  onClick={() => navigate(`/movie/${rental.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') navigate(`/movie/${rental.id}`);
                  }}
                >
                  <div className="flex gap-3">
                    <img
                      src={rental.poster || rental.backdrop || ''}
                      alt={rental.title}
                      className="w-20 h-28 object-cover rounded"
                    />
                    <div>
                      <h2 className="font-semibold text-white">{rental.title}</h2>
                      <p className="text-sm text-gray-400 mt-1">{rental.genre}</p>
                      <p className="text-sm text-gray-300 mt-2">{(rental.price || 0).toFixed(2)}€</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Loué le {formatRentedDate(rental.rentedAt)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        <div className="mt-10">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded cursor-pointer"
          >
            Retour a l'accueil
          </button>
        </div>
      </div>
      <Footer className="mt-6" />
    </main>
  );
}
