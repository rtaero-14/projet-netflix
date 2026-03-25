import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from '../common/Button';
import MovieDescription from './MovieDescription';

function MovieCard({ movie }) {
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart(); // Récupération de la fonction depuis le contexte
  const navigate = useNavigate();

  const toggleLike = () => {
    setIsLiked((s) => !s);
  };

  const genreColors = {
    'Action': 'bg-red-500',
    'Comédie': 'bg-yellow-500',
    'Drame': 'bg-blue-500',
    'Science-Fiction': 'bg-purple-500',
    'Horreur': 'bg-orange-500',
    'Thriller': 'bg-gray-500'
  };
  
  return (
    <>
      <div
        className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
        onClick={() => navigate(`/movie/${movie.id}`)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/movie/${movie.id}`); }}
      >
        {/* Image */}
        <div className="relative aspect-[2/3]">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />

          {/* Badge Note */}
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
            <span className="text-sm font-bold text-yellow-400">⭐{movie.rating}</span>
          </div>
          <div className="absolute top-2 left-2">
            <span className={`ml-2 text-xs font-semibold ${genreColors[movie.genre] || 'bg-gray-500'} text-white px-1 rounded`}>
              {movie.genre}
            </span>
          </div>
        </div>

        {/* Overlay au survol */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-lg font-bold text-white mb-1">{movie.title}</h3>

          <div className="flex items-center space-x-2 text-xs text-gray-300 mb-2">
            <span className="text-green-400 font-semibold">{movie.rating}/10</span>
            <span className="text-gray-400">{movie.year}</span>
            <span className="text-gray-400">{movie.duration}min</span>
          </div>

          {/* Description inline with toggle */}
          <MovieDescription description={movie.description} />

          <div className="flex flex-col sm:flex-row gap-2 mt-3">
            <Button
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(movie);
              }}
            >
              ▶ Louer {movie.price}€
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`text-xs ${isLiked ? 'bg-red-600 border-red-600 text-white' : ''}`}
              onClick={(e) => { e.stopPropagation(); toggleLike(); }}
            >
              {isLiked ? '♥ Aimé' : '♡ J\'aime'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieCard;