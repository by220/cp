function exe() {
	var obj = $(".sendtb .qr", parent.document);
	if (obj.is(":visible") & obj.prop("disabled") == true) {
		alert("系统接单中。。。，请不要反复投注!");
		return false
	}
	psend = [];
	var play = [];
	var i = 0;
	var f = true;
	var classx = '';
	var bname = $(".main a.click").html();
	var sname = $(".smenu input.click").val();
	var cname;
	var sname;
	var cname;
	var zhi = 0;
	if (bname == '任选牛牛' | bname == '连码' | bname == '2字组合' | bname == '2字定位' | bname == '3字组合' | bname == '3字定位' | bname == '组选3' | bname == '组选6') {
		var pid = $(".make input.xz:checked").attr('pid');
		var pname = $(".make input.xz:checked").attr('mname');
		var num = $(".make input.xz:checked").attr('znum1');
		if(pname=='三中二') num=3;
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
		if (bname == '连码' & (pname == '选前二直选' | pname == '选二连直' | pname == '选前三直选' | pname == '选三前直')) {
			zhi = 1
		}
		var mode = Number($(".duoexetb a.mode.on").attr('mode'));
		if ((bname == '连码' & zhi == 0) | bname == '组选3' | bname == '组选6' | bname == '任选牛牛') {
			if (mode == 2 & (bname == '连码' | bname == '任选牛牛')) {
				var y1 = $(".duotbs td.selected").length;
				var y2 = $(".duotbsclone td.selected2").length;
				if(y1>=num){
					alert("拖头的号码不能大于等于"+num+"个");
					return false			
				}
				if ((y1 + y2) < num) {
					alert("选择的号码数不够");
					return false
				}
				$(".duotbs .m.selected").each(function(i) {
					aone[i] = $(this).attr('m');
				});
				$(".duotbs .p").each(function(i) {
					var htm = $(this).attr('m');
					pone[htm] = Number($(this).find("label.peilv1").html())
				});
				$(".duotbsclone .m.selected2").each(function(i) {
					atwo[i] = $(this).attr('m')
				});
				var nac = num - y1;
				var aall = C(atwo, nac);
				var al = aall.length;
				if (al > 1024) {
					alert("您选择的号码太多!");
					return false
				}
				for (k = 0; k < al; k++) {
					aall[k] = aone.concat(aall[k])
				}
				i = al;
				for (i = 0; i < al; i++) {
					play[i] = [];
					play[i]['pid'] = pid;
					play[i]['name'] = pname;
					play[i]['je'] = je;
					play[i]['con'] = aall[i].sort(function(a,b){return Number(a)-Number(b);});
					play[i]['peilv1'] = peilvmin(aall[i], pone)
				}
				aall = null;
				aone = null;
				atwo = null;
				pone = null;
				atwo = null
			} else {
				var yl = $(".duotbs .m.selected").length;
				if (yl < num) {
					alert("选择的号码数不够");
					return false
				}
				$(".duotbs .p.selected").each(function(i) {
					var htm = $(this).attr('m');
					aone[i] = htm;
					pone[htm] = Number($(this).find("label.peilv1").html())
				});
				var aall = C(aone, num);
				var al = aall.length;
				if (al > 1024) {
					alert("您选择的号码太多!");
					return false
				}
				i = al;
				for (i = 0; i < al; i++) {
					play[i] = [];
					play[i]['pid'] = pid;
					play[i]['name'] = pname;
					play[i]['je'] = je;
					play[i]['con'] = aall[i].sort();
					play[i]['peilv1'] = peilvmin(aall[i], pone)
				}
				aall = null;
				aone = null;
				pone = null;
				ptwo = null
			}
		} else {
			var y1 = 0,
				y2 = 0,
				y3 = 0,
				nl;
			ashree = [];
			if (bname == '2字定位' | bname == '2字组合' | bname == '3字定位' | bname == '3字组合') {
				nl = 10
			} else if (pname == '选前二直选' | pname == '选前三直选') {
				nl = 11
			} else if (pname == '选二连直' | pname == '选三前直') {
				nl = 20
			}
			$(".duotbs .p").each(function(j) {
				if (j < nl) {
					if ($(this).hasClass('selected')) {
						i = y1;
						aone[i] = [];
						aone[i]['n'] = $(this).attr('m');
						aone[i]['p'] = [];
						aone[i]['p'][0] = Number($(this).find("label.peilv1").html());
						if (bname == '2字组合') {
							aone[i]['p'][1] = Number($(this).find("label.peilv2").html())
						}
						if (bname == '3字组合') {
							aone[i]['p'][1] = Number($(this).find("label.peilv2").html());
							aone[i]['p'][2] = Number($(this).find("label.peilv3").html())
						}
						y1++
					}
				} else if (j < nl * 2) {
					if ($(this).hasClass('selected')) {
						i = y2;
						atwo[i] = [];
						atwo[i]['n'] = $(this).attr('m');
						atwo[i]['p'] = [];
						atwo[i]['p'][0] = Number($(this).find("label.peilv1").html());
						if (bname == '2字组合') {
							atwo[i]['p'][1] = Number($(this).find("label.peilv2").html())
						}
						if (bname == '3字组合') {
							atwo[i]['p'][1] = Number($(this).find("label.peilv2").html());
							atwo[i]['p'][2] = Number($(this).find("label.peilv3").html())
						}
						y2++
					}
				} else if (j < nl * 3) {
					if ($(this).hasClass('selected')) {
						i = y3;
						ashree[i] = [];
						ashree[i]['n'] = $(this).attr('m');
						ashree[i]['p'] = [];
						ashree[i]['p'][0] = Number($(this).find("label.peilv1").html());
						if (bname == '3字组合') {
							ashree[i]['p'][1] = Number($(this).find("label.peilv2").html());
							ashree[i]['p'][2] = Number($(this).find("label.peilv3").html())
						}
						y3++
					}
				}
			});
			var aall = 0;
			if (bname == '2字定位' | bname == '2字组合' | pname == '选前二直选' | pname == '选二连直') {
				if (y1 == 0 | y2 == 0) {
					alert("选择的号码数不够");
					return false
				}
				aall = Ctwo(aone, atwo, bname, pname)
			} else if (bname == '3字定位' | bname == '3字组合' | pname == '选前三直选' | pname == '选三前直') {
				if (y1 == 0 | y2 == 0 | y3 == 0) {
					alert("选择的号码数不够");
					return false
				}
				aall = Cshree(aone, atwo, ashree, bname, pname)
			}
			var al = aall.length;
			if (al > 1024) {
				alert("您选择的号码太多!");
				return false
			}
			i = al;
			var dw = 0;
            if (bname == '2字定位' | bname == '3字定位' | pname == '选前二直选' | pname == '选二连直' | pname == '选前三直选' | pname == '选三前直') {
                dw=1;
            }
			for (i = 0; i < al; i++) {
				play[i] = [];
				play[i]['pid'] = pid;
				play[i]['name'] = pname;
				play[i]['je'] = je;
                if(dw==1){
                    play[i]['con'] = aall[i]['n'];
                }else{
                    play[i]['con'] = aall[i]['n'].sort();
                }
				play[i]['peilv1'] = aall[i]['p']
			}
			aall = null;
			aone = null;
			atwo = null;
			pone = null;
			atwo = null;
			ashree = null
		}
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
	}else {
		$(".lists input:text").each(function() {
			var val = Number($(this).val());
			if (val % 1 == 0 & val != 0 & !isNaN(val)) {
				play[i] = new Array();
				play[i]['pid'] = $(this).parent().attr('pid');
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
				play[i]['peilv1'] = $(".p" + play[i]['pid']).find(".peilv1").html();
				if (bname == "1字组合") {
					play[i]['classx'] = $(".p" + play[i]['pid']).attr('cname') + ":"
				} else if (bname == "跨度") {
					play[i]['classx'] = bname + " " + $(".p" + play[i]['pid']).attr('sname') + ":"
				} else if (bname == "牛牛梭哈") {
					play[i]['classx'] = $(".p" + play[i]['pid']).attr('sname') + ":"
				} else if (bname == "两面盘" | bname == "2字和数") {
					play[i]['classx'] = $(".p" + play[i]['pid']).attr('sname') + ":"
				} else if (bname == '1~5' | bname == '前中后三') {
					play[i]['classx'] = $(".p" + play[i]['pid']).attr('sname') + ":"
				} else if (bname == "总和龙虎") {
					play[i]['classx'] = $(".p" + play[i]['pid']).attr('cname') + ":"
				} else if (bname == "3字和数") {
					play[i]['classx'] = $(".p" + play[i]['pid']).attr('sname') + ' ' + $(".p" + play[i]['pid']).attr('cname') + ":"
				} else if (bname == "排名1~5" | bname == "排名6~10" | bname == "单号1 ~ 10" | bname == "1~5球号") {
					play[i]['classx'] = $(".p" + play[i]['pid']).attr('sname') + ":"
				} else {
					play[i]['classx'] = bname + ":"
				}
				play[i]['con'] = '';
				play[i]['bz'] = '';
				i++
			}
		})
	}
	if (!f) return false;
	if (i == 0) return false;
	play.sort(function(x, y) {
		if (!isNaN(x['name']) & !isNaN(y['name'])) {
			return x['name'] - y['name']
		} else {
			return x['pid'] - y['pid']
		}
	});
	var str = '';
	var je = 0;
	for (j = 0; j < i; j++) {
		str += "<tr pid='" + play[j]['pid'] + "' content='' class='cg s" + j + "'>";
		str += "<td style='display:none;'>" + (j + 1) + "</td>";
		if (bname == '任选牛牛' | bname == '连码' | bname == '2字组合' | bname == '2字定位' | bname == '3字组合' | bname == '3字定位' | bname == '组选3' | bname == '组选6') {
			str += "<td>" + play[j]['name'] + ' <label class=red>' + play[j]['con'].join('-') + "</label></td>"
		} else {
			str += "<td>" + play[j]['classx'] + ' <label class=red>' + play[j]['name'] + "</label></td>"
		}
		str += "<td class='red'>" + play[j]['peilv1'];
		str += "</td>";
		str += "<td class='amount'><input value='" + play[j]['je'] + "' /></td>";
		str += "<td class='zt'><input type='checkbox' checked></td>";
		str += "</tr>";
		je += Number(play[j]['je'])
	}
	var obj = $(".sendtb", parent.document);
	obj.css("height","auto");
	obj.find("#betlist").html(str);
	obj.find("#bcount").attr('v', i);
	obj.find("#bcount").html("注数：" + i);
	obj.find("#btotal").html("总金额：" + je);
	obj.find("#btotal").attr('v', je);
	str = null;
	psend = play;
	play = null;
	if (fudong == 1) {
		var edu = Number($(".fedu .fmoney", parent.document).html())
	} else {
		var edu = Number($(".kedu .kmoney", parent.document).html())
	}
	if (edu < je) {
		alert("您的投金额已超出可用余额");
		return false
	}
	addfunc2()
}
var errflag;

