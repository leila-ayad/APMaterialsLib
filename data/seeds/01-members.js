//the seed doesn't have the hashed password 

exports.seed = function (knex, Promise) {
  return knex("members").insert([
    {
      username: "leila",
      // password: "awfulPW",
      password: "$2y$10$T3W.W/YNj1yKble67rP07.1jIP2xUYo6tJhbCwyOXWZE4W2u.rIJK",
      email: "fakeemail@df.com",
      name: "leila",
      pronouns: "she/her",
      refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJfaWQiOjEsInVzZXJuYW1lIjoibGVpbGEiLCJwYXNzd29yZCI6IiQyeSQxMCRUM1cuVy9ZTmoxeUtibGU2N3JQMDcuMWpJUDJ4VVlvNnRKaGJDd3lPWFdaRTRXMnUucklKSyIsImxvZ2dlZF9vdXRfdGltZSI6bnVsbCwiaWF0IjoxNjYwNjAyODI1LCJleHAiOjE2NjA2ODkyMjV9.3EamoSNSuyzDmeB0iMeAi_Znfh4PeqPHzJ59GcvcHUU"
    },
    {
      username: "brandon",
      // password: "worsePW",
      password: "$2y$10$LtBYlXaqC7wCLPQnh70fQeLtuYUIZGwc6tjvCmnmZ.HgLeXT/O48u",
      email: "fakeemail2@df.com",
      name: "B",
      pronouns: "he/him",
    },
    {
      username: "kategirl12",
      // password: "terriblePW",
      password: "$2y$10$TNyQLuqzsgLThEVnTyceKOoTp5so5Y5D5RuTW/rnDqaOkfCNEkQEi",
      email: "fakeemail3@df.com",
      name: "kate",
      pronouns: "she/her",
    },
    {
      username: "someone",
      // password: "worstPW",
      password: "$2y$10$GsK3pj8ALkcXrH7lvgz73u6exVlVuVxnn4lV6RUR1okHnZgJyuNKy",
      email: "fakeemail4@df.com",
      name: "Brad",
      pronouns: "they/them",
    },
  ]);
};
