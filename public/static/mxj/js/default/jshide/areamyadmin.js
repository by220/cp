

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
		 delarea(idstr);
	 });
	
	$(".delone").click(function(){
	     var idstr='|';
		 idstr += $(this).parent().parent().find("td:eq(1)").html();
		 idstr += '|';
		 delarea(idstr);
	 });
	
	$(".edit").click(function(){
		 var id = $(this).parent().parent().find("td:eq(1)").html();
         var name = $(this).parent().parent().find("td:eq(2)").html();
		 var code = $(this).parent().parent().find("td:eq(3)").html();
		 $("#areaid").val(id);
		 $("#code").val(code);
		 $("#areaname").val(name);
		 $("#action").val('edit');
		 $("#addbtn").val("修改");
		 var posi=$(this).position();
		 $(".addtb").css('left',posi.left+$(this).width()-150);
		 $(".addtb").css('top',posi.top+$(this).height());
		 $(".addtb").show();
	 });
	
	$("#add").click(function(){
	     $(".addtb").show();
		 $("#areaid").val('');
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
     var areaname=$("#areaname").val();
	 var areaid= $("#areaid").val();
	 var action = $("#action").val();
	 var code= $("#code").val();
	 var actionname = $("#addbtn").val();
	 var str = "areaname="+areaname+'&areaid='+areaid+"&action="+action+"&code="+code;
	 $.ajax({type:'POST',url:mulu + 'stock',data:'xtype=areaadd&'+str,success:function(m){
	      if(Number(m)==1){
		      alert(actionname+"成功");
			  window.location.href=window.location.href;
		  }
	 }});
}

function delarea(idstr){
	if(!confirm("确定删除吗？")){
		return false;
	}
     $.ajax({type:'POST',url:mulu + 'stock',data:'xtype=areadel&id='+idstr,success:function(m){																					
	     if(Number(m)==1){
		      $(".s_tb tr").find("td:eq(1)").each(function(){
			      if(idstr.indexOf('|'+$(this).html()+'|')!=-1){
				      $(this).parent().remove();
				  }
			  });
		 }
	 }});
}