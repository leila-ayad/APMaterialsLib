const development = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/database.db3",
  },
  pool: {
    afterCreate: (conn, done) => conn.run("PRAGMA foreign_keys = ON", done),
  },
};

const production = {
  client: "pg",
  connection: process.env.DB_URL,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tablename: "knex_migrations",
    directory: "./data/migrations",
  },
};

module.exports = {
  development: development,
  production: production,
};
