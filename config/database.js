const Sequelize = require('sequelize');
require('dotenv').config();

module.exports = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
   host: process.env.POSTGRES_HOST,
   dialect: process.env.POSTGRES_DIALECT,
   
   pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
   }
});
