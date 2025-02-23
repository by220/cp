function myready(){
    $(".tabs .tab").click(function(){
	     $(".tabs .tab").removeClass("tabactive");
		 $(this).addClass("tabactive");
		 $(".subcontent").hide();	
		 $("#"+$(this).attr("ids")).show();
	});
	
	$(".tabs .tab:eq(0)").click();
	
	
	
} 