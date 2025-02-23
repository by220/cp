var settime0;
var settime1;
var time0 = 0;
var time1 = 0;
var gntime;
var gid;
var upl;
var lottery = "",
    lotterys, controlMenu = null,
    resetTimer;

function myready() {
    if(top.location.href.indexOf("top")==-1 && ismobi()){
        //top.location.href="top?xtype=this";
        //return;
    }    
    //frame.window.location.href='news';
    $(".menus").html($(".games a.xz").attr('gname'));
    var posi = $(".menus").position();
    $(".games").css("left", posi.left);
    $(".games").css("top", posi.top + $(".menus").height());
    $(".menus").mouseover(function () {
        $(".games").show();
    });

    $(".games").mouseleave(function () {
        $(this).hide();
    });

    $(".games a").click(function () {
        $(".games a").removeClass('xz');
        $(this).addClass('xz');
        $(".menus").html($(".games a.xz").attr('gname'));
        changegid($(this).attr('gid'));
        ngid = Number($(this).attr('gid'));
        fenlei = Number($(this).attr('fenlei'));
    });
    $("#lotterys a").click(function () {
        ngid = Number($(this).attr('gid'));
        fenlei = Number($(this).attr('fenlei'));
        $("#lotterys a").removeClass("selected");
        $(this).addClass("selected");
        $("#frame").contents().find(".upkj").html('');
        changegid(ngid);
        //frame.window.location.href ="slib?xtype=show&gid="+ngid;
    });
    $("#lotterys a.g" + ngid).addClass("selected");

    if (/MSIE (6|7)/.test(navigator.userAgent)) {
        var b = function () {
            $("#frame").height($("#contents").height())
        };
        b();
        $("#contents").resize(b)
    }
    $("#lotterys").hide();
    $(".menu_sub").hide();
    $("#contents").css("top", "62px");
    $(".header .menu .menu_title li a").click(function () {
        $(this).parent().find('a').removeClass("selected");
        var a = $(this);
        a = a.html();
        if ("开奖结果" == a || "开奖管理" == a || "报表查询" == a || "密码修改" == a) {
            $("#lotterys").hide(), $(".menu_sub").hide(), $("#contents").css("top", "62px");
        }
        $("#lotterys").hide();
        if ("即时注单" == a) {
            if($("#lotterys a:last").is(":hidden")){
                $("#contents").css("top", "120px");
            }else{
                $("#contents").css("top", "91px");
            }
            $(".menu_sub").hide();
            $("#lotterys").show();
            
        }
        if ("个人管理" == a || "自动补货" == a || "高级功能" == a || "用户管理" == a) {
            var i = $(this).index();
            $(".menu_sub").hide();
            $(".menu_sub:eq(" + i + ")").show();
            $(".menu_sub:eq(" + i + ")").find("a").removeClass('selected');
            $(".menu_sub:eq(" + i + ")").find("a:eq(0)").addClass('selected');
            $("#contents").css("top", "91px");

        }
        if ("退出" == a) {
            window.location.href = mulu+"logout?logout=yes";
        }

    });
    //$(".header .menu .menu_title li a:eq(0)").click();


    $(".header .nav a").click(function () {
        return;
        $(this).parent().find('a').removeClass("selected");
        var a = $(this);
        a.addClass("selected");
        changegid(a.attr('gid'));
    });

    //$(".header .nav a:eq(0)").click();


    $(".header .menu_sub a").click(function () {
        $(this).parent().children().removeClass("selected");
        $(this).addClass("selected");
        var u = $(this).attr('u');
        var type = $(this).attr('type');
        if($(this).hasClass("usermenu")){
            //alert(frame.window.location.href)
            if(frame.window.location.href.indexOf("editson")!=-1){
                $(this).parent().children().removeClass("selected");
                $(this).parent().find("a:eq(0)").addClass("selected");
                frame.window.location.href = mulu + "suser?xtype=show";
            }
            return false;
        }
        frame.window.location.href = mulu+u + "?xtype=" + type;
    });


    $(".topmenu li a").click(function () {
        $(this).parent().find('a').removeClass("selected");
        $(this).addClass("selected");
        var url = $(this).attr('x');
        if (url == 'suser') {
            frame.window.location.href = mulu+url + "?xtype=show&layer=" + $(this).attr('u')
        } else if (url == 'top') {
            frame.window.location.href = mulu + "logout?logout=yes"
        } else if (url == 'admins') {
            frame.window.location.href = mulu+url + "?xtype=list"
        } else if (url == 'class') {
            frame.window.location.href = mulu+url + "?xtype=bigclass"
        } else if (url == 'setatt') {
            frame.bottom.window.location.href = mulu+"zshui?xtype=setattshow"
        } else {
            frame.window.location.href = mulu+url + "?xtype=show"
        }

        $(".panstatus").show();
        $(".otherstatus").hide();
        return false
    });
    //$(".topmenu li a:eq(0)").click();

    $("label").css("color", "white");
    if ($(".time0").html() != undefined) {
        time0 = Number($(".time0").html());
        if (time0 < 0) time0 = 0 - time0;
        time0x();
        gntime = setTimeout(getnowtime, 3000)
    }
    if ($(".time1").html() != undefined & 1 == 2) {
        time1 = Number($(".time1").html());
        if (time1 < 0) time1 = 0 - time1;
        time1x()
    }

    kj();
    upl = setTimeout(updatel, 5000);
    $(".qzclose").click(function () {
        $.ajax({
            type: 'POST',
            url: mulu + 'top',
            data: 'xtype=qzclose',
            success: function (m) {
                if (Number(m) == 1) {
                    window.location.href = window.location.href
                }
            }
        })
    });

    getnews();
    $(".more").click(function () {
        frame.window.location.href = mulu+"news";
    });
    $("a#notices").click(function () {
        frame.window.location.href = mulu+"news";
    });
    if (layer <=12 ) {
        $(".online").click(function () {
            frame.window.location.href = mulu+"online?xtype=show";
        })
    }


}

