var express = require('express');
var router = express.Router();
var template = require('../lib/template');

var boardData = require('../data/boardData');

var gid = boardData.contents.length;

/* GET home page. */
router.get('/', function(req, res, next){
  console.log('contents get');
  
  console.log(boardData.contents);
  const response = {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "https://www.example.com",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
    body: JSON.stringify(boardData.contents),
  };

  res.send(response);
});

router.post('/', function(req, res, next){
  console.log('contents post');
  var data = JSON.parse(req.body.body);

  var date = new Date();
  var date_form = date.getFullYear() + '-' + String(date.getMonth() + 1) + '-' + date.getDate();
  console.log(date_form);

  console.log('[post] ' + data);
  var hellodata = {
    "id": gid++,
    "title": data.title,
    "content": data.content,
    "date": date_form,
    "user": data.user,
    "pw": data.pw
  }
  hellodata.test = "hi";
  console.log(hellodata);
  if (data.title === '')
  {
    res.send("post fail");
  }
  else if(data.content === '')
  {
    res.send("post fail");
  }
  else
  {
    boardData.contents.push(hellodata);

    res.send("post success");
  }
});

router.get('/:contentId', function(req, res, next){
  console.log(req.params);
  console.log(req.params.contentId);
  var id = req.params.contentId;

  var idx = getJsonListIndexFromId(id);

  console.log(boardData.contents[idx]);
  console.log(boardData.contents[idx].content);
  hello = {
    title: boardData.contents[idx].title,
    content: boardData.contents[idx].content,
    date: boardData.contents[idx].date,
    user: boardData.contents[idx].user,
  }
  res.send(JSON.stringify(hello));
});


router.post('/page/:pageId', function(req, res, next){
  console.log(req.params.pageId);
  // 뭔가 담아서 보내야 하나?
  res.json("get: " + req.params.pageId);
  next();
});

router.put('/', function(req, res, next) {
  var title = `
    put
  `;
  var body = `[put] data from server`;
  res.send(template.HTML('',title, body,''));
  // res.render('index', { title: 'Express' });
});

router.put('/:contentId', function(req, res, next){
  console.log('put /:contentId');
  var id = req.params.contentId;
  var idx = getJsonListIndexFromId(id);
  var json = JSON.parse(req.body.body);
  console.log('json: ' + json);
  if (json.user != boardData.contents[idx].user)
  {
    res.send('put fail');
  }
  else if(json.pw != boardData.contents[idx].pw)
  {
    res.send('put fail');
  }
  else
  {
    boardData.contents[idx].title = json.title;
    boardData.contents[idx].content = json.content;
    res.send('put success');
  }
});

router.delete('/', function(req, res, next) {
  console.log('delete');
  hellodata = {
    id : '1234',
    content: '[delete] data from server'
  };
  
  res.send(hellodata);
  // res.render('index', { title: 'Express' });
});

function getJsonListIndexFromId(id)
{
  var itemToFind = boardData.contents.find(function(item){return item.id == id});
  console.log('itemToFind: ' + itemToFind);
  return boardData.contents.indexOf(itemToFind);
}
router.delete('/:contentId', function(req, res, next) {
  console.log('delete');
  var id = req.params.contentId;
  console.log(id);
  var idx = getJsonListIndexFromId(id);

  var json = JSON.parse(req.body.body);

  if(json.user === boardData.contents[idx].user || json.user === undefined)
  {
    if (json.pw === boardData.contents[idx].pw || json.pw === undefined)
    {
      console.log(idx);
      if (idx >= 0)
      {
        boardData.contents.splice(idx, 1);
      }
  
      res.send('delete success');
    }
    else
    {
      res.send('delete fail (pw error)');
    }
  }
  else
  {
    res.send('delete fail (id error)');
  }
});

module.exports = router;
