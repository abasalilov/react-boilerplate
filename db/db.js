const mysql = require('mysql');
const Sequelize = require('sequelize');
// //mysql://ba38c6d1aaeaf4:0299f40f@us-cdbr-iron-east-03.cleardb.net/heroku_a802b0d681a265c?reconnect=true Monday,

const db = new Sequelize('aap', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

module.exports = db;
