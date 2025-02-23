function libsm(smtype) {
	var ab = $(".smenu td:eq(1)").find(".click").attr("ab");
	var bid = $(".main a.click").attr("bid");
	var abcd = $(".smenu select").val();
	if (abcd == undefined | abcd == 'undefined') abcd = $(".smenu input[name='abcd']").val();
	var sc = $(".smenu td:eq(0)").find('input.click').attr('cid');
	var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&sc=" + sc + "&smtype=" + smtype;
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=lib&stype=sm' + sstr,
		success: function(m) {
			var ml = m.length;
			var str = "<tr><td><table class='wd100 tinfo'><tr>";
			var libtha = "<tr><td class=f>项目</td><td class=s>赔率</td><td class=t>金额</td><td class=f>项目</td><td class=s>赔率</td><td class=t>金额</td><td class=f>项目</td><td class=s>赔率</td><td class=t>金额</td><td class=f>项目</td><td class=s>赔率</td><td class=t>金额</td><td class=f>项目</td><td class=s>赔率</td><td class=t>金额</td></tr>";
			var sname = '';
			var j = 0;
			var bid = m[0]['bid'];
			var sid = m[0]['sid'];
			str += "<td></td>";
			var name = '';
			for (i = 0; i < ml; i++) {
				if (m[i]['sid'] != sid) break;
				str += "<th colspan=2 >" + m[i]['name'] + "</th>"
			}
			str += "</tr>";
			for (i = 0; i < ml; i++) {
				if (m[i]['ftype'] == '0') {
					if (sname != m[i]['sname']) {
						if (sname != '') str += "</tr>";
						if (m[i]['sname'] == '第一球') {
							name = '万 OXXXX'
						} else if (m[i]['sname'] == '第二球') {
							name = '千 XOXXX'
						} else if (m[i]['sname'] == '第三球') {
							name = '百 XXOXX'
						} else if (m[i]['sname'] == '第四球') {
							name = '十 XXXOX'
						} else if (m[i]['sname'] == '第五球') {
							name = '个 XXXXO'
						} else {
							name = m[i]['sname']
						}
						str += "<tr><th  class='bt sname chu'>" + name + "</th>"
					}
					if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
					str += "<th class='hide over f m m" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "'   >" + m[i]['name'] + "</th>";
					str += "<td class='over s p p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + m[i]['peilv1'] + "</label></td>";
					if (Number(m[i]['ifok']) == 1) str += "<TD class='over t i" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "' style='text-align:center'><input type='text'  class='in' /><input type='checkbox' class='hide in' /></td>";
					else str += "<TD class='t'>封盘</td>"
				} else {
					if (j % 5 == 0) {
						if (j == 0) str += "</tr></table><BR /><table class='tinfo wd100' ><tr><th class='bt cname' colspan=15>" + m[i]['cname'] + "</th></tr>" + libtha + "<tr>";
						else str += "</tr><tr>"
					}
					if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
					str += "<th class='over f m m" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "'   >" + m[i]['name'] + "</th>";
					str += "<td class='over s p p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + m[i]['peilv1'] + "</label></td>";
					if (Number(m[i]['ifok']) == 1) str += "<TD class='over t i" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "' style='text-align:center'><input type='text'  class='in' /><input type='checkbox' class='hide in' /></td>";
					else str += "<TD class='t'>封盘</td>";
					j++
				}
				sname = m[i]['sname']
			}
			str += "</tr></table></td></tr>";
			$(".make").html("<tbody>" + str + "</tbody>");
			$(".make input:text").css("width", 33);
			$(".make").show();
			$(".make td").attr("valign", 'top');
			str = null;
			m = null;
			addfunc()
		}
	})
}
function libsm2() {
	var ab = $(".smenu td:eq(1)").find(".click").attr("ab");
	var bid = $(".main a.click").attr("bid");
	var abcd = $(".smenu select").val();
	if (abcd == undefined | abcd == 'undefined') abcd = $(".smenu input[name='abcd']").val();
	var sc = $(".smenu td:eq(0)").find('input.click').attr('cid');
	var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&sc=" + sc;
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=lib&stype=sm' + sstr,
		success: function(m) {
			var ml = m.length;
			var str = "<tr>";
			var libtha = "<tr><Th class=f>项目</th><th class=s>赔率</th><Th class=t>金额</th></tr>";
			var sname = '';
			var j = 0;
			for (i = 0; i < ml; i++) {
				if (sname != m[i]['sname']) {
					if (sname != '') str += "</table></td>";
					if (j % 5 == 0 & sname != '') str += "</tr><tr><td colspan=5 style='height:10px;' ></td></tr><tr>";
					str += "<TD valign=top>";
					str += "<table class='tinfo wd100'><tr><th colspan=3 class='bt sname'>" + m[i]['sname'] + "</th></tr>";
					j++
				}
				str += "<tr>";
				if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
				str += "<th class='over f m m" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "'  >" + m[i]['name'] + "</th>";
				str += "<td class='over s p p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + m[i]['peilv1'] + "</label></td>";
				if (Number(m[i]['ifok']) == 1) str += "<TD class='over t i" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "' style='text-align:center'><input type='text'  class='in' /><input type='checkbox' class='hide in' /></td>";
				else str += "<TD class='t'>封盘</td>";
				str += "</tr>";
				sname = m[i]['sname']
			}
			str += "</table></td></tr>";
			$(".make").html("<tbody>" + str + "</tbody>");
			$(".make").show();
			$(".make td").attr("valign", 'top');
			str = null;
			m = null;
			addfunc()
		}
	})
}
function liba() {
	var ab = $(".smenu td:eq(1)").find(".click").attr("ab");
	var bid = $(".main a.click").attr("bid");
	var abcd = $(".smenu select").val();
	if (abcd == undefined | abcd == 'undefined') abcd = $(".smenu input[name='abcd']").val();
	var sc = $(".smenu td:eq(0)").find('input.click').attr('cid');
	var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&sc=" + sc;
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=lib&stype=a' + sstr,
		success: function(m) {
			var ml = m.length;
			var str = "<tr>";
			var libtha = "<tr><Th class=f>项目</th><th class=s>赔率</th><Th class=t>金额</th></tr>";
			var sname = '';
			var j = 0;
			for (i = 0; i < ml; i++) {
				if (sname != m[i]['sname']) {
					if (sname != '') str += "</table></td>";
					if (j % 5 == 0 & sname != '') str += "</tr><tr>";
					str += "<TD valign=top><table class='tinfo wd100'><tr><th colspan=3 class='bt sname'>" + m[i]['sname'] + "</th></tr>";
					str += libtha;
					j++
				}
				str += "<tr>";
				if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
				str += "<th class='over f m m" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "'  >" + m[i]['name'] + "</th>";
				str += "<td class='over s p p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + m[i]['peilv1'] + "</label></td>";
				if (Number(m[i]['ifok']) == 1) str += "<TD class='over t i" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "' style='text-align:center'><input type='text'  class='in' /><input type='checkbox' class='hide in' /></td>";
				else str += "<TD class='t'>封盘</td>";
				str += "</tr>";
				sname = m[i]['sname']
			}
			str += "</table></td></tr>";
			$(".make").html("<tbody>" + str + "</tbody>");
			$(".make").show();
			$(".make td").attr("valign", 'top');
			str = null;
			m = null;
			addfunc()
		}
	})
}
function libd() {
	var ab = $(".smenu td:eq(1)").find(".click").attr("ab");
	var bid = $(".main a.click").attr("bid");
	var abcd = $(".smenu select").val();
	if (abcd == undefined | abcd == 'undefined') abcd = $(".smenu input[name='abcd']").val();
	var sid = $(".smenu td:eq(0)").find('input.click').attr('sid');
	var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&sid=" + sid;
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=lib&stype=d' + sstr,
		success: function(m) {
			var libtha = "<tr><Th class=f>项目</th><th class=s>赔率</th><Th class=t>金额</th></tr>";
			var ml = m.length;
			var str = "<tr><td>";
			var cname = '';
			var left1cname = '';
			var sid = 0;
			var cid = 0;
			var j = 0;
			var ftype = 100;
			var z = 0;
			for (i = 0; i < ml; i++) {
				if (left1cname != m[i]['cname'].substr(0, 1)) {
					if (left1cname != '') {
						if (j != 4) {
							for (u = j; u < 4; u++, j++) {
								str += "<th class='f1'>&nbsp;</th><td class='s1'>&nbsp;</td><td class='t1'>&nbsp;</td>"
							}
						}
						str += "</tr></table>"
					}
					str += "<table class='wd100 tinfo'><Tr><th rowspan=5 class='bt bt2 cname'>" + m[i].cname + "</th>";
					j = 0
				}
				if (ftype != m[i]['ftype'] & ftype != 100) {
					if (j != 0) {
						for (u = j; u < 4; u++, j++) {
							str += "<th class='f1 f2'>&nbsp;</th><td class='s1 p2'>&nbsp;</td><td class='t1 t2'>&nbsp;</td>"
						}
					}
				}
				if (j == 4) {
					str += "</tr><tr>";
					j = 0
				}
				if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
				str += "<th class='over f1 m m2 m" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "'  >" + m[i]['name'] + "</th>";
				str += "<td class='over s1 p p2 p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + m[i]['peilv1'] + "</label></td>";
				if (Number(m[i]['ifok']) == 1) str += "<TD class='over t1 t2 i" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "'><input type='text' class='in'   /><input type='checkbox' class='hide in' /></td>";
				else str += "<TD class='t1 t2'>封盘</td>";
				ftype = m[i]['ftype'];
				left1cname = m[i].cname.substr(0, 1);
				sid = Number(m[i]['sid']);
				cid = Number(m[i]['cid']);
				j++
			}
			if (j != 4) {
				for (u = j; u < 4; u++) {}
			}
			str += "</tr></table></td></tr>";
			$(".make").html("<tbody>" + str + "</tbody>");
			$(".make").show();
			tu(m[0]['tu']);
			str = null;
			m = null;
			addfunc()
		}
	})
}

