function myready(){
	changeh(document.documentElement.scrollHeight + 500);
	$(".game_class a.g"+gid).addClass("selected");

	$(".game_class a").click(function(){		
        window.location.href = mulu + "libset?xtype=warn&gid="+$(this).attr('gid');
	});
	
	$(".data_table td").mouseover(function(){
	    $(this).parent().addClass("hover");
	}).mouseout(function(){
	    $(this).parent().removeClass("hover");
	});
	
	$(".send").click(function(){
		
		var str = '{';
		var i=0;
		var err = false;
		$(".nr").each(function(){
			  var je = $(this).find(".je").val();
			  var ks = $(this).find(".ks").val();
			  var ftype = $(this).attr('f');
			  if(i>0) str += ',';
			  str += '"'+i+'":{"je":"'+je+'","ks":"'+ks+'","ftype":"'+ftype+'"}';
			  if(je%1!=0) err=true;
			  if(ks%1!=0) err=true;
			  
			  i++;
		});
		str += '}';
	    if(err){
		    alert("请输入整数！");
			return false;
		}
		str = '&str='+str+'&gid='+gid;
	    $.ajax({type:'POST',
		   url:mulu + 'libset',
		   data:'xtype=setwarn'+str,
		   success:function(m){
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
            data: 'xtype=yiwotongbuwarn&gid='+gid,
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
		    $("tr").find("input:checkbox:eq(0)").attr("checked",true);
		}else{
		    $("tr").find("input:checkbox:eq(0)").attr("checked",false);
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

	});
}
