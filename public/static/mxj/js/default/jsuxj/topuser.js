function myready(){
    lotterysclick();
    if($(".moregame a").length==0) $(".more_game").hide();	
	frame.window.location.href = mulu + "make?xtype=show&gids="+$("#lotterys a.selected").attr('gid');
	//$(".ui-dialog" ).draggable();
	$(".sendtb").draggable();
	$(".gameset").draggable({cancel: '.ui-sortable'});
	//$(".ui-sortable-handle").draggable();
    $(".ui-sortable").sortable();
	$(".ui-button").hover(function(){$(this).addClass('ui-state-hover');},function(){$(this).removeClass('ui-state-hover');}); 
	
	//setTimeout($(".Notice").hide(),8000);
    $(".close_icon").click(function(){
    	$(this).parent().parent().parent().hide();
    	var i = Number($(this).parent().parent().parent().attr('i'))+1;
    	if($("#notice"+i).length==1){
            $("#notice"+i).show();
    	}else{
            $(this).parent().parent().parent().parent().hide();
    	}
    });
    $(".notice_button").click(function(){
    	$(this).parent().parent().hide();
    	var i = Number($(this).parent().parent().attr('i'))+1;
    	if($("#notice"+i).length==1){
            $("#notice"+i).show();
    	}else{
            $(this).parent().parent().parent().hide();
    	}
    });

    $(".notice_prev").click(function(){
    	var i = Number($(this).parent().parent().parent().attr('i'))-1;
    	if($("#notice"+i).length==1){
            $("#notice"+i).show();
            $(this).parent().parent().parent().hide();
    	}
    });
    $(".notice_next").click(function(){
    	var i = Number($(this).parent().parent().parent().attr('i'))+1;
    	if($("#notice"+i).length==1){
            $("#notice"+i).show();
            $(this).parent().parent().parent().hide();
    	}else{
    		$(this).parent().parent().parent().parent().hide();
    	}
    });

	$("#abcd").change(function(){
	    $("#frame")[0].contentWindow.lib();
	});
	
	$(".menu2 a").click(function(){
	    var url = $(this).attr('class');
		if(url==undefined | url=='' | url=='ck') return false;
		$(".sub div a").unbind("click");
		$(".sub div a").click(function(){
			var index = $(this).index();
			frame.window.location.href = mulu + "make?xtype=show&gids="+$("#lotterys a.selected").attr('gid')+"&menu="+index;
		});
		frame.window.location.href = mulu + url+"?xtype=show";
	});

	$(".more_game").mouseover(function(){
		var posi=$(this).position();
		$(".moregame").css("top",$(".top").height()-36);	
		$(".moregame").css("left",posi.left);	
		$(".moregame").show();
		/*
		if($(".moregames").width()>posi.left){	
		   $(".moregames").css("left",posi.left);	
		}else{ 
		   $(".moregames").css("left",posi.left+$(".more_game").width()-$(".moregames").width());	
		}
		$(".moregames").css("top",$(".top").height());	
		$(".moregames").show();*/
	});
    $(".moregames .itemmg div").click(function(){
    	var gid = $(this).parent().find("a").attr('gid');
    	var gname = $(this).parent().find("a span").html();
    	if($(this).hasClass('delbtn')){
    		$(".lotterys a.g"+gid).remove();
            $(this).removeClass('delbtn').addClass('addbtn');
    	}else{
    		if($(".lotterys a.g").length==8){
    			alert("至多选择八个彩种");
    			return false;
    		}
    		$(".lotterys .more_game:eq(0)").before('<a href="javascript:void(0)" gid="'+gid+'" class="g'+gid+' g"><span>'+gname+'</span></a>');
    		$(this).removeClass('addbtn').addClass('delbtn');
    	}
    	lotterysclick();
    });
    $(".moregames a").click(function(){
		$("#lotterys a").removeClass("selected");
		$(".more_game span").html($(this).find("span").html()+" ▼")
	    $("#result_info").attr('v',0);

	    $("#result_info div:eq(0)").html($(this).find("span").html());
        $("#result_info div:eq(1)").html('');
	    $("#result_balls").html('');
		 frame.window.location.href = mulu + "make?xtype=show&gids="+$(this).attr('gid');
	});	
    $(".moregames").mouseleave(function(){$(this).hide()});

	$(".editon button.gamebtn2").click(function(){
		$(".moregames").hide();
	});
	$(".editon button.gamebtn1").click(function(){
		$(".editoff").show();
		$(".editon button.gamebtn1").hide();
		$(".itemmg div").show();
	});
	$(".editoff button.gamebtn2").click(function(){
		$(".editoff").hide();
		$(".editon button.gamebtn1").show();
		$(".itemmg div").hide();
	});
	$(".itemmg div").hide();
    $(".editoff button.gamebtn1").click(function(){
    	garr=[];
    	$(".lotterys a.g").each(function(i){
            garr[i] = $(this).attr("gid");
    	});
    	if(garr.length==0){
    		alert("请至少选择一个彩种!");
    		return false;
    	}
	    $.ajax({
	    	type: 'POST',
		    url: mulu + 'userinfo',
		    cache: false,
		    data: 'xtype=setgid&garr='+JSON.stringify(garr),
		    success: function(m) {
                
		    	if(m=='1'){
		    		$(".editoff").hide();
		    		$(".editon button.gamebtn1").show();
		    		$(".itemmg div").hide();
		    		alert("保存成功");
		    	}else{
		    		alert('保存失败');
		    	}
		    }
		});
    });

	$(".moregame").mouseleave(function(){$(this).hide()});
	
    $(".moregame a").click(function(){
		$("#lotterys a").removeClass("selected");
		$(".more_game span").html($(this).find("span").html()+" ▼")
	    $("#result_info").attr('v',0);
	    $("#result_balls").html('');
		 frame.window.location.href = mulu + "make?xtype=show&gids="+$(this).attr('gid');
	});	
	$(".setting").click(function(){
	     $(".gameset").show();
	});
	$(".gameset .close").click(function(){
	    $(".gameset").hide();
	});
	
	$(".gameset .qr").click(function(){
		var i=0;
		garr={};
		$(".ui-sortable li").each(function(){
			if($(this).find("input:checkbox").prop("checked")){
                garr["g"+$(this).find("input:checkbox").val()] = i;
                garr["ok"+$(this).find("input:checkbox").val()] = 1;
                i++;
			}
		});
		$(".ui-sortable li").each(function(){
			if(!$(this).find("input:checkbox").prop("checked")){
                garr["g"+$(this).find("input:checkbox").val()] = i;
                garr["ok"+$(this).find("input:checkbox").val()] = 0;
                i++;
			}
		});
	    $.ajax({
	    	type: 'POST',
		    url: mulu + 'userinfo',
		    cache: false,
		    dataType:'json',
		    data: 'xtype=setgid&garr='+JSON.stringify(garr),
		    success: function(m) {
		    	//console.log(m);
		    	var ml = m.length;
		    	var ngid = $("#lotterys a.selected").attr('gid');
		    	$("#lotterys a").each(function(){
		    		if(!$(this).hasClass("more_game")){
		    			$(this).remove();
		    		}
		    	});
		    	$(".moregame").html("");
		    	var str = "";
		    	var nl = 0;
		    	var selected="";
		    	var j=0;
		    	for(i=0;i<ml;i++,j++){
		    		if(nl>7){
		    			break;
		    		}
		    		if(m[i]['ifok']!=1){
		    			continue;
		    		}
		    		selected="";
		    		if(ngid==m[i]['gid']){
		    			selected = " selected";
		    		}
		    		nl++;
                    str += '<a href="javascript:void(0)" gid="'+m[i]['gid']+'" class="g'+m[i]['gid']+' g'+selected+'"><span>'+m[i]['gname']+'</span></a>';
		    	}
                $("#lotterys").prepend(str);
                str="";
               
		    	if(nl>=7){
                    for(i=j;i<ml;i++){
                        if(m[i]['ifok']!=1){
		    			   continue;
		    		   }
		    		   selected="";
		    		   if(ngid==m[i]['gid']){
		    			  selected = " selected";
		    		   }
                       str += '<a href="javascript:void(0)" gid="'+m[i]['gid']+'"><span>'+m[i]['gname']+'</span></a>';
		    	   }
		    	   $(".moregame").html(str);
		    	   if(str!="") $(".more_game").show();
		    	   else $(".more_game").hide();
		    	   $(".more_game span").html("更多游戏 ▼");
		    	}
		    	
		    	$(".gameset").hide();
		    	lotterysclick();
		    	$(".moregame a").unbind("click");
		    	$(".moregame a").click(function(){
		            $("#lotterys a").removeClass("selected");
		            $(".more_game span").html($(this).find("span").html()+" ▼")
	                $("#result_info").attr('v',0);
	                $("#result_balls").html('');
		            frame.window.location.href = mulu + "make?xtype=show&gids="+$(this).attr('gid');
	            });	
		    	
		    }
		});
	});


	$("#skinPanel li a").click(function(i){
        var skin = $(this).parent().parent().attr("skin");
        $("#skinPanel ul li").removeClass("active");
        $(this).parent().parent().addClass("active");
        $("body").attr("class","skin_"+skin);
        $("#frame").contents().find("body").attr("class","skin_"+skin);
		setskin(skin);
	    
	});

	$("#sysdiv").css("left",$(window).width()-230);
	$("#sysdiv").css("top",$(window).height()-300);
}

