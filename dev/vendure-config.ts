import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { DefaultSearchPlugin, dummyPaymentHandler, LanguageCode, VendureConfig } from '@vendure/core';
import 'dotenv/config';
import path from 'path';

export const config: VendureConfig = {
	apiOptions: {
		port: 3000,
		adminApiPath: 'admin-api',
		shopApiPath: 'shop-api',
		adminApiPlayground: { settings: { 'request.credentials': 'include' } },
		adminApiDebug: true,
		shopApiPlayground: { settings: { 'request.credentials': 'include' } },
		shopApiDebug: true
	},
	authOptions: {
		tokenMethod: ['bearer', 'cookie'],
		superadminCredentials: {
			identifier: process.env.SUPERADMIN_USERNAME!,
			password: process.env.SUPERADMIN_PASSWORD!
		},
		cookieOptions: {
			secret: process.env.COOKIE_SECRET
		}
	},
	dbConnectionOptions: {
		type: 'better-sqlite3',
		synchronize: false,
		migrations: [path.join(__dirname, '__data__/migrations/*.+(js|ts)')],
		logging: false,
		database: path.join(__dirname, '__data__/vendure.sqlite')
	},
	paymentOptions: { paymentMethodHandlers: [dummyPaymentHandler] },
	customFields: {},
	plugins: [
		AssetServerPlugin.init({
			route: 'assets',
			assetUploadDir: path.join(__dirname, '__data__/static/assets'),
			assetUrlPrefix: undefined
		}),
		DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
		AdminUiPlugin.init({
			route: 'admin',
			port: 3002,
			// 👉 https://docs.vendure.io/guides/extending-the-admin-ui/getting-started/
			// app: compileUiExtensions({
			// 	outputPath: path.join(__dirname, '__data__/admin-ui'),
			// 	extensions: []
			// }),
			adminUiConfig: {
				defaultLanguage: LanguageCode.en,
				availableLanguages: [LanguageCode.en, LanguageCode.es],
				apiPort: 3000
			}
		})
	]
};
