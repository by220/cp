var gatt, time0, time1, settime0, settime1, gntime;
var fastobj;

function myready() {
	$(".smenu td:eq(0)").find("input:first").addClass('click');
	$(".main a:first").addClass('click');
	$(".make").addClass(style + 'tb');
	if ($(".time0").html() != undefined) {
		time0 = Number($(".time0").html());
		if (Math.abs(time0) <= 2) {}
		if (time0 < 0) time0 = 0 - time0;
		time0x();
		setTimeout(getnowtime, 10000)
	}
	if ($(".time1").html() != undefined) {
		time1 = Number($(".time1").html());
		if (Math.abs(time1) <= 2) {}
		if (time1 < 0) time1 = 0 - time1
	}
	var posix = $(".linfo").position();
	$(".sendtb").css('left', posix.left + 2);
	$(".sendtb").css("top", posix.top);
	$(".sendtb").hide();
	$(".updatel").click(function() {
		updatel()
	});
	lib();
	setTimeout(getlast15, 8000);
	setTimeout(getnews, 6000);
	setTimeout(updatel, 10000);
	setTimeout(onefunc, 1000)
}
function onefunc() {
	$("input:button").addClass('btn');
	$(".fastgtb ." + style + "v").show();
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
	$(".big .uinfo").click(function() {
		getuserinfo();
		$("#con").hide();
		$(".con1").show();
		$(".info").show();
		return false
	});
	$(".big .kj").click(function() {
		$("#long").toggle();
		if ($("#long").is(":visible")) {
			longsrc()
		}
		var posi = $(".linfo").position();
		$("#long").css('top', posi.top);
		$("#long").css('left', posi.left + 238)
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
		$(".main li").removeClass('menus');
		$(".main li").removeClass('menusa');
		$(".main li").addClass('menus');
		$(this).addClass('menusa');
		$(".main a").removeClass('click');
		$(this).find("a").addClass('click');
		lib();
		return false
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
	$(".fast .fastclose").click(function() {
		var fastje = 0;
		$.ajax({
			type: 'POST',
			cache: false,
			url: mulu + 'userinfo.php',
			data: "xtype=changefastje&fastje=" + fastje,
			success: function(m) {
				if (Number(m) == 1) {
					alert("可以在《会员资料》->快速金额->开启！");
					$(".fast").hide();
					$(".fast .fastflag").val(0)
				}
			}
		})
	});
	$(".fast .fastjeclear").click(function() {
		fastobj.val('')
	});
	$(".fast .fastsend").click(function() {
		var str = '[';
		$(".fast span").each(function(i) {
			if (i > 0) str += ',';
			str += '"' + $(this).html() + '"'
		});
		str += ']';
		$.ajax({
			type: 'POST',
			cache: false,
			url: mulu + 'userinfo.php',
			data: "xtype=fastsend&str=" + str,
			success: function(m) {
				if (Number(m) == 1) {
					alert('ok')
				}
			}
		})
	});
	$(".fast .fastclose2").click(function() {
		$(".fast").hide();
		fastobj.focus()
	});
	$(".fast .fastadd").click(function() {
		var je = $(".fast .fastje").val();
		if (Number(je) == NaN | je == '' | je % 1 != 0 | Number(je) > 999999) {
			alert("请输入正确金额 ,不能有小数点,且最多只能六位数");
			return false
		}
		$(".fast td").append("<span>" + je + "</span>");
		$(".fast span").unbind("click");
		$(".fast span").click(function() {
			fastobj.val($(this).html());
			fastobj.addClass('byellow');
			$(".fast").hide();
			return false
		})
	});
	$(".fast span").click(function() {
		fastobj.val($(this).html());
		fastobj.addClass('byellow');
		$(".fast").hide();
		return false
	});
	$(".fast .fastdel").click(function() {
		$(".fast span:last").remove();
		return false
	});
	$(".closelast15").click(function() {
		if ($(this).val() == '关') {
			$(this).val("开");
			$(".last15 tr").hide();
			$(".last15 tr:first").show()
		} else {
			$(this).val("关");
			$(".last15 tr").show()
		}
	});
	$(".tz a").click(function() {
		var val = $(this).html();
		var tmp = new Array();
		for (x = 0; x < mal; x++) {
			if (ma[x]['name'] == val) {
				tmp = ma[x]['ma'];
				break
			}
		}
		var flag = true;
		$(".make input.byellow").each(function(i) {
			var val = Number($(this).parent().parent().find(".f").attr('mname'));
			if (in_array(val, tmp)) {
				flag = false
			}
		});
		if (!flag) {
			$(".cancel:first").click()
		}
		var tl = tmp.length;
		$(".make .f").each(function() {
			var val = Number($(this).attr('mname'));
			if (in_array(val, tmp)) {
				$(this).parent().find("input:text").addClass("byellow")
			}
		});
		return false
	});
	$(".send").click(function() {
		var val = Number($(".sendje").val());
		if (val % 1 != 0 | val == 0) {
			alert("金额最小1元");
			return false
		}
		if (val > 9999999) {
			alert("金额最大9999999元");
			return false
		}
		$(".make .byellow").val(val);
		return false
	});
	$(".cancel").click(function() {
		$("input:text").val('');
		$("input:checkbox").attr('checked', false);
		$("td").removeClass('byellow');
		$("td").removeClass('bhei');
		$("input:text").removeClass('byellow');
		$("a").removeClass('byellow')
	});
	$(".smenu input.ab").click(function() {
		$(".smenu input.ab").removeClass('click');
		$(this).addClass('click');
		lib();
		return false
	});
	$(".abcd").change(function() {
		lib()
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
		var name = $(".main a.click").html();
		exe();
		return false
	});
	$(".fastg").click(function() {
		if ($(this).val() == "勾选") {
			$(".make input:text").hide();
			$(".make input:checkbox").show();
			$(".fastg").val('快速')
		} else {
			$(".make input:text").show();
			$(".make input:checkbox").hide();
			$(".fastg").val('勾选')
		}
	});
	$(".fastgje").blur(function() {
		$(".fastgje").val($(this).val())
	});
	$(".fastgtb .fastv").click(function() {
		var vname = $(this).val();
		var bname = $(".main a.click").html();
		$(".make input:text").removeClass('byellow');
		if (isNaN(Number(vname))) {
			$(".make .m").each(function() {
				var pid = $(this).attr('pid');
				var name = Number($(this).html());
				if (in_array(name, getm(vname))) {
					$(".i" + pid).find("input:text").addClass('byellow')
				}
			})
		} else {
			$(".make .m").each(function() {
				var pid = $(this).attr('pid');
				var name = Number($(this).html());
				if (name == Number(vname)) {
					$(".i" + pid).find("input:text").addClass('byellow')
				}
			})
		}
	});
	$(".fastgsend").click(function() {
		var je = $(".fastgje").val();
		if (isNaN(Number(je)) | Number(je) % 1 != 0 | Number(je) == 0) {
			alert("请输入正确的金额！");
			return false
		}
		if ($(".fastg").val() == '勾选') {
			$(".make input.byellow").val(je)
		} else {
			$(".make input:checkbox").each(function() {
				if ($(this).prop("checked") == true) {
					$(this).parent().find("input:text").val(je)
				}
			});
			$(".exe").click()
		}
	});
	$(".game2 label").click(function() {
		window.location.href = "make.php?xtype=show&gids=" + $(this).attr('gid');
		return
	});
	longfunc()
}
function updatel() {
	var m1 = $(".trhm td:eq(1)").html();
	if(ngid==107){
	    m1 = $(".trhm td:eq(1)").attr('m1');
	}
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		cache: false,
		data: "xtype=updatel&qishu=" + $(".trhm:first").attr('qs') + "&m1=" + m1,
		success: function(m) {
			m = m.split('|||||');
			if (m[0] != 'A') {
				$(".longldiv").html(m[0]);
				$(".longr tr").each(function(i) {
					if (i > 1) $(this).remove()
				});
				$(".longr").html("<tbody>" + m[1] + "</tbody>");
				longfunc();
				$(".longldiv").hide('fast');
				$(".longldiv").show('fast');
				$(".longr").hide('fast');
				$(".longr").show('fast');
				$(".longrth").addClass(style);
				getusermoney()
			}
		}
	});
	setTimeout(updatel, 12000)
}
function longsrc() {
	if (document.frames) {
		document.all["long"].src = "long.php?xtype=show"
	} else {
		document.getElementById("long").contentWindow.location.href = "long.php?xtype=show"
	}
}
function longfunc() {
	var sqishu = $(".longltb .trhm:first").attr('qs');
	var skj='';
	if(ngid=='107'){
	    skj = sqishu+" 期开奖:";
		$(".longltb .trhm:first").find("td").each(function(i){
			if(i>0){
	           skj += $(this).html();
			}
		});
		$("td.skj").html(skj);
	    $("td.skj img").removeClass('imgsmall');
	}else if(ngid=='101' | ngid=='111' | ngid=='113' | ngid=='115'){
		skj = "<label class=qius ><strong>"+sqishu+"</strong> 期开奖:</label>";
		$(".longltb .trhm:first").find("td").each(function(i){
			if(i>0){
	           skj += "<label class='qiu101'> " +$(this).html() +"</label>";
			}
		});
		$("td.skj").html(skj);
	    $("td.skj img").removeClass('imgsmall');
	}else if(ngid=='103' | ngid=='133' | ngid=='135'){
	    skj = "<label class=qius ><strong>"+sqishu+"</strong>  期开奖:</label>";
		$(".longltb .trhm:first").find("td").each(function(i){
			if(i>0){
	           if(Number($(this).html())>=19){
			       skj += "<label class='qiu1031'> " +$(this).html() +"</label>";
			   }else{
			       skj += "<label class='qiu1032'> " +$(this).html() +"</label>";   
			   }
			}
		});
		$("td.skj").html(skj);
	    $("td.skj img").removeClass('imgsmall');
	}else{
	    skj = sqishu+" 期开奖:";
		$(".longltb .trhm:first").find("td").each(function(i){
			if(i>0){
	           skj += $(this).html();
			}
		});
		$("td.skj").html(skj);
	    $("td.skj img").removeClass('imgsmall');
	}
	
	
	$(".longr input[name='longfs']").unbind('click');
	$(".longr input[name='longfs']").click(function() {
		if ($(this).val() == '1') {
			$(".longr tr.buz").show();
			$(".longr tr.zz").hide()
		} else {
			$(".longr tr.buz").hide();
			$(".longr tr.zz").show()
		}
	});
	$(".longl .tem").unbind('click');
	$(".longl .tem").click(function() {
		$(".longltb tr").each(function() {
			if (!$(this).hasClass('bt')) $(this).hide()
		});
		$(".tem").removeClass('click');
		$(this).addClass('click');
		var val = $(this).val();
		switch (val) {
		case '号码':
			$(".longltb .trhm").show();
			break;
		case '单双':
			$(".longltb .trds").show();
			break;
		case '大小':
			$(".longltb .trdx").show();
			break;
		case '质合':
			$(".longltb .trzh").show();
			break;
		case '合单双':
			$(".longltb .trhds").show();
			break;
		case '尾大小':
			$(".longltb .trwdx").show();
			break;
		case '方位':
			$(".longltb .trfw").show();
			break;
		case '五行':
			$(".longltb .trwh").show();
			break;
		case '四季':
			$(".longltb .trsj").show();
			break;
		case '中发白':
			$(".longltb .trzfb").show();
			break
		}
	});
	$(".longltb td").each(function(i) {
		var val = $(this).html();
		switch (val) {
		case '19':
			$(this).addClass('red');
			break;
		case '20':
			$(this).addClass('red');
			break;
		case '单':
			$(this).addClass('red');
			break;
		case '双':
			$(this).addClass('lv');
			break;
		case '大':
			$(this).addClass('red');
			break;
		case '小':
			$(this).addClass('lv');
			break;
		case '合单':
			$(this).addClass('red');
			break;
		case '合双':
			$(this).addClass('lv');
			break;
		case '质':
			$(this).addClass('red');
			break;
		case '合':
			$(this).addClass('lv');
			break;
		case '尾大':
			$(this).addClass('red');
			break;
		case '尾小':
			$(this).addClass('lv');
			break;
		case '东':
			$(this).addClass('red');
			break;
		case '南':
			$(this).addClass('lv');
			break;
		case '西':
			$(this).addClass('blue');
			break;
		case '北':
			$(this).addClass('orange');
			break;
		case '春':
			$(this).addClass('red');
			break;
		case '夏':
			$(this).addClass('lv');
			break;
		case '秋':
			$(this).addClass('blue');
			break;
		case '冬':
			$(this).addClass('orange');
			break;
		case '中':
			$(this).addClass('red');
			break;
		case '发':
			$(this).addClass('lv');
			break;
		case '白':
			$(this).addClass('blue');
			break;
		case '金':
			$(this).addClass('red');
			break;
		case '木':
			$(this).addClass('lv');
			break;
		case '水':
			$(this).addClass('blue');
			break;
		case '火':
			$(this).addClass('orange');
			break;
		case '土':
			$(this).addClass('zi');
			break
		}
	})
}
function getm(val) {
	if (ngid == 101 | ngid == 111 | ngid == 113 | ngid == 115 | ngid == 108 | ngid == 109 | ngid == 110 | ngid == 112 ) ngid = 101;
	if (ngid == 121 | ngid == 123 | ngid == 125 | ngid == 127 | ngid == 129 ) ngid = 105;
	if (ngid == 103 | ngid == 133 | ngid == 135 | ngid == 131 | ngid == 132 | ngid == 136) ngid = 103;
	var sl = sma['g' + ngid].length;
	for (i = 0; i < sl; i++) {
		if (val == sma['g' + ngid][i]['name']) {
			return sma['g' + ngid][i]['ma']
		}
	}
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
	var i = 0;
	var f = true;
	var classx = '';
	var bname = $(".main a.click").html();
	var sname;
	var cname;
	$(".make input:text").each(function() {
		if (Number($(this).val()) % 1 == 0 & $(this).val() != 0) {
			play[i] = new Array();
			play[i]['pid'] = $(this).parent().attr('pid');
			play[i]['je'] = $(this).val();
			play[i]['name'] = $(".p" + play[i]['pid']).attr('mname');
			if (Number($(this).val()) > Number($(".p" + play[i]['pid']).attr('maxje'))) {
				alert("<" + play[i]['name'] + ">单注最大金额：" + $(".p" + play[i]['pid']).attr('maxje'));
				return;
				f = false
			}
			if (Number($(this).val()) < Number($(".p" + play[i]['pid']).attr('minje'))) {
				alert("<" + play[i]['name'] + ">单注最小金额：" + $(".p" + play[i]['pid']).attr('minje'));
				return;
				f = false
			}
			play[i]['peilv1'] = $(".p" + play[i]['pid']).find(".peilv1").html();
			sname = $(this).parent().parent().parent().parent().find(".sname").html();
			cname = $(this).parent().parent().parent().parent().find(".cname").html();
			if (bname == "主盘势" | bname == "双面盘口") {
				sname = $(this).parent().parent().find(".bt").html();
				if (sname == null | sname == 'null') sname = $(this).parent().parent().parent().find(".bt").html();
				play[i]['classx'] = sname + ":"
			} else if (sname != undefined & sname != 'null' & cname != undefined & cname != 'null') {
				play[i]['classx'] = sname + ":" + cname
			} else if (sname == undefined & cname == undefined) {
				var cname = $(".smenu td:eq(0)").find("input.click").val();
				play[i]['classx'] = bname
			} else {
				if (sname == undefined & sname == null & cname == undefined & cname == null) {
					cname = $(this).parent().parent().parent().find(".sname").html();
					play[i]['classx'] = cname
				} else if (sname != undefined | sname != null) {
					play[i]['classx'] = sname
				} else if (cname != undefined | cname != null) {
					play[i]['classx'] = bname + '-' + cname
				}
			}
			play[i]['con'] = '';
			play[i]['bz'] = '';
			i++
		}
	});
	if (!f) return false;
	if (i == 0) return false;
	var str = '';
	var classx = $(".smenu td:eq(0)").find('input.click').val();
	var classidx = $(".smenu td:eq(0)").find('input.click').attr('ab');
	var je = 0;
	for (j = 0; j < i; j++) {
		play[j]['class'] = classidx;
		str += "<tr pid='" + play[j]['pid'] + "' content='' class='cg" + play[j]['pid'] + "'>";
		str += "<td>" + (j + 1) + "</td>";
		str += "<td>" + play[j]['classx'] + ' <label class=red>' + play[j]['name'] + "</label></td>";
		str += "<td style='color:#cc3300'>" + play[j]['peilv1'];
		str += "</td>";
		str += "<td>" + play[j]['je'] + "</td>";
		str += "</tr>";
		je += Number(play[j]['je'])
	}
	$(".sendtb").show();
	$(".sendtb tr").each(function(i) {
		if (i != 1) $(this).remove()
	});
	$(".sendtb").prepend("<tr><td colspan=4><input type='button' class='goon btn3 btnf hide' value='继续下注' /><input type='button' class='qr btn3 btnf' value='确认投|注' /><input type='button' class='cancel btn1 btnf' value='关闭' style='margin-left:10px;' /></td></tr>");
	$(".sendtb").append(str);
	$(".sendtb").append("<tr><th>合计</th><td colspan=2></td><th>" + je + "</th></tr>");
	$(".sendtb").append("<tr><td colspan=4><input type='button' class='goon btn3 btnf hide' value='继续下注' /><input type='button' class='qr btn3 btnf' value='确认投|注' /><input type='button' class='cancel btn1 btnf' value='关闭' style='margin-left:10px;' /></td></tr>");
	$(".sendtb").append("<tr><td style='height:300px;' colspan=4></td></tr>");
	str = null;
	psend = play;
	play = null;
	addfunc2();
	$(".sendtb input:button").addClass("btn2 btnf");
	var edu = Number($(".uinfo td:eq(1)").html()) - Number($(".uinfo td:eq(2)").html());
	if (edu < je) {
		alert("您的投金额已超出可用余额");
		$(".sendtb .qr").attr('disabled', true)
	}
}

