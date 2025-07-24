import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        primary: {
          100: '#060311',
          200: '#0D091C',
          300: '#19172a',
          400: '#1A2025',
          500: '#0b0a13'
        },
        secondary: {
          100: '#6949E7', //2
          200: '#5532E2', //
          300: '#B7A6FB', //4
          400: '#8c4fff', //5
          500: '#6050ff', //6
          600: '#4E51FF', //2
          700: '#3a3cd1'
        },
        accent: {
          100: '#ffffff',
          200: '#AAA9B3',
          300: '#e4e4e4',
          400: '#cdcdcd',
          500: '#bdbdbd',
          600: '#9f9f9f'
        }
      },
      keyframes: {
        'side-to-side': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(30%)' }
        }
      },
      animation: {
        'side-to-side': 'side-to-side .70s ease-in-out infinite'
      }
    }
  },

  plugins: [typography]
} satisfies Config;
