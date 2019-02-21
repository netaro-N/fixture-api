var express = require('express');
var router = express.Router();
const fs = require('fs');
const csvParse = require('csv-parse/lib/sync'); // requiring sync module
const moment = require('moment-timezone');
const Fixture = require('../models/fixture');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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

    /*
    Fixture.upsert({
      gameNumber: f.gameNumber,
      fixtureDate: f.fixtureDate,
      fixtureSort: f.fixtureSort
    });
    */
  });
  res.json({ status: 'OK', Parse:Parse });
  console.log('サーバーサイドおK');
});


module.exports = router;
