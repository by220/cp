function myready(){
    $("input.order").click(function(){
		var amount = $("#amount").val();
		var userName = $("#userName").val();
		var cardId = $("#cardId").val();
		var depostitTime = $("#depostitTime").val();
		var str = "&amount="+amount+"&userName="+userName+"&cardId="+cardId+"&depostitTime="+depostitTime;
		$.ajax({
			type: 'POST',
			url: mulu + 'member',
			cache: false,
			async: false,
			data: 'xtype=orderatm'+str,
			success: function(m) {
			
				if(Number(m)==1){
					$("input.order").hide();
				    alert("提交成功,稍后系统处理后入帐!");
				}
			}
		});
	});		
} 