var strtest = /^[0-9a-zA-Z_]{2,}$/;
var upage = 1;
var layertype = 0;
var ptest = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
function myready() {
//alert("11111");
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
	$(".selectall").change(function() {
		if ($(this).prop("checked")) {
			$(".user_tb").find("input:checkbox").prop("checked", true);
		} else {
			$(".user_tb").find("input:checkbox").prop("checked", false);
		}
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
	$(".cpasstb .cpasssend").click(function() {alert("11111");
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

	$("a.addtop").click(function() {
		$("#fid").val($("#topid").val());
		adduser($(this).attr('type'));
	});


	$(".back").click(function() {
		var fid = $("#fid").val();
		$.ajax({
			type: 'POST',
			url: mulu + 'suser',
			dataType: 'json',
			cache: false,
			data: 'xtype=gfid&fid=' + fid,
			success: function(m) {
				if (Number(m[0]) == 1) {
					$("#fid").val(m[1]);
					$(".title").find("label:eq(0)").html(m[2]);
					$(".title").find("label:eq(1)").html('直属代理');
					layertype = 0;
					gettree();
					getuser();
				}else{
				    return false;
				}
			}
		});

	});

	$(".ui-dialog-titlebar-close").click(function() {
		$(".zcmxtb").hide();
		$(".xxdiv").hide();
		$(".edudiv").hide();
	});
	
	$(".ui-dialog" ).draggable();
	
     $(".edutb input.tiquall").click(function(){
	       if(!transferok && 1==2){
	           var posi = $(this).position();
				$(".zztb").css("top",posi.top+60);
				$(".zztb").css("left",posi.left);
				$(".zztb").show();
				$(".zztb").attr("type","all");
				return false;
			}

  if(!confirm("确定提取全部额度吗?")) return false;
				var uid = $(".edutb td:eq(0)").attr('uid');
				var etype = $(".edutb td:eq(0)").attr('etype');
				var pass = $("#inputTransferPassword").val();
	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		async:false,
		cache: false,
		data: 'xtype=tiquallmoney&uid=' + uid+'&etype='+etype+"&pass="+pass,
		success: function(m) {
		    if(Number(m)==101){
                    alert("操作失败\r\n转账密码错误！");
                    transferok = false;
                    return false;
            }else if(Number(m)==1){
			   alert("提取成功!");
			   $(".edudiv").hide();
			   getuser();
			   gettree();
			   
			}else if(Number(m)==3){
			   alert("已经有投注，不能提取!");
			}else if(Number(m)==2){
			   alert("现金会员，请在现金管理中操作!");
			}
		}
	});
});
$(".edutb input[name='balance']").keypress(function(){$(".edutb .dx").html(DX($(this).val()))}).keyup(function(){$(".edutb .dx").html(DX($(this).val()))});



	$("#transferOk").click(function(){
		 if($("#inputTransferPassword").val()==""){
		 	alert("请输入转账密码！");
		 	return false;
		 }
		 if($(".edutb:visible").length==1){
		 	transferok = true;
            $(".zztb").hide();
            if($(".zztb").attr("types")=="all"){
            	$(".edutb input.tiquall").click();
            }else{
            	$(".edutb .setmoney").click();
            }
            $(".zztb").attr("types","");
		 }else{
		 	var pass = $("#inputTransferPassword").val();
		 	var uid = $(".zztb").attr("uid");
		 	$.ajax({
					type: 'POST',
					url: mulu + 'suser',
					cache: false,
					async: false,
					data: 'xtype=czmoneypass&uid='+uid+"&pass="+pass,
					success: function(m) {
						if(Number(m)==1){
							alert("重置转账密码成功!");
							$(".zztb").hide();
						}
					}
			});
		 }
         

         
	});
    
    $(".zztb .closezz").click(function(){
          $(".zztb").hide();
    });

$(".edutb .setmoney").click(function(){
	if($(".edutb input[name='types']:checked").length!=1){
	   alert("请选择类型!");
	   return false;
	}
    
	
	var types = $(".edutb input[name='types']:checked").val();
				var uid = $(".edutb td:eq(0)").attr('uid');
				var etype = $(".edutb td:eq(0)").attr('etype');
				var je = $(".edutb input[name='balance']").val();
	je=Number(je);
	if(isNaN(je) | je%1!=0 | je<1){
	    alert("请输入正确的金额!");
		return false;
	}
    if(!transferok && 1==2){
        	$(".zztb").css("left",(parseInt($(".edudiv").css("left"))+130)+"px");
        	$(".zztb").css("top",(parseInt($(".edudiv").css("top"))+220)+"px");
        	$(".zztb").show();
        	return false;
        } 
        transferok = false;  
    var pass = $("#inputTransferPassword").val();
	if(!confirm("确定修改额度吗?")) return false;
	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		async:false,
		cache: false,
		data: 'xtype=setmoney&uid=' + uid+'&etype='+etype+'&types='+types+'&je='+je+"&pass="+pass,
		success: function(m) {	

			switch(Number(m)){ 
			   case 101:
			       alert("操作失败\r\n转账密码错误！");
			   break;	
			   case 32:
			   case 42:
			       alert("用户还有未结算注单!,请等待结算后操作！");
			   break;
			   case 10:
			   case 30:
			   case 50:
			   case 70:
			       alert("可提取金额不足,提取失败!");
			   break;
			   case 11:
			   case 31:
			   case 51:
			   case 71:
			       alert("提取金额成功!");
				   			   $(".edudiv").hide();
			   getuser();
			   gettree();	
			   break;
			   case 20:
			   case 40:
			   case 60:
			   case 80:
			       alert("上级余额不足,存入失败!");
			   break;
			   case 21:
			   case 41:
			   case 61:
			   case 81:
			       alert("存入金额成功!");
				   			   $(".edudiv").hide();
			   getuser();
			   gettree();	
			   break;
			}
		}
	});
});
	getuser();
	gettree();

	$(".userzzh",parent.document).click(function(){
		window.location.href = mulu+"suser?xtype=editson";
	})
	
}

function readedu(obj){
				var posi = obj.position();
				$(".edudiv").css("width", 520);
				$(".edudiv").css("top", posi.top + obj.height() + 3);
				$(".edudiv").css("left", posi.left + obj.width());
				$(".edudiv").show();
				var uid = $(".edutb td:eq(0)").attr('uid');
				var etype = $(".edutb td:eq(0)").attr('etype');
				
	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		async:false,
		cache: false,
		data: 'xtype=readmoney&uid=' + uid+'&etype='+etype,
		success: function(m) {
			m=m.split('|');
			$(".edutb td:eq(1) span").html(m[0]);
			$(".edutb td:eq(2)").html(m[1]);
			$(".edutb td:eq(3)").html(m[2]);
			$(".edutb input[name='balance']").val('');
		}
	});
}

function gettree() {
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
			var str = '';
			for (var i in m) {

				str += "<li type='" + m[i]['layertype'] + "' layer='" + m[i]['layer'] + "'><a href='javascript:void(0)'>" + m[i]['name'] + "</a><span>" + m[i]['num'] + "</span></li>";
			}
			$(".left_panel li").each(function() {
				if (!$(this).hasClass('title')) {
					$(this).remove();
				}
			});
			$(".left_panel").append(str);
			str = null;
			$(".left_panel li").click(function() {
				layertype = Number($(this).attr('type'));
				if (layertype == 2) {
					$("#layer").val($(this).attr('layer'));
				}
				$(".title label:eq(1)").html($(this).find("a").html())
				getuser();
			});

			var lil = $(".left_panel li").length;
			$(".userzsdl",parent.document).unbind("click");
			$(".userzsdl",parent.document).click(function(){$(".left_panel li:eq(1)").click();});
			$(".userzshy",parent.document).unbind("click");
			$(".userzshy",parent.document).click(function(){$(".left_panel li:eq(2)").click();});
			$(".userqbdl",parent.document).unbind("click");
			$(".userqbdl",parent.document).click(function(){$(".left_panel li:eq("+(lil-2)+")").click();});
			$(".userqbhy",parent.document).unbind("click");
			$(".userqbhy",parent.document).click(function(){$(".left_panel li:eq("+(lil-1)+")").click();});

		}
	})
}

