var melayer = Number($("#topid").attr('layer'));
var topid = Number($("#topid").val());
var fly=0;
var ttype=0;
function myready() {
	changeh(document.documentElement.scrollHeight + 500);
	$(".main .title").html(layername[layer - 1] + "报表查询");
	$(".bbzl").html(layername[layer - 1] + "报表种类");
	$(".gametype a").click(function() {
		var v = $(this).attr('v');
		var type = $(this).attr('type');
		if (type == '2') {
			if (v == '1') $("input[name='lottery']").attr("checked", true);
			else $("input[name='lottery']").attr("checked", false)
		} else if (type == '1') {
			if (v == '1') $("li.fast input[name='lottery']").attr("checked", true);
			else $("li.fast input[name='lottery']").attr("checked", false)
		} else if (type == '0') {
			if (v == '1') $("li.slow input[name='lottery']").attr("checked", true);
			else $("li.slow input[name='lottery']").attr("checked", false)
		}
		setqishu()
	});
	$("input[name='lottery']").click(function() {
		setqishu()
	});
	$('#begin').datepicker();
	$('#end').datepicker();
	$("input.s").click(function() {
		setdate(Number($(this).attr('d')))
	});
	$(".query").click(function() {
		$(".nowuser").attr('uid', $("#topid").val());
		$(".nowuser").attr('layer', $("#topid").attr('layer'));
		$(".nowuser").attr('username', $("#topid").attr('username'));
		var types = $("input[name='types']:checked").val();
		if (types == 'true') {
			var je = $("#amount").val();
			var yk = $("#dividend").val();
			if ((je != '' & !isNaN(Number(je))) || (yk != '' & !isNaN(Number(yk)))) {
				agentsearch()
			} else {
				agentnew()
			}
		} else {
			agentfl()
		}
	});
	$("input.cancel").click(function() {
		$("#amount").val('');
		$("#dividend").val('');
		$("#filter").val('')
	});
	$(".ui-dialog").draggable();
	$(".ui-dialog-titlebar-close").click(function() {
		$(".ui-dialog").hide()
	})
}
function setqishu() {
	var gl = $("input[name='lottery']:checked").length;
	if (gl != 1) {
		$(".qishu").html("<option value=''>--------请选择期数--------</option>");
		return false
	}
	var gid = $("input[name='lottery']:checked").val();
	var gname = $("input[name='lottery']:checked").attr('gname');
	var start = $("#begin").val();
	var end = $("#end").val();
	$.ajax({
		type: 'POST',
		url: mulu + 'baox',
		dataType: 'json',
		data: 'xtype=getqishu&gid=' + gid + "&start=" + start + "&end=" + end,
		cache: false,
		async: false,
		success: function(m) {
			var ml = m.length;
			$(".qishu").html("<option value=''>--------请选择期数--------</option>");
			for (i = 0; i < ml; i++) {
				$(".qishu").append("<option value='" + m[i]['qishu'] + "'>" + gname + ' - ' + m[i]['qishu'] + "</option>")
			}
		}
	})
}
function addfunc() {
	$(".gdiv td").unbind("mouseover");
	$(".gdiv td").unbind("mouseout");
	$(".gdiv td").mouseover(function() {
		$(this).parent().addClass("hover")
	}).mouseout(function() {
		$(this).parent().removeClass("hover")
	});
    $(".gids td").mouseover(function() {
        $(this).parent().addClass("hover")
    }).mouseout(function() {
        $(this).parent().removeClass("hover")
    });
}
var page = 1;

