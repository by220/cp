var gatt, time0, time1, settime0, settime1, gntime, upl;
var fastobj;
play = [];

$(function() {

	if ($(".time0").html() != undefined) {
		time0 = Number($(".time0").html());
		if (Math.abs(time0) <= 2) {}
		if (time0 < 0) time0 = 0 - time0;
		time0x();
		gntime = setTimeout(getnowtime, 1000)
	}
	if ($(".time1").html() != undefined) {
		time1 = Number($(".time1").html());
		if (Math.abs(time1) <= 2) {}
		if (time1 < 0) time1 = 0 - time1;
		time1x();
	}


	upl = setTimeout(updatel, 1000)



	$(".dropdowncentermenu").show();
	$(".dropdowncentermenu2").show();
	if ($(".abcd option").length == 1) $(".abcd").hide();
	else $(".abcd").show();

	onefunc();
	lib();


});

function onefunc() {
	$(document).keydown(function(event) {
		if (event.keyCode == 13) {
			if ($(".sendtb:visible").length == 1) {
				$(".sendtb .exe").click();
			}
		}
	});

	$(".game").change(function() {
		var gid = $(this).val();
        //alert(gid)
		window.location.href = "make.php?xtype=show&gids=" + gid;
		return false;
		$.ajax({
			type: 'POST',
			cache: false,
			url: 'makelib.php',
			data: 'xtype=setgame&gid=' + gid,
			success: function(m) {
				if (Number(m) == 1) {
					window.location.href = window.location.href;
				}
			}
		})
	});
	if (fudong == 1) {
		$(".fedu").show();
		$(".kedu").hide();
		$(".dedu").hide();
	} else {
		if (fast == 0) {
			$(".fedu").hide();
			$(".kedu").hide();
			$(".dedu").show();
		} else {
			$(".fedu").hide();
			$(".kedu").show();
			$(".dedu").hide();
		}
	}

	$(".menu").change(function() {
		pidduo = 999;
		lib()
	});
	$(".abcd").change(function() {
		lib()
	});
	$(".ab").change(function() {
		lib()
	});
	$(".shuaxin").click(function() {
		lib()
	});

	$(".sendtb .closebtn").click(function() {
		$(".overlay2").hide();
		$(".sendtb").hide();
	});

	$("div.cancel").click(function() {
		$(".betlistactive").removeClass("betlistactive");
		$(".betlistactive-radio").removeClass("betlistactive-radio");
		$(".betarrow-radio").hide();
		$(".betarrow").hide();
	});


	$(".sendtb input:checkbox").click(function() {
		if ($(this).prop("checked")) {
			$.cookie('yushe', 1);
		} else {
			$.cookie('yushe', 0);
		}
	});
	$(".sendtb input.zje").keyup(function() {
		$(this).val($(this).val().replace(/\D/g, ''));
		var val = $(this).val()
		$(".sendtb input.jes").val(val);
		sumje();
		$.cookie('yusheje',val);
	}).keypress(function() {
		$(this).val($(this).val().replace(/\D/g, ''));
		var val = $(this).val()
		$(".sendtb input.jes").val(val);
		sumje();
		$.cookie('yusheje',val);
	}).blur(function() {
		$(this).val($(this).val().replace(/\D/g, ''));
		var val = $(this).val()
		$(".sendtb input.jes").val(val);
		sumje();
		$.cookie('yusheje',val);
	});

	$("input.yjctrl").click(function(){
		 if($(this).prop("checked")){
		    $.cookie('yushe',1);
		 }else{
		    $.cookie('yushe',0);
		    $.cookie('yusheje','');
		 }
	});	 
    if($("input.yjctrl").prop("checked")){
    	//alert($.cookie('yusheje'));
		$(".sendtb input.zje").val($.cookie('yusheje'));
	}


	$(".logout").click(function() {
		window.location.href = "make.php?logout=yes";
	});
	$(".list-group a").click(function() {
		if ($(this).hasClass("zhuye")) {
			$(".sidebar").hide('fast');
			$(".app").css("margin-left", 0);
			$(".toptitle").hide();
			$(".app-body").css("margin-top", 136);
			$(".app-content .others").remove();
			$(".ng-scope.zhuye").show();
			$(".ng-scope.make").show();
			$(".user_info").show();
			$(".menus").show();
		} else {
			$(".sidebar").hide('fast');
			$(".app").css("margin-left", 0);
			$(".toptitle").show();
			$(".app-body").css("margin-top", 72);
			$(".app-content .ng-scope").hide();
			$(".app-content .others").remove();
			$(".user_info").hide();
			$(".menus").hide();
			if ($(this).hasClass("lib")) {
				$("#maintitle").html('未结明细');
				$(".menus").hide();
				page = 1;
				getlib();
			} else if ($(this).hasClass("longs")) {
				$("#maintitle").html('开奖结果');
				game = $(".game").val();
				getlongs();
			} else if ($(this).hasClass("changepass")) {
				$("#maintitle").html('密码变更');
				getchangepass();
			} else if ($(this).hasClass("userinfo")) {
				$("#maintitle").html('个人资讯');
				getuserinfo();
			} else if ($(this).hasClass("baoday")) {
				$("#maintitle").html('今天已结');
				date = 'day';
				page = 1;
				getbaoday();
			} else if ($(this).hasClass("myitem")) {
				$("#maintitle").html('我的团队');
				page=1;
				getmyitem();
			} else if ($(this).hasClass("itembao")) {
				$("#maintitle").html('团队报表');
				getitembao();
			} else if ($(this).hasClass("baoweek")) {
				$("#maintitle").html('两周报表');
				getbaoweek();
			} else if ($(this).hasClass("rule")) {
				$("#maintitle").html('游戏规则');
				game = $(".game").val();
				getrule();
			} else if ($(this).hasClass("ucenter")) {
				$("#maintitle").html('个人中心');
				game = $(".game").val();
				getucenter();
				page=1;
			} else if ($(this).hasClass("cunqu")) {
				$("#maintitle").html('资金管理-充值');
				game = $(".game").val();
				getzxcz();
				page=1;
			}
		}

	});

	$(".renav").click(function() {
		if ($(".sidebar:visible").length == 1) {
			$(".sidebar").hide();
			$(".app").animate({
				marginLeft: "0px"
			})
		} else {
			$(".sidebar").show();
			$(".app").animate({
				marginLeft: "300px"
			})
		}
	});

	$(".longs #dates").datepicker();
} /***********kj**********/
var date, game;

