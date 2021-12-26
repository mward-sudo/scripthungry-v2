module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'body-light':
          'radial-gradient(200% 400px at bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%), linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%), linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)',
        'body-dark':
          'radial-gradient(200% 1200px at bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%), linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50% , rgba(0,0,0,0) 100%), linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)',
      },
    },
    fontFamily: {
      display: ['"Montserrat Alternates"', 'sans-serif'],
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
    require('@tailwindcss/typography'),
  ],
}
