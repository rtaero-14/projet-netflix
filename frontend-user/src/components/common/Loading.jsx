import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />
        <div className="text-gray-300">Chargement...</div>
      </div>
    </div>
  );
}
