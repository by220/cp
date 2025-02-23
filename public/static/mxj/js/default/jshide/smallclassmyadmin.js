

function myready(){
    $("#clickall").click(function(){
	    if($(this).prop('checked')==true){							  
	       $(this).parent().parent().parent().find("input:checkbox").attr("checked",true);
		}else{
		   $(this).parent().parent().parent().find("input:checkbox").attr("checked",false);
		}
	});
	$(".bigclassid").change(function(){
         var bid=$(this).val();
		 var href=window.location.href;
		 href=href.replace('bid=','');

		 window.location.href=href+'&bid='+bid;
	});
	
	$("#delall").click(function(){
	     var idstr='|';
		 $(".s_tb").find("input:checkbox").each(function(){
			  if($(this).prop('checked')==true){
			      idstr += $(this).attr('value') + "|";
			  }
		 });
		 delsmallclass(idstr);
	 });
	
	$(".delone").click(function(){
	     var idstr='|';
		 idstr += $(this).parent().parent().find("td:eq(1)").html();
		 idstr += '|';
		 delsmallclass(idstr);
	 });
	
	$(".edit").click(function(){
		 var id = $(this).parent().parent().find("td:eq(1)").html();
         var name = $(this).parent().parent().find("td:eq(3)").html();

		 var bid = $(this).parent().parent().find("td:eq(2)").attr("bid");
		 $("#bigclassid").val(bid);

		 $("#smallclassid").val(id);
		 $("#smallclassname").val(name);
		 $("#action").val('edit');
		 $("#addbtn").val("修改");
		 var posi=$(this).position();
		 $(".addtb").css('left',posi.left+$(this).width()-150);
		 $(".addtb").css('top',posi.top+$(this).height());
		 $(".addtb").show();
	 });
	
	$("#add").click(function(){
	     $(".addtb").show();
		 $("#smallclassid").val('');
		 $("#smallclassname").val('');
		 $("#action").val('add');
		 $("#addbtn").val("添加");
		 var posi=$(this).position();
		 $(".addtb").css('left',posi.left+$(this).width()-150);
		 $(".addtb").css('top',posi.top+$(this).height());
	});
	$("#closebtn").click(function(){
	     $(".addtb").hide();
	});
	$("#addbtn").click(function(){
        sendvalue();
	});
}

function sendvalue(){
     var smallclassname=$("#smallclassname").val();
	 var smallclassid= $("#smallclassid").val();
	 var bigclassid= $("#bigclassid").val();
	 var action = $("#action").val();
	 var actionname = $("#addbtn").val();
	 var str = "smallclassname="+smallclassname+'&smallclassid='+smallclassid+"&action="+action+"&bigclassid="+bigclassid;
	 $.ajax({type:'POST',url:mulu + 'stock',data:'xtype=smallclassadd&'+str,success:function(m){
	      if(Number(m)==1){
		      alert(actionname+"成功");
			  window.location.href=window.location.href;
		  }
	 }});
}

function delsmallclass(idstr){
	if(!confirm("确定删除吗？")){
		return false;
	}
     $.ajax({type:'POST',url:mulu + 'stock',data:'xtype=smallclassdel&id='+idstr,success:function(m){																					
	     if(Number(m)==1){
		      $(".s_tb tr").find("td:eq(1)").each(function(){
			      if(idstr.indexOf('|'+$(this).html()+'|')!=-1){
				      $(this).parent().remove();
				  }
			  });
		 }
	 }});
}