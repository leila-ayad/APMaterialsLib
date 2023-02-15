//help with creating the postgres heroku connection from this blog post https://dev.to/easybuoy/setting-up-a-node-api-with-postgres-and-knex-588f
// const configurations = {
//   client: "pg",
//   connection: {
//     host: "ec2-3-229-165-146.compute-1.amazonaws.com",
//     user: "qwlhxbcknduwdd",
//     password:
//       "811094ca0cc6910da720492a9bed1ad49fc059ed428f7516cc9ad6c780192dca",
//     database: "d1rpci2od3jqi6",
//   },
//   useNullAsDefault: true,
//   migrations: { directory: "./data/migrations" },
//   pool: {
//     afterCreate: (conn, done) => conn.run("PRAGMA foreign_keys = ON", done),
//   },
// };
// const env = process.env.NODE_ENV || "development";

// const knex = require("knex")(configurations[env]);

// module.exports = knex;

const knex = require('knex');

const knexfile = require('../knexfile');


const env = process.env.NODE_ENV || 'development';
const configOptions = knexfile[env];

module.exports = knex(configOptions);
