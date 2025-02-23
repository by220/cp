

function myready(){
    $("#clickall").click(function(){
	    if($(this).prop('checked')==true){							  
	       $(this).parent().parent().parent().find("input:checkbox").attr("checked",true);
		}else{
		   $(this).parent().parent().parent().find("input:checkbox").attr("checked",false);
		}
	});
	
	$("#delall").click(function(){
	     var idstr='|';
		 $(".s_tb").find("input:checkbox").each(function(){
			  if($(this).prop('checked')==true){
			      idstr += $(this).attr('value') + "|";
			  }
		 });
		 delbigclass(idstr);
	 });
	
	$(".delone").click(function(){
	     var idstr='|';
		 idstr += $(this).parent().parent().find("td:eq(1)").html();
		 idstr += '|';
		 delbigclass(idstr);
	 });
	
	$(".edit").click(function(){
		 var id = $(this).parent().parent().find("td:eq(1)").html();
         var name = $(this).parent().parent().find("td:eq(2)").html();
		 $("#bigclassid").val(id);
		 $("#bigclassname").val(name);
		 $("#action").val('edit');
		 $("#addbtn").val("修改");
		 var posi=$(this).position();
		 $(".addtb").css('left',posi.left+$(this).width()-150);
		 $(".addtb").css('top',posi.top+$(this).height());
		 $(".addtb").show();
	 });
	
	$("#add").click(function(){
	     $(".addtb").show();
		 $("#bigclassid").val('');
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
     var bigclassname=$("#bigclassname").val();
	 var bigclassid= $("#bigclassid").val();
	 var action = $("#action").val();
	 var actionname = $("#addbtn").val();
	 var str = "bigclassname="+bigclassname+'&bigclassid='+bigclassid+"&action="+action;
	 $.ajax({type:'POST',url:mulu + 'stock',data:'xtype=bigclassadd&'+str,success:function(m){
		  alert(m);
	      if(Number(m)==1){
		      alert(actionname+"成功");
			  window.location.href=window.location.href;
		  }
	 }});
}

function delbigclass(idstr){
	if(!confirm("确定删除吗？")){
		return false;
	}
     $.ajax({type:'POST',url:mulu + 'stock',data:'xtype=bigclassdel&id='+idstr,success:function(m){																					
	     if(Number(m)==1){
		      $(".s_tb tr").find("td:eq(1)").each(function(){
			      if(idstr.indexOf('|'+$(this).html()+'|')!=-1){
				      $(this).parent().remove();
				  }
			  });
		 }
	 }});
}