import type { CodegenConfig } from '@graphql-codegen/cli';
const config: CodegenConfig = {
	overwrite: true,
	config: {
		strict: true,
		scalars: { ID: 'string | number' },
		maybeValue: 'T'
	},
	generates: {
		'src/ui/types/': {
			schema: 'http://localhost:3000/admin-api',
			preset: 'client'
		},
		'src/types/admin-types.ts': {
			schema: 'http://localhost:3000/admin-api',
			plugins: ['typescript']
		}
	}
};

export default config;
