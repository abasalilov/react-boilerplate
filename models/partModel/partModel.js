const db = require('../../db/db');
const Sequelize = require('sequelize');

const Part = db.define('part', {
  MFGPartNum: {type:Sequelize.STRING},
  fileName: {type:Sequelize.STRING},
  finalIMGUrl: {type:Sequelize.STRING},
  folderName: {type:Sequelize.STRING},
  part:  {type:Sequelize.INTEGER, primaryKey: true},
}, {
  timestamps: false
});

module.exports = Part;
