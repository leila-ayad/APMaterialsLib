//the seed doesn't have the hashed password 

exports.seed = function (knex, Promise) {
  return knex("members").insert([
    {
      username: "leila",
      password: "awfulPW",
      email: "fakeemail@df.com",
      name: "leila",
      pronouns: "she/her",
    },
    {
      username: "brandon",
      password: "worsePW",
      email: "fakeemail2@df.com",
      name: "B",
      pronouns: "he/him",
    },
    {
      username: "kategirl12",
      password: "terriblePW",
      email: "fakeemail3@df.com",
      name: "kate",
      pronouns: "she/her",
    },
    {
      username: "someone",
      password: "worstPW",
      email: "fakeemail4@df.com",
      name: "Brad",
      pronouns: "they/them",
    },
  ]);
};
