function myready(){
	
   $(".add").click(function(){
       var str = "<tr><td></td><td><input type='text' class='input bankname' /></td><td><input type='text' class='input en' /></td><td class='tcenter'><input type='button' class='button del' value='删除' /></td></tr>";
       $(this).parent().parent().before(str);
   });
   $(".save").click(function(){
       var str = '[';
	   $(".bankname").each(function(i){
		   if(i>0) str += ",";
	       str += '{"bankid":"'+$(this).parent().prev().html()+'"';
		   str += ',"en":"'+$(this).parent().next().find("input:text").val()+'"';
		   str += ',"bankname":"'+$(this).val()+'"}';
	   });
	   str += ']';    
		$.ajax({
			type: 'POST',
			url: mulu + 'money',
			data: 'xtype=setbank&str=' + str,
			success: function(m) {			
				if (Number(m) == 1) {
					alert('ok');
					window.location.href = window.location.href
				}
			}
		});
   });
   
   $(".del").click(function(){
	    var bankid = $(this).parent().parent().find("td:eq(0)").html();
		if(bankid=='') {
		    $(this).parent().parent().remove();
			return false;
		}
		$.ajax({
			type: 'POST',
			url: mulu + 'money',
			data: 'xtype=dbank&bankid=' + bankid,
			success: function(m) {			
				if (Number(m) == 1) {
					alert('ok');
					window.location.href = window.location.href
				}else{
				    alert('该银行已有帐号，不能删除！');
				}
			}
		});
   });
}