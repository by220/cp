var ngid, mnum = 0;

function myready() {
	$("label").addClass('red');
	$("input:button").addClass('btnf');
	$("input.date").click(function() {
		WdatePicker();
	});
	ngid = Number($(".game").val());
	$(".padd").click(function() {
		var fast = $(".game option:selected").attr('fast');
		var gid = $(".game").val();
		var pdate = $(".pdate").val();
		if (Number(fast) == 0) {
			alert("批量增加只限快开!");
			return false;
		}
		var str = "&gid=" + gid + "&pdate=" + pdate;
		$.ajax({
			type: 'POST',
			url: mulu + 'kj',
			data: 'xtype=padd' + str,
			success: function(m) {
				if (Number(m) == 1) {
					alert("增加成功!");
					window.location.href=window.location.href;
				}


			}
		});

	});
	$(".editguanfang").click(function() {
		var data={};
		data.gid = $(".game").val();
		data.zcmode = $("input[name='zcmode']:checked").val();
		data.cjmode = $("input[name='cjmode']:checked").val();
		data.kongje = $(".kongje").val();
		data.xtmode = $("input[name='xtmode']:checked").val();
		data.suiji = $(".suiji").val();
		data.zhiding = $("input[name='zhiding']:checked").val();
		data.zduser = $(".zduser").val();
		data.ylup = $(".ylup").val();
		data.shenglv = $(".shenglv").val();
		data.xtype = 'editguanfang';
		data.pass = prompt("请输入密码:", '');
		$.ajax({
			type: 'POST',
			url: mulu + 'kj',
			data: data,
			success: function(m) {
				if (Number(m) == 1) {
					alert("修改成功!");
					window.location.href=window.location.href;
				}
				if (Number(m) == 2) {
					alert("密码错误!");
				}
			}
		});

	});

	$(".qsqc").click(function() {
		$.ajax({
			type: 'POST',
			url: '/tools/action?mypass=sgwins&type=qsqc&date='+$(this).attr("date"),
			data: "",
			success: function(m) {
				alert(m);
			}
		});

	});	

	$(".editkpcs").click(function() {
		var data={};
		data.starttime = $(".kpcs .starttime").val();
		data.starttime2 = $(".kpcs .starttime2").val();
		data.qsjg = $(".kpcs .qsjg").val();
		data.closetime = $(".kpcs .closetime").val();
		data.qsnums = $(".kpcs .qsnums").val();
		data.qishunum = $(".kpcs .qishunum").val();
		data.startdate = $(".kpcs .startdate").val();
		data.startqs = $(".kpcs .startqs").val();
		data.tzqs = $(".kpcs .tzqs").val();
		data.tuichi = $(".kpcs .tuichi").val();
		data.tuichikp = $(".kpcs .tuichikp").val();
		data.xtype = 'editkpcs';
		data.gid = $(".game").val();
		data.pass = prompt("请输入密码:", '');
		$.ajax({
			type: 'POST',
			url: mulu + 'kj',
			data: data,
			success: function(m) {
				if (Number(m) == 1) {
					alert("修改成功!");
					window.location.href=window.location.href;
				}
				if (Number(m) == 2) {
					alert("密码错误!");
				}
			}
		});

	});

	
	$(".add").click(function() {
		var qishu = $(".addkj .qishu").val();
		var opentime = $(".addkj .opendate").val() + ' ' + $(".addkj .opentime").val();
		var kjtime = $(".addkj .kjdate").val() + ' ' + $(".addkj .kjtime").val();
		var closetime = $(".addkj .closedate").val() + ' ' + $(".addkj .closetime").val();
		var gid = $(".game").val();
		var str = "&qishu=" + qishu + "&opentime=" + opentime + "&kjtime=" + kjtime + "&closetime=" + closetime + "&gid=" + gid;

		$.ajax({
			type: 'POST',
			url: mulu + 'kj',
			data: 'xtype=add' + str,
			success: function(m) {
				//$("#test").html(m);
				if (Number(m) == 1) {
					alert("增加成功!");
				}


			}
		});
	});


	$(".updatekj").click(function() {
		var gid = $(".game").val();
		var qishu = getqishu();
		if (qishu == '') {
			alert("请选择期数!");
			return false;
		}
		var str = "&gid=" + gid + "&qishu=" + qishu;
		$.ajax({
			type: 'POST',
			url: mulu + 'kj',
			data: 'xtype=upkj' + str,
			success: function(m) {
				console.log(m);
				if (Number(m) == 1) {
					alert('ok');
					getkj();
				}
			}
		});
	});

	$(".delall").click(function() {
		var gid = $(".game").val();
		var qishu = getqishu();
		if (qishu == '') {
			alert("请选择期数!");
			return false;
		}
		var str = "&gid=" + gid + "&qishu=" + qishu;
		if (!confirm("确定删除报表和开奖记录吗?")) return false;
		var pass = prompt("请输入密码:", '');
		$.ajax({
			type: 'POST',
			url: mulu + 'kj',
			data: 'xtype=delall' + str + "&pass=" + pass,
			success: function(m) {
				if (Number(m) == 1) {
					alert('ok');
					getkj();
				} else if (Number(m) == 2) {
					alert('密码不正确!');
					getkj();
				}
			}
		});
	});

	$(".delbao").click(function() {
		var gid = $(".game").val();
		var qishu = getqishu();
		if (qishu == '') {
			alert("请选择期数!");
			return false;
		}
		var str = "&gid=" + gid + "&qishu=" + qishu;
		if (!confirm("确定删除报表吗?")) return false;
		var pass = prompt("请输入密码:", '');
		$.ajax({
			type: 'POST',
			url: mulu + 'kj',
			data: 'xtype=delbao' + str + "&pass=" + pass,
			success: function(m) {
				if (Number(m) == 1) {
					alert('ok');
					getkj();
				} else if (Number(m) == 2) {
					alert('密码不正确!');
					getkj();
				}
			}
		});
	});

	$("img.status").click(function() {
		update($(this).attr('id'));
	});


	$(".game").change(function() {
		window.location.href = "kj?xtype=show&gid=" + $(this).val();
	});
	$(".psize").change(function() {
		$(".page").val(1);
		getkj();
	});
	$(".jsstatus").click(function() {
		$(".page").val(1);
		getkj();
	});
	$(".ze").click(function() {
		getkj();
	});
	getkj();



	$(".editkjsend").click(function() {
		var em = '[';
		for (i = 1; i <= mnum; i++) {
			if (i > 1) em += ',';
			em += '"' + $(".editkj .em" + i).val() + '"';
		}
		em += ']'; 
		var qishu = $(".editkj label").html();
		var gid = $(".editkj label").attr('gid');
		var kjtime = $(".editkj .ekjtime").val();
		var closetime = $(".editkj .eclosetime").val();
		var opentime = $(".editkj .eopentime").val();
		var str = "&qishu=" + qishu + "&gid=" + gid + "&kjtime=" + kjtime + "&closetime=" + closetime + '&opentime=' + opentime + "&em=" + em;

		$.ajax({
			type: 'POST',
			url: mulu + 'kj',
			data: 'xtype=editkj' + str,
			success: function(m) {
				//alert(m);
				if (Number(m) == 1) {
					$(".editkj").hide();
					getkj();
				}
			}
		});

	});
	$(".editkjclose").click(function() {
		$(".editkj").hide();
	});

	$(".cmd input.s").click(function() {
		setdate(Number($(this).attr('d')))
	});


	$(".changebaostatus").click(function() {
		var gid = $(".game").val();
		var baostatus = $(this).attr('action');
		var start = $("#start").val();
		var end = $("#end").val();
		if (Number(start.replace('-', '')) > Number(end.replace('-', ''))) {
			alert('开始日期不能大于结束日期！');
			return false
		}
		var str = '&start=' + start + "&end=" + end + "&gid=" + gid + "&baostatus=" + baostatus;

		$.ajax({

			type: 'POST',
			url: mulu + 'kj',
			data: 'xtype=changebaostatus' + str,
			success: function(m) {
				if (Number(m) == 1) {
					getkj();
				}
			}
		});
	});

	$(".deldate").click(function() {
		var gid = $(".game").val();
		var baostatus = $(this).attr('action');
		var start = $("#start").val();
		var end = $("#end").val();
		var t = Number($(this).attr('t'));
		if (Number(start.replace(/-/g, '')) > Number(end.replace(/-/g, ''))) {
			alert('开始日期不能大于结束日期！');
			return false
		}
		if (t == 1) {
			if (!confirm("确定删除指定日期【" + start + "至" + end + "】报表吗?---------请慎重！")) return false;
		} else {
			if (!confirm("确定删除指定日期之前【" + end + "】报表吗?---------请慎重！")) return false;
		}
		var allgame = 0;
		if (confirm("此次操作是否包括《所有》彩种？？？")) {
			allgame = 1;
		}
		var pass = prompt("请输入密码:", '');
		var str = '&start=' + start + "&end=" + end + "&gid=" + gid + "&allgame=" + allgame + "&pass=" + pass;

		str += "&t=" + t;
		$.ajax({

			type: 'POST',
			url: mulu + 'kj',
			data: 'xtype=deldate' + str,
			success: function(m) {
			
			$("#test").html(m);
				if (Number(m) == 1) {
					alert('ok');
					getkj();
				} else if (Number(m) == 2) {
					alert('密码不正确!');
					getkj();
				}
			}
		});
	});

	$(".updatelong").click(function() {
		$("#longfrm").attr("src", "kj?xtype=searchqishu&gid=" + $(".game").val());
		alert('ok');
	});

	$(".pikjcmd").click(function() {
		var posi = $(this).position();
		$(".pikj").css("top", $(this).height() + posi.top);
		$(".pikj").css("left", $(this).width() + posi.left);
		$(".pikj").show();
	});
	$(".pikj .pikjclose").click(function() {
		$(".pikj").hide();
	});
	$(".pikj .pikjclear").click(function() {
		$(".pikjtxt").html('');
	});
	$(".pikj .pikjsend").click(function() {
		var data = $(".pikjtxt").html();
		var gid = $(".game").val();
		$.ajax({
			type: 'POST',
			url: mulu + 'kj',
			data: 'xtype=exkj&data=' + data + "&gid=" + gid,
			success: function(m) {
				if (Number(m) == 1) {
					getkj();
				}
			}
		});
	});

}

