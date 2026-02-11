import MovieCard from './MovieCard';
import moviesData from '../../../../data/movies.json';

function MovieList({ title, movies = [] }) {
	const items = movies && movies.length ? movies : moviesData;
	return (
		<section className="py-8">
			<h2 className="text-2xl md:text-3xl font-bold mb-6 px-4">{title}</h2>

			{items.length === 0 ? (
				<div className="px-4 text-sm text-gray-400">Aucun film disponible.</div>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
					{items.map((movie) => (
						<MovieCard key={movie.id} movie={movie} />
					))}
				</div>
			)}
		</section>
	);
}

export default MovieList;