var upl;
function myready() {
	$('#date').change(get).datepicker();
	$("#game").change(function() {
		get();
	});
	$('table.list tbody tr:not(.head)').hover(function() {
		$(this).addClass('hover');
	}, function() {
		$(this).removeClass('hover');
	});
	upl = setTimeout(updatel, 1000);
}

function get() {
	var gid = $("#game").val();
	var date = $("#date").val();
	window.location.href = mulu + "longs?gid=" + gid + "&date=" + date;
}


function updatel(news) {
	clearTimeout(upl);
	var m1 = $("#result_balls", parent.document).find("span:eq(0)").find("b").html();
	var qs = $("#result_info", parent.document).attr('v');
	if (fenlei == 151) t = 0;
	var obj = $("#result_info", parent.document);
	var objb = $("#result_balls", parent.document);
	if (m1 == undefined) m1 = 'X';
	var t=0;
	$.ajax({
		type: 'POST',
		url: mulu + 'make',
		dataType: 'json',
		cache: false,
		data: "xtype=upl&qs=" + qs + "&m1=" + m1 + "&tu=" + t + "&news=" + news,
		success: function(m) {
           //console.log(m);
           m=m.msg;
			if (m[0] != 'A') {
				var ml = m[4].length;
				if (m[7] != "") {
					alert("\r\n\r\n\r\n\r\n" + m[7] + "\r\n\r\n\r\n\r\n");
				}
				if (m[4][0] != '' & m[4][0] != null) {
					obj.attr('v', m[5]);
					obj.find("div:eq(0)").html(m[6]);
					obj.find("div:eq(1)").html(m[5] + "期开奖");
					var str = "";
					var sum = 0;

					if (fenlei == 101 || fenlei == 107) {
						$(".last10tb", parent.document).html(m[8]);

					}

					if (fenlei == 163) {
						qiunames = ["百", "十", "个"];
					}
					if (fenlei == 101) {
						qiunames = ["万", "千", "百", "十", "个"];
					}
					for (i = 0; i < ml; i++) {
						if (fenlei == 107) if (m[4][i] != '') {
							m[4][i] = Number(m[4][i]);
						}
						if (fenlei == 100 & i == ml - 1) if (m[4][i] != '' & m[4][i] != null) {
							str += "<span class='plus'>+</span>";
						}
						if (fenlei == 163) {
							if (m[4][i] != '') {
								str += "<span><b class='b" + m[4][i] + "'>" + m[4][i] + "</b><!--<i style='margin-left:-10px;'>" + qiunames[i] + "</i>-->";
								if (i == ml - 1) str += "<i style='margin:-25px 0px 0px 40px'>=</i>";
								else str += "<i style='margin:-25px 0px 0px 40px'>+</i>";
								str += "</span>";
								sum += Number(m[4][i]);
							}
						} else {
							if (m[4][i] != '' & m[4][i] != null) {
								if (fenlei == 101) {
									str += "<span><b class='b" + m[4][i] + "'>" + m[4][i] + "</b><!--<i>" + qiunames[i] + "</i>--></span>";
								} else {
									str += "<span><b class='b" + m[4][i] + "'>" + m[4][i] + "</b></span>";
								}
							}
						}
					}
					if (fenlei == 163) {
						if (str != '') str += "<span><b class='bg b_" + sum + "'>" + sum + "</b><!--<i>和</i>--></span>";
					}
					objb.html(str);
					if (ngid == 101) {
						objb.attr("class", "L_CQHLSX");
					} else {
						var gname = $("#result_info div:eq(0)", parent.document).html();
						if (gname.indexOf('农场') != -1) {
							objb.attr("class", "L135");
						} else {
							objb.attr("class", "T" + fenlei);
						}

					}
                    //console.log(m[3]);
					if (m[3] == 1) {
						bofang("kaijiang");
						setTimeout(function(){window.location.href=window.location.href;},5000);
					}



				}

			}


		}
	});
	upl = setTimeout(updatel, 10000);
}
