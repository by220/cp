var gatt, time0, time1, settime0, settime1, timek, settimek, gntime = 3,setgntime, upl, fastobj,tu,gnews;

function myready() {

	$(document).keydown(function(event){ 
	      if(event.keyCode == 13){ 
		  if($(".sendtb:visible",parent.document).length==1){
			     if($(".sendtb .qr:visible",parent.document).length==1){
					 $(".sendtb .qr",parent.document).click();
				 }else if($(".sendtb:visible",parent.document).find("button:enabled").length>0){
				     $(".sendtb:visible",parent.document).find("button.close").click();
				 }
			 }else{
		var fje=false;

		$(".lists input:text").each(function(){
			var val= $(this).val();
		    if(!isNaN(val) & val%1==0 & val!=0 & val!=''){
			   fje=true;
			}
		});
		if(fje){
		    exe();
			return false;
		}
		  }
		  }
	});
	if(fudong==1){
		$(".fedu",parent.document).show();
	    $(".kedu",parent.document).hide();
		$(".dedu",parent.document).hide();
	}else{
	
	/*if(fast==0){
		$(".fedu",parent.document).hide();
	    $(".kedu",parent.document).hide();
		$(".dedu",parent.document).show();
	}else{*/
		$(".fedu",parent.document).hide();
	    $(".kedu",parent.document).show();
		$(".dedu",parent.document).hide();
	//}
	}
	$(".lists input:text").each(function(){
		 console.log(11);
		});
	
	$(".zje").keyup(function() {
	    console.log(1);
	   // console.log($(".lists input:text").length);
		$(this).val($(this).val().replace(/\D/g,''));
		var val = $(this).val()
		$(".zje").val(val);
		$(".lists td.select").find("input:text").val(val);
		$(".ftdiv.selected").find("input:text").val(val);
		$.cookie('yusheje',val);
		$(".lists input:text").each(function(){
			if($(this).parent().hasClass("selected")){
				 $(this).val(val);
			}
		});
	}).keypress(function() {
	   // console.log($(".lists input:text").length);
		$(this).val($(this).val().replace(/\D/g,''));
		var val = $(this).val()
		$(".zje").val(val);
		$(".lists td.select").find("input:text").val(val);
		$(".ftdiv.selected").find("input:text").val(val);
		$.cookie('yusheje',val);
		$(".lists input:text").each(function(){
			if($(this).parent().hasClass("selected")){
				 $(this).val(val);
			}
		});
		
	}).blur(function(){
	    
	   
	   // console.log($(".ba").length);
		$(this).val($(this).val().replace(/\D/g,''));
		var val = $(this).val()
		$(".zje").val(val);
		$(".lists td.select").find("input:text").val(val);
		$(".ftdiv.selected").find("input:text").val(val);
		$.cookie('yusheje',val);
		$(".lists input:text").each(function(){
			if($(this).parent().hasClass("selected")){
				 $(this).val(val);
			}
		});
	});

	$("div.control input:checkbox").click(function(){
		 if($(this).prop("checked")){
		    $.cookie('yushe',1);
		    $.cookie('yusheje',$("div.control input:text:eq(0)").val());
		 }else{
		    $.cookie('yushe',0);
             $.cookie('yusheje','');
		 }
	     $("div.control input:checkbox").prop("checked",$(this).prop("checked"));
	});	 

    if($("div.control input:checkbox").prop("checked") || $.cookie('yushe')==1){
	    $("div.control input:checkbox").prop("checked",true);
	    $.cookie('yushe',1);
		$(".zje").val($.cookie('yusheje'));
	}

	$("input.jes").keyup(function() {
		$(this).val($(this).val().replace(/\D/g,''));
	}).keypress(function() {
		$(this).val($(this).val().replace(/\D/g,''));
	});
	
	$("div.control input:text:eq(0)").focus();
	$(".main a:eq("+menu+")").addClass('click');
	$(".sub div",parent.document).html($(".sub").html());
	$(".sub div a:eq("+menu+")",parent.document).addClass('selected');
	$("a.ab:eq(1)").addClass('on');
	$("#gameName").html($(".main a.click").html());
	
	
    $("#cdRefresh").click(function() {
        clearTimeout(setgntime);
        lib();
        gntime = 7;
        gntimex();
    });
    time0 = Number($(".panstatus").attr("time0"));
    time1 = Number($(".panstatus").attr("time1"));
    timek = Number($(".kjtime").attr("timek"));
    if (time0 < 0) time0 = 0 -time0 ;
    if (time1 < 0) time1 = 0 -time1;
    if (timek < 0) timek = 0;
    time0x();
    timekx();
    if (fenlei == 100) {
        time1x();
    }
    gntimex();

	
	//upl = setTimeout(updatel, 1000);


	lib();
	setTimeout(getlast15, 1000);
	gnews = setTimeout(getnews, 1000);
	setTimeout(onefunc, 1000);
	//xreload();
	
 
	
}

