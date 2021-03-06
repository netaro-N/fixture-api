var express = require('express');
var router = express.Router();
const moment = require('moment-timezone');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Fixture = require('../models/fixture');

router.post('/new', (req, res, next) => {
  // req.body.fixtureIdから、Fixtureデータモデルの該当IDを取得して、その.lengthを調べる
  Fixture.findAll({
    where: {
      fixtureId: { [Op.like]: req.body.fixtureId + '%' } // fixtureDate <= japanTimeplus2
    }
  }).then((id) => {
    //fixtureId,fixtureDate,fixtureSort,homeTeam,awayTeam,homeScore,awayScore
    const fixtureDate = new Date(req.body.fixtureDate);
    const formattedDate = moment(fixtureDate).format("YYYY/MM/DD HH:mm");
    Fixture.upsert({
      fixtureId: req.body.fixtureId + (id.length + 1),
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

router.post('/:fixtureId', (req, res, next) => {
  const fixtureDate = new Date(req.body.fixtureDate);
  const formattedDate = moment(fixtureDate).format("YYYY/MM/DD HH:mm");
  console.log(fixtureDate+' → '+formattedDate);
  console.log('確認しました');
  Fixture.findOne({
    where: {
      fixtureId: req.params.fixtureId
    }
  }).then((f) => {
    if (f) {
      if (parseInt(req.query.edit) === 1){
      f.update({
        fixtureId: f.fixtureId,
        fixtureDate: formattedDate,
        fixtureSort: req.body.fixtureSort,
        homeTeam: req.body.homeTeam,
        awayTeam: req.body.awayTeam,
        homeScore: req.body.homeScore,
        awayScore: req.body.awayScore
      }).then((fixture) => {
        res.redirect('/' + fixture.fixtureId);
      });
    } else if (parseInt(req.query.delete) ===1 ){
      console.log('get!!' + req.params.fixtureId);
      deleteFixture(req.params.fixtureId, () => { // １：ID　２：done関数
        res.redirect('/');
      });
    } else {
      const err = new Error('不正なリクエストです');
      err.status = 400;
      next(err);
    }
  }else {
      const err = new Error('指定された予定がありません');
      err.status = 404;
      next(err);
    }
  });
});

function deleteFixture (fixtureId, done, err) {
  Fixture.findByPk(fixtureId).then((f) => { f.destroy(); });
  if (err) return done(err);
  done();
}

module.exports = router;