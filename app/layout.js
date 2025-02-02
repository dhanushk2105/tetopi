'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Press_Start_2P } from 'next/font/google';
import { useEffect } from 'react';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered successfully');
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${pressStart2P.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