var clicki=false;
function onefunc() {

    $(".sendtb .close",parent.document).click(function(){
	    $(".sendtb",parent.document).hide();
		$(".ui-front",parent.document).hide();
	});
$(".news button.close",parent.document).click(function(){$(".news",parent.document).hide();});
	$(".more",parent.document).click(function(){
	$.ajax({
		type: 'POST',
		cache: false,
		url: mulu + 'userinfo',
		data: 'xtype=getnewsall',
		success: function(m) {
			$(".news",parent.document).show();
			 $(".news tbody",parent.document).html(m);
		}
	})
	})

    $(".sub div a",parent.document).unbind("click");
	$(".sub div a",parent.document).click(function() {
       if(clicki) return false;
       if(!$("div.control input:checkbox").prop("checked")){
            $(".zje").val('');
       }
		var index = $(this).index();
		$(".main a").removeClass('click');
		$(".main a:eq("+index+")").addClass('click');
		$(".sub div a",parent.document).removeClass('selected');
		$(this).addClass('selected');
		$("#gameName").html($(".main a.click").html());
		if (fenlei == 100) {
			var bname=$(".main a.click").html()??'';
			if (bname == '特碼' | bname == '正特' | bname == '正碼') {
				$("a.ab").show();
			    $("a.ab:eq(1)").html(bname+'A');
				$("a.ab:eq(0)").html(bname+'B');	

				if(fastinput==1){$(".fasttext").show();}
			}else{
				$(".fasttext").hide();
		        $("a.ab").hide();
			}
		}else{
		   $("a.ab").hide();
		}
		$(".longr").show();
		$(".baodiv").hide();
		$(".baodiv").html('');
		$("#con").show();
		$(".con1").empty();
		$(".con1").hide();
		$("#long").hide();
		$(".info").show();
		lib();
        clicki=true;
        setTimeout(function(){clicki=false;},1000);
	});
	$(".game").change(function() {
		var gid = $(this).val();
		$.ajax({
			type: 'POST',
			cache: false,
			url: mulu + 'makelib',
			data: 'xtype=setgame&gid=' + gid,
			success: function(m) {
				if (Number(m) == 1) {
					window.location.reload();
				}
			}
		})
	});


	$(".cancel").click(function() {
		var zje =$(".zje").val();
		$("input:text").val('');
		$(".zje").val(zje);
		$(".selected").removeClass('selected');
		$(".selected2").removeClass('selected2');
		$(".ggpeilv").html('');
		$(".textnr").val('');
		
	});

   $("a.ab").click(function() {
		$("a.ab").removeClass('on');
		$(this).addClass('on');
		lib();
	});
	

	
	$(".reload").click(function() {
		window.location.reload();
		return false
	});
	$(".exe").click(function() {
		exe();
		return false
	});
	$(".kuaisu").click(function() {
		exe2();
		return false
	});
	$(".fastg").click(function() {
		if ($(this).val() == "勾选") {
			$(".make input:text").hide();
			$(".make input:checkbox").show();
			$(".fastg").val('快速')
		} else {
			$(".make input:text").show();
			$(".make input:checkbox").hide();
			$(".fastg").val('勾选')
		}
	});
	$(".fastgje").blur(function() {
		$(".fastgje").val($(this).val());
		$(".make input.byellow").val($(this).val());
	});
	$(".fastgsend").click(function() {
		var je = $(".fastgje").val();
		if (isNaN(Number(je)) | Number(je) % 1 != 0 | Number(je) == 0) {
			alert("请输入正确的金额！");
			return false
		}
		if ($(".fastg").val() == '勾选') {
			$(".make input.byellow").val(je)
		} else {
			$(".make input:checkbox").each(function() {
				if ($(this).prop("checked") == true) {
					$(this).parent().find("input:text").val(je)
				}
			});
			$(".exe").click()
		}
	});


}

