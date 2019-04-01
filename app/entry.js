'use strict';
import $ from 'jQuery';
const global = Function('return this;')();
global.jQuery = $;
import bootstrap from 'bootstrap';

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