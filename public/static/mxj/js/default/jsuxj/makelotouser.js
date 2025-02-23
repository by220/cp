var gatt, time0, time1, settime0, settime1, gntime;
var fastobj;

function myready() {
	$(".smenu td:eq(0)").find("input:first").addClass('click');
	$(".main a:first").addClass('click');
	$(".make").addClass(style + 'tb');
	if ($(".time0").html() != undefined) {
		time0 = Number($(".time0").html());
		if (Math.abs(time0) <= 2) {
			setTimeout(window.location.reload(), 3000);
			return true
		}
		if (time0 < 0) time0 = 0 - time0;
		time0x();
		setTimeout(getnowtime, 10000)
	}
	if ($(".time1").html() != undefined) {
		time1 = Number($(".time1").html());
		if (Math.abs(time1) <= 2) {
			setTimeout(window.location.reload(), 3000);
			return true
		}
		if (time1 < 0) time1 = 0 - time1
	}
	setTimeout(getlast15, 3000);
	setTimeout(getnews, 5000);
	setTimeout(onefunc, 1000)
}

function selectma(arr) {
	var al = arr.length;
	$(".mtb td.m label").removeClass('ballr');
	$(".mtb td.m label").removeClass('ballg');
	$(".mtb td.m label").removeClass('ballb');
	$(".mtb td.m label").addClass('ballh');
	$(".mtb td.m").removeClass('clicks');
	var tmp;
	a = new Array();
	a = sm;
	for (i = 0; i < al; i++) {
		tmp = arr[i];
		if (tmp < 10 & strlen(''+tmp)==1) tmp = '0' + tmp;
		switch (color(arr[i])) {
		case "red":
			$(".mtb .m" + tmp + " label").removeClass('ballh');
			$(".mtb .m" + tmp + " label").addClass('ballr');
			break;
		case "blue":
			$(".mtb .m" + tmp + " label").removeClass('ballh');
			$(".mtb .m" + tmp + " label").addClass('ballb');
			break;
		case "green":
			$(".mtb .m" + tmp + " label").removeClass('ballh');
			$(".mtb .m" + tmp + " label").addClass('ballg');
			break
		}
		$(".mtb .m" + tmp).addClass('clicks')
	}
	sumhm()
}

function sumhm() {
	if ($("input[name='mode']:checked").val() == '0') {
		var sumhms = $(".mtb td.clicks").length;
		$(".sumhm").html(sumhms);
		if(sm.length>6){
		var total = loto_zuhe(sm.length, 6);
		}else{
		   var total=0;
		}
		
		$(".totalzs").html(total)
		
	} else {
		sumhm1 = $(".m1tb td.clicks").length;
		sumhm2 = $(".m2tb td.clicks").length;
		$(".sumhm").html(sumhm1 + " - " + sumhm2);
		if(sumhm1+sumhm2<6){
		var total = 0;
		}else{
		var total = loto_zuhe(sm2.length, 6 - sumhm1);
		}
		$(".totalzs").html(total)
	}
}

function addhm(arr) {
	
	$(".res tr").each(function() {
		if ($(this).find("input").length != 1) {
			$(this).remove();
		}
	});
	
	var al = arr.length;
	var str = "";
	if ($(".res tr.nr").length == 0) {
		var x = 1
	} else {
		var x = $(".res tr.nr").length+1;
	}
	var zje = 0;
	for (i = 0; i < al; i++, x++) {
		$.each(arr[i], function(j) {
			if (arr[i][j] < 10 & strlen(''+arr[i][j])==1) arr[i][j] = '0' + arr[i][j]
		});
		if (arr[i].length == 6) {
			var je = minje;
		} else {
			var tmp = loto_zuhe(sm.length, 6);
			var je = tmp * minje;
			tmp = null;
		}
		str += "<tr class='nr pp" + x + "'>";
		str += "<td class='cg'><input type='checkbox' /></td>";
		str += "<th class='xh'>" + x + "</th>";
		str += "<td class='je' >" + je + "</td>";
		str += "<td class='hm' >" + arr[i].toString() + "</td>";
		str += "</tr>";

	}


	$(".res table").append(str);
	$(".res td.je").each(function() {
		zje += Number($(this).html());
	});
	str = "<tr><td class='cg'></td><td class='xh'></td><td class='je'>" + zje + "</td><td class='hm'></td></tr>";
	$(".res table").append(str);
	str = null;
	$(".res input").unbind('click');
	$(".res input").click(function() {
								   
		if ($(this).attr('class')=='all') {
			if ($(this).prop("checked") == true ) {
				$(".res input:checkbox").attr('checked', true);
				$(".res td").addClass('blue');
				$(".res th").addClass('blue')
				$(".res tr:eq(0)").find("td").removeClass('blue');
				$(".res tr:eq(0)").find("th").removeClass('blue');
			} else {
				$(".res input:checkbox").attr('checked', false);
				$(".res td").removeClass('blue');
				$(".res th").removeClass('blue')
			}
		} else {
			$(this).parent().parent().find("td").toggleClass('blue');
			$(this).parent().parent().find("th").toggleClass('blue')
		}
	});
	$(".res").scrollTop($(".res table").height())
}

