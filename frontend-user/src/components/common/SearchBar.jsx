import { useState, useRef, useEffect } from 'react';

function SearchBar() {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	const handleChange = (e) => {
		const v = e.target.value;
		setSearchTerm(v);
		console.log('Recherche (change):', v);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Recherche (submit):', searchTerm);
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

			{/* Input de recherche (apparaît au clic) */}
			{isOpen && (
				<div className="absolute top-12 right-0 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-2 z-50">
					<form onSubmit={handleSubmit} className="flex items-center">
						<input
							type="text"
							value={searchTerm}
							onChange={handleChange}
							placeholder="Rechercher un film..."
							className="w-64 px-4 py-2 bg-gray-900 border border-gray-700 rounded-l-lg focus:outline-none focus:border-primary text-white"
							autoFocus
						/>
						<button
							type="submit"
							className="px-3 py-2 bg-primary text-white rounded-r-lg ml-2 text-sm"
						>
							Rechercher
						</button>
					</form>
				</div>
			)}
		</div>
	);
}

export default SearchBar;