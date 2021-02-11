// import public module
var express = require('express');
var router = express.Router();

// import private module
let contentRepo = require('../model/contentRepo');
const contentRepoImpl = new contentRepo();

// import db module
var mysql_async = require('mysql');
var db_async = mysql_async.createConnection({
  host: 'localhost',
  user: 'nodejs',
  password: '111111', database: 'opentutorials'
});

router.get('/', function (req, res, next) {
  db_async.query(contentRepoImpl.query_get(), function (err, results, fields) {
    if (err) {
      res.sendStatus(403);
    }
    res.send(contentRepoImpl.createContentArray(results));
  });
});

router.get('/loadpartialcontent/:nLoadedContents', function (req, res, next) {
  db_async.query(contentRepoImpl.query_get_partial(req.params.nLoadedContents), function (err, results, fields) {
    if (err) {
      res.sendStatus(403);
    }

    let contents = contentRepoImpl.createContentArray(results);
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
  });
});

router.get('/loadpartialcontent/:nLoadedContents/keyword/:keyWord', function (req, res, next) {
  db_async.query(contentRepoImpl.query_get_partial_by_search(req.params.keyWord, req.params.nLoadedContents), function (error, results, fields) {
    if (error) {
      res.sendStatus(403);
    }

    let contents = contentRepoImpl.createContentArray(results);
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
  });
});

router.post('/', function (req, res, next) {
  console.log('[content post]');
  var data = JSON.parse(req.body.body);

  if (data.title === '') {
    console.log("post fail 1");
    res.send("post fail");
  }
  else if (data.content === '') {
    console.log("post fail 2");
    res.send("post fail");
  }
  else {
    db_async.query(contentRepoImpl.query_post(data.title, data.content, data.user), function (error, results) {
      if (error) {
        res.sendStatus(403);
      }

      let data = JSON.parse(req.body.body);
      console.log('[post] ' + data);
      res.sendStatus(200);
    });
  }
});

router.get('/:contentId', function (req, res, next) {
  db_async.query(`SELECT * FROM topic WHERE id=?`, [req.params.contentId], function (error, results) {
    if (error) {
      res.sendStatus(403);
    }

    let id = req.params.contentId;
    console.log("id: " + id + ", results[0]: " + results[0]);
    console.log(results[0].description);
    let result = results[0];
    let content = contentRepoImpl.contentForm(
      result.id,
      result.title,
      result.description,
      result.author_id,
      result.created);
    res.send(content);
  });
});

router.put('/:contentId', function (req, res, next) {
  console.log('put /:contentId');
  var id = req.params.contentId;
  var json = JSON.parse(req.body.body);
  db_async.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE id=?`, [json.title, json.content, json.user, id], function (error, results) {
    if (error) {
      res.sendStatus(403);
    }
    res.sendStatus(200);
  })
});

router.delete('/:contentId', function (req, res, next) {
  db_async.query(`DELETE FROM topic WHERE id=?`, [req.params.contentId], function (error, results) {
    if (error) {
      res.sendStatus(403);
    }
    res.sendStatus(200);
  });
});

router.get('/search/:keyWord', function (req, res, next) {
  db_async.query(contentRepoImpl.query_get_by_search(req.params.keyWord), function (error, results) {
    if (error) {
      res.sendStatus(403);
    }

    res.send(contentRepoImpl.createContentArray(results));
  })
});

module.exports = router;