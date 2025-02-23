function exe() {
	var play = [];
	var i = 0;
	var f = true;
	var classx = '';
	var bname = $(".main a.click").html();
	var sname;
	var cname;
	if (bname == '過關') {
		var pid = $(".ggtb .bt").attr('pid');
		var je = $("input.ggje").val();
		if (isNaN(je) | je % 1 != 0 | je < 0) {
			alert("您输入的金额不正确!");
			$(".duoexeje .ggje").focus();
			return false
		}
		var minje = Number($(".ggtb .bt").attr('minje'));
		var maxje = Number($(".ggtb .bt").attr('maxje'));
		if (je < minje | je > maxje) {
			alert("金额范围:[" + minje + "--" + maxje + "]");
			$(".duoexeje .ggje").focus();
			return false
		}
		var peilv1 = 1;
		var parr = [];
		var con = '';
		var tmp = 0;
		var cs = 0;
		$(".ggtb td.byellow").each(function(i) {
			parr[i] = [];
			parr[i]['pid'] = $(this).attr('pid');
			parr[i]['sid'] = $(this).attr('sid');
			parr[i]['cid'] = $(this).attr('cid');
			if (tmp != $(this).attr('sid')) {
				cs++;
				tmp = $(this).attr('sid')
			}
			peilv1 *= Number($(this).html());
			var ii = $(this).index() - 1;
			if (i > 0) con += "-";
			con += $(this).parent().find("th:eq(0)").html() + ":" + $(".ggtb tr:eq(0) th:eq(" + ii + ")").html()
		});
		play[0] = [];
		play[0]['pid'] = pid;
		play[0]['name'] = bname;
		play[0]['je'] = je;
		play[0]['peilv1'] = getResult(peilv1, 3);
		play[0]['con'] = con;
		play[0]['classx'] = bname;
		play[0]['arr'] = parr;
		parr = null;
		i = 1
	} else if (bname == '合肖' | bname == '連碼' | bname == '不中' | bname == '生肖連' | bname == '尾數連') {
		var mode = Number($(".duoexetb .click").attr("mode"));
		var pid = $(".make input.xz:checked").attr('pid');
		var pname = $(".make input.xz:checked").attr('mname');
		var num = $(".make input.xz:checked").attr('znum1');
		var je = $(".duoexetb .duoje").val();
		var minje = Number($(".make input.xz:checked").attr('minje'));
		var maxje = Number($(".make input.xz:checked").attr('maxje'));
		var aone = [];
		var atwo = [];
		var pone = [];
		var ptwo = [];
		if (isNaN(je) | je % 1 != 0 | je < 0) {
			alert("您输入的金额不正确!");
			$(".duoexeje .duoje").focus();
			return false
		}
		if (je < minje | je > maxje) {
			alert("金额范围:[" + minje + "--" + maxje + "]");
			$(".duoexeje .duoje").focus();
			return false
		}
		if (pname == '三中二'){
		     num=3;
		}
		if (mode == 1) {
			var yl = $(".duotb .byellow").length;
			if (yl < num) {
				alert("选择的号码数不够");
				return false
			}
			$(".duotb .byellow").each(function(i) {
				var htm = $(this).html();
				aone[i] = htm;
				if (bname == '連碼' | bname == '不中') {
					pone[htm] = Number($(this).next().find("label.peilv1").html());
					if (pname == '三中二' | pname == '二中特') {
						ptwo[htm] = Number($(this).next().find("label.peilv2").html())
					}
				} else {
					pone[htm] = Number($(this).next().next().find("label.peilv1").html())
				}
			});
			var aall = C(aone, num);
			var al = aall.length;
			i = al;
			for (i = 0; i < al; i++) {
				play[i] = [];
				play[i]['pid'] = pid;
				play[i]['name'] = pname;
				play[i]['je'] = je;
				play[i]['con'] = aall[i];
				play[i]['peilv1'] = peilvmin(aall[i], pone);
				if (pname == '三中二' | pname == '二中特') {
					play[i]['peilv2'] = peilvmin(aall[i], pone, ptwo)
				}
			}
			aall = null;
			aone = null;
			atwo = null;
			pone = null;
			atwo = null
		} else if (mode == 2) {
			var y1 = $(".duotb .bblue").length;
			var y2 = $(".duotb2 .byellow").length;
			if ((y1 + y2) < num) {
				alert("选择的号码数不够");
				return false
			}
			$(".duotb .bblue").each(function(i) {
				aone[i] = $(this).html()
			});
			$(".duotb .duom").each(function(i) {
				var htm = $(this).html();
				if (bname == '連碼' | bname == '不中') {
					pone[htm] = Number($(this).next().find("label.peilv1").html());
					if (pname == '三中二' | pname == '二中特') {
						ptwo[htm] = Number($(this).next().find("label.peilv2").html())
					}
				} else {
					pone[htm] = Number($(this).next().next().find("label.peilv1").html())
				}
			});
			$(".duotb2 .byellow").each(function(i) {
				atwo[i] = $(this).html()
			});
			var nac = num - y1;
			var aall = C(atwo, nac);
			var al = aall.length;
			for (k = 0; k < al; k++) {
				aall[k] = aone.concat(aall[k])
			}
			i = al;
			for (i = 0; i < al; i++) {
				play[i] = [];
				play[i]['pid'] = pid;
				play[i]['name'] = pname;
				play[i]['je'] = je;
				play[i]['con'] = aall[i];
				play[i]['peilv1'] = peilvmin(aall[i], pone);
				if (pname == '三中二' | pname == '二中特') {
					play[i]['peilv2'] = peilvmin(aall[i], pone, ptwo)
				}
			}
			aall = null;
			aone = null;
			atwo = null;
			pone = null;
			atwo = null
		} else {
			if (pname != '二中特' & pname != '二全中' & pname != '特串') {
				return false
			}
			var y1 = $(".duotb2 .byellow").length;
			var y2 = $(".duotb2 .bblue").length;
			if (y1 != 1 | y2 != 1) {
				alert("对碰模式,两种只能各选一样!");
				return false
			}
			$(".duotb .duom").each(function(i) {
				var htm = $(this).html();
				pone[htm] = Number($(this).next().find("label.peilv1").html());
				if (pname == '二中特') {
					ptwo[htm] = Number($(this).next().find("label.peilv2").html())
				}
			});
			$(".duotb2 .bblue").each(function(i) {
				aone[i] = $(this).html()
			});
			$(".duotb2 .byellow").each(function(i) {
				atwo[i] = $(this).html()
			});
			aone = sma[aone[0]];
			atwo = sma[atwo[0]];
			var ca1 = aone.length;
			var ca2 = atwo.length;
			aall = [];
			var k = 0;
			for (i = 0; i < ca1; i++) {
				for (j = 0; j < ca2; j++) {
					if (aone[i] != atwo[j]) {
						aall[k] = Array(isoma(aone[i]), isoma(atwo[j]));
						k++
					}
				}
			}
			var al = aall.length;
			i = al;
			for (i = 0; i < al; i++) {
				play[i] = [];
				play[i]['pid'] = pid;
				play[i]['name'] = pname;
				play[i]['je'] = je;
				play[i]['con'] = aall[i];
				play[i]['peilv1'] = peilvmin(aall[i], pone);
				if (pname == '二中特') {
					play[i]['peilv2'] = peilvmin(aall[i], pone, ptwo)
				}
			}
		}
		aall = null;
		aone = null;
		atwo = null;
		pone = null;
		atwo = null
	} else {
		$(".make input:text").each(function() {
			var je = $(this).val();
			if (Number(je) % 1 == 0 & je != 0 & !isNaN(je)) {
				play[i] = [];
				play[i]['pid'] = $(this).parent().attr('pid');
				play[i]['je'] = je;
				play[i]['name'] = $(".p" + play[i]['pid']).attr('mname');
				play[i]['peilv1'] = $(".p" + play[i]['pid']).find(".peilv1").html();
				if (Number(je) > Number($(".p" + play[i]['pid']).attr('maxje'))) {
					alert("<" + play[i]['name'] + ">单注最大金额：" + $(".p" + play[i]['pid']).attr('maxje'));
					f = false
				}
				if (Number(je) < Number($(".p" + play[i]['pid']).attr('minje'))) {
					alert("<" + play[i]['name'] + ">单注最小金额：" + $(".p" + play[i]['pid']).attr('minje'));
					f = false
				}
				if (bname == '正特') {
					play[i]['classx'] = $(".smenu input.click").val()
				}else if (bname == '正特1~6') {
					play[i]['classx'] = $(".p" + play[i]['pid']).attr('sname');
				} else {
					play[i]['classx'] = bname
				}
				play[i]['con'] = '';
				play[i]['bz'] = '';
				i++
			}
		})
	}
	if (!f) return false;
	if (i == 0) return false;
	if (i > 120) {
		alert("每次投注不能超过120注!");
		return false
	}
	play.sort(function(x,y){
		if(!isNaN(x['name']) & !isNaN(y['name']) ){
		  return x['name'] - y['name'];
		}else{
		  return x['pid'] - y['pid'];
		}
	});
	var str = '';
	var je = 0;
	for (j = 0; j < i; j++) {
		str += "<tr pid='" + play[j]['pid'] + "' content='' class='cg'>";
		str += "<td>" + (j + 1) + "</td>";
		if (bname == '合肖' | bname == '連碼' | bname == '不中' | bname == '生肖連' | bname == '尾數連') {
			str += "<td>" + play[j]['name'] + '&nbsp;<label class=red>' + play[j]['con'].join('-') + "</label></td>"
		} else if (bname == '過關') {
			str += "<td>" + play[j]['classx'] + '&nbsp;<label class=red>' + play[j]['con'] + "</label></td>"
		} else {
			str += "<td>" + play[j]['classx'] + '&nbsp;<label class=red>' + play[j]['name'] + "</label></td>"
		}
		str += "<td style='color:#cc3300'>" + play[j]['peilv1'];
		if (play[j]['name'] == '三中二' | play[j]['name'] == '二中特') {
			str += '/' + play[j]['peilv2']
		}
		str += "</td>";
		str += "<td>" + play[j]['je'] + "</td>";
		str += "</tr>";
		je += Number(play[j]['je'])
	}
	$(".sendtb").empty();
	$(".sendtb").show();
	$(".sendtb").append("<tr><td colspan=4><input type='button' class='qr btn btnf' value='确认投|注' /><input type='button' class='cancel btn btnf' value='关闭' style='margin-left:10px;' /></td></tr>");
$(".sendtb").append("<tr class='bt'><th>编号</th><th>内容</th><th>赔率</th><th>金额</th></tr>");
	$(".sendtb").append(str);
	$(".sendtb").append("<tr class='bt'><th>合计</th><td colspan=2></td><th>" + je + "</th></tr>");
	$(".sendtb").append("<tr><td colspan=4><input type='button' class='qr btn btnf' value='确认投|注' /><input type='button' class='cancel btn btnf' value='关闭' style='margin-left:10px;' /></td></tr>");
	$(".sendtb").append("<tr><td style='height:500px;' colspan=4></td></tr>");
	str = null;
	psend = play;
	play = null;
	$(".sendtb input:button").addClass("btn2 btnf");
	var edu = Number($(".uinfo td:eq(1)").html()) - Number($(".uinfo td:eq(2)").html());
	if (edu < je) {
		alert("您的投金额已超出可用余额");
		$(".sendtb .qr").attr('disabled', true)
	}
	addfunc2()
}
var errflag;