function getlongs() {
	date = $(".longs #dates").val();
	$(".app-content .others").remove();
	$.ajax({
		type: 'POST',
		url: 'longs.php',
		cache: false,
		data: 'xtype=getlong&gid=' + game + "&date=" + date,
		success: function(m) {
			$(".ng-scope.zhuye").before(m);
			$("div.longs #game").change(function() {
				game = $(this).val();
				getlongs();
			});
			$("div.longs #dates").css("pointer-events", 'auto');
			$("div.longs #dates").change(getlongs).datepicker();
			$("div.longs .resultitem").css("margin-left", 0);
		}
	})
} /***********kj**********/
/***********lib**********/
var page = 1;
var pcount = 1;

function getlib() {
	$(".app-content .others").remove();
	$.ajax({
		type: 'POST',
		url: 'lib.php',
		cache: false,
		data: 'xtype=show&tpage=' + page,
		success: function(m) {
			$(".ng-scope.zhuye").before(m);
			$("div.lib .sy").each(function() {
				if (Number($(this).html()) < 0) $(this).css('color', 'red');
			});
			page = Number($("div.lib .page_info").attr('tpage'));
			var rcount = Number($("div.lib .page_info").attr("rcount"));
			var psize = Number($("div.lib .page_info").attr("psize"));
			pcount = rcount % psize == 0 ? rcount / psize : ((rcount - rcount % psize) / psize) + 1;
			$("div.lib .pagestatus div").html("共 " + rcount + " 笔记录 共 " + pcount + " 页");
			if (page > 1) $("div.lib .previous-btn").css("color", '#000');
			if (page < pcount) $("div.lib .next-btn").css("color", '#000');
			$("div.lib .previous-btn").click(function() {
				page--;
				if (isNaN(page) | page < 1 | page % 1 != 0 | page > pcount) {
					return false
				}
				getlib()
			});
			$("div.lib .next-btn").click(function() {
				page++;
				if (isNaN(page) | page < 1 | page % 1 != 0 | page > pcount) {
					return false
				}
				getlib()
			});
			$("div.lib .pageNum").blur(function() {
				var pages = $(this).val();
				if (isNaN(pages) | pages < 1 | pages % 1 != 0 | pages > pcount) {
					return false;
				}
				page = pages;
				getlib()
			})
		}
	})
} /**********lib**********/
/***********changepass**********/

function getchangepass() {
	$(".app-content .others").remove();
	$.ajax({
		type: 'POST',
		url: 'changepass2.php',
		cache: false,
		data: 'xtype=show',
		success: function(m) {
			$(".ng-scope.zhuye").before(m);
			$("div.changepass .cpass").click(function() {
				var pass0 = $("#oldpassword").val();
				var pass1 = $("#password").val();
				var pass2 = $("#ckpassword").val();
				if (pass0 == '') {
					alert("原密码不能为空");
					return false
				}

				if (strlen(pass1) < 6 | strlen(pass1) > 15 | pass1 != pass2) {
					alert("新密码长度在6到15位,并且两次密码必需输入一样");
					return false
				}
				if (pass0 == pass1) {
					alert("新密码和旧密码不能一样!");
					return false
				}
				pass0 = men_md5_password(pass0);
				pass1 = men_md5_password(pass1);
				pass2 = men_md5_password(pass2);
				var str = "&pass0=" + pass0 + "&pass1=" + pass1 + "&pass2=" + pass2;
				$.ajax({
					type: 'POST',
					url: 'changepass2.php',
					data: 'xtype=changepass' + str,
					success: function(m) {
						m = Number(m);
						if (m == 1) {
							alert("原密码错误")
						} else if (m == 2) {
							alert("修改成功");
						}
					}
				})

			});
		}
	})
} /***********changepass**********/

/***************userinfo*************/

function getuserinfo() {
	$(".app-content .others").remove();
	$.ajax({
		type: 'POST',
		url: 'userinfo.php',
		cache: false,
		data: 'xtype=show',
		success: function(m) {
			$(".ng-scope.zhuye").before(m);
			$("div.userinfo #lotteryPersonal").change(function() {
				$(".userinfo .row.list").hide();
				$(".userinfo .g" + $(this).val()).show();
			});
			$("div.userinfo #lotteryPersonal").change();
			$("div.userinfo .qd").click(function(){

                    $.ajax({
                        type:'POST',
                        url:"userinfo.php",
                        data:"xtype=setdefaultpan&pan="+$("#abcd").val(),
                        success:function(m){
                            if(Number(m)==1){
                                alert('ok');
                            }
                        }
                    });

			});


		}
	})
} /***************userinfo*************/

/***************rule*************/

