import type { CodegenConfig } from '@graphql-codegen/cli';
const config: CodegenConfig = {
	overwrite: true,
	config: {
		strict: true,
		scalars: { ID: 'string | number' },
		maybeValue: 'T',
		namingConvention: { enumValues: 'keep' }
	},
	ignoreNoDocuments: true,
	generates: {
		'src/ui/gql/': {
			preset: 'client',
			presetConfig: { fragmentMasking: false },
			schema: 'http://localhost:3000/admin-api',
			documents: 'src/ui/**/*.{gql,graphql}.ts'
		},
		'src/generated-types.ts': {
			schema: 'http://localhost:3000/admin-api',
			plugins: ['typescript']
		}
	}
};

export default config;
