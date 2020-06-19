const Sequelize = require('sequelize');
const db = require('../config/database');

const Album = db.define('Album', {
  id: {
    field: 'albumId',
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: Sequelize.STRING,
  releaseDate: Sequelize.DATE
},{
  timestamps: false
});

module.exports = Album;