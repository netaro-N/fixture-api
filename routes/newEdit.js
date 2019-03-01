var express = require('express');
var router = express.Router();
const moment = require('moment-timezone');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Fixture = require('../models/fixture');

router.post('/new', (req, res, next) => {
  // req.body.fixtureIdから、Fixtureデータモデルの該当IDを取得して、その.lengthを調べる
  Fixture.findAll( {
    where : {
      fixtureId: { [Op.like]: req.body.fixtureId+'%'} // fixtureDate <= japanTimeplus2
    }
  }).then((id) =>{
    //fixtureId,fixtureDate,fixtureSort,homeTeam,awayTeam,homeScore,awayScore
    console.log("fixtureId=" + req.body.fixtureId + (id.length+1) );
    const fixtureDate = new Date(req.body.fixtureDate);
    const formattedDate = moment(fixtureDate).format("YYYY/MM/DD HH:mm");
    console.log(fixtureDate + "→" + formattedDate);
    console.log("fixtureSort=" + req.body.fixtureSort);
    console.log("home&away=" + req.body.homeTeam + req.body.awayTeam);
    console.log("score=" + req.body.homeScore +" - " + req.body.awayScore);
    Fixture.upsert({
      fixtureId: req.body.fixtureId + (id.length+1),
      fixtureDate: formattedDate,
      fixtureSort: req.body.fixtureSort,
      homeTeam: req.body.homeTeam,
      awayTeam: req.body.awayTeam,
      homeScore: '',
      awayScore: ''
    });
    res.redirect('/new');
  });
});

router.post('/edit', (req, res, next) => {
  const fixtureDate = new Date(req.body.fixtureDate);
  const formattedDate = moment(fixtureDate).format("YYYY/MM/DD HH:mm");
  console.log(fixtureDate + "→" + formattedDate);
  console.log(req.body);
  res.redirect('/edit');
});
module.exports = router;