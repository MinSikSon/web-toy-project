var express = require('express');
var router = express.Router();
var template = require('../lib/template.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  var style = `
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-size: 1.8em;}
        body { font: 13px Helvetica, Arial; }
        form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
        form input { border: 0; padding: 10px; width: 77%; margin-right: 0.5%; }
        form button { width: 20%; background: rgb(130, 224, 255); border: none; padding: 10px; }
        #messages { list-style-type: none; margin: 0; padding: 0; }
        #messages li { padding: 5px 10px; }
        #messages li:nth-child(odd) { background: #eee; }
    </style>
`;
  var body = `
    <ul id="messages"></ul>
    <form action="">
        <input id="m" autocomplete="off" /><button>Send</button>
    </form>
    <script src="/socket.io/socket.io.js"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script>
        var socket = io();
        socket.emit('chat enter', '');

        $(function () {
        $('form').submit(function(e) {
            e.preventDefault(); // prevents page reloading
            socket.emit('chat message', $('#m').val());
            $('#m').val('');
            return false;
        });

        socket.on('chat message', function(msg){
            $('#messages').append($('<li>').text(msg));
        });

        socket.on('hi', function(msg){
            console.log('[test] broad cast');
        });
        });
    </script>
  `;
  res.send(template.HTML(style,'','',body));
});

// router.post('/', function(req, res, next){
//     console.log("hi");
// });

module.exports = router;