function onefunc() {
	$(".mtb td.m label").addClass('ballh');
	$(".m1tb td.m").each(function() {
		var tz = color(Number($(this).html()));
		var m = $(this).attr('m');
		$(this).addClass(tz);
		$(".m2tb td.m" + m).addClass(tz)
	});
	$(".m1tb td.m").click(function() {
		$(this).toggleClass('clicks');
		var m = Number($(this).attr('m'));
		if (!in_array(m, sm1)) {
			sm1[sm1.length] = m
		} else {
			sm1.splice($.inArray(m, sm1), 1)
		}
		if (sm1.length > 5) {
			$(this).removeClass('clicks');
			sm1.splice($.inArray(m, sm1), 1)
		}
		sumhm()
	});
	$(".m2tb td.m").click(function() {
		$(this).toggleClass('clicks');
		var m = Number($(this).attr('m'));
		if (!in_array(m, sm2)) {
			sm2[sm2.length] = m
		} else {
			sm2.splice($.inArray(m, sm2), 1)
		}
		sumhm()
	});
	$(".mtb td.m").click(function() {
		var m = Number($(this).attr('m'));
		if ($.inArray(m, sm) != -1) {
			sm.splice($.inArray(m, sm), 1)
		} else {
			sm[sm.length] = m
		}

		selectma(sm)
	});
	$(".exetb input:radio").click(function() {
		if ($(this).val() == '0') {
			$(".mtb").show();
			$(".mdiv").hide()
		} else {
			$(".mtb").hide();
			$(".mdiv").show()
		}
		sumhm()
	});
	$(".tz label").click(function() {
		var tz = $(this).html();
		if ($(this).hasClass('t')) tz += "头";
		if ($(this).hasClass('w')) tz += "尾";
		arr = new Array();
		for (i = 0; i < mal; i++) {
			if (tz == ma[i]['name']) {
				arr = ma[i]['ma'];
				break
			}
		}
		var ca = arr.length;
		var inflag = 0;
		for (i = 0; i < ca; i++) {
			if (in_array(arr[i], sm)) {
				inflag = 1;
				break
			}
		}
		if (inflag) {
			sm = arr
		} else {
			for (i = 0; i < ca; i++) {
				sm[sm.length] = arr[i]
			}
		}

		selectma(sm)
	});
	$(".delall").click(function() {
		$(".mtb td.m label").removeClass('ballr');
		$(".mtb td.m label").removeClass('ballg');
		$(".mtb td.m label").removeClass('ballb');
		$(".mtb td.m label").addClass('ballh');
		$(".mtb td.m").removeClass('clicks');
		$(".m1tb td.m").removeClass('clicks');
		$(".m2tb td.m").removeClass('clicks');
		sm = new Array();
		sm1 = new Array();
		sm2 = new Array();
		$(".totalzs").html(0);
		$(".sumhm").html(0);
		$(".res tr").each(function(i) {
			if (i > 0) $(this).remove()
		})
	});
	$(".addhm").click(function() {

		var al;
		arr = new Array();
		if ($("input[name='mode']:checked").val() == '0') {
			sm = sm.sort(function(x, y) {
				return (x - y)
			});
			arr[0] = sm;
			al = arr[0].length;
			if (al < 6) {
				alert("必须至少选择6个号码！");
				return false;
			}
		} else {
			arr = C(sm2, 6 - sm1.length);
			var al = arr.length;
			sm1 = sm1.sort(function(x, y) {
				return (x - y)
			});
			for (k = 0; k < al; k++) {
				arr[k] = sm1.concat(arr[k]);
				arr[k] = arr[k].sort(function(x, y) {
					return (x - y)
				})
			}
			al = arr.length;
		}
		if (al == 0) {
			alert("选择的号码数不够！");
			return false;
		}
		addhm(arr)
	});
	$(".delselect").click(function() {  
		$(".res input").each(function() {
			if (!$(this).hasClass('all') & ($(this).prop("checked") == true )) {
				$(this).parent().parent().remove()
			}
		});
		$(".res input.all").attr('checked', false)
	});
	$(".randbtn").click(function() {
		$(".randbtn").attr("disabled", true);
		var num = Number($(this).attr('num'));
		arr = new Array();
		
		for (i = 0; i < num; i++) {
			arr[i] = new Array();
			arr[i][0] = randarr(arr[i]);
			arr[i][1] = randarr(arr[i]);
			arr[i][2] = randarr(arr[i]);
			arr[i][3] = randarr(arr[i]);
			arr[i][4] = randarr(arr[i]);
			arr[i][5] = randarr(arr[i]);
			arr[i] = arr[i].sort(function(x, y) {
				return (x - y)
			})
		}
		$(".randbtn").attr("disabled", false);
		addhm(arr)
	});
	$(".lastxx input:button").click(function() {
		$(".lastxx").hide();
	});

	$("input:button").addClass('btn');
	$(".big li").click(function() {
		$(".big li").removeClass('b');
		$(this).addClass('b');
		return false
	});
	$(".big .lib").click(function() {
		getlib();
		$("#con").hide();
		$(".con1").show();
		$(".info").show();
		return false
	});
	$(".big .bao").click(function() {
		getbao();
		$("#con").hide();
		$(".con1").show();
		$(".info").show();
		return false
	});
	$(".big .zinfo").click(function() {
		getzinfo(0);
		$("#con").hide();
		$(".con1").show();
		$(".info").show();
		return false
	});
	$(".big .kj").click(function() {
		$("#con").hide();
		$(".con1").show();	
		$(".info").show(); 
		getkj();
		return false;
	});
	$(".longbtn").click(function() {
		$(".big .kj").click()
	});
	$(".big .rule").click(function() {
		getrule();
		$("#con").hide();
		$(".con1").show();
		$(".info").show();
		return false
	});
	$(".big .changepassword").click(function() {
		getchangepassword();
		$("#con").hide();
		$(".con1").show();
		$(".info").show();
		return false
	});
	$(".big .record").click(function() {
		getrecord();
		$("#con").hide();
		$(".con1").show();
		$(".info").show();
		return false
	});
	$(".big .logout").click(function() {
		window.location.href = "make.php?logout=yes";
		return false
	});
	$(".main li").click(function() {
		$("#con").show();
		$(".con1").hide();
	});
	$(".game").change(function() {
		var gid = $(this).val();
		window.location.href = "make.php?xtype=show&gids=" + gid;
		return;
		$.ajax({
			type: 'POST',
			cache: false,
			url: mulu + 'makelib.php',
			data: 'xtype=setgame&gid=' + gid,
			success: function(m) {
				if (Number(m) == 1) {
					window.location.reload();
					return
				}
			}
		})
	});
	$(".reload").click(function() {
		window.location.reload();
		return false
	});
	$(".clear").click(function() {
		$(".fasttb td").removeClass('byellow');
		return false
	});
	$(".exe").click(function() {
		exe()
	});
	$(".game2 label").click(function() {
		window.location.href = "make.php?xtype=show&gids=" + $(this).attr('gid');
		return
	})
}

