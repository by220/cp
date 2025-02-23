
function myready(){
    $("img.addcard").click(function(){
	    $("#card_h").hide();
		$("#card_s").show();
	});	
	
	$("a.changecard").click(function(){
	    $("#card_t").hide();
		$("#card_s").show();
	});
	
	$("#tk").click(function(){
	    var money = $("#card_t input.money").val();
		var bankpass = $("#card_t input.bankpass").val();
		var bank  = $("#card_t input[name='bank']").val();
		if(money=='' | money==0){
		    alert("请输入正确金额!");
			return false;
		}
		if(bankpass==''){
			alert("请输入提款密码!");
		    return false;
		}
		var str = "&money="+money+"&bankpass="+bankpass+"&bank="+bank;
		$.ajax({
			type: 'POST',
			url: mulu + 'member',
			cache: false,
			async: false,
			data: 'xtype=tk'+str,
			success: function(m) {
				if(Number(m)==1){
				    alert("提交成功,请在交易记录查询进度!");
					getusermoney();
				}else if(Number(m)==2){
					alert("余额不足");
			    }else if(Number(m)==3){
					alert("提款金额须至少100元!");
			    }else if(Number(m)==4){
					alert("请输入整数!");
			    }else if(Number(m)==5){
					alert("提款密码错误!");
			    }else if(Number(m)==6){
					alert("您还有未结算注单，请等待结算后提款!");
			    }
			}
		});
	});	
	
	$("#btnCard").click(function(){
	    var bank = $("#bank").val();
		var num = $("#cardId").val();
		var kaihuhang = $("#bankaddress").val();
		var bankpass = $("#bankpass").val();
		var bankpass2 = $("#bankpass2").val();
		var names = $("#names").val();
		if(num==''){
		    alert("请输入卡号!");
			return false;
		}
		if(kaihuhang==''){
		    alert("请输入开户网点!");
			return false;
		}
		if(bankpass==''){
		    alert("请输入提款密码!");
			return false;
		}
		if(bankpass!=bankpass2){
		    alert("两次提款密码输入不一样!");
			return false;
		}
		var str = "&bank="+bank+"&num="+num+"&kaihuhang="+kaihuhang+"&bankpass="+bankpass+"&names="+names;
		$.ajax({
			type: 'POST',
			url: mulu + 'member',
			cache: false,
			async: false,
			data: 'xtype=addcard'+str,
			success: function(m) {
				if(Number(m)==1){
				    alert("添加银行卡成功!");
				}
			}
		});
	});
	
} 


function getusermoney() {
	$.ajax({
		type: 'POST',
		url: mulu + 'userinfo',
		dataType: "json",
		cache: false,
		data: 'xtype=getusermoney',
		success: function(m) {
			
            var obj = $(".accounts",parent.document);
			obj.find(".maxmoney").html(m[0]);
			obj.find(".money").html(m[1]);
			obj.find(".moneyuse").html(m[2]);
			obj.find(".kmaxmoney").html(m[3]);
			obj.find(".kmoney").html(m[4]);
			obj.find(".kmoneyuse").html(m[5]);
			obj.find(".fmaxmoney").html(m[3]);
			obj.find(".fmoney").html(m[4]);
			obj.find(".fmoneyuse").html(m[5]);
			$(".balanceCount").html(m[4]);
		}
	})
}