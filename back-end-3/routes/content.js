var express = require('express');
var router = express.Router();
var template = require('../lib/template');

var boardData = require('../data/boardData');

// DB
var mysql_async = require('mysql');
var db_async = mysql_async.createConnection({
  host: 'localhost',
  user: 'nodejs',
  password: '111111', database: 'opentutorials'
});

var gid = boardData.contents.length;

function createResponseContentArray(results)
  {
    var nNumContent = results.length;
    var nLoopStart = nNumContent - 1;
    var nLoopEnd = Number(nNumContent) > 5 ? Number(nNumContent) - 5 : 0;
    console.log('nLoopStart: ' + nLoopStart + ', nLoopEnd: ' + nLoopEnd);
    var contents = [];
    console.log(results.length);
    // console.log(results[0]);
    // console.log(results);
    for (var i = nLoopStart; i >= nLoopEnd; i--)
    {
      var content = {
        'id': results[i].id,
        'title': results[i].title,
        'content': results[i].description,
        'user': results[i].author_id,
        'date': results[i].created
      };
      contents.push(content);
    }

    // console.log(contents);

    const response = {
      statusCode: 200,
      headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "https://www.example.com",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify(contents),
    };

    return response
  }

/* GET home page. */
router.get('/', function(req, res, next){
  // console.log('contents get');
  // 2. 서버 재시작 후 게시글 추가 확인(SELECT문)
  db_async.query(`SELECT * FROM topic`, function(err, results, fields){
    
    if (err)
    {
      console.log(err);
      res.send(403);
    }
    else
    {
      var response = createResponseContentArray(results);
      res.send(response);
    }
  });
});

router.get('/loadpartialcontent/:numOfLoadedContents', function(req, res, next){
  var numOfLoadedContents = req.params.numOfLoadedContents;

  db_async.query(`SELECT * FROM topic LIMIT ${numOfLoadedContents},5`, function (err, results, fields) {
    console.log("numOfLoadedContents: " + numOfLoadedContents);
    if (err) {
      console.log(err);
      res.sendStatus(403);
    }
    else {
      var contents = [];
      for (var i = 0; i< results.length; i++) {
        var content = {
          'id': results[i].id,
          'title': results[i].title,
          'content': results[i].description,
          'user': results[i].author_id,
          'date': results[i].created
        };
        contents.push(content);
      }
      console.log(contents);

      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "https://www.example.com",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify(contents),
      };

      res.send(response);
    }
  });
});

router.get('/loadpartialcontent/:numOfLoadedContents/keyword/:keyWord', function(req, res, next){
  console.log(req.params);
  var nKeyWord = req.params.keyWord;
  var numOfLoadedContents = req.params.numOfLoadedContents;
  console.log("keyword: " + nKeyWord + ', numOfLoadedContents: ' + numOfLoadedContents);
  db_async.query(`SELECT * from topic WHERE (title LIKE '%${nKeyWord}%' OR description LIKE '%${nKeyWord}% LIMIT ${numOfLoadedContents},5')`, function(error, results, fields){
    if (error) {
      console.log(error);
      res.sendStatus(403);
    }
    else {
      contents = []
      for (var i = 0; i < results.length; i++) {
        var content = {
          'id': results[i].id,
          'title': results[i].title,
          'content': results[i].description,
          'user': results[i].author_id,
          'date': results[i].created
        };
        contents.push(content);
      }
      console.log(contents);

      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "https://www.example.com",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify(contents),
      };

      res.send(response);
    }
  });
});

// 1. 게시글 추가하기(INSERT문)
router.post('/', function(req, res, next){
  // console.log('contents post');
  var data = JSON.parse(req.body.body);

  if (data.title === '')
  {
    console.log("post fail 1");
    res.send("post fail");
  }
  else if(data.content === '')
  {
    console.log("post fail 2");
    res.send("post fail");
  }
  else
  {
    console.log(data.title, data.content);
    db_async.query(`INSERT INTO topic (title, description, created, author_id) VALUES(?, ?, NOW(), ?)`,
    [data.title, data.content, data.user], function (error, results) {
      if (error) {
        throw error
        // console.log("post fail 3");
        // res.send("post fail");
      }
      else {
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
        console.log(hellodata);

        res.send("post success");
      }
    });
  }
  
});

