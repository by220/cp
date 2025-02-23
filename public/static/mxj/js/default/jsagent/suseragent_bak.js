var strtest = /[a-zA-Z0-9]/;

function myready() {
	$("#adduser").val("添加"+layername[flayer]);
	$("input.edit").click(function() {
		var uid = $(this).parent().parent().find("input:checkbox").attr('value');
		window.location.href = "user.php?xtype=editfirst&uid=" + uid;
		return false;
	});
	$("#adduser").click(function() {
		var fid = $("#fid").val();
		$.ajax({
			type: 'POST',
			url: mulu + 'suser.php',
			cache:false,
			data: 'xtype=add&fid=' + fid,
			success: function(m) {
				//$("#test").val(m);
				$(".utb").html(m);
				var zchtml = '';
				$(".upzc").each(function() {
					var maxzc = Number($(this).attr('maxzc'));
					zchtml='';
					for (i = maxzc; i >= 0; i -= 5) {
						zchtml += "<option value='" + i + "'>" + i + "</option>"
					}
					$(this).html(zchtml);
					$(this).parent().parent().find(".zc").html(zchtml)
				});
				$("#zc").html(zchtml);
				$("#upzc").html(zchtml);
				$(".utb .ifok").val(1);
				$(".utb .zchold").val(1);
				$(".utb .flytype").val(1);
				$(".tongyi select").change(function(){
				     var val = $(this).val();
					 var id = $(this).attr('id');
					 $("."+id).val(val);
				});
				addfunc();
				m = null
			}
		})
		return false;
	});
	$("#delselect").click(function() {
		var ustr = '|';
		$(".user_tb").find("input:checkbox").each(function(i) {
			if ($(this).prop("checked") == true) {
				ustr += $(this).val() + "|"
			}
		});
		deluser(ustr);
		return false;
	});
	$(".searchbtn").click(function() {
		getuser()
	});
	$("#layer").change(function() {
		getuser()
	});
	getuser();
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
			url: mulu + 'suser.php',
			cache:false,
			data: 'xtype=copyuser&username=' + username + "&uid=" + uid + "&name=" + name,
			success: function(m) {
				m = Number(m);
				//$("#test").html(m);
				if (m == 2) {
					alert("用户名已存在！");
					$(".copytb .copyname2").focus();
					return false
				}else if (m == 3) {
					alert("可用下线数为《0》,不能添加新用户！");
					$(".copytb .copyname2").focus();
					return false
				} else {
					getuser()
				}

			}
		});
		return false;
	});
	$(".copytb .copyclose").click(function() {
		$(".copytb").hide();
		return false;
	});
	$("#updatekzc").click(function() {
		$.ajax({
			type: 'POST',
			url: mulu + 'suser.php',
			cache:false,
			data: 'xtype=updatekzc',
			success: function(m) {
				if (Number(m) == 1) alert('ok')
			}
		});
		return false;
	})
	
	$("#showzc").click(function(){
		  if($(this).val()=='查看占成'){		  
			   $(".user_tb  tr").find("td").hide();
			   $(".user_tb  tr").find("td:eq(1)").show();			   
			   $(".user_tb tr:eq(0)").hide();
			   $(".user_tb  tr").find(".allzc").show();
			   $(".user_tb  tr").find(".allzc").find("td").show();
			   $(this).val("查看详细");
		  }	else{
			   $(".user_tb  tr").find("td").show();		   
			   $(".user_tb tr:eq(0)").show();
			   $(".user_tb  tr").find(".allzc").hide();
			   $(this).val("查看占成");
		  }					
             
	});
}
function gettree() {
	var fid = $("#fid").val();
	var topid = $("#topid").val();
	if (fid == topid) return;
	$.ajax({
		type: 'POST',
		url: mulu + 'suser.php',
		dataType: 'json',
		cache:false,
		data: 'xtype=gettree&fid=' + fid,
		success: function(m) {
			var ml = m.length;
			var str = '';
			var j = Number($("#flayer").val());
			for (i = ml - 1; i >= 0; i--,j++) {
				if (i < ml - 1) str += "<span>&nbsp;>&nbsp;</span>"
				str += "<label class='trees' uid='" + m[i]['uid'] + "' layer='" + m[i]['layer'] + "'><a>" + m[i]['username'] + "[" + m[i]['name'] + "]("+layername[j]+")</a></label>"
			}
			$(".tree").html(str);
			$(".trees").click(function() {
				var uid = $(this).attr('uid');
				var ulayer = $(this).attr('layer');
				$("#fid").val(uid);
				$("#layer").empty();
				for (i = Number(ulayer); i <= 9; i++) {
					$("#layer").append("<option value='" + i + "'>" + layername[i - 1] + "</option>")
				}
				$("#layer").val(Number(ulayer) + 1);
				$("#adduser").val("添加" + layername[Number($("#layer").val()) - 1]);
				gettree();
				getuser()
			})
		}
	})
}
function getuser() {
	var status = $(".status").val();
	var layer = $("#layer").val();
	var usernames = $("#usernames").val();
	var fid = $("#fid").val();
	str = "&fid=" + fid + "&layer=" + layer + "&status=" + status + "&username=" + usernames;
	$.ajax({
		type: 'POST',
		url: mulu + 'suser.php',
		data: 'xtype=getuser' + str,
		cache:false,
		success: function(m) {
			//$("#test").html(m);
			var str = $(".user_tb tr:first").html();
			$(".recordtb").hide();
			$(".user_tb").empty();
			$(".user_tb").append('<TR>' + str + '</tr>' + m);
			$(".utb").hide();
			$(".user_tb").show();
			
			if($("#showzc").val()=='查看详细'){
			   $(".user_tb  tr").find("td").hide();
			   $(".user_tb  tr").find("td:eq(1)").show();			   
			   $(".user_tb tr:eq(0)").hide();
			   $(".user_tb  tr").find(".allzc").show();
			   $(".user_tb  tr").find(".allzc").find("td").show();
			}
			$(".status").change(function() {
				getuser()
			});
			if (layer == '1') {
				$(".user_tb .layer1").show()
			} else {
				$(".user_tb .layer1").hide()
			}
			$(".list tr:eq(1)").show();
			$(".showdown").click(function() {
				var uid = $(this).parent().parent().find("input:checkbox").val();
				var ulayer = $(this).parent().parent().find("input:checkbox").attr('layer');
				var ifagent = $(this).parent().parent().find("input:checkbox").attr('ifagent');
				if (Number(ifagent) == 0) return;
				$("#fid").val(uid);
				$("#layer option").each(function() {
					if (Number($(this).val()) < Number(ulayer)) $(this).remove()
				});
				$("#layer").val(Number(ulayer) + 1);
				$("#adduser").val("添加" + layername[Number($("#layer").val()) - 1]);
				getuser();
				gettree()
			});
			$(".edit").click(function() {
				edit($(this).parent().parent().find("input:checkbox").val());
				return false;
			});
			$("#clickall").click(function() {
				if ($(this).prop("checked") == true) {
					$(".user_tb").find("input:checkbox").attr("checked", true)
				} else {
					$(".user_tb").find("input:checkbox").attr("checked", false)
				}
			});
			$("#openselect").click(function() {
				updatestatus('open');
				return false;
			});
			$("#closeselect").click(function() {
				updatestatus('close');
				return false;
			});
			$("img.status").click(function() {
				var img = $(this).attr('src').split(".gif");
				img = img[0].substring(strlen(img[0]) - 1);
				$(this).parent().parent().find("input:checkbox").attr("checked", true);
				if (img == '1') {
					updatestatus('close')
				} else {
					updatestatus('open')
				}
				return false;
			});
			$("input.copy").click(function() {
				var username = $(this).parent().parent().find("input:checkbox").attr("username");
				var uid = $(this).parent().parent().find("input:checkbox").val();
				var namelength = strlen(username) - 1;
				var namehead = username.substr(0, 1);
				$(".copyname1").html(namehead);
				$(".copyname2").attr("maxlength", namelength);
				$(".copyname2").attr("uid", uid);
				var posi = $(this).position();
				$(".copytb").css("top", posi.top + $(this).height() + 10);
				$(".copytb").css("left", posi.left + $(this).width() - $(".copytb").width());
				$(".copytb").show();
				return false;
			});
			$("input.resetpoints").click(function() {
				var uid = $(this).parent().parent().find("input:checkbox").attr('value');
				$.ajax({
					type: 'POST',
					url: mulu + 'suser.php',
					cache:false,
					data: 'xtype=resetpoints&uid=' + uid,
					success: function(m) {
						if (Number(m) == 1) {
							alert('ok')
						}
					}
				})
				return false;
			});
			$(".setpoints").click(function() {
				var uid = $(this).parent().parent().find("input:checkbox").val();
				editpoints(uid);
				return false;
			})
			
			$(".showson").click(function(){
			     var uid = $(this).parent().parent().find("input:checkbox").val();
                window.location.href='suser.php?xtype=editson&uid='+uid;
		        return false;
			});
			$(".record").click(function(){
			   if($(this).val()=='记录'){							
			     var uid = $(this).parent().parent().find("input:checkbox").val();
				 var username = $(this).parent().parent().find("input:checkbox").attr('username');
				 var posi= $(this).position();
				 $(".recordtb").css("left",posi.left+$(this).width()-$(".recordtb").width());
				 $(".recordtb").css("top",posi.top+$(this).height());
				 showrecord(uid,username);
				 $(".recordtb").show();
				 $(this).val("关闭记录");
			   }else{
			       $(this).val("记录");
				   $(".recordtb").hide();
			   }
			});
			
		}
	})
}
function showrecord(uid,username){

		$.ajax({
		type: 'POST',
		url: mulu + 'suser.php',
		
		dataType:'json',
		data: 'xtype=showrecord&uid=' + uid+"&username="+username,
		cache:false,
		success: function(m) {	
       // alert(m);
		     var el = 0;
			 if(m['e']!=undefined) el=m['e'].length;
			 var ll=0;
			 if(m['l']!=undefined) ll = m['l'].length;
			 var estr = "<tr><th>修改时间</th><th>修改者</th><th>修改IP</th><th>备注</th></tr>";
			 var lstr = "<tr><th>登陆时间</th><th>IP</th><th>备注</th></tr>";
			 for(i=0;i<el;i++){
				 estr += "<tr>";
				 estr += "<td>"+m['e'][i]['moditime']+"</td>";
				 estr += "<td>"+m['e'][i]['modiuser']+"("+m['e'][i]['modisonuser']+")</td>"
				 estr += "<td>"+m['e'][i]['modiip']+"</td>";
				 estr += "<td>"+m['e'][i]['action']+"</td>";
				 estr += "</tr>"; 
			 }

			 for(i=0;i<ll;i++){
				 lstr += "<tr>";
				 lstr += "<td>"+m['l'][i]['time']+"</td>";
				 lstr += "<td>"+m['l'][i]['ip']+"</td>";
				 lstr += "<td>"+m['l'][i]['ifok']+"</td>";
				 lstr += "</tr>"; 
			 } 
			 $(".recordtb .e").html("<table class='tinfo wd100'>"+estr+"</table>");
			 $(".recordtb .l").html("<table class='tinfo wd100'>"+lstr+"</table>");
			 
		}});
}

