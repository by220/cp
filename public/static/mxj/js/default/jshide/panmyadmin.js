

function myready(){
	$(".top_tb input:text").hide();
	$(".top_tb select").hide();
	$(".top_tb input:checkbox").hide();
	$(".kjtb img").each(function(){
	    if($(this).parent().find("input:text").val()!=''){
		     $(this).attr('src',globalpath+"imgs/"+$(this).parent().find("input:text").val()+".gif");
		}else{
		     $(this).hide();
		}
	});
	
	$("#editbtn").click(function(){
	     $(".top_tb input:text").show();
		 $(".top_tb input:checkbox").show();
	     $(".top_tb select").show();
		 $(".top_tb #cancelbtn").show();
		 $(".top_tb #sendbtn").show();
		 $(".top_tb label").hide();
		 $(this).hide();
	});
	$("#cancelbtn").click(function(){
	     $(".top_tb input:text").hide();
		 $(".top_tb input:checkbox").hide();
	     $(".top_tb select").hide();
		 $(".top_tb label").show();
		 $("#cancelbtn").hide();
		 $("#sendbtn").hide();
		 $("#editbtn").show();
	});
	$("#sendbtn").click(function(){
	     sendvalue();
	});
	$(".two").attr("maxlength",2);
	$("label").addClass("red");
	$(".two").attr("maxlength",8);
	
	
	$(".ifclose").click(function(){update('ifclose');});
	$(".baostatus").click(function(){update('baostatus');});
	$(".autoopenpan").click(function(){update('autoopenpan');});
	$(".tepan").click(function(){update('tepan');});
	$(".otherpan").click(function(){update('otherpan');});
	$(".editzc").click(function(){update('editzc');});
	$(".deluser").click(function(){update('deluser');});
	
	$(".xinyong").click(function(){
	      $.ajax({type:'POST',url:mulu + 'pan',data:'xtype=xinyong',success:function(m){

		    if(Number(m)==1){
			    alert("恢复成功");
			}
		 }});
	});
	
	$(".clickall").click(function(){
		 if($(this).prop('checked')==true){						  
             $("#kj_jr").find(".s").attr('checked',true);
		 }else{
             $("#kj_jr").find(".s").attr('checked',false);
		 }
	});
	$(".baodel").click(function(){
		var str='';
	    $("#kj_jr").find(".s").each(function(){
		    if($(this).prop("checked")==true){
			   str += $(this).attr('v') + "|";
			}
		});
		if(str=='') return false;
		if(!confirm("确定删除"+str+"期的报表吗？")) return false;
		$.ajax({
		   type:'POST',
		   url:mulu + 'pan',
		   data:'xtype=delkj&str='+str,
		   success:function(m){
			   
		       if(Number(m)==1){
				   $("#kj_jr").find(".s").each(function(){
				       if(str.indexOf($(this).attr('v'))!=-1){
						   $(this).parent().parent().remove();
					   }
				   });
				}
		   }
		});
	});
	
	$(".kj").click(function(){
	     var p1=$(".p1").val();
		 var p2=$(".p2").val();
		 var p3=$(".p3").val();
	     var p4=$(".p4").val();
		 var p5=$(".p5").val();
		 var p6=$(".p6").val();
		 var tm=$(".tm").val();
		 var str="&p1="+p1+"&p2="+p2+"&p3="+p3+"&p4="+p4+"&p5="+p5+"&p6="+p6+"&tm="+tm;
		 $.ajax({
		     type:'POST',
			 url:mulu + 'pan',
			 data:'xtype=kj'+str,
			 success:function(m){
				m=Number(m);
                window.location.href=window.location.href;
			 }
		 });
	});
	
	$(".edittb input:text").addClass('txt1');
	$(".delkjjr").click(function(){
		var year=$(this).parent().parent().find("td:eq(1)").html();
		var qishu=$(this).parent().parent().find("td:eq(4)").html()
		$.ajax({
	       type:'POST',
		   url:mulu + 'pan',
		   data:"xtype=delkjjr&year="+year+"&qishu="+qishu,
		   success:function(m){
		      if(Number(m)==1){
			     window.location.href=window.location.href;
			  }			  
		   }
		});
	});
	$(".editkj").click(function(){
	    $(".edittb").show();
		var posi=$(this).position();
		$(".edittb").css('left',posi.left+$(this).width()-$(".edittb").width());
		$(".edittb").css('top',posi.top+$(this).height());
		$(".edittb .year").val($(this).parent().parent().find("td:eq(1)").html());
		$(".edittb .qishu").val($(this).parent().parent().find("td:eq(4)").html());
		$(".edittb .tdate").val($(this).parent().parent().find("td:eq(2)").attr('val'));
		$(".edittb .p1").val($(this).parent().parent().find("img:eq(0)").attr('val'));
		$(".edittb .p2").val($(this).parent().parent().find("img:eq(1)").attr('val'));
		$(".edittb .p3").val($(this).parent().parent().find("img:eq(2)").attr('val'));
		$(".edittb .p4").val($(this).parent().parent().find("img:eq(3)").attr('val'));
		$(".edittb .p5").val($(this).parent().parent().find("img:eq(4)").attr('val'));
		$(".edittb .p6").val($(this).parent().parent().find("img:eq(5)").attr('val'));
		$(".edittb .tm").val($(this).parent().parent().find("img:eq(6)").attr('val'));
	});
	$(".edittb .closebtn").click(function(){$(".edittb").hide();});
	$(".edittb .editbtn").click(function(){
	    var str='';
		var year=$(".edittb .year").val();
		var qishu=$(".edittb .qishu").val();
		var date=$(".edittb .tdate").val();
		var p1=$(".edittb .p1").val();
		var p2=$(".edittb .p2").val();
		var p3=$(".edittb .p3").val();
		var p4=$(".edittb .p4").val();
		var p5=$(".edittb .p5").val();
		var p6=$(".edittb .p6").val();
		var tm=$(".edittb .tm").val();
		str += "&year="+year+"&qishu="+qishu+"&date="+date+"&p1="+p1+"&p2="+p2+"&p3="+p3;
		str += "&p4="+p4+"&p5="+p5+"&p6="+p6+"&tm="+tm;
		$.ajax({
	       type:'POST',
		   url:mulu + 'pan',
		   data:"xtype=editkj"+str,
		   success:function(m){
			  
		      if(Number(m)==1){
			     window.location.href=window.location.href;
			  }			  
		   }
		});
		
	});
	$("input.js").click(function(){
		var year=$(this).parent().parent().find("td:eq(1)").html();
		var qishu=$(this).parent().parent().find("td:eq(4)").html();
		$.ajax({
		   type:'POST',
		   url:mulu + 'pan',
		   data:'xtype=kjjs&year='+year+"&qishu="+qishu,
		   success:function(m){
			   $("#test").html(m);
			   alert(m);
		   }
		})
	});
	
}
var yy=0;
var mm=0;
var dd=0;

