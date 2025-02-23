// JavaScript Document
var thislayer=5;
var melayer=Number($("#topid").attr('layer'));
var layer=Number($("#topid").attr('layer'));

var level=new Array("公司","大股东","股东","总代","代理","会员");
var topid=Number($("#topid").val());
var rtime=Number($("#reloadtime").val());
var posi;
var heig;
function myready(){
	$(".h31 input:button").click(function(){
		$(".h31").hide();
		$(".res").hide();
		$(".baotb").hide();
	});
	$("label").addClass('red');
    $(".winprint").click(function(){
	   $(".xbody1").css("width",900);
       window.print() ;
	   $(".xbody1").css("width",1004);
    });  
    baoagentq(topid,melayer);
    $("#bid").change(function(){
	  if($(this).val()==''){
		  $("#sid").empty();	
	      $("#cid").empty();
		  return;
	  }
	  $("#sid").empty();
      getclass($(this).val());	  
   });
   $("#cid").change(function(){
	  var bid=$("#bid").val();	
	  if(bid=='23378685' | bid=='23378687') return;
      getsid(bid,$(this).val());
   });
   $(".query").click(function(){
      baoagentq(topid,melayer);
	  //baoagent(23378724,melayer+1);
   }); 

   $(".upuser").click(function(){
	  $(".nowuser").html($(".upuser").html());
	  $(".nowuser").attr("uid",$(".upuser").attr('uid'));
	  $(".nowuser").attr("layer",$(".upuser").attr('layer'));
	  
	  var xlayer=Number($(".nowuser").attr('layer'));
	  if(xlayer==0){
	      return;
	  }else{
	      baoagent($(".nowuser").attr('uid'),xlayer); 	
	  }
	  $.ajax({
	     type:'POST',
		 url:mulu + 'xxtz.php',
		 data:'xtype=getfid&uid='+$(".upuser").attr('uid'),
		 dataType:'json',
		 cache:false,
		 success:function(m){
			//$("#test").html(m);return;
		    if(Number(m['err'])==1){
		   	    $(".upuser").html('');
			    $(".upuser").attr('uid','');
			    $(".upuser").attr('layer','');	
				return;
			}
			if(Number(m['uid'])==99999999){
			    $(".upuser").html('公司');
			}else{
			    $(".upuser").html(m['name']);
			}
			$(".upuser").attr('uid',m['uid']);
			$(".upuser").attr('layer',m['layer']);	
		 }		 
	  });						  
      
  });
   
}
function getclass(fid){	
    $.ajax({
	   type:'POST',
	   url:mulu + 'xxtz.php',
	   dataType:'json',
	   data:'xtype=getclass&fid='+fid,
	   cache: false,
	   success:function(m){
		   var ml=m.length;
		   $("#cid").empty();
		   if(fid=='23378685' | fid=='23378687'){
			   $("#cid").append("<option value=''>全部</option>");
		   }
		   for(i=0;i<ml;i++){		       
			   str = "<option value='"+m[i]['cid']+"'>"+m[i]['name']+"</option>";
			   $("#cid").append(str);
		   }
		   str=null;
		   m=null;
		   if(fid!='23378685' & fid!='23378687'){
			  getsid(fid,$("#cid").val());
		   }
	   }
	});
}
function getsid(bid,cid){	
    $.ajax({
	   type:'POST',
	   url:mulu + 'xxtz.php',
	   dataType:'json',
	   data:'xtype=getsid&bid='+bid+"&cid="+cid,
	   cache: false,
	   success:function(m){
		   var ml=m.length;
		   $("#sid").empty();
		   $("#sid").append("<option value=''>全部</option>");
		   for(i=0;i<ml;i++){
		       str = "<option value='"+m[i]['id']+"'>"+m[i]['name']+"</option>";
			   $("#sid").append(str);
		   }
		   str=null;
		   m=null;
	   }
	});
}


