function myready() {
	var userAgent = navigator.userAgent;
	if (userAgent.indexOf("Safari") != -1 && app == 1) {
		$(".main-content").css("height", $(".main-content").height() - 50);
		$(".menulist").css("bottom", "50px");
	}
	$(".menu").click(function() {
		$(".zhao").removeClass("ivfTfC").addClass("OSUUp");
		$(".menulist.iJamhB").removeClass("iJamhB").addClass("efUsXr");
	});
	$(".zhao").click(function() {
		$(".zhao").removeClass("OSUUp").addClass("ivfTfC");
		$(".menulist.efUsXr").removeClass("efUsXr").addClass("iJamhB");
		$(".gamelist").removeClass("hTJmgb").addClass("iULZxB");
		$(".gamemenu div.jUzzot").removeClass("jUzzot").addClass("kIYJcB");
		$(".gamemenu div.gfEgAp").removeClass("gfEgAp").addClass("epExtR");
	});
	$(".errmsg button").click(function() {
		$(".errmsg").hide();
	})
	$(".menulist a").click(function() {
		var type = $(this).attr("type");
		if (type == 'home') {
			window.location.href = "home";
			//window.location.href = "make?xtype=show";
		} else if (type == "logout") {
			window.location.href = mulu + "home?logout=yes";
		} else if (type == "load") {
			window.location.href = "load?xtype=show";
		} else if (type != "" && type != undefined) {
			window.location.href = type;
		}
	});
	if (type == 'dresult') {
		$(".gamemenu").click(function() {
			if ($(".gamelist").hasClass("iULZxB")) {
				$(".gamelist").removeClass("iULZxB").addClass("hTJmgb");
				$(".gamemenu div").removeClass("kIYJcB").addClass("jUzzot");
				$(".zhao").removeClass("ivfTfC").addClass("OSUUp");
			} else {
				$(".gamelist").removeClass("hTJmgb").addClass("iULZxB");
				$(".gamemenu div").removeClass("jUzzot").addClass("kIYJcB");
			}
		});
		$(".gamelist span").click(function() {
			window.location.href = "dresult?gids=" + $(this).attr("gid");
		});
		$(".dates").change(function() {
			getkj();
		});
		getkj(ngid);
	}
	if (type == 'report') {
		getwjs();
	}
	if (type == 'userinfo') {
		getuserinfo();
	}
	if (type == "password") {
		getchangepass();
	}
	if (type == "rule") {
		$(".gamemenu span:eq(0)").html($(".gamelist span:eq(0) div").html());
		$(".gamemenu span:eq(0)").attr("gid", $(".gamelist span:eq(0)").attr("gid"));
		$(".gamemenu").click(function() {
			if ($(".gamelist").hasClass("iULZxB")) {
				$(".gamelist").removeClass("iULZxB").addClass("hTJmgb");
				$(".gamemenu div").removeClass("epExtR").addClass("gfEgAp");
				$(".zhao").removeClass("ivfTfC").addClass("OSUUp");
			} else {
				$(".gamelist").removeClass("hTJmgb").addClass("iULZxB");
				$(".gamemenu div").removeClass("gfEgAp").addClass("epExtR");
			}
		});
		$(".gamelist span").click(function() {
			window.location.href = "rule?gids=" + $(this).attr("gid");
		});
		getrule();
	}
	if (type == 'todayreport') {
		getbaoday();
	}
	if (type == 'history') {
		$(".baoctrl li a").click(function() {
			$(".baoctrl li a.active").removeClass("active");
			$(this).addClass("active");
			if ($(".baoctrl li a:eq(0)").hasClass("active")) {
				$(".thisweek").show();
				$(".lastweek").hide();
			} else {
				$(".thisweek").hide();
				$(".lastweek").show();
			}
		});
		$(".lb_back").click(function() {
			$(".lb_back").parent().hide();
			$(".baozong").show();
			$(".detail").hide();
		});
		getbaoweek();
	}
}

