var port_num = '3001';
var http = require('http');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');
var mime = require('mime');
var template = require('./template.js');
var path = require('path');

// var answer = Math.floor(Math.random() * 1000);
var answer = GetAnswer();

function GetAnswer()
{
    console.log("GetAnswer");
    answer = Math.floor(Math.random() * 1000);
    first = Math.floor(Number(answer / 100));
    second = Math.floor(Number((answer - (first * 100)) / 10));
    third = Math.floor(Number(answer - (first * 100 + second * 10)));

    if ((first != second) && (second != third))
    {
        console.log("answer: " + answer + ", first: " + first + ", second: " + second + ", third: " + third);
        return answer;
    }
    else
    {
        console.log("answer: " + answer + ", first: " + first + ", second: " + second + ", third: " + third);
        return GetAnswer();
    }
}

function compare(input_num)
{
    var num = Number(input_num);
    var first = Math.floor(num / 100);
    var second = Math.floor(num / 10) - (first * 10);
    var third = num - (first * 100) - (second * 10);

    var ans = Number(answer);
    var ans_first = Math.floor(ans / 100);
    var ans_second = Math.floor(ans / 10) - (ans_first * 10);
    var ans_third = ans - (ans_first * 100) - (ans_second * 10);

    var strike = 0;
    var ball = 0;
    var out = 0;
    
    if (first === ans_first)
    {
        strike++;
    }
    else if(first === ans_second)
    {
        ball++;
    }
    else if(first === ans_third)
    {
        ball++;
    }

    if(second === ans_second)
    {
        strike++;
    }
    else if (second === ans_first)
    {
        ball++;
    }
    else if(second === ans_third)
    {
        ball++;
    }

    if(third === ans_third)
    {
        strike++;
    }
    else if (third === ans_first)
    {
        ball++;
    }
    else if(third === ans_second)
    {
        ball++;
    }

    if (strike === 0 && ball === 0)
    {
        out++;
    }

    var ret = "[ret] S: " + strike + ", B: " + ball + ", O: " + out;
    var success = false;
    if (strike === 3)
    {
        success = true;
    }

    return {ret, success};
}

var app = http.createServer(function(req, res){
    var _url = req.url;
    var _ip = req.connection.remoteAddress;
    // console.log("_url: " + _url);
    // console.log(url.parse(_url, true));
    var pathname = url.parse(_url, true).pathname;
    var queryData = url.parse(_url, true).query;
    console.log("pathname: " + pathname);
    // console.log("queryData: " + queryData);
    console.log("queryData.id: " + queryData.id);
    if (pathname === '/')
    {
        var body = `
            <a href="/start">start!</a><br>
        `;

        res.writeHead(200);
        res.end(template.HTML(body));
    }
    else if(pathname === '/start')
    {
        
        var body = `
            <form action="/data_process" method="post">
                <p>
                    <input type="text" name="input_num" placeholder="input_num">
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>
        `;
        res.writeHead(200);
        res.end(template.HTML(body));
    }
    else if(pathname === '/data_process')
    {
        console.log("answer: " + answer);
        var body = '';
        req.on('data', function(data){
            body += data;
            if (body.length > 1e6)
                request.connection.destroy();
        });

        req.on('end', function(){
            var post = qs.parse(body);
            var input_num = post.input_num;
            template.log += "["+template.log_count+"] " + input_num + " => ";
            var ret = compare(input_num);
            console.log(ret);
            template.log += "(ip: " + _ip + ")"
            template.log += ret.ret + "<br>";

            template.log_count++;

            if (ret.success === true)
            {
                template.log += "WINNER: " + _ip + "<br>";
                res.writeHead(302, {Location: `/answer`});
                res.end("answer");
            }
            else
            {
                res.writeHead(302, {Location: `/start`});
                res.end("success");
            }
        });
    }
    else if(pathname === '/answer')
    {
        var imgPath = `./baseball/success.jpg`;
        fs.readFile(imgPath, function(err, data){
            var imgMime = mime.getType(imgPath);
            // console.log(Buffer.from(data).toString('base64'));
            var body = `
                <h1>경 - 축</h1>
                <h2>정답을 맞췄습니다 다 다 다 다다라 다다다!! ${answer}</h2>
                <img src="/image"/><br>
                <form action="/restart" method="post">
                    <input type="submit" value="재시작"></input>
                </form>
            `;

            // res.writeHead(200, {'Content-Type':imgMime});
            res.writeHead(200);
            res.end(template.HTML(body));
            // res.end(data);


        });

    }
    else if(pathname === '/restart')
    {
        answer = Math.floor(Math.random() * 1000);
        template.CLEAR();

        res.writeHead(302, {Location: `/start`});
        res.end("success");
    }
    else if(pathname === '/image')
    {
        var imgPath = `./baseball/success.jpg`;
        fs.readFile(imgPath, function(err, data){
            var imgMime = mime.getType(imgPath);
            res.writeHead(200, {'Content-Type':imgMime});
            // res.writeHead(200);
            res.end(data);
        });
    }
    else
    {
        res.writeHead(404);
        res.end("404");
    }
});

app.listen(port_num);