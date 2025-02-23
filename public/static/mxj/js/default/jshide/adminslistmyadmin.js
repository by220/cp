

function myready(){
	changeh(document.documentElement.scrollHeight+500);
	$(".page td img").click(function(){
	     var aid=$(this).attr('aid');
		 var page=$(this).attr('page');		 
		 updatepage(aid,page);	
	});
	$("#addbtn").click(function(){sendvalue();});
	$("#closebtn").click(function(){$(".addtb").hide();});
	$(".del").click(function(){
		var adminname = $(this).parent().parent().find("td:eq(0)").html();
	     if(!confirm("确定要删除管理员"+adminname)){
			  return false;
	    }
		 var aid=$(this).attr('aid');
		 $.ajax({type:'POST',url:mulu + 'admins',data:"xtype=del&aid="+aid,success:function(m){
						m=m.msg;																 
				if(Number(m)==1) {
				   alert("删除成功");
				   $("#del"+aid).parent().parent().remove();
				   window.location.href=window.location.href;
				}else{
				    alert("删除失败");
				}																		   
		 }});
	});
	$(".edit").click(function(){
	     var aid=Number($(this).attr('aid'));
		 $(".addtb").show('fast');
		 $("#action").val('edit');
		 $("#adminname").val($(this).parent().parent().find("td:eq(0)").html());
		 $(".adminname").attr("aid",aid);
		 $(".adminname").html($(this).parent().parent().find("td:eq(0)").html());

		 $("#adminname").hide();
		 $(".adminname").show();
		 var posi=$(this).position();
		 $(".addtb").css('left',posi.left+$(this).width()-400);
		 $(".addtb").css('top',posi.top+$(this).height());
		 $("#addbtn").val("修改");

	});
	$(".add").click(function(){
		 $(".addtb").show('fast');		 
         $("#action").val('add');
		 $("#adminname").val('');
		 $(".adminname").html('');
		 $(".adminname").hide();
		 $("#adminname").show();
		 
		 var posi=$(this).position();
		 $(".addtb").css('left',posi.left+$(this).width()-400);
		 $(".addtb").css('top',posi.top+$(this).height());
		 $("#addbtn").val("添加");
	});
}

function sendvalue(){
    var action=$("#action").val();
	var adminname=$("#adminname").val();
	var aid=$(".adminname").attr('aid');
	var pass1=$("#pass1").val();
	var pass2=$("#pass2").val();
	if(action=='add' & (strlen(adminname)<5 | strlen(adminname)>10)){
	     alert("用户名必需大于或等于5个字符,小于或等于10个字任符");
	     return false;
	}
	if(pass1==''  | pass1!=pass2){
	     alert("密码不能为空，并且两次密码必需输入一样");
	     return false;
	}
	
	var sendstr='&aid='+aid+'&adminname='+adminname+'&pass1='+men_md5_password(pass1)+"&pass2="+men_md5_password(pass2)+"&action="+action;
	
	$.ajax({type:'POST',url:mulu + 'admins',data:'xtype=addoredit'+sendstr,success:function(m){
	     m=m.msg;
		 
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

function updatepage(aid,page){
    if(Number(aid)==1001) return false;
	$.ajax({type:'POST',url:mulu + 'admins',data:'xtype=updatepage&aid='+aid+'&page='+page,success:function(m){
						m=m.msg;																				
		if(Number(m)==1 | Number(m)==0){
	         $(".page img").each(function(){
			     if($(this).attr('aid')==aid & $(this).attr('page')==page){
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