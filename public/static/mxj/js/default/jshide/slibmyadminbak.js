// JavaScript Document
var libbstr = "<tr><th>类别</th><th>赔率</th><th>总注数</th><th>总投|注</th><th>占成</th><th>预计亏损</th><th>补货</th><th>已补</th></tr>";
var libcstr = "<tr><th>类别</th><th>赔率</th><th>总注数</th><th>总投|注</th><th>占成</th><th>预计亏损</th><th>补货</th><th>已补</th></tr>";
var upstr = "<span class='up'>&nbsp;+</span>";
var downstr = "<span class='down'>-&nbsp;</span>";

var libtha = "<tr><th class='f'>类别</th><th class='s' mname=''>赔率</th><th  class='t'>占成/总额</th><th  class='fo'>盈亏</th></tr>";
var libthb = "<th class='fb'>项目</th><th class='sb' mname=''>注单</th>";

var libastr = "<tr><td><table class='tinfo wd100'><tr><th class='f'>类别</th><th class='s'>赔率</th><th  class='t'>吃码</th><th  class='fo'>盈亏</th><th  class='fi'>已飞/补</th></table></td><td><table class='tinfo wd100'><tr><th class='f'>类别</th><th class='s'>赔率</th><th  class='t'>吃码</th><th  class='fo'>盈亏</th><th  class='fi'>已飞/补</th></table></td><td><table class='tinfo wd100'><tr><th class='f'>类别</th><th class='s'>赔率</th><th  class='t'>吃码</th><th  class='fo'>盈亏</th><th  class='fi'>已飞/补</th></table></td><td><table class='tinfo wd100'><tr><th class='f'>类别</th><th class='s'>赔率</th><th  class='t'>吃码</th><th  class='fo'>盈亏</th><th  class='fi'>已飞/补</th></table></td></tr>";

var rtime = Number($("#reloadtime").val());
var cnow;

var gnow;

var play;