router.get('/:contentId', function(req, res, next){
  db_async.query(`SELECT * FROM topic WHERE id=?`, [req.params.contentId], function(error, results){
    if (error)
    {
      console.log(error);
      res.sendStatus(403);
    }
    else
    {
      var id = req.params.contentId;
      var idx = getJsonListIndexFromId(id);
  
      console.log(results[0]);
      console.log(results[0].description);
      hello = {
        title: results[0].title,
        content: results[0].description,
        date: results[0].created,
        user: results[0].author_id,
      }

      res.send(JSON.stringify(hello));
    }
  });
});


router.post('/page/:pageId', function(req, res, next){
  console.log(req.params.pageId);
  // 뭔가 담아서 보내야 하나?
  res.json("get: " + req.params.pageId);
  next();
});


router.put('/:contentId', function(req, res, next){
  // 테이블 데이터 일부 수정
  console.log('put /:contentId');
  var id = req.params.contentId;
  var idx = getJsonListIndexFromId(id);
  var json = JSON.parse(req.body.body);
  console.log('json: ' + json);

  // console.log("id:", id, ", user:", json.user, json.pw, json.title, json.content);
  db_async.query(`UPDATE topic SET title=?, description=?, author_id=1 WHERE id=?`, [json.title, json.content, id], function(error, results){

    if (error)
    {
      
      console.log(403);
    }
    else
    {
      res.sendStatus(200);
    }
  })

  // var statusCode = identifiy(id, json.user, json.pw);

  // if (statusCode === 200)
  // {
  //   boardData.contents[idx].title = json.title;
  //   boardData.contents[idx].content = json.content;
  // }

  // res.send(statusCode);
});

function getJsonListIndexFromId(id)
{
  var itemToFind = boardData.contents.find(function(item){return item.id == id});
  console.log('itemToFind: ' + itemToFind);
  return boardData.contents.indexOf(itemToFind);
}

function identifiy(id, user, pw)
{
  var idx = getJsonListIndexFromId(id);

  if(user === boardData.contents[idx].user)
  {
    if (pw === boardData.contents[idx].pw)
    {
      return 200;
    }
    else
    {
      return 403;
    }
  }
  else
  {
    return 404;
  }
}

router.delete('/:contentId', function(req, res, next) {
  var id = req.params.contentId;

  db_async.query(`DELETE FROM topic WHERE id=?`, [id], function(error, results){
    if (error)
    {
      console.log(error);
      res.sendStatus(403);
      
    }
    else
    {
      console.log('delete complete');
      res.sendStatus(200);
    }
  });
  // console.log('delete');
  // var id = req.params.contentId;
  // console.log(id);
  // var idx = getJsonListIndexFromId(id);

  // var json = JSON.parse(req.body.body);
  // console.log(json);

  // var statusCode = identifiy_(id, json.user, json.pw);

  // if (statusCode === 200)
  // {
  //   if (idx >= 0)
  //   {
  //     boardData.contents.splice(idx, 1);
  //   }
  // }

  // res.send(statusCode);
 
});

router.get('/search/:keyWord', function(req, res, next)
{
  var nKeyWord = req.params.keyWord;
  console.log(nKeyWord);
  // nKeyWord를 포함하는 데이터 긁어와야 함..!
  db_async.query(`SELECT * from topic WHERE (title LIKE '%${nKeyWord}%' OR description LIKE '%${nKeyWord}%')`, function(error, results){
    if (error)
    {
      console.log(error);
      res.sendStatus(403);
    }
    else
    {
      console.log(results);
      console.log("!!!!!!!!!!!!!!!");
      var response = createResponseContentArray(results);
      // res.send(response);
      console.log(response);
      res.send(response);
    }
  })
});


module.exports = router;
