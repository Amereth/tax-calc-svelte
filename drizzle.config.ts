import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	schema: './src/lib/server/schemas/index.ts',
	dialect: 'turso',
	dbCredentials: {
		url: process.env.DATABASE_URL as string,
		authToken: process.env.DATABASE_AUTH_TOKEN as string,
	},
	verbose: true,
	strict: true,
})
