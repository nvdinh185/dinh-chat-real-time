var socket = io("http://localhost:3000");

socket.on("server-gui-danhsach", function(data){
	$("#ds").html("");
	data.map(function(hocvien, index){
		$("#ds").append(`
			<div class="hocvien">
					<div class="hang1">id: `+ index +` || <span>`+ hocvien.HOTEN +`</span></div>
					<div class="hang2">`+ hocvien.EMAIL +` - `+ hocvien.SODT +`</div>
			</div>
		`);
	});
});

$(function(){
	$("#btnRegister").click(function(){
		socket.emit("hocvien-gui-thongtin", 
			{
				hoten: $("#txtHoten").val(),
				email: $("#txtEmail").val(),
				dienthoai: $("#txtSoDT").val(),
			}
		);
	});
});