function getnews() {
	clearTimeout(gnews);
	$.ajax({
		type: 'POST',
		url: mulu + 'userinfo',
		dataType: 'json',
		data: 'xtype=getnews',
		cache: false,
		success: function(m) {
			var mlength = m.length;
			if (mlength == 0) return false;
			var str = '';
			for (i = 0; i < mlength; i++) {
				str += '' + m[i]['content'] + '<label>[' + m[i]['time'] + ']</label> '
			}
			$("#notices",parent.document).html(str);
			if (m[0]['mc'] != '' & m[0]['mc'] != undefined & m[0]['mc'] != 'undefined') {
				alert(m[0]['mc']);
			}
			m = null;
			str = null
		}
	});
	gnews = setTimeout(getnews, 30000);
}
function updatel(news) {
	clearTimeout(upl);
    var m1 = $("#result_balls",parent.document).find("span:eq(0)").find("b").html();
	var qs = $("#result_info",parent.document).attr('v');
	var t = $(".main a.click").attr('t');
	//alert(t);
	if(fenlei==151) t=0;
	var obj = $("#result_info",parent.document);
	var objb = $("#result_balls",parent.document);
	//alert("xtype=upl&qs=" + qs + "&m1=" + m1 + "&tu=" + t)
	if(m1==undefined) m1='X';
	//alert(news);
	$.ajax({
		type: 'POST',
		url: mulu + 'make',
		dataType: 'json',
		cache: false,
		data: "xtype=upl&qs=" + qs + "&m1=" + m1 + "&tu=" + t+"&news="+news,
		success: function(m) {
		   //console.log(m);
		   //$("#test").html(m);return;
		   //alert(m[0]);
		   m=m.msg;
		    getusermoney();	
		    //console.log(m);
			if (m[0] != 'A') {
				var ml = m[4].length;
              if(m[7]!=""){
              	 alert("\r\n\r\n\r\n\r\n"+m[7]+"\r\n\r\n\r\n\r\n");
              }
			  if(m[4][0]!='' & m[4][0]!=null){	
				obj.attr('v',m[5]);
				obj.find("div:eq(0)").html(m[6]);
				obj.find("div:eq(1)").html(m[5]+"期开奖");
				var str="";
				var sum=0;
				
				if(fenlei==163){
				   qiunames= ["百","十","个"];
				}
				if(fenlei==101){
				   qiunames= ["万","千","百","十","个"];
				}
				for(i=0;i<ml;i++){
				   if(fenlei==107) 	if(m[4][i]!='' ){m[4][i] = Number(m[4][i]);}
				   if(fenlei==100 & i==ml-1) 	if(m[4][i]!=''  & m[4][i]!=null ){str += "<span class='plus'>+</span>";}
				   if(fenlei==163){
				     if(m[4][i]!='' ){
						 str += "<span><b class='b"+m[4][i]+"'>"+m[4][i]+"</b><!--<i style='margin-left:-10px;'>"+qiunames[i]+"</i>-->";
						 if(i==ml-1) str += "<i style='margin:-25px 0px 0px 40px'>=</i>";
						 else str += "<i style='margin:-25px 0px 0px 40px'>+</i>";
						 str += "</span>";
						 sum += Number(m[4][i]);
					 }
				   }else if(fenlei==100){
                        str += "<span><b class='b"+m[4][i]+" a'>"+m[4][i]+"</b><span class='a'>"+m[10][i]+"</span></span>";
				   }else{
					 if(m[4][i]!='' & m[4][i]!=null){
						 if(fenlei==101){
						   str += "<span><b class='b"+m[4][i]+"'>"+m[4][i]+"</b><!--<i>"+qiunames[i]+"</i>--></span>";
						 }else{
						   str += "<span><b class='b"+m[4][i]+"'>"+m[4][i]+"</b></span>";
						 }
					 }
				   }
				}
				if(fenlei==163){
					if(str!='') str += "<span><b class='bg b_"+sum+"'>"+sum+"</b><!--<i>和</i>--></span>";
				}
				   objb.html(str);
				   if(ngid==101){                       
                       objb.attr("class","L_CQHLSX");
				   }else{
				   	   var gname = $("#result_info div:eq(0)",parent.document).html();
				   	   if(gname.indexOf('农场')!=-1){
				   	   	   objb.attr("class","L135");
				   	   }else{
				   	   	   objb.attr("class","T"+fenlei);
				   	   }
				       
				   }
				  
				   //if(fenlei==100) return ;
			if(fenlei==107){
                m[1] = m[1].replace(/第3/g,'第三');
                m[1] = m[1].replace(/第4/g,'第四');
                m[1] = m[1].replace(/第5/g,'第五');
                m[1] = m[1].replace(/第6/g,'第六');
                m[1] = m[1].replace(/第7/g,'第七');
                m[1] = m[1].replace(/第8/g,'第八');
                m[1] = m[1].replace(/第9/g,'第九');
                m[1] = m[1].replace(/第10/g,'第十');
            }      
				   $("#changlong").html(m[1]);
				   if(t==2){
				   	   $("#changlong").addClass("drawLot");
				   }else{
				   	   $("#changlong").removeClass("drawLot");
				   }
				   //$("#changlong").hide('fast');
				   //$("#changlong").show('fast');
				   if(fenlei==151) {
					   $("#changlong").addClass("table_ball");
					   $("#changlong").attr("id","historyResult")
				   }
				    $(".longr td").hover(function(){$(this).addClass('hover');$(this).parent().find("th").addClass('hover')},function(){$(this).removeClass('hover');$(this).parent().find("th").removeClass('hover')});
					$(".longr th").hover(function(){$(this).addClass('hover');$(this).parent().find("td").addClass('hover')},function(){$(this).removeClass('hover');$(this).parent().find("td").removeClass('hover')});
				   $("input[name='longfs']").change(function(){
				      if($(this).val()==1){
					      $(".buz").hide();
						  $(".zz").show();
					  }else{
					      $(".buz").show();
						  $(".zz").hide();
					  }
				   });
				    $("input[name='longfs']:eq(1)").change();
				   if (m[3] == 1) {
				 	  bofang("kaijiang");
				   }
				 
				   if(m[8]==1){
				   	     var str = '<tr>';
				   	     for(var i in m[9]){
				   	     	if(i%10==0){
				   	     		str += "</tr><tr>";
				   	     	}
				   	     	var cc="bai";
				   	     	if(Number(m[9][i])==1 || Number(m[9][i])==3){
				   	     		cc = "hei";
				   	     	}else if(Number(m[9][i])==2 || Number(m[9][i])==4){
				   	     		cc = "red";
				   	     	}
                            str += "<td class='"+cc+"'>"+m[9][i]+"</td>";
				   	     }
				   	     str += "</tr>";
				   	     $(".ftlutb tbody").html(str);
				   	     $("input.ftlu").unbind("click");
				   	     $("input.ftlu").click(function(){
				   	     	  if($(".ftlutb:visible").length==1){
				   	     	  	  $(".ftlutb").hide();
				   	     	  	  $("input.ftlu").val("番路");
				   	     	  }else{
				   	     	  	  var posi = $(this).position();
				   	     	      $(".ftlutb").css("left",$("input.ftlu").width()+posi.left-$(".ftlutb").width());
				   	     	      $(".ftlutb").css("top",posi.top+25);
				   	     	      $(".ftlutb").show();
				   	     	       $("input.ftlu").val("关闭");
				   	     	  }				   	     	  
				   	     });
				   	     $(".ftlutb").hide();
				   }
			   	   if (t>0) {
					 tu = m[2];
					 tuset();
				   }
				   //if(t!=2 && fenlei!=100) libpl(1);
			  }
				  
				}
				
			
		}
	});
	upl =  setTimeout(updatel, 1000);
}