function userbao(v, type, v1, v2, v3) {
	$(".main5 a.back").attr('v', v);
	var start = $("#begin").val();
	var end = $("#end").val();
	var uid = $(".nowuser").attr('uid');
	var nowlayer = Number($(".nowuser").attr('layer'));
	var nowusername = $(".nowuser").attr('username');
	var game = '';
	$("input[name='lottery']:checked").each(function() {
		game += "|" + $(this).val()
	});
	if (strlen(game) < 4) {
		alert('请至少选择一个彩种！');
		return false
	}
	if (Number(start.replace('-', '')) > Number(end.replace('-', ''))) {
		alert('开始日期不能大于结束日期！');
		return false
	}
	if (strlen(game) < 4) {
		alert('请至少选择一个彩种！');
		return false
	}
	var types = $("input[name='types']:checked").val();
	var qishu = $("select.qishu").val();
	var jsstatus = $("input[name='settle']:checked").val();
	var username = $("#filter").val();
	var je = $("#amount").val();
	var yk = $("#dividend").val();
	var str = "&start=" + start + "&end=" + end + "&uid=" + uid + "&game=" + game + "&types=" + types + "&qishu=" + qishu + "&jsstatus=" + jsstatus + "&username=" + username + "&je=" + je + "&yk=" + yk + "&type=" + type + "&v1=" + v1 + "&v2=" + v2 + "&v3=" + v3 + "&page=" + page+"&fly="+fly+"&ttype="+ttype;
	$.ajax({
		type: 'POST',
		url: mulu + 'baox',
		dataType: 'json',
		data: "xtype=userbao" + str,
		cache: false,
		async: false,
		success: function(m) {
			$(".gdiv").hide();
			$(".gids").hide();
			$(".main").hide();
			$(".main5").show();
			var ml = m['bao'].length;
			var pcount = Number(m['pcount']);
			var rcount = Number(m['rcount']);
			page = Number(m['page']);
			$(".main5 tbody").remove();
			var tmp;
			var str = '';
			var mylayer = Number($("#topid").attr("layer"));
			var mxstr;
			var up;
			var con='';
			for (i = 0; i < ml; i++) {
				tmp = m['bao'][i];
				str = "<tbody>";
				str += "<tr>";
				str += "<td><a href='javascript:void(0)'>" + tmp['tid'] + "#</a></td>";
				str += "<td>" + tmp['time'] + "<BR>星期" + tmp['week'] + "</td>";
				str += "<td class='period'>" + tmp['game'] + "<div class='drawNumber1'>" + tmp['qishu'] + "期</div></td>";
				//str += "<td>"+tmp['xtype']+"</td>";
				str += "<td>" + tmp['user'] + "<div>" + tmp['abcd'] + "盘</div></td>";
				if (Number(tmp['peilv2']) > 0) tmp['peilv1'] += '/' + tmp['peilv2'];
					con='';
					if(tmp['con']!='') con = ':'+tmp['con'];
					str += "<td><span class='drawNumber1'>" + tmp['wf'] + con+"</span> @ <span class='odds'>" + tmp['peilv1'] + "</span></td>";
				str += "<td class='moneys'>" + tmp['je'] + "</td>";
				str += "<td class='commission'>" + tmp['points'] + "%</td>";
				str += "<td class='money dividend color'>" + tmp['rs'] + "</td>";
				str += "<td class='share'>" + tmp['mezc'] + "%</td>";
				str += "<td class='money color'>" + tmp['mers'] + "</td>";
				mxstr = '';
				for (j = 8; j >= mylayer; j--) {
					up = tmp['up'][j];
					if (up['uid'] != 0) {
						if (Number(up['peilv2']) > 0) up['peilv1'] += '/' + up['peilv2'];
						mxstr += "<tr><td>" + up['layer'] + "</td><td>" + up['user'] + "</td><td>" + up['zc'] + "%</td><td>" + up['points'] + "%</td><td>" + up['peilv1'] + "</td></tr>"
					}
				}
				str += "<td class='detail' ><a href='javascript:void(0)' class='mx' str='" + mxstr + "'>明细</a></td>";
				str += "</tr></tbody>";
				$(".main5 tfoot").before(str)
			}
			
            changeh(document.documentElement.scrollHeight + 500);
			$(".page .record").html("共 " + rcount + " 笔注单");
			$(".page .page_count").html("共 " + pcount + " 页");
			$(".main5 a.back").unbind("click");
			$(".main5 a.back").click(function() {
				if ($(this).attr('v') != undefined) {
					$(".gdiv").hide();
					$("." + $(this).attr('v')).show()
				}
			});
			var pagestr = "<a class='previous'  href='javascript:void(0);'>前一页</a>『";
			var j=0;
			if(page>2){
				j=-2;
			}
			for ( ; j < 5; j++) {
				if(page+j>pcount) break;
				if (j == 0) {
					pagestr += " <span class='current'>" + (page+j) + "</span> "
				} else {
					pagestr += " <a href='javascript:void(0);'>" + (page+j) + "</a> "
				}
			}
			pagestr += "』<a class='next' href='javascript:void(0);'>后一页</a>";
			$(".page .page_control").html(pagestr);
			pagestr = null;
			$(".page .page_control a").click(function() {
				if ($(this).hasClass('previous')) {
					page--
				} else if ($(this).hasClass('next')) {
					page++
				} else {
					page = Number($(this).html())
				}
				if (page < 1) page = 1;
				if (page > pcount) page = pcount;
				userbao(v, type, v1, v2, v3)
			});
			$(".main5 a.mx").click(function() {
				$("div.mx .ui-dialog-title").html($(this).parent().parent().find("td:eq(0)").html()+" 占成明细");
				$("div.mx tbody").html($(this).attr('str'));
				$("div.mx").show();
				var posi = $(this).position();
				$("div.mx").css("top", posi.top + 30);
				$("div.mx").css("left", posi.left + $(this).width() - $("div.mx").width());
				$("div.mx").css("height",$("div.mx tr").length*26+50);
			});
			$(".main5 tfoot th:eq(0)").html("本页" + $(".main5 tbody").length + "笔");
			$(".main5 tfoot td.money:eq(0)").html(m['total']['je']);
			$(".main5 tfoot td.money:eq(1)").html(m['total']['jg']);
			$(".main5 tfoot td.money:eq(2)").html(m['total']['bj']);
			$(".main5 td.money").each(function() {
				if (Number($(this).html()) < 0) {
					$(this).css("color", 'red')
				} else {
					$(this).css("color", 'blue')
				}
			});
			str = null;
			m = null;
			mxstr = null;
			addfunc()
		}
	})
}

