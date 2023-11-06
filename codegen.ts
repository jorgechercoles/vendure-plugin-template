import type { CodegenConfig } from '@graphql-codegen/cli';
const config: CodegenConfig = {
	overwrite: true,
	config: {
		strict: true,
		namingConvention: { typeNames: 'pascalCase', enumValues: 'keep' },
		scalars: { ID: 'string | number' },
		maybeValue: 'T'
	},
	generates: {
		'src/ui/types/': {
			schema: 'http://localhost:3000/admin-api',
			documents: 'src/ui/**/*.graphql.ts',
			preset: 'client',
			plugins: [{ add: { content: '/* eslint-disable */' } }, 'typescript', 'typescript-compatibility']
		},
		'src/types/admin-types.ts': {
			schema: 'http://localhost:3000/admin-api',
			documents: 'src/ui/**/*.graphql.ts',
			plugins: [{ add: { content: '/* eslint-disable */' } }, 'typescript', 'typescript-compatibility']
		}
	}
};

export default config;
