// fixtureId,fixtureDate,fixtureSort,Home Team,Away Team,homeScore,awayScore
'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Fixture = loader.database.define('fixtures', {
  fixtureId: {
    type: Sequelize.STRING,
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
    type: Sequelize.STRING,
    allowNull:false
  },
  awayTeam: {
    type: Sequelize.STRING,
    allowNull:false
  },
  homeScore: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  awayScore: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null
  }
}, {
    freezeTableName: true,
    timestamps: false
  });

module.exports = Fixture;