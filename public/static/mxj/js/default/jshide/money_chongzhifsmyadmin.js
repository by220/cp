function myready(){

   $(".save").click(function(){
       var str = "";
	   var bankonline = $(".bankonline").prop("checked")?1:0;
	   var bankatm = $(".bankatm").prop("checked")?1:0;
	   var weixin = $(".weixin").prop("checked")?1:0;
	   var alipay = $(".alipay").prop("checked")?1:0;
	    str += "&bankonline="+bankonline+"&bankatm="+bankatm+"&weixin="+weixin+"&alipay="+alipay;  
		$.ajax({
			type: 'POST',
			url: mulu + 'money',
			data: 'xtype=setchongzhifs' + str,
			success: function(m) {			
				if (Number(m) == 1) {
					alert('ok');
					window.location.href = window.location.href
				}
			}
		});
   });
   
}