function addfunc2() {
	var obj = $(".sendtb", parent.document);
	obj.find(".qr").unbind('click');
	obj.find(".zt input:checkbox").click(function() {
		var zs, zje, key;
		if ($(this).prop("checked")==false) {
			//$(this).parent().parent().find("td").css("text-decoration", "line-through");
			//$(this).parent().parent().find("input:text").prop("disabled", true);
			//$(this).html("恢复");
			//$(this).css("color", "gray");
			zs = Number(obj.find("#bcount").attr('v')) - 1;
			zje = Number(obj.find("#btotal").attr('v')) - Number($(this).parent().parent().find("input:text").val());
			obj.find("#bcount").html("注数：" + zs);
			obj.find("#btotal").html("总金额：" + zje);
			obj.find("#bcount").attr('v', zs);
			obj.find("#btotal").attr('v', zje);
			key = Number($(this).parent().parent().find("td:eq(0)").html()) - 1;
			psend[key]['sc'] = 1
		} else {
			//$(this).parent().parent().find("td").css("text-decoration", "none");
			//$(this).parent().parent().find("input:text").prop("disabled", false);
			//$(this).html("删除");
			//$(this).css("color", "blue");
			zs = Number(obj.find("#bcount").attr('v')) + 1;
			zje = Number(obj.find("#btotal").attr('v')) + Number($(this).parent().parent().find("input:text").val());
			obj.find("#bcount").html("注数：" + zs);
			obj.find("#btotal").html("总金额：" + zje);
			obj.find("#bcount").attr('v', zs);
			obj.find("#btotal").attr('v', zje);
			key = Number($(this).parent().parent().find("td:eq(0)").html()) - 1;
			psend[key]['sc'] = 0
		}
	});
	obj.find("td.amount input").keyup(function() {
		$(this).val($(this).val().replace(/\D/g, ''))
	}).keypress(function() {
		$(this).val($(this).val().replace(/\D/g, ''))
	});
	$(".sendtb td", parent.document).hover(function() {
		$(this).parent().find("td").addClass('hover')
	}, function() {
		$(this).parent().find("td").removeClass('hover')
	});
	$(".ui-fronts", parent.document).show();
	obj.show();
	obj.find(".qr").show();
	obj.find("button:eq(2)").show();
	obj.find(".plts").show();
	obj.find(".cgts").hide();
	obj.find(".cgts").css("color", "red");
	$(".sendtb", parent.document).find(".qr").click(function() {
		obj.find("button").prop("disabled", true);
		var pstr = '[';
		for (i = 0; i < psend.length; i++) {
			if (i != 0) pstr += ',';
			psend[i]['je'] = obj.find(".s" + i + " .amount").find("input").val();
			pstr += json_encode_js(psend[i])
		}
		pstr += ']';
		var abcd = $("#abcd", parent.document).val();
		var ab = $("a.ab.on").attr('v');
		var bid = $(".main a.click").attr("bid");
		var str = "&abcd=" + abcd + "&ab=" + ab + "&bid=" + bid;
		$.ajax({
			type: 'POST',
			url: mulu + 'makelib',
			data: 'xtype=make&pstr=' + pstr + str,
			dataType: 'json',
			cache: false,
			async: false,
			success: function(m) {
			    m=m.msg;
				var ml = m.length;
				var gflag = false;
				var bflag = false;
				var err = false;
				var objs;
				for (i = 0; i < ml; i++) {
					objs = obj.find(".cg:eq(" + i + ")");
					objs.find("input:text").replaceWith(m[i]['je']);
					if (Number(m[i]['cg']) == 1) {
						if (Number(m[i]['cgs']) == 1) {
							objs.find("td.zt").html("赔率变更!");
							objs.find("td.zt").css("color", "red");
							err = true
						} else {
							objs.find("td.zt").html("成功!");
							objs.find("td.zt").css("color", "green")
						}
						objs.find("td:eq(2)").html(m[i]['peilv1']);
						if (m[i]['name'] == '三中二' | m[i]['name'] == '二中特') {
							objs.find("td:eq(2)").html(objs.find("td:eq(2)").html() + "/" + m[i]['peilv2'])
						}
					} else {
						objs.find("td.zt").html(m[i]['err']);
						objs.find("td.zt").css("color", "red");
						err = true
					}
				}
				obj.find("button").prop("disabled", false);
				obj.find(".qr").hide();
				obj.find("button:eq(2)").hide();
				$(".cancel:eq(0)").click();
				obj.find(".plts").hide();
				if (!err) {
					obj.find(".cgts").show();
					setTimeout(function() {
						obj.hide();
						$(".ui-fronts", parent.document).hide()
					}, 1000)
				}
				play = new Array();
				psend = new Array();
				psend = null;
				//$(".zje").val('');
				$(".duoje").val('');
				$(".ggje").val('');
				getlast15();
				getusermoney()
			}
		});
		return false
	})
}