function myready() {
	clayer = layername.length;
	if (layer < 8) {
		$(".xxtb tr:eq(0)").append("<th>所属" + layername[layer] + "</th>");
	}

	$(".xxtb tr:eq(0)").append("<th>集团</th>");
	for (i = 0; i < clayer - 1; i++) {
		$(".xxtb tr:eq(0)").append("<th>" + layername[i] + "</th>");
	}
	$("label").addClass('red');
	$("#qishu").change(function() {
		lib();
	});
	$("#xsort").change(function() {
		lib();
	});
	$("#reload").click(function() {
		parent.tops.window.location.href = parent.tops.window.location.href;
		//window.location.href = window.location.href;
		//clearTimeout(gnow);
		//gnow = setTimeout(getnow,5000);
		lib();
		return false;
	});
	getnow();
	time();
	$("#reloadtime").change(function() {
		rtime = Number($(this).val());
	});
	$(".libstyle").change(function() {
		$(".lib .xx").hide();
		var libstyle = Number($(".libstyle").val());
		if (libstyle == 0) {
			$(".lib .zcxx").show();
		} else if (libstyle == 1) {
			$(".lib .fly").show();
		} else if (libstyle == 2) {
			$(".lib .flyxx").show();
		} else if (libstyle == 3) {
			$(".lib .zje").show();
		}
	});
	$("#ab").change(function() {
		lib();
	});
	$("#abcd").change(function() {
		lib();
	});
	$("#userid").change(function() {
		lib();
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
		lib();
		return false;

	});

	$(".sandingwei tr td").click(function() {
		var index = $(this).index();
		index = (index - index % 2) / 2;
		$(".sandingwei td").removeClass('bover');
		$(this).addClass('bover');
		$(".sandingwei th").removeClass('bred');
		$(".sandingwei th:eq(" + index + ")").addClass('bred');
		libc();
		return false;

	});

	$("#pset").click(function() {
		var posi = $(this).position();
		$(".pset").css('left', 0);
		//$(".pset").css('left',posi.left+$(this).width()-$(".pset").width());
		$(".pset").css('top', posi.top);
		//$(".pset").css('top',posi.top+$(this).height());
		$(".pset").show();
		return false;
	});

	$(".psetclose").click(function() {
		$(".pset").hide();
		return false;
	});

	$(".btns").click(function() {
		selectma($(this).val());
		return false;
	});

	$("#psetcancel").click(function() {
		$(".lib .p1").each(function() {
			$(this).hide();
			$(this).val($(this).parent().find("label.peilv1").html());
			$(this).parent().find("label.peilv1").show();
		});
		$(".lib .p2").each(function() {
			$(this).hide();
			$(this).val($(this).parent().find("label.peilv2").html());
			$(this).parent().find("label.peilv2").show();
		});
		$(".lib th").removeClass('byellow');
		$(".lib td").removeClass('byellow');
		return false;
	});

	$("#psetsend").click(function() {
		var peilv = getResult(Number($("#psetvalue").val()), 2);
		if (peilv == NaN | peilv == undefined) {
			alert("请输入正确的赔率");
			$("#psetvalue").focus();
			return false;
		}
		$(".lib td.byellow").find("input.p1").val(peilv);
		$(".lib th.byellow").find("input.p1").val(peilv);
		return false;
	});


	$("#psetatt").click(function() {
		var pl = $(".lib td.byellow").length;
		if (pl == 0) return false;
		var pid = '|';
		$(".lib label.peilv1").each(function() {
			if ($(this).parent().hasClass('byellow')) {
				pid += $(this).parent().attr('pid') + "|";
			}
		});
		var action = $("#psettype").val();
		var val = $("#psetvalue").val();

		$.ajax({
			type: 'POST',
			url: mulu + 'pset',
			cache: false,
			data: 'xtype=setatt&pid=' + pid + "&val=" + val + "&action=" + action,
			success: function(m) {
				////$("#test").html(m);
				if (Number(m) == 1) {
					if (Number(action) == 0) {
						$(".lib td.byellow").each(function() {
							$(this).find("label.peilv1").html(getResult(Number($(this).find("label.peilv1").html()) - Number(val), 3));

						});
					} else {
						$(".lib td.byellow").each(function() {
							$(this).find("label.peilv1").html(getResult(Number($(this).find("label.peilv1").html()) + Number(val), 3));
						});
					}
					$(".lib td.byellow").each(function() {
						$(this).addClass('bc');
					});
					setTimeout(function() {
						$(".lib td.bc").removeClass('bc')
					}, 5000);
					$("#psetcancel").click();
				}

			}
		});
		return false;
	});

	$(".onepeilvtb .oneclose").click(function() {
		$(".onepeilvtb").hide();
		return false;
	});
	$(".onepeilvtb .onesend").click(function() {
		var pid = $(".onepeilvtb td:eq(0)").attr("pid");
		var peilv1 = $(".onepeilvtb input:text").val();
		var ab = $("#ab").val();
		var abcd = $("#abcd").val();
		var pl = '{"p1' + pid + '":"' + peilv1 + '"}';
		$.ajax({
			type: 'POST',
			url: mulu + 'pset',
			cache: false,
			data: "xtype=setpeilvall&pl=" + pl + "&abcd=" + abcd + "&ab=" + ab,
			success: function(m) {

				if (Number(m) == 1) {
					$(".lib label.peilv1").each(function() {
						if ($(this).parent().attr('pid') == pid) {
							$(this).html(peilv1);
							$(this).parent().find("input.p1").val(peilv1);
							$(".onepeilvtb").hide();
						}
					});
				}
			}
		});
		return false;
	});


	$("#writemoren").click(function() {
		if (!confirm("确定把当前赔率写入默认赔率吗？")) return false;
		$.ajax({
			type: 'POST',
			url: mulu + 'pset',
			cache: false,
			data: 'xtype=writemoren',
			success: function(m) {
				if (Number(m) == 1) {
					alert("写入默认赔率成功");
				}
			}
		});
		return false;
	});

	$("#psetpost").click(function() {
		var pl = $(".lib td.byellow").length;
		if (pl == 0) {
			var pl = $(".lib th.byellow").length;
			if (pl == 0) return false;
		}
		pl = new Array();
		var plstr = '{';
		var j = 0;
		$(".lib label.peilv1").each(function(i) {
			if ($(this).parent().hasClass('byellow')) {
				if (j != 0) plstr += ",";
				//pl["'a"+$(this).parent().parent().attr('pid')+"'"] = $(this).val();
				plstr += '"p1' + $(this).parent().attr('pid') + '":"' + $(this).parent().find(".p1").val() + '"';
				plstr += ',"p2' + $(this).parent().attr('pid') + '":"' + $(this).parent().find(".p2").val() + '"';
				j++;
			}
		});

		plstr += "}";
		//var plstr = json_encode_js(pl);
		//$("#test").html(plstr);
		var ab = $("#ab").val();
		var abcd = $("#abcd").val();

		$.ajax({
			type: 'POST',
			url: mulu + 'pset',
			cache: false,
			//dataType:'json',
			data: 'xtype=setpeilvall&pl=' + plstr + "&abcd=" + abcd + "&ab=" + ab,
			success: function(m) {
				//alert(m);
				if (Number(m) == 1) {
					$(".lib label.peilv1").each(function() {
						$(this).html($(this).parent().find("input.p1").val());
					});
					$(".lib label.peilv2").each(function() {
						$(this).html($(this).parent().find("input.p2").val());
					});
					//$(".lib td.byellow").find("label.peilv1").each(function(){$(this).html($(this).parent().find("input.p1").val());});
					//$(".lib td.byellow").find("label.peilv2").each(function(){$(this).html($(this).parent().find("input.p2").val());});
					$(".lib td.byellow").addClass('bc');

					setTimeout(function() {
						$(".lib td.bc").removeClass('bc');
					}, 5000);
					$("#psetcancel").click();
				}
			}
		});
		return false;
	});
	
	$("#pfly").click(function() {
		var posi = $(this).position();
		$(".sendtb").css("left", 5);
		$(".sendtb").css("top", posi.top + $(this).height());
		var i = 0;
		play = new Array();
		$(".lib .fly").each(function() {
			if (Number($(this).html()) >= 1) {
				var pname = $(this).parent().attr('mname');
				if (pname == undefined) pname = $(this).parent().parent().find(".s").attr("mname");
				var pid = $(this).parent().attr('pid');
				var bname = $(".now th.bred").html();

				var peilv1 = $(this).parent().find("label.peilv1").html();
				if (peilv1 == null | peilv1 == undefined) peilv1 = $(this).parent().parent().find("label.peilv1").html();
				var peilv2 = $(this).parent().find("label.peilv2").html();
				if (peilv2 == null | peilv2 == undefined) peilv2 = $(this).parent().parent().find("label.peilv2").html();
				if (peilv2 == null | peilv2 == undefined) peilv2 = 0;
				var je = Number($(this).html());

				play[i] = new Array();
				play[i]['pid'] = pid;
				play[i]['je'] = je;
				play[i]['name'] = pname;
				play[i]['peilv1'] = peilv1;
				play[i]['peilv2'] = peilv2;
				play[i]['con'] = '';
				play[i]['bz'] = '';
        var sname,cname; 
		if (bname == '1~5' | bname == '1字组合' | bname == '2字和数') {
			play[i]['classx'] = bname + ':' + $(this).parent().parent().parent().find(".sname").html();

		} else if (bname == '2字定位' | bname == '2字组选') {
			play[i]['classx'] = bname + ':' + $(".nowson th.bred").html();
		} else if (bname == '3字和数') {
			var index = $(this).parent().parent().index();
			$(".lib .sname").each(function() {
				if (index >= $(this).parent().index()) {
					sname = $(this).html();
				}
			});

			$(".lib .cname").each(function() {

				if (index >= $(this).parent().index()) {
					cname = $(this).html();
				}
			});
			play[i]['classx'] = bname + ':' + sname + '-' + cname;
		} else if (bname == '总和龙虎') {
			var index = $(this).parent().parent().index();
			$(".lib .sname").each(function() {
				if (index >= $(this).parent().index()) {
					sname = $(this).html();
				}
			});

			$(".lib .cname").each(function() {

				if (index >= $(this).parent().index()) {
					cname = $(this).html();
				}
			});
			play[i]['classx'] = bname + ':' + cname;

		} else if (bname == '跨度' | bname == '其他') {
			var index = $(this).parent().parent().index();
			$(".lib .sname").each(function() {
				if (index >= $(this).parent().index()) {
					sname = $(this).html();
				}
			});

			$(".lib .cname").each(function() {

				if (index >= $(this).parent().index()) {
					cname = $(this).html();
				}
			});
			play[i]['classx'] = bname + ':' + sname + '-' + cname;
		}else{
				    play[i]['classx'] = bname + ':'
				}
				i++;
			}
		});
		if(i>0){
		exe();}


	});

}

function lib() {
	$(".libs").hide();
	var bname = $(".now .bred").html();
	var bid = $(".now .bover").attr('bid');
	$(".nowson").hide();
	$(".sandingwei").hide();
	clearTimeout(cnow);
	if (bname == "1~5" ) {
		liba();


	} else if (bname == "1字组合") {
		libb();


	} else if (bname == "2字定位") {
		getc(bid, bname);


	} else if (bname == "2字组选") {
		getc(bid, bname);


	} else if (bname == "2字和数") {
		liba();


	} else if (bname == "3字定位") {
		$(".sandingwei").show();
		getc(bid, bname);
		//getnowsan();

	} else if (bname == "3字组选") {
		getc(bid, bname);


	} else if (bname == "3字和数") {
		libd();


	} else if (bname == "总和龙虎") {
		libe();


	} else if (bname == "组选3") {
		getc(bid, bname);


	} else if (bname == "组选6") {
		getc(bid, bname);


	} else if (bname == "跨度") {
		libf();


	} else if (bname == "其他") {
		libf();


	}else { //if(bname.indexOf('球')!=-1 | )
	    lib0();
	}



}

