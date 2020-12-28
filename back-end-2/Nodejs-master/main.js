const express = require('express')
const app = express()
const port = 3000
var fs = require('fs');
var indexRouter = require('./routes/index.js')
var topicRouter = require('./routes/topic.js')
var helmet = require('helmet');
app.use(helmet());

// 정적인 파일 사용하기 위해 필요. public 폴더 이하에 있는 파일을 url 을 통해 접근 가능.
app.use(express.static('public'));

// body-parser 를 사용하면, request.body 가 추가된다.
var bodyParser = require('body-parser');
const { request } = require('express');
app.use(bodyParser.urlencoded({extended: false}));

// middle-ware example
// get 방식에서만 아래 middle-ware 사용!
app.get('*', function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  })
});

app.use('/', indexRouter);
app.use('/topic', topicRouter);

// route, routing: 길을 찾는 것.x
// app.get('/', (req, res) => {res.send('Hello World!')})


// express 에서 인자가 4 개인 함수는 err 핸들링하는 함수임. next(err) 를 수행할 때 express 에서는 아래 인자가 4개인 middle-ware 를 수행하도록 약속되어 있음.
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// error handle. middle-ware 는 순차적으로 실행 됨. 위에서부터 순차적으로 실행되다가, 여기까지 왔다는 것은 찾을 수 없는 page 에 접근 했다는 것이 됨.
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

// app.listen(port, () => {console.log(`Example app listening at http://localhost:${port}`)})
app.listen(port, function(){
  console.log(`Example app listening at http://localhost:${port}`)
})

/*
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = template.list(filelist);
          var html = template.HTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`
          );
          response.writeHead(200);
          response.end(html);
        });
      } else {
        fs.readdir('./data', function(error, filelist){
          var filteredId = path.parse(queryData.id).base;
          fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
            var title = queryData.id;
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description, {
              allowedTags:['h1']
            });
            var list = template.list(filelist);
            var html = template.HTML(sanitizedTitle, list,
              `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
              ` <a href="/create">create</a>
                <a href="/update?id=${sanitizedTitle}">update</a>
                <form action="delete_process" method="post">
                  <input type="hidden" name="id" value="${sanitizedTitle}">
                  <input type="submit" value="delete">
                </form>`
            );
            response.writeHead(200);
            response.end(html);
          });
        });
      }
    } else if(pathname === '/create'){
      fs.readdir('./data', function(error, filelist){
        var title = 'WEB - create';
        var list = template.list(filelist);
        var html = template.HTML(title, list, `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
        `, '');
        response.writeHead(200);
        response.end(html);
      });
    } else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var title = post.title;
          var description = post.description;
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          })
      });
    } else if(pathname === '/update'){
      fs.readdir('./data', function(error, filelist){
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
          var title = queryData.id;
          var list = template.list(filelist);
          var html = template.HTML(title, list,
            `
            <form action="/update_process" method="post">
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
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
          );
          response.writeHead(200);
          response.end(html);
        });
      });
    } else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;
          var title = post.title;
          var description = post.description;
          fs.rename(`data/${id}`, `data/${title}`, function(error){
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
              response.writeHead(302, {Location: `/?id=${title}`});
              response.end();
            })
          });
      });
    } else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;
          var filteredId = path.parse(id).base;
          fs.unlink(`data/${filteredId}`, function(error){
            response.writeHead(302, {Location: `/`});
            response.end();
          })
      });
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);

*/