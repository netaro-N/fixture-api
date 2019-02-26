var express = require('express');
var router = express.Router();

router.post('/new', (req, res, next) => {
  console.log(req.body); // TODO 予定と候補を保存する実装をする
  res.redirect('/new');
});

module.exports = router;