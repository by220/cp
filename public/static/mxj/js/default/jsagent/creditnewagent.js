function myready() {
	$(".game_class a").click(function() {
		var gid = $(this).attr('gid');
		$(".gametr").hide();
		$("tr.g" + gid).show();
		$(".game_class a").removeClass('selected');
		$(this).addClass("selected")
	});
	$(".game_class a:eq(0)").click();
	$(".editpan").click(function() {
		var pan = $(".add_tb .pan").val();
		$.ajax({
			type: 'POST',
			url: mulu + 'account',
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
			url: mulu + 'account',
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