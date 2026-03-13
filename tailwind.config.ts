import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        deep: '#635081',
        mid: '#9880BB',
        light: '#CCB6EA',
        pale: '#F5EBFD',
        white: '#FEFEFE',
        'chilla-text': '#3D2E5A',
        'text-light': '#7B6A9A',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        '20': '20px',
        '12': '12px',
        'pill': '100px',
      },
      boxShadow: {
        'chilla': '0 8px 32px rgba(99,80,129,0.13)',
        'chilla-hover': '0 20px 56px rgba(99,80,129,0.22)',
        'primary': '0 4px 20px rgba(99,80,129,0.35)',
        'primary-hover': '0 8px 30px rgba(99,80,129,0.45)',
      },
    },
  },
  plugins: [],
}
export default config
