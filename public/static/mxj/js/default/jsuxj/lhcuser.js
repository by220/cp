function exe() {
	var obj = $(".sendtb .qr",parent.document);
	if (obj.is(":visible") & obj.prop("disabled") == true) {
		alert("系统接单中。。。，请不要反复投注!");
		return false;
	}
	psend = [];
	var play = [];
	var i = 0;
	var f = true;
	var classx = '';
	var bname = $(".main a.click").html();
	var sname;
	var cname;
	if (bname == '過關' | bname == '过关') {
		var pid = $(".make th:eq(0)").attr('pid');
		var je = $(".ggje").val();
		if (isNaN(je) | je % 1 != 0 | je < 0 | je == '') {
			alert("您输入的金额格式不正确!");
			$(".duoexeje .ggje").focus();
			return false
		}
		var minje = Number($(".make th:eq(0)").attr('minje'));
		var maxje = Number($(".make th:eq(0)").attr('maxje'));
		if (je < minje | je > maxje) {
			alert("金额范围:[" + minje + "--" + maxje + "]");
			$(".duoexeje .ggje").focus();
			return false
		}
		var peilv1 = 1;
		var parr = [];
		var con = '';
		var tmp = 0;
		var cs = 0;
		$(".make td.peilv1.selected").each(function(i) {
			parr[i] = [];
			parr[i]['pid'] = $(this).attr('pid');
			parr[i]['sid'] = $(this).attr('sid');
			parr[i]['cid'] = $(this).attr('cid');
			if (tmp != $(this).attr('sid')) {
				cs++;
				tmp = $(this).attr('sid')
			}
			peilv1 *= Number($(this).html());
			var ii = $(this).index() ;
			if (i > 0) con += "-";
			con += $(this).parent().find("th:eq(0)").html() + "[" + $(".make tr:eq(0) th:eq(" + ii + ")").html()+"]";
		});
		play[0] = [];
		play[0]['pid'] = pid;
		play[0]['name'] = bname;
		play[0]['je'] = je;
		play[0]['peilv1'] = getResult(peilv1, 4);
		play[0]['con'] = con;
		play[0]['classx'] = bname;
		play[0]['arr'] = parr;
		parr = null;
		i = 1
	} else if (bname == '合肖' | bname == '連碼' | bname == '不中' | bname == '生肖連' | bname == '尾數連') {
		var mode = Number($(".duoexetb a.on").attr("mode"));
		var pid = $(".make input.xz:checked").attr('pid');
		var pname = $(".make input.xz:checked").attr('mname');
		var num = $(".make input.xz:checked").attr('znum1');
		var je = $(".duoexetb .duoje").val();
		var minje = Number($(".make input.xz:checked").attr('minje'));
		var maxje = Number($(".make input.xz:checked").attr('maxje'));
		var aone = [];
		var atwo = [];
		var pone = [];
		var ptwo = [];
		if (isNaN(je) | je % 1 != 0 | je < 0 | je == '') {
			alert("您输入的金额格式不正确!");
			$(".duoexeje .duoje").focus();
			return false
		}
		if (je < minje | je > maxje) {
			alert("金额范围:[" + minje + "--" + maxje + "]");
			$(".duoexeje .duoje").focus();
			return false
		}
		if (pname == '三中二') {
			num = 3;
		}
		if (mode == 1) {
			var yl = $(".duotb .names.selected").length;
			if (yl < num) {
				alert("选择的号码数不够");
				return false
			}
			$(".duotb .names.selected").each(function(i) {				
				
				if (bname == '連碼' | bname == '不中') {
					var htm = $(this).find("span").html();
					aone[i] = htm;
					pone[htm] = Number($(this).next().find("label.peilv1").html());
					if (pname == '三中二' | pname == '二中特') {
						ptwo[htm] = Number($(this).next().find("label.peilv2").html())
					}
				} else {
					var htm = $(this).html();
					aone[i] = htm;
					pone[htm] = Number($(this).next().next().find("label.peilv1").html())
				}
			});
			if (bname == '連碼' | bname == '不中') {
			   aone.sort(function(x,y){return x-y;});
			}
		    console.log(num);
		    console.log(aone.join(","))
			var aall = C(aone, num);
			var al = aall.length;
			i = al;
			for (i = 0; i < al; i++) {
				play[i] = [];
				play[i]['pid'] = pid;
				play[i]['name'] = pname;
				play[i]['je'] = je;
				play[i]['con'] = aall[i].sort();
				play[i]['peilv1'] = peilvmin(aall[i], pone);
				if (pname == '三中二' | pname == '二中特') {
					play[i]['peilv2'] = peilvmin(aall[i], pone, ptwo)
				}
			}
			aall = null;
			aone = null;
			pone = null;
			ptwo = null
		} else if (mode == 2) {
			var y1 = $(".duotb .names.selected").length;
			var y2 = $(".duotb2 .names.selected2").length;
			if ((y1 + y2) < num) {
				alert("选择的号码数不够");
				return false
			}
			$(".duotb .names.selected").each(function(i) {
				if (bname == '連碼' | bname == '不中') {
				   aone[i] = $(this).find("span").html();
				}else{
				   aone[i] = $(this).html();
				}
			});
			$(".duotb .names").each(function(i) {				
				if (bname == '連碼' | bname == '不中') {
					var htm = $(this).find("span").html();
					pone[htm] = Number($(this).next().find("label.peilv1").html());
					if (pname == '三中二' | pname == '二中特') {
						ptwo[htm] = Number($(this).next().find("label.peilv2").html())
					}
				} else {
					var htm = $(this).html();
					pone[htm] = Number($(this).next().next().find("label.peilv1").html())
				}
			});
			$(".duotb2 .names.selected2").each(function(i) {
				if (bname == '連碼' | bname == '不中') {
					atwo[i] = $(this).find("span").html();
				}else{
				    atwo[i] = $(this).html();
				}
			});
			if (bname == '連碼' | bname == '不中') {
			   aone.sort(function(x,y){return x-y;});
			   atwo.sort(function(x,y){return x-y;});
			}
			var nac = num - y1;
			var aall = C(atwo, nac);
			var al = aall.length;
			for (k = 0; k < al; k++) {
				aall[k] = aone.concat(aall[k]);
			}
			i = al;
			for (i = 0; i < al; i++) {
				play[i] = [];
				play[i]['pid'] = pid;
				play[i]['name'] = pname;
				play[i]['je'] = je;
				play[i]['con'] = aall[i];
				play[i]['peilv1'] = peilvmin(aall[i], pone);
				if (pname == '三中二' | pname == '二中特') {
					play[i]['peilv2'] = peilvmin(aall[i], pone, ptwo)
				}
			}
			aall = null;
			aone = null;
			atwo = null;
			pone = null;
			atwo = null
		} else {
			if (pname != '二中特' & pname != '二全中' & pname != '特串') {
				return false
			}
			var y1 = $(".duotb2 .selected2").length;
			var y2 = $(".duotb2 .selected").length;
			if (y1 != 1 | y2 != 1) {
				alert("对碰模式,两种只能各选一样!");
				return false
			}
			$(".duotb .names").each(function(i) {
				var htm = $(this).find("span").html();
				pone[htm] = Number($(this).next().find("label.peilv1").html());
				if (pname == '二中特') {
					ptwo[htm] = Number($(this).next().find("label.peilv2").html())
				}
			});
			$(".duotb2 .selected2").each(function(i) {
				aone[i] = $(this).html()
			});
			$(".duotb2 .selected").each(function(i) {
				atwo[i] = $(this).html()
			});
			aone = sma[aone[0]];
			atwo = sma[atwo[0]];
			var ca1 = aone.length;
			var ca2 = atwo.length;
			aall = [];
			var k = 0;
			for (i = 0; i < ca1; i++) {
				for (j = 0; j < ca2; j++) {
					if (aone[i] != atwo[j]) {
						aall[k] = Array(isoma(aone[i]), isoma(atwo[j]));
						k++
					}
				}
			}
			var al = aall.length;
			i = al;
			for (i = 0; i < al; i++) {
				play[i] = [];
				play[i]['pid'] = pid;
				play[i]['name'] = pname;
				play[i]['je'] = je;
				play[i]['con'] = aall[i];
				play[i]['peilv1'] = peilvmin(aall[i], pone);
				if (pname == '二中特') {
					play[i]['peilv2'] = peilvmin(aall[i], pone, ptwo)
				}
			}
		}
		aall = null;
		aone = null;
		atwo = null;
		pone = null;
		atwo = null
	} else if(bname=='番摊'){
		$(".fts input:text").each(function() {
			var val = Number($(this).val());
			var pidf = $(this).attr("pid");
			if (val % 1 == 0 & val != 0 & !isNaN(val)) {
				play[i] = new Array();
				play[i]['pid'] = pidf;
				play[i]['je'] = val;
				play[i]['name'] = $(".p" + play[i]['pid']).attr('mname');
				if (val > Number($(".p" + play[i]['pid']).attr('maxje'))) {
					alert("<" + play[i]['name'] + ">单注最大金额：" + $(".p" + play[i]['pid']).attr('maxje'));
					return;
					f = false
				}
				if (val < Number($(".p" + play[i]['pid']).attr('minje'))) {
					alert("<" + play[i]['name'] + ">单注最小金额：" + $(".p" + play[i]['pid']).attr('minje'));
					return;
					f = false
				}
				play[i]['peilv1'] = $(".p" + play[i]['pid']).find("label").html();
				play[i]['classx'] = bname+'-' +$(".p" + play[i]['pid']).attr('cname')+ ":";
				play[i]['con'] = '';
				play[i]['bz'] = '';
				i++
			}
		})
	} else {
		$(".lists input:text").each(function() {
			var je = $(this).val();
			if (Number(je) % 1 == 0 & je != 0 & !isNaN(je)) {
				play[i] = [];
				play[i]['pid'] = $(this).parent().attr('pid');
				play[i]['je'] = je;
				play[i]['name'] = $(".p" + play[i]['pid']).attr('mname');
				play[i]['peilv1'] = $(".p" + play[i]['pid']).find(".peilv1").html();
				if (Number(je) > Number($(".p" + play[i]['pid']).attr('maxje'))) {
					alert("<" + play[i]['name'] + ">单注最大金额：" + $(".p" + play[i]['pid']).attr('maxje'));
					f = false
				}
				if (Number(je) < Number($(".p" + play[i]['pid']).attr('minje'))) {
					alert("<" + play[i]['name'] + ">单注最小金额：" + $(".p" + play[i]['pid']).attr('minje'));
					f = false
				}
				if (bname == '正特') {
					play[i]['classx'] = $(".smenu a.sclass.on").html()
				} else if (bname == '正特1~6') {
					play[i]['classx'] = $(".p" + play[i]['pid']).attr('sname');
				} else {
					play[i]['classx'] = bname
				}
				play[i]['con'] = '';
				play[i]['bz'] = '';
				i++
			}
		});
	play.sort(function(x, y) {
		if (!isNaN(x['name']) & !isNaN(y['name'])) {
			return x['name'] - y['name'];
		} else {
			return x['pid'] - y['pid'];
		}
	});
	}
	if (!f) return false;
	if (i == 0) return false;
	if (i > 120) {
		alert("每次投注不能超过120注!");
		return false
	}	

	
	var str = '';
	var je = 0;
	for (j = 0; j < i; j++) {
		str += "<tr pid='" + play[j]['pid'] + "' content='' class='cg s"+j+"'>";
		str += "<td style='display:none;'>" + (j + 1) + "</td>";
		if (bname == '合肖' | bname == '連碼' | bname == '不中' | bname == '生肖連' | bname == '尾數連') {
			str += "<td>" + play[j]['name'] + '&nbsp;<label class=red>' + play[j]['con'].join('-') + "</label></td>"
		} else if (bname == '過關' | bname == '过关') {
			str += "<td>" + play[j]['classx'] + '&nbsp;<label class=red>' + play[j]['con'] + "</label></td>"
		} else {
			str += "<td>" + play[j]['classx'] + '&nbsp;<label class=red>' + play[j]['name'] + "</label></td>"
		}
		str += "<td  class='red'>" + play[j]['peilv1'];
		if (play[j]['name'] == '三中二' | play[j]['name'] == '二中特') {
			str += '/' + play[j]['peilv2']
		}
		str += "</td>";
		str += "<td class='amount'><input value='" + play[j]['je'] + "' /></td>";
		str += "<td class='zt'><input type='checkbox' checked></td>";
		str += "</tr>";
		je += Number(play[j]['je'])
	}
	var obj = $(".sendtb",parent.document);
	obj.css("height","auto");
	obj.find("#betlist").html(str);
	obj.find("#bcount").attr('v',i);
	obj.find("#bcount").html("注数："+i);
	obj.find("#btotal").html("总金额："+je);
	obj.find("#btotal").attr('v',je);
	str = null;
	psend = play;
	play = null;

   if(fudong==1){
	   //var edu = Number($(".fedu .fmoney",parent.document).html());
   }else{
	   //var edu = Number($(".kedu .money",parent.document).html());
	  }
    var edu = Number($(".kedu .kmoney",parent.document).html());
	if (edu < je) {
		alert("您的投金额已超出可用余额");
		return false;
	}
	addfunc2()
}
var errflag;

