var express = require("express"),
    http = require("http");

var app = express();

app.use(express.static(__dirname + '/public'));

var httpServer = http.createServer(app);

httpServer.listen(process.env.PORT, process.env.IP, function() {
    console.log('server is listening for requests');
});