var udp = require('dgram');
var server = udp.createSocket('udp4');
function sumdigit(value){
    var flag,number,remainder,addition = 0;
		number = value;

		flag = number;
		while(number > 0)
		{
			remainder = number%10;
			addition = addition + remainder*remainder*remainder;
			number = parseInt(number/10);
		}
        console.log(addition,flag)
		if(addition == flag)
		{
			return("-The inputed number is Armstrong");
		}
		else
		{
			return("-The inputed number is not Armstrong");
		}
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