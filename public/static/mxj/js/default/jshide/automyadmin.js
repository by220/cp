function myready(){
	changeh(document.documentElement.scrollHeight + 500);
	$(".game_class a.g"+gid).addClass("selected");

	$(".game_class a").click(function(){		
        window.location.href = mulu + "libset?xtype=auto&gid="+$(this).attr('gid');
	});
	
	$(".data_table td").mouseover(function(){
	    $(this).parent().addClass("hover");
	}).mouseout(function(){
	    $(this).parent().removeClass("hover");
	});
	
	$(".send").click(function(){
		var str='{';
		var err1=false;
		var err2=false;
		var err3=false;
		var i=0;
		$(".nr").each(function(){
			  var ifok ;
			  if($(this).find(".ifok").prop("checked")==true){
			      ifok=1;
			  }else{
			      ifok=0;
			  }
			  var yj;
			  if($(this).find(".yj").prop("checked")==true){
			      yj=1;
			  }else{
			      yj=0;
			  }
			  var ifzc = $(this).find(".ifzc").val();
		
			  var qsnum = Number($(this).find(".qsnum").val());
			  var qspeilv = Number($(this).find(".qspeilv").val());
			  var startje = Number($(this).find(".startje").val());
			  var startpeilv = Number($(this).find(".startpeilv").val());
			  var addje = Number($(this).find(".addje").val());
			  var attpeilv = Number($(this).find(".attpeilv").val());
			  var lowpeilv = Number($(this).find('.lowpeilv').val());
			  var stopje = Number($(this).find('.stopje').val());
			  var ftype = $(this).attr('f');
			  
			  if(i>0) str += ',';
			  str += '"'+i+'":{"ifok":"'+ifok+'","ifzc":"'+ifzc+'","ftype":"'+ftype+'","startje":"'+startje+'","startpeilv":"'+startpeilv+'","addje":"'+addje+'","attpeilv":"'+attpeilv+'","lowpeilv":"'+lowpeilv+'","stopje":"'+stopje+'","yj":"'+yj+'","qsnum":"'+qsnum+'","qspeilv":"'+qspeilv+'"}';
			  if(startje%1!=0 | addje%1!=0 | stopje%1!=0 | qsnum%1!=0) err1=true;
			  if((startpeilv*10000)%1!=0  | (attpeilv*10000)%1!=0 | (lowpeilv*10000)%1!=0 | (qspeilv*10000)%1!=0) err2=true;
			  
			  i++;
		});
		str += '}';

		if(err1){
		     alert("金额只能输入整数");
			 return false;
		}
		if(err2){
		     alert("赔率支持4位小数");
			 return false;
		}	
		str = '&str='+str+'&gid='+gid;
	    $.ajax({type:'POST',
		   url:mulu + 'libset',
		   data:'xtype=setauto'+str,
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
            data: 'xtype=yiwotongbuauto&gid='+gid,
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
