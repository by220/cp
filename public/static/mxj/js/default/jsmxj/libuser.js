var tpage=1;
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
	var gid = Number($("select.game").val());
	if (gid != 100) {
		$(".libs").find("select").val('999');
	} else {
		$(".libs").find("select").val(gid);
	}
	$(".game").change(function(){
	    getlib();
	});
	getlib();
});

function getlib(){
	var gid = $("select.game").val();
	$.ajax({
		type: 'POST',
		url: 'lib.php',
		dataType: 'json',
		cache: false,
		data: "xtype=getlib&tpage=" + tpage + "&gid=" + gid,
		success: function(m) {
			var ml = m['lib'].length;
			var str = '';
			var je = 0;
			$(".con").empty();
			for (i = 0; i < ml; i++) {
				str += "<tr>";
				str += "<td>" + m['lib'][i]['gid'] + "</td>";
				str += "<td>" + m['lib'][i]['qishu'] + "</td>";
				str += "<td class='ccon'>";
				str += m['lib'][i]['wf'] + "@" + m['lib'][i]['abcd'];
				if (m['lib'][i]['content'] != '') str += ' : ' + m['lib'][i]['content'] + "</td>";
				str += "<td>" + m['lib'][i]['je'] + " * <label class='blue'>"+m['lib'][i]['peilv1']+"</lable></td>";				
				str += "<td>" + m['lib'][i]['time'] + "</td>";
				str += "</tr>";
				je += Number(m['lib'][i]['je'])
			}
	
			str += "<tr><td colspan=3 class='pages'></td><th>" + je + "/"+m['p'][3]+"</th><td></td></tr>";
			$(".con").append(str);

			var rcount = Number(m['p'][0]);
			var psize = Number(m['p'][2]);
			//tpage = Number(m['p'][1]);
			var pcount = rcount % psize == 0 ? rcount / psize : (rcount - rcount % psize) / psize + 1;
			if(pcount>1){
			var pagestr = "转到<select class='page sele' >";
			for (i = 1; i <= pcount; i++) {
				pagestr += "<option value='"+i+"'>";
				pagestr += i + "</option>"
			}
			pagestr += "</select>";
			

			$(".pages").html(pagestr);

			$(".page").val(tpage);
			$(".page").change(function() {
				tpage = Number($(this).val());
				getlib();
				return false;
			})
			}

			str = null;
			m = null;
			pagestr=null;
			$(".con tr").click(function() {
				$(this).toggleClass('byellow');
				return false
			})
		}
	})
}