function nansort(v1,v2,bname){
	if(bname.indexOf('肖')!=-1){
		arr = ["鼠","牛","虎","兔","龍","蛇","馬","羊","猴","雞","狗","豬"];
	}else{
	    arr = ["0尾","1尾","2尾","3尾","4尾","5尾","6尾","7尾","8尾","9尾"];
	}
	var k1,k2;
	for(var i in arr){
	   if(arr[i]==v1) k1 = i;
	   if(arr[i]==v2) k2 = i;
	}
	return k1-k2;
}
function lib() {
	if(ustatus==2){
		window.location.href='bao.php?xtype=show';
		return;
	}
	var bid = $(".main a.click").attr("bid");
	var bname = $(".main a.click").html();
	$(".smenu a.sclass").remove();
    $(".tu").hide();
    updatel(1);
	if (bname == '特碼' | bname == '正特') {
		$(".smenu").show();
		$("a.ab").show();
		$("a.ab:eq(1)").html(bname + "A");
		$("a.ab:eq(0)").html(bname + "B");
	} else {
		$(".smenu").hide();
		$("a.ab").hide();
	}
	if (bname == '特碼' | bname == '正特' | bname == '正碼') {
        $(".kuaijue").show();
	}else{
		$(".kuaijue").hide();
	}
	if(bname=="番摊"){
        $("#resultPanel").show();
        $("#changlong").show();
        $("#quick_sec_table").hide();
	}else{
		$("#resultPanel").hide();
		$("#changlong").hide();
		$("#quick_sec_table").show();
	}
	gets(bid, bname);
}

function addfunc2() {
	var obj = $(".sendtb",parent.document);
	obj.find(".qr").unbind('click');
	obj.find(".zt input:checkbox").click(function() {
		var zs, zje, key;
		if ($(this).prop("checked")==false) {
		   //$(this).parent().parent().find("td").css("text-decoration","line-through");
		   //$(this).parent().parent().find("input:text").prop("disabled",true);
		   //$(this).html("恢复");
		  // $(this).css("color","gray");
		   zs = Number(obj.find("#bcount").attr('v'))-1;
		   zje = Number(obj.find("#btotal").attr('v'))-Number($(this).parent().parent().find("input:text").val());
	obj.find("#bcount").html("注数："+zs);
	obj.find("#btotal").html("总金额："+zje);
	obj.find("#bcount").attr('v',zs);
	obj.find("#btotal").attr('v',zje);
	    key = Number($(this).parent().parent().find("td:eq(0)").html())-1;
		psend[key]['sc'] = 1;
	      
		}else{
		   //$(this).parent().parent().find("td").css("text-decoration","none");
		   //$(this).parent().parent().find("input:text").prop("disabled",false);
		   //$(this).html("删除");
		   //$(this).css("color","blue");
		   zs = Number(obj.find("#bcount").attr('v'))+1;
		   zje = Number(obj.find("#btotal").attr('v'))+Number($(this).parent().parent().find("input:text").val());
	obj.find("#bcount").html("注数："+zs);
	obj.find("#btotal").html("总金额："+zje);
	obj.find("#bcount").attr('v',zs);
	obj.find("#btotal").attr('v',zje);
	    key = Number($(this).parent().parent().find("td:eq(0)").html())-1;
		psend[key]['sc'] = 0;
		}
	});
	obj.find("td.amount input").keyup(function(){
		$(this).val($(this).val().replace(/\D/g,''));
	}).keypress(function(){
		$(this).val($(this).val().replace(/\D/g,''));
	});
    $(".sendtb td",parent.document).hover(function(){
	    $(this).parent().find("td").addClass('hover');
	},function(){
	    $(this).parent().find("td").removeClass('hover');
	});
	$(".ui-fronts",parent.document).show();
	obj.show();
    obj.find(".qr").show();
	obj.find("button:eq(2)").show();
	obj.find(".plts").show();
	obj.find(".cgts").hide();
	obj.find(".cgts").css("color","red");
	obj.find(".qr").click(function() {
		obj.find("button").prop("disabled", true);
		var pstr = '[';
		for (i = 0; i < psend.length; i++) {
			if (i != 0) pstr += ',';
			psend[i]['je'] = obj.find(".s"+i+" .amount").find("input").val();
			pstr += json_encode_js(psend[i])
		}
		pstr += ']';
		var abcd = $("#abcd",parent.document).val();
		var ab = $("a.ab.on").attr('v');
		var bid = $(".main a.click").attr("bid");

		var str = "&abcd=" + abcd + "&ab=" + ab + "&bid=" + bid;
		$.ajax({
			type: 'POST',
			url: mulu + 'makelib.php',
			data: 'xtype=make&pstr=' + pstr + str,
			dataType: 'json',
			async: false,
			cache: false,
			success: function(m) {
				//console.log(JSON.stringify(m));
				var ml = m.length;
				var gflag = false;
				var bflag = false;
				var err= false;
				var objs;
				for (i = 0; i < ml; i++) {
					objs = obj.find(".cg:eq(" + i + ")");
					objs.find("input:text").replaceWith(m[i]['je']);
					if (Number(m[i]['cg']) == 1) {
						if (Number(m[i]['cgs']) == 1) {
							objs.find("td.zt").html("赔率变更!");
							objs.find("td.zt").css("color","red");
							err=true;
						} else {
							objs.find("td.zt").html("成功!");
							objs.find("td.zt").css("color","green");
						}
						objs.find("td:eq(2)").html(m[i]['peilv1']);
						if (m[i]['name'] == '三中二' | m[i]['name'] == '二中特') {
							objs.find("td:eq(2)").html(objs.find("td:eq(2)").html() + "/" + m[i]['peilv2']);
						}
					} else {
						objs.find("td.zt").html(m[i]['err']);
						objs.find("td.zt").css("color","red");
						err=true;
					}
				}
				obj.find("button").prop("disabled", false);
				obj.find(".qr").hide();
				obj.find("button:eq(2)").hide();
				$(".cancel:eq(0)").click();
	obj.find(".plts").hide();
	if(!err){
		obj.find(".cgts").show();
	    setTimeout(function(){obj.hide();$(".ui-fronts",parent.document).hide();},2000);
	}
				play = new Array();
				psend= new Array();
				psend = null;
			
				$(".duoje").val('');
				$(".ggje").val('');
				getlast15();
				getusermoney();
			}
		});
		
	})
}