function agentsearch() {
	var start = $("#begin").val();
	var end = $("#end").val();
	var uid = $(".nowuser").attr('uid');
	var nowlayer = Number($(".nowuser").attr('layer'));
	var nowusername = $(".nowuser").attr('username');
	var game = '';
	$("input[name='lottery']:checked").each(function() {
		game += "|" + $(this).val()
	});
	if (strlen(game) < 4) {
		alert('请至少选择一个彩种！');
		return false
	}
	if (Number(start.replace('-', '')) > Number(end.replace('-', ''))) {
		alert('开始日期不能大于结束日期！');
		return false
	}
	if (strlen(game) < 4) {
		alert('请至少选择一个彩种！');
		return false
	}
	var types = $("input[name='types']:checked").val();
	var qishu = $("select.qishu").val();
	var jsstatus = $("input[name='settle']:checked").val();
	var username = $("#filter").val();
	var je = $("#amount").val();
	var yk = $("#dividend").val();
	var str = "&start=" + start + "&end=" + end + "&uid=" + uid + "&game=" + game + "&types=" + types + "&qishu=" + qishu + "&jsstatus=" + jsstatus + "&username=" + username + "&je=" + je + "&yk=" + yk;
	$.ajax({
		type: 'POST',
		url: mulu + 'baox',
		dataType: 'json',
		data: "xtype=agentsearch" + str,
		cache: false,
		async: false,
		success: function(m) {
			$(".gdiv").hide();
			$(".main").hide();
			$(".main3").show();
			if (qishu == '') {
				if (end != start) {
					$(".main3 .title").html(layername[nowlayer - 1] + "（" + nowusername + "） - 交收报表 [" + start + " — " + end + "] ")
				} else {
					$(".main3 .title").html(layername[nowlayer - 1] + "（" + nowusername + "） - 交收报表 [" + start + "] ")
				}
			} else {
				$(".main3 .title").html(layername[nowlayer - 1] + "（" + nowusername + "） - 交收报表 [" + $("input[name='lottery']:checked").attr('gname') + " — " + qishu + "期] ")
			}
			m = m['bao'];
			var ml = m.length;
			var str = '';
			for (i = 0; i < ml; i++) {
				if (Number(m[i]['zs']) == 0) continue;
				str += "<tr>";
				if (qishu == '') {
					if (end != start) {
						str += "<td>" + start + " — " + end + "</td>"
					} else {
						str += "<td>" + start + "</td>"
					}
				} else {
					str += "<td>" + $("input[name='lottery']:checked").attr('gname') + " — " + qishu + "期</td>"
				}
				str += "<td>" + m[i]['layername'] + "</td>";
				str += "<td><a  href='javascript:void(0);' class='u'  ifagent='" + m[i]['ifagent'] + "' uid='" + m[i]['userid'] + "' layer='" + m[i]['layer'] + "'  ttype='" + m[i]['ttype'] + "'  >" + m[i]['user'].toLowerCase() + "</a></td>";
				str += "<td>" + m[i]['name'] + "</td>";
				str += "<td>" + m[i]['zs'] + "</td>";
				str += "<td>" + m[i]['je'] + "</td>";
				str += "<td>" + m[i]['je'] + "</td>";
				if(jsstatus=='true'){
				str += "<td>" + getResult(Number(m[i]['zhong']) - Number(m[i]['je']), 1) + "</td>";
				str += "<td>" + m[i]['shui'] + "</td>";
				str += "<td  class='result color'>" + (0-m[i]['yk']) + "</td>";
				}else{
				   str += "<td>" + 0 + "</td>";
				    str += "<td>" + 0 + "</td>";
					 str += "<td>" + 0 + "</td>";
				}
				str += "</tr>"
			}
			$(".main3 tbody").html(str);
			m = null;
			str = null;
			$(".main3 tfoot th:eq(0)").html("总计" + $(".main3 tbody tr").length + "行");
			$(".main3 tfoot td").each(function(i) {
				var j = $(this).index() + 3;
				var je = 0;
				$(".main3 tbody tr").each(function() {
					je += Number($(this).find("td:eq(" + j + ")").html())
				});
				$(this).html(getResult(je, 1))
			});
			$(".main3 td.result").each(function() {
				if (Number($(this).html()) < 0) {
					$(this).css("color", 'red')
				} else {
					$(this).css("color", 'blue')
				}
			});
			$(".main3 a.showgame").unbind("click");
			$(".main3 a.showgame").click(function() {
				if ($(".gids").length > 0) {
					$(".gids").remove();
					$(".main3 a.showgame").html("+ 显示各彩种明细")
				} else {
					agentsearchgame()
				}
			});
			$(".main3 a.back").unbind("click");
			$(".main3 a.back").click(function() {
				if ($(this).attr('uid') == '0') {
					$(".gdiv").hide();
					$(".main").show()
				}
			});
			$(".main3 a.u").click(function() {
				fly=0;
				userbao("main3", 'user', $(this).attr('uid'))
			});
			addfunc()
		}
	})
}
function agentsearchgame() {
	var start = $("#begin").val();
	var end = $("#end").val();
	var uid = $(".nowuser").attr('uid');
	var nowlayer = Number($(".nowuser").attr('layer'));
	var nowusername = $(".nowuser").attr('username');
	var game = '';
	$("input[name='lottery']:checked").each(function() {
		game += "|" + $(this).val()
	});
	if (strlen(game) < 4) {
		alert('请至少选择一个彩种！');
		return false
	}
	if (Number(start.replace('-', '')) > Number(end.replace('-', ''))) {
		alert('开始日期不能大于结束日期！');
		return false
	}
	if (strlen(game) < 4) {
		alert('请至少选择一个彩种！');
		return false
	}
	var types = $("input[name='types']:checked").val();
	var qishu = $("select.qishu").val();
	var jsstatus = $("input[name='settle']:checked").val();
	var username = $("#filter").val();
	var je = $("#amount").val();
	var yk = $("#dividend").val();
	var str = "&start=" + start + "&end=" + end + "&uid=" + uid + "&game=" + game + "&types=" + types + "&qishu=" + qishu + "&jsstatus=" + jsstatus + "&username=" + username + "&je=" + je + "&yk=" + yk;
	var uidstr = '';
	$(".main3 a.u").each(function() {
		uidstr += "|" + $(this).attr('uid')
	});
	$.ajax({
		type: 'POST',
		url: mulu + 'baox',
		dataType: 'json',
		data: "xtype=agentsearchgame" + str + "&uidstr=" + uidstr,
		cache: false,
		async: false,
		success: function(m) {
			$(".main3 a.showgame").html("- 隐藏彩种明细");
			var ml = m['game'].length;
			$(".gids").remove();
			for (j = 0; j < ml; j++) {
				var bao = m['game'][j]['bao'];
				var bl = bao.length;
				if (bl == 0) continue;
				$(".main3").after($(".searchgame").clone());
				$(".searchgame:eq(0)").addClass("gids");
				$(".searchgame:eq(0)").addClass("g" + m['game'][j]['gid']);
				var obj = $(".g" + m['game'][j]['gid']);
				obj.show();
				obj.find("caption").html(m['game'][j]['gname']);
				if (qishu == '') {
					if (start != end) {
						obj.find(".title").html(layername[nowlayer - 1] + "（" + nowusername + "） - 交收报表 [" + start + " — " + end + "] ")
					} else {
						obj.find(".title").html(layername[nowlayer - 1] + "（" + nowusername + "） - 交收报表 [" + start + "] ")
					}
				} else {
					obj.find(".title").html(layername[nowlayer - 1] + "（" + nowusername + "） - 交收报表 [" + $("input[name='lottery']:checked").attr('gname') + " — " + qishu + "期] ")
				}
				obj.find(".syname").html(layername[nowlayer - 1] + "输赢");
				var str = '';
				for (i = 0; i < bl; i++) {
					if (Number(bao[i]['zs']) == 0) continue;
					str += "<tr>";
					if (qishu == '') {
						if (end != start) {
							str += "<td>" + start + " — " + end + "</td>"
						} else {
							str += "<td>" + start + "</td>"
						}
					} else {
						str += "<td>" + $("input[name='lottery']:checked").attr('gname') + " — " + qishu + "期</td>"
					}
					str += "<td>" + bao[i]['layername'] + "</td>";
					str += "<td><a  href='javascript:void(0);' class='u'  ifagent='" + bao[i]['ifagent'] + "' uid='" + bao[i]['userid'] + "' layer='" + bao[i]['layer'] + "'  ttype='" + bao[i]['ttype'] + "' gid='" + m['game'][j]['gid'] + "' >" + bao[i]['user'].toLowerCase() + "</a></td>";
					str += "<td>" + bao[i]['name'] + "</td>";
					str += "<td>" + bao[i]['zs'] + "</td>";
					str += "<td>" + bao[i]['je'] + "</td>";
					str += "<td>" + bao[i]['je'] + "</td>";
					if(jsstatus=='true'){
					str += "<td>" + getResult(Number(bao[i]['zhong']) - Number(bao[i]['je']), 1) + "</td>";
					str += "<td>" + bao[i]['shui'] + "</td>";
					str += "<td  class='result color'>" + (0-bao[i]['yk']) + "</td>";
					}else{
				   str += "<td>" + 0 + "</td>";
				    str += "<td>" + 0 + "</td>";
					 str += "<td>" + 0 + "</td>";
				}
					str += "</tr>"
				}
				obj.find("tbody").html(str);
				obj.find("tfoot th:eq(0)").html("总计" + $(".main3 tbody tr").length + "行")
			}
			m = null;
			str = null;
			$(".gids tfoot td").each(function(i) {
				var j = $(this).index() + 3;
				var je = 0;
				$(this).parent().parent().parent().find("tbody tr").each(function() {
					je += Number($(this).find("td:eq(" + j + ")").html())
				});
				$(this).html(getResult(je, 1))
			});
			$(".gids td.result").each(function() {
				if (Number($(this).html()) < 0) {
					$(this).css("color", 'red')
				} else {
					$(this).css("color", 'blue')
				}
			});
			$(".gids a.u").click(function() {
				fly=0;
				page=1;
				userbao("main3", 'user', $(this).attr('uid'), $(this).attr('gid'))
			});
			addfunc()
		}
	})
}
function agentfl() {
	var start = $("#begin").val();
	var end = $("#end").val();
	var uid = $(".nowuser").attr('uid');
	var nowlayer = Number($(".nowuser").attr('layer'));
	var nowusername = $(".nowuser").attr('username');
	var game = '';
	$("input[name='lottery']:checked").each(function() {
		game += "|" + $(this).val()
	});
	if (strlen(game) < 4) {
		alert('请至少选择一个彩种！');
		return false
	}
	if (Number(start.replace('-', '')) > Number(end.replace('-', ''))) {
		alert('开始日期不能大于结束日期！');
		return false
	}
	if (strlen(game) < 4) {
		alert('请至少选择一个彩种！');
		return false
	}
	var types = $("input[name='types']:checked").val();
	var qishu = $("select.qishu").val();
	var jsstatus = $("input[name='settle']:checked").val();
	var username = $("#filter").val();
	var je = $("#amount").val();
	var yk = $("#dividend").val();
	var str = "&start=" + start + "&end=" + end + "&uid=" + uid + "&game=" + game + "&types=" + types + "&qishu=" + qishu + "&jsstatus=" + jsstatus + "&username=" + username + "&je=" + je + "&yk=" + yk;
	$.ajax({
		type: 'POST',
		url: mulu + 'baox',
		dataType: 'json',
		data: "xtype=agentfl" + str,
		cache: false,
		async: false,
		success: function(m) {
			//alert(m);return;
			$(".gdiv").hide();
			$(".main").hide();
			$(".main1").show();
			if (qishu == '') {
				if (start != end) {
					$(".main1 .title").html(layername[nowlayer - 1] + "（" + nowusername + "） - 分类报表 [" + start + " — " + end + "] ")
				} else {
					$(".main1 .title").html(layername[nowlayer - 1] + "（" + nowusername + "） - 分类报表 [" + start + "] ")
				}
			} else {
				$(".main1 .title").html(layername[nowlayer - 1] + "（" + nowusername + "） - 分类报表 [" + $("input[name='lottery']:checked").attr('gname') + " — " + qishu + "期] ")
			}
			$(".main1 .syname").html(layername[nowlayer - 1] + "输赢");
			var plc = Number(m['plc']);
			m = m['bao'];
			var ml = m.length;
			var str = '';
			$(".plc").hide();
			$(".main1 .syname").attr("colspan", 7);
			if (plc == 1) {
				$(".plc").show();
				$(".main1 .syname").attr("colspan", 8)
			}
			for (i = 0; i < ml; i++) {
				if (Number(m[i]['zs']) == 0) continue;
				str += "<tr  fly='" + m[i]['fly'] + "'>";
				str += "<td>" + m[i]['gname'] + "</td>";
				str += "<td><a  href='javascript:void(0);' class='u'  ifagent='" + m[i]['ifagent'] + "' uid='" + m[i]['userid'] + "' layer='" + m[i]['layer'] + "'  ttype='" + m[i]['ttype'] + "' gid='" + m[i]['gid'] + "' bid='" + m[i]['bid'] + "'>" + m[i]['bname'] + "</a></td>";
				str += "<td>" + m[i]['zs'] + "</td>";
				str += "<td>" + m[i]['uje'] + "</td>";
				str += "<td>" + m[i]['upje'] + "</td>";
				if(jsstatus=='true'){
				   str += "<td>" + getResult(Number(m[i]['uzhong']) - Number(m[i]['uje']), 1) + "</td>";
				}else{
				   str += "<td>0</td>";
				}
				
				str += "<td>" + m[i]['ushui'] + "</td>";
				str += "<td>" + m[i]['uyk'] + "</td>";
				str += "<td class='result color'>" + m[i]['yk'] + "</td>";
				str += "<td>" + m[i]['mezcp'] + "</td>";
				str += "<td>" + m[i]['mezc'] + "</td>";
				str += "<td>" + getResult(Number(m[i]['mezc']) - Number(m[i]['mezhong']), 1) + "</td>";
				str += "<td>" + m[i]['meshui'] + "</td>";
                var tanshui = 0;
				if (m[i]['fly'] == '1' | m[i]['fly'] == '2') {
					str += "<td>0</td>";
					if (plc == 1){
						 str += "<td>0</td>";
					}else{
					      str += "<td style='display:none;'>0</td>";
					}
				} else {
					//str += "<td>" + getResult(Number(m[i]['meshui']) + Number(m[i]['sendshui']) - Number(m[i]['shui']), 1) + "</td>";
                    tanshui = getResult(Number(m[i]['meshui']) + Number(m[i]['sendshui']) - Number(m[i]['shui']), 1);
					str += "<td>" + tanshui + "</td>"
					if (plc == 1){
						if(jsstatus=='true'){
						   str += "<td>" + getResult(Number(m[i]['mezhong']) + Number(m[i]['sendzhong']) - Number(m[i]['zhong']), 1) + "</td>";
						}else{
						   str += "<td>0</td>";
						}
					}else{
					    str += "<td style='display:none;'>0</td>";
					}
				}
                str += "<td class='result color'>" + getResult(tanshui+m[i]['meyk'],1) + "</td>";
				str += "<td>" + m[i]['sendje'] + "</td>";
				str += "<td  class='result color'>" + m[i]['sendyk'] + "</td>";
				str += "</tr>"
			}
			$(".main1 tbody").html(str);
			m = null;
			str = null;
            changeh(document.documentElement.scrollHeight + 500);
			$(".main1 tfoot th:eq(0)").html("总计" + $(".main1 tbody tr").length + "行");
			$(".main1 tfoot td").each(function(i) {
			   if(!$(this).hasClass('nosum')){	
				var j = $(this).index() + 1;
				var je = 0;
				$(".main1 tbody tr").each(function() {
					je += Number($(this).find("td:eq(" + j + ")").html())
				});
				$(this).html(getResult(je, 1));
			   }
			});
			$(".main1 td.result").each(function() {
				if (Number($(this).html()) < 0) {
					$(this).css("color", 'red')
				} else {
					$(this).css("color", 'blue')
				}
			});
			$(".main1 a.back").unbind("click");
			$(".main1 a.back").click(function() {
				$(".gdiv").hide();
				$(".main").show()
			});
			$(".main1 a.u").click(function() {
				fly=0;
				page=1;
				userbao("main1", 'fl', $(this).attr('uid'), $(this).attr('gid'), $(this).attr('bid'))
			});
			addfunc()
		}
	})
}