function getrule() {
	$(".app-content .others").remove();

	$.ajax({
		type: 'POST',
		url: 'rule.php',
		cache: false,
		data: 'xtype=show&gid=' + game,
		success: function(m) {
			$(".ng-scope.zhuye").before(m);
			$("div.rule select").change(function() {
				game = $(this).val();
				getrule();
			});
		}
	})
} /**************rule*************/


/***************ucenter*************/
function getnotices(){
	var str = "&tpage="+page;
	$.ajax({
		type: 'POST',
		url: 'member.php',
		cache: false,
		dataType:"json",
		data: 'xtype=notices'+str,
		success: function(m) {
			var ml = m['news'].length;
			str='';
			for(i=0;i<ml;i++){
			    str += "<tr id='"+m['news'][i]['id']+"' class='news du"+m['news'][i]['du']+"'><td width='10%'></td><td>"+m['news'][i]['title']+"<div class='notification-date-time'>"+m['news'][i]['time']+"</div></td><td style='display:none;'>"+m['news'][i]['content']+"</td><td style='display:none;'>"+m['news'][i]['title']+"</td></tr>";
			}
			$(".noticess tbody").html(str);
			str=null;
			$(".badge").html(m['weidu']);			
			page = Number(m['tpage']);
			var rcount = Number(m['rcount']);
			var pcount= Number(m['pcount']);
			$(".noticess .textcenter:eq(1)").html("共 " + rcount + " 笔记录 共 " + pcount + " 页");	
			$("div.noticess .pageNum").val(page);		
			if (page > 1) $(".noticess .previous-btn").css("color", '#000');
			if (page < pcount) $(".noticess .next-btn").css("color", '#000');
			m=null;
			$(".noticess tr.news").click(function(){
			    dialog._show($(this).find("td:eq(3)").html(), $(this).find("td:eq(2)").html(), {},$(window).width()-20, 10, 246);
				$("#dialog").parent().css("top",346);
				$("#dialog").parent().css("left",10);
				$("#dialog").parent().css("height",500)
			});
			$("div.noticess .previous-btn").click(function() {
				page--;
				if (isNaN(page) | page < 1 | page % 1 != 0 | page > pcount) {
					return false
				}
				getnotices();
			});
			$("div.noticess .next-btn").click(function() {
				page++;
				if (isNaN(page) | page < 1 | page % 1 != 0 | page > pcount) {
					return false
				}
				getnotices();
			});
			$("div.noticess .pageNum").blur(function() {
				var pages = $(this).val();
				if (isNaN(pages) | pages < 1 | pages % 1 != 0 | pages > pcount) {
					return false;
				}
				page = pages;
				getnotices();
			})
			
		}
	});
}
function getucenter() {
	$(".app-content .others").remove();
	$.ajax({
		type: 'POST',
		url: 'member.php',
		cache: false,
		data: 'xtype=ucenter',
		success: function(m) {
			$(".ng-scope.zhuye").before(m);
			$("a.colbtn").click(function() {
				$("a.colbtn .settingarrow").remove();
				$(this).append("<div class='settingarrow'></div>");
				$("div.con").hide();
				if ($(this).hasClass('safe')) {
					$(".safes").show();
				} else if ($(this).hasClass('uinfo')) {
					$(".uinfos").show();
				} else if ($(this).hasClass('notices')) {
					$(".noticess").show();
					page=1;
					getnotices();
				}
			});

			$("div.edits").click(function() {
				var tel = $("#tel").val();
				var qq = $("#qq").val();
				var sex = $("#sex").val();
				var birthday = $("#birthday").val();
				var shengshi = $("#shengshi").val();
				var street = $("#street").val();
				var shr = $("#shr").val();
				var str = "&qq=" + qq + "&tel=" + tel + "&sex=" + sex + "&birthday=" + birthday + "&shengshi=" + shengshi + "&street=" + street + "&shr=" + shr;
				$.ajax({
					type: 'POST',
					url: 'member.php',
					cache: false,
					async: false,
					data: 'xtype=setuinfo' + str,
					success: function(m) {
						if (Number(m) == 1) {
							alert("修改成功!");
						}
					}
				});
			});

			$("input.cpass").click(function() {
				var pass0 = $("#oldpassword").val();
				var pass1 = $("#password").val();
				var pass2 = $("#ckpassword").val();
				if (pass0 == '') {
					alert("原密码不能为空");
					return false
				}

				if (strlen(pass1) < 6 | strlen(pass1) > 15 | pass1 != pass2) {
					alert("新密码长度在6到15位,并且两次密码必需输入一样");
					return false
				}
				if (pass0 == pass1) {
					alert("新密码和旧密码不能一样!");
					return false
				}
				pass0 = men_md5_password(pass0);
				pass1 = men_md5_password(pass1);
				pass2 = men_md5_password(pass2);
				var str = "&pass0=" + pass0 + "&pass1=" + pass1 + "&pass2=" + pass2;
				$.ajax({
					type: 'POST',
					url: 'changepass2.php',
					data: 'xtype=changepass' + str,
					success: function(m) {
						m = Number(m);
						if (m == 1) {
							alert("原密码错误")
						} else if (m == 2) {
							alert("修改成功");
							window.location.href = "make.php?logout=yes";
						}
					}
				})

			});
		}
	})
} /**************ucenter*************/

/***************cunqu*************/

