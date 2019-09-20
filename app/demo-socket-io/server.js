var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT || 3000);

io.on("connection", function(socket){
	socket.on("Client-send-data", function(data){		
		io.sockets.emit("Server-send-data", data);
	});
});

app.get("/",  function(req, res){
	res.render("trangchu");
});