/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF8F5',
          200: '#F5F0EA',
          300: '#E8E0D6',
        },
        stone: {
          50: '#FAF8F5',
          100: '#F5F2ED',
        },
        espresso: {
          DEFAULT: '#1C1917',
          light: '#57534E',
        },
        blush: {
          50: '#FDF2EC',
          100: '#F8E6DE',
        },
        rose: {
          DEFAULT: '#EAD9CF',
          dark: '#CD7E70',
        },
        terracotta: {
          DEFAULT: '#CD7E70',
          light: '#E89E8A',
          dark: '#B06558',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E8C950',
        },
        brand: {
          50: '#FDF2EC',
          100: '#F8E6DE',
          200: '#F0CBB8',
          300: '#E8B098',
          400: '#E89E8A',
          500: '#CD7E70',
          600: '#B06558',
          700: '#8C5146',
          800: '#6B3E35',
          900: '#4D2C25',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'h1': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h2': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h3': ['1.5rem', { lineHeight: '1.3' }],
      },
      letterSpacing: {
        'editorial': '0.1em',
      },
    },
  },
  plugins: [],
}