function setdate(val) {
	var start = $("#start");
	var end = $("#end");
	switch (val) {
	case 1:
		start.val(sdate[10]);
		end.val(sdate[10]);
		break;
	case 2:
		start.val(sdate[0]);
		end.val(sdate[0]);
		break;
	case 3:
		start.val(sdate[5]);
		end.val(sdate[6]);
		break;
	case 4:
		start.val(sdate[7]);
		end.val(sdate[8]);
		break;
	case 5:
		start.val(sdate[1]);
		end.val(sdate[2]);
		break;
	case 6:
		start.val(sdate[3]);
		end.val(sdate[4]);
		break
	}
}

function exe() {
	var play = new Array();
	var i = 1;
	var je=0;
	$(".res tr").each(function(j) {

		if (j > 0 & $(this).find("input").length == 1) {
			play[i - 1] = new Array();
			play[i - 1]['m']= $(this).find("td:eq(2)").html();
			play[i - 1]['id'] = $(this).find("th:eq(0)").html();
			play[i - 1]['je'] = $(this).find("td:eq(1)").html();
			je += Number(play[i - 1]['je']);
			i++;
		}
	});
    if(je> (Number($(".uinfo .maxmoney").html()) -Number($(".uinfo .money").html()))){
	    alert("可用余额不足！");
		return false;
	}
 
  
	var pl = play.length;
	if (pl == 0) {
		alert("您没有添加号码！");
		return false
	}
	if (pl > 300) {
		alert("单次添加号码不能大于300注！");
		return false
	}
	var pstr = '[';
	for (i = 0; i < pl; i++) {
		if (i != 0) pstr += ',';
		pstr += json_encode_js(play[i])
	}
	pstr += ']';
	play = null;
	$.ajax({
		type: 'POST',
		url: mulu + 'makelib.php',
		data: 'xtype=makeloto&pstr=' + pstr,
		dataType: 'json',
		cache: false,
		success: function(m) {
			var ml = m.length;
			for (i = 0; i < ml; i++) {
				if (Number(m[i]['cg']) == 1) {
					$(".res .pp" + m[i]['id']).find("td:eq(0)").html("成功!");
					$(".res .pp" + m[i]['id']).find("td:eq(0)").addClass("lv")
				} else {
					$(".res .pp" + m[i]['id']).find("td:eq(0)").html(m[i]['err']);
					$(".res .pp" + m[i]['id']).find("td:eq(0)").addClass("red")
				}
			}
			getlast15();
			getusermoney()
		}
	})
}

