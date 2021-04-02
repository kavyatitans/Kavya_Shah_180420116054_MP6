var udp = require('dgram');
var server = udp.createSocket('udp4');
function checkPalindrome(str) {
    const len = str.length;
    for (let i = 0; i < len / 2; i++) {
        if (str[i] !== str[len - 1 - i]) {
            return 'It is not a palindrome';
        }
    }
    return 'It is a palindrome';
}
server.on('error', function(error) {
    console.log('Error: ' + error);
    server.close();
});
server.on('message', function(msg, info) {
    console.log('Data received from client : ' + msg.toString());
    console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
    server.send(checkPalindrome(msg.toString()), info.port, 'localhost', function(error) {
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