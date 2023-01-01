/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#161313",
        secondary: "#93C3CD",
        white: "#DADADA",
        dimWhite: '#B2B2B2',
        grey: '#1E1E1E',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        kaushan: ['Kaushan Script'],
        lobster: ['Lobster']
      },
    },
    screens: {
      xl: {
        'max': "1700px"
      },
      lg: {
        'max': "1200px"
      },
      md: {
        'max': "1060px"
      },
      tablet: {
        'max': "991px"
      },
      sm: {
        'max': "768px"
      },
      ss: {
        'max': "620px"
      },
      xs: {
        'max': "480px"
      },
    }
  },
  plugins: [],
}