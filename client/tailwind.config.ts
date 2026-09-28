import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ARTEVO brand colors
        'artevo-cobalt':     '#0057D9',
        'artevo-cobalt-dark': '#0044B0',
        'artevo-cobalt-light': '#3377E8',
        'artevo-cobalt-pale': '#E8F0FD',
        'artevo-yellow':     '#FFE76B',
        'artevo-cream':      '#FFF8EC',
        'artevo-cream-dark': '#F5EDDB',
        'artevo-terracotta': '#FF7F5A',
        'artevo-ink':        '#1B1B1B',
        'artevo-grey':       '#6B6B6B',
        // Legacy aliases for Nyvara-style classes used in admin
        'nyvara-gold':       '#0057D9',
        'nyvara-charcoal':   '#1B1B1B',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['var(--font-caveat)', 'Caveat', 'cursive'],
        cairo: ['var(--font-cairo)', 'Cairo', 'sans-serif'],
      },
      borderRadius: {
        'artevo': '12px',
        'artevo-lg': '20px',
        'artevo-xl': '32px',
      },
    },
  },
  plugins: [],
} satisfies Config;
