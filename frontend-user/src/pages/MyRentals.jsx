import React from 'react';
import Footer from '../components/layout/Footer';

export default function MyRentals() {
  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Mes locations</h1>
        <p className="text-gray-300">Vous n'avez encore aucune location.</p>
      </div>
      <Footer />
    </main>
  );
}