function getusermoney() {
	$.ajax({
		type: 'POST',
		url: mulu + 'makelib.php',
		cache: false,
		data: 'xtype=getusermoney',
		success: function(m) {
			m = m.split('|');
			$(".uinfo .maxmoney").html(m[0]);
			$(".uinfo .money").html(m[1]);
			$(".uinfo .kmaxmoney").html(m[2]);
			$(".uinfo .kmoneyuse").html(m[3]);
			$(".uinfo .kmoney").html(Number(m[2]) - Number(m[3]));
			$(".uinfo .qishu").html(m[4])
		}
	})
}

function getlast15() {
	$.ajax({
		type: 'POST',
		url: mulu + 'makelib.php',
		data: 'xtype=getlast15loto',
		dataType: 'json',
		cache: false,
		success: function(m) {
			//$("#test").html(m);return;
			var ml = m.length;
			var str = '';
			var name = '';
			$(".last15 tr").each(function(i) {
				if (i > 0) $(this).remove()
			});
			for (i = 0; i < ml; i++) {
				str += "<tr>";
				str += "<td><a href='javascript:void(0)' user='" + m[i]['user'] + "' uid ='" + m[i]['userid'] + "'>";
				str += m[i]['user'] + "&nbsp;&nbsp;[" + m[i]['zs'] + "注]&nbsp;&nbsp;" + m[i]['time'];
				str += "</a></td>";
				str += "</tr>"
			}
			$(".last15").append(str);
			$(".last15 a").click(function() {
						
				if ($(".lastxx").is(":visible") & $(this).attr('uid')==$(".lastxx .pages").attr('uid')) return false;
				$(".lastxx .pages").val(1);
				getlastxx($(this));
			})
		}
	})
}

function getlastxx(obj) {
	var posi = obj.position();
	$(".lastxx").css("left", posi.left);
	$(".lastxx").css("top", posi.top + obj.height());
	$(".lastxx").show();
	$(".lastxx tr").each(function(i) {
		if (i > 1) $(this).remove();
	});
	var uid = obj.attr('uid');
	var user = obj.attr('user');
	var page = Number($(".lastxx .pages").val());
	//alert(page);
	var psize = 20;
	$(".lastxx .pages").attr('uid',uid);
	$.ajax({
		type: 'POST',
		url: mulu + 'makelib.php',
		data: 'xtype=getlast15lotoxx&uid=' + uid + "&psize=" + psize + "&page=" + page,
		dataType: 'json',
		cache: false,
		success: function(m) {
			//$("#test").html(m);return;
			var pc = Number(m['p']);
			var str = '';
			for (i = 1; i <= pc; i++) {
				str += "<a href='javascript:void(0);'";
				if(i==page) str += " class='red' ";
				str += " >" + i + "</a>";
			}
			$(".lastxx td:eq(1)").html(str);
			var ml = m['con'].length;
			var str = '';
            
			for (i = 0; i < ml; i++) {
				str += "<tr>";
				str += "<td>" + user + "</td>";
				str += "<td>" + (i + 1 + (page-1) * psize) + "</td>";
				str += "<td class='t' >" + m['con'][i]['con'] + "</td>";
				str += "<td>" + m['con'][i]['time'] + "</td>";
				str += "</tr>";

			}
			$(".lastxx").append(str);
			$(".lastxx a").click(function() {
				$(".lastxx .pages").val($(this).html());
				getlastxx(obj);
			});
		}
	});
}

function lib() {}

function checkclose() {
	var bid = Number($(".main a.click").attr("bid"));
	var name = $(".main a.click").html();
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=getpan',
		success: function(m) {
			if (Number(m['panstatus']) == 0) {
				$(".exe").attr('disabled', true)
			} else {
				$(".exe").attr('disabled', false)
			}
		}
	})
}

function getnowtime() {
	clearTimeout(gntime);
	$.ajax({
		type: 'POST',
		url: mulu + 'time.php',
		data: 'xtype=getopen',
		cache: false,
		success: function(m) {
			clearTimeout(settime0);
			m = m.split('|');
			time0 = Number(m[0]);
			time0x()
		}
	});
	gntime = setTimeout(getnowtime, 10000)
}

function time0x() {
	time0--;
	var str = '';
	var d = 0,
		h = 0,
		m = 0,
		s = 0;
	d = Math.floor(time0 / (60 * 60 * 24));
	h = Math.floor((time0 - d * 60 * 60 * 24) / (60 * 60));
	m = Math.floor((time0 - d * 60 * 60 * 24 - h * 60 * 60) / 60);
	s = time0 - d * 60 * 60 * 24 - h * 60 * 60 - m * 60;
	if (d > 0) str += "<label>" + d + "</label>天";
	if (h > 0) str += "<label>" + h + "</label>时";
	if (m > 0) str += "<label>" + m + "</label>分";
	str += "<label>" + s + "</label>秒";
	if (time0 > 0) {
		$(".time0").html(str)
	} else {
		$(".time0").html("<label>0</label>秒")
	}
	if (time0 <= 0) {
		getopen();
		return true
	}
	settime0 = setTimeout(time0x, 1000)
}