var errflag;

function addfunc2() {
	$(".sendtb .cancel").click(function() {
		$(".sendtb").hide();
		return false
	});
	$(".sendtb .print").click(function() {
		tzprint();
		return false
	});
	$(".sendtb .qr").click(function() {
		$(".sendtb input:button").attr("disabled", true);
		var pstr = '[';
		for (i = 0; i < psend.length; i++) {
			if (i != 0) pstr += ',';
			pstr += json_encode_js(psend[i])
		}
		pstr += ']';
		var abcd = $(".smenu select").val();
		var ab = $(".smenu td:eq(1)").find(".click").attr("ab");
		var bid = $(".main a.click").attr("bid");
		if (abcd == undefined | abcd == 'undefined') abcd = $(".smenu input[name='abcd']").val();
		var str = "&abcd=" + abcd + "&ab=" + ab + "&bid=" + bid;
		$.ajax({
			type: 'POST',
			url: mulu + 'makelib.php',
			data: 'xtype=makefast&pstr=' + pstr + str,
			dataType: 'json',
			cache: false,
			success: function(m) {
				var ml = m.length;
				var gflag = false;
				var bflag = false;
				var errstr = "";
				for (i = 0; i < ml; i++) {
					if (Number(m[i]['cg']) == 1) {
						if ($(".sendtb .cg" + m[i]['pid'] + '_' + i).html() == null) {
							$(".sendtb .cg" + m[i]['pid']).find("td:eq(0)").html("成功!");
							$(".sendtb .cg" + m[i]['pid']).find("td:eq(0)").addClass("lv");
							$(".sendtb .cg" + m[i]['pid']).find("td:eq(2)").html(m[i]['peilv1'])
						} else {
							$(".sendtb .cg" + m[i]['pid'] + '_' + i).find("td:eq(0)").html("成功!");
							$(".sendtb .cg" + m[i]['pid'] + '_' + i).find("td:eq(0)").addClass("lv");
							$(".sendtb .cg" + m[i]['pid'] + '_' + i).find("td:eq(2)").html(m[i]['peilv1'])
						}
					} else {
						if ($(".sendtb .cg" + m[i]['pid'] + '_' + i).html() == null) {
							$(".sendtb .cg" + m[i]['pid']).find("td:eq(0)").html(m[i]['err']);
							$(".sendtb .cg" + m[i]['pid']).find("td:eq(0)").addClass("red");
							$(".sendtb .cg" + m[i]['pid']).find("td:eq(2)").html(m[i]['peilv1'])
						} else {
							$(".sendtb .cg" + m[i]['pid'] + '_' + i).find("td:eq(0)").html(m[i]['err']);
							$(".sendtb .cg" + m[i]['pid'] + '_' + i).find("td:eq(0)").addClass("red");
							$(".sendtb .cg" + m[i]['pid'] + '_' + i).find("td:eq(2)").html(m[i]['peilv1'])
						}
					}
				}
				$(".cancel:first").click();
				$(".sendtb .print").show();
				$(".sendtb .qr").hide();
				$(".sendtb input:button").attr("disabled", false);
				getlast15();
				getusermoney()
			}
		});
		return false
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
			$(".uinfo .qishu").html(m[4]);
			$(".synow").html(m[5]);
		}
	})
}
function getlast15() {
	$.ajax({
		type: 'POST',
		url: mulu + 'makelib.php',
		data: 'xtype=getlast15',
		dataType: 'json',
		cache: false,
		success: function(m) {
			var ml = m.length;
			var str = '';
			var name = '';
			$(".last15 tr").each(function(i) {
				if (i > 1) $(this).remove()
			});
			for (i = 0; i < ml; i++) {
				str += "<tr>";
				name = m[i]['name'].slice(-8);
				name =m[i]['name'].substr(0,8);
				str += "<td>" + m[i]['qishu'] + "</td>";
				if (name == m[i]['name']) {
					str += "<td>" + m[i]['name'] + "</td>"
				} else {
					str += "<td title='" + m[i]['name'] + "'>" + name + "..</td>"
				}
				str += "<td class=red>" + m[i]['peilv1'];
				if (Number(m[i]['peilv2']) >= 10) {
					str += "/" + m[i]['peilv2']
				}
				str += "</td>";
				str += "<td>" + m[i]['je'] + "</td>";
				str += "<td>" + m[i]['time'] + "</td>";
				str += "</tr>"
			}
			$(".last15").append(str)
		}
	})
}
function getc(bid, bname) {
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=getc&bid=' + bid,
		success: function(m) {
			var ml = m.length;
			$(".smenu td:eq(0)").find("input").remove();
			var str = '';
			for (i = 0; i < ml; i++) {
				str += "<input type=\"button\"  class=\"btn2 btnf sc button\" cid=\"" + m[i]['cid'] + "\" value=\"" + m[i]['name'] + "\" >"
			}
			$(".smenu td:eq(0)").prepend(str);
			str = null;
			m = null;
			$(".smenu input:eq(0)").addClass('click');
			if (bname == '3字和数') {
				libd()
			} else {
				libc();
				$(".smenu td:eq(0)").find("input").click(function() {
					$(".smenu td:eq(0) input").removeClass('click');
					$(this).addClass('click');
					libc();
					return false
				})
			}
		}
	})
}
function gets(bid, bname) {
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=gets&bid=' + bid,
		success: function(m) {
			var ml = m.length;
			$(".smenu td:eq(0)").find("input").remove();
			var str = '';
			for (i = 0; i < ml; i++) {
				str += "<input type=\"button\"  class=\"btn2 btnf sc button\" sid=\"" + m[i]['sid'] + "\" value=\"" + m[i]['name'] + "\" >"
			}
			$(".smenu td:eq(0)").prepend(str);
			str = null;
			m = null;
			$(".smenu input:eq(0)").addClass('click');
			if (bname == '3字和数') {
				libb();
				$(".smenu td:eq(0)").find("input").click(function() {
					$(".smenu td:eq(0) input").removeClass('click');
					$(this).addClass('click');
					libb();
					return false
				})
			} else if (bname == '总和龙虎') {
				libb();
				$(".smenu td:eq(0)").find("input").click(function() {
					$(".smenu td:eq(0) input").removeClass('click');
					$(this).addClass('click');
					libb();
					return false
				})
			} else if (bname == '其他') {
				libe();
				$(".smenu td:eq(0)").find("input").click(function() {
					$(".smenu td:eq(0) input").removeClass('click');
					$(this).addClass('click');
					libe();
					return false
				})
			} else {
				libd2()
			}
		}
	})
}
function scclick() {
	$(".smenu td:eq(0)").find("input").click(function() {
		$(".smenu td:eq(0) input").removeClass('click');
		$(this).addClass('click');
		lib();
		return false
	})
}
function lib() {
	$("#con").show();
	$(".con1").empty();
	$(".con1").hide();
	$("#long").hide();
	$(".info").show();
	var bid = $(".main a.click").attr("bid");
	var name = $(".main a.click").html();
	$(".make").hide();
	$(".make").empty();
	$(".smenu td:first").empty();
	$(".sandingwei").hide();
	$(".fastg").val("勾选");
	$(".tu").hide();
	if (name == '主盘势') {
		libsm(1)
	} else if (name == '双面盘口') {
		libsm(2)
	} else if (name == '1~5') {
		liba()
	} else if (name == "1字组合") {
		libb()
	} else if (name == "2字定位") {
		getc(bid, name)
	} else if (name == "2字组选") {
		getc(bid, name)
	} else if (name == "2字和数") {
		liba()
	} else if (name == "3字定位") {
		$(".sandingwei").show();
		getc(bid, name)
	} else if (name == "3字组选") {
		getc(bid, name)
	} else if (name == "3字和数") {
		gets(bid, name)
	} else if (name == "总和龙虎") {
		gets(bid, name)
	} else if (name == "组选3") {
		getc(bid, name)
	} else if (name == "组选6") {
		getc(bid, name)
	} else if (name == '跨度') {
		libb()
	} else if (name == '其他') {
		gets(bid, name)
	} else {
		if (($(".game").val() == '103' | $(".game").val() == '133' | $(".game").val() == '135') & (name.indexOf("球") != -1 | name == '特别号')) {
			gets(bid, name)
		} else if (ngid = 107) {
			gets(bid, name)
		} else if (name == '一中一') {
			getc(bid, name)
		} else {
			libb()
		}
	}
}
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
				$("f").attr('disabled', true)
			} else {
				$(".exe").attr('disabled', false)
			}
		}
	})
}
function getatt() {
	var abcd = $(".smenu select").val();
	if (abcd == undefined | abcd == 'undefined') abcd = $(".smenu input[name='abcd']").val();
	var ab = $(".smenu td:eq(1)").find(".click").attr("ab");
	var gid = $(".game").val();
	$.ajax({
		type: 'POST',
		url: mulu + 'makelib.php',
		data: 'xtype=getatt&abcd=' + abcd + "&ab=" + ab + "&gid=" + gid,
		dataType: 'json',
		cache: false,
		success: function(m) {
			var ml = m.length;
			if (ml >= 1) {
				bofang()
			}
			var i = 0;
			for (; i < ml; i++) {
				$("td.p" + m[i]['pid']).find("label.peilv1").html(m[i]['peilv1']);
				$("td.p" + m[i]['pid']).removeClass('byellow');
				$("td.p" + m[i]['pid']).addClass('byellow')
			}
			if (i != 0) {
				setTimeout(function() {
					$('.make td.byellow').removeClass('byellow')
				}, 10000)
			}
			clearTimeout(gatt);
			gatt = setTimeout(getatt, 3000)
		}
	})
}
function bofang() {
	if (document.frames) {
		document.all["sfrm"].src = globalpath + "js/alarm.html"
	} else {
		document.getElementById("sfrm").contentWindow.location.href = globalpath + "js/alarm.html"
	}
}
var stra = "<table class='wd100 makehead'><tr><Th class=f>NO</th><th class=s>赔率</th><Th class=t>金额</th></tr></table>";
var strb = "<tr><Th>项目</th><th>赔率</th><th>号码</th><Th>金额</th></tr>";
var strc = "<tr><Th>项目</th><th class=h40>赔率</th><Th>选择</th></tr>";

