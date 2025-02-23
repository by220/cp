function myready() {
	changeh(document.documentElement.scrollHeight + 100);
	$('#sdate').change(get).datepicker();
	$('#edate').change(get).datepicker();
	$('table.list tbody tr:not(.head)').hover(function() {
		$(this).addClass('hover');
	}, function() {
		$(this).removeClass('hover');
	});

	var pcount = Number($(".page_info").attr('pcount'));
	upage = Number($(".page_info").attr('upage'));
	var pstr = "<a class='prev'>前一页</a>『";
	for (i = 1; i <= pcount; i++) {
		if (i == upage) {
			pstr += "<span class='current' page='" + i + "'>&nbsp;" + i + "&nbsp;</span>"
		} else {
			pstr += "&nbsp;<a href='javascript:void(0)' class='p'>" + i + "</a>&nbsp;"
		}
	}
	pstr += "』<a class='next'>后一页</a>";
	$(".page_control").html(pstr);
	$(".page a").click(function() {
		if ($(this).hasClass('prev')) {
			upage -= 1
		} else if ($(this).hasClass('next')) {
			upage += 1
		} else {
			upage = Number($(this).html())
		}
		get()
	});
	$(".query").click(function() {
		get()
	});
	$("input.all").click(function() {
		if ($(this).prop("checked")) {
			$(".user_tb").find("input:checkbox").prop("checked", true);
		} else {
			$(".user_tb").find("input:checkbox").prop("checked", false);
		}
	});

	$("a.showxx").click(function() {
		var posi = $(this).position();
		var obj = $(this).parent().parent();
		var id = obj.find("input:checkbox").val();
		var uid = obj.attr("uid");
		var username = obj.find("td:eq(1)").html();
		var title = obj.find(".title").html();
		var content = obj.find(".title").next().html();
		var str = "<table class='data_table messtb'><tr><th>标题</th><td><input type='text' style='width:360px;' class='title' value='" + title + "'>&nbsp;<input type='button' class='s1' value='编辑'></td></tr><tr><th>内容</th><td><textarea cols='40' rows='8'>" + content + "</textarea></td></table>";
		dialog._show(username + "#" + title, str, {}, 480, posi.left + $(this).width() - 460, posi.top + 25);
		$(".messtb input:button").click(function() {
			var title = $(".messtb input:text").val();
			var content = $(".messtb textarea").val();
			if (title == '') {
				alert("标题不能为空!");
				return false;
			}

			$.ajax({
				type: 'POST',
				url: mulu + 'money',
				cache: false,
				data: 'xtype=xgmess&uid=' + uid + "&title=" + title + "&content=" + content + "&id=" + id,
				success: function(m) {

					if (Number(m) == 1) {
						alert("编辑成功!");
						dialog.close();
						get();
					}
				}
			});
		});
	});

	$("input#delselect").click(function() {
		delnotices();
	});
	$("a.del").click(function() {
		$("input:checkbox").prop("checked", false);
		$(this).parent().parent().find("input:checkbox").prop("checked", true);
		delnotices();
	});
}
var upage = 1;

function get() {
	var sdate = $('#sdate').val();
	var edate = $('#edate').val();
	var username = $("#usernames").val();
	window.location.href = "money?xtype=notices&sdate=" + sdate + "&edate=" + edate + "&upage=" + upage + "&username=" + username;
}

function delnotices() {
	if (!confirm("确定删除吗?")) return false;
	if ($("input.d:checked").length < 1) return false;
	var id = '';
	$("input.d").each(function() {
		if ($(this).prop("checked")) {
			id += '|' + $(this).val();
		}
	});
	$.ajax({
		type: 'POST',
		url: mulu + 'money',
		async: false,
		cache: false,
		data: 'xtype=delnotices&id=' + id,
		success: function(m) {
			if (Number(m) == 1) {
				alert("删除成功!");
				get();
			}
		}
	});
}