function time1x() {
	time1--;
	var str = '';
	var d = 0,
		h = 0,
		m = 0,
		s = 0;
	d = Math.floor(time1 / (60 * 60 * 24));
	h = Math.floor((time1 - d * 60 * 60 * 24) / (60 * 60));
	m = Math.floor((time1 - d * 60 * 60 * 24 - h * 60 * 60) / 60);
	s = time1 - d * 60 * 60 * 24 - h * 60 * 60 - m * 60;
	if (d > 0) str += "<label>" + d + "</label>天";
	if (h > 0) str += "<label>" + h + "</label>时";
	if (m > 0) str += "<label>" + m + "</label>分";
	str += "<label>" + s + "</label>秒";
	if (time1 > 0) {
		$(".time1").html(str)
	} else {
		$(".time1").html("<label>0</label>秒")
	}
	if (time1 <= 0) {
		getopen();
		return
	}
	settime1 = setTimeout(time1x, 1000)
}

function getopen() {
	$.ajax({
		type: 'POST',
		url: mulu + 'makelib.php',
		dataType: 'json',
		data: 'xtype=getopen',
		cache: false,
		success: function(m) {
			if ((Number(m[0]) != Number($(".panstatus").attr('s')) | Number(m[1]) != Number($(".otherstatus").attr('s'))) & (Number(m[0]) == 0 | Number(m[0]) == 1)) {
				$(".panstatus").attr('s', m[0]);
				$(".otherstatus").attr('s', m[1]);
				if (Number(m[0]) == 0) {
					$(".panstatus").html($(".panstatus").html().replace("关", "开"))
				} else {
					$(".panstatus").html($(".panstatus").html().replace("开", "关"))
				}
				if (Number(m[1]) == 0) {
					$(".otherstatus").html($(".otherstatus").html().replace("关", "开"))
				} else {
					$(".otherstatus").html($(".otherstatus").html().replace("开", "关"))
				}
				lib();
				getusermoney();
				getnowtime()
			} else {
				setTimeout(getopen, 3000)
			}
		}
	})
}

function getlogin() {
	$.ajax({
		type: 'POST',
		url: mulu + 'getlogin.php',
		data: 'xtype=getlogin',
		cache: false,
		success: function(m) {
			if (Number(m) == 1) {
				window.location.href = window.location.href
			} else {
				setTimeout(getlogin, 10000)
			}
		}
	})
}

function getrecord() {
	$.ajax({
		type: 'POST',
		cache: false,
		url: mulu + 'userinfo.php',
		data: 'xtype=getrecord',
		success: function(m) {
			$(".con1").html(m)
		}
	})
}

function getchangepassword() {
	$.ajax({
		type: 'POST',
		cache: false,
		url: mulu + 'userinfo.php',
		data: 'xtype=changepassword2',
		success: function(m) {
			$(".con1").html(m);
			xgclick()
		}
	})
}

function xgclick() {
	$(".xg").click(function() {
		var pass0 = $("#pass0").val();
		var pass1 = $("#pass1").val();
		var pass2 = $("#pass2").val();
		if (pass0 == '') {
			alert("原密码不能为空");
			return false
		}
		if (strlen(pass1) < 6 | strlen(pass1) > 15 | pass1 != pass2) {
			alert("新密码长度在6到15位,并且两次密码必需输入一样");
			return false
		}
		if (pass0 == pass1) {
			alert("新密码和旧密码不能一样!");
			return false
		}
		var pass0 = men_md5_password(pass0);
		var pass1 = men_md5_password(pass1);
		var pass2 = men_md5_password(pass2);
		var str = "&pass0=" + pass0 + "&pass1=" + pass1 + "&pass2=" + pass2;
		$.ajax({
			type: 'POST',
			url: mulu + 'changepass.php',
			cache: false,
			data: 'xtype=changepass' + str,
			success: function(m) {
				m = Number(m);
				if (m == 1) {
					alert("原密码错误")
				} else if (m == 2) {
					alert("修改成功,请重新登陆");
					window.location.href = "login.php"
				}
			}
		});
		return false
	})
}

function getkj() {
	$.ajax({
		type: 'POST',
		cache: false,
		url: mulu + 'long.php',
		data: 'xtype=show',
		success: function(m) {
			$(".con1").html(m);
			m = null;
			//$("#kjnow").attr('src', "http://00885522.com/kjnow.html")
		}
	})
}

function getrule() {
	$.ajax({
		type: 'POST',
		cache: false,
		url: mulu + 'rule.php',
		data: 'xtype=show',
		success: function(m) {
			$(".con1").html(m);
			m = null
		}
	})
}

function getzinfo(qishu) {
	$.ajax({
		type: 'POST',
		cache: false,
		url: mulu + 'bao.php',
		data: 'xtype=getzinfo&qishu='+qishu,
		success: function(m) {
			$(".con1").html(m);
			$(".zinfotb select").change(function(){
		         getzinfo($(this).val());
			});
			m = null;
		}
	})
}

