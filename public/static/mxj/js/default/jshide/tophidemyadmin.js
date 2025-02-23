var settime0;
var settime1;
var time0 = 0;
var time1 = 0;
var gntime;
var gid;
var upl;

function myready() {
	$(".topmenu li a").click(function() {
		var url = $(this).attr('x');
		if (url == 'user') {
			parent.bottom.window.location.href = url + "?xtype=show&layer=" + $(this).attr('u')
		} else if (url == 'top') {
			parent.bottom.window.location.href = url + "?logout=yes"
		} else if (url == 'admins') {
			parent.bottom.window.location.href = url + "?xtype=list"
		} else if (url == 'class') {
			parent.bottom.window.location.href = url + "?xtype=bigclass"
		} else if (url == 'setatt') {
			parent.bottom.window.location.href = "zshui?xtype=setattshow"
		} else {
			parent.bottom.window.location.href = url + "?xtype=show"
		}
		    $(".panstatus").show();
			$(".otherstatus").hide();
		return false
	});
	$("label").addClass('red');
	if ($(".time0").html() != undefined) {
		time0 = Number($(".time0").html());
		if (time0 < 0) time0 = 0 - time0;
		time0x();
		gntime = setTimeout(getnowtime, 5000)
	}
	if ($(".time1").html() != undefined & 1 == 2) {
		time1 = Number($(".time1").html());
		if (time1 < 0) time1 = 0 - time1;
		time1x()
	}
	$(".game3 label").click(function() {
		changegid($(this).attr('gid'))
	});
	kj();
	upl = setTimeout(updatel, 5000);
	$(".qzclose").click(function() {
		$.ajax({
			type: 'POST',
			url: mulu + 'top',
			data: 'xtype=qzclose',
			success: function(m) {
				if (Number(m) == 1) {
					parent.bottom.window.location.href = parent.bottom.window.location.href;
					window.location.href = window.location.href
				}
			}
		})
	});
	
}
function kj() {
	if (ngid == 161 | ngid == 162) {
		$(".upkj").html($(".upqishu").attr('m'));
		return false
	}
	var upkj = $(".upqishu").attr('m').split(',');
	var ul = upkj.length;
	var str = '';
	for (i = 0; i < ul; i++) {
		if (ngid == 100 & i == 6) str += "<div class='qiu'>T</div>";
		str += qiu(upkj[i])
	}
	$(".upkj").html(str);
	
}
function updatel() {
	clearTimeout(upl);
	var mm= $(".upqishu").attr("m").split(',');
	$.ajax({
		type: 'POST',
		url: mulu + 'top',
		dataType: 'json',
		cache: false,
		data: "xtype=upl&qishu=" + $(".upqishu").html() + "&m1=" +mm[0] ,
		success: function(m) {
			if (m[0] != 'A') {
				$(".upqishu").html(m[0]);
				$(".upqishu").attr("m", m[1]);				
				kj();
				m[1] = m[1].split(',');
				if(m[1][0]!=''){				   
				   bofang("kaijiang");
				}
			}
		}
	});
	upl = setTimeout(updatel, 5000);
}
function changegid(gid) {
	$.ajax({
		type: 'POST',
		url: mulu + 'top',
		data: 'xtype=setgame&gid=' + gid,
		success: function(m) {
			if (Number(m) == 1) {
				parent.bottom.window.location.href = parent.bottom.window.location.href;
				window.location.href = "top?xtype=this"
			}
		}
	})
}
function getnowtime() {
	clearTimeout(gntime);
	$.ajax({
		type: 'POST',
		url: mulu + 'time',
		data: 'xtype=getopen',
		cache: false,
		success: function(m) {
			
			m = m.split('|');
			
			if (m[0] == 'err') {
				top.window.location.href = top.window.location.href
			}
			if (ngid == 100) {
				if (Number(m[2]) != Number($("label.qishu").html()) | Number(m[3]) != Number($(".panstatus").attr('s')) | Number(m[4]) != Number($(".otherstatus").attr('s'))) {
					$(".panstatus").attr('s', m[3]);
					$(".otherstatus").attr('s', m[4]);
					if (Number(m[3]) == 0) {
						$(".panstatus").html($(".panstatus").html().replace("关", "开"))
					} else {
						$(".panstatus").html($(".panstatus").html().replace("开", "关"))
					}
					if (Number(m[4]) == 0) {
						$(".otherstatus").html($(".otherstatus").html().replace("关", "开"))
					} else {
						$(".otherstatus").html($(".otherstatus").html().replace("开", "关"))
					}
					$("label.qishu").html(m[2]);
					if (parent.bottom.window.location.href.indexOf('lib') != -1) {
						parent.bottom.window.location.href = parent.bottom.window.location.href
					}
				}
			clearTimeout(settime1);
			time1 = Number(m[1]);
			time1x()
			} else {
				if (Number(m[2]) != Number($("label.qishu").html()) | Number(m[3]) != Number($(".panstatus").attr('s'))) {
					$(".panstatus").attr('s', m[3]);
					if (Number(m[3]) == 0) {
						$(".panstatus").html($(".panstatus").html().replace("关", "开"))
					} else {
						$(".panstatus").html($(".panstatus").html().replace("开", "关"))
					}
					$("label.qishu").html(m[2]);
					if (parent.bottom.window.location.href.indexOf('lib') != -1) {
						parent.bottom.window.location.href = parent.bottom.window.location.href
					}
				}
			}
			clearTimeout(settime0);
			time0 = Number(m[0]);
			time0x()
		}
	});
	gntime = setTimeout(getnowtime, 5000)
}
function time0x() {
	clearTimeout(settime0);
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
	if (time0 > 0) {
		$(".time0").html(str)
	} else {
		$(".time0").html("<label>0</label>秒")
	}
	if (time0 <= 0) {
		getnowtime();
		return true
	}
	settime0 = setTimeout(time0x, 1000)
}
function time1x() {
	clearTimeout(settime1);
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
	if (time1 > 0) {
		$(".time1").html(str)
	} else {
		$(".time1").html("<label>0</label>秒")
	}
	if (time1 <= 0) {
		time1=3;
	}
	settime1 = setTimeout(time1x, 1000)
}
function getResult(num, n) {
	return Math.round(num * Math.pow(10, n)) / Math.pow(10, n)
}
function qiu(n, bname) {

	if (ngid == 100) {
		var m = Number(n);
		if (in_array(m, ma['紅'])) {
			n = "<div class='qiu qiured'>" + n + "</div>"
		} else if (in_array(m, ma['藍'])) {
			n = "<div class='qiu qiublue'>" + n + "</div>"
		} else {
			n = "<div class='qiu qiugreen'>" + n + "</div>"
		}
		return n
	}
	if (isNaN(n)) {
		return n
	} else {
		if (ngid == 151 | ngid == 152 | ngid==153 | ngid==155  | ngid==157) {
			if(n=='') return n;
			if (n > 100) {
				n = "<img src='../imgn/sz" + (n % 10) + "2.png' /><img src='../imgn/sz" + (n % 10) + "2.png' /><img src='../imgn/sz" + (n % 10) + "2.png' />"
			} else if (n > 10) {
				n = "<img src='../imgn/sz" + n.substr(0, 1) + "2.png' /><img src='../imgn/sz" + (n % 10) + "2.png' />"
			} else {
				n = "<img src='../imgn/sz" + n + "2.png' />"
			}
			return n
		} else if (ngid == 107) {
			n = Number(n);
			if (n == 0) {
				n = "<img src='../img/pk.png'  style='height:20px;' />"
			} else {
				n = "<img src='../img/pk" + n + ".png' style='height:20px;' />"
			}
			return n
		} else {
			if ((ngid == 103 | ngid == 133 | ngid == 135 | ngid == 131 | ngid == 132 | ngid == 136) & n >= 19) {
				return "<div class='qiub1'>" + n + "</div>"
			} else if ((ngid == 121 | ngid == 123 | ngid == 125 | ngid == 127 | ngid == 129 ) & n == 11) {
				return "<div class='qiub1'>" + n + "</div>"
			} else if (bname == '3字合数' | bname == '总和龙虎') {
				return n
			} else if (Number(n) > 40) {
				return "<div class='qiub1'>" + n + "</div>"
			} else if ((ngid==163 | ngid==116 | ngid==117 | ngid==118 | ngid==119) & Number(bname) > 2) {
				return "<div class='qiub1'>" + n + "</div>"
			} else {
				return "<div class='qiua1'>" + n + "</div>"
			}
		}
	}
}
function in_array(v, a) {
	for (key in a) {
		if (a[key] == v) return true
	}
	return false
}
      