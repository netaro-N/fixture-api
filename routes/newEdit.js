var express = require('express');
var router = express.Router();

router.post('/new', (req, res, next) => {
  const fixtureDate = new Date(req.body.fixtureDate);
  console.log(fixtureDate);
  console.log(req.body);
  res.redirect('/new');
});

module.exports = router;