var thislayer = 9;
var melayer = Number($("#topid").attr('layer'));
var layer = Number($("#topid").attr('layer'));
var topid = Number($("#topid").val());
var rtime = Number($("#reloadtime").val());

function myready() {
	$("label").addClass('red');
	$("input:button").addClass('btnf');
	$("input:text").click(function() {
		WdatePicker()
	});
	$(".cmd input.s").click(function() {
		setdate(Number($(this).attr('d')))
	});
	$(".gamelabel").click(function() {
		$(this).toggleClass('chk');
		getclass()
	});
	$("input[name='game']").click(function() {
		var val = $(this).val();
		$(".game").attr("checked", false);
		if (val == 'all') {
			$(".gamelabel").removeClass('chk');
			$(".gamelabel").addClass('chk');
		} else if (val == '0') {
			$(".gamelabel").removeClass('chk');
			$(".gamelabel").each(function() {
				if ($(this).attr('fast') == '0') $(this).addClass('chk')
			})
		} else if (val == '1') {
			$(".gamelabel").removeClass('chk');
			$(".gamelabel").each(function() {
				if ($(this).attr('fast') == '1') $(this).addClass('chk')
			})
		} else {
			$(".gamelabel").removeClass('chk');
			$(".gamelabel").each(function() {
				if ($(this).attr('fenlei') == val) $(this).addClass('chk')
			})
		}
		getclass()
	});
	$(".game").click(function() {
		getclass()
	});
	$(".bid").change(function() {
		if ($(this).val() == '') {
			$(".sid").empty();
			$(".cid").empty();
	return
		}
		gets()
	});
	$(".sid").change(function() {
		if ($(this).val() == '') {
			$(".cid").empty();
			return
		}
		getc()
	});
	$(".upuser").click(function() {
		$(".nowuser").html($(".upuser").html());
		$(".nowuser").attr("uid", $(".upuser").attr('uid'));
		$(".nowuser").attr("layer", $(".upuser").attr('layer'));

			if($(".onlyzb").prop("checked")==true){
			   baoagent();
			}else{
			 agent();
			}
		  if(Number($(".upuser").attr('layer'))<=layer){
		  $(".upuser").attr('uid','');
			$(".upuser").attr('layer','');	
			$(".upuser").html('');
		  return;
		 
	  }
		$.ajax({
			type: 'POST',
			url: mulu + 'now.php',
			data: 'xtype=getfid&uid=' + $(".upuser").attr('uid'),
			dataType: 'json',
			cache: false,
			success: function(m) {
				if (Number(m['err']) == 1) {
					$(".upuser").html('');
					$(".upuser").attr('uid', '');
					$(".upuser").attr('layer', '');
					return
				}
				if (Number(m['uid']) == 99999999) {
					$(".upuser").html('集团')
				} else {
					$(".upuser").html(m['name'])
				}
				$(".upuser").attr('uid', m['uid']);
				$(".upuser").attr('layer', m['layer'])
			}
		})
	});
  $(".query").click(function(){
							 $(".nowuser").attr('uid',$("#topid").val());
							 $(".nowuser").attr('layer',$("#topid").attr('layer'));
							 $(".nowuser").html($("#topid").attr('username'));
							 $(".upuser").html('');
		$(".qujian").html($("    "+"#start").val()+" ~ " + $("#end").val());
		var caizhong='';
		$(".game").each(function(){
	          if($(this).prop("checked")==true){
				  if (caizhong!=''){ caizhong += "、";}
			     caizhong += $(this).attr('gname');
			  }
		});
		var bid = $(".bid").find("option:selected").html();
		var sid = $(".sid").find("option:selected").html();
		var cid = $(".cid").find("option:selected").html();
		if(bid!='全部' & bid!=undefined & bid!=''){
		    caizhong += "&nbsp;&nbsp;&nbsp;<span class='hei'>分类：</span>" +  bid;
		}
		if(sid!='全部' & sid!=undefined & sid!=''){
		    caizhong += "-" +  sid;
		}
		if(cid!='全部' & cid!=undefined & cid!=''){
		    caizhong += "-" + cid;
		}

		$(".caizhong").html(caizhong);
		$(".jsstatus").html($("input[name='jsstatus']:checked").attr('v'));
			if($(".onlyzb").prop("checked")==true){
			   baoagent();
			}else{
			 agent();
			}
			
  }); 
  	$(".requery").click(function() {
		$(".baotb").hide();
		$(".cmd").show();
		$(".scmd").hide()
	});
	getclass();
}
function getclass() {
	if ($("label.chk").length == 1) {
		getb($("label.chk").attr('gid'))
	} else {
		$(".bid").empty();
		$(".sid").empty();
		$(".cid").empty()
	}
}
function getb(gid) {
	$.ajax({
		type: 'POST',
		url: mulu + 'now.php',
		dataType: 'json',
		data: 'xtype=getb&gid=' + gid,
		cache: false,
		success: function(m) {
			var ml = m.length;
			$(".bid").empty();
			$(".sid").empty();
			$(".cid").empty();
			str = "<option value=''>全部</option>";
			$(".bid").append(str);
			for (i = 0; i < ml; i++) {
				str = "<option value='" + m[i]['bid'] + "'>" + m[i]['name'] + "</option>";
				$(".bid").append(str)
			}
			str = null;
			m = null
		}
	})
}
function gets() {
	var gid = $("input[name='games']:checked").val();
	var bid = $(".bid").val();
	$.ajax({
		type: 'POST',
		url: mulu + 'now.php',
		dataType: 'json',
		data: 'xtype=gets&bid=' + bid+"&gid="+gid,
		cache: false,
		success: function(m) {
			var ml = m.length;
			$(".sid").empty();
			$(".cid").empty();
			str = "<option value=''>全部</option>";
			$(".sid").append(str);
			for (i = 0; i < ml; i++) {
				str = "<option value='" + m[i]['sid'] + "'>" + m[i]['name'] + "</option>";
				$(".sid").append(str)
			}
			str = null;
			m = null
		}
	})
}
function getc() {
	var gid = $("input[name='games']:checked").val();
	var bid = $(".bid").val();
	var sid = $(".sid").val();
	$.ajax({
		type: 'POST',
		url: mulu + 'now.php',
		dataType: 'json',
		data: 'xtype=getc&bid=' + bid + "&sid=" + sid+"&gid="+gid,
		cache: false,
		success: function(m) {
			var ml = m.length;
			$(".cid").empty();
			str = "<option value=''>全部</option>";
			$(".cid").append(str);
			for (i = 0; i < ml; i++) {
				str = "<option value='" + m[i]['cid'] + "'>" + m[i]['name'] + "</option>";
				$(".cid").append(str)
			}
			str = null;
			m = null
		}
	})
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
var psize = 100;

function agent() {

	var start = $("#start").val();
	var end = $("#end").val();
	var bid = $(".bid").val();
	var cid = $(".cid").val();
	var sid = $(".sid").val();
	var uid = $(".nowuser").attr('uid');
	var nowlayer = Number($(".nowuser").attr('layer'));
	var game = '';
	$("label.chk").each(function() {
		game += $(this).attr('gid') + '|'
	});
	if (Number(start.replace('-', '')) > Number(end.replace('-', ''))) {
		alert('开始日期不能大于结束日期！');
		return false
	}
	if (strlen(game) < 4) {
		alert('请至少选择一个彩种！');
		return false
	}
	$(".baotb").show();
	$(".cmd").hide();
	$(".scmd").show();
	$(".baotb").empty();
	
	var str = '&start=' + start + "&end=" + end + "&bid=" + bid + "&cid=" + cid + "&sid=" + sid + "&uid=" + uid + "&game=" + game;
	var jsstatus=$("input[name='jsstatus']:checked").val();
	str += "&jsstatus="+jsstatus;
	$.ajax({
		type: 'POST',
		url: mulu + 'baox.php',
		data: 'xtype=agent' + str,
		dataType: 'json',
		cache: false,
		success: function(mm) {
			var ml = mm.length;
			var str = '';
			var zzs = 0;
			var zupje = 0;
			var zzje = 0;
			var zzhong = 0;
			var zshui = 0;
			var zxj = 0;
			var zmezc = 0;
			var zmeshui = 0;
			var zmezhong = 0;
			var zmeyk = 0;
			var zsendje = 0;
			var zsendshui = 0;
			var zsendzhong = 0;
			var zsendyk = 0;
			var zyk = 0;
			var zzyk = 0;
			m = [];
			var zbl = mm['zbao'].length;
			m = mm['zbao'];
			var plc = Number(mm['plc']);
	
			var str = '';
			var strs = "<tr>";
			if (plc == 1) {
				if (nowlayer == 1) {
					strs += "<td colspan=9 class=b0>" + layername[nowlayer] + "</td><td colspan=6 class=b2>" + layername[nowlayer - 1] + "</td><td colspan=4 class=b3>上级</th>"
				} else {
					strs += "<td colspan=9 >" + layername[nowlayer] + "</td><td colspan=6 class=b2>" + layername[nowlayer - 1] + "</td><td colspan=4 class=b3>" + layername[nowlayer - 2] + "</th>"
				}
				strs += "<th rowspan=2>总盈亏</th></tr>";
				strs += "<tr><th>" + layername[nowlayer] + "</th>";
				if (nowlayer == 1) {
					strs += "<th>笔数</th><TH>总注额</TH><TH>贡献率</TH><TH>占比</TH><th>上报</th><th>奖金</th><th>退水</th><th>对" + layername[nowlayer] + "收付</th><th>" + layername[nowlayer - 1] + "占成</th><th>奖金</th><th>退水</th><th>" + layername[nowlayer - 1] + "占成盈亏</th><th class='plc'>赚赔率差</th><th>赚水</th><th>上报上级</th><th>奖金</th><th>退水</th><th>对上级收付</th>"
				} else {
					strs += "<th>笔数</th><TH>总注额</TH><TH>贡献率</TH><TH>占比</TH><th>上报</th><th>奖金</th><th>退水</th><th>对" + layername[nowlayer] + "收付</th><th>" + layername[nowlayer - 1] + "占成</th><th>奖金</th><th>退水</th><th>" + layername[nowlayer - 1] + "占成盈亏</th><th class='plc'>赚赔率差</th><th>赚水</th><th>上报" + layername[nowlayer - 2] + "</th><th>奖金</th><th>退水</th><th>对上级收付</th>"
				}
				strs += "</tr>";
				str += "<tr><th colspan=20 class='bt'>总报表</th></tr>" + strs
			} else {
				if (nowlayer == 1) {
					strs += "<td colspan=9 class=b0>" + layername[nowlayer] + "</td><td colspan=5 class=b2>" + layername[nowlayer - 1] + "</td><td colspan=4 class=b3>上级</th>"
				} else {
					strs += "<td colspan=9 >" + layername[nowlayer] + "</td><td colspan=5 class=b2>" + layername[nowlayer - 1] + "</td><td colspan=4 class=b3>" + layername[nowlayer - 2] + "</th>"
				}
				strs += "<th rowspan=2>总盈亏</th></tr>";
				strs += "<tr><th>" + layername[nowlayer] + "</th>";
				if (nowlayer == 1) {
					strs += "<th>笔数</th><TH>总注额</TH><TH>贡献率</TH><TH>占比</TH><th>上报</th><th>奖金</th><th>退水</th><th>对" + layername[nowlayer] + "收付</th><th>" + layername[nowlayer - 1] + "占成</th><th>奖金</th><th>退水</th><th>" + layername[nowlayer - 1] + "占成盈亏</th><th>赚水</th><th>上报上级</th><th>奖金</th><th>退水</th><th>对上级收付</th>"
				} else {
					strs += "<th>笔数</th><TH>总注额</TH><TH>贡献率</TH><TH>占比</TH><th>上报</th><th>奖金</th><th>退水</th><th>对" + layername[nowlayer] + "收付</th><th>" + layername[nowlayer - 1] + "占成</th><th>奖金</th><th>退水</th><th>" + layername[nowlayer - 1] + "占成盈亏</th><th>赚水</th><th>上报" + layername[nowlayer - 2] + "</th><th>奖金</th><th>退水</th><th>对上级收付</th>"
				}
				strs += "</tr>";
				str += "<tr><th colspan=20 class='bt'>总报表</th></tr>" + strs
			}

			for (i = 0; i < zbl; i++) {
				if (Number(m[i]['zs']) == 0) continue;
				str += "<tr gid='all' fly='" + m[i]['fly'] + "'>";
				str += "<td><a href='javascript:void(0);' class='u'  ifagent='" + m[i]['ifagent'] + "' uid='" + m[i]['userid'] + "' layer='" + m[i]['layer'] + "'   fly='" + m[i]['fly'] + "'>" + m[i]['username'] + "</a></td>";
				str += "<td>" + m[i]['zs'] + "</td>";
				str += "<td>" + m[i]['zje'] + "</td>";
				str += "<td class='gxl'>" + baifen(m[i]['zje'],m[i]['upje']) + "</td>";
				str += "<td class='zanbi' v2='" + m[i]['upje'] + "'></td>";
				str += "<td>" + m[i]['upje'] + "</td>";
				str += "<td>" + m[i]['zhong'] + "</td>";
				str += "<td>" + m[i]['shui'] + "</td>";
				zxj += Number(m[i]['yk']);
				str += "<td class='yk'>" + m[i]['yk'] + "</td>";
				str += "<td class=o>" + m[i]['mezc'] + "</td>";
				str += "<td class=o>" + m[i]['mezhong'] + "</td>";
				str += "<td class=o>" + m[i]['meshui'] + "</td>";
				str += "<td class='yk'>" + m[i]['meyk'] + "</td>";
				if (plc == 1) str += "<td>" + getResult(Number(m[i]['mezhong']) + Number(m[i]['sendzhong']) - Number(m[i]['zhong']), 2) + "</td>";
				str += "<td>" + getResult(Number(m[i]['meshui']) + Number(m[i]['sendshui']) - Number(m[i]['shui']), 2) + "</td>";
				zmeyk += Number(m[i]['meyk']);
				str += "<td>" + m[i]['sendje'] + "</td>";
				str += "<td>" + m[i]['sendzhong'] + "</td>";
				str += "<td>" + m[i]['sendshui'] + "</td>";
				str += "<td class='yk'>" + m[i]['sendyk'] + "</td>";
				zsendyk += Number(m[i]['sendyk']);
				if (m[i]['fly'] == '2') {
					var zyk = getResult(Number(m[i]['meyk']), 2)
				} else {
					var zyk = getResult(Number(m[i]['yk']) + Number(m[i]['sendyk']), 2)
				}
				str += "<td class='yk'>" + zyk + "</td>";
				zzyk += zyk;
				str += "</tr>";
				zzs += Number(m[i]['zs']);
				zupje += Number(m[i]['upje']);
				zzje += Number(m[i]['zje']);
				zzhong += Number(m[i]['zhong']);
				zshui += Number(m[i]['shui']);
				zmezc += Number(m[i]['mezc']);
				zmeshui += Number(m[i]['meshui']);
				zmezhong += Number(m[i]['mezhong']);
				zsendzhong += Number(m[i]['sendzhong']);
				zsendshui += Number(m[i]['sendshui']);
				zsendje += Number(m[i]['sendje'])
			}
			str += "<tr><Th>合计</th><td>" + getResult(zzs, 0) + "</td><td>" + getResult(zzje, 2) + "</td><td colspan=2></td><td class='zanbis'>" + getResult(zupje, 2) + "</td>";
			str += "<td>" + getResult(zzhong, 2) + "</td>";
			str += "<td>" + getResult(zshui, 2) + "</td>";
			str += "<th class='yk'>" + getResult(zxj, 2) + "</th>";
			str += "<td>" + getResult(zmezc, 2) + "</td>";
			str += "<td>" + getResult(zmezhong, 2) + "</td>";
			str += "<td>" + getResult(zmeshui, 2) + "</td>";
			str += "<th class='yk'>" + getResult(zmeyk, 2) + "</th>";
			if (plc == 1) str += "<td>" + getResult(zmezhong + zsendzhong - zzhong, 2) + "</td>";
			str += "<td>" + getResult(zmeshui + zsendshui - zshui, 2) + "</td>";
			str += "<td>" + getResult(zsendje, 2) + "</td>";
			str += "<td>" + getResult(zsendzhong, 2) + "</td>";
			str += "<td>" + getResult(zsendshui, 2) + "</td>";
			str += "<th class='yk'>" + getResult(zsendyk, 2) + "</th>";
			str += "<td class='b1 yk'>" + getResult(zzyk, 2) + "</td>";
			str += "</tr>";
			$(".baotb").html(str);
			$(".zanbi").each(function(){
		        $(this).html(baifen($(".zanbis").html(),$(this).attr('v2')));
		    });
			str ='';
			$(".zanbi").removeClass('zanbi');
			$(".zanbis").removeClass('zanbis');
			var m = mm['gbao'];
			var gbl = m.length;
			var ul = m[0].length;
	
			for (i = 0; i < gbl; i++) {
				zzs = 0;
				zzje=0;
				zupje = 0;
				zzhong = 0;
				zshui = 0;
				zxj = 0;
				zmezc = 0;
				zmeshui = 0;
				zmezhong = 0;
				zmeyk = 0;
				zsendje = 0;
				zsendshui = 0;
				zsendzhong = 0;
				zsendyk = 0;
				zyk = 0;
				zzyk = 0;
				str += "<tr  class='" + m[i][0]['style'] + "tb'><td colspan=20 class='bt'>" + m[i][0]['gname'] + "</td></tr>" + strs;
				for (j = 0; j < ul; j++) {
					if (Number(m[i][j]['zs']) == 0) continue;
					str += "<tr gid='" + m[i][0]['gid'] + "'  fly='" + m[i]['fly'] + "'>";
					str += "<td><a href='javascript:void(0);' class='u'  ifagent='" + m[i][j]['ifagent'] + "' uid='" + m[i][j]['userid'] + "' layer='" + m[i][j]['layer'] + "'   fly='" + m[i][j]['fly'] + "'>" + m[i][j]['username'] + "</a></td>";
					str += "<td>" + m[i][j]['zs'] + "</td>";
					str += "<td>" + m[i][j]['zje'] + "</td>";
			    	str += "<td class='gxl'>" + baifen(m[i][j]['zje'],m[i][j]['upje']) + "</td>";
				    str += "<td class='zanbi' v2='" + m[i][j]['upje'] + "'></td>";
					str += "<td>" + m[i][j]['upje'] + "</td>";
					str += "<td>" + m[i][j]['zhong'] + "</td>";
					str += "<td>" + m[i][j]['shui'] + "</td>";
					zxj += Number(m[i][j]['yk']);
					str += "<td class='yk'>" + m[i][j]['yk'] + "</td>";
					str += "<td class=o>" + m[i][j]['mezc'] + "</td>";
					str += "<td class=o>" + m[i][j]['mezhong'] + "</td>";
					str += "<td class=o>" + m[i][j]['meshui'] + "</td>";
					str += "<td class='yk'>" + m[i][j]['meyk'] + "</td>";
					if (m[i][j]['fly'] == '1' | m[i][j]['fly'] == '2') {
						if (plc == 1) str += "<td>0</td>";
						str += "<td>0</td>"
					} else {
						if (plc == 1) str += "<td>" + getResult(Number(m[i][j]['mezhong']) + Number(m[i][j]['sendzhong']) - Number(m[i][j]['zhong']), 2) + "</td>";
						str += "<td>" + getResult(Number(m[i][j]['meshui']) + Number(m[i][j]['sendshui']) - Number(m[i][j]['shui']), 2) + "</td>"
					}
					zmeyk += Number(m[i][j]['meyk']);
					str += "<td>" + m[i][j]['sendje'] + "</td>";
					str += "<td>" + m[i][j]['sendzhong'] + "</td>";
					str += "<td>" + m[i][j]['sendshui'] + "</td>";
					str += "<td class='yk'>" + m[i][j]['sendyk'] + "</td>";
					zsendyk += Number(m[i][j]['sendyk']);
					if (m[i][j]['fly'] == '2') {
						var zyk = getResult(Number(m[i][j]['meyk']), 2)
					} else {
						var zyk = getResult(Number(m[i][j]['yk']) + Number(m[i][j]['sendyk']), 2)
					}
					str += "<td class='yk'>" + zyk + "</td>";
					zzyk += zyk;
					str += "</tr>";
					zzs += Number(m[i][j]['zs']);
					zupje += Number(m[i][j]['upje']);
					zzje += Number(m[i][j]['zje']);
					zzhong += Number(m[i][j]['zhong']);
					zshui += Number(m[i][j]['shui']);
					zmezc += Number(m[i][j]['mezc']);
					zmeshui += Number(m[i][j]['meshui']);
					zmezhong += Number(m[i][j]['mezhong']);
					zsendzhong += Number(m[i][j]['sendzhong']);
					zsendshui += Number(m[i][j]['sendshui']);
					zsendje += Number(m[i][j]['sendje'])
				}
				str += "<tr><Th>合计</th><td>" + getResult(zzs, 0) + "</td><td>" + getResult(zzje, 2) + "</td><td colspan=2></td><td class='zanbis'>" + getResult(zupje, 2) + "</td>";
				str += "<td>" + getResult(zzhong, 2) + "</td>";
				str += "<td>" + getResult(zshui, 2) + "</td>";
				str += "<th class='yk'>" + getResult(zxj, 2) + "</th>";
				str += "<td>" + getResult(zmezc, 2) + "</td>";
				str += "<td>" + getResult(zmezhong, 2) + "</td>";
				str += "<td>" + getResult(zmeshui, 2) + "</td>";
				str += "<th class='yk'>" + getResult(zmeyk, 2) + "</th>";
				if (plc == 1) str += "<td>" + getResult(zmezhong + zsendzhong - zzhong, 2) + "</td>";
				str += "<td>" + getResult(zmeshui + zsendshui - zshui, 2) + "</td>";
				str += "<td>" + getResult(zsendje, 2) + "</td>";
				str += "<td>" + getResult(zsendzhong, 2) + "</td>";
				str += "<td>" + getResult(zsendshui, 2) + "</td>";
				str += "<th class='yk'>" + getResult(zsendyk, 2) + "</th>";
				str += "<td class='b1 yk'>" + getResult(zzyk, 2) + "</td>";
				str += "</tr>";
				$(".baotb").append(str);
				$(".zanbi").each(function(){
		           $(this).html(baifen($(".zanbis").html(),$(this).attr('v2')));
		        });
				str = '';
				$(".zanbi").removeClass('zanbi');
			    $(".zanbis").removeClass('zanbis');
		
			}

			if (plc==1) $(".baotb .plc").show();
			str = null;
			m = null;
			$(".baotb a.u").click(function() {
				if ($(this).attr('ifagent') == '0') {
					$(".upuser").attr("uid", $(".nowuser").attr('uid'));
					$(".upuser").attr("layer", $(".nowuser").attr('layer'));
					$(".upuser").html($(".nowuser").html());
					$(".nowuser").attr('uid', $(this).attr('uid'));
					$(".nowuser").attr('layer', $(this).attr('layer'));
					$(".nowuser").html($(this).html());
					if ($(this).attr('fly') != '0' & $(this).attr('fly') != 'undefined' & $(this).attr('fly') != undefined) {
					$("#page").val(1);
						baouser(Number($(this).attr('fly')))
					} else {
						$("#page").val(1);
						baouser(0)
					}
				} else {
					$(".upuser").attr("uid", $(".nowuser").attr('uid'));
					$(".upuser").attr("layer", $(".nowuser").attr('layer'));
					$(".upuser").html($(".nowuser").html());
					$(".nowuser").attr('uid', $(this).attr('uid'));
					$(".nowuser").attr('layer', $(this).attr('layer'));
					$(".nowuser").html($(this).html());
					agent()
				}
			});
			addfunc()
		}
	})
}
function baoagent() {
	var start = $("#start").val();
	var end = $("#end").val();
	var bid = $(".bid").val();
	var cid = $(".cid").val();
	var sid = $(".sid").val();
	var uid = $(".nowuser").attr('uid');
	var nowlayer = Number($(".nowuser").attr('layer'));
	var game = '';
	$("label.chk").each(function() {
		game += $(this).attr('gid') + '|'
	});
	if (Number(start.replace('-', '')) > Number(end.replace('-', ''))) {
		alert('开始日期不能大于结束日期！');
		return false
	}
	if (strlen(game) < 4) {
		alert('请至少选择一个彩种！');
		return false
	}
	$(".baotb").show();
	$(".cmd").hide();
	$(".scmd").show();
	$(".baotb").empty();
	var str = '&start=' + start + "&end=" + end + "&bid=" + bid + "&cid=" + cid + "&sid=" + sid + "&uid=" + uid + "&game=" + game;
    var jsstatus=$("input[name='jsstatus']:checked").val();
	str += "&jsstatus="+jsstatus;
	$.ajax({
		type: 'POST',
		url: mulu + 'baox.php',
		data: 'xtype=baoagent' + str,
		dataType: 'json',
		cache: false,
		success: function(m) {
			//$("#test").html(m);return;
			var plc = Number(m['plc']);
			m = m['bao'];
			var ml = m.length;
			var str = '';
			var zzs = 0;
			var zupje = 0;
			var zzje = 0;
			var zzhong = 0;
			var zshui = 0;
			var zxj = 0;
			var zmezc = 0;
			var zmeshui = 0;
			var zmezhong = 0;
			var zmeyk = 0;
			var zsendje = 0;
			var zsendshui = 0;
			var zsendzhong = 0;
			var zsendyk = 0;
			var zyk = 0;
			var zzyk = 0;
			var str = '';
			str += "<tr>";
			if (plc == 1) {
				if (nowlayer == 1) {
					str += "<td colspan=9 class=b1>" + layername[nowlayer] + "</td><td colspan=6 class=b2>" + layername[nowlayer - 1] + "</td><td colspan=4 class=b3>上级</th><td></td>"
				} else {
					str += "<td colspan=9 class=b1>" + layername[nowlayer] + "</td><td colspan=6 class=b2>" + layername[nowlayer - 1] + "</td><td colspan=4 class=b3>" + layername[nowlayer - 2] + "</th><td></td>"
				}
				str += "</tr>";
				str += "<tr><th>" + layername[nowlayer] + "</th>";
				if (nowlayer == 1) {
					str += "<th>注数</th><th>总注额</th><TH>贡献率</TH><TH>占比</TH><th>上报</th><th>奖金</th><th>退水</th><th>对" + layername[nowlayer] + "收付</th><th>" + layername[nowlayer - 1] + "占成</th><th>奖金</th><th>退水</th><th>" + layername[nowlayer - 1] + "占成盈亏</th><th>赚赔率差</th><th>赚水</th><th>上报上级</th><th>奖金</th><th>退水</th><th>对上级收付</th><th>总盈亏</th>"
				} else {
					str += "<th>注数</th><th>总注额</th><TH>贡献率</TH><TH>占比</TH><th>上报</th><th>奖金</th><th>退水</th><th>对" + layername[nowlayer] + "收付</th><th>" + layername[nowlayer - 1] + "占成</th><th>奖金</th><th>退水</th><th>" + layername[nowlayer - 1] + "占成盈亏</th><th>赚赔率差</th><th>赚水</th><th>上报" + layername[nowlayer - 2] + "</th><th>奖金</th><th>退水</th><th>对上级收付</th><th>总盈亏</th>"
				}
			} else {
				if (nowlayer == 1) {
					str += "<td colspan=9 class=b1>" + layername[nowlayer] + "</td><td colspan=5 class=b2>" + layername[nowlayer - 1] + "</td><td colspan=4 class=b3>上级</th><td></td>"
				} else {
					str += "<td colspan=9 class=b1>" + layername[nowlayer] + "</td><td colspan=5 class=b2>" + layername[nowlayer - 1] + "</td><td colspan=4 class=b3>" + layername[nowlayer - 2] + "</th><td></td>"
				}
				str += "</tr>";
				str += "<tr><th>" + layername[nowlayer] + "</th>";
				if (nowlayer == 1) {
					str += "<th>注数</th><th>总注额</th><TH>贡献率</TH><TH>占比</TH><th>上报</th><th>奖金</th><th>退水</th><th>对" + layername[nowlayer] + "收付</th><th>" + layername[nowlayer - 1] + "占成</th><th>奖金</th><th>退水</th><th>" + layername[nowlayer - 1] + "占成盈亏</th><th>赚水</th><th>上报上级</th><th>奖金</th><th>退水</th><th>对上级收付</th><th>总盈亏</th>"
				} else {
					str += "<th>注数</th><th>总注额</th><TH>贡献率</TH><TH>占比</TH><th>上报</th><th>奖金</th><th>退水</th><th>对" + layername[nowlayer] + "收付</th><th>" + layername[nowlayer - 1] + "占成</th><th>奖金</th><th>退水</th><th>" + layername[nowlayer - 1] + "占成盈亏</th><th>赚水</th><th>上报" + layername[nowlayer - 2] + "</th><th>奖金</th><th>退水</th><th>对上级收付</th><th>总盈亏</th>"
				}
			}
			str += "</tr>";
			for (i = 0; i < ml; i++) {
				if (Number(m[i]['zs']) == 0) continue;
				str += "<tr  fly='" + m[i]['fly'] + "'>";
				str += "<td><a href='javascript:void(0);' class='u'  ifagent='" + m[i]['ifagent'] + "' uid='" + m[i]['userid'] + "' layer='" + m[i]['layer'] + "'  ttype='" + m[i]['ttype'] + "'  >" + m[i]['username'] + "</a></td>";
				str += "<td>" + m[i]['zs'] + "</td>";
				str += "<td>" + m[i]['zje'] + "</td>";
					str += "<td class='gxl'>"+baifen(m[i]['zje'],m[i]['upje'])+"</td>";
					str += "<td class='zanbi' v2='"+m[i]['upje']+"'></td>";
				str += "<td>" + m[i]['upje'] + "</td>";
				str += "<td>" + m[i]['zhong'] + "</td>";
				str += "<td>" + m[i]['shui'] + "</td>";
				zxj += Number(m[i]['yk']);
				str += "<td class='yk'>" + m[i]['yk'] + "</td>";
				str += "<td class=o>" + m[i]['mezc'] + "</td>";
				str += "<td class=o>" + m[i]['mezhong'] + "</td>";
				str += "<td class=o>" + m[i]['meshui'] + "</td>";
				str += "<td class='yk'>" + m[i]['meyk'] + "</td>";
				if (m[i]['fly'] == '1' | m[i]['fly'] == '2') {
					if (plc == 1) str += "<td>0</td>";
					str += "<td>0</td>"
				} else {
					if (plc == 1) str += "<td>" + getResult(Number(m[i]['mezhong']) + Number(m[i]['sendzhong']) - Number(m[i]['zhong']), 2) + "</td>";
					str += "<td>" + getResult(Number(m[i]['meshui']) + Number(m[i]['sendshui']) - Number(m[i]['shui']), 2) + "</td>"
				}
				zmeyk += Number(m[i]['meyk']);
				str += "<td>" + m[i]['sendje'] + "</td>";
				str += "<td>" + m[i]['sendzhong'] + "</td>";
				str += "<td>" + m[i]['sendshui'] + "</td>";
				str += "<td class='yk'>" + m[i]['sendyk'] + "</td>";
				zsendyk += Number(m[i]['sendyk']);
				if (m[i]['ttype'] == '2') {
					var zyk = getResult(Number(m[i]['meyk']), 2)
				} else {
					var zyk = getResult(Number(m[i]['yk']) + Number(m[i]['sendyk']), 2)
				}
				str += "<td class='yk'>" + zyk + "</td>";
				zzyk += zyk;
				str += "</tr>";
				zzs += Number(m[i]['zs']);
				zupje += Number(m[i]['upje']);
				zzje += Number(m[i]['zje']);
				zzhong += Number(m[i]['zhong']);
				zshui += Number(m[i]['shui']);
				zmezc += Number(m[i]['mezc']);
				zmeshui += Number(m[i]['meshui']);
				zmezhong += Number(m[i]['mezhong']);
				zsendzhong += Number(m[i]['sendzhong']);
				zsendshui += Number(m[i]['sendshui']);
				zsendje += Number(m[i]['sendje'])
			}
			str += "<tr><Th>合计</th><td>" + getResult(zzs, 0) + "</td><td>" + getResult(zzje, 2) + "</td><td colspan=2></td><td class='zanbis'>" + getResult(zupje, 2) + "</td>";
			str += "<td>" + getResult(zzhong, 2) + "</td>";
			str += "<td>" + getResult(zshui, 2) + "</td>";
			str += "<th class='yk'>" + getResult(zxj, 2) + "</th>";
			str += "<td>" + getResult(zmezc, 2) + "</td>";
			str += "<td>" + getResult(zmezhong, 2) + "</td>";
			str += "<td>" + getResult(zmeshui, 2) + "</td>";
			str += "<th class='yk'>" + getResult(zmeyk, 2) + "</th>";
			if (plc == 1) str += "<td>" + getResult(zmezhong + zsendzhong - zzhong, 2) + "</td>";
			str += "<td>" + getResult(zmeshui + zsendshui - zshui, 2) + "</td>";
			str += "<td>" + getResult(zsendje, 2) + "</td>";
			str += "<td>" + getResult(zsendzhong, 2) + "</td>";
			str += "<td>" + getResult(zsendshui, 2) + "</td>";
			str += "<th class='yk'>" + getResult(zsendyk, 2) + "</th>";
			str += "<td class='b1 yk'>" + getResult(zzyk, 2) + "</td>";
			str += "</tr>"
			$(".baotb").html(str);
				$(".zanbi").each(function(){
		           $(this).html(baifen($(".zanbis").html(),$(this).attr('v2')));
		        });
				str = '';
				$(".zanbi").removeClass('zanbi');
			    $(".zanbis").removeClass('zanbis');
			str = null;
			m = null;
			$(".baotb a.u").click(function() {
				if ($(this).attr('ifagent') == '0') {
					$(".upuser").attr("uid", $(".nowuser").attr('uid'));
					$(".upuser").attr("layer", $(".nowuser").attr('layer'));
					$(".upuser").html($(".nowuser").html());
					$(".nowuser").attr('uid', $(this).attr('uid'));
					$(".nowuser").attr('layer', $(this).attr('layer'));
					$(".nowuser").html($(this).html());
					$("#page").val(1);
					baouser($(this).attr('ttype'))
				} else {
					$(".upuser").attr("uid", $(".nowuser").attr('uid'));
					$(".upuser").attr("layer", $(".nowuser").attr('layer'));
					$(".upuser").html($(".nowuser").html());
					$(".nowuser").attr('uid', $(this).attr('uid'));
					$(".nowuser").attr('layer', $(this).attr('layer'));
					$(".nowuser").html($(this).html());
					$("#page").val(1);
					baoagent()
				}
			});
			addfunc()
		}
	})
}
function baifen(v1,v2){
	v1 = Number(v1);
	v2 = Number(v2);
	
	if(v1==0){
	    return '0%';
	}else{
		v1 = v2*100/v1;
	    return v1.toFixed(1)+'%';
	}
}
var psize = 100;

function baouser(ttype) {
	var start = $("#start").val();
	var end = $("#end").val();
	var bid = $(".bid").val();
	var cid = $(".cid").val();
	var sid = $(".sid").val();
	var uid = $(".nowuser").attr('uid');
	var nowlayer = Number($(".nowuser").attr('layer'));
	var game = '';
	$("label.chk").each(function() {
		game += $(this).attr('gid') + '|'
	});
	if (Number(start.replace('-', '')) > Number(end.replace('-', ''))) {
		alert('开始日期不能大于结束日期！');
		return false
	}
	if (strlen(game) < 4) {
		alert('请至少选择一个彩种！');
		return false
	}
	var page = Number($("#page").val());
	var str = '&start=' + start + "&end=" + end + "&bid=" + bid + "&cid=" + cid + "&sid=" + sid + "&uid=" + uid + "&game=" + game + "&psize=" + psize + "&page=" + page;
	str += "&ttype=" + ttype;
    var jsstatus=$("input[name='jsstatus']:checked").val();
	str += "&jsstatus="+jsstatus;
	$.ajax({
		type: 'POST',
		url: mulu + 'baox.php',
		data: 'xtype=baouser' + str + "&ttype=" + ttype,
		dataType: 'json',
		cache: false,
		success: function(m) {
			var ml = m['tz'].length;
			var str = '';
			var zje = 0;
			var zshui = 0;
			var zyk = 0;
			var xzje = 0;
			var xzshui = 0;
			var xzyk = 0;
			var zzhong = 0;
			var pagestr = '';
			var pcount = Number(m['page']);
			for (i = 1; i <= pcount; i++) {
				pagestr += "&nbsp;&nbsp;<a href='javascript:void(0);' class='page";
				if (page == i) pagestr += " red";
				pagestr += "' >";
				pagestr += i + "</a>"
			}
			str += "<tr><Td colspan=10>" + pagestr + "</td></tr>";
			str += "<tr><th>期数</th><th>时间</th><th>游戏</th><th>玩法@盘</th><th>内容</th><th>开奖@时间</th><!--<th>大盘</th><th>小盘</th>--><th>金额</th><th>退水</th><th>赔率</th><th>合计</th></tr>";
			var gid = 0;
			for (i = 0; i < ml; i++) {
				if (m['tz'][i]['gid'] == undefined) {
					str += "<tr>";
					str += "<th>小计</th>";
					str += "<td colspan=5></td>";
					str += "<th>" + getResult(zje, 2) + "</th>";
					str += "<th>" + getResult(zshui, 2) + "</th>";
					str += "<th></th>";
					str += "<th>" + getResult(zyk, 2) + "</th>";
					str += "</tr>";
					gid = m['tz'][i]['gid'];
					xzje += zje;
					xzshui += zshui;
					xzyk += zyk;
					zje=0;
					zshui=0;
					zyk=0;
					continue
				}
				if (gid != m['tz'][i]['gid'] & m['tz'][i]['gid'] != undefined) {
					str += "<tr><th colspan=10 class='bt'>" + m['tz'][i]['gid'] + "</th></tr>"
				}
				str += "<TR z='" + m['tz'][i]['z'] + "' class='z'>";
				str += "<td>" + m['tz'][i]['qishu'] + "</td>";
				str += "<td>" + m['tz'][i]['time'] + "</td>";
				str += "<td>" + m['tz'][i]['gid'] + "</td>";
				str += "<td class='z'>" + m['tz'][i]['wf'] +m['tz'][i]['abcd'] +"</td>";
				str += "<td class='ccon'>" + m['tz'][i]['con'] + "</td>";
				str += "<td>" + m['tz'][0]['kj']['g' + m['tz'][i]['gids'] + '' + m['tz'][i]['qishu']] + "</td>";
				str += "<td>" + m['tz'][i]['je'] + "</td>";
				str += "<td>" + m['tz'][i]['point'] + "</td>";
				str += "<td>" + m['tz'][i]['peilv'] + "</td>";
				var yk = getResult(Number(m['tz'][i]['zhong']) + Number(m['tz'][i]['point']) - Number(m['tz'][i]['je']), 2);
				str += "<td class='yk'>" + yk + "</td>";
				zyk += yk;
				zje += Number(m['tz'][i]['je']);
				zshui += Number(m['tz'][i]['points']);
				zzhong += Number(m['tz'][i]['zhong']);
				str += "</TR>"
				gid = m['tz'][i]['gid']
			}
			str += "<tr><td>总计</td><td colspan=5></td><th>" + getResult(xzje, 2) + "</th><th>" + getResult(xzshui, 2) + "</th><td></td><!--<th>" + getResult(zzhong, 2) + "</th--><th class='yk'>" + getResult(xzyk, 2) + "</th></tr>";
			$(".baotb").html(str);
			$(".baotb a").click(function() {
				$("#page").val($(this).html());
				baouser(ttype);
				return false
			});
			str = null;
			m = null;
			$(".baotb tr.z").each(function() {
				if ($(this).attr('z') == '1') {
					$(this).find("td").addClass('z1')
				} else if ($(this).attr('z') == '2') {
					$(this).find("td").addClass('he')
				} else if ($(this).attr('z') == '3') {
					$(this).find("td").addClass('z3')
				}
			});
			addfunc()
		}
	})
}
function addfunc() {
	$(".baotb td").mouseover(function() {
		$(this).parent().find("td").addClass('over')
	}).mouseout(function() {
		$(this).parent().find("td").removeClass('over')
	})
	$(".yk").each(function() {
		var num = Number($(this).html());
		if (num < 0) {
			$(this).css('color', 'green')
		} else if (num > 0){
			$(this).css('color', 'red')
		}else{
		    $(this).css('color', 'black')
		}
	})
}
function baofly(uid) {
	var start = $("#start").val();
	var end = $("#end").val();
	var bid = $(".bid").val();
	var cid = $(".cid").val();
	var sid = $(".sid").val();	
	var uid = $(".nowuser").attr('uid');
	var nowlayer=Number($(".nowuser").attr('layer'));
	var game='';
	$(".game").each(function(){
        if($(this).prop("checked")==true) game += $(this).val() + '|';
    });
    if(Number(start.replace('-','')) >Number(end.replace('-',''))){
		alert('开始日期不能大于结束日期！');
		return false   
	}
	if(strlen(game)<4){
		alert('请至少选择一个彩种！');
		return false   
	}
	var str = '&start=' + start+ "&end=" + end + "&bid=" + bid + "&cid=" + cid + "&sid=" + sid + "&uid=" + uid+"&game="+game;
	$(".flytb tr").each(function(i) {
		if (i > 0) $(this).remove()
	});
    var jsstatus=$("input[name='jsstatus']:checked").val();
	str += "&jsstatus="+jsstatus;
	$.ajax({
		type: 'POST',
		url: mulu + 'baox.php',
		data: 'xtype=baofly' + str,
		dataType: 'json',
		success: function(m) {
			var ml = m.length;
			var str = '';
			var yk = getResult(Number(m['zhong']) + Number(m['points']) - Number(m['zje']), 2);
			$(".flytb").append("<tr><td><a href='javascript:void(0)' class=b2>" + m['zs'] + "</a></td><td>" + m['zje'] + "</td><td>" + m['zhong'] + "</td><td>" + m['points'] + "</td><td class=b2>" + yk + "</td>");
			$(".flytb").show();
			$("h4 label").html(getResult(Number($("h4 label").html()) + yk, 2));
			$("h5:eq(1)").find("label").html(getResult(Number($("h5:eq(1)").find("label").html()) + yk, 2));
			$(".flytb .b2").click(function() {
				baouser(0)
			})
		}
	})
}
function baoflywai(uid) {
	var start = $("#start").val();
	var end = $("#end").val();
	var bid = $(".bid").val();
	var cid = $(".cid").val();
	var sid = $(".sid").val();	
	var uid = $(".nowuser").attr('uid');
	var nowlayer=Number($(".nowuser").attr('layer'));
	var game='';
	$(".game").each(function(){
        if($(this).prop("checked")==true) game += $(this).val() + '|';
    });
    if(Number(start.replace('-','')) >Number(end.replace('-',''))){
		alert('开始日期不能大于结束日期！');
		return false   
	}
	if(strlen(game)<4){
		alert('请至少选择一个彩种！');
		return false   
	}
	var str = '&start=' + start+ "&end=" + end + "&bid=" + bid + "&cid=" + cid + "&sid=" + sid + "&uid=" + uid+"&game="+game;
    var jsstatus=$("input[name='jsstatus']:checked").val();
	str += "&jsstatus="+jsstatus;
	$(".flytbwai tr").each(function(i) {
		if (i > 0) $(this).remove()
	});
	$.ajax({
		type: 'POST',
		url: mulu + 'baox.php',
		data: 'xtype=baoflywai' + str,
		dataType: 'json',
		cache:false,
		success: function(m) {
			//$("#test").html(m);
			var ml = m.length;
			var str = '';
			var yk = getResult(Number(m['zhong']) + Number(m['points']) - Number(m['zje']), 2);
			$(".flytbwai").append("<tr><td><a href='javascript:void(0)' class=b2>" + m['zs'] + "</a></td><td>" + m['zje'] + "</td><td>" + m['zhong'] + "</td><td>" + m['points'] + "</td><td class=b2>" + yk + "</td>");
			$(".flytbwai").show();
			$("h4 label").html(getResult(Number($("h4 label").html()) + yk, 2));
			$("h5:eq(2)").find("label").html(getResult(Number($("h5:eq(2)").find("label").html()) + yk, 2));
			$(".flytbwai .b2").click(function() {
				baouser(2)
			})
		}
	})
}
function getResult(num, n) {
	var tmp = Math.round(num * Math.pow(10, n)) / Math.pow(10, n);
	if (Math.abs(tmp) < 0.5) return 0;
	else return tmp
}
function getresult(num, n) {
	return num.toString().replace(new RegExp("^(\\-?\\d*\\.?\\d{0," + n + "})(\\d*)$"), "$1") + 0
}
function strlen(sString) {
    var sStr,
    iCount,
    i,
    strTemp;
    iCount = 0;
    sStr = sString.split("");
    for (i = 0; i < sStr.length; i++) {
        strTemp = escape(sStr[i]);
        if (strTemp.indexOf("%u", 0) == -1)
        // 表示是汉字
        {
            iCount = iCount + 1;


        }
        else
        {
            iCount = iCount + 2;


        }


    }
    return iCount;


}