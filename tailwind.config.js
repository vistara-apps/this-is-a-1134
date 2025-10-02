/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(142, 76%, 36%)",
        "primary-hover": "hsl(142, 76%, 30%)",
        accent: "hsl(48, 96%, 53%)",
        "accent-hover": "hsl(48, 96%, 45%)",
        bg: "hsl(240, 10%, 3.9%)",
        surface: "hsl(240, 5%, 11%)",
        "surface-hover": "hsl(240, 5%, 15%)",
        border: "hsl(240, 4%, 20%)",
        text: "hsl(0, 0%, 98%)",
        "text-muted": "hsl(240, 5%, 64%)",
        success: "hsl(142, 76%, 36%)",
        warning: "hsl(48, 96%, 53%)",
        danger: "hsl(0, 84%, 60%)",
        chart1: "hsl(142, 76%, 36%)",
        chart2: "hsl(48, 96%, 53%)",
        chart3: "hsl(280, 65%, 60%)",
        chart4: "hsl(200, 80%, 50%)"
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(0, 0%, 0%, 0.12)',
        'card-hover': '0 12px 32px hsla(0, 0%, 0%, 0.16)',
        'glow': '0 0 24px hsla(142, 76%, 36%, 0.3)',
      },
      animation: {
        'glow': 'glow 1500ms ease-in-out infinite',
        'fadeIn': 'fadeIn 250ms ease',
        'slideUp': 'slideUp 300ms ease',
        'scaleIn': 'scaleIn 200ms ease',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 24px hsla(142, 76%, 36%, 0.3)' },
          '50%': { boxShadow: '0 0 32px hsla(142, 76%, 36%, 0.5)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)' },
          '100%': { transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      }
    },
  },
  plugins: [],
}