var upstr = "<span class='up'> +</span>";
var downstr = "<span class='down'>- </span>";
var rtime = Number($("#reloadtime").val());
var cnow;
var gnow;
var gatt;
var r;
var play = new Array();
var mylayer;

function myready() {
	clayer = layername.length;
	mylayer = layer;

	$("#qishu").change(function() {
		lib()
	});
	$("#xsort").change(function() {
		lib()
	});
	$("#reload").click(function() {
		parent.tops.window.location.href = parent.tops.window.location.href;
		return false
	});
	$(".downfast").click(function() {
		$("#downfastfrm").attr('src', "now?xtype=downfast&qishu=" + $("#qishu").val());
	});
	$("#reloadtime").change(function() {
		rtime = Number($(this).val())
	});
	$(".libstyle").change(function() {
		if ($(".duopl").length == 0) {
			$(".lib .xx").hide();
			$(".now a").hide();
			$(".lib ." + $(".libstyle option:selected").attr('v') + "xx").show();
			$(".now ." + $(".libstyle option:selected").attr('v')).show();
		}
	});
	$("#ab").change(function() {
		lib()
	});
	$("#abcd").change(function() {
		lib()
	});
	$("#userid").change(function() {
		lib()
	});
	$("#zanting").click(function() {
		if ($(this).val() == '暂停') {
			$(this).val('开始');
			clearTimeout(r);
		} else {
			$(this).val('暂停');
			time();
		}
	});
	$(".now td:eq(0)").addClass("bover");
	$(".now th:eq(0)").addClass("bred");

	$(".now td.n").click(function() {
		var bid = $(this).attr('bid');
		var bname = $(this).attr('bname');
		$(".now td.n").removeClass('bover');
		$(this).addClass('bover');
		$(".now th").removeClass('bred');
		$(".now .n" + bid).addClass('bred');
		inputxz = 0;
		inputxzb = 0;
		lib();
		return false
	});
	getnow();
	time();
	lib();
	if (ifexe == 1) {
	    $(".psetbtn").click(function(){
		    $(".psets").toggle();
	    });
		$("#pism").click(function() {
			if (!confirm("确定设置所有双面赔率吗？")) return false;
			var val = $("#psetattvalue").val();
			if (isNaN(val) | val == '') {
				alert("请输入正确的赔率！");
				return false;
			}
			var epl = plclass();
			$.ajax({
				type: 'POST',
				url: mulu + 'pset',
				cache: false,
				data: "xtype=pism&epl=" + epl + "&val=" + val,
				success: function(m) {
					if (Number(m) == 1) {
						alert('ok');
						lib0();
					}
				}
			});
		});
		$("#yiwotongbu").click(function() {
			if (!confirm("确定" + $(this).val() + "？")) return false;
			var epl = plclass();
			$.ajax({
				type: 'POST',
				url: mulu + 'pset',
				cache: false,
				data: "xtype=yiwotongbu&gid=" + ngid + "&epl=" + epl,
				success: function(m) {
					if (Number(m) == 1) {
						alert('ok');
						window.location.href = window.location.href;
					}
				}
			});
		});
		$(".moren").click(function() {
			var ac = $(this).attr('ac');
			if (ac == 'writemoren') {
				if (!confirm("确定把当前赔率写入默认赔率吗？")) return false;
				ac = 'writem';
			} else if (ac == 'resetmoren') {
				if (!confirm("确定恢复默认赔率吗？")) return false;
				ac = 'resetm';
			} else if (ac == 'resetzero') {
				if (!confirm("确定把赔率清零吗？")) return false;
				ac = 'resetz';
			} else {
				return false
			}
			$.ajax({
				type: 'POST',
				url: mulu + 'pset',
				cache: false,
				data: 'xtype=mr&action=' + ac,
				success: function(m) {
					if (Number(m) == 1) {
						alert('ok');
						window.location.href = window.location.href
					}
				}
			});
			return false
		});
		$("#pset").click(function() {
			$(".pset").toggle()
		});
		$("#selectitem").change(function() {
			selectma($(this).val());
		});
		$("#psetattvalue").blur(function() {
			$(".lib input:visible").val($(this).val());
		});
		$("#psetcancel").click(function() {
			var eplc = plclass();
			$("input.p1").each(function() {
				$(this).hide();
				$(this).parent().find("span." + eplc + "1").show();
			});
			$("input.p2").each(function() {
				$(this).hide();
				$(this).parent().find("span." + eplc + "2").show()
			});
			$("th.byellow").removeClass('byellow');
			$("td.byellow").removeClass('byellow');
		});
		$("#psetsend").click(function() {
			var peilv = getResult(Number($("#psetattvalue").val()), 4);
			if (peilv == NaN | peilv == undefined) {
				alert("请输入正确的赔率");
				$("#psetattvalue").focus();
				return false
			}
			if ($("input.xz:checked").val() == '2') {
				$("td.byellow").find("input.p2").val(peilv)
			} else if ($("input.xz:checked").val() == '3') {
				$("td.byellow").find("input.p3").val(peilv)
			} else {
				$("td.byellow").find("input.p1").val(peilv);
				$("th.byellow").find("input.p1").val(peilv)
			}
			return false
		});
		$("#psetatt").click(function() {
			var pl = $(".lib td.byellow").length;
			if (pl == 0) return false;
			var action = Number($("#psettype").val());
			var val = Number($("#psetattvalue").val());
			var vals = 0;
			$(".lib td.byellow").each(function() {
				vals = 0;
				if (action == 0) {
					vals = Number($(this).find("input.p1").val()) - val
				} else {
					vals = Number($(this).find("input.p1").val()) + val
				}
				$(this).find("input.p1").val(getResult(vals, 4))
			})
		});
		$(".onepeilvtb .oneclose").click(function() {
			$(".onepeilvtb").hide();
			return false
		});
		$(".onepeilvtb .onesend").click(function() {
			var pid = $(".onepeilvtb td:eq(0)").attr("pid");
			var peilv1 = $(".onepeilvtb input:text").val();
			if (isNaN(peilv1)) {
				alert("输入的赔率不正确!");
				return false
			}
			var epl = Number($(".plmode").val());
			var eplc = plclass();
			if (pself == 0 & (epl == 1 | epl == 3)) {
				peilv1 = getResult(Number($(".p" + pid + " label.peilv1").html()) - Number(peilv1), 4)
			}
			var pl = '{"p1' + pid + '":"' + peilv1 + '"}';
			var ab = $("#ab").val();
			var abcd = $("#abcd").val();
			$.ajax({
				type: 'POST',
				url: mulu + 'pset',
				cache: false,
				async: false,
				data: "xtype=setpeilvall&pl=" + pl + "&abcd=" + abcd + "&ab=" + ab + "&epl=" + epl,
				success: function(m) {
					if (Number(m) == 1) {
						var val = peilv1;
						if (epl == 4) {
							$(".p" + pid).find("span.mp1").html(val)
						} else if (pself == 1 | epl == 2) {
							$(".p" + pid).find("span.zhpeilv1").html(val);
							$(".p" + pid).find("span.mepeilv1").html(val)
						} else {
							$(".p" + pid).find("span.mepeilv1").html(val);
							val = getResult(Number($(".p" + pid).find("span.peilv1").html()) - val, 4);
							$(".p" + pid).find("span.zhpeilv1").html(val)
						}
						$(".onepeilvtb").hide();
						$(".p" + pid).addClass('bc').removeClass('byellow');
						setTimeout(function() {
							$(".p" + pid).removeClass('bc')
						}, 5000)
					}
				}
			})
		});
		$("#psetpost").click(function() {
			if ($(".duopl").length == 1) {
				var epl = $(".plmode").val();
				var eplc = plclass();
				var p1str = '[';
				$("input.p1:visible").each(function(i) {
					if (i > 0) p1str += ',';
					if (pself == 0) {

						p1str += '{"i":"' + $(this).attr('i');
						p1str += '","p":"' + getResult(Number($(this).parent().find("label.peilv1").html()) - Number($(this).val()), 4) + '"}';


					} else {

						p1str += '{"i":"' + $(this).attr('i');
						p1str += '","p":"' + $(this).val() + '"}';

					}
				});
				p1str += ']';
				var p2str = '[';
				$("input.p2:visible").each(function(i) {
					if (i > 0) p2str += ',';
					if (pself == 0) {

						p2str += '{"i":"' + $(this).attr('i');
						p2str += '","p":"' + getResult(Number($(this).parent().find("label.peilv2").html()) - Number($(this).val()), 4) + '"}';


					} else {

						p2str += '{"i":"' + $(this).attr('i');
						p2str += '","p":"' + $(this).val() + '"}';

					}
				});
				p2str += ']';
				var p3str = '[';
				$("input.p3:visible").each(function(i) {
					if (i > 0) p3str += ',';
					if (pself == 0) {

						p3str += '{"i":"' + $(this).attr('i');
						p3str += '","p":"' + getResult(Number($(this).parent().find("label.peilv3").html()) - Number($(this).val()), 4) + '"}';


					} else {

						p3str += '{"i":"' + $(this).attr('i');
						p3str += '","p":"' + $(this).val() + '"}';

					}
				});
				p3str += ']';
				var pid = $("input.xz:checked").parent().attr('pid');
				//alert(p1str);
				//alert(p3str);
				$.ajax({
					type: 'POST',
					url: mulu + 'pset',
					cache: false,
					data: "xtype=setpeilvallduo&p1=" + p1str + "&p2=" + p2str + "&p3=" + p3str + "&pid=" + pid + "&epl=" + epl,
					success: function(m) {
						//$("#test").html(m);
						if (Number(m) == 1) {
							var val, val2;
							$("td.byellow").each(function() {
								val = getResult(Number($(this).find("input.p1").val()), 4);
								val2 = getResult(Number($(this).find("input.p2").val()), 4);
								val3 = getResult(Number($(this).find("input.p3").val()), 4);
								if (isNaN(val)) val = Number($(this).find("span.peilv1").html());
								if (isNaN(val2)) val2 = Number($(this).find("span.peilv2").html());
								if (isNaN(val3)) val3 = Number($(this).find("span.peilv3").html());

								if (epl == 4) {
									$(this).find("span.mp1").html(val);
									$(this).find("span.mp2").html(val2);
									$(this).find("span.mp3").html(val3);
								} else if (pself == 1 | epl == 2) {
									$(this).find("span.zhpeilv1").html(val);
									$(this).find("span.mepeilv1").html(val);
									$(this).find("span.zhpeilv2").html(val2);
									$(this).find("span.mepeilv2").html(val2);
									$(this).find("span.zhpeilv3").html(val3);
									$(this).find("span.mepeilv3").html(val3);
								} else {
									$(this).find("span.zhpeilv1").html(val);
									$(this).find("span.zhpeilv2").html(val2);
									$(this).find("span.zhpeilv3").html(val3);
									val = Number($(this).find("span.peilv1").html()) - val;
									val2 = Number($(this).find("span.peilv2").html()) - val2;
									val3 = Number($(this).find("span.peilv3").html()) - val3;
									$(this).find("span.mepeilv1").html(val);
									$(this).find("span.mepeilv2").html(val2);
									$(this).find("span.mepeilv3").html(val3);
								}
							});
							$("td.byellow").addClass('bc').removeClass('byellow');
							setTimeout(function() {
								$(".lib td.bc").removeClass('bc')
							}, 5000);
							$("#psetcancel").click()
						}
					}
				})
			} else {

				var pl = $(".lib td.byellow").length;
				if (pl == 0) {
					var pl = $(".lib th.byellow").length;
					if (pl == 0) return false
				}
				var epl = $(".plmode").val();
				var eplc = plclass();
				pl = new Array();
				var plstr = '{';
				var j = 0;
				//alert(epl)
				if (pself == 0 & (epl == 1 | epl == 3)) {
					$(".lib td.byellow").each(function(i) {
						if (j != 0) plstr += ",";
						plstr += '"p1' + $(this).attr('pid') + '":"' + getResult(Number($(this).find("label.peilv1").html()) - Number($(this).find(".p1").val()), 4) + '"';
						j++
					})
				} else {
					$(".lib td.byellow").each(function(i) {
						if (j != 0) plstr += ",";
						plstr += '"p1' + $(this).attr('pid') + '":"' + $(this).find(".p1").val() + '"';
						j++
					})
				}
				plstr += "}";
				var ab = $("#ab").val();
				var abcd = $("#abcd").val();
				//alert (plstr);
				$.ajax({
					type: 'POST',
					url: mulu + 'pset',
					cache: false,
					data: 'xtype=setpeilvall&pl=' + plstr + "&abcd=" + abcd + "&ab=" + ab + "&epl=" + epl,
					success: function(m) {
						if (Number(m) == 1) {
							var val;
							$("td.byellow").each(function() {
								val = getResult(Number($(this).find("input.p1").val()), 4);
								if (epl == 4) {
									$(this).find("span.mp1").html(val)
								} else if (pself == 1 | epl == 2) {
									$(this).find("span.zhpeilv1").html(val);
									$(this).find("span.mepeilv1").html(val)
								} else {
									$(this).find("span.zhpeilv1").html(val);
									val = getResult(Number($(this).parent().find("span.peilv1").html()) - val, 4);
									$(this).find("span.mepeilv1").html(val)
								}
							});
							$("td.byellow").addClass('bc').removeClass('byellow');
							setTimeout(function() {
								$(".lib td.bc").removeClass('bc')
							}, 5000);
							$("#psetcancel").click()
						}
					}
				})
			}
		});

		$(".plmode").change(function() {
			var mode = Number($(this).val());
			$("span.pl").hide();
			if (mode == 1) {
				$("span.peilv1").show();
				$("span.peilv2").show();
				$("span.peilv3").show();
				$(".lib label").hide();
			} else if (mode == 2) {
				$("span.mepeilv1").show();
				$("span.mepeilv2").show();
				$("span.mepeilv3").show();
				$(".lib label").hide();
			} else if (mode == 3) {
				$("span.zhpeilv1").show();
				$("span.zhpeilv2").show();
				$("span.zhpeilv3").show();
				$(".lib label").hide();
			} else if (mode == 4) {
				$("span.mp1").show();
				$("span.mp2").show();
				$("span.mp33").show();
				$(".lib label").hide();
			}
			if ($("td.byellow").length > 0) {
				var eplc = plclass();
				$("td.byellow").each(function() {
					$(this).find("label").hide();
					$(this).find("input:text").val($(this).find("label." + eplc + "1").html())
				})
			}
		})
	}

	$("#fly").change(function() {
		if (Number($(this).val()) != 0) {
			$("#pfly").attr("disabled", false)
		} else {
			$("#pfly").attr("disabled", true)
		}
	});
	$("#pfly").click(function() {
		if ($("#fly").val() == undefined) return false;
		var i = 0;
		play = [];
		var flag = false;
		$(".lib a.fly").each(function() {
			flag = false;
			if (Number($(this).html()) >= 1) {
				if (flyid >1000) {
					if (flyid == $(this).parent().prev().attr('pid')) {
						flag = true;
					}
				}else if(flyid>0){
					if($(this).parent().parent().index()+1==flyid){
					   flag = true;
					}
				} else {
					flag = true;

				}
				if (flag) {
					var peilv1 = 0,
						con = '',
						bz = '';

					var bname = $(".now th.bred").html();
                    var maxs= 0;
					if (bname == "任选牛牛" | bname == "连码" | bname == "2字组合" | bname == "2字定位" | bname == "3字组合" | bname == "3字定位" | bname == "组选3" | bname == "组选6") {
						var obj = $("input.xz:checked").parent();
						var pname = obj.attr('mname');
						var pid = obj.attr('pid');
						con = $(this).parent().parent().find("td.c").html();
						peilv1 = getduopeilv(con, bname, pname);
						var sname = obj.attr('sname');
						var cname = obj.attr('cname');
						maxs = $(this).parent().parent().find("a.zcxx").html();
					} else {
						var obj = $(this).parent().prev().prev();
						var pname = obj.attr('mname');
						var pid = obj.attr('pid');
						peilv1 = obj.find("span.peilv1").html()
						var sname = obj.attr('sname');
						var cname = obj.attr('cname');
						maxs = $(this).parent().prev().find("a.zcxx").html();
					}
					var je = Number($(this).html());

					play[i] = [];
					play[i]['pid'] = pid;
					play[i]['je'] = je;
					play[i]['name'] = pname;
					play[i]['bname'] = bname;
					play[i]['peilv1'] = peilv1;
					play[i]['cons'] = con;
					play[i]['con'] = con.split('-');
					play[i]['bz'] = bz;
					play[i]['maxs'] = maxs;
					if (fenlei == 101) {
						if (sname == cname) {
							play[i]['classx'] = sname;
						} else {
							play[i]['classx'] = sname + '-' + cname
						}
					} else if (fenlei == 107) {
						play[i]['classx'] = sname;
					} else {
						if (sname == cname) {
							play[i]['classx'] = bname + '-' + sname;
						} else if (bname == sname) {
							play[i]['classx'] = bname + '-' + cname;
						} else {
							play[i]['classx'] = bname + '-' + sname + '-' + cname
						}
					}
					i++;
				}
			}
		});
	
		if (i > 0) {
			exe()
		}
		flyid = 0;
	});
	$(".ui-dialog").draggable();
	$(".ui-dialog-titlebar-close").click(function() {
		$(".ui-dialog").hide()
	});


	    var cobj = $(".upkj");
    cobj.html($(".upkj",parent.document).html());
    if(ngid==101){
        cobj.attr('class', 'upkj L_CQHLSX');
        cobj.find("b").html('');
    }else{
        var gname = $(".lottery a.selected",parent.document).html();
        if(gname.indexOf('农场')!=-1){
            cobj.attr('class', 'upkj L135');
        }else{
            cobj.attr('class', 'upkj T' + fenlei);
        }
    }
}

