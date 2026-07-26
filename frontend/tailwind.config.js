/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: { base: '#0a0b0d', surface: '#111318', surface2: '#181c23' },
        border: { subtle: '#1e2330', default: '#2a3040', strong: '#3a4255' },
        text: { primary: '#e8eaf0', secondary: '#8892a4', muted: '#4a5568' },
        healthy: '#10b981',
        warning: '#f59e0b',
        risk: '#f97316',
        critical: '#ef4444',
        accent: '#3b82f6',
        ai: '#8b5cf6',
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}