function dwsendtb(){
	  if($(".sendtb").is(':visible')){   
       var top = $(window).scrollTop();
	   if(top<=80) top=80;
       var left= 2;
       $(".sendtb").css({ left:left + "px", top: top + "px" });
	  }
}

function longsrc() {
	if (document.frames) {
		document.all["long"].src = "long?xtype=show"
	} else {
		document.getElementById("long").contentWindow.location.href = "long?xtype=show"
	}
}

function tuk(arr) {
	var tmp = '';
	var str = '';
	var c = 0;
	var strt = '';
	for (var j in arr) {
		if (tmp != arr[j]) {
			if (c == 26) break;
			if (c > 0) strt += "</td>";
			str = strt + str;
			strt = '';
			if (c % 2 == 0) strt += "<td class='even'>";
			else strt += "<td>";
			c++
		}
		strt += arr[j] + "<BR />";
		tmp = arr[j]
	}
	strt += "</td>";
	str = strt + str;
	for (i = c; i <= 25; i++) {
		str = "<td> </td>" + str
	}
	return str
}
function tus() {
	if (fenlei == 100 | fenlei == 151) {
		$(".tu").hide();
		return
	}
	var t = $(".main a.click").attr('t');
	if (t == 0) {
		$(".tu").hide();
		return
	} else {
		$(".tu").show()
	}
	if (t != $(".tu").attr('t')) {
		$.ajax({
			type: 'POST',
			url: mulu + 'make',
			dataType: 'json',
			cache: false,
			data: "xtype=tu&tu=" + t,
			success: function(sm) {
				tu = sm;
				tuset()
			}
		})
	} else {
		tuset()
	}
}
var bcs=0,ccs=0;
function tuset() {
	var tl = tu.length;
	if (tl == 0) return;
	$(".tu").attr('t', $(".main a.click").attr('t'));
	var str = '';
	var t = $(".main a.click").attr('t');
	if (fenlei == 161 || t=='2') {
		$(".tabTitle:eq(0) tr").html('');
		$(".ballTable:eq(0) tr").html('');
		tunext(tu)
	} else {
		str = '';
		for (var i in tu['b']) {
			str += "<th><a href='javascript:void(0)'>" + tu['b'][i] + "</a></th>"
		}
		$(".tabTitle:eq(0) tr").html(str);
		$(".tabTitle:eq(0) tj").unbind("click");
		$(".tabTitle:eq(0) th").click(function() {
			bcs = $(this).index();
			$(".tabTitle:eq(0) th").removeClass("selected");
			$(this).addClass("selected");
			var html = $(this).find("a").html();
			var arr = tu[html];
			$(".ballTable tr.head").html('');
			$(".ballTable tr.nr").remove();
			var buchu = 0;
			if ((fenlei == 101 | fenlei == 163) & Number(t) <= 9) {
				arr['总和大小'] = tu['总和大小'];
				arr['总和单双'] = tu['总和单双'];				
				arr['总尾大小'] = tu['总尾大小'];
				arr['龙虎和'] = tu['龙虎和'];
				buchu = 1
			} else if (fenlei == 121) {
				arr['总和大小'] = tu['总和大小'];
				arr['总和单双'] = tu['总和单双'];				
				arr['总尾大小'] = tu['总尾大小'];
				arr['龙虎'] = tu['龙虎'];
				buchu = 1
			} else if (fenlei == 103) {
				arr['总和大小'] = tu['总和大小'];
				arr['总和单双'] = tu['总和单双'];				
				arr['总尾大小'] = tu['总尾大小'];
				buchu = 1
			} else if (fenlei == 107) {
				arr['冠亚和'] = tu['冠亚和'];
				arr['冠亚和大小'] = tu['冠亚和大小'];
				arr['冠亚和单双'] = tu['冠亚和单双'];
				
				buchu = 1
			}
			tunext(arr);
			if (fenlei == 103 & html != '总和') {
				buchu = 1
			}
			if (buchu == 1) {
				var strh = "<th>号码</th>";
				str = "<td>无出期数</td>";
				var bc = tu["bc"][html];
				for (var i in bc) {
					strh += "<th  class='b" + bc[i]['name'] + "'>" + bc[i]['name'] + "</th>";
					str += "<td class='b" + bc[i]['name'] + "'>" + bc[i]['buzqishu'] + "</td>"
				}
				var strc = "<td>出球率</td>";
				var chu = tu["chu"][html];
				for (var i in chu) {
					strc += "<td  class='b" + i + "'>" + chu[i] + "</td>"
				}
				$(".ballTable tr.head").html(strh);
				$(".ballTable tr.nr").remove();
				$(".ballTable tr.head").after("<tr class='nr'>" + str + "</tr>");
				$(".ballTable tr.head").after("<tr class='nr'>" + strc + "</tr>")
			}
		});
		$(".tabTitle:eq(0) th:eq("+bcs+")").click();
	}
}
function tunext(arr) {
	var str = '';
	for (var i in arr) {
		str += "<th><a href='javascript:void(0)'>" + i + "</a></th>"
	}
	$(".tabTitle:eq(1) tr").html(str);
	$(".tabTitle:eq(1) th").unbind('click');
	$(".tabTitle:eq(1) th").click(function() {
		ccs = $(this).index();
		$(".tabTitle:eq(1) th").removeClass("selected");
		$(this).addClass("selected");
		$(".tabContents tr").html(tuk(arr[$(this).find("a").html()]))
	});
	$(".tabTitle:eq(1) th:eq("+ccs+")").click();
}

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
		url: mulu + 'userinfo',
		dataType: "json",
		cache: false,
		data: 'xtype=getusermoney',
		success: function(m) {
            var obj = $(".accounts",parent.document);
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

function getlast15() {
	$.ajax({
		type: 'POST',
		url: mulu + 'makelib',
		data: 'xtype=getlast15',
		dataType: 'json',
		cache: false,
		success: function(m) {
			var ml = m.length;
			var str = '';
			var name = '';
			var peilv='';
			var obj = $(".last15",parent.document);			
			for (i = 0; i < ml; i++) {
				peilv = m[i]['peilv1'];
				if (Number(m[i]['peilv2']) >= 10) {
					peilv += "/" + m[i]['peilv2']
				}
				str += "<li><p>注单号：<span class='bid'>"+m[i]['tid']+"#</span></p><p class='contents'><span class='text'>"+m[i]['name']+"</span>@<span class='odds'>"+peilv+"</span></p><p>金额：￥"+m[i]['je']+"  时间:"+m[i]['time']+"</p></li>";
			}
			obj.html(str);
		}
	})
}

function scclick() {
	$(".smenu td:eq(0)").find("input").click(function() {
		$(".smenu td:eq(0) input").removeClass('click');
		$(this).addClass('click');
		lib();
		return false
	})
}

function transk3(n) {
	var v;
	if (isNaN(n)) v = n;
	else {
		if (n > 100) {
			v = "<img src='../imgn/4_" + (n % 10) + ".gif' /><img src='../imgn/4_" + (n % 10) + ".gif' /><img src='../imgn/4_" + (n % 10) + ".gif' />"
		} else if (n > 10) {
			v = "<img src='../imgn/4_" + n.substr(0, 1) + ".gif' /><img src='../imgn/4_" + (n % 10) + ".gif' />"
		} else {
			v = "<img src='../imgn/4_" + n + ".gif' />"
		}
	}
	return v
}

function checkclose() {
	var bid = Number($(".main a.click").attr("bid"));
	var name = $(".main a.click").html();
	$.ajax({
		type: 'POST',
		url: mulu + 'make',
		dataType: 'json',
		cache: false,
		data: 'xtype=getpan',
		success: function(m) {
			if (Number(m['panstatus']) == 0) {
				$("f").attr('disabled', true)
			} else {
				$(".exe").attr('disabled', false)
			}
		}
	})
}

function getatt() {
	var abcd = $("#abcd", parent.document).val();;
	var ab = $("a.ab.on").attr('v');
    clearTimeout(gatt);
	
	$.ajax({
		type: 'POST',
		url: mulu + 'makelib',
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
				$("td.p" + m[i]['pid']).find("label.peilv1").html(m[i]['peilv1']);
				$("td.p" + m[i]['pid']).addClass('blue');
				$("a.p" + m[i]['pid']).parent().addClass('blue');
				$("a.p" + m[i]['pid']).find("label").html(m[i]['peilv1']);
			}
			if (i != 0) {
				setTimeout(function() {
					$("td.blue").removeClass('blue')
				}, 5000)
			}
			gatt = setTimeout(getatt, 3000)
		}
	})
}