function getzxcz() {
	$(".app-content .others").remove();
	$.ajax({
		type: 'POST',
		url: 'member.php',
		cache: false,
		data: 'xtype=zxcz',
		success: function(m) {
			$(".ng-scope.zhuye").before(m);
			$("#maintitle").html('资金管理-充值');
			cunquclick();
			$(".settingtab").click(function(){
			     $(".settingtab").removeClass("active");
				 $(this).addClass("active");
				 $(".subcontent").hide();
				 $("#"+$(this).attr("data-id")).show();
			});
			$(".settingtab:eq(0)").click();
			$(".zxczbtn").click(function(){
			     getzxczatm();
			});
		}
	})
} 

function getzxtk() {
	$(".app-content .others").remove();
	$.ajax({
		type: 'POST',
		url: 'member.php',
		cache: false,
		data: 'xtype=zxtk',
		success: function(m) {
			$("#maintitle").html('资金管理-提款');
			$(".ng-scope.zhuye").before(m);
			cunquclick();
			$(".changecard").click(function(){
			    $(".addcard").show();
				$(".tikuan").hide();
			});
		
	$("#tkbtn").click(function(){
	    var money = $("#drawamount").val();
		var bankpass = $("#drawcode").val();
		var bank  = $("input[name='bankid']").val();
		if(money=='' | money==0){
		    alert("请输入正确金额!");
			return false;
		}
		if(bankpass==''){
			alert("请输入提款密码!");
		    return false;
		}
		var str = "&money="+money+"&bankpass="+bankpass+"&bank="+bank;
		$.ajax({
			type: 'POST',
			url: 'member.php',
			cache: false,
			async: false,
			data: 'xtype=tk'+str,
			success: function(m) {
			
				if(Number(m)==1){
				    alert("提交成功,请在交易记录查询进度!");
					getusermoney();
				}else if(Number(m)==2){
					alert("余额不足");
			    }else if(Number(m)==3){
					alert("提款金额须至少100元!");
			    }else if(Number(m)==4){
					alert("请输入整数!");
			    }else if(Number(m)==5){
					alert("提款密码错误!");
			    }else if(Number(m)==6){
					alert("您还有未结算注单，请等待结算后提款!");
			    }
			}
		});
	});	
	
			
	$("#addcardbtn").click(function(){
	    var bank = $("#bank").val();
		var num = $("#cardId").val();
		var kaihuhang = $("#bankaddress").val();
		var bankpass = $("#bankpass").val();
		var names = $("#names").val();
		if(num==''){
		    alert("请输入卡号!");
			return false;
		}
		if(kaihuhang==''){
		    alert("请输入开户网点!");
			return false;
		}
		if(bankpass==''){
		    alert("请输入提款密码!");
			return false;
		}
		var str = "&bank="+bank+"&num="+num+"&kaihuhang="+kaihuhang+"&bankpass="+bankpass+"&names="+names;
		//alert(str);
		$.ajax({
			type: 'POST',
			url: 'member.php',
			cache: false,
			async: false,
			data: 'xtype=addcard'+str,
			success: function(m) {
				if(Number(m)==1){
				    alert("添加银行卡成功!");
					getzxtk();
				}
			}
		});
	});
	
		}
	})
} 

function getjyjl() {
   var sdate  = $(".jyjls #sdate").val();
   var edate  = $(".jyjls #edate").val();
   var status = $(".jyjls #status").val();
   var mtype= $(".jyjls #mtype").val();
   var str = "&sdate="+sdate+"&edate="+edate+"&status="+status+"&mtype="+mtype+"&upage="+page;
	$(".app-content .others").remove();
	$.ajax({
		type: 'POST',
		url: 'member.php',
		cache: false,
		data: 'xtype=jyjl'+str,
		success: function(m) {
			$("#maintitle").html('资金管理-交易记录');
			$(".ng-scope.zhuye").before(m);
			cunquclick();
			
			page = Number($("div.jyjls .pageNum").attr('upage'));
			var rcount = Number($("div.jyjls .pageNum").attr('rcount'));
			var pcount= Number($("div.jyjls .pageNum").attr('pcount'));
			$(".jyjls .textcenter:eq(1)").html("共 " + rcount + " 笔记录 共 " + pcount + " 页");	
			$("div.jyjls .pageNum").val(page);		
			if (page > 1) $(".jyjls .previous-btn").css("color", '#000');
			if (page < pcount) $(".jyjls .next-btn").css("color", '#000');
			m=null;

			$("div.jyjls .previous-btn").click(function() {
				page--;
				if (isNaN(page) | page < 1 | page % 1 != 0 | page > pcount) {
					return false
				}
				getjyjl();
			});
			$("div.jyjls .next-btn").click(function() {
				page++;
				if (isNaN(page) | page < 1 | page % 1 != 0 | page > pcount) {
					return false
				}
				getjyjl();
			});
			$("div.jyjls .pageNum").blur(function() {
				var pages = $(this).val();
				if (isNaN(pages) | pages < 1 | pages % 1 != 0 | pages > pcount) {
					return false;
				}
				page = pages;
				getjyjl();
			})
			$("#btnRecharge3").click(function(){
			   getjyjl();
			});
			$("a.xiangqing").click(function(){
		var obj =$(this).parent().parent();
		var str ='';
		var mtype = obj.find(".mtype").html();
		str += "<p>发起时间:"+obj.find(".tjtime").html()+"</p>";
		str += "<p>交易类型:"+mtype+"</p>";
		str += "<p>交易金额:"+obj.find(".money").html()+"</p>";
		str += "<p>手续费:"+obj.find(".sxfei").html()+"</p>";
		if(mtype=="充值"){
			str += "<p>入帐方式:"+obj.find(".fs").html()+"</p>";
		    str += "<p>入帐银行:"+obj.find(".bank").html()+"</p>";
			str += "<p>户名:"+obj.find(".sname").html()+"</p>";
			str += "<p>账号:"+obj.find(".snum").html()+"</p>";
			str += "<p>入帐时间:"+obj.find(".cuntime").html()+"</p>";
			str += "<p>汇款留言:"+obj.find(".pass").html()+"</p>";
		}else{
		    str += "<p>收款银行:"+obj.find(".bank").html()+"</p>";
			str += "<p>户名:"+obj.find(".uname").html()+"</p>";
			str += "<p>账号:"+obj.find(".unum").html()+"</p>";
			str += "<p>汇款时间:"+obj.find(".cuntime").html()+"</p>";
		}
        str += "<p>交易状态:"+obj.find(".status").html()+"</p>";
		str += "<p>交易描述:"+obj.find(".ms").html()+"</p>";
		str += "<p>备注:"+obj.find(".bz").html()+"</p>";
	
		dialog._show("交易详情", str, {},$(window).width()-20, 10, 246);
			$("#dialog").parent().css("top",346);
				$("#dialog").parent().css("left",10);
			str=null;
			});
		}
	})
} 

