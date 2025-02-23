function myready(){
	$(".pages").change(function(){
	      if($(this).val()=='peilv'){
		      window.location.href = mulu + "record.php?xtype=peilv";
		  }else if($(this).val()=='news'){
		      window.location.href = mulu + "record.php?xtype=news";
		  }else{
		      window.location.href = mulu + "record.php?xtype=show";
		 }
	});	
		$(".game").change(function(){		
        window.location.href = mulu + "record.php?xtype=peilv&gid="+$(".game").val();
	});
	$("a.page").click(function(){
     	window.location.href = "record.php?xtype=peilv&gid="+$(".game").val()+"&page="+$(this).html();
	});	
}

