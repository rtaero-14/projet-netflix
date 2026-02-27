import React, { useState, useMemo } from 'react';

function MovieFilter({ movies = [], onFilter = () => {} }) {
	const [selectedGenre, setSelectedGenre] = useState('all');

	const genres = useMemo(() => {
		const set = new Set();
		movies.forEach((m) => {
			if (m.genre) set.add(m.genre);
		});
		return Array.from(set).sort();
	}, [movies]);

	const handleGenreChange = (genre) => {
		setSelectedGenre(genre);

		if (genre === 'all') {
			onFilter(movies);
		} else {
			const filtered = movies.filter((m) => m.genre === genre);
			onFilter(filtered);
		}
	};

	return (
		<div className="flex flex-wrap gap-2 mb-6 px-4">
			<button
				onClick={() => handleGenreChange('all')}
				className={`px-4 py-2 rounded-lg transition cursor-pointer ${
					selectedGenre === 'all' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
				}`}
			>
				Tous
			</button>

			{/* Mapper les genres en boutons */}
			{genres.map((g) => (
				<button
					key={g}
					onClick={() => handleGenreChange(g)}
					className={`px-4 py-2 rounded-lg transition cursor-pointer ${
						selectedGenre === g ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
					}`}
				>
					{g}
				</button>
			))}
		</div>
	);
}

export default MovieFilter;