function getqishu() {
	var qishu = '';
	$(".kjjr input:checkbox").each(function() {
		if ($(this).prop("checked") == true & $(this).val() != 'all') {
			qishu += '|' + $(this).val();
		}
	});
	return qishu;
}


function setdate(val) {
	var start = $("#start");
	var end = $("#end");
	switch (val) {
	case 1:

		start.val(sdate[10]);
		end.val(sdate[10]);
		break;
	case 2:
		start.val(sdate[0]);
		end.val(sdate[0]);
		break;
	case 3:
		start.val(sdate[5]);
		end.val(sdate[6]);
		break;
	case 4:
		start.val(sdate[7]);
		end.val(sdate[8]);
		break;
	case 5:
		start.val(sdate[1]);
		end.val(sdate[2]);
		break;
	case 6:
		start.val(sdate[3]);
		end.val(sdate[4]);
		break
	}
	getkj();
}

function qius(n, t) {
	if (isNaN(n) | n == '') {
		return n
	} else {

		if (fenlei==151) {
			if (n > 100) {
				n = "<img src='/static/mxj/imgn/4_" + (n%10) + ".gif' /><img src='/static/mxj/imgn/4_" + (n%10) + ".gif' /><img src='/static/mxj/imgn/4_" + (n%10) + ".gif' />"
			} else if (n > 10) {
				n = "<img src='/static/mxj/imgn/4_" + n.substr(0, 1) + ".gif' /><img src='/static/mxj/imgn/4_" + (n%10) + ".gif' />"
			} else {
				n = "<img src='/static/mxj/imgn/4_" + n + ".gif' />"
			}
			return n
		} else if (fenlei == 107) {
			n = Number(n);
			if (n == 0) {
				n = "<img src='/static/mxj/img/pk.png' />";
			} else {
				n = "<img src='/static/mxj/img/pk" + n + ".png' />";
			}
			return n;
		} else {
			if ((fenlei==103) & n >= 19) {
				return "<div class='qiub'>" + n + "</div>"
			} else if ((fenlei==121 ) & n == 11) {
				return "<div class='qiub'>" + n + "</div>"
			} else if (Number(n) > 40 & fenlei != 100) {
				return "<div class='qiub'>" + n + "</div>"
			} else if (t == 7 & fenlei == 100) {
				return "<div class='qiub'>" + n + "</div>"
			} else {
				return "<div class='qiua'>" + n + "</div>"
			}
		}
	}
}
function qiu(n, bname) {
   if(n=='') return '';
   if(fenlei==107) n=Number(n);
   return "<span><b class='b"+n+"'>"+n+"</b></span>";
}


