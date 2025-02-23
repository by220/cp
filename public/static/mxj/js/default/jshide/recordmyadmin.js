function myready(){
	alert(document.documentElement.scrollHeight+500);
	$(".pages").change(function(){
	      if($(this).val()=='peilv'){
		      window.location.href = mulu + "record?xtype=peilv";
		  }else if($(this).val()=='news'){
		      window.location.href = mulu + "record?xtype=news";
		  }else{
		      window.location.href = mulu + "record?xtype=show";
		 }
	});	
		$(".game").change(function(){		
        window.location.href = mulu + "record?xtype=show&gid="+$(".game").val();
	});
	$("a.page").click(function(){
     	window.location.href = "record?xtype=show&gid="+$(".game").val()+"&page="+$(this).html();
	});	
	changeh(document.documentElement.scrollHeight+500);;
}