function baoagentq(uid,layer){
	var q1=$("#qishu1").val();
	var q2=$("#qishu2").val();

	if(Number(q1)>Number(q2)) {alert('"上限期数"不能大于"下限期数"');return false;}
	var str = '&q1='+q1+"&q2="+q2;
	
   
	$.ajax({
	    type:'POST',
		url:mulu + 'baox.php',
		data:'xtype=baolistq'+str,
		dataType:'json',
		success:function(m){	
		    //$("#test").html(m);return;
            var str='';
			var zzs=0;
			var zuje=0;
			var zushui=0;
			var zuyk=0;
			var uyk=0;
			var zzcje=0;
			var zzcshui=0;
			var zzcyk=0;
			var zcyk=0;
			var zfyk=0;
			var fyk=0;
			var zfje=0;
			var zfshui=0;
			var ypeilv=0;
			var zypeilv=0;
			var yshui=0;
			var zyshui=0;
			if(layer==6){
			   str += "<tr><th rowspan=2>序号</th><th rowspan=2>期数</th><th rowspan=2>笔数</th><th rowspan=2>下注总额</th><th rowspan=2>退佣</th><th rowspan=2>会员盈亏</th><th colspan=7>代理</th></tr><tr><th>代理占成金额</th><th>退水</th><th>占成盈亏</th><th>补货金额</th><th>补货退水</th><th>补货盈亏</th><th>总盈亏</th></tr>";
			}else if(layer==1){
			   str += "<tr><th rowspan=2>序号</th><th rowspan=2>期数</th><th rowspan=2>笔数</th><th rowspan=2>下注总额</th><th rowspan=2>退佣</th><th rowspan=2>会员盈亏</th><th colspan=9>公司</th></tr><tr><th>公司占成金额</th><th>退水</th><th>占成盈亏</th><th>补货金额</th><th>补货退水</th><th>补货盈亏</th><th>赚水</th><th>赚赔率差</th><th>总盈亏</th></tr>";
			}else if(layer==2){
			   str += "<tr><th rowspan=2>序号</th><th rowspan=2>期数</th><th rowspan=2>笔数</th><th rowspan=2>下注总额</th><th rowspan=2>退佣</th><th rowspan=2>会员盈亏</th><th colspan=9>大股东</th></tr><tr><th>大股东占成金额</th><th>退水</th><th>占成盈亏</th><th>补货金额</th><th>补货退水</th><th>补货盈亏</th><th>赚水</th><th>赚赔率差</th><th>总盈亏</th></tr>";
			}else if(layer==3){
			   str += "<tr><th rowspan=2>序号</th><th rowspan=2>期数</th><th rowspan=2>笔数</th><th rowspan=2>下注总额</th><th rowspan=2>退佣</th><th rowspan=2>会员盈亏</th><th colspan=9>股东</th></tr><tr><th>股东占成金额</th><th>退水</th><th>占成盈亏</th><th>补货金额</th><th>补货退水</th><th>补货盈亏</th><th>赚水</th><th>赚赔率差</th><th>总盈亏</th></tr>";
			}else if(layer==4){
			  str += "<tr><th rowspan=2>序号</th><th rowspan=2>期数</th><th rowspan=2>笔数</th><th rowspan=2>下注总额</th><th rowspan=2>退佣</th><th rowspan=2>会员盈亏</th><th colspan=9>总代</th></tr><tr><th>总代占成金额</th><th>退水</th><th>占成盈亏</th><th>补货金额</th><th>补货退水</th><th>补货盈亏</th><th>赚水</th><th>赚赔率差</th><th>总盈亏</th></tr>";
			}else if(layer==5){
			  str += "<tr><th rowspan=2>序号</th><th rowspan=2>期数</th><th rowspan=2>笔数</th><th rowspan=2>下注总额</th><th rowspan=2>退佣</th><th rowspan=2>会员盈亏</th><th colspan=9>代理</th></tr><tr><th>代理占成金额</th><th>退水</th><th>占成盈亏</th><th>补货金额</th><th>补货退水</th><th>补货盈亏</th><th>赚水</th><th>赚赔率差</th><th>总盈亏</th></tr>";
			}
            var ml= m.length;
			for(i=0;i<ml;i++){
	            str += "<tr>";
				str += "<td>"+(i+1)+"</td>";
				str += "<td ><a href='javascript:void(0);' year='"+m[i]['year']+"' qishu='"+m[i]['qishu']+"' class='d'>"+m[i]['year']+"年-"+m[i]['qishu']+"期</a></td>";
				str += "<td>"+m[i]['zs']+"</td>";
				str += "<td>"+m[i]['uje']+"</td>";
				str += "<td>"+m[i]['ushui']+"</td>";
				zzs += Number(m[i]['zs']);
				zuje += Number(m[i]['uje']);
				zushui += Number(m[i]['ushui']);
				uyk = getResult(Number(m[i]['ushui'])+Number(m[i]['uzhong'])-Number(m[i]['uje']),2);
				zuyk += uyk;
				str += "<td>"+uyk+"</td>";
				str += "<td>"+m[i]['zcje']+"</td>";
				str += "<td>"+m[i]['zcshui']+"</td>";
				zzcje += Number(m[i]['zcje']);
				zzcshui += Number(m[i]['zcshui']);
				zcyk = getResult(Number(m[i]['zcje'])-Number(m[i]['zcshui'])-Number(m[i]['zczhong']),2);
				zzcyk += zcyk;
				str += "<td>"+zcyk+"</td>";
				str += "<td>"+m[i]['fje']+"</td>";
				str += "<td>"+m[i]['fshui']+"</td>";
				zfje += Number(m[i]['fje']);
				zfshui += Number(m[i]['fshui']);
				fyk = getResult(Number(m[i]['fshui'])+Number(m[i]['fzhong'])-Number(m[i]['fje']),2);
				str += "<td>"+fyk+"</td>";
				zfyk += fyk;
				str += "<td>"+m[i]['yshui']+"</td>";
				str += "<td>"+m[i]['ypeilv']+"</td>";
				zypeilv += Number(m[i]['ypeilv']);
				zyshui += Number(m[i]['yshui']);
				str += "<td>"+getResult(fyk+zcyk+ Number(m[i]['ypeilv'])+ Number(m[i]['yshui']),2)+"</td>";
				str += "</tr>";
				
			}
			str += "<tr><td colspan=15></td></tr>";
            str += "<tr>";
			str += "<th>合计</th>";
			str += "<td></td>";
			str += "<td>"+getResult(zzs,0)+"</td>";
			str += "<td>"+getResult(zuje,2)+"</td>";
			str += "<td>"+getResult(zushui,2)+"</td>";
			str += "<th>"+getResult(zuyk,2)+"</th>";
			str += "<td>"+getResult(zzcje,2)+"</td>";
			str += "<td>"+getResult(zzcshui,2)+"</td>";
			str += "<th>"+getResult(zzcyk,2)+"</th>";
			str += "<td>"+getResult(zfje,2)+"</td>";
			str += "<td>"+getResult(zfshui,2)+"</td>";
			str += "<th>"+getResult(zfyk,2)+"</th>";
			
			str += "<td>"+getResult(zyshui,2)+"</td>";
			str += "<td>"+getResult(zypeilv,2)+"</td>";
			str += "<th>"+getResult(zfyk+zzcyk+zypeilv+zyshui,2)+"</th>";
			
			
			str += "</tr>";
			//alert(str);
			$(".baotbq").html(str);
            $(".baotb").html('');
			$("h4 label").html('');
			$("h5 label").html('');
			$(".baotbq a.d").click(function(){
			     $("#qhide").val($(this).attr('year')+$(this).attr('qishu'));
				 $("h3:eq(1)").find("label").html($(this).html());
				 posi = $(this).position();
				 heig =$(this).height();


				 baoagent(topid,melayer);
			});

		 }
		
	});
}

