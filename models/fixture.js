// fixtureId,fixtureDate,fixtureSort,Home Team,Away Team,homeScore,awayScore
'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Fixture = loader.database.define('fixtures', {
  fixtureId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  fixtureDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  fixtureSort: {
    type: Sequelize.STRING,
    allowNull: false
  },
  homeTeam:{
    type: Sequelize.INTEGER,
    allowNull:false
  },
  awayTeam: {
    type: Sequelize.INTEGER,
    allowNull:false
  },
  homeScore: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  awayScore: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
    freezeTableName: true,
    timestamps: false
  });

module.exports = Fixture;