function getbaoweek() {
	$.ajax({
		type: 'POST',
		url: mulu + 'history',
		cache: false,
		dataType: 'json',
		data: 'xtype=show',
		success: function(m) {
		    m = m.msg;
			var obj = $(".thisweek .table-content");
			var data = m['bao'];
			for (i = 0; i < 7; i++) {
				obj.find("a:eq(" + i + ")").attr("date", data[i]['dates']);
				obj.find("a:eq(" + i + ")").find("div:eq(0)").html(data[i]['dates'] + " 星期" + data[i][
					'week']);
				obj.find("a:eq(" + i + ")").find("div:eq(1)").html(data[i]['zs']);
				obj.find("a:eq(" + i + ")").find("div:eq(2)").html(data[i]['zje']);
				obj.find("a:eq(" + i + ")").find("div:eq(3)").html(data[i]['zje']);
				obj.find("a:eq(" + i + ")").find("div:eq(4)").html(data[i]['points']);
				obj.find("a:eq(" + i + ")").find("div:eq(5) span").html(data[i]['rs']);
				if (Number(data[i]['rs']) > 0) {
					obj.find("a:eq(" + i + ")").find("div:eq(5) span").attr("class", "blue_color");
				} else if (Number(data[i]['rs']) < 0) {
					obj.find("a:eq(" + i + ")").find("div:eq(5) span").attr("class", "red_color");
				} else {
					obj.find("a:eq(" + i + ")").find("div:eq(5) span").attr("class", "");
				}
			}
			var obj = $(".thisweek .table-footer");
			obj.find("div:eq(1)").html(m['t']['zs']);
			obj.find("div:eq(2)").html(m['t']['zje']);
			obj.find("div:eq(3)").html(m['t']['zje']);
			obj.find("div:eq(4)").html(m['t']['points']);
			obj.find("div:eq(5) span").html(m['t']['rs']);
			if (Number(m['t']['rs']) > 0) {
				obj.find("div:eq(5) span").attr("class", "blue_color");
			} else if (Number(m['t']['rs']) < 0) {
				obj.find("div:eq(5) span").attr("class", "blue_color");
			} else {
				obj.find("div:eq(5) span").attr("class", "");
			}
			var obj = $(".lastweek .table-content");
			var data = m['upbao'];
			for (i = 0; i < 7; i++) {
				obj.find("a:eq(" + i + ")").attr("date", data[i]['dates']);
				obj.find("a:eq(" + i + ")").find("div:eq(0)").html(data[i]['dates'] + " 星期" + data[i][
					'week']);
				obj.find("a:eq(" + i + ")").find("div:eq(1)").html(data[i]['zs']);
				obj.find("a:eq(" + i + ")").find("div:eq(2)").html(data[i]['zje']);
				obj.find("a:eq(" + i + ")").find("div:eq(3)").html(data[i]['zje']);
				obj.find("a:eq(" + i + ")").find("div:eq(4)").html(data[i]['points']);
				obj.find("a:eq(" + i + ")").find("div:eq(5) span").html(data[i]['rs']);
				if (Number(data[i]['rs']) > 0) {
					obj.find("a:eq(" + i + ")").find("div:eq(5) span").attr("class", "blue_color");
				} else if (Number(data[i]['rs']) < 0) {
					obj.find("a:eq(" + i + ")").find("div:eq(5) span").attr("class", "red_color");
				} else {
					obj.find("a:eq(" + i + ")").find("div:eq(5) span").attr("class", "");
				}
			}
			var obj = $(".lastweek .table-footer");
			obj.find("div:eq(1)").html(m['t']['uzs']);
			obj.find("div:eq(2)").html(m['t']['uzje']);
			obj.find("div:eq(3)").html(m['t']['uzje']);
			obj.find("div:eq(4)").html(m['t']['upoints']);
			obj.find("div:eq(5) span").html(m['t']['urs']);
			if (Number(m['t']['urs']) > 0) {
				obj.find("div:eq(5) span").attr("class", "blue_color");
			} else if (Number(m['t']['urs']) < 0) {
				obj.find("div:eq(5) span").attr("class", "blue_color");
			} else {
				obj.find("div:eq(5) span").attr("class", "");
			}
			$(".thisweek a").click(function() {
				$(".baozong").hide();
				$(".detail").show();
				$(".lb_back").parent().show();
				$(".page-navi input:text").val(1);
				getbaoday($(this).attr("date"));
			});
			$(".lastweek a").click(function() {
				$(".baozong").hide();
				$(".detail").show();
				$(".lb_back").parent().show();
				$(".page-navi input:text").val(1);
				getbaoday($(this).attr("date"));
			});
		}
	})
}

