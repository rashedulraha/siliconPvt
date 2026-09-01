import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const connectionString =
	process.env.DATABASE_URL ||
	"postgresql://neondb_owner:npg_ZTgy90pjwLSf@ep-calm-wind-azneegzi-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
	pool: pg.Pool | undefined;
};

const pool =
	globalForPrisma.pool ??
	new Pool({
		connectionString,
		max: 10,
		idleTimeoutMillis: 30000,
	});

const adapter = new PrismaPg(pool);

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		adapter,
		log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
	});

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
	globalForPrisma.pool = pool;
}

export default prisma;
