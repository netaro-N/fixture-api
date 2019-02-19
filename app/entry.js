'use strict';
import $ from 'jQuery';

const buttonCsvParse = $('#csv-parse-button');
buttonCsvParse.click(() => {
  const confirm = confirm('サーバーにあるcsvファイルをデータベースに保存しますか？');
  if(confirm){
    console.log('保存を実行します');
  };
});