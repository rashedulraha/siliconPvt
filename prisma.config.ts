import { defineConfig } from "prisma/config";

export default defineConfig({
	datasource: {
		url:
			process.env.DATABASE_URL ||
			"postgresql://neondb_owner:npg_ZTgy90pjwLSf@ep-calm-wind-azneegzi-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
	},
});