function changegid(gid) {
    $.ajax({
        type: 'POST',
        url: mulu + 'top',
        data: 'xtype=setgame&gid=' + gid,
        success: function (m) {
            if (Number(m) == 1) {
                frame.window.location.href = frame.window.location.href;
            }
        }
    })
}

function kj() {
    if (ngid == 161 | ngid == 162) {
        $(".upkj").html($(".upqishu").attr('m'));
        return false
    }
    var upkj = $(".upqishu").attr('m').split(',');
    var ul = upkj.length;
    var str = '';
    for (i = 0; i < ul; i++) {
        if (ngid == 100 & i == 6) str += "<span>T</span>";
        str += qiu(upkj[i])
    }
    $(".upkj").html(str);
    $(".upkj").attr("class", "T" + fenlei);
    $(".T" + fenlei).addClass("upkj");

    var cobj = $("#frame").contents().find(".upkj");
    cobj.html($(".upkj").html());
    if(ngid==101){
        cobj.attr('class', 'upkj L_CQHLSX');
        cobj.find("b").html('');
    }else{
        var gname = $(".lottery a.selected").html();
        if(gname.indexOf('农场')!=-1){
            cobj.attr('class', 'upkj L135');
        }else{
            cobj.attr('class', 'upkj T' + fenlei);
        }
    }
    
}

function updatel() {
    clearTimeout(upl);
    var mm = $(".upqishu").attr("m").split(',');
    $.ajax({
        type: 'POST',
        url: mulu + 'top',
        dataType: 'json',
        cache: false,
        data: "xtype=upl&qishu=" + $(".upqishu").html() + "&m1=" + mm[0],
        success: function (m) {
            //document.write(m)
            if (m[0] != 'A') {
                $(".upqishu").html(m[0]);
                $(".upqishu").attr("m", m[1]);
                kj();
                m[1] = m[1].split(',');
                if (m[1][0] != '') {
                    //bofang("kaijiang");
                }
            }

            var cobj = $("#frame").contents().find("#bresult");
            cobj.html(m[2]);
			$(".online").html(m[3]);
        }
    });
    upl = setTimeout(updatel, 3000);
}

