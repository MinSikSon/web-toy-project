var members = ['sms', 'k8805', 'hoya']; // array
console.log(members[1]);
var i = 0;
while(i < members.length)
{
    console.log('loop: ' + members[i]);
    i += 1;
}

var role = {
    'programmer': 'sms',
    'designer': 'k8805',
    'manager': 'hoya'
}
console.log(role['designer']);
console.log(role.designer);

for(var name in role)
{
    console.log("name: " + name + ", value: " + role[name]);
}