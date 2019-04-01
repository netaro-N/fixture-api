- [x] layout.pug　および継承
- [x] index.pug（確認したい日程データの表示テーブル、保存ボタン、編集・新規ページへのリンク）
- [x] csv保存ボタン
  - [x] データモデル実装（model/fixture.js）
  - [x] Webpack
  - [x] モデルの同機読み込み
  - [x] Ajax処理（entry.js）
  - [x] csv保存ボタンを押して、データベースに保存

- [x] 各日程ページ（/:fixtureId , fixture.pug , ）
  - [x] fixture.pug
  - [x] index.js (get /:fixtureId 時)
    - [x]データベース取得、Id不在時リダイレクト、データ転送

- [x] 次の試合、前の試合を表示させる

- [x] new.js , new.pug!
  - [x] new.pugのoptionをコツコツと
  - [x] データ取得
  - [x] fixtureIdの.lengthを取得できるか？
  
- [x] edit.pug , edit.js!!
    - [x] updateの方法を練る！！
    - [x] update実装

- [x] 試合一覧表示
    - [x] デザイン、必要データは？
    - [x] 実装

- [x] UXからUIの改善TODO
    - [x] 各リンクボタン設置
    - [x] 掲示板みてたら、Slackのチャンネルと同様に、移籍情報なども語りたいのだろう。あとは「槙野選手のDVD発言」的なのも重要
    - [x] サブチャンネル「移籍情報、チーム情報、etc...」などにする

- [ ] Err分け
    - [x] get時のerr処理
    - [ ] post時のerr処理 : [newEdit.js] post('/:fixtureId/edit') → post('/:fixtureId') if(f){ if(edit){}else(delete){} }else{予定ありません}

- [ ] デザイン改善
    - [ ]トップページ
        - [ ] nav-bar
        - [ ] sidemenu
        - [ ] contents

- [ ] コード印刷と理解、復習

- [ ] group by句使えばautocompできる

- [ ] サマータイム処理面倒だ