function gets(bid, bname) {
	if (bname.indexOf('特') != -1 & bname.indexOf('正') != -1) {
		$.ajax({
			type: 'POST',
			url: mulu + 'make.php',
			dataType: 'json',
			cache: false,
			data: 'xtype=gets&bid=' + bid,
			success: function(m) {
				var ml = m.length;
				$(".smenu td:eq(0)").find("input").remove();
				var str = '';
				for (i = 0; i < ml; i++) {
					str += "<a  href='javascript:void(0)' sid='" + m[i]['sid'] + "' class='sclass'>" + m[i]['name'] + "</a>";
				}
				$(".smenu").prepend(str);
				str = null;
				m = null;
				$(".smenu a.sclass:eq(0)").addClass('on');
				$(".smenu a.sclass").click(function() {
					$(".smenu a.sclass").removeClass('on');
					$(this).addClass('on');
					lib61();
					return false
				});
				lib61()
			}
		})
	} else if (bname == '過關' | bname == '过关') {
		libgg()
	} else {
		lib61()
	}
}




function lib61() {
	var bid = $(".main a.click").attr("bid");
	var abcd = $("#abcd", parent.document).val();
	var ab = $("a.ab.on").attr('v');
	var sid = $(".smenu").find('a.sclass.on').attr('sid');
	if (sid == undefined) sid = '';
	var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&sid=" + sid;
	var bname = $(".main a.click").html();

	$(".duotb").remove();
	$(".duotb2").remove();
	$(".exetb").show();
	$(".ggmesstb").hide();
	$(".duoexetb").hide();
	$(".make").html("");
	$(".table_zh2").html("");
	$("div.control").show();

	var stype = 'd';
	if (bname == '正特1~6') {
		stype = '1-6';
	}
			$(".fts").remove();
			$("#fts").remove();
    //alert('xtype=lib&stype=' + stype + sstr)
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=lib&stype=' + stype + sstr,
		success: function(m) {
			var ml = m.length;
			$(".make").hide('fast');
			$(".table_zh2").html('');
			$(".make").html('');
			//console.log(JSON.stringify(m))
			var strh = "<th>号码</th><th>赔率</th><th class='ha'>金额</th>";
			if(bname == '番摊' ){
                 str = '<table class="table_zh2 table_ball table_betbox fts" style="width:100%;clear:both"><tbody><tr class="head"><th colspan="12">正</th></tr></tbody></table><div class="game_w fts"><link href="../css/betft.css" type="text/css" rel="stylesheet"><table class="game_table" width="100%" border="0" cellspacing="5" cellpadding="0"><tbody><tr><td><table class="table_zh2 table_ball t3 table_betbox g_team tb_jiao" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name arrow_lt m97000029"></td><td class="odds"><a class="odds p97000029"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000029" type="text"></td></tr></tbody></table></td><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000015">3念4</td><td class="odds"><a class="odds p97000015"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000015" type="text"></td></tr></tbody></table></td><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000013">3念1</td><td class="odds"><a class="odds p97000013"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000013" type="text"></td></tr></tbody></table></td><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000014">3念2</td><td class="odds"><a class="odds p97000014"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000014" type="text"></td></tr></tbody></table></td><td><table class="table_zh2 table_ball t3 table_betbox g_team tb_jiao" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000028"></td><td class="odds"><a class="odds p97000028"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000028" type="text"></td></tr></tbody></table></td></tr><tr><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000018">4念3</td><td class="odds"><a class="odds p97000018"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000018" type="text"></td></tr></tbody></table></td><td colspan="3" rowspan="3"><div class="g_mid"><div class="g_l" access><img src="../imgn/g_left_top.png" usemap="#left_top" class="left_top"><map><area shape="poly" coords="2,10,2,65,76,63" href="javascript:void(0);" access><area shape="poly" coords="5,1,78,1,78,54,5,7,2,4" href="javascript:void(0);" access></map><div class="g_l_c ftdiv" access><p><span class="m97000034">4正</span>&nbsp;<span class="odds p97000034"><label>1.95</label></span></p><p><input type="text" class="betAmount i97000034"></p><i class="sec_l"></i></div><img src="../imgn/g_left_down.png" usemap="#left_down" class="left_down"><map><area shape="poly" coords="1,0,75,0,2,48" href="javascript:void(0);" access><area shape="poly" coords="78,5,78,65,2,65,0,62,2,50" href="javascript:void(0);" access></map></div><div class="g_m"><div class="g_m_t" access><div class="g_l_c ftdiv" access><p><span class="97000033">3正</span>&nbsp;<span class="odds p97000033"><label>1.95</label></span></p><p><input type="text" class="betAmount i97000033"></p><i class="sec_t"></i></div></div><div class="g_m_m"><table class="table_zh2 table_ball t3 table_betbox" width="100%" border="0" cellspacing="5" cellpadding="0" style="margin-bottom:0;border:1px solid #c6c6c8"><tbody><tr><td class="name m97000005"></td><td class="odds"><a class="odds p97000005"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000005" type="text"></td><td class="name m97000006"></td><td class="odds"><a class="odds p97000006"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000006" type="text"></td></tr><tr><td class="name m97000051"></td><td class="odds"><a class="odds p97000051"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000051" type="text"></td><td class="name m97000052"></td><td class="odds"><a class="odds p97000052"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000052" type="text"></td></tr></tbody></table></div><div class="g_m_b" access><div class="g_l_c ftdiv" access><p><span class="m97000031">1正</span>&nbsp;<span class="odds p97000031"><label>1.95</label></span></p><p><input type="text" class="betAmount i97000031"></p><i class="sec_r"></i></div></div></div><div class="g_r" access><img src="../imgn/g_right_top.png" usemap="#right_top" class="right_top"><map><area shape="poly" coords="0,55,77,60,76,10" href="javascript:void(0);" access><area shape="poly" coords="0,2,73,2,76,4,73,10,0,50" href="javascript:void(0);" access></map><div class="g_l_c ftdiv" access><p><span class="m97000032">2正</span>&nbsp;<span class="odds p97000032"><label>1.95</label></span></p><p><input type="text" class="betAmount i97000032"></p><i class="sec_d"></i></div><img src="../imgn/g_right_down.png" usemap="#right_down" class="right_down"><map><area shape="poly" coords="2,0,77,0,77,45,74,45,2,2" href="javascript:void(0);" access><area shape="poly" coords="0,6,72,50,73,58,70,65,0,65" href="javascript:void(0);" access></map></div></div></td><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000011">2念3</td><td class="odds"><a class="odds p97000011"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000011" type="text"></td></tr></tbody></table></td></tr><tr><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000017">4念2</td><td class="odds"><a class="odds p97000017"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000017" type="text"></td></tr></tbody></table></td><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000012">2念4</td><td class="odds"><a class="odds p97000012"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000012" type="text"></td></tr></tbody></table></td></tr><tr><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000016">4念1</td><td class="odds"><a class="odds p97000016"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000016" type="text"></td></tr></tbody></table></td><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000010">2念1</td><td class="odds"><a class="odds p97000010"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000010" type="text"></td></tr></tbody></table></td></tr><tr><td><table class="table_zh2 table_ball t3 table_betbox g_team tb_jiao" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name arrow_lb m97000030"></td><td class="odds"><a class="odds p97000030"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000030" type="text"></td></tr></tbody></table></td><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000009">1念4</td><td class="odds"><a class="odds p97000009"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000009" type="text"></td></tr></tbody></table></td><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000008">1念3</td><td class="odds"><a class="odds p97000008"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000008" type="text"></td></tr></tbody></table></td><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000007">1念2</td><td class="odds"><a class="odds p97000007"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000007" type="text"></td></tr></tbody></table></td><td><table class="table_zh2 table_ball t3 table_betbox g_team tb_jiao" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000027"></td><td class="odds"><a class="odds p97000027"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000027" type="text"></td></tr></tbody></table></td></tr></tbody></table></div><table class="table_zh2 table_ball t3 table_betbox fts"><thead><tr><th colspan="12">番</th></tr></thead><tbody><tr><td class="name m97000001"></td><td class="odds"><a class="odds p97000001"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000001" type="text"></td><td class="name m97000002"></td><td class="odds"><a class="odds p97000002"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000002" type="text"></td><td class="name m97000003"></td><td class="odds"><a class="odds p97000003"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000003" type="text"></td><td class="name m97000004"></td><td class="odds"><a class="odds p97000004"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000004" type="text"></td></tr></tbody></table><table class="table_zh2 table_ball t3 table_betbox fts"><thead><tr><th colspan="12">中</th></tr></thead><tbody><tr><td class="name m97000047"></td><td class="odds"><a class="odds p97000047"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000047" type="text"></td><td class="name m97000048"></td><td class="odds"><a class="odds p97000048"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000048" type="text"></td><td class="name m97000049"></td><td class="odds"><a class="odds p97000049"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000049" type="text"></td><td class="name m97000050"></td><td class="odds"><a class="odds p97000050"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000050" type="text"></td></tr></tbody></table><table class="table_zh2 table_ball t3 table_betbox fts"><thead><tr><th colspan="12">通</th></tr></thead><tbody><tr><td class="name m97000035"></td><td class="odds"><a class="odds p97000035"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000035" type="text"></td><td class="name m97000038"></td><td class="odds"><a class="odds p97000038"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000038" type="text"></td><td class="name m97000041"></td><td class="odds"><a class="odds p97000041"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000041" type="text"></td><td class="name m97000044"></td><td class="odds"><a class="odds p97000044"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000044" type="text"></td></tr><tr><td class="name m97000036"></td><td class="odds"><a class="odds p97000036"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000036" type="text"></td><td class="name m97000039"></td><td class="odds"><a class="odds p97000039"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000039" type="text"></td><td class="name m97000042"></td><td class="odds"><a class="odds p97000042"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000042" type="text"></td><td class="name m97000045"></td><td class="odds"><a class="odds p97000045"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000045" type="text"></td></tr><tr><td class="name m97000037"></td><td class="odds"><a class="odds p97000037"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000037" type="text"></td><td class="name m97000040"></td><td class="odds"><a class="odds p97000040"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000040" type="text"></td><td class="name m97000043"></td><td class="odds"><a class="odds p97000043"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000043" type="text"></td><td class="name m97000046"></td><td class="odds"><a class="odds p97000046"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000046" type="text"></td></tr></tbody></table><table class="table_zh2 table_ball t3 table_betbox fts"><thead><tr><th colspan="12">加</th></tr></thead><tbody><tr><td class="name m97000019"></td><td class="odds"><a class="odds p97000019"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000019" type="text"></td><td class="name m97000020"></td><td class="odds"><a class="odds p97000020"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000020" type="text"></td><td class="name m97000021"></td><td class="odds"><a class="odds p97000021"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000021" type="text"></td><td class="name m97000022"></td><td class="odds"><a class="odds p97000022"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000022" type="text"></td></tr><tr><td class="name m97000023"></td><td class="odds"><a class="odds p97000023"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000023" type="text"></td><td class="name m97000024"></td><td class="odds"><a class="odds p97000024"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000024" type="text"></td><td class="name m97000025"></td><td class="odds"><a class="odds p97000025"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000025" type="text"></td><td class="name m97000026"></td><td class="odds"><a class="odds p97000026"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000026" type="text"></td></tr></tbody></table>';
                 $(".make").before(str);
				 $(".make").html('');
				 
				 for (i = 0; i < ml; i++) {
				 	 if(m[i]['ifok']=='1'){
                         $(".p"+m[i]['pid']).find("label").html(m[i]['peilv1']);
                     }else{
                         $(".p"+m[i]['pid']).find("label").html('-');
                         $(".i"+m[i]['pid']).attr("disabled","disabled");
                     }
                     $(".m"+m[i]['pid']).html(m[i]['name']);
                     $(".m"+m[i]['pid']).attr('pid',m[i]['pid']);
                     $(".i"+m[i]['pid']).attr('pid',m[i]['pid']);
                     $(".p"+m[i]['pid']).attr('pid',m[i]['pid']);
                     $(".p"+m[i]['pid']).attr('sname',m[i]['sname']);
                     $(".p"+m[i]['pid']).attr('cname',m[i]['cname']);
                     $(".p"+m[i]['pid']).attr('mname',m[i]['name']);
                     $(".p"+m[i]['pid']).attr('maxje',m[i]['maxje']);
                     $(".p"+m[i]['pid']).attr('minje',m[i]['minje']);
                 }
			}else if (bname == '特碼' | bname == '正特' | bname == '正碼' ) {
				var str = "<tr class='head'>" + strh + strh + strh + strh + strh + "</tr><tr>";
				var strzh = "<tr class='head'>" + strh + strh + strh + strh + "</tr><tr>";
				var strtmp = '';
				if (bname == '正碼') {
					key = [0, 10, 20, 30, 40, 1, 11, 21, 31, 41, 2, 12, 22, 32, 42, 3, 13, 23, 33, 43, 4, 14, 24, 34, 44, 5, 15, 25, 35, 45, 6, 16, 26, 36, 46, 7, 17, 27, 37, 47, 8, 18, 28, 38, 48, 9, 19, 29, 39, 88, 49, 50, 51, 52];
				}else {
					key = [0, 10, 20, 30, 40, 1, 11, 21, 31, 41, 2, 12, 22, 32, 42, 3, 13, 23, 33, 43, 4, 14, 24, 34, 44, 5, 15, 25, 35, 45, 6, 16, 26, 36, 46, 7, 17, 27, 37, 47, 8, 18, 28, 38, 48, 9, 19, 29, 39, 88, 49, 51, 53, 55, 50, 52, 54, 56, 57, 58, 59, 60,61,62,63,88];
				    //key = [0, 10, 20, 30, 40, 1, 11, 21, 31, 41, 2, 12, 22, 32, 42, 3, 13, 23, 33, 43, 4, 14, 24, 34, 44, 5, 15, 25, 35, 45, 6, 16, 26, 36, 46, 7, 17, 27, 37, 47, 8, 18, 28, 38, 48, 9, 19, 29, 39, 88, 49, 51, 53, 55, 50, 52, 54, 56, 57, 58, 59, 88];
				}
				ck = key.length;
				var i = 0;
				for (j = 0; j < ck; j++) {
					i = key[j];
					if (j % 5 == 0 & j != 0 & j <= 49) {
						str += "</tr><tr>";
					}
					if ((j - 50) % 4 == 0 & j != 0 & j > 49) {
						strzh += "</tr><tr>";
					}
					if (i == 88) {
						strtmp = "<td></td><td></td><td></td>";
					} else {
						if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
						strtmp = "<th class='name m m" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "'  >" + qiu(m[i]['name']) + "</th>";
						strtmp += "<td class='odds p p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + rpeilv(m[i]['peilv1'], m[i]['ifok']) + "</label></td>";
						strtmp += "<TD class='amount i i" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "'><input type='text' class='ba' ";
						if (Number(m[i]['ifok']) == 0) strtmp += "disabled";
						strtmp += " /></td>";
					}
					if (j <= 49) {
						str += strtmp;
					} else if (j > 49) {
						strzh += strtmp;
					}
				}
				str += "</tr>";
				strzh += "</tr>";
				$(".make").html(str);
				$(".table_zh2").html(strzh);
				str = null;
				strzh = null;

			} else 	if ( bname == '总肖七色波') {

				var strzh = "<tr class='head'>" + strh + strh + strh + strh + "</tr><tr>";
				var strtmp = '';
				key = [0,1,2,3,4,5,6,7,8,9,10,11];
				ck = key.length;
				var i = 0;
				for (j = 0; j < ck; j++) {
					i = key[j];
					if (j % 4 == 0 & j != 0 ) {
						strzh += "</tr><tr>";
					}
	
					if (i == 88) {
						strtmp = "<td></td><td></td><td></td>";
					} else {
						if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
						strtmp = "<th class='name m m" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "'  >" + qiu(m[i]['name']) + "</th>";
						strtmp += "<td class='odds p p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + rpeilv(m[i]['peilv1'], m[i]['ifok']) + "</label></td>";
						strtmp += "<TD class='amount i i" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "'><input type='text' class='ba' ";
						if (Number(m[i]['ifok']) == 0) strtmp += "disabled";
						strtmp += " /></td>";
					}
					strzh += strtmp;
				}
				strzh += "</tr>";
	
				$(".make").html(strzh);
	
				strzh = null;

			}else if ( bname == '特肖' | bname == '半波' | bname == '五行' | bname == '一肖' | bname == '尾數' | bname == '正肖'  | bname == '特头尾' ) {
				var str = "<tr class='head'><th>" + bname + "</th><th>号码</th><th>赔率</th><th class='ha'>金额</th></tr>";
				for (i = 0; i < ml; i++) {
					str += "<tr>"
					str += "<th class='name m m" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "'  >" + m[i]['name'] + "</th>";
					str += "<td class='balls right5 img img" + m[i]['pid'] + "'   pid='" + m[i]['pid'] + "' >" + img(m[i]['name'], bname) + "</td>";
					str += "<td class='odds p p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + rpeilv(m[i]['peilv1'], m[i]['ifok']) + "</label></td>";
					str += "<TD class='amount i i" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "'><input type='text' class='ba' ";
					if (Number(m[i]['ifok']) == 0) str += "disabled";
					str += " /></td>";
					str += "</tr>"
				}
				$(".make").html(str);
			}else if (bname == '合肖' | bname == '連碼' | bname == '不中' | bname == '生肖連' | bname == '尾數連') {
				var tmp = '';
				var str = "";
				str += "<tr>";
				var trl = 4;
				if (bname == '合肖') trl = 4;
				if (bname == '連碼') trl = 3;
				var j=0;
				for (i = 0; i < ml; i++) {
					if (j % trl == 0 & j != 0) str += "</tr><tr>";
					if(j==11){
						str += "</tr><tr>";
						j=0;
					}

					str += "<th class='name m m" + m[i]['pid'] + " " + bj(m[i]['name']) + "'  pid='" + m[i]['pid'] + "'   style='width:80px;'>" + m[i]['name'];
					if (m[i]['name'] == '三中二') str += "<BR />(中二/中三)";
					if (m[i]['name'] == '二中特') str += "<BR />(中二/中特)";
					str += "</th>";
					str += "<td class='odds img" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "'><input pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'  znum1='" + m[i]['znum1'] + "' type='radio' name='xz' class='xz xz" + m[i]['pid'] + "' ";
					if (Number(m[i]['ifok']) == 0) {
						str += "disabled"
					}
					str += " />";
					str += "</td>";
					j++;
				}
				str += "</tr>";
				$(".make").html(str);
			} else if (bname == '正特1~6') {
				var tmp = '';
				var str = "";
				str += "<tr class='head'>";
				str += "<th>项目</th>";
				for (i = 0; i < ml; i += 15) {
					str += "<th colspan=2 class='bt' >" + m[i]['sname'] + "</th>"
				}
				str += "</tr>";
				var i;
				for (j = 0; j < 15; j++) {
					str += "<tr>";
					str += "<th class='name'>" + m[j]['name'] + "</th>";
					for (k = 0; k < 6; k++) {
						i = j + k * 15;
						if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
						str += "<th class='hide name m m" + m[i]['pid'] + " " + bj(m[i]['name']) + "'  pid='" + m[i]['pid'] + "'  >" + m[i]['name'] + "</th>";
						str += "<td class='odds p p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "'  sname='" + m[i]['sname'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + rpeilv(m[i]['peilv1'], m[i]['ifok']) + "</label></td>";

						str += "<TD class='amount ha i" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "'><input type='text' class='ba' ";
						if (Number(m[i]['ifok']) == 0) str += "disabled";
						str += " /></td>";
					}
					str += "</tr>";
				}

				$(".make").html(str);


			}



			$(".make").show('fast');
			str = null;
			m = null;
			if (bname == '合肖' | bname == '連碼' | bname == '不中' | bname == '生肖連' | bname == '尾數連') {
				duofunc();
			} else {
				addfunc();
				$(".fts").addClass("lists");
			}
		}
	})
}