function getzxczatm() {
	var cardid = $("#cardlistatm").val();
	$(".app-content .others").remove();	
	$.ajax({
		type: 'POST',
		url: 'member.php',
		cache: false,
		data: 'xtype=zxczatm&cardid='+cardid,
		success: function(m) {
			$(".ng-scope.zhuye").before(m);
    $(".orderatm").click(function(){
		var amount = $("#amount").val();
		var userName = $("#userName").val();
		var cardId = $("#cardId").val();
		var depostitTime = $("#depostitTime").val();
		var str = "&amount="+amount+"&userName="+userName+"&cardId="+cardId+"&depostitTime="+depostitTime;
		$.ajax({
			type: 'POST',
			url: 'member.php',
			cache: false,
			async: false,
			data: 'xtype=orderatm'+str,
			success: function(m) {
			
				if(Number(m)==1){
					$("input.order").hide();
				    alert("提交成功,稍后系统处理后入帐!");
				}
			}
		});
	});			}
	})
} 

function cunquclick(){
			$("a.colbtn").click(function() {
				var v = $(this).attr('v');
				if(v=='zxcz'){
				   getzxcz();
				}else if(v=='zxtk'){
				   getzxtk();
				}else if(v=='jyjl'){
				   getjyjl();
				}
			});
}

/**************cunqu*************/

/***************baoweek*************/

function getbaoweek() {
	$(".app-content .others").remove();
	$.ajax({
		type: 'POST',
		url: 'bao.php',
		cache: false,
		data: 'xtype=show',
		success: function(m) {
			$(".ng-scope.zhuye").before(m);
			$("div.baoweek .sy").each(function() {
				if (Number($(this).html()) < 0) $(this).css('color', 'red');
			});
			$("div.baoweek .thisweek").click(function() {
				$("#history_thisweek").show();
				$("#history_lastweek").hide();
			});
			$("div.baoweek .lastweek").click(function() {
				$("#history_lastweek").show();
				$("#history_thisweek").hide();
			});
			$("div.baoweek a").click(function() {
				date = $(this).parent().parent().attr('date');
				page = 1;
				getbaoday();
			});
		}
	})
} 
/***************baoweek*************/

/***************myitem*************/

function getmyitem() {
	$(".app-content .others").remove();
	$.ajax({
		type: 'POST',
		url: 'member.php',
		cache: false,
		data: 'xtype=myitem&tpage=' + page,
		success: function(m) {
			$(".ng-scope.zhuye").before(m);

			page = Number($(".myitem .page_info").attr('tpage'));
			var rcount = Number($("div.myitem .page_info").attr("rcount"));
			var psize = Number($("div.myitem .page_info").attr("psize"));
			var pcount = rcount % psize == 0 ? rcount / psize : ((rcount - rcount % psize) / psize) + 1;
			$("div.myitem .pagestatus div").html("共 " + rcount + " 笔记录 共 " + pcount + " 页");
			if (page > 1) $("div.myitem .previous-btn").css("color", '#000');
			if (page < pcount) $("div.myitem .next-btn").css("color", '#000');
			$("div.myitem .previous-btn").click(function() {
				page--;
				if (isNaN(page) | page < 1 | page % 1 != 0 | page > pcount) {
					return false
				}
				getmyitem()
			});
			$("div.myitem .next-btn").click(function() {
				page++;
				if (isNaN(page) | page < 1 | page % 1 != 0 | page > pcount) {
					return false
				}
				getmyitem()
			});
			$("div.myitem .pageNum").blur(function() {
				var pages = $(this).val();
				if (isNaN(pages) | pages < 1 | pages % 1 != 0 | pages > pcount) {
					return false;
				}
				page = pages;
				getmyitem()
			});
			$("div.myitem a.eshuiqx").hide();
			$("div.myitem a.eshuitj").hide();
			$("div.myitem input:text").hide();
			$("div.myitem a.eshui").click(function(){
                 $(this).hide();
				 $(this).parent().find("label").hide();
				 $(this).parent().find("input:text").show();
				 $(this).parent().find("a.eshuitj").show();
				 $(this).parent().find("a.eshuiqx").show();
			});
			$("div.myitem a.eshuiqx").click(function(){
				 $(this).parent().find("label").show();
                 $(this).parent().find("a.eshui").show();
				 $(this).parent().find("input:text").hide();
				 $(this).parent().find("a.eshuitj").hide();
				 $(this).parent().find("a.eshuiqx").hide();
			});
			$("div.myitem a.eshuitj").click(function(){
				 var uid = $(this).parent().parent().attr("uid");
		var shui = Number($(this).parent().find("input:text").val());
		if(shui*1000%1!=0 | shui<0 | isNaN(shui)){
		    alert("请输入正确的数字!");
			return false;
		}
var obj = $(this);
		$.ajax({
			type: 'POST',
			url: 'member.php',
			async: false,
			cache: false,
			data: 'xtype=eshui&uid=' + uid+'&shui='+shui ,
			success: function(m) {
				 obj.parent().find("a.eshuiqx").click();
				 obj.parent().find("label").html(m);
			}

		});	
				 
			});
		}
	})
} 
/***************myitem*************/
/***************itembao*************/

