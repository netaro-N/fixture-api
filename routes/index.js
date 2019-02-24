var express = require('express');
var router = express.Router();
const fs = require('fs');
const csvParse = require('csv-parse/lib/sync'); // requiring sync module
const moment = require('moment-timezone');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const Fixture = require('../models/fixture');

//曜日を入れてみた
moment.locale('ja', {
  weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"],
});

/* GET home page. */
router.get('/', function(req, res, next) {
  let nowTime = new Date();
  nowTime.setHours(nowTime.getHours() + 2);
  const japanNowTime = moment(nowTime).tz('Asia/Tokyo').format("YYYY/MM/DD HH:mm"); // OK!!

  Fixture.findOne( {
    where : {
      fixtureDate: { [Op.lt]:japanNowTime }
    },
    order: [['"fixtureDate"', 'DESC']]
  }).then((fixture) => {
    if (fixture) {
      fixture.formattedDate = moment(fixture.fixtureDate).format('YYYY/MM/DD (ddd) HH:mm');
      res.render('index', {
         title: 'こちらはトップページです',
         fixture: fixture 
      });
    }else {
      const err = new Error('指定された予定は見つかりません');
      err.status = 404;
      next(err);
    }
  })

});

router.get('/:fixtureId', function(req, res, next) {
  console.log(req.params.fixtureId);
  Fixture.findOne({
    where: {
      fixtureId: req.params.fixtureId
    }
  }).then((fixture) => {
    if (fixture) {
      fixture.formattedDate = moment(fixture.fixtureDate).format('YYYY/MM/DD (ddd) HH:mm');
      res.render('fixture', {
         title: 'こちらは個別ページです',
         fixture: fixture 
      });
    }else {
      const err = new Error('指定された予定は見つかりません');
      err.status = 404;
      next(err);
    }
  })
});

router.post('/1234', (req, res, next) => {
  const file = 'real18-19.csv';
  let data = fs.readFileSync(file);
  let Parse = csvParse(data, {
    delimiter: ',', 
    rowDelimiter: 'auto', 
    quote: '"', 
    escape: '"', 
    columns: true, 
    comment: '#', 
    skip_empty_line: true, 
    trim: false
  });
  Parse.forEach((f,i) =>{
    f.formattedDate = moment(f.fixtureDate,'DD/MM/YYYY HH:mm').add(8, 'hours').format("YYYY/MM/DD HH:mm");
    console.log(f.fixtureDate + ' → ' + f.formattedDate);

    // fixtureId,fixtureDate,fixtureSort,homeTeam,awayTeam,homeScore,awayScore
    Fixture.upsert({
      fixtureId: f.fixtureId,
      fixtureDate: f.formattedDate,
      fixtureSort: f.fixtureSort,
      homeTeam: f.homeTeam,
      awayTeam: f.awayTeam,
      homeScore: f.homeScore,
      awayScore: f.awayScore
    });

  });
  res.json({ status: 'OK', Parse:Parse });
  console.log('サーバーサイドおK');
});


module.exports = router;
