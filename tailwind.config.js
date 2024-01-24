/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Example content paths...
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: { 
        // source: https://github.com/data-cfwb/charte-graphique/
        'agaj': '#85C38E',
        'sg_rs': '#42A09E',
        'age': '#3A97C9',
        'agmj': '#BE80B6',
        'agc': '#E37276',
        'ags': '#ED9E41',
        'grey': '#4A5563',
        // 
        'default-blue': '#303675',
        'light-blue': '#49508B',
        'dark-blue': '#2F3765',
        // logo
        'logo-red': '#CB333B',
        'logo-yellow': '#F2A900',
        'logo-blue': '#001A70',
        'logo-black': '#0A0F16',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'), // import tailwind forms
  ],
};