module.exports = require('knex')({
  client: 'postgres',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgrespassclear',
    database: 'postgres'
  },
  useNullAsDefault: true,
  acquireConnectionTimeout: 3000
});