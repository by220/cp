
function myready(){
    $(".txt1").hide();
	$(".txt1").attr('maxlength',3);
	$("#editbtn").click(function(){
	     $(".txt1").show();
		 $("#cancelbtn").show();
		 $("#sendbtn").show();
		 $("table label").hide();
		 $(this).hide();
	});
	$("#cancelbtn").click(function(){
	     $(".txt1").hide();
		 $("table label").show();
		 $("#cancelbtn").hide();
		 $("#sendbtn").hide();
		 $("#editbtn").show();
	});
	$("#sendbtn").click(function(){
	     sendvalue();
	});
}

function sendvalue(){
    var str='';
	var flag=false;
	$("input:text").each(function(){
	    str += "&" + $(this).attr('id') + '=' + $(this).val();
		if((Number($(this).val())*10)%1!=0){
		    flag=true;
		}
	});
	if(flag){
	     alert("必须输入数字,且小数点只能一位");
		 return false;
	}
	$.ajax({type:'POST',url:mulu + 'points',data:'xtype=setpoint'+str,success:function(m){
	    if(Number(m)==1){
		   window.location.href=window.location.href;
		}
	}});

}