function isrun(y){
	if((y%4==0 & y%100!=0)  | y%400==0){
        return true;
	}else{
	    return false;
	}
}

function cmon(y,m,d,type){
    var maxday = 0;
	if(m==1 | m==3 | m==5 | m==7 | m==8 | m==10 | m==12){
	    maxday=31;
	}else if(m==2){
		if(isrun(y)) maxday=29;
		else maxday=28;
	}else{
	   maxday=30;
	}
	today=new Date(Date.parse(y+"/"+m+"/"+1));
	var week=today.getDay();
	
	var day=1;
	var tmp=0;
	var tbhead="<TR><Th colspan=7><label>"+y+"</label>年<label class='"+type+"mon'>"+m+"</label>月</Th></tr><tr><Th>日</th><Th>一</th><Th>二</th><Th>三</th><Th>四</th><Th>五</th><Th>六</th></tr>";
    var str = tbhead + '<TR>';
	for(i=0;i<(maxday+week);i++){
	     str += "<TD m="+m+" y="+y;
		 if(m==mm & day==dd) str += " class='red chu' ";
		 str += " >";
		 if(i>=week){
		    if(day<10) tmp='0'+day;
			else tmp=day;
			str += tmp;
			day++; 
			
		 }else{
		    str+="&nbsp;";
		 }
		 str += "</td>";
		 if((i+1)%7==0 & i!=0){
		    str += "</tr><tr>";
		 } 
		 
	}
	str +='</TR>';
	$("."+type+"day").append(str);
	$("label").addClass("red");
	$("."+type+"day td").click(function(){
	   if($(this).html()!=''){
	      $(this).toggleClass('byellow');
	   }
	});
	checkdate(type);
	str=null;
}

