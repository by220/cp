var gatt, time0, time1, settime0, settime1, timek, settimek, gntime = 8,
    setgntime, upl, fastobj,tu;

function myready() {
    if(fenlei==107){
        $(".lrm_two_sides:eq(4) span").html("冠亚和");
    }
    
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("Safari") != -1 && app==1) {
        $(".main-content").css("height",$(".main-content").height()-50);
        $(".menulist").css("bottom","50px");
    }
    $(".menu").click(function() {
        $(".zhao").removeClass("ivfTfC").addClass("OSUUp");
        $(".menulist.iJamhB").removeClass("iJamhB").addClass("efUsXr");
    });
    $(".zhao").click(function() {
        $(".zhao").removeClass("OSUUp").addClass("ivfTfC");
        $(".menulist.efUsXr").removeClass("efUsXr").addClass("iJamhB");
        $(".gamelist").removeClass("hTJmgb").addClass("iULZxB");
        $(".gamemenu div").removeClass("gfEgAp").addClass("epExtR");
    });
    $(".gamemenu").click(function() {
        if ($(".gamelist").hasClass("iULZxB")) {
            $(".gamelist").removeClass("iULZxB").addClass("hTJmgb");
            $(".gamemenu div").removeClass("epExtR").addClass("gfEgAp");
            $(".zhao").removeClass("ivfTfC").addClass("OSUUp");
        } else {
            $(".gamelist").removeClass("hTJmgb").addClass("iULZxB");
            $(".gamemenu div").removeClass("gfEgAp").addClass("epExtR");
        }
    });
    $(".tops").click(function() {
        //$(".gamelist").removeClass("iULZxB").addClass("hTJmgb");
        //$(".gamemenu div").removeClass("gfEgAp").addClass("epExtR");
    });
    $(".gamelist span").click(function() {
        if ($(this).attr("gid")=='132') {
            window.location.href = "load?xtype=showfan&type=lib&gids=" + $(this).attr("gid");
        } else {
            window.location.href = "load?xtype=show&type=lib&gids=" + $(this).attr("gid");
        }
    });
    $(".uq_icon").click(function() {
        if($(".tzbody:visible").length==1){
            if ($(".edu").hasClass("bfHvQP")) {
               $(".edu").removeClass("bfHvQP").addClass("jdQhcW");
            } else {
               $(".edu").removeClass("jdQhcW").addClass("bfHvQP");
            }
        }else{
            if ($(".edus").hasClass("gSbRmf")) {
               $(".edus").removeClass("gSbRmf").addClass("dRtNjK");
            } else {
               $(".edus").removeClass("dRtNjK").addClass("gSbRmf");
            }
        }
        
    });
    $(".menuplay a:eq(2)").addClass("lrm_back");
    $(".refresh div").click(function() {
        clearTimeout(setgntime);
        lib();
        gntime = 8;
        gntimex();
    });
    time0 = Number($(".close").attr("time0"));
    time1 = Number($(".close").attr("time1"));
    timek = Number($(".open").attr("timek"));
    if (time0 < 0) time0 = 0 - time0;
    if (time1 < 0) time1 = 0 - time1;
    if (timek < 0) timek = 0;
    time0x();
    timekx();
    if (fenlei == 100) {
        time1x();
    }
    gntimex();

    lib();

    updatel();

    $(".clmenu").click(function(){
        $(".clmake").show();
        $(".ylmake").hide();
        $(".tzbody").hide();
        $(".backtz").show();
        $(".tops").hide();
        $(".edus").removeClass("dRtNjK").addClass("gSbRmf");
        $(".make").html('');
        $(".yls").html('');
        getcl();
    });

    $(".clmake select").change(function(){
        getcl();
    });

    $(".ylmenu").click(function(){
        $(".clmake").hide();
        $(".ylmake").show();
        $(".tzbody").hide();
        $(".backtz").show();
        $(".tops").hide();
        $(".edus").removeClass("dRtNjK").addClass("gSbRmf");
        $(".make").html('');
        $(".cls").html('');
        getyl();
    });
    $(".backtz .back").click(function(){
        $(".clmake").hide();
        $(".ylmake").hide();
        $(".tzbody").show();
        $(".backtz").hide();
        $(".tops").show();
        $(".menuplay a:eq(2)").click();
        $(".cls").html('');
        $(".yls").html('');
    });


    $(".ab span").click(function(){
        $(".ab span").removeClass("active");
        $(this).addClass("active");
        lib();
    });
    $(".menuplay a").click(function(){
        var menuhtml = $(this).find("span").html();
        if(menuhtml=='长龙' || menuhtml=='遗漏'){
            return false;
        }
        $(".menuplay a.lrm_back").removeClass("lrm_back");
        $(this).addClass("lrm_back");
        if(menuhtml=='番摊'){
            $(".tongji").html("番路");
            $(".tongjidiv .title").html("番路");
            $(".tongjidiv .cl").hide();
            $(".tongjidiv .lz").hide();            
            $(".tongjidiv .ftlu").show();
            $(".tongjidiv .tjmenu").hide();
        }else{
            $(".tongji").html("统计");
            $(".tongjidiv .title").html("统计");
            $(".tongjidiv .cl").show();
            $(".tongjidiv .lz").hide();
            $(".tongjidiv .ftlu").hide();
            $(".tongjidiv .tjmenu").show();
        }
        lib();
    });

    $(".tongji").click(function(){
        $(".tongjidiv").show();
    });

    $(".closetongji").click(function(){
        $(".tongjidiv").hide();
    });
    
    $(".tongjidiv .clctrl").click(function(){
         $(".tongjidiv .cl").show();
         $(".tongjidiv .lz").hide();
         $(".tongjidiv .lzctrl").removeClass("active");
         $(this).addClass("active")
    });

    $(".tongjidiv .lzctrl").click(function(){
         $(".tongjidiv .lz").show();
         $(".tongjidiv .cl").hide();
         $(".tongjidiv .clctrl").removeClass("active");
         $(this).addClass("active")
    });

    $(".menulist a").click(function() {
        var type = $(this).attr("type");
        if (type == 'home') {
           window.location.href = "home";
            //window.location.href = "make?xtype=show";
        } else if (type == "logout") {
           window.location.href = mulu + "home?logout=yes";
        } else if (type == "load") {
           window.location.href = "load?xtype=show";
        } else if(type!="" && type!=undefined){
            window.location.href = type;
        }
    });

    $(".tz .editje").click(function(){
         $(".fastje").show();
    });
    $(".tz .jelist li").click(function(){
        $(".tz .je").val($(this).find("a").html());
        $.cookie('yusheje',$(this).find("a").html());
        totalje();
    });
    $(".tz .je").keyup(function(){totalje();$.cookie('yusheje',$(this).val());}).keypress(function(){totalje();$.cookie('yusheje',$(this).val());}).blur(function(){totalje();$.cookie('yusheje',$(this).val());});
    $(".tz .cancel-btn").click(function(){
        $(".play.qiuselect").removeClass("qiuselect");
        $(".plays.qiuselect").removeClass("qiuselect");
        $(".dds.qiuselect").removeClass("qiuselect");
        $(".pg.isSelected").removeClass("isSelected");
        tzstatus(0);
    });
    $(".tz .jeqr").click(function(){
          var je = Number($(".tz .je").val()); 
          var minje=0;
          if($(".plays.qiuselect").length>0){
              minje = Number($(".plays.qiuselect").attr("minje"))
          }else if($(".clmake:visible").length==1 || $(".ylmake:visible").length==1){
              minje = Number($(".pg.isSelected").attr("minje"))
          }else{
              minje = Number($(".play.qiuselect").attr("minje"))
          }
          if(isNaN($(".tz .jeqr").attr('v')) || Number($(".tz .jeqr").attr('v'))<=1){
             $(".errmsg .swal-text").html("投注金额最低为"+minje);
             $(".errmsg").show();
             return false;
          }
          if(isNaN(je) || je%1!=0 || je==0 || je<minje){
             $(".errmsg .swal-text").html("投注金额最低为"+minje);
             $(".errmsg").show();
             return false;
          }
        exe(); 

    }); 
    $(".kuaisu").click(function(){
          var je = Number($(".jes").val()); 
          var minje=0;
          if($(".mt15 .active").length>0){
              minje = Number($(".mt15 .active").attr("minje"))
          }else if($(".clmake:visible").length==1 || $(".ylmake:visible").length==1){
              minje = Number($(".mt15 .active").attr("minje"))
          }else{
              minje = Number($(".mt15 .active").attr("minje"))
          }
        //   if(isNaN($(".tz .jeqr").attr('v')) || Number($(".tz .jeqr").attr('v'))<=1){
        //      $(".errmsg .swal-text").html("投注金额最低为"+minje);
        //      $(".errmsg").show();
        //      return false;
        //   }
          if(isNaN(je) || je%1!=0 || je<minje){
             $(".errmsg .swal-text").html("投注金额最低为"+minje);
             $(".errmsg").show();
             return false;
          }
        exe2(); 

    }); 
    
    $(".fanlu").click(function(){
          $('.bt-item').removeClass('active');
          $(this).addClass('active');
          $(".mt15").hide();
          $(".ftlu").show();
    }); 

    $(".yushei").change(function(){        
        if ($(".yushei").prop("checked")) {
            $.cookie('yushe', 1);
        } else {
            $.cookie('yushe', 0);
        }
    });
    if($.cookie('yushe')==1){
        $(".tz .je").val($.cookie('yusheje'));
        if (!$(".yushei").prop("checked")) {
            $(".yushe").click();
        }
    }
    $(".lastzd .lb_back").click(function(){$(".lastzd").removeClass("efUsXr").addClass("iJamhB");});

    $(".errmsg button").click(function(){
         $(".errmsg").hide();
    })

    $(".fastje .close").click(function(){
         $(".fastje").hide();
    });
    $(".fastje .setje").click(function(){
         var je=[];
         $(".fastje input[type='number']").each(function(i){
              var val = Number($(this).val());
              if(val<=0 || val%1!=0) val=5;
              je[i] = val;
         });
         $.ajax({
             type:'POST',
             url:mulu+'userinfo?xtype=fastje',
             data:'je='+JSON.stringify(je),
             cache: false,
             async:false,
             success:function(m){
                 for(var i in je){
                    $(".jelist a:eq("+i+")").html(je[i]);
                 }
                 $(".fastje").hide();
             }

         });
    });
    

}

