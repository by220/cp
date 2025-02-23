function myready(){
	changeh(document.documentElement.scrollHeight+500);
	$("input:button").addClass("btnf");
	$("label").addClass('red');
   $(".edit").click(function(){
      var autoopenpan=0;
	  if($(".autoopenpan").prop("checked")==true){
	      autoopenpan=1;
	  }
      var autofly=0;
	  if($(".autofly").prop("checked")==true){
	      autofly=1;
	  }
      var kjjs=0;
	  if($(".kjjs").prop("checked")==true){
	      kjjs=1;
	  }

      var slowautoopenpan=0;
	  if($(".slowautoopenpan").prop("checked")==true){
	      slowautoopenpan=1;
	  }
      var slowautofly=0;
	  if($(".slowautofly").prop("checked")==true){
	      slowautofly=1;
	  }
      var slowkjjs=0;
	  if($(".slowkjjs").prop("checked")==true){
	      slowkjjs=1;
	  }
	  
	 var str = "&autoopenpan="+autoopenpan+"&autofly="+autofly+"&kjjs="+kjjs+"&slowautoopenpan="+slowautoopenpan+"&slowautofly="+slowautofly+"&slowkjjs="+slowkjjs;
        $.ajax({
            type: 'POST',
            url: mulu + 'check',
            data: 'xtype=setctrl' + str,
            success: function(m) {
                if (Number(m) == 1) {
                    window.location.reload();
                }
            }
        })
   });
   $(".tg").click(function(){
	   var ac = $(this).attr('ac');
	   var name = $(this).attr('name');
        $.ajax({
            type: 'POST',
            url: mulu + 'check',
            data: 'xtype=tg&ac='+ac+"&name="+name,
            success: function(m) {
				        console.log(m);
                if (Number(m) == 1) {
                    window.location.reload();
                }
            }
        }) 
   });
   $(".upgn").click(function(){
		var str='';
		$(this).parent().find("input:checkbox").each(function(){
		    var tmp=0;
			if($(this).prop("checked")) tmp=1;
			str += "&"+$(this).attr("class")+"="+tmp;
		});
        $.ajax({
            type: 'POST',
            url: mulu + 'check',
            data: "xtype=upgn"+str,
            success: function(m) {		
                if (Number(m) == 1) {
                    window.location.reload();
                }
            }
        }) 
   });
   
   $(".qkerr").click(function(){
	   if(!confirm("确定清空ERR表吗？")) return false;
        $.ajax({
            type: 'POST',
            url: mulu + 'check',
            data: 'xtype=qkerr',
            success: function(m) {
                if (Number(m) == 1) {
                    window.location.reload();
                }
            }
        }) 
   });
   
   $(".mrg").click(function(){
	   var ac = $(this).attr('ac');
	   var pass= prompt("请输入密码:","");
	   var tb='|';
	   $(".mrgs").each(function(){
	      if($(this).prop("checked")==true){
		     tb += $(this).val()+"|";
		  }
	   });
        $.ajax({
            type: 'POST',
            url: mulu + 'check',
            data: 'xtype=mrg&ac='+ac+"&pass="+pass+"&tb="+tb,
            success: function(m) {
                console.log(m);
                if (Number(m) == 2) {
                    alert("密码错误");
                }else if (Number(m) == 1) {
                    window.location.reload();
                }
            }
        }) 
   });
   $(".clickall").click(function(){
       if($(this).prop("checked")==true){
	       $(".mrgs").attr("checked",true);
	   }else{
           $(".mrgs").attr("checked",false);
	   }
   });
}