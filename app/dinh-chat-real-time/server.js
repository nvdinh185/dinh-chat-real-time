var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT || 3000);

var mangUsers = [];
io.on("connection", function (socket) {
	console.log("Co nguoi ket noi :" + socket.id);

	socket.on("Client-send-username", function (data) {
		if (mangUsers.indexOf(data) >= 0) {
			socket.emit("Server-send-dky-thatbai");
		} else {
			socket.username = data;
			mangUsers.push(data);
			socket.emit("Server-send-dky-thanhcong", data);
			io.sockets.emit("Server-send-mang", mangUsers);
		}
	});

	socket.on("logout", function () {
		if (mangUsers.indexOf(socket.username) != -1) {
			mangUsers.splice(mangUsers.indexOf(socket.username), 1);
		}
		socket.emit("logout");
		socket.broadcast.emit("Server-send-mang", mangUsers);
	});

	socket.on("disconnect", function () {
		if (mangUsers.indexOf(socket.username) != -1) {
			mangUsers.splice(mangUsers.indexOf(socket.username), 1);
		}
		io.sockets.emit("Server-send-mang", mangUsers);
	});

	socket.on("User-send-message", function (data) {
		io.sockets.emit("Server-send-message", { us: socket.username, nd: data });
	});

	socket.on("ai do dang go chu", function () {
		socket.broadcast.emit("ai do dang go chu", socket.username);
	});

	socket.on("ai do ngung go chu", function () {
		socket.broadcast.emit("ai do ngung go chu");
	});
});

app.get("/", function (req, res) {
	res.render("trangchu");
});