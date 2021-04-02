var udp = require('dgram');
var server = udp.createSocket('udp4');
function CheckPrime(n){
  if (n===1) {
    return "Not Prime";
  }else if(n === 2){
    return "Prime";
  }else{
    for(var x = 2; x < n; x++){
      if(n % x === 0){
        return "Not Prime";
      }
    }
    return "Prime";  
  }
}
server.on('error', function(error) {
    console.log('Error: ' + error);
    server.close();
});
server.on('message', function(msg, info) {
    console.log('Data received from client : ' + msg.toString());
    console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
    server.send(CheckPrime(Number(msg.toString())), info.port, 'localhost', function(error) {
        if (error) {
            client.close();
        } else {
            console.log('Data sent !!!');
        }
    });
});
server.on('listening', function() {
    var address = server.address();
    var port = address.port;
    var family = address.family;
    var ipaddr = address.address;
    console.log('Server is listening at port' + port);
    console.log('Server ip :' + ipaddr);
    console.log('Server is IP4/IP6 : ' + family);
});
server.on('close', function() {
    console.log('Socket is closed !');
});
server.bind(2222);
setTimeout(function() {
    server.close();
}, 8000);