function getbaoday(date) {
	$(".wjslist").empty();
	$.ajax({
		type: 'POST',
		url: mulu + 'todayreport',
		cache: false,
		dataType: 'json',
		data: 'xtype=show&date=' + date + "&page=" + $(".page-navi input:text").val(),
		success: function(m) {
			var ml = m.msg.length;
			m = m.msg;
			var str = "";
			$(".wjslist").empty();
			if (!m[0]['gid']) {
				$(".wjslist").html('<div class="no_date">暂无数据</div>');
				return;
			}
			for (i = 0; i < ml; i++) {
				str = '<div class="table-row">';
				str += '<div class="col col2"><div class="green_color">' + m[i]['tid'] + '</div><div>' + m[
					i]['date'] + '</div><div>' + m[i]['time'] + '</div></div>';
				str += '<div class="col col3"><div>' + m[i]['gid'] + '</div>';
				str += '<div class="green_color">第 ' + m[i]['qishu'] + ' 期</div>';
				str += '<div class="blue_color">盘口（' + m[i]['abcd'] + '）</div></div>';
				str += '<div class="col col1-5"><span class="blue_color">' + m[i]['wf'] +
					'</span><span class="blue_color">@</span><span class="red_color">' + m[i]['peilv1'];
				if (Number(m[i]['peilv2']) > 1) str += '/' + m[i]['peilv2'];
				str += '</span></div>';
				str += '<div class="col col1-5"><div>' + m[i]['je'] + '</div></div>';
				if (Number(m[i]['rs']) > 0) {
					str += '<div class="col col2 blue_color">' + m[i]['rs'] + '</div></div>';
				} else {
					str += '<div class="col col2 red_color">' + m[i]['rs'] + '</div></div>';
				}
				$(".wjslist").append(str);
			}
			$(".page-info .total-row").html("共 " + m[0]['rcount'] + " 笔记录");
			$(".page-info .total-page").html("共 " + m[0]['pcount'] + " 页");
			$(".page-navi input:text").val(m[0]['page']);
			$(".page-navi input:text").attr('v', m[0]['page']);
			$(".footer-row:eq(0) span").html(m[0]['total']['zs']);
			$(".footer-row:eq(1) span").html(getResult(m[0]['total']['je'], 0));
			$(".footer-row:eq(2) span").html(getResult(m[0]['total']['jg'], 2));
			if (m[0]['page'] == 1) {
				$("span.prev").addClass("disabled");
			} else {
				$("span.prev").removeClass("disabled");
			}
			if (m[0]['pcount'] == m[0]['page']) {
				$("span.next").addClass("disabled");
			} else {
				$("span.next").removeClass("disabled");
			}
			$(".wjslist").attr("date", m[0]['dates']);
			$("span.next").unbind("click");
			$("span.prev").unbind("click");
			$("span.next").click(function() {
				if ($(this).hasClass("disabled")) return false;
				$(".page-navi input:text").val(Number($(".page-navi input:text").val()) + 1);
				console.log($(".page-navi input:text").val());
				console.log($(".wjslist").attr("date"));
				getbaoday($(".wjslist").attr("date"))
			});
			$("span.prev").click(function() {
				if ($(this).hasClass("disabled")) return false;
				$(".page-navi input:text").val(Number($(".page-navi input:text").val()) - 1);
				console.log($(".page-navi input:text").val());
				getbaoday($(".wjslist").attr("date"))
			});
			$(".page-navi input:text").unbind("blur");
			$(".page-navi input:text").blur(function() {
				getbaoday($(".wjslist").attr("date"))
			});
			str = null;
			m = null;
		}
	})
}

function getrule() {
// 	var gg = $(".gamemenu span:eq(0)").attr("gid");
// 	$.ajax({
// 		type: 'POST',
// 		url: mulu + 'rule',
// 		cache: false,
// 		async: false,
// 		data: 'xtype=show&gid=' + gg,
// 		success: function(m) {
// 			$(".rulecon").html(m);
// 		}
// 	});
}

function getchangepass() {
	var ptest = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
	// 	$.ajax({
	// 		type: 'POST',
	// 		url:mulu+'changepass',
	// 		cache: false,
	// 		async: false,
	// 		data: '',
	// 		success: function(m) {
	//$(".menulist").hide();
	//   $(".passcon").html(m);
	$(".passcon button").attr("disabled", true);
	$(".passcon .rset").click(function() {
		$(".passcon input").val('');
		$(".passcon button").attr("disabled", true);
	});
	$(".passcon input:password").blur(function() {
		var cons = 0;
		$(".passcon input:password").each(function() {
			if ($(this).val() != "") {
				cons = 1;
			}
		});
		if (cons == 1) {
			$(".passcon button").attr("disabled", false);
		} else {
			$(".passcon button").attr("disabled", true);
		}
	});
	$(".passcon .qd").click(function() {
		var pass0 = $("input.oldpassword").val();
		var pass1 = $("input.newpassword").val();
		var pass2 = $("input.confirmpassword").val();
		if (pass0 == '') {
			$(".errmsg .swal-text").html("请输入原始密码！");
			$(".errmsg").show();
			return false;
		}
		if (!ptest.test(pass1)) {
			$(".errmsg .swal-text").html("密码必须由6-20字符包含大小写字母和数字组合组成" + pass1);
			$(".errmsg").show();
			return false;
		}
		if (pass1 != pass2) {
			$(".errmsg .swal-text").html("新设密码 和 新设密码确认 不一样！");
			$(".errmsg").show();
			return false;
		}
		if (pass0 == pass1) {
			$(".errmsg .swal-text").html("新密码和旧密码不能一样!");
			$(".errmsg").show();
			return false;
		}
		if (!confirm("是否确定要修改密码？")) return false;
		pass0 = men_md5_password(pass0);
		pass1 = men_md5_password(pass1);
		pass2 = men_md5_password(pass2);
		var str = "&pass0=" + pass0 + "&pass1=" + pass1 + "&pass2=" + pass2;
		$.ajax({
			type: 'POST',
			url: mulu + 'password',
			data: 'xtype=changepass' + str,
			success: function(m) {
				m = m.code;
				if (m == 0) {
					$(".errmsg .swal-text").html("原密码错误");
					$(".errmsg").show();
				} else {
					$(".successmsg .swal-text").html("修改成功!");
					$(".successmsg").show();
					top.window.location.href = "/";
				}
			}
		})
	});
	m = null;
	// 		}
	// 	});
}

