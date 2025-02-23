function myready() {
	changeh(document.documentElement.scrollHeight+500);;
	$("input.textb").click(function() {
		WdatePicker()
	});
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
	$("label").addClass('red');
	$(".winprint").click(function() {
		var wid = $(".xbody1:eq(0)").width();
		$(".xbody1:eq(0)").css('width', 980);
		window.print();
		$(".xbody1:eq(0)").css('width', wid)
	});
	$(".s_head input.s").click(function() {
		setdate(Number($(this).attr('d')))
	});
	//gettz();
	$(".qishu").change(function() {
		gettz()
	});
	$(".bid").change(function() {
		if ($(this).val() == '') {
			$(".sid").empty();
			$(".cid").empty();
			return
		}
		gets($(this).val())
	});
	$(".sid").change(function() {
		if ($(this).val() == '') {
			$(".cid").empty();
			return
		}
		getc()
	});
	$(".query").click(function() {
		getxx();
	});
	getxx();
	$(".upuser").click(function() {
		$(".nowuser").html($(".upuser").html());
		$(".nowuser").attr("uid", $(".upuser").attr('uid'));
		$(".nowuser").attr("layer", $(".upuser").attr('layer'));
		gettz($(".nowuser").attr('uid'), Number($(".nowuser").attr('layer')) + 1);
		$.ajax({
			type: 'POST',
			url: mulu + 'xxtz',
			data: 'xtype=getfid&uid=' + $(".upuser").attr('uid'),
			dataType: 'json',
			cache: false,
			success: function(m) {
				if (Number(m['err']) == 1) {
					$(".upuser").html('');
					$(".upuser").attr('uid', '');
					$(".upuser").attr('layer', '');
					return
				}
				if (Number(m['uid']) == 99999999) {
					$(".upuser").html('集团')
				} else {
					$(".upuser").html(m['name'])
				}
				$(".upuser").attr('uid', m['uid']);
				$(".upuser").attr('layer', m['layer'])
			}
		})
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
function gets() {
	var bid = $(".bid").val();
	$.ajax({
		type: 'POST',
		url: mulu + 'xxtz',
		dataType: 'json',
		data: 'xtype=gets&bid=' + bid,
		cache: false,
		success: function(m) {
			var ml = m.length;
			$(".sid").empty();
			$(".cid").empty();
			str = "<option value=''>全部</option>";
			$(".sid").append(str);
			for (i = 0; i < ml; i++) {
				str = "<option value='" + m[i]['sid'] + "'>" + m[i]['name'] + "</option>";
				$(".sid").append(str)
			}
			str = null;
			m = null
		}
	})
}
function getc() {
	var bid = $(".bid").val();
	var sid = $(".sid").val();
	$.ajax({
		type: 'POST',
		url: mulu + 'xxtz',
		dataType: 'json',
		data: 'xtype=getc&bid=' + bid + "&sid=" + sid,
		cache: false,
		success: function(m) {
			var ml = m.length;
			$(".cid").empty();
			str = "<option value=''>全部</option>";
			$(".cid").append(str);
			for (i = 0; i < ml; i++) {
				str = "<option value='" + m[i]['cid'] + "'>" + m[i]['name'] + "</option>";
				$(".cid").append(str)
			}
			str = null;
			m = null
		}
	})
}
function gettz() {
	var fs = $("input[name='fs']:checked").val();
	var start = $("#start").val();
	var end = $("#end").val();
	if (Number(start.replace('-', '')) > Number(end.replace('-', ''))) {
		alert('开始日期不能大于结束日期！');
		return false
	}
	var qishu = $(".qishu").val();
	var bid = $(".bid").val();
	var cid = $(".cid").val();
	var sid = $(".sid").val();
	$(".user").html('');
	var uid = $(".nowuser").attr('uid');
	var nowlayer = Number($(".nowuser").attr('layer'));
	getxx(uid);
	$.ajax({
		type: 'POST',
		url: mulu + 'xxtz',
		dataType: 'json',
		data: 'xtype=getuser&bid=' + bid + "&cid=" + cid + "&sid=" + sid + "&uid=" + uid + "&qishu=" + qishu + "&fs=" + fs + "&start=" + start + "&end=" + end,
		cache: false,
		success: function(m) {
			var ml = m['u'].length;
			if (ml == 0) return;
			var str = '';
			str += "<thead><tr><th>" + layername[nowlayer] + "</th>";
			for (i = nowlayer + 1; i <= maxlayer; i++) {
				if (i == maxlayer) {
					str += "<th>会员投|注</th>"
				} else {
					str += "<th>" + layername[i - 1] + "上报</th><th>" + layername[i - 1] + "占成</th>"
				}
			}
			str += "</tr></thead>";
			var len = m['u'][0]['z'].length;
			len = maxlayer - nowlayer;
			var total = new Array();
			for (i = 0; i < len; i++) {
				total[i] = new Array();
				total[i]['uje'] = 0;
				total[i]['uzs'] = 0;
				total[i]['cje'] = 0;
				total[i]['czs'] = 0
			}
			for (i = 0; i < ml; i++) {
				str += "<tr>";
				str += "<td><a class='u' href='javascript:void(0);' ifagent='" + m['u'][i]['ifagent'] + "' wid='" + m['u'][i]['wid'] + "' layer='" + m['u'][i]['layer'] + "' uid='" + m['u'][i]['userid'] + "'>" + m['u'][i]['username'] + "</a></td>";
				var tmp = m['u'][i]['z'];
				for (j = 0; j < tmp.length; j++) {
					if (Number(tmp[j]['layer']) <= maxlayer) {
						if (Number(tmp[j]['layer']) == maxlayer) {
							str += "<td><label>" + tmp[j]['uje'] + "</label>/" + tmp[j]['uzs'] + "</td>"
						} else if (Number(tmp[j]['layer']) < maxlayer) {
							str += "<td><label>" + tmp[j]['uje'] + "</label>/" + tmp[j]['uzs'] + "</td>";
							str += "<td><label>" + tmp[j]['cje'] + "</label>/" + tmp[j]['czs'] + "</td>"
						}
						total[j]['uje'] += Number(tmp[j]['uje']);
						total[j]['uzs'] += Number(tmp[j]['uzs']);
						total[j]['cje'] += Number(tmp[j]['cje']);
						total[j]['czs'] += Number(tmp[j]['czs'])
					}
				}
				str += "</tr>"
			}
			str += "<tr>";
			str += "<th>合计</th>";
			for (i = 0; i < len - 1; i++) {
				if (Number(uid) == 99999999) {
					str += "<td><label>" + getResult(total[i]['uje'], 2) + "</label>/" + total[i]['uzs'] + "</td>";
					str += "<td><label>" + getResult(total[i]['cje'], 2) + "</label>/" + total[i]['czs'] + "</td>"
				} else {
					if (i < (maxlayer - 2)) {
						str += "<td><label>" + getResult(total[i]['uje'], 2) + "</label>/" + total[i]['uzs'] + "</td>";
						str += "<td><label>" + getResult(total[i]['cje'], 2) + "</label>/" + total[i]['czs'] + "</td>"
					}
				}
			}
			str += "<td><label>" + getResult(total[len - 1]['uje'], 2) + "</label>/" + total[len - 1]['uzs'] + "</td>";
			str += "</tr>";
			$(".user").html(str);
			
			str = null;
			m = null;
			$(".user label").addClass('red');
			$(".user a.u").click(function() {
				if ($(this).attr('ifagent') == '0') {
					if ($(".nowuser").attr('layer') == $(this).attr('layer')) {} else {
						$(".upuser").attr("uid", $(".nowuser").attr('uid'));
						$(".upuser").attr("layer", $(".nowuser").attr('layer'));
						$(".upuser").html($(".nowuser").html())
					}
					$(".nowuser").attr('uid', $(this).attr('uid'));
					$(".nowuser").attr('layer', $(this).attr('layer'));
					$(".nowuser").html($(this).html());
					getxx($(this).attr('uid'))
				} else {
					$(".upuser").attr("uid", $(".nowuser").attr('uid'));
					$(".upuser").attr("layer", $(".nowuser").attr('layer'));
					$(".upuser").html($(".nowuser").html());
					$(".nowuser").attr('uid', $(this).attr('uid'));
					$(".nowuser").attr('layer', $(this).attr('layer'));
					$(".nowuser").html($(this).html());
					gettz()
				}
				if ($(this).attr('layer') == '1') {
					for (k = 0; k < layernames.length; k++) {
						if (Number($(this).attr('wid')) == layernames[k]['wid']) {
							maxlayer = layernames[k]['layer'].length;
							layername = layernames[k]['layer'];
							$(".nowtb").html("<tr class='bt'><th><input type='checkbox' class='clickall' /></th> <th>操作</th><th>期数</th><th>交易号</th><th>类型</th><th>类别</th><th>大盘</th><th>小盘</th><th>中</th><th>内容</th><th>金额</th><th>赔率</th><th>退水%</th><th>会员</th><th>时间</th></tr>");
							$(".nowtb th").attr("rowspan", 2);
							if (layer < layernames[k]['layer'].length - 1) {
								$(".nowtb tr:eq(0)").append("<th rowspan=2>所属" + layernames[k]['layer'][0] + "</th>")
							}
							$(".nowtb tr:eq(0)").append("<th rowspan=2>集团</th>");
							for (g = 0; g < layernames[k]['layer'].length - 1; g++) {
								$(".nowtb tr:eq(0)").append("<th colspan=3>" + layernames[k]['layer'][g] + "</th>")
							}
							var str = '';
							for (g = 0; g < layernames[k]['layer'].length - 1; g++) {
								str += "<th>占成</th><th>赔率</th><th>退水</th>"
							}
							if (str != '') $(".nowtb").append("<tr class='bt'>" + str + "</tr>")
						}
					}
				}
			})
		}
	})
}
function nan0(V) {
	if (V == NaN) {
		return 0
	}
}
function getxx(uid) {
	var fs = $("input[name='fs']:checked").val();
	var start = $("#start").val();
	var end = $("#end").val();
	if (Number(start.replace('-', '')) > Number(end.replace('-', ''))) {
		alert('开始日期不能大于结束日期！');
		return false
	}
	var qishu = $(".qishu").val();
	var bid = $(".bid").val();
	var cid = $(".cid").val();
	var sid = $(".sid").val();
	var page = $("#page").val();
	$(".nowtb tr").each(function(i) {
		if (!$(this).hasClass('bt')) $(this).remove()
	});
	var uid =  $("#username").val();
	var melayer = Number($("#topid").attr('layer'));
	$.ajax({
		type: 'POST',
		url: mulu + 'xxtz2',
		data: 'xtype=gettzxx&uid=' + uid + "&page=" + page + "&bid=" + bid + "&cid=" + cid + "&sid=" + sid + "&qishu=" + qishu + "&fs=" + fs + "&start=" + start + "&end=" + end,
		dataType: 'json',
		cache: false,
		success: function(m) {
			console.log(m['sql']);
			var ml = m['tz'].length;
			if (ml == 0) return;
			var str = '';
			for (i = 0; i < ml; i++) {
				str += "<tr>";
				str += "<td><input type='checkbox' id='" + m['tz'][i]['id'] + "' gid='" + m['tz'][i]['gids'] + "'  value='"+ m['tz'][i]['tid'] + m['tz'][i]['userid'] + "' /></td>";
				str += "<td><a href='javascript:void(0);' class='edit'>修改</a> <a href='javascript:void(0);' class='del'>删除</a></td>";
				str += "<td>" + m['tz'][i]['game'] + "</td>";
				str += "<td>" + m['tz'][i]['qishu'] + "</td>";
				str += "<td>" + m['tz'][i]['tid'] + "</td>";
				str += "<td>" + m['tz'][i]['xtype'] + "</td>";
				if((m['tz'][i]['fl']==107 & m['tz'][i]['bids']!=23378805 ) | (m['tz'][i]['fl']==101 & m['tz'][i]['bids']==23378755) ){
				    str += "<td>" + selectsb(m['tz'][i]['fl'],'sid', m['tz'][i]['sid']) + ":" + selects(m['tz'][i]['fl'],'pid', m['tz'][i]['pid']) + "</td>";
				}else{
				    str += "<td>" + m['tz'][i]['bid'] + "-" + m['tz'][i]['sid'] + "-" + m['tz'][i]['cid'] + ":" + inputs('pid', m['tz'][i]['pid']) + "</td>";
				}
				str += "<td>" + m['tz'][i]['abcd'] + "</td>";
				str += "<td>" + m['tz'][i]['ab'] + "</td>";
				str += "<td>" + selectjs('zz', m['tz'][i]['z']) + "</td>";
				str += "<td>" + inputs('con', m['tz'][i]['con']) + "</td>";
				str += "<td>" + inputs('je', m['tz'][i]['je']) + "</td>";
				str += "<td>" + inputs('peilv1', m['tz'][i]['peilv1']) + '/' + m['tz'][i]['peilv2'] + "</td>";
				str += "<td>" + inputs('points', m['tz'][i]['points']) + "</td>";
				str += "<td>" + m['tz'][i]['user'] + "</td>";
				str += "<td>" + inputs('time', m['tz'][i]['time']) + "</td>";
				if (melayer < (maxlayer - 1)) str += "<td>" + m['tz'][i]['duser'] + "</td>";
				for (j = melayer; j < maxlayer; j++) {
					str += "<td>" + m['tz'][i]['zc' + j] + "</td>";
					if (j != 0) {
						str += "<td>" + inputs('peilv1' + j, m['tz'][i]['peilv1' + j]) + "</td>";
						str += "<td>" + inputs('points' + j, m['tz'][i]['points' + j]) + "</td>"
					}
				}
				str += "</tr>"
			}
			var pstr="<select class='pages'>";
			for(i=1;i<=m['pcount'];i++){
				pstr += "<option value='"+i+"'>"+i+"</option>";
			}
			pstr += '</select>'
			$(".nowtb").prepend("<tr><td colspan=3><a href='javascript:void(0)' class='delall' >删除选中</a>  <a href='javascript:void(0)' class='editall' >修改选中</a></td><td colspan=15>" + pstr + "</td></tr>");
			$(".nowtb").append(str);
			$(".nowtb .time").removeClass('txts');
			$(".nowtb .time").addClass('txts2');
			$(".nowtb select.pages").val(m['page']);
			$(".nowtb select.pages").change(function() {
				$("#page").val($(this).val());
				getxx(uid)
			});
			
			str = null;
			m = null;
			addfunc();
            $(".nowtb select").change(function(){
            	var val= $(this).val();
            	var qs = $(this).parent().parent().find("td:eq(3)").html();
            	if($(this).hasClass("sid")){
                    $(".nowtb input:checkbox").each(function(){
                    	if(!$(this).hasClass("clickall") && $(this).prop("checked")==true && $(this).parent().parent().find("td:eq(3)").html()==qs){

                            $(this).parent().parent().find("select.sid").val(val);
                    	}
                    });
            	}else{
                    $(".nowtb input:checkbox").each(function(){
                    	if(!$(this).hasClass("clickall") && $(this).prop("checked")==true && $(this).parent().parent().find("td:eq(3)").html()==qs){
                             $(this).parent().parent().find("select.pid").val(val);
                    	}
                    });
            	}
            });
			changeh(document.documentElement.scrollHeight+500);;
			
			
		}
	})
}
function inputs(classes, val) {
	var str = "<input type='text' class='" + classes + " txts' value='" + val + "' />";
	return str
}
function selects(fl,classes,val){
	if(fl==107){
	   arr = [1,2,3,4,5,6,7,8,9,10,'大','小','单','双',,'龙','虎'];
	}else if(fl==101){
	   arr = [0,1,2,3,4,5,6,7,8,9,'大','小','单','双'];
	}
	var str="<select class='"+classes+"' style='width:40px;'>";
	for( var i in arr){
        str += "<option value='"+arr[i]+"' ";
        if(val==arr[i]) str += "selected";
        str += " >"+arr[i]+"</option>";
	}
	str += "</select>";
	return str;
}
function selectjs(classes,val){
	arr = ['中奖','不中奖','和','未结算','注单取消'];
	varr = [1,0,2,9,7];
	var str="<select class='"+classes+"' style='width:80px;'>";
	for( var i in varr){
        str += "<option value='"+varr[i]+"' ";
        if(val==varr[i]) str += "selected";
        str += " >"+arr[i]+"</option>";
	}
	str += "</select>";
	return str;
}
function selectsb(fl,classes,val){
	if(fl==107){
	   arr = ['冠军','亚军','第三名','第四名','第五名','第六名','第七名','第八名','第九名','第十名'];
	}else if(fl==101){
	   arr = ['第一球','第二球','第三球','第四球','第五球'];
	}
	var str="<select class='"+classes+"' style='width:65px;'>";
	for( var i in arr){
        str += "<option value='"+arr[i]+"' ";
        if(val==arr[i]) str += "selected";
        str += " >"+arr[i]+"</option>";
	}
	str += "</select>";
	return str;
}
function addfunc() {
	$(".delall").click(function() {
		var tid = gettid();
		if (strlen(tid) < 16) return false;
		if (!confirm("确定删除注单吗？")) return false;
		var start = $("#start").val();
	    var end = $("#end").val();
		$.ajax({
			type: 'POST',
			url: mulu + 'xxtz2',
			data: 'xtype=deltz&tid=' + tid+"&start="+start+"&end="+end,
			dataType: 'json',
			cache: false,
			success: function(m) {
				if (Number(m) == 1) {
					$(".nowtb input:checkbox").each(function() {
						if (tid.indexOf($(this).val()) != -1 & !$(this).hasClass('clickall') & $(this).val() != undefined) {
							$(this).parent().parent().remove()
						}
					})
				}
			}
		})
	});
	$(".del").click(function() {
		$(this).parent().parent().find("input:checkbox").attr("checked", true);
		$(".delall").click()
	});
	$(".edit").click(function() {
		$(this).parent().parent().find("input:checkbox").attr("checked", true);
		$(".editall").click()
	});
	$(".editall").click(function() {
		var str = '{';
		var i = 0;
		$(".nowtb input:checkbox").each(function() {
			if ($(this).prop('checked') == true & !$(this).hasClass('clickall') & $(this).val() != undefined) {
				if (i > 0) str += ',';
				var obj = $(this).parent().parent();
				str += '"' + i + '":{"qishu":"' + obj.find("td:eq(3)").html() + '","gid":"' + $(this).attr("gid") + '","tid":"' + $(this).val() + '","sid":"' + obj.find(".sid").val() + '","pid":"' + obj.find(".pid").val() + '","z":"' + obj.find(".zz").val() + '","con":"' + obj.find(".con").val() + '","je":"' + obj.find(".je").val() + '","peilv1":"' + obj.find(".peilv1").val() + '","points":"' + obj.find(".points").val() + '","time":"' + obj.find(".time").val() + '"';
				for (j = 1; j < 9; j++) {
					points = 'points' + j;
					peilv1 = 'peilv1' + j;
					str += ',"' + points + '":"' + obj.find("." + points).val() + '"';
					str += ',"' + peilv1 + '":"' + obj.find("." + peilv1).val() + '"'
				}
				str += '}';
				i++
			}
		});
		str += '}';
		console.log(str);
		if (strlen(str) < 50) return false;
		var start = $("#start").val();
	    var end = $("#end").val();
		$.ajax({
			type: 'POST',
			url: mulu + 'xxtz2',
			data: 'xtype=edittz&str=' + str+"&start="+start+"&end="+end,
			cache: false,
			success: function(m) {
				console.log(m);
				if (Number(m) == 1) {
					alert('ok');
					var uid = Number($(".nowuser").attr('uid'));
					getxx(uid)
				}
			}
		})
	});
	$(".clickall").click(function() {
		if ($(this).prop('checked') == true) $(".nowtb input:checkbox").attr("checked", true);
		else $(".nowtb input:checkbox").attr("checked", false)
	})
}
function gettid() {
	var idstr = '|';
	$(".nowtb input:checkbox").each(function() {
		if ($(this).prop('checked') == true & !$(this).hasClass('clickall') & $(this).val() != undefined) {
			idstr += $(this).val() +$(this).attr("gid")+$(this).parent().parent().find("td:eq(3)").html()+ '|'
		}
	});
	return idstr
}
function getResult(num, n) {
	return Math.round(num * Math.pow(10, n)) / Math.pow(10, n)
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