
function myready(){
    $(".data_table tr").mouseover(function(){$(this).addClass('hover')}).mouseout(function(){$(this).removeClass('hover')});	
    $("#clickall").click(function(){
		
	    if($(this).prop('checked')==true){							  
	       $(".news_tb input.chk").prop("checked",true);
		}else{
		   $(".news_tb input.chk").prop("checked",false);
		}
	});
	$(".news_tb").find("input.dels").each(function(i){
	    if(i==0){
		     $(this).click(function(){
			     var idstr='|';
				 $(".news_tb").find("input.chk").each(function(){
					   if($(this).prop('checked')==true){
					      idstr += $(this).attr('value') + "|";
					   }
				 });
				 delnews(idstr);
			 });
		}else{			
		    $(this).click(function(){
			    var idstr = "|" + $(this).parent().parent().find("input.chk").val() + "|";				
			    delnews(idstr);
		   });
		}
	});
	$(".news_tb").find("input.edit").click(function(i){
		if($(this).parent().parent().find(".ifok").prop("checked")==true){
			var ifok= 1;
		}else{
		    var ifok= 0;
		}

		
		if($(this).parent().parent().find(".gundong").prop("checked")==true){
			var gundong= 1;
		}else{
		    var gundong= 0;
		}
		if($(this).parent().parent().find(".alert").prop("checked")==true){
			var aler= 1;
		}else{
		    var aler= 0;
		}
		if($(this).parent().parent().find(".cs").prop("checked")==true){
			var cs= 1;
		}else{
		    var cs= 0;
		}
		var agent = $(this).parent().parent().find(".agent").val();
		var wid = $(this).parent().parent().find(".wid").val();
		var id =$(this).parent().parent().find("td:eq(1)").html();
		var con = $(this).parent().parent().find(".con").val();
		var time = $(this).parent().parent().find(".time").val();
		
        $.ajax({type:'POST',url:mulu + 'news',data:'xtype=newsedit&id='+id+"&ifok="+ifok+"&agent="+agent+"&gundong="+gundong+"&alert="+aler+"&wid="+wid+"&cs="+cs+"&con="+con+"&time="+time,success:function(m){		
					if(Number(m)==1){
						window.location.href=window.location.href;
					}																						   
		
		}});
	});						   
}

function delnews(idstr){
     $.ajax({type:'POST',url:mulu + 'news',data:'xtype=newsdel&id='+idstr,success:function(m){									  		 window.location.href=window.location.href;
	 }});
}