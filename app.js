const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const server = require("http").createServer(app);
const io = require("socket.io")(server);

const { getTime } = require("./src/functions/functions");
const { saveMessage, getMessages } = require("./src/models/db/db");
// const nicks = require("./src/models/nicks");

io.origins(['https://me-app.oljo.me:443']);

app.get("/", async function(req, res) {
    let messages = await getMessages();
    res.json(messages);
});

io.on("connection", function (socket) {

    var currentNick = "";

    console.info("User connected");

    socket.on("new nick", function (nick) {
        currentNick = nick;
        let currentTime = getTime();
        let data = { message: nick + " anslöt sig till chatten.", time: currentTime };
        saveMessage(data);
        io.emit(
            "nick joined",
            data
        );
    });

    socket.on("chat message", function (message) {
       let currentTime = getTime();
       let data = { nick: message.nick, message: message.message, time: currentTime };
       saveMessage(data);
       io.emit(
           "chat message",
           data
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
    console.log("Websocker server listening on port " + port + ".");
});
