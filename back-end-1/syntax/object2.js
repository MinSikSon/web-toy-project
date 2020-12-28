// data, control

// array, object

// js 에서 함수는 변수 취급 된다!!
var f = function (){
    console.log("hihi");
}

console.log(f);
f();

// var i = if(true){console.log(1);}
// var w = while(true){console.log(1);}

// 배열
var a = [f];
a[0]();

// 객체
var o = {
    func:f
}

o.func();