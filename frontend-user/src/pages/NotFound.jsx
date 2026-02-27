import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="mb-6">Page non trouvée.</p>
        <Link to="/" className="underline">Retour à l'accueil</Link>
      </div>
    </div>
  );
}
