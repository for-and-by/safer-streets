/** @type {import('tailwindcss').Config} */

module.exports = {
	theme: {
		data: {
			visible: 'visible~="true"',
			error: 'error~="true"',
			expanded: 'expanded~=true',
			dragging: 'dragging~=true',
			'align-center': 'align="center"',
			'align-top': 'align="top"',
		},
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
					DEFAULT: '#FFFCF2'
				}
			},
			fontFamily: {
				sans: ['Inter', 'Helvetica', 'system-elements'],
			},
		},
	},
	plugins: [
		// Add custom variant classes
		require('@tailwindcss/typography')
	],
};
