/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#2962FF',
        'primary-orange': '#FF6D00',
        'secondary-steel': '#78909C',
        'secondary-teal': '#00BFA5',
        'secondary-navy': '#0A2463',
        'background-ice': '#F5F7FA',
        primary: {
          blue: '#2962FF',
          orange: '#FF6D00',
        },
        secondary: {
          steel: '#78909C',
          teal: '#00BFA5',
          navy: '#0A2463',
        },
        background: {
          ice: '#F5F7FA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
