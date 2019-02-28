var express = require('express');
var router = express.Router();
const moment = require('moment-timezone');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Fixture = require('../models/fixture');

router.post('/new', (req, res, next) => {
  const fixtureDate = new Date(req.body.fixtureDate);
  const formattedDate = moment(fixtureDate).format("YYYY/MM/DD HH:mm");
  console.log(fixtureDate + "→" + formattedDate);
  console.log(req.body);
  res.redirect('/new');
});

module.exports = router;