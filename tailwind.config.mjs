/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#fdf6e3',
        'brown': '#8b4513',
        'light-brown': '#d2691e',
        'green': '#98c379',
        'light-green': '#c5e1a5',
      },
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
      },
    },
  },
  plugins: [],
};
