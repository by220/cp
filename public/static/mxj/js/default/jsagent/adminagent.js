var settime0;
var settime1;
var time0 = 0;
var time1 = 0;
var tb;

function myready() {
	$(".menu li").click(function() {
		var url = $(this).attr('url');
		if (url == 'user') {
			$("#bottom").attr('src', url + ".php?xtype=show&layer=" + (Number($(this).attr('layer')) + 1))
		} else if (url == 'top') {
			window.location.href = url + ".php?logout=yes"
		} else {
			$("#bottom").attr('src', url + ".php?xtype=show")
		}
		return false
	});
	$(".usertb a").click(function() {
		var layer = $(this).attr('layer');
		$("#bottom").attr('src', "user.php?xtype=show&layer=" + layer)
	});
	$(".zdtb a").click(function() {
		var url = $(this).attr('url');
		$("#bottom").attr('src', url + ".php?xtype=show")
	});
	$(".accounttb a").click(function() {
		var surl = $(this).attr('surl');
		var action = $(this).attr('action');
		$("#bottom").attr('src', surl + ".php?xtype=" + action)
	});
	$(".baotb a").click(function() {
		var url = $(this).attr('url');
		$("#bottom").attr('src', "baox.php?xtype=" + url)
	});
	$(".menu li.over").mouseover(function() {
		var url = $(this).attr('url');
		if (url == 'slib') {
			tb = 'zdtb'
		} else if (url == 'account') {
			tb = 'accounttb'
		}
		var posi = $(this).position();
		$("." + tb).css('top', posi.top + $(this).height() - 3);
		$("." + tb).css('left', posi.left);
		$(".smenu").hide();
		$("#tmfrm").css('left', posi.left);
		$("." + tb).show();
		$("#tmfrm").show();
		$("#tmfrm").css("height", $("." + tb).height());
		$("." + tb).mouseleave(function() {
			$(".smenu").hide();
			$("#tmfrm").hide()
		})
	});
	$(".game").change(function() {
		var gid = $(this).val();
		window.location.href="admin.php?gids="+gid;					   
		return;					   
		
		$.ajax({
			type: 'POST',
			url: mulu + 'admin.php',
			data: 'xtype=setgame&gid=' + gid,
			success: function(m) {
				if (Number(m) == 1) {
					window.location.reload();
				}
			}
		})
	});
	$("label").addClass('blue');
	if ($(".time0").html() != undefined ) {
		time0 = Number($(".time0").html());
		
		if (Math.abs(time0) <= 2) {
			setTimeout(window.location.reload(), 3000);
			//return true;
		}
		if (time0 < 0) time0 = 0 - time0;
		time0x();
		setTimeout(getnowtime, 10000)
	}
	
	if ($(".time1").html() != undefined ) {
		time1 = Number($(".time1").html());
		
		if (Math.abs(time1) <= 2) {
			setTimeout(window.location.reload(), 3000);
			//return true;
		}
		if (time1 < 0) time1 = 0 - time1;
		time1x()
	}
	getnews();
	$("#bottom").css("height", $(window).height() - 71);
	if ($(window).height() < 500) {
		$("#bottom").css("height", 540)
	}
	if ($("#amess").val() != '') {
		alert($("#amess").val())
	}
	$("#bottom").attr("src", "slib.php?xtype=show");
	

	
	$(".game2 label").click(function(){
	    window.location.href = mulu + "admin.php?xtype=show&gids="+$(this).attr('gid');
		 return;
	});

}
function getnews() {
	$.ajax({
		type: 'POST',
		url: mulu + 'admin.php',
		dataType: 'json',
		data: 'xtype=getnews',
		cache: false,
		success: function(m) {
			var mlength = m.length;
			var str = '';
			for (i = 0; i < mlength; i++) {
				str += '' + m[i]['content'] + '<!--<label>[' + m[i]['time'] + ']</label>-->&nbsp;'
			}
			$(".mess marquee").html(str);
			setTimeout(getnews, 30000);
			m = null;
			str = null
		}
	})
}
function kj() {
	$.ajax({
		type: 'POST',
		url: mulu + 'top.php',
		dataType: 'json',
		data: 'xtype=kj',
		cache: false,
		success: function(m) {
			var str = '';
			$("span.kj").html(m[0] + "期开奖结果：");
			for (i = 1; i <= 6; i++) {
				if (m[i] != undefined) {
					str += "<img src='" + globalpath + "imgs/" + m[i] + ".gif' />"
				}
			}
			if (m[7] != undefined) {
				str += "T：<img src='" + globalpath + "imgs/" + m[7] + ".gif' />";
				top.indexFrame.window.href = top.indexFrame.window.href
			}
			$("label.kj").html(str);
			setTimeout(kj, 3000)
		}
	})
}
function getopens() {
	$.ajax({
		type: 'POST',
		url: mulu + 'admin.php',
		dataType: 'json',
		data: 'xtype=getopen',
		cache: false,
		success: function(m) {
			if (Number(m[0]) != Number($("#tes").val()) | Number(m[1]) != Number($("#others").val())) {
				window.location.href = window.location.href
			} else {
				setTimeout(getopen, 15000)
			}
		}
	})
}
function getnowtime() {
	$.ajax({
		type: 'POST',
		url: mulu + 'time.php',
		data: 'xtype=getopen',
		cache: false,
		success: function(m) {
			clearTimeout(settime0);
			clearTimeout(settime1);
			m = m.split('|');
			time0 = Number(m[0]);
			time1 = Number(m[1]);
			time0x();
			time1x()
		}
	});
	setTimeout(getnowtime, 10000)
}
function time0x() {
	time0--;
	var str = '';
	var d = 0,
		h = 0,
		m = 0,
		s = 0;
	d = Math.floor(time0 / (60 * 60 * 24));
	h = Math.floor((time0 - d * 60 * 60 * 24) / (60 * 60));
	m = Math.floor((time0 - d * 60 * 60 * 24 - h * 60 * 60) / 60);
	s = time0 - d * 60 * 60 * 24 - h * 60 * 60 - m * 60;
	if (d > 0) str += "<label>" + d + "</label>天";
	if (h > 0) str += "<label>" + h + "</label>时";
	if (m > 0) str += "<label>" + m + "</label>分";
	str += "<label>" + s + "</label>秒";
	if(time0>0){
	  $(".time0").html(str);
	}else{
	$(".time0").html("<label>0</label>秒");
	}
	if (time0 <= 0) {
		getopen();
		return
	}
	settime0 = setTimeout(time0x, 1000)
}
function time1x() {
	time1--;
	var str = '';
	var d = 0,
		h = 0,
		m = 0,
		s = 0;
	d = Math.floor(time1 / (60 * 60 * 24));
	h = Math.floor((time1 - d * 60 * 60 * 24) / (60 * 60));
	m = Math.floor((time1 - d * 60 * 60 * 24 - h * 60 * 60) / 60);
	s = time1 - d * 60 * 60 * 24 - h * 60 * 60 - m * 60;
	if (d > 0) str += "<label>" + d + "</label>天";
	if (h > 0) str += "<label>" + h + "</label>时";
	if (m > 0) str += "<label>" + m + "</label>分";
	str += "<label>" + s + "</label>秒";
	if(time1>0){
	  $(".time1").html(str);
	}else{
	$(".time1").html("<label>0</label>秒");
	}
	if (time1 <= 0) {
		getopen();
		return
	}
	settime1 = setTimeout(time1x, 1000)
}