function getuserinfo() {
	// 	$.ajax({
	// 		type: 'POST',
	// 		url:mulu+'userinfo',
	// 		cache: false,
	// 		async:false,
	// 		data: 'xtype=show',
	// 		success: function(m) {
	// 		   $(".userinfocon").html(m);
	$("button.qd").click(function() {
		$.ajax({
			type: 'POST',
			url: mulu + 'userinfo',
			data: "xtype=setdefaultpan&pan=" + $("#abcd").val(),
			success: function(m) {
				if (m.code == 1) {
					window.location.reload();
				} else {
					alert(m.msg);
				}
			}
		});
	});
	$(".dropbtn").unbind("click");
	$(".dropbtn").click(function() {
		$("#myDropdown").is(":hidden") ? $("#myDropdown").show() : $("#myDropdown").hide();
	});
	$("#myDropdown div").click(function() {
		var gg = $(this).attr("gid");
		$(".pn_title2").html($(this).find("a").html());
		$(".conlist").hide();
		$(".g" + gg).show();
		$("#myDropdown").hide();
	});
	$("#myDropdown div:eq(0)").click();
	m = null;
	// 		}
	// 	});
}

function getwjs() {
	$.ajax({
		type: 'POST',
		url: mulu + 'report',
		dataType: 'json',
		cache: false,
		data: "xtype=wjs",
		success: function(m) {
			var ml = m.msg.length;
			m = m.msg;
			var str = "";
			$(".wjslist").empty();
			if (ml == 0) {
				$(".wjslist").html('<div class="no_date">暂无数据</div>');
				return;
			}
			var zs = 0;
			var ky = 0;
			var zje = 0;
			for (i = 0; i < ml; i++) {
				str = '<div class="table-row">';
				str += '<div class="col col2"><div class="green_color">' + m[i]['tid'] + '</div><div>' + m[
					i]['date'] + '</div><div>' + m[i]['time'] + '</div></div>';
				str += '<div class="col col3"><div>' + m[i]['gid'] + '</div>';
				str += '<div class="green_color">第 ' + m[i]['qishu'] + ' 期</div>';
				str += '<div class="blue_color">盘口（' + m[i]['abcd'] + '）</div></div>';
				str += '<div class="col col1-5"><span class="blue_color">' + m[i]['wf'] +
					'</span><span class="blue_color">@</span><span class="red_color">' + m[i]['peilv1'];
				if (Number(m[i]['peilv2']) > 1) str += '/' + m[i]['peilv2'];
				str += '</span></div>';
				str += '<div class="col col1-5"><div>' + m[i]['je'] +
					'</div></div><div class="col col2 blue_color">' + m[i]['ky'] + '</div></div>';
				$(".wjslist").append(str);
				zje += Number(m[i]['je']);
				ky += Number(m[i]['ky']);
			}
			$(".footer-row:eq(0) span").html(ml);
			$(".footer-row:eq(1) span").html(getResult(zje, 0));
			$(".footer-row:eq(2) span").html(getResult(ky, 2));
			str = null;
			m = null;
		}
	});
}

