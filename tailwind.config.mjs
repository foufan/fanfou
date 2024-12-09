/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#f0f9ff',
					100: '#e0f2fe',
					200: '#bae6fd',
					300: '#7dd3fc',
					400: '#38bdf8',
					500: '#0ea5e9',
					600: '#0284c7',
					700: '#0369a1',
					800: '#075985',
					900: '#0c4a6e',
				},
				gray: {
					50: '#f9fafb',
					100: '#f3f4f6',
					200: '#e5e7eb',
					300: '#d1d5db',
					400: '#9ca3af',
					500: '#6b7280',
					600: '#4b5563',
					700: '#374151',
					800: '#1f2937',
					900: '#111827',
				},
			},
			fontFamily: {
				sans: ['Atkinson', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: 'none',
						color: 'var(--tw-prose-body)',
						'h1, h2, h3, h4, h5, h6': {
							color: 'var(--tw-prose-headings)',
							fontWeight: '600',
						},
						a: {
							color: 'var(--tw-prose-links)',
							'&:hover': {
								color: 'var(--tw-prose-links-hover)',
							},
						},
						'code::before': {
							content: '""',
						},
						'code::after': {
							content: '""',
						},
					},
				},
			},
			boxShadow: {
				'card': '0 1px 3px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
				'card-hover': '0 4px 12px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.05)',
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}