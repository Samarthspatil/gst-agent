/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cotton Candy - Soft pink for accents
        cotton: '#E38792',
        'cotton-light': '#eca3ad',
        'cotton-dark': '#d96b79',
        
        // Garnet - Deep burgundy for primary buttons and headings
        garnet: '#4E0A0B',
        'garnet-light': '#6e1314',
        'garnet-dark': '#3a0708',
        
        // Dusty White - Main background
        dusty: '#F2EEE8',
        'dusty-light': '#f7f4f0',
        'dusty-dark': '#e8e3db',
        
        // Khaki - Secondary sections
        khaki: '#9DAD71',
        'khaki-light': '#b3c08e',
        'khaki-dark': '#879757',
        
        // Semantic colors
        primary: '#4E0A0B',
        'primary-light': '#6e1314',
        'primary-dark': '#3a0708',
        secondary: '#E38792',
        'secondary-light': '#eca3ad',
        'secondary-dark': '#d96b79',
        success: '#9DAD71',
        error: '#4E0A0B',
        warning: '#E38792',
      }
    },
  },
  plugins: [],
}
