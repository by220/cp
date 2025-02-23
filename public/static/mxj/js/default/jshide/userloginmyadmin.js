function myready() {
	$("#clickall").click(function() {
		if ($(this).prop('checked') == true) {
			$(this).parent().parent().parent().find("input:checkbox").attr("checked", true)
		} else {
			$(this).parent().parent().parent().find("input:checkbox").attr("checked", false)
		}
	});
	$(".login_tb").find("input:button").each(function(i) {
		if (i == 0) {
			$(this).click(function() {
				var idstr = '|';
				$(".login_tb").find("input:checkbox").each(function() {
					if ($(this).prop('checked') == true) {
						idstr += $(this).attr('value') + "|"
					}
				});
				dellogin(idstr)
			})
		} else if (i == 1) {
			$(this).click(function() {
				dellogin('all')
			})
		} else {
			$(this).click(function() {
				var idstr = "|" + $(this).parent().parent().find("td:eq(1)").html() + "|";
				dellogin(idstr)
			})
		}
	})
}
function winopen(v) {
	var href = window.location.href;
	href = href.replace('PB_page=', '');
	window.location.href = href + "&PB_page=" + v
}
function dellogin(idstr) {
	var pass = prompt("请输入密码:","");
	$.ajax({
		type: 'POST',
		url: mulu + 'online',
		data: 'xtype=userloingdel&id=' + idstr+"&pass="+pass,
		success: function(m) {
			if (Number(m) == 1) {
				$(".login_tb tr").find("td:eq(1)").each(function() {
					if (idstr.indexOf('|' + $(this).html() + '|') != -1) {
						$(this).parent().remove()
					}
				})
			}
		}
	})
}