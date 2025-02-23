
function myready(){
	$(".userid").val(uids);
	$(".userid").change(function(){
	   window.location.href = mulu + "money?xtype=banknum&uid="+$(this).val();
	});
   $(".add").click(function(){
	   var banks = $(".banks").html();
       var str = "<tr id='new'><td class='tcenter'>"+$(".userid").find("option:selected").html()+"</td><td><select>"+banks+"</select></td><td><input type='text' class='input num inputs' /></td><td><input type='text' class='input name' /></td><td><input type='text' class='input kaihuhang inputs' /></td><td><input type='text' class='input bankpass inputs' /></td><td><input type='checkbox' class='ifok' /></td><td class='tcenter'><input type='button' class='button del' value='删除' /></td></tr>";
       $(this).parent().parent().before(str);
	   $("input.del").unbind("click");
   $("input.del").click(function(){
	    var bankid = $(this).parent().parent().find("select").length;
		if(bankid==1) {
		    $(this).parent().parent().remove();
			return false;
		}
		bankid = $(this).parent().parent().attr("id");
		$.ajax({
			type: 'POST',
			url: mulu + 'money',
			data: 'xtype=dbanknum&id=' + bankid+"&uid="+$(".userid").val(),
			success: function(m) {			
				if (Number(m) == 1) {
					alert('ok');
					window.location.href = window.location.href
				}
			}
		});
   });
   });
   $(".save").click(function(){
       var str = '[';
	   $("input.kaihuhang").each(function(i){
		   var obj = $(this).parent().parent();
		   var ifok = obj.find("input.ifok").prop("checked")?1:0;
		   if(i>0) str += ",";
	       str += '{"id":"'+obj.attr("id")+'"';
		   str += ',"bankid":"'+obj.find("select").val()+'"';
		   str += ',"uid":"'+$(".userid").val()+'"';
		   str += ',"name":"'+obj.find("input.name").val()+'"';
		   str += ',"num":"'+obj.find("input.num").val()+'"';
		   str += ',"kaihuhang":"'+obj.find("input.kaihuhang").val()+'"';
		   str += ',"bankpass":"'+obj.find("input.bankpass").val()+'"';
		   str += ',"ifok":"'+ifok+'"}';
	   });
	   str += ']';   
		$.ajax({
			type: 'POST',
			url: mulu + 'money',
			data: 'xtype=setbanknum&str=' + str,
			success: function(m) {	
			
				if (Number(m) == 1) {
					alert('ok');
					window.location.href = window.location.href
				}
			}
		});
   });
   
   $("input.del").click(function(){
	    var bankid = $(this).parent().parent().find("select").length;
		if(bankid==1) {
		    $(this).parent().parent().remove();
			return false;
		}
		bankid = $(this).parent().parent().attr("id");
		$.ajax({
			type: 'POST',
			url: mulu + 'money',
			data: 'xtype=dbanknum&id=' + bankid+"&uid="+$(".userid").val(),
			success: function(m) {			
				if (Number(m) == 1) {
					alert('ok');
					window.location.href = window.location.href
				}
			}
		});
   });
}