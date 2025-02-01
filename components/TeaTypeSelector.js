'use client';

import React from 'react';
import { Coffee } from 'lucide-react';

export default function TeaTypeSelector({ teaTypes, selectedType, onSelect }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {Object.entries(teaTypes).map(([type, info]) => (
        <button
        key={type}
        onClick={() => onSelect(type)}
        className={`
          ${info.color} p-4 rounded-lg text-center 
          hover:transform hover:scale-105 transition-all duration-300
          shadow-sm hover:shadow-md
          ${selectedType === type ? 'ring-2 ring-light-brown' : ''}
          backdrop-blur-sm backdrop-filter
          relative overflow-hidden
          group
        `}
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Coffee className="w-8 h-8 mx-auto mb-2 text-light-brown relative z-10" />
        <span className="text-sm relative z-10">{type}</span>
      </button>
      ))}
    </div>
  );
}