function libsm(smtype) {
	var ab = $(".smenu td:eq(1)").find(".click").attr("ab");
	var bid = $(".main a.click").attr("bid");
	var abcd = $(".smenu select").val();
	if (abcd == undefined | abcd == 'undefined') abcd = $(".smenu input[name='abcd']").val();
	var sc = $(".smenu td:eq(0)").find('input.click').attr('cid');
	var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&sc=" + sc + "&smtype=" + smtype;
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=lib&stype=sm' + sstr,
		success: function(m) {
			var ml = m.length;
			var str = "<tr><td><table class='wd100 tinfo'><tr>";
			var libtha = "<tr><td class=f>项目</td><td class=s>赔率</td><td class=t>金额</td><td class=f>项目</td><td class=s>赔率</td><td class=t>金额</td><td class=f>项目</td><td class=s>赔率</td><td class=t>金额</td><td class=f>项目</td><td class=s>赔率</td><td class=t>金额</td><td class=f>项目</td><td class=s>赔率</td><td class=t>金额</td></tr>";
			var sname = '';
			var j = 0;
			var bid = m[0]['bid'];
			var sid = m[0]['sid'];
			str += "<td></td>";
			var name = '';
			for (i = 0; i < ml; i++) {
				if (m[i]['sid'] != sid) break;
				str += "<th colspan=2 >" + m[i]['name'] + "</th>"
			}
			str += "</tr>";
			for (i = 0; i < ml; i++) {
				if (m[i]['ftype'] == '0') {
					if (sname != m[i]['sname']) {
						if (sname != '') str += "</tr>";
						if (m[i]['sname'] == '第一球') {
							name = '万 OXXXX'
						} else if (m[i]['sname'] == '第二球') {
							name = '千 XOXXX'
						} else if (m[i]['sname'] == '第三球') {
							name = '百 XXOXX'
						} else if (m[i]['sname'] == '第四球') {
							name = '十 XXXOX'
						} else if (m[i]['sname'] == '第五球') {
							name = '个 XXXXO'
						} else {
							name = m[i]['sname']
						}
						str += "<tr><th  class='bt sname chu'>" + name + "</th>"
					}
					if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
					str += "<th class='hide over f m m" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "'   >" + m[i]['name'] + "</th>";
					str += "<td class='over s p p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + m[i]['peilv1'] + "</label></td>";
					if (Number(m[i]['ifok']) == 1) str += "<TD class='over t i" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "' style='text-align:center'><input type='text'  class='in' /><input type='checkbox' class='hide in' /></td>";
					else str += "<TD class='t'>封盘</td>"
				} else {
					if (j % 5 == 0) {
						if (j == 0) str += "</tr></table><BR /><table class='tinfo wd100' ><tr><th class='bt cname' colspan=15>" + m[i]['cname'] + "</th></tr>" + libtha + "<tr>";
						else str += "</tr><tr>"
					}
					if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
					str += "<th class='over f m m" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "'   >" + m[i]['name'] + "</th>";
					str += "<td class='over s p p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + m[i]['peilv1'] + "</label></td>";
					if (Number(m[i]['ifok']) == 1) str += "<TD class='over t i" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "' style='text-align:center'><input type='text'  class='in' /><input type='checkbox' class='hide in' /></td>";
					else str += "<TD class='t'>封盘</td>";
					j++
				}
				sname = m[i]['sname']
			}
			str += "</tr></table></td></tr>";
			$(".make").html("<tbody>" + str + "</tbody>");
			$(".make input:text").css("width", 33);
			$(".make").show();
			$(".make td").attr("valign", 'top');
			str = null;
			m = null;
			addfunc()
		}
	})
}
function libsm2() {
	var ab = $(".smenu td:eq(1)").find(".click").attr("ab");
	var bid = $(".main a.click").attr("bid");
	var abcd = $(".smenu select").val();
	if (abcd == undefined | abcd == 'undefined') abcd = $(".smenu input[name='abcd']").val();
	var sc = $(".smenu td:eq(0)").find('input.click').attr('cid');
	var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&sc=" + sc;
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=lib&stype=sm' + sstr,
		success: function(m) {
			var ml = m.length;
			var str = "<tr>";
			var libtha = "<tr><Th class=f>项目</th><th class=s>赔率</th><Th class=t>金额</th></tr>";
			var sname = '';
			var j = 0;
			for (i = 0; i < ml; i++) {
				if (sname != m[i]['sname']) {
					if (sname != '') str += "</table></td>";
					if (j % 5 == 0 & sname != '') str += "</tr><tr><td colspan=5 style='height:10px;' ></td></tr><tr>";
					str += "<TD valign=top>";
					str += "<table class='tinfo wd100'><tr><th colspan=3 class='bt sname'>" + m[i]['sname'] + "</th></tr>";
					j++
				}
				str += "<tr>";
				if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
				str += "<th class='over f m m" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "'  >" + m[i]['name'] + "</th>";
				str += "<td class='over s p p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + m[i]['peilv1'] + "</label></td>";
				if (Number(m[i]['ifok']) == 1) str += "<TD class='over t i" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "' style='text-align:center'><input type='text'  class='in' /><input type='checkbox' class='hide in' /></td>";
				else str += "<TD class='t'>封盘</td>";
				str += "</tr>";
				sname = m[i]['sname']
			}
			str += "</table></td></tr>";
			$(".make").html("<tbody>" + str + "</tbody>");
			$(".make").show();
			$(".make td").attr("valign", 'top');
			str = null;
			m = null;
			addfunc()
		}
	})
}
function liba() {
	var ab = $(".smenu td:eq(1)").find(".click").attr("ab");
	var bid = $(".main a.click").attr("bid");
	var abcd = $(".smenu select").val();
	if (abcd == undefined | abcd == 'undefined') abcd = $(".smenu input[name='abcd']").val();
	var sc = $(".smenu td:eq(0)").find('input.click').attr('cid');
	var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&sc=" + sc;
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=lib&stype=a' + sstr,
		success: function(m) {
			var ml = m.length;
			var str = "<tr>";
			var libtha = "<tr><Th class=f>项目</th><th class=s>赔率</th><Th class=t>金额</th></tr>";
			var sname = '';
			var j = 0;
			for (i = 0; i < ml; i++) {
				if (sname != m[i]['sname']) {
					if (sname != '') str += "</table></td>";
					if (j % 5 == 0 & sname != '') str += "</tr><tr>";
					str += "<TD valign=top><table class='tinfo wd100'><tr><th colspan=3 class='bt sname'>" + m[i]['sname'] + "</th></tr>";
					str += libtha;
					j++
				}
				str += "<tr>";
				if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
				str += "<th class='over f m m" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "'  >" + m[i]['name'] + "</th>";
				str += "<td class='over s p p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + m[i]['peilv1'] + "</label></td>";
				if (Number(m[i]['ifok']) == 1) str += "<TD class='over t i" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "' style='text-align:center'><input type='text'  class='in' /><input type='checkbox' class='hide in' /></td>";
				else str += "<TD class='t'>封盘</td>";
				str += "</tr>";
				sname = m[i]['sname']
			}
			str += "</table></td></tr>";
			$(".make").html("<tbody>" + str + "</tbody>");
			$(".make").show();
			$(".make td").attr("valign", 'top');
			str = null;
			m = null;
			addfunc()
		}
	})
}
function libd() {
	var ab = $(".smenu td:eq(1)").find(".click").attr("ab");
	var bid = $(".main a.click").attr("bid");
	var abcd = $(".smenu select").val();
	if (abcd == undefined | abcd == 'undefined') abcd = $(".smenu input[name='abcd']").val();
	var sid = $(".smenu td:eq(0)").find('input.click').attr('sid');
	var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&sid=" + sid;
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=lib&stype=d' + sstr,
		success: function(m) {
			var libtha = "<tr><Th class=f>项目</th><th class=s>赔率</th><Th class=t>金额</th></tr>";
			var ml = m.length;
			var str = "<tr><td>";
			var cname = '';
			var left1cname = '';
			var sid = 0;
			var cid = 0;
			var j = 0;
			var ftype = 100;
			var z = 0;
			for (i = 0; i < ml; i++) {
				if (left1cname != m[i]['cname'].substr(0, 1)) {
					if (left1cname != '') {
						if (j != 4) {
							for (u = j; u < 4; u++, j++) {
								str += "<th class='f1'>&nbsp;</th><td class='s1'>&nbsp;</td><td class='t1'>&nbsp;</td>"
							}
						}
						str += "</tr></table>"
					}
					str += "<table class='wd100 tinfo'><Tr><th rowspan=5 class='bt bt2 cname'>" + m[i].cname + "</th>";
					j = 0
				}
				if (ftype != m[i]['ftype'] & ftype != 100) {
					if (j != 0) {
						for (u = j; u < 4; u++, j++) {
							str += "<th class='f1 f2'>&nbsp;</th><td class='s1 p2'>&nbsp;</td><td class='t1 t2'>&nbsp;</td>"
						}
					}
				}
				if (j == 4) {
					str += "</tr><tr>";
					j = 0
				}
				if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
				str += "<th class='over f1 m m2 m" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "'  >" + m[i]['name'] + "</th>";
				str += "<td class='over s1 p p2 p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + m[i]['peilv1'] + "</label></td>";
				if (Number(m[i]['ifok']) == 1) str += "<TD class='over t1 t2 i" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "'><input type='text' class='in'   /><input type='checkbox' class='hide in' /></td>";
				else str += "<TD class='t1 t2'>封盘</td>";
				ftype = m[i]['ftype'];
				left1cname = m[i].cname.substr(0, 1);
				sid = Number(m[i]['sid']);
				cid = Number(m[i]['cid']);
				j++
			}
			if (j != 4) {
				for (u = j; u < 4; u++) {}
			}
			str += "</tr></table></td></tr>";
			$(".make").html("<tbody>" + str + "</tbody>");
			$(".make").show();
			tu(m[0]['tu']);
			str = null;
			m = null;
			addfunc()
		}
	})
}
function tu(tu) {
	var tl = tu.length;
	if (tl == 0) return;
	$(".tu").show();
	$(".tu th").empty();
	$(".tu td").empty();
	var str = '';
	var kl;
	var tmp = '';
	var c = 0;
	$(".tu td").append("<span>");
	for (i = 0; i < tl; i++) {
		$(".tu th").append("<div cid='" + tu[i]['cid'] + "'>" + tu[i]['cname'] + "</div>");
		kl = tu[i]['c' + tu[i]['cid']].length;
		c = 0;
		for (j = 0; j < kl; j++) {
			if (tmp != tu[i]['c' + tu[i]['cid']][j]) {
				if (j != 0) str += '</div>'
				str += "<div class='c" + tu[i]['cid'] + " hide ";
				if (c % 2 == 0) str += "red";
				str += "'>" + tu[i]['c' + tu[i]['cid']][j] + "<br />";
				c++
			} else {
				str += tu[i]['c' + tu[i]['cid']][j] + "<br />"
			}
			tmp = tu[i]['c' + tu[i]['cid']][j];
			if (c == 25) break
		}
		str += "</div>"
	}
	$(".tu td").html("<span>" + str + "</span>");
	str = null;
	$(".tu div:first").addClass('click');
	$(".tu .c" + tu[0]['cid']).show();
	$(".tu th div").click(function() {
		$(".tu th div").removeClass('click');
		$(".tu td").find("div").hide();
		var cid = $(this).attr('cid');
		$(".tu td").find(".c" + cid).show();
		$(this).addClass('click')
	})
}
function libd2() {
	var ab = $(".smenu td:eq(1)").find(".click").attr("ab");
	var bid = $(".main a.click").attr("bid");
	var abcd = $(".smenu select").val();
	if (abcd == undefined | abcd == 'undefined') abcd = $(".smenu input[name='abcd']").val();
	var sid = $(".smenu td:eq(0)").find('input.click').attr('sid');
	var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&sid=" + sid;
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=lib&stype=d' + sstr,
		success: function(m) {
			var libtha = "<tr><Th class=f>项目</th><th class=s>赔率</th><Th class=t>金额</th></tr>";
			var ml = m.length;
			var str = "<tr><td class='wd100'><table class='tinfo wd100'><tr>";
			var cname = '';
			var left1cname = '';
			var sid = 0;
			var cid = 0;
			var j = 0;
			var ftype = 100;
			var z = 0;
			var k = 5;
			for (i = 0; i < ml; i++) {
				if (z % k == 0 & i != 0) {
					if (m[i]['name'] != '土') {
						if (k == 4 & z != 0) {
							str += "<td></tD><td></tD><td></tD>"
						}
						str += "</tr><tr>"
					}
				}
				if (isNaN(Number(m[i]['name'])) & j == 0) {
					str += "</tr><tr><td colspan=15 style='height:10px;'></td></tr><tr>";
					z = 0;
					k = 4;
					j++
				}
				if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
				str += "<th class='over f1 m m2 m" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "'  >" + m[i]['name'] + "</th>";
				str += "<td class='over s1 p p2 p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + m[i]['peilv1'] + "</label></td>";
				if (Number(m[i]['ifok']) == 1) str += "<TD class='over t1 t2 i" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "'><input type='text' class='in'   /><input type='checkbox' class='hide in' /></td>";
				else str += "<TD class='t1 t2'>封盘</td>";
				z++;
				if (m[i]['name'] == '土') {
					z = 0
				}
			}
			str += "</tr></table></td></tr>";
			$(".make").html("<tbody>" + str + "</tbody>");
			$(".make").show();
			tu(m[0]['tu']);
			str = null;
			m = null;
			addfunc()
		}
	})
}
function libe() {
	var ab = $(".smenu td:eq(1)").find(".click").attr("ab");
	var bid = $(".main a.click").attr("bid");
	var abcd = $(".smenu select").val();
	if (abcd == undefined | abcd == 'undefined') abcd = $(".smenu input[name='abcd']").val();
	var sid = $(".smenu td:eq(0)").find('input.click').attr('sid');
	var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&sid=" + sid;
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=lib&stype=d' + sstr,
		success: function(m) {
			var libtha = "<tr><Th class=f>项目</th><th class=s>赔率</th><Th class=t>金额</th></tr>";
			var ml = m.length;
			var str = "<tr><td><table class='tinfo wd100'>";
			var cname = '';
			var left1cname = '';
			var sid = 0;
			var cid = 0;
			var j = 0;
			var ztype = 0;
			for (i = 0; i < ml; i++) {
				if (sid != Number(m[i]['sid'])) {
					if (sid != 0) str += "</tr>";
					str += "<tr><th rowspan=" + 5 + " class='bt bt2 sname'>" + m[i]['sname'] + "</th>";
					left1cname = '';
					j = 0
				}
				if (left1cname != m[i].cname.substr(0, 1)) {
					if (left1cname != '') str += "</tr><tr><th rowspan=2 class='bt bt2 cname'>" + m[i].cname + "</th>";
					else str += "<th rowspan=2 class='bt bt2'>" + m[i].cname + "</th>";
					j = 0
				}
				if (j == 5 & left1cname != '') {
					j = 0;
					str += "</tr><tr>"
				}
				if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
				str += "<th class='over f1 m m" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "'  >" + m[i]['name'] + "</th>";
				str += "<td class='over s1 p p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "' ><label class='peilv1'>" + m[i]['peilv1'] + "</label></td>";
				if (Number(m[i]['ifok']) == 1) str += "<TD class='over t1 i" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' style='text-align:center'><input type='text' class='in' /><input type='checkbox' class='hide in' /></td>";
				else str += "<TD class='t1'>封盘</td>";
				cname = m[i]['cname'];
				left1cname = m[i].cname.substr(0, 1);
				sid = Number(m[i]['sid']);
				cid = Number(m[i]['cid']);
				j++
			}
			str += "</tr></table></td></tr>";
			$(".make").html("<tbody>" + str + "</tbody>");
			$(".make").show();
			$(".make .bt2").css("width", "5%");
			$(".make td").attr("valign", 'top');
			str = null;
			m = null;
			addfunc()
		}
	})
}
function addfunc() {
	$(".make .over").mouseover(function() {
		var pid = $(this).attr('pid');
		$(".make .m" + pid).addClass('makeover');
		$(".make .i" + pid).addClass('makeover');
		$(".make .p" + pid).addClass('makeover')
	}).mouseout(function() {
		var pid = $(this).attr('pid');
		$(".make .m" + pid).removeClass('makeover');
		$(".make .i" + pid).removeClass('makeover');
		$(".make .p" + pid).removeClass('makeover')
	});
	$(".make input:text").attr("maxlength", 7);
	$(".make .p").click(function() {
		var pid = $(this).attr('pid');
		$(".i" + pid).find("input:text").toggleClass('byellow')
	});
	$(".make .m").click(function() {
		var pid = $(this).attr('pid');
		$(".i" + pid).find("input:text").toggleClass('byellow')
	});
	$(".make input:text").click(function() {
		if (Number($(".fast .fastflag").val()) == 0) return false;
		var posi = $(this).position();
		var wd = $(document).width();
		$(".fast").css("top", posi.top + $(this).height() + 3);
		if (posi.left + $(".fast").width() > wd) {
			$(".fast").css("left", posi.left + $(this).width() - $(".fast").width())
		} else {
			$(".fast").css("left", posi.left)
		}
		$(".fast").show();
		fastobj = $(this);
		return false
	});
	$(".make input:text").blur(function() {
		var je = $(this).val();
		if (Number(je) % 1 == 0 & Number(je) != 0) {
			$(this).addClass('byellow')
		}
	});
	var posi = $(".make").position();
	$("#long").css("top", posi.top + $(".make").height() + 10);
	$("#long").css("left", posi.left);
	clearTimeout(gatt);
	gatt = setTimeout(getatt, 3000)
}
function libb() {
	var ab = $(".smenu td:eq(1)").find(".click").attr("ab");
	var bid = $(".main a.click").attr("bid");
	var abcd = $(".smenu select").val();
	if (abcd == undefined | abcd == 'undefined') abcd = $(".smenu input[name='abcd']").val();
	var sc = $(".smenu td:eq(0)").find('input.click').attr('cid');
	var sid = $(".smenu td:eq(0)").find('input.click').attr('sid');
	if (sid == undefined) sid = '';
	var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&sc=" + sc + "&sid=" + sid;
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=lib&stype=b' + sstr,
		success: function(m) {
			var libtha = "<tr><th class='f'>类别</th><th class='s' mname=''>赔率</th><th  class='t'>金额</th></tr>";
			var ml = m.length;
			var str = "<tr>";
			var cname = '';
			var j = 0;
			for (i = 0; i < ml; i++) {
				if (cname != m[i]['cname']) {
					if (cname != '') str += "</table></td>";
					if (j == 4) {
						str += "<tr>";
						j = 0
					}
					str += "<TD valign=top><table class='tinfo wd100'><tr><th colspan=3 class='bt cname'>" + m[i]['cname'] + "</th></tr>";
					str += libtha;
					j++
				}
				str += "<tr>  ";
				if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
				str += "<th class='over f m m" + m[i]['pid'] + "'   pid='" + m[i]['pid'] + "' >" + m[i]['name'] + "</th>";
				str += "<td class='over s p p" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "'  mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + m[i]['peilv1'] + "</label></td>";
				if (Number(m[i]['ifok']) == 1) str += "<TD class='over t i" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "'><input type='text' class='in' /><input type='checkbox' class='hide in' /></td>";
				else str += "<TD class='t'>封盘</td>";
				str += "</tr>";
				cname = m[i]['cname']
			}
			str += "</table></td></tr>";
			$(".make").html("<tbody>" + str + "</tbody>");
			$(".make").show();
			$(".make td").attr("valign", 'top');
			tu(m[0]['tu']);
			str = null;
			strs = null;
			m = null;
			addfunc();
			$(".make input:text").attr("maxlength", 7)
		}
	})
}
function libc() {
	var ab = $(".smenu td:eq(1)").find(".click").attr("ab");
	var bid = $(".main a.click").attr("bid");
	var abcd = $(".smenu select").val();
	if (abcd == undefined | abcd == 'undefined') abcd = $(".smenu input[name='abcd']").val();
	var cid = $(".smenu td:eq(0)").find('input.click').attr('cid');
	var p = $(".sandingwei .click").attr('p');
	var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&cid=" + cid + "&p=" + p;
	$(".make").empty();
	$(".make").hide();
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=lib&stype=c' + sstr,
		success: function(m) {
			var libtha = "<th class='f'>类别</th><th class='s' mname=''>赔率</th><th  class='t'>金额</th>";
			var ml = m.length;
			var str = "<tr><td><table class='wd100 lm tinfo'><tr>";
			$(".make").empty();
			for (i = 0; i < ml; i++) {
				if (i % 5 == 0 & i != 0) {
					str += '</tr><tr>'
				}
				if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
				str += "<th class='over m f2 m" + m[i]['pid'] + "'   pid='" + m[i]['pid'] + "'  >" + m[i]['name'] + "</th>";
				str += "<td  class='over p s2 p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + m[i]['peilv1'] + "</label></td>";
				if (Number(m[i]['ifok']) == 1) str += "<TD class='over t2 i" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "'><input type='text' class='in' /><input type='checkbox' class='hide in' /></td>";
				else str += "<TD class='t2' >封盘</td>"
			}
			str += "</tr></table></td></tr>";
			$(".make").html("<tbody>" + str + "</tbody>");
			$(".make").show();
			$(".make td").attr("valign", 'top');
			str = null;
			strs = null;
			m = null;
			addfunc();
			$(".make input:text").attr("maxlength", 7)
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
		url: mulu + 'kj.php',
		data: 'xtype=show',
		success: function(m) {
			$(".con1").html(m);
			m = null;
			$("#kjnow").attr('src', "http://00885522.com/kjnow.html")
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
function getuserinfo() {
	$.ajax({
		type: 'POST',
		cache: false,
		url: mulu + 'userinfo.php',
		data: 'xtype=show',
		success: function(m) {
			$(".con1").html(m);
			m = null;
			$(".add_tb td").addClass('red');
			$(".submitbtn").click(function() {
				var pan = $(".usertb .pan").val();
				$.ajax({
					type: 'POST',
					url: mulu + 'userinfo.php',
					data: "xtype=changepan&pan=" + pan,
					success: function(m) {
						if (Number(m) == 1) {
							alert("ok")
						}
					}
				});
				return false
			});
			$(".fastjebtn").click(function() {
				var fastje = $(".usertb .fastje").val();
				$.ajax({
					type: 'POST',
					url: mulu + 'userinfo.php',
					data: "xtype=changefastje&fastje=" + fastje,
					success: function(m) {
						if (Number(m) == 1) {
							alert("ok")
						}
						$(".fast .fastflag").val(fastje)
					}
				});
				return false
			});
			$("#game").change(function() {
				var gid = $(this).val();
				if (gid == 'all') {
					$(".gametr").show();
					return
				}
				$(".gametr").each(function(i) {
					if ($(this).attr('gid') == gid) {
						$(this).show()
					} else {
						$(this).hide()
					}
				})
			})
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
			gname += $(this).attr('gname') + '  '
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
				str += "<td class='b2'>" + m[i]['date'] + " 星期" + m[i]['week'] + "</td>";
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
				pagestr += "  <a href='javascript:void(0);' ";
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
				var qishu = $(".qishu").val();
				var gid = $(".gamelib").val();
				$("#downfrm").attr('src', "lib.php?xtype=download&qishu=" + qishu + "&gid=" + gid);
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
		data: 'xtype=getlib&qishu=' + qishu + "&tpage=" + tpage + "&psize=" + psize + "&gid=" + gid,
		success: function(m) {
			var ml = m['lib'].length;
			var str = '';
			var je = 0;
			var thstr = $(".libs tr:first").html();
			$(".libs").empty();
			for (i = 0; i < ml; i++) {
				str += "<tr>";
				str += "<td>" + (i + 1) + "</td>";
				str += "<td>" + m['lib'][i]['qishu'] + "</td>";
				str += "<td colspan=4 class='ccon'>";
				if (m['lib'][i]['bid'] == m['lib'][i]['cid'] & m['lib'][i]['bid'] == m['lib'][i]['pid']) {
					str += m['lib'][i]['bid']
				} else if (m['lib'][i]['bid'] == m['lib'][i]['cid']) {
					str += m['lib'][i]['bid'] + '-' + m['lib'][i]['pid']
				} else {
					str += m['lib'][i]['bid'] + '-' + m['lib'][i]['sid'] + '-' + m['lib'][i]['cid'];
					str += ':' + m['lib'][i]['pid']
				}
				str += '  ' + m['lib'][i]['content'] + "</td>";
				str += "<td>" + m['lib'][i]['je'] + "</td>";
				str += "<td>" + m['lib'][i]['peilv1'] + "</td>";
				str += "<td>" + m['lib'][i]['points'] + "</td>";
				str += "<td>" + m['lib'][i]['time'] + "</td>";
				str += "</tr>";
				je += Number(m['lib'][i]['je'])
			}
			str += '<tr><td colspan=6></td><th>' + je + '</th><td colspan=3></td></tr>';
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
				str += '' + m[i]['content'] + '<!--<label>[' + m[i]['time'] + ']</label>--> ';
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
function in_array(v, a) {
	for (key in a) {
		if (a[key] == v) return true
	}
	return false
}
function C(arr, num) {
	var r = [];
	(function f(t, a, n) {
		if (n == 0) return r.push(t);
		for (var i = 0, l = a.length; i <= l - n; i++) {
			f(t.concat(a[i]), a.slice(i + 1), n - 1)
		}
	})([], arr, num);
	return r
}
function xreload() {
	if (document.frames) {
		document.all["check"].src = 'check.php'
	} else {
		document.getElementById("check").contentWindow.location.href = 'check.php'
	}
	setTimeout(xreload, 55000)
}
function color(m) {
	if (in_array(m, ma[7]['ma'])) return "red";
	if (in_array(m, ma[8]['ma'])) return "blue";
	if (in_array(m, ma[9]['ma'])) return "green"
}