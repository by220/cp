function myready() {
	$(".game_class a.g"+gid).addClass("selected");

	$(".game_class a").click(function(){		
        window.location.href = mulu + "libset?xtype=show&gid="+$(this).attr('gid');
	});
	$(".data_table td").mouseover(function(){
	    $(this).parent().addClass("hover");
	}).mouseout(function(){
	    $(this).parent().removeClass("hover");
	});

	$("#quickSetting input:button").click(function(){
		 var val = $("#quickSetting .integer").val();
		 var ifok = $("#quickSetting input:radio:checked").val();
		 $(".pantb input:text").val(val);
		 $(".pantb input:radio").each(function(){
		 	  if(ifok==$(this).val()){
		 	  	   $(this).prop("checked",true);
		 	  }
		 });
	});
	$(".send").click(function(){
		
		var str = '{';
		var i=0;
		var err = false;
		$(".nr").each(function(){
			  var aje = $(this).find(".a").val();
			  var bje = $(this).find(".b").val();
			  var ifok= $(this).find("input:radio:checked").val();
			  var ftype = $(this).attr('f');
			  if(i>0) str += ',';
			  str += '"'+i+'":{"ifok":"'+ifok+'","aje":"'+aje+'","bje":"'+bje+'","ftype":"'+ftype+'"}';
			  if(aje%1!=0) err=true;
			  //if(bje%1!=0) err=true;
			  
			  i++;
		});
		str += '}';
	    if(err){
		    alert("请输入整数！");
			return false;
		}
        var defaultpan = $(".defaultpan").val();
		str = '&str='+str+'&gid='+gid+"&defaultpan="+defaultpan;
	    $.ajax({type:'POST',
		   url:mulu + 'libset',
		   data:'xtype=setautofly'+str,
		   success:function(m){
			   console.log(m);
			   if(Number(m)==1){
			      alert("修改成功");
				  window.location.href=window.location.href;
			   }
		  }
		});
	});
				$(".yiwotongbu").click(function(){
		if(!confirm("确定以我同步吗？"))	return false;
        $.ajax({
            type: 'POST',
            url: mulu + 'libset',
            data: 'xtype=yiwotongbuautofly&gid='+gid,
            success: function(m) {
	            console.log(m);
                if (Number(m) == 1) {
                    alert("同步成功");
                }
            }
        });  
	});
	
	$("input.all").click(function(){
	    if($(this).prop("checked")){
		    $("tr").find("input.pantbc").attr("checked",true);
		}else{
		    $("tr").find("input.pantbc").attr("checked",false);
		}
	});
	
	$("input.pantb").click(function(){
	    $(this).parent().parent().find("input:text").each(function(i){
			 var val = $(this).val();
		     $("tr.nr").each(function(){
			     if($(this).find("input:checkbox:eq(0)").prop("checked")){
			         $(this).find("input:text:eq("+i+")").val(val);
				 }
			 });
		});
		
	    $(this).parent().parent().find("select").each(function(i){
			 var val = $(this).val();
		     $("tr.nr").each(function(){
			     if($(this).find("input:checkbox:eq(0)").prop("checked")){
			         $(this).find("select").val(val);
				 }
			 });
		});
	    $(this).parent().parent().find("input:checkbox").each(function(i){
			if(i>=1){
			 var val = $(this).prop("checked");
		     $("tr.nr").each(function(){
			     if($(this).find("input:checkbox:eq(0)").prop("checked")){
			        if(val){
					    $(this).find("input:checkbox:eq("+i+")").attr("checked",true);
					}else{
					    $(this).find("input:checkbox:eq("+i+")").attr("checked",false);
					}
				 }
			 });
			}
		});
		
	});
}