function getkj() {
	var gid = ngid;
	var dates = $(".dates").val();
	$.ajax({
		type: 'POST',
		url: mulu + 'dresult',
		dataType: 'json',
		cache: false,
		data: "xtype=getkj&dates=" + dates + "&gid=" + gid,
		success: function(m) {
			m = m.msg;
			switch (m['fenlei']) {
				case '107':
					$(".kjbt").html(
						"<div class='rBoyH hm'>号码</div><div class='ctglGG dx'>大小</div><div class='ctglGG ds'>单双</div><div class='ctglGG zh'>冠亚/龙虎</div><div class='ctglGG ft' style='display:none;'>番摊</div>"
						);
					break;
				case '101':
				case '103':
				case '163':
				case '121':
					if (gid == '132') {
						$(".kjbt").html("<div class='rBoyH'>号码</div>");
					} else {
						$(".kjbt").html(
							"<div class='rBoyH hm'>号码</div><div class='ctglGG dx'>大小</div><div class='ctglGG ds'>单双</div><div class='ctglGG zh'>总和/形态</div><div class='ctglGG ft' style='display:none;'>番摊</div>"
							);
					}
					break;
				case '161':
					$(".kjbt").html(
						"<div class='rBoyH hm'>号码</div><!div class='ctglGG zh'>总和</div><div class='ctglGG ft' style='display:none;'>番摊</div>"
						);
					break;
				case '151':
					$(".kjbt").html("<div class='rBoyH hm'>号码</div><!--div class='ctglGG yxx'>鱼虾蟹</div-->");
					break;
				case '100':
					$(".kjbt").html(
						"<div class='rBoyH hm'>号码<!--/div><div class='ctglGG zh'>总和</div--><div class='ctglGG ft' style='display:none;'>番摊</div>"
						);
					break;
			}
			if (m['ft'] == '1') {
				$(".kjbt .ft").show();
			}
			var kj = m['kj'];
			var kl = kj.length;
			console.log(JSON.stringify(kj));
			$(".kjlist").empty();
			var tops = 0;
			arr = ["大", "小"];
			sxarr = ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'];
			for (i = 0; i < kl; i++) {
				tops = i * 70;
				var zhstr = " yxx='" + joinarr(kj[i]['yxx']) + "' ds='" + joinarr(kj[i]['ds']) + "'  dx='" +
					joinarr(kj[i]['dx']) + "'  lh='" + joinarr(kj[i]['lh']) + "'  zonghe='" + joinarr(kj[i][
						'zonghe'
					]) + "'  ft='" + joinarr(kj[i]['ft']) + "' ";
				var str =
					"<div class='xucEQ lists' style='height: 70px; left: 0px; position: absolute; top: " +
					tops + "px; width: 100%;'><div class='zyzeo4-5 cJXNwD'>";
				str += "<span class='title'>" + kj[i]['qishu'] + "</span><span class='title'>" + kj[i][
					'kjtime'
				] + "</span></div><div class='zyzeo4-5 jewTjd listma' " + zhstr + ">";
				//str += "<span class='title'>"+kj[i]['qishu']+"</span></div><div class='zyzeo4-5 jewTjd listma' "+zhstr+">";
				if (m['fenlei'] == '161') str += "<div class='sc-1i3dxqj-0 dZPZqu'><div class='row'>";
				var tmp;
				for (j = 1; j <= m['mnum']; j++) {
					if (m['fenlei'] == '100' && j == 7) str +=
						"<span class='hm eZghFE'><div class='bblack'>+</div></span>";
					if (m['fenlei'] == '100') str += "<span class='hm eZghFE'>";
					if (m['fenlei'] == '161' && j == 10) str += "</div><div class='row'>";
					str += qiu(m['fenlei'], kj[i]['num'][j]);
					if (m['fenlei'] == '100') str += "<div class='bblack'>" + sxarr[kj[i]['sx'][j]] +
						"</div>";
					if (m['fenlei'] == '100') str += "</span>";
				}
				if (gid == '132') {
					var arr = ["大", "小", "和"];
					var tmp = joinarr(kj[i]['dx']).split(",");
					str += "<div class='other b" + '101' + "dx" + tmp[tmp.length - 1] + "'>" + arr[tmp[tmp
						.length - 1]] + "</div>";
					var arr = ["单", "双", "和"];
					var tmp = joinarr(kj[i]['ds']).split(",");
					str += "<div class='other b" + '101' + "ds" + tmp[tmp.length - 1] + "'>" + arr[tmp[tmp
						.length - 1]] + "</div>";
					str += "<div class='other b" + '101' + "ft" + kj[i]['ft'] + "'>" + kj[i]['ft'] +
						"</div>";
				}
				if (m['fenlei'] == '151') {
					str += "<div class='bzh'>" + kj[i]['zonghe'][0] + "</div>";
					str += "<div class='b" + fenlei + "dx" + kj[i]['zonghe'][1] + "'>" + arr[kj[i]['zonghe']
						[1]] + "</div>";
				}
				if (m['fenlei'] == '161') str += "</div></div>";
				str += "</div></div>";
				$(".kjlist").append(str);
			}
			$(".listma div").addClass("hm");
			$(".kjlist").parent().width('100%');
			$(".kjlist").css('max-width', $(document).width());
			$(".kjlist").css('height', tops + 70);
			$(".kjlist").css('max-height', tops + 70);
			kjfunc(m['fenlei']);
			kj = null;
			m = null;
			str = null;
		}
	})
}

function joinarr(arr) {
	if (!$.isArray(arr)) return "";
	else return arr.join(',');
}

