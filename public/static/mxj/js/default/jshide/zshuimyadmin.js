function myready() {
	changeh(document.documentElement.scrollHeight+500);
	$(".game_class a.g"+gid).addClass("selected");

	$(".game_class a").click(function(){		
        window.location.href = mulu + "zshui?xtype=show&gid="+$(this).attr('gid');
	});
	
	$(".data_table td").mouseover(function(){
	    $(this).parent().addClass("hover");
	}).mouseout(function(){
	    $(this).parent().removeClass("hover");
	});
	
	$(".send").click(function() {
		var str = '';
		var flag = true;
		var flags = true;
		$("select").each(function() {
			str += '&' + $(this).attr('id') + "=" + $(this).val();
			if ((Number($(this).val()) * 1000) % 1 != 0) {
				flag = false
			}
		});
		$("input:text").each(function() {
			str += '&' + $(this).attr('id') + "=" + $(this).val();
			if ((Number($(this).val())*1000) % 1 != 0) {
				flags = false
			}
		});
		if (!flag) {}
		if (!flags) {
			//alert("请输入整数!");
			//return false
		}
		$.ajax({
			type: 'POST',
			url: mulu + 'zshui',
			data: 'xtype=setpoints' + str+'&gid='+gid,
			success: function(m) {
				 console.log(m)
				if (Number(m) == 1) {
					alert("修改成功");
					window.location.href = window.location.href
				}
			}
		})
	});
	
	
		$(".yiwotongbu").click(function(){
		if(!confirm("确定以我同步吗？"))	return false;
        $.ajax({
            type: 'POST',
            url: mulu + 'zshui',
            data: 'xtype=yiwotongbuzshui&gid='+gid,
            success: function(m) {
                if (Number(m) == 1) {
                    alert("同步成功");
                    window.location.href = window.location.href;
                }
            }
        });  
	});
	
	$("input.all").click(function(){
	    if($(this).prop("checked")){
		    $("input:checkbox").attr("checked",true);
		}else{
		    $("input:checkbox").attr("checked",false);
		}
	});
	
	$("input.pantb").click(function(){
	    $(this).parent().parent().find("input:text").each(function(i){
			 var val = $(this).val();
		     $("tr").each(function(){
			     if($(this).find("input:checkbox").prop("checked")){
			         $(this).find("input:text:eq("+i+")").val(val);
				 }
			 });
		});
		
	    $(this).parent().parent().find("select").each(function(i){
			 var val = $(this).val();
		     $("tr").each(function(){
			     if($(this).find("input:checkbox").prop("checked")){
			         $(this).find("select").val(val);
				 }
			 });
		});
	});
}