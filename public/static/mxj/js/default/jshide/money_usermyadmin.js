var upage = 1;

function myready() {
	changeh(document.documentElement.scrollHeight + 200);
	var pcount = Number($(".page_info").attr('pcount'));
	upage = Number($(".page_info").attr('upage'));
	var pstr = "<a class='prev'>前一页</a>『";
	for (i = 1; i <= pcount; i++) {
		if (i == upage) {
			pstr += "<span class='current' page='" + i + "'>&nbsp;" + i + "&nbsp;</span>"
		} else {
			pstr += "&nbsp;<a href='javascript:void(0)' class='p'>" + i + "</a>&nbsp;"
		}
	}
	pstr += "』<a class='next'>后一页</a>";
	$(".page_control").html(pstr);
	$(".page a").click(function() {
		if ($(this).hasClass('prev')) {
			upage -= 1
		} else if ($(this).hasClass('next')) {
			upage += 1
		} else {
			upage = Number($(this).html())
		}
		getuser()
	});
	$(".query").click(function() {
		getuser()
	});
	$("select.status").change(function() {
		getuser()
	});
	$("input.online").click(function() {
		getuser()
	})

	$("input.all").click(function() {
		if ($(this).prop("checked")) {
			$(".user_tb").find("input:checkbox").prop("checked", true);
		} else {
			$(".user_tb").find("input:checkbox").prop("checked", false);
		}
	});

	$(".user_tb td.status input").click(function() {
		var posi = $(this).position();
		$("#statusPanel").css("top", posi.top + $(this).height());
		$("#statusPanel").css("left", posi.left + $(this).width() - $("#statusPanel").width());
		$("#statusPanel").attr('uid', $(this).parent().parent().attr('uid'));
		var obj = $(this);
		$("#statusPanel input[name='ustatus']").each(function() {
			if ($(this).val() == obj.attr('v')) $(this).prop("checked", true);
			else $(this).prop("checked", false);
		});
		$("#statusPanel").show();

	});

	$("#statusPanel i").unbind('click');
	$("#statusPanel i").click(function() {
		$("#statusPanel").hide();
	});
	$("#statusPanel input:radio").unbind("change");
	$("#statusPanel input:radio").change(function() {
		var ustr = $("#statusPanel").attr("uid");
		var status = $(this).val();
		$.ajax({
			type: 'POST',
			url: mulu + 'suser',
			cache: false,
			data: 'xtype=upstatus&ustr=' + ustr + "&status=" + status,
			success: function(m) {
				if (Number(m) == 1) {
					getuser();
					$("#statusPanel").hide();
				}
			}
		})
	});

	$(".user_tb a.showdown").click(function() {
		if (Number($(this).html()) == 0) return false;
		$("#fid").val($(this).parent().parent().attr("uid"));
		getuser();
	});

	$(".user_tb a.kmaxmoney").click(function() {
		var username = $(this).parent().parent().find("td:eq(2)").html();
		var uid = $(this).parent().parent().attr("uid");
		var moneystr = "<table class='data_table edutb'><tbody><tr><th class='tright' style='width:30%'>账号：</th><td></td></tr><tr><th class='tright'>快开彩额度：</th><td><span></span>&nbsp;<input type='button' class='s1 tiquall' value='提取全部额度'></td></tr><tr><th class='tright'>当前余额：</th><td>0</td></tr><tr><th class='tright'>上级可用额度：</th><td>0</td></tr><tr><th class='tright'>类型：</th><td><label><input type='radio' name='types' value='0'>存款</label><label><input type='radio' name='types' value='1'>提款</label></td></tr><tr><th class='tright'>金额：</th><td><input name='balance' class='input' style='width:80px;'><span id='popDx' style='color:red' class='dx'></span></td></tr><tr><th></th><td><input id='btnOK' class='s1 setmoney' type='button' value='确定'></td></tr></tbody></table>";

		var posi = $(this).position();


		dialog._show(username + "#修改现金额度", moneystr, {}, 480, posi.left + $(this).width() - 460, posi.top + 25);



		$(".edutb td:eq(0)").attr("uid", uid);
		$(".edutb td:eq(0)").attr("etype", 'fast');
		$(".edutb td:eq(0)").html(username);
		$(".edutb th:eq(1)").html("现金额度：");
		$.ajax({
			type: 'POST',
			url: mulu + 'suser',
			async: false,
			cache: false,
			data: 'xtype=readmoney&uid=' + uid + '&etype=fast',
			success: function(m) {
				m = m.split('|');
				$(".edutb td:eq(1) span").html(m[0]);
				$(".edutb td:eq(2)").html(m[1]);
				$(".edutb td:eq(3)").html(m[2]);
			}

		});


		$(".edutb input.tiquall").click(function() {
			if (!confirm("确定提取全部额度吗?")) return false;
			var uid = $(".edutb td:eq(0)").attr('uid');
			var etype = $(".edutb td:eq(0)").attr('etype');

			$.ajax({
				type: 'POST',
				url: mulu + 'money',
				async: false,
				cache: false,
				data: 'xtype=tiquallmoney&uid=' + uid + '&etype=' + etype,
				success: function(m) {

					if (Number(m) == 1) {
						alert("提取成功!");
						getuser();
					}
				}
			});
		});
		$(".edutb input[name='balance']").keypress(function() {
			$(".edutb .dx").html(DX($(this).val()))
		}).keyup(function() {
			$(".edutb .dx").html(DX($(this).val()))
		});

		$(".edutb .setmoney").click(function() {
			if ($(".edutb input[name='types']:checked").length != 1) {
				alert("请选择类型!");
				return false;
			}


			var types = $(".edutb input[name='types']:checked").val();
			var uid = $(".edutb td:eq(0)").attr('uid');
			var etype = $(".edutb td:eq(0)").attr('etype');
			var je = $(".edutb input[name='balance']").val();
			je = Number(je);
			if (isNaN(je) | je % 1 != 0 | je < 1) {
				alert("请输入正确的金额!");
				return false;
			}
			if (!confirm("确定修改额度吗?")) return false;
			$.ajax({
				type: 'POST',
				url: mulu + 'money',
				async: false,
				cache: false,
				data: 'xtype=setmoney&uid=' + uid + '&etype=' + etype + '&types=' + types + '&je=' + je,
				success: function(m) {
                    alert(m);
					switch (Number(m)) {
					case 32:
					case 42:
						alert("用户还有未结算注单!,请等待结算后操作！");
						break;
					case 10:
					case 30:
					case 50:
					case 70:
						alert("可提取金额不足,提取失败!");
						break;
					case 11:
					case 31:
					case 51:
					case 71:
						alert("提取金额成功!");
						getuser();
						break;
					case 20:
					case 40:
					case 60:
					case 80:
						alert("上级余额不足,存入失败!");
						break;
					case 21:
					case 41:
					case 61:
					case 81:
						alert("存入金额成功!");
						getuser();
						break;
					}
				}
			});
		});
	});

	$(".user_tb a.upuser").click(function() {
		var farr = $(this).attr('fstr').split('`');
		var username = $(this).parent().parent().find("td:eq(2)").html();
		var str = "<table class='data_table'>";
		for (var i in farr) {
			str += "<tr><td>" + farr[i] + "</td></tr>";
		}
		str += "</table>";
		var posi = $(this).position();

		dialog._show(username + "#所属上级", str, {}, 300, posi.left, posi.top + 25);

	});
	$(".user_tb a.record").click(function() {
		var username = $(this).parent().parent().attr("username");
		var uid = $(this).parent().parent().attr("uid");
		var obj = $(this);
		$.ajax({
			type: 'POST',
			url: mulu + 'suser',
			dataType: 'json',
			data: 'xtype=showrecord&uid=' + uid + "&username=" + username,
			cache: false,
			success: function(m) {
				var el = 0;

				if (m['e'] != undefined) el = m['e'].length;
				var estr = "<table class='data_table'><thead><tr><th>修改时间</th><th>修改者</th><th>修改IP</th><th>来源</th><th>备注</th></tr></thead><tbody>";
				for (i = 0; i < el; i++) {
					estr += "<tr>";
					estr += "<td>" + m['e'][i]['moditime'] + "</td>";
					estr += "<td>" + m['e'][i]['modiuser'] + "(" + m['e'][i]['modisonuser'] + ")</td>";
					estr += "<td>" + m['e'][i]['modiip'] + "</td>";
					estr += "<td>" + m['e'][i]['addr'] + "</td>";
					estr += "<td>" + m['e'][i]['action'] + "</td>";
					estr += "</tr>"
				}
				estr += "</tbody></table>";

				var posi = obj.position();

				dialog._show("帐号" + username + "#变更记录", estr, {}, 700, posi.left + obj.width() - 700, posi.top + obj.height() + 10);
				estr = null;
				m = null;


			}
		})
	});

	$(".user_tb a.logininfo").click(function() {
		var username = $(this).parent().parent().attr("username");
		var uid = $(this).parent().parent().attr("uid");
		var obj = $(this);
		$.ajax({
			type: 'POST',
			url: mulu + 'suser',
			dataType: 'json',
			data: 'xtype=showlogininfo&uid=' + uid + "&username=" + username,
			cache: false,
			success: function(m) {
				var ll = 0;
				if (m['l'] != undefined) ll = m['l'].length;
				var lstr = "<table class='data_table'><thead><tr><th>登陆时间</th><th>IP</th><th>来源</th><th>备注</th></tr></thead><tbody>";
				for (i = 0; i < ll; i++) {
					lstr += "<tr>";
					lstr += "<td>" + m['l'][i]['time'] + "</td>";
					lstr += "<td>" + m['l'][i]['ip'] + "</td>";

					lstr += "<td>" + m['l'][i]['addr'] + "</td>";
					lstr += "<td>" + m['l'][i]['ifok'] + "</td>";
					lstr += "</tr>"
				}
				lstr += "</tbody></table>";
				var posi = obj.position();
				dialog._show("帐号" + username + "#登录日志", lstr, {}, 700, posi.left + obj.width() - 700, posi.top + obj.height() + 10);
				lstr = null;
				m = null;
			}
		})
	});

	$(".user_tb a.userxx").click(function() {
		var username = $(this).parent().parent().attr("username");
		var uid = $(this).parent().parent().attr("uid");
		var obj = $(this);
		$.ajax({
			type: 'POST',
			url: mulu + 'money',
			dataType: 'json',
			data: 'xtype=userxx&uid=' + uid + "&username=" + username,
			cache: false,
			success: function(m) {

				var str = "<table class='data_table'><tbody>";
				str += "<tr><th style='width:150px;' class='tright'>省市:</th><td>" + m['shengshi'] + "</td></tr>";
				str += "<tr><th class='tright'>详细地址:</th><td>" + m['street'] + "</td></tr>";
				str += "<tr><th class='tright'>收货人:</th><td>" + m['shr'] + "</td></tr>";
				str += "<tr><th class='tright'>备注信息:</th><td>" + m['bz'] + "</td></tr>";
				str += "<tr><th class='tright'>银行账号:</th><td>";
				for (var i in m["bank"]) {
					if (Number(m["bank"][i]['ifok']) == 1) {
						str += "<span style='color:green'>(正常)";
					} else {
						str += "<span style='color:red'>(停用)";
					}
					str += m["bank"][i]['bank'];
					str += "&nbsp;&nbsp;&nbsp;户名:" + m["bank"][i]['name'];
					str += "&nbsp;&nbsp;&nbsp;账号:" + m["bank"][i]['num'];
					str += "&nbsp;&nbsp;&nbsp;开户行:" + m["bank"][i]['kaihuhang'];
					str += "</span>";
					str += "<Br />";

				}
				str += "</td></tr>";
				str += "</tbody>";
				var posi = obj.position();
				dialog._show("帐号" + username + "#详细信息", str, {}, 700, posi.left + obj.width() - 700, posi.top + obj.height() + 10);

				str = null;
				m = null;
			}
		});
	});

	$(".user_tb a.sendmessage").click(function() {
		var username = $(this).parent().parent().attr("username");
		var uid = $(this).parent().parent().attr("uid");
		var posi = $(this).position();
		var str = "<table class='data_table messtb'><tr><th>标题</th><td><input type='text' style='width:360px;' class='title'>&nbsp;<input type='button' class='s1' value='发送'></td></tr><tr><th>内容</th><td><textarea cols='40' rows='8'></textarea></td></table>";
		dialog._show(username + "#发送通知", str, {}, 480, posi.left + $(this).width() - 460, posi.top + 25);
		$(".messtb input:button").click(function() {
			var title = $(".messtb input:text").val();
			var content = $(".messtb textarea").val();
			if (title == '') {
				alert("标题不能为空!");
				return false;
			}

			$.ajax({
				type: 'POST',
				url: mulu + 'money',
				cache: false,
				data: 'xtype=sendmess&uid=' + uid + "&title=" + title + "&content=" + content,
				success: function(m) {

					if (Number(m) == 1) {
						alert("发送成功!");
						dialog.close();
					}
				}
			});
		});
	});
	
	$(".online .zhuxiao").click(function(){
		var username = $(this).parent().parent().attr("username");
		var uid = $(this).parent().parent().attr("uid");
		if(!confirm("确定注销"+username+"登陆吗?")) return false;
		var obj = $(this);
			$.ajax({
				type: 'POST',
				url: mulu + 'suser',
				cache: false,
				data: 'xtype=zhuxiaologin&uid=' + uid ,
				success: function(m) {
					if (Number(m) == 1) {
						obj.parent().html("<span class='s0'></span>");
					}
				}
			});
	});

	$("#openselect").click(function() {
		updatestatus('open');
		return false
	});
	$("#closeselect").click(function() {
		updatestatus('close');
		return false
	});
	$("#pauseselect").click(function() {
		updatestatus('pause');
		return false
	});

}

