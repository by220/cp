var upstr = "<span class='up'> +</span>";
var downstr = "<span class='down'>- </span>";
var rtime = Number($("#reloadtime").val());
var cnow;
var gnow;
var gatt;
var r;
var play = [];

function myready() {
	clayer = layername.length;
	if (layer < (maxlayer - 1)) {
		$(".xxtb tr:eq(0)").append("<th>所属" + layername[layer] + "</th>")
	}
	for (i = layer; i < clayer; i++) {
		$(".xxtb tr:eq(0)").append("<th>" + layername[i - 1] + "</th>")
	}
	$("label").addClass('red');
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
		$("#downfastfrm").attr('src', "now.php?xtype=downfast&qishu="+$("#qishu").val());
	});
	$("#reloadtime").change(function() {
		rtime = Number($(this).val())
	});
	$(".pself").change(function() {
		var val = Number($(this).val());
		if (val == 1) {
			$("label.mepeilv1").show();
			$("label.peilv1").hide();
			$("label.mepeilv2").show();
			$("label.peilv2").hide();
			$(".lib .up").show();
			$(".lib .down").show()
		} else {
			$("label.mepeilv1").hide();
			$("label.peilv1").show();
			$("label.mepeilv2").hide();
			$("label.peilv2").show();
			$(".lib .up").hide();
			$(".lib .down").hide()
		}
	});
	$(".libstyle").change(function() {
		$(".lib .xx").hide();
		var libstyle = Number($(".libstyle").val());
		if (libstyle == 0) {
			$(".lib .zcxx").show()
		} else if (libstyle == 1) {
			$(".lib .fly").show()
		} else if (libstyle == 2) {
			$(".lib .flyxx").show()
		} else if (libstyle == 3) {
			$(".lib .zje").show()
		}
	});
	$("#ab").change(function() {
		lib()
	});
	$("#abcd").change(function() {
		lib()
	});
	$("#puserid").change(function() {
		lib()
	});
	$("#zhenghe").click(function() {
		lib()
	});

	$("#zanting").click(function(){
	    if($(this).val()=='暂停'){
		  $(this).val('开始');
		  clearTimeout(r);
	    }else{
		  $(this).val('开始');
		  time();
		}
	});
	$(".now td:eq(0)").addClass("bover");
	$(".now th:eq(0)").addClass("bred");
	$(".now td.n").click(function() {
		var i = $(this).index();
		if(i==1){
		    //$(".panstatus",parent.tops.document).show();
			//$(".otherstatus",parent.tops.document).hide();
		    //$(".uppanstatus",parent.tops.document).show();
			//$(".upotherstatus",parent.tops.document).hide();
		}else{
		    //$(".panstatus",parent.tops.document).hide();
			//$(".otherstatus",parent.tops.document).show();
		    //$(".uppanstatus",parent.tops.document).hide();
			//$(".upotherstatus",parent.tops.document).show();
		}
		var sid = $(this).attr('sid');
		var sname = $(this).attr('sname');
		$(".now td.n").removeClass('bover');
		$(this).addClass('bover');
		$(".now th").removeClass('bred');
		$(".now .n" + sid).addClass('bred');
		lib();
		return false
	});
	getnow();
	time();
	lib();
	if (ifexe == 1) {
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
				url: mulu + 'pset.php',
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
			$(".pset").toggleClass('hide');
			return false
		});
		$(".psetclose").click(function() {
			$(".pset").hide();
			return false
		});
		$(".btns").click(function() {
			selectma($(this).val());
			return false
		});
		$("#psetcancel").click(function() {
			var eplc = plclass();
			$("input.p1").each(function() {
				$(this).hide();
				$(this).parent().find("label." + eplc + "1").show();
				$(this).parent().find("span").show();
			});
			$("input.p2").each(function() {
				$(this).hide();
				$(this).parent().find("label." + eplc + "2").show();
				$(this).parent().find("span").show();
			});
			$("th.byellow").removeClass('byellow');
			$("td.byellow").removeClass('byellow')
		});
		$("#psetsend").click(function() {
			var peilv = getResult(Number($("#psetvalue").val()), 4);
			if (peilv == NaN | peilv == undefined) {
				alert("请输入正确的赔率");
				$("#psetvalue").focus();
				return false
			}
			if ($("input.xz:checked").val() == '2') {
				$("td.byellow").find("input.p2").val(peilv)
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
			if ($(".duopl").length == 1) {
				$(".duopl .tiao").each(function() {
					if ($(".onepeilvtb td:eq(0)").html() == $(this).attr('mname')) {
						$(this).find("input.p1").val($(".onepeilvtb input:text").val())
					}
				});
				$("#psetpost").click();
				$(".onepeilvtb").hide();
				return
			}
			var pid = $(".onepeilvtb td:eq(0)").attr("pid");
			var peilv1 = $(".onepeilvtb input:text").val();
			if (isNaN(peilv1)) {
				alert("输入的赔率不正确!");
				return false
			}
			var epl = Number($(".plmodeclick").attr('v'));
			var eplc = plclass();
			if (pself == 0 & (epl == 1 | epl == 3)) {
				peilv1 = getResult(Number($(".p" + pid + " label.peilv1").html()) - Number(peilv1), 4)
			}
			var pl = '{"p1' + pid + '":"' + peilv1 + '"}';
			$.ajax({
				type: 'POST',
				url: mulu + 'pset.php',
				cache: false,
				data: "xtype=setpeilvall&pl=" + pl + "&abcd=" + abcd + "&ab=" + ab + "&epl=" + epl,
				success: function(m) {
					if (Number(m) == 1) {
						var val = peilv1;
						if (epl == 4) {
							$(".p" + pid).find("label.mp1").html(val)
						} else if (pself == 1 | epl == 2) {
							$(".p" + pid).find("label.zhpeilv1").html(val);
							$(".p" + pid).find("label.mepeilv1").html(val)
						} else {
							$(".p" + pid).find("label.mepeilv1").html(val);
							val = getResult(Number($(".p" + pid).find("label.peilv1").html()) - val, 4);
							$(".p" + pid).find("label.zhpeilv1").html(val)
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
				var epl = Number($(".plmodeclick").attr('v'));
				var eplc = plclass();
				var p1str = '[';	
				$("input.p1:visible").each(function(i) {
					if (i > 0) p1str += ',';
					if (pself == 0 ) {
					
						    p1str += '{"i":"'+$(this).attr('i');
							p1str += '","p":"'+getResult(Number($(this).parent().find("label.peilv1").html()) - Number($(this).val()), 4)+'"}';
					
						
					} else {
						
						    p1str += '{"i":"'+$(this).attr('i');
							p1str += '","p":"'+$(this).val()+'"}';
						
					}
				});
				p1str += ']';
				var p2str = '[';	
				$("input.p2:visible").each(function(i) {
					if (i > 0) p2str += ',';
					if (pself == 0 ) {
						
						    p2str += '{"i":"'+$(this).attr('i');
							p2str += '","p":"'+getResult(Number($(this).parent().find("label.peilv2").html()) - Number($(this).val()), 4)+'"}';
					
						
					} else {
						
						    p2str += '{"i":"'+$(this).attr('i');
							p2str += '","p":"'+$(this).val()+'"}';
						
					}
				});
				p2str += ']';
				var pid = $("input.xz:checked").parent().attr('pid');
				//alert(p1str);
				//alert(p2str);
				$.ajax({
					type: 'POST',
					url: mulu + 'pset.php',
					cache: false,
					data: "xtype=setpeilvallduo&p1=" + p1str + "&p2=" + p2str + "&pid=" + pid + "&epl=" + epl,
					success: function(m) {
						$("#test").html(m);
						if (Number(m) == 1) {
							var val, val2;
							$("td.byellow").each(function() {
								val = getResult(Number($(this).find("input.p1").val()), 4);
								val2 = getResult(Number($(this).find("input.p2").val()), 4);
								if (epl == 4) {
									$(this).find("label.mp1").html(val);
									$(this).find("label.mp2").html(val2)
								} else if (pself == 1 | epl == 2) {
									$(this).find("label.zhpeilv1").html(val);
									$(this).find("label.mepeilv1").html(val);
									$(this).find("label.zhpeilv2").html(val2);
									$(this).find("label.mepeilv2").html(val2)
								} else {
									$(this).find("label.zhpeilv1").html(val);
									$(this).find("label.zhpeilv2").html(val2);
									val = Number($(this).parent().find("label.peilv1").html()) - val;
									val2 = Number($(this).parent().find("label.peilv1").html()) - val2;
									$(this).find("label.mepeilv1").html(val);
									$(this).find("label.mepeilv2").html(val2)
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
				var epl = Number($(".plmodeclick").attr('v'));
				var eplc = plclass();
				pl = new Array();
				var plstr = '{';
				var j = 0;
				if (pself == 0 ) {
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
				$.ajax({
					type: 'POST',
					url: mulu + 'pset.php',
					cache: false,
					data: 'xtype=setpeilvall&pl=' + plstr + "&abcd=" + abcd + "&ab=" + ab + "&epl=" + epl,
					success: function(m) {
						if (Number(m) == 1) {
							var val;
							$("td.byellow").each(function() {
								val = getResult(Number($(this).find("input.p1").val()), 4);
								if (epl == 4) {
									$(this).find("label.mp1").html(val)
								} else if (pself == 1 | epl == 2) {
									$(this).find("label.zhpeilv1").html(val);
									$(this).find("label.mepeilv1").html(val)
								} else {
									$(this).find("label.zhpeilv1").html(val);
									val = getResult(Number($(this).parent().find("label.peilv1").html()) - val, 4);
									$(this).find("label.mepeilv1").html(val)
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
		$(".plmode").click(function() {
			$(".plmode").removeClass('plmodeclick');
			$(this).addClass('plmodeclick');
			var mode = Number($(this).attr('v'));
			$("label.pl").hide();
			if (mode == 1) {
				$("label.peilv1").show();
				$("label.peilv2").show();
				$("table.pset").hide();
				$(".lib span").hide();
			} else if (mode == 2) {
				$("label.mepeilv1").show();
				$("label.mepeilv2").show();
				$("table.pset").hide();
				$(".lib span").hide();
			} else if (mode == 3) {
				$("label.zhpeilv1").show();
				$("label.zhpeilv2").show();
				$("table.pset").show();
				$(".lib span").show();
			} else if (mode == 4) {
				$("label.mp1").show();
				$("label.mp2").show();
				$("table.pset").show();
				$(".lib span").show();
			}
			if ($("td.byellow").length > 0) {
				var eplc = plclass();
				$("td.byellow").each(function() {
					$(this).find("label").hide();
					$(this).find("input:text").val($(this).find("label." + eplc + "1").html())
				})
			}
		});
		$(".tmode").click(function() {
			if ($(this).prop("checked") == true) {
				$(".tmode").prop("checked", false);
				$(this).prop("checked", true)
			}
		})
	}
				$(".libs th:eq(0) span").click(function(){
				    $(".libs th:eq(0) span").removeClass('red');
					$(this).addClass('red');
					psize=Number($(this).html());
					setpage();
					$(".libs .pages").change();
				});
	$("#fly").change(function() {
		if (Number($(this).val()) == 1) {
			$("#pfly").attr("disabled", false)
		} else {
			$("#pfly").attr("disabled", true)
		}
	});
	$("#pfly").click(function() {
		if ($("#fly").val() == undefined) return false;
		var posi = $(this).position();
		$(".sendtb").css("left", 5);
		$(".sendtb").css("top", posi.top + $(this).height());
		var i = 0;
		play = new Array();
		$(".lib .fly").each(function() {
			if (Number($(this).html()) >= 1) {
				var peilv1 = 0,
					peilv2 = 0,
					con = '',bz='';
				if (sname == '合肖' | sname == '連碼' | sname == '不中' | sname == '生肖連' | sname == '尾數連' | sname == '過關') {
					var obj = $("input.xz:checked");
					var pname = obj.attr('mname');
					var pid = obj.attr('pid');
					var sname = $(".now th.bred").html();
					con = $(this).parent().prent().find("td.c").html();
					if(sname == '過關'){
			peilv1 =$(this).parent().parent().find("td.gpl").html();
			bz =  $(this).parent().parent().find("td.c").attr('bz');
			}else{
					if (pname == '三中二' | pname == '二中特') {
						var peilv = getduopeilv(con, 2);
						peilv1 = peilv[0];
						peilv2 = peilv[1]
					} else {
						var peilv = getduopeilv(con, 1);
						peilv1 = peilv[0]
					}
			}
				} else {
					var obj = $(this).parent().prev().prev();
					var pname = obj.attr('mname');
					var pid = obj.attr('pid');
					var sname = $(".now th.bred").html();
					peilv1 = obj.find("label.peilv1").html()
				}
				var je = Number($(this).html());
				play[i] = new Array();
				play[i]['pid'] = pid;
				play[i]['je'] = je;
				play[i]['name'] = pname;
				play[i]['peilv1'] = peilv1;
				play[i]['peilv2'] = peilv2;
				play[i]['con'] = con;
				play[i]['bz'] = bz;
				i++;
			}
		});
		if (i > 0) {
			exe()
		}
	})
}
function lib() {
	clearTimeout(cnow);
	lib0()
}
function getc(bid, bname) {
	$.ajax({
		type: 'POST',
		url: mulu + 'slib.php',
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
function getbu(ks, yks, zc, yje, peilv, sname) {
	var kks = ks;
	var bu=0;
	ks = Math.abs(Number(ks));
	yks = Math.abs(Number(yks));
	zc = Number(zc);
	yje = Number(yje);
	peilv = Number(peilv);
	if (sname == "三全中" | sname == "連碼" | sname == "不中" | sname == "生肖連" | sname == "合肖" | sname == "尾數連" | sname == "過關") {
		if (zc > yje) return getResult(zc - yje,0);
		else return 0
	} else {
		if (ks > yks & kks<0) {
			bu = getResult((ks - yks) / peilv, 0);
			if(isNaN(bu)) return 0;
			else return bu;
		} else {
			return 0
		}
	}
}
function qiu(n) {

			if (in_array(n,ma['紅'])) {
				return "<div class='qiub'>" + n + "</div>"
			} else if (in_array(n,ma['藍'])) {
				return "<div class='qiua'>" + n + "</div>"
			}else if (in_array(n,ma['綠'])) {
				return "<div class='qiuc'>" + n + "</div>"
			}
	

}
function lib0() {
	var sid = $(".now .bover").attr("sid");
	var sname = $(".now .bover").attr("sname");
	$(".lib").removeClass('w1002');
	var abcd = $("#abcd").val();
	var ab = $("#ab").val();
	var qishu = $("#qishu").val();
	var goods = $("#goods").val();
	var xsort = $("#xsort").val();
	var puserid = $("#userid").val();
	var zhenghe = $("#zhenghe").attr("checked") ? 1 : 0;
	var str = "&sid=" + sid + "&abcd=" + abcd + "&ab=" + ab + "&qishu=" + qishu + "&xsort=" + xsort;
	str += "&zhenghe=" + zhenghe + "&userid=" + puserid;

	if($(".lib input.xz").length>0 & sid==ssid){	
	    $(".lib table tr:eq("+(inputxz+1)+")").find("input:eq("+inputxzb+")").click();	
		return ;
	}
	$(".duopl").remove();
	$(".libs").hide();
	ssid = sid;
	inputxz = 0;
	inputxzb = 0;
	libs = [];
	$.ajax({
		type: 'POST',
		url: mulu + 'slib.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=lhgetlib&stype=s' + str,
		success: function(m) {
			//$("#test").html(m);return;
			var ml = m.length;
			var str = "<tr>";
			var j = 0;
			var trl = 16;
			if (ml == 18 | ml == 14 | ml == 16) trl = 10;
			if(ml==15) trl=5;
			if(ml==22) trl=22;
			var cids=0;
			var mode = $(".plmodeclick").attr('v');
			var libthas = "<tr class='bts'><th class='f'>类别</th><th class='s'>赔率</th><th  class='t'>占成/总额/已飞</th><th class='fo'>盈亏/需补</th></tr>";
			for (i = 0; i < ml; i++) {
				if (i % trl == 0) {
					if (i != 0) str += "</table></td>";
					str += "<TD valign=top><table class='tinfo wd100'>"+libthas;
				}
				if(cids!=m[i]['cid'] && sname=="番摊"){
					str += "<tr><th colspan=4>"+m[i]['cname']+"</th></tr>";
				}
				m[i]['peilv1k'] = m[i]['peilv1'];
				if (Number(m[i]['ifok']) == 0) {					
					m[i]['peilv1'] = '-';
				}				
				if(pself==1 & ifexe==1){
				    m[i]['peilv1k'] = m[i]['mepeilv1'];
				}
				str += "<tr ";
				if (Number(m[i]['z'])==1) str += " class='z1' ";
				str += ">";

				if (sname == '合肖' | sname == '連碼' | sname == '不中' | sname == '生肖連' | sname == '尾數連' | sname == '過關') {
				str += "<th class='f m'  pid='" + m[i]['pid'] + "'";
					if(sname == '合肖' | sname=='生肖连' | sname=='生肖連' | sname=='尾數連' | sname=='尾数连' | sname == '不中'){
					   str += " style='width:90px;' ";
					}
				str += " >";
				str += m[i]['name'] + "</th>";
					str += "<td class='s' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' style='width:120px;'><input type=radio name='xz' class='xz' value='1' x1='"+i+"' x2=0 ifok='"+m[i]['ifok']+"'  />";
					if (pself == 1) {
						if (m[i]['name'] == '三中二') {
							str += "中二 <input type=radio name='xz' class='xz' value=2 x1='"+i+"' x2=1  ifok='"+m[i]['ifok']+"' />中三"
						}
						if (m[i]['name'] == '二中特') {
							str += "中二 <input type=radio name='xz' class='xz' value=2 x1='"+i+"' x2=1  ifok='"+m[i]['ifok']+"' />中特"
						}
					} else {
						if (m[i]['name'] == '三中二') {
							str += "中二/中三"
						}
						if (m[i]['name'] == '二中特') {
							str += "中二/中特"
						}
					}
					str += "</td>"
				} else {
				str += "<th class='f m'  pid='" + m[i]['pid'] + "'  >";
				if (!isNaN(m[i]['name'])) str += qiu( m[i]['name'])+"</th>";
				else str += m[i]['name'] + "</th>";
					if (mode == undefined) {
						str += "<td class='s' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "'>";
						str += "<label class='peilv1 pl'>" + m[i]['peilv1'] + "</label></td>"
					} else {
						str += "<td class='s p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "'>" + downstr + "<label class='peilv1 pl'>" + m[i]['peilv1'] + "</label><label class='mepeilv1 pl'>" + m[i]['mepeilv1'] + "</label><label class='zhpeilv1 pl'>" + zhpeilv(m[i]['peilv1'], m[i]['mepeilv1']) + "</label><label class='mp1 pl'>" + m[i]['mp1'] + "</label><input type='text' value='" + m[i]['peilv1'] + "' class='small hide p1' />" + upstr + "</td>"
					}
				}
				str += "<td class='t "
				if (Number(m[i]['wje']) == 1) str += "warn";
				str += "' title='" + m[i]['zs'] + "'  pid='" + m[i]['pid'] + "' ><label  class='zcxx'>" + m[i]['zc'] + "</label>/<span>" + m[i]['zje'] + "</span>/<label  class='flyxx'>" + m[i]['fly'] + "</label></td>";
				str += "<td class='fo ";
				if (Number(m[i]['ks']) > 0) str += "red";
				else if (Number(m[i]['ks']) < 0) str += "lv";
				if (Number(m[i]['wks']) == 1) str += " warn";
				str += "'>" + getResult(Number(m[i]['ks']), 1) + "/<label class='fly'>" + getbu(m[i]['ks'], m[i]['yks'], m[i]['zc'], m[i]['yje'], m[i]['peilv1k'], m[i]['sname']) + "</label></td>";
				str += "</tr>";
				cids = m[i]['cid'];
			}
			str += "</table></td></tr>";
			$(".lib").html(str);
			if (mode != undefined) {
				$(".lib label.pl").hide();
				mode = Number(mode);
				if (mode == 1) {
					$(".lib label.peilv1").show()
				} else if (mode == 2) {
					$(".lib label.mepeilv1").show()
				} else if (mode == 3) {
					$(".lib label.zhpeilv1").show()
				} else if (mode == 4) {
					$(".lib label.mp1").show()
				}
			}
			$(".lib td").attr("valign", 'top');
			str = null;
			m = null;
			$(".lib").removeClass('w500');
			$(".lib").removeClass('w1330');
			if (i < 13 || i==22) {
				$(".lib").addClass('w500')
			} else {
				$(".lib").addClass('w1330')
			}
			if (sname == '合肖' | sname == '連碼' | sname == '不中' | sname == '生肖連' | sname == '尾數連' | sname == '過關') {
				duofunc()
			} else {
				addfunc();
				$("input.p1").parent().click(function() {
					if ($(this).find("label:visible").length > 0) $("#psetvalue").val($(this).find("label:visible").html());
					else $("#psetvalue").val($(this).find("input:visible").val())
				});
			$(".plmodeclick").click();	
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
		var ifoks= Number($(this).attr('ifok'));
		var sid = $(".now .bover").attr("sid");
		var sname = $(".now .bover").attr("sname");
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
			url: mulu + 'slib.php',
			dataType: 'json',
			cache: false,
			data: 'xtype=duoxx' + str,
			success: function(m) {
				if (sname != '過關') {
					var str = "<table class='tinfo duopl' ><tr>";
					var mpl = m['pl'][0].length;
					var mode = $(".plmodeclick").attr('v');
					for (i = 0; i < mpl; i++) {
						str += "<th class='m" + colors(m['pl'][0][i]) + "'>" + m['pl'][0][i] + "</th>";
						if(ifoks!=1){
						   m['pl'][1][i] = '-';
						   m['pl'][2][i] = '-';
						}
						if (ifexe == 1) {
							str += "<td mname='" + m['pl'][0][i] + "' class='tiao'><label class='peilv1 pl'>" + m['pl'][1][i] + "</label><label class='mepeilv1 pl'>" + m['pl'][3][i] + "</label><label class='zhpeilv1 pl'>" + zhpeilv(m['pl'][1][i], m['pl'][3][i]) + "</label><label class='mp1 pl'>" + m['pl'][5][i] + "</label><input type='text' value='" + m['pl'][1][i] + "' i='"+i+"' class='small hide p1' />";
							if (pname == '三中二' | pname == '二中特') str += "<BR /><label class='peilv2 pl'>" + m['pl'][2][i] + "</label><label class='mepeilv2 pl'>" + m['pl'][4][i] + "</label><label class='zhpeilv2 pl'>" + zhpeilv(m['pl'][2][i], m['pl'][4][i]) + "</label><label class='mp2 pl'>" + m['pl'][6][i] + "</label><input type='text' value='" + m['pl'][2][i] + "'  i='"+i+"'  class='small hide p2' />"
						} else {
							str += "<td mname='" + m['pl'][0][i] + "' class='tiao'><label class='peilv1 pl'>" + m['pl'][1][i] + "</label>";
							if (pname == '三中二' | pname == '二中特') str += "<BR /><label class='peilv2 pl'>" + m['pl'][2][i] + "</label>"
						}
						str += "</td>";
						if (mpl == 12) {
							if ((i + 1) % 4 == 0) {
								str += "</tr><tr>"
							}
						} else if (mpl == 10) {
							if ((i + 1) % 2 == 0) {
								str += "</tr><tr>"
							}
						} else {
							if ((i + 1) % 7 == 0) {
								str += "</tr><tr>"
							}
						}
					}
					str += "</tr></table>";
					$(".lib").parent().append(str);
					str = null;
					if (mode != undefined) {
						$(".duopl label.pl").hide();
						$(".duopl label.pl").hide();
						mode = Number(mode);
						if (mode == 1) {
							$(".duopl label.peilv1").show();
							$(".duopl label.peilv2").show()
						} else if (mode == 2) {
							$(".duopl label.mepeilv1").show();
							$(".duopl label.mepeilv2").show()
						} else if (mode == 3) {
							$(".duopl label.zhpeilv1").show();
							$(".duopl label.zhpeilv2").show()
						} else if (mode == 4) {
							$(".duopl label.mp1").show();
							$(".duopl label.mp2").show()
						}
					}
					var posi = $(".lib").position();
					$(".duopl").css('top', posi.top + 2);
					$(".duopl").css('left', posi.left + $(".lib").width() + 10);
					if (ifexe == 1) {
						var eplc = plclass();
						$(".duopl label." + eplc + "1").click(function() {
							$(this).hide();
							$(this).parent().find("input.p1").show();
							$(this).parent().find("input.p1").val($(this).html());
							$("#psetvalue").val($(this).html());
							$(this).parent().addClass('byellow')
						});
						$(".duopl label." + eplc + "2").click(function() {
							$(this).hide();
							$(this).parent().find("input.p2").show();
							$(this).parent().find("input.p2").val($(this).html());
							$("#psetvalue").val($(this).html());
							$(this).parent().addClass('byellow')
						});
						$(".duopl .m").click(function() {
							var eplc = plclass();
							var peilv1 = $(this).next().find("label." + eplc + "1").html();
							$(this).next().find("label." + eplc + "1").hide();
							$(this).next().find("input.p1").show();
							$(this).next().find("input.p1").val(peilv1);
							$(this).next().addClass("byellow");

						});
				$(".duopl input").click(function() {
					$("#psetvalue").val($(this).val())
				});
					}
				}
				$(".libs").css("width", $(".lib").width());
				$(".libs").show();
				libs = m['rs'];
			    ll = libs.length;
				$(".libs tr.con").remove();
				if (ll == 0) return;
				
				psize = Number($(".libs span.red").html());
			    setpage();
				$(".libs .pages").change(function() {
					var thisp = Number($(this).val());
					$(".libs tr.con").remove();
					str = '';
					for (i = (thisp - 1) * psize; i < (thisp - 1) * psize + psize; i++) {
						if (i >= ll) break;
						str += "<tr class='con ";
						if (Number(libs[i]['z'])==1) str += "z1";
						else if (Number(libs[i]['z'])==3) str += "z3";
						str += "'>";
						str += "<td class='xh'>" + (i + 1) + "</td>";
						
if (sname == '過關') {

						str += "<td class='c' bz='"+libs[i]['bz']+"'>" + libs[i]['con'] + "</td>";		
						   str += "<td class='gpl'>" + libs[i]['peilv1'] + "</td>";
						}else{
							str += "<td class='c' bz='"+libs[i]['bz']+"'>" + libs[i]['con'] + "</td>";	
							}
						str += "<td><label class='xx zcxx'>" + libs[i]['zc'] + "</label>/" + libs[i]['zje'] + "/<label class='xx flyxx green'>" + libs[i]['fly'] + "</label>/"+libs[i]['zs']+"</td>";
										
						str += "<td class='";
						if (Number(libs[i]['ks1']) > 0) str += "red";
						else if (Number(libs[i]['ks1']) < 0) str += "lv";
						if (Number(libs[i]['wks']) == 1) str += " warn";
						str += "'>" + libs[i]['ks1'];
						if (Number(libs[i]['ks2']) != 0) str += "/" + libs[i]['ks2'];
						str += "</td>";
						str += "<td ><label class='fly'>" + getbu(libs[i]['ks'], libs[0]['yks'], libs[i]['zc'], libs[0]['yje'], 0, sname) + "</label></td>";
						str += "</tr>"
					}
					if (sname == '過關') {
					   $(".libs .gpl").show();
					   $(".libs .pages").attr("colspan",4);
					}else{
					   $(".libs .gpl").hide();
					   $(".libs .pages").attr("colspan",3);
					}
					$(".libs").append(str);
					str = null
				});
				$(".libs .pages").change();
				$(".plmodeclick").click();
				flyclick();
				flyxxclick('libs');
				zcxxclick('libs');
			}
		})
	});
	$(".lib table tr:eq("+inputxz+")").find("input:eq("+inputxzb+")").click();	
	$(".duoname").click(function(){
	     inputxzb=0;
		 $(this).parent().find("input:eq(0)").click();
	});
}
function setpage(){
				maxpage = ll % psize == 0 ? ll / psize : ((ll - ll % psize) / psize + 1);
				str = '';
				for (i = 1; i <= maxpage; i++) {
					str += "<option value='"+i+"'>" + i + "</option>"
				}
				
				$(".libs .pages").html(str);
}
var inputxz=0;
var inputxzb=0;
var ssid=0;
libs = [];
var ll=0;
var psize = 0;
var maxpage = 0;

function zhpeilv(v1, v2) {
	
	if (pself == 1) {
		return v2
	} else {
		if(v1=='-') return '-';
		return getResult(Number(v1) - Number(v2), 4)
	}
}

function selectma(val) {
	var eplc = plclass();
	var sname = $(".now .bover").attr("sname");
	if ($("input.xz:checked").val() == '2' & val != '全部') {
		return
	}
	if (val == '反选') {
		$("label." + eplc + "1").each(function(i) {
			if (i < 49) {
				if ($(this).is(":visible")) {
					$(this).hide();
					$(this).parent().find("input.p1").val($(this).html());
					$(this).parent().find("input.p1").show();
					$(this).parent().addClass('byellow');
					$(this).parent().find("span").hide();
				} else {
					$(this).show();
					$(this).parent().find("input:text").hide();
					$(this).parent().removeClass('byellow');
					$(this).parent().find("span").show();
				}
			}
		})
	} else {
		var tmp;
		if (val.indexOf('前') != -1 & val != '前') {
			$("#psetcancel").click();
			var nums = Number(val.replace('前', ''));
			$("label." + eplc + "1").each(function(i) {
				if (i < nums) {
					$(this).hide();
					$(this).parent().find("input.p1").val($(this).html());
					$(this).parent().find("input.p1").show();
					$(this).parent().addClass('byellow');
					$(this).parent().find("span").hide();
				}
			})
		} else if (val == '全部') {
			$("#psetcancel").click();
			if ($("input.xz:checked").val() == '2') {
				$("label." + eplc + "2").each(function(i) {
					if (i < 49) {
						$(this).hide();
						$(this).parent().find("input.p2").val($(this).html());
						$(this).parent().find("input.p2").show();
						$(this).parent().addClass('byellow');
						$(this).parent().find("span").hide();
					}
				})
			} else {
				$("label." + eplc + "1").each(function(i) {
					if (i < 49) {
						$(this).hide();
						$(this).parent().find("input.p1").val($(this).html());
						$(this).parent().find("input.p1").show();
						$(this).parent().addClass('byellow');
						$(this).parent().find("span").hide();
					}
				})
			}
		} else {
			tmp = ma[val];
			var flag = Number($(".tmode:checked").val());
			if (flag == 1) {
				if ($("label." + eplc + "1:hidden").length == 0) {
					$("label." + eplc + "1").each(function() {
						var pname = Number($(this).parent().attr('mname'));
						if (in_array(pname, tmp)) {
							$(this).hide();
							$(this).parent().find("input.p1").val($(this).html());
							$(this).parent().find("input.p1").show();
							$(this).parent().addClass('byellow');
							$(this).parent().find("span").hide();
						}
					})
				} else {
					$("label." + eplc + "1").each(function() {
						var pname = Number($(this).parent().attr('mname'));
						if (in_array(pname, tmp) & $(this).is(":hidden")) {
							$(this).hide();
							$(this).parent().find("input.p1").val($(this).html());
							$(this).parent().find("input.p1").show();
							$(this).parent().addClass('byellow');
							$(this).parent().find("span").hide();
						} else {
							$(this).show();
							$(this).parent().find("input.p1").hide();
							$(this).parent().removeClass('byellow');
							$(this).parent().find("span").show();
						}
					})
				}
			} else if (flag == 2) {
				$("label." + eplc + "1").each(function() {
					var pname = Number($(this).parent().attr('mname'));
					if (in_array(pname, tmp)) {
						$(this).hide();
						$(this).parent().find("input.p1").val($(this).html());
						$(this).parent().find("input.p1").show();
						$(this).parent().addClass('byellow');
						$(this).parent().find("span").hide();
					}
				})
			} else {
				$("#psetcancel").click();
				$("label." + eplc + "1").each(function() {
					var pname = Number($(this).parent().attr('mname'));
					if (in_array(pname, tmp)) {
						$(this).hide();
						$(this).parent().find("input.p1").val($(this).html());
						$(this).parent().find("input.p1").show();
						$(this).parent().addClass('byellow');
						$(this).parent().find("span").hide();
					}
				})
			}
		}
	}
}
function plclass() {
	var mode = Number($(".plmodeclick").attr('v'));
	var v;
	if (mode == 1) v = 'peilv';
	else if (mode == 2) v = 'mepeilv';
	else if (mode == 3) v = 'zhpeilv';
	else if (mode == 4) v = 'mp';
	return v
}
function addfunc() {
	zcxxclick('lib');
	flyxxclick('lib');
	$("tr.z1").find("td").addClass('z1');
	$("tr.z3").find("td").addClass('z3');
	$("tr.z1").find("th").addClass('z1');
	$("tr.z3").find("th").addClass('z3');
	$(".lib .xx").css("color", 'red');
	$("label.peilv1").parent().parent().mouseover(function() {
		$(this).addClass('bover')
	}).mouseout(function() {
		$(this).removeClass('bover')
	});
	if (ifexe == 1 & layer == 1) {
		$(".lib label.pl").click(function() {
			var mode = Number($(".plmodeclick").attr('v'));
			if(mode!=3) return false;
			$(this).hide();
			$(this).parent().find("input.p1").val($(this).html());
			$(this).parent().find("input.p1").show();
			$(this).parent().find("span").hide();
			$(this).parent().addClass('byellow');
			$("#psetvalue").val($(this).html());
			return false
		});
		$(".lib th.m").click(function() {
			var mode = Number($(".plmodeclick").attr('v'));
			if(mode!=3) return false;
			var pid = $(this).attr("pid");
			var eplclass = plclass();
			var peilv1 = $(this).parent().find("label." + eplclass + "1").html();
			var posi = $(this).position();
			$(".onepeilvtb td:eq(0)").html($(this).html());
			$(".onepeilvtb td:eq(0)").attr('pid', pid);
			$(".onepeilvtb input:text").val(peilv1);
			$(".onepeilvtb").css('left', posi.left);
			$(".onepeilvtb").css('top', posi.top + $(this).height());
			$(".onepeilvtb").show();
			return false
		});
		$(".lib .pl").parent().find("span").click(function() {
			var action = $(this).attr('class');
			var pid = $(this).parent().attr('pid');
			var obj = $(this).parent();
			var epl = Number($(".plmodeclick").attr('v'));
			$.ajax({
				type: 'POST',
				url: mulu + 'pset.php',
				cache: false,
				data: 'xtype=setatttwo&pid=' + pid + "&action=" + action + "&epl=" + epl,
				success: function(m) {
					if ((Number(m) * 1000) % 1 == 0) {
						var tmp;
						if (epl == 4) {
							if (action == 'up') {
								tmp = getResult(Number(obj.find("label.mp1").html()) + Number(m), 4)
							} else {
								tmp = getResult(Number(obj.find("label.mp1").html()) - Number(m), 4)
							}
							obj.find("label.mp1").html(tmp)
						} else {
							if (action == 'up') {
								tmp = getResult(Number(obj.find("label.mepeilv1").html()) - Number(m), 4);
								obj.find("label.mepeilv1").html(tmp);
								tmp = getResult(Number(obj.find("label.zhpeilv1").html()) + Number(m), 4);
								obj.find("label.zhpeilv1").html(tmp)
							} else {
								tmp = getResult(Number(obj.find("label.mepeilv1").html()) + Number(m), 4);
								obj.find("label.mepeilv1").html(tmp);
								tmp = getResult(Number(obj.find("label.zhpeilv1").html()) - Number(m), 4);
								obj.find("label.zhpeilv1").html(tmp)
							}
						}
						obj.addClass("bc").removeClass('byellow');
						setTimeout(function() {
							obj.removeClass('bc')
						}, 5000)
					}
				}
			})
		})
	}
	
	

	flyclick();

}

function flyclick(){
	$(".lib .xx").hide();
	$(".libstyle").change();
	$("label.fly").each(function() {
		if (Number($(this).html()) > 0) $(this).addClass('flys')
	});
	$("label.fly").click(function() {
		if ($("#fly").val() == undefined) return false;
		//if (Number($(this).html()) < 1) return false;
		var posi = $(this).position();
		var left = posi.left - $(".sendtb").width() + $(this).width();
		if (left < 0) left = 5;
		$(".sendtb").css("left", left);
		$(".sendtb").css("top", posi.top + $(this).height());
		var peilv1 = 0,
			peilv2 = 0,
			con = '',bz='';
		var sname = $(".now th.bred").html();
		if (sname == '合肖' | sname == '連碼' | sname == '不中' | sname == '生肖連' | sname == '尾數連' | sname == '過關') {
			var obj = $("input.xz:checked").parent();
			var pname = obj.attr('mname');
		
			var pid = obj.attr('pid');

			con = $(this).parent().parent().find("td.c").html();
	
			if(sname == '過關'){
			peilv1 =$(this).parent().parent().find("td.gpl").html();
			bz =  $(this).parent().parent().find("td.c").attr('bz');
			
			}else{var peilv = [];
			if (pname == '三中二' | pname == '二中特') {
				
				peilv = getduopeilv(con, 2);
				peilv1 = peilv[0];
				peilv2 = peilv[1]
			} else {
				peilv = getduopeilv(con, 1);
				peilv1 = peilv[0]
			}
			}
		} else {
			var obj = $(this).parent().prev().prev();
			var pname = obj.attr('mname');
			var pid = obj.attr('pid');

			peilv1 = obj.find("label.peilv1").html()
		}
		var je = Number($(this).html());
		play = new Array();
		play[0] = new Array();
		play[0]['pid'] = pid;
		play[0]['je'] = je;
		play[0]['name'] = pname;
		play[0]['peilv1'] = peilv1;
		play[0]['peilv2'] = peilv2;
		play[0]['con'] = con;
		play[0]['bz'] = bz;
		exe()
	})
}
function getduopeilv(str, p) {
	var arr = str.split('-');
	var al = arr.length;
	pone = [];
	ptwo = [];
	$(".duopl th.m").each(function(i) {
		pone[$(this).html()] = Number($(this).next().find("label.peilv1").html());
		if (p == 2) {
			ptwo[$(this).html()] = Number($(this).next().find("label.peilv2").html())
		}
	});
	peilv = [];
	peilv[0] = peilvmin(arr, pone);
	if (p == 2) {
		peilv[1] = peilvmin(arr, pone, ptwo)
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
	var pl = play.length;
	var sname = $(".now th.bred").html();
	for (j = 0; j < pl; j++) {
		str += "<tr pid='" + play[j]['pid'] + "' content='"+play[j]['con']+"' class='cg'>";
		str += "<td>" + (j + 1) + "</td>";
		if (sname == '合肖' | sname == '連碼' | sname == '不中' | sname == '生肖連' | sname == '尾數連' | sname == '過關') {
		  str += "<td class='nr'>" + play[j]['name'] + '-<label class=red>' + play[j]['con'] + "</label></td>";
		}else{
		   str += "<td class='nr'>" + sname + ':<label class=red>' + play[j]['name'] + "</label></td>";
		}
		str += "<td class=p1s><label >" + play[j]['peilv1'] + "</label><input type='text' class='txt1 peilv1' value='" + play[j]['peilv1'] + "' /></td>";
		str += "<td class=p2s><label >" + play[j]['peilv2'] + "</label><input type='text' class='txt1 peilv2' value='" + play[j]['peilv2'] + "' /></td>";
		str += "<td class='tpoints'><input type='text' class='txt1 points' value='1' />%</td>";
		str += "<td je='" + play[j]['je'] + "'><input type='text' class='txt1 je' value='" + play[j]['je'] + "' /></td>";
		str += "<td><input type='button' class='btnf del' value='删除' /></td>";
		str += "</tr>";
if(play[j]['con']!='')
{		play[j]['con'] = play[j]['con'].split('-');
}
if( sname != '過關') play[j]['bz'] = '';
		je += Number(play[j]['je'])
	}

	$(".sendtb").show();
	$(".sendtb").empty();
	$(".sendtb").append("<tr><td><select class='fly'>" + $("#fly").html() + "</select></td><td ><span>金额：<input value='100' class='txt1 sendje' type='text' /></span><span class='tpoints'>退水：<input value='1' class='txt1 sendpoints' type='text' />赔率：<input value='1' class='txt1 peilv1s' type='text' />赔率2：<input value='1' class='txt1 peilv2s'  type='text' /></span></td><td><input type='button' value='送出' class='btnf sends' /></td></tr><tr><td colspan=3><input type='button' class='qr btn3 btnf' value='确认补货' /><input type='button' class='cancel btn1 btnf' value='关闭' style='margin-left:10px;' /></td></tr>");
	$(".sendtb").append("<tr><td colspan=3><table cellpadding=0 cellspacing=0 class='wd100' ><tr><th>编号</th><th>内容</th><th class=p1s>赔率</th><th class=p2s>赔率2</th><th class='tpoints'>退水%</th><th>金额</th><th>删除</th></tr>"+str+"<tr><th>合計</th><td ></td><td class=p1s></td><td class='p2s'></td><td class='tpoints'></td><th class='sumje'>" + je + "</th><TD></td></tr>");
	$(".sendtb").append("</table></td></tr>");
	//$(".sendtb").append("<!--<tr><td colspan=3><input type='button' class='qr btn3 btnf' value='确认补货' /><input type='button' class='cancel btn1 btnf' value='关闭' style='margin-left:10px;' /></td></tr>-->");
	$(".sendtb").append("<tr><td  colspan=3>注:赔率2适用三中二和二中特</td></tr>");


	$(".sendtb .fly").change(function() {
		if (Number($(this).val()) == 1) {
			$(".sendtb .tpoints").hide();
			$(".sendtb .p1s input").hide();
			$(".sendtb .p2s input").hide();
			$(".sendtb .p1s label").show();
             
		} else {
			$(".sendtb .tpoints").show();
			$(".sendtb .p1s input").show();
			$(".sendtb .p2s input").show();
			$(".sendtb .p1s label").hide();
             $(".sendtb .p2s label").hide();
		}
		var sn = $("input.xz:checked").parent().parent().find("th.m").html();
		if(sn=='三中二' | sn=='二中特'){
		   $(".sendtb .p2s").show();
		}else{
		   $(".sendtb .p2s").hide();
		}
	});
	$(".sendtb .fly").change();
	$(".sendtb .sends").click(function() {
		var je = $(".sendtb .sendje").val();
		if (je == '' | Number(je) % 1 != 0 | Number(je) == 0) {
			alert("请输入正确的金额,最小1,不能有小数点");
			$(".sendtb .sendje").focus();
			return false
		}
		$(".sendtb .je").val(je);
		sumje();
		if (Number($(".sendtb .fly").val()) == 2) {
			var points = $(".sendtb .sendpoints").val();
			if (points == '' | Number(points) * 100 % 1 != 0) {
				alert("请输入正确的退水");
				$(".sendtb .sendpoints").focus();
				return false
			}
			var peilv1s = $(".sendtb .peilv1s").val();
			if (peilv1s == '' | Number(peilv1s) * 1000 % 1 != 0) {
				alert("请输入正确的赔率");
				$(".sendtb .peilv1s").focus();
				return false
			}
			var peilv2s = $(".sendtb .peilv2s").val();
			if (peilv2s == '' | Number(peilv2s) * 1000 % 1 != 0) {
				alert("请输入正确的赔率");
				$(".sendtb .peilv2s").focus();
				return false
			}
			$(".sendtb .peilv1").val(peilv1s);
			$(".sendtb .peilv2").val(peilv2s);
			$(".sendtb .points").val(points)
		}
	});
	$(".sendtb .je").blur(function() {
		if (isNaN($(this).val())) {
			$(this).val('1')
		}
		sumje()
	});
	$(".sendtb .del").click(function() {
		play.splice($(this).parent().parent().index() - 3, 1);
		$(this).parent().parent().remove();
		if (play.length == 0) {
			$(".sendtb").empty();
			$(".sendtb").hide();
			play = null
		}
	});
	str = null;
	$(".sendtb input:button").addClass("btn2 btnf");
	$(".sendtb .cancel").click(function() {
		$(".sendtb").hide();
		return false
	});
	$(".sendtb .print").click(function() {
		tzprint();
		return false
	});
	$(".sendtb .qr").unbind('click');
	$(".sendtb .qr").click(function() {
		var pl = play.length;
		var objs;
		for (j = 0; j < pl; j++) {
			objs= $(".sendtb .cg:eq("+j+")");
			var je = objs.find("input.je").val();
			if (isNaN(je) | Number(je) % 1 != 0) {
				alert("输入的金额不正确！");
				return false
			}
			var peilv1s = 0;
			var peilv2s = 0;
			var points = 0;
			if (Number($(".sendtb .fly").val()) == 2) {
				var peilv1s = objs.find("input.peilv1").val();
				var peilv2s = objs.find("input.peilv2").val();
				var points = objs.find("input.points").val();
				if (points == '' | Number(points) * 100 % 1 != 0) {
					alert("请输入正确的退水");
					return false
				}
				if (peilv1s == '' | Number(peilv1s) * 1000 % 1 != 0) {
					alert("请输入正确的赔率");
					return false
				}
				if (peilv2s == '' | Number(peilv2s) * 1000 % 1 != 0) {
					alert("请输入正确的赔率");
					return false
				}
			}
			play[j]['je'] = je;
			play[j]['peilv1'] = peilv1s;
			play[j]['peilv2'] = peilv2s;
			play[j]['points'] = points
		}
		var pstr = '[';
		for (i = 0; i < pl; i++) {
			if (i != 0) pstr += ',';
			pstr += json_encode_js(play[i]);
		}
		pstr += ']';
		
		var ab = $("#ab").val();
		var abcd = $("#abcd").val();
		var sid = $(".now .bover").attr("sid");
		var fly = $(".sendtb .fly").val();
		var str = "&abcd=" + abcd + "&ab=" + ab + "&sid=" + sid + "&fly=" + fly;
	    $(".sendtb input:button").attr("disabled", true);
		$.ajax({
			type: 'POST',
			url: mulu + 'slib.php',
			data: 'xtype=bucang&pstr=' + pstr + str,
			dataType: 'json',
			cache: false,
			async:false,
			success: function(m) {
				//$("#test").html(m);return;
				var ml = m.length;
				var gflag = false;
				var bflag = false;
				var eflag = false;
				var errstr = "";
				var obj;
for (i = 0; i < ml; i++) {
	obj = $(".sendtb .cg:eq(" + i + ")");
	if (Number(m[i]['cg']) == 1) {
		if (Number(m[i]['cgs']) == 1) {
			obj.find("td:eq(0)").html(obj.find("td:eq(0)").html() + " 赔率改动!");
			obj.find("td:eq(0)").addClass("red")
		} else {
			obj.find("td:eq(0)").html(obj.find("td:eq(0)").html() + " 成功!");
			obj.find("td:eq(0)").addClass("lv")
		}
		obj.find("td:eq(2)").html(m[i]['peilv1']);
		if (m[i]['name'] == '三中二' | m[i]['name'] == '二中特') {
			obj.find("td:eq(2)").html(obj.find("td:eq(2)").html() + "/" + m[i]['peilv2'])
		}
		$(".sendtb .qr").hide();
		$(".sendtb .cancel").attr("disabled", false);
		$(".sendtb .print").attr("disabled", false);
		$(".sendtb input:text").attr("disabled", true)
	} else {
		obj.find("td:eq(0)").html(obj.find("td:eq(0)").html() + " " + m[i]['err']);
		obj.find("td:eq(0)").addClass("red");
		$(".sendtb input:button").attr("disabled", false);
		eflag = true
	}
}
				if (!eflag) {
					lib()
				}
			}
		})
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
		url: mulu + 'slib.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=getnow&userid=' + puserid + "&qishu=" + qishu,
		success: function(m) {
			var ml = m.length;
			var jezc = 0;
			var je = 0;
			var flyje = 0;
			for (i = 0; i < ml; i++) {
				$(".now .nx" + m[i]['bid']).html("<label>" + m[i]['zc'] + "</label>/" + m[i]['zje'] + "/<label>" + Number(m[i]['flyje']) + "</label>");
				jezc += Number(m[i]['zc']);
				je += Number(m[i]['zje']);
				flyje += Number(m[i]['flyje'])
			}
			$(".now label.zc").html(getResult(jezc, 1));
			$(".now label.zong").html(getResult(je, 1));
			$(".now label.fly").html(getResult(flyje, 1));
			$(".now label").addClass('red');
			clearTimeout(gnow);
			gnow = setTimeout(getnow, 5000)
		}
	})
}
function zcxxclick(tb) {
	$("."+tb+" label.zcxx").click(function() {
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
		var sname = $(".now th.bred").html();
		var con='';
		if (sname == '合肖' | sname == '連碼' | sname == '不中' | sname == '生肖連' | sname == '尾數連' | sname == '過關') {
			 con = $(this).parent().parent().find("td.c").html();
			 var pid = $("input[name='xz']:checked").parent().attr('pid');
		}else { var pid = $(this).parent().attr('pid');}
		var sstr = "&sid=" + sid + "&abcd=" + abcd + "&ab=" + ab + "&goods=" + goods + "&qishu=" + qishu ;
		sstr += "&puserid=" + puserid + "&page=" + page + "&orderby=" + orderby;
		sstr += "&sorttype=" + sorttype + "&xtypes=" + xtype +"&pid=" + pid+"&con="+con;
		
		var posi = $(this).position();
		if (posi.left > document.body.clientWidth) {
			$(".xxtb").css('left', posi.left + $(this).width() - $(".xxtb").width())
		} else {
			$(".xxtb").css('left', 10)
		}
		$(".xxtb").css('top', posi.top + $(this).height());
		$(".xxtb").show();

		var obj = $(this);
		$.ajax({
			type: 'POST',
			url: mulu + 'now.php',
			cache: false,
			data: 'xtype=getxx' + sstr,
			dataType: 'json',
			success: function(m) {
				
				var ml = m['tz'].length;
				var str = '';
				$(".xxtb tr").each(function(i) {
					if (!$(this).hasClass('bt')) $(this).remove()
				});
				for (i = 0; i < ml; i++) {
					str += "<tr>";
					str += "<td>" + m['tz'][i]['qishu'] + "</td>";
					str += "<td>" + m['tz'][i]['tid'] + "</td>";
					str += "<td>" + m['tz'][i]['xtype'] + "</td>";
					str += "<td>" + m['tz'][i]['wf'] + "</td>";
					str += "<td>" + m['tz'][i]['abcd'] + "</td>";
					str += "<td>" + m['tz'][i]['ab'] + "</td>";
					str += "<td>" + m['tz'][i]['con'] + "</td>";
					str += "<td><label>" + m['tz'][i]['zcje'] + "</label>/" + m['tz'][i]['je'] + "</td>";
					str += "<td>" + m['tz'][i]['peilv1'] + "</td>";
					str += "<td>" + m['tz'][i]['points'] + "</td>";
					str += "<td>" + m['tz'][i]['user'] + "</td>";
					str += "<td>" + m['tz'][i]['xtime'] + "</td>";
					if (layer < (maxlayer - 1)) str += "<td>" + m['tz'][i]['duser'] + "</td>";
					for (j = layer; j < maxlayer; j++) {
						str += "<td>" + m['tz'][i]['zc' + j] + "</td>"
					}
					str += "</tr>"
				}
				$(".xxtb").prepend("<tr><td><a href='javascript:void(0);' class='close'>关闭</a></td><td><select class='xtype'><option value='2' selected>全部</option><option value='0'>投|注</option><option value='1'>补货</option></select></td><td colspan=20>" + m['page'] + "</td></tr>");
				$(".xxtb").append(str);
				$(".xxtb select").val(m['xtype']);
				$(".xxtb .close").click(function() {
					$(".xxtb").hide();
					return false
				});
				$(".xxtb select").change(function() {
					$(".sort").attr("xtype",$(this).val());
					$(".sort").attr("page",1);
					obj.click()
				});
				$(".xxtb a.page").click(function() {
					$(".sort").attr("page",$(this).html());
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
	})
}
function flyxxclick(lib) {
	$("."+lib+" label.flyxx").click(function() {
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
		var sname = $(".now th.bred").html();
		var con='';
		if (sname == '合肖' | sname == '連碼' | sname == '不中' | sname == '生肖連' | sname == '尾數連' | sname == '過關') {
			 con = $(this).parent().parent().find("td.c").html();
			 var pid = $("input[name='xz']:checked").parent().attr('pid');
		}else { var pid = $(this).parent().attr('pid');}
		
		var sstr = "&sid=" + sid + "&abcd=" + abcd + "&ab=" + ab + "&goods=" + goods + "&qishu=" + qishu ;
		sstr += "&puserid=" + puserid + "&page=" + page + "&orderby=" + orderby;
		sstr += "&sorttype=" + sorttype + "&xtypes=" + xtype +"&pid=" + pid+"&con="+con;

		var posi = $(this).position();
		if (posi.left > document.body.clientWidth) {
			$(".flytb").css('left', posi.left + $(this).width() - $(".xxtb").width())
		} else {
			$(".flytb").css('left', 10)
		}
		$(".flytb").css('top', posi.top + $(this).height());
		$(".flytb").show();
		
		var obj = $(this);
		$.ajax({
			type: 'POST',
			url: mulu + 'now.php',
			cache: false,
			data: 'xtype=getfly' + sstr ,
			dataType: 'json',
			success: function(m) {
				var ml = m['tz'].length;
				var str = '';
				$(".flytb tr").each(function(i) {
					if (!$(this).hasClass('bt')) $(this).remove()
				});
				for (i = 0; i < ml; i++) {
					str += "<tr>";
					str += "<td>" + m['tz'][i]['qishu'] + "</td>";
					str += "<td>" + m['tz'][i]['tid'] + "</td>";
					str += "<td>" + m['tz'][i]['xtype'] + "</td>";
					str += "<td>" + m['tz'][i]['wf'] + "</td>";
					str += "<td>" + m['tz'][i]['abcd'] + "</td>";
					str += "<td>" + m['tz'][i]['ab'] + "</td>";
					str += "<td>" + m['tz'][i]['con'] + "</td>";
					str += "<td><label>" + m['tz'][i]['je'] + "</td>";
					str += "<td>" + m['tz'][i]['peilv1'] + "</td>";
					str += "<td>" + m['tz'][i]['points'] + "</td>";
					str += "<td>" + m['tz'][i]['user'] + "</td>";
					str += "<td>" + m['tz'][i]['xtime'] + "</td>";
					str += "<td>" + m['tz'][i]['flytype'] + "</td>";
					str += "</tr>"
				}
				$(".flytb").prepend("<tr><td><a href='javascript:void(0);' class='close'>关闭</a></td><td colspan=12></td></tr>");
				$(".flytb").append(str);
				$(".flytb .close").click(function() {
					$(".flytb").hide()
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

function getm(val) {
	if (ngid == 101 | ngid == 111 | ngid == 113 | ngid == 115 | ngid == 108 | ngid == 109 | ngid == 110 | ngid == 112 ) ngid = 101;
	if (ngid == 121 | ngid == 123 | ngid == 125 | ngid == 127 | ngid == 129 ) ngid = 105;
	if (ngid == 103 | ngid == 133 | ngid == 135 | ngid == 131 | ngid == 132 | ngid == 136) ngid = 103;
	var sl = sma['g' + ngid].length;
	for (i = 0; i < sl; i++) {
		if (val == sma['g' + ngid][i]['name']) {
			return sma['g' + ngid][i]['ma']
		}
	}
}
function colors(v) {
	if (isNaN(v)) {
		return ''
	} else {
		if (in_array(v, ma['紅'])) return ' red';
		else if (in_array(v, ma['藍'])) return ' blue';
		else return ' lv'
	}
}