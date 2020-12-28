var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');

function templateHTML(list, title, body, control) {
  return template = `
    <!doctype html>
    <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${control}
        ${body}
      </body>
    </html>
    `;
}

function templateList(fileList) {
  var list = `<ul>`;
  for (var i = 0; i < fileList.length; i++) {
    // list += `<li><a href="/?id=${fileList[i]}">${fileList[i].toUpperCase()}</a></li>`
    list += `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`
  }
  list += `</ul>`;

  return list;
}

var app = http.createServer(function (request, response) {
  var _url = request.url;
  console.log(url.parse(_url, true));
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var title = queryData.id;
  
  console.log("pathname: " + pathname);

  if (pathname === '/') {
    if (queryData.id === undefined) {
      fs.readdir('./data', function (error, fileList) { // async
        var list = templateList(fileList);
        var title = "Welcome!";
        var description = "Hello, Node.js!";
        var body = `<h2>${title}</h2><p>${description}</p>`;
        var control = `<a href="/create">create</a>`;

        response.writeHead(200);
        response.end(templateHTML(list, title, body, control));
      });
    }
    else {
      var filteredId = path.parse(queryData.id).base;
      console.log("filteredId: " + filteredId);
      fs.readFile(`./data/${filteredId}`, 'utf8', function (error, description) { // async
        fs.readdir('./data', function (error, fileList) { // async
          var list = templateList(fileList);
          var title = queryData.id;
          var body = `<h2>${title}</h2><p>${description}</p>`;
          var control = `
          <a href="/create">create</a>
          <a href="/update?id=${title}">update</a>
          <form action="/delete_process" method="post" onsubmit="check">
            <input type="hidden" name="id" value="${title}">
            <input type="submit" value="delete">
          </form>
          `;

          response.writeHead(200);
          response.end(templateHTML(list, title, body, control));
        });
      });
    }
  }
  else if(pathname === '/create')
  {
    fs.readdir('./data', function (error, fileList) { // async
      var list = templateList(fileList);
      var title = 'WEB - create';
      var description = `    
        <form action="http://localhost:3000/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p><textarea name="description" placeholder="description"></textarea></p>
          <p><input type="submit"></p>
        </form>
    `;
      var body = `<h2>${title}</h2><p>${description}</p>`;
      response.writeHead(200);
      response.end(templateHTML(list, title, body, ''));
    });
  }
  else if(pathname === '/create_process')
  {
    var body = '';

    request.on('data', function (data) {
      // web browser 가
        body += data;

        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6)
            request.connection.destroy();
    });

    request.on('end', function () {
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        console.log(title);
        console.log(description);

        fs.writeFile(`data/${title}`, description, 'utf8', function(error){
          response.writeHead(302, {Location: `/?id=${title}`}); // 302: redirection
          response.end("success");

          // redirection
        })
        // use post['blah'], etc.
    });
  }
  else if(pathname === '/update')
  {

    fs.readFile(`./data/${queryData.id}`, 'utf8', function (error, description) { // async
      fs.readdir('./data', function (error, fileList) { // async
        var list = templateList(fileList);
        var title = queryData.id;
        var body = `<h2>${title}</h2>
        <form action="http://localhost:3000/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p><textarea name="description" placeholder="description">${description}</textarea></p>
          <p><input type="submit"></p>
        </form>
    `;
        var control = `
          <a href="/create">create</a>
          <a href="/update?id=${title}">update</a>
          `;

        response.writeHead(200);
        response.end(templateHTML(list, title, body, control));
      });
    });
  }
  else if(pathname === '/update_process')
  {
    var body = '';

    request.on('data', function (data) {
      // web browser 가
        body += data;

        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6)
            request.connection.destroy();
    });

    request.on('end', function () {
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        var id = post.id;
        console.log(id);
        console.log(title);
        console.log(description);

        var filteredId = path.parse(id).base;
        var filteredTitle = path.parse(filteredTitle).base;
        fs.rename(`data/${filteredId}`, `data/${filteredTitle}`, function(error){
          fs.writeFile(`data/${filteredTitle}`, description, 'utf8', function(error){
            response.writeHead(302, {Location: `/?id=${filteredTitle}`}); // 302: redirection
            response.end("success");
          });
          // redirection
        })
        // use post['blah'], etc.
    });
  }
  else if(pathname === '/delete_process')
  {
    var body = '';

    request.on('data', function (data) {
      // web browser 가
        body += data;

        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6)
            request.connection.destroy();
    });

    request.on('end', function () {
        var post = qs.parse(body);
        var id = post.id;
        console.log(id);

        var filteredId = path.parse(id).base;
        fs.unlink(`data/${filteredId}`, function(error){
          response.writeHead(302, {Location: `/`}); // 302: redirection
          response.end("success");
        });

        // use post['blah'], etc.
    });
  }
  else
  {
    response.writeHead(404);
    response.end("Not Found.");
  }
});

app.listen(3000); // port