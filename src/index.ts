import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import path from 'path';

export interface PluginConfiguration {}

@VendurePlugin({
	imports: [PluginCommonModule]
})
export class Plugin {
	static config: PluginConfiguration;

	static init(config: PluginConfiguration) {
		this.config = config;
		return Plugin;
	}

	// 👉 https://docs.vendure.io/reference/admin-ui-api/ui-devkit/admin-ui-extension/
	static ui: AdminUiExtension = {
		extensionPath: path.join(__dirname, 'ui')
	};
}
