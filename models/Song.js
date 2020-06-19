const Sequelize = require('sequelize');
const db = require('../config/database');

const Song = db.define('Song', {
  id: {
    field: 'songId',
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

module.exports = Song;