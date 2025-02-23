var ptest = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
function myready() {
	$("input.cz").click(function() {
	     $("input:password").val('');
	});
	$("input.qd").click(function() {
		var pass0 = $("#oldpassword").val();
		var pass1 = $("#password").val();
		var pass2 = $("#ckpassword").val();
		if (pass0 == '') {
			alert("请输入原始密码！");
			return false
		}
		if(!ptest.test(pass1)){
			alert("密码必须由6-20字符包含大小写字母和数字组合组成");
			return false;
		}
		if (strlen(pass1) < 6 | strlen(pass1) > 15) {
			alert("密码必须由6-20字符包含大小写字母和数字组合组成");
			return false
		}
		if (pass1 != pass2) {
			alert("新设密码 和 新设密码确认 不一样！");
			return false
		}
		if (pass0 == pass1) {
			alert("新密码和旧密码不能一样!");
			return false
		}
		if(!confirm("是否确定要修改密码？")) return false;
		pass0= men_md5_password(pass0);
		pass1= men_md5_password(pass1);
		pass2= men_md5_password(pass2);
		var str = "&pass0=" + pass0 + "&pass1=" + pass1 + "&pass2=" + pass2;
		$.ajax({
			type: 'POST',
			url: mulu + 'changepass',
			data: 'xtype=changepass' + str,
			success: function(m) {
				m = Number(m);
				if (m == 1) {
					alert("原密码错误")
				} else if (m == 2) {
                    alert("修改成功!");
					top.window.location.href = "/agent";
				}
			}
		})
	})
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