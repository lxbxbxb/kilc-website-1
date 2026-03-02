import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary:   '#9A7B3C',   // warm gold — links, hover, active accents
          secondary: '#7A5E28',   // deep gold — gradient end, dark accents
          dark:      '#1C1A17',   // near-black with warm undertone — footer bg, strong headings
          accent:    '#C4953A',   // bright gold — CTA buttons
          light:     '#F8F6F2',   // warm off-white — section backgrounds
          text:      '#1C1A17',   // body text
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