function exe2() {
    var je = Number($(".jes").val());
    var i = 0,
    bname, sname, cname;
    play = [];
    if($(".mt15 .active").length>0){
        $(".mt15 .active").each(function(i) {
            var htm = $(this).attr("m");
            play[i] = [];
            play[i]['bz'] = '';
            play[i]['gid'] = ngid;
            play[i]['pid'] = $(this).attr("pid");
            play[i]['name'] = $(this).attr("name");
            play[i]['je'] = je;
            play[i]['con'] = '';
            play[i]['peilv1'] = $(this).attr("pl");
            play[i]['bid'] = $(this).attr("bid");
            play[i]['wf'] = $(this).attr("sname")+': '+$(this).attr("name");
        });
    } else {
        alert("最少选择1个玩法");
        return false;
    }
    var pl = play.length;
    var pid, je = 0,
    zje = 0,
    minje = 0,
    maxje = 0;
    for (i = 0; i < pl; i++) {
        pid = play[i]['pid'];
        zje += Number(play[i]['je']);
    }
    if(zje<1){
        alert("投注金额最低为1");
        return false;
    }
    $(".kuaisu").attr("disabled",true);
    var pstr = '[';
    for (i = 0; i < play.length; i++) {
        if (i != 0) pstr += ',';
        pstr += json_encode_js(play[i])
    }
    pstr += ']';
    var ab = $(".ab span.active").attr("v");
    var abcd = $(".abcd").val();
    
	var obj = $(".sendtb", parent.document);
		obj.find("button").prop("disabled", true);
		var abcd = $("#abcd", parent.document).val();
		var ab = $("a.ab.on").attr('v');
		var bid = $(".main a.click").attr("bid");
		var str = "&abcd=" + abcd + "&ab=" + ab + "&bid=" + bid;
		$.ajax({
			type: 'POST',
			url: mulu + 'makelib',
			data: 'xtype=make&pstr=' + pstr + str,
			dataType: 'json',
			cache: false,
			async: false,
			success: function(m) {
			    m=m.msg;
				var ml = m.length;
				var gflag = false;
				var bflag = false;
				var err = false;
				var objs;
                if (Number(m[0]['cg']) == 1){
                    $(".mt15 .active").removeClass('active');
                    alert("投注成功");
                }else{
                    alert(m[0]['err']);
                }
				for (i = 0; i < ml; i++) {
					objs = obj.find(".cg:eq(" + i + ")");
					objs.find("input:text").replaceWith(m[i]['je']);
					if (Number(m[i]['cg']) == 1) {
						if (Number(m[i]['cgs']) == 1) {
							objs.find("td.zt").html("赔率变更!");
							objs.find("td.zt").css("color", "red");
							err = true
						} else {
							objs.find("td.zt").html("成功!");
							objs.find("td.zt").css("color", "green")
						}
						objs.find("td:eq(2)").html(m[i]['peilv1']);
						if (m[i]['name'] == '三中二' | m[i]['name'] == '二中特') {
							objs.find("td:eq(2)").html(objs.find("td:eq(2)").html() + "/" + m[i]['peilv2'])
						}
					} else {
						objs.find("td.zt").html(m[i]['err']);
						objs.find("td.zt").css("color", "red");
						err = true
					}
				}
				obj.find("button").prop("disabled", false);
                $(".kuaisu").attr("disabled",false);
				obj.find(".qr").hide();
				obj.find("button:eq(2)").hide();
				$(".cancel:eq(0)").click();
				obj.find(".plts").hide();
				if (!err) {
					obj.find(".cgts").show();
					setTimeout(function() {
						obj.hide();
						$(".ui-fronts", parent.document).hide()
					}, 1000)
				}
				play = new Array();
				psend = new Array();
				psend = null;
				//$(".zje").val('');
				$(".duoje").val('');
				$(".ggje").val('');
				getlast15();
				getusermoney()
			}
		});
		return false
}
function lib() {
	if(ustatus==2){
		window.location.href='bao?xtype=show';
		return;
	}
	var bid = $(".main a.click").attr("bid");
	var bname = $(".main a.click").html();
	$(".smenu a.sclass").remove();
	$(".smenu").hide();
	$("a.ab").hide();
	//tus();
    updatel(1);
    $(".kuaijue").hide();
	if (bname == '两面盘') {
		libs('sm')
	} else if (bname == '单号1 ~ 10') {
		libs('110')
	}else if (bname == '单球1～8') {
		libs('108')
	} else if (bname == '1~5球号') {
		libs('105')
    }else if (bname == '1~5' || bname == '1~3') {
		libs('1dw')
	}else {
	    if (ngid=='132') {
            libs('a')
        } else {
            libs('sm')
        }
	}
}
function libpl(gpl) {
	var bid = $(".main a.click").attr("bid");
	var bname = $(".main a.click").html();
	if (bname == '两面盘') {
		libs('sm', gpl)
	} else if (bname == '单号1 ~ 10') {
		libs('110', gpl)
	}else if (bname == '单球1～8') {
		libs('108', gpl)
	} else if (bname == '1~5球号') {
		libs('105', gpl)
    }else if (bname == '1~5' || bname == '1~3') {
		libs('1dw', gpl)
	}else {
		libs('a', gpl)
	}
}
function libs(stype, gpl) {
	var ab = $("a.ab.on").attr('v');
	var abcd = $("#abcd", parent.document).val();
	var sc = $(".smenu a.sclass.on").attr('cid');
	var sid = $(".smenu a.sclass.on").attr('sid');
	var bid = $(".main a.click").attr("bid");
    if (ngid=='132') {
        bid = '23378780';
    }
	var bname = $(".main a.click").html()??"";
	var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&sc=" + sc + "&sid=" + sid;

	if (gpl != 1) {
		//$(".make").html("");
		$(".table_lm").remove();
		$(".table_ts").remove();
		$(".duotbs").remove()
		$(".duotbsclone").remove();
	}
			$(".fts").remove();
			$("#fts").remove();
	$.ajax({
		type: 'POST',
		url: mulu + 'make',
		dataType: 'json',
		cache: false,
		data: 'xtype=lib&stype=' + stype + sstr,
		success: function(m) {
		    m=m.msg;
			clicki=false;
			////console.log(m)
			////console.log(JSON.stringify(m));
			var ml = m.length;
		
			var strh = "<th>号码</th><th>赔率</th><th class='ha'>金额</th>";
			var str = '',
				str1 = '',
				str2 = '',
				strc = '';
			var tmpsid = 0,
				tmpcid = 0;
			var i = 0,
				j = 0,
				k = 0,
				l = 0;
			var key = [];
			if (gpl == 1) {
				for (i = 0; i < ml; i++) {
					$(".p" + m[i]['pid']).find("label.peilv1").html(rpeilv(m[i]['peilv1'], m[i]['ifok']))
				}
				return false
			}
            $(".make").html('');
                    if (ngid=='132') {
                        for (i = 0; i < ml; i++) {
                            var wfarr = m[i];
                            $('.wf'+wfarr['name']).attr({'bid':wfarr['bid'],'pid':wfarr['pid'],'sname':wfarr['sname'],'cname':wfarr['cname'],'mname':wfarr['mname'],'maxje':wfarr['maxje'],'minje':wfarr['minje'],'name':wfarr['name'],'pl':wfarr['peilv1']}).find('.odd,.dat').text(wfarr['peilv1']);
                        }
                    }
			if(bname == '番摊'){
                 str = '<table class="table_zh2 table_ball table_betbox fts" style="width:100%;clear:both"><tbody><tr class="head"><th colspan="12">正</th></tr></tbody></table><div class="game_w fts"><table class="game_table" width="100%" border="0" cellspacing="5" cellpadding="0"><tbody><tr><td><table class="table_zh2 table_ball t3 table_betbox g_team tb_jiao" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name arrow_lt m97000029"></td><td class="odds"><a class="odds p97000029"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000029" type="text"></td></tr></tbody></table></td><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000015">3念4</td><td class="odds"><a class="odds p97000015"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000015" type="text"></td></tr></tbody></table></td><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000013">3念1</td><td class="odds"><a class="odds p97000013"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000013" type="text"></td></tr></tbody></table></td><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000014">3念2</td><td class="odds"><a class="odds p97000014"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000014" type="text"></td></tr></tbody></table></td><td><table class="table_zh2 table_ball t3 table_betbox g_team tb_jiao" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000028"></td><td class="odds"><a class="odds p97000028"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000028" type="text"></td></tr></tbody></table></td></tr><tr><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000018">4念3</td><td class="odds"><a class="odds p97000018"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000018" type="text"></td></tr></tbody></table></td><td colspan="3" rowspan="3"><div class="g_mid"><div class="g_l" access><img src="../imgn/g_left_top.png" usemap="#left_top" class="left_top"><map><area shape="poly" coords="2,10,2,65,76,63" href="javascript:void(0);" access><area shape="poly" coords="5,1,78,1,78,54,5,7,2,4" href="javascript:void(0);" access></map><div class="g_l_c ftdiv" access><p><span class="m97000034">4正</span>&nbsp;<span class="odds p97000034"><label>1.95</label></span></p><p><input type="text" class="betAmount i97000034"></p><i class="sec_l"></i></div><img src="../imgn/g_left_down.png" usemap="#left_down" class="left_down"><map><area shape="poly" coords="1,0,75,0,2,48" href="javascript:void(0);" access><area shape="poly" coords="78,5,78,65,2,65,0,62,2,50" href="javascript:void(0);" access></map></div><div class="g_m"><div class="g_m_t" access><div class="g_l_c ftdiv" access><p><span class="97000033">3正</span>&nbsp;<span class="odds p97000033"><label>1.95</label></span></p><p><input type="text" class="betAmount i97000033"></p><i class="sec_t"></i></div></div><div class="g_m_m"><table class="table_zh2 table_ball t3 table_betbox" width="100%" border="0" cellspacing="5" cellpadding="0" style="margin-bottom:0;border:1px solid #c6c6c8"><tbody><tr><td class="name m97000005"></td><td class="odds"><a class="odds p97000005"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000005" type="text"></td><td class="name m97000006"></td><td class="odds"><a class="odds p97000006"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000006" type="text"></td></tr><tr><td class="name m97000051"></td><td class="odds"><a class="odds p97000051"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000051" type="text"></td><td class="name m97000052"></td><td class="odds"><a class="odds p97000052"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000052" type="text"></td></tr></tbody></table></div><div class="g_m_b" access><div class="g_l_c ftdiv" access><p><span class="m97000031">1正</span>&nbsp;<span class="odds p97000031"><label>1.95</label></span></p><p><input type="text" class="betAmount i97000031"></p><i class="sec_r"></i></div></div></div><div class="g_r" access><img src="../imgn/g_right_top.png" usemap="#right_top" class="right_top"><map><area shape="poly" coords="0,55,77,60,76,10" href="javascript:void(0);" access><area shape="poly" coords="0,2,73,2,76,4,73,10,0,50" href="javascript:void(0);" access></map><div class="g_l_c ftdiv" access><p><span class="m97000032">2正</span>&nbsp;<span class="odds p97000032"><label>1.95</label></span></p><p><input type="text" class="betAmount i97000032"></p><i class="sec_d"></i></div><img src="../imgn/g_right_down.png" usemap="#right_down" class="right_down"><map><area shape="poly" coords="2,0,77,0,77,45,74,45,2,2" href="javascript:void(0);" access><area shape="poly" coords="0,6,72,50,73,58,70,65,0,65" href="javascript:void(0);" access></map></div></div></td><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000011">2念3</td><td class="odds"><a class="odds p97000011"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000011" type="text"></td></tr></tbody></table></td></tr><tr><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000017">4念2</td><td class="odds"><a class="odds p97000017"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000017" type="text"></td></tr></tbody></table></td><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000012">2念4</td><td class="odds"><a class="odds p97000012"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000012" type="text"></td></tr></tbody></table></td></tr><tr><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000016">4念1</td><td class="odds"><a class="odds p97000016"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000016" type="text"></td></tr></tbody></table></td><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000010">2念1</td><td class="odds"><a class="odds p97000010"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000010" type="text"></td></tr></tbody></table></td></tr><tr><td><table class="table_zh2 table_ball t3 table_betbox g_team tb_jiao" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name arrow_lb m97000030"></td><td class="odds"><a class="odds p97000030"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000030" type="text"></td></tr></tbody></table></td><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000009">1念4</td><td class="odds"><a class="odds p97000009"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000009" type="text"></td></tr></tbody></table></td><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000008">1念3</td><td class="odds"><a class="odds p97000008"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000008" type="text"></td></tr></tbody></table></td><td><table class="table_zh2 table_ball t3 table_betbox g_team" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000007">1念2</td><td class="odds"><a class="odds p97000007"><label>2.92</label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000007" type="text"></td></tr></tbody></table></td><td><table class="table_zh2 table_ball t3 table_betbox g_team tb_jiao" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="name m97000027"></td><td class="odds"><a class="odds p97000027"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000027" type="text"></td></tr></tbody></table></td></tr></tbody></table></div><table class="table_zh2 table_ball t3 table_betbox fts"><thead><tr><th colspan="12">番</th></tr></thead><tbody><tr><td class="name m97000001"></td><td class="odds"><a class="odds p97000001"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000001" type="text"></td><td class="name m97000002"></td><td class="odds"><a class="odds p97000002"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000002" type="text"></td><td class="name m97000003"></td><td class="odds"><a class="odds p97000003"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000003" type="text"></td><td class="name m97000004"></td><td class="odds"><a class="odds p97000004"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000004" type="text"></td></tr></tbody></table><table class="table_zh2 table_ball t3 table_betbox fts"><thead><tr><th colspan="12">中</th></tr></thead><tbody><tr><td class="name m97000047"></td><td class="odds"><a class="odds p97000047"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000047" type="text"></td><td class="name m97000048"></td><td class="odds"><a class="odds p97000048"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000048" type="text"></td><td class="name m97000049"></td><td class="odds"><a class="odds p97000049"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000049" type="text"></td><td class="name m97000050"></td><td class="odds"><a class="odds p97000050"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000050" type="text"></td></tr></tbody></table><table class="table_zh2 table_ball t3 table_betbox fts"><thead><tr><th colspan="12">通</th></tr></thead><tbody><tr><td class="name m97000035"></td><td class="odds"><a class="odds p97000035"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000035" type="text"></td><td class="name m97000038"></td><td class="odds"><a class="odds p97000038"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000038" type="text"></td><td class="name m97000041"></td><td class="odds"><a class="odds p97000041"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000041" type="text"></td><td class="name m97000044"></td><td class="odds"><a class="odds p97000044"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000044" type="text"></td></tr><tr><td class="name m97000036"></td><td class="odds"><a class="odds p97000036"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000036" type="text"></td><td class="name m97000039"></td><td class="odds"><a class="odds p97000039"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000039" type="text"></td><td class="name m97000042"></td><td class="odds"><a class="odds p97000042"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000042" type="text"></td><td class="name m97000045"></td><td class="odds"><a class="odds p97000045"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000045" type="text"></td></tr><tr><td class="name m97000037"></td><td class="odds"><a class="odds p97000037"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000037" type="text"></td><td class="name m97000040"></td><td class="odds"><a class="odds p97000040"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000040" type="text"></td><td class="name m97000043"></td><td class="odds"><a class="odds p97000043"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000043" type="text"></td><td class="name m97000046"></td><td class="odds"><a class="odds p97000046"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000046" type="text"></td></tr></tbody></table><table class="table_zh2 table_ball t3 table_betbox fts"><thead><tr><th colspan="12">加</th></tr></thead><tbody><tr><td class="name m97000019"></td><td class="odds"><a class="odds p97000019"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000019" type="text"></td><td class="name m97000020"></td><td class="odds"><a class="odds p97000020"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000020" type="text"></td><td class="name m97000021"></td><td class="odds"><a class="odds p97000021"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000021" type="text"></td><td class="name m97000022"></td><td class="odds"><a class="odds p97000022"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000022" type="text"></td></tr><tr><td class="name m97000023"></td><td class="odds"><a class="odds p97000023"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000023" type="text"></td><td class="name m97000024"></td><td class="odds"><a class="odds p97000024"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000024" type="text"></td><td class="name m97000025"></td><td class="odds"><a class="odds p97000025"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000025" type="text"></td><td class="name m97000026"></td><td class="odds"><a class="odds p97000026"><label></label></a></td><td style="text-align:center" class="amount ha"><input size="8" class="betAmount i97000026" type="text"></td></tr></tbody></table>';
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
                     ////console.log(JSON.stringify(m[i]));
				 }
			}else if (bname == "两面盘") {
				if (fenlei == 161) {
					////console.log(m);
					str1 = "<table class='table_lm'><tbody><tr class='head'><th colspan='12'>总和、总和过关</th></tr>";
					key = [0, 1, 2, 3, 4, 88, 88, 88, 5, 6, 7, 8];
					var ck = key.length;
					var i;
					for (j = 0; j < ck; j++) {
						i = key[j];
						if (j == 0 | j % 4 == 0) {
							if (j > 0) str1 += "</tr>";
							str1 += "<tr>"
						}
						if (i == 88) {
							str1 += "<th class='name'></th><td></td><td></td>";
							continue
						}
						str1 += rhtmls(m[i], 0)
					}
					str1 += "</tr>";
					str1 += "</tbody></table>";
					str1 += "<table class='table_lm'><tbody><tr class='head'><th colspan='12'>前后和</th></tr>";
					key = [9, 10, 11];
					var ck = key.length;
					var i;
					for (j = 0; j < ck; j++) {
						i = key[j];
						if (j == 0 | j % 3 == 0) {
							if (j > 0) str1 += "</tr>";
							str1 += "<tr>"
						}
						str1 += rhtmls(m[i], 0)
					}
					str1 += "</tr>";
					str1 += "</tbody></table>";
					str1 += "<table class='table_lm'><tbody><tr class='head'><th colspan='12'>单双和</th></tr>";
					key = [12, 13, 14];
					var ck = key.length;
					var i;
					for (j = 0; j < ck; j++) {
						i = key[j];
						if (j == 0 | j % 3 == 0) {
							if (j > 0) str1 += "</tr>";
							str1 += "<tr>"
						}
						str1 += rhtmls(m[i], 0)
					}
					str1 += "</tr>";
					str1 += "</tbody></table>";
					str1 += "<table class='table_lm'><tbody><tr class='head'><th colspan='15'>五行</th></tr>";
					key = [15, 16, 17, 18, 19];
					var ck = key.length;
					var i;
					for (j = 0; j < ck; j++) {
						i = key[j];
						if (j == 0 | j % 5 == 0) {
							if (j > 0) str1 += "</tr>";
							str1 += "<tr>"
						}
						str1 += rhtmls(m[i], 0)
					}
					str1 += "</tr>";
					str1 += "</tbody></table>";
					$(".make").before(str1);
					$(".table_lm").css("margin-bottom", '5px')
				} else if (fenlei == 151) {
					str1 += "<table class='table_lm'><tbody><tr class='head'><th colspan='15'>三军、大小</th></tr>";
					key = [0, 1, 2, 6, 3, 4, 5, 7];
					var ck = key.length;
					var i;
					for (j = 0; j < ck; j++) {
						i = key[j];
						if (j == 0 | j % 4 == 0) {
							if (j > 0) str1 += "</tr>";
							str1 += "<tr>"
						}
						str1 += rhtmls(m[i], 1)
					}
					str1 += "</tr>";
					str1 += "</tbody></table>";
					str1 += "<table class='table_lm'><tbody><tr class='head'><th colspan='15'>围骰、全骰</th></tr>";
					key = [8, 9, 10, 11, 12, 13, 14, 88, 88];
					var ck = key.length;
					var i;
					for (j = 0; j < ck; j++) {
						i = key[j];
						if (j == 0 | j % 3 == 0) {
							if (j > 0) str1 += "</tr>";
							str1 += "<tr>"
						}
						if (i == 88) {
							str1 += "<th class='name'></th><td></td><td></td>";
							continue
						}
						str1 += rhtmls(m[i], 1)
					}
					str1 += "</tr>";
					str1 += "</tbody></table>";
					str1 += "<table class='table_lm'><tbody><tr class='head'><th colspan='15'>点数</th></tr>";
					key = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 88, 88];
					var ck = key.length;
					var i;
					for (j = 0; j < ck; j++) {
						i = key[j];
						if (j == 0 | j % 4 == 0) {
							if (j > 0) str1 += "</tr>";
							str1 += "<tr>"
						}
						if (i == 88) {
							str1 += "<th class='name'></th><td></td><td></td>";
							continue
						}
						str1 += rhtmls(m[i], 1)
					}
					str1 += "</tr>";
					str1 += "</tbody></table>";
					str1 += "<table class='table_lm'><tbody><tr class='head'><th colspan='15'>长牌</th></tr>";
					key = [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 88, 88];
					var ck = key.length;
					var i;
					for (j = 0; j < ck; j++) {
						i = key[j];
						if (j == 0 | j % 3 == 0) {
							if (j > 0) str1 += "</tr>";
							str1 += "<tr>"
						}
						if (i == 88) {
							str1 += "<th class='name'></th><td></td><td></td>";
							continue
						}
						str1 += rhtmls(m[i], 1)
					}
					str1 += "</tr>";
					str1 += "</tbody></table>";
					str1 += "<table class='table_lm'><tbody><tr class='head'><th colspan='15'>短牌</th></tr>";
					key = [43, 44, 45, 46, 47, 48];
					var ck = key.length;
					var i;
					for (j = 0; j < ck; j++) {
						i = key[j];
						if (j == 0 | j % 3 == 0) {
							if (j > 0) str1 += "</tr>";
							str1 += "<tr>"
						}
						if (i == 88) {
							str1 += "<th class='name'></th><td></td><td></td>";
							continue
						}
						str1 += rhtmls(m[i], 1)
					}
					str1 += "</tr>";
					str1 += "</tbody></table>";
					$(".make").before(str1);
					$(".table_lm").css("margin-bottom", '5px');
					$(".table_lm").addClass("table_ball");
					$(".table_lm:eq(1) .name").css("width", 90);
					$(".table_lm:eq(3) .name").css("width", 90);
					$(".table_lm:eq(4) .name").css("width", 90)
				} else if (fenlei == 103) {
					str1 += "<table class='table_lm'><tbody><tr class='head'><th colspan='15'>总和</th></tr>";
					key = [72, 74, 76, 73, 75, 77];
					var ck = key.length;
					for (j = 0; j < ck; j++) {
						i = key[j];
						if (j == 0 | j % 3 == 0) {
							if (j > 0) str1 += "</tr>";
							str1 += "<tr>"
						}
						if (i == 88) {
							str1 += "<th class='name'></th><td></td><td></td>";
							continue
						}
						str1 += rhtmls(m[i], 1)
					}
					str1 += "</tr>";
					str1 += "</tbody></table>";
					for (i = 0; i < 72; i++) {
						if (tmpsid != m[i]['sid']) {
							if (tmpsid != 0) {
								str += "</tbody></table>"
							}
							str += "<table><tbody><tr class='head'><th colspan='3'>";
							str += m[i]['sname'];
							str += "</th></tr>"
						}
						str += "<tr>";
						str += rhtmls(m[i], 0);
						str += "</tr>";
						j++;
						tmpsid = m[i]['sid']
					}
					str += "</tbody></table>";
					$(".make").html(str);
					$(".make").before(str1);
					$(".make table").css("width", 187.25);
					$(".make table").css("float", "left");
					$(".make table").css("margin-right", 1);
					$(".make table:eq(0)").css("margin-left", 1);
					$(".make table:eq(4)").css("margin-left", 1);
					$(".table_lm .name").css("width", 60);
					$(".table_lm").css("margin-bottom", 5)
				} else if (fenlei == 121) {
					str1 += "<table class='table_lm'><tbody><tr class='head'><th colspan='15'>总和-龙虎</th></tr>";
					key = [20, 22, 24, 26, 21, 23, 25, 27];
					var ck = key.length;
					for (j = 0; j < ck; j++) {
						i = key[j];
						if (j == 0 | j % 4 == 0) {
							if (j > 0) str1 += "</tr>";
							str1 += "<tr>"
						}
						if (i == 88) {
							str1 += "<th class='name'></th><td></td><td></td>";
							continue
						}
						str1 += rhtmls(m[i], 1)
					}
					str1 += "</tr>";
					str1 += "</tbody></table>";
					for (i = 0; i < 20; i++) {
						if (tmpsid != m[i]['sid']) {
							if (tmpsid != 0) {
								str += "</tbody></table>"
							}
							str += "<table><tbody><tr class='head'><th colspan='3'>";
							str += m[i]['sname'];
							str += "</th></tr>"
						}
						str += "<tr>";
						str += rhtmls(m[i], 0);
						str += "</tr>";
						j++;
						tmpsid = m[i]['sid']
					}
					str += "</tbody></table>";
					$(".make").html(str);
					$(".make").before(str1);
					$(".table_lm .name").css("width", 50)
				} else if (fenlei == 163) {
					str1 += "<tr class='head'><th colspan='12'>总和-龙虎和</th></tr>";
					str2 += "<tr class='head'><th colspan='12'>总和数</th></tr>";
					for (i = 0; i < ml; i++) {
						strc = rhtmls(m[i], 0);
						if(m[i]['bname']=='番摊') continue;
						if (m[i]['name'] == "大" | m[i]['name'] == "小" | m[i]['name'] == "单" | m[i]['name'] == "双") {
							if (j == 0 | j % 4 == 0) {
								if (j > 0) {
									str += "</tbody></table>"
								}
								str += "<table style='width:33.2%'><tbody><tr class='head'><th colspan='3'>";
								str += m[i]['sname'];
								str += "</th></tr>"
							}
							str += "<tr>";
							str += strc;
							str += "</tr>";
							j++
						}
					}
					key = [12, 14, 18, 24, 13, 15, 19, 25, 22, 16, 20, 26, 23, 17, 21];
					
					var ck = key.length;
					for (j = 0; j < ck; j++) {
						i = key[j];
						strc = rhtmls(m[i], 0);
						if (j % 4 == 0) {
							if (j > 0) str1 += "</tr>";
							str2 += "<tr>"
						}
						str1 += strc
					}
					key = [27, 34, 41, 48, 28, 35, 42, 49, 29, 36, 43, 50, 30, 37, 44, 51, 31, 38, 45, 52, 32, 39, 46, 52, 33, 40, 47, 54]
					var ck = key.length;
					for (j = 0; j < ck; j++) {
						i = key[j];
						strc = rhtmls(m[i], 1);
						if (j % 4 == 0) {
							if (j > 0) str2 += "</tr>";
							str2 += "<tr>"
						}
						str2 += strc
					}
					str += "</tbody></table>";
					str2 += "</tr>";
					str1 += "<th class='name'></th><td></td><td></td></tr>";
					str1 = "<table class='table_lm'><tbody>" + str1 + str2 + "</tbody></table>"
					$(".make").html(str);
					$(".make").before(str1);
					$(".table_lm .name").addClass('names')
				} else {
					if (fenlei == 107) {

						var l = 6;
						var j = 0;
						for (i = 0; i < ml; i++) {
							if(m[i]['sname']=='番摊') continue;
							if (m[i]['name'] == "大" | m[i]['name'] == "小" | m[i]['name'] == "单" | m[i]['name'] == "双" | m[i]['name'] == "龙" | m[i]['name'] == "虎") {
								if (k == 5) {
									l = 4;
									j = 0;
									k = 1
								}
								if (j == 0 | j % l == 0) {
									if (j > 0 & k == 0) {
										str += "</tbody></table>"
									}
									str += "<table><tbody><tr class='head'><th colspan='3'>";
									str += m[i]['sname'];
									str += "</th></tr>"
								}
								str += "<tr>";
								str += rhtmls(m[i], 0);
								str += "</tr>";
								j++;
								if (m[i]['name'] == "虎") {
									k++
								}
							}
						}
						str += "</tbody></table>";
						str1 += "<tbody><tr class='head'><th colspan='12'>冠、亚军和</th></tr>";
						key = [12, 13, 14, 15];
						var ck = key.length;
						var i;
						str1 += "<tr>";
						for (j = 0; j < ck; j++) {
							i = key[j];
							str1 += rhtmls(m[i], 0)
						}
						str1 += "</tr>";
						str1 += "</tbody>";
						$(".make").html(str);
						$(".make").before("<table class='table_lm'>" + str1 + "</table>")
					} else {
						str1 += "<tbody><tr class='head'><th colspan='12'>总和-龙虎和</th></tr>";
						var tmpsid = 0;
						for (i = 0; i < ml; i++) {
							strc = rhtmls(m[i], 0);
							if (m[i]['name'] == "大" | m[i]['name'] == "小" | m[i]['name'] == "单" | m[i]['name'] == "双") {
								if (j == 0 | j % 4 == 0) {
									if (j > 0) {
										str += "</tbody></table>"
									}
									str += "<table><tbody><tr class='head'><th colspan='3'>";
									str += m[i]['sname'];
									str += "</th></tr>"
								}
								str += "<tr>";
								str += strc;
								str += "</tr>";
								j++
							} else if (m[i]['bid'] == '23378767') {
								if (m[i]['sid'] != tmpsid) {
									if (tmpsid != 0) str2 += "</tbody></table>";
									str2 += "<table class='table_ts'><tbody><tr class='head'><th colspan='15'>" + m[i]['sname'] + "</th></tr><tr>"
								}
								str2 += strc;
								k++
							} else {
								if (l == 0 | l % 4 == 0) {
									if (l > 0) str1 += "</tr>";
									str1 += "<tr>"
								}
								str1 += strc;
								l++
							}
							tmpsid = m[i]['sid']
						}
						str += "</tbody></table>";
						str2 += "</tbody></table>";
						str1 += "<th class='name'></th><td></td><td></td></tr></tbody>";
						str1 = "<table class='table_lm'>" + str1 + "</table>";
						$(".make").html(str);
						$(".make").before(str1);
						$(".make").after(str2)
					}
				}
			}else if (bname == '单球1～8') {
		
				for(i=0;i<ml;i++){
					if(i%20==0){
						if(i>0) str +="</tbody></table>";
						str += "<table class='table_ball' style='width:100%'><tbody><tr class='head'><th colspan='13'>"+m[i]['bname']+"</th></tr>";
					}
					if(i%4==0){
						if(i%20==0 && i>0){
							str += "</tr>";
						}
						str += "<tr>";
					}
					str += rhtmls(m[i], 1);

				}
				str +="</tr></tbody></table>";
				$(".make").html(str)
			} else if (bname == '排名1~5' | bname == '排名6~10' | bname == '单号1 ~ 10' | bname == '1~5球号') {
				k = 10;
				if (fenlei == 121) k = 11;
				for (i = 0; i < ml; i++) {
					if (j % k == 0) {
						if (j > 0) {
							str += "</tbody></table>"
						}
						str += "<table><tbody><tr class='head'><th colspan='3'>";
						str += m[i]['sname'];
						str += "</th></tr>"
					}
					str += "<tr>";
					str += rhtmls(m[i], 1);
					str += "</tr>";
					j++
				}
				str += "</tbody></table>";
				$(".make").html(str)
			} else if (bname == '总和' | bname == '总和龙虎' | bname.indexOf("球") != -1) {
				var title = '',
					title2 = '';
				if (fenlei == 163) {
					key = [0, 2, 6, 12, 1, 3, 7, 13, 10, 4, 8, 14, 11, 5, 9, 88];
					title = '总和、龙虎';
					title2 = '总和尾数'
				} else if (bname == '3字和数') {
					key = [0, 2, 4, 6, 1, 3, 5, 7];
					title = '两面';
					title2 = '和数尾数'
				} else if (bname == '总和龙虎') {
					key = [2,3,0,1,4,5,6,88];
					title = '总和、龙虎';
					title2 = '总和尾数'
				} else {
					key = [20, 22, 24, 26, 21, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 88]
				}
				ck = key.length;
				str1 = "";
				for (j = 0; j < ck; j++) {
					i = key[j];
					if (j % 4 == 0) {
						if (j > 0) str1 += "</tr>";
						str1 += "<tr>"
					}
					if (i == 88) {
						str1 += "<th class='name'></th><td></td><td></td>";
						continue
					}
					str1 += rhtmls(m[i], 0)
				}
				str1 += "</tr>";
				l = 5;
				key=[];
				if (bname.indexOf("球") != -1) {
					key = [0, 5, 10, 15, 1, 6, 11, 16, 2, 7, 12, 17, 3, 8, 13, 18, 4, 9, 14, 19];
					l = 4
				}
				ck = key.length;
				str = "<table class='table_ball k100'><tbody>";
				for (j = 0; j < ck; j++) {
					i = key[j];
					if (j % l == 0) {
						if (j > 0) str += "</tr>";
						str += "<tr>"
					}
					str += rhtmls(m[i], 1)
				}
				str += "</tr></tbody></table>";
				$(".make").html(str);
				if (bname == '总和龙虎' | bname == '3字和数') {
					$(".make").before("<table class='table_lm'><tbody>" + str1 + "</tbody></table>");
					$(".table_lm tbody").prepend("<tr class='head'><th colspan='12'>" + title + "</th></tr>");
					//$(".make tbody").prepend("<tr class='head'><th colspan='15'>" + title2 + "</th></tr>");
					$(".table_lm").css("margin-bottom", 5)
				} else {
					$(".make tbody").prepend("<tr class='head'>" + strh + strh + strh + strh + "<tr>");
					$(".make tbody").append(str1)
				}
			} else if (bname == '2字组合' | bname == '2字定位' | bname == '3字组合' | bname == '3字定位' | bname == '组选3' | bname == '组选6' | bname == '连码' | bname == '任选牛牛') {
				if ((bname == '组选3' | bname == '组选6') & ml > 10) {
					if (bname == '组选3') {
						var key = [0, 6, 12, 1, 7, 13, 2, 8, 14, 3, 9, 15, 4, 10, 16, 5, 11, 17]
					} else {
						var key = [0, 5, 10, 1, 6, 11, 2, 7, 12, 3, 8, 13, 4, 9, 14]
					}
					var ck = key.length;
					var i;
					for (j = 0; j < ck; j++) {
						if (j % 3 == 0) {
							if (j > 0) str += "</tr>";
							str += "<tr>"
						}
						i = key[j];
						str += rhtmls_lm(m[i])
					}
				} else {
					for (i = 0; i < ml; i++) {
						if (i % 3 == 0) {
							if (i > 0) str += "</tr>";
							str += "<tr>"
						}
						str += rhtmls_lm(m[i])
					}
				}
				str += "</tr>";
				var strsm='';
				if(bname=='任选牛牛'){
					strsm  = "<thead><tr><th colspan=2 style='text-align:left;padding-left:5px;'>一、庄家固定选位:[第"+pk10num+"位开奖号码]。会员任选5位为1注。<BR>二、任三位的和数能被10整除，为有牛，否则为无牛。<BR>三、有牛的情况下，根据其余二位的和数尾数(1-9),分别为牛1-牛9，如果尾数为0，为牛牛。<BR>四、无牛的情况下，选最大数比大小。<BR>五、从大到小分别：牛牛>牛9-牛1>无牛。<BR>六、会员无牛小于等于"+pk10ts+"庄家通杀。</th></tr></thead>";
				}
				str = "<table class='k100'>"+strsm+"<tbody>" + str + "</tbody></table>";
				$(".make").html(str);
				$(".make .name").css("width", 120);
			} else if (bname == '1~5' || bname == '1~3') {
				for (i = 0; i < ml; i++) {
					if (m[i]['name'] != '质' & m[i]['name'] != '合') {
						if (j == 0 | j % 14 == 0) {
							if (j > 0) {
								str += "</tbody></table>"
							}
							str += "<table ";
							if(ngid==101) str +=  " class='L_CQHLSX' ";
							if (fenlei == 163) str += "style='width:33.2%' class='tball' ";
							str += "><tbody><tr class='head'><th colspan='3'>";
							str += m[i]['sname'];
							str += "</th></tr>"
						}
						str += "<tr>";
						if(ngid==101){
							str += rhtmls(m[i], 2);
						}else{
							str += rhtmls(m[i], 1);
						}
						
						str += "</tr>";
						j++
					}
				}
				str += "</tbody></table>";
				$(".make").html(str)
			} else if (bname == '1字组合') {
				str = "<table class='k100'>";
				for (i = 0; i < ml; i++) {
					if (tmpcid != m[i]['cid']) {
						str += "<tr class='head'><th colspan='15'>" + m[i]['cname'] + "</th></tr>"
					}
					if (i % 5 == 0) {
						if (i > 0) str += "</tr>";
						str += "</tr><tr>"
					}
					str += rhtmls(m[i], 0);
					tmpcid = m[i]['cid']
				}
				str += "</tr></table>";
				$(".make").html(str)
			} else if (bname == '正码' | bname == '单码') {
				if (fenlei == 121) {
					str += "<table><tbody><tr class='head'>" + strh + strh + strh + strh + strh + "</tr>";
					for (i = 0; i < ml; i++) {
						if (i % 5 == 0) {
							if (i > 0) str += "</tr>";
							str += "<tr>"
						}
						str += rhtmls(m[i], 1);
						j++
					}
					str += "</tr></tbody></table>"
				} else {
					str += "<table><tbody><tr class='head'>" + strh + strh + strh + strh + "</tr>";
					l = ml / 4;
					for (i = 0; i < l; i++) {
						if (i > 0) str += "</tr>";
						str += "<tr>";
						for (j = 0; j < 4; j++) {
							if ((j * l + i) >= ml) {
								str += "<th class='name'></th><td></td><td></td>";
								continue
							}
							str += rhtmls(m[j * l + i], 1)
						}
					}
					str += "</tr></tbody></table>"
				}
				$(".make").html(str);
				$(".make table").css("width", '100%')
			} else if (bname == '牛牛梭哈') {
				key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 88, 11, 13, 15, 12, 14, 16];
				var ck = key.length;
				str += "<table class='k100'><tbody><tr class='head'><th colspan=9>牛牛</th></tr>";
				for (j = 0; j < ck; j++) {
					i = key[j];
					if (j % 3 == 0) {
						if (j > 0) {
							str += "</tr>"
						}
						str += "<tr>"
					}
					if (i == 88) {
						str += "<th class='name'></th><td></td><td></td>";
						continue
					}
					str += rhtmls(m[i], 0)
				}
				str += "</tr></tbody></table>";
				key = [17, 18, 19, 20, 21, 22, 23, 24, 25];
				var ck = key.length;
				str1 += "<table class='table_ts'><tbody><tr class='head'><th colspan=9>梭哈</th></tr>";
				for (j = 0; j < ck; j++) {
					i = key[j];
					if (j % 3 == 0) {
						if (j > 0) {
							str1 += "</tr>"
						}
						str1 += "<tr>"
					}
					str1 += rhtmls(m[i], 0)
				}
				str1 += "</tr></tbody></table>";
				$(".make").html(str);
				$(".make").after(str1);
				$(".table_ts").css("margin-top", 10)
			} else if (fenlei == 107 | fenlei == 121 | fenlei == 103) {
				var nl;
				if (fenlei == 107) {
					if (bname == '冠亚军组合') nl = 17
					else nl = 10
				} else if (fenlei == 121) {
					nl = 11
				} else {
					nl = 20
				}
				if (m[0]['cname'] == '冠亚和-3') {
					str1 = "<tbody><tr class='head'><th colspan='12'>冠、亚军和</th></tr>";
					key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 88, 88, 88, 17, 18, 19, 20]
				} else {
					str1 = "<tbody><tr class='head'><th colspan='12'>" + m[0]['cname'] + "</th></tr>"
				}
				var ck = key.length;
				var i;
				for (j = 0; j < ck; j++) {
					i = key[j]
					if (j == 0 | j % 4 == 0) {
						if (i > 0) str1 += "</tr>";
						str1 += "<tr>"
					}
					if (i == 88) {
						str1 += "<th class='name m'></th>";
						str1 += "<td class='odds p'></td>";
						str1 += "<td class='amount i'></td>"
					} else {
						str1 += "<th class='name m m" + m[i]['pid'] + "'  title='" + m[i]['sname'] + " " + m[i]['name'] + "'>" + m[i]['name'] + "</th>";
						str1 += "<td class='odds p p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + rpeilv(m[i]['peilv1'], m[i]['ifok']) + "</label></td>";
						str1 += "<TD class='amount i i" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "'><input type='text' class='ba' ";
						if (Number(m[i]['ifok']) == 0) str1 += "disabled";
						str1 += " /></td>"
					}
				}
				str1 += "</tr></tbody>";
				$(".make").before("<table class='table_lm'>" + str1 + "</table>");
				$(".make").html('');
			} else if (bname == '2字和数') {
				for (i = 0; i < ml; i++) {
					if (tmpsid != m[i]['sid']) {
						if (tmpsid != 0) {
							str += "</tbody></table>"
						}
						str += "<table><tbody><tr class='head'><th colspan='3'>";
						str += m[i]['sname'];
						str += "</th></tr>"
					}
					str += "<tr>";
					str += rhtmls(m[i], 1);
					str += "</tr>";
					tmpsid = m[i]['sid']
				}
				str += "</tbody></table>";
				$(".make").html(str);
				if (fenlei == 163) {
					$(".make table").css("width", "33.2%")
				}
			} else if (bname == '前中后三' | bname == '跨度' | bname == '前三' | bname == '3字和数' ) {
				//console.log(bname)
				for (i = 0; i < ml; i++) {
					if (tmpsid != m[i]['sid']) {
						j = 0;
						if (tmpsid != 0) {
							str += "</tr></tbody></table>"
						}
						str += "<table><tbody><tr class='head'><th colspan='15'>";
						str += m[i]['sname'];
						str += "</th></tr><tr>"
					}
					if (j == 5 && bname != '3字和数') str += "</tr><tr>";
					if (j == 4 && bname == '3字和数') str += "</tr><tr>";
					str += rhtmls(m[i], 1);
					tmpsid = m[i]['sid'];
					j++
				}
				str += "</tr></tbody></table>";
				$(".make").html(str);
				$(".make table").css("width", "100%")
			}
			if (bname == '2字组合' | bname == '2字定位' | bname == '3字组合' | bname == '3字定位' | bname == '组选3' | bname == '组选6' | bname == '连码' | bname == '任选牛牛') {
				duofunc();
				$("div.control").hide();
				$(".tu").hide()
			} else {
				$(".make").addClass("lists");
				$(".table_lm").addClass("lists");
				$(".table_ts").addClass("lists");
				$(".fts").addClass("lists");
				addfunc();
				$("div.control").show();
				$(".duoexetb").hide()
			}
			str1 = null, str2 = null, str3 = null, strc = null, m = null
		}
		
	})