function getc(bid, bname) {

	$.ajax({
		type: 'POST',
		url: mulu + 'slib',
		dataType: 'json',
		cache: false,
		data: 'xtype=getc&bid=' + bid,
		success: function(m) {
			////$("#test").html(m);return;
			var ml = m.length;

			var str = "<tr>";
			for (i = 0; i < ml; i++) {
				str += "<th class='c" + m[i].cid + "'>" + m[i].name + "</th><td cid='" + m[i].cid + "' cname='" + m[i].name + "' class='nowson" + m[i].cid + "'></td>";


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
				libc();
				return false;
			});
			libc();


		}


	});


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
		url: mulu + 'slib',
		dataType: 'json',
		cache: false,
		data: 'xtype=getlib&stype=s' + str,
		success: function(m) {
			//$("#test").html(m);return;
			var ml = m.length;
			var str = "<tr>";
			var sname = '';
			var j = 0;
			var trl = 11;
			if (ml==18) trl=10;
			for (i = 0; i < ml; i++) {

				if (i%trl==0) {
                   if(i!=0) str += "</table></td>";
					str += "<TD valign=top><table class='tinfo wd100'>";



				}


				str += "<tr ";
				if (m[i]['z'] == '1') str += " class='z1' ";
				str += ">";


				str += "<th class='f m'  pid='" + m[i]['pid'] + "' >" + m[i]['name'] + "</th>";


				str += "<td class='s' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "'>" + downstr + "<label class='peilv1'>" + m[i]['peilv1'] + "</label><input type='text' value='" + m[i]['peilv1'] + "' class='small hide p1' />" + upstr + "</td>";
				str += "<td class='t "
				if (Number(m[i]['wje']) == 1) str += "warn";
				str += "' title='" + m[i]['zs'] + "'  pid='" + m[i]['pid'] + "' ><label  class='zcxx xx'>" + m[i]['zc'] + "</label><label  class='fly xx'>" + m[i]['bu'] + "</label><label  class='flyxx xx'>" + m[i]['fly'] + "</label>/<span>" + m[i]['zje'] + "</span></td>";
				str += "<td class='fo ";
				if (Number(m[i]['ks']) > 0) str += "red";
				else if (Number(m[i]['ks']) < 0) str += "lv";
				if (Number(m[i]['wks']) == 1) str += " warn";
				str += "'>" + getResult(Number(m[i]['ks']), 1) + "</td>";
/*                str += "<td class='fi'><label class='flyxx'>" + m[i]['fly'] + "</label>/<a href='javascript:void(0)' bje='" + getResult(m[i]['bu'], 0) + "' class='bu";
                if (Number(m[i]['bu'])) str += " byellow";
                str += "'>" + getResult(m[i]['bu'], 0) + "</a></td>";*/
				str += "</tr>";


				sname = m[i]['sname'];



			}

			str += "</table></td></tr>";
			$(".lib").html(str);
			//$("#test2").val(str);
			$(".lib td").attr("valign", 'top');
			str = null;
			m = null;
			$(".lib").removeClass('w1002');
			$(".lib").addClass('w1330');
			addfunc();



		}


	});


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
		url: mulu + 'slib',
		dataType: 'json',
		cache: false,
		data: 'xtype=getlib&stype=s' + str,
		success: function(m) {
			//$("#test").html(m);return;
			var ml = m.length;
			var str = "<tr>";
			var sname = '';
			var j = 0;
			for (i = 0; i < ml; i++) {

				if (sname != m[i]['sname']) {

					if (sname != '') str += "</table></td>";
					if (j % 5 == 0 & sname != '') str += "</tr><tr>";
					str += "<TD valign=top><table class='tinfo wd100'><tr><th colspan=4 class='bt sname'>" + m[i]['sname'] + "</th></tr>";
					str += libtha;
					j++;



				}


				str += "<tr ";
				if (m[i]['z'] == '1') str += " class='z1' ";
				str += ">";


				str += "<th class='f m'  pid='" + m[i]['pid'] + "' >" + m[i]['name'] + "</th>";


				str += "<td class='s' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "'>" + downstr + "<label class='peilv1'>" + m[i]['peilv1'] + "</label><input type='text' value='" + m[i]['peilv1'] + "' class='small hide p1' />" + upstr + "</td>";
				str += "<td class='t "
				if (Number(m[i]['wje']) == 1) str += "warn";
				str += "' title='" + m[i]['zs'] + "'  pid='" + m[i]['pid'] + "' ><label  class='zcxx xx'>" + m[i]['zc'] + "</label><label  class='fly xx'>" + m[i]['bu'] + "</label><label  class='flyxx xx'>" + m[i]['fly'] + "</label>/<span>" + m[i]['zje'] + "</span></td>";
				str += "<td class='fo ";
				if (Number(m[i]['ks']) > 0) str += "red";
				else if (Number(m[i]['ks']) < 0) str += "lv";
				if (Number(m[i]['wks']) == 1) str += " warn";
				str += "'>" + getResult(Number(m[i]['ks']), 1) + "</td>";
/*                str += "<td class='fi'><label class='flyxx'>" + m[i]['fly'] + "</label>/<a href='javascript:void(0)' bje='" + getResult(m[i]['bu'], 0) + "' class='bu";
                if (Number(m[i]['bu'])) str += " byellow";
                str += "'>" + getResult(m[i]['bu'], 0) + "</a></td>";*/
				str += "</tr>";


				sname = m[i]['sname'];



			}

			str += "</table></td></tr>";
			$(".lib").html(str);
			//$("#test2").val(str);
			$(".lib td").attr("valign", 'top');
			str = null;
			m = null;
			$(".lib").removeClass('w1002');
			$(".lib").addClass('w1330');
			addfunc();



		}


	});


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
	//alert(str);
	$.ajax({
		type: 'POST',
		url: mulu + 'slib',
		dataType: 'json',
		cache: false,
		data: 'xtype=getlib&stype=d' + str,
		success: function(m) {
			////$("#test").html(m);return;
			var ml = m.length;
			var str = "<tr>";
			var cname = '';
			for (i = 0; i < ml; i++) {

				if (cname != m[i]['cname']) {
					if (cname != '') str += "</table></td>";
					str += "<TD valign=top><table class='tinfo wd100'><tr><th colspan=4 class='bt sname'>" + m[i]['cname'] + "</th></tr>";
					str += libtha;


				}


				str += "<tr  ";
				if (m[i]['z'] == '1') str += " class='z1' ";
				str += ">";


				str += "<th class='f m'   pid='" + m[i]['pid'] + "'>" + m[i]['name'] + "</th>";


				str += "<td class='s' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "'>" + downstr + "<label class='peilv1'>" + m[i]['peilv1'] + "</label><input type='text' value='" + m[i]['peilv1'] + "' class='small hide p1' />" + upstr + "</td>";
				str += "<td class='t ";
				if (Number(m[i]['wje']) == 1) str += " warn";
				str += "' title='" + m[i]['zs'] + "'  pid='" + m[i]['pid'] + "' ><label  class='zcxx xx'>" + m[i]['zc'] + "</label><label  class='fly xx'>" + m[i]['bu'] + "</label><label  class='flyxx xx'>" + m[i]['fly'] + "</label>/<span>" + m[i]['zje'] + "</span></td>";
				str += "<td class='fo ";
				if (Number(m[i]['ks']) > 0) str += "red";
				else if (Number(m[i]['ks']) < 0) str += "lv";
				if (Number(m[i]['wks']) == 1) str += " warn";
				str += "'>" + getResult(Number(m[i]['ks']), 1) + "</td>";

				str += "</tr>";


				cname = m[i]['cname'];



			}
			str += "</table></td></tr>";
			$(".lib").html(str);
			$(".lib td").attr("valign", 'top');
			str = null;
			m = null;
			$(".lib").removeClass('w1002');
			$(".lib").addClass('w1330');
			addfunc();



		}


	});


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
	//alert(str);
	$(".lib").html('');
	$.ajax({
		type: 'POST',
		url: mulu + 'slib',
		dataType: 'json',
		cache: false,
		data: 'xtype=getlib&stype=c' + str,
		success: function(m) {
			////$("#test").html(m);return;
			var ml = m.length;
			var str = "";
			var cname = '';

			str += "<tr>" + libthb + libthb + libthb + libthb + libthb + libthb + libthb + libthb + libthb + libthb + "</tr>";
			for (i = 0; i < ml; i++) {

				if (i % 10 == 0) {
					if (i != 0) str += "</tr>";
					str += "<tr>";


				}



				str += "<th class='fb m'   pid='" + m[i]['pid'] + "'>" + m[i]['name'] + "</th>";


				str += "<th class='";
				if (Number(m[i]['z']) == 1) str += "z1";
				else if (Number(m[i]['wks']) == 1 | Number(m[i]['wje']) == 1) str += "warn";
				str += " sb' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "'>" + downstr + "<label class='peilv1'>" + m[i]['peilv1'] + "</label><input type='text' value='" + m[i]['peilv1'] + "' class='small hide p1' />" + upstr + "<BR /><label  class='zcxx xx'>" + m[i]['zc'] + "</label><label  class='fly xx'>" + m[i]['bu'] + "</label><label  class='flyxx xx'>" + m[i]['fly'] + "</label><span class='xx zje'>" + m[i]['zje'] + "</span>/<label class='";
				if (Number(m[i]['ks']) > 0) str += "red";
				else if (Number(m[i]['ks']) < 0) str += "lv";
				str += "'>" + getResult(m[i]['ks'], 0) + "</label></th>";







			}
			str += "";
			str += "</tr>";
			//$ ("#test2").val(str);
			$(".lib").html(str);
			$(".lib td").attr("valign", 'top');
			str = null;
			m = null;
			$(".lib").removeClass('w1002');
			$(".lib").addClass('w1330');
			addfunc();



		}


	});


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
		url: mulu + 'slib',
		dataType: 'json',
		cache: false,
		data: 'xtype=getlib&stype=s' + str,
		success: function(m) {
			////$("#test").html(m);return;
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
					str += "<tr><th rowspan=" + 4 + " class='bt sname'>" + m[i]['sname'] + "</th>";
					left1cname = '';
					j = 0;


				}

				if (left1cname != m[i].cname.substr(0, 1)) {
					if (left1cname != '') str += "</tr><tr><th rowspan=2 class='bt cname'>" + m[i].cname + "</th>";
					else str += "<th rowspan=2 class='bt cname'>" + m[i].cname + "</th>";
					j = 0;


				}

				if (j == 10 & left1cname != '') {
					j = 0;
					str += "</tr><tr>";

				}




				str += "<th class='fb m'  pid='" + m[i]['pid'] + "'>" + m[i]['name'] + "</th>";


				str += "<th class='sb ";
				if (Number(m[i]['z']) == 1) str += "z1";
				else if (Number(m[i]['wks']) == 1 | Number(m[i]['wje']) == 1) str += "warn";
				str += "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "'>" + downstr + "<label class='peilv1'>" + m[i]['peilv1'] + "</label><input type='text' value='" + m[i]['peilv1'] + "' class='small hide p1' />" + upstr + "<BR /><label  class='zcxx xx'>" + m[i]['zc'] + "</label><label  class='fly xx'>" + m[i]['bu'] + "</label><label  class='flyxx xx'>" + m[i]['fly'] + "</label><span class='xx zje'>" + m[i]['zje'] + "</span>/<label class='";
				if (Number(m[i]['ks']) > 0) str += "red";
				else if (Number(m[i]['ks']) < 0) str += "lv";
				str += "'>" + getResult(m[i]['ks'], 0) + "</label></th>";


				cname = m[i]['cname'];
				left1cname = m[i].cname.substr(0, 1);
				sid = Number(m[i]['sid'])
				cid = Number(m[i]['cid'])
				j++;

			}

			str += "</tr>";
			$(".lib").html(str);
			////$("#test").val(str);
			$(".lib td").attr("valign", 'top');
			str = null;
			m = null;
			$(".lib").removeClass('w1002');
			$(".lib").addClass('w1330');
			addfunc();



		}


	});


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
		url: mulu + 'slib',
		dataType: 'json',
		cache: false,
		data: 'xtype=getlib&stype=s' + str,
		success: function(m) {
			////$("#test").html(m);return;
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
					str += "<tr><th rowspan=" + 6 + " class='bt sname'>" + m[i]['sname'] + "</th>";
					left1cname = '';
					j = 0;


				}

				if (left1cname != m[i].cname.substr(0, 1)) {
					if (left1cname != '') str += "</tr><tr><th rowspan=2 class='bt cname'>" + m[i].cname + "</th>";
					else str += "<th rowspan=2 class='bt cname'>" + m[i].cname + "</th>";
					j = 0;


				}

				if (j == 10 & left1cname != '') {
					j = 0;
					str += "</tr><tr>";

				}

				if (ztype != Number(m[i].ztype)) {

				}


				str += "<th class='fb m'  pid='" + m[i]['pid'] + "' >" + m[i]['name'] + "</th>";


				str += "<th class='sb "
				if (Number(m[i]['z']) == 1) str += "z1";
				else if (Number(m[i]['wks']) == 1 | Number(m[i]['wje']) == 1) str += "warn";
				str += "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "'>" + downstr + "<label class='peilv1'>" + m[i]['peilv1'] + "</label><input type='text' value='" + m[i]['peilv1'] + "' class='small hide p1' />" + upstr + "<BR /><label  class='zcxx xx'>" + m[i]['zc'] + "</label><label  class='fly xx'>" + m[i]['bu'] + "</label><label  class='flyxx xx'>" + m[i]['fly'] + "</label><span class='xx zje'>" + m[i]['zje'] + "</span>/<label class='";
				if (Number(m[i]['ks']) > 0) str += "red";
				else if (Number(m[i]['ks']) < 0) str += "lv";
				str += "'>" + getResult(m[i]['ks'], 0) + "</label></th>";


				cname = m[i]['cname'];
				left1cname = m[i].cname.substr(0, 1);
				sid = Number(m[i]['sid'])
				cid = Number(m[i]['cid'])
				j++;

			}

			str += "</tr>";
			$(".lib").html(str);
			////$("#test").val(str);
			$(".lib td").attr("valign", 'top');
			str = null;
			m = null;
			$(".lib").removeClass('w1002');
			$(".lib").addClass('w1330');
			addfunc();


		}


	});


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
		url: mulu + 'slib',
		dataType: 'json',
		cache: false,
		data: 'xtype=getlib&stype=d' + str,
		success: function(m) {
			////$("#test").html(m);return;
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
					str += "<tr><th rowspan=" + 3 + " class='bt sname'>" + m[i]['sname'] + "</th>";
					left1cname = '';
					j = 0;


				}

				if (left1cname != m[i].cname.substr(0, 1)) {
					if (left1cname != '') str += "</tr><tr><th rowspan=1 class='bt cname'>" + m[i].cname + "</th>";
					else str += "<th rowspan=1 class='bt cname'>" + m[i].cname + "</th>";
					j = 0;


				}

				if (j == 10 & left1cname != '') {
					j = 0;
					str += "</tr><tr>";

				}

				if (ztype != Number(m[i].ztype)) {

				}


				str += "<th class='fb m'  pid='" + m[i]['pid'] + "' >" + m[i]['name'] + "</th>";


				str += "<th class='"
				if (Number(m[i]['z']) == 1) str += "z1";
				else if (Number(m[i]['wks']) == 1 | Number(m[i]['wje']) == 1) str += "warn";
				str += " sb' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "'>" + downstr + "<label class='peilv1'>" + m[i]['peilv1'] + "</label><input type='text' value='" + m[i]['peilv1'] + "' class='small hide p1' />" + upstr + "<BR /><label  class='zcxx xx'>" + m[i]['zc'] + "</label><label  class='fly xx'>" + m[i]['bu'] + "</label><label  class='flyxx xx'>" + m[i]['fly'] + "</label><span class='xx zje'>" + m[i]['zje'] + "</span>/<label class='";
				if (Number(m[i]['ks']) > 0) str += "red";
				else if (Number(m[i]['ks']) < 0) str += "lv";
				str += "'>" + getResult(m[i]['ks'], 0) + "</label></th>";


				cname = m[i]['cname'];
				left1cname = m[i].cname.substr(0, 1);
				sid = Number(m[i]['sid'])
				cid = Number(m[i]['cid'])
				j++;

			}

			str += "</tr>";
			$(".lib").html(str);
			//$("#test").val(str);
			$(".lib td").attr("valign", 'top');
			str = null;
			m = null;
			$(".lib").removeClass('w1002');
			$(".lib").addClass('w1330');
			addfunc();



		}


	});


}



