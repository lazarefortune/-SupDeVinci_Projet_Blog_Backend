import faker from "faker";
import { getRandomNumberBetween } from "../../tools/utils.js";

const createFakePost = () => {
  return {
    title: faker.name.title(),
    content: faker.lorem.paragraph(),
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
    isPublished: faker.datatype.boolean(),
    authorId: getRandomNumberBetween(1, 10),
  };
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("posts").del();
  const fakePosts = [];
  const desiredPosts = 100;
  for (let index = 0; index < desiredPosts; index++) {
    fakePosts.push(createFakePost());
  }

  await knex("posts").insert(fakePosts);
}
