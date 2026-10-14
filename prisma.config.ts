import "dotenv/config";
import { defineConfig } from "prisma/config";

// Fallback connection string allows `prisma generate` to succeed in CI / build environments (like Vercel)
// even if DATABASE_URL is not yet provided during `npm install` (postinstall).
const databaseUrl =
	process.env.DATABASE_URL ||
	"postgresql://postgres:postgres@localhost:5432/silicon_real_estate";

export default defineConfig({
	datasource: {
		url: databaseUrl,
	},
});
