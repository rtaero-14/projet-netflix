import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import SearchBar from '../components/common/SearchBar';
import MovieHero from '../components/movies/MovieHero';
import MovieCard from '../components/movies/MovieCard';
import MovieFilter from '../components/movies/MovieFilter';
import MovieList from '../components/movies/MovieList';
import Footer from '../components/layout/Footer';
import moviesData from '../../../data/movies.json';

function Home() {
    // charger tous les films et initialiser filteredMovies
    const [allMovies] = useState(moviesData || []);
    const [filteredMovies, setFilteredMovies] = useState(allMovies);

    const featuredMovie = allMovies && allMovies.length ? allMovies[0] : null;
    const popularMovies = allMovies.slice(0, 5);
    const genre = 'Action';
    const genreMovies = allMovies.filter((m) => m.genre && m.genre.includes(genre)).slice(0, 5);

    const recentMovies = allMovies.filter((m) => {
        const y = Number(m.year);
        return !Number.isNaN(y) && y > 2010;
    }).slice(0, 5);

    return (
        <main className="bg-black min-h-screen text-white font-sans pt-20">

            {/* Fixed Navbar */}
            <Navbar />

            <div className="display flex w-full">
                {featuredMovie && <MovieHero movie={featuredMovie} />}
            </div>

            <div className="-mt-32 relative z-10 space-y-8 pb-12">
                <div className="container mx-auto px-4">
                    <MovieFilter movies={allMovies} onFilter={setFilteredMovies} />
                    <MovieList title="Films disponibles" movies={filteredMovies} />
                </div>
                <div className="-mt-32 relative z-10 space-y-8 pb-12">
                    <section className="py-8">
                        <div className="flex items-center justify-between px-4 mb-4">
                            <h2 className="text-2xl md:text-3xl font-bold">Tendances actuelles</h2>
                        </div>
                        <div className="overflow-x-auto no-scrollbar px-4">
                            <div className="flex space-x-4">
                                {popularMovies.map((m) => (
                                    <div key={m.id} className="min-w-[160px] max-w-[200px]">
                                        <MovieCard movie={m} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="py-8">
                        <div className="flex items-center justify-between px-4 mb-4">
                            <h2 className="text-2xl md:text-3xl font-bold">{genre} & Aventure</h2>
                        </div>
                        <div className="overflow-x-auto no-scrollbar px-4">
                            <div className="flex space-x-4">
                                {genreMovies.map((m) => (
                                    <div key={m.id} className="min-w-[160px] max-w-[200px]">
                                        <MovieCard movie={m} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="py-8">
                        <div className="flex items-center justify-between px-4 mb-4">
                            <h2 className="text-2xl md:text-3xl font-bold">Films récents</h2>
                        </div>
                        <div className="overflow-x-auto no-scrollbar px-4">
                            <div className="flex space-x-4">
                                {recentMovies.map((m) => (
                                    <div key={m.id} className="min-w-[160px] max-w-[200px]">
                                        <MovieCard movie={m} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}

export default Home;
