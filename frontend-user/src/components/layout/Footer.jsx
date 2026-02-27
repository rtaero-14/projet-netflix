import React from 'react';

function Footer({ className = '' }) {
	return (
		<footer className={`bg-[#0b0b0b] text-gray-300 mt-16 ${className}`}>
			<div className="container mx-auto px-6 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<h4 className="text-white font-semibold mb-3">À propos</h4>
						<ul className="space-y-2 text-sm">
							<li><a href="#" className="text-gray-400 hover:text-white">Qui sommes-nous</a></li>
							<li><a href="#" className="text-gray-400 hover:text-white">Emplois</a></li>
							<li><a href="#" className="text-gray-400 hover:text-white">Presse</a></li>
						</ul>
					</div>

					<div>
						<h4 className="text-white font-semibold mb-3">Aide</h4>
						<ul className="space-y-2 text-sm">
							<li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
							<li><a href="#" className="text-gray-400 hover:text-white">Centre d'aide</a></li>
							<li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
						</ul>
					</div>

					<div>
						<h4 className="text-white font-semibold mb-3">Légal</h4>
						<ul className="space-y-2 text-sm">
							<li><a href="#" className="text-gray-400 hover:text-white">Confidentialité</a></li>
							<li><a href="#" className="text-gray-400 hover:text-white">Conditions</a></li>
							<li><a href="#" className="text-gray-400 hover:text-white">Mentions légales</a></li>
						</ul>
					</div>

					<div>
						<h4 className="text-white font-semibold mb-3">Réseaux</h4>
						<ul className="space-y-2 text-sm">
							<li><a href="#" className="text-gray-400 hover:text-white">Facebook</a></li>
							<li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
							<li><a href="#" className="text-gray-400 hover:text-white">Instagram</a></li>
						</ul>
					</div>
				</div>

				<div className="mt-8">
					<div className="flex justify-center space-x-4">
						<a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
							<svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99H7.898v-2.888h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.888h-2.33v6.99C18.343 21.128 22 16.991 22 12z"/>
							</svg>
						</a>
						<a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
							<svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path d="M22.162 5.656c-.77.342-1.596.572-2.462.676a4.297 4.297 0 001.887-2.373 8.59 8.59 0 01-2.72 1.04 4.284 4.284 0 00-7.297 3.905A12.15 12.15 0 013 4.797a4.284 4.284 0 001.326 5.72 4.24 4.24 0 01-1.94-.536v.054a4.284 4.284 0 003.435 4.2 4.302 4.302 0 01-1.935.073 4.287 4.287 0 004.001 2.972A8.59 8.59 0 012 19.54a12.114 12.114 0 006.56 1.92c7.875 0 12.189-6.526 12.189-12.19 0-.186-.004-.372-.013-.557a8.712 8.712 0 002.028-2.047z"/>
							</svg>
						</a>
						<a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
							<svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-3a1 1 0 100 2 1 1 0 000-2z"/>
							</svg>
						</a>
					</div>
				</div>

				<hr className="border-gray-800 my-6" />

				<div className="text-center text-gray-500 text-sm">
					<p>© 2026 Netflix Clone — Projet pédagogique IUT Informatique — Limoges</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;