function kjfunc(fenlei) {
	switch (fenlei) {
		case '100':
			$(".kjbt div").click(function() {
				$(".kjbt div.rBoyH").removeClass("rBoyH").addClass("ctglGG");
				$(this).removeClass("ctglGG").addClass("rBoyH");
				if ($(this).hasClass("hm")) {
					$(".listma").find(".other").remove();
					$(".listma .hm").show();
				} else if ($(this).hasClass("zh")) {
					$(".listma").find(".other").remove();
					dsarr = ["单", "双"];
					dxarr = ["大", "小"];
					$(".listma").each(function() {
						var tmp = $(this).attr("zonghe").split(",");
						$(this).find(".hm").hide();
						$(this).append("<div class='other bzh'>" + tmp[0] + "</div>");
						$(this).append("<div class='other b107dx" + tmp[1] + "'>" + dxarr[tmp[1]] +
							"</div>");
						$(this).append("<div class='other b107ds" + tmp[2] + "'>" + dsarr[tmp[2]] +
							"</div>");
					});
				} else if ($(this).hasClass("ft")) {
					$(".listma").find(".other").remove();
					dsarr = ["单", "双"];
					dxarr = ["大", "小"];
					$(".listma").each(function() {
						var tmp = $(this).attr("ft").split(",");
						console.log(tmp)
						$(this).find(".hm").hide();
						$(this).append("<div class='other bblack' style='margin-right:30px;'>" + tmp[
							4] + "</div>");
						$(this).append("<div class='other bblack'>" + tmp[0] + "</div>");
						$(this).append("<div class='other bzh'>" + tmp[1] + "</div>");
						$(this).append("<div class='other b107dx" + tmp[2] + "'>" + dxarr[tmp[2]] +
							"</div>");
						$(this).append("<div class='other b107ds" + tmp[3] + "'>" + dsarr[tmp[3]] +
							"</div>");
					});
				}
			})
			break;
		case '107':
			$(".kjbt div").click(function() {
				$(".kjbt div.rBoyH").removeClass("rBoyH").addClass("ctglGG");
				$(this).removeClass("ctglGG").addClass("rBoyH");
				if ($(this).hasClass("hm")) {
					$(".listma").find(".other").remove();
					$(".listma .hm").show();
				} else if ($(this).hasClass("ds")) {
					$(".listma").find(".other").remove();
					arr = ["单", "双"];
					$(".listma").each(function() {
						var tmp = $(this).attr("ds").split(",");
						console.log(tmp)
						$(this).find(".hm").hide();
						for (var i in tmp) {
							$(this).append("<div class='other b" + fenlei + "ds" + tmp[i] + "'>" + arr[
								tmp[i]] + "</div>");
						}
					});
				} else if ($(this).hasClass("dx")) {
					$(".listma").find(".other").remove();
					arr = ["大", "小"];
					$(".listma").each(function() {
						var tmp = $(this).attr("dx").split(",");
						console.log(tmp[i])
						$(this).find(".hm").hide();
						for (var i in tmp) {
							$(this).append("<div class='other b" + fenlei + "dx" + tmp[i] + "'>" + arr[
								tmp[i]] + "</div>");
						}
					});
				} else if ($(this).hasClass("zh")) {
					$(".listma").find(".other").remove();
					dsarr = ["单", "双"];
					dxarr = ["大", "小"];
					lharr = ["虎", "龙"];
					$(".listma").each(function() {
						var tmp = $(this).attr("zonghe").split(",");
						$(this).find(".hm").hide();
						var bzh = tmp[0];
						$(this).append("<div class='other bzh'>" + bzh + "</div>");
						$(this).append("<div class='other b" + fenlei + "dx" + tmp[1] + "'>" + dxarr[
							tmp[1]] + "</div>");
						$(this).append("<div class='other b" + fenlei + "ds" + tmp[2] + "'>" + dsarr[
							tmp[2]] + "</div>");
						$(this).append("<div class='other' style='width:10px;'></div>");
						var tmp = $(this).attr("lh").split(",");
						for (var i in tmp) {
							$(this).append("<div class='other b" + fenlei + "lh" + tmp[i] + "'>" +
								lharr[tmp[i]] + "</div>");
						}
					});
				} else if ($(this).hasClass("ft")) {
					$(".listma").find(".other").remove();
					dsarr = ["单", "双"];
					dxarr = ["大", "小"];
					$(".listma").each(function() {
						var tmp = $(this).attr("ft").split(",");
						var nums = tmp[4].split('+');
						var str = '';
						for (var x in nums) {
							str += $(this).find(".hm:eq(" + (nums[x] - 1) + ")").prop("outerHTML");
						}
						$(this).find(".hm").hide();
						$(this).append(
							"<div class='other bblack' style='margin-right:10px;width:100px;'>" +
							str + "</div>");
						$(this).append("<div class='other bblack'>" + tmp[0] + "</div>");
						$(this).append("<div class='other bzh'>" + tmp[1] + "番</div>");
						$(this).append("<div class='other b" + fenlei + "dx" + tmp[2] + "'>" + dxarr[
							tmp[2]] + "</div>");
						$(this).append("<div class='other b" + fenlei + "ds" + tmp[3] + "'>" + dsarr[
							tmp[3]] + "</div>");
					});
					$(".listma .other .hm").css("float", "left");
					$(".listma .other .hm").css("margin-right", "5px");
					$(".listma .other .hm").show();
				}
			})
			break;
		case '101':
		case '103':
		case '121':
		case '163':
			var flid = fenlei;
			fenlei = 101;
			$(".kjbt div").click(function() {
				$(".kjbt div.rBoyH").removeClass("rBoyH").addClass("ctglGG");
				$(this).removeClass("ctglGG").addClass("rBoyH");
				if ($(this).hasClass("hm")) {
					$(".listma").find(".other").remove();
					$(".listma .hm").show();
				} else if ($(this).hasClass("ds")) {
					$(".listma").find(".other").remove();
					arr = ["单", "双", "和"];
					$(".listma").each(function() {
						var tmp = $(this).attr("ds").split(",");
						$(this).find(".hm").hide();
						for (var i in tmp) {
							$(this).append("<div class='other b" + fenlei + "ds" + tmp[i] + "'>" + arr[
								tmp[i]] + "</div>");
						}
					});
				} else if ($(this).hasClass("dx")) {
					$(".listma").find(".other").remove();
					arr = ["大", "小", "和"];
					$(".listma").each(function() {
						var tmp = $(this).attr("dx").split(",");
						$(this).find(".hm").hide();
						for (var i in tmp) {
							$(this).append("<div class='other b" + fenlei + "dx" + tmp[i] + "'>" + arr[
								tmp[i]] + "</div>");
						}
					});
				} else if ($(this).hasClass("zh")) {
					$(".listma").find(".other").remove();
					dsarr = ["单", "双"];
					dxarr = ["大", "小", "和"];
					lharr = ["虎", "龙", "和"];
					qtarr = ["豹子", "顺子", "对子", "半顺", "杂六"];
					$(".listma").each(function() {
						var tmp = $(this).attr("zonghe").split(",");
						var t2 = $(this).attr("lh").split(",");
						$(this).find(".hm").hide();
						$(this).append("<div class='other bzh'>" + tmp[0] + "</div>");
						$(this).append("<div class='other b" + fenlei + "dx" + tmp[1] + "'>" + dxarr[
							tmp[1]] + "</div>");
						$(this).append("<div class='other b" + fenlei + "ds" + tmp[2] + "'>" + dsarr[
							tmp[2]] + "</div>");
						if (flid == 101) {
							$(this).append("<div class='other b" + fenlei + "ds" + t2[0] + "'>" + lharr[
								t2[0]] + "</div>");
							$(this).append("<div class='other b" + fenlei + "qt" + arrindex(qtarr, tmp[
								3]) + "'>" + tmp[3] + "</div>");
							$(this).append("<div class='other' style='width:10px;'></div>");
							$(this).append("<div class='other b" + fenlei + "qt" + arrindex(qtarr, tmp[
								4]) + "'>" + tmp[4] + "</div>");
							$(this).append("<div class='other' style='width:10px;'></div>");
							$(this).append("<div class='other b" + fenlei + "qt" + arrindex(qtarr, tmp[
								5]) + "'>" + tmp[5] + "</div>");
						} else if (flid == 103) {
							var tmp = $(this).attr("lh").split(",");
							for (var i in tmp) {
								$(this).append("<div class='other b" + fenlei + "ds" + tmp[i] + "'>" +
									lharr[tmp[i]] + "</div>");
							}
						} else {
							$(this).append("<div class='other b" + fenlei + "ds" + t2[0] + "'>" + lharr[
								t2[0]] + "</div>");
						}
					});
				} else if ($(this).hasClass("ft")) {
					$(".listma").find(".other").remove();
					dsarr = ["单", "双"];
					dxarr = ["大", "小"];
					$(".listma").each(function() {
						var tmp = $(this).attr("ft").split(",");
						var nums = tmp[4].split('+');
						var str = '';
						for (var x in nums) {
							str += $(this).find(".hm:eq(" + (nums[x] - 1) + ")").prop("outerHTML");
						}
						$(this).find(".hm").hide();
						$(this).append(
							"<div class='other bblack' style='margin-right:20px;width:100px;'>" +
							str + "</div>");
						$(this).append("<div class='other bblack'>" + tmp[0] + "</div>");
						$(this).append("<div class='other bzh'>" + tmp[1] + "番</div>");
						$(this).append("<div class='other b" + fenlei + "dx" + tmp[2] + "'>" + dxarr[
							tmp[2]] + "</div>");
						$(this).append("<div class='other b" + fenlei + "ds" + tmp[3] + "'>" + dsarr[
							tmp[3]] + "</div>");
					});
					$(".listma .other .hm").css("float", "left");
					$(".listma .other .hm").css("margin-right", "2px");
					$(".listma .other .hm").show();
				}
			})
			break;
		case "161":
			$(".kjbt div").click(function() {
				$(".kjbt div.rBoyH").removeClass("rBoyH").addClass("ctglGG");
				$(this).removeClass("ctglGG").addClass("rBoyH");
				if ($(this).hasClass("hm")) {
					$(".listma").find(".other").remove();
					$(".listma .hm").show();
				} else if ($(this).hasClass("zh")) {
					$(".listma").find(".other").remove();
					dsarr = ["单", "双"];
					dxarr = ["大", "小", "和"];
					qhduoarr = ["前(多)", "前(多)", "和"];
					dsduoarr = ["单(多)", "双(多)", "和"];
					wharr = ["金", "木", "水", "火", "土"];
					$(".listma").each(function() {
						var tmp = $(this).attr("zonghe").split(",");
						$(this).find(".hm").hide();
						$(this).append("<div class='other bzh'>" + tmp[0] + "</div>");
						$(this).append("<div class='other b" + fenlei + "dx" + tmp[1] + "'>" + dxarr[
							tmp[1]] + "</div>");
						$(this).append("<div class='other b" + fenlei + "ds" + tmp[2] + "'>" + dsarr[
							tmp[2]] + "</div>");
						$(this).append("<div class='other b" + fenlei + "wh" + arrindex(wharr, tmp[3]) +
							"'><strong>" + tmp[3] + "</strong></div>");
						$(this).append("<div class='other b" + fenlei + "duo" + tmp[4] + "'>" +
							dsduoarr[tmp[4]] + "</div>");
						$(this).append("<div class='other b" + fenlei + "duo" + tmp[5] + "'>" +
							qhduoarr[tmp[5]] + "</div>");
					});
				} else if ($(this).hasClass("ft")) {
					$(".listma").find(".other").remove();
					dsarr = ["单", "双"];
					dxarr = ["大", "小"];
					$(".listma").each(function() {
						var tmp = $(this).attr("ft").split(",");
						$(this).find(".hm").hide();
						$(this).append("<div class='other bblack' style='margin-right:30px;'>" + tmp[
							4] + "</div>");
						$(this).append("<div class='other bblack'>" + tmp[0] + "</div>");
						$(this).append("<div class='other bzh'>" + tmp[1] + "番</div>");
						$(this).append("<div class='other b" + fenlei + "dx" + tmp[2] + "'>" + dxarr[
							tmp[2]] + "</div>");
						$(this).append("<div class='other b" + fenlei + "ds" + tmp[3] + "'>" + dsarr[
							tmp[3]] + "</div>");
					});
				}
			})
			break;
		case "151":
			$(".kjbt div").click(function() {
				$(".kjbt div.rBoyH").removeClass("rBoyH").addClass("ctglGG");
				$(this).removeClass("ctglGG").addClass("rBoyH");
				if ($(this).hasClass("hm")) {
					$(".listma").find(".other").remove();
					$(".listma .hm").show();
				} else if ($(this).hasClass("yxx")) {
					$(".listma").find(".other").remove();
					yxxarr = ['鱼', '虾', '葫芦', '金钱', '蟹', '鸡'];
					$(".listma").each(function() {
						$(this).find(".hm").hide();
						var tmp = $(this).attr("yxx").split(",");
						for (var i in tmp) {
							$(this).append("<div class='other b161wh" + arrindex(yxxarr, tmp[i]) +
								"'>" + tmp[i] + "</div>");
						}
					});
				}
			})
			break;
	}
}

