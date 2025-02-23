function myready() {
	changeh(document.documentElement.scrollHeight+500);
	$(".data_table tr").mouseover(function(){$(this).addClass('hover')}).mouseout(function(){$(this).removeClass('hover')});
	$(".deldate").click(function() {
		//WdatePicker();
	});
	

	$("select").unbind("change");
	$("select").change(function() {
		window.location.href = "fly?xtype=flylist&PB_page=" + $(this).val();	
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
function winopen(){
	return false;
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

	$.ajax({
		type: 'POST',
		url: mulu + 'fly',
		data: 'xtype=dflylist&id=' + idarr,
		success: function(m) {
			if (Number(m) == 1) {
				window.location.href = "fly?xtype=flylist&page=" + 1
			}
		}
	})
}