function libgg() {
	var bid = $(".main a.click").attr("bid");
	var abcd = $("#abcd", parent.document).val();
	var ab = $("a.ab.on").attr('v');
	var sid = $(".smenu").find('a.sclass.on').attr('sid');
	if (sid == undefined) sid = bid;
	var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&sid=" + sid;
	var bname = $(".main a.click").html();
    
	$(".kuaijue").hide();
	$("div.control").hide();
	$(".duotb").remove();
	$(".duotb2").remove();
	$(".exetb").show();
	$(".ggmesstb").show();
	$(".duoexetb").hide();
	$(".make").html("");
	$(".table_zh2").html("");
			$(".fts").remove();
			$("#fts").remove();
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=lib&stype=gg' + sstr,
		success: function(m) {
			var ml = m.length;
			if (m[0]['ifok'] == 0) {
				var str = "<tr><td>未开盘</td></tr>";
				$(".make").html(str);
				$(".make").show('fast');
			} else {
				var str = "";
				str += "<tr class='head'><th minje='" + m[0]['minje'] + "' maxje='" + m[0]['maxje'] + "' pid='" + m[0]['pids'] + "'>过关</th>";
				var ml6 = ml / 6;
				for (i = 0; i < ml6; i++) {
					str += "<th>" + m[i]['name'] + "</th>"
				}
				str += "</tr>";
				for (i = 0; i < 6; i++) {
					str += "<tr>";
					str += "<th class='name'>" + m[i * ml6]['sname'] + "</th>";
					for (j = 0; j < ml6; j++) {
						str += "<td class='peilv1 odds' sid='" + m[i * ml6 + j]['sid'] + "' pid='" + m[i * ml6 + j]['pid'] + "'  cid='" + m[i * ml6 + j]['cid'] + "'>" + m[i * ml6 + j]['peilv1'] + "</td>"
					}
					str += "</tr>"
				}
				$(".make").html(str);
				str = null;
				m = null;
				$(".make").show('fast');
				$('.make td').hover(function() {
					$(this).addClass('hover');
				}, function() {
					$(this).removeClass('hover');
				});
				$(".make .peilv1").click(function() {
					$(this).toggleClass('selected');
					if ($(this).parent().find("td.selected").length > 2) {
						$(this).removeClass('selected');
						alert("每个正特至多选择二项");
					}
					var peilv = 1;
					$(".make .selected").each(function() {
						peilv *= Number($(this).html())
					});
					$(".ggpeilv").html(getResult(peilv, 4))
				});
			}
			str = null;
			m = null;
		}
	})
}

