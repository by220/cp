var upage=1;
function myready(){
	changeh(document.documentElement.scrollHeight+1000);
	$('#sdate').change(get).datepicker(); 
	$('#edate').change(get).datepicker();   

	$('table.list tbody tr:not(.head)').hover(function() {
		$(this).addClass('hover');
	}, function() {
		$(this).removeClass('hover');
	});
	

	var pcount = Number($(".page_info").attr('pcount'));
	upage = Number($(".page_info").attr('upage'));

	var pstr = "<a class='prev'>前一页</a>『";
	for (i = 1; i <= pcount; i++) {
		if (i == upage) {
			pstr += "<span class='current' page='" + i + "'>&nbsp;" + i + "&nbsp;</span>"
		} else {
			pstr += "&nbsp;<a href='javascript:void(0)' class='p'>" + i + "</a>&nbsp;"
		}
	}
	pstr += "』<a class='next'>后一页</a>";

	$(".page_control").html(pstr);
	$(".page a").click(function() {
		if ($(this).hasClass('prev')) {
			upage -= 1
		} else if ($(this).hasClass('next')) {
			upage += 1
		} else {
			upage = Number($(this).html())
		}
		get();
	});
	$(".query").click(function() {
		get();
	});
	$("select.status").change(function() {
		get();
	});
	
	$("a.xiangqing").click(function(){
		var obj =$(this).parent().parent();
		var str ='';
		var mtype = obj.find(".mtype").html();
		str += "会员：<label>"+obj.find(".username").html()+"</label><br />";
		str += "发起时间：<label>"+obj.find(".tjtime").html()+"</label><br />";
		str += "交易类型：<label>"+mtype+"</label><br />";
		str += "交易金额：<label>"+obj.find(".money").html()+"</label><br />";
		str += "手续费：<label><input type='text' class='input' value='"+obj.find(".sxfei").html()+"' id='sxfei' /></label><br />";		
		str += "入帐方式：<label>"+obj.find(".fs").html()+"</label><br />";
		str += "入帐银行(户名)：<label>"+obj.find(".bank").html()+"</label><br />";
		str += "账号：<label>"+obj.find(".snum").html()+"</label><br />";
		str += "入帐时间：<label>"+obj.find(".cuntime").html()+"</label><br />";
		str += "汇款留言：<label>"+obj.find(".pass").html()+"</label><br />";
		str += "转帐户名：<label>"+obj.find(".uname").html()+"</label><br />";
		str += "转帐帐号：<label>"+obj.find(".unum").html()+"</label><br />";		 
        str += "交易状态：<label>"+obj.find(".status").attr('v')+"</label><br />";
		str += "订单提交人：<label>"+obj.find(".tjname").html()+"</label><br />";
		str += "受理人：<label>"+obj.find(".clname").html()+"</label><br />";
		str += "受理时间：<label>"+obj.find(".cltime").html()+"</label><br />";
		str += "<p>交易描述：<input style='width:360px;' class='input' type='text' value='"+obj.find(".ms").html()+"' id='ms' /></p>";
		str += "<p>备注：<input style='width:360px;'class='input'  type='text' value='"+obj.find(".bz").html()+"' id='bz' /></label></p>";
		str += "<p><button type='button' class='edit ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only edit' role='button' ids="+obj.find("input:checkbox").val()+"><span class='ui-button-text'>提交改动</span></button></p>";
		var posi = $(this).parent().position();
		dialog._show("交易详情", str, {}, 480, posi.left+$(this).width()-580, posi.top+25);
		$("#dialog button.edit").click(function(){
			var sxfei=$("#dialog #sxfei").val();
			var ms=$("#dialog #ms").val();
			var bz=$("#dialog #bz").val();
			var ids = $(this).attr("ids");
			var str = "&sxfei="+sxfei+"&bz="+bz+"&ms="+ms+"&ids="+ids;
		$.ajax({
			type: 'POST',
			url: mulu + 'money',
			cache: false,
			data: 'xtype=upcz'+str,
			success: function(m) {
				if (Number(m) == 1) {
                   get();
				}
			}
		})
		});
	});
	
	$("input.all").click(function(){
	     if($(this).prop("checked")){
		     $("input:checkbox").prop("checked",true);
		 }else{
             $("input:checkbox").prop("checked",false);
		 }
	});
    
	$("input.del").click(function(){
		var str='';
		$("input:checkbox").each(function(){
		    if($(this).prop("checked") & !$(this).hasClass('all')){
			   str += '|'+$(this).val();
			}
		});
		$.ajax({
			type: 'POST',
			url: mulu + 'money',
			cache: false,
			data: 'xtype=delcz&idstr=' + str ,
			success: function(m) {
				alert(m);
				if (Number(m) == 1) {
					get();
				}
			}
		})
	});
    
    $("td.status input").click(function(){
	    var posi = $(this).position();
		$("#statusPanel").css("top",$(this).height()+posi.top);
		$("#statusPanel").css("left",posi.left);
		$("#statusPanel").show();
		$("#statusPanel").attr("ids",$(this).parent().parent().find("input:checkbox").val());
	});
	$("#statusPanel i").unbind('click');
	$("#statusPanel i").click(function() {
		$("#statusPanel").hide();
	});
	$("#statusPanel input:radio").unbind("change");
	$("#statusPanel input:radio").change(function() {
		var ids = $("#statusPanel").attr("ids");
		var status = $(this).val();
		$.ajax({
			type: 'POST',
			url: mulu + 'money',
			cache: false,
			data: 'xtype=upczstatus&ids=' + ids + "&status=" + status,
			success: function(m) {
				if (Number(m) == 1) {
                   get();
				}else if (Number(m) == 10) {
                    alert("用户还有未结算注单!");
				}else if (Number(m) == 20) {
                    alert("用户余额不足，无法操作!");
				}
			}
		})
	});

}
function get(){
   var sdate  = $("#sdate").val();
   var edate  = $("#edate").val();
   var username = $("#username").val();
   var status = $(".status").val();
  window.location.href = mulu + "money?xtype=chongzhi&sdate="+sdate+"&edate="+edate+"&username="+username+"&status="+status+"&upage="+upage;
}
