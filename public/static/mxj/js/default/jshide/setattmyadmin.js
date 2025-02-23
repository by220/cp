function myready() {
	changeh(document.documentElement.scrollHeight+500);
    $("input:text").addClass('txt2');
    $("input:text").addClass('num');
	$(".game_class a.g"+gid).addClass("selected");

	$(".game_class a").click(function(){		
        window.location.href = mulu + "zshui?xtype=setattshow&gid="+$(this).attr('gid');
	});
	
	$(".data_table td").mouseover(function(){
	    $(this).parent().addClass("hover");
	}).mouseout(function(){
	    $(this).parent().removeClass("hover");
	});
	
	
    $(".send").click(function() {
        var str = "&gid="+gid;
        var flag = true;
        $(".pan input:text").each(function() {
            str += '&' + $(this).attr('id') + "=" + $(this).val();
            if ((Number($(this).val()) * 10000) % 1 != 0) {
                flag = false;
            }
        });
        if (!flag) {
            alert("请输入数字,支持4位小数!");
            return false;
        }
		var attstr = '&';
        var flag = true;
		var err='';
        $(".setatt2 input:text").each(function() {
            attstr += '&' + $(this).attr('id') + "=" + $(this).val();
            if ((Number($(this).val()) * 10000) % 1 != 0) {
				err +=$(this).val()+$(this).attr('id');
                flag = false;
            }
        });
		//alert(err);
        if (!flag) {
           // alert("请输入数字,支持4位小数!");
            //return false;
        }
        $.ajax({
            type: 'POST',
            url: mulu + 'zshui',
            data: 'xtype=setatt' + str+attstr,
            success: function(m) {
			    $("#test").html(m);
                if (Number(m) == 1) {
                    alert("修改成功");
                    window.location.href = window.location.href;
                }
            }
        });
    });

	$(".yiwotongbu").click(function(){
		if(!confirm("确定以我同步吗？"))	return false;
        $.ajax({
            type: 'POST',
            url: mulu + 'zshui',
            data: 'xtype=yiwotongbuatt&gid='+gid,
            success: function(m) {

                if (Number(m) == 1) {
                    alert("同步成功");
                    window.location.href = window.location.href;
                }
            }
        });  
	});
	
	$(".pan input.all").click(function(){
		
	    if($(this).prop("checked")){
		    $(".pan").find("input:checkbox").attr("checked",true);
		}else{
		    $(".pan").find("input:checkbox").attr("checked",false);
		}
	});
	
	$(".patt input.all").click(function(){
	    if($(this).prop("checked")){
		    $(".patt").find("input:checkbox").attr("checked",true);
		}else{
		    $(".patt").find("input:checkbox").attr("checked",false);
		}
	});
	
	$(".pan input.pantb").click(function(){
	    $(this).parent().parent().find("input:text").each(function(i){
			 var val = $(this).val();
		     $(".pan tr").each(function(){
			     if($(this).find("input:checkbox").prop("checked")){
			         $(this).find("input:text:eq("+i+")").val(val);
				 }
			 });
		});
	});
	
	$(".patt input.patttb").click(function(){
	    $(this).parent().parent().find("input:text").each(function(i){
			 var val = $(this).val();
		     $(".patt tr").each(function(){
			     if($(this).find("input:checkbox").prop("checked")){
			         $(this).find("input:text:eq("+i+")").val(val);
				 }
			 });
		});
	});
	
	$(".patt td.bcs").click(function(){
		var html = $(this).html();
		var check = $(this).parent().find("input:checkbox").prop("checked");
	    $(this).parent().parent().find("td.bcs").each(function(i){
			     if($(this).html()==html){
					 if(check){
			            $(this).parent().find("input:checkbox").prop("checked",false);
					 }else{
			            $(this).parent().find("input:checkbox").prop("checked",true);
					 }
				 }
			
		});
	});
	
	$(".modetb").click(function(){
	    var v = Number($(this).attr('v'));
		$(".patt input.patttb").each(function(){
		    var c = $(this).parent().parent().find("td:eq(1)").html();
			for(i=1;i<=5;i++){
			    if(i!=v){
				    $("#a"+i+'_'+c).val($("#a"+v+'_'+c).val());
					$("#b"+i+'_'+c).val($("#b"+v+'_'+c).val());
					$("#c"+i+'_'+c).val($("#c"+v+'_'+c).val());
					$("#d"+i+'_'+c).val($("#d"+v+'_'+c).val());
					$("#ab"+i+'_'+c).val($("#ab"+v+'_'+c).val());
					 
				}
			}
		});
	});
	
}