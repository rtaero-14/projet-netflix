import React from 'react';
import { Link } from 'react-router-dom';

function BreadCrumb({ items = [] }) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6" aria-label="Fil d'ariane">
      <Link to="/" className="hover:text-white transition">
        Accueil
      </Link>

      {items.map((item, index) => (
        <span key={index} className="flex items-center space-x-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>

          {item.path ? (
            <Link to={item.path} className="hover:text-white transition">
              {item.label}
            </Link>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export default BreadCrumb;
