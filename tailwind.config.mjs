import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#667eea',
          secondary: '#764ba2',
          dark: '#2f1c6a',
          accent: '#357df9',
          light: '#f2f3f6',
          text: '#1d1e20',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [typography],
};