function editpoints(uid) {
	$.ajax({
		type: 'POST',
		url: mulu + 'suser.php',
		cache:false,
		data: 'xtype=editpoints&uid=' + uid,
		success: function(m) {
			//$("#test").val(m);
			$(".list tr:eq(1)").hide();
			$(".user_tb").hide();
			$(".utb").show();
			$(".utb").html("<tbody>"+m+"</tbody>");
			$(".utb input:text").addClass('txt1');
			m = null;
			$(".utb .close").click(function() {
				$(".user_tb").show();
				$(".list tr:eq(1)").show();
				$(".utb").hide();
				return false;
			});
			$("#game").change(function() {
				var gid = $(this).val();
				if (gid == 'all') {
					$(".gametr").show();
					return
				}
				$(".gametr").each(function(i) {
					if ($(this).attr('gid') == gid) {
						$(this).show()
					} else {
						$(this).hide()
					}
				})
			});
			$(".gamelabel").click(function(){
			    $(".gamelabel").removeClass('click');
				$(this).addClass("click");
				var gid = $(this).attr('gid');
				if (gid == 'all') {
					$(".gametr").show();
					return
				}
				$(".gametr").each(function(i) {
					if ($(this).attr('gid') == gid) {
						$(this).show()
					} else {
						$(this).hide()
					}
				})
				
	
					var fenlei = $(this).attr('fenlei');
				 if($(".tong label."+fenlei).length==1)   {$(".tong").hide();return;}
				 else{$(".tong").show()}
					$(".tong label").hide();
					$(".tong label."+fenlei).show();
	                $(".tong label").removeClass('click');
					$(".tong label").each(function(){
				         if($(this).attr('gid')==gid){
						     $(this).addClass('click');
						 }
				    });
			});
			$(".gamelabel:first").click();
			$(".tong label").click(function(){
			      var gid=$(".gamelabel.click").attr('gid');
				  var gid2=$(this).attr('gid');
				  var fenlei=$(this).attr('class');
				  $(".tong label").removeClass('click');
				  $(this).addClass('click');
				  $(".p"+gid+" input").each(function(i){
				        $(this).val($(".p"+gid2+" input:eq("+i+")").val());
				  });
				  $(".p"+gid+" select").each(function(i){
				        $(this).val($(".p"+gid2+" select:eq("+i+")").val());
				  });
				  
			});
			
			$(".setpointssend").click(function() {
				var uid = $(".uid").attr('uid');
				var fid = $(".uid").attr('fid');
				var str = "&uid=" + uid + "&fid=" + fid;
				$(".cs2 select").each(function() {
					str += "&" + $(this).attr('id') + "=" + $(this).val();
				});
				var error = false;
				$(".cs2 input:text").each(function() {
					if (Number($(this).val()) > Number($(this).attr('m')) | Number($(this).val()) == NaN | Number($(this).val()) % 1 != 0) {
						error = true;
					} else {
						str += "&" + $(this).attr('id') + "=" + $(this).val();
					}
				});
				if (error) {
					alert("单注限额,单场限额 必须输入整数！");
					return false
				}
				//$("#test").val(str);return;
				$.ajax({
					type: 'POST',
					url: mulu + 'suser.php',
					cache:false,
					data: 'xtype=setpoints' + str,
					success: function(m) {
						//alert(m);
						//$("#test").val(m);
						if (Number(m) == 1) {
							alert("修改成功！")
						}
					}
				})
				return false;
			})
		}
	})
}
function edit(uid) {
	$.ajax({
		type: 'POST',
		url: mulu + 'suser.php',
		cache:false,
		data: 'xtype=edit&uid=' + uid,
		success: function(m) {
			//$("#test").val(m);
			$(".utb").html(m);
			$(".utb").show();
			var zchtml = '';
			$(".upzc").each(function() {
				var maxzc = Number($(this).attr('maxzc'));
				zchtml = '';
				for (i = maxzc; i >= 0; i -= 5) {
					zchtml += "<option value='" + i + "'>" + i + "</option>"
				}
				$(this).html(zchtml);
				$(this).parent().parent().find(".zc").html(zchtml);
				$(this).val($(this).attr('val'));
				$(this).parent().parent().find(".zc").val($(this).parent().parent().find(".zc").attr('val'));
				$(this).parent().parent().find(".ifok").val($(this).parent().parent().find(".ifok").attr('val'));
				$(this).parent().parent().find(".flytype").val($(this).parent().parent().find(".flytype").attr('val'));
				$(this).parent().parent().find(".zchold").val($(this).parent().parent().find(".zchold").attr('val'))
			});
				$("#zc").html(zchtml);
				$("#upzc").html(zchtml);

				$(".tongyi select").change(function(){
				     var val = $(this).val();
					 var id = $(this).attr('id');
					 $("."+id).val(val);
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
		checkmaxren();
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
		if (Number($("#ifagent").val()) == 1) {
			if (num == 6 & $("#userpass").val() != '') {
				success = true
			} else if (num == 4 & $("#userpass").val() == '') {
				success = true
			} else {
				success = false
			}
		} else if (Number($("#ifagent").val()) == 0) {
			if (num == 5 & $("#userpass").val() != '') {
				success = true
			} else if (num == 3 & $("#userpass").val() == '') {
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
		var fix = $("#fix").val();
		var fixval = $("#fixval").val();
		var pself = $("#pself").val();
		var ifagent = $("#ifagent").val();
		var fid = $("#fid").val();
		var layer = $("#layer").val();
		var status = $("select#status").val();
		var ljs = $("#ljs").val();
		var lpoints = $("#lpoints").val();
		var str = "&ifagent=" + ifagent + "&fixval=" + fixval + "&fix=" + fix + "&ifexe=" + ifexe + "&wid=" + wid;
		str += "&defaultpan=" + defaultpan + "&pan=" + pan + "&maxren=" + maxren + "&kmaxmoney=" + kmaxmoney;
		str += "&maxmoney=" + maxmoney + "&userpass=" + userpass + "&name=" + name + "&userid=" + userid;
		str += "&fid=" + fid + "&status=" + status + "&pself=" + pself+"&ljs="+ljs+"&lpoints="+lpoints;
		var gamecs = "{";
		j = 0;
		$(".addtb2 tr").each(function(i) {
			if (i > 1) {
				var gid = $(this).find("td:eq(0)").attr("gid");
				var ifok = $(this).find(".ifok").val();
				var flytype = $(this).find(".flytype").val();
				var upzc = $(this).find(".upzc").val();
				var zc = $(this).find(".zc").val();
				var zchold = $(this).find(".zchold").val();
				if (j > 0) gamecs += ',';
				gamecs += '"' + j + '":{"gid":"' + gid + '","ifok":"' + ifok + '","flytype":"' + flytype + '","upzc":"' + upzc + '","zc":"' + zc + '","zchold":"' + zchold + '"}';
				j++
			}
		});
		gamecs += "}"
		str += "&gamecs=" + gamecs;
		$(".utb input:button").attr("disabled",true);
		$.ajax({
			type: 'POST',
			url: mulu + 'suser.php',
			cache:false,
			data: 'xtype=edituser' + str,
			success: function(m) {
				if (Number(m) == 1) {
					getuser()
				}
				$(".utb input:button").attr("disabled",false);
			}
		})
		return false;
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
	$("#maxren").keyup(function() {
		checkmaxren()
	}).keypress(function() {
		checkmaxren()
	});
	$(".utb .close").click(function() {
		$(".utb").hide();
		$(".user_tb").show();
		$(".list tr:eq(1)").show();
		return false;
	});
	$("input:text").parent().append("<img src='' style='display:none' />");
	$("input:password").parent().append("<img src='' style='display:none' />");
	$(".pantype").click(function() {
		if ($(".pantype:checked").length == 0) {
			$(this).attr("checked", true)
		}
		var pan = $(this).val();
		var checked = $(this).prop("checked");
		var flag = false;
		$("#defaultpan option").each(function() {
			if ($(this).val() == pan) {
				if (!checked) {
					$(this).remove()
				}
				flag = true
			}
		});
		if (!flag & checked) {
			$("#defaultpan").append("<option value='" + pan + "'>" + pan + "</option>")
			$("#defaultpan").val($("#defaultpan option:first").val());
		}
		return false;
	});
	$("#ifagent").change(function() {
		if (Number($(this).val()) == 0) {
			$("#maxren").val('0');
			$("#maxren").attr('disabled', true);
			$("#ifexe").attr('disabled', true);
			$("#fix").attr('disabled', true);
			$("#maxren").parent().find("img").remove();
			$(".flytype").val('0');
			$(".zc").val('0');
			$(".zchold").val('0');
			$("#lpoints").val('0');
			$(".flytype").attr("disabled", true);
			$(".zc").attr("disabled", true);
			$(".zchold").attr("disabled", true);
			$("#zchold").attr("disabled",true);
			$("#zc").attr("disabled",true);
			$("#flytype").attr("disabled",true);
		} else {
			$("#maxren").attr('disabled', false);
			$("#ifexe").attr('disabled', false);
			$("#fix").attr('disabled', false);
			$("#maxdown").parent().append("<img src='' style='display:none' />");
			$(".flytype").attr("disabled", false);
			$(".zc").attr("disabled", false);
			$(".zchold").attr("disabled", false);
			$("#zchold").attr("disabled",false);
			$("#zc").attr("disabled",false);
			$("#flytype").attr("disabled",false);
		}
	});
	if (Number($("#ifagent").val()) == 0) {
		$("#maxren").val('0');
		$("#maxren").attr('disabled', true);
		$("#ifexe").attr('disabled', true);
		$("#fix").attr('disabled', true);
		$("#maxren").parent().find("img").remove();
		$(".flytype").val('0');
		$(".zc").val('0');
		$(".zchold").val('0');
		$("#lpoints").val('0');
		$(".flytype").attr("disabled", true);
		$(".zc").attr("disabled", true);
		$(".zchold").attr("disabled", true);
			$("#zchold").attr("disabled",true);
			$("#zc").attr("disabled",true);
			$("#flytype").attr("disabled",true);
	}
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
	$("#maxren").keyup(function() {
		checkmaxren()
	}).keypress(function() {
		checkmaxren()
	});
	$(".utb .close").click(function() {
		$(".utb").hide();
		$(".user_tb").show();
		$(".list tr:eq(1)").show();
		return false;
	});
	$("input:text").parent().append("<img src='' style='display:none' />");
	$("input:password").parent().append("<img src='' style='display:none' />");
	$(".pantype").click(function() {
		if ($(".pantype:checked").length == 0) {
			$(this).attr("checked", true)
		}
		var pan = $(this).val();
		var checked = $(this).prop("checked");
		var flag = false;
		$("#defaultpan option").each(function() {
			if ($(this).val() == pan) {
				if (!checked) {
					$(this).remove()
				}
				flag = true
			}
		});
		if (!flag & checked) {
			$("#defaultpan").append("<option value='" + pan + "'>" + pan + "</option>")
			$("#defaultpan").val($("#defaultpan option:first").val());
		}
		
	});
	$("#ifagent").change(function() {
		if (Number($(this).val()) == 0) {
			$("#maxren").val('0');
			$("#maxren").attr('disabled', true);
			$("#ifexe").attr('disabled', true);
			$("#fix").attr('disabled', true);
			$("#maxren").parent().find("img").remove();
			$(".flytype").val('0');
			$(".zc").val('0');
			$(".zchold").val('0');
			$("#lpoints").val('0');
			$(".flytype").attr("disabled", true);
			$(".zc").attr("disabled", true);
			$(".zchold").attr("disabled", true);
			$("#zchold").attr("disabled",true);
			$("#zc").attr("disabled",true);
			$("#flytype").attr("disabled",true);
		} else {
			$("#maxren").attr('disabled', false);
			$("#ifexe").attr('disabled', false);
			$("#fix").attr('disabled', false);
			$("#maxren").parent().append("<img src='' style='display:none' />");
			$(".flytype").attr("disabled", false);
			$(".zc").attr("disabled", false);
			$(".zchold").attr("disabled", false);
			$("#zchold").attr("disabled",false);
			$("#zc").attr("disabled",false);
			$("#flytype").attr("disabled",false);
		}
	});
	if (Number($("#ifagent").val()) == 0) {
		$("#maxren").val('0');
		$("#maxren").attr('disabled', true);
		$("#ifexe").attr('disabled', true);
		$("#fix").attr('disabled', true);
		$("#maxren").parent().find("img").remove();
		$(".flytype").val('0');
		$(".zc").val('0');
		$(".zchold").val('0');
		$("#lpoints").val('0');
		$(".flytype").attr("disabled", true);
		$(".zc").attr("disabled", true);
		$(".zchold").attr("disabled", true);
			$("#zchold").attr("disabled",true);
			$("#zc").attr("disabled",true);
			$("#flytype").attr("disabled",true);
	}
	$(".add").unbind('click');
	$(".add").click(function() {
		var num = 0;
		checkusername();
		checkname();
		checkpass();
		checkmoney();
		checkkmoney();
		checkmaxren();
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
		if (num == 7 & Number($("#ifagent").val()) == 1) {
			success = true
		} else if (num == 6 & Number($("#ifagent").val()) == 0) {
			success = true
		} else {
			success = false;
			alert("您还没有完成表格");
			return false
		}
		var username = $("#username").val();
		var name = $("#name").val();
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
		var fix = $("#fix").val();
		var fixval = $("#fixval").val();
		var pself = $("#pself").val();
		var ifagent = $("#ifagent").val();
		var fid = $("#fid").val();
		var layer = $("#layer").val();
		var status = $("select#status").val();
		var ljs = $("#ljs").val();
		var lpoints = $("#lpoints").val();
		var str = "&ifagent=" + ifagent + "&fixval=" + fixval + "&fix=" + fix + "&ifexe=" + ifexe + "&wid=" + wid;
		str += "&defaultpan=" + defaultpan + "&pan=" + pan + "&maxren=" + maxren + "&kmaxmoney=" + kmaxmoney;
		str += "&maxmoney=" + maxmoney + "&userpass=" + userpass + "&name=" + name + "&username=" + username;
		str += "&fid=" + fid + "&status=" + status + "&pself=" + pself+"&ljs="+ljs+"&lpoints="+lpoints;
		var gamecs = "{";
		j = 0;
		$(".addtb2 tr").each(function(i) {
			if (i > 1) {
				var gid = $(this).find("td:eq(0)").attr("gid");
				var ifok = $(this).find(".ifok").val();
				var flytype = $(this).find(".flytype").val();
				var upzc = $(this).find(".upzc").val();
				var zc = $(this).find(".zc").val();
				var zchold = $(this).find(".zchold").val();
				if (j > 0) gamecs += ',';
				gamecs += '"' + j + '":{"gid":"' + gid + '","ifok":"' + ifok + '","flytype":"' + flytype + '","upzc":"' + upzc + '","zc":"' + zc + '","zchold":"' + zchold + '"}';
				j++
			}
		});
		gamecs += "}"
		str += "&gamecs=" + gamecs;
	    $(".utb input:button").attr("disabled",true);
		$.ajax({
			type: 'POST',
			url: mulu + 'suser.php',
			cache:false,
			data: 'xtype=adduser' + str,
			success: function(m) {
				//$("#test").val(m);
				if (Number(m) == 2) {
					alert("用户名已存在！");
					$("#username").parent().find("img").attr("src", globalpath + 'img/0.gif');
					return false;
				} else if (Number(m) == 1) {
					getuser();
				}
				$(".utb input:button").attr("disabled",false);
			}
		})
		return false;;
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
function checkusername() {
	var username = $("#user1").html() + $("#user3").val();
	var maxuser = Number($("#user3").attr('maxlength'));
	if (strlen($("#user3").val()) != maxuser | !strtest.test($("#user3").val())) {
		alert("用户名只能输入大小写字母和数字,长度必须为" + maxuser + "位");
		$("#username").parent().find('img').show();
		$("#username").parent().find('img').attr('src', globalpath + 'img/0.gif');
		return false
	}
	username = username.replace(" ", "");
	username = username.replace(" ", "");
	$.ajax({
		type: 'POST',
		url: mulu + 'suser.php',
		cache:false,
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
function updatestatus(status) {
	var ustr = '';
	$(".user_tb input:checkbox").each(function(i) {
		if (i > 0 & $(this).prop("checked") == true) {
			ustr += $(this).val() + "|"
		}
	});
	if (ustr == '') return false;
	if (status == 'open') status = 1;
	else status = 0;
	$.ajax({
		type: 'POST',
		url: mulu + 'suser.php',
		cache:false,
		data: 'xtype=updatestatus&ustr=' + ustr + "&status=" + status,
		success: function(m) {
			if (Number(m) == 1) {
				$(".user_tb input:checkbox").each(function(i) {
					if (ustr.indexOf($(this).attr("value")) != -1 & i > 0) {
						if (status == 1) {
							$(this).parent().parent().find(".status").attr('src', globalpath + 'img/1.gif')
						} else {
							$(this).parent().parent().find(".status").attr('src', globalpath + 'img/0.gif')
						}
					}
				})
			}
		}
	})
}
function deluser(ustr) {
	if (!confirm("确定删除吗？")) return false;
	$.ajax({
		type: 'POST',
		url: mulu + 'suser.php',
		cache:false,
		data: 'xtype=deluser&ustr=' + ustr,
		success: function(m) {
			if (Number(m) == 1) {
				$(".user_tb").find("input:checkbox").each(function(i) {
					if (ustr.indexOf('|' + $(this).val() + '|') != -1 & i > 0) {
						$(this).parent().parent().remove()
					}
				})
			} else if (Number(m) == 2) {
				alert("被删除的用户还有帐单")
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