function getuser() {
	$(".utb").hide();
	$(".main").show();
	var status = $(".query_panel .status").val();
	var layer = $("#layer").val();
	var usernames = $("#usernames").val();
	var fid = $("#fid").val();
	var fudong = $(".fudong").val();
	str = "&fid=" + fid + "&layer=" + layer + "&status=" + status + "&username=" + usernames + "&upage=" + upage + "&layertype=" + layertype + "&fudong=" + fudong;
	if ($("#online").prop("checked")) {
		str += "&online=1"
	}

	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		cache: false,
		async: false,
		data: 'xtype=getuser' + str,
		success: function(m) {
			$("#usernames").val('');
			$(".utb").hide();
			$(".user_tb").show();
			$(".user_tb tbody").empty();
			$(".user_tb tbody").append(m);
			$(".user_tb td").mouseover(function(){$(this).parent().addClass("hover")}).mouseout(function(){$(this).parent().removeClass("hover")});
			changeh(document.documentElement.scrollHeight+500);
			$("#usernames").focus();
			$(".user_tb td").mouseover(function(){
			    $(this).parent().addClass('hover');
			}).mouseout(function(){
			    $(this).parent().removeClass('hover');
			});
			
			$(".page .record span").html($(".pageinfo").attr('rcount'));
			var pcount = Number($(".pageinfo").attr('pcount'));
			$(".page .page_count span").html(pcount);
			upage = Number($(".pageinfo").attr('upage'));
			var pstr = "<a class='prev'>前一页</a>『";
			for (i = 1; i <= pcount; i++) {
				if (i == upage) {
					pstr += "<span class='current'> " + i + " </span>";
				} else {
					pstr += " <a href='javascript:void(0)' class='p'>" + i + "</a> ";
				}
			}
			pstr += "』<a class='next'>后一页</a>";
			$(".page_control").html(pstr);
			pstr = null;
			$(".page a").click(function() {
				if ($(this).hasClass('prev')) {
					upage -= 1;
				} else if ($(this).hasClass('next')) {
					upage += 1;
				} else {
					upage = Number($(this).html());
				}
				if(upage<1) upage=1;
				if(upage>pcount) upage=pcount;
				getuser();
			});
			if (layertype == 1 | layertype == 4) {
				$(".user_tb th.ag").hide();
				$(".user_tb th.us").show();
			} else {
				$(".user_tb th.ag").show();
				$(".user_tb th.us").hide();
			}
			$(".user_tb td.status input").click(function() {
				var posi = $(this).position();
				$("#statusPanel").css("top", posi.top + $(this).height());
				$("#statusPanel").css("left", posi.left + $(this).width() - $("#statusPanel").width());
				$("#statusPanel").attr('uid', $(this).parent().parent().attr('uid'));
				var obj = $(this);
				$("#statusPanel input[name='ustatus']").each(function() {
					if ($(this).val() == obj.attr('v')) $(this).prop("checked", true);
					else $(this).prop("checked", false);
				});
				$("#statusPanel").show();

			});
			$("#statusPanel i").unbind('click');
			$("#statusPanel i").click(function() {
				$("#statusPanel").hide();
			});
			$("#statusPanel input:radio").unbind("change");
			$("#statusPanel input:radio").change(function() {
				var ustr = $("#statusPanel").attr("uid");
				var status = $(this).val();

				$.ajax({
					type: 'POST',
					url: mulu + 'suser',
					cache: false,
					data: 'xtype=upstatus&ustr=' + ustr + "&status=" + status,
					success: function(m) {

						if (Number(m) == 1) {
							getuser();
							$("#statusPanel").hide();
						}
					}
				})
			});

			$(".user_tb a.add").click(function() {

				$("#fid").val($(this).parent().parent().attr('uid'));
				adduser($(this).attr('types'));
			});

			$(".user_tb a.edit").click(function() {

				$("#fid").val($(this).parent().parent().attr('fid'));
				edituser($(this).parent().parent().attr('uid'), $(this).parent().parent().attr('types'));
				return false
			});

			$(".user_tb a.showdown").click(function() {
				if (Number($(this).html()) == 0) return false;
				layertype = Number($(this).attr('layertype'));
				var obj = $(this).parent().parent();
				$("#fid").val(obj.attr('uid'));
				$(".title").find("label:eq(0)").html(obj.attr('username'));

				gettree();
				getuser();
			});

			$(".user_tb a.upuser").click(function() {
				layertype = 0;
				var obj = $(this).parent().parent();
				$("#fid").val(obj.attr('fid'));
				$(".title").find("label:eq(0)").html($(this).html());

				gettree();
				getuser();
			});

			$(".user_tb a.zcmx").click(function() {

				var obj = $(this).parent().parent();
				var posi = $(this).position();
				$.ajax({
					type: 'POST',
					url: mulu + 'suser',
					cache: false,
					async: false,
					dataType: "json",
					data: 'xtype=getzc&uid=' + obj.attr('uid'),
					success: function(m) {
						//$("#test").html(m);
						var str = "<thead><tr><th>彩种/账号</th>";
						var ml = m['zc'][0].length;
						var nxl = m['n'].length;
						for (var i in m['n']) {
							
							if (m['n'][i]!=0) {
								str += "<th>" + m['layername'][i - 1] + "/" + m['n'][i] + "</th>";
							}
						}
						str += "</tr></thead><tbody>";
						for (i = 0; i < ml; i++) {
							if(slowtype==0 & m['zc'][0][i]['name']=='低频彩') continue;
							if(fasttype==0 & m['zc'][0][i]['name']=='快开彩') continue;
							str += "<tr>";
							str += "<th>" + m['zc'][0][i]['name'] + "</th>";
							for (var j in m['n']) {
								if (m['n'][j]!=0) {
								   str += "<td>" + m['zc'][j][i]['zc'] + "%</td>";
								}
							}
							str += "</tr>";
						}
						str += "</tbody>";
						$(".zctb").html(str);
						str = null;
						m = null;

						$(".zcmxtb .ui-dialog-title").html(obj.attr('username') + "# 占成明细");
						$(".zcmxtb").show();
						$(".zcmxtb").css("left", posi.left - $(".zcmxtb").width() / 2);
						$(".zcmxtb").css("top", posi.top + 20);
						$(".zcmxtb").css("width", 900);

					}
				})

			});


	$(".user_tb .online .zhuxiao").click(function(){
				var obj = $(this).parent().parent()
				var username = obj.attr("username");
				var uid = obj.attr('uid');
		if(!confirm("确定注销"+username+"登陆吗?")) return false;
		var obj = $(this);
			$.ajax({
				type: 'POST',
				url: mulu + 'suser',
				cache: false,
				data: 'xtype=zhuxiaologin&uid=' + uid ,
				success: function(m) {
					if (Number(m) == 1) {
						obj.parent().html("<span class='s0'></span>");
					}
				}
			});
	});

			$(".user_tb a.copy").click(function() {
				var obj = $(this).parent().parent()
				var username = obj.attr("username");
				var uid = obj.attr('uid');

				$(".zcmxtb .ui-dialog-title").html("复制" + username + "#帐号");
				$(".zctb").html($(".copytb").html())
				$(".zctb .copyusername").attr("uid", uid);

				var posi = $(this).position();
				$(".zcmxtb").css("width", 400);
				$(".zcmxtb").css("top", posi.top + $(this).height() + 10);
				$(".zcmxtb").css("left", posi.left + $(this).width() - $(".zcmxtb").width());
				$(".zcmxtb").show();
  $(".zcmxtb input.copysend").click(function(){
		var copyname = $(".zcmxtb input.copyname").val();
		var copyusername = $(".zcmxtb input.copyusername").val();
		$.ajax({
			type: 'POST',
			url: mulu + 'suser',
			cache: false,
			data: 'xtype=copyuser&uid=' + uid + "&name=" + copyname + "&username=" + copyusername ,
			success: function(m) {
				if (Number(m) == 1) {
					alert("复制成功!");
					$(".zcmxtb").hide();
					getuser();
				}else if (Number(m) == 2) {
					alert("用户名已存在!");
					return false;
				}else if (Number(m) == 3) {
					alert("上级人数不足!");
					return false;
				}
			}
		})
  });
			});
			$(".user_tb a.cpass").click(function() {
				var obj = $(this).parent().parent()
				var username = obj.attr("username");
				var uid = obj.attr('uid');

				$(".zcmxtb .ui-dialog-title").html("修改" + username + "#密码");
				$(".zctb").html($(".cpasstb").html())
				$(".zctb .cpassusername").html(username);
				$(".zctb .cpassusername").attr("uid", uid);

				var posi = $(this).position();
				$(".zcmxtb").css("width", 400);
				$(".zcmxtb").css("top", posi.top + $(this).height() + 10);
				$(".zcmxtb").css("left", posi.left + $(this).width() - $(".zcmxtb").width());
				$(".zcmxtb").show();
				return false
			});
			
			$(".account a.maxmoney").click(function(){
				var obj = $(this).parent().parent();
				if(moneypassflag!=1 && 1==2){
					var objs = $(this);
					editmoneypass(obj,objs);
					return false;
				}
				var username = obj.attr("username");
				var uid = obj.attr('uid');
				
				$(".edudiv .ui-dialog-title").html("" + username + "#修改低频彩额度");
				$(".edutb td:eq(0)").attr("uid", uid);
				$(".edutb td:eq(0)").attr("etype", 'slow');
				$(".edutb td:eq(0)").html(username);
				$(".edutb th:eq(1)").html("低频彩额度");

				readedu($(this));
			});
			
			$(".account a.kmaxmoney").click(function(){
				var obj = $(this).parent().parent();
				if(moneypassflag!=1 && 1==2){
					var objs = $(this);
					editmoneypass(obj,objs);
					return false;
				}
				var username = obj.attr("username");
				var uid = obj.attr('uid');
				
				$(".edudiv .ui-dialog-title").html("" + username + "#修改快开彩额度");
				$(".edutb td:eq(0)").attr("uid", uid);
				$(".edutb td:eq(0)").attr("etype", 'fast');
				$(".edutb td:eq(0)").html(username);
				$(".edutb th:eq(1)").html("快开彩额度");
                 
				readedu($(this));
			});
			$(".account a.fmaxmoney").click(function(){
				var obj = $(this).parent().parent();
				if(moneypassflag!=1 && 1==2){
					var objs = $(this);
					editmoneypass(obj,objs);
					return false;
				}
				var username = obj.attr("username");
				var uid = obj.attr('uid');
				
				$(".edudiv .ui-dialog-title").html("" + username + "#修改现金额度");
				$(".edutb td:eq(0)").attr("uid", uid);
				$(".edutb td:eq(0)").attr("etype", 'fast');
				$(".edutb td:eq(0)").html(username);
				$(".edutb th:eq(1)").html("现金额度");
                 
				readedu($(this));
			});

			$(".user_tb a.resetpoints").click(function() {
				var obj = $(this).parent().parent()
				var username = obj.attr("username");
				var uid = obj.attr('uid');
				if (!confirm("您确定恢复该用户(" + username + ")的退水和上级一样吗？？？？?")) return false;
				$.ajax({
					type: 'POST',
					url: mulu + 'suser',
					cache: false,
					data: 'xtype=resetpoints&uid=' + uid,
					success: function(m) {
						if (Number(m) == 1) {
							alert('已恢复')
						}
					}
				});
			});
			$(".user_tb a.deluserbao").click(function() {
				var obj = $(this).parent().parent()
				var username = obj.attr("username");
				var uid = obj.attr('uid');
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
			$(".user_tb a.resetpl").click(function() {
				var obj = $(this).parent().parent()
				var username = obj.attr("username");
				var uid = obj.attr('uid');
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

			

			
			$(".user_tb a.record").click(function() {
				var obj = $(this).parent().parent()
				var username = obj.attr("username");
				var uid = obj.attr('uid');
				$.ajax({
					type: 'POST',
					url: mulu + 'suser',
					dataType: 'json',
					data: 'xtype=showrecord&uid=' + uid + "&username=" + username,
					cache: false,
					success: function(m) {
						var el = 0;
						if (m['e'] != undefined) el = m['e'].length;
						var estr = "<thead><tr><th>修改时间</th><th>修改者</th><th>修改IP</th><th>来源</th><th>备注</th></tr></thead><tbody>";
						for (i = 0; i < el; i++) {
							estr += "<tr>";
							estr += "<td>" + m['e'][i]['moditime'] + "</td>";
							estr += "<td>" + m['e'][i]['modiuser'] + "(" + m['e'][i]['modisonuser'] + ")</td>";
							estr += "<td>" + m['e'][i]['modiip'] + "</td>";
							estr += "<td>" + m['e'][i]['addr'] + "</td>";
							estr += "<td>" + m['e'][i]['action'] + "</td>";
							estr += "</tr>"
						}
						$(".zcmxtb .ui-dialog-title").html("帐号" + username + "#变更记录");
						$(".zctb").html(estr + "</tbody>");
					}
				})
				var posi = $(this).position();
				$(".zcmxtb").css("width", 750);
				$(".zcmxtb").css("top", posi.top + $(this).height() + 10);
				$(".zcmxtb").css("left", posi.left + $(this).width() - $(".zcmxtb").width());
				$(".zcmxtb").show();
			});

			$(".user_tb a.logininfo").click(function() {
				var obj = $(this).parent().parent()
				var username = obj.attr("username");
				var uid = obj.attr('uid');
				$.ajax({
					type: 'POST',
					url: mulu + 'suser',
					dataType: 'json',
					data: 'xtype=showlogininfo&uid=' + uid + "&username=" + username,
					cache: false,
					success: function(m) {
						var ll = 0;
						if (m['l'] != undefined) ll = m['l'].length;
						var lstr = "<thead><tr><th>登陆时间</th><th>IP</th><th>来源</th><th>备注</th></tr></thead><tbody>";
						for (i = 0; i < ll; i++) {
							lstr += "<tr>";
							lstr += "<td>" + m['l'][i]['time'] + "</td>";
							lstr += "<td>" + m['l'][i]['ip'] + "</td>";

							lstr += "<td>" + m['l'][i]['addr'] + "</td>";
							lstr += "<td>" + m['l'][i]['ifok'] + "</td>";
							lstr += "</tr>"
						}

						$(".zcmxtb .ui-dialog-title").html("帐号" + username + "#登录日志");
						$(".zctb").html(lstr + "</tbody>");
					}
				})
				var posi = $(this).position();
				$(".zcmxtb").css("width", 750);
				$(".zcmxtb").css("top", posi.top + $(this).height() + 10);
				$(".zcmxtb").css("left", posi.left + $(this).width() - $(".zcmxtb").width());
				$(".zcmxtb").show();
			});
			$("a.userzd").click(function() {
				var obj = $(this).parent().parent()
				var username = obj.attr("username");
				var uid = obj.attr('uid');
				var js = $('.sort').attr("js");
				var zgid = $('.sort').attr("gid");
				var page = $(".sort").attr("page");
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
						$(".xxtb thead").prepend("<tr><td colspan=2><select class='xtype'><option value='2'>全部</option><option value='0'>未结算</option><option value='1'>已结算</option></select></td><td><select class='zdgame'><option value=100>低频彩</option><option value=1>快开彩</option></select></td><td colspan=5>" + m['page'] + "</td></tr>");
						$(".xxtb tbody").html(str);
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
						$(".xxdiv .ui-dialog-title").html("帐号" + username + "#注单");
						str = null;
						m = null
					}
				});
				var posi = $(this).position();
				$(".xxdiv").css("width", 900);
				$(".xxdiv").css("top", posi.top + $(this).height() + 10);
				$(".xxdiv").css("left", posi.left + $(this).width() - $(".xxdiv").width());
				$(".xxdiv").show();
			})


			$(".user_tb a.setpoints").click(function() {
				var uid = $(this).parent().parent().attr('uid');
				editpoints(uid)
			});
			$(".user_tb a.showson").click(function() {
				var uid = $(this).parent().parent().attr('uid');
				window.location.href = 'suser?xtype=editson&uid=' + uid;
				return false
			});

			$(".user_tb a.moneylog").click(function() {
				var uid = $(this).parent().parent().attr('uid');
				window.location.href = 'suser?xtype=moneylog&uid=' + uid;
				return false
			});




		}
	})
}

