import type { CodegenConfig } from '@graphql-codegen/cli';
const config: CodegenConfig = {
	overwrite: true,
	config: {
		strict: true,
		scalars: { ID: 'string | number' },
		maybeValue: 'T'
	},
	ignoreNoDocuments: true,
	generates: {
		'src/ui/generated-types.ts': {
			schema: 'http://localhost:3000/admin-api',
			documents: 'src/ui/**/*.{gql,graphql}.ts',
			plugins: ['typescript']
		},
		'src/generated-types.ts': {
			schema: 'http://localhost:3000/admin-api',
			documents: ['src/**/*.{gql,graphql}.ts', '!src/ui/**/*'],
			plugins: ['typescript']
		}
	}
};

export default config;