function getitembao() {
	$(".app-content .others").remove();
	$.ajax({
		type: 'POST',
		url: 'member.php',
		cache: false,
		data: 'xtype=itembao',
		success: function(m) {
			$(".ng-scope.zhuye").before(m);
			$("div.baoweekitem .sy").each(function() {
				if (Number($(this).html()) < 0) $(this).css('color', 'red');
			});
			$("div.baoweekitem .thisweek").click(function() {
				$("#history_thisweek").show();
				$("#history_lastweek").hide();
			});
			$("div.baoweekitem .lastweek").click(function() {
				$("#history_lastweek").show();
				$("#history_thisweek").hide();
			});
			$("div.baoweekitem a").click(function() {
				date = $(this).parent().parent().attr('date');
				page = 1;
				getbaodayitem();
			});
		}
	})
} /***************itembao************/

/***************baodayitem*************/

function getbaoday() {
	$(".app-content .others").remove();
	$.ajax({
		type: 'POST',
		url: 'member.php',
		cache: false,
		data: 'xtype=baodayitem&date=' + date + "&tpage=" + page,
		success: function(m) {
			$(".ng-scope.zhuye").before(m);
			$("div.baodayitem .sy").each(function() {
				if (Number($(this).html()) < 0) $(this).css('color', 'red');
			});
			$("#maintitle").html($("div.baodayitem").attr("date"));
			page = Number($(".baodayitem .page_info").attr('tpage'));
			var rcount = Number($("div.baodayitem .page_info").attr("rcount"));
			var psize = Number($("div.baodayitem .page_info").attr("psize"));
			pcount = rcount % psize == 0 ? rcount / psize : ((rcount - rcount % psize) / psize) + 1;
			$("div.baodayitem .pagestatus div").html("共 " + rcount + " 笔记录 共 " + pcount + " 页");
			if (page > 1) $("div.baodayitem .previous-btn").css("color", '#000');
			if (page < pcount) $("div.baodayitem .next-btn").css("color", '#000');
			$("div.baodayitem .previous-btn").click(function() {
				page--;
				if (isNaN(page) | page < 1 | page % 1 != 0 | page > pcount) {
					return false
				}
				getbaoday()
			});
			$("div.baodayitem .next-btn").click(function() {
				page++;
				if (isNaN(page) | page < 1 | page % 1 != 0 | page > pcount) {
					return false
				}
				getbaoday()
			});
			$("div.baodayitem .pageNum").blur(function() {
				var pages = $(this).val();
				if (isNaN(pages) | pages < 1 | pages % 1 != 0 | pages > pcount) {
					return false;
				}
				page = pages;
				getbaoday()
			})
		}
	})
} 
/***************baodayitem*************/

/***************baoday*************/

function getbaoday() {
	$(".app-content .others").remove();
	$.ajax({
		type: 'POST',
		url: 'baoday.php',
		cache: false,
		data: 'xtype=show&date=' + date + "&tpage=" + page,
		success: function(m) {
			$(".ng-scope.zhuye").before(m);
			$("div.baoday .sy").each(function() {
				if (Number($(this).html()) < 0) $(this).css('color', 'red');
			});
			$("#maintitle").html($("div.baoday").attr("date"));
			page = Number($(".baoday .page_info").attr('tpage'));
			var rcount = Number($("div.baoday .page_info").attr("rcount"));
			var psize = Number($("div.baoday .page_info").attr("psize"));
			pcount = rcount % psize == 0 ? rcount / psize : ((rcount - rcount % psize) / psize) + 1;
			$("div.baoday .pagestatus div").html("共 " + rcount + " 笔记录 共 " + pcount + " 页");
			if (page > 1) $("div.baoday .previous-btn").css("color", '#000');
			if (page < pcount) $("div.baoday .next-btn").css("color", '#000');
			$("div.baoday .previous-btn").click(function() {
				page--;
				if (isNaN(page) | page < 1 | page % 1 != 0 | page > pcount) {
					return false
				}
				getbaoday()
			});
			$("div.baoday .next-btn").click(function() {
				page++;
				if (isNaN(page) | page < 1 | page % 1 != 0 | page > pcount) {
					return false
				}
				getbaoday()
			});
			$("div.baoday .pageNum").blur(function() {
				var pages = $(this).val();
				if (isNaN(pages) | pages < 1 | pages % 1 != 0 | pages > pcount) {
					return false;
				}
				page = pages;
				getbaoday()
			})
		}
	})
} 
/***************baoday*************/

function getm(val) {
	return sma[val]
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
}