function lib() {
if($("#con:visible").length!=1) return false;
	var bid = $(".main a.click").attr("bid");
	var name = $(".main a.click").html();
	$(".make").hide();
	$(".make").empty();
	$(".smenu td:first").empty();

	$(".fastg").val("勾选");
	$(".tu").hide();

		 gets(bid, name);


	
}

function addfunc2() {
	$(".sendtb .cancel").click(function() {
		$(".sendtb").hide();
	$(".sendtb tr").each(function(i) {
		if (i != 1) $(this).remove()
	});
		return false
	});
	$(".sendtb .print").click(function() {
		tzprint();
		return false;
	});
	$(".sendtb .qr").click(function() {
		$(".sendtb input:button").attr("disabled", true);
		var pstr = '[';
		for (i = 0; i < psend.length; i++) {
			if (i != 0) pstr += ',';
			pstr += json_encode_js(psend[i])
		}
		pstr += ']';
		var abcd = $(".smenu td:eq(1)").find(".clicks").attr("v");
		var ab = $(".smenu td:eq(1)").find(".click").attr("ab");
		var bid = $(".main a.click").attr("bid");
		if (abcd == undefined | abcd == 'undefined') abcd = $(".smenu input[name='abcd']").val();
		var str = "&abcd=" + abcd + "&ab=" + ab + "&bid=" + bid;
		//alert(pstr);return;
		$.ajax({
			type: 'POST',
			url: 'makelib.php',
			data: 'xtype=make&pstr=' + pstr + str,
			dataType: 'json',
			cache: false,
			success: function(m) {
				//alert(m);
				//$("#test").html(m);return;
				var ml = m.length;
				var gflag = false;
				var bflag = false;
				var errstr = "";
				var obj;
for (i = 0; i < ml; i++) {
	obj = $(".sendtb .cg:eq("+i+")");
	if (Number(m[i]['cg']) == 1) {
		if (Number(m[i]['cgs']) == 1) {
			obj.find("td:eq(0)").html(obj.find("td:eq(0)").html()+"&nbsp;赔率改动!");
			obj.find("td:eq(0)").addClass("red")
		} else {
			obj.find("td:eq(0)").html(obj.find("td:eq(0)").html()+"&nbsp;成功!");
			obj.find("td:eq(0)").addClass("lv")
		}
		obj.find("td:eq(2)").html(m[i]['peilv1']);
		if(m[i]['name'] == '三中二' | m[i]['name'] == '二中特'){
		    obj.find("td:eq(2)").html(obj.find("td:eq(2)").html()+"/"+m[i]['peilv2']);
		}
	} else {
		obj.find("td:eq(0)").html(obj.find("td:eq(0)").html()+"&nbsp;"+m[i]['err']);
		obj.find("td:eq(0)").addClass("red");
	}
}			$(".cancel:first").click();
				$(".sendtb .print").show();
				$(".sendtb .qr").hide();
				$(".sendtb input:button").attr("disabled", false);
				play=new Array();psend=null;
				getlast15();
				getusermoney()
			}
		});
		return false
	})
}
function gets(bid, bname) {
	if (bname.indexOf('特') != -1 & bname.indexOf('正') != -1) {
		$.ajax({
			type: 'POST',
			url: 'make.php',
			dataType: 'json',
			cache: false,
			data: 'xtype=gets&bid=' + bid,
			success: function(m) {
				var ml = m.length;
				$(".smenu td:eq(0)").find("input").remove();
				var str = '';
				for (i = 0; i < ml; i++) {
					str += "<input type=\"button\"  class=\"btn2 btn sc button\" sid=\"" + m[i]['sid'] + "\" value=\"" + m[i]['name'] + "\" >"
				}
				$(".smenu td:eq(0)").prepend(str);
				str = null;
				m = null;
				$(".smenu input:eq(0)").addClass('click');
				$(".smenu td:eq(0)").find("input").click(function() {
					$(".smenu td:eq(0) input").removeClass('click');
					$(this).addClass('click');
					lib61();
					return false
				});
				lib61()
			}
		})
	} else if (bname == '過關') {
		libgg()
	} else {
		lib61()
	}
}




