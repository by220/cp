
var ipcount=0;
function myready(){
    $("#clickall").click(function(){
	    if($(this).prop('checked')==true){							  
	       $(this).parent().parent().parent().find("input:checkbox").attr("checked",true);
		}else{
		   $(this).parent().parent().parent().find("input:checkbox").attr("checked",false);
		}
	});
	
	$(".on_tb td").mouseover(function(){
	     $(this).parent().addClass('hover');
	}).mouseout(function(){
	     $(this).parent().removeClass('hover');
	})
	$(".on_tb").find("input:button").each(function(i){
	    if(i==0){
		     $(this).click(function(){
			     var idstr='|';
				 $(".on_tb").find("input:checkbox").each(function(){
					   if($(this).prop('checked')==true){
					      idstr += $(this).attr('value') + "|";
					   }
				 });
				 dellogin(idstr);
			 });
		}else{
			
		    $(this).click(function(){
			    var idstr = "|" + $(this).parent().parent().find("input:checkbox").val() + "|";				
			    dellogin(idstr);
		   });
		}
	});
	
	$("a.page").click(function(){
		var type = $("td.click").attr('type');
     	window.location.href = "online.php?xtype=show&page="+$(this).html()+"&type="+type;
	});	
	$("td.type").click(function(){
	   window.location.href = mulu + "online.php?xtype=show&page=1&type="+$(this).attr('type');
	});
	


}

function dellogin(idstr){

     $.ajax({type:'POST',url:mulu + 'online.php',data:'xtype=dellogin&id='+idstr,success:function(m){
												   
	     if(Number(m)==1){
		      $(".on_tb tr").find("input:checkbox").each(function(){
			      if(idstr.indexOf('|'+$(this).val()+'|')!=-1){
				      $(this).parent().parent().remove();
				  }
			  });
		 }
	 }});
}