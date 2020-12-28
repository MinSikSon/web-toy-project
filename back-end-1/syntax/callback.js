// function A() {
//     console.log("A");
// }

var a = function(){
    console.log("A");
}
// a();

function slowFunc(callback){
    callback();
}

slowFunc(a);