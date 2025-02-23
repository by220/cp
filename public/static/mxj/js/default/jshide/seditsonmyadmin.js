var strtest = /^[0-9a-zA-Z_]{1,}$/;

function myready() {
	changeh(document.documentElement.scrollHeight + 500);
	$(".add").click(function() {
		$(".addtb").show();
		$("#action").val('add');
		$("#user1").attr('disabled', false);
		$("#user1").val('');
		var posi = $(this).position();
		$(".addtb").css('left', posi.left + $(this).width() - $("div.addtb").width());
		$(".addtb").css('top', posi.top + $(this).height() + 5);
		$("#addbtn").val("新增");
		$("div.addtb .ui-dialog-title").html("新增子帐号")
	});
	$(".edit").click(function() {
		var uid = $(this).attr('uid');
		//$("#uid").val(uid);
		$(".addtb").show();
		$("#action").val('edit');
		$("#user1").val($(this).attr('username').replace($("#user0").html(), ''));
		$("#user1").attr('disabled', true);
		var posi = $(this).position();
		$(".addtb").css('left', posi.left + $(this).width() - $("div.addtb").width());
		$(".addtb").css('top', posi.top + $(this).height() + 5);
		$("#addbtn").val("修改");
		$("div.addtb .ui-dialog-title").html("修改子帐号密码")
	});
	$(".back").click(function() {
        window.history.back();
	});
	$(".pages input:checkbox").click(function() {
		var uid = $(this).attr('uid');
		var page = $(this).attr('page');
		if (Number($(this).attr('ifson')) != 1) return false;
		updatepage(uid, page)
	});
	$("#addbtn").click(function() {
		sendvalue()
	});
	$("#closebtn").click(function() {
		$(".addtb").hide()
	});
	$(".del").click(function() {
		var username = $(this).parent().parent().find("td:eq(1)").html();
		if (!confirm("确定要删除子帐号吗" + username)) {
			return false
		}
		var uid = $(this).attr('uid');
		$.ajax({
			type: 'POST',
			url: mulu + 'suser',
			data: "xtype=editsondel&uid=" + uid,
			success: function(m) {
				if (Number(m) == 1) {
					alert("删除成功");
					$("#del" + uid).parent().parent().remove();
					window.location.href = window.location.href
				} else {
					alert("删除失败")
				}
			}
		})
	});
	$(".record").click(function() {
		var uid = $(this).attr('uid');
		var username = $(this).attr('username');
		var posi = $(this).position();
		$(".recordtb").css("width", 800);
		$(".recordtb").css("left", posi.left + $(this).width() - $(".recordtb").width());
		$(".recordtb").css("top", posi.top + $(this).height() + 5);
		showrecord(uid, username);
		$(".recordtb").show();
		$("div.recordtb .ui-dialog-title").html("操作记录")
	});
	$(".logininfo").click(function() {
		var uid = $(this).attr('uid');
		var username = $(this).attr('username');
		var posi = $(this).position();
		$(".recordtb").css("width", 800);
		$(".recordtb").css("left", posi.left + $(this).width() - $(".recordtb").width());
		$(".recordtb").css("top", posi.top + $(this).height() + 5);
		showlogininfo(uid, username);
		$(".recordtb").show();
		$("div.recordtb .ui-dialog-title").html("登陆日志")
	});
	$(".ui-dialog").draggable();
	$(".ui-dialog-titlebar-close").click(function() {
		$(".ui-dialog").hide()
	});
	$(".pages input:checkbox").each(function() {
		if (Number($(this).val()) == 1) {
			$(this).prop("checked", true)
		}
	});
    listhover();
}
function listhover(){
	$(".data_table tr").unbind("mouseover").unbind("mouseout");
	$(".data_table tr").mouseover(function() {
		$(this).addClass("hover")
	}).mouseout(function() {
		$(this).removeClass("hover")
	})
}
function showrecord(uid, username) {
	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		dataType: 'json',
		data: 'xtype=showrecord&uid=' + uid + "&username=" + username,
		cache: false,
		success: function(m) {
			var el = 0;
			if (m['e'] != undefined) el = m['e'].length;
			var estr = "<tr><th>修改时间</th><th>修改者</th><th>修改IP</th><th>备注</th></tr>";
			for (i = 0; i < el; i++) {
				estr += "<tr>";
				estr += "<td>" + m['e'][i]['moditime'] + "</td>";
				estr += "<td>" + m['e'][i]['modiuser'] + "(" + m['e'][i]['modisonuser'] + ")</td>"
				estr += "<td>" + m['e'][i]['modiip'] + "</td>";
				estr += "<td>" + m['e'][i]['action'] + "</td>";
				estr += "</tr>"
			}
			$(".recordtb table").html("<tbody>" + estr + "</tbody>");
			listhover();
		}
	})
}
function showlogininfo(uid, username) {
	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		dataType: 'json',
		data: 'xtype=showlogininfo&uid=' + uid + "&username=" + username,
		cache: false,
		success: function(m) {
			var ll = 0;
			if (m['l'] != undefined) ll = m['l'].length;
			var lstr = "<tr><th>登陆时间</th><th>IP</th><th>来源</th><th>备注</th></tr>";
			for (i = 0; i < ll; i++) {
				lstr += "<tr>";
				lstr += "<td>" + m['l'][i]['time'] + "</td>";
				lstr += "<td>" + m['l'][i]['ip'] + "</td>";
				lstr += "<td>" + m['l'][i]['addr'] + "</td>";
				lstr += "<td>" + m['l'][i]['ifok'] + "</td>";
				lstr += "</tr>"
			}
			$(".recordtb table").html("<tbody>" + lstr + "</tbody>");
			listhover();
		}
	})
}
function sendvalue() {
	var uid = $("#uid").val();
	var action = $("#action").val();
	var username = $("#user0").html() + $("#user1").val();
	var pass1 = $("#pass1x").val();
	var pass2 = $("#pass2x").val();
	if (action == 'add' & (!strtest.test(username) | $("#user0").html() == username)) {
		alert("用户名只能输入大小写字母与数字");
		return false
	}
	if (pass1 == '' | pass1 != pass2) {
		alert("密码不能为空，并且两次密码必需输入一样");
		return false
	}
	var sendstr = '&username=' + username + '&pass1=' + men_md5_password(pass1) + "&pass2=" + men_md5_password(pass2) + "&action=" + action + "&uid=" + uid;
	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		data: 'xtype=editsonaddoredit' + sendstr,
		success: function(m) {
			m = Number(m);
			if (action == 'add') {
				if (m == 1) {
					alert("添加成功");
					window.location.href = window.location.href
				} else if (m == 2) {
					alert("帐户已存在！")
				} else {
					alert("添加失败，请重试")
				}
			} else {
				if (m == 1) {
					alert("修改成功")
				} else {
					alert("修改失败，请重试")
				}
			}
		}
	})
}
function updatepage(uid, page) {
	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		data: 'xtype=editsonuppage&uid=' + uid + '&page=' + page,
		success: function(m) {
			if (Number(m) == 1 | Number(m) == 0) {
				window.location.href = window.location.href
			}
		}
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