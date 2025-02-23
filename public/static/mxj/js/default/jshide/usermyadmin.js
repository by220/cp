var strtest = /^[0-9a-zA-Z_]{1,}$/;

function myready() {
	$("#adduser").click(function() {
		var fid = $("#fid").val();
		$.ajax({
			type: 'POST',
			url: mulu + 'suser',
			cache: false,
			data: 'xtype=add&fid=' + fid,
			success: function(m) {
				$(".utb").html(m);
				var zchtml = '';
				var themax = 0;
				var themaxfly = 0;
				var maxzc = 0;
				var maxflyzc = 0;
				var obj;
				$(".upzc").each(function() {
					maxzc = Number($(this).attr('maxzc'));
					if (maxzc > themax) themax = maxzc;
					zchtml = '';
					for (i = maxzc; i >= 0; i -= 5) {
						zchtml += "<option value='" + i + "'>" + i + "</option>"
					}
					$(this).html(zchtml);
					$(this).val(maxzc);
					obj = $(this).parent().parent();
					obj.find(".zc").html(zchtml);
					obj.find(".zc").val('0');
					zchtml = '';
					maxflyzc = Number(obj.find(".flyzc").attr('maxzc'));
					if (maxflyzc > themaxfly) themaxfly = maxflyzc;
					for (i = maxflyzc; i >= 0; i -= 5) {
						zchtml += "<option value='" + i + "'>" + i + "</option>"
					}
					obj.find(".flyzc").html(zchtml)
				});
				zchtml = '';
				for (i = themax; i >= 0; i -= 5) {
					zchtml += "<option value='" + i + "'>" + i + "</option>"
				}
				$("#zc").html(zchtml);
				$("#upzc").html(zchtml);
				$("#zc").val('0');
				zchtml = '';
				for (i = themaxfly; i >= 0; i -= 5) {
					zchtml += "<option value='" + i + "'>" + i + "</option>"
				}
				$("#flyzc").html(zchtml);
				$(".utb .ifok").val(1);
				$(".utb .zchold").val(1);
				$(".utb .flytype").val(1);
				$(".tongyi select").change(function() {
					var val = $(this).val();
					var id = $(this).attr('id');
					$("." + id).val(val)
				});
				addfunc();
				m = null
			}
		});
		return false
	});
	$("#delselect").click(function() {
		var ustr = '|';
		$(".user_tb").find("input:checkbox").each(function(i) {
			if ($(this).prop('checked') == true) {
				ustr += $(this).val() + "|"
			}
		});
		deluser(ustr);
		return false
	});
	$("#openselect").click(function() {
		updatestatus('open');
		return false
	});
	$("#closeselect").click(function() {
		updatestatus('close');
		return false
	});
	$("#pauseselect").click(function() {
		updatestatus('pause');
		return false
	});
	$(".searchbtn").click(function() {
		$("#fid").val($("#topid").val());
		getuser();
		return false
	});
	$(".copytb .copysend").click(function() {
		if ($(".copytb .copyname2").val() == '') {
			alert("请输入用户名");
			return false
		}
		if ($(".copytb .copyname").val() == '') {
			alert("请输入名字");
			return false
		}
		var username = $(".copytb .copyname1").html() + $(".copytb .copyname2").val();
		var uid = $(".copytb .copyname2").attr('uid');
		var name = $(".copytb .copyname").val();
		$.ajax({
			type: 'POST',
			url: mulu + 'suser',
			cache: false,
			data: 'xtype=copyuser&username=' + username + "&uid=" + uid + "&name=" + name,
			success: function(m) {
				$("#test").html(m);
				m = Number(m);
				if (m == 2) {
					alert("用户名已存在！");
					$(".copytb .copyname2").focus();
					return false
				} else if (m == 3) {
					alert("可用下线数为《0》,不能新增新用户！");
					$(".copytb .copyname2").focus();
					return false
				} else {
					getuser()
				}
			}
		})
	});
	$(".copytb .copyclose").click(function() {
		$(".copytb").hide();
		return false
	});
	$(".cpasstb .cpasssend").click(function() {
		var pass1 = $(".cpasstb .cpass1").val();
		var pass2 = $(".cpasstb .cpass2").val();
		if (pass1 == '' | pass2 == '' | pass1 != pass2 | strlen(pass1) < 6 | strlen(pass1) > 15) {
			alert("密码不能为空，并且必须大于等于6位数，小于等于15位数，而且两次密码必须输入一样!");
			return false
		}
		var uid = $(".cpasstb .cpassusername").attr('uid');
		$.ajax({
			type: 'POST',
			url: mulu + 'suser',
			cache: false,
			data: 'xtype=cpass&pass1=' + pass1 + "&uid=" + uid,
			success: function(m) {
				$("#test").html(m);
				m = Number(m);
				if (m == 1) {
					alert("修改成功！");
					return false
				} else {
					alert("修改失败！");
					return false
				}
			}
		})
	});
	$(".cpasstb .cpassclose").click(function() {
		$(".cpasstb").hide();
		return false
	});
	$(".fedittb .feditsend").click(function() {
		var uid = $(".fedittb .feditmoney").attr('uid');
		var ac = $(".fedittb .feditmoney").attr('ac');
		var fmoney = $(".fedittb .feditmoney").val();
		if (Number(fmoney) % 1 != 0) {
			alert("请输入正确的金额!");
			return false
		}
		$.ajax({
			type: 'POST',
			url: mulu + 'suser',
			cache: false,
			data: 'xtype=feditmoney&uid=' + uid + "&fmoney=" + fmoney + "&ac=" + ac,
			success: function(m) {
				m = Number(m);
				if (m == 1) {
					alert("ok");
					$(".fedittb").hide();
					getuser()
				} else if (m == 2) {
					alert("该帐户可用余额不足!")
				} else if (m == 3) {
					alert("该帐户上级可用余额不足!")
				} else if (m == 9) {
					alert("该帐户还有未结算注单!")
				}
			}
		})
	});
	$(".fedittb .feditclose").click(function() {
		$(".fedittb").hide()
	});
	$(".moneytb .moneysend").click(function() {
		var uid = $(".moneytb .money").attr('uid');
		var maxmoney = $(".moneytb .maxmoney").val();
		var kmaxmoney = $(".moneytb .kmaxmoney").val();
		var fmaxmoney = $(".moneytb .fmaxmoney").val();
		var money = $(".moneytb .money").val();
		var kmoney = $(".moneytb .kmoney").val();
		var fmoney = $(".moneytb .fmoney").val();
		$.ajax({
			type: 'POST',
			url: mulu + 'suser',
			cache: false,
			data: 'xtype=setmoney&uid=' + uid + "&money=" + money + "&kmoney=" + kmoney + "&fmoney=" + fmoney + "&maxmoney=" + maxmoney + "&kmaxmoney=" + kmaxmoney + "&fmaxmoney=" + fmaxmoney,
			success: function(m) {
				m = Number(m);
				if (m == 1) {
					alert("ok");
					$(".moneytb").hide()
				}
			}
		})
	});
	$(".moneytb .moneyclose").click(function() {
		$(".moneytb").hide()
	});
	$("#updatekzc").click(function() {
		$.ajax({
			type: 'POST',
			url: mulu + 'suser',
			cache: false,
			data: 'xtype=updatekzc',
			success: function(m) {
				if (Number(m) == 1) alert('ok')
			}
		});
		return false
	});
	$("#resetmoney").click(function() {
		var pass = prompt("请输入密码:", '');
		$.ajax({
			type: 'POST',
			url: mulu + 'suser',
			cache: false,
			data: 'xtype=resetmoney&pass=' + pass,
			success: function(m) {
				if (Number(m) == 1) alert('ok');
				else if (Number(m) == 2) alert('密码不正确')
			}
		});
		return false
	});
	$("#resetkmoney").click(function() {
		var pass = prompt("请输入密码:", '');
		$.ajax({
			type: 'POST',
			url: mulu + 'suser',
			cache: false,
			data: 'xtype=resetkmoney&pass=' + pass,
			success: function(m) {
				if (Number(m) == 1) alert('ok');
				else if (Number(m) == 2) alert('密码不正确')
			}
		});
		return false
	});
	$("#jiaozheng").click(function() {
		$.ajax({
			type: 'POST',
			url: mulu + 'suser',
			cache: false,
			data: 'xtype=jiaozheng',
			success: function(m) {
				if (Number(m) == 1) alert('ok')
			}
		});
		return false
	});
	$(".mode").change(function() {
		if ($(".user_tb").is(":hidden")) return false;
		if ($(this).val() == '4') {
			$(".user_tb  tr").find("td").hide();
			$(".user_tb  tr").find("td:eq(1)").show();
			$(".user_tb tr:eq(0)").hide();
			$(".user_tb  tr").find(".allzc").show();
			$(".user_tb  tr").find(".allzc").find("td").show()
		} else {
			$(".user_tb  tr").find("td").show();
			$(".user_tb tr:eq(0)").show();
			$(".user_tb  tr").find(".allzc").hide()
		}
	});
	$(".tree a:eq(0)").click(function() {
		$("#fid").val($("#topid").val());
		$("#layer").val(Number($("#layer").attr('toplayer')) + 1);
		gettree($(".dynatree-lastsib"));
		getuser()
	});
	getuser();
	gettree($(".dynatree-lastsib"));
	$(".dynatree-node a").addClass("dynatree-active")
}
function gettree(obj) {
	var fid = $("#fid").val();
	var topid = $("#topid").val();
	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		dataType: 'json',
		cache: false,
		data: 'xtype=gettree&fid=' + fid,
		success: function(m) {
			var ml = m.length;
			$(".toptatal").html(m[0]['toptotal']);
			if (fid == topid) {
				obj.find("a").html(obj.find("a").attr('username') + '[' + ml + ']--更新列表')
			} else {
				obj.find("a").html(obj.find("a").attr('username') + '[' + ml + ']')
			}
			var str = '<ul>';
			for (i = 0; i < ml; i++) {
				if (Number(m[i]['total']) > 0) {
					str += "<li uid='" + m[i]['uid'] + "' wid='" + m[i]['wid'] + "' ifagent='" + m[i]['ifagent'] + "' layer='" + m[i]['layer'] + "' class='utree" + m[i]['uid'] + "'><span class='dynatree-node dynatree-has-children'><span class='dynatree-expander'></span><span class='dynatree-icon'></span><a class='dynatree-title' href='#' username='" + m[i]['username'] + "'>" + m[i]['username'] + " [" + m[i]['total'] + "]</a></span></li>"
				} else {
					str += "<li uid='" + m[i]['uid'] + "'  wid='" + m[i]['wid'] + "'  ifagent='" + m[i]['ifagent'] + "'  layer='" + m[i]['layer'] + "' ><span class='dynatree-node'><span class='dynatree-connector'></span><span class='dynatree-icon'></span><a class='dynatree-title' href='#'>" + m[i]['username'] + " [" + m[i]['total'] + "]</a></span></li>"
				}
			}
			str += '</ul>';
			obj.find("ul").remove();
			obj.append(str);
			obj.find("span:eq(0)").removeClass("dynatree-loading");
			obj.find("span:eq(0)").addClass("dynatree-exp-e");
			str = null;
			obj.find("li span.dynatree-expander").click(function() {
				var objs = $(this).parent().parent();
				if ($(this).parent().hasClass("dynatree-exp-e")) {
					$(this).parent().removeClass("dynatree-exp-e");
					objs.find("ul").hide()
				} else {
					if (Number(objs.attr('ifagent')) == 0) {
						return false
					}
					$(this).parent().addClass("dynatree-loading");
					$("#fid").val(objs.attr('uid'));
					gettree(objs)
				}
			});
			obj.find("ul a").click(function() {
				var objs = $(this).parent().parent();
				$(".tree a").removeClass("dynatree-active");
				$(this).addClass("dynatree-active");
				if (Number(objs.attr('ifagent')) == 1) {
					objs.find("span.dynatree-expander").click();
					if ($(".mode").val() == '1' | $(".mode").val() == '4') {
						$("#layer").val(Number(objs.attr('layer')) + 1);
						var layer = Number(objs.attr('layer'));
						if (layer == 1) {
							wids = Number(objs.attr('wid'))
						}
						var nowname = getlayername(layer);
						if (nowname == '会员') {
							$("#adduser").html("新增 会员")
						} else {
							$("#adduser").html("新增 " + nowname + "或直属会员")
						}
						$("#fid").val(objs.attr('uid'));
						getuser()
					} else if ($(".mode").val() == '3') {
						editpoints(objs.attr('uid'))
					} else {
						edit(objs.attr('uid'))
					}
				} else {
					if ($(".mode").val() == '3') {
						editpoints(objs.attr('uid'))
					} else {
						edit(objs.attr('uid'))
					}
				}
			});
			if (treeflag) {
				fidindex--;
				if (fidindex < 0) {
					treeflag = false
				} else {
					$(".utree" + fidarr[fidindex]).find("a:eq(0)").click()
				}
			}
		}
	})
}
function getuser() {
	var status = $(".status").val();
	var layer = $("#layer").val();
	var usernames = $("#usernames").val();
	var fid = $("#fid").val();
	str = "&fid=" + fid + "&layer=" + layer + "&status=" + status + "&username=" + usernames;
	if ($("#online").prop("checked")) {
		str += "&online=1"
	}
	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		cache: false,
		data: 'xtype=getuser' + str,
		success: function(m) {
			$("#usernames").val('');
			var str = $(".user_tb tr:first").html();
			$(".recordtb").hide();
			$(".user_tb").empty();
			$(".user_tb").append('<TR>' + str + '</tr>' + m);
			$(".utb").hide();
			$(".user_tb").show();
			if ($(".mode").val() == '4') {
				$(".user_tb  tr").find("td").hide();
				$(".user_tb  tr").find("td:eq(1)").show();
				$(".user_tb tr:eq(0)").hide();
				$(".user_tb  tr").find(".allzc").show();
				$(".user_tb  tr").find(".allzc").find("td").show()
			} else {
				$(".user_tb  tr").find("td").show();
				$(".user_tb tr:eq(0)").show();
				$(".user_tb  tr").find(".allzc").hide()
			}
			$(".status").val(ustatus);
			$(".status").change(function() {
				ustatus = $(this).val();
				getuser()
			});
			$(".showdown").click(function() {
				treeflag = false;
				var obj = $(this).parent().parent().find("input:checkbox");
				var uid = obj.val();
				var ulayer = obj.attr('layer');
				var ifagent = obj.attr('ifagent');
				var wid = Number(obj.attr('wid'));
				if (Number(ulayer) == 1) {
					wids = Number(wid)
				}
				$(".tree a").removeClass("dynatree-active");
				$(".utree" + uid).find("a").addClass("dynatree-active");			
				if ($(".utree" + obj.attr('fid')).length == 1) {
					if (Number(ifagent == 0)) {
						edit(uid);
						return true
					} else {
						$("#fid").val(uid);
						var nowname = getlayername(ulayer);
						if (nowname == '会员') {
							$("#adduser").html("新增 会员")
						} else {
							$("#adduser").html("新增 " + nowname + "或直属会员")
						}
						$("#layer").val(Number(ulayer) + 1);
						getuser();
						$(".utree" + uid).find("span.dynatree-expander").click()
					}					
				} else {
	
					treeflag = true;
					fidarr = obj.attr('fids').split(',');
					fidindex = fidarr.length - 1;
					$(".utree" + fidarr[fidindex]).find("a:eq(0)").click();
					
				}
			});
			$("a.edit").click(function() {
				var objs = $(this).parent().parent().find("input:checkbox");
				$("#fid").val(objs.attr('fid'));
				$("#layer").val(objs.attr('layer'));
				edit(objs.val());
				return false
			});
			$("#clickall").click(function() {
				if ($(this).prop("checked") == true) {
					$(".user_tb").find("input:checkbox").attr("checked", true)
				} else {
					$(".user_tb").find("input:checkbox").attr("checked", false)
				}
			});
			$("img.status").click(function() {
				var img = $(this).attr('src').split(".gif");
				img = img[0].substring(strlen(img[0]) - 1);
				$(this).parent().parent().find("input:checkbox").attr("checked", true);
				if (img == '1') {
					updatestatus('pause')
				} else if (img == '2') {
					updatestatus('close')
				} else {
					updatestatus('open')
				}
				return false
			});
			$("a.copy").click(function() {
				var username = $(this).parent().parent().find("input:checkbox").attr("username");
				var uid = $(this).parent().parent().find("input:checkbox").val();
				var namelength = strlen(username) - 1;
				var namehead = username.substr(0, 1);
				$(".copyname1").html(namehead);
				$(".copyname2").attr("uid", uid);
				var posi = $(this).position();
				$(".copytb").css("top", posi.top + $(this).height() + 10);
				$(".copytb").css("left", posi.left + $(this).width() - $(".copytb").width());
				$(".copytb").show();
				return false
			});
			$("a.cpass").click(function() {
				var username = $(this).parent().parent().find("input:checkbox").attr("username");
				var uid = $(this).parent().parent().find("input:checkbox").val();
				$(".cpassusername").html(username);
				$(".cpassusername").attr("uid", uid);
				var posi = $(this).position();
				$(".cpasstb").css("top", posi.top + $(this).height() + 10);
				$(".cpasstb").css("left", posi.left + $(this).width() - $(".cpasstb").width());
				$(".cpasstb").show();
				return false
			});
			$("a.resetpoints").click(function() {
				var uid = $(this).parent().parent().find("input:checkbox").attr('value');
				var rusername = $(this).parent().parent().find("input:checkbox").attr('username');
				if (!confirm("您确定恢复该用户(" + rusername + ")的退水和上级一样吗？？？？?")) return false;
				$.ajax({
					type: 'POST',
					url: mulu + 'suser',
					cache: false,
					data: 'xtype=resetpoints&uid=' + uid,
					success: function(m) {
						alert(m);
						if (Number(m) == 1) {
							alert('已恢复')
						}
					}
				});
				return false
			});
			$("a.setpoints").click(function() {
				var uid = $(this).parent().parent().find("input:checkbox").val();
				editpoints(uid)
			});
			$("a.showson").click(function() {
				var uid = $(this).parent().parent().find("input:checkbox").val();
				window.location.href = 'suser?xtype=editson&uid=' + uid;
				return false
			});
			$("a.record").click(function() {
				if ($(this).html() == '记录') {
					var uid = $(this).parent().parent().find("input:checkbox").val();
					var username = $(this).parent().parent().find("input:checkbox").attr('username');
					var posi = $(this).position();
					$(".recordtb").css("left", posi.left + $(this).width() - $(".recordtb").width());
					$(".recordtb").css("top", posi.top + $(this).height());
					showrecord(uid, username);
					$(".recordtb").show();
					$(this).html("关闭记录")
				} else {
					$(this).html("记录");
					$(".recordtb").hide()
				}
			});
			$("a.rfdc").click(function() {
				var uid = $(this).parent().parent().find("input:checkbox").val();
				if (!confirm("您确定恢复现金额度吗？")) return false;
				$.ajax({
					type: 'POST',
					url: mulu + 'suser',
					cache: false,
					data: 'xtype=rfdc&uid=' + uid,
					success: function(m) {
						if (Number(m) == 1) {
							alert('已恢复')
						} else if (Number(m) == 9) {
							alert('该用户还有结算注单!')
						}
					}
				})
			});
			$("a.fedit").click(function() {
				var uid = $(this).parent().parent().find("input:checkbox").val();
				$(".feditmoney").attr('uid', uid);
				if ($(this).html() == "取") {
					$(".fedittb th:eq(0)").html("取出金额:");
					$(".feditmoney").attr('ac', 'qu')
				} else {
					$(".fedittb th:eq(0)").html("存入金额:");
					$(".feditmoney").attr('ac', 'cun')
				}
				var fmoney = $(this).parent().parent().find(".fum").html().replace(/\,/g, '');
				$(".feditmoney").val(Number(fmoney));
				var posi = $(this).position();
				$(".fedittb").css("top", posi.top + $(this).height() + 5);
				$(".fedittb").css("left", posi.left + $(this).width());
				$(".fedittb").show()
			});
			$("a.editmoney").click(function() {
				var objs = $(this).parent().parent();
				var uid = objs.find("input:checkbox").val();
				$(".moneytb .money").attr("uid", uid);
				if (Number(objs.find("input:checkbox").attr('fudong')) == 1) {
					var fmoney = objs.find(".fum").html().replace(/\,/g, '');
					var fmaxmoney = objs.find(".mfum").html().replace(/\,/g, '');
					$(".moneytb .fmaxmoney").val(Number(fmaxmoney));
					$(".moneytb .fmoney").val(Number(fmoney));
					$(".moneytb .maxmoney").val(0);
					$(".moneytb .money").val(0);
					$(".moneytb .kmaxmoney").val(0);
					$(".moneytb .kmoney").val(0)
				} else {
					var money = objs.find(".um").html().replace(/\,/g, '');
					var maxmoney = objs.find(".mum").html().replace(/\,/g, '');
					$(".moneytb .maxmoney").val(Number(maxmoney));
					$(".moneytb .money").val(Number(money));
					var kmoney = objs.find(".kum").html().replace(/\,/g, '');
					var kmaxmoney = objs.find(".mkum").html().replace(/\,/g, '');
					$(".moneytb .kmaxmoney").val(Number(kmaxmoney));
					$(".moneytb .kmoney").val(Number(kmoney));
					$(".moneytb .fmaxmoney").val(0);
					$(".moneytb .fmoney").val(0)
				}
				var posi = $(this).position();
				$(".moneytb").css("top", posi.top + $(this).height() + 10);
				$(".moneytb").css("left", posi.left + $(this).width() - $(".moneytb").width());
				$(".moneytb").show()
			});
			$("a.deluserbao").click(function() {
				var uid = $(this).parent().parent().find("input:checkbox").attr('value');
				var username = $(this).parent().parent().find("input:checkbox").attr('username');
				if (!confirm("确定删除用户[" + username + "]的所有报表吗?")) return false;
				var pass = prompt("请输入密码:", '');
				$.ajax({
					type: 'POST',
					url: mulu + 'suser',
					cache: false,
					data: 'xtype=deluserbao&uid=' + uid + "&pass=" + pass,
					success: function(m) {
						if (Number(m) == 1) {
							alert('删除成功')
						} else if (Number(m) == 2) {
							alert('密码不正确!')
						}
					}
				})
			});
			$("a.resetpl").click(function() {
				var uid = $(this).parent().parent().find("input:checkbox").attr('value');
				var pass = prompt("请输入密码:", '');
				$.ajax({
					type: 'POST',
					url: mulu + 'suser',
					cache: false,
					data: 'xtype=resetpl&uid=' + uid + "&pass=" + pass,
					success: function(m) {
						if (Number(m) == 1) {
							alert('赔率恢复成功')
						} else if (Number(m) == 2) {
							alert('密码不正确!')
						}
					}
				})
			});
			$("a.ss").click(function() {
				var uid = $(this).parent().parent().find("input:checkbox").attr('value');
				var posi = $(this).position();
				$(".nss").css('left', posi.left + $(this).width() - $(".nss").width());
				$(".nss").css('top', posi.top + $(this).height() + 3);
				$(".nss").show();
				$(".nss").attr('uid', uid)
			});
			$("a.userzd").click(function() {
				var uid = $(this).parent().parent().find("input:checkbox").val();
				var js = $('.sort').attr("js");
				var zgid = $('.sort').attr("gid");
				var page = $(".sort").attr("page");
				var posi = $(this).position();
				$(".xxtb").css('left', 5);
				$(".xxtb").css('top', posi.top + $(this).height() + 3);
				$(".xxtb").show();
				var obj = $(this);
				$.ajax({
					type: 'POST',
					url: mulu + 'xxtz',
					cache: false,
					data: 'xtype=userzdxx&uid=' + uid + "&js=" + js + "&PB_page=" + page + "&zgid=" + zgid,
					dataType: 'json',
					success: function(m) {
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
						$(".xxtb").prepend("<tr><td><a href='javascript:void(0);' class='close'>关闭</a></td><td><select class='xtype'><option value='2'>全部</option><option value='0'>未结算</option><option value='1'>已结算</option></select></td><td><select class='zdgame'><option value=100>低频彩</option><option value=1>全部快开</option></select></td><td colspan=5>" + m['page'] + "</td></tr>");
						$(".xxtb").append(str);
						$(".xxtb .xtype").val(m['js']);
						$(".xxtb .pageselect").val(page);
						$(".xxtb .zdgame").val(m['zgid']);
						$(".xxtb .close").click(function() {
							$(".xxtb").hide();
							return false
						});
						$(".xxtb .xtype").change(function() {
							$(".sort").attr("js", $(this).val());
							obj.click()
						});
						$(".xxtb .zdgame").change(function() {
							$(".sort").attr("gid", $(this).val());
							obj.click()
						});
						$(".xxtb .pageselect").change(function() {
							$(".sort").attr("page", $(this).val());
							obj.click();
							return false
						});
						str = null;
						m = null
					}
				})
			})
		}
	})
}
function getlayername(ulayer) {
	for (var i in layernames) {
		if (layernames[i]['wid'] == wids) {
			return layernames[i]['layer'][ulayer]
		}
	}
}
function showrecord(uid, username) {
	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		dataType: 'json',
		data: 'xtype=showrecord&uid=' + uid + "&username=" + username,
		cache: false,
		success: function(m) {
			var el = 0;
			if (m['e'] != undefined) el = m['e'].length;
			var ll = 0;
			if (m['l'] != undefined) ll = m['l'].length;
			var estr = "<tr><th>修改时间</th><th>修改者</th><th>修改IP</th><th>来源</th><th>备注</th></tr>";
			var lstr = "<tr><th>登陆时间</th><th>IP</th><th>来源</th><th>备注</th></tr>";
			for (i = 0; i < el; i++) {
				estr += "<tr>";
				estr += "<td>" + m['e'][i]['moditime'] + "</td>";
				estr += "<td>" + m['e'][i]['modiuser'] + "(" + m['e'][i]['modisonuser'] + ")</td>";
				estr += "<td>" + m['e'][i]['modiip'] + "</td>";
				estr += "<td>" + m['e'][i]['addr'] + "</td>";
				estr += "<td>" + m['e'][i]['action'] + "</td>";
				estr += "</tr>"
			}
			for (i = 0; i < ll; i++) {
				lstr += "<tr>";
				lstr += "<td>" + m['l'][i]['time'] + "</td>";
				lstr += "<td>" + m['l'][i]['ip'] + "</td>";

				lstr += "<td>" + m['l'][i]['addr'] + "</td>";
				lstr += "<td>" + m['l'][i]['ifok'] + "</td>";
				lstr += "</tr>"
			}
			$(".recordtb .e").html("<table class='tinfo wd100'>" + estr + "</table>");
			$(".recordtb .l").html("<table class='tinfo wd100'>" + lstr + "</table>")
		}
	})
}
function setinput(id, v, vm,att) {
	return "<input type='text' class='txt1' id='" + id + "' value='" + v + "' m='" + vm + "' />"
}
function setinput2(id, v, vm,att) {
	return "<input type='text' class='pinput' id='" + id + "' value='" + v + "' m='" + vm + "' />"
}