function arrindex(arr, v) {
	for (var i in arr) {
		if (arr[i] == v) {
			return i;
		}
	}
}

function qiu(fenlei, ns) {
	if (isNaN(ns)) {
		if (ns.indexOf("红") != -1 || ns.indexOf("紅") != -1) {
			return "<div class='fred'>" + ns + "</div>";
		} else if (ns.indexOf("蓝") != -1 || ns.indexOf("藍") != -1) {
			return "<div class='fblue'>" + ns + "</div>";
		} else if (ns.indexOf("绿") != -1 || ns.indexOf("綠") != -1) {
			return "<div class='fgreen'>" + ns + "</div>";
		} else {
			return ns;
		}
	}
	var str;
	switch (fenlei) {
		case '107':
			if (Number(ns) < 10 && strlen(ns) == 1) {
				ns = '0' + ns;
			}
			str = "<div class='b" + fenlei + ns + "' m='" + ns + "'>" + Number(ns) + "</div>";
			break;
		case '103':
			if (Number(ns) >= 19) {
				str = "<div class='b" + fenlei + "red' m='" + ns + "'>" + Number(ns) + "</div>";
			} else {
				str = "<div class='b" + fenlei + "' m='" + ns + "'>" + Number(ns) + "</div>";
			}
			break;
		case '121':
			if (Number(ns) == 11) {
				str = "<div class='b" + fenlei + "red' m='" + ns + "'>" + Number(ns) + "</div>";
			} else {
				str = "<div class='b" + fenlei + "' m='" + ns + "'>" + Number(ns) + "</div>";
			}
			break;
		case '101':
		case '163':
			if (ngid == '101') {
				str = "<div class='bsx" + ns + "'></div>";
			} else {
				str = "<div class='b" + fenlei + "' m='" + ns + "'>" + Number(ns) + "</div>";
			}
			break;
		case '161':
			if (Number(ns) >= 41) {
				str = "<div class='b" + fenlei + "b' m='" + ns + "'>" + Number(ns) + "</div>";
			} else {
				str = "<div class='b" + fenlei + "a' m='" + ns + "'>" + Number(ns) + "</div>";
			}
			break;
		case '151':
			ns = Number(ns);
			if (ns < 10) {
				str = "<div class='b" + fenlei + ns + "' m='" + ns + "'></div>";
			} else if (ns < 10) {
				str = "<div class='b" + fenlei + (Math.floor(ns / 10)) + "'></div>" + "<div class='b" + fenlei + (ns %
					10) + "'></div>";
			} else {
				str = "<div class='b" + fenlei + (Math.floor(ns / 100)) + "'></div>" + "<div class='b" + fenlei + (Math
					.floor(ns / 10)) + "'></div>" + "<div class='b" + fenlei + (ns % 10) + "'></div>";
			}
			break;
		case '100':
			ns = Number(ns);
			if ($.inArray(ns, sma['紅']) != -1) {
				str = "<div class='bred'>" + Number(ns) + "</div>";
			} else if ($.inArray(ns, sma['藍']) != -1) {
				str = "<div class='bblue'>" + Number(ns) + "</div>";
			} else if ($.inArray(ns, sma['綠']) != -1) {
				str = "<div class='bgreen'>" + Number(ns) + "</div>";
			}
			break;
	}
	return str;
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

function getResult(num, n) {
	return Math.round(num * Math.pow(10, n)) / Math.pow(10, n)
}

function getresult(num, n) {
	return num.toString().replace(new RegExp("^(\\-?\\d*\\.?\\d{0," + n + "})(\\d*)$"), "$1") + 0
}