function selectma(val) {
	$("#psetcancel").click();
	if (val == "大") {
		$(".lib .s").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '5' | pname == '6' | pname == '7' | pname == '8' | pname == '9') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow');
			}
		});
		$(".lib .sb").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '5' | pname == '6' | pname == '7' | pname == '8' | pname == '9') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow');
			}
		});
	}
	if (val == "小") {
		$(".lib .s").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '0' | pname == '1' | pname == '2' | pname == '3' | pname == '4') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow');
			}
		});
		$(".lib .sb").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '0' | pname == '1' | pname == '2' | pname == '3' | pname == '4') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow');
			}
		});
	}
	if (val == "单") {
		$(".lib .s").each(function() {
			var pname = $(this).attr('mname');

			if (pname == '1' | pname == '3' | pname == '5' | pname == '7' | pname == '9') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow');
			}
		});
		$(".lib .sb").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '1' | pname == '3' | pname == '5' | pname == '7' | pname == '9') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow');
			}
		});
	}

	if (val == "双") {
		$(".lib .s").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '0' | pname == '2' | pname == '4' | pname == '6' | pname == '8') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow');
			}
		});
		$(".lib .sb").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '0' | pname == '2' | pname == '4' | pname == '6' | pname == '8') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow');
			}
		});
	}

	if (val == "质") {
		$(".lib .s").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '1' | pname == '2' | pname == '3' | pname == '5' | pname == '7') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow');
			}
		});
		$(".lib .sb").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '1' | pname == '2' | pname == '3' | pname == '5' | pname == '7') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow');
			}
		});
	}
	if (val == "合") {
		$(".lib .s").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '0' | pname == '4' | pname == '6' | pname == '8' | pname == '9') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow');
			}
		});
		$(".lib .sb").each(function() {
			var pname = $(this).attr('mname');
			if (pname == '0' | pname == '4' | pname == '6' | pname == '8' | pname == '9') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow');
			}
		});
	}
	if (val == "全部") {
		$(".lib input:text").each(function() {
			$(this).parent().find("label.peilv1").hide();
			$(this).show();
			$(this).parent().addClass('byellow');
		});

	}
	if (val == "对对") {
		$(".lib .sb").each(function() {
			var pname = $(this).attr('mname');
			if (Number(pname) % 11 == 0 & pname != '') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow');
			}
		});
	}
	if (val == "豹子") {
		$(".lib .sb").each(function() {
			var pname = $(this).attr('mname');
			if (Number(pname) % 111 == 0 & pname != '') {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow');
			}
		});
	}
	if (val == "一般") {
		$(".lib .sb").each(function() {
			var pname = $(this).attr('mname');
			if (Number(pname) % 11 != 0 & Number(pname) % 111 == 0) {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow');
			}
		});
	}


	if (Number(val) % 1 == 0) {
		$(".lib .s").each(function() {
			var pname = $(this).attr('mname');
			if (pname.indexOf(val) != -1) {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow');
			}
		});
		$(".lib .sb").each(function() {
			var pname = $(this).attr('mname');
			if (pname.indexOf(val) != -1) {
				$(this).find("label.peilv1").hide();
				$(this).find("input:text").show();
				$(this).addClass('byellow');
			}
		});
	}

}


