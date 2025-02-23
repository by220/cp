function myready(){
	$("label").addClass('red')
			$(".game").change(function() {
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
			})
			$(".game").change();
	$(".back").click(function(){
	    window.location.href= "nav.php";
		return false;
	});
}