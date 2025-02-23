
function myready(){
    $("#clickall").click(function(){
	    if($(this).prop('checked')==true){							  
	       $(this).parent().parent().parent().find("input:checkbox").attr("checked",true);
		}else{
		   $(this).parent().parent().parent().find("input:checkbox").attr("checked",false);
		}
	});
	$(".m_tb").find("input:button").each(function(i){
	    if(i==0){
		     $(this).click(function(){
			     var idstr='|';
				 $(".m_tb").find("input:checkbox").each(function(){
					   if($(this).prop('checked')==true){
					      idstr += $(this).attr('value') + "|";
					   }
				 });
				 dellogin(idstr);
			 });
		}
	});
	$(".m_tb").find(".delone").each(function(i){			
		    $(this).click(function(){
			    var idstr = "|" + $(this).parent().parent().find("td:eq(1)").html() + "|";				
			    dellogin(idstr);
		   });
	});
	
	$(".response").click(function(){
		$("#responsediv").toggle();						  
	    var posi=$(this).position();
		$("#responsediv").css('top',posi.top+$(this).height()); 
		$("#responsediv").css('left',posi.left+$(this).width()-$("#responsediv").width());
		$("#messageid").val($(this).parent().parent().find("td:eq(1)").html());
		$("#response").html($(this).parent().parent().find("td:eq(4)").html());
		 
	});
	
	$("#sendbtn").click(function(){
		 var message=$("#response").html();
		 var id=$("#messageid").val();
	     $.ajax({type:'POST',url:mulu + 'message',data:'xtype=response&message='+message+"&id="+id,success:function(m){
		      if(Number(m)==1){
			      window.location.href=window.location.href;
			  }
		 }});
	});
}

function winopen(v){
     var href=window.location.href;
	 href=href.replace('PB_page=','');
	 window.location.href=href+"&PB_page="+v;
}

function dellogin(idstr){
;
     $.ajax({type:'POST',url:mulu + 'message',data:'xtype=mdel&id='+idstr,success:function(m){
		
	     if(Number(m)==1){
		      $(".m_tb tr").find("td:eq(1)").each(function(){
			      if(idstr.indexOf('|'+$(this).html()+'|')!=-1){
				      $(this).parent().remove();
				  }
			  });
		 }
	 }});
}