'use client';

import React, { useState, useEffect } from 'react';
import { X, Thermometer, Pause, Play, RefreshCw, Volume2, VolumeX } from 'lucide-react';
import Image from 'next/image';

import Load1 from '@/assets/1.gif';
import Load2 from '@/assets/2.gif';
import Load3 from '@/assets/3.gif';
import Load4 from '@/assets/4.gif';
import Load5 from '@/assets/5.gif';
import Load6 from '@/assets/6.gif';
import Load7 from '@/assets/7.gif';

const loadImages = [Load1, Load2, Load3, Load4, Load5, Load6];

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
  const [currentGif, setCurrentGif] = useState(loadImages[0]);
  const [isMuted, setIsMuted] = useState(false);
  const [audioRef, setAudioRef] = useState(null);
  const [completionAudioRef, setCompletionAudioRef] = useState(null);

  // Initialize audio
  useEffect(() => {
    const bgAudio = new Audio('/audio/background.mp3');
    const completionSound = new Audio('/audio/complete.mp3');
    
    bgAudio.loop = true;
    setAudioRef(bgAudio);
    setCompletionAudioRef(completionSound);

    return () => {
      bgAudio.pause();
      completionSound.pause();
    };
  }, []);

  // Handle initial setup when variant changes
  useEffect(() => {
    setTimeLeft(selectedVariant?.time || 0);
    setIsRunning(false);
    setShowCompleted(false);
    setCurrentGif(loadImages[Math.floor(Math.random() * loadImages.length)]);
    // Make sure audio is stopped when selecting new tea
    audioRef?.pause();
    if (audioRef) audioRef.currentTime = 0;
  }, [selectedVariant]);

  // Handle GIF rotation
  useEffect(() => {
    let gifInterval;
    if (isRunning && !showCompleted) {
      gifInterval = setInterval(() => {
        setCurrentGif(loadImages[Math.floor(Math.random() * loadImages.length)]);
      }, 3000);
    }
    return () => clearInterval(gifInterval);
  }, [isRunning, showCompleted]);

  // Timer and audio logic
  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      // Start background music if not muted
      if (audioRef && !isMuted) {
        audioRef.play().catch(console.error);
      }

      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            setShowCompleted(true);
            // Stop background music and play completion sound if not muted
            audioRef?.pause();
            if (completionAudioRef && !isMuted) {
              completionAudioRef.play().catch(console.error);
            }
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      // Stop background music when timer is not running
      audioRef?.pause();
    }
    return () => {
      clearInterval(interval);
      // Ensure audio is paused when effect is cleaned up
      audioRef?.pause();
    };
  }, [isRunning, timeLeft, audioRef, completionAudioRef, isMuted]);

  // Handle mute/unmute
  useEffect(() => {
    if (audioRef) {
      if (isMuted || !isRunning) {
        audioRef.pause();
      } else if (isRunning) {
        audioRef.play().catch(console.error);
      }
    }
  }, [isMuted, audioRef, isRunning]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

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

  const handlePlayPause = () => {
    const newRunningState = !isRunning;
    setIsRunning(newRunningState);
    setShowCompleted(false);
    
    // Handle audio
    if (newRunningState && !isMuted && audioRef) {
      audioRef.currentTime = 0; // Reset audio to start
      audioRef.play().catch(console.error);
    } else if (!newRunningState && audioRef) {
      audioRef.pause();
    }
  };

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
                audioRef?.pause();
                if (audioRef) audioRef.currentTime = 0;
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

          {/* Timer Circle with GIF */}
          <div className="relative mb-16">
            <div className="relative w-64 h-64 mx-auto">
              {/* Single Progress Circle */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  fill="none"
                  strokeWidth="8"
                  className="stroke-current text-white/25"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  fill="none"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className={`stroke-current ${teaTypes[selectedType].accent}`}
                  style={{
                    strokeDasharray: `${2 * Math.PI * 120}`,
                    strokeDashoffset: `${2 * Math.PI * 120 * (1 - progress / 100)}`,
                    transition: 'stroke-dashoffset 0.3s ease-in-out'
                  }}
                />
              </svg>

              {/* Centered GIF */}
              <div className="absolute inset-4 rounded-full overflow-hidden flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={showCompleted ? Load7 : currentGif}
                    alt={showCompleted ? "Tea is ready" : "Tea brewing"}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="absolute -bottom-20 left-0 right-0 flex flex-col items-center gap-4">
                {/* Timer display */}
                {!showCompleted && (
                  <span className="font-press-start text-2xl drop-shadow-md bg-white/80 px-4 py-2 rounded-full">
                    {formatTime(timeLeft)}
                  </span>
                )}
                
                {/* Control buttons */}
                {!showCompleted && (
                  <div className="flex gap-4">
                    <button
                      onClick={handlePlayPause}
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
                        if (audioRef) {
                          audioRef.pause();
                          audioRef.currentTime = 0;
                        }
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
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`
                        ${teaTypes[selectedType].accent} text-white p-4 rounded-full 
                        hover:opacity-90 transition-all duration-200
                        shadow-lg hover:shadow-xl hover:-translate-y-0.5
                        active:shadow-md active:translate-y-0
                      `}
                    >
                      {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Completion message */}
          {showCompleted && (
            <div className="text-center mt-6">
              <div className="font-press-start text-xl animate-bounce drop-shadow-lg">
                ¡Tea is ready! ☕️
              </div>
              <button
                onClick={() => {
                  setTimeLeft(selectedVariant.time);
                  setIsRunning(true);
                  setShowCompleted(false);
                  setCurrentGif(loadImages[Math.floor(Math.random() * loadImages.length)]);
                  if (!isMuted && audioRef) {
                    audioRef.currentTime = 0;
                    audioRef.play().catch(console.error);
                  }
                }}
                className={`
                  mt-4 ${teaTypes[selectedType].accent} text-white px-6 py-3 rounded-lg 
                  hover:opacity-90 transition-all duration-200
                  shadow-lg hover:shadow-xl hover:-translate-y-0.5
                  active:shadow-md active:translate-y-0
                  font-press-start text-sm
                `}
              >
                Brew Another Cup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}