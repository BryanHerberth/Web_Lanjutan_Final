const http = require("http")

http
    .createServer(function (req, res){

        res.writeHead(200, {"Content-Type": "text/html"});
        res.write("<H1>Module HTTP MObile and Web </H1>");

        res.end();
    })
    .listen(3400);