module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      display: ['"Montserrat Alternates"', 'sans-serif'],
    },
  },
  variants: {
    extend: {
      display: ['dark'],
      zIndex: ['dark'],
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
    require('@tailwindcss/typography'),
  ],
}
