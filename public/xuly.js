//gọi điện lên server
var socket = io("https://dinh-chat-real-time.herokuapp.com/");

socket.on("Server-send-dky-thatbai", function(){
	alert("Sai username! Co nguoi da dang ky roi!!!");
});
socket.on("Server-send-dky-thanhcong", function(data){
	$("#currentUser").html(data);
	$("#loginForm").hide(2000);
	$("#chatForm").show(2000);
});
socket.on("Server-send-mang", function(data){
	$("#boxContent").html("");
	data.forEach(function(i){
		$("#boxContent").append("<div class='user'>"+ i +"</div>");
	});
});
socket.on("logout", function(){
	$("#chatForm").hide(2000);
	$("#loginForm").show(2000);
});

socket.on("Server-send-message", function(data){
		$("#listMessage").append("<strong>"+data.us+":</strong> "+ data.nd +"<br />");
});
socket.on("ai do dang go chu", function(data){
	$("#typing").html(data+" dang nhap van ban...");
});
socket.on("ai do ngung go chu", function(){
	$("#typing").html("");
});

$(document).ready(function(){
	$("#loginForm").show();
	$("#chatForm").hide();
	
	$("#btnRegister").click(function(){
		socket.emit("Client-send-username", $("#txtUsername").val());
	});
	
	$("#btnLogout").click(function(){
		socket.emit("logout");
	});
	$("#btnSend").click(function(){
		socket.emit("User-send-message", $("#txtMessage").val());
		$("#txtMessage").val("");
	});
	$("#txtMessage").focusin(function(){
		socket.emit("ai do dang go chu");
	});
	$("#txtMessage").focusout(function(){
		socket.emit("ai do ngung go chu");
	});
});
