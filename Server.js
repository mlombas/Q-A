/********************
 * All code designed*
 * and written by   *
 * mocoma           *
 ********************/


var http = require("http");
var fs = require("fs");
var path = require("path");
var port = 8080;
var requestCount = 0;
var connectionCount = 0;

var server = http.createServer(function(req, res) {
    if(requestCount > 500) {
        return 502;
    }
    requestCount++;
    var currentRequestCount = requestCount;
    var requested = decodeURI(req.url);
    console.log("Handling request #" + currentRequestCount + " requesting " + requested);
    if(requested == "/") {
        res.writeHead(200, {"Content-Type": "text/html"});
        fs.readFile("html/index.html", function(err, data) {
            if(err) { 
                res.write("Error " + err.errno + "(" + err.code + ") happened");  
                console.error("error " + err.code); 
                return;
            }
            res.write(data);
            res.end();
        });
    } else if(requested == "/favicon.ico") {
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
        var type, filepath = requested;
        switch(path.extname(requested)) {
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
                type = "text/" + path.extname(requested).substring(1);
                break;
        }
        filepath = filepath.substring(1);
        fs.readFile(filepath, function(err, data) {
            if(err) { 
                res.write("Error " + err.errno + "(" + err.code + ") happened"); 
                console.error("error " + err.code + " in request #" + currentRequestCount); 
            } else {
                res.writeHead(200, {"Content-Type": type});
                res.write(data);
                res.end();
                console.log("Request #" + currentRequestCount + " finalized");
            }
            requestCount--;
        });
    }
    return 200;
});

server.listen(port, "0.0.0.0");
console.log("Listening in port " + port);


var io = require('socket.io')(server);

var XMLNames;

fs.readdir("Q-A_XML", function(err, files) {
    if(err) {
        console.log("error " + err.code + " reading the xml dir");
    } else {
        XMLNames = files;
    }
});

io.on("connection", function(socket) {
    connectionCount++
    var currentConnectionCount = connectionCount;
    console.log("connection, user #" + currentConnectionCount);
    socket.on("requestNames", function(data) {
        socket.emit("names", XMLNames);
        console.log("emmited names to user #" + currentConnectionCount)
    });
    socket.on("disconnect", function() {
        console.log("disconnection of user #" + currentConnectionCount);
        connectionCount--;
    });
})