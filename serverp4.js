var net = require('net');
var clients = 0;


var server = net.createServer(function(client) {

    console.log('Client Connected');

    client.on('end', function() {
        console.log('Client disconnected:');
    })

    client.on('data', function(data) {
        client.write(sumdigit(Number(data.toString())));
    })
});

server.listen(8080, function() {
    console.log('Server Started on port 8000');
})

var udp = require('dgram');
var server = udp.createSocket('udp4');
function sumdigit(value){
    var sum = 0;
while (value) {
    sum += value % 10;
    value = Math.floor(value / 10);
}
return sum.toString();
}
server.on('error', function(error) {
    console.log('Error: ' + error);
    server.close();
});
server.on('message', function(msg, info) {
    console.log('Data received from client : ' + msg.toString());
    console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
    server.send(sumdigit(Number(msg.toString())), info.port, 'localhost', function(error) {
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