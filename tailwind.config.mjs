import starlightPlugin from '@astrojs/starlight-tailwind';

// Generated color palettes
const accent = { 200: '#99daaf', 600: '#008148', 900: '#003d20', 950: '#002d15' };
const gray = { 100: '#f5f9e5', 200: '#ebf3cb', 300: '#bfc898', 400: '#889527', 500: '#565f00', 700: '#363d00', 800: '#252a00', 900: '#171b00' };

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: { accent, gray },
		},
	},
	plugins: [starlightPlugin()],
};