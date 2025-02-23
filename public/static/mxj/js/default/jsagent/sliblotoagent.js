var melayer = Number($("#topid").attr('layer'));
var toplayer = Number($("#topid").attr('layer'));
var topid = Number($("#topid").val());
var rtime = Number($("#reloadtime").val());

function myready() {
	$(".user").find("option:first").html("选择" + layername[layer]);
	$("label").addClass('red');
	$(".winprint").click(function() {
		window.print()
	});
	$(".download").click(function() {
		var qishu = $("#qishu").val();
		$("#downfrm").attr('src', "nowloto.php?xtype=download&qishu=" + qishu)
	});
	addchange();
	$("#reload").click(function() {
	    parent.location.href='admin.php?xtype=show';
		//getnow()
	});
	$(".nowtb .bt").append("<th>所属"+layername[toplayer]+"</th>");
	$(".lastxx input:button").click(function(){$(".lastxx").hide()});
	getnow()
}
function addchange() {
	$(".user").unbind("change");
	$(".user").change(function() {
		layer = Number($(this).attr('layer'));
		var uid = $(this).val();
		var ifagent = $(this).find("option:selected").attr("ifagent");
		createson(layer, uid, ifagent)
	})
}
function createson(layer, uid, ifagent) {

	if (layer==(maxlayer-1)) {
		$("#saveuserid").val(uid);
		getnow();
		return false
	}
	if (uid == '') {
		$(".user").each(function() {
			if (Number($(this).attr('layer')) > layer) {
				$(this).remove()
			}
		});
		if (layer == 1) {
			$("#saveuserid").val($("#topid").val())
		} else {
			$(".user").each(function() {
				if (Number($(this).attr('layer')) == layer) {
					$("#saveuserid").val($(this).val())
				}
			})
		}
		getnow()
	} else {
		$(".user").each(function() {
			if (Number($(this).attr('layer')) > layer) {
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
				var str = "<select class=user layer=" + (layer + 1) + ">";
				str += "<option value=''>选择" + layername[layer] + "</option>";
				var mlength = m.length;
				for (i = 0; i < mlength; i++) {
					str += "<option value='" + m[i]['userid'] + "' ifagent='" + m[i]['ifagent'] + "' wid=''>" + m[i]['username'] + "</option>"
				}
				str += "</select>";
				$(".user").parent().append(str);
				addchange()
			}
		});
		getnow()
	}
}
function getnow(){
var puserid = $("#saveuserid").val();
	var qishu = $("#qishu").val();
	$(".nowtb tr").each(function(){
	    if(!$(this).hasClass('bt')){
		    $(this).remove();
		}
	});
	$.ajax({
		type: 'POST',
		url: mulu + 'nowloto.php',
		data: 'xtype=getnow&puserid=' + puserid + "&psize=" + psize + "&page=" + page + "&qishu=" + qishu ,
		dataType: 'json',
		cache: false,
		success: function(m) {
			var ml = m['tz'].length;
			var str = '';
			for (i = 0; i < ml; i++) {
				str += "<tr class='nr' uid='"+m['tz'][i]['uid']+"'>";
				str += "<td>" + (i+1) + "</td>";
				str += "<td >" + m['tz'][i]['user'] + "</td>";
				str += "<td>" + m['tz'][i]['zs'] + "</td>";
				str += "<td>" + m['tz'][i]['je'] + "</td>";
	            str += "<td>" + m['tz'][i]['time'] + "</td>";
				str += "<td>" + m['tz'][i]['topuser'] + "</td>";
				str += "</tr>"
			}
			$(".nowtb").prepend("<tr><td colspan=6>" + m['page'] + "</td></tr>");
			$(".nowtb").append(str);
			$(".nowtb label").addClass('red');
			$(".nowtb a.page").click(function() {
				 page = Number($(this).html());							  
				 getnow();
			});
			$(".nowtb tr.nr").click(function(){
			      var uid = $(this).attr('uid');
				  nrclick($(this));
			});
			str = null;
			m = null
		}
	})

}

