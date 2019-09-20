//gọi điện lên server
var socket = io("http://localhost:3000");

socket.on("server-send-room", function(data){
	$("#dsRoom").html("");
	data.map(function(r){
		$("#dsRoom").append("<h4 class='room'>"+ r +"</h4>");
	});
});

socket.on("server-send-room-socket", function(data){
	$("#roomHienTai").html("Bạn đang ở phòng "+data);
});

socket.on("server-chat", function(data){
	$("#content").append(data+"\n");
});

$(document).ready(function(){
	
	$("#btnTaoRoom").click(function(){
		socket.emit("tao-room", $("#txtRoom").val());
		$("#txtRoom").val("");
	});
	
	$("#btnChat").click(function(){
		socket.emit("user-chat", $("#txtMessage").val());
		$("#txtMessage").val("");
	});
});
