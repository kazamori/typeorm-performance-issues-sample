import http from "http";
import { getConnection } from "typeorm";
import { Post2 } from "./entity/post2";
import { Post3 } from "./entity/post3";
import { Post4 } from "./entity/post4";
import { connect } from "./utils";

var post2: Post2[];
var post3: Post3[];
var post4: Post4[];

async function loadPosts() {
  const connection = getConnection();
  const post2Repo = connection.getRepository(Post2);
  const post3Repo = connection.getRepository(Post3);
  const post4Repo = connection.getRepository(Post4);

  post2 = await post2Repo.find({ take: 100 });
  console.log("post2", post2[0]);
  post3 = await post3Repo.find({ take: 100 });
  console.log("post3", post3[0]);
  post4 = await post4Repo.find({ take: 100 });
  console.log("post4", post4[0]);

  console.log("success loading posts");
}

export async function main() {
  await connect(false);
  await loadPosts();
  const server = http.createServer(async (req, res) => {
    res.writeHead(200);
    res.end("OK");
  });
  server.listen({ host: "localhost", port: 18080 });
}

if (require.main === module) {
  (async () => {
    await main();
  })();
}
