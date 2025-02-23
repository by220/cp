function in_array(v, a) {
	for (key in a) {
		if (a[key] == v) return true
	}
	return false
}
function myready() {
	if (ngid == 100){ 
	   $(".qiu").each(function(){
		  var m = Number($(this).html());
		  if(in_array(m,ma['紅'])){
			  $(this).addClass('qiured');
		  }else if(in_array(m,ma['藍'])){
			  $(this).addClass('qiublue');
		  }else{
		      $(this).addClass('qiugreen');
		  }
		 });
	  return false;
	}
	$("input:button").addClass('btnf');
	$(".game").change(function() {
		window.location.href = "long.php?xtype=show&gid=" + $(this).val()
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
	$(".pages").change(function() {
		query();
	});
	$(".query").click(function() {
		$(".page").val(1);
		query();
		return false
	});
	gets()
}
function qiu(n, t) {
	
	if (isNaN(n) | n=='') {
		return n
	} else {
		if (ngid == 151 | ngid == 152 | ngid==153 | ngid==155  | ngid==157) {
			if (n > 100) {
				n = "<img src='../imgn/sz" + (n%10) + "1.png' /><img src='../imgn/sz" + (n%10) + "1.png' /><img src='../imgn/sz" + (n%10) + "1.png' />"
			} else if (n > 10) {
				n = "<img src='../imgn/sz" + n.substr(0, 1) + "1.png' /><img src='../imgn/sz" + (n%10) + "1.png' />"
			} else {
				n = "<img src='../imgn/sz" + n + "1.png' />"
			}
			return n
		} else if (ngid == 107) {
			n = Number(n);
			if (n == 0) {
				n = "<img src='../img/pk.png' />"
			} else {
				n = "<img src='../img/pk" + n + ".png' />"
			}
			return n
		} else {
			if ((ngid == 103 | ngid == 133 | ngid == 135 | ngid == 131 | ngid == 132 | ngid == 136) & n >= 19) {
				return "<div class='qiub'>" + n + "</div>"
			} else if ((ngid == 121 | ngid == 123 | ngid == 125 | ngid == 127 | ngid == 129 ) & n == 11) {
				return "<div class='qiub'>" + n + "</div>"
			} else if(Number(n)>40 & ngid!=100){
				return "<div class='qiub'>" + n + "</div>"
			}  else if (t == 7 & ngid == 100) {
				return "<div class='qiub'>" + n + "</div>"
			} else {
				return "<div class='qiua'>" + n + "</div>"
			}
		}
	}
}
function query() {
	var gid = $(".game").val();
	var bid = $(".bid").val();
	var sid = $(".sid").val();
	var cid = $(".cid").val();
	var page = $(".pages").val();
	var str = "&gid=" + gid + "&bid=" + bid + "&sid=" + sid + "&cid=" + cid + "&page=" + page;
	if (bid == 'longsm') {
		$.ajax({
			type: 'POST',
			url: mulu + 'long.php',
			data: 'xtype=longsm' + str,
			dataType: 'json',
			cache: false,
			success: function(m) {
				var str = '';
				var ml = m.length;
				var kl = m[0]['th'].length;
				if (ngid == 151 | ngid == 152 | ngid == 153 | ngid == 155 | ngid == 157) {
					str += "<tr><th>期数</th><th>开奖时间</th><th>号码</th><th>点数</th><th>三军</th></tr>"
				} else {
					str += "<tr class='b'>";
					if (ngid == 101 | ngid == 111 | ngid == 113 | ngid == 115 | ngid == 108 | ngid == 109 | ngid == 110 | ngid == 112 | ngid == 163 | ngid == 116 | ngid == 117 | ngid == 118 | ngid == 119) {
						str += "<th rowspan=3>期数</th>";
						str += "<th rowspan=3>时间</th>";
						str += "<th rowspan=3>号码</th>";
						str += "<th rowspan=3>总和</th>"
					} else if (ngid == 161 | ngid == 162) {
						str += "<th>期数</th>";
						str += "<th>时间</th>";
						str += "<th>号码</th>";
						str += "<th>总和</th>"
					} else {
						str += "<th rowspan=2>期数</th>";
						str += "<th rowspan=2>时间</th>";
						str += "<th rowspan=2>号码</th>";
						if (ngid != 107) str += "<th rowspan=2>总和</th>"
					}
					if (ngid != 161 & ngid != 162) {
						var tmp = '';
						var cols = 0;
						for (i = 0; i < kl; i++) {
							if (tmp != m[0]['th'][i]['bname'] & tmp != '') {
								str += "<th colspan='" + cols + "'>" + m[0]['th'][i - 1]['bname'] + "</th>";
								cols = 1
							} else {
								cols++
							}
							tmp = m[0]['th'][i]['bname']
						}
						str += "<th colspan='" + cols + "'>" + m[0]['th'][i - 1]['bname'] + "</th>";
						str += "</tr>";
						if (ngid == 101 | ngid == 111 | ngid == 113 | ngid == 115 | ngid == 108 | ngid == 109 | ngid == 110 | ngid == 112 | ngid == 163 | ngid == 116 | ngid == 117 | ngid == 118 | ngid == 119) {
							str += "<tr class='s'>";
							var tmp = '';
							var cols = 0;
							for (i = 0; i < kl; i++) {
								if (tmp != m[0]['th'][i]['sname'] & tmp != '') {
									str += "<th colspan='" + cols + "'>" + m[0]['th'][i - 1]['sname'].replace('和数', '') + "</th>";
									cols = 1
								} else {
									cols++
								}
								tmp = m[0]['th'][i]['sname']
							}
							str += "<th colspan='" + cols + "'>" + m[0]['th'][i - 1]['sname'].replace('和数', '') + "</th>";
							str += "</tr>"
						}
						str += "<tr  class='c'>"
					}
					for (i = 0; i < kl; i++) {
						str += "<th>" + m[0]['th'][i]['cname'] + "</th>"
					}
					str += "</tr>"
				}
				m[0]['k'] = new Array();
				for (j = 0; j < kl; j++) {
					m[0]['k'][j] = 0
				}
				for (i = 0; i < ml; i++) {
					if (Number(m[i]['qishu']) != 0 & Number(m[i]['qishu']) % 10 == 0 & i > 1) {
						str += "<tr><td colspan='" + (kl + 3 + Number(m[0]['mnum'])) + "' style='height:2px;background:#f00'></td></tr>"
					}
					str += "<tr>";
					str += "<td>" + m[i]['qishu'].substr(-7) + "</td>";
					str += "<td>" + m[i]['time'] + "</td>";
					str += "<td>";
					for (j = 1; j <= Number(m[0]['mnum']); j++) {
						str += qiu(m[i]['m' + j], j)
					}
					str += "</td>";
					if (ngid != 107) {
						str += "<td>" + m[i]['zf'] + "</td>"
					}
					for (j = 0; j < kl; j++) {
						if (i > 0) {
							if (m[i]['m'][j] == m[(i - 1)]['m'][j]) {
								str += "<td style='color:" + bg[(j % 3) * 2 + m[0]['k'][j]] + "'>" + m[i]['m'][j] + "</td>"
							} else {
								if (m[0]['k'][j] == 0) m[0]['k'][j] = 1;
								else m[0]['k'][j] = 0;
								str += "<td style='color:" + bg[(j % 3) * 2 + m[0]['k'][j]] + "'>" + m[i]['m'][j] + "</td>"
							}
						} else {
							str += "<td style='color:" + bg[(j % 3) * 2 + m[0]['k'][j]] + "'>" + m[i]['m'][j] + "</td>"
						}
					}
					str += "</tr>"
				}
				$(".history").html(str);
				str = null;
				m = null;
				if (Number($(".page").val()) == 1) {
					$(".first").attr("disabled", true);
					$(".prev").attr("disabled", true);
					$(".next").attr("disabled", false)
				}
				if (Number($(".page").val()) > 1) {
					$(".first").attr("disabled", false);
					$(".prev").attr("disabled", false);
					$(".next").attr("disabled", false)
				}
				$(".history td").click(function() {
					if ($(this).hasClass('cz')) {
						var index = $(this).index();
						$(".history tr").find("td:eq(" + index + ")").removeClass('cz')
					} else {
						var index = $(this).index();
						$(".history tr").find("td:eq(" + index + ")").addClass('cz')
					}
				});
				if (ngid == 151 | ngid == 152 | ngid == 153 | ngid == 155 | ngid == 157) {
					$(".history").removeClass('w1260');
					$(".history").removeClass('w1500');
					$(".history").addClass('w500')
				} else if (ngid != 121 & ngid != 123 & ngid != 125 & ngid != 161 & ngid != 162 & ngid != 163) {
					$(".history").removeClass('w500');
					$(".history").removeClass('w1260');
					$(".history").addClass('w1500')
				} else {
					$(".history").removeClass('w500');
					$(".history").addClass('w1260');
					$(".history").removeClass('w1500')
				}
			}
		})
	} else {
		$.ajax({
			type: 'POST',
			url: mulu + 'long.php',
			dataType: 'json',
			data: 'xtype=long' + str,
			cache: false,
			success: function(m) {
			
				var str = '';
				var ml = m.length;
				
				var pl = m[0]['m'].length;
			
				var qs = '';
				if (ngid == 101 | ngid == 111 | ngid == 113 | ngid == 115 | ngid == 108 | ngid == 109 | ngid == 110 | ngid == 112 | ngid == 163 | ngid == 116 | ngid == 117 | ngid == 118 | ngid == 119) {
					if (m[0]['th'][0]['bname'] == '1~5') {
						str = "<tr><th>期数</th><th>类别</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>单</th><th>双</th><th>大</th><th>小</th><th>质</th><th>合</th></tr>"
					} else if (m[0]['th'][0]['bname'] == '1字组合') {
						str = "<tr><th>期数</th> <th>类别</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr>"
					} else if (m[0]['th'][0]['bname'] == '2字和数') {
						if (ngid == 163 | ngid == 116 | ngid == 117 | ngid == 118 | ngid == 119) {
							str = "<tr><th>期数</th> <th>类别</th><th colspan=4 >百十</th><th colspan=4>百个</th><th colspan=4 >十个</th></tr>"
						} else {
							str = "<tr><th>期数</th> <th>类别</th><th colspan=4 >万千</th><th colspan=4 >万百</th><th colspan=4 >万十</th><th colspan=4 >万个</th><th colspan=4 >千百</th><th colspan=4 >千十</th><th colspan=4 >千个</th><th colspan=4 >百十</th><th colspan=4 >百个</th><th colspan=4 >十个</th></tr>"
						}
					} else if (m[0]['th'][0]['bname'] == '3字和数') {
						str = "<tr><th>期数</th> <th>类别</th><th colspan=2 >和单双</th>  <th colspan=2 >和大小</th><th colspan=2 >和尾大小</th><th colspan=2 >和尾质合</th><th>0尾</th><th>1尾</th><th>2尾</th><th>3尾</th><th>4尾</th><th>5尾</th><th>6尾</th><th>7尾</th><th>8尾</th><th>9尾</th></tr>"
					} else if (m[0]['th'][0]['bname'] == '总和龙虎') {
						if (ngid == 163 | ngid == 116 | ngid == 117 | ngid == 118 | ngid == 119) {
							str = "<tr><th>期数</th> <th>类别</th><th>0~6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>19</th><th>20</th><th>21~27</th><th colspan=2 >总单双</th> <th colspan=2 >总大小</th> <th colspan=2 >总尾大小</th><th colspan=2 >总尾质合</th><th>0尾</th><th>1尾</th><th>2尾</th><th>3尾</th><th>4尾</th><th>5尾</th><th>6尾</th><th>7尾</th><th>8尾</th><th>9尾</th><th>龙</th><th>虎</th><th>和</th></tr>"
						} else {
							str = "<tr><th>期数</th> <th>类别</th><th colspan=2 >总单双</th> <th colspan=2 >总大小</th> <th colspan=2 >总尾大小</th><th colspan=2 >总尾质合</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>龙</th><th>虎</th><th>和</th></tr>"
						}
					} else if (m[0]['th'][0]['bname'] == '牛牛梭哈') {
						str = "<tr><th>期数</th> <th>类别</th><th>无牛</th><th>牛1</th><th>牛2</th><th>牛3</th><th>牛4</th><th>牛5</th><th>牛6</th><th>牛7</th><th>牛8</th><th>牛9</th><th>牛牛</th><th>牛单</th><th>牛双</th><th>牛大</th><th>牛小</th><th>牛质</th><th>牛合</th><th>五梅</th><th>炸弹</th><th>葫芦</th><th>顺子</th><th>三条</th><th>两对</th><th>一对</th><th>五不靠</th><th>散号</th></tr>"
					} else if (m[0]['th'][0]['bname'] == '跨度') {
						str = "<tr><th>期数</th> <th>类别</th></tr>";
						str = "<tr><th rowspan=2>期数</th> <th rowspan=2>类别</th>";
						if (ngid == 101 | ngid == 111 | ngid == 113 | ngid == 115 | ngid == 108 | ngid == 109 | ngid == 110 | ngid == 112) {
							str += "<th colspan=10>前三</th>";
							str += "<th colspan=10>中三</th>"
						}
						str += "<th colspan=10>后三</th></tr><tr>";
						if (ngid == 101 | ngid == 111 | ngid == 113 | ngid == 115 | ngid == 108 | ngid == 109 | ngid == 110 | ngid == 112) {
							str += "<th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th>";
							str += "<th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th>"
						}
						str += "<th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr>"
					} else if (m[0]['th'][0]['bname'] == '其他') {
					str = "<tr><th rowspan=2>期数</th> <th rowspan=2>类别</th>";
					if (ngid == 101 | ngid == 111 | ngid == 113 | ngid == 115 | ngid == 108 | ngid == 109 | ngid == 110 | ngid == 112) {
						str += "<th colspan=5>前三</th>";
						str += "<th colspan=5>中三</th>"
					}
					str += "<th colspan=5>后三</th></tr><tr>";
					if (ngid == 101 | ngid == 111 | ngid == 113 | ngid == 115 | ngid == 108 | ngid == 109 | ngid == 110 | ngid == 112) {
						str += "<th>豹子</th><th>顺子</th><th>对子</th><th>半顺</th><th>杂六</th>";
						str += "<th>豹子</th><th>顺子</th><th>对子</th><th>半顺</th><th>杂六</th>"
					}
					str += "<th>豹子</th><th>顺子</th><th>对子</th><th>半顺</th><th>杂六</th></tr>"
				} 
				}else {
					str = "<tr><th>期数</th><th>类别</th>";
					for (i = 0; i < pl; i++) {
						str += "<th>" + m[0]['th'][i]['pname'] + "</th>"
					}
					str += "</tr>"
				}
				str += "<tr>";
				str += "<th colspan=2>不出期数</th>";

				for (j = 0; j < pl; j++) {
					if (m[0]['buzqishu'][j] == '0') qs = '';
					qs = m[0]['buzqishu'][j];
					str += "<td >" + qs + "</td>"
				}
				str += '</tr>';
				for (i = 0; i < ml; i++) {
					if (Number(m[i]['qishu']) != 0 & Number(m[i]['qishu']) % 10 == 0 & i > 1) {
						str += "<tr><td colspan='" + (pl + 3 + Number(m[0]['mnum'])) + "' style='height:2px;background:#f00'></td></tr>"
					}
					str += '<tr>';
					str += "<td class='qs'>" + m[i]['qishu'] + "</td>";
					str += "<td class='xm'>" + m[i]['ms'];
					if (m[i]['mi'] != '') str += "---" + m[i]['mi'];
					str += "</td>";
					for (j = 0; j < pl; j++) {
						str += "<td class='" + co[j % 4] + " nr'>" + m[i]['m'][j] + "</td>"
					}
					str += '</tr>'
				}

				$(".history").html(str);
				str = null;
				m = null;
				if (Number($(".page").val()) == 1) {
					$(".first").attr("disabled", true);
					$(".prev").attr("disabled", true);
					$(".next").attr("disabled", false)
				}
				if (Number($(".page").val()) > 1) {
					$(".first").attr("disabled", false);
					$(".prev").attr("disabled", false);
					$(".next").attr("disabled", false)
				}
				$(".history td").click(function() {
					if ($(this).hasClass('cz')) {
						var index = $(this).index();
						$(".history tr").find("td:eq(" + index + ")").removeClass('cz')
					} else {
						var index = $(this).index();
						$(".history tr").find("td:eq(" + index + ")").addClass('cz')
					}
				});
				if (pl > 50) {
					$(".history").removeClass('w1260');
					$(".history").removeClass('w1500');
					$(".history").addClass('w2000')
				} else if (pl > 30) {
					$(".history").removeClass('w1260');
					$(".history").removeClass('w2000');
					$(".history").addClass('w1500')
				} else {
					$(".history").removeClass('w2000');
					$(".history").removeClass('w1500');
					$(".history").addClass('w1260')
				}
			}
		})
	}
}
function gets() {
	var gid = $(".game").val();
	var bid = $(".bid").val();
	var bname = $(".bid option:selected").text();
	if (bid == 'longsm' | bname == '2字和数' | bname == '跨度' | bname == '其他' ) {
		$(".sid").empty();
		$(".cid").empty();
		query();
		return;
	} 
	$.ajax({
		type: 'POST',
		url: mulu + 'now.php',
		dataType: 'json',
		data: 'xtype=gets&bid=' + bid + "&gid=" + gid,
		cache: false,
		success: function(m) {
			var ml = m.length;
			$(".sid").empty();
			$(".cid").empty();
			for (i = 0; i < ml; i++) {
				str = "<option value='" + m[i]['sid'] + "'>" + m[i]['name'] + "</option>";
				$(".sid").append(str)
			}
			getc();
			str = null;
			m = null
		}
	})
}
function getc() {
	var gid = $(".game").val();
	var bid = $(".bid").val();
	var sid = $(".sid").val();

	$.ajax({
		type: 'POST',
		url: mulu + 'now.php',
		dataType: 'json',
		data: 'xtype=getc&bid=' + bid + "&sid=" + sid + "&gid=" + gid,
		cache: false,
		success: function(m) {
			var ml = m.length;
			$(".cid").empty();
			for (i = 0; i < ml; i++) {
				str = "<option value='" + m[i]['cid'] + "'>" + m[i]['name'] + "</option>";
				$(".cid").append(str)
			}
			str = null;
			m = null
		}
	})
}