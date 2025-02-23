function myready() {
	changeh(document.documentElement.scrollHeight + 500);
	$(".game_class a.g" + gid).addClass("selected");
	$(".game_class a").click(function() {
		window.location.href = "cssz.php?xtype=show&gid=" + $(this).attr('gid')
	});
	$(".data_table td").mouseover(function() {
		$(this).parent().addClass("hover")
	}).mouseout(function() {
		$(this).parent().removeClass("hover")
	});
	$(".send").click(function() {
		var str = '';
		var flag = true;
		$("input:text").each(function() {
			str += '&' + $(this).attr('id') + "=" + $(this).val();
			if ((Number($(this).val()) * 1000) % 1 != 0) {
				flag = false
			}
		});
		if (!flag) {
			alert("请输入数字,支持3位小数!");
			return false
		}
		$.ajax({
			type: 'POST',
			url: mulu + 'cssz.php',
			data: 'xtype=setcssz' + str,
			success: function(m) {
				if (Number(m) == 1) {
					alert("修改成功");
					window.location.href = window.location.href
				}
			}
		})
	});
	$(".yiwotongbu").click(function() {
		if (!confirm("确定以我同步吗？")) return false;
		var gid = $(".game_class a.selected").attr('gid');
		$.ajax({
			type: 'POST',
			url: mulu + 'cssz.php',
			data: 'xtype=yiwotongbucssz&gid=' + gid,
			success: function(m) {
				if (Number(m) == 1) {
					alert("同步成功");
					window.location.href = window.location.href
				}
			}
		})
	});
	$("input.all").click(function() {
		if ($(this).prop("checked")) {
			$("tr").find("input:checkbox:eq(0)").attr("checked", true)
		} else {
			$("tr").find("input:checkbox:eq(0)").attr("checked", false)
		}
	});
	$("input.pantb").click(function() {
		$(this).parent().parent().find("input:text").each(function(i) {
			var val = $(this).val();
			$("tr.nr").each(function() {
				if ($(this).find("input:checkbox:eq(0)").prop("checked")) {
					$(this).find("input:text:eq(" + i + ")").val(val)
				}
			})
		})
	})
}