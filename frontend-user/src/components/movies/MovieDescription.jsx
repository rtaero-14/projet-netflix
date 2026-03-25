import React, { useState } from 'react';

export default function MovieDescription({ description }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => setIsExpanded((s) => !s);

  return (
    <div className="w-full">
      <p className={isExpanded ? 'text-xs text-gray-200 leading-relaxed mb-3' : 'text-xs text-gray-400 line-clamp-2 mb-3'}>
        {description}
      </p>
      <button
        type="button"
        onClick={toggle}
        className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer"
      >
        {isExpanded ? 'Voir moins' : 'Voir plus'}
      </button>
    </div>
  );
}
