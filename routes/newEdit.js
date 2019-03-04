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
    const fixtureDate = new Date(req.body.fixtureDate);
    const formattedDate = moment(fixtureDate).format("YYYY/MM/DD HH:mm");
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

router.post('/:fixtureId/edit', (req, res, next) => {
  //fixtureId,fixtureDate,fixtureSort,homeTeam,awayTeam,homeScore,awayScore
  const fixtureDate = new Date(req.body.fixtureDate);
  const formattedDate = moment(fixtureDate).format("YYYY/MM/DD HH:mm");
  console.log(fixtureDate + "→" + formattedDate);
  console.log(req.body);
  //①保存データの確認
  
  // ②保存する
  res.redirect('/:fixtureId');
});
module.exports = router;