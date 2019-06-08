## はじめに
処理の流れとしては，  
1. ハッシュタグなどでツイートを検索
1. issue登録
1. ツイートの削除 *  
  
となっています．


\* 現時点（2019年6月）では重複登録を避けるために登録に使ったツイートは削除するようにしています．いずれ変わるかもしれません．変える方法を実装できるのであれば好きに改造してください．  
\* これによる弊害で，画像付きツイートでissue登録しても，ツイートと共に画像も消えますのでご注意を．

## 下準備  
1. Google Apps Scriptの初期設定など  
Google Apps Scriptのプロジェクトを作ってください．

1. ライブラリの設定  
以下を参考にtwiter apiのライブラリとgithub apiのライブラリをロードしてください．  
[twitter apiのライブラリ](https://qiita.com/expajp/items/7cc16378ee790f1d404f)  
[github apiのライブラリ](https://matsubara0507.github.io/posts/2017-05-03-make-githubapi-lib-for-gas.html)

1. Twitterの認証をする  
**twitter.gs**を開き，画面上部の「関数を選択」のプルダウンからtwitterAuthorizeUrlを選んで実行してください．  
エラーなく実行が終わったら，[Ctrl] + [Enter]でログを開いてください．  
![スクショ1](https://camo.qiitausercontent.com/255d1f595d95fd3afdc5e409998628a94ef1e8c3/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f37303433372f63303639626336622d333831622d393732352d646365612d3934356330306438663465652e706e67)  
URLにアクセスして認証をしてください．  

1. gitの設定  
・Personal access token の取得  
[ここ](https://github.com/settings/tokens/new)にアクセスし，githubにログインして，Personal access tokenを作ります．  

![スクショ2](https://user-images.githubusercontent.com/32073583/59142166-cdd7ac80-89f4-11e9-9acd-8a83f9e5aed3.png)  
ページ最下部の「Generate token」をクリックします．  

作られたトークンが表示されているので，コピーのアイコンをクリックしてコピーします．  
![スクショ3](https://user-images.githubusercontent.com/32073583/59142496-40975680-89fa-11e9-822d-767011804e16.png)　　

twi-git.gsを開き，search_and_mkIssue()のtokenの値のところに貼り付けます．  

・issueを登録したいリポジトリの設定  
　twi-git.gsを開き，**query**のところに検索に使いたいワード，search_and_mkIssue()の**owner**のところに”リポジトリのオーナーのアカウント名”，**repo**のところに”リポジトリ名”を設定します．  
![図2](https://user-images.githubusercontent.com/32073583/59142555-15f9cd80-89fb-11e9-824e-65d10097d986.png)  

## 使い方  
twi-git.gsを開き，画面上部の「関数を選択」のプルダウンからsearch_and_mkIssueを選んで実行するだけです．  

## 定期的に実行する  
定期的に実行するには，画面上部の「吹き出しに時計のアイコン」をクリックして，トリガーを設定してください．  
![コメント 2019-06-08 133306](https://user-images.githubusercontent.com/32073583/59142568-51949780-89fb-11e9-9b9f-1aa03cbc4841.png)  
