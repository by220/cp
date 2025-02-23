var libbstr = "<tr><th>类别</th><th>赔率</th><th>总注数</th><th>总投|注</th><th>占成</th><th>预计亏损</th><th>补货</th><th>已补</th></tr>";
var libcstr = "<tr><th>类别</th><th>赔率</th><th>总注数</th><th>总投|注</th><th>占成</th><th>预计亏损</th><th>补货</th><th>已补</th></tr>";
var upstr = "<span class='up'> +</span>";
var downstr = "<span class='down'>- </span>";
var libtha = "<tr><th class='f'>类别</th><th class='s' mname=''>赔率</th><th  class='t'>占成/总额</th><th  class='fo'>盈亏</th></tr>";
var libthb = "<th class='fb'>项目</th><th class='sb' mname=''>注单</th>";
var libastr = "<tr><td><table class='tinfo wd100'><tr><th class='f'>类别</th><th class='s'>赔率</th><th  class='t'>吃码</th><th  class='fo'>盈亏</th><th  class='fi'>已飞/补</th></table></td><td><table class='tinfo wd100'><tr><th class='f'>类别</th><th class='s'>赔率</th><th  class='t'>吃码</th><th  class='fo'>盈亏</th><th  class='fi'>已飞/补</th></table></td><td><table class='tinfo wd100'><tr><th class='f'>类别</th><th class='s'>赔率</th><th  class='t'>吃码</th><th  class='fo'>盈亏</th><th  class='fi'>已飞/补</th></table></td><td><table class='tinfo wd100'><tr><th class='f'>类别</th><th class='s'>赔率</th><th  class='t'>吃码</th><th  class='fo'>盈亏</th><th  class='fi'>已飞/补</th></table></td></tr>";
var rtime = Number($("#reloadtime").val());
var cnow;
var gnow;
var play;
var r;