function rhtmlcl(a,color) {
    var str = '<div class="sc-15w8fo-12 fwuVtQ"><div class="'+color+' sc-15w8fo-6 dCWcvu">'+a['name']+' '+a['peilv1']+'</div><div class="sc-15w8fo-13 loWSJd pg p'+a['pid']+' g'+a['gid']+' gp'+a['gid']+a['pid']+'"  bid="' + a["bid"] + '" pid="' + a["pid"] + '" sname="' + a["sname"] + '" cname="' + a["cname"] + '" mname="' + a["name"] + '" maxje="' + a["maxje"] + '" minje="' + a["minje"] + '" gid="'+a['gid']+'" peilv1="'+a['peilv1']+'"></div></div>';
    return str;
}

function getcl(){

    var qs = $(".clmake select").val();
    $.ajax({
        type: 'POST',
        url:mulu+'make',
        dataType: 'json',
        cache: false,
        async: false,
        data: 'xtype=getcl&qs='+qs,
        success: function(m) {
            m=m.msg;
            var ml = m.length;
            if(ml==0){
                $(".clsson").remove();
                $(".nocl").show();
                return;
            }
            $(".nocl").hide();
            var a,b;
            var str='';
            var imgs='';
            var xx='',yy='';
            for(i=0;i<ml/2;i++){
                a = m[i*2];
                b = m[i*2+1];
                if($(".cl"+a['gid']+a['pid']).length==1){
                    str += $(".cl"+a['gid']+a['pid']).prop("outerHTML");
                    continue;
                }
                str += '<div class="sc-15w8fo-0 cBIjaF clsson cl'+a['gid']+a['pid']+'"><div class="sc-15w8fo-2 hBroCu"><div class="title">'+a['gname']+'</div><div class="tag-text">';
                str += '“'+a['name']+'” 连开 '+a['zqishu']+' 期'; 
                if($.inArray(a['name'],['大','单','龙','冠亚大','总和大','总和双'])==-1){
                    imgs = '/css/mobi/img/yl_blue.png';
                }else{
                    imgs = '/css/mobi/img/yl_red.png';
                }
                if($.inArray(a['name'],['大','单','龙','冠亚大','总和大','总和单'])!=-1){
                    xx = rhtmlcl(a,'red');
                    yy = rhtmlcl(b,'blue');
                }else{
                    xx = rhtmlcl(b,'red');
                    yy = rhtmlcl(a,'blue');                   
                }              
                str += '</div></div><div class="sc-15w8fo-1 iTeeJf"><img class="sc-15w8fo-14 fKDGpr" src="'+imgs+'"></div><div class="sc-15w8fo-3 gKQGuI"><div class="sc-15w8fo-4 bDezmW"><div><div class="sc-15w8fo-6 dCWcvu">期数：'+a['qishu']+'期</div><div class="sc-15w8fo-6 dCWcvu">玩法：'+pkswf(a['sname'])+'</div></div><div class="sc-15w8fo-5 dhKHfI"><svg width="8.893" height="8.5"><g data-name="Group 34108" fill="none" stroke="#ccc" stroke-miterlimit="10"><g data-name="Ellipse 4638" transform="translate(.707 .977)"><ellipse cx="3.739" cy="3.761" rx="3.739" ry="3.761" stroke="none"></ellipse><ellipse cx="3.739" cy="3.761" rx="3.239" ry="3.261"></ellipse></g><path data-name="Line 1276" stroke-linecap="round" d="M4.505 4.704l1.074-1.129"></path><path data-name="Line 1277" stroke-linecap="round" d="M4.446.977V.5"></path><path data-name="Line 1278" stroke-linecap="round" d="M.707 1.833L1.811.729"></path><path data-name="Line 1279" stroke-linecap="round" d="M8.186 1.833L7.082.729"></path></g></svg><div class="sc-15w8fo-7 jFmBfH"><div class="times" v="'+a['closetime']+'"></div></div></div></div><div class="sc-15w8fo-8 gcvrPj"><div class="sc-15w8fo-9 gYsRSk"><svg class="pk-icon" width="13" height="16"><g data-name="Group 34633"><path data-name="Path 83039" d="M13 6.5c0 3.59-6.5 9.5-6.5 9.5S0 10.09 0 6.5A6.5 6.5 0 016.5 0 6.5 6.5 0 0113 6.5z" fill="#5f5f5f"></path><text transform="translate(2 9)" fill="#fff" font-size="7" font-family="ArialMT, Arial"><tspan x="0" y="0">PK</tspan></text></g></svg><div class="sc-15w8fo-10 hjBytt"><div class="colorr"></div></div></div></div><div class="sc-15w8fo-11 iOjRYn">';
                str += xx;
                str += yy;
                str += '</div></div></div>';
            }
            str += '<div class="sc-15w8fo-0 clsson" style="height:200px !important;"><BR><BR><BR><BR><BR><BR></div>';
            $(".cls").html(str);
            str = null;
            clylfunc();

        }
    });
}
function getyl(){
    $.ajax({
        type: 'POST',
        url:mulu+'make',
        dataType: 'json',
        cache: false,
        async: false,
        data: 'xtype=getcl&type=yl',
        success: function(m) {
            m=m.msg;
            var ml = m.length;
            if(ml==0){
                $(".ylsson").remove();
                //$(".noyl").show();
                return;
            }
            $(".nocl").hide();
            var a,b,c;
            var str='';
            for(i=0;i<ml/3;i++){
                a = m[i*3];
                b = m[i*3+1];
                c = m[i*3+2];
                if($(".yl"+a['gid']+a['pid']).length==1){
                    str += $(".yl"+a['gid']+a['pid']).prop("outerHTML");
                    continue;
                }
                str += '<div class="sc-1w5qirx-0 bfCaQY ylsson yl'+a['gid']+a['pid']+'"><div class="sc-1w5qirx-2 eJDhF"><div class="title">'+a['gname']+'</div><div class="tag-text">“'+a['name']+'” 遗漏 '+a['buzqishu']+' 期</div></div><div class="sc-1w5qirx-1 cmGoYq"><img class="sc-1w5qirx-11 gLqcai" src="/css/mobi/img/yl_green.png"></div><div class="sc-1w5qirx-3 jtVbVs"><div class="sc-1w5qirx-4 lgZVIB"><div><div class="sc-1w5qirx-6 duvsQC">期数：'+a['qishu']+'期</div><div class="sc-1w5qirx-6 duvsQC">玩法：'+pkswf(a['sname'])+'</div></div><div class="sc-1w5qirx-5 dnJhva"><svg width="8.893" height="8.5"><g data-name="Group 34108" fill="none" stroke="#ccc" stroke-miterlimit="10"><g data-name="Ellipse 4638" transform="translate(.707 .977)"><ellipse cx="3.739" cy="3.761" rx="3.739" ry="3.761" stroke="none"></ellipse><ellipse cx="3.739" cy="3.761" rx="3.239" ry="3.261"></ellipse></g><path data-name="Line 1276" stroke-linecap="round" d="M4.505 4.704l1.074-1.129"></path><path data-name="Line 1277" stroke-linecap="round" d="M4.446.977V.5"></path><path data-name="Line 1278" stroke-linecap="round" d="M.707 1.833L1.811.729"></path><path data-name="Line 1279" stroke-linecap="round" d="M8.186 1.833L7.082.729"></path></g></svg><div class="sc-1w5qirx-7 lmYNBz"><div class="times" v="'+a['closetime']+'"></div></div></div></div><div class="sc-1w5qirx-8 bjLcqY">';
                str += '<div class="sc-1w5qirx-9 fKFcGo"><div class="green sc-1w5qirx-6 duvsQC">'+a['name']+' / 漏 '+a['peilv1']+'</div><div class="sc-1w5qirx-10 emmWlu pg p'+a['pid']+' g'+a['gid']+' gp'+a['gid']+a['pid']+'"  bid="' + a["bid"] + '" pid="' + a["pid"] + '" sname="' + a["sname"] + '" cname="' + a["cname"] + '" mname="' + a["name"] + '" maxje="' + a["maxje"] + '" minje="' + a["minje"] + '" gid="'+a['gid']+'" peilv1="'+a['peilv1']+'"></div></div>';
                str += '<div class="sc-1w5qirx-9 fKFcGo"><div class="red sc-1w5qirx-6 duvsQC">'+b['name']+' / 热 '+b['peilv1']+'</div><div class="sc-1w5qirx-10 emmWlu pg p'+b['pid']+' g'+b['gid']+' gp'+b['gid']+b['pid']+'"  bid="' + b["bid"] + '" pid="' + b["pid"] + '" sname="' + b["sname"] + '" cname="' + b["cname"] + '" mname="' + b["name"] + '" maxje="' + b["maxje"] + '" minje="' + b["minje"] + '" gid="'+b['gid']+'" peilv1="'+a['peilv1']+'"></div></div>';
                str += '<div class="sc-1w5qirx-9 fKFcGo"><div class="blue sc-1w5qirx-6 duvsQC">'+c['name']+' / 冷 '+c['peilv1']+'</div><div class="sc-1w5qirx-10 emmWlu pg p'+c['pid']+' g'+c['gid']+' gp'+c['gid']+c['pid']+'"  bid="' + c["bid"] + '" pid="' + c["pid"] + '" sname="' + c["sname"] + '" cname="' + c["cname"] + '" mname="' + c["name"] + '" maxje="' + c["maxje"] + '" minje="' + c["minje"] + '" gid="'+c['gid']+'" peilv1="'+a['peilv1']+'"></div></div></div></div></div>';
            }
            str += '<div class="sc-15w8fo-0 ylsson" style="height:200px !important;"><BR><BR><BR><BR><BR><BR></div>';
            $(".yls").html(str);
            str = null
            clylfunc();

        }
    });
}
function clylfunc(){
    $(".pg").click(function(){
        $(this).toggleClass("isSelected");
           var zs = $(".pg.isSelected").length;
           $(".tz .tzzs").html("已选"+zs+"注")   
           if(zs>0){
                tzstatus(1);                           
           }else{
                tzstatus(0); 
           }
           totalje();
    }); 
    if($(".pg.isSelected").length>0){
         var zs = $(".pg.isSelected").length;
           $(".tz .tzzs").html("已选"+zs+"注")   
           if(zs>0){
                tzstatus(1);                           
           }else{
                tzstatus(0); 
           }
           totalje();
    }       
            
}
function pkswf(v){
    v = v.replace('3','三');
    v = v.replace('4','四');
    v = v.replace('5','五');
    v = v.replace('6','六');
    v = v.replace('7','七');
    v = v.replace('8','八');
    v = v.replace('9','九');
    v = v.replace('10','十');
    return v;
}
var pidduo = 999;
function lib() {
    var bid = $(".menuplay a.lrm_back").attr("bid");
    var bname = ngid=='132'?'':$(".menuplay a.lrm_back span").html();
    $(".tz").hide();
    if (bname == '特碼' | bname.substr(2, 1) == '特') {
        $(".abcdab").show();
        $(".abcdabs").show();
        $(".ab span:eq(0)").html(bname + "A");
        $(".ab span:eq(1)").html(bname + "B");
        $(".abcdab .xd").hide();
    } else {
        $(".abcdab").hide();
        $(".abcdabs").hide();
    }
    if (bname == '合肖' | bname == '連碼' | bname == '不中' | bname == '生肖連' | bname == '尾數連' | bname == '2字组合' | bname == '2字定位' | bname == '3字组合' | bname == '3字定位' | bname == '组选3' | bname == '组选6' | bname == '连码' | bname == '任选牛牛') {
        libs('d2')
    } else if (bname == '两面' || bname=="大小骰宝") {
        if (ngid=='132') {
            libs('a')
        } else {
            libs('sm')
        }
    } else if (bname == '1~10名') {
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
    } else if (bname == '总和龙虎' || bname == '总和') {
        libs('a')
    } else {
        libs('b');
    }

}

