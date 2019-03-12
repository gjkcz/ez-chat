const express = require("express");
const {mongoose} = require("./db/mongoose");
const {ObjectID} = require("mongodb");
const _ = require("lodash");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");

const {authenticate} = require("./middleware/authenticate")
const users = require("./api/users");
const rooms = require("./api/rooms");

var app = express();
var server = http.createServer(app);
var io = module.exports.io = require("socket.io")(server);
io.sockets.on('connection', function(socket) {
  console.log("Succesfull");

});



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use("/profile/uploads", express.static("uploads"));
app.use("/uploads", express.static("uploads"));
app.use("/api/users", users);
app.use("/api/rooms", rooms);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
var port = process.env.port||5000;
server.listen(port, () => console.log(`Server is now listening on ${port}`));