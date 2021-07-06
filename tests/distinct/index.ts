import { getConnection } from "typeorm";
import { Comment } from "../../src/entity/comment";
import { Post2 } from "../../src/entity/post2";
import { connect } from "../../src/utils";

const LOGGING = process.env.DEBUG === "true";

beforeAll((done) => {
  const before = async () => {
    await connect(LOGGING);
    done();
  };
  before();
});

afterAll(async () => {
  await getConnection().close();
});

test("Distinct count post with many-to-many", async () => {
  const query = getConnection()
    .createQueryBuilder(Post2, "post2")
    .leftJoin("post2.categories", "categories");
  const countWithCategories = await query.getCount();
  expect(countWithCategories).toEqual(10000);
});

test("Distinct count post with many-to-one", async () => {
  const query = getConnection()
    .createQueryBuilder(Post2, "post2")
    .leftJoin("post2.user", "user");
  const countWithUser = await query.getCount();
  expect(countWithUser).toEqual(10000);
});

test("Distinct count comment with many-to-one", async () => {
  const query = getConnection()
    .createQueryBuilder(Comment, "comment")
    .innerJoin("comment.user", "user");
  const comment = await query.getCount();
  expect(comment).toEqual(100000);
});
