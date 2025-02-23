function myready(){
	changeh(document.documentElement.scrollHeight+500);
	$('#date').change(get).datepicker();    
	$("#game").change(function(){get();});
	$('table.list tbody tr:not(.head)').hover(function() {
		$(this).addClass('hover');
	}, function() {
		$(this).removeClass('hover');
	});
}
function get(){
   var gid = $("#game").val();
   var date= $("#date").val();
  window.location.href = mulu + "longs.php?gid="+gid+"&date="+date;
}