function baoagent(uid,layer){
	var q1=$("#qhide").val();
	var q2=$("#qhide").val();
	var bid=$("#bid").val();
	var cid=$("#cid").val();
	var sid=$("#sid").val();
	if(Number(q1)>Number(q2)) {alert('"上限期数"不能大于"下限期数"');return false;}
	
	//uid=23378707;
	//layer=4;
	var str = '&q1='+q1+"&q2="+q2+"&bid="+bid+"&cid="+cid+"&sid="+sid+"&uid="+uid;
    
	
	
	$("h4 label").html(0);
	$(".baotb").html('');
	$("h5").show();
	$("h5:eq(1)").find("label").html(0);
	$("h5:eq(0)").find("label").html(0);
	$("h5:eq(2)").find("label").html(0);
	//baofly(uid);
	//baoflywai(uid);
	
	$.ajax({
	    type:'POST',
		url:mulu + 'baox.php',
		data:'xtype=baoagent2'+str,
		dataType:'json',
		success:function(m){			
			//\$("#test").html(m);return;
			var ml=m.length;
			var str='';
			var zzs=0;
			var zupje=0;
			var zzhong=0;
			var zshui=0;
			var zxj=0;
			var zmezc=0;
			var zmeshui=0;
			var zmezhong=0;
			var zmeyk=0;
			var zsendje=0;
			var zsendshui=0;
			var zsendzhong=0;
			var zsendyk=0;
			var zyk=0;
			var zzyk=0;
			var zuje=0;
			var zushui=0;
			var zuzhong=0;
			var zyshui=0;
			var zypeilv=0;
			if(layer==6){
			   str += "<tr><th rowspan=2>会员</th><th rowspan=2>笔数</th><th rowspan=2>下注总额</th><th rowspan=2>退水</th><th rowspan=2>会员盈亏</th><td colspan=6 class=b2>大股东</td><td colspan=3  class=b3>公司</td><td></td></tr><tr><th>占成</th><th>退水</th><th>占成盈亏</th><th>赚赔率差</th><th>赚水</th><th>总盈亏</th><th>公司金额</th><th>退水</th><th>盈亏</th><th>合计</th></tr>";
			}else if(layer==1){
			   str += "<tr><th rowspan=2>大股东</th><th rowspan=2>笔数</th><th rowspan=2>下注总额</th><th rowspan=2>退水</th><th rowspan=2>会员盈亏</th><td colspan=3 class=b1>大股东</td><td colspan=6 class=b2>公司</td><td colspan=3  class=b3>集团</td></tr><tr><th>大股东金额</th><th>退水</th><th>盈亏</th><th>占成</th><th>退水</th><th>占成盈亏</th><th>赚赔率差</th><th>赚水</th><th>总盈亏</th><th>集团金额</th><th>退水</th><th>盈亏</th></tr>";
			}else if(layer==2){
			   str += "<tr><th rowspan=2>股东</th><th rowspan=2>笔数</th><th rowspan=2>下注总额</th><th rowspan=2>退水</th><th rowspan=2>会员盈亏</th><td colspan=3 class=b1>股东</td><td colspan=6 class=b2>大股东</td><td colspan=3  class=b3>公司</td></tr><tr><th>股东金额</th><th>退水</th><th>盈亏</th><th>占成</th><th>退水</th><th>占成盈亏</th><th>赚赔率差</th><th>赚水</th><th>总盈亏</th><th>公司金额</th><th>退水</th><th>盈亏</th></tr>";
			}else if(layer==3){
			   str += "<tr><th rowspan=2>总代</th><th rowspan=2>笔数</th><th rowspan=2>下注总额</th><th rowspan=2>退水</th><th rowspan=2>会员盈亏</th><td colspan=3 class=b1>总代</td><td colspan=6 class=b2>股东</td><td colspan=3  class=b3>大股东</td></tr><tr><th>总代金额</th><th>退水</th><th>盈亏</th><th>占成</th><th>退水</th><th>占成盈亏</th><th>赚赔率差</th><th>赚水</th><th>总盈亏</th><th>大股东金额</th><th>退水</th><th>盈亏</th></tr>";
			}else if(layer==4){
			   str += "<tr><th rowspan=2>代理</th><th rowspan=2>笔数</th><th rowspan=2>下注总额</th><th rowspan=2>退水</th><th rowspan=2>会员盈亏<td colspan=3 class=b1>代理</td><td colspan=6 class=b2>总代</td><td colspan=3  class=b3>股东</td></tr><tr><th>代理金额</th><th>退水</th><th>盈亏</th><th>占成</th><th>退水</th><th>占成盈亏</th><th>赚赔率差</th><th>赚水</th><th>总盈亏</th><th>股东金额</th><th>退水</th><th>盈亏</th></tr>";
			}else if(layer==5){
			   str += "<tr><th rowspan=2>会员</th><th rowspan=2>笔数</th><th rowspan=2>下注总额</th><th rowspan=2>退水</th><th rowspan=2>会员盈亏</th><td colspan=6 class=b2>代理</td><td colspan=3  class=b3>总代</td></tr><tr><th>占成</th><th>退水</th><th>占成盈亏</th><th>赚赔率差</th><th>赚水</th><th>总盈亏</th><th>总代金额</th><th>退水</th><th>盈亏</th></tr>";
			}


			for(i=0;i<ml;i++){
			    /*if(layer==5){
			       str += "<tr >";
				   str += "<td><a href='javascript:void(0);' class='u'  usertype='"+m[i]['user_type']+"' fid='"+m[i]['fid']+"' uid='"+m[i]['id']+"' layer='"+m[i]['layer']+"' >"+m[i]['username']+"</a></td>";
			  	   str += "<td>"+m[i]['zs']+"</td>";
				   str += "<td>"+m[i]['upje']+"</td>";
				   str += "<td>"+m[i]['zhong']+"</td>";
				   str += "<td>"+m[i]['shui']+"</td>";
				   var xj=getResult(Number(m[i]['upje']) - Number(m[i]['shui']) - Number(m[i]['zhong']),2);
				   str += "<td>"+xj+"</td>";
				   str += "</tr>";
				   zzs += Number(m[i]['zs']);
				   zupje += Number(m[i]['upje']);
				   zzhong += Number(m[i]['zhong']);
				   zshui += Number(m[i]['shui']);
				   zxj += xj;
				   continue;
				}*/
			    str += "<tr>";
				
				if(m[i]['fly']=='1') m[i]['username'] += "---内补";
				else if(m[i]['fly']=='2') m[i]['username'] += "---外补";
				

				str += "<td><a href='javascript:void(0);' class='u'  ifagent='"+m[i]['ifagent']+"' uid='"+m[i]['userid']+"' layer='"+m[i]['layer']+"' ";
				if(m[i]['fly'] == "1"){
				    str += "func='baofly'  ";
				}else if(m[i]['fly'] == "2"){
				    str += "func='baoflywai' ";
				}else{
				    str += "func='' ";
				}
				str += ">"+m[i]['username']+"</a></td>";
				str += "<td>"+m[i]['zs']+"</td>";
				str += "<td>"+m[i]['uje']+"</td>";
				str += "<td>"+m[i]['ushui']+"</td>";
	
				var xyk=0-getResult(Number(m[i]['uje']) - Number(m[i]['ushui']) - Number(m[i]['uzhong']),2);
				str += "<td>"+xyk+"</td>";
			    var xj=getResult(Number(m[i]['upje']) - Number(m[i]['shui']) - Number(m[i]['zhong']),2);
			    zxj += xj;	
			    if(layer<5){
				    str += "<td>"+m[i]['upje']+"</td>";
				    //str += "<td>"+m[i]['zhong']+"</td>";
				    str += "<td>"+m[i]['shui']+"</td>";
				    str += "<td>"+(0-xj)+"</td>";
			    }
				
				
				str += "<td class=o>"+m[i]['mezc']+"</td>";
				//str += "<td class=o>"+m[i]['mezhong']+"</td>";
				str += "<td class=o>"+(0-m[i]['meshui'])+"</td>";

				
				var meyk = getResult(Number(m[i]['mezc']) - Number(m[i]['meshui']) - Number(m[i]['mezhong']),2);
				str += "<td class=o>"+meyk+"</td>";

				
				if(m[i]['fly']=='1' | m[i]['fly']=='2'){
				    var yshui = 0;
				    var ypeilv =0;		
				}else{
				    var yshui = getResult(Number(m[i]['meshui'])+Number(m[i]['sendshui'])-Number(m[i]['shui']),2);
				    var ypeilv =getResult(Number(m[i]['mezhong'])+Number(m[i]['sendzhong'])-Number(m[i]['zhong']),2);					
				}
				str += "<td>"+ypeilv+"</td>";
				str += "<td>"+yshui+"</td>";
				zyshui += yshui;
				zypeilv += ypeilv;
				zmeyk += meyk;
				
				str += "<td ";
				if(m[i]['fly'] == "2"){
				     str += " class='flyje' ";
				}
				var ykss=getResult(meyk+yshui+ypeilv,2);
				str += " >"+ykss+"</td>";
				str += "<td>"+m[i]['sendje']+"</td>";
				//str += "<td>"+m[i]['sendzhong']+"</td>";
				str += "<td>"+(0-Number(m[i]['sendshui']))+"</td>";
				var sendyk = getResult(Number(m[i]['sendzhong']) + Number(m[i]['sendshui']) - Number(m[i]['sendje']),2);
				if(m[i]['fly']=='1') var sendyk = ykss;
				str += "<td>"+(0-sendyk)+"</td>";//return;
				zsendyk += sendyk;
				var zyk = getResult(meyk+yshui+ypeilv,2);
				
				//str += "<td>"+zyk+"</td>";
				zzyk += zyk;
				str += "</tr>";
				zzs += Number(m[i]['zs']);
				zupje += Number(m[i]['upje']);
				zzhong += Number(m[i]['zhong']);
				zshui += Number(m[i]['shui']);
				zmezc += Number(m[i]['mezc']);
				zmeshui += Number(m[i]['meshui']);
				zmezhong += Number(m[i]['mezhong']);
				zsendzhong += Number(m[i]['sendzhong']);
				zsendshui += Number(m[i]['sendshui']);
				zsendje += Number(m[i]['sendje']);
				zuje += Number(m[i]['uje']);
				zushui += Number(m[i]['ushui']);
				zuzhong += Number(m[i]['uzhong']);
				
			}
			/*if(layer==5){
			   str += "<tr><Th>合计</th><td>"+getResult(zzs,0)+"</td><td>"+getResult(zupje,2)+"</td>";
			   str += "<td>"+getResult(zzhong,2)+"</td>";
			   str += "<td>"+getResult(zshui,2)+"</td>";
			   str += "<td class=b1>"+getResult(zxj,2)+"</td>";
			   str += "</tr>";
			}else{*/
			   str += "<tr><Th>合计</th><td>"+getResult(zzs,0)+"</td>";
			   str += "<td>"+getResult(zuje,2)+"</td>";
			   str += "<td>"+getResult(zushui,2)+"</td>";
			   str += "<th>"+getResult(zuzhong+zushui-zuje,2)+"</th>";
			if(layer<5){ 
			   str += "<td>"+getResult(zupje,2)+"</td>";
			   //str += "<td>"+getResult(zzhong,2)+"</td>";
			   str += "<td>"+getResult(zshui,2)+"</td>";
			   str += "<th>"+(0-getResult(zxj,2))+"</th>";
			}
			   str += "<td>"+getResult(zmezc,2)+"</td>";
			   //str += "<td>"+getResult(zmezhong,2)+"</td>";
			   str += "<td>"+getResult(zmeshui,2)+"</td>";
			   str += "<th>"+getResult(zmeyk,2)+"</th>";
			   str += "<td>"+getResult(zypeilv,2)+"</td>";
			   
			   str += "<td>"+getResult(zyshui,2)+"</td>";
			   
			   str += "<th  class='b1 zyk'>"+getResult(zzyk,2)+"</th>";
			   str += "<td>"+getResult(zsendje,2)+"</td>";
			  // str += "<td>"+getResult(zsendzhong,2)+"</td>";
			   str += "<td>"+getResult(zsendshui,2)+"</td>";
			   str += "<th>"+getResult(zsendyk,2)+"</th>";
			   //str += "<td class=b1>"+getResult(zzyk,2)+"</td>";
			   str += "</tr>";
			//}
			$(".baotb").html(str);
			
			$(".baotb").css("left",5);
			$(".res").css('left',5);
			$(".h31").css('left',5);
			
			$(".h31").css("top",posi.top+heig);
			$(".baotb").css("top",posi.top+heig+$(".h31").height()+2);
			$(".res").css("top",posi.top+heig+$(".h31").height()+$(".baotb").height()+4);
	
			
			$(".h31").show();
			$(".res").show();
			$(".baotb").show();
			
			str=null;m=null;
			addfunc();
			//$("#test").html();
			$("h4 label").html(getResult(Number($(".baotb th.zyk").html()),2));
			//alert($(".baotb th:last").html());
			$("h5:eq(1)").find("label").html(getResult(Number($(".baotb th:last").html()),2));
			if(layer<5){ 
			    $("h5:eq(0)").find("label").html(getResult(0-Number($(".baotb tr:last").find("th:eq(2)").html()),2));
			}else{
				$("h5:eq(0)").find("label").html(getResult(0-Number($(".baotb tr:last").find("th:eq(1)").html()),2));
			}    
			$("h5:eq(2)").find("label").html(getResult(Number($(".baotb td.flyje").html()),2));
		    $(".baotb a.u").click(function(){

		       if($(this).attr('ifagent')=='0'){
				   if($(".nowuser").attr('layer')==$(this).attr('layer')){
				   }else{
				       $(".upuser").attr("uid",$(".nowuser").attr('uid'));
				       $(".upuser").attr("layer",$(".nowuser").attr('layer'));
				       $(".upuser").html($(".nowuser").html());
				   }
				   $(".nowuser").attr('uid',$(this).attr('uid'));
				   $(".nowuser").attr('layer',$(this).attr('layer'));
				   $(".nowuser").html($(this).html());
			       baouser($(this).attr('uid'),0);
			   }else if($(this).attr('func')=='baofly'){
				   $(".nowuser").attr('uid',$(this).attr('uid'));
				   $(".nowuser").attr('layer',$(this).attr('layer'));
				   $(".nowuser").html($(this).html());
			       baouser($(this).attr('uid'),1);
			   }else if($(this).attr('func')=='baoflywai'){
				   $(".nowuser").attr('uid',$(this).attr('uid'));
				   $(".nowuser").attr('layer',$(this).attr('layer'));
				   $(".nowuser").html($(this).html());
			       baouser($(this).attr('uid'),2);
			   }else{
				   //alert($(this).attr('layer'));
				   $(".upuser").attr("uid",$(".nowuser").attr('uid'));
				   $(".upuser").attr("layer",$(".nowuser").attr('layer'));
				   $(".upuser").html($(".nowuser").html());
				   $(".nowuser").attr('uid',$(this).attr('uid'));
				   $(".nowuser").attr('layer',$(this).attr('layer'));
				   $(".nowuser").html($(this).html());
				   //alert($(this).attr('uid'));
			       baoagent($(this).attr('uid'),Number($(this).attr('layer')));
			   }
			   $(".nowuser").html($(".nowuser").html().replace('---内补',''));
			   $(".nowuser").html($(".nowuser").html().replace('---外补',''));
		    });		
		 }
		
	});
}
var psize=50;
function baouser(uid,ttype){
	var q1=$("#qishu1").val();
	var q2=$("#qishu2").val();
	var bid=$("#bid").val();
	var cid=$("#cid").val();
	var sid=$("#sid").val();
	var uid=$(".nowuser").attr('uid');
	if(Number(q1)>Number(q2)) {alert('"上限期数"不能大于"下限期数"');return false;}
	
	var page = Number($("#page").val());
	var str = '&q1='+q1+"&q2="+q2+"&bid="+bid+"&cid="+cid+"&sid="+sid+"&uid="+uid+"&psize="+psize+"&page="+page;
	$(".flytb").hide();
	$(".flytbwai").hide();
	$("h4 label").html(0);
	$("h5").hide();
	$.ajax({
	    type:'POST',
		url:mulu + 'baox.php',
		data:'xtype=baouser'+str+"&ttype="+ttype,
		dataType:'json',
		success:function(m){
			//$("#test").html(m);
			var ml=m['tz'].length;
			var str='';
			var zje=0;
			var zshui=0;
			var zyk=0;
			var zzhong=0;
			var pagestr='';
			var pcount = Number(m['page']);
			for(i=1;i<=pcount;i++){
			    pagestr += "<a href='javascript:void(0);' ";
				if(page==i) pagestr += " class='blue' ";
				pagestr += " >";
				pagestr += i+"</a>";
			}
			
			str += "<tr><Td colspan=11>"+pagestr+"</td></tr>";
			str += "<tr><th>期数</th><th>时间</th><th>类型</th><th>玩法</th><th>内容</th><th>大盘</th><th>小盘</th><th>金额</th><th>退水</th><th>赔率</th><th>合计</th></tr>";
			for(i=0;i<ml;i++){
				
			   if(m['tz'][i]['bid']=='b'){
			       zyk += Number(m['tz'][i]['zhong']);
				   continue;
			   }
			   str += "<TR z='"+m['tz'][i]['z']+"'>";
			   str += "<td>"+m['tz'][i]['qishu']+"</td>";
			   str += "<td>"+m['tz'][i]['time']+"</td>";
			   str += "<td>"+m['tz'][i]['xtype']+"</td>";
			   str += "<td>"+m['tz'][i]['bid']+'-'+m['tz'][i]['cid']+'-'+m['tz'][i]['pid']+"</td>";
			   str += "<td class='ccon'>"+m['tz'][i]['con']+"</td>";
			   str += "<td>"+m['tz'][i]['abcd']+"</td>";
			   str += "<td>"+m['tz'][i]['ab']+"</td>";
			   str += "<td>"+m['tz'][i]['je']+"</td>";
			   str += "<td>"+m['tz'][i]['points']+"</td>";
			   str += "<td>"+m['tz'][i]['peilv']+"</td>";
			   //str += "<td>"+m['tz'][i]['zhong']+"</td>";
			   var yk = getResult(Number(m['tz'][i]['zhong'])+Number(m['tz'][i]['points'])-Number(m['tz'][i]['je']),2);
			   str += "<td>"+yk+"</td>";
			   zyk += yk;
			   zje += Number(m['tz'][i]['je']);
			   zshui += Number(m['tz'][i]['points']);
			   zzhong += Number(m['tz'][i]['zhong']);
			   str += "</TR>";
			}
			str += "<tr><td colspan=7></td><th>"+getResult(zje,2)+"</th><th>"+getResult(zshui,2)+"</th><td></td><!--<th>"+getResult(zzhong,2)+"</th--><th>"+getResult(zyk,2)+"</th></tr>";
			$(".baotb").html(str);
			$(".baotb a").click(function(){
		        $("#page").val($(this).html());
			    baouser(uid,ttype);
			});
			$(".res").css("top",posi.top+heig+$(".h31").height()+$(".baotb").height()+4);
			str=null;m=null;
            addfunc();
			$("h4 label").html(getResult(zyk,2));
			$(".baotb tr").each(function(){
			    if($(this).attr('z')=='1'){
				   $(this).find("td").addClass('z1');
				}else if($(this).attr('z')=='2'){
				   $(this).find("td").addClass('he');
				}else if($(this).attr('z')=='3'){
				   $(this).find("td").addClass('z3');
				}
			});
	           $(".baotb tr").mouseover(function(){
	               $(this).addClass('bover');
	           }).mouseout(function(){
	               $(this).removeClass('bover');
	           }).click(function(){
	               $(this).toggleClass('click');
	           });
		}
	});
}


