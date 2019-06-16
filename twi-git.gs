//検索に使いたいハッシュタグなど
var query_submit  = "#Issue登録テスト";  //Issue登録用のクエリ
var query_comment = "#Issueコメント追加"; //コメント追加用のクエリ

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

git.addComment = function(issueID,body){
  var path = "/issues/" + issueID + "/comments";
  
  var data = {
    "body":body
  };
  
  return this.post(path, data);
};

function twi_git() {
  //submit Issue
  submitIssue(Twitter.search(query_submit));
  
  //Add comment to Issue
  addComment(Twitter.search(query_comment));
};

function getIssueID(text){
  text.replace(" ","");
  var texts = text.split(/\r\n|\r|\n/);
  for(var i=0; i<texts.length; i++){
    var pos = texts[i].indexOf("issueID:");
    if(pos!=-1){
      return texts[i].slice(pos+8);
    }
  }
};

function addComment(ret){
  var tweets = ret.statuses
  for(var i=0; i<tweets.length; i++) {
    var tweet = tweets[i];
    
    Logger.log(tweet);
    
    //短縮URLを拡張
    expandURL(tweet);
    
    // issueID, bodyの抽出
    var issueID = getIssueID(tweet.text);
    var body = getBody(tweet.text, query_comment);
    
    // issue #issueIDにコメント追加
    ret = git.addComment(issueID, body);
    
    // tweetの削除
    if(ret!=-1 && body!=""){
      Twitter.mydelete(tweet.id_str)
    }
  }
};

function submitIssue(ret){
  var tweets = ret.statuses
  for(var i=0; i<tweets.length; i++) {
    var tweet = tweets[i];
    
    Logger.log(tweet);
    
    //短縮URLを拡張
    expandURL(tweet);
    
    // titleとbodyの抽出
    var title = getTitle(tweet.text);
    var body = getBody(tweet.text, query_submit);
    
    // gitにissue登録
    ret = git.makeIssue(title,body);
    
    // tweetの削除
    if(ret!=-1 && title!=""){
      Twitter.mydelete(tweet.id_str)
    }
  }
};

function expandURL(tweet){
  var urls = tweet.entities.urls;
  //通常のURLを拡張
  for(var i=0; i<urls.length; i++){
    tweet.text = tweet.text.replace(urls[i].url, urls[i].expanded_url);
  }
  
  //画像のURLを拡張
  if(tweet.extended_entities){
    var medias = tweet.extended_entities.media;
    for(var i=0; i<medias.length; i++){
      tweet.text = tweet.text.replace(medias[i].url, medias[i].media_url_https);
    }  
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

function getBody(text, query){
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
  body = body.replace(query,"");
  
  //引用したツイートを展開
  var url = text.match(/https:\/\/twitter\.com\/[a-zA-Z0-9_]{1,15}\/status\/[0-9]+/);
  body = body.replace(url,"");
  if(tweet.quoted_status){
    var quoted_tweet = tweet.quoted_status;
    expandURL(quoted_tweet);
    body += "\n\n---引用元----\n" + quoted_tweet.text;
  }
  
  return body;
};