//	console.log($(".ba").length);
}
function duofunc() {
	$(".make").find("input.xz").change(function() {
		var ab = $("a.ab.on").attr('v');
		var abcd = $("#abcd", parent.document).val();
		var pid = $(this).attr('pid');
		var pname = $(this).attr('mname');
		var bname = $(".main a.click").html();
		var sstr = "&pid=" + pid + "&abcd=" + abcd + "&ab=" + ab;
		$(".duotbs").remove();
		$(".duotbsclone").remove();
		$(".tu").hide();
		$(".duoexetb").show();
		$(".duoexetb a.mode:eq(0)").click();
		$.ajax({
			type: 'POST',
			url: mulu + 'make',
			dataType: 'json',
			cache: false,
			data: 'xtype=duolibss' + sstr,
			success: function(m) {
				//alert(m);
				var str = "<table class='table_ball duotbs'><tbody>";
				var stra = '';
				if (bname == '3字定位') {
					var pnames = pname.substr(0, 2);
					switch (pnames) {
					case "前三":
						pnames = '万千百';
						break;
					case "中三":
						pnames = '千百十';
						break;
					default:
						pnames = '百十个';
						break
					}
				}
				var ml = m[0].length;
				var j = 0;
				for (i = 0; i < ml; i++) {
					if (bname == '2字定位') {
						if (i == 0) {
							stra += "<tr class='head'><th colspan=20>选择" + pname.substr(0, 1) + "位(多选自动组合)</th></tr>";
							j = 0
						} else if (i == 10) {
							stra += "<tr class='head'><th colspan=20>选择" + pname.substr(1, 1) + "位</th></tr>";
							j = 0
						}
					}
					if (bname == '3字定位') {
						if (i == 0) {
							stra += "<tr class='head'><th colspan=20>选择" + pnames.substr(0, 1) + "位(多选自动组合)</th></tr>";
							j = 0
						} else if (i == 10) {
							stra += "<tr class='head'><th colspan=20>选择" + pnames.substr(1, 1) + "位</th></tr>";
							j = 0
						} else if (i == 20) {
							stra += "<tr class='head'><th colspan=20>选择" + pnames.substr(2, 1) + "位</th></tr>";
							j = 0
						}
					}
					if (pname == '选前二直选') {
						if (i == 0) {
							stra += "<tr class='head'><th colspan=20>选择第1球(多选自动组合)</th></tr>";
							j = 0
						} else if (i == 11) {
							stra += "<tr class='head'><tr><th colspan=20>选择第2球</th></tr>";
							j = 0
						}
					}
					if (pname == '选前三直选') {
						if (i == 0) {
							stra += "<tr class='head'><th colspan=20>选择第1球(多选自动组合)</th></tr>";
							j = 0
						} else if (i == 11) {
							stra += "<tr class='head'><th colspan=20>选择第2球</th></tr>";
							j = 0
						} else if (i == 22) {
							stra += "<tr class='head'><th colspan=20>选择第3球</th></tr>";
							j = 0
						}
					}
					if (pname == '选三前直') {
						if (i == 0) {
							stra += "<tr class='head'><th colspan=20>选择第1球(多选自动组合)</th></tr>";
							j = 0
						} else if (i == 20) {
							stra += "<tr class='head'><th colspan=20>选择第2球</th></tr>";
							j = 0
						} else if (i == 40) {
							stra += "<tr class='head'><th colspan=20>选择第3球</th></tr>";
							j = 0
						}
					}
					if (j % 10 == 0) {
						if (j > 0) stra += "</tr>";
						stra += "<tr>"
					}
					stra += "<th class='name m c m" + m[0][i] + "' m='" + m[0][i] + "'>" + qiu(m[0][i]) + "</th>";
					stra += "<td class='odds p c p" + m[0][i] + "' m='" + m[0][i] + "'><label class='peilv1'>" + m[1][i] + "</label>";
					if (bname == '2字组合') {
						stra += "<BR /><label class='peilv2'>" + m[2][i] + "</label>"
					}
					if (bname == '3字组合') {
						stra += "<BR /><label class='peilv2'>" + m[2][i] + "</label>";
						stra += "<BR /><label class='peilv3'>" + m[3][i] + "</label>"
					}
					stra += " </td>";
					j++
				}
				if (bname == '2字组合') {
					str += "<tr class='head'><th colspan=20>选择第1个(对子/散号)(多选自动组合)</th></tr><tr>";
					str += stra;
					str += "<tr class='head'><th colspan=20>选择第2个</th></tr><tr>";
					str += stra
				} else if (bname == '3字组合') {
					str += "<tr class='head'><th colspan=20>选择第1个((豹子/对子/散号)(多选自动组合)</th></tr><tr>";
					str += stra;
					str += "<tr class='head'><th colspan=20>选择第2个</th></tr><tr>";
					str += stra;
					str += "<tr class='head'><th colspan=20>选择第3个</th></tr><tr>";
					str += stra
				} else if (bname == '2字定位' | bname == '3字定位' | pname == '选前三直选' | pname == '选三前直' | pname == '选前二直选') {
					str += stra
				} else if (pname == '选二连直') {
					str += "<tr class='head'><th colspan=20>选择第1球(多选自动组合)</th></tr><tr>";
					str += stra;
					str += "<tr class='head'><th colspan=20>选择第2球</th></tr><tr>";
					str += stra
				} else {
					str += "<tr class='head'><th colspan=20>选择号码(多选自动组合)</th></tr><tr>";
					str += stra
				}
				str += "</tr></tbody></table>";
				$(".duoexetb").after(str);
				var zhi = 0;
				if (bname == '连码' | bname == '任选牛牛') {
					if (pname == '选前二直选' | pname == '选二连直' | pname == '选前三直选' | pname == '选三前直') {
						zhi = 1
					}
					if (zhi == 0) {
						str = "<table class='duotbsclone table_ball' style='display:none;'><tbody><tr>";
						str += "<tr class='head'><th colspan=20>选择拖号</th></tr>";
						str += stra;
						str += "</tr></tbody></table>";
						$(".duotbs").after(str);
						$(".duoexetb a.mode.on").click()
					}
				}
				str = null;
				stra = null;
				m = null;
				$(".duotbs").addClass("lists");
				$(".duotbsclone").addClass("lists");
				$('.c').hover(function() {
					$(this).addClass('hover');
					if ($(this).hasClass('m')) {
						$(this).next().addClass('hover')
					} else {
						$(this).prev().addClass('hover')
					}
				}, function() {
					$(this).removeClass('hover');
					if ($(this).hasClass('m')) {
						$(this).next().removeClass('hover')
					} else {
						$(this).prev().removeClass('hover')
					}
				});
				$(".duotbs .c").click(function() {
					var mode = Number($(".duoexetb a.mode.on").attr('mode'));
					var m = $(this).attr('m');
					if ($(this).hasClass('selected')) {
						if ($(this).hasClass('m')) {
							$(this).removeClass('selected');
							$(this).next().removeClass('selected')
						} else {
							$(this).removeClass('selected');
							$(this).prev().removeClass('selected')
						}
					} else {
						if ((bname == '任选牛牛' | bname == '连码' )& mode == 2 & $(".duotbsclone .m" + m).hasClass('selected2') & zhi == 0) {
							alert("头和拖不能选择同样号码");
							return false
						} else {
							if (zhi == 1) {
								if ($(this).hasClass('m')) {
									$(this).addClass('selected');
									$(this).next().addClass('selected')
								} else {
									$(this).addClass('selected');
									$(this).prev().addClass('selected')
								}
								var bb = 0;
								$(".duotbs .m" + m).each(function(i) {
									if ($(this).hasClass('selected')) bb++
								});
								if (bb > 1) {
									alert("每个号码只能选择一次!");
									if ($(this).hasClass('m')) {
										$(this).removeClass('selected');
										$(this).next().removeClass('selected')
									} else {
										$(this).removeClass('selected');
										$(this).prev().removeClass('selected')
									}
								}
							} else {
								if ($(this).hasClass('m')) {
									$(this).addClass('selected');
									$(this).next().addClass('selected')
								} else {
									$(this).addClass('selected');
									$(this).prev().addClass('selected')
								}
							}
						}
					}
				});
				$(".duotbsclone .c").click(function() {
					var mode = Number($(".duoexetb a.mode.on").attr('mode'));
					var m = $(this).attr('m');
					if ($(this).hasClass('selected2')) {
						if ($(this).hasClass('m')) {
							$(this).removeClass('selected2');
							$(this).next().removeClass('selected2')
						} else {
							$(this).removeClass('selected2');
							$(this).prev().removeClass('selected2')
						}
					} else {
						if (mode == 2 & $(".duotbs .m" + m).hasClass('selected')) {
							alert("头和拖不能选择同样号码");
							return false
						} else {
							if ($(this).hasClass('m')) {
								$(this).addClass('selected2');
								$(this).next().addClass('selected2')
							} else {
								$(this).addClass('selected2');
								$(this).prev().addClass('selected2')
							}
						}
					}
				});
				var num = Number($(".make input.xz:checked").attr('znum1'));
				if (num == 10) {
					$(".duotbs .c").addClass('selected')
				}
				if ((bname == '连码' | bname == '任选牛牛' )& zhi == 0) {
					$(".duoexetb a.mode").show()
				} else {
					$(".duoexetb a.mode").hide()
				}
			}
		})
	})
}
function gets(bid, bname) {
	$.ajax({
		type: 'POST',
		url: mulu + 'make',
		dataType: 'json',
		cache: false,
		data: 'xtype=gets&bid=' + bid,
		success: function(m) {
			var ml = m.length;
			$(".smenu a.sclass").remove();
			var str = '';
			for (i = 0; i < ml; i++) {
				str += "<a  href='javascript:void(0)' sid='" + m[i]['sid'] + "' class='sclass'>" + m[i]['name'] + "</a>"
			}
			$(".smenu").prepend(str);
			str = null;
			m = null;
			$(".smenu a.sclass:eq(0)").addClass('on');
			$(".smenu a.sclass:eq(0)").addClass('on');
			$(".smenu a.sclass").click(function() {
				$(".smenu a.sclass").removeClass('on');
				$(this).addClass('on');
				libs('b');
				return false
			});
			libs('b')
		}
	})
}

