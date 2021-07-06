import repl from "repl";
import * as typeorm from "typeorm";
import * as attach from "../src/entity/attach";
import * as category from "../src/entity/category";
import * as post1 from "../src/entity/post1";
import * as post2 from "../src/entity/post2";
import * as post3 from "../src/entity/post3";
import * as user from "../src/entity/user";
import { connect } from "../src/utils";

async function preprocess() {
  // initialize database connection
  await connect(true);
}

preprocess();

for (const items of [typeorm, attach, category, post1, post2, post3, user]) {
  Object.entries(items).map(([key, value]) => {
    // @ts-ignore
    globalThis[key] = value;
  });
}

const replServer = repl.start();
