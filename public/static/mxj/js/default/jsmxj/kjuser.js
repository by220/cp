$(function() {
	$("li.lib").click(function(){
	   window.location.href = mulu + "lib.php?xtype=lib";
		return false;
	});
	$("li.kj").click(function(){
	   window.location.href = mulu + "kj.php?xtype=kj";
		return false;
	});
	$("li.bao").click(function(){
	   window.location.href = mulu + "bao.php?xtype=bao";
		return false;
	});
	$(".back").click(function(){
	    window.location.href= "nav.php";
		return false;
	});
	$(".game").change(function(){
	    getkj();
	});
	getkj();
});


function getkj(){
	var gid = Number($("select.game").val());
	
   ngid = gid;
   if(gid==107){
	  $(".hename").html("冠亚和"); 
	  }else if(gid==151 | gid==152){
	  $(".hename").html("三军"); 
	  }else{
		$(".hename").html("总和");  
		 }
		
	$.ajax({
		type: 'POST',
		url: 'kj.php',
		dataType: 'json',
		cache: false,
		data: "xtype=getkj&tpage=" + tspage + "&gid=" + gid,
		success: function(m) {
			//alert(m);return;
			//alert(m['sql']);
			var rcount = m['rcount'];
			var mnum = m['mnum'];
			var psize = m['psize'];
			m = m['kj'];
			var ml = m.length;
			var str = '';
			$(".con").empty();
			for (i = 0; i < ml; i++) {
				str += "<tr>";
				str += "<td>" + m[i]['qishu'] + "<BR />"+m[i]['kjtime']+"</td>";
				str += "<td>";
				for(j=1;j<=mnum;j++){
				   if(gid==100){
					 if(j==7) str += "T";
				     str += qiu6h(m[i]['m'][j-1]);
				   }else{
				     str += qiu(m[i]['m'][j-1]);
				   }
				   if(j==10 & (gid==161 | gid==162)) str+= "<BR />";
				   //alert(m[i]['m'][j-1]);
				   //str+= m[i]['m'][j-1];
				}
				
				str += "</td>";				
				str += "<td>";
				if(m[i]['hs']!=0){
				str  +=  m[i]['hs'] + "<BR />"+m[i]['ds']+ "/"+m[i]['dx'];
				}
				str += "</td>";
				str += "</tr>";
			}
	
			
			$(".con").append(str);

			var pcount = rcount % psize == 0 ? rcount / psize : (rcount - rcount % psize) / psize + 1;
			
			var pagestr='';
			for (i = 1; i <= pcount; i++) {
				pagestr += "<option value='"+i+"'>";
				pagestr += i + "</option>"
			}
			
			

			$(".page").html(pagestr);

			$(".page").val(tpage);
			$(".page").unbind("change");
			$(".page").change(function() {
				tpage = Number($(this).val());
				getkj();
				return false;
			})
		

			str = null;
			m = null;
			pagestr=null;
			$(".con tr").click(function() {
				$(this).toggleClass('byellow');
				return false
			})
		}
	})
}