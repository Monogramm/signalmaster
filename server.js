/*global console*/
var yetify = require('yetify'),
    config = require('getconfig'),
    fs = require('fs'),
    sockets = require('./sockets'),
    port = parseInt(process.env.PORT || config.server.port, 10),
    host = process.env.HOST || config.server.host,
    key = process.env.SSL_KEY || config.server.key,
    cert = process.env.SSL_CERT || config.server.cert,
    password = process.env.SSL_PASSWORD || config.server.password,
    server_handler = function (req, res) {
        if (req.url === '/healthcheck') {
            console.log(Date.now(), 'healthcheck');
            res.writeHead(200);
            res.end();
            return;
        }
        res.writeHead(404);
        res.end();
    },
    server = null;

// Create an http(s) server instance to that socket.io can listen to
if (config.server.secure && key && cert) {
    server = require('https').Server({
        key: fs.readFileSync(key),
        cert: fs.readFileSync(cert),
        passphrase: password
    }, server_handler);
} else {
    server = require('http').Server(server_handler);
}
server.listen(port);

sockets(server, config);

if (config.uid) process.setuid(config.uid);

var httpUrl;
if (config.server.secure) {
    httpUrl = "https://" + host + ":" + port;
} else {
    httpUrl = "http://" + host + ":" + port;
}
console.log(yetify.logo() + ' -- signal master is running at: ' + httpUrl);
