/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Lora"', 'Georgia', 'serif'],
      },
      colors: {
        ink: {
          50:  '#f8f7f5',
          100: '#f0ede8',
          200: '#ddd8cf',
          300: '#c4bdb0',
          400: '#a89e8e',
          500: '#8e8070',
          600: '#736555',
          700: '#5c5045',
          800: '#3d3530',
          900: '#2a2420',
          950: '#1a1612',
        },
        teal: {
          50:  '#effaf7',
          100: '#d8f4ec',
          200: '#b4e8d9',
          300: '#82d5c0',
          400: '#4abba3',
          500: '#2a9d87',
          600: '#1e7f6e',
          700: '#1a6659',
          800: '#185249',
          900: '#17443d',
          950: '#0a2925',
        },
        amber: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-down': {
          '0%':   { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.6s ease-out both',
        'fade-in':    'fade-in 0.4s ease-out both',
        'scale-in':   'scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'slide-down': 'slide-down 0.35s ease-out both',
        shimmer:      'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};
