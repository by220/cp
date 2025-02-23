
function myready(){
	addchange();
	$("#set").click(function(){
	    var uid=$("#saveuserid").val();
		var je = $("#je").val();
		if(Number(je)>9999) je= '9999';
		if(Number(je)==NaN) je='0000';
		var q;
		$("input:checkbox").each(function(){
	        if($(this).prop("checked")==true){
			   q += $(this).val();
			}
		});
		var str= "&uid="+uid+"&je="+je+"&qishu="+q;
		$.ajax({type:'POST',url:mulu + 'play',data:'xtype=setm2'+str,success:function(m){
			if(Number(m)==1){
		            alert("设置成功");	
		 	}
		 
		}});
		
	
	});
}
var thislayer=6;

var level=new Array("公司","大股东","股东","总代","代理","会员");
function addchange(){
   $(".user").unbind("change");
   $(".user").change(function(){
		layer=Number($(this).attr('layer'));					  
        var uid=$(this).val();
		createson(layer,uid);
   });
}

function createson(layer,uid){
   	
   if(layer==thislayer) {
	   $("#saveuserid").val(uid);
	   $("label").html($("select:last").find("option:selected").text());
	   
	   return false;	
   }
   if(uid==''){
	  $(".user").each(function(){
	      if(Number($(this).attr('layer'))>layer){
		     $(this).remove();
		  }

	  });		  
	  if(layer==1){
		   $("#saveuserid").val($("#topid").val());
	  }else{
	     $(".user").each(function(){
		     if(Number($(this).attr('layer'))==layer){
		           $("#saveuserid").val($(this).val());
			 }
		 });
	  }
	  
   }else{
	   $(".user").each(function(){
	       if(Number($(this).attr('layer'))>layer){
		     $(this).remove();
		   }
	   });
	   $("#saveuserid").val(uid);
	   $.ajax({type:'POST',url:mulu + 'user',dataType:'json',data:'xtype=createson&uid='+uid,success:function(m){
	        var str="<select class=user layer="+(layer+1)+">";
			str += "<option value=''>选择"+level[layer]+"</option>";
			var mlength=m.length;
			for(i=0;i<mlength;i++){
				str += "<option value='"+m[i]['userid']+"'>"+m[i]['username']+"</option>";
			}
			str += "</select>";
			$(".user").parent().append(str);
			
			addchange();
			
	   }});
	   
   }
}