var stra = "<table class='wd100 makehead'><tr><Th class=f>NO</th><th class=s>赔率</th><Th class=t>金额</th></tr></table>";
var strb = "<tr><Th>项目</th><th>赔率</th><th>号码</th><Th>金额</th></tr>";
var strc = "<tr><Th>项目</th><th class=h40>赔率</th><Th>选择</th></tr>";

function addfunc() {
	$(".lists th.name").each(function(){
		if($(this).html().indexOf("红")!=-1 || $(this).html().indexOf("紅")!=-1){
            $(this).css("color","red");
		}else if($(this).html().indexOf("蓝")!=-1 || $(this).html().indexOf("藍")!=-1){
            $(this).css("color","blue");
		}else if($(this).html().indexOf("绿")!=-1 || $(this).html().indexOf("綠")!=-1){
			$(this).css("color","green");
		}
	});
	$(".lists input:text").attr("maxlength", 7);
	$(".lists input:text").keyup(function(){$(this).val($(this).val().replace(/\D/g,''));}).keypress(function(){$(this).val($(this).val().replace(/\D/g,''));});
	
			$('.lists td').hover(function() {
				var pid = $(this).attr('pid');
				$(".lists td.p" + pid).addClass('hover');
				$(".lists td.i" + pid).addClass('hover');
				$(".lists td.img" + pid).addClass('hover');
				$(".lists th.m" + pid).addClass('hover');
			}, function() {
				var pid = $(this).attr('pid');
				$(".lists td.p" + pid).removeClass('hover');
				$(".lists td.i" + pid).removeClass('hover');
				$(".lists td.img" + pid).removeClass('hover');
				$(".lists th.m" + pid).removeClass('hover');
			});
		

	
	
	$(".lists td.p").click(function() {
		var pid = $(this).attr('pid');
		var je = $("div.control input:text").val();
		if($(this).hasClass('selected')){
		    $(".lists td.p"+pid).removeClass("selected");
			$(".lists td.i"+pid).removeClass("selected");
			$(".lists td.img"+pid).removeClass("selected");		
			$(".lists th.m"+pid).removeClass("selected");
		}else{
		    $(".lists td.p"+pid).addClass("selected");
			$(".lists td.i"+pid).addClass("selected");
			$(".lists th.m"+pid).addClass("selected");
			$(".lists td.img"+pid).addClass("selected");
			if(!$(".lists td.i"+pid).find("input:text").prop("disabled")){		 
                $(".lists td.i"+pid).find("input:text").val(je);
			}
		}
	});

    $(".fts td.odds").click(function(){
    	 if($(this).hasClass("selected")){
    	     $(this).removeClass("selected");
    	     $(this).next().removeClass("selected");
    	 }else{
    	     $(this).addClass("selected");
    	     $(this).next().addClass("selected");
    	 }
    });
    $(".fts td.amount").click(function(){
    	 if($(this).hasClass("selected")){
    	     $(this).removeClass("selected");
    	     $(this).prev().removeClass("selected");
    	     if(Number($(".zje:eq(0)").val())>0){
    	 	    $(this).find("input:text").val('');
    	     }
    	 }else{
    	     $(this).addClass("selected");
    	     $(this).prev().addClass("selected");
    	     if(Number($(".zje:eq(0)").val())>0){
    	 	    $(this).find("input:text").val($(".zje:eq(0)").val());
    	     }
    	 }

    });
    $(".ftdiv").click(function(){
    	 if($(this).hasClass("selected")){
    	     $(this).removeClass("selected");
    	     if(Number($(".zje:eq(0)").val())>0){
    	 	    $(this).find("input:text").val('');
    	     }
    	 }else{
    	     $(this).addClass("selected");
    	     if(Number($(".zje:eq(0)").val())>0){
    	 	    $(this).find("input:text").val($(".zje:eq(0)").val());
    	     }
    	 }
    });


	$(".lists td.i").click(function() {
		var pid = $(this).attr('pid');
		var je = $("div.control input:text").val();
		if(!$(".lists td.i"+pid).find("input:text").prop("disabled")){		 
            $(".lists td.i"+pid).find("input:text").val(je);
		}
		/*
		if($(this).hasClass('selected')){
		    $(".lists td.p"+pid).removeClass("selected");
			$(".lists td.i"+pid).removeClass("selected");
			$(".lists td.img"+pid).removeClass("selected");				
			$(".lists th.m"+pid).removeClass("selected");
		}else{
		    $(".lists td.p"+pid).addClass("selected");
			$(".lists td.i"+pid).addClass("selected");
			$(".lists th.m"+pid).addClass("selected");
			$(".lists td.img"+pid).addClass("selected");	 
			if(!$(".lists td.i"+pid).find("input:text").prop("disabled")){		 
                $(".lists td.i"+pid).find("input:text").val(je);
			}
		}
		*/
	});
	
	$(".lists th.m").click(function() {
		var pid = $(this).attr('pid');
		var je = $("div.control input:text").val();
		if($(this).hasClass('selected')){
		    $(".lists td.p"+pid).removeClass("selected");
			$(".lists td.i"+pid).removeClass("selected");
			$(".lists td.img"+pid).removeClass("selected");				
			$(".lists th.m"+pid).removeClass("selected");
		}else{
		    $(".lists td.p"+pid).addClass("selected");
			$(".lists td.i"+pid).addClass("selected");
			$(".lists th.m"+pid).addClass("selected");
			$(".lists th.img"+pid).addClass("selected");		 
			if(!$(".lists td.i"+pid).find("input:text").prop("disabled")){		 
                $(".lists td.i"+pid).find("input:text").val(je);
			}
		}
	});
	
	$(".lists input:text").focus(function() {
		if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105))){
           event.returnValue=false;
		 }
		
	});

	clearTimeout(gatt);
	gatt = setTimeout(getatt, 3000)
}

