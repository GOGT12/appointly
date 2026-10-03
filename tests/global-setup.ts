import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

let container: StartedPostgreSqlContainer;

export async function setup() {
  container = await new PostgreSqlContainer("postgres:16-alpine")
    .withDatabase("appointly_test")
    .withUsername("appointly_test")
    .withPassword("appointly_test")
    .start();

  const connectionString = container.getConnectionUri();

  process.env.DATABASE_URL = connectionString;

  const pool = new Pool({ connectionString });
  const db = drizzle(pool);

  await migrate(db, { migrationsFolder: "./drizzle" });

  await pool.end();
}

export async function teardown() {
  await container.stop();
}
