function myready(){  
    $(".page_control a").click(function(){
		var tpage = Number($(".page_control span").html());
		var pcount = Number($(".page_control").attr('pcount'));
		if($(this).hasClass("previous")){
			if(tpage<=1) return false;
			tpage--;
		}else if($(this).hasClass("next")){
			if(tpage>=pcount) return false;
			tpage++;
		}else{
		    tpage= Number($(this).html());
		}
		window.location.href = "member?xtype=notices&tpage="+tpage;
	});
	
	$(".ui-icon-closethick").click(function(){
	    $(".newsxx").hide();
	});
	$("a.xiangqing").click(function(){
		var obj =$(this).parent().parent();
		var posi = $(".account-content").position();
		dialog._show(obj.find("td:eq(1)").html(), obj.find("td:eq(2)").html(), {}, 580, 100, posi.top);
		 if(Number(obj.attr("du"))==0){
		$.ajax({
			type: 'POST',
			url: mulu + 'member',
			cache: false,
			async: false,
			data: 'xtype=chdu&id='+obj.attr("id"),
			success: function(m) {
				if(Number(m)==1){
				     obj.removeClass("chu");
				}
			}
		});
		 }
	});
} 
