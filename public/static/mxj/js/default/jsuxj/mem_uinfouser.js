function myready(){
    $(".edit").click(function(){
		var tel = $("#tel").val();
		var qq = $("#qq").val();
		var sex = $("#sex").val();
		var birthday = $("#birthday").val();
		var shengshi = $("#shengshi").val();
		var street = $("#street").val();
		var shr = $("#shr").val();
		var str = "&qq=" + qq + "&tel=" + tel + "&sex=" + sex+ "&birthday=" + birthday + "&shengshi=" + shengshi + "&street=" + street + "&shr=" + shr ;
		$.ajax({
			type: 'POST',
			url: mulu + 'member',
			cache: false,
			async: false,
			data: 'xtype=setuinfo' + str,
			success: function(m) {
				if(Number(m)==1){
				     alert("修改成功!");
					 window.location.href=window.location.href;
				}
			}
		});
	});
	
	
} 