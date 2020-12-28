var express = require('express');
var router = express.Router();
var userList = new Map();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next){
  console.log(req);
  // var address = socket.handshake.address;
  // if (userList.get(address) === undefined)
  // {
  //   if (address === "::1")
  //   {
  //     console.log("set userList: server")
  //     userList.set(address, "server");
  //   }
  //   else
  //   {
  //     console.log("set userList: client_"+String(clientCount));
  //     userList.set(address, "client_"+String(clientCount++));
  //   }

  //   // print user list
  //   console.log('[userList]');
  //   for (var [key, value] of userList)
  //   {
  //     console.log(key + ', ' + value);
  //   }
  // }
  // response.redirect(`/chat`);
  res.end("^^");

});

module.exports = router;
