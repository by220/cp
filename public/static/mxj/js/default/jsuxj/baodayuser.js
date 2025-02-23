var page=1;
var pcount = 1;
function myready(){
   page = Number($(".page_info").attr('tpage'));
   var rcount =Number($(".page_info").attr("rcount"));
   var psize = Number($(".page_info").attr("psize"));
   pcount = rcount%psize==0 ? rcount/psize : ((rcount-rcount%psize)/psize)+1;
   $(".page_count").html("共 "+pcount+" 页");
     var str='';
      var j=0;
      if(page>2){
        j=-2;
      }
      for ( ; j < 5; j++) {
        if(page+j>pcount) break;
        if (j == 0) {
          str += " <span class='current red'>" + (page+j) + "</span> "
        } else {
          str += " <a href='javascript:void(0);'>" + (page+j) + "</a> "
       }
     }

   $(".current").replaceWith(str);
   $(".page_info a").click(function(){
      if($(this).hasClass('next')){
	     page++;
	  }else if($(this).hasClass('previous')){
	     page--;
	  }else{
	     page= Number($(this).html());
	  }
	 
	  if(isNaN(page) | page<1 | page%1!=0 | page>pcount)  return false;
	  var date = $(".title").attr('date');
	 window.location.href = mulu + "baoday?xtype=show&tpage="+page+"&date="+date;
	  return false;
   });
   
   $(".list tr").hover(function(){$(this).find("td").addClass("hover")},function(){$(this).find("td").removeClass("hover")});
   $("td.result").each(function(){
       if(Number($(this).html())<0) $(this).css('color','red');
   });
}