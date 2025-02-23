function myready() {
	$("input#xg").click(function() {
		var pass0 = $("#pass0").val();
		var pass1 = $("#pass1").val();
		var pass2 = $("#pass2").val();
	
		if (pass0 == '') {
			alert("原密码不能为空");
			return false
		}
		if (strlen(pass1) < 6 | strlen(pass1) > 12 | pass1 != pass2) {
			alert("新密码长度在6到12位,并且两次密码必需输入一样");
			return false
		}
		if (pass0 == pass1) {
			alert("新密码和旧密码不能一样!");
			return false
		}
		pass0= men_md5_password(pass0);
		pass1= men_md5_password(pass1);
		pass2= men_md5_password(pass2);
		var str = "&pass0=" + pass0 + "&pass1=" + pass1 + "&pass2=" + pass2;
		$.ajax({
			type: 'POST',
			url: 'changepass.php',
			data: 'xtype=changepass' + str,
			success: function(m) {
				m = Number(m);
				if (m == 1) {
					alert("原密码错误")
				} else if (m == 2) {
                    alert("修改成功!");
					top.window.location.href = "/";
				}
			}
		})
	});

}
function strlen(sString) {
	var sStr, iCount, i, strTemp;
	iCount = 0;
	sStr = sString.split("");
	for (i = 0; i < sStr.length; i++) {
		strTemp = escape(sStr[i]);
		if (strTemp.indexOf("%u", 0) == -1) {
			iCount = iCount + 1
		} else {
			iCount = iCount + 2
		}
	}
	return iCount
}