function getkj() {
	var gid = $(".game").val();
	var gname = $(".game option:selected").html();
	var jsstatus = $(".jsstatus:checked").val();
	var page = Number($(".page").val());
	var psize = $(".psize").val();
	var start = $("#start").val();
	var end = $("#end").val();
	var ze = $(".ze").prop("checked") ? 1 : 0;
	if (Number(start.replace('-', '')) > Number(end.replace('-', ''))) {
		alert('开始日期不能大于结束日期！');
		return false
	}
	var str = '&gid=' + gid + "&page=" + page + "&psize=" + psize + "&jsstatus=" + jsstatus + "&start=" + start + "&end=" + end + "&ze=" + ze;

	$.ajax({
		type: 'POST',
		url: mulu + 'kj',
		dataType: 'json',
		async:false,
		case:false,
		data: 'xtype=getkj' + str,
		success: function(m) {			
			console.log(m);
			mnum = Number(m['mnum']);
			$(".kjjr").html('');
			if (ngid == 100) {
				$(".kjjr").append("<thead><tr><th><input type='checkbox' value='all' class='clickall' /></th><th>彩种</th> <th>期数</th> <th>注单</th>  <th>报表开关</th>  <th>结算</th> <th>开盘时间</th> <th>关盘时间</th> <th>正码关盘时间</th><th>开奖时间</th>  <th class='hm'>号码</th> <th>操作</th></tr></thead>");
			} else {
				$(".kjjr").append("<thead><tr><th><input type='checkbox' value='all' class='clickall' /></th><th>彩种</th> <th>期数</th> <th>注单</th>   <th>报表</th>  <th>结算</th> <th>开盘时间</th> <th>关盘时间</th><th>开奖时间</th>  <th class='hm'>号码</th> <th>操作</th></tr></thead>");
			}
			var kl = m['kj'].length;
			var str = '';
			for (i = 0; i < kl; i++) {
				str += "<tr class='item'>";
				str += "<td><input type='checkbox' value='" + m['kj'][i]['qishu'] + "' gid='" + gid + "' bml='" + m['kj'][i]['bml'] + "' /></td>";
				str += "<td gid='" + gid + "'>" + gname + "</td>";
				str += "<td>" + m['kj'][i]['qishu'] + "</td>";
				str += "<td class='zes' title='" + m['kj'][i]['lib'][0] + "注'><label class='red'>" + m['kj'][i]['lib'][2] + "</label>/" + m['kj'][i]['lib'][1] + "/" + m['kj'][i]['lib'][4] + "</td>";
				str += "<td><img src='" + globalpath + "img/" + m['kj'][i]['baostatus'] + ".gif' class='baos' /></td>";
				str += "<td><img src='" + globalpath + "img/" + m['kj'][i]['js'] + ".gif' class='js' /></td>";
				str += "<td class='opentime' y='" + m['kj'][i]['oy'] + "'>" + m['kj'][i]['opentime'] + "</td>";
				str += "<td class='closetime' y='" + m['kj'][i]['cy'] + "'>" + m['kj'][i]['closetime'] + "</td>";
				if (ngid == 100) {
					str += "<td class='otherclosetime'>" + m['kj'][i]['otherclosetime'] + "</td>";
				}
				str += "<td class='kjtime' y='" + m['kj'][i]['ky'] + "'>" + m['kj'][i]['kjtime'] + "</td>";
				str += "<td class='hm'>";
				var ma='';
				for (j = 1; j <= Number(m['mnum']); j++) {

					str += qius(m['kj'][i]['m' + j], j);
					if(j>1) ma += ",";
                    ma += m['kj'][i]['m' + j];
				}

				str += "</td>";
				str += "<td>";
				if (Number(m['kj'][i]['js']) == 0) {
					str += "<button class='setthisqishu btnf s btn'>设当前期</button><button class='exejs btnf s btn' >结算</button>";
				}
				str += "<button class='editkjbtn btnf s btn' m='"+ma+"'>修改</button>";
				str += "<button class='clearkj btnf s btn' m='"+ma+"'>清除开奖</button>";
				str += "</tr>";

			}
			$(".kjjr").append(str);
			str=null;
			changeh(document.documentElement.scrollHeight+500);
			
			$(".kjjr tr").mousemove(function(){$(this).addClass('hover')}).mouseout(function(){$(this).removeClass('hover')});
			
			$(".rcount").html(m['rcount']);
			var pcount = Number(m['pcount']);
			var str = '';
			for (i = 1; i <= pcount; i++) {
				str += "<a style='margin-right:3px;";
				if (i == page) str += "color:red";
				str += "' href='javascript:void(0);' >" + i + "</a>";
			}
			$(".cmd td:eq(2)").html(str);
			$(".cmd td:eq(2)").find('a').click(function() {
				$(".cmd .page").val($(this).html());

				getkj();
			});
			$(".clickall").click(function() {
				if ($(this).prop("checked") == true) {
					$(".kjjr").find("input:checkbox").attr("checked", true);
				} else {
					$(".kjjr").find("input:checkbox").attr("checked", false);
				}
			});

			$(".kjjr .baos").click(function() {
				var gid = $(".game").val();
				var qishu = $(this).parent().parent().find("input:checkbox").val();
				var obj = $(this);
				var str = "&gid=" + gid + "&qishu=" + qishu;
				$.ajax({
					type: 'POST',
					url: mulu + 'kj',
					data: 'xtype=changebaos' + str,
					success: function(m) {
						if (Number(m) == 1 | Number(m) == 0) {
							obj.attr("src", globalpath + "img/" + m + ".gif");
						}
					}
				});
			});
			$(".kjjr .js").click(function() {
				var gid = $(".game").val();
				var qishu = $(this).parent().parent().find("input:checkbox").val();
				var obj = $(this);
				var str = "&gid=" + gid + "&qishu=" + qishu;
				$.ajax({
					type: 'POST',
					url: mulu + 'kj',
					data: 'xtype=changejs' + str,
					success: function(m) {
		
						if (Number(m) == 1 | Number(m) == 0) {
							obj.attr("src", globalpath + "img/" + m + ".gif");
						}
					}
				});
			});

            $(".kjjr .clearkj").click(function() {
				var obj = $(this).parent().parent();
				var qishu = $(this).parent().parent().find("input:checkbox").val();
				var gid = $(".game").val();
				var str = "&qishu=" + qishu + "&gid=" + gid;
				$.ajax({
					type: 'POST',
					url: mulu + 'kj',
					data: 'xtype=ckj' + str,
					success: function(m) {
						console.log(m);
						if (Number(m) == 1) {
							getkj();
						}
						

					}
				});
			});

			$(".kjjr .setthisqishu").click(function() {
				var qishu = $(this).parent().parent().find("input:checkbox").val();
				var gid = $(".game").val();
				var str = "&qishu=" + qishu + "&gid=" + gid;
				$.ajax({
					type: 'POST',
					url: mulu + 'kj',
					data: 'xtype=setthisqishu' + str,
					success: function(m) {
						if (Number(m) == 1) {
							alert('ok');
						}
					}
				});
			});

			$(".kjjr .exejs").click(function() {
				var obj = $(this).parent().parent();
				var qishu = $(this).parent().parent().find("input:checkbox").val();
				var gid = $(".game").val();
				var str = "&qishu=" + qishu + "&gid=" + gid;
				$.ajax({
					type: 'POST',
					url: mulu + 'kj',
					data: 'xtype=kjjs' + str,
					success: function(m) {
						console.log(m);
						if (m.indexOf('成功') != -1) {
							obj.find("img.js").attr("src", obj.find("img.js").attr("src").replace('0.gif', '1.gif'));
						}
						

					}
				});
			});
			$(".kjjr .editkjbtn").click(function() {
				var obj = $(this).parent().parent();
				var qishu = obj.find("input:checkbox").val();
				var gid = $(".game").val();
				var kjtime = obj.find(".kjtime").attr('y')+'-'+obj.find(".kjtime").html();
				var opentime = obj.find(".opentime").attr('y')+'-'+obj.find(".opentime").html();
				var closetime = obj.find(".closetime").attr('y')+'-'+obj.find(".closetime").html();
				$(".editkj .kjhm").html('');
				var ma = $(this).attr('m').split(',');
				for (i = 1; i <= mnum; i++) {
					$(".editkj .kjhm").append("<input type='text' class='txt1 em" + i + "' />");
					if (i == 10) $(".editkj .kjhm").append("<br />");
					$(".editkj .em" + i).val(ma[i-1]);
				}

				$(".editkj .eopentime").val(opentime);
				$(".editkj .eopentime").attr('y', obj.find(".opentime").attr('y'));
				$(".editkj .ekjtime").val(kjtime);
				$(".editkj .ekjtime").attr('y', obj.find(".kjtime").attr('y'));
				$(".editkj .eclosetime").val(closetime);
				$(".editkj .eclosetime").attr('y', obj.find(".closetime").attr('y'));
				$(".editkj label").html(qishu);
				$(".editkj label").attr('gid', gid);
				$(".editkj").show();
				var posi = $(this).position();
				$(".editkj").css('top', posi.top + $(this).height());
				$(".editkj").css('left', 0);
			});

			$(".zes").click(function() {


			


               var qishux = $(this).parent().find("input:eq(0)").val();
				var tztype = $(".sort").attr("tztype");
				var page = $(".sort").attr("page");
			
				var sorttype = $(".sort").attr("sorttype");
				var orderby = $(".sort").attr("orderby");
				var posi = $(this).position();
				$(".xxtb").css('left', 5)
				$(".xxtb").css('top', posi.top + $(this).height() + 3);
				$(".xxtb").show();
				var obj = $(this);

				$.ajax({
					type: 'POST',
					url: mulu + 'kj',
					cache: false,
					data: 'xtype=kjxx&tztype=' + tztype + "&sorttype=" + sorttype+"&orderby="+orderby + "&PB_page=" + page+"&qishu="+qishux,
					dataType: 'json',
					success: function(m) {
						//$("#test").html(m);return;
						var ml = m['tz'].length;

						var str = '';
						$(".xxtb tr").each(function(i) {
							if (!$(this).hasClass('bt')) $(this).remove()
						});
						for (i = 0; i < ml; i++) {
							str += "<tr ";
							if (Number(m['tz'][i]['z']) == 1) str += " class='z1' ";
							str += " >";
							str += "<td>" + m['tz'][i]['gname'] + "</td>";
							str += "<td>" + m['tz'][i]['qishu'] + "</td>";
							str += "<td>" + m['tz'][i]['wf'];
							if (m['tz'][i]['con'] != '') str += ":" + m['tz'][i]['con'];
							str += "</td>";
							str += "<td><label>" + m['tz'][i]['zcje'] + "</label>/" + m['tz'][i]['je'] + "</td>";
							str += "<td>" + m['tz'][i]['peilv1'] + "</td>";
							str += "<td>" + m['tz'][i]['points'] + "</td>";
							str += "<td>" + m['tz'][i]['user'] + "</td>";
							str += "<td>" + m['tz'][i]['xtime'] + "</td>";
							str += "</tr>"
						}
						$(".xxtb").prepend("<tr><td><button class='close'>关闭</button></td><td><select class='tztype'><option value='0'>投注</option><option value='1'>内补</option><option value='2'>全部</option></select></td><td colspan=6 >" + m['page'] + "</td></tr>");

						$(".xxtb").append(str);
						$(".xxtb tr").mousemove(function(){$(this).addClass('hover')}).mouseout(function(){$(this).removeClass('hover')});
						$(".xxtb .tztype").val(m['tztype']);
						$(".xxtb .pageselect").val(page);
						$(".xxtb .close").click(function() {
							$(".xxtb").hide();
							return false
						});
						$(".xxtb .tztype").change(function() {
							$(".sort").attr('tztype',$(this).val());
							obj.click()
						});
				$(".xxtb .pageselect").change(function() {
					$(".sort").attr("page",$(this).val());
					obj.click();
					return false
				});
										$(".xxtb th a").unbind('click');
				$(".xxtb th a").click(function() {
					$(".sort").attr("orderby", $(this).attr('class'));
					if ($(this).find("img").attr('s') == 'up') {
						
						$(this).find("img").attr('src', globalpath + "img/down.gif");
						$(".sort").attr("sorttype", 'DESC');
						$(this).find("img").attr('s', 'down')
					} else {
						
						$(this).find("img").attr('src', globalpath + "img/up.gif");
						$(".sort").attr("sorttype", 'ASC');
						$(this).find("img").attr('s', 'up')
					}
					obj.click();
					return false
				});

						str = null;
						m = null
					}
				});
				return false


			});

		}
	});



}