function getnowtime() {
    clearTimeout(gntime);
    $.ajax({
        type: 'POST',
        url: mulu + 'times',
        data: 'xtype=getopen',
        cache: false,
        success: function (m) {

            m = m.split('|');

            if (m[0] == 'err' || m[9]!=ustatus) {
                // top.window.location.href = top.window.location.href
            }
            var cobj = $("#frame").contents().find("#cdClose label");
            var chtml = cobj.html();
            if (ngid == 100) {
                if (Number(m[2]) != Number($("label.qishu").html()) | Number(m[3]) != Number($(".panstatus").attr('s')) | Number(m[4]) != Number($(".otherstatus").attr('s'))) {
                    $(".panstatus").attr('s', m[3]);
                    $(".otherstatus").attr('s', m[4]);
                    if (Number(m[3]) == 0) {
                        $(".panstatus").html($(".panstatus").html().replace("封", "开"));
                        if(chtml!=undefined) cobj.html(chtml.replace("封", "开"));
                    } else {
                        $(".panstatus").html($(".panstatus").html().replace("开", "封"));
                        if(chtml!=undefined) cobj.html(chtml.replace("开", "封"));
                    }
                    if (Number(m[4]) == 0) {
                        $(".otherstatus").html($(".otherstatus").html().replace("封", "开"));
                        if(chtml!=undefined) cobj.html(chtml.replace("封", "开"));
                    } else {
                        $(".otherstatus").html($(".otherstatus").html().replace("开", "封"));
                        if(chtml!=undefined) cobj.html(chtml.replace("开", "封"));
                    }
                    $("label.qishu").html(m[2]);
                    if (frame.window.location.href.indexOf('slib') != -1) {
                        frame.window.location.href = frame.window.location.href;
                    }
                }
                clearTimeout(settime1);
                time1 = Number(m[1]);
                time1x()
            } else {
                if (Number(m[2]) != Number($("label.qishu").html()) | Number(m[3]) != Number($(".panstatus").attr('s'))) {
                    $(".panstatus").attr('s', m[3]);
                    if (Number(m[3]) == 0) {
                        $(".panstatus").html($(".panstatus").html().replace("封", "开"));
                        if(chtml!=undefined) cobj.html(chtml.replace("封", "开"));
                    } else {
                        $(".panstatus").html($(".panstatus").html().replace("开", "封"));
                        if(chtml!=undefined) cobj.html(chtml.replace("开", "封"));
                    }
                    $("label.qishu").html(m[2]);
                    if (frame.window.location.href.indexOf('slib') != -1) {
                        frame.window.location.href = frame.window.location.href;
                    }
                }
            }
            clearTimeout(settime0);
            time0 = Number(m[0]);
            time0x()
        }
    });
    gntime = setTimeout(getnowtime, 5000)
}

function time0x() {
    clearTimeout(settime0);
    time0--;
    var str = '';
    var str1 = '';
    var d = 0,
        h = 0,
        m = 0,
        s = 0;
    d = Math.floor(time0 / (60 * 60 * 24));
    h = Math.floor((time0 - d * 60 * 60 * 24) / (60 * 60));
    m = Math.floor((time0 - d * 60 * 60 * 24 - h * 60 * 60) / 60);
    s = time0 - d * 60 * 60 * 24 - h * 60 * 60 - m * 60;
    var cobj = $("#frame").contents().find("#cdClose span");
    h = biaoz(h);
    m = biaoz(m);
    s = biaoz(s);
    if (d > 0) {
        str += "<label>" + d + "</label>天";
    }
    if (h > 0) {
        str += "<label>" + h + "</label>时";
        str1 += h + ':';
    }
    if (m > 0) {
        str += "<label>" + m + "</label>分";

    }
    str1 += m + ':' + s;
    str += "<label>" + s + "</label>秒";
    if (time0 > 0) {
        $(".time0").html(str);
        cobj.html(str1);
    } else {
        $(".time0").html("<label>0</label>秒");
        cobj.html('00:00');
    }
    var cobj = $("#frame").contents().find("#cdClose label");
    if (Number($(".panstatus").attr('s')) == 1) {
        cobj.html("距封盘：");
    } else {
        cobj.html("距开盘：");
    }


    
    $("#frame").contents().find(".draw_number span").html($(".upqishu").html());
    if (time0 <= 0) {
        getnowtime();
        return true
    }
    settime0 = setTimeout(time0x, 1000)
}

function time1x() {
    clearTimeout(settime1);
    time1--;
    var str = '';
    var d = 0,
        h = 0,
        m = 0,
        s = 0;
    d = Math.floor(time1 / (60 * 60 * 24));
    h = Math.floor((time1 - d * 60 * 60 * 24) / (60 * 60));
    m = Math.floor((time1 - d * 60 * 60 * 24 - h * 60 * 60) / 60);
    s = time1 - d * 60 * 60 * 24 - h * 60 * 60 - m * 60;
    if (d > 0) str += "<label>" + d + "</label>天";
    if (h > 0) str += "<label>" + h + "</label>时";
    if (m > 0) str += "<label>" + m + "</label>分";
    str += "<label>" + s + "</label>秒";
    if (time1 > 0) {
        $(".time1").html(str)
    } else {
        $(".time1").html("<label>0</label>秒")
    }
    if (time1 <= 0) {
        time1 = 3;
    }
    settime1 = setTimeout(time1x, 1000)
}

