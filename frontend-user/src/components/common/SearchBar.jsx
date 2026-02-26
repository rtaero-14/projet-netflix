import { useState, useRef, useEffect, useMemo } from 'react';

function SearchBar({ movies = [], onSearch = () => {} }) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	const handleChange = (e) => {
		const v = e.target.value;
		setSearchTerm(v);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Recherche (submit):', searchTerm);
		onSearch(searchTerm);
	};

	const containerRef = useRef(null);

	useEffect(() => {
		if (!isOpen) return;

		const handleOutsideClick = (e) => {
			if (containerRef.current && !containerRef.current.contains(e.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		return () => document.removeEventListener('mousedown', handleOutsideClick);
	}, [isOpen]);

	const suggestions = useMemo(() => {
		const q = (searchTerm || '').trim().toLowerCase();
		if (q.length >= 2) {
			return movies.filter((m) => {
				const title = (m.title || '').toLowerCase();
				const desc = (m.description || '').toLowerCase();
				return title.includes(q) || desc.includes(q);
			}).slice(0, 5);
		}
		return [];
	}, [searchTerm, movies]);

	return (
		<div className="relative" ref={containerRef}>
			{/* Bouton de recherche */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="hover:text-gray-300 transition-colors"
				aria-label="Ouvrir la recherche"
			>
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</button>

			{/* Input de recherche*/}
			{isOpen && (
				<div className="absolute top-full right-0 mt-2 shadow-lg z-50 w-96">
					<div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
						<form onSubmit={handleSubmit} className="flex">
							<input
								type="text"
								value={searchTerm}
								onChange={handleChange}
								placeholder="Rechercher un film..."
								className="flex-1 px-4 py-2 bg-gray-900 text-white focus:outline-none"
								autoFocus
							/>
							<button
								type="submit"
								className="px-4 py-2 bg-primary text-white text-sm"
							>
								Rechercher
							</button>
						</form>
					</div>

					{/* Dropdown suggestions */}
					{suggestions.length > 0 && (
						<ul className="mt-2 max-h-52 overflow-auto bg-gray-900 border border-gray-700 rounded-lg w-96">
							{suggestions.map((m) => (
								<li
									key={m.id}
									className="px-3 py-2 hover:bg-gray-800 rounded cursor-pointer text-sm"
									onClick={() => {
										setSearchTerm(m.title);
										setIsOpen(false);
										onSearch(m);
									}}
								>
									<div className="font-semibold">{m.title}</div>
									<div className="text-xs text-gray-400">{m.year} • {m.genre}</div>
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	);
}

export default SearchBar;