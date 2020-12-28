var v1 = 'v1';
// 100000 code
v1 = 'egoing';
var v2 = 'v2';

var o = {
    v1:'ver1',
    v2:'ver2',
    f1: function(){
        console.log(this.v1);
    },
    f2: function(){
        console.log(this.v2);
    }
}
console.log(o['v1']);
o.f1();