function lib61() {
	var ab = $(".smenu td:eq(1)").find(".click").attr("ab");
	var bid = $(".main a.click").attr("bid");
	var abcd = $(".smenu td:eq(1)").find(".clicks").attr("v");
	if (abcd == undefined | abcd == 'undefined') abcd = $(".smenu input[name='abcd']").val();
	var sid = $(".smenu td:eq(0)").find('input.click').attr('sid');
	if (sid == undefined) sid = bid;
	var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&sid=" + sid;
	var bname = $(".main a.click").html();
	$(".duotb").remove();
	$(".duotb2").remove();
	$(".messtb").show();
	$(".exetb").show();
	$(".ggmesstb").hide();
	$(".duoexetb").hide();
	var stype='d';
	if(bname=='正特1~6'){
	    stype='1-6';
	}
	$.ajax({
		type: 'POST',
		url: 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=lib&stype='+stype + sstr,
		success: function(m) {
			var ml = m.length;
			$(".make").hide('fast');
			if (bname == '特碼' | bname == '正特' | bname == '正碼') {
				var str = "<tr><td valign=top class='neitd'><table class='tinfo wd100'  cellspacing=0><tr class='bt'><Th class=f>項目</th><th class=s>赔率</th><Th class=t>金額</th><Th class=f>項目</th><th class=s>赔率</th><Th class=t>金額</th><Th class=f>項目</th><th class=s>赔率</th><Th class=t>金額</th><Th class=f>項目</th><th class=s>赔率</th><Th class=t>金額</th><Th class=f>項目</th><th class=s>赔率</th><Th class=t>金額</th></tr><tr>";
				if(bname == '正碼'){
				  key = [0,10,20,30,40,1,11,21,31,41,2,12,22,32,42,3,13,23,33,43,4,14,24,34,44,5,15,25,35,45,6,16,26,36,46,7,17,27,37,47,8,18,28,38,48,9,19,29,39,88,49,50,51,52,88];
				}else{
				  key = [0,10,20,30,40,1,11,21,31,41,2,12,22,32,42,3,13,23,33,43,4,14,24,34,44,5,15,25,35,45,6,16,26,36,46,7,17,27,37,47,8,18,28,38,48,9,19,29,39,57,49,51,53,55,58,50,52,54,56,59];
				}
				ck = key.length;
				var i=0;
				for (j = 0; j < ck; j++) {
					
					i = key[j];
						if (j % 5 == 0 & j != 0 ) {
						str += "</tr><tr>";
					}
			    if(i==88) {
					str += "<td colspan=3></td>";
					continue;
				}
					if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
					str += "<th class='over f1 m m2 m" + m[i]['pid'] + " " + bj(m[i]['name']) + "'  pid='" + m[i]['pid'] + "'  >" + qiu(m[i]['name']) + "</th>";
					str += "<td class='s1 p p2 p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + m[i]['peilv1'] + "</label></td>";
					if (Number(m[i]['ifok']) == 1) str += "<TD class='over t1 t2 i" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "'><input type='text' class='in int'   /><input type='checkbox' class='hide in' /></td>";
					else str += "<TD class='t1 t2'>封盘</td>";
					
				}
				str += "</tr></table></td></tr>";
			} else if (bname == '特肖' | bname == '半波' | bname == '五行' | bname == '一肖' | bname == '尾數') {
				var str = "<tr><td valign=top class='neitd '><table class='tinfo wd100'  cellspacing=0><tr class='bt'><Th class=f>項目</th><th class=s>赔率</th><Th class=t>号码</th><Th class=t>金額</th></tr>";
				for (i = 0; i < ml; i++) {
					str += "<tr>"
					if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
					str += "<th class='f1 m m2 m" + m[i]['pid'] + " " + bj(m[i]['name']) + "'  pid='" + m[i]['pid'] + "'  >" + m[i]['name'] + "</th>";
					str += "<td class='s1 p p2 p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + m[i]['peilv1'] + "</label></td>";
					str += "<td class='imgtd'>" + img(m[i]['name'],bname) + "</td>";
					if (Number(m[i]['ifok']) == 1) str += "<TD class='over t1 t2 i" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "'><input type='text' class='in int'   /><input type='checkbox' class='hide in' /></td>";
					else str += "<TD class='t1 t2'>封盘</td>";
					str += "</tr>"
				}
				str += "</table></td></tr>"
			} else if (bname == '合肖' | bname == '連碼' | bname == '不中' | bname == '生肖連' | bname == '尾數連') {
				var tmp = '';
				var str = "<tr><td valign=top class='neitd'><table class='tinfo wd100'  cellspacing=0>";
				str += "<tr>";
				for (i = 0; i < ml; i++) {
					if (i % 3 == 0) str += "</tr><tr>";
					str += "<th class='over f1 m m2 m" + m[i]['pid'] + " " + bj(m[i]['name']) + "'  pid='" + m[i]['pid'] + "'  >" + m[i]['name'] + "</th>";
					str += "<td><input pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'  znum1='" + m[i]['znum1'] + "' type='radio' name='xz' class='xz xz" + m[i]['pid'] + "' ";
					if (Number(m[i]['ifok']) == 0) {
						str += "disabled"
					}
					str += " />";
					if (m[i]['name'] == '三中二') str += "中二/中三";
					if (m[i]['name'] == '二中特') str += "中二/中特";
					str += "</td>"
				}
				str += "</tr>";
				str += "</table></td></tr>"
			}else if(bname=='正特1~6'){
				var tmp = '';
				var str = "<tr><td valign=top class='neitd'><table class='tinfo wd100'  cellspacing=0>";
				str += "<tr>";
				str += "<td>项目</td>";
					for (i = 0; i < ml; i+=11) {
						str += "<th colspan=2 class='bt' >" + m[i]['sname'] + "</th>"
					}
					str += "</tr>";
					var i;
					for(j=0;j<11;j++){
						str += "<tr>";
						str += "<th>"+m[j]['name']+"</th>";
						for (k = 0; k < 6; k++) {
							i= j+k*11;
										if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
					str += "<th class='hide over f1 m m2 m" + m[i]['pid'] + " " + bj(m[i]['name']) + "'  pid='" + m[i]['pid'] + "'  >" +m[i]['name'] + "</th>";
					str += "<td class='over s1 p p2 p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "'  sname='" + m[i]['sname'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + m[i]['peilv1'] + "</label></td>";
					
					if (Number(m[i]['ifok']) == 1) str += "<TD class='over t1 t2 i" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "'><input type='text' class='in int'   /><input type='checkbox' class='hide in' /></td>";
					else str += "<TD class='t1 t2'>封盘</td>";
						}
					  str += "</tr>";
					}
			str += "</table></td></tr>";
			$(".make").width(800);
					
			}
			$(".make").html("<tbody>" + str + "</tbody>");
			$(".make").show('fast');
			str = null;
			m = null;
			if (bname == '合肖' | bname == '連碼' | bname == '不中' | bname == '生肖連' | bname == '尾數連') {
				duofunc()
			} else {
				addfunc()
			}
		}
	})
}
function libgg() {
	var ab = $(".smenu td:eq(1)").find(".click").attr("ab");
	var bid = $(".main a.click").attr("bid");
	var abcd = $(".smenu td:eq(1)").find(".clicks").attr("v");
	if (abcd == undefined | abcd == 'undefined') abcd = $(".smenu input[name='abcd']").val();
	var sid = $(".smenu td:eq(0)").find('input.click').attr('sid');
	if (sid == undefined) sid = bid;
	var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&sid=" + sid;
	var bname = $(".main a.click").html();
	$(".duotb").remove();
	$(".duotb2").remove();
	$(".messtb").hide();
	$(".exetb").hide();
	$(".ggmesstb").show();
	$(".duoexetb").hide();
	$.ajax({
		type: 'POST',
		url: 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=lib&stype=gg' + sstr,
		success: function(m) {
			var ml = m.length;
			if(m[0]['ifok']==0){
			   var str = "<tr><td>封盘</td></tr>";
			   $(".make").html("<tbody>" + str + "</tbody>");
			   $(".make").show('fast');
			}else{
			var str = "<tr><td><table class='tinfo ggtb wd100 " + style + "tb'>";
			str += "<tr><td class='bt' minje='" + m[0]['minje'] + "' maxje='" + m[0]['maxje'] + "' pid='" + m[0]['pid'] + "'>過關</td>";
			var ml6 = ml / 6;
			for (i = 0; i < ml6; i++) {
				str += "<th>" + m[i]['name'] + "</th>"
			}
			str += "</tr>";
			for (i = 0; i < 6; i++) {
				str += "<tr>";
				str += "<th>" + m[i * ml6]['sname'] + "</th>";
				for (j = 0; j < ml6; j++) {
					str += "<td class='peilv1' sid='" + m[i * ml6 + j]['sid'] + "' pid='" + m[i * ml6 + j]['pid'] + "'  cid='" + m[i * ml6 + j]['cid'] + "'>" + m[i * ml6 + j]['peilv1'] + "</td>"
				}
				str += "</tr>"
			}
			str += "</table><td></tr>";
			$(".make").html("<tbody>" + str + "</tbody>");
			$(".make").show('fast');
			$(".make .peilv1").click(function() {
				$(this).toggleClass('byellow');
				if($(this).parent().find("td.byellow").length>2){
				   $(this).removeClass('byellow');
				}
				var peilv = 1;
				$(".make .byellow").each(function() {
					peilv *= Number($(this).html())
				});
				$(".ggpeilv").html(getResult(peilv, 3))
			});
			}
			str = null
		}
	})
}
function duofunc() {
	$(".make").find("input.xz").change(function() {
		var pid = $(this).attr('pid');
		var pname = $(this).attr('mname');
		var sstr = "&pid=" + pid;
		$(".duoexetb .mode:eq(0)").click();
		$(".duotb").remove();
		$(".duotb2").remove();
		$(".messtb").hide();
		$(".exetb").hide();
		$(".ggmesstb").hide();
		$(".duoexetb").show();
		$.ajax({
			type: 'POST',
			url: 'make.php',
			dataType: 'json',
			cache: false,
			data: 'xtype=duolib' + sstr,
			success: function(m) {
				//$("#test").html(m);return;
				var str = "<table class='tinfo duotb'><tbody><tr>";
				var ml = m[0].length;
				if (ml <= 12) str += "<th>项目</th><th>号码</th><th>赔率</th><th>项目</th><th>号码</th><th>赔率</th></tr><tr>";
				else {
					str += "<th>号码</th><th>赔率</th><th>号码</th><th>赔率</th><th>号码</th><th>赔率</th><th>号码</th><th>赔率</th><th>号码</th><th>赔率</th><th>号码</th><th>赔率</th><th>号码</th><th>赔率</th></tr><tr>"
				}
				for (i = 0; i < ml; i++) {
					str += "<td class='chu duom " + colorm(m[0][i]) + "'>" + m[0][i] + "</td>";
					if (pname.indexOf('肖') != -1 | pname.indexOf('尾') != -1) str += "<td class='imgtd2'>" + img(m[0][i],1) + "</td>";
					if (pname == '三中二' | pname == '二中特') str += "<td><label class='peilv1'>" + m[1][i] + "</label><BR /><label class='peilv2'>" + m[2][i] + "</label></td>";
					else str += "<td><label class='peilv1'>" + m[1][i] + "</label></td>";
					if (ml == 12) {
						if ((i + 1) % 2 == 0) {
							str += "</tr><tr>"
						}
					} else if (ml == 10) {
						if ((i + 1) % 2 == 0) {
							str += "</tr><tr>"
						}
					} else {
						if ((i + 1) % 7 == 0) {
							str += "</tr><tr>"
						}
					}
				}
				str += "</tr></tbody></table>";
				$(".duoexetb").after(str);
				$(".duotb").after($(".duotb2str").val());
				$(".duotb2 tr.m td").each(function(i) {
					var htm = $(this).html();
					if (!isNaN(htm)) {
						$(this).addClass(colorm(htm))
					}
					$(this).addClass('duom')
				});
				$(".duotb .duom").click(function() {
					var mode = Number($(".duoexetb .click").attr('mode'));
					if (mode == 1) {
						$(".duotb .duom").removeClass('bblue');
						$(this).toggleClass('byellow')
					} else if (mode == 2) {
						$(".duotb .duom").removeClass('byellow');
						$(this).toggleClass('bblue');
						var ppname = $(".make input.xz:checked").attr('mname');
						
						if(ppname=='三中二'){
						   var num=3;
						}else{
						   var num = Number($(".make input.xz:checked").attr('znum1'));
						}
						if ($(".duotb .bblue").length > (num - 1)) {
							$(this).removeClass('bblue');
							alert(ppname + "拖头模式【头】最多只能选择" + (num - 1) + "个")
						}
						var f = false;
						var htm = $(this).html();
						$(".duotb2 .byellow").each(function() {
							if ($(this).html() == htm) {
								f = true
							}
						});
						if (f) {
							alert("头和拖不能选择同样号码!");
							$(this).removeClass('bblue')
						}
					}
				});
				$(".duotb2 .duom").click(function() {
					var mode = Number($(".duoexetb .click").attr('mode'));
					var num;
					if (mode == 2) {
						$(this).toggleClass('byellow');
						var f = false;
						var htm = $(this).html();
						$(".duotb .bblue").each(function() {
							if ($(this).html() == htm) {
								f = true
							}
						});
						if (f) {
							alert("头和拖不能选择同样号码!");
							$(this).removeClass('byellow')
						}
					} else if (mode == 3) {
						var tmp = $(this).parent().parent().find("th:eq(0)").html();
						if (tmp.indexOf('對') != -1) {
							$(this).toggleClass('byellow');
							num = $(".duotb2 .byellow").length;
							if (num > 1) {
								$(this).removeClass('byellow');
								alert("只能选择一个对碰项目")
							}
							if ($(".duotb2 .bblue").html() == $(this).html()) {
								$(this).removeClass('byellow');
								alert("不能同时选择" + $(this).html())
							}
						} else {
							$(this).toggleClass('bblue');
							num = $(".duotb2 .bblue").length;
							if (num > 1) {
								$(this).removeClass('bblue');
								alert("只能选择一个对碰项目")
							}
							if ($(".duotb2 .byellow").html() == $(this).html()) {
								$(this).removeClass('bblue');
								alert("不能同时选择" + $(this).html())
							}
						}
					} else if (mode == 4) {
						var tmp = $(this).parent().parent().find("th:eq(0)").html();
						if (tmp.indexOf('對') != -1) {
							$(this).toggleClass('byellow');
							num = $(".duotb2 .byellow").length;
							if (num > 1) {
								$(this).removeClass('byellow');
								alert("只能选择一个对碰项目")
							}
							if ($(".duotb2 .bblue").html() == $(this).html()) {
								$(this).removeClass('byellow');
								alert("不能同时选择" + $(this).html())
							}
						} else {
							$(this).toggleClass('bblue');
							num = $(".duotb2 .bblue").length;
							if (num > 1) {
								$(this).removeClass('bblue');
								alert("只能选择一个对碰项目")
							}
							if ($(".duotb2 .byellow").html() == $(this).html()) {
								$(this).removeClass('bblue');
								alert("不能同时选择" + $(this).html())
							}
						}
					} else if (mode == 5) {
						var tmp = $(this).parent().parent().find("th:eq(0)").html();
						if (tmp.indexOf('尾') != -1) {
							$(this).toggleClass('byellow');
							num = $(".duotb2 .byellow").length;
							if (num > 1) {
								$(this).removeClass('byellow');
								alert("只能选择一个对碰项目")
							}
						} else {
							$(this).toggleClass('bblue');
							num = $(".duotb2 .bblue").length;
							if (num > 1) {
								$(this).removeClass('bblue');
								alert("只能选择一个对碰项目")
							}
						}
					}
				});
				$(".duotr").hide();
				if (pname == '特串' | pname == '二中特' | pname == '二全中') {
					$(".duoexetb input.mode:eq(2)").show();
					$(".duoexetb input.mode:eq(3)").show();
					$(".duoexetb input.mode:eq(4)").show()
				} else {
					$(".duoexetb input.mode:eq(2)").hide();
					$(".duoexetb input.mode:eq(3)").hide();
					$(".duoexetb input.mode:eq(4)").hide()
				}
			}
		})
	})
}
function transm(v) {
	if (isNaN(v)) return v;
	else return "<img src='../imgs/" + v + ".gif' />"
}
function qiu(ns) {
if(isNaN(ns)) return ns;

			if (in_array(ns,sma['紅'])) {
				return "<div class='qiured'>" + ns + "</div>"
			} else if(in_array(ns,sma['藍'] )) {
				return "<div class='qiublue'>" + ns + "</div>"
			}else if(in_array(ns,sma['綠'])) {
				return "<div class='qiugreen'>" + ns + "</div>"
			}
	

}
function qiua(ns) {
if(isNaN(ns)) return ns;

			if (in_array(ns,sma['紅'])) {
				return "<div class='qiured1'>" + ns + "</div>"
			} else if(in_array(ns,sma['藍'] )) {
				return "<div class='qiublue1'>" + ns + "</div>"
			}else if(in_array(ns,sma['綠'])) {
				return "<div class='qiugreen1'>" + ns + "</div>"
			}
	

}
function img(v,bn) {
	var img = '';
	arr = [];
	arr = sma[v];
	var tmp;
	for (var i in arr) {
		tmp = arr[i] < 10 ? '0' + arr[i] : arr[i];
		if(bn=='半波' & tmp==49) img+='';
		else img += qiua(tmp);
	}
	return img
}
function bj(v) {
	if (!isNaN(v)) return 'no'
}
function isoma(v) {
	v = Number(v);
	if (v < 10) v = '0' + v;
	return v
}
function colorm(m) {
	if (in_array(m, sma['紅'])) return "red";
	if (in_array(m, sma['藍'])) return "blue";
	if (in_array(m, sma['綠'])) return "green"
}
function checknum() {}
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
function strtoma(words) {
	words = words.replace(/s2/ig, "," + sma['牛'].join(',') + ",");
	words = words.replace(/s3/ig, "," + sma['虎'].join(',') + ",");
	words = words.replace(/s4/ig, "," + sma['兔'].join(',') + ",");
	words = words.replace(/s5/ig, "," + sma['龍'].join(',') + ",");
	words = words.replace(/s6/ig, "," + sma['蛇'].join(',') + ",");
	words = words.replace(/s7/ig, "," + sma['馬'].join(',') + ",");
	words = words.replace(/s8/ig, "," + sma['羊'].join(',') + ",");
	words = words.replace(/s9/ig, "," + sma['猴'].join(',') + ",");
	words = words.replace(/s10/ig, "," + sma['雞'].join(',') + ",");
	words = words.replace(/s11/ig, "," + sma['狗'].join(',') + ",");
	words = words.replace(/s12/ig, "," + sma['豬'].join(',') + ",");
	words = words.replace(/s1/ig, "," + sma['鼠'].join(',') + ",");
	words = words.replace(/牛/g, "," + sma['牛'].join(',') + ",");
	words = words.replace(/虎/g, "," + sma['虎'].join(',') + ",");
	words = words.replace(/兔/g, "," + sma['兔'].join(',') + ",");
	words = words.replace(/龍/g, "," + sma['龍'].join(',') + ",");
	words = words.replace(/蛇/g, "," + sma['蛇'].join(',') + ",");
	words = words.replace(/馬/g, "," + sma['馬'].join(',') + ",");
	words = words.replace(/羊/g, "," + sma['羊'].join(',') + ",");
	words = words.replace(/猴/g, "," + sma['猴'].join(',') + ",");
	words = words.replace(/雞/g, "," + sma['雞'].join(',') + ",");
	words = words.replace(/狗/g, "," + sma['狗'].join(',') + ",");
	words = words.replace(/豬/g, "," + sma['豬'].join(',') + ",");
	words = words.replace(/鼠/g, "," + sma['鼠'].join(',') + ",");
	words = words.replace(/龙/g, "," + sma['龍'].join(',') + ",");
	words = words.replace(/马/g, "," + sma['馬'].join(',') + ",");
	words = words.replace(/鸡/g, "," + sma['雞'].join(',') + ",");
	words = words.replace(/猪/g, "," + sma['豬'].join(',') + ",");
	words = words.replace(/0尾/g, "," + sma['0尾'].join(',') + ",");
	words = words.replace(/1尾/g, "," + sma['1尾'].join(',') + ",");
	words = words.replace(/2尾/g, "," + sma['2尾'].join(',') + ",");
	words = words.replace(/3尾/g, "," + sma['3尾'].join(',') + ",");
	words = words.replace(/4尾/g, "," + sma['4尾'].join(',') + ",");
	words = words.replace(/5尾/g, "," + sma['5尾'].join(',') + ",");
	words = words.replace(/6尾/g, "," + sma['6尾'].join(',') + ",");
	words = words.replace(/7尾/g, "," + sma['7尾'].join(',') + ",");
	words = words.replace(/8尾/g, "," + sma['8尾'].join(',') + ",");
	words = words.replace(/9尾/g, "," + sma['9尾'].join(',') + ",");
	words = words.replace(/w0/ig, "," + sma['0尾'].join(',') + ",");
	words = words.replace(/w1/ig, "," + sma['1尾'].join(',') + ",");
	words = words.replace(/w2/ig, "," + sma['2尾'].join(',') + ",");
	words = words.replace(/w3/ig, "," + sma['3尾'].join(',') + ",");
	words = words.replace(/w4/ig, "," + sma['4尾'].join(',') + ",");
	words = words.replace(/w5/ig, "," + sma['5尾'].join(',') + ",");
	words = words.replace(/w6/ig, "," + sma['6尾'].join(',') + ",");
	words = words.replace(/w7/ig, "," + sma['7尾'].join(',') + ",");
	words = words.replace(/w8/ig, "," + sma['8尾'].join(',') + ",");
	words = words.replace(/w9/ig, "," + sma['9尾'].join(',') + ",");
	words = words.replace(/0头/g, ",1,2,3,4,5,6,7,8,9,");
	words = words.replace(/1头/g, ",10,11,12,13,14,15,16,17,18,19,");
	words = words.replace(/2头/g, ",20,21,22,23,24,25,26,27,28,29,");
	words = words.replace(/3头/g, ",30,31,32,33,34,35,36,37,38,39,");
	words = words.replace(/4头/g, ",40,41,42,43,44,45,46,47,48,49,");
	words = words.replace(/t0/ig, ",1,2,3,4,5,6,7,8,9,");
	words = words.replace(/t1/ig, ",10,11,12,13,14,15,16,17,18,19,");
	words = words.replace(/t2/ig, ",20,21,22,23,24,25,26,27,28,29,");
	words = words.replace(/t3/ig, ",30,31,32,33,34,35,36,37,38,39,");
	words = words.replace(/t4/ig, ",40,41,42,43,44,45,46,47,48,49,");
	words = words.replace(/红单/g, "," + sma['紅單'].join(',') + ",");
	words = words.replace(/蓝单/g, "," + sma['藍單'].join(',') + ",");
	words = words.replace(/绿单/g, "," + sma['綠單'].join(',') + ",");
	words = words.replace(/红双/g, "," + sma['紅雙'].join(',') + ",");
	words = words.replace(/蓝双/g, "," + sma['藍雙'].join(',') + ",");
	words = words.replace(/绿双/g, "," + sma['綠雙'].join(',') + ",");
	words = words.replace(/红大/g, "," + sma['紅大'].join(',') + ",");
	words = words.replace(/蓝大/g, "," + sma['藍大'].join(',') + ",");
	words = words.replace(/绿大/g, "," + sma['綠大'].join(',') + ",");
	words = words.replace(/红小/g, "," + sma['紅小'].join(',') + ",");
	words = words.replace(/蓝小/g, "," + sma['藍小'].join(',') + ",");
	words = words.replace(/绿小/g, "," + sma['綠雙'].join(',') + ",");
	words = words.replace(/红/g, "," + sma['紅'].join(',') + ",");
	words = words.replace(/蓝/g, "," + sma['藍'].join(',') + ",");
	words = words.replace(/绿/g, "," + sma['綠'].join(',') + ",");
	words = words.replace(/紅單/g, "," + sma['紅單'].join(',') + ",");
	words = words.replace(/藍單/g, "," + sma['藍單'].join(',') + ",");
	words = words.replace(/綠單/g, "," + sma['綠單'].join(',') + ",");
	words = words.replace(/紅雙/g, "," + sma['紅雙'].join(',') + ",");
	words = words.replace(/藍雙/g, "," + sma['藍雙'].join(',') + ",");
	words = words.replace(/綠雙/g, "," + sma['綠雙'].join(',') + ",");
	words = words.replace(/紅大/g, "," + sma['紅大'].join(',') + ",");
	words = words.replace(/藍大/g, "," + sma['藍大'].join(',') + ",");
	words = words.replace(/綠大/g, "," + sma['綠大'].join(',') + ",");
	words = words.replace(/紅小/g, "," + sma['紅小'].join(',') + ",");
	words = words.replace(/藍小/g, "," + sma['藍小'].join(',') + ",");
	words = words.replace(/綠小/g, "," + sma['綠雙'].join(',') + ",");
	words = words.replace(/紅/g, "," + sma['紅'].join(',') + ",");
	words = words.replace(/藍/g, "," + sma['藍'].join(',') + ",");
	words = words.replace(/綠/g, "," + sma['綠'].join(',') + ",");
	words = words.replace(/hongdan/ig, "," + sma['紅單'].join(',') + ",");
	words = words.replace(/landan/ig, "," + sma['藍單'].join(',') + ",");
	words = words.replace(/lvdan/ig, "," + sma['綠單'].join(',') + ",");
	words = words.replace(/hongshuang/ig, "," + sma['紅雙'].join(',') + ",");
	words = words.replace(/lanshuang/ig, "," + sma['藍雙'].join(',') + ",");
	words = words.replace(/lvshuang/ig, "," + sma['綠雙'].join(',') + ",");
	words = words.replace(/hongda/ig, "," + sma['紅大'].join(',') + ",");
	words = words.replace(/landa/ig, "," + sma['藍大'].join(',') + ",");
	words = words.replace(/lvda/ig, "," + sma['綠大'].join(',') + ",");
	words = words.replace(/hongxiao/ig, "," + sma['紅小'].join(',') + ",");
	words = words.replace(/lanxiao/ig, "," + sma['藍小'].join(',') + ",");
	words = words.replace(/lvxiao/ig, "," + sma['綠雙'].join(',') + ",");
	words = words.replace(/hong/ig, "," + sma['紅'].join(',') + ",");
	words = words.replace(/lan/ig, "," + sma['藍'].join(',') + ",");
	words = words.replace(/lv/ig, "," + sma['綠'].join(',') + ",");
	words = words.replace(/尾大/g, "," + sma['尾大'].join(',') + ",");
	words = words.replace(/尾小/g, "," + sma['尾小'].join(',') + ",");
	words = words.replace(/合單/g, "," + sma['合單'].join(',') + ",");
	words = words.replace(/合雙/g, "," + sma['合雙'].join(',') + ",");
	words = words.replace(/家畜/g, "," + sma['家畜'].join(',') + ",");
	words = words.replace(/野獸/g, "," + sma['野獸'].join(',') + ",");
	words = words.replace(/前/g, "," + sma['前'].join(',') + ",");
	words = words.replace(/後/g, "," + sma['後'].join(',') + ",");
	words = words.replace(/合单/g, "," + sma['合單'].join(',') + ",");
	words = words.replace(/合双/g, "," + sma['合雙'].join(',') + ",");
	words = words.replace(/家畜/g, "," + sma['家畜'].join(',') + ",");
	words = words.replace(/野兽/g, "," + sma['野獸'].join(',') + ",");
	words = words.replace(/前/g, "," + sma['前'].join(',') + ",");
	words = words.replace(/后/g, "," + sma['後'].join(',') + ",");
	words = words.replace(/單/g, "," + sma['單'].join(',') + ",");
	words = words.replace(/雙/g, "," + sma['雙'].join(',') + ",");
	words = words.replace(/单/g, "," + sma['單'].join(',') + ",");
	words = words.replace(/双/g, "," + sma['雙'].join(',') + ",");
	words = words.replace(/大/g, "," + sma['大'].join(',') + ",");
	words = words.replace(/小/g, "," + sma['小'].join(',') + ",");
	words = words.replace(/wd/ig, "," + sma['尾大'].join(',') + ",");
	words = words.replace(/wx/ig, "," + sma['尾小'].join(',') + ",");
	words = words.replace(/hd/ig, "," + sma['合單'].join(',') + ",");
	words = words.replace(/hs/ig, "," + sma['合雙'].join(',') + ",");
	words = words.replace(/jc/ig, "," + sma['家畜'].join(',') + ",");
	words = words.replace(/ys/ig, "," + sma['野獸'].join(',') + ",");
	words = words.replace(/qian/ig, "," + sma['前'].join(',') + ",");
	words = words.replace(/hou/ig, "," + sma['後'].join(',') + ",");
	words = words.replace(/dan/ig, "," + sma['單'].join(',') + ",");
	words = words.replace(/shuang/ig, "," + sma['雙'].join(',') + ",");
	words = words.replace(/da/ig, "," + sma['大'].join(',') + ",");
	words = words.replace(/xiao/ig, "," + sma['小'].join(',') + ",");
	
	return words;
}
$(function() {
$(".textsm").click(function() {
	var posi = $(this).position();
	$(".textsmv").show();
	$(".textsmv").css("left", posi.left + $(this).width() - $(".textsmv").width());
	$(".textsmv").css("top", posi.top + $(this).height() + 5)
});
$(".textsmvclose").click(function() {
	$(".textsmv").hide()
});
$(".textclear").click(function() {
	$(".fasttext").find("textarea").html('')
});
$(".sendtext").click(function() {
	var bname = $(".main a.click").html();
	if (bname != '特碼' & bname != '正特' & bname != '正碼') return false;
	var txt = $(".fasttext").find("textarea").html();
	txt = txt.replace(/\s/g, ',');
	var tzarr = [];
	for (i = 0; i <= 48; i++) {
		tzarr[i] = 0
	}
	var reg = /\[[^\[\]]+\]=\d{1,6}/g;
	var res;
	var cr;
	var result;
	while ((result = reg.exec(txt)) != null) {
		res = result[0].split("=");
		res[0] = res[0].replace('[', '');
		res[0] = res[0].replace(']', '');
		res[0] = strtoma(res[0]);
		res[0] = res[0].split(',');
		cr = res[0].length;
		for (i = 0; i < cr; i++) {
			if (res[0][i] != '' & !isNaN(res[0][i])) {
				tzarr[res[0][i] - 1] += Number(res[1])
			}
		}
	}
	var arr2 = txt.replace(/\[[^\[\]]+\]=\d{1,6}/g, '');
	arr2 = arr2.split(',');
	var ca = arr2.length;
	var cam;
	var start, end, tmp;
	for (i = 0; i < ca; i++) {
		if (arr2[i] != '') {
			if (arr2[i].indexOf('-') != -1) {
				arr2[i] = arr2[i].split('=');
				arr2[i][0] = arr2[i][0].split("-");
				start = Number(arr2[i][0][0]);
				end = Number(arr2[i][0][1]);
				if (start > end) {
					tmp = start;
					start = end;
					end = tmp
				}
				for (j = start; j <= end; j++) {
					tzarr[j - 1] += Number(arr2[i][1])
				}
			} else {
				if (isNaN(arr2[i])) {
					arr2[i] = strtoma(arr2[i])
				}
				arr2[i] = arr2[i].split("=");
				arr2[i][0] = arr2[i][0].split(',');
				cam = arr2[i][0].length;
				for (j = 0; j < cam; j++) {
					if (arr2[i][0][j] != '' & !isNaN(arr2[i][0][j])) {
						tzarr[arr2[i][0][j] - 1] += Number(arr2[i][1])
					}
				}
			}
		}
	}
	arr2 = null;
	res = null;
	result = null;
	key = [0, 10, 20, 30, 40, 1, 11, 21, 31, 41, 2, 12, 22, 32, 42, 3, 13, 23, 33, 43, 4, 14, 24, 34, 44, 5, 15, 25, 35, 45, 6, 16, 26, 36, 46, 7, 17, 27, 37, 47, 8, 18, 28, 38, 48, 9, 19, 29, 39];
	var tmp;
	$(".cancel").click();
	$(".make input:text").each(function(i) {
		if (i <= 48) {
			tmp = tzarr[key[i]];
			if (!isNaN(tmp) & tmp >= 1) {
				$(this).val(tmp);
				$(this).addClass("byellow");
			}
		}
	});
	$(".exe").click();
	tzarr = null
});
	$(".duoexetb input.mode").hide();
	$(".duoexetb input.mode:eq(0)").show();
	$(".duoexetb input.mode:eq(1)").show();
	$(".duoexetb input.mode").click(function() {
		var mode = Number($(this).attr('mode'));
		var bname = $(".main a.click").html();
		$(".duoexetb .mode").removeClass('click');
		$(this).addClass('click');
		$(".duotb2 .duom").removeClass('byellow');
		$(".duotb2 .duom").removeClass('bblue');
		$(".duotb .duom").removeClass('byellow');
		$(".duotb .duom").removeClass('bblue');
		if (bname.indexOf('肖') != -1) {
			$(".duotr").hide();
			$(".sxtr1").show()
		} else if (bname.indexOf('尾') != -1) {
			$(".duotr").hide();
			$(".wstr1").show()
		} else {
			if (mode == 1) {
				$(".duotr").hide()
			} else if (mode == 2) {
				$(".duotr").hide();
				$(".mtr").show()
			} else if (mode == 3) {
				$(".duotr").hide();
				$(".sxtr1").show();
				$(".sxtr2").show()
			} else if (mode == 4) {
				$(".duotr").hide();
				$(".wstr1").show();
				$(".wstr2").show()
			} else if (mode == 5) {
				$(".duotr").hide();
				$(".sxtr1").show();
				$(".wstr1").show()
			}
		}
	});
	$(".fastgtb .fastv").click(function() {
		var val = $(this).val();
		var bname = $(".main a.click").html();
		if (val == '其他') {
			$(".fvh").toggleClass('hide');
			return
		}
		if (bname == '特碼' | bname == '正碼' | bname == '正特') {
			if (val == '反选') {
				$(".make input.int").each(function(i) {
					if (i < 49) {
						if ($(this).hasClass("byellow")) {
							$(this).removeClass('byellow')
						} else {
							$(this).addClass('byellow')
						}
					}
				})
			} else {
				tmp = sma[val];
				var flag = Number($(".tmode:checked").val());
				if (flag == 1) {
					if ($(".make input.byellow").length == 0) {
						$(".make input.int").each(function() {
							var pname = Number($(this).parent().prev().attr('mname'));
							if (in_array(pname, tmp)) {
								$(this).addClass('byellow')
							}
						})
					} else {
						$(".make input.byellow").each(function() {
							var pname = Number($(this).parent().prev().attr('mname'));
							if (!in_array(pname, tmp)) {
								$(this).removeClass('byellow')
							}
						})
					}
				} else if (flag == 2) {
					$(".make input.int").each(function(i) {
						if(i<=48){
						var pname = Number($(this).parent().prev().attr('mname'));
						if (in_array(pname, tmp)) {
							$(this).addClass('byellow')
						}
						}
					})
				} else {
					$(".cancel").click();
					$(".make input.int").each(function(i) {
						if(i<=48){
						var pname = Number($(this).parent().prev().attr('mname'));
						if (in_array(pname, tmp)) {
							$(this).addClass('byellow')
						}
						}
					})
				}
			}
		} else if (bname == '連碼' | bname == '不中') {
			var mode = Number($(".duoexetb .click").attr('mode'));
			if (mode == 1) {
				var tb = "duotb"
			} else if (mode == 2) {
				var tb = "mtr"
			} else {
				return false
			}
			if (val == '反选') {
				$("." + tb + " .duom").each(function(i) {
					if (i < 49) {
						if ($(this).hasClass("byellow")) {
							$(this).removeClass('byellow')
						} else {
							$(this).addClass('byellow')
						}
					}
				})
			} else {
				tmp = sma[val];
				var flag = Number($(".tmode:checked").val());
				if (flag == 1) {
					if ($("." + tb + " .byellow").length == 0) {
						$("." + tb + " .duom").each(function() {
							var pname = Number($(this).html());
							if (in_array(pname, tmp)) {
								$(this).addClass('byellow')
							}
						})
					} else {
						$("." + tb + " .byellow").each(function() {
							var pname = Number($(this).html());
							if (!in_array(pname, tmp)) {
								$(this).removeClass('byellow')
							}
						})
					}
				} else if (flag == 2) {
					$("." + tb + " .duom").each(function() {
						var pname = Number($(this).html());
						if (in_array(pname, tmp)) {
							$(this).addClass('byellow')
						}
					})
				} else {
					$(".cancel").click();
					$("." + tb + " td.duom").each(function() {
						var pname = Number($(this).html());
						if (in_array(pname, tmp)) {
							$(this).addClass('byellow')
						}
					})
				}
			}
		}
		$(".zje:eq(0)").focus();
	});
	$(".tmode").click(function() {
		if ($(this).prop("checked") == true) {
			$(".tmode").prop("checked", false);
			$(this).prop("checked", true)
		}
	});
	$(".duoje").blur(function() {
		var zs = Number($(".duoexetb .zs").html());
		var je = $(this).val();
		var maxje = Number($(".make input.xz:checked").attr('maxje'));
		var minje = Number($(".make input.xz:checked").attr('inje'));
		if (isNaN(je)) je = 0;
		if (je > maxje) {
			alert("单注最大限额:" + maxje);
			je = maxje
		}
		if (je < minje) {
			alert("单注最小限额:" + minje);
			je = minje
		}
		$(".duoexetb .sumje").val(je * zs)
	})
})