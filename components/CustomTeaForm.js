'use client';

import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

export default function CustomTeaForm({ onClose, onSave }) {
  const [customTea, setCustomTea] = useState({
    name: '',
    minutes: '',
    seconds: '',
    temp: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert minutes and seconds to numbers, defaulting to 0 if empty
    const minutes = parseInt(customTea.minutes) || 0;
    const seconds = parseInt(customTea.seconds) || 0;
    
    // Calculate total seconds
    const totalSeconds = (minutes * 60) + seconds;
    
    // Create the tea object with the correct format
    const newTea = {
      name: customTea.name,
      time: totalSeconds,  // This is the total time in seconds
      temp: `${customTea.temp}°C`
    };

    console.log('Saving tea with time:', { 
      minutes, 
      seconds, 
      totalSeconds,
      newTea 
    });

    onSave(newTea);
    setCustomTea({ name: '', minutes: '', seconds: '', temp: '' });
  };

  const handleTimeChange = (field, value) => {
    // Ensure the value is a valid number between 0 and 59
    let numValue = parseInt(value) || 0;
    numValue = Math.min(59, Math.max(0, numValue));

    setCustomTea(prev => ({
      ...prev,
      [field]: numValue.toString()
    }));
  };

  // Validate if we have at least some time set
  const isTimeValid = (parseInt(customTea.minutes) > 0 || parseInt(customTea.seconds) > 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-md">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg">Add Custom Tea</h3>
          <button
            onClick={onClose}
            className="text-light-brown hover:text-brown"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Tea Name</label>
            <input
              type="text"
              value={customTea.name}
              onChange={(e) => setCustomTea(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 rounded border border-light-brown bg-white focus:ring-2 focus:ring-light-brown focus:outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm mb-2">Steep Time</label>
            <div className="flex gap-2">
              <div className="flex-1">
                <div className="flex items-center">
                  <input
                    type="number"
                    value={customTea.minutes}
                    onChange={(e) => handleTimeChange('minutes', e.target.value)}
                    className="w-full p-2 rounded-l border border-light-brown bg-white focus:ring-2 focus:ring-light-brown focus:outline-none"
                    min="0"
                    max="59"
                    placeholder="0"
                  />
                  <span className="bg-gray-50 px-3 py-2 border border-l-0 border-light-brown text-sm">
                    min
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <input
                    type="number"
                    value={customTea.seconds}
                    onChange={(e) => handleTimeChange('seconds', e.target.value)}
                    className="w-full p-2 rounded-l border border-light-brown bg-white focus:ring-2 focus:ring-light-brown focus:outline-none"
                    min="0"
                    max="59"
                    placeholder="0"
                  />
                  <span className="bg-gray-50 px-3 py-2 border border-l-0 border-light-brown text-sm">
                    sec
                  </span>
                </div>
              </div>
            </div>
            {/* Show total time preview */}
            {isTimeValid && (
              <p className="text-sm text-gray-600 mt-1">
                Total time: {customTea.minutes || '0'}m {customTea.seconds || '0'}s
              </p>
            )}
            {!isTimeValid && (
              <p className="text-red-500 text-xs mt-1">Please set at least some time</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-2">Temperature (°C)</label>
            <input
              type="number"
              value={customTea.temp}
              onChange={(e) => setCustomTea(prev => ({ ...prev, temp: e.target.value }))}
              className="w-full p-2 rounded border border-light-brown bg-white focus:ring-2 focus:ring-light-brown focus:outline-none"
              required
              min="50"
              max="100"
            />
          </div>

          <button
            type="submit"
            disabled={!isTimeValid}
            className={`
              w-full py-3 rounded-lg flex items-center justify-center gap-2 
              transition-all duration-200 shadow-lg hover:shadow-xl 
              hover:-translate-y-0.5 transform
              ${!isTimeValid 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-green text-cream hover:bg-light-green'}
            `}
          >
            <Save className="w-5 h-5" />
            Save Tea
          </button>
        </form>
      </div>
    </div>
  );
}