function getnowtime() {
	clearTimeout(setgntime);
	$.ajax({
		type: 'POST',
		url: mulu + 'times',
		data: 'xtype=getopen',
		cache: false,
		success: function(m) {
		    m=m.msg;
			m = m.split('|');
			if(Number(m[6])==0 | m[6]==undefined){
			   top.window.location.href= top.window.location.href;
			   return false;
			}
			if (fenlei == 100) {
				if (Number(m[2]) != Number($(".thisqishu").html()) | Number(m[3]) != Number($(".panstatus").attr('s')) | Number(m[4]) != Number($(".panstatus").attr('os'))) {
					$(".panstatus").attr('s', m[3]);
					$(".panstatus").attr('os', m[4]);
                    if ($(".main a.click").attr("bid") == "") {
                        if (Number(m[3]) == 0) {
                            $(".panstatus").html($(".panstatus").html().replace("封", "开"))
                        } else {
                            $(".panstatus").html($(".panstatus").html().replace("开", "封"))
                        }
                    } else {
                        if (Number(m[4]) == 0) {
                            $(".panstatus").html($(".panstatus").html().replace("封", "开"))
                        } else {
                            $(".panstatus").html($(".panstatus").html().replace("开", "封"))
                        }
                    }
                    $(".thisqishu").html(m[2]);
					if(Number(m[5])<2100 | Number(m[5])>2128){
					    lib();
					}
					getusermoney();
					getlast15();
				}
                clearTimeout(settime1);
                time1 = Number(m[1]);
                time1x();
			} else {
				if (Number(m[2]) != Number($(".thisqishu").html()) | Number(m[3]) != Number($(".panstatus").attr('s'))) {
					$(".panstatus").attr('s', m[3]);
					if (Number(m[3]) == 0) {
						$(".panstatus").html($(".panstatus").html().replace("封", "开"))
					} else {
						$(".panstatus").html($(".panstatus").html().replace("开", "封"))
					}
					$(".thisqishu").html( m[2]);
					lib();
					getusermoney();
					getlast15();
				}
			}
            clearTimeout(settime0);
            time0 = Number(m[0]);
            time0x();
            clearTimeout(settimek);
            timek = Number(m[7]);
            timekx()
		}
	});
    gntime = 7;
    gntimex();
}

