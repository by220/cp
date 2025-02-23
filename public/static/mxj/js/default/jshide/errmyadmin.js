function myready() {
	$("label").addClass('red');
	$(".nowtb th").attr("rowspan", 2);
	clayer = layername.length;
	if (layer < 8) {
		$(".nowtb tr:eq(0)").append("<th rowspan=2>所属" + layername[layer] + "</th>")
	}
	$(".nowtb tr:eq(0)").append("<th rowspan=2>集团</th>");
	for (i = 0; i < clayer - 1; i++) {
		$(".nowtb tr:eq(0)").append("<th colspan=3>" + layername[i] + "</th>")
	}
	var str = '';
	for (i = 0; i < clayer - 1; i++) {
		str += "<th>占成</th><th>赔率</th><th>退水</th>"
	}
	if (str != '') $(".nowtb").append("<tr class='bt'>" + str + "</tr>");
	$(".nowtb .del").click(function() {
		var idstr = '|' + $(this).parent().parent().find("input:checkbox").val() + '|';
		deltz(idstr)
	});
	getnow();
	//bofang()
}
function getnow() {
	var page = $(".sort").attr("page");
	$(".nowtb tr").each(function(i) {
		if (!$(this).hasClass('bt')) $(this).remove()
	});
	$.ajax({
		type: 'POST',
		url: mulu + 'err',
		data: 'xtype=getnow&page=' + page,
		dataType: 'json',
		cache: false,
		success: function(m) {
			console.log(m);
			var ml = m['tz'].length;
			var str = '';
			for (i = 0; i < ml; i++) {
				str += "<tr class='c";
				if (Number(m['tz'][i]['z']) == 1) str += " z1";
				if (Number(m['tz'][i]['z']) == 2) str += " z2";
				if (Number(m['tz'][i]['z']) == 3) str += " z3";
				str += "'>";
				str += "<td><input type='checkbox' id='" + m['tz'][i]['id'] + "'  value='" + m['tz'][i]['tid'] + m['tz'][i]['userid'] + "' /></td>";
				str += "<td><a href='javascript:void(0);' class='huifu'>恢复</a>&nbsp;<a href='javascript:void(0);' class='del'>删除</a></td>";
				str += "<td>" + m['tz'][i]['action'] + m['tz'][i]['ifh'] + "</td>";
				str += "<td><img class='ifcl' src='" + globalpath + "img/" + m['tz'][i]['ifcl'] + ".gif' /></td>";
				str += "<td>" + m['tz'][i]['gid'] + "</td>";
				str += "<td>" + m['tz'][i]['qishu'] + "</td>";
				str += "<td>" + m['tz'][i]['tid'] + "</td>";
				str += "<td>" + m['tz'][i]['bid'] + "-" + m['tz'][i]['sid'] + "-" + m['tz'][i]['cid'] + ":" + m['tz'][i]['pid'];
				if (m['tz'][i]['action'] == 'U') str += "<BR /><label>" + m['tz'][i]['bidx'] + "-" + m['tz'][i]['sidx'] + "-" + m['tz'][i]['cidx'] + ":" + m['tz'][i]['pidx'] + "</label>";
				str += " </td>";
				str += "<td>" + m['tz'][i]['abcd'] + "</td>";
				str += "<td>" + m['tz'][i]['ab'] + "</td>";
				str += "<td>" + m['tz'][i]['z'] + ac(m['tz'][i]['action'], m['tz'][i]['zx']) + "</td>";
				str += "<td>" + m['tz'][i]['con'] + ac(m['tz'][i]['action'], m['tz'][i]['conx']) + "</td>";
				str += "<td>" + m['tz'][i]['je'] + "</label>" + ac(m['tz'][i]['action'], m['tz'][i]['jex']) + "</td>"
				str += "<td>" + m['tz'][i]['peilv1'] + ac(m['tz'][i]['action'], m['tz'][i]['peilv1x']) + "</td>";
				str += "<td>" + m['tz'][i]['points'] + ac(m['tz'][i]['action'], m['tz'][i]['pointsx']) + "</td>";
				str += "<td>" + m['tz'][i]['user'] + "</td>";
				str += "<td>" + m['tz'][i]['xtime'] + "<Br /><label>" + m['tz'][i]['errtime'] + "</label></td>";
				str += "<td>" + m['tz'][i]['duser'] + "</td>";
				for (j = 0; j < 9; j++) {
					str += "<td>" + m['tz'][i]['zc' + j] + "</td>";
					if (j != 0) {
						str += "<td>" + m['tz'][i]['peilv1' + j] + "</td>";
						str += "<td>" + m['tz'][i]['points' + j] + "</td>"
					}
				}
				str += "</tr>"
			}
			$(".nowtb").prepend("<tr><td colspan=5><a href='javascript:void(0)' class='delselect' >删除选中</a>&nbsp;&nbsp;<a href='javascript:void(0)' class='delall' >删除全部</a></td><td colspan=37>" + m['page'] + "</td></tr>");
			$(".nowtb").append(str);
			$(".nowtb label").addClass('red');
			$(".nowtb a.page").click(function() {
				//$("#page").val(Number($(this).html()));
				$(".sort").attr("page",$(this).html());
				getnow()
			});
			changeh(document.documentElement.scrollHeight+500);;
			str = null;
			m = null;
			addfunc()
		}
	})
}
function ac(a, v) {
	if (a == 'U') return "<br /><label>" + v + "</label>";
	else return ''
}
function getid() {
	var idstr = '|';
	$(".nowtb input:checkbox").each(function() {
		if ($(this).prop('checked') == true) {
			idstr += $(this).attr('id') + '|'
		}
	});
	return idstr
}
function addfunc() {
	
	$(".huifu").click(function() {
		var id = $(this).parent().parent().find("input:checkbox").attr('id');
		$.ajax({
			type: 'POST',
			url: mulu + 'err',
			data: 'xtype=huifu&id=' + id,
			success: function(m) {
				alert(m);
				$("#test").html(m);
				if (Number(m) == 0) {
				    alert("该单号已经处理过了!");
				} else if (Number(m) == 1) {
				     window.location.href = window.location.href;
				}
			}
		})
	});

	$("img.ifcl").click(function() {
		$(this).parent().parent().find("input:checkbox").attr('id');
		var obj = $(this);
		$.ajax({
			type: 'POST',
			url: mulu + 'error',
			data: 'xtype=changeifcl&id=' + id,
			success: function(m) {
		
				if (Number(m) == 0) {
				     obj.attr("src",globalpath+"img/0.gif");
				}
			}
		})
	});
	$(".delall").click(function() {
		deltz('all');
	});
	$(".del").click(function(){
	    $(".nowtb input:checkbox").attr("checked",false);
		$(this).parent().parent().find("input:checkbox").attr("checked",true);
		$(".delselect").click();
	});
	$(".delselect").click(function(){
	     deltz(getid())
	});
	$(".clickall").click(function() {
		if ($(this).prop('checked') == true) $(".nowtb input:checkbox").attr("checked", true);
		else $(".nowtb input:checkbox").attr("checked", false)
	})
	
}
function deltz(idstr) {
	
	if (!confirm("确定删除吗？")) return false;
	$.ajax({
		type: 'POST',
		url: mulu + 'err',
		data: 'xtype=sc&idstr=' + idstr,
		success: function(m) {
			if (Number(m) == 1) {
				window.location.href = window.location.href;
			}
		}
	})
}
function bofang() {
	var flag = true;
	$(".nowtb").find("img").each(function() {
		if (this.src.indexOf('0.gif') != -1) {
			flag = false
		}
	});
	if (!flag) {
		if (document.frames) {
			document.all["sfrm"].src = globalpath + "js/sound.html"
		} else {
			document.getElementById("sfrm").contentWindow.location.href = globalpath + "js/sound.html"
		}
	} else {
		if (document.frames) {
			document.all["sfrm"].src = ""
		} else {
			document.getElementById("sfrm").contentWindow.location.href = ""
		}
	}
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