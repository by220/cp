var rtime = Number($("#reloadtime").val());
var r;
var layers;

function myready() {
	$(".nowtb .bt th").addClass('xf');
	$(".nowtb th").attr("rowspan", 2);
	clayer = layername.length;
	if(layer<(maxlayer-1)){
	    $(".nowtb tr:eq(0)").append("<th rowspan=2>所属"+layername[layer]+"</th>");
	}
	for(i=layer-1;i<clayer-1;i++){
	     $(".nowtb tr:eq(0)").append("<th colspan=3>"+layername[i]+"</th>");
	}
    var str ='';
	for(i=layer-1;i<clayer-1;i++){
	    str += "<th>占成</th><th>赔率</th><th>退水</th>";
	}   
	if(str!='')   $(".nowtb").append("<tr class='bt'>"+str+"</tr>");
	$("label").addClass('red');
	$(".textb").click(function() {
		WdatePicker()
	});
	$("#reload").click(function() {
		time()
	});
	$("#zanting").click(function() {
		clearTimeout(r)
	});
	$(".s_head input.s").click(function() {
		setdate(Number($(this).attr('d')))
	});
	$(".qishu").change(function() {
		rtime = Number($("#reloadtime").val());
		getnow();
	});
	$(".query").click(function() {
		rtime = Number($("#reloadtime").val());
		getnow();
	});
	$(".xtype").change(function() {
		rtime = Number($("#reloadtime").val());
		getnow();
	});
				$(".nowtb th a").click(function() {
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
					getnow();
					rtime = Number($("#reloadtime").val());
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
	$("#game").change(function() {
		$("input[name='fs']").eq(0).attr("checked", 'checked');
		var val = Number($("#game").val());
		if (val == 999){
		   $(".bid").empty();
		   $(".sid").empty();
		   $(".cid").empty();
		   return;
		}
		getb();
	});
	$("input[name='fs']").change(function() {

		$.ajax({
			type: 'POST',
			url: mulu + 'now.php',
			data: 'xtype=getqishu&gid=' + val,
			dataType: 'json',
			cache: false,
			success: function(m) {
				var ml = m.length;
				$(".qishu").html('');
				for (i = 0; i < ml; i++) {
					$(".qishu").append("<option value='" + m[i][0] + "'>" + m[i][0] + "期</option>")
				}
			}
		});
		
	});
	$("input[name='xinfo']").click(function(){getnow();});
		$("input[name='xinfo']").click(function(){getnow();});
	$("#z").change(function(){getnow()});
	$("#reloadtime").change(function(){getnow()});
	$("#psize").change(function(){getnow()});
	$(".qishu").change(function(){getnow()});
$("input[name='fs']").click(function(){getnow()});	
	time();
	addchange();
	getnow()
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
	getnow();
}
function time() {
	rtime--;
	if (rtime == 0) {
		clearTimeout(r);
		getnow();
		rtime = Number($("#reloadtime").val())
	}
	$("label.time").html(rtime);
	r = setTimeout(time, 1000)
}
function addchange() {
	$(".user").unbind("change");
	$(".user").change(function() {
		layers = Number($(this).attr('layer'));
		var uid = $(this).val();
		var wid = Number($(this).find("option:selected").attr('wid'));
		createson(layers, uid, wid)
	})
}
function createson(layers, uid, wid) {
	if (layer == layers) {
		$("#saveuserid").val(uid);
		getnow();
		return false
	}
	if (uid == '') {
		$(".user").each(function() {
			if (Number($(this).attr('layer')) > layers) {
				$(this).remove()
			}
		});
		if (layers == 1) {
			$("#saveuserid").val($("#topid").val())
		} else {
			$(".user").each(function() {
				if (Number($(this).attr('layer')) == layers) {

					$("#saveuserid").val($(this).val())
				}
			})
		}
		getnow()
	} else {
		$(".user").each(function() {
			if (Number($(this).attr('layer')) > layers) {
				$(this).remove()
			}
		});
		$("#saveuserid").val(uid);
		$.ajax({
			type: 'POST',
			url: mulu + 'suser.php',
			dataType: 'json',
			cache: false,
			data: 'xtype=createson&uid=' + uid,
			success: function(m) {
				var str = "<select class=user layer=" + (layers + 1) + ">";
				str += "<option value=''>选择" + layername[layers] + "</option>";
				var mlength = m.length;
				for (i = 0; i < mlength; i++) {
					str += "<option value='" + m[i]['userid'] + "' wid='" + m[i]['wid'] + "'>" + m[i]['username'] + "</option>"
				}
				str += "</select>";
				$(".user").parent().append(str);
				addchange();
			}
		});
		getnow()
	}
}
function getnow() {
	var puserid = $("#saveuserid").val();
	var psize = $("#psize").val();
	var qishu = $("#qishu").val();
	var gid = $("#game").val();
	var bid = $(".bid").val();
	var cid = $(".cid").val();
	var sid = $(".sid").val();
	var z = $("#z").val();
		var orderby = $(".sort").attr("orderby");
		var sorttype = $(".sort").attr("sorttype");
		var page = $(".sort").attr("page");
		var xtype = $(".xtype").val();
	var fs = $("input[name='fs']:checked").val();
	var start = $("#start").val();
	var end = $("#end").val();
	if (Number(start.replace('-', '')) > Number(end.replace('-', '')) & fs=='0') {
		alert('开始日期不能大于结束日期！');
		return false
	}
	$(".nowtb tr").each(function(i) {
		if (!$(this).hasClass('bt')) $(this).remove()
	});
	if($("input[name='xinfo']").prop("checked")) {
	var xinfo = 1;
	}else{
		var xinfo = 0;
		}
   
   if(xinfo==1){
	   $(".nowtb .bt th").show();
	   } else{
		$(".nowtb .bt th").each(function(){
		   if(!$(this).hasClass('xf')) $(this).hide();
		   });
	  
		 }
	var melayer = Number($("#topid").attr('layer'));
	var str = "&gid="+gid+"&bid="+bid+"&sid="+sid+"&cid="+cid+"&z="+z+"&psize="+psize+"&page="+page+"&puserid="+puserid+"&fs="+fs+"&qishu="+qishu+"&start="+start+"&end="+end+"&xtypes="+xtype+"&orderby="+orderby+"&sorttype="+sorttype+"&xinfo="+xinfo;

	$.ajax({
		type: 'POST',
		url: mulu + 'now.php',
		data: 'xtype=getnow'+str,
		dataType: 'json',
		cache: false,
		success: function(m) {
			var ml = m['tz'].length;
			var str = '';
		
			for (i = 0; i < ml; i++) {
				str += "<tr class='c";
				if (Number(m['tz'][i]['z']) == 1) str += " z1";
				if (Number(m['tz'][i]['z']) == 2 | Number(m['tz'][i]['z']) == 7) str += " z2";
				if (Number(m['tz'][i]['z']) == 3) str += " z3";
				str += "'>";
				str += "<td>" + m['tz'][i]['gid'] + "</td>";
				str += "<td>" + m['tz'][i]['qishu'] + "</td>";
				str += "<td>" + m['tz'][i]['tid'] + "</td>";
				str += "<td>" + m['tz'][i]['zt'] + "</td>";
				str += "<td>" + m['tz'][i]['xtype'] + "</td>";
				str += "<td>" + m['tz'][i]['wf'] + "</td>";
				str += "<td>" + m['tz'][i]['abcd'] + "</td>";
				str += "<td>" + m['tz'][i]['ab'] + "</td>";
				str += "<td>" + m['tz'][i]['con'] + "</td>";
				
			
					str += "<td><label>" + m['tz'][i]['zcje'] + "</label>/" + m['tz'][i]['je'] + "</td>"
			
				str += "<td>" + m['tz'][i]['peilv1'] + "</td>";
				str += "<td>" + m['tz'][i]['points'] + "</td>";
				str += "<td>" + m['tz'][i]['user'] + "</td>";
				str += "<td>" + m['tz'][i]['xtime'] + "</td>";
			if(xinfo==1){	
				if (melayer < (maxlayer - 1)) str += "<td>" + m['tz'][i]['duser'] + "</td>";
				for (j = melayer; j < maxlayer; j++) {
					str += "<td>" + m['tz'][i]['zc' + j] + "</td>";
					if (j != 0) {
						str += "<td>" + m['tz'][i]['peilv1' + j] + "</td>";
						str += "<td>" + m['tz'][i]['points' + j] + "</td>"
					}
				}}
				str += "</tr>"
			}
			
			$(".nowtb").prepend("<tr><td colspan=41>" + m['page'] + "</td></tr>");
			$(".nowtb").append(str);
			$(".nowtb a.page").click(function() {
				$(".sort").attr('page',Number($(this).html()));
				getnow()
			});
			str = null;
			m = null

		}
	})
}
function getb() {
	var gid = $("#game").val();
	$.ajax({
		type: 'POST',
		url: mulu + 'xxtz.php',
		dataType: 'json',
		data: 'xtype=getb&gid=' + gid,
		cache: false,
		success: function(m) {
			var ml = m.length;
			$(".bid").empty();
			$(".sid").empty();
			$(".cid").empty();
			str = "<option value=''>全部</option>";
			$(".bid").append(str);
			for (i = 0; i < ml; i++) {
				str = "<option value='" + m[i]['bid'] + "'>" + m[i]['name'] + "</option>";
				$(".bid").append(str)
			}
			getnow();
			str = null;
			m = null
		}
	})
}
function gets() {
	var bid = $(".bid").val();
	var gid = $("#game").val();
	$.ajax({
		type: 'POST',
		url: mulu + 'xxtz.php',
		dataType: 'json',
		data: 'xtype=gets&bid=' + bid + "&gid=" + gid,
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
			getnow();
			str = null;
			m = null
		}
	})
}
function getc() {
	var bid = $(".bid").val();
	var sid = $(".sid").val();
	var gid = $("#game").val();
	$.ajax({
		type: 'POST',
		url: mulu + 'xxtz.php',
		dataType: 'json',
		data: 'xtype=getc&bid=' + bid + "&sid=" + sid + "&gid=" + gid,
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
			getnow();
			str = null;
			m = null
		}
	})
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