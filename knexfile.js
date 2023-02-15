require('dotenv').config()


const sharedConfig = {
  client: "pg",
  connection: {
    host: "ec2-3-229-165-146.compute-1.amazonaws.com",
    user: "qwlhxbcknduwdd",
    password:
      "811094ca0cc6910da720492a9bed1ad49fc059ed428f7516cc9ad6c780192dca",
    database: "d1rpci2od3jqi6",
  },
  useNullAsDefault: true,
  migrations: { directory: "./data/migrations" },
  pool: {
    afterCreate: (conn, done) => conn.run("PRAGMA foreign_keys = ON", done),
  },
};

module.exports = {
  development: {
    ...sharedConfig,
    seeds: { directory: "./data/seeds" },
  },
  production: {
    ...sharedConfig
  }
};
