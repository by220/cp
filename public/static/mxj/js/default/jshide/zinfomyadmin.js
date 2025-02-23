function myready(){
  $(".zinfotb select").change(function(){
	  var qs = $(this).val();
	  window.location.href="zinfo?xtype=show&qishu="+qs;
	  return;
  });
}