function lotterysclick(){
	$("#lotterys a.g").unbind('click');
	 $("#lotterys a.g").click(function(){
		 if($(this).attr('gid')==undefined) return false;
		 $("#lotterys a").removeClass("selected");
	     $(this).addClass("selected");
	     $("#result_info").attr('v',0);
	     $("#result_info div:eq(0)").html($(this).find("span").html());
         $("#result_info div:eq(1)").html('');
	     $("#result_balls").html('');
		 frame.window.location.href = mulu + "make?xtype=show&gids="+$(this).attr('gid');
		 var getgid = $(this).attr('gid');
		if (getgid=='132') {
		    $(".sub div").hide();
		} else {
		    $(".sub div").show();
		}
	});
}

function getusermoney() {
	$.ajax({
		type: 'POST',
		url: mulu + 'userinfo',
		dataType: "json",
		cache: false,
		data: 'xtype=getusermoney',
		success: function(m) {
			
            var obj = $(".accounts");
			obj.find(".maxmoney").html(m[0]);
			obj.find(".money").html(m[1]);
			obj.find(".moneyuse").html(m[2]);
			obj.find(".kmaxmoney").html(m[3]);
			obj.find(".kmoney").html(m[4]);
			obj.find(".kmoneyuse").html(m[5]);
			obj.find(".fmaxmoney").html(m[3]);
			obj.find(".fmoney").html(m[4]);
			obj.find(".fmoneyuse").html(m[5]);
		}
	})
}

function setskin(skin){
	$.ajax({
	   url:mulu + 'make',
	   data:'xtype=skin&skin=skin_'+skin,
	   type:'POST',
	   success: function(m) {
	   }
	});
}