var libbstr = "<tr><th>类别</th><th>赔率</th><th>总注数</th><th>总投|注</th><th>占成</th><th>预计亏损</th><th>补货</th><th>已补</th></tr>";
var libcstr = "<tr><th>类别</th><th>赔率</th><th>总注数</th><th>总投|注</th><th>占成</th><th>预计亏损</th><th>补货</th><th>已补</th></tr>";
var upstr = "<span class='up'>&nbsp;+</span>";
var downstr = "<span class='down'>-&nbsp;</span>";
var libtha = "<tr><th class='f'>类别</th><th class='s' mname=''>赔率</th><th  class='t'>占成/总额</th><th  class='fo'>状态</th></tr>";
var libthb = "<th class='fb'>项目</th><th class='sb' mname=''>注单</th>";
var libastr = "<tr><td><table class='tinfo wd100'><tr><th class='f'>类别</th><th class='s'>赔率</th><th  class='t'>吃码</th><th  class='fo'>状态</th><th  class='fi'>已飞/补</th></table></td><td><table class='tinfo wd100'><tr><th class='f'>类别</th><th class='s'>赔率</th><th  class='t'>吃码</th><th  class='fo'>状态</th><th  class='fi'>已飞/补</th></table></td><td><table class='tinfo wd100'><tr><th class='f'>类别</th><th class='s'>赔率</th><th  class='t'>吃码</th><th  class='fo'>状态</th><th  class='fi'>已飞/补</th></table></td><td><table class='tinfo wd100'><tr><th class='f'>类别</th><th class='s'>赔率</th><th  class='t'>吃码</th><th  class='fo'>状态</th><th  class='fi'>已飞/补</th></table></td></tr>";
var rtime = Number($("#reloadtime").val());
var cnow;
var gnow;

