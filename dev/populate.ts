import { bootstrap } from '@vendure/core';
import { populate } from '@vendure/core/cli';
import path from 'path';
import { config } from './vendure-config';

populate(
	() =>
		bootstrap({
			...config,
			importExportOptions: {
				importAssetsDir: path.join(require.resolve('@vendure/create/assets/products.csv'), '../images')
			}
		}),
	require('@vendure/create/assets/initial-data.json'),
	require.resolve('@vendure/create/assets/products.csv')
)
	.then((app) => app.close())
	.then(
		() => process.exit(0),
		(err) => {
			console.log(err);
			process.exit(1);
		}
	);