function getbao() {
	$.ajax({
		type: 'POST',
		cache: false,
		url: mulu + 'bao.php',
		data: 'xtype=show',
		success: function(m) {
			$(".con1").html(m);
			$(".con1 .print").click(function() {
				prints();
				return false
			});
			$(".bcmd input[name='games2']").each(function() {
				if (Number($(this).val()) == ngid) $(this).attr("checked", true)
			});
			$(".bcmd input[name='game2']").click(function() {
				var val = $("input[name='game2']:checked").val();
				$(".game2").attr("checked", false);
				if (val == 'all') {
					$(".con1 .game2").attr("checked", true)
				} else if (val == '0') {
					$(".game2").each(function() {
						if ($(this).attr('fast') == val) $(this).attr("checked", true)
					})
				} else if (val == '1') {
					$(".game2").each(function() {
						if ($(this).attr('fast') == val) $(this).attr("checked", true)
					})
				}
				getbaonext()
			});
			$(".bcmd input.s").click(function() {
				setdate(Number($(this).attr('d')));
				$(".bcmd input.s").removeClass('click');
				$(this).addClass('click');
				getbaonext()
			});
			$(".bcmd input[name='games2']").click(function() {
				$(".bcmd input[name='games2']").removeClass('click');
				$(this).addClass('click');
				getbaonext()
			});
			$("#start").val(sdate[5]);
			$("#end").val(sdate[6]);
			getbaonext();
			m = null
		}
	})
}

function getbaonext() {
	var start = $("#start").val();
	var end = $("#end").val();
	var uid = 888;
	var game = '';
	var gname = '';
	$(".game2").each(function() {
		if ($(this).prop("checked") == true) {
			game += $(this).val() + '|';
			gname += $(this).attr('gname') + '&nbsp;&nbsp;'
		}
	});
	if (Number(start.replace('-', '')) > Number(end.replace('-', ''))) {
		alert('开始日期不能大于结束日期！');
		return false
	}
	if (strlen(game) < 4) {
		alert('请至少选择一个彩种！');
		return false
	}
	var str = '&start=' + start + "&end=" + end + "&uid=" + uid + "&game=" + game;
	$(".baotb").hide();
	$(".flytb").show();
	var flytb0 = $(".flytb tr:eq(0)").html();
	$(".flytb").empty();
	$.ajax({
		type: 'POST',
		url: mulu + 'bao.php',
		data: 'xtype=baofly' + str,
		dataType: 'json',
		success: function(m) {
			var ml = m.length;
			var str = '';
			var zzhong = 0;
			var zpoints = 0;
			var zzs = 0;
			var zje = 0;
			var yk = 0;
			var zyk = 0;
			for (i = 0; i < ml; i++) {
				str += "<tr date='" + m[i]['date1'] + "' >";
				str += "<td class='b2'>" + m[i]['date'] + "&nbsp;星期" + m[i]['week'] + "</td>";
				str += "<td class=b2><a href='javascript:void(0)'>" + m[i]['zs'] + "</a></td>";
				str += "<td class=b2><a href='javascript:void(0)'>" + m[i]['zje'] + "</a></td>";
				str += "<td>" + m[i]['points'] + "</td>";
				str += "<td>" + m[i]['zhong'] + "</td>";
				yk = getResult(Number(m[i]['zhong']) + Number(m[i]['points']) - Number(m[i]['zje']), 2);
				str += "<th class='yk'>" + yk + "</th>";
				str += "</tr>";
				zyk += yk;
				zzs += Number(m[i]['zs']);
				zpoints += Number(m[i]['points']);
				zje += Number(m[i]['zje']);
				zzhong += Number(m[i]['zhong'])
			}
			str += "<tr>";
			str += "<th>合计</th>";
			str += "<td>" + zzs + "</td>";
			str += "<td>" + getResult(zje, 2) + "</td>";
			str += "<td>" + getResult(zpoints, 2) + "</td>";
			str += "<td>" + getResult(zzhong, 2) + "</td>";
			str += "<th class='yk'>" + getResult(zyk, 2) + "</th>";
			str += "</tr>";
			$(".flytb").html("<tbody>" + flytb0 + str + "</tbody>");
			str = null;
			m = null;
			baofunc();
			$(".flytb .b2").click(function() {
				baouser($(this).parent().attr('date'));
				return false
			})
		}
	})
}

function baofunc() {
	$(".baotb td").mouseover(function() {
		$(this).parent().find("td").addClass('over')
	}).mouseout(function() {
		$(this).parent().find("td").removeClass('over')
	});
	$(".yk").each(function() {
		if (Number($(this).html()) < 0) $(this).css('color', 'green')
	})
}

