/** @type {import('tailwindcss').Config} */


module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: require('~/lib/colors'),
			fontFamily: {
				sans: ['Inter', 'Helvetica', 'system-elements'],
			},
		},
	},
	plugins: [
		// Add custom variant classes
		require('@tailwindcss/typography'),
		require('tailwindcss/plugin')(({addVariant}) => {
			addVariant('child', '& > *');
			addVariant('d-active', '&[data-active]');
		}),
	],
};