function editmoneypass(obj,objs) {
	var username = $("#fid").attr("username");
	var uid = obj.attr('uid');
    
    
	$(".zcmxtb .ui-dialog-title").html(username + "#转账密码修改");
	$(".zctb").html($(".moneypasstb").html());
	$(".zctb .cpassusername").html(username);
	$(".zctb .cpassusername").attr("uid", uid);
	$(".zctb td:eq(0)").html(username);

	var posi = objs.position();
	$(".zcmxtb").css("width", 400);
	$(".zcmxtb").css("top", posi.top + objs.height() + 10);
	$(".zcmxtb").css("left", posi.left + objs.width() - $(".zcmxtb").width());
	$(".zcmxtb").show();
	$(".zcmxtb .moneypasssend").click(function() {
		var v1 = $("#transferPassword").val();
		var v2 = $("#ckTransferPassword").val();

		if(!ptest.test(v1) || !ptest.test(v2) || v1!=v2){
			alert("密码必须由6-20字符包含大小写字母和数字组合组成");
			return false;
		}
		if(v1!=v2){
			alert("新设密码 和 新设密码确认 不一样！(确认大小写是否相同)");
			return false;
		}
		if(!confirm("是否确定要修改密码？")) return false;
		$.ajax({
			type: 'POST',
			url: mulu + 'suser',
			data: 'xtype=cmoneypass&v1=' + v1 + "&v2=" + v2,
			cache: false,
			success: function(m) {
				console.log(m);
                if(Number(m)==1){
                	alert("转账密码设置成功。");
                    moneypassflag=1;
                    objs.click();
                    $(".zcmxtb").hide();
                }
			}
		});
	});

}

function adduser(types) {
	var fid = $("#fid").val();
	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		cache: false,
		data: 'xtype=add&fid=' + fid + "&types=" + types,
		success: function(m) {
			$(".utb").html(m);			
			addfunc(types);
			m = null
		}
	});
}

function getlayername(v) {
	v = Number(v);
	return layername[v]
}

function setinput(id, v, vm, att) {
	return "<input type='text' class='input tytxt' id='" + id + "' value='" + v + "' m='" + vm + "' />"
}

function setinput2(id, v, vm, att) {
	return "<input type='text' class='pinput input tytxt' id='" + id + "' value='" + v + "' m='" + vm + "' />"
}

function setinputs(id, v, vm, att) {
	return "<input type='text' class='input tytxt' id='" + id + "' value='" + v + "' m='" + vm + "' /> (<span class='data'>" + vm + "</span>)";
}

function setinput2s(id, v, vm, att) {
	return "<input type='text' class='pinput input tytxt' id='" + id + "' value='" + v + "' m='" + vm + "' /> (<span class='data'>" + vm + "</span>)";
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

function bj(vm,v,f){
   v=Number(v);	
   vm=Number(vm);	
 if(f==0){  
   if(isNaN(v) | v>vm){
       return vm;
   }else{
       return v;
   }
 }else{
   if(isNaN(v) | v<vm){
       return vm;
   }else{
       return v;
   }
 }
}

function editpoints(uid) {
	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		cache: false,
		dataType: "json",
		data: 'xtype=editpoints&uid=' + uid,
		success: function(m) {
			//alert(m);
			//alert(1);
			$(".main").hide();
			$(".utb").show();
			$(".utb").html(m['html']);
			var g = m['g'];
			var upan = m['pan'];
			var plc = Number(m['plc']);
			
			m = null;
			var str = '',
				tbody = '',
				data = '',
				head = '';

			var ta = [];
			var cu = upan.length;
			var ids;
			var cg = g.length;
			var cp = 0;

			for (i = 0; i < cg; i++) {

				head = '<td class="panel"><table class="list data_table at_0"><thead><tr><th>种类</th>';
				if(plc==1){
					head += "<th>赔率差</th>";
					head += "<th class='hide plcs'>保底赔率</th>";
				}
				for (k = 0; k < cu; k++) {
					if (g[i]['fenlei'] == '100') {
						head += '<th colspan=2>' + upan[k] + '盘%</th>';
					} else {
						head += '<th>' + upan[k] + '盘(%)</th>';
					}
				}
				head += '<th>注单限额</th><th>单期限额</th></tr></thead><tbody>{data}</tbody></table></td>';

				str = '<div class="game_tab"><a>' + g[i]['gname'] + '</a></div>';
				str += '<table class="layout cs2"><tbody><tr>{tbody}</tr></tbody></table>';

				data = '';
				tbody = '';
				cp = g[i]['pan'].length;
				if (cp % 2 == 0) {
					var half = cp / 2;;
				} else {
					var half = Math.floor(cp / 2) + 1;
				}

				for (j = 0; j < cp; j++) {
					ta = g[i]['pan'][j];
					if (j == half & g[i]['fenlei'] != '100') {
						tbody += head.replace('{data}', data);
						data = '';
					}
					data += '<tr class="';
					if (g[i]['fenlei'] != '100') data += rclass(ta['name']);
					else data +="slow";
					data += '">';
					data += "<th class='color'>" + ta['name'] + "</th>";
					if (plc == 1) {
						if (Number(ta['son']) == 1) {
							for (var n in ta['cs']) {
								data += "<td class='plcs'>" + setinputs("peilvcha" + ta['cs'][n]['id'], ta['cs'][n]['peilvcha']['v'], ta['cs'][n]['peilvcha']['vm']) + "</td>";
								data += "<td class='hide plcs'></td>";
							}
						} else {
							data += "<td class='plcs'><input type='text' class='hide' /></td>";
							data += "<td class='hide plcs'></td>";

						}
					}
					if (g[i]['fenlei'] == '100') {
						if (Number(ta['abcd']) == 1) {
							if (Number(ta['ab']) == 1) {
								for (k = 0; k < cu; k++) {
									ids = 'points' + upan[k].toLowerCase() + 'a';
									data += '<td class="p">' + setinputs(ids + ta['id'], ta[ids]['v'], ta[ids]['vm'], ta[ids]['att']) + '</td>';
									ids = 'points' + upan[k].toLowerCase() + 'b';
									data += '<td class="p">' + setinputs(ids + ta['id'], ta[ids]['v'], ta[ids]['vm'], ta[ids]['att']) + '</td>'
								}
							} else {
								for (k = 0; k < cu; k++) {
									ids = 'points' + upan[k].toLowerCase() + '0';
									data += '<td colspan=2 class="p">' + setinputs(ids + ta['id'], ta[ids]['v'], ta[ids]['vm'], ta[ids]['att']) + '</td>'
								}
							}
						} else {
							ids = 'points' + 'a' + '0';
							data += '<td  colspan=' + (cu * 2) + ' class="p">' + setinputs(ids + ta['id'], ta[ids]['v'], ta[ids]['vm'], ta[ids]['att']) + '</td>';
						}
					} else {
						if (Number(ta['abcd']) == 1) {
							for (k = 0; k < cu; k++) {
								ids = 'points' + upan[k].toLowerCase() + '0';
								data += '<td class="p">' + setinputs(ids + ta['id'], ta[ids]['v'], ta[ids]['vm'], ta[ids]['att']) + '</td>'
							}
						} else {
							ids = 'points' + 'a' + '0';
							data += '<td  class="p">' + setinputs(ids + ta['id'], ta[ids]['v'], ta[ids]['vm'], ta[ids]['att']) + '</td>';
						}
					}
					data += "<td>" + setinputs('maxje' + ta['id'], ta['maxje']['v'], ta['maxje']['vm']) + "</td>";
					data += "<td>" + setinputs('cmaxje' + ta['id'], ta['cmaxje']['v'], ta['cmaxje']['vm']) + "</td>";
					data += "</tr>";
					if (plc == 1 & Number(ta['son']) > 1) {
						for (var n in ta['cs']) {
							ids = 'peilvcha';
							data += "<tr class='plcs gametr p" + g[i]['gid'] + "'>";
							//data += "<td></td>";
							data += "<td><!--<input type='checkbox' class='son b" + ta['cs'][n]['bc'] + "' /><input type='button' class='cstb' value='同选中' />&nbsp;&nbsp;-->";
							data += "" + ta['cs'][n]['name'] + "</td>";
							data += "<td>" + setinputs(ids + ta['cs'][n]['id'], ta['cs'][n]['peilvcha']['v'], ta['cs'][n]['peilvcha']['vm']) + "</td>";
							data += "<td colspan='" + (cu * 2 + 3) + "'></td>";
							data += "</tr>";
						}

					}

				}
				tbody += head.replace('{data}', data);
				str = str.replace('{tbody}', tbody);
				$(".data_panel").append(str);
			}
			str = null, tbody = null, data = null, head = null, g = null;
			var pc = $("table.quick tr:eq(1) input:text").length;
			changeh(document.documentElement.scrollHeight + 500);

            $(".utb .infoset").click(function(){
                edituser(uid,$(this).attr('types'));
            });

            carr = new Array("t_BALL", "t_LM", "t_ITEM", "t_MP", "t_","tf_");
			
			$("table.cs2 tbody tr").mouseover(function() {
				$(this).addClass('hover')
			}).mouseout(function() {
				$(this).removeClass('hover')
			});


			for (var i in carr) {
				//$("table.quick tr." + carr[i] + " input:text:eq(" + 0 + ")").val($("table.cs2").find("tr." + carr[i] + ":eq(0)").find("input:text:eq(" + 0 + ")").val());
				for (j = 0; j < pc; j++) {
					if(plc==0){
                        $("table.quick tr." + carr[i] + " input:text:eq(" + j + ")").val($("table.cs2").find("tr." + carr[i] + ":eq(0)").find("input:text:eq(" + (j) + ")").val());
					}else{
                        $("table.quick tr." + carr[i] + " input:text:eq(" + j + ")").val($("table.cs2").find("tr." + carr[i] + ":eq(0)").find("input:text:eq(" + (j+1) + ")").val());
					}
					
				}

				//$("table.quick tr." + carr[i] + " input:text:eq(" + (pc) + ")").val($("table.cs2").find("tr." + carr[i] + ":eq(0)").find("input:text:eq(" + (pc) + ")").val());
				//$("table.quick tr." + carr[i] + " input:text:eq(" + (pc + 1) + ")").val($("table.cs2").find("tr." + carr[i] + ":eq(0)").find("input:text:eq(" + (pc + 1) + ")").val());


			}

			$("table.quick input:button").click(function() {
				var a;
				var cc = $(this).parent().parent().attr('class');
				var obj = $("table.cs2").find("tr." + cc);
                
              if(plc==1){
				a = bj(obj.find("input:text:eq(1)").attr('m'), $("table.quick tr." + cc + " input:eq(0)").val(), 0);
				obj.find("input:text:eq(1)").val(a);
				a = bj(obj.find("input:text:eq(2)").attr('m'), $("table.quick tr." + cc + " input:eq(1)").val(), 0);
				obj.find("input:text:eq(2)").val(a);
				a = bj(obj.find("input:text:eq(3)").attr('m'), $("table.quick tr." + cc + " input:eq(2)").val(), 0);
				obj.find("input:text:eq(3)").val(a);
				a = bj(obj.find("input:text:eq(4)").attr('m'), $("table.quick tr." + cc + " input:eq(3)").val(), 0);
				obj.find("input:text:eq(4)").val(a);
				a = bj(obj.find("input:text:eq(5)").attr('m'), $("table.quick tr." + cc + " input:eq(4)").val(), 0);
				obj.find("input:text:eq(5)").val(a);
				a = bj(obj.find("input:text:eq(6)").attr('m'), $("table.quick tr." + cc + " input:eq(5)").val(), 0);
				obj.find("input:text:eq(6)").val(a);
			  }else{
				a = bj(obj.find("input:text:eq(0)").attr('m'), $("table.quick tr." + cc + " input:eq(0)").val(), 0);
				obj.find("input:text:eq(0)").val(a);
				a = bj(obj.find("input:text:eq(1)").attr('m'), $("table.quick tr." + cc + " input:eq(1)").val(), 0);
				obj.find("input:text:eq(1)").val(a);
				a = bj(obj.find("input:text:eq(2)").attr('m'), $("table.quick tr." + cc + " input:eq(2)").val(), 0);
				obj.find("input:text:eq(2)").val(a);
				a = bj(obj.find("input:text:eq(3)").attr('m'), $("table.quick tr." + cc + " input:eq(3)").val(), 0);
				obj.find("input:text:eq(3)").val(a);
				a = bj(obj.find("input:text:eq(4)").attr('m'), $("table.quick tr." + cc + " input:eq(4)").val(), 0);
				obj.find("input:text:eq(4)").val(a);
				a = bj(obj.find("input:text:eq(5)").attr('m'), $("table.quick tr." + cc + " input:eq(5)").val(), 0);
				obj.find("input:text:eq(5)").val(a);
			  }


				$("table.cs2").find("input:text").removeClass("changed");
				if(plc==0) obj.find("input:text:eq(0)").addClass("changed");
				obj.find("input:text:eq(1)").addClass("changed");
				obj.find("input:text:eq(2)").addClass("changed");
				obj.find("input:text:eq(3)").addClass("changed");
				obj.find("input:text:eq(4)").addClass("changed");
				obj.find("input:text:eq(5)").addClass("changed");
				obj.find("input:text:eq(6)").addClass("changed");
				

			});

			$("table.cs2 tr").each(function(i) {
				$(this).find("input:text").blur(function() {
					$(this).val(bj($(this).attr('m'), $(this).val(), 0));
					$(this).addClass("changed");
				});

			});


			$(".utb .close").click(function() {
				$(".main").show();
				$(".utb").hide();
				changeh(document.documentElement.scrollHeight + 500);;
			});
            $(".game_tab_class input:text").blur(function(){
			    var val=Number($(this).val());
				if(isNaN(val)){
				    $(this).val(0);
				}
			});
            $(".utb input.fastbtn").click(function(){
			     var val = Number($(this).prev().val());
				 $("table.cs2 td.p input:text").each(function(){
			         if(!$(this).parent().parent().hasClass('slow')){
				         var v1 = Number($(this).attr('m'))-val;
						 if(v1<0) v1=0;
						 $(this).val(getResult(v1,4));
					 }
				 });
			});

            $(".utb input.slowbtn").click(function(){
			     var val = Number($(this).prev().val());
				 $("table.cs2 td.p input:text").each(function(){
			         if($(this).parent().parent().hasClass('slow') && !$(this).parent().hasClass("plcs")){
				         var v1 = Number($(this).attr('m'))-val;
						 if(v1<0) v1=0;
						 $(this).val(getResult(v1,4));
					 }
				 });
			});
			
			$(".setpointssend").click(function() {
				var uid = $(".uid").attr('uid');
				var fid = $(".uid").attr('fid');
				var str = "&uid=" + uid + "&fid=" + fid;
				$(".cs2 select").each(function() {
					str += "&" + $(this).attr('id') + "=" + $(this).val()
				});
				var error = false;
				$(".cs2 input:text").each(function() {
					str += "&" + $(this).attr('id') + "=" + $(this).val()
				});
				if (error) {
					alert("单注最大、单场最大、单注最低 必须输入非0整数！");
					return false
				}
				if(!confirm("是否保存 "+$(".pointstb .uid label").html()+" 的退水设置？")) return false;
				$.ajax({
					type: 'POST',
					url: mulu + 'suser',
					cache: false,
					async: false,
					data: 'xtype=setpoints' + str,
					success: function(m) {
						if (Number(m) == 1) {
							alert("退水设置已成功保存。");
							$(".main").show();
							$(".utb").hide();
							changeh();
                            window.scroll(0, 0);
						}
					}
				});
			})
		}

	})
}




