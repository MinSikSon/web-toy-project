var fs = require('fs');

// Sync
console.log("A");
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log("B");

// Async
console.log("C");
fs.readFile('syntax/sample.txt', 'utf8', function(error, result){
    console.log(result);
});
console.log("D");