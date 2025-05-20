/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a0a0a",
        secondary: "#fdc78d",
        white: "#DADADA",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        grey: '#1E1E1E',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        kaushan: ['Kaushan Script'],
        lobster: ["Lobster", "cursive"],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in',
        'fade-in-delay': 'fadeIn 1s ease-in 0.5s both',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-up-delay': 'slideUp 0.8s ease-out 0.3s both',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slower': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'scroll': 'scroll 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scroll: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
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