/** @type {import("eslint").Linter.Config} */
const config = {
	env: {
		es2021: true,
		node: true
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	overrides: [
		{
			env: { node: true },
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: { sourceType: 'script' }
		}
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['./tsconfig.json'],
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint'],
	rules: {}
};

module.exports = config;
