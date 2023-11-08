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
		project: ['./tsconfig.eslint.json'],
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', 'simple-import-sort'],
	rules: {
		'simple-import-sort/imports': ['error']
	}
};

module.exports = config;