function addfunc(){
			$(".baotb td").mouseover(function(){
		        $(this).parent().find("td").addClass('over');
			}).mouseout(function(){
		        $(this).parent().find("td").removeClass('over');
			});
}

function baofly(uid){
	var q1=$("#qishu1").val();
	var q2=$("#qishu2").val();
	var bid=$("#bid").val();
	var cid=$("#cid").val();
	var sid=$("#sid").val();
	var uid=$(".nowuser").attr('uid');
	if(Number(q1)>Number(q2)) {alert('"上限期数"不能大于"下限期数"');return false;}
	var str = '&q1='+q1+"&q2="+q2+"&bid="+bid+"&cid="+cid+"&sid="+sid+"&uid="+uid; 
	$(".flytb tr").each(function(i){
		 if(i>0) $(this).remove();
	});
	$.ajax({
	    type:'POST',
		url:mulu + 'baox.php',
		data:'xtype=baofly'+str,
		dataType:'json',
		success:function(m){
			//alert(m);
			//$("#test").html(m);
			var ml=m.length;
			var str='';
			var yk=getResult(Number(m['zhong']) + Number(m['points']) - Number(m['zje']),2);
			$(".flytb").append("<tr><td><a href='javascript:void(0)' class=b2>"+m['zs']+"</a></td><td>"+m['zje']+"</td><td>"+m['zhong']+"</td><td>"+m['points']+"</td><td class=b2>"+yk+"</td>");
			$(".flytb").show();
			$("h4 label").html(getResult(Number($("h4 label").html())+yk,2));
			$("h5:eq(1)").find("label").html(getResult(Number($("h5:eq(1)").find("label").html())+yk,2));
			$(".flytb .b2").click(function(){
			    baouser(uid,0);
			});
		}
	});
}

