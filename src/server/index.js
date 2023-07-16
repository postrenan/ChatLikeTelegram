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
let userName = [];
let users = [];
const messages = [];
let rooms = ["general", "off-topic"];
//socket. envia para o remetente
//io. envia para todos
io.on("connection", (socket) => {
  //conecta aos sockets o usuario
  socket.on("userLogin", (nickname) => {
    if (users.map((user) => user.name).includes(nickname)) {
      socket.emit("userValidation", false);
      return;
    }

    users.push({ id: socket.id, name: nickname, room: "general" });
    socket.emit("userValidation", true);
    if (messages.length > 0) socket.emit("messageForAll", messages);

    io.emit("receivedUsers", users);
    io.emit("receivedRooms", rooms);
    socket.join("general");
  });

  socket.on("roomSelect", (room) => {
    let user = users.find(users => users.id === socket.id);
    if (!user) return;
    let name = user.name;
    let date = new Date();

    messages.push({
      content: `O usuario ${name} saiu da sala`,
      timer: date.getHours() + ":" + date.getMinutes(),
      user: "Sistema",
      room: user.room,
      userId: socket.id
    });
    socket.emit("messageForAll", messages.filter(message => message.room === user.room));
    socket.leave(user.room);

    socket.join(room);
    user.room = room;
    messages.push({
      content: `O usuario ${name} entrou na sala`,
      timer: date.getHours() + ":" + date.getMinutes(),
      user: "Sistema",
      room,
      userId: socket.id
    });
    socket.emit("messageForAll", messages.filter(message => message.room === room));
  });

  socket.on("createRoom", (roomName) => {
    if (rooms.includes(roomName)) return;
    rooms.push(roomName);
    socket.emit("reciveNewRoomConfirmation", true);
    io.emit("receivedRooms", rooms);
  });

  socket.on("userMessage", (data) => {
    if (!data.content) return;
    let user = users.find(users => users.id === socket.id);
    let date = new Date();
    messages.push({
      content: data.content,
      timer: date.getHours() + ":" + date.getMinutes(),
      user: user.name,
      id: user.id,
      room: data.room
    });
    let alert = {
      user: user.name,
      room: data.room,
    }
    io.emit("messageAlert", (alert));
    io.to(data.room).emit("messageForAll", messages.filter(message => message.room === data.room));
  });

  socket.on("disconnect", (room) => {
    let user = users.find(users => users.id === socket.id);
    if (!user) return;
    let name = user.name;
    let date = new Date();
    messages.push({
      content: `O usuario ${name} deixou o chat`,
      timer: date.getHours() + ":" + date.getMinutes(),
      user: "Sistema",
      room
    });
    io.to(room).emit("messageForAll", messages.filter(message => message.room === room));
    users = users.filter(user => user.id !== socket.id);
    io.to(room).emit("receivedUsers", users);
  });
});
server.listen(3000, () => {
  console.log("No ar");
});