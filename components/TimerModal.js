'use client';

import React, { useState, useEffect } from 'react';
import { X, Pause, Play, RefreshCw, Thermometer } from 'lucide-react';

export default function TimerModal({
  showTimerModal,
  setShowTimerModal,
  selectedType,
  selectedVariant,
  teaTypes
}) {
  const [timeLeft, setTimeLeft] = useState(selectedVariant?.time || 0);
  const [isRunning, setIsRunning] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    setTimeLeft(selectedVariant?.time || 0);
    setIsRunning(false);
    setShowCompleted(false);
  }, [selectedVariant]);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            setShowCompleted(true);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  // Display time in a more readable format for the tea name
  const formatDisplayTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (minutes === 0) {
      return `${seconds}s`;
    } else if (seconds === 0) {
      return `${minutes}m`;
    }
    return `${minutes}m ${seconds}s`;
  };

  if (!showTimerModal) return null;

  const progress = ((selectedVariant?.time - timeLeft) / selectedVariant?.time) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-md">
      <div 
        className={`
          w-full max-w-md rounded-2xl p-8 
          bg-white ${teaTypes[selectedType].theme} bg-opacity-100
          shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] 
          border border-white border-opacity-20
          backdrop-filter backdrop-blur-lg
          relative
          transform transition-all duration-300 ease-out
        `}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white to-transparent opacity-50 pointer-events-none" />
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-white to-transparent opacity-10 pointer-events-none" />
        
        <div className="relative z-10">
          {/* Header with time display */}
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-1">
              <h3 className="text-xl font-press-start relative">
                {selectedVariant?.name}
              </h3>
              <p className="text-sm text-gray-600">
                Set for: {formatDisplayTime(selectedVariant?.time)}
              </p>
            </div>
            <button 
              onClick={() => {
                setShowTimerModal(false);
                setIsRunning(false);
              }}
              className="text-brown hover:text-light-brown transition-colors p-2 rounded-full hover:bg-black hover:bg-opacity-5"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Temperature indicator */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black bg-opacity-5 border border-white border-opacity-20 shadow-inner">
              <Thermometer className="w-5 h-5" />
              <span className="font-press-start text-sm">{selectedVariant?.temp}</span>
            </div>
          </div>

          {/* Timer circle */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle */}
              <circle
                className="stroke-current text-white/25"
                fill="none"
                strokeWidth="8"
                cx="50%"
                cy="50%"
                r="46%"
              />
              
              {/* Progress circle */}
              <circle
                className={`
                  stroke-current transition-all duration-300 ease-linear
                  ${teaTypes[selectedType].accent}
                `}
                fill="none"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${progress * 2.89}, 289`}
                cx="50%"
                cy="50%"
                r="46%"
              />
            </svg>

            {/* Digital time display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-press-start text-4xl drop-shadow-md">
                {formatTime(timeLeft)}
              </span>
            </div>

            {/* Loading dots */}
            {isRunning && (
              <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
                <div className="w-2 h-2 bg-brown rounded-full animate-bounce shadow-md" />
                <div className="w-2 h-2 bg-brown rounded-full animate-bounce shadow-md" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-brown rounded-full animate-bounce shadow-md" style={{ animationDelay: '0.4s' }} />
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setIsRunning(!isRunning);
                setShowCompleted(false);
              }}
              className={`
                ${teaTypes[selectedType].accent} text-white p-4 rounded-full 
                hover:opacity-90 transition-all duration-200
                shadow-lg hover:shadow-xl hover:-translate-y-0.5
                active:shadow-md active:translate-y-0
              `}
            >
              {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={() => {
                setTimeLeft(selectedVariant.time);
                setIsRunning(false);
                setShowCompleted(false);
              }}
              className={`
                ${teaTypes[selectedType].accent} text-white p-4 rounded-full 
                hover:opacity-90 transition-all duration-200
                shadow-lg hover:shadow-xl hover:-translate-y-0.5
                active:shadow-md active:translate-y-0
              `}
            >
              <RefreshCw className="w-6 h-6" />
            </button>
          </div>

          {/* Completion message */}
          {showCompleted && (
            <div className="text-center mt-6">
              <div className="font-press-start text-xl animate-bounce drop-shadow-lg">
                ¡Tea is ready! ☕️
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}