function baouser(date) {
	var ttype = 0;
	var uid = 888;
	var game = '';
	$(".game2").each(function() {
		if ($(this).prop("checked") == true) game += $(this).val() + '|'
	});
	if (strlen(game) < 4) {
		alert('请至少选择一个彩种！');
		return false
	}
	$(".flytb").hide();
	$(".baotb").show();
	var psize = 100;
	var page = Number($("#page").val());
	var str = '&date=' + date + "&game=" + game + "&psize=" + psize + "&page=" + page;
	$.ajax({
		type: 'POST',
		url: mulu + 'bao.php',
		data: 'xtype=baouser' + str + "&ttype=" + ttype,
		dataType: 'json',
		cache: false,
		success: function(m) {
			var ml = m['tz'].length;
			var str = '';
			var zje = 0;
			var zshui = 0;
			var zyk = 0;
			var zzhong = 0;
			var pagestr = '';
			var pcount = Number(m['page']);
			for (i = 1; i <= pcount; i++) {
				pagestr += "&nbsp;&nbsp;<a href='javascript:void(0);' ";
				if (page == i) pagestr += " class='red' ";
				pagestr += " >";
				pagestr += i + "</a>"
			}
			str += "<tr><Td colspan=10>" + pagestr + "</td></tr>";
			str += "<tr><th>期数</th><th>时间</th><th>游戏</th><th>玩法</th><th>内容</th><th>开奖结果</th><!--<th>大盘</th><th>小盘</th>--><th>金额</th><th>退水</th><th>赔率</th><th>合计</th></tr>";
			var gid = 0;
			for (i = 0; i < ml; i++) {
				if (m['tz'][i]['gid'] == undefined) {
					str += "<tr>";
					str += "<th>小计</th>";
					str += "<td colspan=5></td>";
					str += "<th>" + m['tz'][i]['je'] + "</th>";
					str += "<th>" + m['tz'][i]['points'] + "</th>";
					str += "<th></th>";
					str += "<th>" + getResult(Number(m['tz'][i]['res']), 2) + "</th>";
					str += "</tr>";
					continue
				}
				if (gid != m['tz'][i]['gid'] & m['tz'][i]['gid'] != undefined) {
					str += "<tr><th colspan=10 class='bt'>" + m['tz'][i]['gid'] + "</th></tr>"
				}
				str += "<TR z='" + m['tz'][i]['z'] + "'>";
				str += "<td>" + m['tz'][i]['qishu'] + "</td>";
				str += "<td>" + m['tz'][i]['time'] + "</td>";
				str += "<td>" + m['tz'][i]['gid'] + "</td>";
				str += "<td class='z'>" + m['tz'][i]['bid'] + '-' + m['tz'][i]['sid'] + '-' + m['tz'][i]['cid'] + '-' + m['tz'][i]['pid'] + "</td>";
				str += "<td class='ccon'>" + m['tz'][i]['con'] + "</td>";
				str += "<td>" + m['tz'][0]['kj']['g'+m['tz'][i]['gids']+''+m['tz'][i]['qishu']] + "</td>";
				str += "<td>" + m['tz'][i]['je'] + "</td>";
				str += "<td>" + m['tz'][i]['points'] + "</td>";
				str += "<td>" + m['tz'][i]['peilv'] + "</td>";
				var yk = getResult(Number(m['tz'][i]['zhong']) + Number(m['tz'][i]['points']) - Number(m['tz'][i]['je']), 2);
				str += "<td class='yk'>" + yk + "</td>";
				zyk += yk;
				zje += Number(m['tz'][i]['je']);
				zshui += Number(m['tz'][i]['points']);
				zzhong += Number(m['tz'][i]['zhong']);
				str += "</TR>"
				gid = m['tz'][i]['gid']
			}
			str += "<tr><td>总计</td><td colspan=5></td><th>" + getResult(zje, 2) + "</th><th>" + getResult(zshui, 2) + "</th><td></td><!--<th>" + getResult(zzhong, 2) + "</th--><th class='yk'>" + getResult(zyk, 2) + "</th></tr>";
			$(".baotb").html(str);
			$(".baotb a").click(function() {
				$("#page").val($(this).html());
				baouser(date);
				return false
			});
			str = null;
			m = null;
			$(".baotb tr").each(function() {
				if ($(this).attr('z') == '1') {
					$(this).find("td.z").addClass('z1')
				} else if ($(this).attr('z') == '2') {
					$(this).find("td.z").addClass('he')
				} else if ($(this).attr('z') == '3') {
					$(this).find("td.z").addClass('z3')
				}
			});
			baofunc()
		}
	})
}

function prints() {}

function getlib(gid) {
	$.ajax({
		type: 'POST',
		cache: false,
		url: mulu + 'lib.php',
		data: 'xtype=show&gid=' + gid,
		success: function(m) {
			$(".con1").html(m);
			m = null;
			$(".con1 .qishu").change(function() {
				libhison()
			});
			$(".con1 .print").click(function() {
				prints();
				return false
			});
			$(".con1 .gamelib").change(function() {
				getlib($(this).val())
			});
			$(".download").click(function() {
				var qishu = $(this).parent().find(".qishu").val();
				var gid = $(this).parent().find(".gamelib").val();
				
				$("#downfrm").attr('src', "lib.php?xtype=downloadloto&qishu=" + qishu + "&gid=" + gid);
				return false
			});
			libhison()
		}
	})
}
var psize = 100;
var tpage = 1;