function setinputs(id, v, vm,att) {
	return "<input type='text' class='txt1' id='" + id + "' value='" + v + "' m='" + vm + "' /><BR /><label>" + vm + "</label>"
}
function setinput2s(id, v, vm,att) {
	return "<input type='text' class='pinput' id='" + id + "' value='" + v + "' m='" + vm + "' /><BR /><label>" + vm + "</label>"
}
function setselect(id, v, vm, att) {
	v = getResult(Number(v), 3);
	vm = getResult(Number(vm), 3);
	att = getResult(Number(att), 3);
	var tmps = 0;
	var str = "<select id='" + id + "' m='" + vm + "' class='pselect'>";
	for (c = 0; c <= vm; c = getResult(Number(c + att), 3)) {
		tmps = c;
		str += "<option ";
		if (tmps == v) str += "selected ";
		str += " value='" + tmps + "'>" + tmps + "</option>"
	}
	str += "</select>";
	return str
}
function editpoints(uid) {
	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		cache: false,
		dataType: "json",
		data: 'xtype=editpoints&uid=' + uid,
		success: function(m) {
			//$("#test").html(m);
			$(".list tr:eq(1)").hide();
			$(".user_tb").hide();
			$(".utb").show();
			$(".utb").html("<tbody>" + m['html'] + "</tbody>");
			$(".utb input:text").addClass('txt1');
			var g = m['g'];
			var upan = m['pan'];
			var plc = Number(m['plc']);
			m = null;
			var str = '';
			var ta = [];
			var cu = upan.length;
			var ids;
			var cg = g.length;
			var cp = 0;
			for (i = 0; i < cg; i++) {
				cp = g[i]['pan'].length;
				str = '';
				for (j = 0; j < cp; j++) {
					ta = g[i]['pan'][j];
					str += "<tr class='gametr p" + g[i]['gid'] + "' gid='" + g[i]['gid'] + "'>";
					str += "<td><input type='checkbox' /><input type='button' class='btn1 btnf pantb' value='同选中' /></td>";
					str += "<td>" + g[i]['flname'] + "</td>";
					str += "<td>" + ta['name'] + "</td>";
					if (plc == 1) {
						ids = 'peilvcha';
						str += "<td>" + setselect(ids + ta['id'], ta[ids]['v'], ta[ids]['vm'], ta[ids]['att']) + "</td>"
					}
					str += "<td class='hide'>" + setinput('lowpeilv' + ta['id'], 0, 0) + "</td>";
					str += "<td>" + setinput('cmaxje' + ta['id'], ta['cmaxje']['v'], ta['cmaxje']['vm']) + "</td>";
					str += "<td>" + setinput('maxje' + ta['id'], ta['maxje']['v'], ta['maxje']['vm']) + "</td>";
					str += "<td>" + setinput('minje' + ta['id'], ta['minje']['v'], ta['minje']['vm']) + "</td>";
					if (Number(ta['abcd']) == 1) {
						if (Number(ta['ab']) == 1) {
							for (k = 0; k < cu; k++) {
								ids = 'points' + upan[k].toLowerCase() + 'a';
								str += "<td class='p'>" + setselect(ids + ta['id'], ta[ids]['v'], ta[ids]['vm'], ta[ids]['att']) + "</td>";
								ids = 'points' + upan[k].toLowerCase() + 'b';
								str += "<td class='p'>" + setselect(ids + ta['id'], ta[ids]['v'], ta[ids]['vm'], ta[ids]['att']) + "</td>"
							}
						} else {
							for (k = 0; k < cu; k++) {
								ids = 'points' + upan[k].toLowerCase() + '0';
								str += "<td colspan='2' class='p'>" + setselect(ids + ta['id'], ta[ids]['v'], ta[ids]['vm'], ta[ids]['att']) + "</td>"
							}
						}
					} else {
						ids = 'points' + 'a' + '0';
						str += "<td colspan='" + (cu * 2) + "' class='p'>" + setselect(ids + ta['id'], ta[ids]['v'], ta[ids]['vm'], ta[ids]['att']) + "</td>"
					}
					str += "</tr>"
				}
				$("table.cs2").append(str)
			}
			var pc = $(".cs2 tr:eq(0) .p").length;
			if (plc == 1) {
				var tystr = "<tr><th colspan='4'>统一设置</th>"
			} else {
				var tystr = "<tr><th colspan='3'>统一设置</th>"
			}
			tystr += "<td style='display:none'></td><td><input type='text' class='txt1 tytxt' value='0' /><input type='button' value='设' class='cmaxjes' /></td><td><input type='text' class='txt1 tytxt' value='0' /><input type='button' value='设' class='maxjes' /></td><td><input type='text' class='txt1 tytxt' value='1' /><input type='button' value='设' class='minjes' /></td>";
			tystr += "<td colspan='" + (pc * 2) + "'>赚取退水:<input type='text' class='txt1 tytxt' value='0.1' /><input type='button' value='设' class='ps' /><input type='button' value='全部赚' class='psall' /></td>";
			tystr += "</tr>";
			$(".cs2").prepend(tystr);
			$(".cs2 select").css("width", '60px');
			$(".cs2 tr:eq(0) input:button").addClass("btnf");
			$(".cs2 tr:eq(0) input:button").click(function() {
				var val = $(this).parent().find("input:text").val();
				if (isNaN(val) | Number(val) < 0 | val == '') {
					alert("请输入正确数值!");
					return false
				}
				val = Number(val);
				if ($(this).hasClass('minjes')) {
					$(".cs2 input:text").each(function() {
						if ($(this).is(":visible")) {
							var ids = $(this).attr('id') + '';
							if (ids.substr(0, 5) == 'minje') {
								var valsm = Number($(this).attr('m'));
								if (val >= valsm) {
									$(this).val(val)
								} else {
									$(this).val(valsm)
								}
							}
						}
					})
				} else if ($(this).hasClass('ps')) {
					$(".cs2 td.p select:visible").each(function(i) {
						var valsm = Number($(this).attr('m'));
						$(this).val(valsm - val< 0 ? 0 : getResult(valsm - val, 2))
					});
					$(".cs2 td.p input:text:visible").each(function(i) {
						var valsm = Number($(this).attr('m'));
						$(this).val(valsm - val< 0 ? 0 : getResult(valsm - val, 2))
					});
				} else if ($(this).hasClass('psall')) {
					$(".cs2 td.p select:visible").val(0);
					$(".cs2 td.p input:text:visible").val(0);
				} else if ($(this).hasClass('cmaxjes')) {
					$(".cs2 input:text").each(function() {
						if ($(this).is(":visible")) {
							var ids = $(this).attr('id') + '';
							if (ids.substr(0, 6) == 'cmaxje') {
								var valsm = Number($(this).attr('m'));
								if (val <= valsm) {
									$(this).val(val)
								} else {
									$(this).val(valsm)
								}
							}
						}
					})
				} else if ($(this).hasClass('maxjes')) {
					$(".cs2 input:text").each(function() {
						if ($(this).is(":visible")) {
							var ids = $(this).attr('id') + '';
							if (ids.substr(0, 5) == 'maxje') {
								var valsm = Number($(this).attr('m'));
								if (val <= valsm) {
									$(this).val(val)
								} else {
									$(this).val(valsm)
								}
							}
						}
					})
				}
			});

			$("table.cs2 input:text").blur(function() {
				if ($(this).hasClass('tytxt')) return false;
				var vvs = $(this).val();				
				if ( Number(vvs) % 1 != 0) { //退水为text,Number($(this).val())*100
					alert("请输入正确数值,单注、单项不支持小数");
					$(this).val($(this).attr('m'));
					$(this).focus();
					return false
				}
				if ($(this).attr('id').indexOf('inje') != -1) {
					if (Number($(this).val()) < Number($(this).attr('m')) | Number($(this).val())%1!=0) {
						alert("最小"+$(this).attr('m'));
						$(this).val($(this).attr('m'))
					}
				} else if ($(this).attr('id').indexOf('maxje') != -1){
					if (Number($(this).val()) > Number($(this).attr('m')) | Number($(this).val())%1!=0) {
						alert("最大"+$(this).attr('m'));
						$(this).val($(this).attr('m'))
					}
				} else{
					if (Number($(this).val()) > Number($(this).attr('m')) ) {
						alert("最大"+$(this).attr('m'));
						$(this).val($(this).attr('m'))
					}
				}
			});
			$("table.cs2 input.all").click(function(){
	    if($(this).prop("checked")){
		    $("table.cs2 tr").find("input:checkbox:eq(0)").attr("checked",true);
		}else{
		    $("table.cs2 tr").find("input:checkbox:eq(0)").attr("checked",false);
		}
			});
			
	$("table.cs2 input.pantb").click(function(){
	    $(this).parent().parent().find("input:text").each(function(i){
			 var val = $(this).val();
		     $("table.cs2 tr").each(function(){
			     if($(this).find("input:checkbox").prop("checked")){
			         $(this).find("input:text:eq("+i+")").val(val);
				 }
			 });
		});
		
	    $(this).parent().parent().find("select").each(function(i){
			 var val = $(this).val();
		     $("table.cs2 tr").each(function(){
			     if($(this).find("input:checkbox").prop("checked")){
			         $(this).find("select:eq("+i+")").val(val);
				 }
			 });
		});
	});
			
			$(".utb .close").click(function() {
				$(".user_tb").show();
				$(".list tr:eq(1)").show();
				$(".utb").hide()
			});
			$(".yiwotongbu").click(function() {
				var gid = $(".gamelabel.click").attr('gid');
				var fenlei = $(".gamelabel.click").attr('fenlei');
				garr = [];
				var i = 0;
				$(".gamelabel").each(function() {
					if ($(this).attr('fenlei') == fenlei & gid != $(this).attr('gid')) {
						garr[i] = Number($(this).attr('gid'));
						i++
					}
				});
				var cg = garr.length;
				var idstr, val;
				$(".gametr:visible").each(function() {
					$(this).find("input:text").each(function() {
						idstr = $(this).attr('id');
						val = $(this).val();
						for (i = 0; i < cg; i++) {
							$("#" + idstr.replace(gid, garr[i])).val(val)
						}
					});
					$(this).find("select").each(function() {
						idstr = $(this).attr('id');
						val = $(this).val();
						for (i = 0; i < cg; i++) {
							$("#" + idstr.replace(gid, garr[i])).val(val)
						}
					})
				})
			});
			$(".gamelabel").click(function() {
				$(".gamelabel").removeClass('click');
				$(this).addClass("click");
				var gid = Number($(this).attr('gid'));
				$(".gametr").hide();
				$(".p" + gid).show();
				if (gid != 107 & gid != 100 & gid != 163) {
					$(".yiwotongbu").val("以我同步" + $(this).attr('flname'));
					$(".yiwotongbu").show()
				} else {
					$(".yiwotongbu").hide()
				}
			});
			$(".gamelabel:first").click();
			$(".setpointssend").click(function() {
				var uid = $(".uid").attr('uid');
				var fid = $(".uid").attr('fid');
				var str = "&uid=" + uid + "&fid=" + fid;
				$(".cs2 select").each(function() {
					str += "&" + $(this).attr('id') + "=" + $(this).val()
				});
				var error = false;
				$(".cs2 input:text").each(function() {
					if (!$(this).hasClass('tytxt') & (Number($(this).val()) == NaN | Number($(this).val()) % 1 != 0)) {//退水为text,Number($(this).val())*100
						error = true;
						alert($(this).attr('id'));
					} else {
						str += "&" + $(this).attr('id') + "=" + $(this).val()
					}
				});
				if (error) {
					alert("单注最大、单场最大、单注最低 必须输入非0整数！");
					return false
				}
				$.ajax({
					type: 'POST',
					url: mulu + 'suser',
					cache: false,
					data: 'xtype=setpoints' + str,
					success: function(m) {
						if (Number(m) == 1) {
							alert("修改成功！")
						}
					}
				});
				return false
			})
		}
	})
}
function edit(uid) {
	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		cache: false,
		data: 'xtype=edit&uid=' + uid,
		success: function(m) {
			if (Number(m) == 2) {
				alert("用户不存在!");
				return false
			}
			$(".utb").html(m);
			$(".utb").show();
			var obj;
			var zchtml = '';
			var themax = 0;
			var themaxfly = 0;
			var maxzc = 0;
			var maxflyzc = 0;
			$(".upzc").each(function() {
				maxzc = Number($(this).attr('maxzc'));
				if (maxzc > themax) themax = maxzc;
				zchtml = '';
				for (i = maxzc; i >= 0; i -= 5) {
					zchtml += "<option value='" + i + "'>" + i + "</option>"
				}
				$(this).html(zchtml);
				$(this).val($(this).attr('val'));
				obj = $(this).parent().parent();
				obj.find(".zc").html(zchtml);
				obj.find(".zc").val(obj.find(".zc").attr('val'));
				obj.find(".ifok").val(obj.find(".ifok").attr('val'));
				obj.find(".flytype").val(obj.find(".flytype").attr('val'));
				obj.find(".zchold").val(obj.find(".zchold").attr('val'));
				maxflyzc = Number(obj.find(".flyzc").attr('maxzc'));
				if (maxflyzc > themaxfly) themaxfly = maxflyzc;
				zchtml = '';
				for (i = maxflyzc; i >= 0; i -= 5) {
					zchtml += "<option value='" + i + "'>" + i + "</option>"
				}
				obj.find(".flyzc").html(zchtml);
				obj.find(".flyzc").val(obj.find(".flyzc").attr('val'))
			});
			zchtml = '';
			for (i = themax; i >= 0; i -= 5) {
				zchtml += "<option value='" + i + "'>" + i + "</option>"
			}
			$("#zc").html(zchtml);
			$("#upzc").html(zchtml);
			zchtml = '';
			for (i = themaxfly; i >= 0; i -= 5) {
				zchtml += "<option value='" + i + "'>" + i + "</option>"
			}
			$("#flyzc").html(zchtml);
			$(".tongyi select").change(function() {
				var val = $(this).val();
				var id = $(this).attr('id');
				$("." + id).val(val)
			});
			editfunc();
			editsend();
			m = null
		}
	})
}
function editsend() {
	$("#edit").click(function() {
		var num = 0;
		checkname();
		checkpassedit();
		checkmoney();
		checkkmoney();
		checkfmoney();
		checkmaxren();
		checkyingdenyje();
		$(".addtb").find("img").each(function() {
			if ($(this).attr('src').indexOf('1.gif') != -1) {
				num++
			}
		});
		if ($(".pantype:checked").length == 0) {
			alert("请至少选择一个盘！");
			return false
		}
		var sucess = false;
		if (maxrenflag == 0 & Number($("#ifagent").val()) == 1) num = num + 1;
		if (Number(yingdeny) == 0) num = num + 1;
		if (Number($("#ifagent").val()) == 1) {
			if (num == 8 & $("#userpass").val() != '') {
				success = true
			} else if (num == 6 & $("#userpass").val() == '') {
				success = true
			} else {
				success = false
			}
		} else if (Number($("#ifagent").val()) == 0) {
			if (num == 7 & $("#userpass").val() != '') {
				success = true
			} else if (num == 5 & $("#userpass").val() == '') {
				success = true
			} else {
				success = false
			}
		} else {
			success = false
		}
		if (!success) {
			alert("您还没有完成表格");
			return false
		}
		var userid = $("#username").attr("uid");
		var name = $("#name").val();
		var tel = $("#tel").val();
		var qq = $("#qq").val();
		var email = $("#email").val();
		var bz = $("#bz").val();
		var bank = $("#bank").val();
		var bankname = $("#bankname").val();
		var banknum = $("#banknum").val();
		var moneypass = $("#moneypass").val();
		var userpass = $("#userpass").val();
		var maxmoney = $("#maxmoney").val();
		var kmaxmoney = $("#kmaxmoney").val();
		var fmaxmoney = $("#fmaxmoney").val();
		var maxren = $("#maxren").val();
		var pan = '[';
		var j = 0;
		$(".pantype:checked").each(function() {
			if (j > 0) pan += ',';
			pan += '"' + $(this).val() + '"';
			j++
		});
		pan += "]";
		var defaultpan = $("#defaultpan").val();
		var wid = $("#wid").val();
		var ifexe = $("#ifexe").val();
		var pself = $("#pself").val();
		var cssz = $("#cssz").val();
		var mgid = $("#mgid").val();
		var ifagent = $("#ifagent").val();
		var fid = $("#fid").val();
		var layer = $("#layer").val();
		var status = $("select#status").val();
		var plc = $("#plc").val();
		var fdc = $("#fdc").val();
		var fudong = $("#fudong").val();
		var str = "&ifagent=" + ifagent + "&ifexe=" + ifexe + "&wid=" + wid + "&plc=" + plc + "&fudong=" + fudong + "&fdc=" + fdc;
		str += "&defaultpan=" + defaultpan + "&pan=" + pan + "&maxren=" + maxren + "&kmaxmoney=" + kmaxmoney;
		str += "&maxmoney=" + maxmoney + "&userpass=" + userpass + "&name=" + name + "&userid=" + userid;
		str += "&fid=" + fid + "&status=" + status + "&pself=" + pself + "&fmaxmoney=" + fmaxmoney;
		str += "&qq=" + qq + "&tel=" + tel + "&email=" + email + "&bz=" + bz + "&bank=" + bank + "&bankname=" + bankname + "&banknum=" + banknum + "&moneypass=" + moneypass + "&cssz=" + cssz + "&mgid=" + mgid;
		var gamecs = "{";
		j = 0;
		$(".addtb2 tr").each(function(i) {
			if (i > 1) {
				var gid = $(this).find("td:eq(0)").attr("gid");
				var ifok = $(this).find(".ifok").val();
				var flytype = $(this).find(".flytype").val();
				var upzc = $(this).find(".upzc").val();
				var zc = $(this).find(".zc").val();
				var flyzc = $(this).find(".flyzc").val();
				var zchold = $(this).find(".zchold").val();
				if (j > 0) gamecs += ',';
				gamecs += '"' + j + '":{"gid":"' + gid + '","ifok":"' + ifok + '","flytype":"' + flytype + '","upzc":"' + upzc + '","zc":"' + zc + '","flyzc":"' + flyzc + '","zchold":"' + zchold + '"}';
				j++
			}
		});
		gamecs += "}";
		str += "&gamecs=" + gamecs;
		$(".utb input:button").attr("disabled", true);
		$.ajax({
			type: 'POST',
			url: mulu + 'suser',
			cache: false,
			async: false,
			data: 'xtype=edituser' + str,
			success: function(m) {
				if (Number(m) == 1) {
					alert("修改成功!");
					getuser()
				}
				$(".utb input:button").attr("disabled", false)
			}
		});
		return false
	})
}
function editfunc() {
	$(".recordtb").hide();
	$(".user_tb").hide();
	$(".utb").show();
	$(".list tr:eq(1)").hide();
	$(".utb .actionname").html("修改" + layername[Number($(".utb .actionname").attr("layer") - 1)]);
	$("#name").blur(function() {
		checkname()
	});
	$("#pass2").blur(function() {
		checkpassedit()
	});
	$("#maxmoney").keyup(function() {
		checkmoney()
	}).keypress(function() {
		checkmoney()
	});
	$("#kmaxmoney").keyup(function() {
		checkkmoney()
	}).keypress(function() {
		checkkmoney()
	});
	$("#fmaxmoney").keyup(function() {
		checkfmoney()
	}).keypress(function() {
		checkfmoney()
	});
	$("#maxren").keyup(function() {
		checkmaxren()
	}).keypress(function() {
		checkmaxren()
	});
	$("#yingdenyje").keyup(function() {
		checkyingdenyje()
	}).keypress(function() {
		checkyingdenyje()
	});
	$(".utb .close").click(function() {
		$(".utb").hide();
		$(".user_tb").show();
		$(".list tr:eq(1)").show()
	});
	$(".utb input:text").parent().append("<img src='' style='display:none' />");
	$(".utb input:password").parent().append("<img src='' style='display:none' />");
	$(".pantype").click(function() {
		if ($(".pantype:checked").length == 0) {
			$(this).attr("checked", true)
		}
		$("#defaultpan").empty();
		var pan;
		$(".pantype:checked").each(function() {
			if (i == 0) pan = $(this).val();
			$("#defaultpan").append("<option value='" + $(this).val() + "'>" + $(this).val() + "</option>")
		});
		$("#defaultpan").val(pan)
	});
if(1==2){	
	$("#fudong").change(function() {
		var val = Number($(this).val());
		if (val == 1) {
			$(".modetr").hide();
			$(".kmodetr").hide();
			$(".fmodetr").show();
			$(".modetr input:text").val(0);
			$(".kmodetr input:text").val(0)
		} else {
			$(".modetr").show();
			$(".kmodetr").show();
			$(".fmodetr").hide();
			$(".fmodetr input:text").val(0)
		}
	});
	var val = Number($("#fudong").val());
	if (val == 1) {
		$(".modetr").hide();
		$(".kmodetr").hide();
		$(".fmodetr").show();
		$(".modetr input:text").val(0);
		$(".kmodetr input:text").val(0)
	} else {
		$(".modetr").show();
		$(".kmodetr").show();
		$(".fmodetr").hide();
		$(".fmodetr input:text").val(0)
	}
}
	$("#ifagent").change(function() {
		if (Number($(this).val()) == 0) {
			$("#maxren").val('0');
			$("#maxren").attr('disabled', true);
			$("#ifexe").attr('disabled', true);
			$("#pself").attr('disabled', true);
			$("#plc").attr('disabled', true);
			$("#fdc").attr('disabled', true);
			$("#maxren").parent().find("img").remove();
			$(".flytype").val('0');
			$(".flyzc").val('0');
			$(".zc").val('0');
			$(".zchold").val('0');
			$("#lpoints").val('0');
			$(".flytype").attr("disabled", true);
			$(".flyzc").attr("disabled", true);
			$(".zc").attr("disabled", true);
			$(".zchold").attr("disabled", true);
			$("#flyzc").attr("disabled", true);
			$("#zchold").attr("disabled", true);
			$("#zc").attr("disabled", true);
			$("#flytype").attr("disabled", true)
		} else {
			$("#maxren").attr('disabled', false);
			$("#ifexe").attr('disabled', false);
			$("#pself").attr('disabled', false);
			$("#plc").attr('disabled', false);
			$("#fdc").attr('disabled', false);
			$("#maxren").parent().append("<img src='' style='display:none' />");
			$(".flytype").attr("disabled", false);
			if (Number($("#status").attr('layer')) > (maxlayer - 2)) {
				$(".flyzc").val('0');
				$(".flyzc").attr("disabled", true)
			} else {
				$(".flyzc").attr("disabled", false)
			}
			$(".zc").attr("disabled", false);
			$(".zchold").attr("disabled", false);
			$("#flyzc").attr("disabled", false);
			$("#zchold").attr("disabled", false);
			$("#zc").attr("disabled", false);
			$("#flytype").attr("disabled", false)
		}
	});
	if (Number($("#ifagent").val()) == 0) {
		$("#maxren").val('0');
		$("#maxren").attr('disabled', true);
		$("#ifexe").attr('disabled', true);
		$("#pself").attr('disabled', true);
		$("#plc").attr('disabled', true);
		$("#fdc").attr('disabled', true);
		$("#maxren").parent().find("img").remove();
		$(".flytype").val('0');
		$(".flyzc").val('0');
		$(".zc").val('0');
		$(".zchold").val('0');
		$("#lpoints").val('0');
		$(".flytype").attr("disabled", true);
		$(".flyzc").attr("disabled", true);
		$(".zc").attr("disabled", true);
		$(".zchold").attr("disabled", true);
		$("#flyzc").attr("disabled", true);
		$("#zchold").attr("disabled", true);
		$("#zc").attr("disabled", true);
		$("#flytype").attr("disabled", true)
	}
	if (Number($("#status").attr('layer')) > (maxlayer - 2)) {
		$(".flyzc").val('0');
		$(".flyzc").attr("disabled", true)
	} else {
		$(".flyzc").attr("disabled", false)
	}
	$("#mgid").change(function() {
		var mgid = $(this).val();
		var f = true;
		var gid = 0;
		$(".ifok").each(function(i) {
			var ogid = $(this).parent().parent().find("td:eq(0)").attr('gid');
			if (Number($(this).val()) == 0 & ogid == mgid) {
				f = false
			}
			if (Number($(this).val()) == 1 & gid == 0) {
				gid = ogid
			}
		});
		if (!f) {
			$("#mgid").val(gid)
		}
	});
	$(".ifok").change(function() {
		var gid = 0;
		$(".ifok").each(function(i) {
			if (Number($(this).val()) == 1 & gid == 0) {
				gid = $(this).parent().parent().find("td:eq(0)").attr('gid')
			}
		});
		$("#mgid").val(gid)
	})
}
function addfunc() {
	$(".recordtb").hide();
	$(".user_tb").hide();
	$(".utb").show();
	$(".list tr:eq(1)").hide();
	$("#user3").blur(function() {
		checkusername()
	});
	$("#name").blur(function() {
		checkname()
	});
	$("#pass2").blur(function() {
		checkpass()
	});
	$("#maxmoney").keyup(function() {
		checkmoney()
	}).keypress(function() {
		checkmoney()
	});
	$("#kmaxmoney").keyup(function() {
		checkkmoney()
	}).keypress(function() {
		checkkmoney()
	});
	$("#fmaxmoney").keyup(function() {
		checkfmoney()
	}).keypress(function() {
		checkfmoney()
	});
	$("#maxren").keyup(function() {
		checkmaxren()
	}).keypress(function() {
		checkmaxren()
	});
	$("#yingdenyje").keyup(function() {
		checkyingdenyje()
	}).keypress(function() {
		checkyingdenyje()
	});
	$(".utb .close").click(function() {
		$(".utb").hide();
		$(".user_tb").show();
		$(".list tr:eq(1)").show()
	});
	$(".utb input:text").parent().append("<img src='' style='display:none' />");
	$(".utb input:password").parent().append("<img src='' style='display:none' />");
	$(".pantype").click(function() {
		if ($(".pantype:checked").length == 0) {
			$(this).attr("checked", true)
		}
		$("#defaultpan").empty();
		var pan;
		$(".pantype:checked").each(function() {
			if (i == 0) pan = $(this).val();
			$("#defaultpan").append("<option value='" + $(this).val() + "'>" + $(this).val() + "</option>")
		});
		$("#defaultpan").val(pan)
	});
	$("#wid").change(function() {
		var wid = Number($("#wid").val());
		for (k = 0; k < layernames.length; k++) {
			if (wid == Number(layernames[k]['wid'])) {
				$("#user1").html(layernames[k]['namehead'])
			}
		}
	});
if(1==2){	
	$("#fudong").change(function() {
		var val = Number($(this).val());
		if (val == 1) {
			$(".modetr").hide();
			$(".kmodetr").hide();
			$(".fmodetr").show();
			$(".modetr input:text").val(0);
			$(".kmodetr input:text").val(0)
		} else {
			$(".modetr").show();
			$(".kmodetr").show();
			$(".fmodetr").hide();
			$(".fmodetr input:text").val(0)
		}
	});
	var val = Number($("#fudong").val());
	if (val == 1) {
		$(".modetr").hide();
		$(".kmodetr").hide();
		$(".fmodetr").show();
		$(".modetr input:text").val(0);
		$(".kmodetr input:text").val(0)
	} else {
		$(".modetr").show();
		$(".kmodetr").show();
		$(".fmodetr").hide();
		$(".fmodetr input:text").val(0)
	}
}
	$("#ifagent").change(function() {
		if (Number($(this).val()) == 0) {
			$("#maxren").val('0');
			$("#maxren").attr('disabled', true);
			$("#ifexe").attr('disabled', true);
			$("#pself").attr('disabled', true);
			$("#plc").attr('disabled', true);
			$("#fdc").attr('disabled', true);
			$("#maxren").parent().find("img").remove();
			$(".flytype").val('0');
			$(".flyzc").val('0');
			$(".zc").val('0');
			$(".zchold").val('0');
			$("#lpoints").val('0');
			$(".flytype").attr("disabled", true);
			$(".flyzc").attr("disabled", true);
			$(".zc").attr("disabled", true);
			$(".zchold").attr("disabled", true);
			$("#flyzc").attr("disabled", true);
			$("#zchold").attr("disabled", true);
			$("#zc").attr("disabled", true);
			$("#flytype").attr("disabled", true)
		} else {
			$("#maxren").attr('disabled', false);
			$("#ifexe").attr('disabled', false);
			$("#pself").attr('disabled', false);
			$("#plc").attr('disabled', false);
			$("#fdc").attr('disabled', false);
			$("#maxren").parent().append("<img src='' style='display:none' />");
			$(".flytype").attr("disabled", false);
			if (Number($("#status").attr('layer')) > (maxlayer - 2)) {
				$(".flyzc").val('0');
				$(".flyzc").attr("disabled", true)
			} else {
				$(".flyzc").attr("disabled", false)
			}
			$(".zc").attr("disabled", false);
			$(".zchold").attr("disabled", false);
			$("#flyzc").attr("disabled", false);
			$("#zchold").attr("disabled", false);
			$("#zc").attr("disabled", false);
			$("#flytype").attr("disabled", false)
		}
	});
	if (Number($("#ifagent").val()) == 0) {
		$("#maxren").val('0');
		$("#maxren").attr('disabled', true);
		$("#ifexe").attr('disabled', true);
		$("#pself").attr('disabled', true);
		$("#plc").attr('disabled', true);
		$("#fdc").attr('disabled', true);
		$("#maxren").parent().find("img").remove();
		$(".flytype").val('0');
		$(".flyzc").val('0');
		$(".zc").val('0');
		$(".zchold").val('0');
		$("#lpoints").val('0');
		$(".flytype").attr("disabled", true);
		$(".flyzc").attr("disabled", true);
		$(".zc").attr("disabled", true);
		$(".zchold").attr("disabled", true);
		$("#flyzc").attr("disabled", true);
		$("#zchold").attr("disabled", true);
		$("#zc").attr("disabled", true);
		$("#flytype").attr("disabled", true)
	}
	if (Number($("#status").attr('layer')) > (maxlayer - 2)) {
		$(".flyzc").val('0');
		$(".flyzc").attr("disabled", true)
	} else {
		$(".flyzc").attr("disabled", false)
	}
	$("#mgid").change(function() {
		var mgid = $(this).val();
		var f = true;
		var gid = 0;
		$(".ifok").each(function(i) {
			var ogid = $(this).parent().parent().find("td:eq(0)").attr('gid');
			if (Number($(this).val()) == 0 & ogid == mgid) {
				f = false
			}
			if (Number($(this).val()) == 1 & gid == 0) {
				gid = ogid
			}
		});
		if (!f) {
			$("#mgid").val(gid)
		}
	});
	$(".ifok").change(function() {
		var gid = 0;
		$(".ifok").each(function(i) {
			if (Number($(this).val()) == 1 & gid == 0) {
				gid = $(this).parent().parent().find("td:eq(0)").attr('gid')
			}
		});
		$("#mgid").val(gid)
	});
	$(".add").unbind('click');
	$(".add").click(function() {
		var num = 0;
		checkusername2();
		checkname();
		checkpass();
		checkmoney();
		checkkmoney();
		checkfmoney();
		checkmaxren();
		checkyingdenyje();
		$(".addtb").find("img").each(function() {
			if ($(this).attr('src').indexOf('1.gif') != -1) {
				num++
			}
		});
		if ($(".pantype:checked").length == 0) {
			alert("请至少选择一个盘！");
			return false
		}
		var sucess = false;
		if (Number(maxrenflag) == 0 & Number($("#ifagent").val()) == 1) num = num + 1;
		if (Number(yingdeny) == 0) num = num + 1;
		if (num == 9 & Number($("#ifagent").val()) == 1) {
			success = true
		} else if (num == 8 & Number($("#ifagent").val()) == 0) {
			success = true
		} else {
			success = false;
			alert("您还没有完成表格");
			return false
		}
		var username = $("#username").val();
		var name = $("#name").val();
		var tel = $("#tel").val();
		var qq = $("#qq").val();
		var email = $("#email").val();
		var bz = $("#bz").val();
		var bank = $("#bank").val();
		var bankname = $("#bankname").val();
		var banknum = $("#banknum").val();
		var moneypass = $("#moneypass").val();
		var userpass = $("#userpass").val();
		var maxmoney = $("#maxmoney").val();
		var kmaxmoney = $("#kmaxmoney").val();
		var fmaxmoney = $("#fmaxmoney").val();
		var maxren = $("#maxren").val();
		var pan = '[';
		var j = 0;
		$(".pantype:checked").each(function() {
			if (j > 0) pan += ',';
			pan += '"' + $(this).val() + '"';
			j++
		});
		pan += "]";
		var defaultpan = $("#defaultpan").val();
		var wid = $("#wid").val();
		var ifexe = $("#ifexe").val();
		var pself = $("#pself").val();
		var cssz = $("#cssz").val();
		var mgid = $("#mgid").val();
		var ifagent = $("#ifagent").val();
		var fid = $("#fid").val();
		var layer = $("#layer").val();
		var status = $("select#status").val();
		var plc = $("#plc").val();
		var fdc = $("#fdc").val();
		var fudong = $("#fudong").val();
		var liushui = $("#liushui").val();
		var str = "&ifagent=" + ifagent + "&ifexe=" + ifexe + "&wid=" + wid;
		str += "&defaultpan=" + defaultpan + "&pan=" + pan + "&maxren=" + maxren + "&kmaxmoney=" + kmaxmoney;
		str += "&fmaxmoney=" + fmaxmoney + "&fudong=" + fudong + "&plc=" + plc + "&fdc=" + fdc;
		str += "&maxmoney=" + maxmoney + "&userpass=" + userpass + "&name=" + name + "&username=" + username;
		str += "&fid=" + fid + "&status=" + status + "&pself=" + pself + "&liushui=" + liushui;
		str += "&qq=" + qq + "&tel=" + tel + "&email=" + email + "&bz=" + bz + "&bank=" + bank + "&bankname=" + bankname + "&banknum=" + banknum + "&moneypass=" + moneypass + "&cssz=" + cssz + "&mgid=" + mgid;
		var gamecs = "{";
		j = 0;
		$(".addtb2 tr").each(function(i) {
			if (i > 1) {
				var gid = $(this).find("td:eq(0)").attr("gid");
				var ifok = $(this).find(".ifok").val();
				var flytype = $(this).find(".flytype").val();
				var upzc = $(this).find(".upzc").val();
				var zc = $(this).find(".zc").val();
				var flyzc = $(this).find(".flyzc").val();
				var zchold = $(this).find(".zchold").val();
				if (j > 0) gamecs += ',';
				gamecs += '"' + j + '":{"gid":"' + gid + '","ifok":"' + ifok + '","flytype":"' + flytype + '","upzc":"' + upzc + '","zc":"' + zc + '","flyzc":"' + flyzc + '","zchold":"' + zchold + '"}';
				j++
			}
		});
		gamecs += "}";
		str += "&gamecs=" + gamecs;
		$(".utb input:button").attr("disabled", true);
		$.ajax({
			type: 'POST',
			url: mulu + 'suser',
			cache: false,
			async: false,
			data: 'xtype=adduser' + str,
			success: function(m) {
				if (Number(m) == 2) {
					alert("用户名已存在！");
					$("#username").parent().find("img").attr("src", globalpath + 'img/0.gif');
					return false
				} else if (Number(m) == 3) {
					alert("用户名不正确！");
					$("#username").parent().find("img").attr("src", globalpath + 'img/0.gif');
					return false
				} else if (Number(m) == 1) {
					alert("新增成功！");
					getuser()
				}
				$(".utb input:button").attr("disabled", false)
			}
		});
		return false
	})
}
function checkmaxje() {
	var flag = true;
	$(".cs input:text").each(function() {
		if ($(this).attr('id').indexOf('maxje') != -1) {
			var val = Number($(this).val());
			var m = Number($(this).attr('m'));
			if (val % 1 != 0 | val > Number(m)) {
				$(this).val(m)
			}
		}
	})
}
function checkcmaxje() {
	var flag = true;
	$(".cs input:text").each(function() {
		if ($(this).attr('id').indexOf('cmaxje') != -1) {
			var val = Number($(this).val());
			var m = Number($(this).attr('m'));
			if (val % 1 != 0 | val > Number(m)) {
				$(this).val(m)
			}
		}
	})
}
function checkminje() {
	var flag = true;
	$(".cs input:text").each(function() {
		if ($(this).attr('id').indexOf('minje') != -1) {
			var val = Number($(this).val());
			var m = Number($(this).attr('m'));
			if (val % 1 != 0 | val < Number(m)) {
				$(this).val(m)
			}
		}
	})
}
function checklowpeilv() {
	var flag = true;
	$(".cs input:text").each(function() {
		if ($(this).attr('id').indexOf('lowpeilv') != -1) {
			var val = Number($(this).val());
			var m = Number($(this).attr('m'));
			if ((val * 100) % 1 != 0) {
				$(this).val(m)
			}
		}
	})
}
function checkusername2() {
	var username = $("#user1").html() + $("#user3").val();
	var maxuser = Number($("#user3").attr('maxlength'));
	if (strlen($("#user3").val()) > maxuser | !strtest.test($("#user3").val())) {
		alert("用户名只能输入大小写字母和数字,长度必须最长" + maxuser + "位");
		$("#username").parent().find('img').show();
		$("#username").parent().find('img').attr('src', globalpath + 'img/0.gif');
		return false
	}
}
function checkusername() {
	var username = $("#user1").html() + $("#user3").val();
	var maxuser = Number($("#user3").attr('maxlength'));
	if (strlen($("#user3").val()) > maxuser | !strtest.test($("#user3").val())) {
		alert("用户名只能输入大小写字母和数字,长度必须最长" + maxuser + "位");
		$("#username").parent().find('img').show();
		$("#username").parent().find('img').attr('src', globalpath + 'img/0.gif');
		return false
	}
	username = username.replace(" ", "");
	username = username.replace(" ", "");
	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		cache: false,
		data: 'xtype=checkuser&username=' + username,
		success: function(m) {
			if (m == 1) {
				$("#username").parent().find('img').show();
				$("#username").parent().find('img').attr('src', globalpath + 'img/1.gif');
				$("#username").val(username)
			} else {
				alert("用户名已存在!");
				$("#username").parent().find('img').show();
				$("#username").parent().find('img').attr('src', globalpath + 'img/0.gif');
				return false
			}
		}
	})
}
function checkname() {
	var names = $("#name").val();
	if (strlen(names) > 10) {
		$("#name").parent().find('img').show();
		$("#name").parent().find('img').attr('src', globalpath + 'img/0.gif');
		alert("名字必须小于10位");
		return false
	}
	if (strlen(names) < 1) {
		$("#name").parent().find('img').show();
		$("#name").parent().find('img').attr('src', globalpath + 'img/0.gif');
		alert("名字不能为空");
		return false
	}
	$("#name").parent().find('img').show();
	$("#name").parent().find('img').attr('src', globalpath + 'img/1.gif')
}
function checkpass() {
	var pass1 = $("#pass1").val();
	var pass2 = $("#pass2").val();
	if (!strtest.test(pass1) | pass1 != pass2 | strlen(pass1) < 6 | strlen(pass1) > 15) {
		alert("密码必须由6-15位大小写字母及数字组成，请检查您的输入");
		$("#pass1").parent().find('img').show();
		$("#pass1").parent().find('img').attr('src', globalpath + 'img/0.gif');
		$("#pass2").parent().find('img').show();
		$("#pass2").parent().find('img').attr('src', globalpath + 'img/0.gif');
		return false
	}
	$("#pass1").parent().find('img').show();
	$("#pass1").parent().find('img').attr('src', globalpath + 'img/1.gif');
	$("#pass2").parent().find('img').show();
	$("#pass2").parent().find('img').attr('src', globalpath + 'img/1.gif');
	$("#userpass").val(men_md5_password(pass1))
}
function checkpassedit() {
	var pass1 = $("#pass1").val();
	var pass2 = $("#pass2").val();
	$("#userpass").val('');
	if (pass1 != '' & pass2 != '' & (!strtest.test(pass1) | pass1 != pass2 | strlen(pass1) < 6 | strlen(pass1) > 15)) {
		alert("密码必须由6-15位大小写字母及数字组成，请检查您的输入");
		$("#pass1").parent().find('img').show();
		$("#pass1").parent().find('img').attr('src', globalpath + 'img/0.gif');
		$("#pass2").parent().find('img').show();
		$("#pass2").parent().find('img').attr('src', globalpath + 'img/0.gif');
		return false
	}
	if (pass1 != '' & pass2 != '') {
		$("#pass1").parent().find('img').show();
		$("#pass1").parent().find('img').attr('src', globalpath + 'img/1.gif');
		$("#pass2").parent().find('img').show();
		$("#pass2").parent().find('img').attr('src', globalpath + 'img/1.gif');
		$("#userpass").val(men_md5_password(pass1))
	}
}
function checkmoney() {
	var maxmoney = Number($("#maxmoney").parent().find("label").html());
	var nowmoney = Number($("#maxmoney").val());
	if (nowmoney % 1 != 0 | $("#maxmoney").val() == '') {
		$("#maxmoney").val('');
		$("#maxmoney").parent().find('img').show();
		$("#maxmoney").parent().find('img').attr('src', globalpath + 'img/0.gif');
		if ($("#action").val() == 'add') {
			$("#money").html('')
		}
		return false
	}
	if (nowmoney > maxmoney) {
		$("#maxmoney").val(maxmoney)
	}
	$("#maxmoney").parent().find('img').show();
	$("#maxmoney").parent().find('img').attr('src', globalpath + 'img/1.gif');
	if ($("#action").val() == 'add') {
		$("#money").html($("#maxmoney").val())
	}
}
function checkkmoney() {
	var kmaxmoney = Number($("#kmaxmoney").parent().find("label").html());
	var nowmoney = Number($("#kmaxmoney").val());
	if (nowmoney % 1 != 0 | $("#kmaxmoney").val() == '') {
		$("#kmaxmoney").val('');
		$("#kmaxmoney").parent().find('img').show();
		$("#kmaxmoney").parent().find('img').attr('src', globalpath + 'img/0.gif');
		if ($("#action").val() == 'add') {
			$("#kmoney").html('')
		}
		return false
	}
	if (nowmoney > kmaxmoney) {
		$("#kmaxmoney").val(kmaxmoney)
	}
	$("#kmaxmoney").parent().find('img').show();
	$("#kmaxmoney").parent().find('img').attr('src', globalpath + 'img/1.gif');
	if ($("#action").val() == 'add') {
		$("#kmoney").html($("#kmaxmoney").val())
	}
}
function checkfmoney() {
	var fmaxmoney = Number($("#fmaxmoney").parent().find("label").html());
	var nowmoney = Number($("#fmaxmoney").val());
	if (nowmoney % 1 != 0 | $("#fmaxmoney").val() == '') {
		$("#fmaxmoney").val('');
		$("#fmaxmoney").parent().find('img').show();
		$("#fmaxmoney").parent().find('img').attr('src', globalpath + 'img/0.gif');
		if ($("#action").val() == 'add') {
			$("#fmoney").html('')
		}
		return false
	}
	if (nowmoney > fmaxmoney) {
		$("#fmaxmoney").val(fmaxmoney)
	}
	$("#fmaxmoney").parent().find('img').show();
	$("#fmaxmoney").parent().find('img').attr('src', globalpath + 'img/1.gif');
	if ($("#action").val() == 'add') {
		$("#fmoney").html($("#fmaxmoney").val())
	}
}
function checkmaxren() {
	var maxren = Number($("#maxren").parent().find("label").html());
	var nowren = Number($("#maxren").val());
	if (nowren % 1 != 0 | $("#maxren").val() == '') {
		$("#maxren").val('');
		$("#maxren").parent().find('img').show();
		$("#maxren").parent().find('img').attr('src', globalpath + 'img/0.gif');
		return false
	}
	if (nowren > maxren) {
		$("#maxren").val(maxren)
	}
	$("#maxren").parent().find('img').show();
	$("#maxren").parent().find('img').attr('src', globalpath + 'img/1.gif')
}
function checkmaxren() {
	var maxren = Number($("#maxren").parent().find("label").html());
	var nowren = Number($("#maxren").val());
	if (nowren % 1 != 0 | $("#maxren").val() == '') {
		$("#maxren").val('');
		$("#maxren").parent().find('img').show();
		$("#maxren").parent().find('img').attr('src', globalpath + 'img/0.gif');
		return false
	}
	if (nowren > maxren) {
		$("#maxren").val(maxren)
	}
	$("#maxren").parent().find('img').show();
	$("#maxren").parent().find('img').attr('src', globalpath + 'img/1.gif')
}
function checkyingdenyje() {
	var yingdenyje = Number($("#yingdenyje").parent().find("label").html());
	var nowren = Number($("#yingdenyje").val());
	if (nowren % 1 != 0 | $("#yingdenyje").val() == '') {
		$("#yingdenyje").val('');
		$("#yingdenyje").parent().find('img').show();
		$("#yingdenyje").parent().find('img').attr('src', globalpath + 'img/0.gif');
		return false
	}
	if (nowren > yingdenyje) {
		$("#yingdenyje").val(yingdenyje)
	}
	$("#yingdenyje").parent().find('img').show();
	$("#yingdenyje").parent().find('img').attr('src', globalpath + 'img/1.gif')
}
function updatestatus(status) {
	var ustr = '';
	$(".user_tb input:checkbox").each(function(i) {
		if (i > 0 & $(this).prop('checked') == true) {
			ustr += $(this).val() + "|"
		}
	});
	if (ustr == '') return false;
	if (status == 'open') status = 1;
	else if (status == 'pause') status = 2;
	else status = 0;
	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		cache: false,
		data: 'xtype=updatestatus&ustr=' + ustr + "&status=" + status,
		success: function(m) {
			if (Number(m) == 1) {
				$(".user_tb input:checkbox").each(function(i) {
					if (ustr.indexOf($(this).attr("value")) != -1 & i > 0) {
						if (status == 1) {
							$(this).parent().parent().find(".status").attr('src', globalpath + 'img/1.gif')
						} else if (status == 2) {
							$(this).parent().parent().find(".status").attr('src', globalpath + 'img/2.gif')
						} else {
							$(this).parent().parent().find(".status").attr('src', globalpath + 'img/0.gif')
						}
					}
					$(".user_tb input:checkbox").prop("checked", false)
				})
			}
		}
	})
}
function deluser(ustr) {
	if (!confirm("确定删除吗？")) return false;
	var pass = prompt("请输入密码:", '');
	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		cache: false,
		data: 'xtype=deluser&ustr=' + ustr + "&pass=" + pass,
		success: function(m) {
			if (Number(m) == 1) {
				$(".user_tb").find("input:checkbox").each(function(i) {
					if (ustr.indexOf('|' + $(this).val() + '|') != -1 & i > 0) {
						$(this).parent().parent().remove()
					}
				})
			} else if (Number(m) == 3) {
				alert("被删除的用户还有帐单")
			} else if (Number(m) == 2) {
				alert("密码错误！")
			}
		}
	})
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
function json_encode_js(aaa) {
	function je(str) {
		var a = [],
			i = 0;
		var pcs = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		for (; i < str.length; i++) {
			if (pcs.indexOf(str[i]) == -1) a[i] = "\\u" + ("0000" + str.charCodeAt(i).toString(16)).slice(-4);
			else a[i] = str[i]
		}
		return a.join("")
	}
	var i, s, a, aa = [];
	if (typeof(aaa) != "object") {
		alert("ERROR json");
		return
	}
	for (i in aaa) {
		s = aaa[i];
		a = '"' + je(i) + '":';
		if (typeof(s) == 'object') {
			a += json_encode_js(s)
		} else {
			if (typeof(s) == 'string') a += '"' + je(s) + '"';
			else if (typeof(s) == 'number') a += s
		}
		aa[aa.length] = a
	}
	return "{" + aa.join(",") + "}"
}
function getResult(num, n) {
	return Math.round(num * Math.pow(10, n)) / Math.pow(10, n)
}
function getresult(num, n) {
	return num.toString().replace(new RegExp("^(\\-?\\d*\\.?\\d{0," + n + "})(\\d*)$"), "$1") + 0
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
} 