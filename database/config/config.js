const { resolve } = require('path');
const node_env = process.env.NODE_ENV || 'development';

console.log('node_env =', node_env);

require('dotenv').config({
  path: resolve(__dirname, '../../', `.${node_env}.env`),
});

const genericConfig = {
  dialect: 'postgres',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};

module.exports = {
  development: { ...genericConfig },
  test: { ...genericConfig },
  production: { ...genericConfig },
};