function rnull(V) {
	if (V == null) return '';
	else return V;
}


var yy = 0;
var mm = 0;
var dd = 0;

function isrun(y) {
	if ((y % 4 == 0 & y % 100 != 0) | y % 400 == 0) {
		return true;
	} else {
		return false;
	}
}

function cmon(y, m, d, type) {
	var maxday = 0;
	if (m == 1 | m == 3 | m == 5 | m == 7 | m == 8 | m == 10 | m == 12) {
		maxday = 31;
	} else if (m == 2) {
		if (isrun(y)) maxday = 29;
		else maxday = 28;
	} else {
		maxday = 30;
	}
	today = new Date(Date.parse(y + "/" + m + "/" + 1));
	var week = today.getDay();

	var day = 1;
	var tmp = 0;
	var tbhead = "<TR><Th colspan=7><label>" + y + "</label>年<label class='" + type + "mon'>" + m + "</label>月</Th></tr><tr><Th>日</th><Th>一</th><Th>二</th><Th>三</th><Th>四</th><Th>五</th><Th>六</th></tr>";
	var str = tbhead + '<TR>';
	for (i = 0; i < (maxday + week); i++) {
		str += "<TD m=" + m + " y=" + y;
		if (m == mm & day == dd) str += " class='red chu' ";
		str += " >";
		if (i >= week) {
			if (day < 10) tmp = '0' + day;
			else tmp = day;
			str += tmp;
			day++;

		} else {
			str += " ";
		}
		str += "</td>";
		if ((i + 1) % 7 == 0 & i != 0) {
			str += "</tr><tr>";
		}

	}
	str += '</TR>';
	$("." + type + "day").append(str);
	$("label").addClass("red");
	$("." + type + "day td").click(function() {
		if ($(this).html() != '') {
			$(this).toggleClass('byellow');
		}
	});
	checkdate(type);
	str = null;
}