function time0xs() {
    clearTimeout(settime0);
    time0--;
    var str = '';
    var d = 0,
        h = 0,
        m = 0,
        s = 0;
    d = Math.floor(time0 / (60 * 60 * 24));
    h = Math.floor((time0 - d * 60 * 60 * 24) / (60 * 60));
    m = Math.floor((time0 - d * 60 * 60 * 24 - h * 60 * 60) / 60);
    s = time0 - d * 60 * 60 * 24 - h * 60 * 60 - m * 60;
    if (d > 0) str += "<label>" + d + "</label>天";
    if (h > 0) str += "<label>" + h + "</label>时";
    if (m > 0) str += "<label>" + m + "</label>分";
    str += "<label>" + s + "</label>秒";
    if (time0 > 0) {
        $(".time0").html(str)
    } else {
        $(".time0").html("<label>0</label>秒")
    }
    if (time0 <= 0) {
        getnowtime();
        return true
    }
    settime0 = setTimeout(time0x, 1000)
}

function time1xs() {
    clearTimeout(settime1);
    time1--;
    var str = '';
    var d = 0,
        h = 0,
        m = 0,
        s = 0;
    d = Math.floor(time1 / (60 * 60 * 24));
    h = Math.floor((time1 - d * 60 * 60 * 24) / (60 * 60));
    m = Math.floor((time1 - d * 60 * 60 * 24 - h * 60 * 60) / 60);
    s = time1 - d * 60 * 60 * 24 - h * 60 * 60 - m * 60;
    if (d > 0) str += "<label>" + d + "</label>天";
    if (h > 0) str += "<label>" + h + "</label>时";
    if (m > 0) str += "<label>" + m + "</label>分";
    str += "<label>" + s + "</label>秒";
    if (time1 > 0) {
        $(".time1").html(str)
    } else {
        $(".time1").html("<label>0</label>秒")
    }
    if (time1 <= 0) {
        time1 = 3;
    }
    settime1 = setTimeout(time1x, 1000)
}

function getResult(num, n) {
    return Math.round(num * Math.pow(10, n)) / Math.pow(10, n)
}

function getnews() {
    $.ajax({
        type: 'POST',
        url: mulu + 'top',
        dataType: 'json',
        data: 'xtype=getnews',
        cache: false,
        success: function (m) {
            var mlength = m.length;
            if (mlength == 0) return false;
            var str = '';
            for (i = 0; i < mlength; i++) {
                str += '' + m[i]['content'] + '<label>[' + m[i]['time'] + ']</label> '
            }
            $("#notices").html(str);
            setTimeout(getnews, 6000);
            if (m[0]['mc'] != '' & m[0]['mc'] != undefined & m[0]['mc'] != 'undefined') {
                alert("\r\n\r\n\r\n\r\n"+m[0]['mc']+"\r\n\r\n\r\n\r\n");
            }
            m = null;
            str = null
        }
    })
}

function qiu(n, bname) {
    if (n == '') return '';
    if (fenlei == 107) n = Number(n);
    return "<span><b class='b" + n + "'>" + n + "</b></span>";
}

function in_array(v, a) {
    for (key in a) {
        if (a[key] == v) return true
    }
    return false
}

function biaoz(v) {
    if (v < 10) return '0' + v;
    else return v;
}

function ismobi(){
      var sUserAgent = navigator.userAgent.toLowerCase();
      var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
      var bIsIphone = sUserAgent.match(/iphone os/i) == 'iphone os';
      var bIsMidp = sUserAgent.match(/midp/i) == 'midp';
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
      var bIsUc = sUserAgent.match(/ucweb/i) == 'web';
      var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
      var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';
      var bIsAndroid = sUserAgent.match(/android/i) == 'android';
 
      if(bIsIpad || bIsIphone || bIsMidp || bIsUc7 || bIsUc || bIsCE || bIsWM || bIsAndroid ){
          return true;
      }
      return false;
}
