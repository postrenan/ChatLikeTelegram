const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", methods: ["GET", "POST"]
  }
});

let users = [];
const messages = [];
//socket. envia para o remetente
//io. envia para todos
io.on("connection", (socket) => {
  socket.on("userLogin", (nickname) => {
    if (!nickname.includes(users.name)) {
      users.push({ id: socket.id, name: nickname });
      socket.emit("userValidation", true);
      if (messages.length > 0) {
        socket.emit("messageForAll", messages);
      }
      io.emit("receivedUsers", users);
      return;
    }
    socket.emit("userValidation", false);
  });

  socket.on("userMessage", (message) => {
    let user = users.find(users => users.id === socket.id);
    if (message !== "") {
      messages.push({ content: message, timer: new Date(hour, minute), user: user.name});
      io.emit("messageForAll", messages);
    }
  });

  socket.on("disconnect", () => {
    let user = users.find(users => users.id === socket.id);
    if (!user) return;
    let name = user.name;
    let message = `O usuario ${name} deixou o chat`;
    let time = socket.time;
    messages.push(message);
    io.emit("messageForAll", messages);
    users = users.filter(users => users.id !== socket.id);
    io.emit("receivedUsers", users);
  });
});
server.listen(3000, () => {
  console.log("listening on *:3000");
});