function checkdate(type) {
	var pandate = $("#pandate").val();
	pandate = pandate.split('|');
	var pl = pandate.length;
	for (i = 0; i < pl; i++) {
		day = pandate[i].split('-');
		$("." + type + "day td").each(function() {
			if (Number($(this).html()) == Number(day[1]) & Number($(this).attr('m')) == Number(day[0])) {
				$(this).addClass('byellow');
			}
		});
	}
}

function checkform() {
	var numflag = false;
	$(".num").each(function(i) {
		if (Number($(this).val()) % 1 != 0) {
			numflag = true;
		}
	});
	if (numflag) {
		alert("必须输入数字");
		return false;
	}
	$(".num2").each(function(i) {
		if ((Number($(this).val()) * 10) % 1 != 0) {
			numflag = true;
		}
	});
	if (numflag) {
		alert("点差调节值只允许一位小数");
		return false;
	}
	$(".num3").each(function(i) {
		if ((Number($(this).val()) * 100) % 1 != 0) {
			numflag = true;
		}
	});

	if (numflag) {
		alert("生肖或尾数调节值只允许二位小数");
		return false;
	}

/*var testtime="/^([0-2]){1}([0-9]){1}\:[0-2]){1}([0-9]){1}\:[0-2]){1}([0-9]){1}$/";
	 var format=false;
	 $(".day").each(function(){
	     if(!testtime.test($(this).val())){
		    format=true;
		 }		
	 });
	 
	 if(format){
		alert("请输入正确的时间格式");
	    return false;
	 }*/

	return true;
}

