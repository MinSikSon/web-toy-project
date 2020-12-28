// router.get('요기') // 요기 부분에 적히는건 경로를 줄줄이 적을 필요 없지만, redirect 등에는 full path 를 적어야 하네.

var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var fs = require('fs');

// 순서가 중요.
router.get('/create', function(request, response){
  var title = 'WEB - create';
  var list = template.list(request.list);
  var html = template.HTML(title, list, `
    <form action="/topic/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
        <textarea name="description" placeholder="description"></textarea>
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
  `, '');
  response.end(html);
});
  
router.post('/create_process', function(request, response){
  // var body = '';
  // request.on('data', function(data){
  //     body = body + data;
  // });
  // request.on('end', function(){
  //     var post = qs.parse(body);
  //     var title = post.title;
  //     var description = post.description;
  //     fs.writeFile(`data/${title}`, description, 'utf8', function(err){
  //       response.writeHead(302, {Location: `/page/${title}`});
  //       response.end();
  //     })
  // });

  var post = request.body;
  var title = post.title;
  var description = post.description;
  fs.writeFile(`data/${title}`, description, 'utf8', function(err){
    response.redirect(`/topic/${title}`);
  });
});

// [Q] url path 를 통해서 parameter 를 전달하는 경우에, express 에서는 어떻게 처리하는가?
// [A] Express 에서는 query string 이 아닌 path 방식을 통해서 parameter 전달한다.
router.get('/:pageId', function(request, response, next) {
  var filteredId = path.parse(request.params.pageId).base;
  console.log(request.params.pageId);
  console.log(path.parse(request.params.pageId));
  console.log(path.parse(request.params.pageId).base);
  fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
    if (err)
    {
      next(err);
    }
    else
    {
      var title = request.params.pageId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description, {
        allowedTags:['h1']
      });
      var list = template.list(request.list);
      var html = template.HTML(sanitizedTitle, list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        ` <a href="/topic/create">create</a>
          <a href="/topic/update/${sanitizedTitle}">update</a>
          <form action="/topic/ " method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="delete">
          </form>`
      );
      response.send(html);
    }
  });
});



router.get('/update/:pageId', function(request, response){
  fs.readdir('./data', function(error, filelist){
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
      var title = request.params.pageId;
      var list = template.list(filelist);
      var html = template.HTML(title, list,
        `
        <form action="/topic/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
        `<a href="/topic/create">create</a> <a href="/topic/update/${title}">update</a>`
      );
      response.send(html);
    });
  });
});

router.post('/update_process', function(request, response){
  // var body = '';
  // request.on('data', function(data){
  //     body = body + data;
  // });
  // request.on('end', function(){
  //     var post = qs.parse(body);
  //     var id = post.id;
  //     var title = post.title;
  //     var description = post.description;
  //     fs.rename(`data/${id}`, `data/${title}`, function(error){
  //       fs.writeFile(`data/${title}`, description, 'utf8', function(err){
  //         response.redirect(`/page/${title}`);
  //       })
  //     });
  // });

  var post = request.body;
  var id = post.id;
  var title = post.title;
  var description = post.description;
  fs.rename(`data/${id}`, `data/${title}`, function(error){
    fs.writeFile(`data/${title}`, description, 'utf8', function(err){
      response.redirect(`/topic/${title}`);
    })
  });
});

router.post('/delete_process', function(request, response){
  // var body = '';
  // request.on('data', function(data){
  //   body = body + data;
  // });
  // request.on('end', function(){
  //   var post = qs.parse(body);
  //   var id = post.id;
  //   var filteredId = path.parse(id).base;
  //   fs.unlink(`data/${filteredId}`, function(error){
  //     response.redirect('/');
  //   })
  // });
  var post = request.body;
  var id = post.id;
  var filteredId = path.parse(id).base;
  fs.unlink(`data/${filteredId}`, function(error){
    response.redirect('/');
  });
});

module.exports = router;