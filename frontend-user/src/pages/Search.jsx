import React, { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import moviesData from '../../../data/movies.json';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';

function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = (searchParams.get('q') || '').trim();
  const selectedGenre = searchParams.get('genre') || 'Tous les genres';
  const selectedSort = searchParams.get('sort') || 'note';

  const allGenres = useMemo(() => {
    const values = Array.from(new Set((moviesData || []).map((m) => m.genre).filter(Boolean)));
    return ['Tous les genres', ...values];
  }, []);

  const filteredAndSorted = useMemo(() => {
    const q = query.toLowerCase();
    let items = (moviesData || []).filter((movie) => {
      if (!q) return true;
      return (movie.title || '').toLowerCase().includes(q)
        || (movie.description || '').toLowerCase().includes(q)
        || (movie.genre || '').toLowerCase().includes(q);
    });

    if (selectedGenre !== 'Tous les genres') {
      items = items.filter((movie) => movie.genre === selectedGenre);
    }

    const sorted = [...items];
    if (selectedSort === 'note') sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (selectedSort === 'year') sorted.sort((a, b) => (b.year || 0) - (a.year || 0));
    if (selectedSort === 'title') sorted.sort((a, b) => (a.title || '').localeCompare((b.title || '')));

    return sorted;
  }, [query, selectedGenre, selectedSort]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === '') next.delete(key);
    else next.set(key, value);
    navigate(`/search?${next.toString()}`);
  };

  return (
    <>
      <Navbar movies={moviesData} onSearch={() => {}} />
      <main className="min-h-screen bg-black text-white pt-24">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Resultats pour "{query}"</h1>
          <p className="text-sm text-gray-400 mb-5">{filteredAndSorted.length} film(s) trouve(s)</p>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <select
              value={selectedGenre}
              onChange={(e) => updateParam('genre', e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm"
            >
              {allGenres.map((genre) => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>

            <select
              value={selectedSort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm"
            >
              <option value="note">Note</option>
              <option value="year">Annee</option>
              <option value="title">Titre</option>
            </select>
          </div>

          {filteredAndSorted.length === 0 ? (
            <div className="text-gray-400">Aucun resultat.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredAndSorted.map((movie) => (
                <article
                  key={movie.id}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="relative rounded-lg overflow-hidden bg-[#111827] border border-slate-800 cursor-pointer hover:border-slate-600 transition-colors"
                >
                  <div className="relative">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-64 md:h-72 object-cover"
                      loading="lazy"
                    />
                    <span className="absolute top-1 right-1 bg-black/85 text-yellow-400 text-xs font-bold px-1.5 py-0.5 rounded">
                      ★ {movie.rating}
                    </span>
                  </div>
                  <div className="p-2">
                    <h2 className="text-sm font-semibold text-white truncate">{movie.title}</h2>
                    <div className="mt-2 inline-block text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded">
                      {movie.genre}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer className="mt-8" />
    </>
  );
}

export default Search;