function addfunc() {
	xxclick();
	flyclick();
	
	$("tr.z1").find("td").addClass('z1');
	$("tr.z3").find("td").addClass('z3');
	$("tr.z1").find("th").addClass('z1');
	$("tr.z3").find("th").addClass('z3');
	$(".lib .xx").css("color", 'red');

	$(".peilv1").parent().find("span").click(function() {
		var action = $(this).attr('class');
		var pid = $(this).parent().attr('pid');
		var obj = $(this).parent();
		$.ajax({
			type: 'POST',
			url: mulu + 'pset',
			cache: false,
			data: 'xtype=setatttwo&pid=' + pid + "&action=" + action,
			success: function(m) {
				//$("#test").html(m);

				if ((Number(m) * 1000) % 1 == 0) {
					if (action == 'up') {
						var tmp = getResult(Number(obj.find("label.peilv1").html()) + Number(m), 3);
						obj.find("label.peilv1").html(tmp);
						obj.find("input.p1").val(tmp);
					} else {
						var tmp = getResult(Number(obj.find("label.peilv1").html()) - Number(m), 3);
						obj.find("label.peilv1").html(tmp);
						obj.find("input.p1").val(tmp);
					}
					obj.addClass("bc");
					setTimeout(function() {
						obj.removeClass('bc')
					}, 5000);
				}
			}
		});
		return false;
	});
	$(".peilv1").parent().parent().mouseover(function() {
		$(this).addClass('bover');
	}).mouseout(function() {
		$(this).removeClass('bover');
	});
	$(".lib label.peilv1").click(function() {
		$(this).parent().find("input.p1").show();
		$(this).hide();
		$(this).parent().addClass('byellow');
		return false;
	});
	$(".lib label.peilv2").click(function() {
		$(this).parent().find("input.p2").show();
		$(this).hide();
		$(this).parent().addClass('byellow');
		return false;
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
		$(".onepeilvtb").show();
		return false;
	});

	$(".lib .xx").hide();
	var libstyle = Number($(".libstyle").val());
	if (libstyle == 0) {
		$(".lib .zcxx").show();
	} else if (libstyle == 1) {
		$(".lib .fly").show();
	} else if (libstyle == 2) {
		$(".lib .flyxx").show();
	} else if (libstyle == 3) {
		$(".lib .zje").show();
	}
	$(".lib label.fly").each(function() {
		if (Number($(this).html()) > 0) $(this).addClass('flys');
	});
	$(".lib label.fly").click(function() {

		if (Number($(this).html()) < 1) return false;
		var posi = $(this).position();
		var left = posi.left - $(".sendtb").width() + $(this).width();
		if(left<0) left=5;
		$(".sendtb").css("left", left);
		$(".sendtb").css("top", posi.top + $(this).height());

		var pname = $(this).parent().attr('mname');
		if (pname == undefined) pname = $(this).parent().parent().find(".s").attr("mname");
		var pid = $(this).parent().attr('pid');
		var bname = $(".now th.bred").html();

		var peilv1 = $(this).parent().find("label.peilv1").html();
		if (peilv1 == null | peilv1 == undefined) peilv1 = $(this).parent().parent().find("label.peilv1").html();
		var peilv2 = $(this).parent().find("label.peilv2").html();
		if (peilv2 == null | peilv2 == undefined) peilv2 = $(this).parent().parent().find("label.peilv2").html();
		if (peilv2 == null | peilv2 == undefined) peilv2 = 0;
		var je = Number($(this).html());
		play = new Array();
		play[0] = new Array();
		play[0]['pid'] = pid;
		play[0]['je'] = je;
		play[0]['name'] = pname;
		play[0]['peilv1'] = peilv1;
		play[0]['peilv2'] = peilv2;
		play[0]['con'] = '';
		play[0]['bz'] = '';

		var sname,cname;
		if (bname == '1~5' | bname == '1字组合' | bname == '2字和数') {
			play[0]['classx'] = bname + ':' + $(this).parent().parent().parent().find(".sname").html();

		} else if (bname == '2字定位' | bname == '2字组选') {
			play[0]['classx'] = bname + ':' + $(".nowson th.bred").html();
		} else if (bname == '3字和数') {
			var index = $(this).parent().parent().index();
			$(".lib .sname").each(function() {
				if (index >= $(this).parent().index()) {
					sname = $(this).html();
				}
			});

			$(".lib .cname").each(function() {

				if (index >= $(this).parent().index()) {
					cname = $(this).html();
				}
			});
			play[0]['classx'] = bname + ':' + sname + '-' + cname;
		} else if (bname == '总和龙虎') {
			var index = $(this).parent().parent().index();
			$(".lib .sname").each(function() {
				if (index >= $(this).parent().index()) {
					sname = $(this).html();
				}
			});

			$(".lib .cname").each(function() {

				if (index >= $(this).parent().index()) {
					cname = $(this).html();
				}
			});
			play[0]['classx'] = bname + ':' + cname;

		} else if (bname == '跨度' | bname == '其他') {
			var index = $(this).parent().parent().index();
			$(".lib .sname").each(function() {
				if (index >= $(this).parent().index()) {
					sname = $(this).html();
				}
			});

			$(".lib .cname").each(function() {

				if (index >= $(this).parent().index()) {
					cname = $(this).html();
				}
			});
			play[0]['classx'] = bname + ':' + sname + '-' + cname;
		}else{
				    play[0]['classx'] = bname + ':'
				}
		exe();

	});
}

