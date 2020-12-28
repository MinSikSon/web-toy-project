var express = require('express');
var router = express.Router();
var template = require('../lib/template.js')

function getRandom(min,max)
{
  return Math.random() * (max-min) + min;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  var srcList = ['/images/izone.jpg', '/images/comein.jpg', '/images/crown.jpeg'];
  var srcSize = ['800px', '600px', '800px'];
  console.log(srcList.length);
  var srcNum = Number(getRandom(0, srcList.length - 1)).toFixed(0);
  console.log("srcNum: " + srcNum);
  console.log(srcList[srcNum]);
  var style = ``;;
  var body = `
  안녕하슈~ 이름을 정해주시오~
  <form id="form_1" action="">
    <p><input id="m" autocomplete="off" /> <button>이름 등록</button></p>
  </form>
  <form id="form_2" action='/chat' method='get'>
    <p><button><img src="${srcList[srcNum]}" style="width:${srcSize[srcNum]}; display:block; margin:10px;"></button></p>
  </form>
  `;
  var control = `
    <script src="/socket.io/socket.io.js"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script>
        $(function () {
          var socket = io();
          $('#form_1').submit(function(e) {
              e.preventDefault(); // prevents page reloading
              socket.emit('chat register', $('#m').val());
              $('#m').val('');
              return false;
          });

        });
    </script>
  `;


  res.end(template.HTML(style,'', body, control));
});

module.exports = router;
