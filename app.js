const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const server = require("http").createServer(app);
const io = require("socket.io")(server);

const { getTime } = require("./src/functions/functions");
// const nicks = require("./src/models/nicks");

// CORS
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

io.origins(['https://me-app.oljo.me:443']);

io.on("connection", function (socket) {

    var currentNick = "";

    console.info("User connected");

    socket.on("new nick", function (nick) {
        currentNick = nick;
        let currentTime = getTime();
        io.emit(
            "nick joined",
            { message: nick + " anslöt sig till chatten.", time: currentTime }
        );
    });

    socket.on("chat message", function (data) {
       let currentTime = getTime();
       io.emit(
           "chat message",
           { nick: data.nick, message: data.message, time: currentTime }
       );
    });

    socket.on('disconnect', function (socket) {
        console.log("User disconnected");
        let currentTime = getTime();
        io.emit(
            "nick left",
            { message: currentNick + " lämnade chatten.", time: currentTime }
        );
    });
});

const port = 8300;

server.listen(port, function () {
    console.log("Websocker server listening on port " + port + ".")
});
