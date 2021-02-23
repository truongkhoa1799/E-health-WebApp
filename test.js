function talk(){
    console.log("hello");
}
function sing(){
    console.log("sing");
}

const os1 = require('os');
console.log(os1.freemem());

var b = "hello";
module.exports.endpoint = b;
module.exports.talk = talk;
module.exports.sing = sing;