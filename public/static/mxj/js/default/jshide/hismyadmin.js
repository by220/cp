function myready() {
	changeh(document.documentElement.scrollHeight+500);
	$(".data_table tr").mouseover(function(){$(this).addClass('hover')}).mouseout(function(){$(this).removeClass('hover')});
	$(".deldate").click(function() {
		//WdatePicker();
	});
	$("."+page).addClass('selected');
	$(".pages a").click(function() {
		if ($(this).attr('class') == 'show') {
			window.location.href = "history?xtype=show"
		} else if ($(this).attr('class') == 'useredit') {
			window.location.href = "history?xtype=useredit"
		} else if ($(this).attr('class') == 'adminedit') {
			window.location.href = "history?xtype=adminedit"
		} else if ($(this).attr('class') == 'agentpeilv') {
			window.location.href = "history?xtype=agentpeilv"
		} else if ($(this).attr('class') == 'adminpeilv') {
			window.location.href = "history?xtype=adminpeilv"
		}
		return true
	});

	$("a.page").click(function() {
		//window.location.href = "history?xtype=" + $(".pages a.selected").attr('page') + "&page=" + $(this).html()+ "&gid=" + $(".game").val();
	});
	$("select").change(function() {
		if($(this).hasClass('game')){
		  window.location.href = mulu + "history?xtype=" + $(".pages a.selected").attr('page') + "&PB_page=" + 1 + "&gid=" + $(".game").val();
		}else{
		  window.location.href = mulu + "history?xtype=" + $(".pages a.selected").attr('page') + "&PB_page=" + $(this).val()+ "&gid=" + $(".game").val();	
		}
	});
	
	$("#clickall").click(function() {
		if ($(this).prop('checked') == true) {
			$(this).parent().parent().parent().parent().find("input:checkbox").attr("checked", true)
		} else {
			$(this).parent().parent().parent().parent().find("input:checkbox").attr("checked", false)
		}
	});
	$("#delselect").click(function() {
		dellogin(1)
	});
	$(".delone").click(function() {
		$("input:checkbox").attr("checked", false);
		$(this).parent().parent().find("input:checkbox").attr("checked", true);
		dellogin(0)
	});
	$(".del").click(function() {
		dellogin('date')
	})
}
function getid() {
	var i = 0;
	var idarr = '[';
	$(".nrtb").find("input:checkbox").each(function() {
		if ($(this).prop('checked') == true && !isNaN($(this).val())){
			if (i > 0) idarr += ','
			idarr += '"' + $(this).val() + '"';
			i++
		}
	});
	idarr += ']';
	return idarr
}
function dellogin(val) {
	if (val == 'date') {
		var idarr = $(".deldate").val() + "&type=date"
	} else {
		var idarr = getid()
	}
	var pass = prompt("请输入密码:","");
	$.ajax({
		type: 'POST',
		url: mulu + 'history',
		data: 'xtype=del' + $(".pages a.selected").attr('page') + '&id=' + idarr+"&pass="+pass,
		success: function(m) {
			if (Number(m) == 1) {
				window.location.href = "history?xtype=" +  $(".pages a.selected").attr('page') + "&gid=" + $(".game").val() + "&page=" + 1
			}
		}
	})
}