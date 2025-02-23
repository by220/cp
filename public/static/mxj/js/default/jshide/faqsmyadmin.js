
function myready(){
    $("#clickall").click(function(){
	    if($(this).prop('checked')==true){							  
	       $(this).parent().parent().parent().find("input:checkbox").attr("checked",true);
		}else{
		   $(this).parent().parent().parent().find("input:checkbox").attr("checked",false);
		}
	});
	$(".news_tb").find("input:button").each(function(i){
	    if(i==0){
		     $(this).click(function(){
			     var idstr='|';
				 $(".news_tb").find("input:checkbox").each(function(){
					   if($(this).prop('checked')==true){
					      idstr += $(this).attr('value') + "|";
					   }
				 });
				 delnews(idstr);
			 });
		}
	});
	$(".news_tb").find(".delone").each(function(i){
	
		    $(this).click(function(){
			    var idstr = "|" + $(this).parent().parent().find("td:eq(1)").html() + "|";				
			    delnews(idstr);
		   });

	});
	
	$(".news_tb a").click(function(){
								  
		 $("#showcontent").toggle();						  
	     var posi=$(this).position();
		 $("#showcontent").css('top',posi.top+$(this).height());
		 $("#showcontent").css('left',posi.left);
		 $("#showcontent").html($(this).parent().find("span").html());
	 });
	$(".edit").click(function(){
	     var id=$(this).parent().parent().find("td:eq(1)").html();
		 $("#fid").val(id);
		 $("#ftitle").val($(this).parent().parent().find("a").html());
		 $("#content___Frame").find("#editor").html($(this).parent().parent().find("span").html());
		 $(this).parent().parent().find(".cedit").hide();
		 $(this).parent().parent().find(".edit").show();
		 $(this).hide();		 
		 $(this).parent().find(".cedit").show();
		 $("input:submit").val("修改");
	});
	
	$(".cedit").click(function(){
	    $("#fid").val('');
		$("#ftitle").val('');
		$(this).parent().parent().find(".cedit").hide();
		$(this).parent().parent().find(".edit").show();
		$("#content").val('');
		$("#content___Frame").find("#editor").html('');
		$("input:submit").val("增加");
	});
}

function delnews(idstr){
     $.ajax({type:'POST',url:mulu + 'faq',data:'xtype=newsdel&id='+idstr,success:function(m){
																					
	     if(Number(m)==1){
		      $(".news_tb tr").find("td:eq(1)").each(function(){
			      if(idstr.indexOf('|'+$(this).html()+'|')!=-1){
				      $(this).parent().remove();
				  }
			  });
		 }
	 }});
}