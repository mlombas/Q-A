var http = require("http");
var fs = require("fs");
var path = require("path");
var port = 69;
var requestCount = 0;
var connectionCount = 0;

var server = http.createServer(function(req, res) {
    if(requestCount > 500) {
        return 502;
    }
    requestCount++;
    var currentRequestCount = requestCount;
    console.log("Handling request #" + currentRequestCount + " requesting " + req.url);
    if(req.url == "/") {
        res.writeHead(200, {"Content-Type": "text/html"});
        fs.readFile("html/index.html", function(err, data) {
            if(err) { 
                res.write("Error " + err.errno + "(" + err.code + ") happened");  
                console.error("error " + err.code); 
                return;
            }
            res.write(data);
            console.log("sent: " + data);
            res.end();
        });
    } else if(req.url == "/favicon.ico") {
        fs.readFile("img/icon.ico", function(err, data) {
            if(err) { 
                res.write("Error " + err.errno + "(" + err.code + ") happened"); 
                console.error("error " + err.code); 
                return;
            }
            res.write(data);
            res.end();
        })
    } else {
        var type, filepath = req.url;
        switch(path.extname(req.url)) {
            case ".js":
                type = "text/js";
                break;
            case ".html":
            case ".htm":
                type = "text/html";
                filepath = "/html" + filepath;
                break;
            case ".css":
                type = "type/css";
                break;
            case ".xml":
                type = "type/xml";
                break;
            default:
                type = "text/" + path.extname(req.url).substring(1);
                break;
        }
        filepath = filepath.substring(1);
        fs.readFile(filepath, function(err, data) {
            if(err) { 
                res.write("Error " + err.errno + "(" + err.code + ") happened"); 
                console.error("error " + err.code + " in request #" + currentRequestCount); 
                return;
            }
            res.writeHead(200, {"Content-Type": type});
            res.write(data);
            res.end();
            console.log("Request #" + currentRequestCount + " finalized");
            requestCount--;
        });
    }
    return 200;
});

server.listen(port);
console.log("listening in port " + port);

var io = require('socket.io')(server);

io.on("connection", function(socket) {
    connectionCount++
    var currentConnectionCount = connectionCount;
    console.log("connection, user #" + currentConnectionCount);
    socket.on("");
    socket.on("disconnect", function() {
        console.log("disconnection of user #" + currentConnectionCount);
    });
})