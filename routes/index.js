var express = require('express');
var router = express.Router();
const fs = require('fs');
const csvParse = require('csv-parse/lib/sync'); // requiring sync module

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
    console.log(f);
    //保存時はmoment-timeモジュールによって( DD/MM/YYYY HH:hh → YYYY/MM/DD HH:hh )表記へ
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
