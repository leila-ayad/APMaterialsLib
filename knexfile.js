require('dotenv').config()

'use strict';

const pg = require('pg');
const SocksConnection = require('socksjs');

const fixieUrl = process.env.FIXIE_SOCKS_HOST;
const fixieValues = fixieUrl.split(new RegExp('[/(:\\/@)/]+'));

const pgServer = {
  host: "ec2-3-229-165-146.compute-1.amazonaws.com",
  port: 5432
};

const fixieConnection = new SocksConnection(pgServer, {
  user: fixieValues[0],
  pass: fixieValues[1],
  host: fixieValues[2],
  port: fixieValues[3],
});

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


const connectionConfig = {
  user: "qwlhxbcknduwdd",
  password: "811094ca0cc6910da720492a9bed1ad49fc059ed428f7516cc9ad6c780192dca",
  database: "d1rpci2od3jqi6",
  stream: fixieConnection,
  ssl: true // Optional, depending on db config
};

var client = new pg.Client(connectionConfig);

client.connect(function (err) {
  if (err) throw err;
  client.query('SELECT 1+1 as test1', function (err, result) {
    if (err) throw err;
    console.log(result.rows[0]);
    client.end(function (err) {
      if (err) throw err;
    });
  });
});

module.exports = {
  development: {
    ...sharedConfig,
    seeds: { directory: "./data/seeds" },
  },
  production: {
    ...sharedConfig
  }
};
