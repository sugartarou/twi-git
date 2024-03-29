## twi-git
特定の形式の**自分の**ツイートからgitのissueを登録するツールです．

処理の流れとしては，  
1. ハッシュタグなどでツイートを検索
1. issue登録/特定のissueにコメント追加
1. ツイートの削除 *  
  
となっています．
  
\* 現時点（2019年6月）では重複登録を避けるために登録に使ったツイートは削除するようにしています．いずれ変わるかもしれません．変える方法を実装できるのであれば好きに改造してください．  
\* これによる弊害で，画像付きツイートでissue登録しても，ツイートと共に画像も消えますのでご注意を．
  
## 下準備  
1. Google Apps Scriptの初期設定など  
	Google Apps Scriptのプロジェクトを新規で作ってください．
  
1. ライブラリの設定  
	画面上部，「リソース」→「ライブラリ」と進んで，twiter apiで使うoauthのライブラリとgithub apiのライブラリを追加してください．  	

	|タイトル | プロジェクトキー | バージョン|
	|:--- | :---: | :---:|
	|OAuth1 | Mb2Vpd5nfD3Pz-\_a-39Q4VfxhMjh3Sh48 | 7|
	|GitHubAPI | MpVhtQfIUrL3OfsqY2BMtnIv0J4XZf0PJ | 6|  

  	![リソースライブラリ](https://user-images.githubusercontent.com/32073583/59479479-25b06080-8e98-11e9-9a59-63f7b1541918.png)  	  
	![ライブラリ追加](https://user-images.githubusercontent.com/32073583/59479420-ea159680-8e97-11e9-8e1a-bb0817bb040a.png)  
  
1. Twitterの認証をする  
	**twitter.gs**を開き，画面上部の「関数を選択」のプルダウンからtwitterAuthorizeUrlを選んで実行してください．  
	エラーなく実行が終わったら，[Ctrl] + [Enter]でログを開いてください．  
	![スクショ1](https://camo.qiitausercontent.com/255d1f595d95fd3afdc5e409998628a94ef1e8c3/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f37303433372f63303639626336622d333831622d393732352d646365612d3934356330306438663465652e706e67)  
	URLにアクセスして認証をしてください．  
  
1. gitの設定  
	1. Personal access token の取得  
		[ここ](https://github.com/settings/tokens/new)にアクセスし，githubにログインして，Personal access tokenを作ります．  

		![スクショ2](https://user-images.githubusercontent.com/32073583/59142166-cdd7ac80-89f4-11e9-9acd-8a83f9e5aed3.png)  
		ページ最下部の「Generate token」をクリックします．  
  
	1. 作られたトークンが表示されているので，コピーのアイコンをクリックしてコピーします．  
		![スクショ3](https://user-images.githubusercontent.com/32073583/59142496-40975680-89fa-11e9-822d-767011804e16.png)　　
  
	1. twi-git.gsを開き， **token**の値のところに貼り付けます．  
  
	1. issueを登録したいリポジトリの設定  
		twi-git.gsを開き，**query**のところに検索に使いたいワード， **owner**のところに”リポジトリのオーナーのアカウント名”，**repo**のところに”リポジトリ名”を設定します．  
		![図2](https://user-images.githubusercontent.com/32073583/59142555-15f9cd80-89fb-11e9-824e-65d10097d986.png)  
  
## 使い方  
1. issue登録  /  特定のissueにコメント追加
	1. 自分で決めた検索用のハッシュタグなどをつけて，以下の形式に添ってツイートします．  
	![ツイート](https://user-images.githubusercontent.com/32073583/59144141-118ae000-8a0e-11e9-9e24-229a1c9b0961.png)  
	↑ issue登録の例  
	![ツイート](https://user-images.githubusercontent.com/32073583/59561881-390e2800-9060-11e9-9b88-6500c6d72c36.png)  
	↑ コメント追加の例  
	1. twi-git.gsを開き，画面上部の「関数を選択」のプルダウンからtwi-gitを選んで実行するだけです．  
	
## 定期的に実行する  
定期的に実行するには，画面上部の「吹き出しに時計のアイコン」をクリックして，トリガーを設定してください．  
![コメント 2019-06-08 133306](https://user-images.githubusercontent.com/32073583/59142568-51949780-89fb-11e9-9b9f-1aa03cbc4841.png)  

## 参考・引用  
[【Twitter】GASで自分のツイートを定期RT/引用するbotを作った](https://qiita.com/expajp/items/7cc16378ee790f1d404f)　　  
[GitHub API を GAS でいい感じで叩くためのライブラリを作った (未完)](https://matsubara0507.github.io/posts/2017-05-03-make-githubapi-lib-for-gas.html)
