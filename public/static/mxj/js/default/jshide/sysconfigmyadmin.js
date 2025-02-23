function myready() {
	changeh(document.documentElement.scrollHeight+500);
    $(".data_table tr").mouseover(function(){$(this).addClass('hover')}).mouseout(function(){$(this).removeClass('hover')});  
	$(".editall").click(function() {
		var passtime = $(".passtime").val();
		var livetime = $(".livetime").val();
		var maxpc = $(".maxpc").val();
		var tzjg = $(".tzjg").val();
		var supass= $(".supass").val();
		var reseted = $(".reseted").val();
		var editstart = $(".editstart").val();
		var editend = $(".editend").val();
		var moneytype = $(".moneytype").val();
		var comattpeilv = $(".comattpeilv").prop('checked') ? 1 : 0;
		var flyflag = $(".flyflag").prop('checked') ? 1 : 0;
		var autobaoma = $(".autobaoma").prop('checked') ? 1 : 0;
		var ifopen = $(".ifopen").prop('checked') ? 1 : 0;
		var editzc = $(".editzc").prop('checked') ? 1 : 0;
		var deluser = $(".deluser").prop('checked') ? 1 : 0;
		var autoresetpl = $(".autoresetpl").prop('checked') ? 1 : 0;
		var autold = $(".autold").prop('checked') ? 1 : 0;
		var plresetfs = $(".plresetfs").val();
		var loginfenli = $(".loginfenli").prop('checked') ? 1 : 0;
		var zcmode = $(".zcmode").val();
		var plc = $(".plc").val();
		var minje = $(".minje").val();
		var pk10num = $(".pk10num").val();
		var pk10ts = $(".pk10ts").val();
		var pk10niu = $(".pk10niu").prop('checked') ? 1 : 0;
        var yingxz = $(".yingxz").val();
        var yingxzje = $(".yingxzje").val();
		
        str = "&passtime="+passtime;
		str += "&livetime="+livetime;
		str += "&maxpc="+maxpc;
		str += "&tzjg="+tzjg;
		str += "&supass="+supass;
		str += "&reseted="+reseted;
		str += "&editstart="+editstart;
		str += "&editend="+editend;
		str += "&moneytype="+moneytype;
		str += "&comattpeilv="+comattpeilv;
		str += "&flyflag="+flyflag;
		str += "&autobaoma="+autobaoma;
		str += "&ifopen="+ifopen;
		str += "&editzc="+editzc;
		str += "&deluser="+deluser;
		str += "&autoresetpl="+autoresetpl;
		str += "&autold="+autold;
		str += "&plresetfs="+plresetfs;
		str += "&loginfenli="+loginfenli;
		str += "&zcmode="+zcmode;
		str += "&plc="+plc;
		str += "&minje="+minje;
		str += "&pk10num="+pk10num;
		str += "&pk10ts="+pk10ts;
		str += "&pk10niu="+pk10niu;
        str += "&yingxz="+yingxz;
        str += "&yingxzje="+yingxzje;
        var pass = prompt("请输入密码:", '');
        str += "&pass="+pass;
		
		$.ajax({
			type: 'POST',
			url: mulu + 'sysconfig',
			data: 'xtype=setsys' + str,
			success: function(m) {			
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

	$(".czmoneypass").click(function(){
		$.ajax({
			type: 'POST',
			url: mulu + 'suser',
			data: 'xtype=rmoneypass',
			success: function(m) {			
				if (Number(m) == 1) {
					alert('重置转账密码成功！');
				}
				if (Number(m) == 2) {
					alert("密码错误!");
				}
			}
		})
	});
}