function gntimex() {
    gntime--;
    $("#cdRefresh span").html(gntime+"秒");
    if (gntime <= 0) {
        getnowtime();
        return;
    }
    setgntime = setTimeout(gntimex, 1000);
}

function time0x() {
    time0--;
    if (time0 < 0) time0 = 0;
    var str = '';
    var d = 0,
        h = 0,
        m = 0,
        s = 0;
    h = Math.floor(time0 / (60 * 60));
    m = Math.floor((time0 - h * 60 * 60) / 60);
    s = time0 - h * 60 * 60 - m * 60;
    if (h > 0) str += h + ":";
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    str += m + ":";
    str += s;
    if (fenlei != 100 || $(".main a.click").attr("bid") == "") {
        $(".time0").html(str);
    }
    if(time0==0){
        getnowtime();
        return;
    }
    settime0 = setTimeout(time0x, 1000)
}

function time1x() {
    time1--;
    if (time1 < 0) time1 = 0;
    var str = '';
    var d = 0,
        h = 0,
        m = 0,
        s = 0;
    h = Math.floor(time1 / (60 * 60));
    m = Math.floor((time1 - h * 60 * 60) / 60);
    s = time1 - h * 60 * 60 - m * 60;
    if (h > 0) str += h + ":";
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    str += m + ":";
    str += s;
    if (fenlei == 100 && $(".main a.click").attr("bid") != "") {
        $(".time1").html(str);
    }
        if(time1==0){
        getnowtime();
        return;
    }
    settime1 = setTimeout(time1x, 1000)
}