function nrclick(obj){
	var posi = obj.position();
	$(".lastxx").css("left", posi.left);
	$(".lastxx").css("top", posi.top + 30);
	$(".lastxx").show();
	$(".lastxx tr").each(function(i) {
		if (i > 1) $(this).remove();
	});
	var uid = obj.attr('uid');
	var user = obj.find("td:eq(1)").html();
	var qishu = $("#qishu").val();
	$.ajax({
		type: 'POST',
		url: mulu + 'nowloto.php',
		data: 'xtype=getnowxx&uid=' + uid + "&psizes=" + psizes + "&pages=" + pages + "&qishu=" + qishu ,
		dataType: 'json',
		cache: false,
		success: function(m) {
			//$("#test").html(m);return;
			var pc = Number(m['p']);
			var str = '';
			for (i = 1; i <= pc; i++) {
				str += "<a href='javascript:void(0);'";
				if(i==pages) str += " class='red' ";
				str += " >" + i + "</a>";
			}
			$(".lastxx td:eq(1)").html(str);
			var ml = m['con'].length;
			var str = '';
            
			for (i = 0; i < ml; i++) {
				str += "<tr>";
				str += "<td>" + user + "</td>";
				str += "<td>" + (i + 1 + (pages-1) * psizes) + "</td>";
				str += "<td class='t' >" + m['con'][i]['con'] + "</td>";
				str += "<td>" + m['con'][i]['time'] + "</td>";
				str += "</tr>";

			}
			$(".lastxx").append(str);
			$(".lastxx a").click(function() {
				pages = Number($(this).html());
				nrclick(obj);
			});
		
		}});
}

function getnows(page) {
	return;
	
	var psize = $("#psize").val();

	var bid = $("#bid").val();
	var cid = $("#cid").val();
	var sid = $("#sid").val();
	var minje = $("#minje").val();
	if (page == '' | page == undefined) page = 1;
	$(".nowtb tr").each(function(i) {
		if (!$(this).hasClass('bt')) $(this).remove()
	});
	if (puserid == '') {
		puserid = $("#topid").val()
	}
	$.ajax({
		type: 'POST',
		url: mulu + 'now.php',
		data: 'xtype=getnow&puserid=' + puserid + "&psize=" + psize + "&page=" + page + "&qishu=" + qishu + "&minje=" + minje + "&bid=" + bid + "&cid=" + cid + "&sid=" + sid,
		dataType: 'json',
		cache: false,
		success: function(m) {
			var ml = m['tz'].length;
			var str = '';
			for (i = 0; i < ml; i++) {
				str += "<tr>";
				str += "<td>" + m['tz'][i]['qishu'] + "</td>";
				str += "<td>" + m['tz'][i]['tid'] + "</td>";
				str += "<td>" + m['tz'][i]['xtype'] + "</td>";
				str += "<td>" + m['tz'][i]['bid'] + "-" + m['tz'][i]['cid'] + "-" + m['tz'][i]['pid'] + "</td>";
				str += "<td>" + m['tz'][i]['abcd'] + "</td>";
				str += "<td>" + m['tz'][i]['ab'] + "</td>";
				str += "<td class=con>" + m['tz'][i]['con'] + "</td>";
				str += "<td><label>" + m['tz'][i]['zcje'] + "</label>/" + m['tz'][i]['je'] + "</td>";
				if (m['tz'][i]['pidx'] != '23379231' & m['tz'][i]['pidx'] != '23379233') {
					str += "<td>" + m['tz'][i]['peilv1'] + "</td>"
				} else {
					str += "<td>" + m['tz'][i]['peilv1'] + "/" + m['tz'][i]['peilv2'] + "</td>"
				}
				str += "<td>" + m['tz'][i]['points'] + "</td>";
				str += "<td>" + m['tz'][i]['user'] + "</td>";
				str += "<td>" + m['tz'][i]['xtime'] + "</td>";
				if (melayer < 5) str += "<td>" + m['tz'][i]['duser'] + "</td>";
				for (j = melayer; j < 6; j++) {
					str += "<td>" + m['tz'][i]['zc' + j] + "</td>"
				}
				str += "</tr>"
			}
			$(".nowtb").prepend("<tr><td colspan=19>" + m['page'] + "</td></tr>");
			$(".nowtb").append(str);
			$(".nowtb label").addClass('red');
			$(".nowtb a.page").click(function() {
				getnow(Number($(this).html()))
			});
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