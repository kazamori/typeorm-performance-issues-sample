import { EntityManager, Repository } from "typeorm";
import { Article } from "../../src/entity/article";
import { Attach } from "../../src/entity/attach";
import { Category } from "../../src/entity/category";
import { User } from "../../src/entity/user";
import { connect, getElapsedTime } from "../../src/utils";

jest.setTimeout(30_000); // msec

const LOGGING = process.env.DEBUG === "true";

let articleRepo: Repository<Article>;
let attachRepo: Repository<Attach>;
let categoryRepo: Repository<Category>;
let userRepo: Repository<User>;
let manager: EntityManager;

beforeAll((done) => {
  const before = async () => {
    const connection = await connect(LOGGING);
    manager = connection.manager;
    articleRepo = connection.getRepository(Article);
    attachRepo = connection.getRepository(Attach);
    categoryRepo = connection.getRepository(Category);
    userRepo = connection.getRepository(User);
    done();
  };
  before();
});

function createArticle(
  n: number,
  user?: User,
  attach?: Attach,
  categories?: Category[]
): { [key: string]: any } {
  const article: { [key: string]: any } = {
    wordCount: 100,
    readMinutes: 10,
    text1: `text1-${n}`,
    text2: `text2-${n}`,
    text3: `text3-${n}`,
    text4: `text4-${n}`,
    text5: `text5-${n}`,
    text6: `text6-${n}`,
    text7: `text7-${n}`,
    text8: `text8-${n}`,
  };
  if (user !== undefined) {
    article.user = user.id;
  }
  if (attach !== undefined) {
    article.attach = attach.id;
  }
  if (categories !== undefined) {
    article.categories = categories;
  }
  return article;
}

function createArticles(n: number) {
  const articles = [];
  for (let i = 0; i < n; i++) {
    articles.push(createArticle(i));
  }
  return articles;
}

function createArticleInstances(n: number) {
  const articles = [];
  for (let i = 0; i < n; i++) {
    articles.push(new Article(createArticle(i)));
  }
  return articles;
}

test("Bulk create article only -single-", async () => {
  const article = createArticle(1);
  await articleRepo.save(article);
  console.log(article);
});

test("Bulk create article only -multiple-", async () => {
  const articles = [createArticle(2), createArticle(3)];
  await articleRepo.save(articles);
  console.log(articles);
});

test("Bulk create article with relations -unsuccessful result-", async () => {
  const user = new User({ name: "user1" });
  await userRepo.save(user);
  const attach = new Attach({ attr: "attr1" });
  await attachRepo.save(attach);
  const article = createArticle(4, user, attach);
  await articleRepo.save(article);
  console.log(article);
});

test("Bulk create article with relations -success-", async () => {
  const user = new User({ name: "user1" });
  await userRepo.save(user);
  const attach = new Attach({ attr: "attr1" });
  await attachRepo.save(attach);
  const article = new Article(createArticle(5, user, attach));
  await manager.save(article);
  console.log(article);
});

test("Bulk create article with many-to-many relations -unsuccessful result-", async () => {
  const categories = [
    new Category({ name: "cate1" }),
    new Category({ name: "cate2" }),
    new Category({ name: "cate3" }),
  ];
  await categories.forEach(async (category) => {
    await categoryRepo.save(category);
  });
  // need cascade option for Article to insert many-to-many relations
  const article = new Article(
    createArticle(6, undefined, undefined, categories)
  );
  await manager.save(article);
  console.log(article);
});

test("Bulk create 1000 articles 100 times", async () => {
  const start = new Date();
  let i = 0;
  while (i < 100) {
    await articleRepo.save(createArticles(1000));
    i++;
  }
  const end = new Date();
  console.log(getElapsedTime(start, end));
});

test("Bulk create 10000 articles", async () => {
  const start = new Date();
  await articleRepo.save(createArticles(10000));
  const end = new Date();
  console.log(getElapsedTime(start, end));
});

test("Bulk manager.save 1000 articles 100 times", async () => {
  const start = new Date();
  let i = 0;
  while (i < 100) {
    await manager.save(createArticleInstances(1000));
    i++;
  }
  const end = new Date();
  console.log(getElapsedTime(start, end));
});
