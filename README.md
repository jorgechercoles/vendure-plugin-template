# Vendure E-Commerce Plugin Template

![Vendure Version - Badge](https://img.shields.io/badge/Vendure-v2.1.1-17c1ff)
![Typescript - Badge](https://img.shields.io/badge/Typescript-v4.9.5-3178c6?logo=typescript)

![Vitest - Badge](https://img.shields.io/badge/Testing-Vitest-7ec242?logo=vitest)
![ESLint - Badge](https://img.shields.io/badge/Linter-ESLint-4b32c3?logo=eslint)
![Prettier - Badge](https://img.shields.io/badge/Formatter-Prettier-f8bc45?logo=prettier)

This is a template repository for creating Vendure e-commerce plugins. It comes pre-configured with the following features:

🛒 [Vendure](https://www.vendure.io/) version 2.1.1<br>
🧹 [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for code linting and formatting<br>
🧪 [Vitest](https://vitest.dev/) for testing<br>
🐶 [Husky](https://typicode.github.io/husky/) as pre-commit hook<br>
🚀 [GraphQL Code Generation](https://the-guild.dev/graphql/codegen) for Vendure admin GraphQL types

## Getting Started

To create your own Vendure e-commerce plugin based on this template, follow these steps:

1. Click the "Use this template" button at the top of the GitHub repository page.
2. Clone your new repository to your local development environment.
    ```bash
    git clone https://github.com/your-username/your-plugin-repo.git
    cd your-plugin-repo
    ```
3. Install the project dependencies.
    ```bash
    yarn install
    ```
4. Configure Vendure to use your plugin. You can do this in your Vendure project's `vendure-config.ts` file.

    ```typescript
    import { YourPlugin } from 'your-plugin-repo';

    const config: VendureConfig = {
    	// ... other config options
    	plugins: [
    		YourPlugin,
    		// ... other plugins,
    		AdminUiPlugin.init({
    			port: 3002,
    			route: 'admin',
    			app: compileUiExtensions({
    				outputPath: path.join(__dirname, '__admin-ui'),
    				extensions: [
    					YourPlugin.ui // ... plugin UI if needed
    				]
    			})
    		})
    	]
    };
    ```

5. You can now start building your custom functionality for Vendure by adding your code to the appropriate files in the `src` directory.

## Development

This template ships a development ready Vendure server found under `dev` folder.<br>
In order to setup this server:

1. Create a `.env` file at the root of this repo with the following content:

    ```dotenv
    SUPERADMIN_USERNAME=<database-username>
    SUPERADMIN_PASSWORD=<database-password>
    COOKIE_SECRET=<any-random-string>
    ```

2. Generate a migration file and run it:

    ```bash
    yarn dev:migration:generate init
    yarn dev:migration:run
    ```

3. Populate Vendure with initial data. We use the [@vendure/create initial data](https://docs.vendure.io/guides/developer-guide/importing-data/#populating-test-data):

    ```bash
    yarn dev:populate
    ```

4. And run the Vendure server:

    ```bash
    yarn dev:start
    ```

### Formatting

We use [Pretier](https://prettier.io/) to ensure consistent code styling. Feel free to modify Prettier rules in `.prettierrc.cjs`.

You can run Prettier style checks with:

```bash
yarn format
```

You can also fix the style errors running:

```bash
yarn format:fix
```

### Linting

We use [ESLint](https://eslint.org/) to ensure consistent code quality. Feel free to modify ESLint rules in `.eslintrc.cjs`.

You can run ESLint checks with the following command:

```bash
yarn lint
```

You can also fix the style errors running:

```bash
yarn lint:fix
```

### Testing

We use [Vitest](https://vitest.dev/) to run tests.

By default, we use SQLJS database for testing population, as a wrapper for SQLite.<br>
View more [database initializers here](https://docs.vendure.io/guides/developer-guide/testing/#register-database-specific-initializers).

The test server is populated with the data found under `test/fixtures`.

By default there is only one test `'Server started successfully'` and can be run with:

```bash
yarn test
```

### Graphql Types Generation

We use [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) to extract the graphql types from Vendure.<br>
By default, we create types in two places:

-   `src/generated-types.ts`: admin-api types to use in your custom backend plugins.
-   `src/ui/generated-types.ts`: admin-api types to use in your custom UI plugins.

If you want to extend the types, you can create files `*.graphql.ts` or `.gql.ts` where you define custom GraphQL types, queries, mutations wrapper by `graphql-tag`.

```typescript
import gql from 'graphql-tag';

export const ExampleType = gql`
	type Example implements Node {
		id: ID!
		createdAt: DateTime!
		updatedAt: DateTime!
		title: String!
	}
`;
```

**Note:** `.{gql,graphql}.ts` files inside `src/ui` are excluded from the `src/generated-types.ts` as well as files outside `src/ui` are excluded from the `src/ui/generated-types.ts`.

Feel free to modify GraphQL Code Generator configuration in `codegen.ts`.

You can run GraphQL Code Generator with the following command:

```bash
yarn generate-types
```

**Note:** you have to start the vendure server before running this command.
