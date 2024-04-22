import type {Config} from 'tailwindcss'
import tailwindForm from '@tailwindcss/forms'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [tailwindForm],
} satisfies Config
