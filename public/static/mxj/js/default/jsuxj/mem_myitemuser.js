function myready(){  
    $(".page_control a").click(function(){
		var tpage = Number($(".page_control span").html());
		var pcount = Number($(".page_control").attr('pcount'));
		if($(this).hasClass("previous")){
			if(tpage<=1) return false;
			tpage--;
		}else if($(this).hasClass("next")){
			if(tpage>=pcount) return false;
			tpage++;
		}else{
		    tpage= Number($(this).html());
		}
		window.location.href = "member?xtype=myitem&tpage="+tpage;
	});
	

	$("td.status input").click(function() {
		var posi = $(this).position();
		$("#statusPanel").css("top", posi.top + $(this).height());
		$("#statusPanel").css("left", posi.left + $(this).width() - $("#statusPanel").width());
		$("#statusPanel").attr('uid', $(this).parent().parent().attr('uid'));
		var obj = $(this);
		$("#statusPanel input[name='ustatus']").each(function() {
			if ($(this).val() == obj.attr('v')) $(this).prop("checked", true);
			else $(this).prop("checked", false);
		});
		$("#statusPanel").show();

	});

	$("#statusPanel i").unbind('click');
	$("#statusPanel i").click(function() {
		$("#statusPanel").hide();
	});
	$("#statusPanel input:radio").unbind("change");
	$("#statusPanel input:radio").change(function() {
		var ustr = $("#statusPanel").attr("uid");
		var status = $(this).val();
		$.ajax({
			type: 'POST',
			url: mulu + 'member',
			cache: false,
			data: 'xtype=upstatus&ustr=' + ustr + "&status=" + status,
			success: function(m) {
				if (Number(m) == 1) {
					if(status=='1'){
						$("#uid"+ustr).attr("class",'s1');
						$("#uid"+ustr).val("启用");
					}else if(status=='2'){
						$("#uid"+ustr).attr("class",'s2');
						$("#uid"+ustr).val("冻结");
					}else if(status=='0'){
						$("#uid"+ustr).attr("class",'s0');
						$("#uid"+ustr).val("停用");
					}
					$("#statusPanel").hide();
				}
			}
		})
	});


	$("a.eshui").click(function() {
		var username = $(this).parent().parent().find("td:eq(0)").html();
		var uid = $(this).parent().parent().attr("uid");
		var shui = $(this).parent().find("label").html();
		var moneystr = "<table class='data_table edutb' ><tbody><tr><th class='tright'>赚取水费：</th><td><input name='balance' type='text' value='"+shui+"' class='input shui' style='width:100px;'><span id='popDx' style='color:red' class='dx'></span><input id='btnOK' class='s1 eshui' type='button' value='确定'></td></tr></tbody></table>";

		var posi = $(this).position();


		dialog._show(username + "#修改水费", moneystr, {}, 300, posi.left + $(this).width() - 460, posi.top + 25);


		$(".edutb td:eq(0)").attr("uid", uid);
        var obj=$(this);
        $("input.eshui").click(function(){
		var shui = Number($(".edutb input.shui").val());
		if(shui*1000%1!=0 | shui<0 | isNaN(shui)){
		    alert("请输入正确的数字!");
			return false;
		}
		var uid = $(".edutb td:eq(0)").attr("uid");
		$.ajax({
			type: 'POST',
			url: mulu + 'member',
			async: false,
			cache: false,
			data: 'xtype=eshui&uid=' + uid+'&shui='+shui ,
			success: function(m) {
				 obj.parent().find("label").html(m); 
				 $("#dialog").parent().hide();
				 $(".ui-widget-overlay").hide();
			}

		});	
		});



	});
	
	
	$("a.cpass").click(function() {
		var username = $(this).parent().parent().find("td:eq(0)").html();
		var uid = $(this).parent().parent().attr("uid");
		var moneystr = "<table class='data_table passtb' ><tbody><tr><th class='tright'>密码：</th><td><input name='balance' type='text' class='input pass' style='width:100px;'><span id='popDx' style='color:red' class='dx'></span><input id='btnOK' class='s1 cpass' type='button' value='提交修改'></td></tr></tbody></table>";

		var posi = $(this).position();


		dialog._show(username + "#修改密码", moneystr, {}, 300, posi.left + $(this).width() - 460, posi.top + 25);


		$(".passtb td:eq(0)").attr("uid", uid);
        var obj=$(this);
        $("input.cpass").click(function(){
		var pass = $(".passtb input.pass").val();
		var uid = $(".passtb td:eq(0)").attr("uid");
		$.ajax({
			type: 'POST',
			url: mulu + 'member',
			async: false,
			cache: false,
			data: 'xtype=cpass&uid=' + uid+'&pass='+pass ,
			success: function(m) {
				 if(Number(m)==1){
					 alert("修改成功！ ");
					 $("#dialog").parent().hide();
				    $(".ui-widget-overlay").hide();
				 }
			}

		});	
		});



	});


} 
