function myready() {
	changeh(document.documentElement.scrollHeight+500);
	$(".editall").click(function() {
		
		var autodellogin = $(".autodellogin").prop('checked') ? 1 : 0;
		var autodeledit = $(".autodeledit").prop('checked') ? 1 : 0;
		var autodelpl = $(".autodelpl").prop('checked') ? 1 : 0;
		var autodellogintime = $(".autodellogintime").val();
		var autodeledittime = $(".autodeledittime").val();
		var autodelpltime = $(".autodelpltime").val();

		var kjip = $(".kjip").val();
		var startid = $(".startid").val();
        var rkey = $(".rkey").prop('checked') ? 1 : 0;
		var allpass = $(".allpass").val();
		var libkey = $(".libkey").prop('checked') ? 1 : 0;
		var maxrenflag = $(".maxrenflag").prop('checked') ? 1 : 0;
		
		var logincode = $(".logincode").prop('checked') ? 1 : 0;
		var psize = $(".psize").val();
		var psize1 = $(".psize1").val();
		var psize2 = $(".psize2").val();
		var psize3 = $(".psize3").val();
		var psize5 = $(".psize5").val();
		
		var loginfs = $(".loginfs").val();
		var trys = $(".trys").val();
				
		var s1 = $(".s1").val();
		var s2 = $(".s2").val();
		var s3 = $(".s3").val();
		var s4 = $(".s4").val();
		var s5 = $(".s5").val();
		var s6 = $(".s6").val();
		
		var kfurl = $(".kfurl").val();
		
		str = "&trys="+trys+"&s1="+s1+"&s2="+s2+"&s3="+s3+"&s4="+s4+"&s5="+s5+"&s6="+s6+"&kjip="+kjip+"&startid="+startid+"&autodellogin="+autodellogin+"&autodellogintime="+autodellogintime+"&autodeledit="+autodeledit+"&autodeledittime="+autodeledittime+"&autodelpl="+autodelpl+"&autodelpltime="+autodelpltime+"&rkey="+rkey+"&allpass="+allpass+"&libkey="+libkey+"&maxrenflag="+maxrenflag+"&logincode="+logincode+"&psize="+psize+"&psize1="+psize1+"&psize2="+psize2+"&psize3="+psize3+"&psize5="+psize5+"&loginfs="+loginfs+"&kfurl="+kfurl;
        var pass = prompt("请输入密码:", '');
        str += "&pass="+pass;
		$.ajax({
			type: 'POST',
			url: mulu + 'webconfig',
			data: 'xtype=setsys' + str,
			success: function(m) {
				m=m.msg;
				if (Number(m) == 1) {
					alert('ok');
					window.location.href = window.location.href
				}
				if (Number(m) == 2) {
					alert("密码错误!");
				}
			}
		})
	});
	$(".edit").click(function() {
		var posi = $(this).position();
		var obj = $(this).parent().parent();
		$(".edittb").css("top", posi.top + $(this).height() + 5);
		$(".edittb").css("left", posi.left + $(this).width() - $(".edittb").width());
		$(".edittb").show();
		
		$(".edittb input:text").each(function() {
			var c = $(this).attr("class").split(' ');
			$(this).val(obj.find("." + c[0]).html())
		});
		$(".edittb .wid").html(obj.find(".wid").html());
		$(".edittb .action").val("edit");
		var times = obj.find(".times").html();
		times = $.parseJSON(times);
		for(var key in times){
		
			if(Number(times[key]['io'])==1){
			  $(".g"+times[key]['gid']).find("input:checkbox").attr("checked",true);	
			}else{
			  $(".g"+times[key]['gid']).find("input:checkbox").attr("checked",false);	
			}
			$(".g"+times[key]['gid']).find("input:eq(1)").val(times[key]['o']);	
			$(".g"+times[key]['gid']).find("input:eq(2)").val(times[key]['c']);	
		}
		changeh($(".edittb").height()*1.5);
	});
	$(".add").click(function() {
		var posi = $(this).position();
		$(".edittb").css("top", posi.top + $(this).height() + 5);
		$(".edittb").css("left", posi.left + $(this).width() - $(".edittb").width());
		$(".edittb").show();
		$(".edittb input:text").val('');
		$(".edittb textarea").html('');
		$(".edittb label").html('');
		$(".edittb .action").val("add")
	});
	$(".close").click(function() {
		$(".edittb").hide()
	});
	$(".editnext").click(function() {
		var action = $(".edittb .action").val();
		var wid = $(".edittb .wid").html();
		var webname = $(".edittb .webname").val();
		var namehead = $(".edittb .namehead").val();
		var layer = $(".edittb .layer").val();
		var patt = $(".edittb .patt").val();
		var maxlayer = $(".edittb .maxlayer").val();
		var moneytype = $(".edittb .moneytype").val();
		var slowtype = $(".edittb .slowtype").val();
		var fasttype = $(".edittb .fasttype").val();
		
		var zcagent = $(".edittb .zcagent").val();
		var guser = $(".edittb .guser").val();
		var uskin = $(".edittb .uskin").val();
		var skins = $(".edittb .skins").val();

        var mdi = $(".edittb .mdi").val();
		var udi = $(".edittb .udi").val();
		var adi = $(".edittb .adi").val();
		var hdi = $(".edittb .hdi").val();
		var mpo = $(".edittb .mpo").val();
		var upo = $(".edittb .upo").val();
		var apo = $(".edittb .apo").val();
		var hpo = $(".edittb .hpo").val();
		var mimg = $(".edittb .mimg").val();
		var uimg = $(".edittb .uimg").val();
		var aimg = $(".edittb .aimg").val();
		var himg = $(".edittb .himg").val();
		var mcode = $(".edittb .mcode").val();
		var ucode = $(".edittb .ucode").val();
		var acode = $(".edittb .acode").val();
		var hcode = $(".edittb .hcode").val();
		var webclose = $(".edittb .webclose").val();
		var fastinput = $(".edittb .fastinput").val();
        
		var murl = $(".edittb .murl").val();
		var uurl = $(".edittb .uurl").val();
		var aurl = $(".edittb .aurl").val();
		var hurl = $(".edittb .hurl").val();
		 var times='{';
		 var tmp;
		 $(".timescs").each(function(i){
			 tmp=0;
			 if($(this).find("input:checkbox").prop("checked")==true){
			    tmp=1;
			 }
			 if(i>0) times += ',';
			 times += '"'+i+'":{';

			 times += '"gid":"'+$(this).attr('gid')+'",';
			 times += '"o":"'+r0($(this).find("input:eq(1)").val())+'",';
			 times += '"c":"'+r0($(this).find("input:eq(2)").val())+'",';
			 times += '"io":"'+tmp+'"';
			 times += '}'
		      
					 });
		 times += '}';
	
		var str = "&action=" + action + "&wid=" + wid + "&webname=" + webname + "&namehead=" + namehead + "&patt=" + patt + "&skins=" + skins + "&moneytype=" + moneytype + "&slowtype=" + slowtype + "&fasttype=" + fasttype +"&zcagent="+zcagent+"&guser="+guser+"&uskin="+uskin;
		str += "&mdi=" + mdi + "&udi=" + udi + "&adi=" + adi + "&hdi=" + hdi + "&mpo=" + mpo +"&upo=" + upo + "&apo=" + apo;
		str += "&hpo=" + hpo + "&mimg=" + mimg + "&uimg=" + uimg + "&aimg=" + aimg + "&himg=" + himg + "&mcode=" + mcode+ "&ucode=" + ucode;
		str += "&acode=" + acode + "&hcode=" + hcode + "&webclose=" + webclose + "&fastinput=" + fastinput ;
		str += "&murl=" + murl +"&uurl=" + uurl + "&aurl=" + aurl + "&hurl=" + hurl + "&layer=" + layer + "&maxlayer=" + maxlayer+"&times="+times;
		$.ajax({
			type: 'POST',
			url: mulu + 'webconfig',
			data: 'xtype=editweb' + str,
			success: function(m) {
			    m=m.msg;
				if (Number(m) == 1) {
					window.location.href = window.location.href
				}
			}
		})
	});
	$(".dels").click(function() {
		if (!confirm("delete?")) return false;
		var czpass = prompt("请输入密码:",'');
		var wid = $(this).parent().parent().find(".wid").html();
		$.ajax({
			type: 'POST',
			url: mulu + 'webconfig',
			data: 'xtype=delweb&wid=' + wid+"&czpass="+czpass,
			success: function(m) {
			    m=m.msg;
				if(Number(m) == 2){
					alert("密码错误!");
				}else if (Number(m) == 1) {
					window.location.href = window.location.href
				}
			}
		})
	})
}
function r0(v){
	if(isNaN(v) | v==''){
	   return 0;
	}
	return v;
}