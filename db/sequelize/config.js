module.exports = {
  development: {
    username: process.env.PGDB_USERNAME,
    password: process.env.PGDB_PASSWORD,
    database: process.env.PGDB_NAME + "_development",
    host: process.env.PGDB_HOST,
    dialect: "postgres",
  },
  test: {
    username: process.env.PGDB_USERNAME,
    password: process.env.PGDB_PASSWORD,
    database: process.env.PGDB_NAME + "_test",
    host: process.env.PGDB_HOST,
    dialect: "postgres",
  },
  production: {
    username: process.env.PGDB_USERNAME,
    password: process.env.PGDB_PASSWORD,
    database: process.env.PGDB_NAME + "_production",
    host: process.env.PGDB_HOST,
    dialect: "postgres",
  },
};