function editpoints1(uid) {
	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		cache: false,
		dataType: "json",
		data: 'xtype=editpoints&uid=' + uid,
		success: function(m) {
			//alert(m);
			//alert(1);
			$(".main").hide();
			$(".utb").show();
			$(".utb").html(m['html']);
			var g = m['g'];
			var upan = m['pan'];
			var plc = 0;
			m = null;
			var str = '',
				tbody = '',
				data = '',
				head = '';

			var ta = [];
			var cu = upan.length;
			var ids;
			var cg = g.length;
			var cp = 0;

			for (i = 0; i < cg; i++) {

				head = '<td class="panel"><table class="list data_table at_0"><thead><tr><th>种类</th>';
				for (k = 0; k < cu; k++) {
					if (g[i]['fenlei'] == '100') {
						head += '<th colspan=2>' + upan[k] + '盘 (A/B)%</th>';
					} else {
						head += '<th>' + upan[k] + '盘(%)</th>';
					}
				}
				head += '<th>注单限额</th><th>单期限额</th></tr></thead><tbody>{data}</tbody></table></td>';

				str = '<div class="game_tab"><a>' + g[i]['flname'] + '</a></div>';
				str += '<table class="layout cs2"><tbody><tr>{tbody}</tr></tbody></table>';

				data = '';
				tbody = '';
				cp = g[i]['pan'].length;
				if (cp % 2 == 0) {
					var half = cp / 2;;
				} else {
					var half = Math.floor(cp / 2) + 1;
				}

				for (j = 0; j < cp; j++) {
					ta = g[i]['pan'][j];
					if (j == half & g[i]['fenlei'] != '100') {
						tbody += head.replace('{data}', data);
						data = '';
					}
					data += '<tr class="';
					if (g[i]['fenlei'] != '100') data += rclass(ta['name']);
					else data +="slow";
					data += '">';
					data += "<th class='color'>" + ta['name'] + "</th>";
					if (g[i]['fenlei'] == '100') {
						if (Number(ta['abcd']) == 1) {
							if (Number(ta['ab']) == 1) {
								for (k = 0; k < cu; k++) {
									ids = 'points' + upan[k].toLowerCase() + 'a';
									data += '<td class="p">' + setinputs(ids + ta['id'], ta[ids]['v'], ta[ids]['vm'], ta[ids]['att']) + '</td>';
									ids = 'points' + upan[k].toLowerCase() + 'b';
									data += '<td class="p">' + setinputs(ids + ta['id'], ta[ids]['v'], ta[ids]['vm'], ta[ids]['att']) + '</td>'
								}
							} else {
								for (k = 0; k < cu; k++) {
									ids = 'points' + upan[k].toLowerCase() + '0';
									data += '<td colspan=2 class="p">' + setinputs(ids + ta['id'], ta[ids]['v'], ta[ids]['vm'], ta[ids]['att']) + '</td>'
								}
							}
						} else {
							ids = 'points' + 'a' + '0';
							data += '<td  colspan=' + (cu * 2) + ' class="p">' + setinputs(ids + ta['id'], ta[ids]['v'], ta[ids]['vm'], ta[ids]['att']) + '</td>';
						}
					} else {
						if (Number(ta['abcd']) == 1) {
							for (k = 0; k < cu; k++) {
								ids = 'points' + upan[k].toLowerCase() + '0';
								data += '<td class="p">' + setinputs(ids + ta['id'], ta[ids]['v'], ta[ids]['vm'], ta[ids]['att']) + '</td>'
							}
						} else {
							ids = 'points' + 'a' + '0';
							data += '<td  class="p">' + setinputs(ids + ta['id'], ta[ids]['v'], ta[ids]['vm'], ta[ids]['att']) + '</td>';
						}
					}
					data += "<td>" + setinputs('maxje' + ta['id'], ta['maxje']['v'], ta['maxje']['vm']) + "</td>";
					data += "<td>" + setinputs('cmaxje' + ta['id'], ta['cmaxje']['v'], ta['cmaxje']['vm']) + "</td>";
					data += "</tr>";
				}
				tbody += head.replace('{data}', data);
				str = str.replace('{tbody}', tbody);
				$(".data_panel").append(str);
			}
			str = null, tbody = null, data = null, head = null, g = null;
			var pc = $("table.quick tr:eq(1) input:text").length;
			changeh(document.documentElement.scrollHeight + 500);;

            $(".utb .infoset").click(function(){
                edituser(uid,$(this).attr('types'));
            });

			carr = new Array("t_BALL", "t_LM", "t_ITEM", "t_MP", "t_");
			$("table.cs2 tbody tr").mouseover(function() {
				$(this).addClass('hover')
			}).mouseout(function() {
				$(this).removeClass('hover')
			});


			for (var i in carr) {
				for (j = 0; j < pc; j++) {
					$("table.quick tr." + carr[i] + " input:text:eq(" + j + ")").val($("table.cs2").find("tr." + carr[i] + ":eq(0)").find("input:text:eq(" + j + ")").val());
				}

				$("table.quick tr." + carr[i] + " input:text:eq(" + (pc) + ")").val($("table.cs2").find("tr." + carr[i] + ":eq(0)").find("input:text:eq(" + (pc) + ")").val());
				$("table.quick tr." + carr[i] + " input:text:eq(" + (pc + 1) + ")").val($("table.cs2").find("tr." + carr[i] + ":eq(0)").find("input:text:eq(" + (pc + 1) + ")").val());


			}

			$("table.quick input:button").click(function() {
				var a;
				var cc = $(this).parent().parent().attr('class');
				var obj = $("table.cs2").find("tr." + cc);


				a = bj(obj.find("input:text:eq(0)").attr('m'), $("table.quick tr." + cc + " input:eq(0)").val(), 0);
				obj.find("input:text:eq(0)").val(a);
				a = bj(obj.find("input:text:eq(1)").attr('m'), $("table.quick tr." + cc + " input:eq(1)").val(), 0);
				obj.find("input:text:eq(1)").val(a);
				a = bj(obj.find("input:text:eq(2)").attr('m'), $("table.quick tr." + cc + " input:eq(2)").val(), 0);
				obj.find("input:text:eq(2)").val(a);
				a = bj(obj.find("input:text:eq(3)").attr('m'), $("table.quick tr." + cc + " input:eq(3)").val(), 0);
				obj.find("input:text:eq(3)").val(a);
				a = bj(obj.find("input:text:eq(4)").attr('m'), $("table.quick tr." + cc + " input:eq(4)").val(), 0);
				obj.find("input:text:eq(4)").val(a);
				a = bj(obj.find("input:text:eq(5)").attr('m'), $("table.quick tr." + cc + " input:eq(5)").val(), 0);
				obj.find("input:text:eq(5)").val(a);

				$("table.cs2").find("input:text").removeClass("changed");
				obj.find("input:text:eq(0)").addClass("changed");
				obj.find("input:text:eq(1)").addClass("changed");
				obj.find("input:text:eq(2)").addClass("changed");
				obj.find("input:text:eq(3)").addClass("changed");
				obj.find("input:text:eq(4)").addClass("changed");
				obj.find("input:text:eq(5)").addClass("changed");

			});
			$("table.cs2 tr").each(function(i) {
				$(this).find("input:text").blur(function() {
					$(this).val(bj($(this).attr('m'), $(this).val(), 0));
					$(this).addClass("changed");
				});

			});


			$(".utb .close").click(function() {
				$(".main").show();
				$(".utb").hide();
				changeh(document.documentElement.scrollHeight + 500);
			});
            $(".game_tab_class input:text").blur(function(){
			    var val=Number($(this).val());
				if(isNaN(val)){
				    $(this).val(0);
				}
			});
            $(".utb input.fastbtn").click(function(){
			     var val = Number($(this).prev().val());
				 $("table.cs2 td.p input:text").each(function(){
			         if(!$(this).parent().parent().hasClass('slow')){
				         var v1 = Number($(this).attr('m'))-val;
						 if(v1<0) v1=0;
						 $(this).val(getResult(v1,3));
					 }
				 });
			});

            $(".utb input.slowbtn").click(function(){
			     var val = Number($(this).prev().val());
				 $("table.cs2 td.p input:text").each(function(){
			         if($(this).parent().parent().hasClass('slow')){
				         var v1 = Number($(this).attr('m'))-val;
						 if(v1<0) v1=0;
						 $(this).val(getResult(v1,3));
					 }
				 });
			});
			
			$(".setpointssend").click(function() {
				var uid = $(".uid").attr('uid');
				var fid = $(".uid").attr('fid');
				var str = "&uid=" + uid + "&fid=" + fid;
				$(".cs2 select").each(function() {
					str += "&" + $(this).attr('id') + "=" + $(this).val()
				});
				var error = false;
				$(".cs2 input:text").each(function() {
					str += "&" + $(this).attr('id') + "=" + $(this).val()
				});
				if (error) {
					alert("单注最大、单场最大、单注最低 必须输入非0整数！");
					return false
				}
				$.ajax({
					type: 'POST',
					url: mulu + 'suser',
					cache: false,
					async: false,
					data: 'xtype=setpoints' + str,
					success: function(m) {
						if (Number(m) == 1) {
							alert("修改成功！");
							$(".main").show();
							$(".utb").hide();
						}
					}
				});
			})
		}

	})
}


