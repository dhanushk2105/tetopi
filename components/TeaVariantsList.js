'use client';

import React from 'react';
import { X } from 'lucide-react';

export default function TeaVariantsList({
  teaTypes,
  selectedType,
  selectedVariant,
  onSelectVariant,
  onDeleteCustomTea
}) {
  if (!selectedType) return null;

  const { variants } = teaTypes[selectedType];

  if (variants.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl mb-4 text-center">Select Variety</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {variants.map((variant) => (
          <div
            key={variant.name}
            className="relative group"
          >
            <button
              onClick={() => onSelectVariant(variant)}
              className={`
                w-full p-4 bg-white bg-opacity-50 rounded-lg text-center 
                hover:bg-opacity-75 transition-all duration-200
                transform hover:scale-105 hover:shadow-lg
                ${selectedVariant?.name === variant.name ? 'ring-2 ring-light-brown' : ''}
              `}
            >
              <p className="font-bold mb-2">{variant.name}</p>
              <p className="text-sm text-light-brown">
                {Math.floor(variant.time / 60)}:
                {(variant.time % 60).toString().padStart(2, '0')} mins • {variant.temp}
              </p>
            </button>
            {/* If in "Custom Blends", allow deletion */}
            {selectedType === "Custom Blends" && (
              <button
                onClick={() => onDeleteCustomTea(variant.name)}
                className={`
                  absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full 
                  hover:bg-red-600 transition-colors transform hover:scale-110
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200
                  shadow-lg
                `}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