function sumje() {

	var je = 0;
	$(".sendtb .je").each(function() {
		je += Number($(this).val());
	});
	$(".sendtb .sumje").html(je);
}

function exe() {

	var str = '';

	var je = 0;
	var pl = play.length;
	for (j = 0; j < pl; j++) {
		str += "<tr pid='" + play[j]['pid'] + "' content='' class='cg" + play[j]['pid'] + "'>";
		str += "<td>" + (j + 1) + "</td>";
		str += "<td>" + play[j]['classx'] + '-<label class=red>' + play[j]['name'] + "</label></td>";
		str += "<td class=p1><label >" + play[j]['peilv1'] + "</label><input type='text' class='txt1 peilv1' value='" + play[j]['peilv1'] + "' /></td>";
		str += "<td class=p2><input type='text' class='txt1 peilv2' value='" + play[j]['peilv2'] + "' /></td>";
		str += "<td class='tpoints'><input type='text' class='txt1 points' value='" + 1 + "' />%</td>";
		str += "<td je='" + play[j]['je'] + "'><input type='text' class='txt1 je' value='" + play[j]['je'] + "' /></td>";
		str += "<td><input type='button' class='btnf del' value='删除' /></td>";
		str += "</tr>";
		je += Number(play[j]['je']);
	}


	//$("#test2").val(str);
	$(".sendtb").show();
	$(".sendtb").empty();

	$(".sendtb").prepend("<tr><td><select class='fly'>" + $("#fly").html() + "</select></td><td colspan=5><span>金额：<input value='100' class='txt1 sendje' type='text' /></span><span class='tpoints'>退水：<input value='1' class='txt1 sendpoints' type='text' /><BR />赔率1：<input value='1' class='txt1 peilv1s' type='text' />赔率2：<input value='1' class='txt1 peilv2s'  type='text' /></span></td><td><input type='button' value='送出' class='btnf sends' /></td></tr><tr><td colspan=7><input type='button' class='qr btn3 btnf' value='确认投|注' /><input type='button' class='cancel btn1 btnf' value='关闭' style='margin-left:10px;' /></td></tr><tr><th>编号</th><th>内容</th><th class=p1>赔率</th><th class=p2>赔率2</th><th class='tpoints'>退水%</th><th>金额</th><th>删除</th></tr>");
	$(".sendtb").append(str);
	$(".sendtb").append("<tr><th>合計</th><td ></td><td class=p1></td><td class='p2'></td><td class='tpoints'></td><th class='sumje'>" + je + "</th><TD></td></tr>");
	$(".sendtb").append("<tr><td colspan=7><input type='button' class='qr btn3 btnf' value='确认投|注' /><input type='button' class='cancel btn1 btnf' value='关闭' style='margin-left:10px;' /></td></tr>");
	$(".sendtb").append("<tr><td  colspan=7></td></tr>");


	if (Number($(".sendtb .fly").val()) == 1) {
		$(".sendtb .tpoints").hide();
		$(".sendtb .p2").hide();
		$(".sendtb .p1").find("input").hide();
		$(".sendtb .p1").find("label").show();
	} else {
		$(".sendtb .tpoints").show();
		$(".sendtb .p1").find("input").show();
		$(".sendtb .p1").find("label").hide();
		$(".sendtb .p2").show();

	}
	$(".sendtb .fly").change(function() {
		if (Number($(this).val()) == 1) {
			$(".sendtb .tpoints").hide();
			$(".sendtb .p2").hide();
			$(".sendtb .p1").find("input").hide();
			$(".sendtb .p1").find("label").show();


		} else {
			$(".sendtb .tpoints").show();
			$(".sendtb .p1").find("input").show();
			$(".sendtb .p1").find("label").hide();
			$(".sendtb .p2").show();
		}
	});

	$(".sendtb .sends").click(function() {
		var je = $(".sendtb .sendje").val();
		if (je == '' | Number(je) % 1 != 0 | Number(je) == 0) {
			alert("请输入正确的金额,最小1,不能有小数点");
			$(".sendtb .sendje").focus();
			return false;
		}
		$(".sendtb .je").val(je);
		sumje();
		if (Number($(".sendtb .fly").val()) == 2) {
			var points = $(".sendtb .sendpoints").val();
			if (points == '' | Number(points) * 100 % 1 != 0) {
				alert("请输入正确的退水");
				$(".sendtb .sendpoints").focus();
				return false;
			}
			var peilv1s = $(".sendtb .peilv1s").val();
			if (peilv1s == '' | Number(peilv1s) * 1000 % 1 != 0) {
				alert("请输入正确的赔率");
				$(".sendtb .peilv1s").focus();
				return false;
			}
			var peilv2s = $(".sendtb .peilv2s").val();
			if (peilv2s == '' | Number(peilv2s) * 1000 % 1 != 0) {
				alert("请输入正确的赔率");
				$(".sendtb .peilv2s").focus();
				return false;
			}
			$(".sendtb .peilv1").val(peilv1s);
			$(".sendtb .peilv2").val(peilv2s);
			$(".sendtb .points").val(points);
		}
	});
	$(".sendtb .je").blur(function() {
		if (isNaN($(this).val())) {
			$(this).val('1');
		}
		sumje();
	});

	$(".sendtb .del").click(function() {

		play.splice($(this).parent().parent().index() - 3, 1);

		$(this).parent().parent().remove();
		if (play.length == 0) {
			$(".sendtb").empty();
			$(".sendtb").hide();
			play = null;
		}
	});

	str = null;
	//play = null;

	$(".sendtb input:button").addClass("btn2 btnf");


	$(".sendtb .cancel").click(function() {
		$(".sendtb").hide();
		return false;
	});
	$(".sendtb .print").click(function() {
		tzprint();
		return false;
	});


	$(".sendtb .qr").click(function() {

		$(".sendtb input:button").attr("disabled", true);

		var pl = play.length;

		for (j = 0; j < pl; j++) {
			var je = $(".sendtb .cg" + play[j]['pid']).find("input.je").val();
			if (isNaN(je) | Number(je) % 1 != 0) {
				alert("输入的金额不正确！");
				return false;
			}
			var peilv1s = 0;
			var peilv2s = 0;
			var points = 0;
			if (Number($(".sendtb .fly").val()) == 2) {
				var peilv1s = $(".sendtb .cg" + play[j]['pid']).find("input.peilv1").val();
				var peilv2s = $(".sendtb .cg" + play[j]['pid']).find("input.peilv2").val();
				var points = $(".sendtb .cg" + play[j]['pid']).find("input.points").val();
				if (points == '' | Number(points) * 100 % 1 != 0) {
					alert("请输入正确的退水");
					return false;
				}
				if (peilv1s == '' | Number(peilv1s) * 1000 % 1 != 0) {
					alert("请输入正确的赔率");
					return false;
				}
				if (peilv2s == '' | Number(peilv2s) * 1000 % 1 != 0) {
					alert("请输入正确的赔率");
					return false;
				}
			}
			play[j]['je'] = je;
			play[j]['peilv1'] = peilv1s;
			play[j]['peilv2'] = peilv2s;
			play[j]['points'] = points;

		}


		var pstr = '[';
		for (i = 0; i < pl; i++) {
			if (i != 0) pstr += ',';
			pstr += json_encode_js(play[i]);
		}
		pstr += ']';
		var ab = $("#ab").val();
		var abcd = $("#abcd").val();
		var bid = $(".now .bover").attr("bid");
		var fly = $(".sendtb .fly").val();
		var str = "&abcd=" + abcd + "&ab=" + ab + "&bid=" + bid + "&fly=" + fly;

		$.ajax({
			type: 'POST',
			url: mulu + 'slib',
			data: 'xtype=bucang&pstr=' + pstr + str,
			dataType: 'json',
			cache: false,
			success: function(m) {
				//$("#test").html(m);return;
				var ml = m.length;
				var gflag = false;
				var bflag = false;
				var errstr = "";

				for (i = 0; i < ml; i++) {
					if (Number(m[i]['cg']) == 1) {
						if ($(".sendtb .cg" + m[i]['pid'] + '_' + i).html() == null) {
							$(".sendtb .cg" + m[i]['pid']).find("td:eq(0)").html("成功!");
							$(".sendtb .cg" + m[i]['pid']).find("td:eq(0)").addClass("lv");
							if (Number($(".sendtb .fly").val()) == 1) {
								$(".sendtb .cg" + m[i]['pid']).find("td:eq(2)").html(m[i]['peilv1']);
							}
						} else {
							$(".sendtb .cg" + m[i]['pid'] + '_' + i).find("td:eq(0)").html("成功!");
							$(".sendtb .cg" + m[i]['pid'] + '_' + i).find("td:eq(0)").addClass("lv");
							if (Number($(".sendtb .fly").val()) == 1) {
								$(".sendtb .cg" + m[i]['pid'] + '_' + i).find("td:eq(2)").html(m[i]['peilv1']);
							}
						}
						//$(".sendtb .print").show();
						$(".sendtb .qr").hide();
						$(".sendtb .cancel").attr("disabled", false);
						$(".sendtb .print").attr("disabled", false);
						$(".sendtb input:text").attr("disabled", true);
					} else {
						if ($(".sendtb .cg" + m[i]['pid'] + '_' + i).html() == null) {
							$(".sendtb .cg" + m[i]['pid']).find("td:eq(0)").html(m[i]['err']);
							$(".sendtb .cg" + m[i]['pid']).find("td:eq(0)").addClass("red");
						} else {
							$(".sendtb .cg" + m[i]['pid'] + '_' + i).find("td:eq(0)").html(m[i]['err']);
							$(".sendtb .cg" + m[i]['pid'] + '_' + i).find("td:eq(0)").addClass("red");

						}
						$(".sendtb input:button").attr("disabled", false);
					}
				}




			}
		});

	});

}