function libd2() {
	var ab = $(".smenu td:eq(1)").find(".click").attr("ab");
	var bid = $(".main a.click").attr("bid");
	var abcd = $(".smenu select").val();
	if (abcd == undefined | abcd == 'undefined') abcd = $(".smenu input[name='abcd']").val();
	var sid = $(".smenu td:eq(0)").find('input.click').attr('sid');
	var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&sid=" + sid;
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=lib&stype=d' + sstr,
		success: function(m) {
			var libtha = "<tr><Th class=f>项目</th><th class=s>赔率</th><Th class=t>金额</th></tr>";
			var ml = m.length;
			var str = "<tr><td class='wd100'><table class='tinfo wd100'><tr>";
			var cname = '';
			var left1cname = '';
			var sid = 0;
			var cid = 0;
			var j = 0;
			var ftype = 100;
			var z = 0;
			var k = 5;
			for (i = 0; i < ml; i++) {
				if (z % k == 0 & i != 0) {
					if (m[i]['name'] != '土') {
						if (k == 4 & z != 0) {
							str += "<td></tD><td></tD><td></tD>"
						}
						str += "</tr><tr>"
					}
				}
				if (isNaN(Number(m[i]['name'])) & j == 0) {
					str += "</tr><tr><td colspan=15 style='height:10px;'></td></tr><tr>";
					z = 0;
					k = 4;
					j++
				}
				if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
				str += "<th class='over f1 m m2 m" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "'  >" + m[i]['name'] + "</th>";
				str += "<td class='over s1 p p2 p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + m[i]['peilv1'] + "</label></td>";
				if (Number(m[i]['ifok']) == 1) str += "<TD class='over t1 t2 i" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "'><input type='text' class='in'   /><input type='checkbox' class='hide in' /></td>";
				else str += "<TD class='t1 t2'>封盘</td>";
				z++;
				if (m[i]['name'] == '土') {
					z = 0
				}
			}
			str += "</tr></table></td></tr>";
			$(".make").html("<tbody>" + str + "</tbody>");
			$(".make").show();
			tu(m[0]['tu']);
			str = null;
			m = null;
			addfunc()
		}
	})
}
function libe() {
	var ab = $(".smenu td:eq(1)").find(".click").attr("ab");
	var bid = $(".main a.click").attr("bid");
	var abcd = $(".smenu select").val();
	if (abcd == undefined | abcd == 'undefined') abcd = $(".smenu input[name='abcd']").val();
	var sid = $(".smenu td:eq(0)").find('input.click').attr('sid');
	var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&sid=" + sid;
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=lib&stype=d' + sstr,
		success: function(m) {
			var libtha = "<tr><Th class=f>项目</th><th class=s>赔率</th><Th class=t>金额</th></tr>";
			var ml = m.length;
			var str = "<tr><td><table class='tinfo wd100'>";
			var cname = '';
			var left1cname = '';
			var sid = 0;
			var cid = 0;
			var j = 0;
			var ztype = 0;
			for (i = 0; i < ml; i++) {
				if (sid != Number(m[i]['sid'])) {
					if (sid != 0) str += "</tr>";
					str += "<tr><th rowspan=" + 5 + " class='bt bt2 sname'>" + m[i]['sname'] + "</th>";
					left1cname = '';
					j = 0
				}
				if (left1cname != m[i].cname.substr(0, 1)) {
					if (left1cname != '') str += "</tr><tr><th rowspan=2 class='bt bt2 cname'>" + m[i].cname + "</th>";
					else str += "<th rowspan=2 class='bt bt2'>" + m[i].cname + "</th>";
					j = 0
				}
				if (j == 5 & left1cname != '') {
					j = 0;
					str += "</tr><tr>"
				}
				if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
				str += "<th class='over f1 m m" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "'  >" + m[i]['name'] + "</th>";
				str += "<td class='over s1 p p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "' ><label class='peilv1'>" + m[i]['peilv1'] + "</label></td>";
				if (Number(m[i]['ifok']) == 1) str += "<TD class='over t1 i" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' style='text-align:center'><input type='text' class='in' /><input type='checkbox' class='hide in' /></td>";
				else str += "<TD class='t1'>封盘</td>";
				cname = m[i]['cname'];
				left1cname = m[i].cname.substr(0, 1);
				sid = Number(m[i]['sid']);
				cid = Number(m[i]['cid']);
				j++
			}
			str += "</tr></table></td></tr>";
			$(".make").html("<tbody>" + str + "</tbody>");
			$(".make").show();
			$(".make .bt2").css("width", "5%");
			$(".make td").attr("valign", 'top');
			str = null;
			m = null;
			addfunc()
		}
	})
}

