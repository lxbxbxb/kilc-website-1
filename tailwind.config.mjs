import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary:   '#C8961E',   // XOS gold — buttons, icons, accents
          secondary: '#A87410',   // deeper gold — gradient end
          dark:      '#1B2D45',   // XOS navy text — headings, body text
          accent:    '#C8961E',   // XOS gold — CTA buttons
          light:     '#F7F2EA',   // XOS cream — warm section backgrounds
          text:      '#1B2D45',   // XOS navy body text
          footer:    '#EDE5D5',   // XOS cream2 — footer background
          magenta:   '#D10056',   // magenta — legacy CTA refs
          // XOS direct tokens for occasional dark accents
          navy:      '#0F1C2E',   // deepest navy (XOS dark mode bg)
          navy2:     '#152030',   // navy variant
          gold:      '#C8961E',   // alias for primary
          goldLight: '#E0AE3A',   // XOS gold2 — highlight
        },
      },
      fontFamily: {
        // Body / UI text — DM Sans (XOS body), with system fallback and Chinese
        sans: ['"DM Sans Variable"', '"DM Sans"', 'system-ui', '"Noto Sans SC"', 'sans-serif'],
        // Headings — Cormorant Garamond (XOS serif), with Chinese serif and Georgia fallback
        serif: ['"Cormorant Garamond Variable"', '"Cormorant Garamond"', '"Noto Serif SC"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [typography],
};
