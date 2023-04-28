/** @type {import('tailwindcss').Config} */

const baseConfig = require('@safer-streets/tailwind/config');

module.exports = {
	content: ['./app/**/*.{js,ts,jsx,tsx}'],
	...baseConfig
};