function myready() {
	changeh(document.documentElement.scrollHeight+500);;
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
		lib();
		return false
	});
	$(".downfast").click(function() {
		$("#downfastfrm").attr('src', "now?xtype=downfast&qishu="+$("#qishu").val());
	});
	$("#reloadtime").change(function() {
		rtime = Number($(this).val())
	});
	$(".libstyle").change(function() {
		if($(".duopl").length==0){
		$(".lib .xx").hide();
		var libstyle = Number($(".libstyle").val());
		if (libstyle == 0) {
			$(".lib .flyxx").show()
		} else if (libstyle == 1) {
			$(".lib .zje").show()
		} 
		}
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
	$("#zanting").click(function(){
	    if($(this).val()=='暂停'){
		  $(this).val('开始');
		  clearTimeout(r);
	    }else{
		  $(this).val('开始');
		  time();
		}
	});
	$(".now td:eq(0)").addClass("bover");
	$(".now th:eq(0)").addClass("bred");

	
	$(".now td.n").click(function() {
		var bid = $(this).attr('bid');
		var bname = $(this).attr('bname');
		$(".now td.n").removeClass('bover');
		$(this).addClass('bover');
		$(".now th").removeClass('bred');
		$(".now .n" + bid).addClass('bred');
		inputxz=0;
		inputxzb=0;
		lib();
		return false
	});
	getnow();time();
	lib();
	$(".sandingwei tr td").click(function() {
		var index = $(this).index();
		index = (index - index % 2) / 2;
		$(".sandingwei td").removeClass('bover');
		$(this).addClass('bover');
		$(".sandingwei th").removeClass('bred');
		$(".sandingwei th:eq(" + index + ")").addClass('bred');
		libc();
		return false
	});
	$("#pset").click(function() {
		$(".pset").toggle();
		return false
	});
	$(".btns").click(function() {
		selectma($(this).val());
		return false
	});
	$("#pism").click(function(){
		if(!confirm("确定设置所有双面赔率吗？")) return false;
		var val = $("#psetattvalue").val();
		if(isNaN(val) | val==''){
		     alert("请输入正确的赔率！");
			 return false;
		}
		var epl = plclass();
		$.ajax({
			type: 'POST',
			url: mulu + 'pset',
			cache: false,
			data: "xtype=pism&epl=" + epl+"&val="+val,
			success: function(m) {
				if (Number(m) == 1) {
                   alert('ok');
				}
			}
		});
	});
	$("#yiwotongbu").click(function(){
		if(!confirm("确定"+$(this).val()+"？")) return false;
		var epl = plclass();
		$.ajax({
			type: 'POST',
			url: mulu + 'pset',
			cache: false,
			data: "xtype=yiwotongbu&gid=" + ngid+"&epl="+epl,
			success: function(m) {
				if (Number(m) == 1) {
                   alert('ok');
				}
			}
		});
	});
	$("#psetcancel").click(function() {
		var eplc = plclass();
		$("input.p1").each(function() {
			$(this).hide();
			$(this).parent().find("label." + eplc + "1").show();
			$(this).parent().find("span").show();
		});
		$("input.p2").each(function() {
			$(this).hide();
			$(this).parent().find("label." + eplc + "2").show();
			$(this).parent().find("span").show();
		});
		$("input.p3").each(function() {
			$(this).hide();
			$(this).parent().find("label." + eplc + "3").show();
			$(this).parent().find("span").show();
		});
		$("th.byellow").removeClass('byellow');
		$("td.byellow").removeClass('byellow')
	});
	$("#psetsend").click(function() {
		var peilv = getResult(Number($("#psetattvalue").val()), 4);
		if (peilv == NaN | peilv == undefined) {
			alert("请输入正确的赔率");
			$("#psetattvalue").focus();
			return false
		}
		if ($("input.xz:checked").val() == '2') {
			$("td.byellow").find("input.p2").val(peilv)
		}else if ($("input.xz:checked").val() == '3') {
			$("td.byellow").find("input.p3").val(peilv)
		} else {
			$("td.byellow").find("input.p1").val(peilv);
			$("th.byellow").find("input.p1").val(peilv)
		}
		return false
	});
	$("#psetatt").click(function() {
		var pl = $(".lib td.byellow").length;
		if (pl == 0) return false;
		var action = Number($("#psettype").val());
		var val = Number($("#psetattvalue").val());
		var vals = 0;
		$(".lib td.byellow").each(function() {
			vals = 0;
			if (action == 0) {
				vals = Number($(this).find("input.p1").val()) - val
			} else {
				vals = Number($(this).find("input.p1").val()) + val
			}
			$(this).find("input.p1").val(getResult(vals, 4))
		})
	});
	$(".onepeilvtb .oneclose").click(function() {
		$(".onepeilvtb").hide();
		return false
	});
	$(".onepeilvtb .onesend").click(function() {
		var pid = $(".onepeilvtb td:eq(0)").attr("pid");
		var pname = $(".onepeilvtb td:eq(0)").html();
		var peilv1 = $(".onepeilvtb input:text").val();
		if (isNaN(peilv1)) {
			alert("输入的赔率不正确!");
			return false
		}
		var ab = $("#ab").val();
		var abcd = $("#abcd").val();
		var epl = Number($(".plmodeclick").attr('v'));
		var pl = '{"p1' + pid + '":"' + peilv1 + '"}';
		$.ajax({
			type: 'POST',
			url: mulu + 'pset',
			cache: false,
			data: "xtype=setpeilvall&pl=" + pl + "&abcd=" + abcd + "&ab=" + ab + "&pname=" + pname + "&epl=" + epl,
			success: function(m) {
				if (Number(m) == 1) {
					var val = peilv1;
					if (epl == 4) {
						$(".p" + pid).find("label.mp1").html(val)
					} else {
						$(".p" + pid).find("label.peilv1").html(val)
					}
					$(".onepeilvtb").hide();
					$(".p" + pid).addClass('bc').removeClass('byellow');
					setTimeout(function() {
						$(".p" + pid).removeClass('bc')
					}, 5000)
				}
			}
		});
		return false
	});
	$("#psetpost").click(function() {
		if ($(".duopl").length == 1) {
			var epl = Number($(".plmodeclick").attr('v'));
			var eplc = plclass();
			var plstr = '[[';
			$("label.peilv1").each(function(i) {
				if (i > 0) plstr += ',';
				plstr += $(this).parent().find("input.p1").val()
			});
			plstr += ']';
			if ($("label.peilv2").length > 0) {
				plstr += ',[';
				$("label.peilv2").each(function(i) {
					if (i > 0) plstr += ',';
					plstr += $(this).parent().find("input.p2").val()
				});
				plstr += ']'
			}
			if ($("label.peilv3").length > 0) {
				plstr += ',[';
				$("label.peilv3").each(function(i) {
					if (i > 0) plstr += ',';
					plstr += $(this).parent().find("input.p3").val()
				});
				plstr += ']'
			}
			plstr += ']';
			var pid = $("input.xz:checked").parent().attr('pid');
			$.ajax({
				type: 'POST',
				url: mulu + 'pset',
				cache: false,
				data: 'xtype=setpeilvallduo&pl=' + plstr + "&pid=" + pid + "&epl=" + epl,
				success: function(m) {
					if (Number(m) == 1) {
						$("label." + eplc + "1").each(function() {
							$(this).html($(this).parent().find("input.p1").val())
						});
						$("label." + eplc + "2").each(function() {
							$(this).html($(this).parent().find("input.p2").val())
						});
						$("label." + eplc + "3").each(function() {
							$(this).html($(this).parent().find("input.p3").val())
						});
						$(".lib td.byellow").addClass('bc').removeClass('byellow');
						setTimeout(function() {
							$(".lib td.bc").removeClass('bc')
						}, 5000);
						$("#psetcancel").click()
					}
				}
			})
		} else {
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
		var epl = Number($(".plmodeclick").attr('v'));
		var eplc = plclass();
		$.ajax({
			type: 'POST',
			url: mulu + 'pset',
			cache: false,
			data: 'xtype=setpeilvall&pl=' + plstr + "&abcd=" + abcd + "&ab=" + ab + "&epl=" + epl,
			success: function(m) {
				if (Number(m) == 1) {
					$(".lib label." + eplc + "1").each(function() {
						$(this).html($(this).parent().find("input.p1").val())
					});
					$(".lib label." + eplc + "2").each(function() {
						$(this).html($(this).parent().find("input.p2").val())
					});
					$(".lib td.byellow").addClass('bc').removeClass('byellow');
					setTimeout(function() {
						$(".lib td.bc").removeClass('bc')
					}, 5000);
					$("#psetcancel").click()
				}
			}
		})
		}
	});
	$(".plmode").click(function() {
		$(".plmode").removeClass('plmodeclick');
		$(this).addClass('plmodeclick');
		var mode = Number($(this).attr('v'));
		$("label.pl").hide();
		if (mode == 2) {
			$("label.peilv1").show();
			$("label.peilv2").show();
			$("label.peilv3").show();
			$(".lib img.ifok").remove()
		} else if (mode == 4) {
			$("label.mp1").show();
			$("label.mp2").show();
			$("label.mp3").show();
			$(".lib td.cgs").each(function() {
				var ifok = $(this).attr('ifok');
				$(this).prepend("<img class='ifok' v='" + $(this).attr('ifok') + "' src='" + globalpath + "img/" + ifok + ".gif' />")
			});
			$(".lib img.ifok").click(function() {
				var pid = $(this).parent().parent().find(".m").attr('pid');
				var obj = $(this);
				$.ajax({
					type: 'POST',
					url: mulu + 'pset',
					data: 'xtype=changeifok&pid=' + pid,
					success: function(m) {
						if (Number(m) == 1 | Number(m) == 0) {
							obj.attr('src', globalpath + 'img/' + m + '.gif')
						}
					}
				})
			})
		}
		if ($("td.byellow").length > 0) {
			var eplc = plclass();
			$("td.byellow").each(function() {
				$(this).find("label").hide();
				$(this).find("input:text").val($(this).find("label." + eplc + "1").html())
			})
		}
	});
	$(".moren").click(function() {
		var ac = $(this).attr('ac');
		if (ac == 'writemoren') {
			if (!confirm("确定把当前赔率写入默认赔率吗？")) return false;
			ac = 'writem';
		} else if (ac == 'resetmoren') {
			if (!confirm("确定恢复默认赔率吗？")) return false;
			ac = 'resetm';
		} else if (ac == 'resetzero') {
			if (!confirm("确定把赔率清零吗？")) return false
		} else {
			return false
		}
		$.ajax({
			type: 'POST',
			url: mulu + 'pset',
			cache: false,
			data: 'xtype=mr&action=' + ac,
			success: function(m) {
				if (Number(m) == 1) {
					alert('ok');
					window.location.href = window.location.href
				}
			}
		});
		return false
	});
	$(".pset ." + style + "v").show();
	$("#pfly").click(function() {
		if ($("#fly").val() == undefined) return false;
		var posi = $(this).position();
		$(".sendtb").css("left", 5);
		$(".sendtb").css("top", posi.top + $(this).height());
		var i = 0;
		play = new Array();
		$(".lib .fly").each(function() {
			if (Number($(this).html()) >= 1) {
		var peilv1 = 0,
			con = '',
			bz = '';
				
		var bname = $(".now th.bred").html();
		if (bname == "连码" | bname == "2字组合" | bname == "2字定位" | bname == "3字组合" | bname == "3字定位" | bname == "组选3" | bname == "组选6") {
			var obj = $("input.xz:checked").parent();
			var pname = obj.attr('mname');
			var pid = obj.attr('pid');
			con = $(this).parent().parent().find("td.c").html();
			peilv1 = getduopeilv(con, bname, pname);
			var sname = obj.attr('sname');
		var cname = obj.attr('cname');
		} else {
			var obj = $(this).parent().prev().prev();
			var pname = obj.attr('mname');
			var pid = obj.attr('pid');
			peilv1 = obj.find("label.peilv1").html()
			var sname = obj.attr('sname');
		var cname = obj.attr('cname');
		}
		var je = Number($(this).html());
		play = [];
		play[i] =[];
		play[i]['pid'] = pid;
		play[i]['je'] = je;
		play[i]['name'] = pname;
		play[i]['bname'] = bname;
		play[i]['peilv1'] = peilv1;
		play[i]['cons'] = con;
		play[i]['con'] = con.split('-');
		play[i]['bz'] = bz;
		if (ngid == 101 | ngid == 111 | ngid == 113 | ngid == 115 | ngid == 108 | ngid == 109 | ngid == 110 | ngid == 112) {
			if (sname == cname) {
				play[i]['classx'] = sname;
			} else {
				play[i]['classx'] = sname + '-' + cname
			}
		} else {
			if (sname == cname) {
				play[i]['classx'] = bname + '-' + sname;
			} else if (bname == sname) {
				play[i]['classx'] = bname + '-' + cname;
			} else {
				play[i]['classx'] = bname + '-' + sname + '-' + cname
			}
		}
		i++;
			}
		});
		if (i > 0) {
			exe()
		}
	})

}
function getqishu() {
	$.ajax({
		type: 'POST',
		url: mulu + 'pset',
		cache: false,
		data: 'xtype=getqishu',
		success: function(m) {}
	})
}
function lib() {
	clearTimeout(cnow);
	lib0();
}
function getc(bid, bname) {
	$.ajax({
		type: 'POST',
		url: mulu + 'slib',
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
				libc();
				return false
			});
			libc()
		}
	})
}
function lib0() {
	var bid = $(".now .bover").attr("bid");
	var sid = $(".nowson .bover").attr("sid");
	var bname = $(".now .bred").html();
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
	libs = [];
	$.ajax({
		type: 'POST',
		url: mulu + 'slib',
		dataType: 'json',
		cache: false,
		data: 'xtype=getlib&stype=s' + str,
		success: function(m) {
			var ml = m.length;
			var str = "<tr>";
			var duoflag=0;
			var sname = '',
				cname = '';
			var wm = [101, 111, 113, 115,108,109,110,112];
			var td = 4;
			if (in_array(ngid, wm) & bname == '1~5') {
				td = 5
			}
			if((ngid==163 | ngid==116 | ngid==117 | ngid==118 | ngid==119) & bname == '1~5' ){
			    td=3;
			}
			if(ngid == 151 | ngid == 152 | ngid==153 | ngid==155  | ngid==157){
			   td=3;
			}
			var j = 0;
			var trl = 0;
			if (bname == '2字组合' | bname == '2字定位' | bname == '3字组合' | bname == '3字定位' | bname == '组选3' | bname == '组选6' | bname == '连码' | bname == '牛牛'){
				trl=100;
				td=2;
				duoflag=1;
				}else{
			if (bname == '1字组合') trl = 10;
			else if (bname == '2字和数') trl = 8;
			else if (bname == '3字和数') trl = 18;
			else if (bname == '跨度') trl = 10;
			else if (bname == '牛牛梭哈') trl = 17;
			else if (bname == '其他') trl = 5;
			else if (ml <= 12) trl = 12;
			else trl = ml % td == 0 ? ml / td : ((ml - ml % td) / td) + 1;
				}
			var tdl = 0;
			
			for (i = 0; i < ml; i++) {
				if (bname == '总和龙虎' & in_array(ngid, wm)) {
					if (i == 0) str += "<TD valign=top><table class='tinfo wd100'><tr><td colspan=4 class='bt'>总和两面</td></tr>";
					else if (i == 8) str += "</table></td><TD valign=top ><table class='tinfo wd100'><tr><td colspan=4 class='bt'>总和尾数</td></tr>";
					else if (i == 18) str += "</table></td><TD valign=top ><table class='tinfo wd100'><tr><td colspan=4 class='bt'>龙虎和</td></tr>";
					tdl = 3
				}else if (bname == '总和龙虎' & (ngid==163 | ngid==116 | ngid==117 | ngid==118 | ngid==119)) {
					if (i == 0) str += "<TD valign=top ><table class='tinfo wd100'><tr><td colspan=4 class='bt'>总和两面</td></tr>";
					else if (i == 14) str += "</table></td><TD valign=top ><table class='tinfo wd100'><tr><td colspan=4 class='bt'>总和尾数</td></tr>";
					else if (i == 24) str += "</table></td><TD valign=top ><table class='tinfo wd100'><tr><td colspan=4 class='bt'>龙虎和</td></tr>";
					else if (i == 27) str += "</table></td><TD valign=top ><table class='tinfo wd100'><tr><td colspan=4 class='bt'>总和数</td></tr>";
					tdl = 4
				} else if (i % trl == 0) {
					if (i != 0) str += "</table></td>";
					str += "<TD valign=top ><table class='tinfo wd100'>";
					tdl++
				}
				if (cname != m[i]['cname'] & bname == '1字组合') {
					str += "<tr><td class='bt' colspan=4 cid='"+m[i]['cid']+"'>" + m[i]['cname'] + "</td></tr>"
				}
				if (sname != m[i]['sname'] & bname == '1~5') {
					str += "<tr><td class='bt' colspan=4 cid='"+m[i]['cid']+"'>" + m[i]['sname'] + "</td></tr>"
				}
				if (sname != m[i]['sname'] & bname == '2字和数') {
					str += "<tr><td class='bt' colspan=4 cid='"+m[i]['cid']+"'>" + m[i]['sname'] + "</td></tr>"
				}
				if (sname != m[i]['sname'] & bname == '3字和数') {
					str += "<tr><td class='bt' colspan=4 cid='"+m[i]['cid']+"'>" + m[i]['sname'] + "</td></tr>"
				}


				if (sname != m[i]['sname'] & (bname == '其他' | bname == '跨度' | bname == '牛牛梭哈')) {
					str += "<tr><td class='bt' colspan=4 cid='"+m[i]['cid']+"'>" + m[i]['sname'] +"</td></tr>"
				}
				if (cname != m[i]['cname'] & bname == '3字和数' & m[i]['cname'] == '尾数') {
					str += "<tr><td class='bt' colspan=4 cid='"+m[i]['cid']+"'>" + m[i]['sname'] + "-" + m[i]['cname'] + "</td></tr>"
				}
				str += "<tr ";
				if (m[i]['z'] == '1') str += " class='z1' ";
				str += ">";
				

				
				
				
				if (duoflag==1) {
					str += "<th class='f m duoname'  pid='" + m[i]['pid'] + "'  >" + qiu(m[i]['name'], bname) + "</th>";
					str += "<td class='s duoselect' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' ><input type=radio name='xz' class='xz' value='1' x1='"+i+"' x2=0  />";
					if (bname == '2字组合') {
						str += "对子 <input type=radio name='xz' class='xz' value=2 x1='"+i+"' x2=1  />其他"
					}
					if (bname == '3字组合') {
						str += "豹子 <input type=radio name='xz' class='xz' value=2 x1='"+i+"' x2=1 />对子 <input type=radio name='xz' class='xz' value=3 x1='"+i+"' x2=2 />其他";
					}
					str += "</td>"
				} else {
					str += "<th class='f m'  pid='" + m[i]['pid'] + "' ";
					if(ngid == 151 | ngid == 152 | ngid==153 | ngid==155  | ngid==157) str += " style='width:100px;' ";
					str += " >" + qiu(m[i]['name'], bname) + "</th>";
					str += "<td class='s p" + m[i]['pid'] + " c" + m[i]['cid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' sname='" + m[i]['sname'] + "' cname='" + m[i]['cname'] + "' >" + downstr + "<label class='peilv1 pl'>" + m[i]['peilv1'] + "</label><label class='mp1 pl'>" + m[i]['mp1'] + "</label><input type='text' value='" + m[i]['peilv1'] + "' class='small hide p1' />" + upstr + "</td>";
				}
				
				
				str += "<td class='t "
				if (Number(m[i]['wje']) == 1) str += "warn";
				str += "' title='" + m[i]['zs'] + "'  pid='" + m[i]['pid'] + "' ><label  class='zcxx'>" + m[i]['zc'] + "</label>/<label class='zje xx'>" + m[i]['zje'] + "</label>/<label  class='flyxx xx'>" + m[i]['fly'] + "</label></td>";
				
				str += "<td class='fo ";
				if (Number(m[i]['ks']) > 0) str += "red";
				else if (Number(m[i]['ks']) < 0) str += "lv";
				if (Number(m[i]['wks']) == 1) str += " warn";
				str += " cgs' ifok='" + m[i]['ifok'] + "'>" + getResult(Number(m[i]['ks']), 1);
				if(duoflag!=1) str +=  "/<label  class='fly'>" + m[i]['bu'] + "</label>";
				str += "</td>";
				str += "</tr>";
				sname = m[i]['sname'];
				cname = m[i]['cname']
			}
			str += "</table></td>";
			for (i = tdl; i < td; i++) {
				if (td == 5) {
					str += "<td  style='width:20%'></td>"
				}else if (td == 2) {
					str += "<td  style='width:50%' class='pltd'></td>"
				} else {
					str += "<td  style='width:25%'></td>"
				}
			}
			str += "</tr>";
			
			$(".lib").html(str);
			$(".lib td").attr("valign", 'top');
			str = null;
			m = null;
			$(".lib label.pl").hide();
			$(".lib label.p2").hide();
			var mode = Number($(".plmodeclick").attr('v'));
			if (mode == 2) {
				$(".lib label.peilv1").show()
			} else if (mode == 4) {
				$(".lib label.mp1").show()
			}
			$("input.p1").parent().click(function(){
			    if($(this).find("label:visible").length>0)  $("#psetattvalue").val($(this).find("label:visible").html()); else $("#psetattvalue").val($(this).find("input:visible").val());
			});
			if (duoflag==1) {
			   duofunc();
			   $(".lib .pltd").append("<table class='wd100 tinfo libs'><tr><th colspan=2>每页显示：<span>30</span><span class='red'>60</span><span>90</span><span>150</span><span>300</span> </th><th colspan='2'><select class='pages'></select></th></tr><tr><th>序号</th><th>內容</th><th>占成/总投/已补/注数</th><th>预计亏损/补</th></tr></table>");
			}else{
			   addfunc();
			}
			changeh(document.documentElement.scrollHeight+500);
		}
	})
}
function duofunc() {
	
	$(".lib input.xz").click(function() {
		$(".duoname").removeClass('bred');
		$(this).parent().parent().find(".duoname").addClass('bred');
		inputxz = Number($(this).attr('x1'));
		inputxzb = Number($(this).attr('x2'));
		var sid = $(".now .bover").attr("sid");
		var bname = $(".now .bover").attr("bname");
		var abcd = $("#abcd").val();
		var ab = $("#ab").val();
		var qishu = $("#qishu").val();
		var goods = $("#goods").val();
		var xsort = $("#xsort").val();
		var puserid = $("#userid").val();
		var pid = $(this).parent().attr('pid');
		var pname = $(this).parent().attr('mname');
	
		var zhenghe = $("#zhenghe").attr("checked") ? 1 : 0;
		var str = "&sid=" + sid + "&abcd=" + abcd + "&ab=" + ab + "&qishu=" + qishu + "&xsort=" + xsort;
		str += "&zhenghe=" + zhenghe + "&userid=" + puserid + "&pid=" + pid;
		$(".duopl").remove();
		$(".libs tr.con").remove();
		
		$.ajax({
			type: 'POST',
			url: mulu + 'slib',
			dataType: 'json',
			cache: false,
			async:false,
			data: 'xtype=duoxxss' + str,
			success: function(m) {
			 
				var str = "<table class='tinfo duopl' ><tr>";
				var mpl = m['pl'][0].length;
			
				for (i = 0; i < mpl; i++) {
					str += "<th class='m'>" + qiu(m['pl'][0][i],bname) + "</th>";
					str += "<td mname='" + m['pl'][0][i] + "' class='tiao'><label class='peilv1 pl'>" + m['pl'][1][i] + "</label><label class='mp1 pl'>" + m['pl'][4][i] + "</label><input type='text' value='" + m['pl'][1][i] + "' class='small hide p1' />";
					if (bname=='2字组合'){
						 str += "<BR /><label class='peilv2 pl'>" + m['pl'][2][i] + "</label><label class='mp2 pl'>" + m['pl'][5][i] + "</label><input type='text' value='" + m['pl'][2][i] + "' class='small hide p2' />";
					}
					if (bname=='3字组合') {
						str += "<BR /><label class='peilv2 pl'>" + m['pl'][2][i] + "</label><label class='mp2 pl'>" + m['pl'][5][i] + "</label><input type='text' value='" + m['pl'][2][i] + "' class='small hide p2' />";
						str += "<BR /><label class='peilv3 pl'>" + m['pl'][3][i] + "</label><label class='mp3 pl'>" + m['pl'][6][i] + "</label><input type='text' value='" + m['pl'][3][i] + "' class='small hide p3' />";
					}
					str += "</td>";
				
						if ((i + 1) % 5 == 0) {
							str += "</tr><tr>"
						}
	
				}
				str += "</tr></table>";
				$(".lib .pltd").prepend(str);
			    
				str = null;
				var mode = $(".plmodeclick").attr('v');
				if (mode != undefined) {
					$(".duopl label.pl").hide();
					mode = Number(mode);
					if (mode == 2) {
						$(".duopl label.peilv1").show();
						$(".duopl label.peilv2").show();
						$(".duopl label.peilv3").show();
					} else if (mode == 4) {
						$(".duopl label.mp1").show();
						$(".duopl label.mp2").show();
						$(".duopl label.mp3").show();
					}
				}
				var eplc = plclass();
				$(".duopl label." + eplc + "1").click(function() {
					$(this).hide();
					$(this).parent().find("input.p1").show();
					$(this).parent().find("input.p1").val($(this).html());
					$(this).parent().addClass('byellow');
					$("#psetvalue").val($(this).html())
				});
				$(".duopl label." + eplc + "2").click(function() {
					$(this).hide();
					$(this).parent().find("input.p2").show();
					$(this).parent().find("input.p2").val($(this).html());
					$(this).parent().addClass('byellow');
					$("#psetvalue").val($(this).html())
				});
				$(".duopl label." + eplc + "3").click(function() {
					$(this).hide();
					$(this).parent().find("input.p3").show();
					$(this).parent().find("input.p3").val($(this).html());
					$(this).parent().addClass('byellow');
					$("#psetvalue").val($(this).html())
				});
				
				$(".duopl .m").click(function() {
					var eplc = plclass();
					var nz = inputxzb+1;
					var peilv1 = $(this).next().find("label." + eplc +nz).html();
							$(this).next().find("label." + eplc +nz).hide();
							$(this).next().find("input.p"+nz).show();
							$(this).next().find("input.p"+nz).val(peilv1);
							$(this).next().addClass("byellow");
				});
				$(".duopl input").click(function() {
					$("#psetattvalue").val($(this).val())
				});
			  

				libs = m['rs'];
				
				ll = libs.length;
			
				if (ll == 0) return;
				psize = Number($(".libs span.red").html());
                setpage();
				$(".libs th:eq(0) span").click(function(){
				    $(".libs th:eq(0) span").removeClass('red');
					$(this).addClass('red');
					psize=Number($(this).html());
					setpage();
					$(".libs .pages").change();
				});
								
				$(".libs .pages").change(function() {
					var thisp = Number($(this).val());
					$(".libs tr.con").remove();
				
					str = '';
					for (i = (thisp - 1) * psize; i < (thisp - 1) * psize + psize; i++) {
						if (i >= ll) break;			
						str += "<tr class='con ";
						if (Number(libs[i]['z'])==1) str += "z1";
						else if (Number(libs[i]['z'])==3) str += "z3";
						str += "'>";
						str += "<td class='xh'>" + (i + 1) + "</td>";
						str += "<td class='c' bz='"+libs[i]['bz']+"'>" + libs[i]['con'] + "</td>";

						str += "<td><label class='xx zcxx'>" + libs[i]['zc'] + "</label>/" + libs[i]['zje'] + "/<label class='xx flyxx green'>" + libs[i]['fly'] + "</label>/"+libs[i]['zs']+"</td>";
						str += "<td class='";
						if (Number(libs[i]['ks1']) > 0) str += "red";
						else if (Number(libs[i]['ks1']) < 0) str += "lv";
						if (Number(libs[i]['wks']) == 1) str += " warn";
						str += "'>" + libs[i]['ks1'];
						str += "/<label class='fly'>" + getbu(libs[i]['ks'], libs[0]['yks'], libs[i]['zc'], libs[0]['yje'], 0, bname) + "</label>";
						str += "</td>";
						str += "</tr>"
					}

			
					$(".libs").append(str);
					str = null
				});
				$(".libs .pages").change();
				flyclick();
				flyxxclick('libs');
				zcxxclick('libs');
			}
		})
	});
	$(".lib table tr:eq("+inputxz+")").find("input:eq("+inputxzb+")").click();	
	$(".duoname").click(function(){
	     inputxzb=0;
		 $(this).parent().find("input:eq(0)").click();
	});
}
function flyclick(){


	$("label.fly").each(function() {
		if (Number($(this).html()) > 0) $(this).addClass('flys')
	});

	$("label.fly").click(function() {
		if ($("#fly").val() == undefined) return false;
		var posi = $(this).position();
		var left = posi.left - $(".sendtb").width() + $(this).width();
		if (left < 0) left = 5;
		$(".sendtb").css("left", left);
		$(".sendtb").css("top", posi.top + $(this).height());
		var peilv1 = 0,
			con = '',
			bz = '';
				
		var bname = $(".now th.bred").html();
		if (bname == "连码" | bname == "2字组合" | bname == "2字定位" | bname == "3字组合" | bname == "3字定位" | bname == "组选3" | bname == "组选6") {
			var obj = $("input.xz:checked").parent();
			var pname = obj.attr('mname');
			var pid = obj.attr('pid');
			con = $(this).parent().parent().find("td.c").html();
			peilv1 = getduopeilv(con, bname, pname);
			var sname = obj.attr('sname');
		var cname = obj.attr('cname');
		} else {
			var obj = $(this).parent().prev().prev();
			var pname = obj.attr('mname');
			var pid = obj.attr('pid');
			peilv1 = obj.find("label.peilv1").html()
			var sname = obj.attr('sname');
		var cname = obj.attr('cname');
		}
		var je = Number($(this).html());
		play = [];
		play[0] =[];
		play[0]['pid'] = pid;
		play[0]['je'] = je;
		play[0]['name'] = pname;
		play[0]['bname'] = bname;
		play[0]['peilv1'] = peilv1;
		play[0]['cons'] = con;
		play[0]['con'] = con.split('-');
		play[0]['bz'] = bz;
		if (ngid == 101 | ngid == 111 | ngid == 113 | ngid == 115 | ngid == 108 | ngid == 109 | ngid == 110 | ngid == 112) {
			if (sname == cname) {
				play[0]['classx'] = sname;
			} else {
				play[0]['classx'] = sname + '-' + cname
			}
		} else {
			if (sname == cname) {
				play[0]['classx'] = bname + '-' + sname;
			} else if (bname == sname) {
				play[0]['classx'] = bname + '-' + cname;
			} else {
				play[0]['classx'] = bname + '-' + sname + '-' + cname
			}
		}
		exe()
		
	})
}

function getduopeilv(str, bn, pn) {
	var arr = str.split('-');
	var al = arr.length;
	pone = [];
	ptwo = [];
	pshree = [];
	var peilv;
	var htm;
	var zhi = 0;
	if (bn == '连码' & (pn == '选前二直选' | pn == '选前三直选' | pn == '选三前直')) {
		zhi = 1;
	}
	if ((bn == '连码' & zhi == 0) | bn == '组选3' | bn == '组选6' | bn == '2字组合' | bn == '3字组合') {
		$(".duopl th.m").each(function(i) {
			htm = $(this).attr('name');
			if (isNaN(htm)) {
				htm = htm.split('-');
				htm = htm[1];
			}
			if(bn == '3字组合'){
				 if(arr[0] == arr[1] & arr[0] == arr[2]){
					 pone[htm] = Number($(this).next().find("label.peilv1").html());
				 }else if(arr[0] == arr[1] | arr[0] == arr[2] | arr[1] == arr[2] ){
					  pone[htm] = Number($(this).next().find("label.peilv2").html());
				 }else{
				     pone[htm] = Number($(this).next().find("label.peilv3").html());
				 }	     
			}else if(bn == '2字组合'){
				 if(arr[0] == arr[1] | arr[0] == arr[2]){
					  pone[htm] = Number($(this).next().find("label.peilv1").html());
				 }else{
				     pone[htm] = Number($(this).next().find("label.peilv2").html());
				 }
			}else{
			    pone[htm] = Number($(this).next().find("label.peilv1").html());
			}
		});
		peilv = peilvmin(arr, pone);
	} else {
		var nl;
		if (bn == '2字定位' | bn == '3字定位') {
			nl = 10;
		} else if (pn == '选前二直选' | pn == '选前三直选') {
			nl = 11;
		} else if (pn == '选三前直') {
			nl = 20;
		}
		$(".duopl th.m").each(function(i) {
			htm = $(this).html();
			if (isNaN(htm)) {
				htm = htm.split('-');
				htm = htm[1];
			}
			if (i < nl) {
				pone[htm] = Number($(this).next().find('label.peilv1').html());
			} else if (i < nl * 2) {
				ptwo[htm] = Number($(this).next().find('label.peilv1').html());
			} else if (i < nl * 3) {
				pshree[htm] = Number($(this).next().find('label.peilv1').html());
			}
		});
		if (bn == '3字定位' | pn == '选前三直选' | pn == '选三前直') {
			peilv = Math.min(pone[arr[0]], ptwo[arr[1]], pshree[2]);
		} else {
			peilv = Math.min(pone[arr[0]], ptwo[arr[1]]);
		}
	}
	return peilv
}

function peilvmin(a1, a2, a3) {
	var al = a1.length;
	var tmp = 9999;
	var pp;
	for (i = 0; i < al; i++) {
		if (a2[a1[i]] < tmp) {
			tmp = a2[a1[i]];
			pp = a1[i]
		}
	}
	if (a3 == undefined) {
		return tmp
	} else {
		return a3[pp]
	}
}

function getbu(ks, yks, zc, yje, peilv, sname) {
	var kks = ks;
	ks = Math.abs(Number(ks));
	yks = Math.abs(Number(yks));
	zc = Number(zc);
	yje = Number(yje);
	peilv = Number(peilv);
	if (sname == "连码" | sname == "2字组合" | sname == "2字定位" | sname == "3字组合" | sname == "3字定位" | sname == "组选3" | sname == "组选6") {
		if (zc > yje) return getResult(zc - yje,0);
		else return 0
	} else {
		if (ks > yks & kks<0) {
			return getResult((ks - yks) / peilv, 0)
		} else {
			return 0
		}
	}
}
function setpage(){
				maxpage = ll % psize == 0 ? ll / psize : ((ll - ll % psize) / psize + 1);
				str = '';
				for (i = 1; i <= maxpage; i++) {
					str += "<option value='"+i+"'>" + i + "</option>"
				}
				
				$(".libs .pages").html(str);
}
var inputxz=0;
var inputxzb=0;
var ssid=0;
libs = [];
var ll=0;
var psize = 0;
var maxpage = 0;

function plclass() {
	var mode = Number($(".plmodeclick").attr('v'));
	var v;
	if (mode == 2) v = 'peilv';
	else if (mode == 4) v = 'mp';
	return v
}
function qiu(n, bname) {
	if (isNaN(n)) {
		return n
	} else {
		if(bname=='番摊'){
             return n;
		}else if (ngid == 151 | ngid == 152 | ngid==153 | ngid==155  | ngid==157) {
			if (n > 100) {
				n = "<img src='../imgn/sz" + (n%10) + "1.png' /><img src='../imgn/sz" + (n%10) + "1.png' /><img src='../imgn/sz" + (n%10) + "1.png' />"
			} else if (n > 10) {
				n = "<img src='../imgn/sz" + n.substr(0, 1) + "1.png' /><img src='../imgn/sz" + (n%10) + "1.png' />"
			} else {
				n = "<img src='../imgn/sz" + n + "1.png' />"
			}
			return n
		} else if(ngid==107){
			if(bname=='冠亚和') return n;
			n=Number(n);
		   n = "<img src='../img/pk" + n + ".png' />";
		   return n;
		}else {
			if ((ngid == 103 | ngid == 133 | ngid == 135 | ngid == 131 | ngid == 132 | ngid == 136) & n >= 19) {
				return "<div class='qiub'>" + n + "</div>"
			} else if((ngid == 121 | ngid == 123 | ngid == 125 | ngid == 127 | ngid == 129) & n==11){
				return "<div class='qiub'>" + n + "</div>"
			} else if(Number(n)>40){
				return "<div class='qiub'>" + n + "</div>"
			} else {
				return "<div class='qiua'>" + n + "</div>"
			}
		}
	}
}
function selectma(val) {
	$("#psetcancel").click();
	var eplc = plclass();
	if (val == "全部") {		
		if($(".duopl").length==1){
			var nz= inputxzb+1;
		  $(".lib label." + eplc + nz).each(function() {
			$(this).hide();
			$(this).parent().find("input.p"+nz).show();
			$(this).parent().find("input.p"+nz).val($(this).html());
			$(this).parent().addClass('byellow');
			$(this).parent().find("span").hide();
		  });		
	    }else{
		  $(".lib label." + eplc + "1").each(function() {
			$(this).hide();
			$(this).parent().find("input.p1").show();
			$(this).parent().find("input.p1").val($(this).html());
			$(this).parent().addClass('byellow');
			$(this).parent().find("span").hide();
		  });
		}
		return
	}
	if (val == "数字") {
		$(".lib label." + eplc + "1").each(function() {
			if (!isNaN($(this).parent().attr('mname'))) {
				$(this).hide();
				$(this).parent().find("input.p1").show();
				$(this).parent().find("input.p1").val($(this).html());
				$(this).parent().addClass('byellow');
				$(this).parent().find("span").hide();
			}
		})
	} else {
		if (val == "双面") {
			var sm = ["单", "双", "大", "小", "质", "合", "合单", "合双", "尾大", "尾小", "龙", "虎", "三军大", "三军小", "和单", "和双", "和大", "和小", "和尾大", "和尾小", "和尾质", "和尾合", "总单", "总双", "总大", "总小", "总尾大", "总尾小", "总尾质", "总尾合", "总和单", "总和单", "总和双", "总和大", "总和小", "总大单", "总大双", "总小单", "总小双", "前(多)", "后(多)", "单(多)", "双(多)"]
		} else if (val == "四季") {
			var sm = ["春", "夏", "秋", "冬"]
		} else if (val == "五行") {
			var sm = ["金", "木", "水", "火", "土"]
		} else if (val == "方位") {
			var sm = ["东", "西", "南", "北"]
		} else if (val == "中发白") {
			var sm = ["中", "发", "白"]
		}
		$(".lib label." + eplc + "1").each(function() {
			if (in_array($(this).parent().attr('mname'), sm)) {
				$(this).hide();
				$(this).parent().find("input.p1").show();
				$(this).parent().find("input.p1").val($(this).html());
				$(this).parent().addClass('byellow');
				$(this).parent().find("span").hide();
			}
		})
	}
}
function addfunc() {
	zcxxclick('lib');
	flyxxclick('lib');
	$("tr.z1").find("td").addClass('z1');
	$("tr.z3").find("td").addClass('z3');
	$("tr.z1").find("th").addClass('z1');
	$("tr.z3").find("th").addClass('z3');
	$(".lib .xx").css("color", 'red');
	$("label.peilv1").parent().find("span").click(function() {
		var action = $(this).attr('class');
		var pid = $(this).parent().attr('pid');
		var obj = $(this).parent();
		var epl = Number($(".plmodeclick").attr('v'));
		var eplc = plclass();
		$.ajax({
			type: 'POST',
			url: mulu + 'pset',
			cache: false,
			data: 'xtype=setatttwo&pid=' + pid + "&action=" + action + "&epl=" + epl,
			success: function(m) {
				if ((Number(m) * 1000) % 1 == 0) {
					var tmp;
					if (action == 'up') {
						tmp = getResult(Number(obj.find("label." + eplc + "1").html()) + Number(m), 4)
					} else {
						tmp = getResult(Number(obj.find("label." + eplc + "1").html()) - Number(m), 4)
					}
					obj.find("label." + eplc + "1").html(tmp);
					obj.addClass("bc");
					setTimeout(function() {
						obj.removeClass('bc')
					}, 5000)
				}
			}
		});
		return false
	});
	$(".peilv1").parent().parent().mouseover(function() {
		$(this).addClass('bover')
	}).mouseout(function() {
		$(this).removeClass('bover')
	});
		$(".lib label.pl").click(function() {
			$(this).hide();
			$(this).parent().find("input.p1").val($(this).html());
			$(this).parent().find("input.p1").show();
			$(this).parent().addClass('byellow');
			$("#psetvalue").val($(this).html());
			return false
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
		return false
	});
	
	$(".lib td.bt").click(function() {
		$("#psetcancel").click();
		var plc = plclass();
		var cid = $(this).attr('cid');
	
		$(this).parent().parent().find(".c"+cid).find("label."+plc+"1").each(function(){
			$(this).hide();
			$(this).parent().find("input.p1").val($(this).html());
			$(this).parent().find("input.p1").show();
			$(this).parent().addClass('byellow');
			$("#psetvalue").val($(this).html());
		});
	});
	if($(".duopl").length==0){
	$(".lib .xx").hide();
	var libstyle = Number($(".libstyle").val());
	if (libstyle == 0) {
		$(".lib .flyxx").show()
	} else if (libstyle == 1) {
		$(".lib .zje").show()
	}
	}

     flyclick();
}
function sumje() {
	var je = 0;
	$(".sendtb .je").each(function() {
		je += Number($(this).val())
	});
	$(".sendtb .sumje").html(je)
}
function exe() {
	var str = '';
	var je = 0;
	var pl = play.length;
	for (j = 0; j < pl; j++) {
		str += "<tr pid='" + play[j]['pid'] + "' content='' class='cg'>";
		str += "<td>" + (j + 1) + "</td>";
		if(play[j]['cons']==''){
		str += "<td>" + play[j]['classx'] + '-<label class=red>' + play[j]['name'] + "</label></td>";
		}else{
		str += "<td>" + play[j]['classx'] + '-'+play[j]['name']+':<label class=red>' + play[j]['cons'] + "</label></td>";
		}
		str += "<td class=p1><label >" + play[j]['peilv1'] + "</label><input type='text' class='txt1 peilv1' value='" + play[j]['peilv1'] + "' /></td>";
		//str += "<td class=p2><input type='text' class='txt1 peilv2' value='" + play[j]['peilv2'] + "' /></td>";
		str += "<td class='tpoints'><input type='text' class='txt1 points' value='" + 1 + "' />%</td>";
		str += "<td je='" + play[j]['je'] + "'><input type='text' class='txt1 je' value='" + play[j]['je'] + "' /></td>";
		str += "<td><input type='button' class='btnf del' value='删除' /></td>";
		str += "</tr>";
		je += Number(play[j]['je'])
	}
	$(".sendtb").show();
	$(".sendtb").empty();
	$(".sendtb").append("<tr><td><select class='fly'>" + $("#fly").html() + "</select></td><td ><span>金额：<input value='100' class='txt1 sendje' type='text' /></span><span class='tpoints'>退水：<input value='1' class='txt1 sendpoints' type='text' />赔率：<input value='1' class='txt1 peilv1s' type='text' /></span></td><td><input type='button' value='送出' class='btnf sends' /></td></tr><tr><td colspan=3><input type='button' class='qr btn3 btnf' value='确认补货' /><input type='button' class='cancel btn1 btnf' value='关闭' style='margin-left:10px;' /></td></tr>");
	$(".sendtb").append("<tr><td colspan=3><table cellpadding=0 cellspacing=0 class='wd100' ><tr><th>编号</th><th>内容</th><th class=p1s>赔率</th><th class='tpoints'>退水%</th><th>金额</th><th>删除</th></tr>"+str+"<tr><th>合計</th><td ></td><td class=p1s></td><td class='p2s'></td><td class='tpoints'></td><th class='sumje'>" + je + "</th><TD></td></tr>");
	$(".sendtb").append("</table></td></tr>");
	if (Number($(".sendtb .fly").val()) == 1) {
		$(".sendtb .tpoints").hide();
		$(".sendtb .p2").hide();
		$(".sendtb .p1").find("input").hide();
		$(".sendtb .p1").find("label").show()
	} else {
		$(".sendtb .tpoints").show();
		$(".sendtb .p1").find("input").show();
		$(".sendtb .p1").find("label").hide();
		$(".sendtb .p2").show()
	}
	$(".sendtb .fly").change(function() {
		if (Number($(this).val()) == 1) {
			$(".sendtb .tpoints").hide();
			$(".sendtb .p2").hide();
			$(".sendtb .p1").find("input").hide();
			$(".sendtb .p1").find("label").show()
		} else {
			$(".sendtb .tpoints").show();
			$(".sendtb .p1").find("input").show();
			$(".sendtb .p1").find("label").hide();
			$(".sendtb .p2").show()
		}
	});
	$(".sendtb .sends").click(function() {
		var je = $(".sendtb .sendje").val();
		if (je == '' | Number(je) % 1 != 0 | Number(je) == 0) {
			alert("请输入正确的金额,最小1,不能有小数点");
			$(".sendtb .sendje").focus();
			return false
		}
		$(".sendtb .je").val(je);
		sumje();
		if (Number($(".sendtb .fly").val()) == 2) {
			var points = $(".sendtb .sendpoints").val();
			if (points == '' | Number(points) * 100 % 1 != 0) {
				alert("请输入正确的退水");
				$(".sendtb .sendpoints").focus();
				return false
			}
			var peilv1s = $(".sendtb .peilv1s").val();
			if (peilv1s == '' | Number(peilv1s) * 1000 % 1 != 0) {
				alert("请输入正确的赔率");
				$(".sendtb .peilv1s").focus();
				return false
			}

			$(".sendtb .peilv1").val(peilv1s);
			$(".sendtb .peilv2").val(peilv2s);
			$(".sendtb .points").val(points)
		}
	});
	$(".sendtb .je").blur(function() {
		if (isNaN($(this).val())) {
			$(this).val('1')
		}
		sumje()
	});
	$(".sendtb .del").click(function() {
		play.splice($(this).parent().parent().index() - 3, 1);
		$(this).parent().parent().remove();
		if (play.length == 0) {
			$(".sendtb").empty();
			$(".sendtb").hide();
			play = null
		}
	});
	str = null;
	$(".sendtb input:button").addClass("btn2 btnf");
	$(".sendtb .cancel").click(function() {
		$(".sendtb").hide();
		return false
	});
	$(".sendtb .print").click(function() {
		tzprint();
		return false
	});
	$(".sendtb .qr").click(function() {
		
		var pl = play.length;
		var objs;
		for (j = 0; j < pl; j++) {
			objs= $(".sendtb .cg:eq("+j+")");
			var je = objs.find("input.je").val();
			if (isNaN(je) | Number(je) % 1 != 0) {
				alert("输入的金额不正确！");
				return false
			}
			var peilv1s = 0;
			var peilv2s = 0;
			var points = 0;
			if (Number($(".sendtb .fly").val()) == 2) {
				var peilv1s = objs.find("input.peilv1").val();
				var points = objs.find("input.points").val();
				if (points == '' | Number(points) * 100 % 1 != 0) {
					alert("请输入正确的退水");
					return false
				}
				if (peilv1s == '' | Number(peilv1s) * 1000 % 1 != 0) {
					alert("请输入正确的赔率");
					return false
				}

			}
			play[j]['je'] = je;
			play[j]['peilv1'] = peilv1s;
			play[j]['peilv2'] = 0;
			play[j]['points'] = points
		}
		var pstr = '[';
		for (i = 0; i < pl; i++) {
			if (i != 0) pstr += ',';
			pstr += json_encode_js(play[i])
		}
		pstr += ']';
		//alert(pstr);
		var ab = $("#ab").val();
		var abcd = $("#abcd").val();
		var bid = $(".now .bover").attr("bid");
		var fly = $(".sendtb .fly").val();
		var str = "&abcd=" + abcd + "&ab=" + ab + "&bid=" + bid + "&fly=" + fly;
		$(".sendtb input:button").attr("disabled", true);
		$.ajax({
			type: 'POST',
			url: mulu + 'slib',
			data: 'xtype=bucang&pstr=' + pstr + str,
			dataType: 'json',
			cache: false,
			success: function(m) {
				
				var ml = m.length;
				var gflag = false;
				var bflag = false;
				var eflag = false;
				var errstr = "";
				var obj;
for (i = 0; i < ml; i++) {
	obj = $(".sendtb .cg:eq(" + i + ")");
	if (Number(m[i]['cg']) == 1) {
		if (Number(m[i]['cgs']) == 1) {
			obj.find("td:eq(0)").html(obj.find("td:eq(0)").html() + " 赔率改动!");
			obj.find("td:eq(0)").addClass("red")
		} else {
			obj.find("td:eq(0)").html(obj.find("td:eq(0)").html() + " 成功!");
			obj.find("td:eq(0)").addClass("lv")
		}
		obj.find("td:eq(2)").html(m[i]['peilv1']);
		if (m[i]['name'] == '三中二' | m[i]['name'] == '二中特') {
			obj.find("td:eq(2)").html(obj.find("td:eq(2)").html() + "/" + m[i]['peilv2'])
		}
		$(".sendtb .qr").hide();
		$(".sendtb .cancel").attr("disabled", false);
		$(".sendtb .print").attr("disabled", false);
		$(".sendtb input:text").attr("disabled", true)
	} else {
		obj.find("td:eq(0)").html(obj.find("td:eq(0)").html() + " " + m[i]['err']);
		obj.find("td:eq(0)").addClass("red");
		$(".sendtb input:button").attr("disabled", false);
		eflag = true
	}
}
				if (!eflag) {
					lib()
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
	r = setTimeout(time, 1000)
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
			var ml = m.length;
			var jezc = 0;
			var je = 0;
			var flyje = 0;
			for (i = 0; i < ml; i++) {
				$(".now .nx" + m[i]['bid']).html("<label>" + m[i]['zc'] + "</label>/" + m[i]['zje'] + "/<label>" + Number(m[i]['flyje']) + "</label>");
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
		url: mulu + 'slib',
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
		url: mulu + 'slib',
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

function zcxxclick(tb) {
	
	$("."+tb+" label.zcxx").click(function() {
		var sid = $(".now .bover").attr("sid");
		var abcd = $("#abcd").val();
		var ab = $("#ab").val();

		var qishu = $("#qishu").val();
		var goods = $("#goods").val();
	
		var puserid = $("#userid").val();
		var orderby = $(".sort").attr("orderby");
		var sorttype = $(".sort").attr("sorttype");
		var page = $(".sort").attr("page");
		var xtype = $(".sort").attr("xtype");
		
		var bname = $(".now th.bred").html();
		var con='';
		if (bname == '2字组合' | bname == '2字定位' | bname == '3字组合' | bname == '3字定位' | bname == '组选3' | bname == '组选6' | bname == '连码') {
			 con = $(this).parent().parent().find("td.c").html();
			 var pid = $("input[name='xz']:checked").parent().attr('pid');
		}else { var pid = $(this).parent().attr('pid');}
		var sstr = "&sid=" + sid + "&abcd=" + abcd + "&ab=" + ab + "&goods=" + goods + "&qishu=" + qishu ;
		sstr += "&puserid=" + puserid + "&page=" + page + "&orderby=" + orderby;
		sstr += "&sorttype=" + sorttype + "&xtypes=" + xtype + "&pid=" + pid+"&con="+con;
		
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
			data: 'xtype=getxx' + sstr,
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
					str += "<td>" + m['tz'][i]['wf'] + "</td>";
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
					$(".xxtb").hide();
					return false
				});
				$(".xxtb select").change(function() {
					$(".sort").attr("xtype",$(this).val());
					$(".sort").attr("page",1);
					obj.click()
				});
				$(".xxtb a.page").click(function() {
					$(".sort").attr("page",$(this).html());
					obj.click();
					return false
				});
				$(".xxtb th a").unbind('click');
				$(".xxtb th a").click(function() {
					$(".sort").attr("orderby", $(this).attr('class'));
					if ($(this).find("img").attr('s') == 'up') {
						
						$(this).find("img").attr('src', globalpath + "img/down.gif");
						$(".sort").attr("sorttype", 'DESC');
						$(this).find("img").attr('s', 'down')
					} else {
						
						$(this).find("img").attr('src', globalpath + "img/up.gif");
						$(".sort").attr("sorttype", 'ASC');
						$(this).find("img").attr('s', 'up')
					}
					obj.click();
					return false
				});
				str = null;
				m = null
			}
		});
		return false
	})
}
function flyxxclick(lib) {
	$("."+lib+" label.flyxx").click(function() {
		var sid = $(".now .bover").attr("sid");
	
		var abcd = $("#abcd").val();
		var ab = $("#ab").val();

		var qishu = $("#qishu").val();
		var goods = $("#goods").val();
	
		var puserid = $("#userid").val();
		var orderby = $(".sort").attr("orderby");
		var sorttype = $(".sort").attr("sorttype");
		var page = $(".sort").attr("page");
		var xtype = $(".sort").attr("xtype");
		var sname = $(".now th.bred").html();
		var con='';
		if (sname == '合肖' | sname == '連碼' | sname == '不中' | sname == '生肖連' | sname == '尾數連' | sname == '過關') {
			 con = $(this).parent().parent().find("td.c").html();
			 var pid = $("input[name='xz']:checked").parent().attr('pid');
		}else { var pid = $(this).parent().attr('pid');}
		
		var sstr = "&sid=" + sid + "&abcd=" + abcd + "&ab=" + ab + "&goods=" + goods + "&qishu=" + qishu ;
		sstr += "&puserid=" + puserid + "&page=" + page + "&orderby=" + orderby;
		sstr += "&sorttype=" + sorttype + "&xtypes=" + xtype +"&pid=" + pid+"&con="+con;

		var posi = $(this).position();
		if (posi.left > document.body.clientWidth) {
			$(".flytb").css('left', posi.left + $(this).width() - $(".xxtb").width())
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
			data: 'xtype=getfly' + sstr ,
			dataType: 'json',
			success: function(m) {
				var ml = m['tz'].length;
				var str = '';
				$(".flytb tr").each(function(i) {
					if (!$(this).hasClass('bt')) $(this).remove()
				});
				for (i = 0; i < ml; i++) {
					str += "<tr>";
					str += "<td>" + m['tz'][i]['qishu'] + "</td>";
					str += "<td>" + m['tz'][i]['tid'] + "</td>";
					str += "<td>" + m['tz'][i]['xtype'] + "</td>";
					str += "<td>" + m['tz'][i]['wf'] + "</td>";
					str += "<td>" + m['tz'][i]['abcd'] + "</td>";
					str += "<td>" + m['tz'][i]['ab'] + "</td>";
					str += "<td>" + m['tz'][i]['con'] + "</td>";
					str += "<td><label>" + m['tz'][i]['je'] + "</td>";
					str += "<td>" + m['tz'][i]['peilv1'] + "</td>";
					str += "<td>" + m['tz'][i]['points'] + "</td>";
					str += "<td>" + m['tz'][i]['user'] + "</td>";
					str += "<td>" + m['tz'][i]['xtime'] + "</td>";
					str += "<td>" + m['tz'][i]['flytype'] + "</td>";
					str += "</tr>"
				}
				$(".flytb").prepend("<tr><td><a href='javascript:void(0);' class='close'>关闭</a></td><td colspan=12></td></tr>");
				$(".flytb").append(str);
				$(".flytb .close").click(function() {
					$(".flytb").hide()
				});
				str = null;
				m = null
			}
		});
		return false
	})
}
function in_array(v, a) {
	for (key in a) {
		if (a[key] == v) return true
	}
	return false
}