function myready() {
	$(".huifumoren").click(function() {
		if (!confirm("确定恢复默认赔率吗？")) return false;
		$.ajax({
			type: 'POST',
			url: mulu + 'psetmoren',
			data: 'xtype=huifumoren',
			success: function(m) {
				if (Number(m) == 1) {
					alert('ok')
				}
			}
		})
	});
	clayer = layername.length;
	if (layer < 8) {
		$(".xxtb tr:eq(0)").append("<th>所属" + layername[layer] + "</th>")
	}
	$(".xxtb tr:eq(0)").append("<th>集团</th>");
	for (i = 0; i < clayer - 1; i++) {
		$(".xxtb tr:eq(0)").append("<th>" + layername[i] + "</th>")
	}
	$("label").addClass('red');
	$("#qishu").change(function() {
		lib()
	});
	$("#xsort").change(function() {
		lib()
	});
	$("#reload").click(function() {
		parent.tops.window.location.href = parent.tops.window.location.href;
		lib()
	});
	getnow();
	$("#reloadtime").change(function() {
		rtime = Number($(this).val())
	});
	$("#ab").change(function() {
		lib()
	});
	$("#abcd").change(function() {
		lib()
	});
	$("#userid").change(function() {
		lib()
	});
	$(".now td:eq(0)").addClass("bover");
	$(".now th:eq(0)").addClass("bred");
	$(".nowson td:eq(0)").addClass("bover");
	$(".nowson th:eq(0)").addClass("bred");
	$(".sandingwei td:eq(0)").addClass("bover");
	$(".sandingwei th:eq(0)").addClass("bred");
	lib();
	$(".now td.n").click(function() {
		var bid = $(this).attr('bid');
		var bname = $(this).attr('bname');
		$(".now td.n").removeClass('bover');
		$(this).addClass('bover');
		$(".now th").removeClass('bred');
		$(".now .n" + bid).addClass('bred');
		lib()
	});
	$(".sandingwei tr td").click(function() {
		var index = $(this).index();
		index = (index - index % 2) / 2;
		$(".sandingwei td").removeClass('bover');
		$(this).addClass('bover');
		$(".sandingwei th").removeClass('bred');
		$(".sandingwei th:eq(" + index + ")").addClass('bred');
		libc()
	});
	$("#pset").click(function() {
		var posi = $(this).position();
		$(".pset").css('left', posi.left + $(this).width() - $(".pset").width());
		$(".pset").css('top', posi.top + $(this).height());
		$(".pset").show()
	});
	$(".psetclose").click(function() {
		$(".pset").hide()
	});
	$(".btns").click(function() {
		selectma($(this).val())
	});
	$("#psetcancel").click(function() {
		$(".lib .p1").each(function() {
			$(this).hide();
			$(this).val($(this).parent().find("label.peilv1").html());
			$(this).parent().find("label.peilv1").show()
		});
		$(".lib .p2").each(function() {
			$(this).hide();
			$(this).val($(this).parent().find("label.peilv2").html());
			$(this).parent().find("label.peilv2").show()
		});
		$(".lib th").removeClass('byellow');
		$(".lib td").removeClass('byellow')
	});
	$("#psetsend").click(function() {
		var peilv = getResult(Number($("#psetvalue").val()), 2);
		if (peilv == NaN | peilv == undefined) {
			alert("请输入正确的赔率");
			$("#psetvalue").focus();
			return false
		}
		$(".lib td.byellow").find("input.p1").val(peilv);
		$(".lib th.byellow").find("input.p1").val(peilv);
		return false
	});
	$("#psetatt").click(function() {
		var pl = $(".lib td.byellow").length;
		if (pl == 0) return false;
		var pid = '|';
		$(".lib label.peilv1").each(function() {
			if ($(this).parent().hasClass('byellow')) {
				pid += $(this).parent().attr('pid') + "|"
			}
		});
		var action = $("#psettype").val();
		var val = $("#psetvalue").val();
		$.ajax({
			type: 'POST',
			url: mulu + 'psetmoren',
			cache: false,
			data: 'xtype=setatt&pid=' + pid + "&val=" + val + "&action=" + action,
			success: function(m) {
				if (Number(m) == 1) {
					if (Number(action) == 0) {
						$(".lib td.byellow").each(function() {
							$(this).find("label.peilv1").html(getResult(Number($(this).find("label.peilv1").html()) - Number(val), 3))
						})
					} else {
						$(".lib td.byellow").each(function() {
							$(this).find("label.peilv1").html(getResult(Number($(this).find("label.peilv1").html()) + Number(val), 3))
						})
					}
					$(".lib td.byellow").each(function() {
						$(this).addClass('bc')
					});
					setTimeout(function() {
						$(".lib td.bc").removeClass('bc')
					}, 5000);
					$("#psetcancel").click()
				}
			}
		})
	});
	$(".onepeilvtb .oneclose").click(function() {
		$(".onepeilvtb").hide()
	});
	$(".onepeilvtb .onesend").click(function() {
		var pid = $(".onepeilvtb td:eq(0)").attr("pid");
		var peilv1 = $(".onepeilvtb input:text").val();
		var ab = $("#ab").val();
		var abcd = $("#abcd").val();
		var pl = '{"p1' + pid + '":"' + peilv1 + '"}';
		$.ajax({
			type: 'POST',
			url: mulu + 'psetmoren',
			cache: false,
			data: "xtype=setpeilvall&pl=" + pl + "&abcd=" + abcd + "&ab=" + ab,
			success: function(m) {
				if (Number(m) == 1) {
					$(".lib label.peilv1").each(function() {
						if ($(this).parent().attr('pid') == pid) {
							$(this).html(peilv1);
							$(this).parent().find("input.p1").val(peilv1);
							$(".onepeilvtb").hide()
						}
					})
				}
			}
		})
	});
	$("#writemoren").click(function() {
		if (!confirm("确定把当前赔率写入默认赔率吗？")) return false;
		$.ajax({
			type: 'POST',
			url: mulu + 'psetmoren',
			cache: false,
			data: 'xtype=writemoren',
			success: function(m) {
				if (Number(m) == 1) {
					alert("写入默认赔率成功")
				}
			}
		})
	});
	$("#psetpost").click(function() {
		var pl = $(".lib td.byellow").length;
		if (pl == 0) {
			var pl = $(".lib th.byellow").length;
			if (pl == 0) return false
		}
		pl = new Array();
		var plstr = '{';
		var j = 0;
		$(".lib label.peilv1").each(function(i) {
			if ($(this).parent().hasClass('byellow')) {
				if (j != 0) plstr += ",";
				plstr += '"p1' + $(this).parent().attr('pid') + '":"' + $(this).parent().find(".p1").val() + '"';
				plstr += ',"p2' + $(this).parent().attr('pid') + '":"' + $(this).parent().find(".p2").val() + '"';
				j++
			}
		});
		plstr += "}";
		var ab = $("#ab").val();
		var abcd = $("#abcd").val();
		$.ajax({
			type: 'POST',
			url: mulu + 'psetmoren',
			cache: false,
			data: 'xtype=setpeilvall&pl=' + plstr + "&abcd=" + abcd + "&ab=" + ab,
			success: function(m) {
				if (Number(m) == 1) {
					$(".lib label.peilv1").each(function() {
						$(this).html($(this).parent().find("input.p1").val())
					});
					$(".lib label.peilv2").each(function() {
						$(this).html($(this).parent().find("input.p2").val())
					});
					$(".lib td.byellow").addClass('bc');
					setTimeout(function() {
						$(".lib td.bc").removeClass('bc')
					}, 5000);
					$("#psetcancel").click()
				}
			}
		})
	})
}
function lib() {
	$(".libs").hide();
	var bname = $(".now .bred").html();
	var bid = $(".now .bover").attr('bid');
	$(".nowson").hide();
	$(".sandingwei").hide();
	clearTimeout(cnow);
	if (bname == "1~5") {
		liba()
	} else if (bname == "1字组合") {
		libb()
	} else if (bname == "2字定位") {
		getc(bid, bname)
	} else if (bname == "2字组选") {
		getc(bid, bname)
	} else if (bname == "2字和数") {
		liba()
	} else if (bname == "3字定位") {
		$(".sandingwei").show();
		getc(bid, bname)
	} else if (bname == "3字组选") {
		getc(bid, bname)
	} else if (bname == "3字和数") {
		libd()
	} else if (bname == "总和龙虎") {
		libe()
	} else if (bname == "组选3") {
		getc(bid, bname)
	} else if (bname == "组选6") {
		getc(bid, bname)
	} else if (bname == "跨度") {
		libf()
	} else if (bname == "其他") {
		libf()
	} else {
		lib0()
	}
}
function getc(bid, bname) {
	$.ajax({
		type: 'POST',
		url: mulu + 'moren',
		dataType: 'json',
		cache: false,
		data: 'xtype=getc&bid=' + bid,
		success: function(m) {
			var ml = m.length;
			var str = "<tr>";
			for (i = 0; i < ml; i++) {
				str += "<th class='c" + m[i].cid + "'>" + m[i].name + "</th><td cid='" + m[i].cid + "' cname='" + m[i].name + "' class='nowson" + m[i].cid + "'></td>"
			}
			str += "</tr>";
			$(".nowson").html(str);
			$(".nowson th:first").addClass('bred');
			$(".nowson td:first").addClass('bover');
			$(".nowson").show();
			str = null;
			m = null;
			getnowson();
			if (bname == '3字定位') getnowsan();
			$(".nowson td").unbind('click');
			$(".nowson td").click(function() {
				var cid = $(this).attr('cid');
				var cname = $(this).attr('cname');
				$(".nowson td").removeClass('bover');
				$(".nowson th").removeClass('bred');
				$(".nowson th.c" + cid).addClass('bred');
				$(this).addClass('bover');
				libc()
			});
			libc()
		}
	})
}
function lib0() {
	var bid = $(".now .bover").attr("bid");
	var sid = $(".nowson .bover").attr("sid");
	$(".lib").removeClass('w1002');
	var abcd = $("#abcd").val();
	var ab = $("#ab").val();
	var qishu = $("#qishu").val();
	var goods = $("#goods").val();
	var xsort = $("#xsort").val();
	var puserid = $("#userid").val();
	var maxksval = $("#maxksvalue").val();
	var setks = $("#setks").val();
	var str = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&goods=" + goods + "&qishu=" + qishu + "&xsort=" + xsort;
	str += "&maxksval=" + maxksval + "&setks=" + setks + "&userid=" + puserid + "&sid=" + sid;
	$.ajax({
		type: 'POST',
		url: mulu + 'moren',
		dataType: 'json',
		cache: false,
		data: 'xtype=getlib' + str,
		success: function(m) {
			var ml = m.length;
			var str = "<tr>";
			var sname = '';
			var j = 0;
			for (i = 0; i < ml; i++) {
				if (sname != m[i]['sname']) {
					if (sname != '') str += "</table></td>";
					if (j % 5 == 0 & sname != '') str += "</tr><tr>";
					str += "<TD valign=top><table class='tinfo wd100'><tr><th colspan=4 class='bt'>" + m[i]['sname'] + "</td></tr>";
					str += libtha;
					j++
				}
				str += "<tr ";
				if (m[i]['z'] == '1') str += " class='z1' ";
				str += ">";
				str += "<th class='f m'  pid='" + m[i]['pid'] + "' >" + m[i]['name'] + "</th>";
				str += "<td class='s' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "'>" + downstr + "<label class='peilv1'>" + m[i]['mp1'] + "</label><input type='text' value='" + m[i]['mp1'] + "' class='small hide p1' />" + upstr + "</td>";
				str += "<td class='t "
				if (Number(m[i]['wje']) == 1) str += "warn";
				str += "' title='" + m[i]['zs'] + "'  pid='" + m[i]['pid'] + "' ><label  class='zcxx'>" + m[i]['zc'] + "</label>/" + m[i]['zje'] + "</td>";
				str += "<td class='fo ";
				if (Number(m[i]['ks']) > 0) str += "red";
				else if (Number(m[i]['ks']) < 0) str += "lv";
				if (Number(m[i]['wks']) == 1) str += " warn";
				str += "'>" + "<img src='" + globalpath + "img/" + m[i]['ifok'] + ".gif' pid='" + m[i]['pid'] + "' class='ifok' />" + "</td>";
				str += "</tr>";
				sname = m[i]['sname']
			}
			str += "</table></td></tr>";
			$(".lib").html(str);
			$(".lib td").attr("valign", 'top');
			str = null;
			m = null;
			$(".lib").removeClass('w1002');
			$(".lib").addClass('w1330');
			addfunc();
			xxclick(1);
			flyclick()
		}
	})
}
function liba() {
	var bid = $(".now .bover").attr("bid");
	var sid = $(".nowson .bover").attr("sid");
	$(".lib").removeClass('w1002');
	var abcd = $("#abcd").val();
	var ab = $("#ab").val();
	var qishu = $("#qishu").val();
	var goods = $("#goods").val();
	var xsort = $("#xsort").val();
	var puserid = $("#userid").val();
	var maxksval = $("#maxksvalue").val();
	var setks = $("#setks").val();
	var str = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&goods=" + goods + "&qishu=" + qishu + "&xsort=" + xsort;
	str += "&maxksval=" + maxksval + "&setks=" + setks + "&userid=" + puserid + "&sid=" + sid;
	$.ajax({
		type: 'POST',
		url: mulu + 'moren',
		dataType: 'json',
		cache: false,
		data: 'xtype=getlib' + str,
		success: function(m) {
			var ml = m.length;
			var str = "<tr>";
			var sname = '';
			var j = 0;
			for (i = 0; i < ml; i++) {
				if (sname != m[i]['sname']) {
					if (sname != '') str += "</table></td>";
					if (j % 5 == 0 & sname != '') str += "</tr><tr>";
					str += "<TD valign=top><table class='tinfo wd100'><tr><th colspan=4 class='bt'>" + m[i]['sname'] + "</td></tr>";
					str += libtha;
					j++
				}
				str += "<tr ";
				if (m[i]['z'] == '1') str += " class='z1' ";
				str += ">";
				str += "<th class='f m'  pid='" + m[i]['pid'] + "' >" + m[i]['name'] + "</th>";
				str += "<td class='s' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "'>" + downstr + "<label class='peilv1'>" + m[i]['mp1'] + "</label><input type='text' value='" + m[i]['mp1'] + "' class='small hide p1' />" + upstr + "</td>";
				str += "<td class='t "
				if (Number(m[i]['wje']) == 1) str += "warn";
				str += "' title='" + m[i]['zs'] + "'  pid='" + m[i]['pid'] + "' ><label  class='zcxx'>" + m[i]['zc'] + "</label>/" + m[i]['zje'] + "</td>";
				str += "<td class='fo ";
				if (Number(m[i]['ks']) > 0) str += "red";
				else if (Number(m[i]['ks']) < 0) str += "lv";
				if (Number(m[i]['wks']) == 1) str += " warn";
				str += "'>" + "<img src='" + globalpath + "img/" + m[i]['ifok'] + ".gif' pid='" + m[i]['pid'] + "' class='ifok' />" + "</td>";
				str += "</tr>";
				sname = m[i]['sname']
			}
			str += "</table></td></tr>";
			$(".lib").html(str);
			$(".lib td").attr("valign", 'top');
			str = null;
			m = null;
			$(".lib").removeClass('w1002');
			$(".lib").addClass('w1330');
			addfunc();
			xxclick(1);
			flyclick()
		}
	})
}
function libb() {
	var bid = $(".now .bover").attr("bid");
	var sid = $(".nowson .bover").attr("sid");
	$(".lib").removeClass('w1002');
	var abcd = $("#abcd").val();
	var ab = $("#ab").val();
	var qishu = $("#qishu").val();
	var goods = $("#goods").val();
	var xsort = $("#xsort").val();
	var puserid = $("#userid").val();
	var maxksval = $("#maxksvalue").val();
	var setks = $("#setks").val();
	var str = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&goods=" + goods + "&qishu=" + qishu + "&xsort=" + xsort;
	str += "&maxksval=" + maxksval + "&setks=" + setks + "&userid=" + puserid + "&sid=" + sid;
	$.ajax({
		type: 'POST',
		url: mulu + 'moren',
		dataType: 'json',
		cache: false,
		data: 'xtype=getlibd' + str,
		success: function(m) {
			var ml = m.length;
			var str = "<tr>";
			var cname = '';
			for (i = 0; i < ml; i++) {
				if (cname != m[i]['cname']) {
					if (cname != '') str += "</table></td>";
					str += "<TD valign=top><table class='tinfo wd100'><tr><th colspan=4 class='bt'>" + m[i]['cname'] + "</td></tr>";
					str += libtha
				}
				str += "<tr  ";
				if (m[i]['z'] == '1') str += " class='z1' ";
				str += ">";
				str += "<th class='f m'   pid='" + m[i]['pid'] + "'>" + m[i]['name'] + "</th>";
				str += "<td class='s' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "'>" + downstr + "<label class='peilv1'>" + m[i]['mp1'] + "</label><input type='text' value='" + m[i]['mp1'] + "' class='small hide p1' />" + upstr + "</td>";
				str += "<td class='t ";
				if (Number(m[i]['wje']) == 1) str += " warn";
				str += "' title='" + m[i]['zs'] + "'  pid='" + m[i]['pid'] + "' ><label  class='zcxx'>" + m[i]['zc'] + "</label>/" + m[i]['zje'] + "</td>";
				str += "<td class='fo ";
				if (Number(m[i]['ks']) > 0) str += "red";
				else if (Number(m[i]['ks']) < 0) str += "lv";
				if (Number(m[i]['wks']) == 1) str += " warn";
				str += "'>" + "<img src='" + globalpath + "img/" + m[i]['ifok'] + ".gif' pid='" + m[i]['pid'] + "' class='ifok' />" + "</td>";
				str += "</tr>";
				cname = m[i]['cname']
			}
			str += "</table></td></tr>";
			$(".lib").html(str);
			$(".lib td").attr("valign", 'top');
			str = null;
			m = null;
			$(".lib").removeClass('w1002');
			$(".lib").addClass('w1330');
			addfunc();
			xxclick(1);
			flyclick()
		}
	})
}
function libc() {
	var bid = $(".now .bover").attr("bid");
	var cid = $(".nowson .bover").attr("cid");
	$(".lib").removeClass('w1002');
	var abcd = $("#abcd").val();
	var ab = $("#ab").val();
	var qishu = $("#qishu").val();
	var goods = $("#goods").val();
	var xsort = $("#xsort").val();
	var puserid = $("#userid").val();
	var maxksval = $("#maxksvalue").val();
	var setks = $("#setks").val();
	var p = $(".sandingwei .bover").attr('p');
	var str = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&goods=" + goods + "&qishu=" + qishu + "&xsort=" + xsort;
	str += "&maxksval=" + maxksval + "&setks=" + setks + "&userid=" + puserid + "&cid=" + cid + "&p=" + p;
	$(".lib").html('');
	$.ajax({
		type: 'POST',
		url: mulu + 'moren',
		dataType: 'json',
		cache: false,
		data: 'xtype=getlibc' + str,
		success: function(m) {
			var ml = m.length;
			var str = "";
			var cname = '';
			str += "<tr>" + libthb + libthb + libthb + libthb + libthb + libthb + libthb + libthb + libthb + libthb + "</tr>";
			for (i = 0; i < ml; i++) {
				if (i % 10 == 0) {
					if (i != 0) str += "</tr>";
					str += "<tr>"
				}
				str += "<th class='fb m'   pid='" + m[i]['pid'] + "'>" + m[i]['name'] + "</th>";
				str += "<th class='";
				if (Number(m[i]['wks']) == 1 | Number(m[i]['wje']) == 1) str += "warn";
				str += " sb' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "'>" + downstr + "<label class='peilv1'>" + m[i]['mp1'] + "</label><input type='text' value='" + m[i]['mp1'] + "' class='small hide p1' />" + upstr + "<BR /><label class='";
				if (Number(m[i]['ks']) > 0) str += "red";
				else if (Number(m[i]['ks']) < 0) str += "lv";
				str += "'>" + "<img src='" + globalpath + "img/" + m[i]['ifok'] + ".gif' pid='" + m[i]['pid'] + "' class='ifok' />" + "</label></th>"
			}
			str += "";
			str += "</tr>";
			$(".lib").html(str);
			$(".lib td").attr("valign", 'top');
			str = null;
			m = null;
			$(".lib").removeClass('w1002');
			$(".lib").addClass('w1330');
			addfunc();
			xxclick(1);
			flyclick()
		}
	})
}
function libd() {
	var bid = $(".now .bover").attr("bid");
	var sid = $(".nowson .bover").attr("sid");
	$(".lib").removeClass('w1002');
	var abcd = $("#abcd").val();
	var ab = $("#ab").val();
	var qishu = $("#qishu").val();
	var goods = $("#goods").val();
	var xsort = $("#xsort").val();
	var puserid = $("#userid").val();
	var maxksval = $("#maxksvalue").val();
	var setks = $("#setks").val();
	var str = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&goods=" + goods + "&qishu=" + qishu + "&xsort=" + xsort;
	str += "&maxksval=" + maxksval + "&setks=" + setks + "&userid=" + puserid + "&sid=" + sid;
	$.ajax({
		type: 'POST',
		url: mulu + 'moren',
		dataType: 'json',
		cache: false,
		data: 'xtype=getlib' + str,
		success: function(m) {
			var ml = m.length;
			var str = "";
			var cname = '';
			var left1cname = '';
			var sid = 0;
			var cid = 0;
			var j = 0;
			var ztype = 0;
			for (i = 0; i < ml; i++) {
				if (sid != Number(m[i]['sid'])) {
					if (sid != 0) str += "</tr>";
					str += "<tr><th rowspan=" + 4 + " class='bt'>" + m[i]['sname'] + "</th>";
					left1cname = '';
					j = 0
				}
				if (left1cname != m[i].cname.substr(0, 1)) {
					if (left1cname != '') str += "</tr><tr><th rowspan=2 class='bt'>" + m[i].cname + "</th>";
					else str += "<th rowspan=2 class='bt'>" + m[i].cname + "</th>";
					j = 0
				}
				if (j == 10 & left1cname != '') {
					j = 0;
					str += "</tr><tr>"
				}
				str += "<th class='fb m'  pid='" + m[i]['pid'] + "'>" + m[i]['name'] + "</th>";
				str += "<th class='sb";
				if (Number(m[i]['wks']) == 1 | Number(m[i]['wje']) == 1) str += " warn";
				str += "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "'>" + downstr + "<label class='peilv1'>" + m[i]['mp1'] + "</label><input type='text' value='" + m[i]['mp1'] + "' class='small hide p1' />" + upstr + "<BR /><label class='";
				if (Number(m[i]['ks']) > 0) str += "red";
				else if (Number(m[i]['ks']) < 0) str += "lv";
				str += "'>" + "<img src='" + globalpath + "img/" + m[i]['ifok'] + ".gif' pid='" + m[i]['pid'] + "' class='ifok' />" + "</label></th>";
				cname = m[i]['cname'];
				left1cname = m[i].cname.substr(0, 1);
				sid = Number(m[i]['sid']); cid = Number(m[i]['cid']); j++;
			}
			str += "</tr>";
			$(".lib").html(str);
			$(".lib td").attr("valign", 'top');
			str = null;
			m = null;
			$(".lib").removeClass('w1002');
			$(".lib").addClass('w1330');
			addfunc();
			xxclick(1);
			flyclick()
		}
	})
}
function libe() {
	var bid = $(".now .bover").attr("bid");
	var sid = $(".nowson .bover").attr("sid");
	$(".lib").removeClass('w1002');
	var abcd = $("#abcd").val();
	var ab = $("#ab").val();
	var qishu = $("#qishu").val();
	var goods = $("#goods").val();
	var xsort = $("#xsort").val();
	var puserid = $("#userid").val();
	var maxksval = $("#maxksvalue").val();
	var setks = $("#setks").val();
	var str = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&goods=" + goods + "&qishu=" + qishu + "&xsort=" + xsort;
	str += "&maxksval=" + maxksval + "&setks=" + setks + "&userid=" + puserid + "&sid=" + sid;
	$.ajax({
		type: 'POST',
		url: mulu + 'moren',
		dataType: 'json',
		cache: false,
		data: 'xtype=getlib' + str,
		success: function(m) {
			var ml = m.length;
			var str = "";
			var cname = '';
			var left1cname = '';
			var sid = 0;
			var cid = 0;
			var j = 0;
			var ztype = 0;
			for (i = 0; i < ml; i++) {
				if (sid != Number(m[i]['sid'])) {
					if (sid != 0) str += "</tr>";
					str += "<tr><th rowspan=" + 6 + " class='bt'>" + m[i]['sname'] + "</th>";
					left1cname = '';
					j = 0
				}
				if (left1cname != m[i].cname.substr(0, 1)) {
					if (left1cname != '') str += "</tr><tr><th rowspan=2 class='bt'>" + m[i].cname + "</th>";
					else str += "<th rowspan=2 class='bt'>" + m[i].cname + "</th>";
					j = 0
				}
				if (j == 10 & left1cname != '') {
					j = 0;
					str += "</tr><tr>"
				}
				if (ztype != Number(m[i].ztype)) {}
				str += "<th class='fb m'  pid='" + m[i]['pid'] + "' >" + m[i]['name'] + "</th>";
				str += "<th class='sb "
				if (Number(m[i]['wks']) == 1 | Number(m[i]['wje']) == 1) str += " warn";
				str += "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "'>" + downstr + "<label class='peilv1'>" + m[i]['mp1'] + "</label><input type='text' value='" + m[i]['mp1'] + "' class='small hide p1' />" + upstr + "<BR /><label class='";
				if (Number(m[i]['ks']) > 0) str += "red";
				else if (Number(m[i]['ks']) < 0) str += "lv";
				str += "'>" + "<img src='" + globalpath + "img/" + m[i]['ifok'] + ".gif' pid='" + m[i]['pid'] + "' class='ifok' />" + "</label></th>";
				cname = m[i]['cname'];
				left1cname = m[i].cname.substr(0, 1);
				sid = Number(m[i]['sid']) ;cid = Number(m[i]['cid']); j++;
			}
			str += "</tr>";
			$(".lib").html(str);
			$(".lib td").attr("valign", 'top');
			str = null;
			m = null;
			$(".lib").removeClass('w1002');
			$(".lib").addClass('w1330');
			addfunc();
			xxclick(1);
			flyclick()
		}
	})
}
function libf() {
	var bid = $(".now .bover").attr("bid");
	var sid = $(".nowson .bover").attr("sid");
	$(".lib").removeClass('w1002');
	var abcd = $("#abcd").val();
	var ab = $("#ab").val();
	var qishu = $("#qishu").val();
	var goods = $("#goods").val();
	var xsort = $("#xsort").val();
	var puserid = $("#userid").val();
	var maxksval = $("#maxksvalue").val();
	var setks = $("#setks").val();
	var str = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&goods=" + goods + "&qishu=" + qishu + "&xsort=" + xsort;
	str += "&maxksval=" + maxksval + "&setks=" + setks + "&userid=" + puserid + "&sid=" + sid;
	$.ajax({
		type: 'POST',
		url: mulu + 'moren',
		dataType: 'json',
		cache: false,
		data: 'xtype=getlibd' + str,
		success: function(m) {
			var ml = m.length;
			var str = "";
			var cname = '';
			var left1cname = '';
			var sid = 0;
			var cid = 0;
			var j = 0;
			var ztype = 0;
			for (i = 0; i < ml; i++) {
				if (sid != Number(m[i]['sid'])) {
					if (sid != 0) str += "</tr>";
					str += "<tr><th rowspan=" + 3 + " class='bt'>" + m[i]['sname'] + "</th>";
					left1cname = '';
					j = 0
				}
				if (left1cname != m[i].cname.substr(0, 1)) {
					if (left1cname != '') str += "</tr><tr><th rowspan=1 class='bt'>" + m[i].cname + "</th>";
					else str += "<th rowspan=1 class='bt'>" + m[i].cname + "</th>";
					j = 0
				}
				if (j == 10 & left1cname != '') {
					j = 0;
					str += "</tr><tr>"
				}
				if (ztype != Number(m[i].ztype)) {}
				str += "<th class='fb m'  pid='" + m[i]['pid'] + "' >" + m[i]['name'] + "</th>";
				str += "<th class='"
				if (Number(m[i]['wks']) == 1 | Number(m[i]['wje']) == 1) str += " warn";
				str += " sb' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "'>" + downstr + "<label class='peilv1'>" + m[i]['mp1'] + "</label><input type='text' value='" + m[i]['mp1'] + "' class='small hide p1' />" + upstr + "<BR /><label class='";
				if (Number(m[i]['ks']) > 0) str += "red";
				else if (Number(m[i]['ks']) < 0) str += "lv";
				str += "'>" + "<img src='" + globalpath + "img/" + m[i]['ifok'] + ".gif' pid='" + m[i]['pid'] + "' class='ifok' />" + "</label></th>";
				cname = m[i]['cname'];
				left1cname = m[i].cname.substr(0, 1);
				sid = Number(m[i]['sid']) ;cid = Number(m[i]['cid']); j++;
			}
			str += "</tr>";
			$(".lib").html(str);
			$(".lib td").attr("valign", 'top');
			str = null;
			m = null;
			$(".lib").removeClass('w1002');
			$(".lib").addClass('w1330');
			addfunc();
			xxclick(1);
			flyclick()
		}
	})
}
function selectma(val) {
	$("#psetcancel").click();
	if (val == "大") {
		$(".lib .s").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '5' | pname == '6' | pname == '7' | pname == '8' | pname == '9') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow')
			}
		});
		$(".lib .sb").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '5' | pname == '6' | pname == '7' | pname == '8' | pname == '9') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow')
			}
		})
	}
	if (val == "小") {
		$(".lib .s").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '0' | pname == '1' | pname == '2' | pname == '3' | pname == '4') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow')
			}
		});
		$(".lib .sb").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '0' | pname == '1' | pname == '2' | pname == '3' | pname == '4') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow')
			}
		})
	}
	if (val == "单") {
		$(".lib .s").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '1' | pname == '3' | pname == '5' | pname == '7' | pname == '9') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow')
			}
		});
		$(".lib .sb").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '1' | pname == '3' | pname == '5' | pname == '7' | pname == '9') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow')
			}
		})
	}
	if (val == "双") {
		$(".lib .s").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '0' | pname == '2' | pname == '4' | pname == '6' | pname == '8') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow')
			}
		});
		$(".lib .sb").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '0' | pname == '2' | pname == '4' | pname == '6' | pname == '8') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow')
			}
		})
	}
	if (val == "质") {
		$(".lib .s").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '1' | pname == '2' | pname == '3' | pname == '5' | pname == '7') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow')
			}
		});
		$(".lib .sb").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '1' | pname == '2' | pname == '3' | pname == '5' | pname == '7') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow')
			}
		})
	}
	if (val == "合") {
		$(".lib .s").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '0' | pname == '4' | pname == '6' | pname == '8' | pname == '9') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow')
			}
		});
		$(".lib .sb").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '0' | pname == '4' | pname == '6' | pname == '8' | pname == '9') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow')
			}
		})
	}
	if (val == "全部") {
		$(".lib input:text").each(function() {
			$(this).parent().find("label.peilv1").hide();
			$(this).show();
			$(this).parent().addClass('byellow')
		})
	}
	if (val == "对对") {
		$(".lib .sb").each(function() {
			var pname = $(this).attr('mname');
			if (Number(pname) % 11 == 0 & pname != '') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow')
			}
		})
	}
	if (val == "豹子") {
		$(".lib .sb").each(function() {
			var pname = $(this).attr('mname');
			if (Number(pname) % 111 == 0 & pname != '') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow')
			}
		})
	}
	if (val == "一般") {
		$(".lib .sb").each(function() {
			var pname = $(this).attr('mname');
			if (Number(pname) % 11 != 0 & Number(pname) % 111 == 0) {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow')
			}
		})
	}
	if (Number(val) % 1 == 0) {
		$(".lib .s").each(function() {
			var pname = $(this).attr('mname');
			if (pname.indexOf(val) != -1) {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow')
			}
		});
		$(".lib .sb").each(function() {
			var pname = $(this).attr('mname');
			if (pname.indexOf(val) != -1) {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow')
			}
		})
	}
}
function addfunc() {
	$("tr.z1").find("td").addClass('z1');
	$("tr.z3").find("td").addClass('z3');
	$("tr.z1").find("th").addClass('z1');
	$("tr.z3").find("th").addClass('z3');
	$("label.zcxx").addClass('red');
	$(".peilv1").parent().find("span").click(function() {
		var action = $(this).attr('class');
		var pid = $(this).parent().attr('pid');
		var obj = $(this).parent();
		$.ajax({
			type: 'POST',
			url: mulu + 'psetmoren',
			cache: false,
			data: 'xtype=setatttwo&pid=' + pid + "&action=" + action,
			success: function(m) {
				if ((Number(m) * 1000) % 1 == 0) {
					if (action == 'up') {
						var tmp = getResult(Number(obj.find("label.peilv1").html()) + Number(m), 3);
						obj.find("label.peilv1").html(tmp);
						obj.find("input.p1").val(tmp)
					} else {
						var tmp = getResult(Number(obj.find("label.peilv1").html()) - Number(m), 3);
						obj.find("label.peilv1").html(tmp);
						obj.find("input.p1").val(tmp)
					}
					obj.addClass("bc");
					setTimeout(function() {
						obj.removeClass('bc')
					}, 5000)
				}
			}
		})
	});
	$(".peilv1").parent().parent().mouseover(function() {
		$(this).addClass('bover')
	}).mouseout(function() {
		$(this).removeClass('bover')
	});
	$(".lib label.peilv1").click(function() {
		$(this).parent().find("input.p1").show();
		$(this).hide();
		$(this).parent().addClass('byellow')
	});
	$(".lib label.peilv2").click(function() {
		$(this).parent().find("input.p2").show();
		$(this).hide();
		$(this).parent().addClass('byellow')
	});
	$(".lib th.m").click(function() {
		var pid = $(this).attr("pid");
		var peilv1 = $(this).parent().find("label.peilv1").html();
		var posi = $(this).position();
		$(".onepeilvtb td:eq(0)").html($(this).html());
		$(".onepeilvtb td:eq(0)").attr('pid', pid);
		$(".onepeilvtb input:text").val(peilv1);
		$(".onepeilvtb").css('left', posi.left);
		$(".onepeilvtb").css('top', posi.top + $(this).height());
		$(".onepeilvtb").show()
	});
	$(".lib img.ifok").click(function() {
		var pid = $(this).attr('pid');
		var obj = $(this);
		$.ajax({
			type: 'POST',
			url: mulu + 'psetmoren',
			data: 'xtype=changeifok&pid=' + pid,
			success: function(m) {
				if (Number(m) == 1 | Number(m) == 0) {
					obj.attr('src', globalpath + 'img/' + m + '.gif')
				}
			}
		})
	})
}
function time() {
	rtime--;
	if (rtime == 0) {
		clearTimeout(r);
		lib();
		rtime = Number($("#reloadtime").val())
	}
	$("label.time").html(rtime);
	var r = setTimeout(time, 1000)
}
function getnow() {
	var puserid = $("#userid").val();
	var qishu = $("#qishu").val();
	$.ajax({
		type: 'POST',
		url: mulu + 'moren',
		dataType: 'json',
		cache: false,
		data: 'xtype=getnow&userid=' + puserid + "&qishu=" + qishu,
		success: function(m) {
			var ml = m.length;
			var jezc = 0;
			var je = 0;
			var flyje = 0;
			for (i = 0; i < ml; i++) {
				$(".now .nx" + m[i]['bid']).html("<label>" + m[i]['zc'] + "</label>/" + m[i]['zje'] + "/" + m[i]['zs'] + "/<label>" + Number(m[i]['flyje']) + "</label>");
				jezc += Number(m[i]['zc']);
				je += Number(m[i]['zje']);
				flyje += Number(m[i]['flyje'])
			}
			$(".now label.zc").html(getResult(jezc, 1));
			$(".now label.zong").html(getResult(je, 1));
			$(".now label.fly").html(getResult(flyje, 1));
			$(".now label").addClass('red');
			clearTimeout(gnow);
			gnow = setTimeout(getnow, 5000)
		}
	})
}
function getnowson() {
	var puserid = $("#userid").val();
	var qishu = $("#qishu").val();
	var bid = $(".now .bover").attr("bid");
	$.ajax({
		type: 'POST',
		url: mulu + 'moren',
		dataType: 'json',
		cache: false,
		data: 'xtype=getnowson&userid=' + puserid + "&qishu=" + qishu + "&bid=" + bid,
		success: function(m) {
			var ml = m.length;
			var jezc = 0;
			var je = 0;
			var flyje = 0;
			for (i = 0; i < ml; i++) {
				$(".nowson .nowson" + m[i]['cid']).html("<label>" + m[i]['zc'] + "</label>/" + m[i]['zje'] + "<!--/" + m[i]['zs'] + "-->/<label>" + Number(m[i]['flyje']) + "</label>")
			}
			$(".nowson label").css('color', 'red');
			clearTimeout(cnow)
		}
	});
	cnow = setTimeout(getnow, 6000)
}
function getnowsan() {
	var puserid = $("#userid").val();
	var qishu = $("#qishu").val();
	var bid = $(".now .bover").attr("bid");
	var cid = $(".nowson .bover").attr("cid");
	$.ajax({
		type: 'POST',
		url: mulu + 'moren',
		dataType: 'json',
		cache: false,
		data: 'xtype=getnowsan&userid=' + puserid + "&qishu=" + qishu + "&bid=" + bid + "&cid=" + cid,
		success: function(m) {
			var ml = m.length;
			for (i = 0; i < ml; i++) {
				$(".sandingwei .p" + m[i]['t']).html("<label>" + m[i]['zc'] + "</label>/" + m[i]['zje'] + "<!--/" + m[i]['zs'] + "-->/<label>" + Number(m[i]['flyje']) + "</label>")
			}
			$(".sandingwei label").css('color', 'red')
		}
	})
}
function xxclick() {
	$(".lib label.zcxx").click(function() {
		var bid = $(".now .bover").attr("bid");
		var abcd = $("#abcd").val();
		var ab = $("#ab").val();
		var page = $(".page").val();
		var xtype = $(".ttype").val();
		var qishu = $("#qishu").val();
		var goods = $("#goods").val();
		var xsort = $("#xsort").val();
		var puserid = $("#userid").val();
		var orderby = $(".sort").attr("orderby");
		var sorttype = $(".sort").attr("sorttype");
		var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&goods=" + goods + "&qishu=" + qishu + "&xsort=" + xsort;
		sstr += "&puserid=" + puserid + "&page=" + page + "&orderby=" + orderby;
		sstr += "&sorttype=" + sorttype + "&flytype=" + xtype;
		var pid = $(this).parent().attr('pid');
		var posi = $(this).position();
		if (posi.left > document.body.clientWidth) {
			$(".xxtb").css('left', posi.left + $(this).width() - $(".xxtb").width())
		} else {
			$(".xxtb").css('left', 10)
		}
		$(".xxtb").css('top', posi.top + $(this).height());
		$(".xxtb").show();
		var obj = $(this);
		$.ajax({
			type: 'POST',
			url: mulu + 'xxtz',
			cache: false,
			data: 'xtype=getxx' + sstr + "&fly=" + $(".ttype").val() + "&pid=" + pid,
			dataType: 'json',
			success: function(m) {
				var ml = m['tz'].length;
				var str = '';
				$(".xxtb tr").each(function(i) {
					if (!$(this).hasClass('bt')) $(this).remove()
				});
				for (i = 0; i < ml; i++) {
					str += "<tr>";
					str += "<td>" + m['tz'][i]['qishu'] + "</td>";
					str += "<td>" + m['tz'][i]['tid'] + "</td>";
					str += "<td>" + m['tz'][i]['xtype'] + "</td>";
					str += "<td>" + m['tz'][i]['bid'] + "-" + m['tz'][i]['sid'] + "-" + m['tz'][i]['cid'] + ":" + m['tz'][i]['pid'] + "</td>";
					str += "<td>" + m['tz'][i]['abcd'] + "</td>";
					str += "<td>" + m['tz'][i]['ab'] + "</td>";
					str += "<td>" + m['tz'][i]['con'] + "</td>";
					str += "<td><label>" + m['tz'][i]['zcje'] + "</label>/" + m['tz'][i]['je'] + "</td>";
					str += "<td>" + m['tz'][i]['peilv1'] + "</td>";
					str += "<td>" + m['tz'][i]['points'] + "</td>";
					str += "<td>" + m['tz'][i]['user'] + "</td>";
					str += "<td>" + m['tz'][i]['xtime'] + "</td>";
					if (layer < 8) str += "<td>" + m['tz'][i]['duser'] + "</td>";
					for (j = 0; j < 9; j++) {
						str += "<td>" + m['tz'][i]['zc' + j] + "</td>"
					}
					str += "</tr>"
				}
				$(".xxtb").prepend("<tr><td><a href='javascript:void(0);' class='close'>关闭</a></td><td><select class='xtype'><option value='2' selected>全部</option><option value='0'>投|注</option><option value='1'>补货</option></select></td><td colspan=20>" + m['page'] + "</td></tr>");
				$(".xxtb").append(str);
				$(".xxtb select").val(m['xtype']);
				$(".xxtb .close").click(function() {
					$(".xxtb").hide()
				});
				$(".xxtb select").change(function() {
					$(".ttype").val($(this).val());
					$(".page").val(1);
					obj.click()
				});
				$(".xxtb a.page").click(function() {
					$(".page").val($(this).html());
					obj.click()
				});
				$(".xxtb th a").unbind('click');
				$(".xxtb th a").click(function() {
					$(".sort").attr("orderby", $(this).attr('class'));
					if ($(this).find("img").attr('s') == 'up') {
						$(".sort").attr("sorttype", 'ASC');
						$(this).find("img").attr('src', globalpath + "img/up.gif");
						$(this).find("img").attr('s', 'down')
					} else {
						$(".sort").attr("sorttype", 'DESC');
						$(this).find("img").attr('src', globalpath + "img/down.gif");
						$(this).find("img").attr('s', 'up')
					}
					obj.click()
				});
				str = null;
				m = null
			}
		})
	})
}
function flyclick() {}
function in_array(v, a) {
	for (key in a) {
		if (a[key] == v) return true
	}
	return false
}