function agentnew() {
	var start = $("#begin").val();
	var end = $("#end").val();
	var uid = $(".nowuser").attr('uid');
	var nowlayer = Number($(".nowuser").attr('layer'));
	var nowusername = $(".nowuser").attr('username');
	var game = '';
	$("input[name='lottery']:checked").each(function() {
		game += "|" + $(this).val()
	});
	if (strlen(game) < 4) {
		alert('请至少选择一个彩种！');
		return false
	}
	if (Number(start.replace('-', '')) > Number(end.replace('-', ''))) {
		alert('开始日期不能大于结束日期！');
		return false
	}
	if (strlen(game) < 4) {
		alert('请至少选择一个彩种！');
		return false
	}
	var types = $("input[name='types']:checked").val();
	var qishu = $("select.qishu").val();
	var jsstatus = $("input[name='settle']:checked").val();
	var username = $("#filter").val();
	var je = $("#amount").val();
	var yk = $("#dividend").val();
	var str = "&start=" + start + "&end=" + end + "&uid=" + uid + "&game=" + game + "&types=" + types + "&qishu=" + qishu + "&jsstatus=" + jsstatus + "&username=" + username + "&je=" + je + "&yk=" + yk;
	$(".ui-fronts").show();
	$(".ui-fronts").html("数据提交中，请稍等...");
	$.ajax({
		type: 'POST',
		url: mulu + 'baox',
		dataType: 'json',
		data: "xtype=agentnew" + str,
		cache: false,
		async: false,
		success: function(m) {
            if(m['bao'].length==0){
		    	//$(".ui-fronts").hide();
		    	//alert("您选择的日期没有数据!");
		    	//return false;
		    }
			$(".ui-fronts").html("数据返回加载中...");
			$(".gdiv").hide();
			$(".gids").hide();
			$(".main").hide();
			$(".main2").show();
			$("#filter").val('');
			if (uid == $("#topid").val()) {
				$(".main2 a.back").attr('uid', '0')
			}
			if (Number(m['status']) == 0) {
				alert("未找到指定用户");
				return false
			}
			if (qishu == '') {
				if (start != end) {
					$(".main2 .title").html(layername[nowlayer - 1] + "（" + nowusername + "） - 交收报表 [" + start + " — " + end + "] ")
				} else {
					$(".main2 .title").html(layername[nowlayer - 1] + "（" + nowusername + "） - 交收报表 [" + start + "] ")
				}
			} else {
				$(".main2 .title").html(layername[nowlayer - 1] + "（" + nowusername + "） - 交收报表 [" + $("input[name='lottery']:checked").attr('gname') + " — " + qishu + "期] ")
			}
			$(".main2 .syname").html(layername[nowlayer - 1] + "输赢");
			if (username != '') {
				$(".main2").attr("searchname", username)
			} else {
				$(".main2").attr("searchname", '--')
			}
			var plc = Number(m['plc']);
			m = m['bao'];
			var ml = m.length;
			var str = '';
			$(".plc").hide();
			$(".main2 .syname").attr("colspan", 7);
			if (plc == 1) {
				$(".plc").show();
				$(".main2 .syname").attr("colspan", 8);
			}
			for (i = 0; i < ml; i++) {
				if (Number(m[i]['zs']) == 0) continue;
				str += "<tr  fly='" + m[i]['fly'] + "'>";
				str += "<td>" + m[i]['layername'] + "</td>";
				str += "<td><a  href='javascript:void(0);' class='u'  ifagent='" + m[i]['ifagent'] + "' uid='" + m[i]['userid'] + "' layer='" + m[i]['layer'] + "'  ttype='" + m[i]['ttype'] + "'  >" + m[i]['user'].toLowerCase() + "</a></td>";
				str += "<td>" + m[i]['name'] + "</td>";
				str += "<td>" + m[i]['money'] + "</td>";
				str += "<td>" + m[i]['zs'] + "</td>";
				str += "<td><a  href='javascript:void(0);' class='u'  ifagent='" + m[i]['ifagent'] + "' uid='" + m[i]['userid'] + "' layer='" + m[i]['layer'] + "'  ttype='" + m[i]['ttype'] + "'  >" + m[i]['uje'] + "</a></td>";
				str += "<td>" + m[i]['upje'] + "</td>";
				if(jsstatus=='true'){
				   str += "<td>" + getResult(Number(m[i]['uzhong']) - Number(m[i]['uje']), 1) + "</td>";
				}else{
				   str += "<td>" +0 + "</td>";
				}
				str += "<td>" + m[i]['ushui'] + "</td>";
				str += "<td class='ff'>" + m[i]['uyk'] + "</td>";
				str += "<td class='result color ff'>" + (0-m[i]['yk']) + "</td>";
				str += "<td>" + m[i]['mezcp'] + "</td>";
				str += "<td>" + m[i]['mezc'] + "</td>";
				if(jsstatus=='true'){
                    str += "<td>" + getResult((Number(m[i]['mezc']) - Number(m[i]['mezhong'])), 1) + "</td>";
				}else{
				    str += "<td>" +0 + "</td>";
				}
				str += "<td>" + (0-m[i]['meshui']) + "</td>";
				var tanshui=0;
				if (m[i]['fly'] == '1' | m[i]['fly'] == '2') {
					str += "<td>0</td>";
					str += "<td  class='plc' ";
					if (plc != 1) str += " style='display:none;' ";
					str += " >0</td>"
				} else {
					//str += "<td>" + getResult(Number(m[i]['meshui']) + Number(m[i]['sendshui']) - Number(m[i]['shui']), 2) + "</td>";
					tanshui = getResult(Number(m[i]['meshui']) + Number(m[i]['sendshui']) - Number(m[i]['shui']), 2);
					str += "<td>" + m[i]['zhuanshui'] + "</td>";
					str += "<td class='plc' ";
					if (plc != 1) str += " style='display:none;' ";
					str += " >" + getResult(Number(m[i]['mezhong']) + Number(m[i]['sendzhong']) - Number(m[i]['zhong']), 2) + "</td>";
				}
				// str += "<td class='result color ff'>" + getResult(m[i]['meyk']+tanshui,2) + "</td>";
				str += "<td class='result color ff'>" + m[i]['sendyk_i'] + "</td>";
				str += "<td>" + m[i]['sendje'] + "</td>";
				str += "<td  class='result color ff'>" + m[i]['sendyk'] + "</td>";
				str += "</tr>"
			}
			$(".main2 tbody").html(str);
			$(".ui-fronts").html('');
			$(".ui-fronts").hide();
			m = null;
			str = null;
			$(".main2 tfoot th:eq(0)").html("总计" + $(".main2 tbody tr").length + "行");
			$(".main2 tfoot td").each(function(i) {
			  if(!$(this).hasClass('nosum')){	
				var j = $(this).index() + 3;
				var je = 0;
				$(".main2 tbody tr").each(function() {
					if($(this).find("td:eq(" + j + ")").find("a").length==1){
					    je += Number($(this).find("td:eq(" + j + ") a").html());	
					}else{
					    je += Number($(this).find("td:eq(" + j + ")").html());
					}
				});
				  
				  
				$(this).html(getResult(je, 1));
			  }
			});
			$(".main2 td.result").each(function() {
				if (Number($(this).html()) < 0) {
					$(this).css("color", 'red')
				} else {
					$(this).css("color", 'blue')
				}
			});
			$(".main2 a.u").click(function() {
				fly=0;
				ttype=0;
				page=1;
				if(Number($(this).parent().parent().attr('fly'))>0){
					fly = Number($(this).parent().parent().attr('fly'));
					ttype = $(this).attr('ttype');	
					userbao("main2", 'user', $(this).attr('uid'))			
				}else if ($(this).attr('ifagent') == '0') {
					userbao("main2", 'user', $(this).attr('uid'))
				}else {
					$(".main2 a.back").attr('uid', $(".nowuser").attr('uid'));
					$(".main2 a.back").attr('layer', $(".nowuser").attr('layer'));
					$(".main2 a.back").attr('username', $(".nowuser").attr('username'));
					$(".nowuser").attr('uid', $(this).attr('uid'));
					$(".nowuser").attr('layer', $(this).attr('layer'));
					$(".nowuser").attr('username', $(this).parent().parent().find("a.u:eq(0)").html());
					agentnew()
				}
			});
			$(".main2 a.back").unbind("click");
			$(".main2 a.back").click(function() {
				if ($(this).attr('uid') == '0') {
					$(".gdiv").hide();
					$(".main").show();
                    return false;
				}
				var uid = $(".nowuser").attr('uid');
				$.ajax({
					type: 'POST',
					url: mulu + 'baox',
					dataType: 'json',
					data: 'xtype=getfid&uid=' + uid,
					cache: false,
					success: function(m) {
						$(".nowuser").attr('uid', m[1]);
						$(".nowuser").attr('layer', m[2]);
						$(".nowuser").attr('username', m[3]);
						agentnew()
					}
				})
			});
					$(".gids").remove();
					$(".main2 a.showgame").html("+ 显示各彩种明细")
			$(".main2 a.showgame").unbind("click");
			$(".main2 a.showgame").click(function() {
				if ($(".gids").length > 0) {
					$(".gids").remove();
					$(".main2 a.showgame").html("+ 显示各彩种明细")
				} else {
					agentnewgame()
				}
			});
			addfunc()
		}
	})
}
function agentnewgame() {
	var start = $("#begin").val();
	var end = $("#end").val();
	var uid = $(".nowuser").attr('uid');
	var nowlayer = Number($(".nowuser").attr('layer'));
	var nowusername = $(".nowuser").attr('username');
	var game = '';
	$("input[name='lottery']:checked").each(function() {
		game += "|" + $(this).val()
	});
	if (strlen(game) < 4) {
		alert('请至少选择一个彩种！');
		return false
	}
	if (Number(start.replace('-', '')) > Number(end.replace('-', ''))) {
		alert('开始日期不能大于结束日期！');
		return false
	}
	if (strlen(game) < 4) {
		alert('请至少选择一个彩种！');
		return false
	}
	var types = $("input[name='types']:checked").val();
	var qishu = $("select.qishu").val();
	var jsstatus = $("input[name='settle']:checked").val();
	if ($(".main2").attr("searchname") != '--') {
		var username = $(".main2").attr("searchname")
	} else {
		var username = ''
	}
	var je = $("#amount").val();
	var yk = $("#dividend").val();
	var str = "&start=" + start + "&end=" + end + "&uid=" + uid + "&game=" + game + "&types=" + types + "&qishu=" + qishu + "&jsstatus=" + jsstatus + "&username=" + username + "&je=" + je + "&yk=" + yk;
	$.ajax({
		type: 'POST',
		url: mulu + 'baox',
		dataType: 'json',
		data: "xtype=agentnewgame" + str,
		cache: false,
		async: false,
		success: function(m) {
			$(".main2 a.showgame").html("- 隐藏彩种明细");
			var plc = Number(m['plc']);
			var ml = m['game'].length;
			$(".gids").remove();
			for (j = 0; j < ml; j++) {
				var bao = m['game'][j]['bao'];
				var bl = bao.length;
				if (bl == 0) continue;
				$(".main2").after("<div class='maingame'>"+$(".maingame").html()+"</div>");
				$(".maingame:eq(0)").addClass("gids");
				$(".maingame:eq(0)").addClass("g" + m['game'][j]['gid']);
				var obj = $(".g" + m['game'][j]['gid']);
				obj.show();
				obj.find("caption").html(m['game'][j]['gname']);
				if (qishu == '') {
					if (start != end) {
						obj.find(".title").html(layername[nowlayer - 1] + "（" + nowusername + "） - 交收报表 [" + start + " — " + end + "] ")
					} else {
						obj.find(".title").html(layername[nowlayer - 1] + "（" + nowusername + "） - 交收报表 [" + start + "] ")
					}
				} else {
					obj.find(".title").html(layername[nowlayer - 1] + "（" + nowusername + "） - 交收报表 [" + $("input[name='lottery']:checked").attr('gname') + " — " + qishu + "期] ")
				}
				obj.find(".syname").html(layername[nowlayer - 1] + "输赢");
				var str = '';
				$(".plc").hide();
				obj.find(".syname").attr("colspan", 7);
				if (plc == 1) {
					$(".plc").show();
					obj.find(".syname").attr("colspan", 8)
				}
				for (i = 0; i < bl; i++) {
					if (Number(bao[i]['zs']) == 0) continue;
					str += "<tr  fly='" + bao[i]['fly'] + "'>";
					str += "<td>" + bao[i]['layername'] + "</td>";
					str += "<td><a  href='javascript:void(0);' class='u'  ifagent='" + bao[i]['ifagent'] + "' uid='" + bao[i]['userid'] + "' layer='" + bao[i]['layer'] + "'  ttype='" + bao[i]['ttype'] + "' gid='" + m['game'][j]['gid'] + "' >" + bao[i]['user'].toLowerCase() + "</a></td>";
					str += "<td>" + bao[i]['name'] + "</td>";
					str += "<td>" + bao[i]['money'] + "</td>";
					str += "<td>" + bao[i]['zs'] + "</td>";
					str += "<td><a  href='javascript:void(0);' class='u'  ifagent='" + bao[i]['ifagent'] + "' uid='" + bao[i]['userid'] + "' layer='" + bao[i]['layer'] + "'  ttype='" + bao[i]['ttype'] + "' gid='" + m['game'][j]['gid'] + "' >" + bao[i]['uje'] + "</a></td>";
					str += "<td>" + bao[i]['upje'] + "</td>";
					if(jsstatus=='true'){
					    str += "<td>" + getResult(Number(bao[i]['uzhong']) - Number(bao[i]['uje']), 1) + "</td>";
					}else{
					    str += "<td>" + 0 + "</td>";
					}
					str += "<td>" + bao[i]['ushui'] + "</td>";
					str += "<td class='ff'>" + bao[i]['uyk'] + "</td>";
					str += "<td class='result color ff'>" + (0-bao[i]['yk']) + "</td>";
					str += "<td>" + bao[i]['mezcp'] + "</td>";
					str += "<td>" + bao[i]['mezc'] + "</td>";
					if(jsstatus=='true'){
					   str += "<td>" + getResult(Number(bao[i]['mezc']) - Number(bao[i]['mezhong']), 1) + "</td>";
					}else{
					   str += "<td>" + 0 + "</td>";
					}
					str += "<td>" + bao[i]['meshui'] + "</td>";
					var tanshui=0;
					if (bao[i]['fly'] == '1' | bao[i]['fly'] == '2') {
						str += "<td>0</td>";
						str += "<td  class='plc' ";
						if (plc != 1) str += " style='display:none;' ";
						str += " >0</td>"
					} else {
						//str += "<td>" + getResult(Number(bao[i]['meshui']) + Number(bao[i]['sendshui']) - Number(bao[i]['shui']), 2) + "</td>";
						tanshui = getResult(Number(bao[i]['meshui']) + Number(bao[i]['sendshui']) - Number(bao[i]['shui']), 2);
						str += "<td>" + bao[i]['zhuanshui'] + "</td>";
						str += "<td class='plc' ";
						if (plc != 1) str += " style='display:none;' ";
						str += " >" + getResult(Number(bao[i]['mezhong']) + Number(bao[i]['sendzhong']) - Number(bao[i]['zhong']), 2) + "</td>";
					}
				// 	str += "<td class='result color ff'>" + getResult(bao[i]['meyk']+tanshui,2) + "</td>";
					str += "<td class='result color ff'>" + bao[i]['sendyk_i'] + "</td>";
					str += "<td>" + bao[i]['sendje'] + "</td>";
					str += "<td  class='result color ff'>" + bao[i]['sendyk'] + "</td>";
					str += "</tr>"
				}
				obj.find("tbody").html(str);
				obj.find("tfoot th:eq(0)").html("总计" + obj.find("tbody tr").length + "行")
			}
            changeh(document.documentElement.scrollHeight + 500);
			m = null;
			str = null;
			$(".maingame").each(function(){
				if($(this).find(".data_table tbody tr").length==0){
					$(this).hide();
				}
			});
			$(".gids tfoot td").each(function(i) {
			   if(!$(this).hasClass('nosum')){		
				var j = $(this).index() + 3;
				var je = 0;
				$(this).parent().parent().parent().find("tbody tr").each(function() {
					if($(this).find("td:eq(" + j + ")").find("a").length==1){
					    je += Number($(this).find("td:eq(" + j + ") a").html());	
					}else{
					    je += Number($(this).find("td:eq(" + j + ")").html());
					}
				});
				$(this).html(getResult(je, 1));
			   }
			});
			$(".gids td.result").each(function() {
				if (Number($(this).html()) < 0) {
					$(this).css("color", 'red')
				} else {
					$(this).css("color", 'blue')
				}
			});
			$(".gids a.u").click(function() {
				fly=0;
				ttype=0;
				page=1;
				if(Number($(this).parent().parent().attr('fly'))>0){
					fly = Number($(this).parent().parent().attr('fly'));
					ttype = $(this).attr('ttype');	
					userbao("main2", 'user', $(this).attr('uid'), $(this).attr('gid'));		
				} else if ($(this).attr('ifagent') == '0') {
					userbao("main2", 'user', $(this).attr('uid'), $(this).attr('gid'))
				}else {
					$(".main2 a.back").attr('uid', $(".nowuser").attr('uid'));
					$(".main2 a.back").attr('layer', $(".nowuser").attr('layer'));
					$(".main2 a.back").attr('username', $(".nowuser").attr('username'));
					$(".nowuser").attr('uid', $(this).attr('uid'));
					$(".nowuser").attr('layer', $(this).attr('layer'));
					$(".nowuser").attr('username', $(this).parent().parent().find("a.u:eq(0)").html());
					agentnew()
				}
			});
			addfunc()
		}
	})
}
function setdate(val) {
	var start = $("#begin");
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
function getResult(num, n) {
	var tmp = Math.round(num * Math.pow(10, n)) / Math.pow(10, n);
	if (Math.abs(tmp) < 0.5) return 0;
	else return tmp
}
function getresult(num, n) {
	return num.toString().replace(new RegExp("^(\\-?\\d*\\.?\\d{0," + n + "})(\\d*)$"), "$1") + 0
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

function fmoneys(s, n) {
    /*
     * 参数说明：
     * s：要格式化的数字
     * n：保留几位小数
     * */
    n = n > 0 && n <= 20 ? n : 1;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    var rr = t.split("").reverse().join("") + "." + r;
    if(rr.substr(0,2)=='-,'){
       rr = '-'+rr.substr(2);
    }
    return rr;
}