function baoflywai(uid){
	var q1=$("#qishu1").val();
	var q2=$("#qishu2").val();
	var bid=$("#bid").val();
	var cid=$("#cid").val();
	var sid=$("#sid").val();
	var uid=$(".nowuser").attr('uid');
	if(Number(q1)>Number(q2)) {alert('"上限期数"不能大于"下限期数"');return false;}
	var str = '&q1='+q1+"&q2="+q2+"&bid="+bid+"&cid="+cid+"&sid="+sid+"&uid="+uid; 
	$(".flytbwai tr").each(function(i){
		 if(i>0) $(this).remove();
	});
	$.ajax({
	    type:'POST',
		url:mulu + 'baox.php',
		data:'xtype=baoflywai'+str,
		dataType:'json',
		success:function(m){
			//alert(m);
			//$("#test").html(m);
			var ml=m.length;
			var str='';

			var yk=getResult(Number(m['zhong']) + Number(m['points']) - Number(m['zje']),2);
			$(".flytbwai").append("<tr><td><a href='javascript:void(0)' class=b2>"+m['zs']+"</a></td><td>"+m['zje']+"</td><td>"+m['zhong']+"</td><td>"+m['points']+"</td><td class=b2>"+yk+"</td>");
			$(".flytbwai").show();
			$("h4 label").html(getResult(Number($("h4 label").html())+yk,2));
			$("h5:eq(2)").find("label").html(getResult(Number($("h5:eq(2)").find("label").html())+yk,2));
			$(".flytbwai .b2").click(function(){
			    baouser(uid,2);
			});
		}
	});
}
//四舍五入到num后面的n位
function getResult(num,n){
  var tmp = Math.round(num*Math.pow(10,n))/Math.pow(10,n);
  if(Math.abs(tmp)<0.5) return 0;
  else return tmp;
}
//截取n位
function getresult(num,n){
  return num.toString().replace(new RegExp("^(\\-?\\d*\\.?\\d{0,"+n+"})(\\d*)$"),"$1")+0;
}