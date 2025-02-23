$(function() {
	$("li.lib").click(function(){
	   window.location.href = mulu + "lib.php?xtype=lib";
		return false;
	});
	$("li.kj").click(function(){
	   window.location.href = mulu + "kj.php?xtype=kj";
		return false;
	});
	$("li.bao").click(function(){
	   window.location.href = mulu + "bao.php?xtype=bao";
		return false;
	});
	$(".back").click(function(){
	    window.location.href= "nav.php";
		return false;
	});
	$(".week").change(function(){
	    getbao();
	});
	$(".game").change(function(){
	    getbao();
	});
	$(".reback").click(function(){
	    $(".h-title").hide();
		$(".flytb").show();
		$(".xxtb").hide();
	});
	getbao();
});

function getbao() {

	var uid = 888;
	var gid = $("select.game").val();
	$(".flytb").show();
	$(".xxtb").hide();
	$(".h-title").hide();
	$.ajax({
		type: 'POST',
		url: 'bao.php',
		data: 'xtype=baofly&gid=' + gid+"&week="+$(".week").val(),
		dataType: 'json',
		success: function(m) {
			//alert(m);
			
			var ml = m.length;
			var str = '';
			var zzs = 0;
			var zje = 0;
			var yk = 0;
			var zyk = 0;
			for (i = 0; i < ml; i++) {
				str += "<tr date='" + m[i]['date1'] + "' >";
				str += "<td class='b2'>" + m[i]['date'] + "&nbsp;星期" + m[i]['week'] + "</td>";
				str += "<td class=b2><a href='javascript:void(0)'>" + m[i]['zs'] + "</a></td>";
				str += "<td class=b2><a href='javascript:void(0)'>" + m[i]['zje'] + "</a></td>";
				yk = getResult(Number(m[i]['zhong']) + Number(m[i]['points']) - Number(m[i]['zje']), 2);
				str += "<th class='b2 yk'>" + yk + "</th>";
				str += "</tr>";
				zyk += yk;
				zzs += Number(m[i]['zs']);

				zje += Number(m[i]['zje']);

			}
			str += "<tr>";
			str += "<th>合计</th>";
			str += "<td>" + zzs + "</td>";
			str += "<td>" + getResult(zje, 2) + "</td>";
			str += "<th class='yk'>" + getResult(zyk, 2) + "</th>";
			str += "</tr>";
			$(".flytb .con").html(str);
			str = null;
			m = null;
			baofunc();
			$(".flytb .b2").click(function() {
				baouser($(this).parent().attr('date'));
				$("#p_date").html($(this).parent().find("td:eq(0)").html());
				$(".h-title").show();
				return false
			})
		}
	})
}

function baofunc() {
	$(".con").unbind("mouseover").unbind("mouseout");
	$(".con").mouseover(function() {
		$(this).parent().find("td").addClass('over')
	}).mouseout(function() {
		$(this).parent().find("td").removeClass('over')
	});
	$(".yk").each(function() {
		if (Number($(this).html()) < 0) $(this).css('color', 'green')
	})
}
var tpage=1;
function baouser(date) {
    var gid =$(".game").val();
	var week = $(".week").val();
	$(".flytb").hide();
	$(".xxtb").show();
	var page = Number($("#page").val());
	var str = '&date=' + date + "&gid=" + gid + "&tpage=" + tpage+"&week="+week;
	$.ajax({
		type: 'POST',
		url: 'bao.php',
		data: 'xtype=baouser' + str ,
		//dataType: 'json',
		cache: false,
		success: function(m) {
			alert(m);return;
			var ml = m['tz'].length;
			var str = '';
			var zje = 0;
			var zshui = 0;
			var zyk = 0;
			var xzyk = 0;
			var zzhong = 0;
			var pagestr = '';
			
			var pcount = Number(m['pcount']);
			pagestr = "转到<select class='page sele'>";
			for (i = 1; i <= pcount; i++) {
				pagestr += "<option value='"+i+"' >";
				pagestr += i + "</option>"
			}
			pagestr += "</select>页";
			$(".pages").html(pagestr);pagestr=null;
		
			$(".page").val(tpage);
			var gid = 0;
			for (i = 0; i < ml; i++) {
				if (m['tz'][i]['gid'] == undefined) {
					str += "<tr>";
					str += "<th>["+ m['tz'][i-1]['gid']+"]小计</th>";
					str += "<td colspan=2></td>";
					str += "<th>" + m['tz'][i]['je'] + "</th>";					
					str += "<th>" + getResult(zyk, 2) + "</th>";
					str += "</tr>";
					zyk=0;
					continue
				}
				if (gid != m['tz'][i]['gid'] & m['tz'][i]['gid'] != undefined) {
					str += "<tr><th colspan=5 class='bt'>" + m['tz'][i]['gid'] + "</th></tr>"
				}
				str += "<TR z='" + m['tz'][i]['z'] + "'>";
				str += "<td>" + m['tz'][i]['qishu'] + "</td>";
				str += "<td>" + m['tz'][i]['time'] + "</td>";
				str += "<td class='z'>" + m['tz'][i]['wf'] ;
				if(m['tz'][i]['con']!='') str += ":"+m['tz'][i]['con'];
				str += '@'+ m['tz'][i]['abcd'] + "</td>";
				str += "<td>" + m['tz'][i]['je'] + " * <label class='blue'>"+m['tz'][i]['peilv']+"</label></td>";
				var yk = getResult(Number(m['tz'][i]['zhong']) + Number(m['tz'][i]['points']) - Number(m['tz'][i]['je']), 2);
				str += "<td class='yk'>" + yk + "</td>";
				zyk += yk;	
				xzyk += yk;			
				zje += Number(m['tz'][i]['je']);
				zshui += Number(m['tz'][i]['points']);
				zzhong += Number(m['tz'][i]['zhong']);
				str += "</TR>"
				gid = m['tz'][i]['gid']
			}
			str += "<tr><td>总计</td><td colspan=2></td><th>" + getResult(zje, 2) + "</th><th class='yk'>" + getResult(xzyk, 2) + "</th></tr>";
			$(".xxtb .con").html(str);
			$(".page").change(function() {
				tpage = Number($(".page").val())
				baouser(date);
				return false
			});
			str = null;
			m = null;
			$(".xxtb tr").each(function() {
				if ($(this).attr('z') == '1') {
					$(this).find("td").addClass('z1')
				} else if ($(this).attr('z') == '2') {
					$(this).find("td").addClass('he')
				} else if ($(this).attr('z') == '3') {
					$(this).find("td").addClass('z3')
				}
			});
			baofunc()
		}
	})
}
