var query = "#Issue登録テスト"; //検索に使いたいハッシュタグなど

//リポジトリオーナー
var owner = ""; 
//リポジトリ名
var repo  = ""; 
//personal access token  with scope repo.  * go https://github.com/settings/tokens/new
var token = ""; 
var option = null;
var git = GitHubAPI.create(owner,repo,token,option);

git.getIssues = function(owner,repo){
  var path = "/repos/" + owner + "/" + repo + "/issues";
  var data = {};
  return this.get(path, data);
};

git.makeIssue = function (title,body,assignee,milestone,labels){
  if(!title){
    Logger.log("Error: title is undefined!! These are always required.\n");
    return -1;
  } 
  if(!body){
    body = "";
  }
  if(!assignee){
    assignee = "";
  }
  if(!milestone){
    milestone = null;
  }
  if(!labels){
    labels = [];
  }
  
  var path = "/issues";
  var data = {
    "title" : title,
    "body" : body,
    "assignee" : assignee,
    "milestone" : milestone,
    "labels" : labels
  };
  return this.post(path, data);
};

function search_and_mkIssue() {
  //search
  var ret = (Twitter.search(query))
  var tweets = ret.statuses
  for(var i=0; i<tweets.length; i++) {
    var tweet = tweets[i];
    
    Logger.log(tweet);    
        
    //短縮URLを拡張
    expandURL(tweet);
    
    // titleとbodyの抽出
    var title = getTitle(tweet.text);
    var body = getBody(tweet.text);
    
    // gitにissue登録
    ret = git.makeIssue(title,body);
    
    // tweetの削除
    if(ret!=-1 && title!="" ){
      Twitter.mydelete(tweet.id_str)
    }
  }
};

function expandURL(tweet){
  var urls = tweet.entities.urls;
  //expand URL
  //entities={urls=[{display_url=example.com, indices=[22, 45], expanded_url=http://example.com, url=https://t.co/DIlwkIBSPW}], 
  for(var i=0; i<urls.length; i++){
    tweet.text = tweet.text.replace(urls[i].url, urls[i].expanded_url);
    //Logger.log(urls[i].expanded_url);
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