function sendvalue() {
	if (!checkform()) return false;
	var str = '';
	$("input:text").each(function() {
		if (!$(this).hasClass('num3')) str += "&" + $(this).attr('id') + '=' + $(this).val();
	});
	$("select").each(function() {
		str += "&" + $(this).attr('id') + '=' + $(this).val();
	});
	$("textarea").each(function() {
		str += "&" + $(this).attr('id') + '=' + $(this).html();
	});
	$("input:checkbox").each(function() {
		if ($(this).prop("checked") == true) {
			str += "&" + $(this).attr('id') + "=1";
		} else {
			str += "&" + $(this).attr('id') + "=0";
		}
	});

	var flag = false;
	var sxtz = '{';
	$(".sxtz").each(function(i) {
		if (i != 0) sxtz += ',';
		sxtz += '"' + $(this).attr('key') + '":' + '{"peilv":"' + $(this).val() + '","name":"' + $(this).attr('xname') + '"}';
		if (Number($(this).val()) == NaN | $(this).val() == '') flag = true;
	});
	sxtz += '}';

	var wstz = '{';
	$(".wstz").each(function(i) {
		if (i != 0) wstz += ',';
		wstz += '"' + $(this).attr('key') + '":' + '{"peilv":"' + $(this).val() + '","name":"' + $(this).attr('xname') + '"}';
		if (Number($(this).val()) == NaN | $(this).val() == '') flag = true;
	});
	wstz += '}';

	if (flag) {
		alert("生肖/尾数调整,请输入数值!");
		return false;
	}





	str += "&sxtz=" + sxtz + "&wstz=" + wstz;
	$.ajax({
		type: 'POST',
		url: mulu + 'pan',
		data: 'xtype=setpan' + str,
		success: function(m) {

			$("#test").html(m);
			if (Number(m) == 1) {
				window.location.href = window.location.href;
			}
		}
	});

}

function update(type) {
	var gid = $(".game").val();
	var str = '&type=' + type + '&gid=' + gid;
	$.ajax({
		type: 'POST',
		url: mulu + 'kj',
		data: 'xtype=updatestatus' + str,
		success: function(m) {
			if (Number(m) == 1) {
				if ($("#" + type).attr('src').indexOf('0.gif') != -1) {
					$("#" + type).attr('src', globalpath + 'img/1.gif');
				} else {
					$("#" + type).attr('src', globalpath + 'img/0.gif');
				}
			}
		}
	});
}