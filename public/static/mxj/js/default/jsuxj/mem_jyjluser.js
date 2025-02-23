function myready(){
	$('#sdate').change(get).datepicker(); 
	$('#edate').change(get).datepicker();   
    $(".page_control a").click(function(){
		upage = Number($(".page_control span").html());
		var pcount = Number($(".page_control").attr('pcount'));
		if($(this).hasClass("previous")){
			if(upage<=1) return false;
			upage--;
		}else if($(this).hasClass("next")){
			if(upage>=pcount) return false;
			upage++;
		}else{
		    upage= Number($(this).html());
		}
		get();
	});
	
	$(".ui-icon-closethick").click(function(){
	    $(".newsxx").hide();
	});
	$("a.xiangqing").click(function(){
		var obj =$(this).parent().parent();
		var str ='';
		var mtype = obj.find(".mtype").html();
		str += "<p>发起时间:"+obj.find(".tjtime").html()+"</p>";
		str += "<p>交易类型:"+mtype+"</p>";
		str += "<p>交易金额:"+obj.find(".money").html()+"</p>";
		str += "<p>手续费:"+obj.find(".sxfei").html()+"</p>";
		if(mtype=="充值"){
			str += "<p>入帐方式:"+obj.find(".fs").html()+"</p>";
		    str += "<p>入帐银行:"+obj.find(".bank").html()+"</p>";
			str += "<p>户名:"+obj.find(".sname").html()+"</p>";
			str += "<p>账号:"+obj.find(".snum").html()+"</p>";
			str += "<p>入帐时间:"+obj.find(".cuntime").html()+"</p>";
			str += "<p>汇款留言:"+obj.find(".pass").html()+"</p>";
		}else{
		    str += "<p>收款银行:"+obj.find(".bank").html()+"</p>";
			str += "<p>户名:"+obj.find(".uname").html()+"</p>";
			str += "<p>账号:"+obj.find(".unum").html()+"</p>";
			str += "<p>汇款时间:"+obj.find(".cuntime").html()+"</p>";
		}
        str += "<p>交易状态:"+obj.find(".status").html()+"</p>";
		str += "<p>交易描述:"+obj.find(".ms").html()+"</p>";
		str += "<p>备注:"+obj.find(".bz").html()+"</p>";
		var posi = $(this).parent().position();
		dialog._show("交易详情", str, {}, 580, posi.left+$(this).width()-580, posi.top+$(this).height());
	});
	
	$("input.search").click(function(){
	     get();
	});
} 
var upage=1;
function get(){
   var sdate  = $("#sdate").val();
   var edate  = $("#edate").val();
   var keyword = $("#keyword").val();
   var status = $("#status").val();
   var mtype= $("#mtype").val();
  window.location.href = mulu + "member?xtype=jyjl&sdate="+sdate+"&edate="+edate+"&keyword="+keyword+"&status="+status+"&mtype="+mtype+"&upage="+upage;
}