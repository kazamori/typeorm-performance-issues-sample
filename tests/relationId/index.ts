import { Connection, Repository } from "typeorm";
import { Attach } from "../../src/entity/attach";
import { Category } from "../../src/entity/category";
import { Post1 } from "../../src/entity/post1";
import { Post2 } from "../../src/entity/post2";
import { Post3 } from "../../src/entity/post3";
import { User } from "../../src/entity/user";
import { connect, getElapsedTime } from "../../src/utils";

const LOGGING = process.env.DEBUG === "true";

jest.setTimeout(120_000); // msec

let connection: Connection;
let attachRepo: Repository<Attach>;
let categoryRepo: Repository<Category>;
let post1Repo: Repository<Post1>;
let post2Repo: Repository<Post2>;
let post3Repo: Repository<Post3>;
let userRepo: Repository<User>;

beforeAll((done) => {
  const before = async () => {
    connection = await connect(LOGGING);
    attachRepo = connection.getRepository(Attach);
    categoryRepo = connection.getRepository(Category);
    post1Repo = connection.getRepository(Post1);
    post2Repo = connection.getRepository(Post2);
    post3Repo = connection.getRepository(Post3);
    userRepo = connection.getRepository(User);
    done();
  };
  before();
});

afterAll(async () => {
  await connection.close();
});

async function findRepository<T>(
  repo: Repository<T>,
  n: number
): Promise<number> {
  const start = new Date();
  await repo.find({ take: n });
  const end = new Date();
  return getElapsedTime(start, end);
}

async function getMany<T>(repo: Repository<T>, n: number): Promise<number> {
  const start = new Date();
  await repo.createQueryBuilder().limit(n).getMany();
  const end = new Date();
  return getElapsedTime(start, end);
}

async function getRawMany<T>(repo: Repository<T>, n: number): Promise<number> {
  const start = new Date();
  await repo.createQueryBuilder().limit(n).getRawMany();
  const end = new Date();
  return getElapsedTime(start, end);
}

async function benchmark(
  targetFunc: <T>(repo: Repository<T>, n: number) => Promise<number>
) {
  const nums = [20, 40, 80, 160, 320, 640, 1280, 2560];
  const attachResults: number[] = [];
  const userResults: number[] = [];
  const post1Results: number[] = [];
  const post2Results: number[] = [];
  const post3Results: number[] = [];
  for (const n of nums) {
    attachResults.push(await targetFunc(attachRepo, n));
    userResults.push(await targetFunc(userRepo, n));
    post1Results.push(await targetFunc(post1Repo, n));
    post2Results.push(await targetFunc(post2Repo, n));
    post3Results.push(await targetFunc(post3Repo, n));
  }
  return [attachResults, userResults, post1Results, post2Results, post3Results];
}

test("RelationId Repository.find()", async () => {
  const testName = expect.getState().currentTestName;
  const [attach, user, post1, post2, post3] = await benchmark(findRepository);
  console.log(`attach ${testName}`, attach);
  console.log(`user ${testName}`, user);
  console.log(`post1 ${testName}`, post1);
  console.log(`post2 ${testName}`, post2);
  console.log(`post3 ${testName}`, post3);
});

test("RelationId QueryBuilder().getMany()", async () => {
  const testName = expect.getState().currentTestName;
  const [attach, user, post1, post2, post3] = await benchmark(getMany);
  console.log(`attach ${testName}`, attach);
  console.log(`user ${testName}`, user);
  console.log(`post1 ${testName}`, post1);
  console.log(`post2 ${testName}`, post2);
  console.log(`post3 ${testName}`, post3);
});

test("RelationId QueryBuilder().getRawMany()", async () => {
  const testName = expect.getState().currentTestName;
  const [attach, user, post1, post2, post3] = await benchmark(getRawMany);
  console.log(`attach ${testName}`, attach);
  console.log(`user ${testName}`, user);
  console.log(`post1 ${testName}`, post1);
  console.log(`post2 ${testName}`, post2);
  console.log(`post3 ${testName}`, post3);
});
