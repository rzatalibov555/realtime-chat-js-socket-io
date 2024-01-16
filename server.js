const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

// Creating socket and listen

// start 1
const io = require("socket.io")(server);
// end

app.use(express.static(path.join(__dirname+"/public")));

// start2
io.on("connection", function(socket){
    socket.on("newuser",function(username){
        socket.broadcast.emit("update", username + " joined the conversation");
    });

    socket.on("exituser",function(username){
        socket.broadcast.emit("update", username + " left the conversation");
    });

    socket.on("chat",function(message){
        socket.broadcast.emit("chat", message);
    });
})
// end

server.listen(5000);