function editpoints2(uid) {
	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		cache: false,
		dataType: "json",
		data: 'xtype=editpoints&uid=' + uid,
		success: function(m) {
			$(".main").hide();
			$(".utb").show();
			$(".utb").html(m['html']);
			
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
					str += "<tr class='" ;
					if(g[i]['gid']!=100) str += rclass(ta['name']);
					str += " gametr p" + g[i]['gid']+"' gid='" + g[i]['gid'] + "'>";
					str += "<td><input type='checkbox' class='fu' /><input type='button' class='pantb' value='同选中' /></td>";
					
					if(plc == 1 & Number(ta['son'])>1){
					   str += "<th><input type='checkbox' class='allson' bc='"+j+"' />全选</th>";
					}else{
					   str += "<td>" + g[i]['flname'] + "</td>";
					}
					str += "<th ";
					if(g[i]['gid']!=100) str += "class='color'";
					str += ">" + ta['name']+ "</th>";
					if (plc == 1 ) {
						if(Number(ta['son'])==1){
					   for(var n in ta['cs']){	
						str += "<td class='plcs'>"+setinputs("peilvcha" + ta['cs'][n]['id'], ta['cs'][n]['peilvcha']['v'],ta['cs'][n]['peilvcha']['vm'])+"</td>";
						str += "<td class='hide plcs'></td>";
					   }
						}else{
							str += "<td class='plcs'><input type='text' class='hide' /></td>";
							str += "<td class='hide plcs'></td>";
						
						}
					}
					
					str += "<td class='x'>" + setinputs('cmaxje' + ta['id'], ta['cmaxje']['v'], ta['cmaxje']['vm']) + "</td>";
					str += "<td class='x'>" + setinputs('maxje' + ta['id'], ta['maxje']['v'], ta['maxje']['vm']) + "</td>";
					if (Number(ta['abcd']) == 1) {
						if (Number(ta['ab']) == 1) {
							for (k = 0; k < cu; k++) {
								ids = 'points' + upan[k].toLowerCase() + 'a';
								str += "<td class='p'>" + setinputs(ids + ta['id'], ta[ids]['v'], ta[ids]['vm'], ta[ids]['att']) + "</td>";
								ids = 'points' + upan[k].toLowerCase() + 'b';
								str += "<td class='p'>" + setinputs(ids + ta['id'], ta[ids]['v'], ta[ids]['vm'], ta[ids]['att']) + "</td>"
							}
						} else {
							for (k = 0; k < cu; k++) {
								ids = 'points' + upan[k].toLowerCase() + '0';
								str += "<td colspan='2' class='p'>" + setinputs(ids + ta['id'], ta[ids]['v'], ta[ids]['vm'], ta[ids]['att']) + "</td>"
							}
						}
					} else {
						ids = 'points' + 'a' + '0';
						str += "<td colspan='" + (cu * 2) + "' class='p'>" + setinputs(ids + ta['id'], ta[ids]['v'], ta[ids]['vm'], ta[ids]['att']) + "</td>"
					}
					str += "</tr>";
				if (plc == 1 &  Number(ta['son'])>1) {
					 for(var n in ta['cs']){
						ids = 'peilvcha';
						str += "<tr class='plcs gametr p" + g[i]['gid'] + "'>";
					    str += "<td></td>";
						str += "<td><input type='checkbox' class='son b"+ta['cs'][n]['bc']+"' /><input type='button' class='cstb' value='同选中' /></td>";
						str += "<td>"+ta['cs'][n]['name']+"</td>";
						str += "<td>"+setinputs(ids + ta['cs'][n]['id'], ta['cs'][n]['peilvcha']['v'],ta['cs'][n]['peilvcha']['vm']) +"</td>"; 
						str += "<td colspan='" + (cu * 2+3) + "'></td>";
						str +="</tr>";
					 }						
						
				}
				}
				

				$("table.cs2 tbody").append(str)
			}
			
			var pc = $(".cs2 tr:eq(0) .p").length;
			if (plc == 1) {
				var tystr = "<tr><th colspan='3'>统一设置</th><td><input type='text' class='input tytxt' value='0' /><input type='button' value='设' class='peilvchas' /></td>"
			} else {
				var tystr = "<tr><th colspan='3'>统一设置</th>"
			}
			tystr += "<td style='display:none'></td><td><input type='text' class='input tytxt' value='0' /><input type='button' value='设' class='cmaxjes' /></td><td><input type='text' class='input tytxt' value='0' /><input type='button' value='设' class='maxjes' /></td>";
			tystr += "<td colspan='" + (pc * 2) + "'>赚取退水:<input type='text' class='input tytxt' value='0.1' /><input type='button' value='设' class='ps' /><input type='button' value='全部赚' class='psall' /></td>";
			tystr += "</tr>";
			$(".cs2 thead").html(tystr);
			changeh(document.documentElement.scrollHeight+500);;
			str=null;
			tystr=null;
			carr = new Array("t_BALL","t_LM","t_ITEM","t_MP","t_");
			$("tr.gametr").mouseover(function(){$(this).addClass('hover')}).mouseout(function(){$(this).removeClass('hover')});

					    if (plc == 1) {
				for(var i in carr){
			    $("table.quick tr."+carr[i]+" input:eq(0)").val($("table.cs2").find("."+carr[i]+":eq(0)").find("input:text:eq(1)").val());
				$("table.quick tr."+carr[i]+" input:eq(1)").val($("table.cs2").find("."+carr[i]+":eq(0)").find("input:text:eq(2)").val());
				
				$("table.quick tr."+carr[i]+" input:eq(2)").val($("table.cs2").find("."+carr[i]+":eq(0)").find("input:text:eq(3)").val());
				
				if(pc>1){
				$("table.quick tr."+carr[i]+" input:eq(3)").val($("table.cs2").find("."+carr[i]+":eq(0)").find("input:text:eq(4)").val());
				}
				if(pc>2){
				$("table.quick tr."+carr[i]+" input:eq(4)").val($("table.cs2").find("."+carr[i]+":eq(0)").find("input:text:eq(5)").val());
				}
				if(pc>3){
				$("table.quick tr."+carr[i]+" input:eq(5)").val($("table.cs2").find("."+carr[i]+":eq(0)").find("input:text:eq(6)").val());
				}
				}
			}else{
				for(var i in carr){
			    $("table.quick tr."+carr[i]+" input:eq(0)").val($("table.cs2").find("."+carr[i]+":eq(0)").find("input:text:eq(0)").val());
				$("table.quick tr."+carr[i]+" input:eq(1)").val($("table.cs2").find("."+carr[i]+":eq(0)").find("input:text:eq(1)").val());
				
				$("table.quick tr."+carr[i]+" input:eq(2)").val($("table.cs2").find("."+carr[i]+":eq(0)").find("input:text:eq(2)").val());
				
				if(pc>1){
				$("table.quick tr."+carr[i]+" input:eq(3)").val($("table.cs2").find("."+carr[i]+":eq(0)").find("input:text:eq(3)").val());
				}
				if(pc>2){
				$("table.quick tr."+carr[i]+" input:eq(4)").val($("table.cs2").find("."+carr[i]+":eq(0)").find("input:text:eq(4)").val());
				}
				if(pc>3){
				$("table.quick tr."+carr[i]+" input:eq(5)").val($("table.cs2").find("."+carr[i]+":eq(0)").find("input:text:eq(5)").val());
				}
				}
			}
		    $("table.quick input:button").click(function(){
				var a;
				var cc = $(this).parent().parent().attr('class');
				var obj = $("table.cs2").find("."+cc);
				
			     if (plc == 1) {	
				    a = bj(obj.find("input:text:eq(1)").attr('m'),$("table.quick tr."+cc+" input:eq(0)").val(),0);
					obj.find("input:text:eq(1)").val(a);
				    a = bj(obj.find("input:text:eq(2)").attr('m'),$("table.quick tr."+cc+" input:eq(1)").val(),0);
					obj.find("input:text:eq(2)").val(a);
				    a = bj(obj.find("input:text:eq(4)").attr('m'),$("table.quick tr."+cc+" input:eq(2)").val(),0);
					obj.find("input:text:eq(3)").val(a);
				    a = bj(obj.find("input:text:eq(5)").attr('m'),$("table.quick tr."+cc+" input:eq(3)").val(),0);
					obj.find("input:text:eq(4)").val(a);
				    a = bj(obj.find("input:text:eq(6)").attr('m'),$("table.quick tr."+cc+" input:eq(4)").val(),0);
					obj.find("input:text:eq(5)").val(a);
				    a = bj(obj.find("input:text:eq(7)").attr('m'),$("table.quick tr."+cc+" input:eq(5)").val(),0);
					obj.find("input:text:eq(6)").val(a);
					
					$("table.cs2").find("input:text").removeClass("changed");
					obj.find("input:text:eq(1)").addClass("changed");
					obj.find("input:text:eq(2)").addClass("changed");
					obj.find("input:text:eq(3)").addClass("changed");
					obj.find("input:text:eq(4)").addClass("changed");
					obj.find("input:text:eq(5)").addClass("changed");
					obj.find("input:text:eq(6)").addClass("changed");
					 
				 }else{
				    a = bj(obj.find("input:text:eq(0)").attr('m'),$("table.quick tr."+cc+" input:eq(0)").val(),0);
					obj.find("input:text:eq(0)").val(a);
				    a = bj(obj.find("input:text:eq(1)").attr('m'),$("table.quick tr."+cc+" input:eq(1)").val(),0);
					obj.find("input:text:eq(1)").val(a);
				    a = bj(obj.find("input:text:eq(3)").attr('m'),$("table.quick tr."+cc+" input:eq(2)").val(),0);
					obj.find("input:text:eq(2)").val(a);
				    a = bj(obj.find("input:text:eq(5)").attr('m'),$("table.quick tr."+cc+" input:eq(3)").val(),0);
					obj.find("input:text:eq(3)").val(a);
				    a = bj(obj.find("input:text:eq(5)").attr('m'),$("table.quick tr."+cc+" input:eq(4)").val(),0);
					obj.find("input:text:eq(4)").val(a);
				    a = bj(obj.find("input:text:eq(6)").attr('m'),$("table.quick tr."+cc+" input:eq(5)").val(),0);
					obj.find("input:text:eq(5)").val(a);
					
					$("table.cs2").find("input:text").removeClass("changed");
					obj.find("input:text:eq(0)").addClass("changed");
					obj.find("input:text:eq(1)").addClass("changed");
					obj.find("input:text:eq(2)").addClass("changed");
					obj.find("input:text:eq(3)").addClass("changed");
					obj.find("input:text:eq(4)").addClass("changed");
					obj.find("input:text:eq(5)").addClass("changed");
				 }
			});
			$("table.cs2 tr").each(function(i){
			    if(i>1){
				   $(this).find("input:text").blur(function(){					
				      if($(this).attr('id').indexOf('minje')!=-1){
					     $(this).val(bj($(this).attr('m'),$(this).val(),1));
					  }else{
					     $(this).val(bj($(this).attr('m'),$(this).val(),0));
					  }
					  $(this).addClass("changed");
				   });
				}
			});
			
			$(".cs2 tr:eq(0) input:button").click(function() {
				$(".cs2 input:text").removeClass("changed");
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
								$(this).addClass("changed");
							}
						}
					})
				} else if ($(this).hasClass('ps')) {
					$(".cs2 td.p select:visible").each(function(i) {
						var valsm = Number($(this).attr('m'));
						$(this).val(valsm - val < 0 ? 0 : getResult(valsm - val, 2));
						$(this).addClass("changed");
					});
					$(".cs2 td.p input:text:visible").each(function(i) {
						var valsm = Number($(this).attr('m'));
						$(this).val(valsm - val < 0 ? 0 : getResult(valsm - val, 2));
						$(this).addClass("changed");
					});
				} else if ($(this).hasClass('psall')) {
					$(".cs2 td.p select:visible").val(0);
					$(".cs2 td.p input:text:visible").val(0);
					$(this).addClass("changed");
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
								$(this).addClass("changed");
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
								$(this).addClass("changed");
							}
						}
					})
				} else if ($(this).hasClass('peilvchas')) {
					$(".cs2 input:text").each(function() {
						if ($(this).is(":visible")) {
							var ids = $(this).attr('id') + '';
							if (ids.substr(0, 8) == 'peilvcha') {
								var valsm = Number($(this).attr('m'));
								if (val <= valsm) {
									$(this).val(val)
								} else {
									$(this).val(valsm)
								}
								$(this).addClass("changed");
							}
						}
					})
				}
			});

			$("table.cs2 input:text").blur(function() {
				if ($(this).hasClass('tytxt')) return false;
				var vvs = $(this).val();
				if (Number(vvs) % 1 != 0) { //退水为text,Number($(this).val())*100
					alert("请输入正确数值,单注、单项不支持小数");
					$(this).val($(this).attr('m'));
					$(this).focus();
					return false
				}
				if ($(this).attr('id').indexOf('inje') != -1) {
					if (Number($(this).val()) < Number($(this).attr('m')) | Number($(this).val()) % 1 != 0) {
						alert("最小" + $(this).attr('m'));
						$(this).val($(this).attr('m'))
					}
				} else if ($(this).attr('id').indexOf('maxje') != -1) {
					if (Number($(this).val()) > Number($(this).attr('m')) | Number($(this).val()) % 1 != 0) {
						alert("最大" + $(this).attr('m'));
						$(this).val($(this).attr('m'))
					}
				} else {
					if (Number($(this).val()) > Number($(this).attr('m'))) {
						alert("最大" + $(this).attr('m'));
						$(this).val($(this).attr('m'))
					}
				}
			});
			$("table.cs2 input.all").click(function() {
				if ($(this).prop("checked")) {
					$("table.cs2").find("input.fu").prop("checked", true);
				} else {
					$("table.cs2").find("input.fu").prop("checked", false);
				}
			});
			
			$("table.cs2 input.allson").click(function() {
				var bc = $(this).attr('bc');
				if ($(this).prop("checked")) {
					$("table.cs2").find("input.b"+bc).prop("checked", true);
				} else {
					$("table.cs2").find("input.b"+bc).prop("checked", false);
				}
			});

			$("table.cs2 input.pantb").click(function() {
				$(this).parent().parent().find("input:text").each(function(i) {					
					var val = $(this).val();
					$("table.cs2 tr").each(function() {					
						if ($(this).find("input.fu").prop("checked")) {
							$(this).find("input:text:eq(" + i + ")").val(val);
						}
					});
					
				});

				$(this).parent().parent().find("select").each(function(i) {
					var val = $(this).val();
					$("table.cs2 tr").each(function() {
						if ($(this).find("input.fu").prop("checked")) {
							$(this).find("select:eq(" + i + ")").val(val);
						}
					});
				});
			});
			
			$("table.cs2 input.cstb").click(function() {
				$(this).parent().parent().find("input:text").each(function(i) {					
					var val = $(this).val();
					$("table.cs2 tr").each(function() {					
						if ($(this).find("input.son").prop("checked")) {
							$(this).find("input:text:eq(" + i + ")").val(val);
						}
					});
					
				});

				$(this).parent().parent().find("select").each(function(i) {
					var val = $(this).val();
					$("table.cs2 tr").each(function() {
						if ($(this).find("input.son").prop("checked")) {
							$(this).find("select:eq(" + i + ")").val(val);
						}
					});
				});
			});

			$(".utb .close").click(function() {
				$(".main").show();
				$(".utb").hide();
				changeh(document.documentElement.scrollHeight+500);;
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
				$(".gamelabel").removeClass('selected');
				$(this).addClass("selected");
				var gid = Number($(this).attr('gid'));
				$(".gametr").hide();
				$(".p" + gid).show();
				$(".yiwotongbu").show();
				if(gid==100){
				   $("table.quick").hide();
				}else{
				   $("table.quick").show();
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
					str += "&" + $(this).attr('id') + "=" + $(this).val()
				});
				if (error) {
					alert("单注最大、单场最大、单注最低 必须输入非0整数！");
					return false
				}
				$.ajax({
					type: 'POST',
					url: mulu + 'suser',
					cache: false,
					async:false,
					data: 'xtype=setpoints' + str,
					success: function(m) {
						if (Number(m) == 1) {
							alert("修改成功！");
				           $(".main").show();
				     $(".utb").hide();
						}
					}
				});
				return false
			})
		}
	})
}