function lib() {
	clearTimeout(cnow);
	lib0();
}

function getc(bid, bname) {
	$.ajax({
		type: 'POST',
		url: mulu + 'slib',
		dataType: 'json',
		cache: false,
		data: 'xtype=getc&bid=' + bid,
		success: function(m) {
			var ml = m.length;
			var str = "<tr>";
			for (i = 0; i < ml; i++) {
				str += "<th class='c" + m[i].cid + "'>" + m[i].name + "</th><td cid='" + m[i].cid + "' cname='" + m[i].name + "' class='nowson" + m[i].cid + "'></td>"
			}
			str += "</tr>";
			$(".nowson").html(str);
			$(".nowson th:first").addClass('bred');
			$(".nowson td:first").addClass('bover');
			$(".nowson").show();
			str = null;
			m = null;
			getnowson();
			if (bname == '3字定位') getnowsan();
			$(".nowson td").unbind('click');
			$(".nowson td").click(function() {
				var cid = $(this).attr('cid');
				var cname = $(this).attr('cname');
				$(".nowson td").removeClass('bover');
				$(".nowson th").removeClass('bred');
				$(".nowson th.c" + cid).addClass('bred');
				$(this).addClass('bover');
				libc();
				return false
			});
			libc()
		}
	})
}

function lib0() {
	var bid = $(".now .bover").attr("bid");
	var sid = $(".nowson .bover").attr("sid");
	var bname = $(".now .bred").html();
	$(".lib").removeClass('w1002');
	var abcd = $("#abcd").val();
	var ab = $("#ab").val();
	var qishu = $("#qishu").val();
	var goods = $("#goods").val();
	var xsort = $("#xsort").val();
	var puserid = $("#userid").val();
	var maxksval = $("#maxksvalue").val();
	var setks = $("#setks").val();
	var str = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&goods=" + goods + "&qishu=" + qishu + "&xsort=" + xsort;
	str += "&maxksval=" + maxksval + "&setks=" + setks + "&userid=" + puserid + "&sid=" + sid;
	libs = [];
	$.ajax({
		type: 'POST',
		url: mulu + 'slib',
		dataType: 'json',
		cache: false,
		data: 'xtype=getlib&stype=s' + str,
		success: function(m) {
			//$("#test").html(m);return;
			var ml = m.length;
			var strh = "<td class='data panel'><table class='data_table'><thead><tr class='head'><th>种类</th><th>赔率</th><th>金额</th><th>盈亏</th></tr><tr class='head'><th colspan='4' class='bt' cid='{cid}'>{title}</th></tr></thead><tbody>{tbody}</tbody><tbody><tr><th colspan=2>合计</th><td colspan=2><label class='zcxx xx'>{zcje}</label><label class='zjexx xx hide'>{zje}</label><label class='flyxx xx hide'>{flyje}</label></td></tbody></table></td>";
			var strh2 = "<td class='data panel'><table class='data_table'><tbody>{tbody}</tbody><tbody><tr><th colspan=2>合计</th><td colspan=2><label class='zcxx xx'>{zcje}</label><label class='zjexx xx hide'>{zje}</label><label class='flyxx xx hide'>{flyje}</label></td></tbody></table></td>";
			var strh3 = "<td class='data panel'><table class='data_table'><thead><tr class='head'><th>种类</th><th>选择</th><th>金额</th><th>盈亏</th></tr></thead><tbody>{tbody}</tbody></table></td>";
			var strh4 = "<td class='data panel'><table class='data_table'><thead><tr class='head'><th>种类</th><th>赔率</th><th>金额</th><th>盈亏</th></tr></thead><tbody>{tbody}</tbody><tbody><tr><th colspan=2>合计</th><td colspan=2><label class='zcxx xx'>{zcje}</label><label class='zjexx xx hide'>{zje}</label><label class='flyxx xx hide'>{flyje}</label></td></tbody></table></td>";
			var str = "<tr>";
			var duoflag = 0;
			var sname = '',
				cname = '';
			var mode;
			var td = 4;
			if (bname == '1~5' & fenlei == 101) {
				td = 5
			}
			if (bname == '1~3' & fenlei == 163) {
				td = 3;
			}
			if (fenlei == 151) {
				td = 3;
			}
			var j = 0;
			var trl = 0;
			if (bname == '2字组合' | bname == '2字定位' | bname == '3字组合' | bname == '3字定位' | bname == '组选3' | bname == '组选6' | bname == '连码' | bname == '任选牛牛') {
				trl = 100;
				td = 2;
				duoflag = 1;
			} else {
				mode = $("select.plmode").val();
				if (bname == '1字组合') trl = 10;
				else if (bname == '2字和数') trl = 8;
				else if (bname == '3字和数') trl = 18;
				else if (bname == '跨度') trl = 10;
				else if (bname == '牛牛梭哈') trl = 17;
				else if (bname == '前中后三') trl = 5;
				else if (ml <= 12) trl = 12;
				else trl = ml % td == 0 ? ml / td : ((ml - ml % td) / td) + 1;
			}
			var tdl = 0;
			var tbody = '';
			var zcje = 0;
			var zje = 0;
			var flyje = 0;
			var zstr = '';
			for (i = 0; i < ml; i++) {
				if (bname == '番摊') {
					if (i == 0) {
						str += strh.replace('{title}', m[i]['cname']);

					} else if (i == 4 || i == 8 || i == 20  || i==28 || i==32 || i==36 || i==48 ) {
						//if(i==30) str = str.replace('myclear', 'style="clear:left;"');
						str = str.replace('{tbody}', tbody);
						str = str.replace('{zcje}', getResult(zcje, 1));
						str = str.replace('{zje}', getResult(zje, 1));
						str = str.replace('{flyje}', getResult(flyje, 1));
						if(i==28){
							str += "</tr><tr>";
						}
						str += strh.replace('{title}',  m[i]['cname']);

						zcje = 0;
						zje = 0;
						flyje = 0;
						tbody = '';
					}
				} else if (bname == '总和龙虎' & fenlei == 101) {
					if (i == 0) {
						str += strh.replace('{title}', '总和两面');
					}

					tdl = 3
				} else if (bname == '总和龙虎' & fenlei == 163) {
					if (i == 0) {
						str += strh.replace('{title}', '总和两面');
					} else if (i == 12) {
						str = str.replace('{tbody}', tbody);
						str = str.replace('{zcje}', getResult(zcje, 1));
						str = str.replace('{zje}', getResult(zje, 1));
						str = str.replace('{flyje}', getResult(flyje, 1));
						str += strh.replace('{title}', '龙虎和');

						zcje = 0;
						zje = 0;
						flyje = 0;
						tbody = '';
					} else if (i == 15) {
						str = str.replace('{tbody}', tbody);
						str = str.replace('{zcje}', getResult(zcje, 1));
						str = str.replace('{zje}', getResult(zje, 1));
						str = str.replace('{flyje}', getResult(flyje, 1));
						str += strh.replace('{title}', '总和数');

						zcje = 0;
						zje = 0;
						flyje = 0;
						tbody = '';
					}

					tdl = 4
				} else if (fenlei == 107 & bname == '冠、亚军组合') {
					if (i == 0) {
						str += strh.replace('{title}', '冠、亚军和 指定');

					} else if (i == 17) {
						str = str.replace('{tbody}', tbody);
						str = str.replace('{zcje}', getResult(zcje, 1));
						str = str.replace('{zje}', getResult(zje, 1));
						str = str.replace('{flyje}', getResult(flyje, 1));
						str += strh.replace('{title}', '冠、亚军和 两面');

						zcje = 0;
						zje = 0;
						flyje = 0;
						tbody = '';
					} else if (i == 21) {
						str = str.replace('{tbody}', tbody);
						str = str.replace('{zcje}', getResult(zcje, 1));
						str = str.replace('{zje}', getResult(zje, 1));
						str = str.replace('{flyje}', getResult(flyje, 1));
						str += strh.replace('{title}', '冠军');

						zcje = 0;
						zje = 0;
						flyje = 0;
						tbody = '';
					} else if (i == 37) {
						str = str.replace('{tbody}', tbody);
						str = str.replace('{zcje}', getResult(zcje, 1));
						str = str.replace('{zje}', getResult(zje, 1));
						str = str.replace('{flyje}', getResult(flyje, 1));
						str += strh.replace('{title}', '亚军');

						zcje = 0;
						zje = 0;
						flyje = 0;
						tbody = '';
					}

					tdl = 4
				} else if (fenlei == 107 & bname == '三、四、五、六名') {
					if (i % 16 == 0 | i == 0) {
						if (tbody != '') {
							str = str.replace('{tbody}', tbody);
						}
						str = str.replace('{zcje}', getResult(zcje, 1));
						str = str.replace('{zje}', getResult(zje, 1));
						str = str.replace('{flyje}', getResult(flyje, 1));
						str += strh.replace('{title}', m[i]['sname']);

						zcje = 0;
						zje = 0;
						flyje = 0;
						tbody = '';

					}
					tdl = 4
				} else if (fenlei == 107 & bname == '七、八、九、十名') {

					if (i % 14 == 0 | i == 0) {
						if (tbody != '') {
							str = str.replace('{tbody}', tbody);
						}
						str = str.replace('{zcje}', getResult(zcje, 1));
						str = str.replace('{zje}', getResult(zje, 1));
						str = str.replace('{flyje}', getResult(flyje, 1));
						str += strh.replace('{title}', m[i]['sname']);
						zcje = 0;
						zje = 0;
						flyje = 0;
						tbody = '';

					}
					tdl = 4
				} else if (fenlei == 161 & bname == '正码') {

					if (i % 20 == 0) {
						if (tbody != '') {
							str = str.replace('{tbody}', tbody);
							str = str.replace('{zcje}', getResult(zcje, 1));
							str = str.replace('{zje}', getResult(zje, 1));
							str = str.replace('{flyje}', getResult(flyje, 1));
							zcje = 0;
							zje = 0;
							flyje = 0;
							tbody = '';
						}
						str += strh4;

					}


					tdl = 4
				} else if (fenlei == 103 & bname.indexOf('球') != -1) {

					if (i == 0) {
						str += strh.replace('{title}', bname);

					} else if (i == 20) {
						str = str.replace('{tbody}', tbody);
						str = str.replace('{zcje}', getResult(zcje, 1));
						str = str.replace('{zje}', getResult(zje, 1));
						str = str.replace('{flyje}', getResult(flyje, 1));
						str += strh.replace('{title}', bname + ' 两面');

						zcje = 0;
						zje = 0;
						flyje = 0;
						tbody = '';
					}



					tdl = 2;
				} else if (fenlei == 121 & bname.indexOf('球') != -1) {

					if (i == 0) {
						str += strh.replace('{title}', bname);

					} else if (i == 11) {
						str = str.replace('{tbody}', tbody);
						str = str.replace('{zcje}', getResult(zcje, 1));
						str = str.replace('{zje}', getResult(zje, 1));
						str = str.replace('{flyje}', getResult(flyje, 1));
						str += strh.replace('{title}', bname + ' 两面');

						zcje = 0;
						zje = 0;
						flyje = 0;
						tbody = '';
					}



					tdl = 2;
				} else if (cname != m[i]['cname'] & bname == '1字组合') {
					if (tbody != '') {
						str = str.replace('{tbody}', tbody);
					}
					str = str.replace('{cid}', m[i]['cid']);
					str = str.replace('{zcje}', getResult(zcje, 1));
					str = str.replace('{zje}', getResult(zje, 1));
					str = str.replace('{flyje}', getResult(flyje, 1));
					str += strh.replace('{title}', m[i]['cname']);

					zcje = 0;
					zje = 0;
					flyje = 0;
					tbody = '';
				} else if (sname != m[i]['sname'] & (bname == '1~5' | bname == '1~3')) {
					if (tbody != '') {
						str = str.replace('{tbody}', tbody);
					}
					str = str.replace('{cid}', m[i]['cid']);
					str = str.replace('{zcje}', getResult(zcje, 1));
					str = str.replace('{zje}', getResult(zje, 1));
					str = str.replace('{flyje}', getResult(flyje, 1));
					str += strh.replace('{title}', m[i]['sname']);

					zcje = 0;
					zje = 0;
					flyje = 0;
					tbody = '';
				} else if (sname != m[i]['sname'] & bname == '2字和数') {

					if (tbody != '') {
						str = str.replace('{tbody}', tbody);
					}
					if (i == 20) {

						str += "</tr><tr>";
					}
					str = str.replace('{cid}', m[i]['cid']);
					str = str.replace('{zcje}', getResult(zcje, 1));
					str = str.replace('{zje}', getResult(zje, 1));
					str = str.replace('{flyje}', getResult(flyje, 1));
					str += strh.replace('{title}', m[i]['sname']);

					zcje = 0;
					zje = 0;
					flyje = 0;
					tbody = '';
				} else if (sname != m[i]['sname'] & bname == '3字和数') {
					if (tbody != '') {
						str = str.replace('{tbody}', tbody);
					}

					if (i == 36) {

						str += "</tr><tr>";
					}
					str = str.replace('{cid}', m[i]['cid']);
					str = str.replace('{zcje}', getResult(zcje, 1));
					str = str.replace('{zje}', getResult(zje, 1));
					str = str.replace('{flyje}', getResult(flyje, 1));
					str += strh.replace('{title}', m[i]['sname']);

					zcje = 0;
					zje = 0;
					flyje = 0;
					tbody = '';
				} else if (sname != m[i]['sname'] & (bname == '前中后三' | bname == '跨度' | bname == '牛牛梭哈')) {
					if (tbody != '') {
						str = str.replace('{tbody}', tbody);
					}
					str = str.replace('{cid}', m[i]['cid']);
					str = str.replace('{zcje}', getResult(zcje, 1));
					str = str.replace('{zje}', getResult(zje, 1));
					str = str.replace('{flyje}', getResult(flyje, 1));
					str += strh.replace('{title}', m[i]['sname']);

					zcje = 0;
					zje = 0;
					flyje = 0;
					tbody = '';
				} else if (cname != m[i]['cname'] & bname == '3字和数' & m[i]['cname'] == '尾数') {
					if (tbody != '') {
						str = str.replace('{tbody}', tbody);
					}
					str = str.replace('{cid}', m[i]['cid']);
					str = str.replace('{zcje}', getResult(zcje, 1));
					str = str.replace('{zje}', getResult(zje, 1));
					str = str.replace('{flyje}', getResult(flyje, 1));
					str += strh.replace('{title}', m[i]['sname'] + ' ' + m[i]['cname']);

					zcje = 0;
					zje = 0;
					flyje = 0;
					tbody = '';
				} else {
					if (i == 0) {
						if (duoflag == 1) {
							str += strh3;
						} else {
							str += strh4;
						}
					}
				}
				if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
				if (m[i]['name'] == '质' | m[i]['name'] == '合') continue;
				zstr = ' ';
				if (m[i]['z'] == '1') zstr = " z1";
				tbody += "<tr class='item" + zstr + "'>";
				if (duoflag == 1) {
					tbody += "<th class='m duoname'  pid='" + m[i]['pid'] + "' style='width:200px;' >" + m[i]['name'] + "</th>";
					tbody += "<td class='duoselect' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' sname='" + m[i]['sname'] + "' cname='" + m[i]['cname'] + "' ifok='" + m[i]['ifok'] + "' ><input type=radio name='xz' class='xz' value='1' x1='" + i + "' x2=0  />";
					if (bname == '2字组合') {
						tbody += "对子 <input type=radio name='xz' class='xz' value=2 x1='" + i + "' x2=1  />其他"
					}
					if (bname == '3字组合') {
						tbody += "豹子 <input type=radio name='xz' class='xz' value=2 x1='" + i + "' x2=1 />对子 <input type=radio name='xz' class='xz' value=3 x1='" + i + "' x2=2 />其他";
					}
					tbody += "</td>";
				} else {
					tbody += "<th class='m mms'  pid='" + m[i]['pid'] + "' ";
					if (fenlei == 151) tbody += " style='width:100px;' ";
					tbody += " >" + qiu(m[i]['name'], bname, m[i]['sname']) + "</th>";
					if (mode == undefined) {
						tbody += "<td class='odds' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' sname='" + m[i]['sname'] + "' cname='" + m[i]['cname'] + "' >";
						tbody += "<span class='peilv1 pl'>" + m[i]['peilv1'] + "</span></td>"
					} else {
						tbody += "<td class='odds p" + m[i]['pid'] + " c" + m[i]['cid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "'  sname='" + m[i]['sname'] + "' cname='" + m[i]['cname'] + "' ><span class='peilv1 pl'>" + m[i]['peilv1'] + "</span><span  class='mepeilv1 pl'>" + m[i]['mepeilv1'] + "</span><span class='zhpeilv1 pl'>" + zhpeilv(m[i]['peilv1'], m[i]['mepeilv1']) + "</span><span class='mp1 pl'>" + m[i]['mp1'] + "</span><input type='text' value='" + m[i]['peilv1'] + "' class='small hide p1' /></td>"
					}
				}


				tbody += "<td class='"
				if (Number(m[i]['wje']) == 1) tbody += "warn";
				tbody += "' title='" + m[i]['zs'] + "'  pid='" + m[i]['pid'] + "' ><a  class='zcxx xx xxc'>" + m[i]['zc'] + "</a><a class='zjexx xx xxc hide amount'>" + m[i]['zje'] + "</a><a  class='flyxx xx hide xxc'>" + m[i]['fly'] + "</a></td>";

				tbody += "<td class='risk";
				if (Number(m[i]['wks']) == 1) tbody += " warn";
				tbody += " cgs' ifok='" + m[i]['ifok'] + "'><a ";
				if (Number(m[i]['ks']) > 0) tbody += "class='red'";
				else if (Number(m[i]['ks']) < 0) tbody += "class='lv'";
				tbody += ">" + getResult(Number(m[i]['ks']), 1);
				tbody += "</a>";
				if (duoflag != 1) tbody += " / <a  class='fly'>" + m[i]['bu'] + "</a>";
				tbody += "</td>";
				tbody += "</tr>";
				sname = m[i]['sname'];
				cname = m[i]['cname'];
				zcje += Number(m[i]['zc']);
				zje += Number(m[i]['zje']);
				flyje += Number(m[i]['bu']);
			}
			if (duoflag == 1) {
				str += "<td class='data panel pltd' style='width:800px;'></td>";
			}

			str = str.replace('{tbody}', tbody);
			str += "</tr>";
			str = str.replace('{zcje}', getResult(zcje, 1));
			str = str.replace('{zje}', getResult(zje, 1));
			str = str.replace('{flyje}', getResult(flyje, 1));
			zcje = 0;
			zje = 0;
			flyje = 0;
			tbody = '';
			$(".lib tbody").html(str);
			changeh();
			$(".lib .xx").hide();
			$(".lib ." + $(".libstyle option:selected").attr('v') + "xx").show();
			if ($(".lib table.data_table").length == 1) {
				$(".lib table.data_table").css("width", "33%");
				$(".lib table.data_table").css("float", "none");
				$(".lib table.data_table").css("margin", "auto");
			}
			if (duoflag == 1) {
				$(".lib table.data_table").css("width", "450px");
				$(".lib table.data_table").css("float", "left");
				$(".lib table.data_table").css("margin-left", "0px");
			}
			if (mode != undefined) {
				$(".lib span.pl").hide();
				mode = Number(mode);
				if (mode == 1) {
					$(".lib span.peilv1").show()
				} else if (mode == 2) {
					$(".lib span.mepeilv1").show()
				} else if (mode == 3) {
					$(".lib span.zhpeilv1").show()
				} else if (mode == 4) {
					$(".lib span.mp1").show()
				}
			}
			str = null;
			m = null;
			$("input.p1").parent().click(function() {
				if ($(this).find("span:visible").length > 0) $("#psetattvalue").val($(this).find("span:visible").html());
				else $("#psetattvalue").val($(this).find("input:visible").val());
			});
			if (duoflag == 1) {
				duofunc();
				$(".lib .pltd").append("<table class='data_table list libs'><thead><tr><td colspan=2>每页显示:<select class='pagesize'><option value=30>30</option><option value=60>60</option><option value=150>150</option><option value=300>300</option></select></td><td colspan='2'><select class='pages'></select></td></tr><tr><th>序号</th><th>內容</th><th>实占/总额/已补/注数</th><th>预计亏损/需补</th></thead></tr></table>");

			} else {
				addfunc();
			}


		}
	})
}

function duofunc() {
	$(".lib input[name='xz']").click(function() {
		$(".duoname").removeClass('bred');
		$(this).parent().parent().find(".duoname").addClass('bred');
		inputxz = Number($(this).attr('x1'));
		inputxzb = Number($(this).attr('x2'));
		var ifoks = Number($(this).parent().attr('ifok'));
		var sid = $(".now .bover").attr("sid");
		var bname = $(".now .bover").attr("bname");
		var abcd = $("#abcd").val();
		var ab = $("#ab").val();
		var qishu = $("#qishu").val();
		var goods = $("#goods").val();
		var xsort = $("#xsort").val();
		var puserid = $("#userid").val();
		var pid = $(this).parent().attr('pid');
		var pname = $(this).parent().attr('mname');
		var zhenghe = $("#zhenghe").attr("checked") ? 1 : 0;
		var str = "&sid=" + sid + "&abcd=" + abcd + "&ab=" + ab + "&qishu=" + qishu + "&xsort=" + xsort;
		str += "&zhenghe=" + zhenghe + "&userid=" + puserid + "&pid=" + pid;
		$(".duopl").remove();
		$(".libs tr.con").remove();
		$.ajax({
			type: 'POST',
			url: mulu + 'slib',
			dataType: 'json',
			cache: false,
			data: 'xtype=duoxxss' + str,
			success: function(m) {
				//alert(m);return;
				var str = "<table class='data_table duopl' ><tbody>";
				var mpl = m['pl'][0].length;
				var mode = $("select.plmode").val();
				var tmp;
				for (i = 0, j = 0; i < mpl; i++) {
					if (m['pl'][0][i].indexOf('-') != -1) {
						if (fenlei == 121) {
							if (i > 0) str += "</tr>";
							str += "<tr class='item'>";
						} else {
							if (i == 0) str += "<tr class='item'>";
						}
						tmp = m['pl'][0][i].split('-');
						str += "<th colspan=10>" + tmp[0] + "</th></tr><tr class='item'>";
						str += "<th class='m mms' name='" + m['pl'][0][i] + "' style='width:60px;'>" + qiu(tmp[1], bname) + "</th>";
						j = 0;
					} else {
						if (i == 0) str += "<tr class='item'>";
						str += "<th class='m mms' name='" + m['pl'][0][i] + "' style='width:60px;'>" + qiu(m['pl'][0][i], bname) + "</th>";
					}
					if (ifoks != 1) {
						m['pl'][1][i] = '-';
						m['pl'][2][i] = '-';
						m['pl'][3][i] = '-';
					}
					if (ifexe == 1) {
						str += "<td mname='" + m['pl'][0][i] + "' class='odds'><span class='peilv1 pl'>" + m['pl'][1][i] + "</span><span class='mepeilv1 pl'>" + m['pl'][4][i] + "</span><span class='zhpeilv1 pl'>" + zhpeilv(m['pl'][1][i], m['pl'][4][i]) + "</span><span class='mp1 pl'>" + m['pl'][7][i] + "</span><input type='text' value='" + m['pl'][1][i] + "' i='" + i + "' class='small hide p1' />";

						if (bname == '2字组合') {
							str += "<BR /><span class='peilv2 pl'>" + m['pl'][2][i] + "</span><span class='mepeilv2 pl'>" + m['pl'][5][i] + "</span><span class='zhpeilv2 pl'>" + zhpeilv(m['pl'][2][i], m['pl'][5][i]) + "</span><span class='mp2 pl'>" + m['pl'][8][i] + "</span><input type='text' value='" + m['pl'][2][i] + "'  i='" + i + "'  class='small hide p2' />";
						}
						if (bname == '3字组合') {
							str += "<BR /><span class='peilv2 pl'>" + m['pl'][2][i] + "</span><span class='mepeilv2 pl'>" + m['pl'][5][i] + "</span><span class='zhpeilv2 pl'>" + zhpeilv(m['pl'][2][i], m['pl'][5][i]) + "</span><span class='mp2 pl'>" + m['pl'][8][i] + "</span><input type='text' value='" + m['pl'][2][i] + "'  i='" + i + "'  class='small hide p2' />";
							str += "<BR /><span class='peilv3 pl'>" + m['pl'][3][i] + "</span><span class='mepeilv3 pl'>" + m['pl'][6][i] + "</span><span class='zhpeilv3 pl'>" + zhpeilv(m['pl'][3][i], m['pl'][6][i]) + "</span><span class='mp3 pl'>" + m['pl'][9][i] + "</span><input type='text' value='" + m['pl'][3][i] + "'  i='" + i + "'  class='small hide p3' />";
						}

					} else {
						str += "<td mname='" + m['pl'][0][i] + "' class='tiao odds'><span class='peilv1 pl'>" + m['pl'][1][i] + "</span>";
						if (bname == '2字组合') {
							str += "<BR /><span class='peilv2 pl'>" + m['pl'][2][i] + "</span>";
						}
						if (bname == '3字组合') {
							str += "<BR /><span class='peilv2 pl'>" + m['pl'][2][i] + "</span>";
							str += "<BR /><span class='peilv3 pl'>" + m['pl'][3][i] + "</span>";
						}
					}
					str += "</td>";
					j++;
					if (j == 5) {
						str += "</tr><tr class='item'>";
						j = 0;
					}

				}
				str += "</tr></tbody></table>";
				$(".lib .pltd").prepend(str);
				str = null;
				if (mode != undefined) {
					$(".duopl span.pl").hide();
					$(".duopl span.pl").hide();
					mode = Number(mode);
					if (mode == 1) {
						$(".duopl span.peilv1").show();
						$(".duopl span.peilv2").show();
						$(".duopl span.peilv3").show();
					} else if (mode == 2) {
						$(".duopl span.mepeilv1").show();
						$(".duopl span.mepeilv2").show();
						$(".duopl span.mepeilv3").show();
					} else if (mode == 3) {
						$(".duopl span.zhpeilv1").show();
						$(".duopl span.zhpeilv2").show();
						$(".duopl span.zhpeilv3").show();
					} else if (mode == 4) {
						$(".duopl span.mp1").show();
						$(".duopl span.mp2").show();
						$(".duopl span.mp3").show();
					}

					if (ifexe == 1) {
						var eplc = plclass();
						$(".duopl span." + eplc + "1").click(function() {
							$(this).hide();
							$(this).parent().find("input.p1").show();
							$(this).parent().find("input.p1").val($(this).html());
							$("#psetvalue").val($(this).html());
							$(this).parent().addClass('byellow')
						});
						$(".duopl span." + eplc + "2").click(function() {
							$(this).hide();
							$(this).parent().find("input.p2").show();
							$(this).parent().find("input.p2").val($(this).html());
							$("#psetvalue").val($(this).html());
							$(this).parent().addClass('byellow')
						});
						$(".duopl span." + eplc + "3").click(function() {
							$(this).hide();
							$(this).parent().find("input.p3").show();
							$(this).parent().find("input.p3").val($(this).html());
							$("#psetvalue").val($(this).html());
							$(this).parent().addClass('byellow')
						});
						$(".duopl .m").click(function() {
							var eplc = plclass();
							var nz = inputxzb + 1;
							var peilv1 = $(this).next().find("span." + eplc + nz).html();
							$(this).next().find("span." + eplc + nz).hide();
							$(this).next().find("input.p" + nz).show();
							$(this).next().find("input.p" + nz).val(peilv1);
							$(this).next().addClass("byellow");

						});
						$(".duopl input").click(function() {
							$("#psetvalue").val($(this).val())
						});
					}
				}

				libs = m['rs'];
				ll = libs.length;
				$(".libs tr.con").remove();
				if (ll == 0) return;
				psize = Number($(".libs select.pagesize").val());
				setpage();
				$(".libs select.pagesize").change(function() {
					psize = Number($(this).val());
					setpage();
					$(".libs .pages").change();
				});
				$(".libs .pages").change(function() {
					var thisp = Number($(this).val());
					$(".libs tr.con").remove();
					str = '';
					for (i = (thisp - 1) * psize; i < (thisp - 1) * psize + psize; i++) {
						if (i >= ll) break;
						str += "<tr class='item con ";
						if (Number(libs[i]['z']) == 1) str += "z1";
						else if (Number(libs[i]['z']) == 3) str += "z3";
						str += "' i="+i+">";
						str += "<td class='xh'>" + (i + 1) + "</td>";
						str += "<td class='c' bz='" + libs[i]['bz'] + "'>" + libs[i]['con'] + "</td>";
						str += "<td><a class='xx zcxx xxc'>" + libs[i]['zc'] + "</a> / " + libs[i]['zje'] + " / <a class='xx flyxx xxc'>" + libs[i]['fly'] + "</a> / " + libs[i]['zs'] + "</td>";

						str += "<td class='";
						if (Number(libs[i]['wks']) == 1) str += " warn";
						str += "'><a "
						if (Number(libs[i]['ks1']) > 0) str += "class='red'";
						else if (Number(libs[i]['ks1']) < 0) str += "class='lv'";
						str += " >" + libs[i]['ks1'] + "</a> / <a class='fly'>" + getbu(libs[i]['ks'], libs[0]['yks'], libs[i]['zc'], libs[0]['yje'], 0,libs[i]['fly'], bname) + "</a>";
						str += "</td>";

						str += "</tr>"
					}
					$(".libs").append(str);
					str = null
				});
				$(".libs .pages").change();
				$(".plmode").change();
				$(".libs tr.item td").mouseover(function() {
					$(this).parent().addClass('hover')
				}).mouseout(function() {
					$(this).parent().removeClass('hover')
				});

				flyclick();
				//flyxxclick('libs');
				zcxxclick('libs');
			}
		})
	});
	$(".lib").find("input[type='radio']:eq(" + inputxzb + ")").click();
	$(".duoname").click(function() {
		inputxzb = 0;
		$(this).parent().find("input:eq(0)").click();
	});
}
var flyid = 0;

function flyclick() {
	$("a.fly").each(function() {
		if (Number($(this).html()) > 0) $(this).addClass('flys')
	});
	$("a.fly").click(function() {
		if($(".duopl").length==1){
			flyid = Number($(this).parent().parent().attr('i'))+1;
		}else{	
		    flyid = Number($(this).parent().prev().prev().attr('pid'));
	  }
		$("#pfly").click();
	})
}

function getduopeilv(str, bn, pn) {
	var arr = str.split('-');
	var al = arr.length;
	pone = [];
	ptwo = [];
	pshree = [];
	var peilv;
	var htm;
	var zhi = 0;
	if (bn == '连码' & (pn == '选前二直选' | pn == '选前三直选' | pn == '选三前直')) {
		zhi = 1;
	}
	if ((bn == '连码' & zhi == 0) | bn == '组选3' | bn == '组选6' | bn == '2字组合' | bn == '3字组合' | bn == '任选牛牛') {
		$(".duopl th.m").each(function(i) {
			htm = $(this).attr('name');
			if (bn == '3字组合') {
				if (arr[0] == arr[1] & arr[0] == arr[2]) {
					pone[htm] = Number($(this).next().find("span.peilv1").html());
				} else if (arr[0] == arr[1] | arr[0] == arr[2] | arr[1] == arr[2]) {
					pone[htm] = Number($(this).next().find("span.peilv2").html());
				} else {
					pone[htm] = Number($(this).next().find("span.peilv3").html());
				}
			} else if (bn == '2字组合') {
				if (arr[0] == arr[1] | arr[0] == arr[2]) {
					pone[htm] = Number($(this).next().find("span.peilv1").html());
				} else {
					pone[htm] = Number($(this).next().find("span.peilv2").html());
				}
			} else {
				pone[htm] = Number($(this).next().find("span.peilv1").html());
			}
		});
		peilv = peilvmin(arr, pone);
	} else {
		var nl;
		if (bn == '2字定位' | bn == '3字定位') {
			nl = 10;
		} else if (pn == '选前二直选' | pn == '选前三直选') {
			nl = 11;
		} else if (pn == '选三前直') {
			nl = 20;
		}
		$(".duopl th.m").each(function(i) {
			htm = $(this).attr('name');
			if (i < nl) {
				pone[htm] = Number($(this).next().find('span.peilv1').html());
				//alert($(this).next().find('span.peilv1').html());
			} else if (i < nl * 2) {
				ptwo[htm] = Number($(this).next().find('span.peilv1').html());
			} else if (i < nl * 3) {
				pshree[htm] = Number($(this).next().find('span.peilv1').html());
			}
		});
		if (bn == '3字定位' | pn == '选前三直选' | pn == '选三前直') {
			peilv = Math.min(pone[arr[0]], ptwo[arr[1]], pshree[2]);
		} else {
			peilv = Math.min(pone[arr[0]], ptwo[arr[1]]);
		}
	}
	return peilv
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

function setpage() {
	maxpage = ll % psize == 0 ? ll / psize : ((ll - ll % psize) / psize + 1);
	str = '';
	for (i = 1; i <= maxpage; i++) {
		str += "<option value='" + i + "'>" + i + "</option>"
	}

	$(".libs .pages").html(str);
}
var inputxz = 0;
var inputxzb = 0;
var ssid = 0;
libs = [];
var ll = 0;
var psize = 0;
var maxpage = 0;

function getbu(ks, yks, zc, yje, peilv,yfje, sname) {
	var kks = ks;
	var bu = 0;
	ks = Math.abs(Number(ks));
	yks = Math.abs(Number(yks));
	zc = Number(zc);
	yje = Number(yje);
	peilv = Number(peilv);
	yfje = Number(yfje);
   

	if (sname == "任选牛牛"  | sname == "连码" | sname == "2字组合" | sname == "2字定位" | sname == "3字组合" | sname == "3字定位" | sname == "组选3" | sname == "组选6") {
		if (zc > yje) return getResult(zc - yje-yfje, 0);
		else return 0
	} else {
		if (ks > yks & kks < 0) {
			bu = getResult((ks - yks) / peilv, 0);
			if (isNaN(bu)) return 0;
			else return bu;
		} else {
			return 0
		}
	}
}

function zhpeilv(v1, v2) {

	if (pself == 1) {
		return v2;
	} else {
		if (v1 == '-') return '-';
		return getResult(Number(v1) - Number(v2), 4)
	}
}

function plclass() {
	var mode = Number($(".plmode").val());
	var v;
	if (mode == 1) v = 'peilv';
	else if (mode == 2) v = 'mepeilv';
	else if (mode == 3) v = 'zhpeilv';
	else if (mode == 4) v = 'mp';
	return v
}

function qiu(n, bname, sname) {
	if (isNaN(n)) {
		return n
	} else {

		if(bname=='番摊'){
             return n;
		}else if (fenlei == 151) {
			if (n > 100) {
				n = "<img src='../imgn/sz" + (n % 10) + "1.png' /><img src='../imgn/sz" + (n % 10) + "1.png' /><img src='../imgn/sz" + (n % 10) + "1.png' />"
			} else if (n > 10) {
				n = "<img src='../imgn/sz" + n.substr(0, 1) + "1.png' /><img src='../imgn/sz" + (n % 10) + "1.png' />"
			} else {
				n = "<img src='../imgn/sz" + n + "1.png' />"
			}
			return n
		} else if (fenlei == 107 & sname == '冠亚和') {

			return n;
		} else if (fenlei == 163 & sname == '总和龙虎') {

			return "<span><b class='bg b_" + n + "'>" + n + "</b></span>";
		} else {
			if (fenlei != 101 & fenlei != 107 & fenlei != 163) {
				if (n < 10) n = '0' + Number(n);
			}
			return "<span><b class='b" + n + "'>" + n + "</b></span>";
		}
	}
}

function selectma(val) {
	$("#psetcancel").click();
	var eplc = plclass();
	if (val == "全部") {
		if ($(".duopl").length == 1) {
			var nz = inputxzb + 1;
			$(".lib span." + eplc + nz).each(function() {
				$(this).hide();
				$(this).parent().find("input.p" + nz).show();
				$(this).parent().find("input.p" + nz).val($(this).html());
				$(this).parent().addClass('byellow');
			});
		} else {
			$(".lib span." + eplc + "1").each(function() {
				$(this).hide();
				$(this).parent().find("input.p1").show();
				$(this).parent().find("input.p1").val($(this).html());
				$(this).parent().addClass('byellow');
			});
		}
		$("#selectitem option:eq(0)").prop("selected", true);
		return false;
	}
	if (val == "数字") {
		$(".lib span." + eplc + "1").each(function() {
			if (!isNaN($(this).parent().attr('mname'))) {
				$(this).hide();
				$(this).parent().find("input.p1").show();
				$(this).parent().find("input.p1").val($(this).html());
				$(this).parent().addClass('byellow');
			}
		})
	} else {
		if (val == "双面") {
			var sm = ["单", "双", "大", "小", "质", "合", "合单", "合双", "尾大", "尾小", "龙", "虎", "三军大", "三军小", "和单", "和双", "和大", "和小", "和尾大", "和尾小", "和尾质", "和尾合", "总单", "总双", "总大", "总小", "总尾大", "总尾小", "总尾质", "总尾合", "总和单", "总和单", "总和双", "总和大", "总和小", "总大单", "总大双", "总小单", "总小双", "前(多)", "后(多)", "单(多)", "双(多)"]
		} else if (val == "四季") {
			var sm = ["春", "夏", "秋", "冬"]
		} else if (val == "五行") {
			var sm = ["金", "木", "水", "火", "土"]
		} else if (val == "方位") {
			var sm = ["东", "西", "南", "北"]
		} else if (val == "中发白") {
			var sm = ["中", "发", "白"]
		}
		$(".lib span." + eplc + "1").each(function() {
			if (in_array($(this).parent().attr('mname'), sm)) {
				$(this).hide();
				$(this).parent().find("input.p1").show();
				$(this).parent().find("input.p1").val($(this).html());
				$(this).parent().addClass('byellow');
			}
		})
	}
	$("#selectitem option:eq(0)").prop("selected", true);
}

function addfunc() {
	zcxxclick('lib');
	//flyxxclick('lib');
	$("tr.z1").find("td").addClass('z1');
	$("tr.z3").find("td").addClass('z3');
	$("tr.z1").find("th").addClass('z1');
	$("tr.z3").find("th").addClass('z3');

	$(".lib tr.item td").mouseover(function() {
		$(this).parent().addClass('hover')
	}).mouseout(function() {
		$(this).parent().removeClass('hover')
	});


	$(".lib .xx").each(function() {
		if ($(this).html() == '0') {
			$(this).addClass('black');
		}
	});


	if (ifexe == 1 & layer == 1) {
		$(".lib span.pl").click(function() {
			$(this).hide();
			$(this).parent().find("input.p1").val($(this).html());
			$(this).parent().find("input.p1").show();
			$(this).parent().addClass('byellow');
			$("#psetvalue").val($(this).html());
			return false
		});
		$(".lib th.m").click(function() {
			var pid = $(this).attr("pid");
			var eplclass = plclass();
			var peilv1 = $(this).parent().find("span." + eplclass + "1").html();
			var posi = $(this).position();
			$(".onepeilvtb td:eq(0)").html($(this).html());
			$(".onepeilvtb td:eq(0)").attr('pid', pid);
			$(".onepeilvtb input:text").val(peilv1);
			$(".onepeilvtb").css('left', posi.left);
			$(".onepeilvtb").css('top', posi.top + $(this).height());
			$(".onepeilvtb").show();
			return false
		});
		$(".lib th.bt").click(function() {
			$("#psetcancel").click();
			var plc = plclass();
			$(this).parent().parent().parent().find("span." + plc + "1").each(function() {
				$(this).hide();
				$(this).parent().find("input.p1").val($(this).html());
				$(this).parent().find("input.p1").show();
				$(this).parent().addClass('byellow');
				$("#psetvalue").val($(this).html());
			});
		});
		$(".lib td.odds").click(function() {
			var plc = plclass();
			if ($(this).find("input:visible").length > 0) {
				$(this).find("input").hide();
				$(this).find("span." + plc + "1").show();
				$(this).removeClass('byellow');
			} else {
				$(this).find("span." + plc + "1").hide();
				$(this).parent().find("input.p1").val($(this).find("span." + plc + "1").html());
				$(this).parent().find("input.p1").show();
				$(this).addClass('byellow');
			}
		});
	}
	if ($(".duopl").length == 0) {
		$(".lib .xx").hide();
		$(".now a").hide();
		$(".lib ." + $(".libstyle option:selected").attr('v') + "xx").show();
		$(".now ." + $(".libstyle option:selected").attr('v')).show();
	}
	flyclick();
}

function sumje() {
	var je = 0;
	$(".sendtb .je").each(function() {
		je += Number($(this).val())
	});
	$(".sendtb .sumje").html(je)
}

function exe() {
	var str = '';
	var je = 0;
	var bname = $(".now th.bred").html();
	var i = play.length;
	if(isNaN(play[0]['peilv1'])) return false;
	for (j = 0; j < i; j++) {
		str += "<tr pid='" + play[j]['pid'] + "' content='' class='cg s" + j + "'>";
		str += "<td>" + (j + 1) + "</td>";
		if (bname == '任选牛牛' | bname == '连码' | bname == '2字组合' | bname == '2字定位' | bname == '3字组合' | bname == '3字定位' | bname == '组选3' | bname == '组选6') {
			str += "<td>" + play[j]['name'] + ' <label class=red>' + play[j]['con'].join('-') + "</label></td>"
		} else {
			str += "<td>" + play[j]['classx'] + ' <label class=red>' + play[j]['name'] + "</label></td>"
		}
		str += "<td class='p1'><label class='red'>" + play[j]['peilv1'];
		str += "</label><input type='text' class='small peilv1' value='" + play[j]['peilv1'] + "' />";
		str += "</td>";
		str += "<td class='tpoints'><input type='text' class='small points' value='" + 1 + "' />%</td>";
		str += "<td class='amount'><input class='small je' value='" + play[j]['je'] + "' max='"+play[j]['maxs']+"' /></td>";
		str += "<td class='zt'><a href='javascript:void(0)'>删除</a></td>";
		str += "</tr>";
		je += Number(play[j]['je'])
	}


	var obj = $(".sendtb");
	obj.show();
	obj.find("#betlist").html(str);
	obj.find("#bcount").attr('v', i);
	obj.find("#bcount").html("注数：" + i);
	obj.find("#btotal").html("总金额：" + je);
	obj.find("#btotal").attr('v', je);
	str = null;
	psend = play;
	play = null;

	if (Number($("#fly").val()) == 2) {
		$(".sendtb .tpoints").show();
		$(".sendtb .p1 .peilv1").show();
		$(".sendtb .p1 label").hide();
	} else {
		$(".sendtb .tpoints").hide();
		$(".sendtb .p1 .peilv1").hide();
		$(".sendtb .p1 label").show();
	}
	addfunc2();
}

function addfunc2() {
	var obj = $(".sendtb");
	obj.find(".close").unbind('click');
	obj.find(".close").click(function() {
		obj.hide();
		$(".ui-fronts").hide();
	});
	obj.find(".qr").unbind('click');
	obj.find(".zt a").click(function() {
		var zs, zje, key;
		if ($(this).html() == "删除") {
			$(this).parent().parent().find("td").css("text-decoration", "line-through");
			$(this).parent().parent().find("input:text").prop("disabled", true);
			$(this).html("恢复");
			$(this).css("color", "gray");
			zs = Number(obj.find("#bcount").attr('v')) - 1;
			zje =getResult( Number(obj.find("#btotal").attr('v')) - Number($(this).parent().parent().find("input.je").val()),0);
			obj.find("#bcount").html("注数：" + zs);
			obj.find("#btotal").html("总金额：" + zje);
			obj.find("#bcount").attr('v', zs);
			obj.find("#btotal").attr('v', zje);
			key = Number($(this).parent().parent().find("td:eq(0)").html()) - 1;
			psend[key]['sc'] = 1;

		} else {
			$(this).parent().parent().find("td").css("text-decoration", "none");
			$(this).parent().parent().find("input:text").prop("disabled", false);
			$(this).html("删除");
			$(this).css("color", "blue");
			zs = Number(obj.find("#bcount").attr('v')) + 1;
			zje = getResult(Number(obj.find("#btotal").attr('v')) + Number($(this).parent().parent().find("input.je").val()),0);
			obj.find("#bcount").html("注数：" + zs);
			obj.find("#btotal").html("总金额：" + zje);
			obj.find("#bcount").attr('v', zs);
			obj.find("#btotal").attr('v', zje);
			key = Number($(this).parent().parent().find("td:eq(0)").html()) - 1;
			psend[key]['sc'] = 0;
		}
	});
	obj.find("td.amount input").keyup(function() {
		$(this).val($(this).val().replace(/\D/g, ''));
		if(Number($(this).val())>Number($(this).attr('max'))){
		    $(this).val($(this).attr('max'));
			alert("最大补货金额:"+$(this).attr('max'));
		}
	}).keypress(function() {
		$(this).val($(this).val().replace(/\D/g, ''));
		if(Number($(this).val())>Number($(this).attr('max'))){
		    $(this).val($(this).attr('max'));
			alert("最大补货金额:"+$(this).attr('max'));
		}
	});
	$(".sendtb td").hover(function() {
		$(this).parent().find("td").addClass('hover');
	}, function() {
		$(this).parent().find("td").removeClass('hover');
	});
	$(".ui-fronts").show();
	obj.show();
	obj.find(".qr").show();
	obj.find("button:eq(2)").show();
	obj.find(".plts").show();
	obj.find(".cgts").hide();
	obj.find(".cgts").css("color", "red");

	$(".sendtb").find(".qr").click(function() {
		obj.find("button").prop("disabled", true);
		var pstr = '[';
		for (i = 0; i < psend.length; i++) {
			if (i != 0) pstr += ',';
			psend[i]['je'] = obj.find(".s" + i + " .amount").find("input").val();
			if (Number($("#fly").val()) == 2) {
			    psend[i]['peilv1'] = obj.find(".s" + i + " input.peilv1").val();
				psend[i]['points'] = obj.find(".s" + i + " input.points").val();
			}
			
			pstr += json_encode_js(psend[i])
		}
		pstr += ']';

		var abcd = $("#abcd").val();
		var ab = $("#ab").val();
		var bid = $(".main a.click").attr("bid");
        var fly = $("#fly").val();
		var str = "&abcd=" + abcd + "&ab=" + ab + "&bid=" + bid+"&fly="+fly;

		$.ajax({
			type: 'POST',
			url: mulu + 'slib',
			data: 'xtype=bucang&pstr=' + pstr + str,
			dataType: 'json',
			cache: false,
			async: false,
			success: function(m) {
				//$("#test").html(m);return;
				var ml = m.length;

				var gflag = false;
				var bflag = false;
				var err = false;
				var objs;
				for (i = 0; i < ml; i++) {
					
					objs = obj.find(".cg:eq(" + i + ")");
					objs.find("input.je").replaceWith(m[i]['je']);
					objs.find("input.points").replaceWith(m[i]['points']);
					if (Number(m[i]['cg']) == 1) {
						if (Number(m[i]['cgs']) == 1) {
							objs.find("td.zt").html("赔率变更!");
							objs.find("td.zt").css("color", "red");
							err = true;
						} else {
							objs.find("td.zt").html("成功!");
							objs.find("td.zt").css("color", "green");
						}
						objs.find("td.p1").html(m[i]['peilv1']);
						if (m[i]['name'] == '三中二' | m[i]['name'] == '二中特') {
							objs.find("td.p1").html(objs.find("td.p1").html() + "/" + m[i]['peilv2']);
						}
					} else {
						objs.find("td.zt").html(m[i]['err']);
						objs.find("td.zt").css("color", "red");
						err = true;
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
						$(".ui-fronts").hide();
					}, 3000);
				}
				play = new Array();
				psend = new Array();
				psend = null;
				$(".zje").val('');
				$(".duoje").val('');
				$(".ggje").val('');
				getlast15();
				getusermoney();

			}
		});
		return false
	})
}

function time() {
	rtime--;
	if (rtime == 0) {
		clearTimeout(r);
		lib();
		rtime = Number($("#reloadtime").val())
	}
	$("label.time").html(rtime);
	r = setTimeout(time, 1000)
}

function getnow() {
	var puserid = $("#userid").val();
	var qishu = $("#qishu").val();
	$.ajax({
		type: 'POST',
		url: mulu + 'slib',
		dataType: 'json',
		cache: false,
		data: 'xtype=getnow&userid=' + puserid + "&qishu=" + qishu,
		success: function(m) {

			var ml = m.length;
			for (i = 0; i < ml; i++) {
				if (fenlei == 107) {
					$(".now td:eq(" + i + ")").html("<a class='zc'>" + m[i]['zc'] + "</a><a class='zje'>" + m[i]['zje'] + "</a><a class='fly'>" + Number(m[i]['flyje']) + "</a>");
				} else {
					$(".now td.nx" + m[i]['bid']).html("<a class='zc'>" + m[i]['zc'] + "</a><a class='zje'>" + m[i]['zje'] + "</a><a class='fly'>" + Number(m[i]['flyje']) + "</a>");
				}
			}

			$(".now a").hide();
			$(".now a." + $(".libstyle option:selected").attr('v')).show();
			clearTimeout(gnow);
			gnow = setTimeout(getnow, 4000)
		}
	})
}


function zcxxclick(tb) {
	
	$("." + tb + " a.xxc").click(function() {
		var flys=0;
		if($(this).hasClass('flyxx')){
		    flys=1;
		}
		var sid = $(".now .bover").attr("sid");
		var abcd = $("#abcd").val();
		var ab = $("#ab").val();

		var qishu = $("#qishu").val();
		var goods = $("#goods").val();
		var puserid = $("#userid").val();
		var orderby = $(".sort").attr("orderby");
		var sorttype = $(".sort").attr("sorttype");
		var page = $(".sort").attr("page");
		var xtype = $(".sort").attr("xtype");
		var bname = $(".now th.bred").html();
		var con = '';
		if (bname == '2字组合' | bname == '2字定位' | bname == '3字组合' | bname == '3字定位' | bname == '组选3' | bname == '组选6' | bname == '连码' | bname == '任选牛牛') {
			con = $(this).parent().parent().find("td.c").html();
			var pid = $("input[name='xz']:checked").parent().attr('pid');
		} else {
			var pid = $(this).parent().attr('pid');
		}

		var sstr = "&sid=" + sid + "&abcd=" + abcd + "&ab=" + ab + "&goods=" + goods + "&qishu=" + qishu;
		sstr += "&puserid=" + puserid + "&page=" + page + "&orderby=" + orderby;
		sstr += "&sorttype=" + sorttype + "&xtypes=" + xtype + "&pid=" + pid + "&con=" + con+"&flys="+flys;

		var posi = $(this).position();
		if (posi.left + $(".xxtb").width() > document.body.clientWidth) {
			var val = posi.left + $(this).width() - $(".xxtb").width();
			if (val < 0) val = 3;
			$(".xxtb").css('left', val)
		} else {
			$(".xxtb").css('left', posi.left + $(this).width())
		}
		$(".xxtb").css('top', posi.top + $(this).height());
		$(".xxtb").show();

		var obj = $(this);

		$.ajax({
			type: 'POST',
			url: mulu + 'now',
			cache: false,
			data: 'xtype=getxx' + sstr,
			dataType: 'json',
			success: function(m) {
				var ml = m['tz'].length;
				var str = '';
				$(".xxtb tbody").html('');
				$(".xxtb tr.ctrl").remove();
				var tmp;
				var mxstr = '';
				up = [];
				var con = '';
				for (i = 0; i < ml; i++) {
					tmp = m['tz'][i];
					str = "<tr>";
					str += "<td>" + tmp['tid'] + "#</td>";
					str += "<td>" + tmp['time'] + " 星期" + tmp['week'] + "</td>";
					str += "<td class='period'>" + tmp['game'] + "<div class='drawNumber'>" + tmp['qishu'] + "期</div></td>";
					str += "<td>"+tmp['xtype']+"</td>";
					str += "<td>" + tmp['user'] + "<div>" + tmp['abcd'] + "盘</div></td>";
					if (Number(tmp['peilv2']) > 0) tmp['peilv1'] += '/' + tmp['peilv2'];
					con = '';
					if (tmp['con'] != '') con = ':' + tmp['con'];
					str += "<td><span class='text'>" + tmp['wf'] + con + "</span> @ <span class='odds'>" + tmp['peilv1'] + "</span></td>";
					str += "<td class='money'>" + tmp['je'] + "</td>";
					str += "<td class='commission'>" + tmp['points'] + "%</td>";
					str += "<td class='share'>" + tmp['mezc'] + "%</td>";
					mxstr = '';;
					for (j = 8; j >= mylayer; j--) {
						up = tmp['up'][j];
						if (up['uid'] != 0) {
							if (Number(up['peilv2']) > 0) up['peilv1'] += '/' + up['peilv2'];
							mxstr += "<tr><td>" + up['layer'] + "</td><td>" + up['user'] + "</td><td>" + up['zc'] + "%</td><td>" + up['points'] + "%</td><td>" + up['peilv1'] + "</td></tr>"
						}
					}
					str += "<td class='detail' ><a href='javascript:void(0)' class='mx' str='" + mxstr + "'>明细</a></td>";
					str += "</tr>";
					$(".xxtb tbody").append(str);
				}


				var pstr = "<select class='xpage'>";
				var pcount = Number(m['pcount']);
				var pages = Number(m['page']);
				for (i = 1; i <= pcount; i++) {
					if (i == pages) {
						pstr += "<option value='" + i + "' selected>" + i + "</option>";
					} else {
						pstr += "<option value='" + i + "'>" + i + "</option>";
					}
				}
				pstr += "</select>";
				$(".xxtb thead").prepend("<tr class='ctrl'><th><input type='button' class='close' value='关闭' /></a></th><th><select class='xtype'><option value='5' selected>全部</option><option value='0'>投注</option><option value='1'>补货</option><option value='2'>对外补货</option></select></th><th colspan=9>" + pstr + "</th></tr>");

				$(".xxtb select.xtype").val(m['xtype']);
				$(".xxtb .close").click(function() {
					$(".xxtb").hide();
					return false
				});
				$(".xxtb select.xtype").change(function() {
					$(".sort").attr("xtype", $(this).val());
					$(".sort").attr("page", 1);
					obj.click()
				});
				$(".xxtb select.xpage").change(function() {
					$(".sort").attr("page", $(this).val());
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
				$(".xxtb a.mx").click(function() {
					$("div.mx .ui-dialog-title").html($(this).parent().parent().find("td:eq(0)").html() + " 占成明细");
					$("div.mx tbody").html($(this).attr('str'));
					$("div.mx").show();
					var posi = $(this).position();
					$("div.mx").css("top", posi.top + 30);
					$("div.mx").css("left", posi.left + $(this).width() - $("div.mx").width())
					$("div.mx").css("height", $("div.mx tr").length * 26 + 50);
				});
				str = null;
				m = null
			}
		});
		return false
	})
}

function in_array(v, a) {
	for (key in a) {
		if (a[key] == v) return true
	}
	return false
}

function bofang() {
	if (document.frames) {
		document.all["sfrm"].src = globalpath + "js/alarm.html"
	} else {
		document.getElementById("sfrm").contentWindow.location.href = globalpath + "js/alarm.html"
	}
}

function getm(val) {
	var sl = sma['g' + fenlei].length;
	for (i = 0; i < sl; i++) {
		if (val == sma['g' + ngid][i]['name']) {
			return sma['g' + ngid][i]['ma']
		}
	}
}