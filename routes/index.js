var express = require('express');
var router = express.Router();
const fs = require('fs');
const csvParse = require('csv-parse/lib/sync'); // requiring sync module
const moment = require('moment-timezone');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Fixture = require('../models/fixture');


//曜日を入れてみた
moment.locale('ja', {
  weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"],
});


/* GET home page. */
router.get('/', function (req, res, next) {
  const nowTime = new Date();
  nowTime.setHours(nowTime.getHours() + 2);
  const japanTimeplus2 = moment(nowTime).tz('Asia/Tokyo').format("YYYY/MM/DD HH:mm"); // OK!!
  console.log(new Date(japanTimeplus2));
  Fixture.findOne({
    where: {
      fixtureDate: { [Op.lte]: new Date(japanTimeplus2) } // fixtureDate <= japanTimeplus2 2019/04/13 Op.lte → $lte
    },
    order: [['"fixtureDate"', 'DESC']]
  }).then((fixture) => {
    if (fixture) {
      fixture.formattedDate = moment(fixture.fixtureDate).format('YYYY/MM/DD (ddd) HH:mm');
        res.render('index', {
          title: 'こちらはトップページです',
          fixture: fixture
        });
    } else {
      const err = new Error('表示できる試合がございません。');
      err.status = 404;
      next(err);
    };
  });
});

router.get('/new', function (req, res, next) {
  res.render('new', {
    title: '新規作成ページ'
  });
});

router.get('/manage', function (req, res, next) {
  Fixture.findAll({
    order: [['"fixtureId"', 'ASC']]
  }).then((fixtures) => {
    const ID = [];
    fixtures.forEach((f) => {
      ID.push(f.fixtureId);
    });
    res.render('manage', {
      title: '管理人ページ',
      ID: ID
    });
  });
});

router.get('/list', function (req, res, next) {
  Fixture.findAll({
    order: [['"fixtureDate"', 'ASC']]
  }).then((fixtures) => {
    if (fixtures) {
      fixtures.forEach((f) => {
        f.formattedDate = moment(f.fixtureDate).format('YYYY/MM/DD (ddd) HH:mm');
      });
      res.render('matchlist', {
        title: '試合一覧ページ',
        fixtures: fixtures
      });
    } else {
      const err = new Error('試合一覧がございません。申し訳ございません。');
      err.status = 404;
      next(err);
    };
  });
});

router.post('/edit', function (req, res, next) {
  res.redirect(`/${req.body.fixtureId}/edit`);
});

router.get('/:fixtureId/edit', function (req, res, next) {
  Fixture.findOne({
    where: {
      fixtureId: req.params.fixtureId
    }
  }).then((fixture) => {
    if (fixture) {
      //YYYY-MM-DDThh:mm:ss
      fixture.formattedDate = moment(fixture.fixtureDate).format('YYYY-MM-DDTHH:mm');
      console.log(fixture.formattedDate);
      res.render('edit', {
        title: '編集ページ',
        fixture: fixture
      });
    } else {
      const err = new Error('試合が無いので編集できません');
      err.status = 404;
      next(err);
    }
  });
});

router.get('/:fixtureId', function (req, res, next) {
  Fixture.findOne({
    where: {
      fixtureId: req.params.fixtureId
    }
  }).then((fixture) => {
    if (fixture) {
      let fixtureTitle = '';
      const nowTime = new Date();
      nowTime.setHours(nowTime.getHours() - 5);
      const japanTimeminus5 = moment(nowTime).tz('Asia/Tokyo').format("YYYY/MM/DD HH:mm");
      fixture.formattedDate = moment(fixture.fixtureDate).format('YYYY/MM/DD (ddd) HH:mm');
      const fixtureStatus = moment(new Date(fixture.formattedDate)).isBefore(new Date(japanTimeminus5));
      if (fixtureStatus) {
        fixtureTitle = '試合終了'
      }else {
        fixtureTitle = '試合前'
      }
      res.render('fixture', {
        title: fixtureTitle,
        fixture: fixture
      });
    } else {
      const err = new Error('指定された試合は見つかりません');
      err.status = 404;
      next(err);
    }
  })
});

router.get('/:fixtureDate/last', (req, res, next) => {
  const originDate = moment(new Date(req.params.fixtureDate));
  console.log(originDate);
  Fixture.findOne({
    where: {
      fixtureDate: { [Op.lt]: originDate }
    },
    order: [['"fixtureDate"', 'DESC']]
  }).then((fixture) => {
    if (fixture) {
      res.redirect(`/${fixture.fixtureId}`);
    } else {
      const err = new Error('これより前の試合はありません');
      err.status = 404;
      next(err);
    }
  })
});

router.get('/:fixtureDate/next', (req, res, next) => {
  const originDate = moment(new Date(req.params.fixtureDate));
  console.log(originDate);
  Fixture.findOne({
    where: {
      fixtureDate: { [Op.gt]: originDate }
    },
    order: [['"fixtureDate"', 'ASC']]
  }).then((fixture) => {
    if (fixture) {
      res.redirect(`/${fixture.fixtureId}`);
    } else {
      const err = new Error('これより後の試合はありません');
      err.status = 404;
      next(err);
    }
  })
});

router.post('/1234', (req, res, next) => {
  const file = 'real18-19-2.csv';
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
  Parse.forEach((f, i) => {
    f.formattedDate = moment(f.fixtureDate, 'DD/MM/YYYY HH:mm').add(8, 'hours').format("YYYY/MM/DD HH:mm");
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
  res.json({ status: 'OK', Parse: Parse });
  console.log('サーバーサイドおK');
});



module.exports = router;
