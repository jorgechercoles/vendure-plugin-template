import { createTestEnvironment, registerInitializer, SimpleGraphQLClient, SqljsInitializer, testConfig, TestServer } from '@vendure/testing';
import 'dotenv/config';
import path from 'path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { DefaultSearchPlugin, mergeConfig } from '@vendure/core';
import { initialData } from './fixtures/initial-data';

describe('Plugin', function () {
	let server: TestServer;
	let adminClient: SimpleGraphQLClient;
	let shopClient: SimpleGraphQLClient;
	let serverStarted: boolean;

	beforeAll(async () => {
		registerInitializer('sqljs', new SqljsInitializer(path.join(__dirname, '__e2e__')));
		const testEnvironment = createTestEnvironment(
			mergeConfig(testConfig, {
				apiOptions: { port: 3104 },
				importExportOptions: { importAssetsDir: path.join(__dirname, 'fixtures/assets') },
				plugins: [
					AssetServerPlugin.init({
						route: 'assets',
						assetUploadDir: path.join(__dirname, '__e2e__/static/assets'),
						assetUrlPrefix: undefined
					}),
					DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true })
				]
			})
		);
		server = testEnvironment.server;
		adminClient = testEnvironment.adminClient;
		shopClient = testEnvironment.shopClient;

		await server.init({
			initialData,
			productsCsvPath: path.join(__dirname, 'fixtures/products.csv'),
			customerCount: 2
		});
		serverStarted = true;
	}, 60000);

	it('Server started successfully', () => {
		expect(serverStarted).toBe(true);
	});

	afterAll(() => {
		server.destroy();
	}, 50000);
});
