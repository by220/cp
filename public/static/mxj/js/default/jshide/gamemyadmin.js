function myready() {
	
	changeh(document.documentElement.scrollHeight+500);
	
	$(".data_table tr").mouseover(function(){
		$(this).addClass("hover");
	}).mouseout(function(){
		$(this).removeClass("hover");
	});
	$(".ztb img").click(function() {
		var name = $(this).attr('class');
		var gid = $(this).parent().parent().find(".gid").html();
		var obj = $(this);
		$.ajax({
			type: 'POST',
			url: mulu + 'game',
			data: 'xtype=change&name=' + name + "&gid=" + gid,
			success: function(m) {
				obj.attr("src", globalpath + 'img/' + m + ".gif")
			}
		})
	});
	$(".edit").click(function() {
		var posi = $(this).position();
		var obj = $(this).parent().parent();
		$(".edittb").css("top", posi.top + $(this).height() + 5);
		$(".edittb").css("left", posi.left + $(this).width() - $(".edittb").width());
		$(".edittb").show();
		$(".edittb input:text").each(function() {
			var c = $(this).attr("class").split(' ');
			$(this).val(obj.find("." + c[0]).html())
		});
		var fast = obj.find("img.fast").attr('src').split(".gif");
		fast = fast[0].substring(strlen(fast[0]) - 1);
		$(".edittb .fast").val(fast);

		var autoopenpan = obj.find("img.autoopenpan").attr('src').split(".gif");
		autoopenpan = autoopenpan[0].substring(strlen(autoopenpan[0]) - 1);
		$(".edittb .autoopenpan").val(autoopenpan);

		var panstatus = obj.find("img.panstatus").attr('src').split(".gif");
		panstatus = panstatus[0].substring(strlen(panstatus[0]) - 1);
		$(".edittb .panstatus").val(panstatus);
		
		var otherstatus = obj.find("img.otherstatus").attr('src').split(".gif");
		otherstatus = otherstatus[0].substring(strlen(otherstatus[0]) - 1);
		$(".edittb .otherstatus").val(otherstatus);
		
		var havetm = obj.find("img.havetm").attr('src').split(".gif");
		havetm = havetm[0].substring(strlen(havetm[0]) - 1);
		$(".edittb .havetm").val(havetm);
		
		var baostatus = obj.find("img.baostatus").attr('src').split(".gif");
		baostatus = baostatus[0].substring(strlen(baostatus[0]) - 1);
		$(".edittb .baostatus").val(baostatus);
		var ifopen = obj.find("img.ifopen").attr('src').split(".gif");
		ifopen = ifopen[0].substring(strlen(ifopen[0]) - 1);
		$(".edittb .ifopen").val(ifopen);
		$(".edittb .gid").html(obj.find(".gid").html());
		$(".edittb .action").val("edit");
		var j = obj.index();
		var cstb = "<table class='tinfo wd100 stb'>";
		cstb += "<tr><th class='f'><input type='checkbox' class='sall '/></th><th class='s'>参数</th><th class='t'><input type='button' class='sadd btn1 btnf' value='添加'  /><input type='button' class='sdel btn1 btnf' value='删除'  /></th></tr>";
		for (var key in g[j]['cs']) {
			cstb += "<tr><th><input type='checkbox' /></th><td><input type='text' class='txt2' value='" + key + "' /></td><td><input type='text' class='txt2' value='" + g[j]['cs'][key] + "' /></td></tr>"
		}
		cstb += "</table>";
		$(".edittb .cs").html(cstb);
		var ftypetb = "<table class='tinfo wd100 stb'>";
		ftypetb += "<tr><th class='f1'><input type='checkbox' class='sall'/></th><th class='s1'>参数</th><th class='t1'></th><th class='fo1'>BC</th><th class='fi1'><input type='button' class='sadd btn1 btnf' value='添加'  /><input type='button' class='sdel btn1 btnf' value='删除'  /></th></tr>";
		for (var key in g[j]['ftype']) {
			ftypetb += "<tr><th><input type='checkbox' /></th><td>" + key + "</td><td><input type='text' class='txt2' value='" + g[j]['ftype'][key]['name'] + "' /></td><td><input type='text' class='txt2' value='" + g[j]['ftype'][key]['bc'] + "' /></td><td></td></tr>"
		}
		ftypetb += "</table>";
		$(".edittb .ftype").html(ftypetb);
		
		var dftypetb = "<table class='tinfo wd100 stb'>";
		dftypetb += "<tr><th class='f'><input type='checkbox' class='sall'/></th><th class='s'>参数</th><th class='t'><input type='button' class='sadd btn1 btnf' value='添加'  /><input type='button' class='sdel btn1 btnf' value='删除'  /></th></tr>";
		
		for (var key in g[j]['dftype']) {
			dftypetb += "<tr><th><input type='checkbox' /></th><td>" + key + "</td><td><input type='text' class='txt2' value='" + g[j]['dftype'][key] + "' /></td></tr>"
		}
		dftypetb += "</table>";
		$(".edittb .dftype").html(dftypetb);
		
		var mtypetb = "<table class='tinfo wd100 stb'>";
		mtypetb += "<tr><th  class='f'><input type='checkbox' class='sall'/></th><th  class='s'>参数</th><th  class='t'><input type='button' class='sadd btn1 btnf' value='添加'  /><input type='button' class='sdel btn1 btnf' value='删除'  /></th></tr>";
		for (var key in g[j]['mtype']) {
			mtypetb += "<tr><th><input type='checkbox' /></th><td>" + key + "</td><td><input type='text' class='txt2' value='" + g[j]['mtype'][key] + "' /></td></tr>"
		}
		mtypetb += "</table>";
		$(".edittb .mtype").html(mtypetb);
		var ztypetb = "<table class='tinfo wd100 stb'>";
		ztypetb += "<tr><th  class='f'><input type='checkbox' class='sall'/></th><th class='s'>参数</th><th  class='t'><input type='button' class='sadd btn1 btnf' value='添加'  /><input type='button' class='sdel btn1 btnf' value='删除'  /></th></tr>";
		for (var key in g[j]['ztype']) {
			ztypetb += "<tr><th><input type='checkbox' /></th><td>" + key + "</td><td><input type='text' class='txt2' value='" + g[j]['ztype'][key] + "' /></td></tr>"
		}
		ztypetb += "</table>";
		$(".edittb .ztype").html(ztypetb);
		
		var pantb = "<table class='tinfo wd100 stb'>";
		pantb += "<tr><th  class='f1'>class</th><th class='s1'>name</th><th  class='t1'>abcd</th><th  class='fo1'>ab</th><th  class='fi1'>ifok</th></tr>";
		for (var key in g[j]['pan']) {
			pantb += "<tr><td  class='f1'>" + g[j]['pan'][key]['class'] + "</td><td class='s1'><input type='text' class='txt2' value='" + g[j]['pan'][key]['name'] + "' /></td><td  class='t1'><input type='text' class='txt2' value='" + g[j]['pan'][key]['abcd'] + "' /></td><td  class='fo1'><input type='text' class='txt2' value='" + g[j]['pan'][key]['ab'] + "' /></td><td  class='fi1'><input type='text' class='txt2' value='" + g[j]['pan'][key]['ifok'] + "' /></td></tr>"
		}
		pantb += "</table>";
		$(".edittb .pan").html(pantb);
		changeh($(".edittb").height()*1.5);
		
		$(".cs .sadd").click(function() {
			var obj = $(this).parent().parent().parent();
			var html = "<tr><th><input type='checkbox' /></th><td><input type='text' class='txt2' value='' /></td><td><input type='text' class='txt2' value='' /></td></tr>";
			obj.append(html)
		});
		$(".cs .sdel").click(function() {
			var obj = $(this).parent().parent().parent();
			obj.find("tr:last").remove()
		});
		$(".ztype .sadd").click(function() {
			var obj = $(this).parent().parent().parent();
			var num = obj.find("tr:last td:first").html();
			if( num== undefined)  num=0;
			else num = Number(num) + 1;
			var html = "<tr><th><input type='checkbox' /></th><td>" + num + "</td><td><input type='text' class='txt2' value='' /></td></tr>";
			obj.append(html)
		});
		$(".ztype .sdel").click(function() {
			var obj = $(this).parent().parent().parent();
			obj.find("tr:last").remove()
		});
		$(".mtype .sadd").click(function() {
			var obj = $(this).parent().parent().parent();
			var num = obj.find("tr:last td:first").html();
			if( num== undefined)  num=0;
			else num = Number(num) + 1;
			var html = "<tr><th><input type='checkbox' /></th><td>" + num + "</td><td><input type='text' class='txt2' value='' /></td></tr>";
			obj.append(html)
		});
		$(".mtype .sdel").click(function() {
			var obj = $(this).parent().parent().parent();
			obj.find("tr:last").remove()
		});
		
		$(".ftype .sadd").click(function() {
			var obj = $(this).parent().parent().parent();
			var num = obj.find("tr:last td:first").html();
			if( num== undefined)  num=0;
			else num = Number(num) + 1;
			var html = "<tr><th><input type='checkbox' /></th><td>" + num + "</td><td><input type='text' class='txt2' value='' /></td><td><input type='text' class='txt2' value='' /></td><td></td></tr>";
			obj.append(html)
		});
		$(".ftype .sdel").click(function() {
			var obj = $(this).parent().parent().parent();
			obj.find("tr:last").remove()
		});
		
		$(".dftype .sadd").click(function() {
			var obj = $(this).parent().parent().parent();
			var num = obj.find("tr:last td:first").html();
			if( num== undefined)  num=0;
			else num = Number(num) + 1;
			var html = "<tr><th><input type='checkbox' /></th><td>" + num + "</td><td><input type='text' class='txt2' value='' /></td></tr>";
			obj.append(html);
			
			var trl = $(".pan .stb tr").length;
			if ((trl - 1) > (num + 1)) {
				$(".pan .stb tr").each(function(k) {
					if (k > 0) {
						if (k > num + 1) $(this).remove()
					}
				})
			}
			if ((trl - 1) < (num + 1)) {
				$(".dftype .stb tr").each(function(k) {
					if (k > 0) {
						if (k > trl - 1) {
							var html = "<tr><td>" + (k - 1) + "</td><td><input type='text' class='txt2' value='' /></td><td><input type='text' class='txt2' value='0' /></td><td><input type='text' class='txt2' value='0' /></td><td><input type='text' class='txt2' value='0' /></td></tr>";
							$(".pan .stb").append(html)
						}
					}
				})
			}
		});
		$(".dftype .sdel").click(function() {
			var obj = $(this).parent().parent().parent();
			obj.find("tr:last").remove();
			var num = Number(obj.find("tr:last td:first").html());
			var trl = $(".pan .stb tr").length;
			if ((trl - 1) > (num + 1)) {
				$(".pan .stb tr").each(function(k) {
					if (k > 0) {
						if (k > num + 1) $(this).remove()
					}
				})
			}
			if ((trl - 1) < (num + 1)) {
				$(".dftype .stb tr").each(function(k) {
					if (k > 0) {
						if (k > trl - 1) {
							var html = "<tr><td>" + (k - 1) + "</td><td><input type='text' class='txt2' value='' /></td><td><input type='text' class='txt2' value='0' /></td><td><input type='text' class='txt2' value='0' /></td></tr>";
							$(".pan .stb").append(html)
						}
					}
				})
			}
		});
		
	});
	$(".add").click(function() {
		$.ajax({
			type: 'POST',
			url: mulu + 'game',
			data: 'xtype=addgame',
			success: function(m) {
			    m=m.msg;
				if (Number(m) == 1) {
					window.location.href = window.location.href
				}
			}
		})
	});
	$(".close").click(function() {
		$(".edittb").hide()
	});
	$(".editnext").click(function() {
       var gid=$(".edittb").find(".gid").html();
	   var gname=$(".edittb").find(".gname").val();
	   var thisqishu=$(".edittb").find(".thisqishu").val();
	   var thisbml=$(".edittb").find(".thisbml").val();
	   var mnum=$(".edittb").find(".mnum").val();
	   var otherclosetime=$(".edittb").find(".otherclosetime").val();
	   var userclosetime=$(".edittb").find(".userclosetime").val();
	   var ifopen=$(".edittb").find(".ifopen").val();
	   var havetm=$(".edittb").find(".havetm").val();
	   var baostatus=$(".edittb").find(".baostatus").val();
	   var fast=$(".edittb").find(".fast").val();
	   
	   var panstatus=$(".edittb").find(".panstatus").val();
	   var otherstatus=$(".edittb").find(".otherstatus").val();
	   var autoopenpan=$(".edittb").find(".autoopenpan").val();
	   
	   var xsort=$(".edittb").find(".xsort").val();
	   var url=$(".edittb").find(".url").val();
	   var kjurl=$(".edittb").find(".kjurl").val();
	   var classs=$(".edittb").find(".class").val();
	   var fenlei = $(".edittb").find(".fenlei").val();
	   var flname = $(".edittb").find(".flname").val();
	   var sgname = $(".edittb").find(".sgname").val();

	   var str = "&baostatus="+baostatus+"&havetm="+havetm+"&ifopen="+ifopen+"&gid="+gid+"&gname="+gname+"&thisqishu="+thisqishu+"&thisbml="+thisbml;
	   str += "&mnum="+mnum+"&otherclosetime="+otherclosetime+"&userclosetime="+userclosetime+"&fast="+fast+"&autoopenpan="+autoopenpan+"&panstatus="+panstatus;
	   str += "&otherstatus="+otherstatus+"&xsort="+xsort+"&class="+classs+"&url="+url+"&kjurl="+kjurl+"&fenlei="+fenlei+"&flname="+flname+"&sgname="+sgname;
	   
	   var cs = '{';
	   var j=0;
	   $(".edittb .cs .stb").find("tr").each(function(i){
	         if(i>0){
			       if($(this).find("input:eq(1)").val()!='' & $(this).find("input:eq(2)").val()!=''){
					   if (j>0) cs += ',';
				       cs += '"'+$(this).find("input:eq(1)").val()+'":'+'"'+$(this).find("input:eq(2)").val()+'"';
					   j++;
				   }
			 }
	       
	   });
	   cs += "}";
	 
	   var mtype = '{';
	   var j=0;
	   $(".edittb .mtype .stb").find("tr").each(function(i){
	         if(i>0){
			       if($(this).find("input:eq(1)").val()!=''){
					   if (j>0) mtype += ',';
				       mtype += '"'+$(this).find("td:eq(0)").html()+'":'+'"'+$(this).find("input:eq(1)").val()+'"';
					   j++;
				   }
			 }
	       
	   });
	   mtype += "}";
	   
	   var ztype = '{';
	   var j=0;
	   $(".edittb .ztype .stb").find("tr").each(function(i){
	         if(i>0){
			       if($(this).find("input:eq(1)").val()!=''){
					   if (j>0) ztype += ',';
				       ztype += '"'+$(this).find("td:eq(0)").html()+'":'+'"'+$(this).find("input:eq(1)").val()+'"';
					   j++;
				   }
			 }
	       
	   });
	   ztype += "}";
	   str += '&cs='+cs+"&mtype="+mtype+"&ztype="+ztype;
	   
	   var ftype = '{';
	   var j=0;
	   $(".edittb .ftype .stb").find("tr").each(function(i){
	         if(i>0){
			       if($(this).find("input:eq(1)").val()!=''){
					   if (j>0) ftype += ',';
				       ftype += '"'+$(this).find("td:eq(0)").html()+'":{"class":"'+$(this).find("td:eq(0)").html()+'","name":"'+$(this).find("input:eq(1)").val()+'","bc":"'+$(this).find("input:eq(2)").val()+'"}';
					   j++;
				   }
			 }
	       
	   });
	   ftype += "}";
	   str += "&ftype="+ftype;
	   
	   
	   var dftype = '{';
	   var pan = '{';
	   var j=0;
	   $(".edittb .dftype .stb").find("tr").each(function(i){
			 if(i>0){
			     var index = $(this).index();
				 if(j>0){
				    dftype += ',';
					pan += ',';
				 }
				 dftype += '"'+$(this).find("td:eq(0)").html()+'":'+'"'+$(this).find("input:eq(1)").val()+'"';

				 
				 var obj = $(".edittb .pan").find("tr:eq("+index+")");
				 pan += '"'+$(this).find("td:eq(0)").html()+'":{"class":"'+$(this).find("td:eq(0)").html()+'","name":"'+$(this).find("input:eq(1)").val()+'","abcd":"'+obj.find("input:eq(1)").val()+'","ab":"'+obj.find("input:eq(2)").val()+'","ifok":"'+obj.find("input:eq(3)").val()+'"}';
				 
			     j++;
			 }	   
	   });
	   dftype += '}';
	   pan += '}';
	   
	   //str += '&ftype='+ftype+'&patt1='+patt1+'&patt2='+patt2+'&pan='+pan;
       str += '&dftype='+dftype+'&pan='+pan;
		$.ajax({
			type: 'POST',
			url: mulu + 'game',
			data: 'xtype=editgame' + str,
			success: function(m) {
			    m=m.msg;
				$("#test").html(m);
				if (Number(m) == 1) {
					window.location.href = window.location.href
				}
			}
		})
	});
	$(".dels").click(function() {
		if (!confirm("delete?")) return false;
		if (!confirm("delete???????????????????")) return false;
		var pass = prompt("请输入密码",'');
		var gid = $(this).parent().parent().find(".gid").html();
		$.ajax({
			type: 'POST',
			url: mulu + 'game',
			data: 'xtype=delgame&gid=' + gid+"&pass="+pass,
			success: function(m) {
			    m=m.msg;
				if (Number(m) == 1) {
					window.location.href = window.location.href
				}else if(Number(m) == 2){
					alert("密码错误！");
				}
			}
		})
	})
}
function strlen(sString) {
	var sStr, iCount, i, strTemp;
	iCount = 0;
	sStr = sString.split("");
	for (i = 0; i < sStr.length; i++) {
		strTemp = escape(sStr[i]);
		if (strTemp.indexOf("%u", 0) == -1) {
			iCount = iCount + 1
		} else {
			iCount = iCount + 2
		}
	}
	return iCount
}