const io = require("socket.io")("3000", {
  cors: {
    origin: "*",
  },
});

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (username) => {
    users[socket.id] = username;
    socket.broadcast.emit("broadcast-joined-user", {
      username,
      message: "Joined the conversation...",
    });
  });

  socket.on("send-message", ({ username, message }) => {
    console.log(message);
    socket.broadcast.emit("broadcast-message", { message, username });
  });
});
