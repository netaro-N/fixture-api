'use strict';
import $ from 'jquery';
const global = Function('return this;')();
global.jQuery = $;
import bootstrap from 'bootstrap';


// 削除時のコンフィメーション
require('bootstrap-confirmation2');
$('[data-toggle=confirmation]').confirmation({
  rootSelector: '[data-toggle=confirmation]',
  // other options
});

// csvパースの実行
const buttonCsvParse = $('#csv-parse-button');
buttonCsvParse.click(() => {
  const confirm = window.confirm('サーバーにあるcsvファイルをデータベースに保存しますか？');
  if (confirm) {
    console.log('保存を実行します');
    $.post('/1234',(data) => {
      console.log('結果は'+data.Parse[1].fixtureId);
    });
  };
});