function time() {
	rtime--;
	if (rtime == 0) {
		clearTimeout(r);
		lib();
		rtime = Number($("#reloadtime").val());
	}
	$("label.time").html(rtime);
	var r = setTimeout(time, 1000);
}


function getnow() {
	var puserid = $("#userid").val();
	var qishu = $("#qishu").val();
	$.ajax({
		type: 'POST',
		url: mulu + 'slib',
		dataType: 'json',
		cache: false,
		data: 'xtype=getnow&userid=' + puserid + "&qishu=" + qishu,
		success: function(m) {
			////$("#test").html(m);
			var ml = m.length;
			var jezc = 0;
			var je = 0;
			var flyje = 0;
			for (i = 0; i < ml; i++) {
				$(".now .nx" + m[i]['bid']).html("<label>" + m[i]['zc'] + "</label>/" + m[i]['zje'] + "/" + m[i]['zs'] + "/<label>" + Number(m[i]['flyje']) + "</label>");
				jezc += Number(m[i]['zc']);
				je += Number(m[i]['zje']);
				flyje += Number(m[i]['flyje']);
			}
			$(".now label.zc").html(getResult(jezc, 1));
			$(".now label.zong").html(getResult(je, 1));
			$(".now label.fly").html(getResult(flyje, 1));
			$(".now label").addClass('red');
			clearTimeout(gnow);
			gnow = setTimeout(getnow, 5000);
		}
	});
}

function getnowson() {
	var puserid = $("#userid").val();
	var qishu = $("#qishu").val();
	var bid = $(".now .bover").attr("bid");
	$.ajax({
		type: 'POST',
		url: mulu + 'slib',
		dataType: 'json',
		cache: false,
		data: 'xtype=getnowson&userid=' + puserid + "&qishu=" + qishu + "&bid=" + bid,
		success: function(m) {
			////$("#test").html(m);
			var ml = m.length;
			var jezc = 0;
			var je = 0;
			var flyje = 0;
			for (i = 0; i < ml; i++) {
				$(".nowson .nowson" + m[i]['cid']).html("<label>" + m[i]['zc'] + "</label>/" + m[i]['zje'] + "<!--/" + m[i]['zs'] + "-->/<label>" + Number(m[i]['flyje']) + "</label>");
			}
			$(".nowson label").css('color', 'red');
			clearTimeout(cnow);

		}
	});
	cnow = setTimeout(getnow, 6000);
}

