import 'dotenv/config';

import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { DefaultSearchPlugin, mergeConfig } from '@vendure/core';
import { createTestEnvironment, registerInitializer, SqljsInitializer, testConfig, TestServer } from '@vendure/testing';
import path from 'path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { initialData } from './fixtures/initial-data';

describe('Plugin', function () {
	let server: TestServer;
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
