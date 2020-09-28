var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

io.on("connection", function (socket) {
	console.log("Co nguoi ket noi! " + socket.id);
	socket.on("disconnect", function () {
		console.log(socket.id + " ngat ket noi!!!");
	});

	socket.on("Client-send-data", function (data) {
		console.log(socket.id + " Vua gui " + data);

		io.sockets.emit("Server-send-data", data + "888"); // gửi về cho tất cả client
		//socket.emit("Server-send-data", data+"888"); // chỉ gửi về cho client vừa emit lên
		//socket.broadcast.emit("Server-send-data", data+"888"); // gửi về cho tất cả (trừ client vừa emit lên)
	});

});

app.get("/", function (req, res) {
	res.render("trangchu");
});