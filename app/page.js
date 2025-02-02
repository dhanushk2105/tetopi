'use client';

import React, { useEffect, useState } from 'react';
import { Coffee, Clock, Heart, Share2, Instagram, Twitter, Globe, Menu, X } from 'lucide-react';

const translations = {
  en: {
    features: "Features",
    screenshots: "Screenshots",
    contact: "Contact",
    welcome: "Welcome to TéTopi!",
    tagline: "Your perfect companion for the ideal tea, always.",
    downloadNow: "Start Timer",
    specialFeatures: "Special Features",
    perfectTiming: "Perfect Timing",
    timersDesc: "Custom timers for each type of tea",
    favorites: "Favorite Recipes",
    favoritesDesc: "Save your preferred combinations",
    share: "Share",
    shareDesc: "Connect with other tea lovers",
    visualize: "Visualize the Magic",
    enjoyTea: "Enjoy your tea!",
  },
  es: {
    features: "Características",
    screenshots: "Capturas",
    contact: "Contacto",
    welcome: "¡Bienvenido a TéTopi!",
    tagline: "Tu compañero perfecto para preparar el té ideal, siempre.",
    downloadNow: "Iniciar temporizador",
    specialFeatures: "Características Especiales",
    perfectTiming: "Tiempo Perfecto",
    timersDesc: "Temporizadores personalizados para cada tipo de té",
    favorites: "Recetas Favoritas",
    favoritesDesc: "Guarda tus combinaciones preferidas",
    share: "Comparte",
    shareDesc: "Conecta con otros amantes del té",
    visualize: "Visualiza la Magia",
    enjoyTea: "¡Que disfrutes de tu té!",
  },
  fr: {
    features: "Fonctionnalités",
    screenshots: "Captures",
    contact: "Contact",
    welcome: "Bienvenue sur TéTopi !",
    tagline: "Votre compagnon parfait pour le thé idéal, toujours.",
    downloadNow: "Démarrer l'horloge",
    specialFeatures: "Fonctionnalités Spéciales",
    perfectTiming: "Timing Parfait",
    timersDesc: "Minuteurs personnalisés pour chaque type de thé",
    favorites: "Recettes Préférées",
    favoritesDesc: "Sauvegardez vos combinaisons préférées",
    share: "Partagez",
    shareDesc: "Connectez-vous avec d'autres amateurs de thé",
    visualize: "Visualisez la Magie",
    enjoyTea: "Savourez votre thé !",
  }
};

const LandingPage = () => {
  const [language, setLanguage] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-brown font-press-start">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 py-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between">
            <div className="flex items-center gap-4">
              <Coffee className="w-8 h-8 text-light-brown" />
              <h1 className="text-2xl font-bold">TéTopi</h1>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-brown hover:text-light-brown transition-colors"
              aria-label="Toggle menu">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Navigation and Language Selector */}
          <div className={`
            ${isMenuOpen ? 'flex' : 'hidden'} 
            md:flex flex-col md:flex-row items-center gap-6 
            w-full md:w-auto
            absolute md:relative
            top-full left-0 md:top-auto
            bg-cream md:bg-transparent
            p-4 md:p-0
            border-t border-light-brown md:border-none
            shadow-lg md:shadow-none
            z-50
            transition-all duration-300
          `}>
            {/* Language Selector */}
            <div className="relative flex items-center gap-2">
              <Globe className="w-5 h-5 text-light-brown" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-cream border border-light-brown rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-light-brown"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h2 className="text-4xl md:text-5xl mb-6">{t.welcome}</h2>
        <p className="text-light-brown text-lg mb-8 max-w-2xl mx-auto">
          {t.tagline}
        </p>
        <a href='/timer' className="bg-green text-cream w-fit px-8 py-4 rounded-lg flex items-center gap-2 mx-auto hover:bg-light-green transition-colors">
          {t.downloadNow}
          <Heart className="w-5 h-5" />
        </a>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 max-w-7xl mx-auto">
        <h3 className="text-2xl text-center mb-12">{t.specialFeatures}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white bg-opacity-50 p-8 rounded-lg text-center">
            <Clock className="w-12 h-12 text-light-brown mx-auto mb-4" />
            <h4 className="text-lg mb-4">{t.perfectTiming}</h4>
            <p className="text-sm">{t.timersDesc}</p>
          </div>
          <div className="bg-white bg-opacity-50 p-8 rounded-lg text-center">
            <Heart className="w-12 h-12 text-light-brown mx-auto mb-4" />
            <h4 className="text-lg mb-4">{t.favorites}</h4>
            <p className="text-sm">{t.favoritesDesc}</p>
          </div>
          <div className="bg-white bg-opacity-50 p-8 rounded-lg text-center">
            <Share2 className="w-12 h-12 text-light-brown mx-auto mb-4" />
            <h4 className="text-lg mb-4">{t.share}</h4>
            <p className="text-sm">{t.shareDesc}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-light-green mt-16 py-8 px-4 text-center">
        <p className="text-lg mb-4">{t.enjoyTea} ☕️</p>
        <div className="flex justify-center gap-4 mb-4">
          <a href="#" aria-label="Instagram" className="text-light-brown hover:text-brown transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" aria-label="Twitter" className="text-light-brown hover:text-brown transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
        </div>
        <p className="text-sm text-light-brown">❤️ by Dhanush</p>
        <p className="text-xs text-light-brown">© 2025 TéTopi</p>
      </footer>
    </div>
  );
};

export default LandingPage;