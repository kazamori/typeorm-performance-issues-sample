import { getConnection, Repository } from "typeorm";
import { Article } from "../../src/entity/article";
import { User } from "../../src/entity/user";
import { connect } from "../../src/utils";

const LOGGING = process.env.DEBUG === "true";

let articleRepo: Repository<Article>;
let userRepo: Repository<User>;

beforeAll((done) => {
  const before = async () => {
    const connection = await connect(LOGGING);
    articleRepo = connection.getRepository(Article);
    userRepo = connection.getRepository(User);
    done();
  };
  before();
});

afterAll(async () => {
  await getConnection().close();
});

// repository.count
test("Distinct repository.count without relations", async () => {
  const count = await articleRepo.count();
  expect(count).toEqual(10000);
});

test("Distinct repository.count with many-to-many", async () => {
  const count = await articleRepo.count({ relations: ["categories"] });
  expect(count).toEqual(10000);
});

test("Distinct repository.count with many-to-one", async () => {
  const count = await articleRepo.count({ relations: ["user"] });
  expect(count).toEqual(10000);
});

test("Distinct repository.count with one-to-one", async () => {
  const count = await articleRepo.count({ relations: ["attach"] });
  expect(count).toEqual(10000);
});

test("Distinct repository.count with one-to-many", async () => {
  const count = await userRepo.count({ relations: ["article"] });
  expect(count).toEqual(10000);
});

// queryBuilder.getCount
test("Distinct queryBuilder.getCount without relations", async () => {
  const count = await articleRepo.createQueryBuilder().getCount();
  expect(count).toEqual(10000);
});

test("Distinct queryBuilder.getCount with many-to-many", async () => {
  const count = await articleRepo
    .createQueryBuilder("article")
    .leftJoin("article.categories", "categories")
    .getCount();
  expect(count).toEqual(10000);
});

test("Distinct queryBuilder.getCount with many-to-one", async () => {
  const count = await articleRepo
    .createQueryBuilder("article")
    .leftJoin("article.user", "user")
    .getCount();
  expect(count).toEqual(10000);
});

test("Distinct queryBuilder.getCount with one-to-one", async () => {
  const count = await articleRepo
    .createQueryBuilder("article")
    .leftJoin("article.attach", "attach")
    .getCount();
  expect(count).toEqual(10000);
});

test("Distinct queryBuilder.getCount with one-to-many", async () => {
  const count = await userRepo
    .createQueryBuilder("user")
    .leftJoin("user.article", "article")
    .getCount();
  expect(count).toEqual(10000);
});

// repository.find
test("Distinct repository.find without relations", async () => {
  expect((await articleRepo.find()).length).toEqual(10000);
  expect((await articleRepo.find({ take: 3, skip: 10 })).length).toEqual(3);
});

test("Distinct repository.find with many-to-many", async () => {
  expect(
    (await articleRepo.find({ relations: ["categories"] })).length
  ).toEqual(10000);
  expect(
    (
      await articleRepo.find({
        relations: ["categories"],
        take: 3,
        skip: 10,
      })
    ).length
  ).toEqual(3);
});

test("Distinct repository.find with many-to-one", async () => {
  expect((await articleRepo.find({ relations: ["user"] })).length).toEqual(
    10000
  );
  expect(
    (
      await articleRepo.find({
        relations: ["user"],
        take: 3,
        skip: 10,
      })
    ).length
  ).toEqual(3);
});

test("Distinct repository.find with one-to-one", async () => {
  expect((await articleRepo.find({ relations: ["attach"] })).length).toEqual(
    10000
  );
  expect(
    (
      await articleRepo.find({
        relations: ["attach"],
        take: 3,
        skip: 10,
      })
    ).length
  ).toEqual(3);
});

test("Distinct repository.find with one-to-many", async () => {
  expect((await userRepo.find({ relations: ["article"] })).length).toEqual(
    10000
  );
  expect(
    (
      await userRepo.find({
        relations: ["article"],
        take: 3,
        skip: 10,
      })
    ).length
  ).toEqual(3);
});

// queryBuilder.getMany
test("Distinct queryBuilder.getMany without relations", async () => {
  expect((await articleRepo.createQueryBuilder().getMany()).length).toEqual(
    10000
  );
  expect(
    (await articleRepo.createQueryBuilder().take(3).skip(10).getMany()).length
  ).toEqual(3);
  expect(
    (await articleRepo.createQueryBuilder().limit(3).offset(10).getMany())
      .length
  ).toEqual(3);
});

test("Distinct queryBuilder.getMany with many-to-many", async () => {
  expect(
    (
      await articleRepo
        .createQueryBuilder("article")
        .leftJoin("article.categories", "categories")
        .getMany()
    ).length
  ).toEqual(10000);
  expect(
    (
      await articleRepo
        .createQueryBuilder("article")
        .leftJoin("article.categories", "categories")
        .take(3)
        .skip(10)
        .getMany()
    ).length
  ).toEqual(3);
  expect(
    (
      await articleRepo
        .createQueryBuilder("article")
        .leftJoin("article.categories", "categories")
        .limit(3)
        .offset(10)
        .getMany()
    ).length
  ).toEqual(2);
});

test("Distinct queryBuilder.getMany with many-to-one", async () => {
  expect(
    (
      await articleRepo
        .createQueryBuilder("article")
        .leftJoin("article.user", "user")
        .getMany()
    ).length
  ).toEqual(10000);
  expect(
    (
      await articleRepo
        .createQueryBuilder("article")
        .leftJoin("article.user", "user")
        .take(3)
        .skip(10)
        .getMany()
    ).length
  ).toEqual(3);
  expect(
    (
      await articleRepo
        .createQueryBuilder("article")
        .leftJoin("article.user", "user")
        .limit(3)
        .offset(10)
        .getMany()
    ).length
  ).toEqual(3);
});

test("Distinct queryBuilder.getMany with one-to-one", async () => {
  expect(
    (
      await articleRepo
        .createQueryBuilder("article")
        .leftJoin("article.attach", "attach")
        .getMany()
    ).length
  ).toEqual(10000);
  expect(
    (
      await articleRepo
        .createQueryBuilder("article")
        .leftJoin("article.attach", "attach")
        .take(3)
        .skip(10)
        .getMany()
    ).length
  ).toEqual(3);
  expect(
    (
      await articleRepo
        .createQueryBuilder("article")
        .leftJoin("article.attach", "attach")
        .limit(3)
        .offset(10)
        .getMany()
    ).length
  ).toEqual(3);
});

test("Distinct queryBuilder.getMany with one-to-many", async () => {
  expect(
    (
      await userRepo
        .createQueryBuilder("user")
        .leftJoin("user.article", "article")
        .getMany()
    ).length
  ).toEqual(10000);
  expect(
    (
      await userRepo
        .createQueryBuilder("user")
        .leftJoin("user.article", "article")
        .take(3)
        .skip(10)
        .getMany()
    ).length
  ).toEqual(3);
  expect(
    (
      await userRepo
        .createQueryBuilder("user")
        .leftJoin("user.article", "article")
        .limit(3)
        .offset(10)
        .getMany()
    ).length
  ).toEqual(3);
});
