/** @type {import('tailwindcss').Config} */

module.exports = {
	theme: {
		extend: {
			colors: {
				action: require('tailwindcss/colors').blue,
				warning: require('tailwindcss/colors').amber,
				danger: require('tailwindcss/colors').red,
				error: require('tailwindcss/colors').red,
				gray: require('tailwindcss/colors').stone,
				base: require('tailwindcss/colors').stone,
				brand: require('tailwindcss/colors').emerald,
				beige: {
					DEFAULT: '#F5F2E6'
				}
			},
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
