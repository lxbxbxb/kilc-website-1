import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary:   '#C5A059',   // gold/bronze — buttons, icons, accents
          secondary: '#A8854A',   // deeper bronze — gradient end
          dark:      '#1C1A17',   // near-black — headings, body text
          accent:    '#C5A059',   // gold/bronze — CTA buttons
          light:     '#F8F6F2',   // warm off-white — section backgrounds
          text:      '#1C1A17',   // body text
          footer:    '#E5E7EB',   // light slate gray — footer background
        },
      },
      fontFamily: {
        sans: ['system-ui', 'Noto Sans SC', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
};
