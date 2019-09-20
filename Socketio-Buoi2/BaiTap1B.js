var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(4000);

io.on("connection", function(socket){
	console.log("Co nguoi ket noi! "+socket.id);
	socket.on("disconnect", function(){
		console.log(socket.id + " ngat ket noi!!!");
	});
	

	socket.on("mangGiaTri", function(data){
		mangKetQua = [];
		mangKetQua.push(data[0], data[1], data[2], parseInt(data[0]) + parseInt(data[1]) + parseInt(data[2]));
		
		socket.emit("mangKetQua", mangKetQua);
	});

});

app.get("/",  function(req, res){
	res.render("baitap1b");
});