function duofunc() {
	$("div.control").hide();
	$(".kuaijue").hide();
	$(".make").find("input.xz").change(function() {
		var pid = $(this).attr('pid');
		var pname = $(this).attr('mname');
	var ab = $("a.ab.on").attr('v');
	var abcd = $("#abcd", parent.document).val();
		var sstr = "&pid=" + pid+"&abcd="+abcd+"&ab="+ab;
		$(".duoexetb a.mode:eq(0)").click();
		$(".duotb").remove();
		$(".duotb2").remove();
		$(".exetb").show();
		$(".ggmesstb").hide();
		$(".duoexetb").show();
		$(".table_zh2").html("");
		var bname = $(".main a.click").html();
		$.ajax({
			type: 'POST',
			url: mulu + 'make.php',
			dataType: 'json',
			cache: false,
			data: 'xtype=duolib' + sstr,
			success: function(m) {
				//$("#test").html(m);return;
				var str = "<table class='table_ball duotb lists'><tr class='head'>";
				var ml = m[0].length;
				if (ml <= 12) {
					str += "<th>项目</th><th>号码</th><th>赔率</th><th>项目</th><th>号码</th><th>赔率</th></tr><tr>";
					for (i = 0; i < ml; i++) {
						str += "<th class='name names n m" + i + "' i=" + i + ">" + m[0][i] + "</th>";
						if (pname.indexOf('肖') != -1 | pname.indexOf('尾') != -1) str += "<td class='balls right5 n m" + i + "' i=" + i + ">" + img(m[0][i], bname) + "</td>";
						str += "<td class='odds n m" + i + "' i=" + i + " ><label class='peilv1'>" + m[1][i] + "</label></td>";
						if (ml == 12) {
							if ((i + 1) % 2 == 0) {
								str += "</tr><tr>"
							}
						} else if (ml == 10) {
							if ((i + 1) % 2 == 0) {
								str += "</tr><tr>"
							}
						} else {
							if ((i + 1) % 10 == 0) {
								str += "</tr><tr>"
							}
						}
					}
				} else {
					str += "<th>号码</th><th>赔率</th><th>号码</th><th>赔率</th><th>号码</th><th>赔率</th><th>号码</th><th>赔率</th><th>号码</th><th>赔率</th></tr><tr>";
					key = [0, 10, 20, 30, 40, 1, 11, 21, 31, 41, 2, 12, 22, 32, 42, 3, 13, 23, 33, 43, 4, 14, 24, 34, 44, 5, 15, 25, 35, 45, 6, 16, 26, 36, 46, 7, 17, 27, 37, 47, 8, 18, 28, 38, 48, 9, 19, 29, 39];
					var i = 0;
					for (k = 0; k < ml; k++) {
						i = key[k];
						str += "<td class='name names n m" + i + "' i=" + i + ">" + qiu(m[0][i]) + "</td>";
						if (pname == '三中二' | pname == '二中特') str += "<td class='odds n m" + i + "' i=" + i + "><label class='peilv1'>" + m[1][i] + "</label><BR /><label class='peilv2'>" + m[2][i] + "</label></td>";
						else str += "<td class='odds n m" + i + "' i=" + i + "><label class='peilv1'>" + m[1][i] + "</label></td>";

						if ((k + 1) % 5 == 0) {
							str += "</tr><tr>"
						}

					}
				}

				str += "</tr></table>";
				$(".duoexetb").after(str);
				str = null;
				m = null;
				$(".duotb").after($(".duotb2str").val());
				$(".duotb").css("margin-top", 5);
				$(".duotb2").css("margin-top", 5);

				$(".duotb2 tr.m td").each(function(i) {
					var htm = $(this).html();
					if (!isNaN(htm)) {
						$(this).html(qiu(htm));
						$(this).addClass('names');
					}else{
					    $(this).addClass('names');
					} 
				});
				$('.duotb .n').hover(function() {
					var i = $(this).attr('i');
					$(".duotb .m" + i).addClass('hover');
				}, function() {
					var i = $(this).attr('i');
					$(".duotb .m" + i).removeClass('hover');
				});

				$('.duotb2 tr.m td').hover(function() {
					$(this).addClass('hover');
				}, function() {
					$(this).removeClass('hover');
				});

				$('.duotb .n').click(function() {
					var i = $(this).attr('i');
					var mode = Number($(".duoexetb .on").attr('mode'));

					if ($(this).hasClass('selected')) {
						$(".duotb .m" + i).removeClass('selected');
					} else {
						$(".duotb .m" + i).addClass('selected');
					}
					if (mode == 2) {

						var ppname = $(".make input.xz:checked").attr('mname');

						if (ppname == '三中二') {
							var num = 3;
						} else {
							var num = Number($(".make input.xz:checked").attr('znum1'));
						}
						if ($(".duotb .names.selected").length > (num - 1)) {
							$(".duotb .m" + i).removeClass('selected');
							alert(ppname + "拖头模式【头】最多只能选择" + (num - 1) + "个");
							return false;
						}
						var f = false;
						var htm = $(".duotb .name.m" + i).html();
						$(".duotb2 .selected").each(function() {
							if ($(this).html() == htm) {
								f = true
							}
						});
						if (f) {
							alert("头和拖不能选择同样号码!");
							$(".duotb .m" + i).removeClass('selected');
							return false;
						}
					}

				});


				$(".duotb2 tr.m td").click(function() {
					var mode = Number($(".duoexetb .on").attr('mode'));
					var num;
					if (mode == 2) {
						$(this).toggleClass('selected2');
						var f = false;
						var htm = $(this).html();
						$(".duotb .name.selected").each(function() {
							if ($(this).html() == htm) {
								f = true
							}
						});
						if (f) {
							alert("头和拖不能选择同样号码!");
							$(this).removeClass('selected2')
						}
					} else if (mode == 3) {
						var tmp = $(this).parent().parent().find("th:eq(0)").html();
						if (tmp.indexOf('對') != -1 | tmp.indexOf('对') != -1) {
							$(this).toggleClass('selected');
							num = $(".duotb2 .selected").length;
							if (num > 1) {
								$(this).removeClass('selected');
								alert("只能选择一个对碰项目")
							}
							if ($(".duotb2 .selected2").html() == $(this).html()) {
								$(this).removeClass('selected');
								alert("不能同时选择" + $(this).html())
							}
						} else {
							$(this).toggleClass('selected2');
							num = $(".duotb2 .selected2").length;
							if (num > 1) {
								$(this).removeClass('selected2');
								alert("只能选择一个对碰项目")
							}
							if ($(".duotb2 .selected").html() == $(this).html()) {
								$(this).removeClass('selected2');
								alert("不能同时选择" + $(this).html())
							}
						}
					} else if (mode == 4) {
						var tmp = $(this).parent().parent().find("th:eq(0)").html();
						if (tmp.indexOf('對') != -1 | tmp.indexOf('对') != -1) {
							$(this).toggleClass('selected');
							num = $(".duotb2 .selected").length;
							if (num > 1) {
								$(this).removeClass('selected');
								alert("只能选择一个对碰项目")
							}
							if ($(".duotb2 .selected2").html() == $(this).html()) {
								$(this).removeClass('selected');
								alert("不能同时选择" + $(this).html())
							}
						} else {
							$(this).toggleClass('selected2');
							num = $(".duotb2 .selected2").length;
							if (num > 1) {
								$(this).removeClass('selected2');
								alert("只能选择一个对碰项目")
							}
							if ($(".duotb2 .selected").html() == $(this).html()) {
								$(this).removeClass('selected2');
								alert("不能同时选择" + $(this).html())
							}
						}
					} else if (mode == 5) {
						var tmp = $(this).parent().parent().find("th:eq(0)").html();
						if (tmp.indexOf('尾') != -1) {
							$(this).toggleClass('selected');
							num = $(".duotb2 .selected").length;
							if (num > 1) {
								$(this).removeClass('selected');
								alert("只能选择一个对碰项目")
							}
						} else {
							$(this).toggleClass('selected2');
							num = $(".duotb2 .selected2").length;
							if (num > 1) {
								$(this).removeClass('selected2');
								alert("只能选择一个对碰项目")
							}
						}
					}
				});
				$(".duotr").hide();
				if (pname == '特串' | pname == '二中特' | pname == '二全中') {
					$(".duoexetb a.mode:eq(2)").show();
					$(".duoexetb a.mode:eq(3)").show();
					$(".duoexetb a.mode:eq(4)").show()
				} else {
					$(".duoexetb a.mode:eq(2)").hide();
					$(".duoexetb a.mode:eq(3)").hide();
					$(".duoexetb a.mode:eq(4)").hide()
				}

			}
		})
	})
}

