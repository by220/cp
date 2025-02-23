function exe() {
	var je='';
    var i = 0,
    bname, sname, cname;
    play = [];
    if ($(".duo").length > 0) {
        var pname = $(".betlist.betlistactive-radio").parent().attr('mname');
        var bname = $(".menu option:selected").html();
        var aone = [];
        var atwo = [];
        var pone = [];
        var ptwo = [];
        var pid = $(".betlist.betlistactive-radio").parent().attr('pid');
        var znum = 0;
        if (bname == '2字组合' | bname == '2字定位' | pname == '选前二直选' | pname == '选二连直' | bname == '3字组合' | bname == '3字定位' | pname == '选前三直选' | pname == '选三前直') {

            var nl;
            ashree = [];
            if (bname == '2字定位' | bname == '2字组合' | bname == '3字定位' | bname == '3字组合') {
                nl = 10;
            } else if (pname == '选前二直选' | pname == '选前三直选') {
                nl = 11;
            } else if (pname == '选二连直' | pname == '选三前直') {
                nl = 20;
            }
            var i = 0;
            $(".duo.d1").each(function() {
                if ($(this).hasClass('betlistactive')) {
                    aone[i] = [];
                    aone[i]['n'] = $(this).attr('m');
                    aone[i]['p'] = [];
                    aone[i]['p'][0] = Number($(this).find(".peilv1").html());
                    if (bname == '2字组合') {
                        aone[i]['p'][1] = Number($(this).find(".peilv2").html());
                    }
                    if (bname == '3字组合') {
                        aone[i]['p'][1] = Number($(this).find(".peilv2").html());
                        aone[i]['p'][2] = Number($(this).find(".peilv3").html());
                    }
                    i++;
                }
            });
            i = 0;
            $(".duo.d2").each(function() {
                if ($(this).hasClass('betlistactive')) {
                    atwo[i] = [];
					var j;
                    if (pname == '选二连直' | bname == '2字组合' | bname == '3字组合') {
                        atwo[i]['n'] = $(this).attr('m');
						j =  $(this).attr('pid');
                        atwo[i]['p'] = [];
                        atwo[i]['p'][0] = Number($(".duo.d1.p"+j).find(".peilv1").html());
                        if (bname == '2字组合') {
                            atwo[i]['p'][1] = Number($(".duo.d1.p"+j).find(".peilv2").html());
                        }
                        if (bname == '3字组合') {
                            atwo[i]['p'][1] = Number($(".duo.d1.p"+j).find(".peilv2").html());
                            atwo[i]['p'][2] = Number($(".duo.d1.p"+j).find(".peilv3").html());
                        }
                    } else {
                        atwo[i]['n'] = $(this).attr('m');
                        atwo[i]['p'] = [];
                        atwo[i]['p'][0] = Number($(this).find(".peilv1").html());
                    }
                    i++;
                }
            });
            if (bname == '3字组合' | bname == '3字定位' | pname == '选前三直选' | pname == '选三前直') {
				i=0;
                $(".duo.d3").each(function() {
                    if ($(this).hasClass('betlistactive')) {
						var j;
                        if (bname == '3字组合') {
                            ashree[i] = [];
                            ashree[i]['n'] = $(this).attr('m');
							j = $(this).attr('pid');
                            ashree[i]['p'] = [];
                            ashree[i]['p'][0] = Number($(".duo.d1.p"+j).find(".peilv1").html());
                            if (bname == '3字组合') {
                                ashree[i]['p'][1] = Number($(".duo.d1.p"+j).find(".peilv2").html());
                                ashree[i]['p'][2] = Number($(".duo.d1.p"+j).find(".peilv3").html());
                            }
                        } else {
                            ashree[i] = [];
                            ashree[i]['n'] = $(this).attr('m');
                            ashree[i]['p'] = [];
                            ashree[i]['p'][0] = Number($(this).find(".peilv1").html());
                        }
                        i++;
                    }
                });
            }
            var aall = 0;
            if (bname == '2字定位' | bname == '2字组合' | pname == '选前二直选' | pname == '选二连直') {
                aall = Ctwo(aone, atwo, bname, pname);
            } else if (bname == '3字定位' | bname == '3字组合' | pname == '选前三直选' | pname == '选三前直') {
                aall = Cshree(aone, atwo, ashree, bname, pname);
            }
            var al = aall.length;
            if (al > 512) {
                alert("您选择的号码太多!");
                return false;
            }
            i = al;
            for (i = 0; i < al; i++) {
                play[i] = [];
                play[i]['pid'] = pid;
                play[i]['name'] = pname;
                play[i]['je'] = je;
                play[i]['con'] = aall[i]['n'].sort();
                play[i]['peilv1'] = aall[i]['p'];
            }
            aall = null;
            aone = null;
            atwo = null;
            ashree = null;
            pone = null;
            ptwo = null;
        } else {
            if (pname == '三中二') {
                znum = 3
            } else {
                znum = Number($(".betlist.betlistactive-radio").parent().attr("znum1"))
            }
            if ($(".duo.d1.betlistactive").length < znum) {
                alert("您选的项目不，最少选择" + znum + "个");
                return false;
            }
            $(".duo.d1.betlistactive").each(function(i) {
                var htm = $(this).attr("m");
                aone[i] = htm;
                pone[htm] = Number($(this).find(".peilv1").html());
                ptwo[htm] = Number($(this).find(".peilv2").html())
            });
            aone.sort(function(x, y) {
                return x - y
            });
            var aall = C(aone, znum);
            var al = aall.length;
            for (i = 0; i < al; i++) {
                play[i] = [];
                play[i]['classx'] = '';
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
            ptwo = null;
        }
    } else {
        pidarr = [];
        $(".betlist.betlistactive").each(function() {
            if ($.inArray($(this).attr('pid'), pidarr)==-1) {
                pidarr[i] = $(this).parent().attr('pid');
                play[i] = [];
                play[i]['pid'] = $(this).parent().attr('pid');
                play[i]['bid'] = $(this).parent().attr('bid');
                play[i]['je'] = je;
                play[i]['name'] = $(this).parent().attr('mname');
                sname = $(this).parent().attr('sname');
                cname = $(this).parent().attr('cname');
                bname = $(this).parent().attr('bname');
                play[i]['peilv1'] = $(this).find(".peilv1").html();
                if (sname == '1字组合' | sname == '跨度') {
                    play[i]['classx'] = cname + ":"
                } else if (bname == '总和龙虎' & !isNaN(play[i]['name'])) {
                    play[i]['classx'] = cname + ":"
                } else if (bname == '3字和数' & !isNaN(play[i]['name'])) {
                    play[i]['classx'] = sname + '-' + cname + ":"
                } else if (bname == '其他') {
                    play[i]['classx'] = sname + '-' + cname + ":"
                } else {
                    play[i]['classx'] = sname + ":"
                }
                play[i]['con'] = '';
                play[i]['bz'] = '';
                i++
            }
        });
/*        play.sort(function(x, y) {
            if (!isNaN(x['name']) & !isNaN(y['name'])) {
                return x['name'] - y['name']
            } else {
                return x['pid'] - y['pid']
            }
        })*/
    }
    var str = '';
    var i = play.length;
    
    for (j = 0; j < i; j++) {
		str += "<div class='ticket row textcenter darkred borderbtmred cg s" + play[j]['pid'] + " a"+j+"' i="+j+"><div class='padding10 clearfix'><div class='col-xs-4 valign4'>";
		if ($(".duo").length > 0) {
		    str += play[j]['name'] + ":" + play[j]['con'] ;
		}else{
			str += play[j]['classx'] + "" + play[j]['name'] ;
		}
		str += "</div><div class='col-xs-2 red valign2 peilv'>";
		 str += play[j]['peilv1'];
		if (play[j]['name'] == '三中二' | play[j]['name'] == '二中特') {
			str += "/" + play[j]['peilv2'];
		}
		str += "</div><div class='col-xs-6'><input type='number' min='1' name='amount' class='submitticketinput2 marginright10 jes'><div class='delticket inlineblock pull-right'><div class='zt' style='display:none;'></div><div class='item-deletebtn'></div></div></div></div></div>";
    }
	$(".ticketnum").html(i);

    $(".sendtb .nr").html(str);

    str = null;
    $(".sendtb input.jes").keyup(function(){
		$(this).val($(this).val().replace(/\D/g,''));
		sumje();
	}).keypress(function(){
		$(this).val($(this).val().replace(/\D/g,''));
		sumje();
	});
    if($.cookie("yusheje")!="" && $("input.yjctrl").prop("checked")){
        $(".sendtb input.jes").val($.cookie("yusheje"));
        sumje();
    }
    $(".sendtb .item-deletebtn").click(function(){
		var obj = $(this).parent().parent().parent().parent();
		var i =Number(obj.attr('i'));
		play[i]['sc'] =1 ;
	    obj.remove();
		sumje();
	});
    $("input.zje").focus();
	$(".sendtb .exe").show();
    $(".sendtb .exe").unbind("click");
    $(".sendtb .exe").click(function() {
        exenext()
    })
}
function sumje(){
   var je=0;
  $(".sendtb input.jes").each(function(){
      je += Number($(this).val());
  });
  $(".tickettotal").html(je);
}
function exenext() {
    var pl = play.length;
    var pid, je = 0,
    zje = 0,
    minje = 0,
    maxje = 0;
    for (i = 0; i < pl; i++) {
		if(play[i]['sc']==1) continue;
        pid = play[i]['pid'];
        je = $(".sendtb .a" + i).find("input.jes").val();
        zje += Number(je);
		if ($(".duo").length == 1) {
           minje = Number($(".betlist.betlistactive-radio").parent().attr("minje"));
           maxje = Number($(".betlist.betlistactive-radio").parent().attr("maxje"));
		}else{
           minje = Number($(".p" + pid).attr("minje"));
           maxje = Number($(".p" + pid).attr("maxje"));
		}
        if (je > maxje) {
            alert("[" + play[i]['classx'] + play[i]['name'] + "]单注最大金额" + maxje);
            return false
        }
        if (je < minje) {
            alert("[" + play[i]['classx'] + play[i]['name'] + "]单注最小金额" + minje);
            return false
        }
        play[i]['je'] = je;
    }
    if(zje<1){
	   alert("请输入金额!");
	   return false;
	}
	var money=0;
	if(fudong==1){
		money=$(".fedu .fmoney").html();
	}else{
	if(fast==0){
		money=$(".dedu .money").html();
	}else{
		money=$(".kedu .kmoney").html();
	}
	}
    if (zje > Number(money)) {
        alert("余额不足!");
        return false
    }

    $(".sendtb .exe").attr("disabled", true);
    var pstr = '[';
    for (i = 0; i < play.length; i++) {
        if (i != 0) pstr += ',';
        pstr += json_encode_js(play[i])
    }
    pstr += ']';

    var abcd = $("select.abcd").val();
    var ab = $("select.ab").val();
    $.ajax({
        type: 'POST',
        url: 'makelib.php',
        data: 'xtype=make&pstr=' + pstr + "&abcd=" + abcd + "&ab=" + ab,
        dataType: 'json',
        cache: false,
        async: false,
        success: function(m) {
		//alert(m);return;
            var ml = m.length;
            var gflag = false;
            var bflag = false;
            var errstr = "";
            var obj;
            for (i = 0; i < ml; i++) {
				if(m[i]['sc']==1) continue;
                obj = $(".sendtb .a" + i);
                if (Number(m[i]['cg']) == 1) {
                    if (Number(m[i]['cgs']) == 1) {
                        obj.find(".zt").html("赔率改动!");
                        obj.find(".zt").css("color","red");
                    } else {
                        obj.find(".zt").html("成功!");
                        obj.find(".zt").css("color","green");
                    }
					if(Number(m[i]['peilv2'])>1){
					   obj.find(".peilv").html(m[i]['peilv1']+'/'+m[i]['peilv2']);
					}else{
					   obj.find(".peilv").html(m[i]['peilv1']);
					}
                    obj.find("input.jes").replaceWith(m[i]['je'])
                } else {
                    obj.find(".zt").html(m[i]['err']);
                    obj.find(".zt").css("color","red");
                }
            }
			$(".sendtb .item-deletebtn").hide();
			$(".sendtb .zt").show();
            $(".sendtb .exe").attr("disabled", false);
			$(".sendtb .exe").hide();
			$(".cancel").click();
            play = new Array();
            getusermoney()
        }
    })
}
var pidduo = 999;
function lib() {
    var bid = $(".menu").val();
    var bname = $(".menu option:selected").html();
	if(bname=='特碼' | bname.substr(2,1)=='特'){
	   $("select.ab").show();
	   $("select.ab option:eq(0)").html(bname+"A");
	   $("select.ab option:eq(1)").html(bname+"B");
	   $(".abcdab .xd").hide();
	}else{
	   $("select.ab").hide();
	   $(".abcdab .xd").show();
	}
	$("#bet_panel").css("height",$(window).height()-232);
    console.log(123);
    if (bname == '合肖' | bname == '連碼' | bname == '不中' | bname == '生肖連' | bname == '尾數連' | bname == '2字组合' | bname == '2字定位' | bname == '3字组合' | bname == '3字定位' | bname == '组选3' | bname == '组选6' | bname == '连码' | bname == '任选牛牛') {
        libs('d2')
    } else if (bname == '主盘势') {
        libs('sm')
    } else if (bname == '排名1~10') {
		libs('110')
	} else if (bname == '1~5球号') {
		libs('105')
	} else if (bname == '1~8球号') {
		libs('108')
	} else if (bname == '正特1~6') {
        libs('1-6')
    } else if (bname == '正码' | bname == '单码') {
        libs('a')
    } else if (fenlei == 107 | fenlei == 103 | fenlei == 121) {
        libs('a')
    } else if (bname == '总和龙虎') {
        libs('a')
    } else if (fenlei == 100) {
        if (bname == "過關" | bname == "过关") {
            alert("过关请用电脑投注！");
            return false
        }
        libs('d')
    } else {
        libs('b');
    }

	
}
function rhtml(arr){
    var str="<div class='col-xs-4 col-sm-3 p"+arr['pid']+"'  bid='" + arr['bid'] + "' pid='" + arr['pid'] + "' sname='" + arr['sname'] +"' cname='" + arr['cname'] +"' mname='" + arr['name'] + "' maxje='" + arr['maxje'] + "' minje='" + arr['minje'] + "'><div class='betlist borderpink'><h1 title='"+arr['name']+"' class='name'>"+qiu(arr['name'])+"</h1><p class='odds peilv1'>"+rpeilv(arr['peilv1'],arr['ifok'])+"</p><div class='betarrow borderpink' ><i class='fa fa-check'></i></div></div></div>";
	return str;
}
function rhtmls(name){
	
  var cc = "T"+fenlei+" ball";
  if(fenlei==163 & name=='总和数'){
	   cc="T163Z";
  }
  if(name=='冠亚和') cc='';
  return "<div class='row pls "+cc+"'><div class='col-xs-12 padding10 bgpink borderpink marginbtm10'><div class='text-center'><div class='pull-left '><div class='toggleonoff mobilemenubtn2 gradientpink'>隐藏 <span><i class='fa fa-minus-square'></i></span></div></div><span class='rowtitle white vcenter'>"+name+"</span><div class='pull-right'><div class='submitticket mobilemenubtn2 gradientred xd'>下单 <i class='fa fa-arrow-circle-down'></i></div></div></div></div><div class='bet_content'>";
}
function rhtmllm(arr,bname){
	var css ;
	if(bname=='2字组合' | bname=='3字组合' | bname=='组选3'  | bname=='组选6') css = "style='height:60px;'"; 
	else css = " style='height:40px' ";
    var str="<div class='col-xs-4 col-sm-3 p"+arr['pid']+"'  pid='" + arr['pid'] + "' sname='" + arr['sname'] +"' cname='" + arr['cname'] +"' mname='" + arr['name'] + "' maxje='" + arr['maxje'] + "' minje='" + arr['minje'] + "' znum1='" + arr['znum1'] + "' ifok='" + arr['ifok'] + "'><div class='betlist borderpink' "+css+"><h1 title='"+arr['name']+"' class='name'>"+qiu(arr['name'])+"</h1><div class='betarrow-radio borderpink'><i class='fa fa-dot-circle-o'></i></div></div></div>";
	return str;
}
function rhtmllmselected(arr,bname){
	var css ;
	if(bname=='2字组合' | bname=='3字组合' | bname=='组选3'  | bname=='组选6') css = "style='height:60px;'"; 
	else css = " style='height:40px' ";
    var str="<div class='col-xs-4 col-sm-3 p"+arr['pid']+"'  pid='" + arr['pid'] + "' sname='" + arr['sname'] +"' cname='" + arr['cname'] +"' mname='" + arr['name'] + "' maxje='" + arr['maxje'] + "' minje='" + arr['minje'] + "' znum1='" + arr['znum1'] + "' ifok='" + arr['ifok'] + "'><div class='betlist borderpink betlistactive-radio' "+css+"><h1 title='"+arr['name']+"' class='name'>"+qiu(arr['name'])+"</h1><div class='betarrow-radio borderpink' style='display:block;'><i class='fa fa-dot-circle-o'></i></div></div></div>";
	return str;
}
function rhtmlslm(name){
	
  var cc = "T"+fenlei+" ball";
  return "<div class='row pls "+cc+"'><div class='bet_content'>";
}
function rhtmllmhm(name,peilv,i,p){
	var css='';
	if (p==2) css = " style='height:110px;' ";
	else if (p==3) css = " style='height:145px' ";
    var str="<div class='col-xs-4 col-sm-3' ><div class='betlist borderpink duo d1 p"+i+"' "+css+"  pid='" + i + "' m='"+name+"'><h1 class='name'  >"+qiu(name)+"</h1>";
	str += "<p class='odds peilv1'>"+peilv[0]+"</p>";
    if(p>1) str += "<p class='odds peilv2'>"+peilv[1]+"</p>";
	if(p>2) str += "<p class='odds peilv3'>"+peilv[2]+"</p>";
	str += "<div class='betarrow borderpink' ><i class='fa fa-check'></i></div></div></div>";
	return str;
}
function rhtmllmhm2(name,i){
    var str="<div class='col-xs-4 col-sm-3'  ><div class='betlist borderpink duo d2 p"+i+"' pid='" + i + "' m='"+name+"' style='height:45px;'><h1 class='name'>"+qiu(name)+"</h1>";
	str += "<div class='betarrow borderpink' ><i class='fa fa-check'></i></div></div></div>";
	return str;
}
function rhtmlslmhm(name){
   var cc = " T"+fenlei+" ball";	
   return "<div class='row pls "+cc+"'><div class='col-xs-12 padding10 bgpink borderpink marginbtm10'><div class='text-center'><span class='rowtitle white vcenter'>"+name+"</span></div></div><div class='bet_content'>";
}
function libs(stype) {
    console.log(stype)
    var ab = $(".ab").val();
    var bid = $(".menu").val();
    var abcd = $(".abcd").val();
    var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab;
    var bname = $(".menu option:selected").html();
	$(".make .pls").remove();
    console.log('xtype=lib&stype=' + stype + sstr + "&pid=" + pidduo)
    $.ajax({
        type: 'POST',
        url: 'make.php',
        dataType: 'json',
        cache: false,
        async: false,
        data: 'xtype=lib&stype=' + stype + sstr + "&pid=" + pidduo,
        success: function(m) {
			//alert(m);return;
            var ml = m.length;
			var str = '',str1='',str2='',strc='';
			var tmpsid=0,tmpcid=0;
			var i=0,j=0,k=0,l=0;
			var key=[];
			var duo=0;
           if (bname == "主盘势") {
                if (fenlei == 107) {
                    str += rhtmls("冠、亚军和");
                    for (i = 16; i <= 19; i++) {
                        str += rhtml(m[i]);
                    }
                    str += "</div></div>";
					for (i = 0; i <ml; i++) {
						if(i>=16 & i<=19) continue;
						if(m[i]['name']=='质' | m[i]['name']=='合') continue;
						if(tmpsid!=m[i]['sid']){
						   if(tmpsid!=0) str += "</div></div>";	
						   str += rhtmls(m[i]['sname']);
						}
						str += rhtml(m[i]);
						tmpsid = m[i]['sid'];
					}
					str += "</div></div>";	
                } else if(fenlei==101) {
					for (i = 0; i <ml; i++) {
						if(m[i]['bid']!=23378763) continue;
						if(j==0){
						   str += rhtmls(m[i]['bname']);
						}
						str += rhtml(m[i]);
						j++;
					}
					str += "</div></div>";	
					str1= str;
					str='';
					for (i = 0; i <ml; i++) {
						if(m[i]['bid']==23378763 | m[i]['bid']==23378767) continue;
						if(tmpsid!=m[i]['sid']){
						   if(tmpsid!=0) str += "</div></div>";	
						   str += rhtmls(m[i]['sname']);
						}
						str += rhtml(m[i]);
						tmpsid = m[i]['sid'];
					}
					str += "</div></div>";	
					str2= str;
					str='';
					for (i = 0; i <ml; i++) {
						if(m[i]['bid']!=23378767) continue;
						if(tmpsid!=m[i]['sid']){
						   if(tmpsid!=0) str += "</div></div>";	
						   str += rhtmls(m[i]['sname']);
						}
						str += rhtml(m[i]);
						tmpsid = m[i]['sid'];
					}
					str = str1 + str2 + str;
                } else if(fenlei==163) {
					key = [12,13,14,15,16,17,18,19,20,21,22,23,36,37,38];
					var ck = key.length;
					str = rhtmls("总和-龙虎和");
					for (j = 0; j <ck; j++) {
						i = key[j];
						str += rhtml(m[i]);
					}
					str += "</div></div>";				
					str1= str;
					str='';
					str = rhtmls("总和数");
					for (i = 0; i <ml; i++) {
						if(i<39) continue;
						str += rhtml(m[i]);
					}
					str += "</div></div>";	
					str2= str;
					str='';
					
					for (i = 0; i <ml; i++) {
						if(m[i]['bid']!=23378856) continue;
						if(tmpsid!=m[i]['sid']){
						   if(tmpsid!=0) str += "</div></div>";	
						   str += rhtmls(m[i]['sname']);
						}
						str += rhtml(m[i]);
						tmpsid = m[i]['sid'];
					}
					str += "</div></div>";	
					str = str1 + str2 + str;
                }else  if (fenlei == 103 | fenlei==121) {
					var zhbid = 23378782;
					if (fenlei==121) zhbid = 23378797;
                    str += rhtmls("总和");
                    for (i = 0; i < ml; i++) {
						if(m[i]['bid']!=zhbid) continue;
                        str += rhtml(m[i]);
                    }
                    str += "</div></div>";
					for (i = 0; i <ml; i++) {
						if(m[i]['bid']==zhbid) continue;
						if(tmpsid!=m[i]['sid']){
						   if(tmpsid!=0) str += "</div></div>";	
						   str += rhtmls(m[i]['sname']);
						}
						str += rhtml(m[i]);
						tmpsid = m[i]['sid'];
					}
					str += "</div></div>";	
				}else {
					for (i = 0; i <ml; i++) {
						if(tmpsid!=m[i]['sid']){
						   if(tmpsid!=0) str += "</div></div>";	
						   str += rhtmls(m[i]['sname']);
						}
						str += rhtml(m[i]);
						tmpsid = m[i]['sid'];
					}
					str += "</div></div>";	
                }
            }else if(bname.indexOf("第")!=-1 & bname.indexOf("球")!=-1 | bname=='冠亚和' | bname=='特碼' | bname=='正碼' | bname=='正1特' | bname=='正2特' | bname=='正3特' | bname=='正4特' | bname=='正5特' | bname=='正6特'){
			        str += rhtmls(m[0]['sname']);
					for (i = 0; i <ml; i++) {
						if(isNaN(m[i]['name'])) continue;
						str += rhtml(m[i]);
					}
					str += "</div></div>";	
			        str += rhtmls("两面");
					for (i = 0; i <ml; i++) {
						if(!isNaN(m[i]['name'])) continue;
						str += rhtml(m[i]);
					}
					str += "</div></div>";	
			}else if(bname=='排名1~10' | bname=='1~5球号' | bname=='1~8球号' | bname=='正码' | bname=='特碼' | bname=='正碼'){
			
					for (i = 0; i <ml; i++) {
						if(isNaN(m[i]['name'])) continue;
						if(tmpsid!=m[i]['sid']){
						   if(tmpsid!=0) str += "</div></div>";	
						   str += rhtmls(m[i]['sname']);
						}
						str += rhtml(m[i]);
						tmpsid = m[i]['sid'];
					}
					str += "</div></div>";	
			}else if(bname=='1~5' | bname=='1~3' | bname=='跨度' | bname=='其他' | bname=='牛牛梭哈'  | bname=='2字和数' | bname=='正特1~6'  | bname=='特肖'  | bname=='一肖'  | bname=='尾数' | bname=='尾數' | bname=='半波'  | bname=='五行'){
					for (i = 0; i <ml; i++) {
						if(m[i]['name']=='质' | m[i]['name']=='合') continue;
						if(tmpsid!=m[i]['sid']){
						   if(tmpsid!=0) str += "</div></div>";	
						   if(bname=='跨度') str += rhtmls(m[i]['sname']+'跨度');
						   else str += rhtmls(m[i]['sname']); 
						}
						str += rhtml(m[i]);
						tmpsid = m[i]['sid'];
					}
					str += "</div></div>";	
			}else if(bname=='总和龙虎'){			
			        str += rhtmls("两面");
					for (i = 0; i <ml; i++) {
						if(!isNaN(m[i]['name']) | m[i]['name'].indexOf('质')!=-1 | m[i]['name'].indexOf('合')!=-1) continue;
						str += rhtml(m[i]);
					}
					str += "</div></div>";	
			        str += rhtmls("和尾数");
					for (i = 0; i <ml; i++) {
						if(m[i]['cname'].indexOf('尾数')==-1) continue;
						str += rhtml(m[i]);
					}
					str += "</div></div>";	
			}else if(bname=='番摊' || bname=='特头尾'  | bname=='正肖' | bname=='总肖七色波' ){         
                for (i = 0; i <ml; i++) {
                    
                        if(tmpcid!=m[i]['cid']){
                            if(tmpcid!=0) str += "</div></div>";    
                            str += rhtmls(m[i]['cname']);
                        }
                    
                    str += rhtml(m[i]);
                    tmpcid=m[i]['cid'];
                    k = isNaN(m[i]['name']);
                }        
                str += "</div></div>";  
            }else if(bname=='3字和数'){
				for (i = 0; i <ml; i++) {
					if(isNaN(m[i]['name'])){
						if(tmpsid!=m[i]['sid']){
							if(tmpsid!=0) str += "</div></div>";	
						    str += rhtmls(m[i]['sname']+"-两面");
						}else{
					       str += "</div></div>";
						   str += rhtmls(m[i]['sname']+"-尾数");
						}
					}
					str += rhtml(m[i]);
					tmpsid=m[i]['sid'];
					k = isNaN(m[i]['name']);
				}			
				str += "</div></div>";	
			}else if(bname=='1字组合'){			
					for (i = 0; i <ml; i++) {
						if(tmpcid!=m[i]['cid']){
						   if(tmpcid!=0) str += "</div></div>";	
						   str += rhtmls(m[i]['cname']);
						}
						str += rhtml(m[i]);
						tmpcid = m[i]['cid'];
					}
					str += "</div></div>";	
			}else  if (bname == '合肖' | bname == '連碼' | bname == '不中' | bname == '生肖連' | bname == '尾數連' | bname == '2字组合' | bname == '2字定位' | bname == '3字组合' | bname == '3字定位' | bname == '组选3' | bname == '组选6' | bname == '连码'  | bname == '任选牛牛'){			
					str += rhtmlslm(bname);
					var pnamea,znums;
					for (i = 0; i <ml; i++) {						
                        if (m[0]['pidduo'] == m[i]['pid']) {
                           pnamea = m[i]['name'];
                           znums = Number(m[i]['znum1']);
						   str += rhtmllmselected(m[i],bname);
                        }else{
					      str += rhtmllm(m[i],bname);
						}
					}
					str += "</div></div>";	
		

       
                if (bname == '3字定位') {
                    var pnames = pnamea.substr(0, 2);
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
        
                var i;
                var str1 = '';
                var str2 = '';
                var cd = m[0]['duo'][0].length;
                var j = 1;
				var peilv=[];
                for (i = 0; i < cd; i++) {
                    if (bname == '2字定位') {
                        if (i == 0) {
                            str1 += rhtmlslmhm("选择" + pnamea.substr(0, 1) + "位(多选自动组合)");
                            j = 1
                        } else if (i == 10) {
							str1 += "</div></div>";
                            str1 +=rhtmlslmhm("选择" + pnamea.substr(1, 1) + "位");
                            j = 2
                        }
                    }
                    if (bname == '3字定位') {
                        if (i == 0) {
                            str1 += rhtmlslmhm("选择" + pnames.substr(0, 1) + "位");
                            j = 1
                        } else if (i == 10) {
							str1 += "</div></div>";
                            str1 += rhtmlslmhm("选择" + pnames.substr(1, 1) + "位");
                            j = 2
                        } else if (i == 20) {
							str1 += "</div></div>";
                            str1 += rhtmlslmhm("选择" + pnames.substr(2, 1) + "位");
                            j = 3
                        }
                    }
                    if (pnamea == '选前二直选') {
                        if (i == 0) {
                            str1 += rhtmlslmhm("选择第1球(多选自动组合)");
                            j = 1
                        } else if (i == 11) {
							str1 += "</div></div>";
                            str1 += rhtmlslmhm("选择第2球");
                            j = 2
                        }
                    }
                    if (pnamea == '选前三直选') {
                        if (i == 0) {
                            str1 += rhtmlslmhm("选择第1球(多选自动组合)");
                            j = 1
                        } else if (i == 11) {
							str1 += "</div></div>";
                            str1 += rhtmlslmhm("选择第2球");
                            j = 2
                        } else if (i == 22) {
							str1 += "</div></div>";
                            str1 += rhtmlslmhm("选择第3球");
                            j = 3
                        }
                    }
                    if (pnamea == '选三前直') {
                        if (i == 0) {
                            str1 += rhtmlslmhm("选择第1球(多选自动组合)");
                            j = 1
                        } else if (i == 20) {
							str1 += "</div></div>";
                            str1 += rhtmlslmhm("选择第2球");
                            j = 2
                        } else if (i == 40) {
							str1 += "</div></div>";
                            str1 += rhtmlslmhm("选择第3球");
                            j = 3
                        }
                    }
					str2 += rhtmllmhm2(m[0]['duo'][0][i],m[0]['duo'][0][i]);
					
                    peilv[0] = rpeilv(m[0]['duo'][1][i], m[0]['ifok']);
                    var p=1;
                    if (bname == '2字组合' | bname == '三中二' | bname == '二中特') {
                         p=2;
						 peilv[1] = rpeilv(m[0]['duo'][2][i], m[0]['ifok']);
                    }
                    if (bname == '3字组合') {
                         p=3;
						 peilv[1] = rpeilv(m[0]['duo'][2][i], m[0]['ifok']);
						 peilv[2] = rpeilv(m[0]['duo'][3][i], m[0]['ifok']);
                    }
					if(j==2){
					    str1 += rhtmllmhm(m[0]['duo'][0][i],peilv,m[0]['duo'][0][i],p).replace(/d1/g, 'd2');
					}else if(j==3){
					    str1 += rhtmllmhm(m[0]['duo'][0][i],peilv,m[0]['duo'][0][i],p).replace(/d1/g, 'd3');
					}else{
					    str1 += rhtmllmhm(m[0]['duo'][0][i],peilv,m[0]['duo'][0][i],p);  
					}
					
                    
				}
				
                if (bname == '2字组合') {
                    str += rhtmlslmhm("第1个投注号码");
                    str += str1;
					str += "</div></div>";
                    str += rhtmlslmhm("第2个投注号码");
                    str += str2;
                    str += "</div></div>";
                } else if (bname == '3字组合') {
                    str += rhtmlslmhm("第1个投注号码");
                    str += str1;
					str += "</div></div>";
                    str += rhtmlslmhm("第2个投注号码");
                    str += str2;
					str += "</div></div>";
                    str += rhtmlslmhm("第3个投注号码");
                    str += str2.replace(/d2/g, 'd3');
                    str += "</div></div>";
                } else if (pnamea == '选二连直') {
                    str += rhtmlslmhm("第1球");
                    str += str1;
					str += "</div></div>";
                    str += rhtmlslmhm("第2球");
                    str += str2;
                    str += "</div></div>";
                } else if (pnamea == '选三前直' | pnamea == '选前三直选'  | pnamea == '选前二直选'  | pnamea == '3字定位' | pnamea == '2字定位') {
                    str += str1;
                    str += "</div></div>";
                } else {
					str += rhtmlslmhm("号码选择");
                    str += str1;
                    str += "</div></div>";
                }
			}
            $(".make .abcdab").after(str);
			
			$(".ball h1.name span").addClass("resultitem");
            tu = m[0]['tu'];
            $(".tuid").val(m[0]['t']);
            //tus();
            str = null;
			str1 = null;
			str2 = null;
            m = null;
            addfunc()
        }
    })
}
function rpeilv(peilv, ifok) {
    if (Number(ifok) != 1) return '-';
    else return peilv
}
var tu;
function tuk(arr) {
    var tmp = '';
    var str = '';
    var c = 0;
    var str1 = '';
    for (var j in arr) {
        if (tmp != arr[j]) {
            if (c > 0) str1 += "</dd>";
            str = str1 + str;
            if (c % 2 == 0) str1 = "<dd class='red'>";
            else str1 = "<dd>";
            c++
        }
        str1 += arr[j] + "<BR />";
        tmp = arr[j];
        if (c == 10) break
    }
    str = str1 + "</dd>" + str;
    return str
}
function tus() {
    var tl = tu.length;
    $(".paihang-nav").empty();
    $(".paihang").empty();
    if (tl == 0) {
        $(".paihang").hide();
        $(".paihang-nav").hide();
        return
    }
    $(".paihang").show();
    $(".paihang-nav").show();
    var str = '';
    for (var i in tu) {
        $(".paihang-nav").append("<option value='" + i + "'>" + i + "</span>")
    }
    $(".paihang-nav").unbind("change");
    $(".paihang-nav").change(function() {
        $(".paihang").html(tuk(tu[$(this).val()]))
    });
    $(".paihang-nav").change()
}
function longfunc() {
    var sqishu = $(".longltb .trhm:first").attr('qs');
    var skj = '';
    var str = '';
    if (Number(sqishu) > 10000000) {
        sqishu = sqishu.substr(4)
    }
    $(".preqishu").html(sqishu);
    if (ngid == 107) {
        $(".longltb .trhm:first").find("td").each(function(i) {
            if (i > 0) {
                skj += $(this).html()
            }
        });
        $(".kjhm").html(skj);
        $(".kjhm img").removeClass('imgsmall');
        $(".kjhm").attr("m1", $(".longltb .trhm:first").find("td:eq(1)").attr('m1'))
    } else {
        skj = [];
        if (ngid == 161 | ngid == 162) {
            for (i = 1; i < 20; i++) {
                skj[i - 1] = $(".trhm td:eq(1)").attr('m' + i)
            }
            $(".kjhm").attr("m1", $(".longltb .trhm:first").find("td:eq(1)").attr('m1'))
        } else if (ngid == 151 | ngid == 152 | ngid==153 | ngid==155  | ngid==157) {
            $(".longr .trhm:first").find("td").each(function(i) {
                if (i > 0) {
                    skj[i - 1] = $(this).html()
                }
            });
            $(".kjhm").attr("m1", $(".longltb .trhm:first").find("td:eq(1)").attr('m1'))
        } else {
            $(".longltb .trhm:first").find("td span").each(function(i) {
                if (ngid==163 | ngid==116 | ngid==117 | ngid==118 | ngid==119) {
                    if (i < 4) skj[i] = $(this).html()
                } else {
                    skj[i] = $(this).html()
                }
            });
            $(".kjhm").attr("m1", skj[0])
        }
        var sl = skj.length;
        for (i = 0; i < sl; i++) {
            if (skj[i] == undefined) skj[i] = '';
            str += qiu(skj[i], i)
        }
        $(".kjhm").html(str);
        $(".kjhm img").removeClass('imgsmall')
    }
    $(".longfs").unbind('change');
    $(".longfs").change(function() {
        if ($(this).val() == '1') {
            $("dd.buz").show();
            $("dd.zz").hide()
        } else {
            $("dd.buz").hide();
            $("dd.zz").show()
        }
    });
    $(".kjbt .tem").unbind('click');
    $(".kjbt .tem").click(function() {
        $(".longltb tr").each(function() {
            if (!$(this).hasClass('bt')) $(this).hide()
        });
        $(".tem").removeClass('click');
        $(this).addClass('click');
        var val = $(this).val();
        switch (val) {
        case '号码':
            $(".longltb .trhm").show();
            break;
        case '单双':
            $(".longltb .trds").show();
            break;
        case '大小':
            $(".longltb .trdx").show();
            break;
        case '质合':
            $(".longltb .trzh").show();
            break;
        case '合单双':
            $(".longltb .trhds").show();
            break;
        case '尾大小':
            $(".longltb .trwdx").show();
            break;
        case '方位':
            $(".longltb .trfw").show();
            break;
        case '五行':
            $(".longltb .trwh").show();
            break;
        case '四季':
            $(".longltb .trsj").show();
            break;
        case '中发白':
            $(".longltb .trzfb").show();
            break
        }
    });
    $(".longltb td").each(function(i) {
        var val = $(this).html();
        switch (val) {
        case '19':
            $(this).addClass('red');
            break;
        case '20':
            $(this).addClass('red');
            break;
        case '前':
            $(this).addClass('red');
            break;
        case '后':
            $(this).addClass('lv');
            break;
        case '单':
            $(this).addClass('red');
            break;
        case '双':
            $(this).addClass('lv');
            break;
        case '大':
            $(this).addClass('red');
            break;
        case '小':
            $(this).addClass('lv');
            break;
        case '合单':
            $(this).addClass('red');
            break;
        case '合双':
            $(this).addClass('lv');
            break;
        case '质':
            $(this).addClass('red');
            break;
        case '合':
            $(this).addClass('lv');
            break;
        case '尾大':
            $(this).addClass('red');
            break;
        case '尾小':
            $(this).addClass('lv');
            break;
        case '东':
            $(this).addClass('red');
            break;
        case '南':
            $(this).addClass('lv');
            break;
        case '西':
            $(this).addClass('blue');
            break;
        case '北':
            $(this).addClass('orange');
            break;
        case '春':
            $(this).addClass('red');
            break;
        case '夏':
            $(this).addClass('lv');
            break;
        case '秋':
            $(this).addClass('blue');
            break;
        case '冬':
            $(this).addClass('orange');
            break;
        case '中':
            $(this).addClass('red');
            break;
        case '发':
            $(this).addClass('lv');
            break;
        case '白':
            $(this).addClass('blue');
            break;
        case '金':
            $(this).addClass('red');
            break;
        case '木':
            $(this).addClass('lv');
            break;
        case '水':
            $(this).addClass('blue');
            break;
        case '火':
            $(this).addClass('orange');
            break;
        case '土':
            $(this).addClass('zi');
            break
        }
    })
}

function getsx(m){
   arr = ["鼠","牛","虎","兔","龍","蛇","馬","羊","猴","雞","狗","豬"];
   for(var i in arr){
   if($.inArray(m,sma[arr[i]])){
       return  arr[i];
   }
   }

}
function updatel() {
    clearTimeout(upl);
    var tustr = "";
	var obj = $("#result_info");
	var objb = $("#result_balls");
    var m1 = obj.find("span:eq(0)").find("b").html();
	var qs = obj.find("strong").attr('v');
    if (m1 == 'undefind' | m1 == undefined) m1 = '';

    $.ajax({
        type: 'POST',
        url: 'make.php',
        cache: false,
        dataType: "json",
        data: "xtype=upl&qishu=" + $(".preqishu").html() + "&m1=" + m1 + "&tu=" + tustr,
        success: function(m) {
			getusermoney();
            if (m[0] != 'A') {
				obj.find("strong").html(m[5].replace(m[7],''));
				obj.find("strong").attr('v',m[5])
				var ml = m[4].length;
				var str="";
				var sum=0;
				for(i=0;i<ml;i++){
				   if(fenlei==107) 	m[4][i] = Number(m[4][i]);
				   if(fenlei==100 & i==ml-1) str += "<span><b  class='plus'>+</b></span>";
				   if(fenlei==163){
				     if(m[4][i]!='' ){
						 str += "<span><b class='b"+m[4][i]+"'>"+m[4][i]+"</b>";
						 if(i==ml-1) str += "<i style='margin:-25px 0px 0px 40px'>=</i>";
						 else str += "<i style='margin:-25px 0px 0px 40px'>+</i>";
						 str += "</span>";
						 sum += Number(m[4][i]);
					 }
				   }else  if(fenlei==100){
				       if(m[4][i]!='' )str += "<span><b class='b"+m[4][i]+"'>"+m[4][i]+"</b></span>";
				   }else{
					 if(m[4][i]!='' )str += "<span><b class='b"+m[4][i]+"'>"+m[4][i]+"</b></span>";
				   }
				}
				if(fenlei==163){
					if(str!='') str += "<span><b class='bg b_"+sum+"'>"+sum+"</b></span>";
				}
				   objb.html(str);
				   objb.attr("class","T"+fenlei);
				  
               $(".clong").html(m[1]);
                if (tustr != '') {
                    tu = m['tu'];
                    tus()
                } 
				
            }
        }
    });
    upl = setTimeout(updatel, 8000)
}
$(function() {
    $(".fastgtb .fastv").click(function() {
        var vname = $(this).val();
        var bname = $(".main a.click").html();
        $(".make input:text").removeClass('byellow');
        if (isNaN(vname)) {
            $(".make td.p").each(function() {
                var pid = $(this).attr('pid');
                var name = $(this).attr('mname');
                if (in_array(name, sma[vname])) {
                    $(".i" + pid).find("input:text").addClass('byellow')
                }
            })
        } else {
            $(".make td.p").each(function() {
                var pid = $(this).attr('pid');
                var name = $(this).attr('mname');
                if (name == vname) {
                    $(".i" + pid).find("input:text").addClass('byellow')
                }
            })
        }
    })
});