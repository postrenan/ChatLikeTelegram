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
let rooms = ["general", "off-topic"];
//socket. envia para o remetente
//io. envia para todos
io.on("connection", (socket) => {
  socket.on("userLogin", (nickname) => {
    if (!nickname.includes(users.name)) {
      users.push({ id: socket.id, name: nickname });
      socket.emit("userValidation", true);
      if (messages.length > 0) socket.emit("messageForAll", messages);
      io.emit("receivedUsers", users);
      io.emit("receivedRooms", rooms)
      socket.join("general");
      return;
    }
    socket.emit("userValidation", false);
  });

  socket.on("roomSelect", (room) => {
    console.log(room)
    socket.join(room);
  });

  socket.on("createRoom", (roomName) => {
    if (rooms.includes(roomName)) return;
    rooms.push(roomName);
    socket.emit("reciveNewRoomConfirmation", true);
    io.emit("receivedRooms", rooms);
  });

  socket.on("userMessage", (data) => {
    let user = users.find(users => users.id === socket.id);
    if (!data.content) return;
    let date = new Date();
    messages.push({ content: data.content, timer: date.getHours() + ":" + date.getMinutes(), user: user.name, id: user.id });
    io.to(data.room).emit("messageForAll", messages);
  });

  socket.on("disconnect", () => {
    let user = users.find(users => users.id === socket.id);
    if (!user) return;
    let name = user.name;
    let date = new Date();
    messages.push({
      content: `O usuario ${name} deixou o chat`,
      timer: date.getHours() + ":" + date.getMinutes(),
      user: "Tio zuk"
    });
    io.emit("messageForAll", messages);
    users = users.filter(users => users.id !== socket.id);
    io.emit("receivedUsers", users);
  });
});
server.listen(3000, () => {
  console.log("listening on *:3000");
});