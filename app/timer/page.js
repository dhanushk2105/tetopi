'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';

// Data
import { defaultTeaTypes } from '@/data/defaultTeaTypes';

// Components
import CustomTeaForm from '@/components/CustomTeaForm';
import TeaTypeSelector from '@/components/TeaTypeSelector';
import TeaVariantsList from '@/components/TeaVariantsList';
import TimerModal from '@/components/TimerModal';

export default function TeaTimerPage() {
  const [teaTypes, setTeaTypes] = useState(defaultTeaTypes);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);

  // Load custom fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  // Load custom teas from local storage
  useEffect(() => {
    const savedCustomTeas = localStorage.getItem('customTeas');
    if (savedCustomTeas) {
      const parsed = JSON.parse(savedCustomTeas);
      setTeaTypes((prev) => ({
        ...prev,
        "Custom Blends": {
          ...prev["Custom Blends"],
          variants: parsed
        }
      }));
    }
  }, []);

  // Handle saving a custom tea
  const handleSaveCustomTea = (customTea) => {
    const timeInSeconds = parseInt(customTea.time, 10);
    const newCustomTea = {
      name: customTea.name,
      time: timeInSeconds,
      temp: `${customTea.temp}°C`
    };

    const updatedCustomTeas = [...teaTypes["Custom Blends"].variants, newCustomTea];
    setTeaTypes((prev) => ({
      ...prev,
      "Custom Blends": {
        ...prev["Custom Blends"],
        variants: updatedCustomTeas
      }
    }));
    localStorage.setItem('customTeas', JSON.stringify(updatedCustomTeas));
    setShowCustomForm(false);
  };

  // Handle deleting a custom tea
  const handleDeleteCustomTea = (teaName) => {
    const updatedCustomTeas = teaTypes["Custom Blends"].variants.filter(
      (tea) => tea.name !== teaName
    );
    setTeaTypes((prev) => ({
      ...prev,
      "Custom Blends": {
        ...prev["Custom Blends"],
        variants: updatedCustomTeas
      }
    }));
    localStorage.setItem('customTeas', JSON.stringify(updatedCustomTeas));
  };

  return (
    <div className="min-h-screen bg-cream text-brown font-press-start p-4">
      {/* Header */}
      <header className="max-w-4xl mx-auto py-6 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-light-brown hover:text-brown transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </a>
        <h1 className="text-2xl font-bold flex-1 text-center">Perfect Timing</h1>
      </header>

      <main className="max-w-4xl mx-auto mt-8">
        {/* Tea Type Selector */}
        <TeaTypeSelector
          teaTypes={teaTypes}
          selectedType={selectedType}
          onSelect={(type) => setSelectedType(type)}
        />

        {/* Custom Tea Blends button */}
        {selectedType === "Custom Blends" && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowCustomForm(true)}
              className="bg-purple-200 px-6 py-3 rounded-lg inline-flex items-center gap-2 hover:bg-purple-300 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Custom Tea
            </button>
          </div>
        )}

        {/* Custom Tea Form */}
        {showCustomForm && (
          <CustomTeaForm
            onClose={() => setShowCustomForm(false)}
            onSave={handleSaveCustomTea}
          />
        )}

        {/* Tea Variants List */}
        <TeaVariantsList
          teaTypes={teaTypes}
          selectedType={selectedType}
          selectedVariant={selectedVariant}
          onSelectVariant={(variant) => {
            setSelectedVariant(variant);
            setShowTimerModal(true);
          }}
          onDeleteCustomTea={handleDeleteCustomTea}
        />

        {/* Timer Modal */}
        <TimerModal
          showTimerModal={showTimerModal}
          setShowTimerModal={setShowTimerModal}
          selectedType={selectedType}
          selectedVariant={selectedVariant}
          teaTypes={teaTypes}
        />
      </main>
    </div>
  );
}