function libs(stype) {
    var ab = $(".ab span.active").attr("v")?$(".ab span.active").attr("v"):'A';
    var abcd = $(".abcd").val()?$(".abcd").val():'A';
    var bid = $(".menuplay a.lrm_back").attr("bid");
    if (ngid=='132') {
        bid = '23378780';
    }
    var bname = ngid=='132'?'':$(".menuplay a.lrm_back span").html();
    var sstr = "&bid=" + bid + "&abcd=" + abcd + "&ab=" + ab;
    $(".bcn_center2.items").remove();
    $(".rough_lines.items").remove();
    $.ajax({
        type: 'POST',
        url:mulu+'make',
        dataType: 'json',
        cache: false,
        async: false,
        data: 'xtype=lib&stype=' + stype + sstr + "&pid=" + pidduo,
        success: function(m) {
            m = m.msg;
            var ml = m.length;
            var str = '',
                str1 = '',
                str2 = '',
                strc = '';
            var tmpsid = 0,
                tmpcid = 0;
            var i = 0,
                j = 0,
                k = 0,
                l = 0;
            var key = [];
            var duo = 0;
            if (ngid=='132') {
                for (i = 0; i < ml; i++) {
                    var wfarr = m[i];
                    $('.wf'+wfarr['name']).attr({'bid':wfarr['bid'],'pid':wfarr['pid'],'sname':wfarr['sname'],'cname':wfarr['cname'],'mname':wfarr['mname'],'maxje':wfarr['maxje'],'minje':wfarr['minje'],'name':wfarr['name'],'pl':wfarr['peilv1']}).find('.odd,.dat').text(wfarr['peilv1']);
                }
            }
            if (bname == "两面" || bname=="大小骰宝") {
                if (fenlei == 107) {
                    str += rhtmls("冠、亚军和");
                    for (i = 0; i < ml; i++) { 
                        if(m[i]['sname']!="冠亚和") continue;
                        str += rhtmla(m[i]);
                    }
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                    for (i = 0; i < ml; i++) {
                        if(m[i]['sname']=="冠亚和") continue;
                        if (tmpsid != m[i]['sid']) {
                            if (tmpsid != 0) str += "</div></div></div></div><div class='rough_lines items'></div>";
                            str += rhtmls(m[i]['sname']);
                        }
                        str += rhtmla(m[i]);
                        tmpsid = m[i]['sid'];
                    }
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                } else if (fenlei == 101) {
                    for (i = 0; i < ml; i++) {
                        if (m[i]['bid'] != 23378763) continue;
                        if (j == 0) {
                            str += rhtmls(m[i]['bname']);
                        }
                        str += rhtmlc(m[i]);
                        j++;
                    }
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                    str1 = str;
                    str = '';
                    nm=[];
                    for (i = 0; i < ml; i++) {
                        if (m[i]['bid'] == 23378763 | m[i]['bid'] == 23378767) continue;
                        nm.push(m[i]);
                    }
                    var nml = nm.length;
                    key=[2,3,0,1,6,7,4,5,10,11,8,9,14,15,12,13,18,19,16,17];
                    var i;
                    for (k = 0; k < nml; k++) {
                        i = key[k];
                        if (tmpsid != nm[i]['sid']) {
                            if (tmpsid != 0) str += "</div></div></div></div><div class='rough_lines items'></div>";
                            str += rhtmls(nm[i]['sname']);
                        }
                        str += rhtmlc(nm[i]);
                        tmpsid = nm[i]['sid'];
                    }
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                    str2 = str;
                    str = '';
                    for (i = 0; i < ml; i++) {
                        if (m[i]['bid'] != 23378767) continue;
                        if (tmpsid != m[i]['sid']) {
                            if (tmpsid != 0) str += "</div></div></div></div><div class='rough_lines items'></div>";
                            str += rhtmls(m[i]['sname']);
                        }
                        str += rhtmlc(m[i]);
                        tmpsid = m[i]['sid'];
                    }
                    str = str1 + str2 + str;
                } else if (fenlei == 163) {
                    str = rhtmls("总和两面");
                    for (i = 0; i < ml; i++) {
                        if (!isNaN(m[i]['name']) || m[i]['bname']!='总和龙虎') continue;
                        str += rhtmla(m[i]);
                    }
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                    str1 = str;
                    str = '';
                    for (i = 0; i < ml; i++) {
                        if (m[i]['bid'] != 23378856) continue;
                        if (tmpsid != m[i]['sid']) {
                            if (tmpsid != 0) str += "</div></div></div></div><div class='rough_lines items'></div>";
                            str += rhtmls(m[i]['sname']);
                        }
                        str += rhtmla(m[i]);
                        tmpsid = m[i]['sid'];
                    }
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                    str = str1 + str;
                } else if (fenlei == 103) {
                    if (ngid=='132') {
                        for (i = 0; i < ml; i++) {
                            var wfarr = m[i];
                            $('.wf'+wfarr['name']).attr({'bid':wfarr['bid'],'pid':wfarr['pid'],'sname':wfarr['sname'],'cname':wfarr['cname'],'mname':wfarr['mname'],'maxje':wfarr['maxje'],'minje':wfarr['minje'],'name':wfarr['name'],'pl':wfarr['peilv1']}).find('.odd,.dat').text(wfarr['peilv1']);
                        }
                    } else {
                        var zhbid = 23378782;
                        if (fenlei == 121) zhbid = 23378797;
                        str += rhtmls("总和");
                        for (i = 0; i < ml; i++) {
                            if (m[i]['bid'] != zhbid) continue;
                            str += rhtmla(m[i]);
                        }
                        str += "</div></div></div></div><div class='rough_lines items'></div>";
                        for (i = 0; i < ml; i++) {
                            if (m[i]['bid'] == zhbid || m[i]['bid'] == 26000000) continue;
                            if (tmpsid != m[i]['sid']) {
                                if (tmpsid != 0) str += "</div></div></div></div><div class='rough_lines items'></div>";
                                str += rhtmls(m[i]['sname']);
                            }
                            str += rhtmlc(m[i]);
                            tmpsid = m[i]['sid'];
                        }
                        str += "</div></div></div></div><div class='rough_lines items'></div>";
                    }
                }else if (fenlei == 121) {
                    var zhbid = 23378782;
                    if (fenlei == 121) zhbid = 23378797;
                    str += rhtmls("总和");
                    for (i = 0; i < ml; i++) {
                        if (m[i]['bid'] != zhbid) continue;
                        str += rhtmla(m[i]);
                    }
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                    for (i = 0; i < ml; i++) {
                        if (m[i]['bid'] == zhbid || m[i]['bid'] == 26000000) continue;
                        if (tmpsid != m[i]['sid']) {
                            if (tmpsid != 0) str += "</div></div></div></div><div class='rough_lines items'></div>";
                            str += rhtmls(m[i]['sname']);
                        }
                        str += rhtmla(m[i]);
                        tmpsid = m[i]['sid'];
                    }
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                } else {
                    for (i = 0; i < ml; i++) {
                        if (tmpsid != m[i]['sid']) {
                            if (tmpsid != 0) str += "</div></div></div></div><div class='rough_lines items'></div>";
                            str += rhtmls(m[i]['sname']);
                        }
                        
                        if(fenlei==151){
                            str += rhtmlb(m[i]);
                        }else{
                            str += rhtmla(m[i]);
                        }
                        tmpsid = m[i]['sid'];
                    }
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                }
            }else if(bname=='冠亚和' || bname=='冠亚军组合' || bname=='总和龙虎' ){
                if(fenlei==163){
                    str = rhtmls("总和两面");
                    for (i = 0; i < ml; i++) {
                        if (!isNaN(m[i]['name'])) continue;
                        str += rhtmla(m[i]);
                    }
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                    str1 = str;
                    str = '';
                    str = rhtmls("总和数");
                    for (i = 0; i < ml; i++) {
                        if (isNaN(m[i]['name'])) continue;
                        str += rhtmlb(m[i]);
                    }
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                    str2 = str;
                    str = str1+str2;
                }else{
                    str += rhtmls(bname);
                    for (i = 0; i <ml; i++) {
                        str += rhtmlc(m[i]);
                    }
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                }
            }else if(bname=='1~5'| bname=='1~3'){
                key=[2,3,0,1,4,5,6,7,8,9,10,11,12,13];
                var kl = key.length;
                var i;
              for(j=0;j<5;j++){
                    for(k=0;k<14;k++){
                        i = j*14+key[k];
                        if(tmpsid!=m[i]['sid']){
                          if(tmpsid!=0) str += "</div></div></div></div><div class='rough_lines items'></div>";
                          str += rhtmls(m[i]['sname']);
                        }
                        str += rhtmlb(m[i]);
                        tmpsid = m[i]['sid'];
                    }                        
                }

                str += "</div></div></div></div><div class='rough_lines items'></div>";
            }else if(bname=='1~10名' | bname=='1~5球号' | bname=='1~8球号'  | bname=='正码'){
                    for (i = 0; i <ml; i++) {
                        if(isNaN(m[i]['name'])) continue;
                        if(tmpsid!=m[i]['sid']){
                          if(tmpsid!=0) str += "</div></div></div></div><div class='rough_lines items'></div>";
                          str += rhtmls(m[i]['sname']);
                        }
                        str += rhtmlb(m[i]);
                        tmpsid = m[i]['sid'];
                    }
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
            }else if(bname=='2字和数' || bname=='3字和数' || bname=='牛牛梭哈' || bname=='跨度' || bname=='前中后三' || bname=='前三' || bname=='特肖' || bname=='半波' || bname=='五行' || bname=='一肖' || bname=='尾數' || bname=='尾数'  || bname=='正肖'){
                    for (i = 0; i <ml; i++) {
                        if(tmpsid!=m[i]['sid']){
                          if(tmpsid!=0) str += "</div></div></div></div><div class='rough_lines items'></div>";
                          str += rhtmls(m[i]['sname']);
                        }
                        str += rhtmlb(m[i]);
                        tmpsid = m[i]['sid'];
                    }
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
            }else if(bname=='1字组合' || bname=='特头尾' || bname=='总肖七色波'  || bname=='番摊'){
                    for (i = 0; i <ml; i++) {
                        if(tmpcid!=m[i]['cid']){
                          if(tmpcid!=0) str += "</div></div></div></div><div class='rough_lines items'></div>";
                          str += rhtmls(m[i]['cname']);
                        }
                        str += rhtmlb(m[i]);
                        tmpcid = m[i]['cid'];
                    }
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
            }else if(bname.indexOf("第")!=-1 | (bname.indexOf("正")!=-1 && bname.indexOf("特")!=-1) | bname=='特碼' | bname=='正碼'){
                    str += rhtmls(bname);
                    for (i = 0; i <ml; i++) {
                        if(isNaN(m[i]['name'])) continue;
                        str += rhtmlb(m[i]);
                        tmpsid = m[i]['sid'];
                    }
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                    str += rhtmls("双面");
                    for (i = 0; i <ml; i++) {
                        if(!isNaN(m[i]['name'])) continue;
                        if(fenlei==103 || fenlei==100) str += rhtmlb(m[i]);
                        else str += rhtmla(m[i]);
                        tmpsid = m[i]['sid'];
                    }
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
            }else  if (bname == '合肖' | bname == '連碼' | bname == '不中' | bname == '生肖連' | bname == '尾數連' | bname == '2字组合' | bname == '2字定位' | bname == '3字组合' | bname == '3字定位' | bname == '组选3' | bname == '组选6' | bname == '连码'  | bname == '任选牛牛'){          
                    str += rhtmlsduo();
                    var pnamea,znums;
                    for (i = 0; i <ml; i++) {                       
                        if (m[0]['pidduo'] == m[i]['pid']) {
                          pnamea = m[i]['name'];
                          znums = Number(m[i]['znum1']);
                          str += rhtmlduo(m[i],bname,1);
                        }else{
                          str += rhtmlduo(m[i],bname,0);
                        }
                    }
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
             
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
                            str1 += rhtmls("选择" + pnamea.substr(0, 1) + "位(多选自动组合)");
                            j = 1
                        } else if (i == 10) {
                            str1 += "</div></div></div></div><div class='rough_lines items'></div>";
                            str1 +=rhtmls("选择" + pnamea.substr(1, 1) + "位");
                            j = 2
                        }
                    }
                    if (bname == '3字定位') {
                        if (i == 0) {
                            str1 += rhtmls("选择" + pnames.substr(0, 1) + "位");
                            j = 1
                        } else if (i == 10) {
                            str1 += "</div></div></div></div><div class='rough_lines items'></div>";
                            str1 += rhtmls("选择" + pnames.substr(1, 1) + "位");
                            j = 2
                        } else if (i == 20) {
                            str1 += "</div></div></div></div><div class='rough_lines items'></div>";
                            str1 += rhtmls("选择" + pnames.substr(2, 1) + "位");
                            j = 3
                        }
                    }
                    if (pnamea == '选前二直选') {
                        if (i == 0) {
                            str1 += rhtmls("选择第1球(多选自动组合)");
                            j = 1
                        } else if (i == 11) {
                            str1 += "</div></div></div></div><div class='rough_lines items'></div>";
                            str1 += rhtmls("选择第2球");
                            j = 2
                        }
                    }
                    if (pnamea == '选前三直选') {
                        if (i == 0) {
                            str1 += rhtmls("选择第1球(多选自动组合)");
                            j = 1
                        } else if (i == 11) {
                            str1 += "</div></div></div></div><div class='rough_lines items'></div>";
                            str1 += rhtmls("选择第2球");
                            j = 2
                        } else if (i == 22) {
                            str1 += "</div></div></div></div><div class='rough_lines items'></div>";
                            str1 += rhtmls("选择第3球");
                            j = 3
                        }
                    }
                    if (pnamea == '选三前直') {
                        if (i == 0) {
                            str1 += rhtmls("选择第1球(多选自动组合)");
                            j = 1
                        } else if (i == 20) {
                            str1 += "</div></div></div></div><div class='rough_lines items'></div>";
                            str1 += rhtmls("选择第2球");
                            j = 2
                        } else if (i == 40) {
                            str1 += "</div></div></div></div><div class='rough_lines items'></div>";
                            str1 += rhtmls("选择第3球");
                            j = 3
                        }
                    }
                    str2 += rhtmlduohm2(m[0]['duo'][0][i],m[0]['duo'][0][i]);
                    
                    peilv[0] = rpeilv(m[0]['duo'][1][i], m[m[0]['index']]['ifok']);
                    var p=1;
                    if (bname == '2字组合' | bname == '三中二' | bname == '二中特') {
                         p=2;
                         peilv[1] = rpeilv(m[0]['duo'][2][i], m[m[0]['index']]['ifok']);
                    }
                    if (bname == '3字组合') {
                         p=3;
                         peilv[1] = rpeilv(m[0]['duo'][2][i], m[m[0]['index']]['ifok']);
                         peilv[2] = rpeilv(m[0]['duo'][3][i], m[m[0]['index']]['ifok']);
                    }
                    if(j==2){
                        str1 += rhtmlduohm(m[0]['duo'][0][i],peilv,m[0]['duo'][0][i],p).replace(/d1/g, 'd2');
                    }else if(j==3){
                        str1 += rhtmlduohm(m[0]['duo'][0][i],peilv,m[0]['duo'][0][i],p).replace(/d1/g, 'd3');
                    }else{
                        str1 += rhtmlduohm(m[0]['duo'][0][i],peilv,m[0]['duo'][0][i],p);  
                    }
                    
                    
                }

                
                if (bname == '2字组合') {
                    str += rhtmls("第1个投注号码");
                    str += str1;
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                    str += rhtmls("第2个投注号码");
                    str += str2;
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                } else if (bname == '3字组合') {
                    str += rhtmls("第1个投注号码");
                    str += str1;
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                    str += rhtmls("第2个投注号码");
                    str += str2;
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                    str += rhtmls("第3个投注号码");
                    str += str2.replace(/d2/g, 'd3');
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                } else if (pnamea == '选二连直') {
                    str += rhtmls("选择第1球(多选自动组合)");
                    str += str1;
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                    str += rhtmls("第2球");
                    str += str1.replace(/d1/g, 'd2');
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                } else if (pnamea == '选三前直' | pnamea == '选前三直选'  | pnamea == '选前二直选'  | bname == '3字定位' | bname == '2字定位') {
                    str += str1;
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                } else {
                    str += rhtmls("号码选择");
                    str += str1;
                    str += "</div></div></div></div><div class='rough_lines items'></div>";
                }
                duo=1;
            }
            $(".make").append(str);
            str = null;
            if(duo==1){

            }
            addfunc(duo);
        }
    })
}
function addfunc(duo){
    if(duo==1){
        $(".plays").click(function(){
            $(".plays.qiuselect").removeClass("qiuselect");
            $(this).addClass("qiuselect");
            pidduo=$(this).attr("pid");
            lib();
            $(".tz").animate({height:'0px'});
            $(".tz").hide();
        });
        $(".dds").click(function(){
            $(this).toggleClass("qiuselect");
            var znum1 = Number($(".plays.qiuselect").attr("znum1"));
            var pname = $(".plays.qiuselect").attr("mname");
            var bname = $(".menuplay a.lrm_back span").html();
            if (pname=="三中二") znum1 = 3;
            
            if (bname == '2字组合' | bname == '2字定位' | pname == '选前二直选' | pname == '选二连直') {

                var dnum1 = $(".d1.qiuselect").length;
                var dnum2 = $(".d2.qiuselect").length;
                if(dnum1>0 && dnum2>0){
                    tzstatus(1);                       
                }else{
                    tzstatus(0);  
                }

            }else if (bname == '3字组合' | bname == '3字定位' | pname == '选前三直选' | pname == '选三前组') {
                var dnum1 = $(".d1.qiuselect").length;
                var dnum2 = $(".d2.qiuselect").length;
                var dnum3 = $(".d3.qiuselect").length;
                if(dnum1>0 && dnum2>0 && dnum3>0){
                    tzstatus(1);                         
                }else{
                    tzstatus(0);  
                }
            }else{
                if($(".dds.qiuselect").length>=znum1){
                    tzstatus(1);
                }else{
                    tzstatus(0); 
                }
            }
            totalje();
        });
    }else{
        $(".play").click(function(){
            $(this).toggleClass("qiuselect");
            var zs = $(".play.qiuselect").length;
            $(".tz .tzzs").html("已选"+zs+"注")   
            if(zs>0){
                tzstatus(1);                           
           }else{
                tzstatus(0); 
           }
           totalje();
        });
    }
    $("a.bt_icon.open").click(function(){
        var obj = $(this).parent().next();
        if(obj.height()==0){
             obj.css("overflow","");
             obj.animate({height:obj.attr('hi')+'px'});
             obj.css("height","auto");
        }else{
            obj.attr("hi",obj.height());
            obj.css("overflow","hidden");
            obj.animate({height:'0px'});            
        }        
    });
    
}
function tzstatus(v){
    if(v==1){
        if($(".tz").is(":hidden")){
            $(".tz").show();
            $(".tz").animate({height:'117px'});
            if($.cookie("yushe")!=1){
                 $(".tz .je").val('');
            }
        }
    }else{
        $(".tz").animate({height:'0px'});
        $(".tz").hide();
    }
}
function totalje(){
    var je = Number($(".tz .je").val());
    var zs=0;
    if($(".plays.qiuselect").length>0){
        var pname = $(".plays.qiuselect").attr("mname");
        var bname = $(".menuplay a.lrm_back span").html();
        if (bname == '2字组合' | bname == '2字定位' | pname == '选前二直选' | pname == '选二连直') {
            var dnum1 = $(".d1.qiuselect").length;
            var dnum2 = $(".d2.qiuselect").length;
            zs = dnum1*dnum2;
        }else if (bname == '3字组合' | bname == '3字定位' | pname == '选前三直选' | pname == '选三前组') {
            var dnum1 = $(".d1.qiuselect").length;
            var dnum2 = $(".d2.qiuselect").length;
            var dnum3 = $(".d3.qiuselect").length;
            zs = dnum1*dnum2*dnum3;
        }else{
            var znum1 = Number($(".plays.qiuselect").attr('znum1'));
            if(pname=='三中二') znum1 = 3;
            arr=[];
            $(".d1.qiuselect").each(function(i){
                arr[i] = $(this).attr("m");
            });
            zarr = [];
            zarr = C(arr,znum1);
            zs = zarr.length;
        }
        if(!isNaN(je) && zs>0){
            $(".tz .jeqr").html("确认 "+(je*zs));
            $(".tz .jeqr").attr('v',je*zs);
        }else{
            $(".tz .jeqr").html("确认 0");
            $(".tz .jeqr").attr('v',0);
        }

    }else{
        if($(".clmake:visible").length==1){
            zs = $(".clmake .pg.isSelected").length;
        }else if($(".ylmake:visible").length==1){
            zs = $(".ylmake .pg.isSelected").length;
        }else{
            zs = $(".play.qiuselect").length;
        }

        if(!isNaN(je) && zs>0){
            $(".tz .jeqr").html("确认 "+(je*zs));
            $(".tz .jeqr").attr('v',je*zs);
        }else{
            $(".tz .jeqr").html("确认 0");
            $(".tz .jeqr").attr('v',0);
        }
    }
}
    