function edituser(uid, types) {
	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		cache: false,
		data: 'xtype=edit&uid=' + uid + '&types=' + types,
		success: function(m) {
			if (Number(m) == 2) {
				alert("用户不存在!");
				return false
			}
			$(".utb").html(m);

            $(".utb .tuiset").click(function(){
                editpoints(uid);
            });

            $(".czpass").click(function(){
				var uid = $("#username").attr('uid');
				$.ajax({
					type: 'POST',
					url: mulu + 'suser',
					cache: false,
					async: false,
					data: 'xtype=czpass&uid='+uid,
					success: function(m) {
						if(Number(m)==1){
							$(".errortimesstatus").html('0');
							alert("成功重置错误登录次数。");
						}
					}
				});
				 
			});
			$(".czmoneypass").click(function(){
				var uid = $("#username").attr('uid');
				var posi = $(this).position()
				$(".zztb").css("top",posi.top);
				$(".zztb").css("left",posi.left+100);
				$(".zztb").show();
				$(".zztb").attr("uid",uid); 
			});	

			$(".utb .tongyi input[type='text']").each(function(){
				var id = $(this).attr("id");
				$(this).attr("maxzc",$(".utb ."+id+":eq(0)").attr('maxzc'));
			});
			$(".utb .tongyi select").change(function() {
				var val = $(this).val();
				var id = $(this).attr('id');
				$("." + id).val(val)
			});
			$(".utb .addtb2 input[type='text']").blur(function(){setzcval($(this),$(this).attr('maxzc'))});
			$(".utb .tongyi input[type='text']").keypress(function(){
				setzcval($(this),$(this).attr('maxzc'));
				var id = $(this).attr("id");
				$(".utb ."+id).val($(this).val());
			}).keyup(function(){
				setzcval($(this),$(this).attr('maxzc'));
				var id = $(this).attr("id");
				$(".utb ."+id).val($(this).val());
			}).blur(function(){
				setzcval($(this),$(this).attr('maxzc'));
				var id = $(this).attr("id");  
				$(".utb ."+id).val($(this).val());
			});
			$(".utb .addtb2 tbody select").each(function(){
			    $(this).val($(this).attr('val'));
			});
			
			$(".utb .list tr").mouseover(function(){$(this).addClass('hover')}).mouseout(function(){$(this).removeClass('hover')});
			
			$(".utb").show();
			$(".main").hide();
			$(".utb .hides").hide();
			changeh(document.documentElement.scrollHeight+500);;
			$(".list tr").mouseover(function(){$(this).addClass('hover')}).mouseout(function(){$(this).removeClass('hover')});
			if (types == 'ag') {
				$(".utb .actionname").html("修改" + layername[Number($(".utb .actionname").attr("layer") - 1)]);
			}

			$("input[name='fudong']").change(function(){
			     var val = $(this).val();
				 chfudong(Number($(this).val()));
			});			
			chfudong(Number($("input[name='fudong']:checked").val()));

			
			$("#name").blur(function() {
				checkname()
			});
			$("#pass2").blur(function() {
				checkpassedit()
			});

			$("#maxren").keyup(function() {
				checkmaxren()
			}).keypress(function() {
				checkmaxren()
			});

	$("#yingdeny").blur(function() {
		checkyingdeny()
	});

			$(".utb .close").click(function() {
				$(".utb").hide();
				$(".main").show();
				$("#fid").val($("#topid").val());
				gettree();
				getuser();
			});
			$(".utb input:text").parent().append("<img src='' style='display:none' />");
			$(".utb input:password").parent().append("<img src='' style='display:none' />");
			$(".pantype").click(function() {
				if (types != 'ag') $(".pantype").prop("checked",false);//只选一个盘
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


			if (Number($("#status").attr('layer')) > (maxlayer - 2)) {
				$(".flyzc").val('0');
				$(".flyzc").attr("disabled", true)
			} else {
				$(".flyzc").attr("disabled", false)
			}
			$("#maxmoney").parent().find("a").click(function(){
				var obj = $(this).parent().parent();
				if(moneypassflag!=1 && 1==2){
					var objs = $(this);
					editmoneypass(obj,objs);
					return false;
				}
			     var uid = $("#username").attr('uid');
				 var username = $("#username").html();
				$(".edudiv .ui-dialog-title").html("" + username + "#修改低频彩额度");
				$(".edutb td:eq(0)").attr("uid", uid);
				$(".edutb td:eq(0)").attr("etype", 'slow');
				$(".edutb td:eq(0)").html(username);
				$(".edutb th:eq(1)").html("低频彩额度");
				readedu($(this));
			});
			$("#kmaxmoney").parent().find("a").click(function(){
				var obj = $(this).parent().parent();
				if(moneypassflag!=1 && 1==2){
					var objs = $(this);
					editmoneypass(obj,objs);
					return false;
				}
			     var uid = $("#username").attr('uid');
				 var username = $("#username").html();
				$(".edudiv .ui-dialog-title").html("" + username + "#修改快开彩额度");
				$(".edutb td:eq(0)").attr("uid", uid);
				$(".edutb td:eq(0)").attr("etype", 'fast');
				$(".edutb td:eq(0)").html(username);
				$(".edutb th:eq(1)").html("快开彩额度");
				readedu($(this));
			});
			
			$("#fmaxmoney").parent().find("a").click(function(){
				var obj = $(this).parent().parent();
				if(moneypassflag!=1 && 1==2){
					var objs = $(this);
					editmoneypass(obj,objs);
					return false;
				}
			     var uid = $("#username").attr('uid');
				 var username = $("#username").html();
				$(".edudiv .ui-dialog-title").html("" + username + "#修改现金额度");
				$(".edutb td:eq(0)").attr("uid", uid);
				$(".edutb td:eq(0)").attr("etype", 'fast');
				$(".edutb td:eq(0)").html(username);
				$(".edutb th:eq(1)").html("现金额度");
				readedu($(this));
			});
			
			$(".utb .edit").click(function() {
				var num = 0;
				checkname();
				
				checkyingdeny();
				if(!checkpassedit()){
                    return false;
				}
				if (maxrenflag == 1) checkmaxren();

				$(".utb").find("img").each(function() {
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

				if (Number($("#ifagent").val()) == 1) {
					if (num == 3 & $("#userpass").val() != '') {
						success = true
					} else if (num == 2 & $("#userpass").val() == '') {
						success = true
					} else {
						success = false
					}
				} else if (Number($("#ifagent").val()) == 0) {
					if (num == 3 & $("#userpass").val() != '') {
						success = true
					} else if (num == 2 & $("#userpass").val() == '') {
						success = true
					} else {
						success = false
					}
				} else {
					success = false
				}
				if (!success) {
					alert("请检查输入项目！");
					return false
				}
				var userid = $("#username").attr("uid");
				var name = $("#name").val();

		var tname = $("#tname").val();
		var tel = $("#tel").val();
		var qq = $("#qq").val();
		var sex = $("#sex").val();
		var birthday = $("#birthday").val();
		var shengshi = $("#shengshi").val();
		var street = $("#street").val();
		var shr = $("#shr").val();
		var bz = $("#bz").val();
		var yingdeny = $("#yingdeny").val();

				var userpass = $("#userpass").val();
				var maxmoney = $("#maxmoney").val();
				var kmaxmoney = $("#kmaxmoney").val();
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
				var status = $("input[name='status']:checked").val();
				var plc = $("#plc").val();
				var fudong = $("input[name='fudong']:checked").val();
				var str = "&ifagent=" + ifagent + "&ifexe=" + ifexe + "&wid=" + wid + "&plc=" + plc + "&fudong=" + fudong;
				str += "&defaultpan=" + defaultpan + "&pan=" + pan + "&maxren=" + maxren + "&kmaxmoney=" + kmaxmoney;
				str += "&maxmoney=" + maxmoney + "&userpass=" + userpass + "&name=" + name + "&userid=" + userid;
				str += "&fid=" + fid + "&status=" + status + "&pself=" + pself;
				str += "&tname="+tname+"&qq=" + qq + "&tel=" + tel + "&sex=" + sex+ "&birthday=" + birthday + "&bz=" + bz + "&shengshi=" + shengshi + "&street=" + street + "&shr=" + shr + "&cssz=" + cssz + "&mgid=" + mgid+"&yingdeny="+yingdeny;
				var gamecs = "{";
				j = 0;
				$(".addtb2 tbody tr").each(function(i) {

						var gid = $(this).find("th:eq(0)").attr("gid");
						var typeid = $(this).find("th:eq(0)").attr("typeid");
						var ifok = $(this).find(".ifok").val();
						var flytype = $(this).find(".flytype").val();
						var upzc = $(this).find(".upzc").val();
						var zc = $(this).find(".zc").val();
						var flyzc = $(this).find(".flyzc").val();
						var zcmin = $(this).find(".zcmin").val();
						if (j > 0) gamecs += ',';
						gamecs += '"' + j + '":{"typeid":"' + typeid + '","gid":"' + gid + '","ifok":"' + ifok + '","flytype":"' + flytype + '","upzc":"' + upzc + '","zc":"' + zc + '","flyzc":"' + flyzc + '","zcmin":"' + zcmin + '"}';
						j++
			
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
			m = null
		}
	})
}
function chfudong(v){
	if(v==1){
	   $(".utb").find("tr.fmodetr").show();
	   $(".utb").find("tr.kmodetr").hide();
	   $(".utb").find("tr.modetr").hide();
	}else{
	   $(".utb").find("tr.fmodetr").hide();
	   if(fasttype==1){
	      $(".utb").find("tr.kmodetr").show();
	   }
	   if(slowtype==1){
	      $(".utb").find("tr.modetr").hide();
	   }
	}
}

function setzcval(obj, maxs) {
	var val = obj.val().replace(/\D/g, '');
	if (Number(val) > Number(maxs)) val = maxs;
	if (Number(val) < 0) val = 0;
	obj.val(val);
}
function addfunc(types) {
	$(".utb").show();
	$(".main").hide();
	$(".utb .hides").hide();
    changeh(document.documentElement.scrollHeight+500);

			$(".utb .ifok").val(1);
			$(".utb .flytype").val(1);
			$(".utb .tongyi input[type='text']").each(function(){
				var id = $(this).attr("id");
				$(this).attr("maxzc",$(".utb ."+id+":eq(0)").attr('maxzc'));
			});
			$(".utb .tongyi select").change(function() {
				var val = $(this).val();
				var id = $(this).attr('id');
				$("." + id).val(val)
			});
			$(".utb .addtb2 input[type='text']").blur(function(){setzcval($(this),$(this).attr('maxzc'))});
			$(".utb .tongyi input[type='text']").keypress(function(){
				setzcval($(this),$(this).attr('maxzc'));
				var id = $(this).attr("id");
				$(".utb ."+id).val($(this).val());
			}).keyup(function(){
				setzcval($(this),$(this).attr('maxzc'));
				var id = $(this).attr("id");
				$(".utb ."+id).val($(this).val());
			}).blur(function(){
				setzcval($(this),$(this).attr('maxzc'));
				var id = $(this).attr("id");
				$(".utb ."+id).val($(this).val());
			});
			
			
			$(".utb .list tr").mouseover(function(){$(this).addClass('hover')}).mouseout(function(){$(this).removeClass('hover')});


			$("input[name='fudong']").change(function(){
			     var val = $(this).val();
				 chfudong(Number($(this).val()));
			});			
			chfudong(Number($("input[name='fudong']:checked").val()));

	
	$("#username").blur(function() {
		checkusername()
	});
	$("#name").blur(function() {
		checkname()
	});
	$("#password").blur(function() {
		checkpass()
	});
	$("#maxmoney").blur(function() {
		checkmoney()
	});
	$("#kmaxmoney").blur(function() {
		checkkmoney()
	});
	
	$("#fmaxmoney").blur(function() {
		checkfmoney()
	});

	$("#maxren").keyup(function() {
		checkmaxren()
	}).keypress(function() {
		checkmaxren()
	});


	$("#yingdeny").blur(function() {
		checkyingdeny()
	});
	
	$(".utb .close").click(function() {
		$(".utb").hide();
		$(".main").show();
		$("#fid").val($("#topid").val());
		gettree();
		getuser();
	});

	$(".utb input:text").parent().append("<img src='' style='display:none' />");
	$(".utb input:password").parent().append("<img src='' style='display:none' />");
	$(".pantype").click(function() {
		if (types != 'ag') $(".pantype").prop("checked",false);//只选一个盘
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
	if (types == 'ag') $(".utb input.pantype").attr("checked", true);
	//if (types != 'ag') $(".pantype:eq(0)").click();//只选一个盘
	
	$("#defaultpan").append("<option value='" + $(".utb input.pantype:eq(0)").val() + "'>" + $(".utb input.pantype:eq(0)").val() + "</option>");
	
	$("#wid").change(function() {
		var wid = Number($("#wid").val());
		for (k = 0; k < layernames.length; k++) {
			if (wid == Number(layernames[k]['wid'])) {
				$("#user1").html(layernames[k]['namehead'])
			}
		}
	});

	if (Number($("#status").attr('layer')) > (maxlayer - 2)) {
		$(".flyzc").val('0');
		$(".flyzc").attr("disabled", true)
	} else {
		$(".flyzc").attr("disabled", false)
	}


	
	$(".utb .add").unbind('click');

	$(".utb input.add").click(function() {
		var num = 0;
		checkusername2();
		checkname();
		checkpass();
		checkmoney();
		checkkmoney();
		checkfmoney();
		checkyingdeny();
		
		if(Number($("input[name='fudong']:checked").val())==1){
		     $(".utb #kmaxmoney").val($(".utb #fmaxmoney").val());
			 $(".utb #maxmoney").val(0);			     
		}
		if (maxrenflag == 1) checkmaxren();
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
		if (num == 6 & Number($("#ifagent").val()) == 1) {
			success = true
		} else if (num == 6 & Number($("#ifagent").val()) == 0) {
			success = true
		} else {
			success = false;
			alert("您还没有完成表格");
			return false
		}

		if($("#usernameMsg em.success").length!==1) {
			alert("账号不可用!");
			return false;
		}

		if(!confirm("是否确定写入该帐号吗？")){
        	return false;
        }
	
		var username = $("#username").val();
		var name = $("#name").val();

		var tname = $("#tname").val();
		var tel = $("#tel").val();
		var qq = $("#qq").val();
		var sex = $("#sex").val();
		var birthday = $("#birthday").val();
		var shengshi = $("#shengshi").val();
		var street = $("#street").val();
		var shr = $("#shr").val();
		var bz = $("#bz").val();
		var yingdeny = $("#yingdeny").val();

		var userpass = $("#userpass").val();
		var maxmoney = $("#maxmoney").val();
		var kmaxmoney = $("#kmaxmoney").val();
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
		var fudong = $("input[name='fudong']:checked").val();
		var liushui = $("#liushui").val();

		var str = "&ifagent=" + ifagent + "&ifexe=" + ifexe + "&wid=" + wid;
		str += "&defaultpan=" + defaultpan + "&pan=" + pan + "&maxren=" + maxren + "&kmaxmoney=" + kmaxmoney;
		str += "&fudong=" + fudong + "&plc=" + plc;
		
		str += "&maxmoney=" + maxmoney + "&userpass=" + userpass + "&name=" + name + "&username=" + username;
		str += "&fid=" + fid + "&status=" + status + "&pself=" + pself + "&liushui=" + liushui;
	
		str += "&tname="+tname+"&qq=" + qq + "&tel=" + tel + "&sex=" + sex+ "&birthday=" + birthday + "&bz=" + bz + "&shengshi=" + shengshi + "&street=" + street + "&shr=" + shr + "&cssz=" + cssz + "&mgid=" + mgid+"&yingdeny="+yingdeny;
	
		var gamecs = "{";
		j = 0;
		$(".addtb2 tbody tr").each(function(i) {
				var typeid = $(this).find("th:eq(0)").attr("typeid");
				var gid = $(this).find("th:eq(0)").attr("gid");
				var ifok = $(this).find(".ifok").val();
				var flytype = $(this).find(".flytype").val();
				var upzc = $(this).find(".upzc").val();
				var zc = $(this).find(".zc").val();
				var flyzc = $(this).find(".flyzc").val();
				var zcmin = $(this).find(".zcmin").val();
				if (j > 0) gamecs += ',';
				gamecs += '"' + j + '":{"typeid":"' + typeid + '","gid":"' + gid + '","ifok":"' + ifok + '","flytype":"' + flytype + '","upzc":"' + upzc + '","zc":"' + zc + '","flyzc":"' + flyzc + '","zcmin":"' + zcmin + '"}';
				j++
		});
		gamecs += "}";
		str += "&gamecs=" + gamecs;
	
		$(".utb input:button").attr("disabled", true);
		$.ajax({
			type: 'POST',
			url: mulu + 'suser',
			cache: false,
			async: false,
			dataType:"json",
			data: 'xtype=adduser' + str,
			success: function(m) {
			
				if (Number(m[0]) == 2) {
					alert("用户名已存在！");
					$("#username").parent().find("img").attr("src", globalpath + 'img/0.gif');
					return false
				} else if (Number(m[0]) == 3) {
					alert("用户名不正确！");
					$("#username").parent().find("img").attr("src", globalpath + 'img/0.gif');
					return false
				} else if (Number(m[0]) == 1) {
					//alert("新增成功！");
					if(types=='ag'){
						layertype = 0;
					$(".title").find("label:eq(0)").html(m[1]);
					$(".title").find("label:eq(1)").html('直属代理');
					}else{
						layertype=1;
					$(".title").find("label:eq(0)").html(m[1]);
					$(".title").find("label:eq(1)").html('直属会员');
					}
					if(confirm("保存成功，是否设置退水？")){
                        editpoints(m[2]);
					}else{
						gettree();
                        getuser()
					}
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
	var maxuser = Number($("#username").attr('maxlength'));
	if (strlen($("#username").val()) > maxuser | !strtest.test($("#username").val())) {
		$("#usernameMsg").html("<em class='error'>用户名只能输入大小写字母和数字,长度必须最长" + maxuser + "位</em>");
		return false
	}
}

function checkusername() {
	var maxuser = Number($("#username").attr('maxlength'));
	if (strlen($("#username").val()) > maxuser | !strtest.test($("#username").val())) {
		$("#usernameMsg").html("<em class='error'>用户名只能输入大小写字母和数字,长度必须最长" + maxuser + "位</em>");
		return false
	}

	$.ajax({
		type: 'POST',
		url: mulu + 'suser',
		cache: false,
		data: 'xtype=checkuser&username=' + $("#username").val(),
		success: function(m) {
			if (m == 1) {
				$("#usernameMsg").html("<em class='success'>账号可用</em>");
		        return false
			} else {
				$("#usernameMsg").html("<em class='error'>帐号已存在</em>");
		        return false
			}
		}
	})
}

function checkname() {
	var names = $("#name").val();
	if (strlen(names) > 10) {
		//$("#name").parent().find('img').show();
		$("#name").parent().find('img').attr('src', globalpath + 'img/0.gif');
		alert("名字必须小于10位");
		$(".utb input.add").focus();
		return false
	}
	if (strlen(names) < 0) {
		//$("#name").parent().find('img').show();
		$("#name").parent().find('img').attr('src', globalpath + 'img/0.gif');
		alert("名字不能为空");
		$(".utb input.add").focus();
		return false
	}
	//$("#name").parent().find('img').show();
	$("#name").parent().find('img').attr('src', globalpath + 'img/1.gif')
}

function checkpass() {
	var pass1 = $("#password").val();
	if(!ptest.test(pass1)){
		alert("密码必须由6-20字符包含大小写字母和数字组合组成");
		//$("#password").parent().find('img').show();
		$("#password").parent().find('img').attr('src', globalpath + 'img/0.gif');
		return false
	}
	//$("#password").parent().find('img').show();
	$("#password").parent().find('img').attr('src', globalpath + 'img/1.gif');
	$("#userpass").val(men_md5_password(pass1))
}

function checkpassedit() {
	var pass1 = $("#password").val();
	if (pass1 != '') {
		if(!ptest.test(pass1)){
			alert("密码必须由6-20字符包含大小写字母和数字组合组成");
			//$("#password").parent().find('img').show();
			$("#password").parent().find('img').attr('src', globalpath + 'img/0.gif');
			return false
		}
		//$("#password").parent().find('img').show();
		$("#password").parent().find('img').attr('src', globalpath + 'img/1.gif');
		$("#userpass").val(pass1);
	}
	return true;
}

function checkmoney() {
	var maxmoney = Number($("#maxmoney").parent().find("label").html());
	var nowmoney = Number($("#maxmoney").val());
	if (nowmoney % 1 != 0 | $("#maxmoney").val() == '') {
		$("#maxmoney").val(0);
		//$("#maxmoney").parent().find('img').show();
		$("#maxmoney").parent().find('img').attr('src', globalpath + 'img/1.gif');
		if ($("#action").val() == 'add') {
			$("#money").html(0)
		}
		return false
	}
	if (nowmoney > maxmoney) {
		$("#maxmoney").val(maxmoney)
	}
	//$("#maxmoney").parent().find('img').show();
	$("#maxmoney").parent().find('img').attr('src', globalpath + 'img/1.gif');
	if ($("#action").val() == 'add') {
		$("#money").html($("#maxmoney").val())
	}
	$("#dx").html(DX($("#maxmoney").val()));
}

function checkkmoney() {
	var kmaxmoney = Number($("#kmaxmoney").parent().find("label").html());
	var nowmoney = Number($("#kmaxmoney").val());
	if (nowmoney % 1 != 0 | $("#kmaxmoney").val() == '') {
		$("#kmaxmoney").val(0);
		//$("#kmaxmoney").parent().find('img').show();
		$("#kmaxmoney").parent().find('img').attr('src', globalpath + 'img/1.gif');
		if ($("#action").val() == 'add') {
			$("#kmoney").html(0)
		}
		return false
	}
	if (nowmoney > kmaxmoney) {
		$("#kmaxmoney").val(kmaxmoney)
	}
	//$("#kmaxmoney").parent().find('img').show();
	$("#kmaxmoney").parent().find('img').attr('src', globalpath + 'img/1.gif');
	if ($("#action").val() == 'add') {
		$("#kmoney").html($("#kmaxmoney").val())
	}
	$("#dxk").html(DX($("#kmaxmoney").val()));
}

function checkfmoney() {
	var fmaxmoney = Number($("#fmaxmoney").parent().find("label").html());
	var nowmoney = Number($("#fmaxmoney").val());
	if (nowmoney % 1 != 0 | $("#fmaxmoney").val() == '') {
		$("#fmaxmoney").val(0);
		//$("#fmaxmoney").parent().find('img').show();
		$("#fmaxmoney").parent().find('img').attr('src', globalpath + 'img/1.gif');
		if ($("#action").val() == 'add') {
			$("#fmoney").html(0)
		}
		return false
	}
	if (nowmoney > fmaxmoney) {
		$("#fmaxmoney").val(fmaxmoney)
	}
	//$("#fmaxmoney").parent().find('img').show();
	$("#fmaxmoney").parent().find('img').attr('src', globalpath + 'img/1.gif');
	if ($("#action").val() == 'add') {
		$("fmoney").html($("#kmaxmoney").val())
	}
	$("#dxf").html(DX($("#fmaxmoney").val()));
}

function checkyingdeny() {
	var yingdeny = Number($("#yingdeny").val());
	if (yingdeny % 1 != 0 | isNaN(yingdeny) | yingdeny=='') {
		$("#yingdeny").val(0);
	}
	//$("#yingdeny").parent().find('img').show();
	$("#yingdeny").parent().find('img').attr('src', globalpath + 'img/1.gif');
}

function checkmaxren() {
	var maxren = Number($("#maxren").parent().find("label").html());
	var nowren = Number($("#maxren").val());
	if (nowren % 1 != 0 | $("#maxren").val() == '') {
		$("#maxren").val('');
		//$("#maxren").parent().find('img').show();
		$("#maxren").parent().find('img').attr('src', globalpath + 'img/0.gif');
		return false
	}
	if (nowren > maxren) {
		$("#maxren").val(maxren)
	}
	//$("#maxren").parent().find('img').show();
	$("#maxren").parent().find('img').attr('src', globalpath + 'img/1.gif')
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
		data: 'xtype=upstatus&ustr=' + ustr + "&status=" + status,
		success: function(m) {
			if (Number(m) == 1) {
				$(".user_tb input:checkbox").each(function(i) {
					if (ustr.indexOf($(this).attr("value")) != -1 & i > 0) {
						if (status == 1) {
							$(this).parent().parent().find("td.status input").attr('class','s'+1);
							$(this).parent().parent().find("td.status input").val("启用");
						} else if (status == 2) {
							$(this).parent().parent().find("td.status input").attr('class','s'+2);
							$(this).parent().parent().find("td.status input").val("冻结");
						} else {
							$(this).parent().parent().find(".status input").attr('class','s'+0);
							$(this).parent().parent().find("td.status input").val("停用");
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

function rclass(name) {
  var t_BALL = "1-3球号|1-5球号|1-8球号|1-10车号|3字和数尾数|正码|全五一字组合|一字组合|二字组合|三字组合|二字定位|三字定位|2字定位|3字定位|2字组合|3字组合|";
  var t_LM="|冠亚军和大小|冠亚军和单双|两面|三军||全五1字组合|1字组合|大小|前后和|单双和|极值大小|总和过关|龙虎和|总和单双|总和尾数大小|";
  var t_ITEM = "1-8方位|1-8中发白|长牌|短牌|围骰|全骰|梭哈|牛牛|点数";
  var t_MP = "任选牛牛|连码|总和810|总和和局|组选三|组选六|组选3|组选6|";
  var t_="冠亚和|其他|总和|五行|冠亚军和|前中后三|二字和数|三字和数|和尾数|复式|跨度";
  var tf_="番摊-番|番摊-双面|番摊-念|番摊-加|番摊-角|番摊-通|番摊-正|番摊-中";
  if(t_BALL.indexOf(name)!=-1){
      return "t_BALL";
  }else if(t_LM.indexOf(name)!=-1 && name!="冠亚军和"){
      return "t_LM";
  }else if(t_MP.indexOf(name)!=-1){
      return "t_MP";
  }else if(t_ITEM.indexOf(name)!=-1){
      return "t_ITEM";
  }else if(t_.indexOf(name)!=-1){
      return "t_";
  }else if(tf_.indexOf(name)!=-1){
      return "tf_";
  }
  return '';;
}