function timekx() {
    timek--;
    if (timek < 0) timek = 0;
    var str = '';
    var d = 0,
        h = 0,
        m = 0,
        s = 0;
    h = Math.floor(timek / (60 * 60));
    m = Math.floor((timek - h * 60 * 60) / 60);
    s = timek - h * 60 * 60 - m * 60;
    if (h > 0) str += h + ":";
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    str += m + ":";
    str += s;
    
    if(Number($(".thisqishu").html())-Number($("#result_info",parent.document).attr("v"))==1){
        $(".kjtime").html(str);
    }else{
        $(".kjtime").html("00:00");
    }
    
    settimek = setTimeout(timekx, 1000)
}



function getlogin() {
	$.ajax({
		type: 'POST',
		url: mulu + 'getlogin',
		data: 'xtype=getlogin',
		cache: false,
		success: function(m) {
			if (Number(m) == 1) {
				window.location.href = window.location.href
			} else {
				setTimeout(getlogin, 10000)
			}
		}
	})
}

function page(rcount, psize, func) {
	var pcount, pstr = '';
	pcount = rcount % psize == 0 ? rcount / psize : (rcount - rcount % psize) / psize + 1;
	for (i = 1; i <= pcount; i++) {
		pstr += "<a href='javascript:void(0)' p='" + i + "' class='page";
		if (i == tpage) pstr += " red";
		pstr += "' >" + i + "</a>"
	}
	$("#page").html(pstr);
	$("#page a").click(function() {
		tpage = Number($(this).attr('p'));
		eval(func)();
		return false
	})
}

var psize = 100;
var tpage = 1;





function getma(val) {
	var tmp = new Array();
	for (x = 0; x < mal; x++) {
		if (ma[x]['name'] == val) {
			tmp = ma[x]['ma'];
			break
		}
	}
	var xstr = '';
	for (x = 0; x < tmp.length; x++) {
		var j = tmp[x];
		if (j <= 9) j = '0' + j;
		xstr += "<img src='" + globalpath + "imgs/" + j + ".gif' />"
	}
	return xstr
}

function getma2(val) {
	var tmp = new Array();
	for (x = 0; x < mal; x++) {
		if (ma[x]['name'] == val) {
			tmp = ma[x]['ma'];
			break
		}
	}
	var xstr = '';
	for (x = 0; x < tmp.length; x++) {
		var j = tmp[x];
		if (x != 0) xstr += ',';
		xstr += j
	}
	return xstr
}

function getmas(val) {
	var tmp = new Array();
	for (x = 0; x < mal; x++) {
		if (ma[x]['name'] == val) {
			tmp = ma[x]['ma'];
			break
		}
	}
	var xstr = '';
	for (x = 0; x < tmp.length; x++) {
		var j = tmp[x];
		if (j <= 9) j = '0' + j;
		xstr += "<label style='color:" + color(j) + "'>" + j + "</label>"
	}
	return xstr
}



function xreload() {
	if (document.frames) {
		document.all["check"].src = 'check'
	} else {
		document.getElementById("check").contentWindow.location.href = 'check'
	}
	setTimeout(xreload, 55000)
}


function bofang(SOUND_URL) {
    SOUND_URL = "/static/mxj/js/" + SOUND_URL + ".mp3";
    if (!SOUND_URL) {
        return
    }
    var a = $("#SOUND");
    if (a.length == 0) {
        a = $('<audio id="SOUND"><source src="' + SOUND_URL + '" type="audio/mpeg"/></audio>').appendTo($("body"))[0];
        if (a.load) {
            a.load()
        }
    } else {
        a = a[0]
    }
    // if (a.play) {
    //     a.play()
    // }
}

