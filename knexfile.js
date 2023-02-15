const sharedConfig = {
  client: "pg",
  connection: {
    host: "ec2-3-217-251-77.compute-1.amazonaws.com",
    user: "zevipxarlcmcpu",
    password:
      "cecace2b5e44e068a4d5790a2627e6d19f927e0587236172688bdfe7c30166d1",
    database: "dfvf3dlr0da74a",
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
  }
};
