const promise = require("bluebird");
const dotenv = require('dotenv');
dotenv.config();

const options = {
  promiseLib: promise,
  query: (e) => {},
};

const pgp = require("pg-promise")(options);
const types = pgp.pg.types;

types.setTypeParser(1114, function (val) {
  return val;
});

const databaseConfig = {
  host: process.env.HOST,
  port: process.env.PORTDB,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  dialect: "postgresql",
  ssl: {
    sslmode: "require",
    rejectUnauthorized: false,
  },
  logging: false,
};

const db = pgp(databaseConfig);

module.exports = db;