function getopen() {
	$.ajax({
		type: 'POST',
		url: mulu + 'admin.php',
		dataType: 'json',
		data: 'xtype=getopen',
		cache: false,
		success: function(m) {
			if ((Number(m[0]) != Number($(".panstatus").attr('s')) | Number(m[1]) != Number($(".otherstatus").attr('s'))) & (Number(m[0]) == 0 | Number(m[0]) == 1)) {
				$(".panstatus").attr('s', m[0]);
				$(".otherstatus").attr('s', m[1]);
				if (Number(m[0]) == 0) {
					$(".panstatus").html($(".panstatus").html().replace("关", "开"))
				} else {
					$(".panstatus").html($(".panstatus").html().replace("开", "关"))
				}
				if (Number(m[1]) == 0) {
					$(".otherstatus").html($(".otherstatus").html().replace("关", "开"))
				} else {
					$(".otherstatus").html($(".otherstatus").html().replace("开", "关"))
				}
				getnowtime();
				if($("#bottom").attr("src").indexOf('lib.php')!=-1){
					window.bottom.location.href = "slib.php?xtype=show";
				}
			} else {
				setTimeout(getopen, 3000)
			}
		}
	})
}

function xreload() {
	window.check.location.href = 'check.php';
	return false
}
function getResult(num, n) {
	return Math.round(num * Math.pow(10, n)) / Math.pow(10, n)
}
function strlen(sString) {
	var sStr, iCount, i, strTemp;
	iCount = 0;
	sStr = sString.split("");
	for (i = 0; i < sStr.length; i++) {
		strTemp = escape(sStr[i]);
		if (strTemp.indexOf("%u", 0) == -1) {
			iCount = iCount + 1
		} else {
			iCount = iCount + 2
		}
	}
	return iCount
}