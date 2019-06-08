var query = "#Issue登録テスト"; //検索に使いたいハッシュタグなど


function search_and_mkIssue() {
  //リポジトリオーナー
  var owner = ""; 
  //リポジトリ名
  var repo  = ""; 
  //personal access token  with scope repo.  * go https://github.com/settings/tokens/new
  var token = ""; 
  var option = null;
  var git = new GitHubAPI(owner,repo,token,option);
  
  //search
  var ret = (Twitter.search(query))
  var tweets = ret.statuses
  for(var i=0; i<tweets.length; i++) {
    var tweet = tweets[i];
    
    Logger.log(tweet);    
    
    // titleとbodyの抽出
    var title = getTitle(tweet.text);
    var body = getBody(tweet.text);
    
    // gitにissue登録
    git.makeIssue(title,body);
    
    // tweetの削除
    Twitter.mydelete(tweet.id_str)
  }
};

function getTitle(text){
  var texts = text.split(/\r\n|\r|\n/);
  for(var i=0; i<texts.length; i++){
    var pos = texts[i].indexOf("title:");
    if(pos!=-1){
      return texts[i].slice(pos+6);
    }
  }
};

function getBody(text){
  var i = text.indexOf("body:");
  if(i==-1){
    return ""; 
  }
  var body = text.slice(i+5);
  
  //trim title:
  var j = body.indexOf("title:");
  if(j!=-1){
    //"title:"から改行までの文字列を削除
    var t = (body.slice(j)).split(/\r\n|\r|\n/)[0];
    body = body.replace(t,"");
  }
  
  //trim query
  if(body.match(query)){
    body = body.replace(query,"");
  }
  
  return body;
};