function bj(v) {
	if (!isNaN(v)) return 'no'
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
					continue
				}
				ins += ',' + tmps.sort().join('-')
			}
			r[h] = [];
			if (a[i]['n'] == b[j]['n'] | bname == '2字定位' | pname == '选前二直选' | pname == '选二连直') {
				r[h]['p'] = Math.min(a[i]['p'][0], b[j]['p'][0])
			} else {
				r[h]['p'] = Math.min(a[i]['p'][1], b[j]['p'][1])
			}
			r[h]['n'] = [a[i]['n'], b[j]['n']];
			h++
		}
	}
	return r
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
						continue
					}
					ins += ',' + tmps.sort().join('-')
				}
				r[h] = [];
				if ((a[i]['n'] == b[j]['n'] & a[i]['n'] == c[k]['n']) | bname == '3字定位' | pname == '选前三直选' | pname == '选三前直') {
					r[h]['p'] = Math.min(a[i]['p'][0], b[j]['p'][0], c[k]['p'][0])
				} else if (a[i]['n'] == b[j]['n'] | a[i]['n'] == c[k]['n'] | b[j]['n'] == c[k]['n']) {
					r[h]['p'] = Math.min(a[i]['p'][1], b[j]['p'][1], c[k]['p'][1])
				} else {
					r[h]['p'] = Math.min(a[i]['p'][2], b[j]['p'][2], c[k]['p'][2])
				}
				r[h]['n'] = [a[i]['n'], b[j]['n'], c[k]['n']];
				h++
			}
		}
	}
	return r
}
function rhtmls_lm(arr) {
	var strc = "<th class='name m m" + arr['pid'] + "'  pid='" + arr['pid'] + "' >" + arr['name'] + "</th>";
	strc += "<TD class='amount i i" + arr['pid'] + "' pid='" + arr['pid'] + "'>选择:<input pid='" + arr['pid'] + "' mname='" + arr['name'] + "' maxje='" + arr['maxje'] + "' minje='" + arr['minje'] + "'  znum1='" + arr['znum1'] + "' type='radio' name='xz' class='xz xz" + arr['pid'] + "' ";
	if (Number(arr['ifok']) == 0) strc += "disabled";
	strc += " /></td>";
	return strc
}
function rhtmls(arr, q) {
	var strc = "<th class='name m m" + arr['pid'] + "' pid='" + arr['pid'] + "' >";
	if (q == 2 && !isNaN(arr['name'])) strc += "<b class='bb"+arr['name']+"'>"+arr['name']+"</b>";
	else if(q==1) strc += qiu(arr['name']);
	else strc += arr['name'];
	strc += "</th>";
	strc += "<td class='odds p p" + arr['pid'] + "' pid='" + arr['pid'] + "' sname='" + arr['sname'] + "' cname='" + arr['cname'] + "' mname='" + arr['name'] + "' maxje='" + arr['maxje'] + "' minje='" + arr['minje'] + "'><label class='peilv1'>" + rpeilv(arr['peilv1'], arr['ifok']) + "</label></td>";
	strc += "<TD class='amount i i" + arr['pid'] + "' pid='" + arr['pid'] + "'><input type='text' class='ba' ";
	if (Number(arr['ifok']) == 0) strc += "disabled";
	strc += " /></td>";
	//
	return strc
}
$(function() {
	$(".fastgtb .fastv").click(function() {
		var vname = $(this).val();
		var bname = $(".main a.click").html();
		$(".make input:text").removeClass('byellow');
		$(".make input:checkbox").attr("checked", false);
		if (isNaN(vname)) {
			if ($(".duotbs").length == 1) {
				$(".duotbs .duom").each(function() {
					var name = $(this).next().attr('m');
					if (in_array(name, sma[vname])) {
						$(this).next().addClass('byellow')
					}
				})
			} else {
				$(".make td.p").each(function() {
					var pid = $(this).attr('pid');
					var name = $(this).attr('mname');
					if (in_array(name, sma[vname])) {
						$(".i" + pid).find("input:text").addClass('byellow');
						$(".i" + pid).find("input:checkbox").attr("checked", true)
					}
				})
			}
		} else {
			if ($(".duotbs").length == 1) {
				$(".duotbs .duom").each(function() {
					var name = $(this).next().attr('m');
					if (name == vname) {
						$(this).next().addClass('byellow')
					}
				})
			} else {
				$(".make td.p").each(function() {
					var pid = $(this).attr('pid');
					var name = $(this).attr('mname');
					if (name == vname) {
						$(".i" + pid).find("input:text").addClass('byellow');
						$(".i" + pid).find("input:checkbox").attr("checked", true)
					}
				})
			}
		}
	});
	$(".duoexetb a.mode").click(function() {
		var mode = Number($(this).attr('mode'));
		$(".duoexetb .mode").removeClass('on');
		$(this).addClass('on');
		if (mode == 2) {
			$(".duotbsclone").show()
		} else {
			$(".duotbsclone").hide()
		}
	});
	$(".main a").each(function() {
		var bname = $(this).html();
		if (bname == '2字和数' | (bname == '3字和数' & fenlei == 101)) {
			$(this).attr('t', $(this).attr('bid'))
		} else if (bname == '番摊') {
			$(this).attr('t', 2)
		} else if (fenlei == 161) {
			$(this).attr('t', 8)
		} else if (bname == '正码' | bname == '连码' | bname == '跨度' | bname == '前中后三' | bname == '组选3' | bname == '组选6' | bname == '组选6' | bname == '2字组合' | bname == '2字定位' | bname == '3字组合' | bname == '3字定位' | bname == '3字和数' | bname == '总和龙虎' | bname == '1字组合' | bname == '1~5' | bname == '冠亚军组合' | bname == '单号1 ~ 10' | bname == '任选牛牛') {
			$(this).attr('t', 0)
		}  else {
			$(this).attr('t', 1)
		}
	})
});