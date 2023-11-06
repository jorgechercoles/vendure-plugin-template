/** @type {import("prettier").Config} */
// Issue with plugin load https://github.com/prettier/prettier/issues/15079 👈
const config = {
	trailingComma: 'none',
	tabWidth: 4,
	useTabs: true,
	semi: true,
	singleQuote: true,
	bracketSpacing: true,
	printWidth: 150,
	plugins: ['prettier-plugin-organize-imports']
};

module.exports = config;
