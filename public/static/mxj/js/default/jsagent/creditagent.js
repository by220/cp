function myready() {
	changeh(document.documentElement.scrollHeight + 500);
	$("#game").change(function() {
		var gid = $(this).val();
		if (gid == 'all') {
			$(".gametr").show();
			return
		}
		$(".gametr").each(function(i) {
			if ($(this).attr('gid') == gid) {
				$(this).show()
			} else {
				$(this).hide()
			}
		})
	});
	$(".gametr").each(function(i) {
		if ($(this).attr('gid') == ngid) {
			$(this).show()
		} else {
			$(this).hide()
		}
	});
	$("#game").val(ngid);
	$(".editpan").click(function() {
		var pan = $(".add_tb .pan").val();
		$.ajax({
			type: 'POST',
			url: mulu + 'account.php',
			data: "xtype=changepan&pan=" + pan,
			success: function(m) {
				if (Number(m) == 1) {
					alert("ok")
				}
			}
		});
		return false
	});
	$(".editgid").click(function() {
		var gid = $("select.gametype").val();
		$.ajax({
			type: 'POST',
			url: mulu + 'account.php',
			data: "xtype=changegid&gid=" + gid,
			success: function(m) {
				if (Number(m) == 1) {
					alert("ok")
				}
			}
		});
		return false
	})
}