function exe() {
    var je = Number($(".tz .je").val());
    var i = 0,
    bname, sname, cname;
    play = [];
    if($(".plays.qiuselect").length>0){
        var znum1 = Number($(".plays.qiuselect").attr("znum1"));
        var pname = $(".plays.qiuselect").attr("mname");
        var bname = $(".menuplay a.lrm_back span").html();
        if(pname=='三中二') znum1=3;
        var aone = [];
        var atwo = [];
        var pone = [];
        var ptwo = [];
        var pid = $(".plays.qiuselect").attr("pid");
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
            $(".dds.d1").each(function() {
                if ($(this).hasClass('qiuselect')) {
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
            $(".dds.d2").each(function() {
                if ($(this).hasClass('qiuselect')) {
                    atwo[i] = [];
                    var j;
                    if (bname == '2字组合' | bname == '3字组合') {
                        atwo[i]['n'] = $(this).attr('m');
                        j =  $(this).attr('pid');
                        atwo[i]['p'] = [];
                        atwo[i]['p'][0] = Number($(".dds.d1.p"+j).find(".peilv1").html());
                        if (bname == '2字组合') {
                            atwo[i]['p'][1] = Number($(".dds.d1.p"+j).find(".peilv2").html());
                        }
                        if (bname == '3字组合') {
                            atwo[i]['p'][1] = Number($(".dds.d1.p"+j).find(".peilv2").html());
                            atwo[i]['p'][2] = Number($(".dds.d1.p"+j).find(".peilv3").html());
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
                $(".dds.d3").each(function() {
                    if ($(this).hasClass('qiuselect')) {
                        var j;
                        if (bname == '3字组合') {
                            ashree[i] = [];
                            ashree[i]['n'] = $(this).attr('m');
                            j = $(this).attr('pid');
                            ashree[i]['p'] = [];
                            ashree[i]['p'][0] = Number($(".dds.d1.p"+j).find(".peilv1").html());
                            if (bname == '3字组合') {
                                ashree[i]['p'][1] = Number($(".dds.d1.p"+j).find(".peilv2").html());
                                ashree[i]['p'][2] = Number($(".dds.d1.p"+j).find(".peilv3").html());
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
            var dw = 0;
            if (bname == '2字定位' | bname == '3字定位' | pname == '选前二直选' | pname == '选二连直' | pname == '选前三直选' | pname == '选三前直') {
                dw=1;
            }
            var al = aall.length;
            if (al > 512) {
                $(".errmsg .swal-text").html("您选择的号码太多!");
                $(".errmsg").show();
                return false;
            }
            i = al;
            for (i = 0; i < al; i++) {
                play[i] = [];
                play[i]['gid'] = ngid;
                play[i]['pid'] = pid;
                play[i]['name'] = pname;
                play[i]['je'] = je;
                if(dw==1){
                    play[i]['con'] = aall[i]['n'];
                }else{
                    play[i]['con'] = aall[i]['n'].sort();
                }
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
                znum = Number($(".plays.qiuselect").attr("znum1"));
            }
            if ($(".dds.d1.qiuselect").length < znum) {
                $(".errmsg .swal-text").html("您选的项目不足，最少选择" + znum + "个");
                $(".errmsg").show();
                return false;
            }
            $(".dds.d1.qiuselect").each(function(i) {
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
                play[i]['gid'] = ngid;
                play[i]['pid'] = pid;
                play[i]['name'] = pname;
                play[i]['je'] = je;
                play[i]['con'] = aall[i].sort();
                play[i]['peilv1'] = peilvmin(aall[i], pone);
                if (pname == '三中二' | pname == '二中特') {
                   play[i]['peilv2'] = 0;
                }
            }
            aall = null;
            aone = null;
            pone = null;
            ptwo = null;
        }
    }else if($(".clmake:visible").length==1  || $(".ylmake:visible").length==1){
        pidarr = [];
        i=0;
        var je = $(".tz .je").val();
        $(".pg.isSelected").each(function() {
            if ($.inArray($(this).attr('pid'), pidarr)==-1) {
                pidarr[i] = $(this).attr('pid');
                play[i] = [];
                play[i]['pid'] = $(this).attr('pid');
                play[i]['bid'] = $(this).attr('bid');
                play[i]['je'] = je;
                play[i]['name'] = $(this).attr('mname');
                play[i]['peilv1'] = $(this).attr("peilv1");
                play[i]['con'] = '';
                play[i]['bz'] = '';
                play[i]['gid'] = $(this).attr("gid");
                sname = $(this).attr('sname');
                cname = $(this).attr('cname');
                bname = $(this).attr('bname')
                if (sname == '1字组合' || sname == '跨度') {
                    play[i]['wf'] = cname + ": "+play[i]['name']
                } else if ((bname == '总和龙虎' || bname == '总和') && !isNaN(play[i]['name'])) {
                    play[i]['wf'] = cname + ": "+play[i]['name']
                } else if (bname == '3字和数' && !isNaN(play[i]['name'])) {
                    play[i]['classx'] = sname + '-' + cname + ": "+play[i]['name']
                } else if (bname == '其他') {
                    play[i]['wf'] = sname + '-' + cname + ": "+play[i]['name']
                } else {
                    play[i]['wf'] = sname + ": "+play[i]['name']
                }

                i++
            }
        });
    }else {
        pidarr = [];
        i=0;
        var je = $(".tz .je").val();
        $(".play.qiuselect").each(function() {
            if ($.inArray($(this).attr('pid'), pidarr)==-1) {
                pidarr[i] = $(this).attr('pid');
                play[i] = [];
                play[i]['pid'] = $(this).attr('pid');
                play[i]['bid'] = $(this).attr('bid');
                play[i]['je'] = je;
                play[i]['name'] = $(this).attr('mname');
                play[i]['peilv1'] = $(this).find(".peilv1").html();
                play[i]['con'] = '';
                play[i]['bz'] = '';
                play[i]['gid'] = ngid;
                sname = $(this).attr('sname');
                cname = $(this).attr('cname');
                bname = $(".menuplay a.lrm_back span").html();
                if (sname == '1字组合' || sname == '跨度') {
                    play[i]['wf'] = cname + ": "+play[i]['name']
                } else if ((bname == '总和龙虎' || bname == '总和') && !isNaN(play[i]['name'])) {
                    play[i]['wf'] = cname + ": "+play[i]['name']
                } else if (bname == '3字和数' && !isNaN(play[i]['name'])) {
                    play[i]['classx'] = sname + '-' + cname + ": "+play[i]['name']
                } else if (bname == '其他') {
                    play[i]['wf'] = sname + '-' + cname + ": "+play[i]['name']
                } else {
                    play[i]['wf'] = sname + ": "+play[i]['name']
                }

                i++
            }
        });
    }
    var pl = play.length;
    var pid, je = 0,
    zje = 0,
    minje = 0,
    maxje = 0;
    for (i = 0; i < pl; i++) {
        pid = play[i]['pid'];
        zje += Number(play[i]['je']);
        if ($(".plays").length > 0) {
           minje = Number($(".plays.qiuselect").attr("minje"));
           maxje = Number($(".plays.qiuselect").attr("maxje"));
           play[i]['wf'] = play[i]['name'] + ": " + play[i]['con'] ;
        }else{
           minje = Number($(".p" + pid).attr("minje"));
           maxje = Number($(".p" + pid).attr("maxje"));
        }
        if (Number(play[i]['je']) > maxje) {
            $(".errmsg .swal-text").html("[" + play[i]['name'] + "]单注最大金额" + maxje);
            $(".errmsg").show();
            return false;
        }
        if (Number(play[i]['je']) < minje) {
            $(".errmsg .swal-text").html("[" + play[i]['name'] + "]单注最小金额" + minje);
            $(".errmsg").show();
            return false;
        }

    }
    if(zje<1){
        $(".errmsg .swal-text").html("投注金额最低为1");
        $(".errmsg").show();
        return false;
    }
    var money=$(".money").html();
    if (zje > Number(money)) {
        $(".errmsg .swal-text").html("您的可用余额不足!");
        $(".errmsg").show();
        return false;
    }
    $(".tz .jeqr").attr("disabled",true);
    var pstr = '[';
    for (i = 0; i < play.length; i++) {
        if (i != 0) pstr += ',';
        pstr += json_encode_js(play[i])
    }
    pstr += ']';
    var ab = $(".ab span.active").attr("v");
    var abcd = $(".abcd").val();
    $.ajax({
        type: 'POST',
        url:mulu+'makelib',
        data: 'xtype=make&pstr=' + pstr + "&abcd=" + abcd + "&ab=" + ab,
        dataType: 'json',
        cache: false,
        async: false,
        success: function(m) {
            m=m.msg;
            var ml = m.length;
            var str,err;
            $(".lastzd").removeClass("iJamhB").addClass("efUsXr");
            $(".lastzdlist").empty();
            if (Number(m[0]['cg']) == 1){
                $(".errmsg .swal-text").html("投注成功!");
                $(".errmsg").show();
                for (i = 0; i < ml; i++) {
                    var err;
                    if (Number(m[i]['cg']) == 1) {
                        if (Number(m[i]['cgs']) == 1) {
                            err = '赔率改动!';
                        } else {
                            err = '成功!';
                        }
                    } else {
                        err = m[i]['err']
                    }

                    str = '<div class="table-row">';
                    str += '<div class="col col2"><div class="green_color">'+m[i]['tid']+'</div></div>';
                    str += '<div class="col col2"><div class="green_color">'+m[i]['qishu']+'</div></div>';
                    str += '<div class="col col2"><div class="blue_color">'+m[i]['wf']+'</div><div class="red_color"><span class="blue_color">@</span> ';
                    str += m[i]['peilv1'];
                    if(Number(m[i]['peilv2'])>1){
                        str += '/'+m[i]['peilv2'];
                    }
                    str += '</div></div>';
                    str += '<div class="col col2">'+m[i]['je']+'</div>';
                    if (Number(m[i]['cg']) == 1 && Number(m[i]['cgs']) != 1) {
                        str += '<div class="col col2 green_color">'+err+'</div>';
                    }else{
                        str += '<div class="col col2 red_color">'+err+'</div>';
                    }
                    str += '</div>';
                    $(".lastzdlist").append(str);

                }                
            }else{
                $(".errmsg .swal-text").html(m[0]['err']);
                $(".errmsg").show();
            }
            
            $(".tz .jeqr").attr("disabled", false);
            $(".tz .cancel-btn").click();
            play = [];
            //setTimeout(function(){$(".lastzd").removeClass("efUsXr").addClass("iJamhB");},2000);
            getusermoney();
        }
    })
}

function exe2() {
    var je = Number($(".jes").val());
    var i = 0,
    bname, sname, cname;
    play = [];
    if($(".mt15 .active").length>0){
        $(".mt15 .active").each(function(i) {
            var htm = $(this).attr("m");
            play[i] = [];
            play[i]['bz'] = '';
            play[i]['gid'] = ngid;
            play[i]['pid'] = $(this).attr("pid");
            play[i]['name'] = $(this).attr("name");
            play[i]['je'] = je;
            play[i]['con'] = '';
            play[i]['peilv1'] = $(this).attr("pl");
            play[i]['bid'] = $(this).attr("bid");
            play[i]['wf'] = $(this).attr("sname")+': '+$(this).attr("name");
        });
    } else {
        $(".errmsg .swal-text").html("最少选择1个玩法!");
        $(".errmsg").show();
        return false;
    }
    var pl = play.length;
    var pid, je = 0,
    zje = 0,
    minje = 0,
    maxje = 0;
    for (i = 0; i < pl; i++) {
        pid = play[i]['pid'];
        zje += Number(play[i]['je']);
      minje = Number($(".mt15 .active").eq(i).attr("minje"));
      maxje = Number($(".mt15 .active").eq(i).attr("maxje"));
        if (Number(play[i]['je']) > maxje) {
            $(".errmsg .swal-text").html("[" + play[i]['name'] + "]单注最大金额" + maxje);
            $(".errmsg").show();
            return false;
        }
        if (Number(play[i]['je']) < minje) {
            $(".errmsg .swal-text").html("[" + play[i]['name'] + "]单注最小金额" + minje);
            $(".errmsg").show();
            return false;
        }
    }
    if(zje<1){
        $(".errmsg .swal-text").html("投注金额最低为1");
        $(".errmsg").show();
        return false;
    }
    var money=$(".money").html();
    if (zje > Number(money)) {
        $(".errmsg .swal-text").html("您的可用余额不足!");
        $(".errmsg").show();
        return false;
    }
    $(".kuaisu").attr("disabled",true);
    var pstr = '[';
    for (i = 0; i < play.length; i++) {
        if (i != 0) pstr += ',';
        pstr += json_encode_js(play[i])
    }
    pstr += ']';
    var ab = $(".ab span.active").attr("v");
    var abcd = $(".abcd").val();
    $.ajax({
        type: 'POST',
        url:mulu+'makelib',
        data: 'xtype=make&pstr=' + pstr + "&abcd=" + abcd + "&ab=" + ab,
        dataType: 'json',
        cache: false,
        async: false,
        success: function(m) {
            m = m.msg;
            var ml = m.length;
            var str,err;
            $(".lastzd").removeClass("iJamhB").addClass("efUsXr");
            $(".lastzdlist").empty();
            if (Number(m[0]['cg']) == 1){
                $(".mt15 .active").removeClass('active');
                $(".errmsg .swal-text").html("投注成功!");
                $(".errmsg").show();
                for (i = 0; i < ml; i++) {
                    var err;
                    if (Number(m[i]['cg']) == 1) {
                        if (Number(m[i]['cgs']) == 1) {
                            err = '赔率改动!';
                        } else {
                            err = '成功!';
                        }
                    } else {
                        err = m[i]['err']
                    }

                    str = '<div class="table-row">';
                    str += '<div class="col col2"><div class="green_color">'+m[i]['tid']+'</div></div>';
                    str += '<div class="col col2"><div class="green_color">'+m[i]['qishu']+'</div></div>';
                    str += '<div class="col col2"><div class="blue_color">'+m[i]['wf']+'</div><div class="red_color"><span class="blue_color">@</span> ';
                    str += m[i]['peilv1'];
                    if(Number(m[i]['peilv2'])>1){
                        str += '/'+m[i]['peilv2'];
                    }
                    str += '</div></div>';
                    str += '<div class="col col2">'+m[i]['je']+'</div>';
                    if (Number(m[i]['cg']) == 1 && Number(m[i]['cgs']) != 1) {
                        str += '<div class="col col2 green_color">'+err+'</div>';
                    }else{
                        str += '<div class="col col2 red_color">'+err+'</div>';
                    }
                    str += '</div>';
                    $(".lastzdlist").append(str);

                }                
            }else{
                $(".errmsg .swal-text").html(m[0]['err']);
                $(".errmsg").show();
            }
            
            $(".kuaisu").attr("disabled", false);
            $(".jes").val('');
            $(".tz .cancel-btn").click();
            play = [];
            //setTimeout(function(){$(".lastzd").removeClass("efUsXr").addClass("iJamhB");},2000);
            getusermoney();
        }
    })
}


function rhtmla(arr) {
    var str = "<a class='sc-1csyyul-1 qiua play p" + arr['pid'] + "' bid='" + arr['bid'] + "' pid='" + arr['pid'] + "' sname='" + arr['sname'] + "' cname='" + arr['cname'] + "' mname='" + arr['name'] + "' maxje='" + arr['maxje'] + "' minje='" + arr['minje'] + "'><div class='b_text sc-1csyyul-0 hokpMe name'>" + arr['name'] + "</div><div class='b_odds peilv1'>" + rpeilv(arr['peilv1'], arr['ifok']) + "</div></a>";
    return str;
}
function rhtmlb(arr) {
    var str = "<a class='sc-1csyyul-1 qiub play p" + arr['pid'] + "' bid='" + arr['bid'] + "' pid='" + arr['pid'] + "' sname='" + arr['sname'] + "' cname='" + arr['cname'] + "' mname='" + arr['name'] + "' maxje='" + arr['maxje'] + "' minje='" + arr['minje'] + "'><div class='b_text sc-1csyyul-0 hokpMe name'>" + qiu(arr['name']) + "</div><div class='b_odds peilv1'>" + rpeilv(arr['peilv1'], arr['ifok']) + "</div></a>";
    return str;
}
function rhtmlc(arr) {
    var str = "<a class='sc-1csyyul-1 qiuc play p" + arr['pid'] + "' bid='" + arr['bid'] + "' pid='" + arr['pid'] + "' sname='" + arr['sname'] + "' cname='" + arr['cname'] + "' mname='" + arr['name'] + "' maxje='" + arr['maxje'] + "' minje='" + arr['minje'] + "'><div class='b_text sc-1csyyul-0 hokpMe name'>" + arr['name'] + "</div><div class='b_odds peilv1'>" + rpeilv(arr['peilv1'], arr['ifok']) + "</div></a>";
    return str;
}

function rhtmls(name) {
    return "<div class='bcn_center2 items'><div class='bcn_title'><a class='bt_icon open'></a>" + name + "</div><div class='ReactCollapse--collapse' style='height: auto;'><div class='ReactCollapse--content'><div class='bcn_number_type'>";
}

function rhtmlsduo(name) {
    return "<div class='bcn_center2 items'><div class='ReactCollapse--collapse' style='height: auto;'><div class='ReactCollapse--content'><div class='bcn_number_type'>";
}

function rhtmlduo(arr,bname,flag) {
    var qiuselect="";
    if(flag==1) qiuselect = " qiuselect";
    if(bname=="2字组合" || bname=="3字组合"){
        var str = "<a class='sc-1csyyul-1"+qiuselect+" qiue plays p" + arr['pid'] + "' bid='" + arr['bid'] + "' pid='" + arr['pid'] + "' sname='" + arr['sname'] + "' cname='" + arr['cname'] + "' mname='" + arr['name'] + "' maxje='" + arr['maxje'] + "' minje='" + arr['minje'] + "' znum1='" + arr['znum1'] + "' znum2='" + arr['znum2'] + "'><div class='b_text sc-1csyyul-0 hokpMe name'>" + arr['name'] + "</div></a>";
    }else{
        var str = "<a class='sc-1csyyul-1"+qiuselect+" qiud plays p" + arr['pid'] + "' bid='" + arr['bid'] + "' pid='" + arr['pid'] + "' sname='" + arr['sname'] + "' cname='" + arr['cname'] + "' mname='" + arr['name'] + "' maxje='" + arr['maxje'] + "' minje='" + arr['minje'] + "' znum1='" + arr['znum1'] + "' znum2='" + arr['znum2'] + "'><div class='b_text sc-1csyyul-0 hokpMe name'>" + arr['name'] + "</div></a>";
    }
    return str;
}

function rhtmlduohm(name, peilv, i, p) {
    var str = "<a class='sc-1csyyul-1 qiuc dds d1 p" + i + "'  pid='" + i + "' m='" + name + "'><div class='b_text sc-1csyyul-0 hokpMe name'>" + qiu(name) + "</div>";
    str += "<div class='b_odds peilv1'>" + peilv[0] + "</div>";
    if (p > 1) str += "<div class='b_odds peilv2'>" + peilv[1] + "</div>";
    if (p > 2) str += "<div class='b_odds peilv3'>" + peilv[2] + "</div>";
    str += "</a>"
    return str;
}

function rhtmlduohm2(name,  i) {
    var str = "<a class='sc-1csyyul-1 qiuc dds d2 p" + i + "'  pid='" + i + "' m='" + name + "'><div class='b_text sc-1csyyul-0 hokpMe name'>" + qiu(name) + "</div>";
    str += "</a>"
    return str;
}

function json_encode_js(aaa) {
    function je(str) {
        var a = [],
            i = 0;
        var pcs = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (; i < str.length; i++) {
            if (pcs.indexOf(str[i]) == -1) a[i] = "\\u" + ("0000" + str.charCodeAt(i).toString(16)).slice(-4);
            else a[i] = str[i]
        }
        return a.join("")
    }
    var i, s, a, aa = [];
    if (typeof(aaa) != "object") {
        alert("ERROR json");
        return
    }
    for (i in aaa) {
        s = aaa[i];
        a = '"' + je(i) + '":';
        if (typeof(s) == 'object') {
            a += json_encode_js(s)
        } else {
            if (typeof(s) == 'string') a += '"' + je(s) + '"';
            else if (typeof(s) == 'number') a += s
        }
        aa[aa.length] = a
    }
    return "{" + aa.join(",") + "}"
}

function C(arr, num) {
    var r = [];
    (function f(t, a, n) {
        if (n == 0) return r.push(t);
        for (var i = 0, l = a.length; i <= l - n; i++) {
            f(t.concat(a[i]), a.slice(i + 1), n - 1)
        }
    })([], arr, num);
    return r
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

function Ctwo(a, b, bname, pname) {
    var al = a.length;
    var bl = b.length;
    var r = [];
    var h = 0;
    var ins = '';
    var tmps = '';
    for (i = 0; i < al; i++) {
        for (j = 0; j < bl; j++) {
            if (bname == '2字组合' | pname == '选前二直选' | pname == '选二连直') {
                tmps = [a[i]['n'], b[j]['n']];
                if (ins.indexOf(tmps.sort().join('-')) != -1) {
                    continue;
                }
                ins += ',' + tmps.sort().join('-');
            }
            r[h] = [];
            if (a[i]['n'] == b[j]['n'] | bname == '2字定位' | pname == '选前二直选' | pname == '选二连直') {
                r[h]['p'] = Math.min(a[i]['p'][0], b[j]['p'][0]);
            } else {
                r[h]['p'] = Math.min(a[i]['p'][1], b[j]['p'][1]);
            }
            r[h]['n'] = [a[i]['n'], b[j]['n']];
            h++;

        }
    }
    return r;
}

function Cshree(a, b, c, bname, pname) {
    var al = a.length;
    var bl = b.length;
    var cl = c.length;
    var r = [];
    var h = 0;
    var ins = '';
    var tmps = '';
    for (i = 0; i < al; i++) {
        for (j = 0; j < bl; j++) {
            for (k = 0; k < cl; k++) {
                if (bname == '3字组合' | pname == '选前三直选' | pname == '选三前直') {
                    tmps = [a[i]['n'], b[j]['n'], c[k]['n']];
                    if (ins.indexOf(tmps.sort().join('-')) != -1) {
                        continue;
                    }
                    ins += ',' + tmps.sort().join('-');
                }
                r[h] = [];
                if ((a[i]['n'] == b[j]['n'] & a[i]['n'] == c[k]['n']) | bname == '3字定位' | pname == '选前三直选' | pname == '选三前直') {
                    r[h]['p'] = Math.min(a[i]['p'][0], b[j]['p'][0], c[k]['p'][0]);
                } else if (a[i]['n'] == b[j]['n'] | a[i]['n'] == c[k]['n'] | b[j]['n'] == c[k]['n']) {
                    r[h]['p'] = Math.min(a[i]['p'][1], b[j]['p'][1], c[k]['p'][1]);
                } else {
                    r[h]['p'] = Math.min(a[i]['p'][2], b[j]['p'][2], c[k]['p'][2]);
                }
                r[h]['n'] = [a[i]['n'], b[j]['n'], c[k]['n']];
                h++;
            }
        }
    }
    return r;
}

function qiu(ns,sx,f) {
    if (isNaN(ns)){
        if(ns.indexOf("红")!=-1 || ns.indexOf("紅")!=-1){
            return "<div class='fred'>"+ns+"</div>";
        }else if(ns.indexOf("蓝")!=-1 || ns.indexOf("藍")!=-1){
            return "<div class='fblue'>"+ns+"</div>";
        }else if(ns.indexOf("绿")!=-1 || ns.indexOf("綠")!=-1){
            return "<div class='fgreen'>"+ns+"</div>";
        }else{
            return ns;
        }
    }
    var str;
    switch(fenlei){
        case '107':
            if(Number(ns)<10 && strlen(ns)==1){
               ns = '0'+ns;
            }
            str = "<div class='b"+fenlei+ns+"' m='"+ns+"'>"+Number(ns)+"</div>";
        break;
        case '103':
            if(Number(ns)>=19){
                str = "<div class='b"+fenlei+"red' m='"+ns+"'>"+Number(ns)+"</div>"; 
            }else{
                str = "<div class='b"+fenlei+"' m='"+ns+"'>"+Number(ns)+"</div>";   
            }
            
        break;
        case '121':
            if(Number(ns)==11){
                str = "<div class='b"+fenlei+"red' m='"+ns+"'>"+Number(ns)+"</div>"; 
            }else{
                str = "<div class='b"+fenlei+"' m='"+ns+"'>"+Number(ns)+"</div>";   
            }
            
        break;
        case '101':
        case '163':
            if(ngid=='101'){
                str = "<div class='bsx"+ns+"'></div>";
            }else{
                str = "<div class='b"+fenlei+"' m='"+ns+"'>"+Number(ns)+"</div>";
            }
            
        break;
        case '161':
            if(Number(ns)>=41){
                str = "<div class='b"+fenlei+"b' m='"+ns+"'>"+Number(ns)+"</div>"; 
            }else{
                str = "<div class='b"+fenlei+"a' m='"+ns+"'>"+Number(ns)+"</div>";   
            }
        break;
        case '151':
            ns =Number(ns);
            if(ns<10){
                str = "<div class='b"+fenlei+ns+"' m='"+ns+"'></div>";
            }else if(ns<10){
                str = "<div class='b"+fenlei+(Math.floor(ns/10))+"'></div>"+"<div class='b"+fenlei+(ns%10)+"'></div>";
            }else{
                str = "<div class='b"+fenlei+(Math.floor(ns/100))+"'></div>"+"<div class='b"+fenlei+(Math.floor(ns/10))+"'></div>"+"<div class='b"+fenlei+(ns%10)+"'></div>";
            }
            
        break;
        case '100':

           ns =Number(ns);
           if(f){
           if($.inArray(ns,sma['紅'])!=-1){
               str = "<div class='qiu100'><div class='bred'>"+Number(ns)+"</div><span>"+sx+"</span></div>"; 
           }else if($.inArray(ns,sma['藍'])!=-1){
               str = "<div class='qiu100'><div class='bblue'>"+Number(ns)+"</div><span>"+sx+"</span></div>"; 
           }else if($.inArray(ns,sma['綠'])!=-1){
               str = "<div class='qiu100'><div class='bgreen'>"+Number(ns)+"</div><span>"+sx+"</span></div>"; 
           }
           }else{
           if($.inArray(ns,sma['紅'])!=-1){
               str = "<div class='bred'>"+Number(ns)+"</div>"; 
           }else if($.inArray(ns,sma['藍'])!=-1){
               str = "<div class='bblue'>"+Number(ns)+"</div>"; 
           }else if($.inArray(ns,sma['綠'])!=-1){
               str = "<div class='bgreen'>"+Number(ns)+"</div>"; 
           }
          }
        break;
    }
    return str;
}

function rpeilv(peilv, ifok) {
    if (Number(ifok) != 1) return '--';
    else return peilv
}

function updatel() {
    clearTimeout(upl);
    var tustr = "";
    var obj = $("#result_info");
    var objb = $("#result_balls");
    var m1 = $(".kjresult div:eq(0)").attr("m");
    var qs = $(".upqishu").attr("q");
    if (m1 == 'undefined' || m1 == undefined) m1 = '';

    $.ajax({
        type: 'POST',
        url:mulu+'make',
        cache: false,
        dataType: "json",
        data: "xtype=upl&qs=" + qs + "&m1=" + m1 + "&tu=" + tustr,
        success: function(m) {
            getusermoney();
            m = m.msg;
            if (m[0] != 'A') {
                if(m[10]!=""){
                 alert("\r\n\r\n\r\n\r\n"+m[10]+"\r\n\r\n\r\n\r\n");
               }
                $(".upqishu").attr("q",m[5]);
                $(".upqishu").html(m[5].substr(-8));
                var ml = m[4].length;
                var str = "";
                var sum = 0;
                if(ngid==101){
                    for (i = 0; i < ml; i++) {
                       str += "<div class='bsx"+m[4][i]+"'></div>";
                    }
                    $(".kjresult").html(str);
                }else if($(".gamemenu").html().indexOf('农场')!=-1){
                    for (i = 0; i < ml; i++) {
                       str += "<div class='ncs"+m[4][i]+"'></div>";
                    }
                    $(".kjresult").html(str);
                }else{
                    for (i = 0; i < ml; i++) {
                        str += qiu(m[4][i],m[13][i],true);                    
                    }
                    $(".kjresult").html(str);
                    if(fenlei==161){
                        $(".draw").parent().removeClass("resultother").addClass("result161");
                        $(".kjresult div:eq(9)").css("clear","right");
                    }else if(fenlei==100){
                        $(".draw").parent().removeClass("resultother").removeClass("result161").addClass("result100");
                    }else{
                        $(".draw").parent().removeClass("result161").addClass("resultother");
                    }
                    if(fenlei==100){
                        $(".kjresult .qiu100:eq(5)").after("<div class='qiu100'><div class='bblack'>+</div></div>");
                    }
                }
                // if(m[11]==1){
                     var str = '<tr>';
                     for(var i in m[12]){
                        if(i%10==0){
                            str += "</tr><tr>";
                        }
                        var cc="bai";
                        if(Number(m[12][i])==1 || Number(m[12][i])==3){
                            cc = "hei";
                        }else if(Number(m[12][i])==2 || Number(m[12][i])==4){
                            cc = "red";
                        }
                        str += "<td class='"+cc+"'>"+m[12][i]+"</td>";
                     }
                     str += "</tr>";
                     $(".ftlutb tbody").html(str);
                // }
                setlong(m[8]);
                setlz(m[2]);
            }
        }
    });
    upl = setTimeout(updatel, 4000)
}
function setlong(ma){
    var ml = ma.length;
    $(".cllist").empty();
    for(i=0;i<ml;i++){
        if(ma[i]['bname']=="2字和数" || ma[i]['bname']=="3字和数") continue;
        if(ma[i]['bname']=='总和龙虎' || ma[i]['bname']=='总和'){
            $(".cllist").append("<li><div>"+ma[i]['pname']+"</div><div>"+ma[i]['qishu']+"期</div></li>");
        }else{
            if(fenlei==107){
                ma[i]['name'] = ma[i]['name'].replace(/第3/g,'第三');
                ma[i]['name'] = ma[i]['name'].replace(/第4/g,'第四');
                ma[i]['name'] = ma[i]['name'].replace(/第5/g,'第五');
                ma[i]['name'] = ma[i]['name'].replace(/第6/g,'第六');
                ma[i]['name'] = ma[i]['name'].replace(/第7/g,'第七');
                ma[i]['name'] = ma[i]['name'].replace(/第8/g,'第八');
                ma[i]['name'] = ma[i]['name'].replace(/第9/g,'第九');
                ma[i]['name'] = ma[i]['name'].replace(/第10/g,'第十');
            }
            $(".cllist").append("<li><div>"+ma[i]['name']+"</div><div>"+ma[i]['pname']+"   "+ma[i]['qishu']+"期</div></li>");
        }
        
    }

}
function setlz(lz){
    $(".lzb ul").empty();
    for (var i in lz['b']) {
        $(".lzb ul").append("<li><a>"+lz['b'][i]+"</a></li>");
    }
    $(".lzb ul li").unbind("click");
    $(".lzb ul li").click(function(){
        $(".lzb ul li.active").removeClass("active");
        $(this).addClass("active");
        var html = $(this).find("a").html();
        var arr = lz[html];
        $(".lzp ul").empty();
        $(".lzr ul").empty();
        $(".lzson ul").empty();
        $(".lzlist ul").empty();
        var buchu = 0;
            if (fenlei == 101 || fenlei == 163) {
                arr['总和大小'] = lz['总和大小'];
                arr['总和单双'] = lz['总和单双'];               
                arr['总尾大小'] = lz['总尾大小'];
                arr['龙虎和'] = lz['龙虎和'];
                buchu = 1
            } else if (fenlei == 121) {
                arr['总和大小'] = lz['总和大小'];
                arr['总和单双'] = lz['总和单双'];               
                arr['总尾大小'] = lz['总尾大小'];
                arr['龙虎'] = lz['龙虎'];
                buchu = 1
            } else if (fenlei == 103) {
                if (ngid!='132') {
                    arr['总和大小'] = lz['总和大小'];
                    arr['总和单双'] = lz['总和单双'];               
                    arr['总尾大小'] = lz['总尾大小'];
                }
                buchu = 1
            } else if (fenlei == 107) {
                arr['冠亚和'] = lz['冠亚和'];
                arr['冠亚和大小'] = lz['冠亚和大小'];
                arr['冠亚和单双'] = lz['冠亚和单双'];
                buchu = 1
            }
            lznext(arr);
            if (buchu == 1) {
                var bc = lz["bc"][html];
                for (var i in bc) {
                    $(".lzp ul").append("<li>"+qiu(bc[i]['name'])+"</li>");
                    $(".lzr ul").append("<li>"+bc[i]['buzqishu']+"</li>");
                }
                var chu = lz["chu"][html];
                for (var i in chu) {
                    $(".lzr ul").append("<li class='chu'>"+chu[i]+"</li>");
                }
            }
    });
    $(".lzb ul li:eq(0)").click();
}

function lznext(arr) {
    var str = '';
    for (var i in arr) {
        $(".lzson ul").append("<li><a>"+i+"</a></li>");
    }
    $(".lzson ul li").unbind("click");
    $(".lzson ul li").click(function(){
        $(".lzson ul li.active").removeClass("active");
        $(this).addClass("active");
        $(".lzlist ul").html(lzk(arr[$(this).find("a").html()]))
    });
    $(".lzson ul li:eq(0)").click();

}
function lzk(arr) {
    var tmp = '';
    var str = '';
    var i =0;
    for (var j in arr) {
        if (tmp != arr[j]) {
            if(i>29) break;
            if(tmp!="") str +="</li>";
            str += "<li>";
            i++;
        }
        str += "<div>" + arr[j] + "</div>";
        tmp = arr[j];
    }
    str += "</li>";
    return str;
}
function getusermoney() {

    $.ajax({
        type: 'POST',
        url:mulu+'userinfo',
        dataType: "json",
        cache: false,
        data: 'xtype=getusermoney',
        success: function(m) {
                m=m.msg
            //if (ngid != 100 || fudong == 1) {
                $(".money").html(m[4]);
                $(".wjs").html(m[5]);
                $(".wj").html('未结 '+ m[8] +' 笔');
                $(".thisqh").html(m[6]+'期');
                $(".lastqh").html(String((Number(m[6])-1)).slice(-3)+'期');
            //} else {
                //$(".money").html(m[1]);
                //$(".wjs").html(m[2]);
            //}
            $(".synow").html(m[7])
        }
    })
}

function getnowtime() {
    clearTimeout(setgntime);
    $.ajax({
        type: 'POST',
        url:mulu+'times',
        data: 'xtype=getopen',
        cache: false,
        success: function(m) {
            m = m.msg;
            m = m.split('|');
            if (Number(m[6]) == 0 | m[6] == undefined) {
                top.window.location.href = top.window.location.href;
                return false;
            }
            if (fenlei == 100) {
                if (Number(m[2]) != Number($(".thisqishu").html()) | Number(m[3]) != Number($(".close").attr('s')) | Number(m[4]) != Number($(".close").attr('os'))) {
                    $(".close").attr('s', m[3]);
                    $(".close").attr('os', m[4]);
                    if ($(".menuplay a.lrm_back").attr("bid") == "") {
                        if (Number(m[3]) == 0) {
                            $(".close").html($(".close").html().replace("封", "开"))
                        } else {
                            $(".close").html($(".close").html().replace("开", "封"))
                        }
                    } else {
                        if (Number(m[4]) == 0) {
                            $(".close").html($(".close").html().replace("封", "开"))
                        } else {
                            $(".close").html($(".close").html().replace("开", "封"))
                        }
                    }
                    $(".thisqishu").html(m[2]);
                    if (Number(m[5]) < 2100 | Number(m[5]) > 2128) {
                        if($(".clmake:visible").length==0 && $(".ylmake:visible").length==0){
                            lib();
                        }
                        
                    }
                    getusermoney();
                }
                clearTimeout(settime1);
                time1 = Number(m[1]);
                time1x();
            } else {
                if (Number(m[2]) != Number($(".thisqishu").html()) | Number(m[3]) != Number($(".close").attr('s'))) {
                    $(".close").attr('s', m[3]);
                    if (Number(m[3]) == 0) {
                        $(".close").html($(".close").html().replace("封", "开"))
                    } else {
                        $(".close").html($(".close").html().replace("开", "封"))
                    }
                    $(".thisqishu").html(m[2]);
                        if($(".clmake:visible").length==0 && $(".ylmake:visible").length==0){
                            lib();
                        }
                    getusermoney();
                }
                if($(".clmake:visible").length==1){
                    getcl();
                }
                if($(".ylmake:visible").length==1){
                    getyl();
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
    gntime = 8;
    gntimex();
}

function gntimex() {
    gntime--;
    $(".refresh span").html(gntime);
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
    if (fenlei != 100 || $(".menuplay a.lrm_back").attr("bid") == "") {
        $(".close span").html(str);
    }
    if($(".clmake:visible").length==1){
         var t=0;
         var f=false;
         $(".clmake .times").each(function(){
              t=Number($(this).attr("v"))-1;
              if(t<0) t=0;
              if(t==0) f=true;
              $(this).attr("v",t);
              $(this).html(cuttime(t));
              
         });
         if(f){
            getcl();
            return;
         }
    }
    if($(".ylmake:visible").length==1){
         var t=0;
         var f=false;
         $(".ylmake .times").each(function(){
              t=Number($(this).attr("v"))-1;
              if(t<0) t=0;
              if(t==0) f=true;
              $(this).attr("v",t);
              $(this).html(cuttime(t));
              
         });
         if(f){
            getyl();
            return;
         }
    }
    if(time0==0){
        getnowtime();
        return;
    }
    settime0 = setTimeout(time0x, 1000)
}
function cuttime(v){
    var str = '';
    var h = 0,
        m = 0,
        s = 0;
    h = Math.floor(v / (60 * 60));
    m = Math.floor((v - h * 60 * 60) / 60);
    s = v - h * 60 * 60 - m * 60;
    if (h > 0) str += h + ":";
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    str += m + ":";
    str += s;
    return str;
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
    if (fenlei == 100 && $(".menuplay a.lrm_back").attr("bid") != "") {
        $(".close span").html(str);
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
    // if(Number($(".thisqishu").html().substr(-3))-Number($(".upqishu").html())==1){
        $(".open span").html(str);
    // }else{
        // $(".open span").html("00:00");
    // }
    
    settimek = setTimeout(timekx, 1000)
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