function checkdate(type){
    var pandate=$("#pandate").val();
	pandate = pandate.split('|');
	var pl=pandate.length;
	for(i=0;i<pl;i++){
	     day=pandate[i].split('-');
		 $("."+type+"day td").each(function(){
		    if(Number($(this).html())==Number(day[1]) & Number($(this).attr('m'))==Number(day[0])){
			    $(this).addClass('byellow');
			}
		 });
	}
}

function checkform(){
	var numflag=false;
     $(".num").each(function(i){
			if(Number($(this).val())%1!=0){
			   numflag=true;
			}				 
     });
	 if(numflag){
		alert("必须输入数字");
	    return false;
	 }
     $(".num2").each(function(i){
			if((Number($(this).val())*10)%1!=0){
			   numflag=true;
			}				 
     });
	 if(numflag){
		alert("点差调节值只允许一位小数");
	    return false;
	 }	 
     $(".num3").each(function(i){
			if((Number($(this).val())*100)%1!=0){
			   numflag=true;
			}				 
     });
	 
	 if(numflag){
		alert("生肖或尾数调节值只允许二位小数");
	    return false;
	 }
	 
	 /*var testtime="/^([0-2]){1}([0-9]){1}\:[0-2]){1}([0-9]){1}\:[0-2]){1}([0-9]){1}$/";
	 var format=false;
	 $(".day").each(function(){
	     if(!testtime.test($(this).val())){
		    format=true;
		 }		
	 });
	 
	 if(format){
		alert("请输入正确的时间格式");
	    return false;
	 }*/
	 
	 return true;
}

function sendvalue(){
	if(!checkform()) return false;
    var str='';
	$("input:text").each(function(){
		if(!$(this).hasClass('num3'))	  str += "&" + $(this).attr('id') + '=' + $(this).val();
	});
	$("select").each(function(){
	    str += "&" + $(this).attr('id') + '=' + $(this).val();
	});
	$("textarea").each(function(){
	    str += "&" + $(this).attr('id') + '=' + $(this).html();
	});
	$("input:checkbox").each(function(){
		  if($(this).prop("checked")==true){
		      str += "&" + $(this).attr('id') + "=1";
		  }else{
		      str += "&" + $(this).attr('id') + "=0";
		  }							  
	});
    
	var flag=false;
	var sxtz = '{';
	$(".sxtz").each(function(i){
		 if(i!=0) sxtz+= ',';
		 sxtz += '"'+$(this).attr('key')+'":'+'{"peilv":"'+$(this).val()+'","name":"'+$(this).attr('xname')+'"}';
		 if(Number($(this).val())==NaN | $(this).val()=='') flag=true;
	});
	sxtz += '}';

	var wstz = '{';
	$(".wstz").each(function(i){
		 if(i!=0) wstz+= ',';
		 wstz += '"'+$(this).attr('key')+'":'+'{"peilv":"'+$(this).val()+'","name":"'+$(this).attr('xname')+'"}';
		 if(Number($(this).val())==NaN | $(this).val()=='') flag=true;		 
	});
	wstz += '}';
	
	if(flag){
	    alert("生肖/尾数调整,请输入数值!");
		return false;
	}
	
	
    
	
	
    str += "&sxtz="+sxtz+"&wstz="+wstz;
	$.ajax({type:'POST',url:mulu + 'pan',data:'xtype=setpan'+str,success:function(m){
																			 
																			   $("#test").html(m);
	    if(Number(m)==1){
		   window.location.href=window.location.href;
		}
	}});
	
}

function update(type){
	$.ajax({type:'POST',url:mulu + 'pan',data:'xtype=updatestatus&type='+type,success:function(m){
	    if(Number(m)==1){
		   if($("."+type).attr('src').indexOf('0.gif')!=-1){
		        $("."+type).attr('src',globalpath+'img/1.gif');
				$("#"+type).attr("checked",true);
		   }else{
                $("."+type).attr('src',globalpath+'img/0.gif');
				$("#"+type).attr("checked",false);
		   }
		}
	}});
}