function updatestatus(status) {
	var ustr = '';
	$(".user_tb input:checkbox").each(function(i) {
		if (i > 0 & $(this).prop('checked') == true) {
			ustr += $(this).val() + "|"
		}
	});
	if (ustr == '') return false;
	if (status == 'open') status = 1;
	else if (status == 'pause') status = 2;
	else status = 0;
	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		cache: false,
		data: 'xtype=upstatus&ustr=' + ustr + "&status=" + status,
		success: function(m) {
			if (Number(m) == 1) {
				$(".user_tb input:checkbox").each(function(i) {
					if (ustr.indexOf($(this).attr("value")) != -1 & i > 0) {
						if (status == 1) {
							$(this).parent().parent().find("td.status input").attr('class', 's' + 1);
							$(this).parent().parent().find("td.status input").val("启用");
						} else if (status == 2) {
							$(this).parent().parent().find("td.status input").attr('class', 's' + 2);
							$(this).parent().parent().find("td.status input").val("冻结");
						} else {
							$(this).parent().parent().find(".status input").attr('class', 's' + 0);
							$(this).parent().parent().find("td.status input").val("停用");
						}
					}
					$(".user_tb input:checkbox").prop("checked", false)
				})
			}
		}
	})
}

function getuser() {
	var online = $("input.online").prop("checked") ? 1 : 0;
	var status = $("select.status").val();
	var username = $("#usernames").val();
	var fid = $("#fid").val();
	window.location.href = "money?xtype=moneyuser&online=" + online + "&status=" + status + "&upage=" + upage + "&username=" + username + "&fid=" + fid
}