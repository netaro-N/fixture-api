'use strict';
import $ from 'jQuery';
import Data from ''; //fsモジュールは読み取れないので、public/javascripts/fsRead.js で実行する
import csvParse from 'csv-parse/lib/sync';// requiring sync module

const buttonCsvParse = $('#csv-parse-button');
buttonCsvParse.click(() => {
  const confirm = window.confirm('サーバーにあるcsvファイルをデータベースに保存しますか？');
  if (confirm) {
    console.log('保存を実行します');

    // csv読み取り
    //const file = 'real18-19.csv';
    // let Data = fs.readFileSync(file);

    let Parse = csvParse(Data, {
      delimiter: ',',
      rowDelimiter: 'auto',
      quote: '"',
      escape: '"',
      columns: true,
      comment: '#',
      skip_empty_line: true,
      trim: false
    });

    console.log(Parse);
  };
});