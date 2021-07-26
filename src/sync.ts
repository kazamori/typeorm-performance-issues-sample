import { connect, dropTables } from "./utils";

const LOGGING = process.env.DEBUG === "true";

export async function main() {
  console.log("initialize tables");
  await dropTables();
  await connect(LOGGING);
}

if (require.main === module) {
  (async () => {
    await main();
  })();
}
