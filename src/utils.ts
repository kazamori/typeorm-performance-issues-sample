import path from "path";
import { createConnection, getManager } from "typeorm";

export function connect(logging: boolean) {
  return createConnection({
    type: "postgres",
    host: "localhost",
    port: 15432,
    username: "root",
    password: "password",
    database: "test",
    extra: {
      max: 10,
    },
    synchronize: true,
    entities: [path.resolve(__dirname, "./entity/*.ts")],
    logging,
  });
}

export async function dropTables() {
  const connection = await connect(false);
  const manager = getManager();
  const rows = await manager.query(
    "select * from pg_catalog.pg_tables where schemaname = 'public';"
  );
  const tables: string[] = rows.map((r: any) => r.tablename);
  if (tables.length > 0) {
    await manager.query(
      `drop table if exists ${tables.map((t) => `"${t}"`).join(",")};`
    );
  }
  await connection.close();
}

export function getElapsedTime(start: Date, end: Date): number {
  return end.getTime() - start.getTime();
}

export function showElapsedTime(start: Date, end: Date, message = "elapsed") {
  const elapsed = end.getTime() - start.getTime();
  console.log(`${message}: ${elapsed} msec`);
}
