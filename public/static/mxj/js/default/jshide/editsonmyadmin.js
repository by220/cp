
function myready(){
	$(".add").click(function(){
		 $(".addtb").show('fast');		 
         $("#action").val('add');
		 $("#username").attr('disabled',false);
		 var posi=$(this).position();
		 $(".addtb").css('left',posi.left+$(this).width()-150);
		 $(".addtb").css('top',posi.top+$(this).height());
		 $("#addbtn").val("添加");
	});
	$(".edit").click(function(){
	     var uid=$(this).attr('uid');
		 $(".addtb").show('fast');
		 $("#action").val('edit');
		 $("#user1").val($(this).parent().parent().find("td:eq(1)").html().replace($("#user0").html(),''));
		 $("#user1").attr('disabled',true);		
		 var posi=$(this).position();
		 $(".addtb").css('left',posi.left+$(this).width()-150);
		 $(".addtb").css('top',posi.top+$(this).height());
		 $("#addbtn").val("修改");

	});
	$(".submitbtn").click(function(){

	    var pass1=$("#pass1").val();
		var pass2=$("#pass2").val();
		var maxcun=$("#maxcun").val();
		var str='';
		if(pass1!='' & ( pass2!=pass1 | strlen(pass1)>15 | strlen(pass1)<6)){
		   alert("密码长度必须在6-15位，且两次输入必须一样");
		   return false;
		}
        
		if(pass1!=''){
		    str += "&password="+men_md5_password(pass1);
		}
		
		$.ajax({type:'POST',url:mulu + 'user',data:'xtype=editsonchangepass'+str+"&maxcun="+maxcun,success:function(m){
		     if(Number(m)==1) {alert("修改成功");$("#pass1").val('');$("#pass2").val('');} 
		}});
	});
   $("label").addClass("red");
	$(".page td img").click(function(){
	     var uid=$(this).attr('uid');
		 var page=$(this).attr('page');		 
		 updatepage(uid,page);
	
	});
	$("#addbtn").click(function(){sendvalue();});
	$("#closebtn").click(function(){$(".addtb").hide();});
	$(".del").click(function(){
		var username = $(this).parent().parent().find("td:eq(1)").html();
	     if(!confirm("确定要删除子帐号吗"+username)){
			  return false;
	    }
		 var uid=$(this).attr('uid');
		 $.ajax({type:'POST',url:mulu + 'user',data:"xtype=editsondel&uid="+uid,success:function(m){																						  				if(Number(m)==1) {
				   alert("删除成功");
				   $("#del"+uid).parent().parent().remove();
				   window.location.href=window.location.href;
				}else{
				    alert("删除失败");
				}																		   
		 }});
	});
}

function sendvalue(){
    var uid=$("#uid").val();
    var action=$("#action").val();
	var username=$("#user0").html()+$("#user1").val();
	var pass1=$("#pass1x").val();
	var pass2=$("#pass2x").val();
	if(action=='add' & (strlen(username)<4 | strlen(username)>10)){
	     alert("用户名必需大于或等于4个字符,小于或等于10个字任符");
	     return false;
	}
	if(pass1==''  | pass1!=pass2){
	     alert("密码不能为空，并且两次密码必需输入一样");
	     return false;
	}
	var sendstr='&username='+username+'&pass1='+men_md5_password(pass1)+"&pass2="+men_md5_password(pass2)+"&action="+action+"&uid="+uid;
	
	$.ajax({type:'POST',url:mulu + 'user',data:'xtype=editsonaddoredit'+sendstr,success:function(m){
	     
		  alert(m);
		 if(Number(m)!=1){		     	
			 if(action=='add'){
		          alert("添加失败，请重试");	
		     }else{
		          alert("修改失败，请重试");
			 }
		 }else{
			 if(action=='add'){
		          alert("添加成功");
				  window.location.href=window.location.href;
				  
		     }else{
		          alert("修改成功");
			 }
			 $(".addtb").hide('fast'); 
			 
		 }

	}});
	 
	
}

function updatepage(uid,page){
    if(Number(uid)==1001) return false;
	$.ajax({type:'POST',url:mulu + 'user',data:'xtype=editsonupdatepage&uid='+uid+'&page='+page,success:function(m){
		 
		 if(Number(m)==1 | Number(m)==0){
	         $(".page img").each(function(){
			     if($(this).attr('uid')==uid & $(this).attr('page')==page){
				     $(this).attr('src',globalpath+'img/'+m+'.gif');
				 }
			 })
		 }
	}});
}



function strlen(sString){
    var sStr,iCount,i,strTemp ; 
    iCount = 0 ;
    sStr = sString.split("");
    for (i = 0 ; i < sStr.length ; i ++){
        strTemp = escape(sStr[i]); 
        if (strTemp.indexOf("%u",0) == -1) 
		{ 
            iCount = iCount + 1 ;
        } 
        else 
        {
            iCount = iCount + 2 ;
        } 
    }
    return iCount ;
}