function getusermoney() {

	$.ajax({
		type: 'POST',
		url: 'userinfo.php',
		dataType: "json",
		cache: false,
		data: 'xtype=getusermoney',
		success: function(m) {
			var obj = $("#account");
			obj.find(".maxmoney").html(m[0]);
			obj.find(".money").html(m[1]);
			obj.find(".moneyuse").html(m[2]);
			obj.find(".kmaxmoney").html(m[3]);
			obj.find(".kmoney").html(m[4]);
			obj.find(".kmoneyuse").html(m[5]);
			obj.find(".fmaxmoney").html(m[3]);
			obj.find(".fmoney").html(m[4]);
			obj.find(".fmoneyuse").html(m[5]);
			$(".thisqishu").html(m[6]);
			$(".synow").html(m[7])
		}
	})
}



function getatt() {
	var abcd = $("select.abcd").val();
	var ab = $("select.ab").val();
	clearTimeout(gatt);
	$.ajax({
		type: 'POST',
		url: 'makelib.php',
		data: 'xtype=getatt&abcd=' + abcd + "&ab=" + ab + "&gid=" + ngid,
		dataType: 'json',
		cache: false,
		success: function(m) {
			var ml = m.length;
			if (ml >= 1) {
				bofang("dd");
			}
			var i = 0;
			for (; i < ml; i++) {
				$(".p" + m[i]['pid']).find(".peilv1").html(m[i]['peilv1']);
				$(".p" + m[i]['pid']).find(".peilv1").addClass('bg');
			}
			if (i != 0) {
				setTimeout(function() {
					$('li.peilv1.bg').removeClass('gb')
				}, 10000)
			}

			gatt = setTimeout(getatt, 3000)
		}
	})
}


function addfunc() {
	$(".make .betlist").click(function() {
		if ($(this).hasClass('duo')) {
			if ($(".betlistactive-radio").length != 1 | $(".betlistactive-radio").parent().attr('ifok') != 1) return false;
			$(this).toggleClass('betlistactive');
			$(this).find(".betarrow").toggle();
		} else {
			if ($(".duo").length != 0) {
				$(".make .betlist").removeClass('betlistactive-radio');
				$(".make .betlist").find(".borderpink").hide();
				$(this).addClass('betlistactive-radio');
				$(this).find(".betarrow-radio").toggle();
				pidduo = $(this).parent().attr("pid");
				lib();
			} else {
				if (isNaN($(this).find(".peilv1").html())) return false;
				$(this).toggleClass('betlistactive');
				$(this).find(".betarrow").toggle();
			}
		}
	});
	$(".make .gradientpink").click(function() {
		if ($(this).find("i").hasClass('fa-minus-square')) {
			$(this).find("i").removeClass("fa-minus-square");
			$(this).find("i").addClass("fa-plus-square");
			$(this).parent().parent().parent().parent().find(".bet_content").hide();
		} else {
			$(this).find("i").removeClass("fa-plus-square");
			$(this).find("i").addClass("fa-minus-square");
			$(this).parent().parent().parent().parent().find(".bet_content").show();
		}
	});


	if ($(".betlist.betlistactive-radio").parent().attr("znum1") == 10) {
		$(".betlist.duo").addClass("betlistactive");
		$(".betlist.duo").find(".borderpink").show();
	}
	$("div.xd").unbind("click");
	$("div.xd").click(function() {
		if ($(".betlist.betlistactive").length < 1) {
			alert("您没有选择任何项目!");
			return false;
		}
		var bname = $(".menu option:selected").html();
		if ($(".duo").length != 0) {
			var pname = $(".betlist.betlistactive-radio").parent().attr("mname");
		} else {
			var pname = $(".betlist.betlistactive").parent().attr("mname");
		}
		if (fenlei == 100) {
			if ($("select.duo").length == 1) {
				var znum = 0;
				if (pname == '三中二') {
					znum = 3;
				} else {
					znum = Number($(".betlist.betlistactive-radio").parent().attr("znum1"));
				}
				if ($(".bet-model li.on").length < znum) {
					alert("您选的号码不足，最少选择" + znum + "个");
					return false;
				}
			}
		}
		if (fenlei != 100 & (bname == '2字组合' | bname == '2字定位' | bname == '3字组合' | bname == '3字定位' | bname == '组选3' | bname == '组选6' | bname == '连码')) {
			var dnum = 0;
			if (bname == '2字组合' | bname == '2字定位' | pname == '选前二直选' | pname == '选二连直') {

				dnum = $(".d1.betlistactive").length;

				if (dnum < 1) {
					alert("第1个投注号码没有选择!");
					return false;
				}
				dnum = $(".d2.betlistactive").length;

				if (dnum < 1) {
					alert("第2个投注号码没有选择!");
					return false;
				}
			} else if (bname == '3字组合' | bname == '3字定位' | pname == '选前三直选' | pname == '选三前组') {

				dnum = $(".d1.betlistactive").length;
				if (dnum < 1) {
					alert("第1个投注号码没有选择!");
					return false;
				}

				dnum = $(".d2.betlistactive").length;
				if (dnum < 1) {
					alert("第2个投注号码没有选择!");
					return false;
				}
				dnum = $(".d3.betlistactive").length;
				if (dnum < 1) {
					alert("第3个投注号码没有选择!");
					return false;
				}
			} else {
				var znum = Number($(".betlist.betlistactive-radio").parent().attr("znum1"));
				if ($(".d1.betlistactive").length < znum) {
					alert("您选的号码不足，最少选择" + znum + "个");
					return false;
				}
			}

		}
		$(".overlay2").show();
		$(".sendtb").show();
		$(".sendtb").css("top", 72);
		$(".sendtb").css("left", 0);
		if($.cookie("yusheje")!=''  && $("input.yjctrl").prop("checked")){
			$(".sendtb input.zje").val($.cookie("yusheje"));
		}else{
		    $(".sendtb input.zje").val('');
		}
		$(".sendtb .nr").css("height", $(document).height() - 287);
		exe();
	});


}