function transm(v) {
	if (isNaN(v)) return v;
	else return "<img src='../imgs/" + v + ".gif' />"
}



function img(v, bn) {
	var img = '';
	arrs = [];
	arrs = sma[v];
	var tmp;
	for (var i in arrs) {
		tmp = Number(arrs[i]) < 10 ? '0' + arrs[i] : arrs[i];		
		if ((bn == '半波' || bn == '合肖') & tmp == 49) img += '';
		else img += qiu(tmp);
	}
	return img
}

function bj(v) {
	if (!isNaN(v)) return 'no';
	else return '';
}

function isoma(v) {
	v = Number(v);
	if (v < 10) v = '0' + v;
	return v
}

function colorm(m) {
	if ($.inArray(m, sma['紅']) != -1) return "red";
	if ($.inArray(m, sma['藍']) != -1) return "blue";
	if ($.inArray(m, sma['綠']) != -1) return "green"
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

function strtoma(words) {
	words = words.replace(/s2/ig, "," + sma['牛'].join(',') + ",");
	words = words.replace(/s3/ig, "," + sma['虎'].join(',') + ",");
	words = words.replace(/s4/ig, "," + sma['兔'].join(',') + ",");
	words = words.replace(/s5/ig, "," + sma['龍'].join(',') + ",");
	words = words.replace(/s6/ig, "," + sma['蛇'].join(',') + ",");
	words = words.replace(/s7/ig, "," + sma['馬'].join(',') + ",");
	words = words.replace(/s8/ig, "," + sma['羊'].join(',') + ",");
	words = words.replace(/s9/ig, "," + sma['猴'].join(',') + ",");
	words = words.replace(/s10/ig, "," + sma['雞'].join(',') + ",");
	words = words.replace(/s11/ig, "," + sma['狗'].join(',') + ",");
	words = words.replace(/s12/ig, "," + sma['豬'].join(',') + ",");
	words = words.replace(/s1/ig, "," + sma['鼠'].join(',') + ",");
	words = words.replace(/牛/g, "," + sma['牛'].join(',') + ",");
	words = words.replace(/虎/g, "," + sma['虎'].join(',') + ",");
	words = words.replace(/兔/g, "," + sma['兔'].join(',') + ",");
	words = words.replace(/龍/g, "," + sma['龍'].join(',') + ",");
	words = words.replace(/蛇/g, "," + sma['蛇'].join(',') + ",");
	words = words.replace(/馬/g, "," + sma['馬'].join(',') + ",");
	words = words.replace(/羊/g, "," + sma['羊'].join(',') + ",");
	words = words.replace(/猴/g, "," + sma['猴'].join(',') + ",");
	words = words.replace(/雞/g, "," + sma['雞'].join(',') + ",");
	words = words.replace(/狗/g, "," + sma['狗'].join(',') + ",");
	words = words.replace(/豬/g, "," + sma['豬'].join(',') + ",");
	words = words.replace(/鼠/g, "," + sma['鼠'].join(',') + ",");
	words = words.replace(/龙/g, "," + sma['龍'].join(',') + ",");
	words = words.replace(/马/g, "," + sma['馬'].join(',') + ",");
	words = words.replace(/鸡/g, "," + sma['雞'].join(',') + ",");
	words = words.replace(/猪/g, "," + sma['豬'].join(',') + ",");
	words = words.replace(/0尾/g, "," + sma['0尾'].join(',') + ",");
	words = words.replace(/1尾/g, "," + sma['1尾'].join(',') + ",");
	words = words.replace(/2尾/g, "," + sma['2尾'].join(',') + ",");
	words = words.replace(/3尾/g, "," + sma['3尾'].join(',') + ",");
	words = words.replace(/4尾/g, "," + sma['4尾'].join(',') + ",");
	words = words.replace(/5尾/g, "," + sma['5尾'].join(',') + ",");
	words = words.replace(/6尾/g, "," + sma['6尾'].join(',') + ",");
	words = words.replace(/7尾/g, "," + sma['7尾'].join(',') + ",");
	words = words.replace(/8尾/g, "," + sma['8尾'].join(',') + ",");
	words = words.replace(/9尾/g, "," + sma['9尾'].join(',') + ",");
	words = words.replace(/w0/ig, "," + sma['0尾'].join(',') + ",");
	words = words.replace(/w1/ig, "," + sma['1尾'].join(',') + ",");
	words = words.replace(/w2/ig, "," + sma['2尾'].join(',') + ",");
	words = words.replace(/w3/ig, "," + sma['3尾'].join(',') + ",");
	words = words.replace(/w4/ig, "," + sma['4尾'].join(',') + ",");
	words = words.replace(/w5/ig, "," + sma['5尾'].join(',') + ",");
	words = words.replace(/w6/ig, "," + sma['6尾'].join(',') + ",");
	words = words.replace(/w7/ig, "," + sma['7尾'].join(',') + ",");
	words = words.replace(/w8/ig, "," + sma['8尾'].join(',') + ",");
	words = words.replace(/w9/ig, "," + sma['9尾'].join(',') + ",");
	words = words.replace(/0头/g, ",1,2,3,4,5,6,7,8,9,");
	words = words.replace(/1头/g, ",10,11,12,13,14,15,16,17,18,19,");
	words = words.replace(/2头/g, ",20,21,22,23,24,25,26,27,28,29,");
	words = words.replace(/3头/g, ",30,31,32,33,34,35,36,37,38,39,");
	words = words.replace(/4头/g, ",40,41,42,43,44,45,46,47,48,49,");
	words = words.replace(/t0/ig, ",1,2,3,4,5,6,7,8,9,");
	words = words.replace(/t1/ig, ",10,11,12,13,14,15,16,17,18,19,");
	words = words.replace(/t2/ig, ",20,21,22,23,24,25,26,27,28,29,");
	words = words.replace(/t3/ig, ",30,31,32,33,34,35,36,37,38,39,");
	words = words.replace(/t4/ig, ",40,41,42,43,44,45,46,47,48,49,");
	words = words.replace(/红单/g, "," + sma['紅單'].join(',') + ",");
	words = words.replace(/蓝单/g, "," + sma['藍單'].join(',') + ",");
	words = words.replace(/绿单/g, "," + sma['綠單'].join(',') + ",");
	words = words.replace(/红双/g, "," + sma['紅雙'].join(',') + ",");
	words = words.replace(/蓝双/g, "," + sma['藍雙'].join(',') + ",");
	words = words.replace(/绿双/g, "," + sma['綠雙'].join(',') + ",");
	words = words.replace(/红大/g, "," + sma['紅大'].join(',') + ",");
	words = words.replace(/蓝大/g, "," + sma['藍大'].join(',') + ",");
	words = words.replace(/绿大/g, "," + sma['綠大'].join(',') + ",");
	words = words.replace(/红小/g, "," + sma['紅小'].join(',') + ",");
	words = words.replace(/蓝小/g, "," + sma['藍小'].join(',') + ",");
	words = words.replace(/绿小/g, "," + sma['綠雙'].join(',') + ",");
	words = words.replace(/红/g, "," + sma['紅'].join(',') + ",");
	words = words.replace(/蓝/g, "," + sma['藍'].join(',') + ",");
	words = words.replace(/绿/g, "," + sma['綠'].join(',') + ",");
	words = words.replace(/紅單/g, "," + sma['紅單'].join(',') + ",");
	words = words.replace(/藍單/g, "," + sma['藍單'].join(',') + ",");
	words = words.replace(/綠單/g, "," + sma['綠單'].join(',') + ",");
	words = words.replace(/紅雙/g, "," + sma['紅雙'].join(',') + ",");
	words = words.replace(/藍雙/g, "," + sma['藍雙'].join(',') + ",");
	words = words.replace(/綠雙/g, "," + sma['綠雙'].join(',') + ",");
	words = words.replace(/紅大/g, "," + sma['紅大'].join(',') + ",");
	words = words.replace(/藍大/g, "," + sma['藍大'].join(',') + ",");
	words = words.replace(/綠大/g, "," + sma['綠大'].join(',') + ",");
	words = words.replace(/紅小/g, "," + sma['紅小'].join(',') + ",");
	words = words.replace(/藍小/g, "," + sma['藍小'].join(',') + ",");
	words = words.replace(/綠小/g, "," + sma['綠雙'].join(',') + ",");
	words = words.replace(/紅/g, "," + sma['紅'].join(',') + ",");
	words = words.replace(/藍/g, "," + sma['藍'].join(',') + ",");
	words = words.replace(/綠/g, "," + sma['綠'].join(',') + ",");
	words = words.replace(/hongdan/ig, "," + sma['紅單'].join(',') + ",");
	words = words.replace(/landan/ig, "," + sma['藍單'].join(',') + ",");
	words = words.replace(/lvdan/ig, "," + sma['綠單'].join(',') + ",");
	words = words.replace(/hongshuang/ig, "," + sma['紅雙'].join(',') + ",");
	words = words.replace(/lanshuang/ig, "," + sma['藍雙'].join(',') + ",");
	words = words.replace(/lvshuang/ig, "," + sma['綠雙'].join(',') + ",");
	words = words.replace(/hongda/ig, "," + sma['紅大'].join(',') + ",");
	words = words.replace(/landa/ig, "," + sma['藍大'].join(',') + ",");
	words = words.replace(/lvda/ig, "," + sma['綠大'].join(',') + ",");
	words = words.replace(/hongxiao/ig, "," + sma['紅小'].join(',') + ",");
	words = words.replace(/lanxiao/ig, "," + sma['藍小'].join(',') + ",");
	words = words.replace(/lvxiao/ig, "," + sma['綠雙'].join(',') + ",");
	words = words.replace(/hong/ig, "," + sma['紅'].join(',') + ",");
	words = words.replace(/lan/ig, "," + sma['藍'].join(',') + ",");
	words = words.replace(/lv/ig, "," + sma['綠'].join(',') + ",");
	words = words.replace(/尾大/g, "," + sma['尾大'].join(',') + ",");
	words = words.replace(/尾小/g, "," + sma['尾小'].join(',') + ",");
	words = words.replace(/合單/g, "," + sma['合單'].join(',') + ",");
	words = words.replace(/合雙/g, "," + sma['合雙'].join(',') + ",");
	words = words.replace(/家畜/g, "," + sma['家畜'].join(',') + ",");
	words = words.replace(/野獸/g, "," + sma['野獸'].join(',') + ",");
	words = words.replace(/前/g, "," + sma['前'].join(',') + ",");
	words = words.replace(/後/g, "," + sma['後'].join(',') + ",");
	words = words.replace(/合单/g, "," + sma['合單'].join(',') + ",");
	words = words.replace(/合双/g, "," + sma['合雙'].join(',') + ",");
	words = words.replace(/家畜/g, "," + sma['家畜'].join(',') + ",");
	words = words.replace(/野兽/g, "," + sma['野獸'].join(',') + ",");
	words = words.replace(/前/g, "," + sma['前'].join(',') + ",");
	words = words.replace(/后/g, "," + sma['後'].join(',') + ",");
	words = words.replace(/單/g, "," + sma['單'].join(',') + ",");
	words = words.replace(/雙/g, "," + sma['雙'].join(',') + ",");
	words = words.replace(/单/g, "," + sma['單'].join(',') + ",");
	words = words.replace(/双/g, "," + sma['雙'].join(',') + ",");
	words = words.replace(/大/g, "," + sma['大'].join(',') + ",");
	words = words.replace(/小/g, "," + sma['小'].join(',') + ",");
	words = words.replace(/wd/ig, "," + sma['尾大'].join(',') + ",");
	words = words.replace(/wx/ig, "," + sma['尾小'].join(',') + ",");
	words = words.replace(/hd/ig, "," + sma['合單'].join(',') + ",");
	words = words.replace(/hs/ig, "," + sma['合雙'].join(',') + ",");
	words = words.replace(/jc/ig, "," + sma['家畜'].join(',') + ",");
	words = words.replace(/ys/ig, "," + sma['野獸'].join(',') + ",");
	words = words.replace(/qian/ig, "," + sma['前'].join(',') + ",");
	words = words.replace(/hou/ig, "," + sma['後'].join(',') + ",");
	words = words.replace(/dan/ig, "," + sma['單'].join(',') + ",");
	words = words.replace(/shuang/ig, "," + sma['雙'].join(',') + ",");
	words = words.replace(/da/ig, "," + sma['大'].join(',') + ",");
	words = words.replace(/xiao/ig, "," + sma['小'].join(',') + ",");

	return words;
}
$(function() {
	$(".duoexetb a.mode").hide();
	$(".duoexetb a.mode:eq(0)").show();
	$(".duoexetb a.mode:eq(1)").show();
	$(".duoexetb a.mode").click(function() {
		var mode = Number($(this).attr('mode'));
		var bname = $(".main a.click").html();
		$(".duoexetb a.mode").removeClass('on');
		$(this).addClass('on');
		$(".duotb2 .selected2").removeClass('selected2');
		$(".duotb2 .selected").removeClass('selected');
		$(".duotb .selected2").removeClass('selected2');
		$(".duotb .selected").removeClass('selected');
		$("label.tuohao").hide();
		if (bname.indexOf('肖') != -1) {
			$(".duotr").hide();
			if (mode == 2) {
				$(".sxtr1").show();
				$("label.tuohao").show();
			} else {
				$(".sxtr1").hide();
			}
		} else if (bname.indexOf('尾') != -1) {
			$(".duotr").hide();
			if (mode == 2) {
				$(".wstr1").show();
				$("label.tuohao").show();
			} else {
				$(".wstr1").hide();
			}

		} else {
			if (mode == 1) {
				$(".duotr").hide()
			} else if (mode == 2) {
				$(".duotr").hide();
				$(".mtr").show()
			} else if (mode == 3) {
				$(".duotr").hide();
				$(".sxtr1").show();
				$(".sxtr2").show()
			} else if (mode == 4) {
				$(".duotr").hide();
				$(".wstr1").show();
				$(".wstr2").show()
			} else if (mode == 5) {
				$(".duotr").hide();
				$(".sxtr1").show();
				$(".wstr1").show()
			}
		}
	});

	$(".fasttb td").hover(function() {
		$(this).addClass('hover')
	}, function() {
		$(this).removeClass('hover')
	});
	$(".fasttb tr.m").hide();
    $(".fasttb tr.m td").each(function(){
    	if(!isNaN($(this).html())){
    		$(this).css("color",colorm(Number($(this).html())));
    		$(this).css("font-weight","bold");
    	}
    });

    $(".fasttb .kuai").click(function(){
    	if(!$(this).hasClass("noselected")) return false;
    	if($(this).hasClass("kuai2")){
    		$(".kuai1").addClass("noselected");
    		$(".kuai2").removeClass("noselected");
    		$(".fasttb tr").each(function(){
    			if(!$(this).hasClass("kz") && !$(this).hasClass("m")){
                    $(this).hide();
    			}
    			if(!$(this).hasClass("kz") && $(this).hasClass("m")){
                    $(this).show();
    			}
    		});
    	}else{
    		$(".kuai2").addClass("noselected");
    		$(".kuai1").removeClass("noselected");
    		$(".fasttb tr").each(function(){
    			if(!$(this).hasClass("kz") && $(this).hasClass("m")){
                    $(this).hide();
    			}
    			if(!$(this).hasClass("kz") && !$(this).hasClass("m")){
                    $(this).show();
    			}
    		});
    	}
    });

	$(".fasttb tbody td").click(function() {
		var val = $(this).html();
		if (val == '') return false;
		var bname = $(".main a.click").html();
		var tmp;
		if (bname == '特碼' | bname == '正碼' | bname == '正特') {
			if(!isNaN(val)){
				if($(this).hasClass("selected")){
					$(".make input:text").each(function(i) {
					    var pname = Number($(this).parent().prev().attr('mname'));
					    var pid = $(this).parent().attr("pid");
                        if(Number(pname)==Number(val)){
                    	    $(".make td.i" + pid).removeClass("selected");
                    	    $(".make td.p" + pid).removeClass("selected");
                    	    $(".make th.m" + pid).removeClass("selected");

                        }
				    });
                    $(this).removeClass('selected');
				}else{
					$(".make input:text").each(function(i) {
					    var pname = Number($(this).parent().prev().attr('mname'));
					    var pid = $(this).parent().attr("pid");
                        if(Number(pname)==Number(val)){
                    	    $(".make td.i" + pid).addClass("selected");
                    	    $(".make td.p" + pid).addClass("selected");
                    	    $(".make th.m" + pid).addClass("selected");

                        }
				    });
                    $(this).addClass('selected');
				}
				

			}else if (val == '反选') {
				$(".make input:text").each(function(i) {
					var pname = Number($(this).parent().prev().attr('mname'));
					var pid = $(this).parent().attr("pid");
					if (i <= 48) {
						if ($(this).parent().hasClass("selected")) {
							$(".make td.i" + pid).removeClass("selected");
							$(".make td.p" + pid).removeClass("selected");
							$(".make th.m" + pid).removeClass("selected");
						} else {
							$(".make td.i" + pid).addClass("selected");
							$(".make td.p" + pid).addClass("selected");
							$(".make th.m" + pid).addClass("selected");
						}
					}
				});
				if($(".kuai1").hasClass("noselected")){
				    $(".fasttb tr.m td").toggleClass("selected");
				}

			} else if (val == '全选') {
				$(".make input:text").each(function(i) {
					var pname = Number($(this).parent().prev().attr('mname'));
					var pid = $(this).parent().attr("pid");

					$(".make td.i" + pid).addClass("selected");
					$(".make td.p" + pid).addClass("selected");
					$(".make th.m" + pid).addClass("selected");


				})
			} else if (val == '清除') {
				$(".cancel:eq(0)").click();
			} else {
				tmp = sma[val];
				if ($(this).hasClass('selected')) {
					$(".make input:text").each(function(i) {
						var pname = Number($(this).parent().prev().attr('mname'));
						var pid = $(this).parent().attr("pid");
						if (i <= 48 & $.inArray(pname, tmp) != -1) {
							$(".make td.i" + pid).removeClass("selected");
							$(".make td.p" + pid).removeClass("selected");
							$(".make th.m" + pid).removeClass("selected");
						}

					});
					$(this).removeClass('selected');
				} else {
					var flag = true;
					$(".make input:text").each(function(i) {
						var pname = Number($(this).parent().prev().attr('mname'));
						if (i <= 48 & $.inArray(pname, tmp) != -1 & $(this).parent().hasClass('selected')) {
							flag = false;
						}
					});
					if (!flag) {
						$(".cancel:eq(0)").click();
					}
					$(".make input:text").each(function(i) {
						var pname = Number($(this).parent().prev().attr('mname'));
						var pid = $(this).parent().attr("pid");
						if (i <= 48 & $.inArray(pname, tmp) != -1) {
							$(".make td.i" + pid).addClass("selected");
							$(".make td.p" + pid).addClass("selected");
							$(".make th.m" + pid).addClass("selected");
						}

					});
					$(this).addClass('selected');
				}

			}
		} else if (bname == '連碼' | bname == '不中') {
			var mode = Number($(".duoexetb a.on").attr('mode'));
			if (mode == 1) {
				var tb = "duotb"
			} else if (mode == 2) {
				var tb = "mtr"
			} else {
				return false
			}
		
			if (val == '反选') {
				$("." + tb + " td.names").each(function(i) {
					var pid = $(this).attr("i");
					if (i <= 48) {
						if ($(this).hasClass("selected")) {
							$("." + tb + " .m" + pid).removeClass("selected");
							$(this).removeClass("selected");
						} else {
							$("." + tb + " .m" + pid).addClass("selected");
							$(this).addClass("selected");
						}
					}
				})
			} else if (val == '全选') {
				$("." + tb + " td.names").each(function(i) {
					var pid = $(this).attr("i");
					$("." + tb + " .m" + pid).addClass("selected");
					$(this).addClass("selected");

				})
			} else if (val == '清除') {
				$(".cancel:eq(0)").click();
			} else {
				tmp = sma[val];
				if ($(this).hasClass('selected')) {
					$("." + tb + " td.names").each(function(i) {
						var pid = $(this).attr("i");
						var pname = Number($(this).find("span").html());	
						if (i <= 48 & $.inArray(pname, tmp) != -1) {
							$("." + tb + " .m" + pid).removeClass("selected");
							$(this).removeClass("selected");
						}

					});
					$(this).removeClass('selected');
				} else {
					var flag = true;
					$("." + tb + " td.names").each(function(i) {
						var pname = $(this).find("span").html();
						if (i <= 48 & $.inArray(pname, tmp) != -1 & $(this).hasClass('selected')) {
							flag = false;

						}
					});
					if (!flag) {
						$(".cancel:eq(0)").click();
					}
					$("." + tb + " td.names").each(function(i) {
						var pid = $(this).attr("i");
						var pname = Number($(this).find("span").html());					
						if (i <= 48 & $.inArray(pname, tmp) != -1) {							
							$("." + tb + " .m" + pid).addClass("selected");
							$(this).addClass("selected");
						}
					});
					$(this).addClass('selected');
				}
				

			}
		}
		$(".zje:eq(0)").focus();
	});
	
	$(".textsm").click(function(){
		 if($(".smnr:visible").length==1){
		    $(".smnr").hide();
		    $(".textsm").val("详细说明");
		 }else{
		    $(".smnr").show();
		    $(".textsm").val("关闭说明");
			 var h = $(document).height()-$(window).height();
             $(document).scrollTop(h);
		 }
	});
	$(".textclear").click(function(){$(".textnr").val('')});
	
	$(".sendtext").click(function() {
		var bname = $(".main a.click").html();
		if (bname != '特碼' & bname != '正特' & bname != '正碼') return false;
		var txt = $(".textnr").val();
		txt = txt.replace(/\s/g, ',');
		var tzarr = [];
		for (i = 0; i <= 48; i++) {
			tzarr[i] = 0
		}
		var reg = /\[[^\[\]]+\]=\d{1,6}/g;
		var res;
		var cr;
		var result;
		while ((result = reg.exec(txt)) != null) {
			res = result[0].split("=");
			res[0] = res[0].replace('[', '');
			res[0] = res[0].replace(']', '');
			res[0] = strtoma(res[0]);
			res[0] = res[0].split(',');
			cr = res[0].length;
			for (i = 0; i < cr; i++) {
				if (res[0][i] != '' & !isNaN(res[0][i])) {
					tzarr[res[0][i] - 1] += Number(res[1])
				}
			}
		}
		var arr2 = txt.replace(/\[[^\[\]]+\]=\d{1,6}/g, '');
		arr2 = arr2.split(',');
		var ca = arr2.length;
		var cam;
		var start, end, tmp;
		for (i = 0; i < ca; i++) {
			if (arr2[i] != '') {
				if (arr2[i].indexOf('-') != -1) {
					arr2[i] = arr2[i].split('=');
					arr2[i][0] = arr2[i][0].split("-");
					start = Number(arr2[i][0][0]);
					end = Number(arr2[i][0][1]);
					if (start > end) {
						tmp = start;
						start = end;
						end = tmp
					}
					for (j = start; j <= end; j++) {
						tzarr[j - 1] += Number(arr2[i][1])
					}
				} else {
					if (isNaN(arr2[i])) {
						arr2[i] = strtoma(arr2[i])
					}
					arr2[i] = arr2[i].split("=");
					arr2[i][0] = arr2[i][0].split(',');
					cam = arr2[i][0].length;
					for (j = 0; j < cam; j++) {
						if (arr2[i][0][j] != '' & !isNaN(arr2[i][0][j])) {
							tzarr[arr2[i][0][j] - 1] += Number(arr2[i][1])
						}
					}
				}
			}
		}
		arr2 = null;
		res = null;
		result = null;
		key = [0, 10, 20, 30, 40, 1, 11, 21, 31, 41, 2, 12, 22, 32, 42, 3, 13, 23, 33, 43, 4, 14, 24, 34, 44, 5, 15, 25, 35, 45, 6, 16, 26, 36, 46, 7, 17, 27, 37, 47, 8, 18, 28, 38, 48, 9, 19, 29, 39];
		var tmp;
		$(".cancel").click();
		$(".make input:text").each(function(i) {
			if (i <= 48) {
				tmp = tzarr[key[i]];
				if (!isNaN(tmp) & tmp >= 1) {
					$(this).val(tmp);
				}
			}
		});
		$(".exe").click();
		tzarr = null
	});
})