var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(5000);

io.on("connection", function(socket){
	console.log("Co nguoi ket noi! "+socket.id);
	socket.on("disconnect", function(){
		console.log(socket.id + " ngat ket noi!!!");
	});
	
	socket.on("color", function(data){
		io.sockets.emit("color", data);
	});

});

app.get("/",  function(req, res){
	res.render("baitap2");
});