function libhison() {
	var qishu = $(".con1 .qishu").val();
	var gid = $(".gamelib").val();
	$.ajax({
		type: 'POST',
		url: mulu + 'lib.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=getlibloto&qishu=' + qishu + "&tpage=" + tpage + "&psize=" + psize + "&gid=" + gid,
		success: function(m) {
			//$("#test").html(m);return;
			var ml = m['lib'].length;
			var str = '';
			var je = 0;
			var thstr = $(".libs tr:first").html();
			$(".libs").empty();
			for (i = 0; i < ml; i++) {
				str += "<tr>";
				str += "<td>" + (i + 1) + "</td>";
				str += "<td>" + m['lib'][i]['qishu'] + "</td>";
				str += "<td class='ccon'>";
				str +=  m['lib'][i]['content'] + "</td>";
				str += "<td>" + m['lib'][i]['je'] + "</td>";
				str += "<td>" + m['lib'][i]['time'] + "</td>";
				str += "</tr>";
				je += Number(m['lib'][i]['je'])
			}
			str += '<tr><td colspan=3></td><th>' + je + '</th><td ></td></tr>';
			$(".libs").append("<TR>" + thstr + "</tr>" + str);
			page(Number(m['p'][0]), psize, 'libhison');
			tpage = Number(m['p'][1]);
			str = null;
			m = null;
			$(".libs tr").click(function() {
				$(this).toggleClass('byellow');
				return false
			})
		}
	})
}

function getnews() {
	$.ajax({
		type: 'POST',
		url: mulu + 'makelib.php',
		dataType: 'json',
		data: 'xtype=getnews',
		cache: false,
		success: function(m) {
			var mlength = m.length;
			var str = '';
			var str1 = '';
			for (i = 0; i < mlength; i++) {
				str += '' + m[i]['content'] + '<!--<label>[' + m[i]['time'] + ']</label>-->&nbsp;';
				str1 += "<tr><td class='one'>" + (i + 1) + "</td><td class='two'>" + m[i]['time'] + "</td><td class='shree'>" + m[i]['content'] + "</td></tr>"
			}
			$("marquee").html(str);
			setTimeout(getnews, 300000);
			m = null;
			str = null
		}
	})
}

function getma(val) {
	var tmp = new Array();
	for (x = 0; x < mal; x++) {
		if (ma[x]['name'] == val) {
			tmp = ma[x]['ma'];
			break
		}
	}
	var xstr = '';
	for (x = 0; x < tmp.length; x++) {
		var j = tmp[x];
		if (j <= 9) j = '0' + j;
		xstr += "<img src='" + globalpath + "imgs/" + j + ".gif' />"
	}
	return xstr
}

function getma2(val) {
	var tmp = new Array();
	for (x = 0; x < mal; x++) {
		if (ma[x]['name'] == val) {
			tmp = ma[x]['ma'];
			break
		}
	}
	var xstr = '';
	for (x = 0; x < tmp.length; x++) {
		var j = tmp[x];
		if (x != 0) xstr += ',';
		xstr += j
	}
	return xstr
}

function getmas(val) {
	var tmp = new Array();
	for (x = 0; x < mal; x++) {
		if (ma[x]['name'] == val) {
			tmp = ma[x]['ma'];
			break
		}
	}
	var xstr = '';
	for (x = 0; x < tmp.length; x++) {
		var j = tmp[x];
		if (j <= 9) j = '0' + j;
		xstr += "<label style='color:" + color(j) + "'>" + j + "</label>"
	}
	return xstr
}

function page(rcount, psize, func) {
	var pcount, pstr = '';
	pcount = rcount % psize == 0 ? rcount / psize : (rcount - rcount % psize) / psize + 1;
	for (i = 1; i <= pcount; i++) {
		pstr += "<a href='javascript:void(0)' p='" + i + "' ";
		if (i == tpage) pstr += " style='color:red;margin-left:3px;margin-right:3px;' ";
		pstr += " >" + i + "页</a>"
	}
	$("#page").html(pstr);
	$("#page a").click(function() {
		tpage = Number($(this).attr('p'));
		eval(func)();
		return false
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



function loto_zuhe(m,n){
	if(m==n) return 1;
	var tmp = m -n;
	var t1 = 1 ;
	for(i=m;i>n;i--){
	   t1 *= i;
	}
	var t2=1;
	for(i=tmp;i>0;i--){
	   t2 *= i;
	}
	return getResult(t1/t2,0);
}
function color(m) {
	if (in_array(m, ma[7]['ma'])) return "red";
	if (in_array(m, ma[8]['ma'])) return "blue";
	if (in_array(m, ma[9]['ma'])) return "green"
}
