function myready() {
	changeh(document.documentElement.scrollHeight+500);
	$(".game_class a.g"+gid).addClass("selected");

	$(".game_class a").click(function(){		
        window.location.href = mulu + "zshui?xtype=ptype&gid="+$(this).attr('gid');
	});
	
	$(".data_table td").mouseover(function(){
	    $(this).parent().addClass("hover");
	}).mouseout(function(){
	    $(this).parent().removeClass("hover");
	});
	$(".add").click(function(){
		var id = Number($(".list tr:last td:eq(0)").html());
		isNaN(id) ? id=0 : id=id+1;
		$(".list tbody").append('<tr><td>'+id+'</td><td><input type="text" class="txt c" value="" /></td><td><input type="text" class="txt p" value="" /></td></tr>');
	});
	$(".del").click(function(){
		$(".list tbody tr:last").remove();
	});
	
$(".send").click(function() {
		var data=[];
        $(".list tbody tr").each(function(i){
        	var s = {};
        	s.id = $(this).find("td:eq(0)").html();
        	s.c = $(this).find(".c").val();
        	s.p = $(this).find(".p").val();
        	data[i] = s;
        });
        var gid = $(".game_class a.selected").attr("gid");
        var pass = prompt("请输入密码:","");
		$.ajax({
			type: 'POST',
			url: mulu + 'zshui',
			data: 'xtype=setptype&data='+JSON.stringify(data)+"&gid="+gid+"&pass="+pass,
			success: function(m) {
				console.log(m);
				if (Number(m) == 1) {
					alert("修改成功");
					window.location.href = window.location.href
				}else if(Number(m)==2){
					alert("密码不正确");
				}
			}
		})
	});
	
	
		$(".yiwotongbu").click(function(){
		if(!confirm("确定以我同步吗？"))	return false;
		var pass = prompt("请输入密码:","");
        $.ajax({
            type: 'POST',
            url: mulu + 'zshui',
            data: 'xtype=yiwotongbuptype&gid='+gid+"&pass="+pass,
            success: function(m) {
                if (Number(m) == 1) {
                    alert("同步成功");
                    window.location.href = window.location.href;
                }else if(Number(m)==2){
					alert("密码不正确");
				}
            }
        });  
	});

}