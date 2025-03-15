import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        dark: {
          1: '#3A2A6A', // deep plum
          2: '#594A8F', // softer purple
          3: '#A895C7', // lavender highlight
          4: '#D8C9F0', // pastel lilac
        },
        blue: {
          1: '#8AA7FF', // soft pastel blue
        },
        sky: {
          1: '#C3EAFD', // light sky blue
          2: '#E0F7FA', // aqua mint
          3: '#F3FAFF', // ultra-light blue
        },
        orange: {
          1: '#FF6F61', // coral pink
        },
        purple: {
          1: '#F4C1F9', // blush pink
        },
        yellow: {
          1: '#FEE4B0', // light pastel yellow
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        hero: "url('/images/hero-background.png')",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
