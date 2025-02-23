function myready(){
   $(".list tr").hover(function(){$(this).find("td").addClass("hover")},function(){$(this).find("td").removeClass("hover")});
   $(".result").each(function(){
       if(Number($(this).html())<0) $(this).css('color','red');
   });
   $(".list tbody tr a").click(function(){
       var date = $(this).parent().parent().attr('date');
	  window.location.href = mulu + "baoday?xtype=show&tpage=1&date="+date;
   });
}