function C(arr, num) {
	var r = [];
	(function f(t, a, n) {
		if (n == 0) return r.push(t);
		for (var i = 0, l = a.length; i <= l - n; i++) {
			f(t.concat(a[i]), a.slice(i + 1), n - 1)
		}
	})([], arr, num);
	return r
}

function peilvmin(a1, a2, a3) {
	var al = a1.length;
	var tmp = 9999;
	var pp;
	for (i = 0; i < al; i++) {
		if (a2[a1[i]] < tmp) {
			tmp = a2[a1[i]];
			pp = a1[i]
		}
	}
	if (a3 == undefined) {
		return tmp
	} else {
		return a3[pp]
	}
}

function Ctwo(a, b, bname, pname) {
	var al = a.length;
	var bl = b.length;
	var r = [];
	var h = 0;
	var ins = '';
	var tmps = '';
	for (i = 0; i < al; i++) {
		for (j = 0; j < bl; j++) {
			if (bname == '2字组合' | pname == '选前二直选' | pname == '选二连直') {
				tmps = [a[i]['n'], b[j]['n']];
				if (ins.indexOf(tmps.sort().join('-')) != -1) {
					continue;
				}
				ins += ',' + tmps.sort().join('-');
			}
			r[h] = [];
			if (a[i]['n'] == b[j]['n'] | bname == '2字定位' | pname == '选前二直选' | pname == '选二连直') {
				r[h]['p'] = Math.min(a[i]['p'][0], b[j]['p'][0]);
			} else {
				r[h]['p'] = Math.min(a[i]['p'][1], b[j]['p'][1]);
			}
			r[h]['n'] = [a[i]['n'], b[j]['n']];
			h++;

		}
	}
	return r;
}

function Cshree(a, b, c, bname, pname) {
	var al = a.length;
	var bl = b.length;
	var cl = c.length;
	var r = [];
	var h = 0;
	var ins = '';
	var tmps = '';
	for (i = 0; i < al; i++) {
		for (j = 0; j < bl; j++) {
			for (k = 0; k < cl; k++) {
				if (bname == '3字组合' | pname == '选前三直选' | pname == '选三前直') {
					tmps = [a[i]['n'], b[j]['n'], c[k]['n']];
					if (ins.indexOf(tmps.sort().join('-')) != -1) {
						continue;
					}
					ins += ',' + tmps.sort().join('-');
				}
				r[h] = [];
				if ((a[i]['n'] == b[j]['n'] & a[i]['n'] == c[k]['n']) | bname == '3字定位' | pname == '选前三直选' | pname == '选三前直') {
					r[h]['p'] = Math.min(a[i]['p'][0], b[j]['p'][0], c[k]['p'][0]);
				} else if (a[i]['n'] == b[j]['n'] | a[i]['n'] == c[k]['n'] | b[j]['n'] == c[k]['n']) {
					r[h]['p'] = Math.min(a[i]['p'][1], b[j]['p'][1], c[k]['p'][1]);
				} else {
					r[h]['p'] = Math.min(a[i]['p'][2], b[j]['p'][2], c[k]['p'][2]);
				}
				r[h]['n'] = [a[i]['n'], b[j]['n'], c[k]['n']];
				h++;
			}
		}
	}
	return r;
}

function getnowtime() {
	clearTimeout(gntime);
	$.ajax({
		type: 'POST',
		url: 'time.php',
		data: 'xtype=getopen',
		cache: false,
		success: function(m) {
			m = m.split('|');
			if (Number(m[6]) == 0 | m[6] == undefined) {
				top.window.location.href = top.window.location.href;
				return false;
			}
			if (fenlei == 100) {
				if (Number(m[2]) != Number($(".thisqishu").html()) | Number(m[3]) != Number($(".panstatus").attr('s')) | Number(m[4]) != Number($(".otherstatus").attr('s'))) {
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
					$(".thisqishu").html(m[2]);
					if (Number(m[5]) < 2100 | Number(m[5]) > 2128) {
						lib();
					}
					getusermoney();
				}
				clearTimeout(settime1);
				time1 = Number(m[1]);
				time1x()
			} else {
				//alert(m[2]+","+$(".status").attr('qs')+','+m[3]+$(".panstatus").attr('s'))
				if (Number(m[2]) != Number($(".thisqishu").html()) | Number(m[3]) != Number($(".panstatus").attr('s'))) {
					$(".panstatus").attr('s', m[3]);

					if (Number(m[3]) == 0) {
						$(".panstatus").html($(".panstatus").html().replace("关", "开"))
					} else {
						$(".panstatus").html($(".panstatus").html().replace("开", "关"))
					}
					$(".thisqishu").html(m[2]);
					lib();
					getusermoney();
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
		return true;
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
	if (time1 > 0) {
		$(".time1").html(str)
	} else {
		$(".time1").html("<label>0</label>秒")
	}
	if (time1 <= 0) {
		getnowtime();
		return true;
	}
	settime1 = setTimeout(time1x, 1000)
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

function C(arr, num) {
	var r = [];
	(function f(t, a, n) {
		if (n == 0) return r.push(t);
		for (var i = 0, l = a.length; i <= l - n; i++) {
			f(t.concat(a[i]), a.slice(i + 1), n - 1)
		}
	})([], arr, num);
	return r
}

function xreload() {

	$("#check").attr("src", 'check.php?' + Math.random());


	setTimeout(xreload, 55000)
}