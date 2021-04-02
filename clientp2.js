var buffer = require('buffer');
var udp = require('dgram');
var client = udp.createSocket('udp4');
var data = Buffer.from('121');
client.on('message', function(msg, info) {
    console.log('Data received from server : ' + msg.toString());
    console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
});
client.send(data, 2222, 'localhost', function(error) {
    if (error) {
        client.close();
    } else {
        console.log('Data sent !!!');
    }
});
client.on('close', function() {
    console.log('Client Socket is closed !');
});
setTimeout(function() {
    client.close();
}, 8000);