import path from "path";
import shell from "shelljs";
import { connect, dropTables } from "./utils";

const LOGGING = process.env.DEBUG === "true";

export async function main() {
  console.log("initialize tables and create data");
  await dropTables();
  await connect(LOGGING);
  shell.exec(path.resolve(__dirname, "../fixtures/create_data.sh"));
}

if (require.main === module) {
  (async () => {
    await main();
  })();
}
