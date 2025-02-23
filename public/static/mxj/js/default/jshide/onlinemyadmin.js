
var ipcount=0;
function myready(){
    $("#clickall").click(function(){
	    if($(this).prop('checked')==true){							  
	       $(this).parent().parent().parent().find("input:checkbox").attr("checked",true);
		}else{
		   $(this).parent().parent().parent().find("input:checkbox").attr("checked",false);
		}
	});
	
	$(".on_tb td").mouseover(function(){
	     $(this).parent().addClass('hover');
	}).mouseout(function(){
	     $(this).parent().removeClass('hover');
	})
	
	$(".on_tb").find("input:button").each(function(i){
	    if(i==0){
		     $(this).click(function(){
			     var idstr='|';
				 $(".on_tb").find("input:checkbox").each(function(){
					   if($(this).prop('checked')==true){
					      idstr += $(this).attr('value') + "|";
					   }
				 });
				 dellogin(idstr);
			 });
		}else{
			
		    $(this).click(function(){
			    var idstr = "|" + $(this).parent().parent().find("input:checkbox").val() + "|";				
			    dellogin(idstr);
		   });
		}
	});
	
	$("a.page").click(function(){
		var type = $("td.click").attr('type');
     	window.location.href = "online?xtype=show&page="+$(this).html()+"&type="+type;
	});	
	$("td.type").click(function(){
	   window.location.href = mulu + "online?xtype=show&page=1&type="+$(this).attr('type');
	});
	
	$(".up span").click(function(){
	     if($(this).parent().find("div:visible").length>0){
		    $(this).parent().find("div").hide();
		 }else{
		    $(this).parent().find("div").show();
		 }
	});
	
	$(".wjs").click(function(){


		var uid = $(this).attr('uid');

		
	
		 var js = $('.sort').attr("js");
	var zgid = $('.sort').attr("gid");
		var page = $(".sort").attr("page");
		var posi = $(this).position();
		$(".xxtb").css('left', 5)
		$(".xxtb").css('top', posi.top + $(this).height()+3);
		$(".xxtb").show();
		var obj = $(this);

		$.ajax({
			type: 'POST',
			url: mulu + 'online',
			cache: false,
			data: 'xtype=userzdxx&uid='+uid+"&js="+js+"&PB_page="+page+"&zgid="+zgid,
			dataType: 'json',
			success: function(m) {
			//alert(m);return;
				
				var ml = m['tz'].length;
			
				var str = '';
				$(".xxtb tr").each(function(i) {
					if (!$(this).hasClass('bt')) $(this).remove()
				});
				for (i = 0; i < ml; i++) {
					str += "<tr ";
					if (Number(m['tz'][i]['z']) == 1) str += " class='z1' ";
					str += " >";
					str += "<td>" + m['tz'][i]['gname'] + "</td>";
					str += "<td>" + m['tz'][i]['qishu'] + "</td>";
					str += "<td>" + m['tz'][i]['wf'];
					if(m['tz'][i]['con']!='') str += ":"+m['tz'][i]['con'];
					str += "</td>";
					str += "<td><label>" + m['tz'][i]['zcje'] + "</label>/" + m['tz'][i]['je'] + "</td>";
					str += "<td>" + m['tz'][i]['peilv1'] + "</td>";
					str += "<td>" + m['tz'][i]['points'] + "</td>";
					str += "<td>" + m['tz'][i]['user'] + "</td>";
					str += "<td>" + m['tz'][i]['xtime'] + "</td>";
					str += "</tr>"
				}
				$(".xxtb").prepend("<tr><td><a href='javascript:void(0);' class='close'>关闭</a></td><td><select class='xtype'><option value='2'>全部</option><option value='0'>未结算</option><option value='1'>已结算</option></select></td><td><select class='zdgame'><option value=100>低频彩</option><option value=1>全部快开</option></select></td><td colspan=5>" + m['page'] + "</td></tr>");
				
				$(".xxtb").append(str);
				$(".xxtb .xtype").val(m['js']);
				$(".xxtb .pageselect").val(page);
				$(".xxtb .zdgame").val(m['zgid']);
				
				$(".xxtb .close").click(function() {
					$(".xxtb").hide();
					return false
				});
				$(".xxtb .xtype").change(function() {		
					$(".sort").attr("js",$(this).val());
					obj.click()
				});
				$(".xxtb .zdgame").change(function() {		
					$(".sort").attr("gid",$(this).val());
					obj.click()
				});
				$(".xxtb .pageselect").change(function() {
					$(".sort").attr("page",$(this).val());
					obj.click();
					return false
				});
	$(".xxtb tr").mouseover(function(){
	     $(this).addClass('hover');
	}).mouseout(function(){
	     $(this).removeClass('hover');
	})
				str = null;
				m = null
			}
		});
		

	});
	
	$(".selectcom").change(function(){
	   var com= $(this).val();
	   if(com==''){
	       $("tr.com").show();
	   }else{
	       $("tr.com").hide();
		   $("tr.com").each(function(){
		      if($(this).attr('id')==com){
			     $(this).show();
			  }
		   });
	   }
	   $(".selectcom").parent().find("label").html($("tr.com:visible").length);
	   
	});
}
function winopen(v){
     var href=window.location.href;
	 href=href.replace('PB_page=','');
	 window.location.href=href+"&PB_page="+v;
}

function dellogin(idstr){

     $.ajax({type:'POST',url:mulu + 'online',data:'xtype=dellogin&uid='+idstr,success:function(m){
																	   
	     if(Number(m)==1){
		      $(".on_tb tr").find("input:checkbox").each(function(){
			      if(idstr.indexOf('|'+$(this).val()+'|')!=-1){
				      $(this).parent().parent().remove();
				  }
			  });
		 }
	 }});
}