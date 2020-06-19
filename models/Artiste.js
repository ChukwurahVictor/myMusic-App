const Sequelize = require('sequelize');
const db = require('../config/database');

const Artiste = db.define('Artiste', {
  id: {
    field: 'artisteId',
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  stageName: Sequelize.STRING
},{
  timestamps: false
});

module.exports = Artiste;