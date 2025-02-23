// JavaScript Document
var thislayer=5;
var melayer=Number($("#topid").attr('layer'));
var layer=Number($("#topid").attr('layer'));

var level=new Array("大股东","股东","总代","代理","会员");
var topid=Number($("#topid").val());
var rtime=Number($("#reloadtime").val());
function myready(){
	$("label").addClass('red');
    $(".winprint").click(function(){
	   $(".xbody1").css("width",900);
       window.print() ;
	   $(".xbody1").css("width",1004);
    });  
    baoagent(topid,melayer);
   $(".query").click(function(){
      baoagent(topid,melayer);
	  //baoagent(23378724,melayer+1);
   }); 

 
   
}


function baoagent(uid,layer){
	var q1=$("#qishu1").val();
	var q2=$("#qishu2").val();

	if(Number(q1)>Number(q2)) {alert('"上限期数"不能大于"下限期数"');return false;}
	var str = '&q1='+q1+"&q2="+q2;
	

	$.ajax({
	    type:'POST',
		url:mulu + 'baox.php',
		data:'xtype=baolist2'+str,
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
			   str += "<tr><th rowspan=2>序号</th><th rowspan=2>类别</th><th rowspan=2>笔数</th><th rowspan=2>下注总额</th><th rowspan=2>退佣</th><th rowspan=2>会员盈亏</th><th colspan=7>代理</th></tr><tr><th>代理占成金额</th><th>退水</th><th>占成盈亏</th><th>补货金额</th><th>补货退水</th><th>补货盈亏</th><th>总盈亏</th></tr>";
			}else if(layer==1){
			   str += "<tr><th rowspan=2>序号</th><th rowspan=2>类别</th><th rowspan=2>笔数</th><th rowspan=2>下注总额</th><th rowspan=2>退佣</th><th rowspan=2>会员盈亏</th><th colspan=9>公司</th></tr><tr><th>公司占成金额</th><th>退水</th><th>占成盈亏</th><th>补货金额</th><th>补货退水</th><th>补货盈亏</th><th>赚水</th><th>赚赔率差</th><th>总盈亏</th></tr>";
			}else if(layer==2){
			   str += "<tr><th rowspan=2>序号</th><th rowspan=2>类别</th><th rowspan=2>笔数</th><th rowspan=2>下注总额</th><th rowspan=2>退佣</th><th rowspan=2>会员盈亏</th><th colspan=9>大股东</th></tr><tr><th>大股东占成金额</th><th>退水</th><th>占成盈亏</th><th>补货金额</th><th>补货退水</th><th>补货盈亏</th><th>赚水</th><th>赚赔率差</th><th>总盈亏</th></tr>";
			}else if(layer==3){
			   str += "<tr><th rowspan=2>序号</th><th rowspan=2>类别</th><th rowspan=2>笔数</th><th rowspan=2>下注总额</th><th rowspan=2>退佣</th><th rowspan=2>会员盈亏</th><th colspan=9>股东</th></tr><tr><th>股东占成金额</th><th>退水</th><th>占成盈亏</th><th>补货金额</th><th>补货退水</th><th>补货盈亏</th><th>赚水</th><th>赚赔率差</th><th>总盈亏</th></tr>";
			}else if(layer==4){
			  str += "<tr><th rowspan=2>序号</th><th rowspan=2>类别</th><th rowspan=2>笔数</th><th rowspan=2>下注总额</th><th rowspan=2>退佣</th><th rowspan=2>会员盈亏</th><th colspan=9>总代</th></tr><tr><th>总代占成金额</th><th>退水</th><th>占成盈亏</th><th>补货金额</th><th>补货退水</th><th>补货盈亏</th><th>赚水</th><th>赚赔率差</th><th>总盈亏</th></tr>";
			}else if(layer==5){
			  str += "<tr><th rowspan=2>序号</th><th rowspan=2>类别</th><th rowspan=2>笔数</th><th rowspan=2>下注总额</th><th rowspan=2>退佣</th><th rowspan=2>会员盈亏</th><th colspan=9>代理</th></tr><tr><th>代理占成金额</th><th>退水</th><th>占成盈亏</th><th>补货金额</th><th>补货退水</th><th>补货盈亏</th><th>赚水</th><th>赚赔率差</th><th>总盈亏</th></tr>";
			}
            var ml= m.length;
			for(i=0;i<ml;i++){
	            str += "<tr>";
				str += "<td>"+(i+1)+"</td>";
				str += "<td>"+m[i]['name']+"</td>";
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
				zcyk = getResult(Number(m[i]['zcje'])-Number(m[i]['zcshui'])-Number(m[i]['zczhong']),2)
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
			$(".baotb").html(str);


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