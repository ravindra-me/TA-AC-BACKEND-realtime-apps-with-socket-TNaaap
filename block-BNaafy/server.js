var express = require("express");
var http = require("http");
var app = express();
var server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require("fs");
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
io.emit("some event", {
  someProperty: "some value",
  otherProperty: "other value",
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => console.log("listening on port 3k"));