function libb() {
	var ab = $(".smenu td:eq(1)").find(".click").attr("ab");
	var bid = $(".main a.click").attr("bid");
	var abcd = $(".smenu select").val();
	if (abcd == undefined | abcd == 'undefined') abcd = $(".smenu input[name='abcd']").val();
	var sc = $(".smenu td:eq(0)").find('input.click').attr('cid');
	var sid = $(".smenu td:eq(0)").find('input.click').attr('sid');
	if (sid == undefined) sid = '';
	var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&sc=" + sc + "&sid=" + sid;
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=lib&stype=b' + sstr,
		success: function(m) {
			var libtha = "<tr><th class='f'>类别</th><th class='s' mname=''>赔率</th><th  class='t'>金额</th></tr>";
			var ml = m.length;
			var str = "<tr>";
			var cname = '';
			var j = 0;
			for (i = 0; i < ml; i++) {
				if (cname != m[i]['cname']) {
					if (cname != '') str += "</table></td>";
					if (j == 4) {
						str += "<tr>";
						j = 0
					}
					str += "<TD valign=top><table class='tinfo wd100'><tr><th colspan=3 class='bt cname'>" + m[i]['cname'] + "</th></tr>";
					str += libtha;
					j++
				}
				str += "<tr>  ";
				if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
				str += "<th class='over f m m" + m[i]['pid'] + "'   pid='" + m[i]['pid'] + "' >" + m[i]['name'] + "</th>";
				str += "<td class='over s p p" + m[i]['pid'] + "'  pid='" + m[i]['pid'] + "'  mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + m[i]['peilv1'] + "</label></td>";
				if (Number(m[i]['ifok']) == 1) str += "<TD class='over t i" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "'><input type='text' class='in' /><input type='checkbox' class='hide in' /></td>";
				else str += "<TD class='t'>封盘</td>";
				str += "</tr>";
				cname = m[i]['cname']
			}
			str += "</table></td></tr>";
			$(".make").html("<tbody>" + str + "</tbody>");
			$(".make").show();
			$(".make td").attr("valign", 'top');
			tu(m[0]['tu']);
			str = null;
			strs = null;
			m = null;
			addfunc();
			$(".make input:text").attr("maxlength", 7)
		}
	})
}
function libc() {
	var ab = $(".smenu td:eq(1)").find(".click").attr("ab");
	var bid = $(".main a.click").attr("bid");
	var abcd = $(".smenu select").val();
	if (abcd == undefined | abcd == 'undefined') abcd = $(".smenu input[name='abcd']").val();
	var cid = $(".smenu td:eq(0)").find('input.click').attr('cid');
	var p = $(".sandingwei .click").attr('p');
	var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab + "&cid=" + cid + "&p=" + p;
	$(".make").empty();
	$(".make").hide();
	$.ajax({
		type: 'POST',
		url: mulu + 'make.php',
		dataType: 'json',
		cache: false,
		data: 'xtype=lib&stype=c' + sstr,
		success: function(m) {
			var libtha = "<th class='f'>类别</th><th class='s' mname=''>赔率</th><th  class='t'>金额</th>";
			var ml = m.length;
			var str = "<tr><td><table class='wd100 lm tinfo'><tr>";
			$(".make").empty();
			for (i = 0; i < ml; i++) {
				if (i % 5 == 0 & i != 0) {
					str += '</tr><tr>'
				}
				if (Number(m[i]['ifok']) == 0) m[i]['peilv1'] = '-';
				str += "<th class='over m f2 m" + m[i]['pid'] + "'   pid='" + m[i]['pid'] + "'  >" + m[i]['name'] + "</th>";
				str += "<td  class='over p s2 p" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "' mname='" + m[i]['name'] + "' maxje='" + m[i]['maxje'] + "' minje='" + m[i]['minje'] + "'><label class='peilv1'>" + m[i]['peilv1'] + "</label></td>";
				if (Number(m[i]['ifok']) == 1) str += "<TD class='over t2 i" + m[i]['pid'] + "' pid='" + m[i]['pid'] + "'><input type='text' class='in' /><input type='checkbox' class='hide in' /></td>";
				else str += "<TD class='t2' >封盘</td>"
			}
			str += "</tr></table></td></tr>";
			$(".make").html("<tbody>" + str + "</tbody>");
			$(".make").show();
			$(".make td").attr("valign", 'top');
			str = null;
			strs = null;
			m = null;
			addfunc();
			$(".make input:text").attr("maxlength", 7)
		}
	})
}
