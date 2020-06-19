const Sequelize = require('sequelize');
const db = require('../config/database');

const Genre = db.define('Genre', {
   name: {
     type: Sequelize.STRING
   }
},{
  timeStamps: false
});
 

module.exports = Genre;