function getnowsan() {
	var puserid = $("#userid").val();
	var qishu = $("#qishu").val();
	var bid = $(".now .bover").attr("bid");
	var cid = $(".nowson .bover").attr("cid");
	$.ajax({
		type: 'POST',
		url: mulu + 'slib',
		dataType: 'json',
		cache: false,
		data: 'xtype=getnowsan&userid=' + puserid + "&qishu=" + qishu + "&bid=" + bid + "&cid=" + cid,
		success: function(m) {
			////$("#test").html(m);
			var ml = m.length;
			for (i = 0; i < ml; i++) {
				$(".sandingwei .p" + m[i]['t']).html("<label>" + m[i]['zc'] + "</label>/" + m[i]['zje'] + "<!--/" + m[i]['zs'] + "-->/<label>" + Number(m[i]['flyje']) + "</label>");
			}
			$(".sandingwei label").css('color', 'red');

		}
	});
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
			$(".xxtb").css('left', posi.left + $(this).width() - $(".xxtb").width());
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
				//alert('s');
				////$("#test").html(m);return;
				var ml = m['tz'].length;
				var str = '';
				$(".xxtb tr").each(function(i) {
					if (!$(this).hasClass('bt')) $(this).remove();
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
						str += "<td>" + m['tz'][i]['zc' + j] + "</td>";
					}
					str += "</tr>";
				}
				$(".xxtb").prepend("<tr><td><a href='javascript:void(0);' class='close'>关闭</a></td><td><select class='xtype'><option value='2' selected>全部</option><option value='0'>投|注</option><option value='1'>补货</option></select></td><td colspan=20>" + m['page'] + "</td></tr>");
				$(".xxtb").append(str);

				////$("#test").html(m['sql'])  
				$(".xxtb select").val(m['xtype']);
				$(".xxtb .close").click(function() {
					$(".xxtb").hide();
					return false;
				});
				$(".xxtb select").change(function() {
					$(".ttype").val($(this).val());
					$(".page").val(1);
					obj.click();
				});
				$(".xxtb a.page").click(function() {
					$(".page").val($(this).html());
					obj.click();
					return false;
				});
				$(".xxtb th a").unbind('click');
				$(".xxtb th a").click(function() {
					$(".sort").attr("orderby", $(this).attr('class'));

					if ($(this).find("img").attr('s') == 'up') {
						$(".sort").attr("sorttype", 'ASC');
						$(this).find("img").attr('src', globalpath + "img/up.gif");
						$(this).find("img").attr('s', 'down');
					} else {
						$(".sort").attr("sorttype", 'DESC');
						$(this).find("img").attr('src', globalpath + "img/down.gif");
						$(this).find("img").attr('s', 'up');
					}
					obj.click();
					return false;
				});
				str = null;
				m = null;
			}
		});
		return false;
	});
}

function flyclick() {
	$(".lib label.flyxx").click(function() {
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
			$(".flytb").css('left', posi.left + $(this).width() - $(".xxtb").width());
		} else {
			$(".flytb").css('left', 10)
		}
		$(".flytb").css('top', posi.top + $(this).height());
		$(".flytb").show();
		var obj = $(this);
		$.ajax({
			type: 'POST',
			url: mulu + 'xxtz',
			cache: false,
			data: 'xtype=getfly' + sstr + "&fly=" + $(".ttype").val() + "&pid=" + pid,
			dataType: 'json',
			success: function(m) {
				//$("#test").html(m);return;
				var ml = m['tz'].length;
				var str = '';
				$(".flytb tr").each(function(i) {
					if (!$(this).hasClass('bt')) $(this).remove();
				});
				for(i=0;i<ml;i++){
				    str += "<tr>";
					str += "<td>"+m['tz'][i]['qishu']+"</td>";
					str += "<td>"+m['tz'][i]['tid']+"</td>";
					str += "<td>"+m['tz'][i]['xtype']+"</td>";
					str += "<td>"+m['tz'][i]['bid']+"-"+m['tz'][i]['sid']+"-"+m['tz'][i]['cid']+":"+m['tz'][i]['pid']+"</td>";
	
					str += "<td>"+m['tz'][i]['abcd']+"</td>";				
					
					str += "<td>"+m['tz'][i]['ab']+"</td>";
					str += "<td>"+m['tz'][i]['con']+"</td>";
					str += "<td><label>"+m['tz'][i]['je']+"</td>";
					str += "<td>"+m['tz'][i]['peilv1']+"</td>";
					str += "<td>"+m['tz'][i]['points']+"</td>";
					str += "<td>"+m['tz'][i]['user']+"</td>";
					str += "<td>"+m['tz'][i]['xtime']+"</td>";
					if(m['tz'][i]['flytype']=='1'){
					     str += "<td>自动</td>";
					}else{
					     str += "<td>手动</td>";
					}
					str += "</tr>";
				}

				$(".flytb").prepend("<tr><td><a href='javascript:void(0);' class='close'>关闭</a></td><td colspan=12></td></tr>");
				$(".flytb").append(str);

				$(".flytb .close").click(function(){
				    $(".flytb").hide();
				});
				str=null;
				m=null;
			}
		});
		return false;
	});
}



function in_array(v, a) {
	for (key in a) {
		if (a[key] == v) return true


	}
	return false


}



function json_encode_js(aaa) {
	function je(str) {

		var a = [],
			i = 0;
		var pcs = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		for (; i < str.length; i++) {
			if (pcs.indexOf(str[i]) == -1) a[i] = "\\u" + ("0000" + str.charCodeAt(i).toString(16)).slice(-4);
			else a[i] = str[i];


		}
		return a.join("");


	}
	var i, s, a, aa = [];
	if (typeof(aaa) != "object") {
		alert("ERROR json");
		return;

	}
	for (i in aaa) {
		s = aaa[i];
		a = '"' + je(i) + '":';
		if (typeof(s) == 'object') {
			a += json_encode_js(s);


		} else {
			if (typeof(s) == 'string') a += '"' + je(s) + '"';
			else if (typeof(s) == 'number') a += s;


		}
		aa[aa.length] = a;


	}
	return "{" + aa.join(",") + "}";


}

//四舍五入到num后面的n位

function getResult(num, n) {
	return Math.round(num * Math.pow(10, n)) / Math.pow(10, n);


}
//截取n位

function getresult(num, n) {
	return num.toString().replace(new RegExp("^(\\-?\\d*\\.?\\d{0," + n + "})(\\d*)$"), "$1") + 0;


}

// 注:对本函数来说,1个汉字代表2单位长度;

function strlen(sString) {
	var sStr, iCount, i, strTemp;
	iCount = 0;
	sStr = sString.split("");
	for (i = 0; i < sStr.length; i++) {
		strTemp = escape(sStr[i]);
		if (strTemp.indexOf("%u", 0) == -1)
		// 表示是汉字
		{
			iCount = iCount + 1;


		} else {
			iCount = iCount + 2;


		}


	}
	return iCount;


}

function rhtml(str) {
	return str.match(/<a\b[^>]*>[\s\S]*?<\/a>/ig);


}