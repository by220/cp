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
var cxflytime;
var cztxtime;
function myready() {
    if(top.location.href.indexOf("top")==-1 && ismobi()){
        //top.location.href="top?xtype=this";
        //return;
    }
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
        $(".games").hide();
    });


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
        if("现金管理" == a) return false;
        if ("开奖结果" == a || "开奖管理" == a || "报表查询" == a || "用户管理" == a||"即时注单" == a||"飞单设置" == a) {
            $("#lotterys").hide(), $(".menu_sub").hide(), $("#contents").css("top", "62px");
        }
        if ("个人管理" == a || "系统功能" == a || "高级功能" == a || "现金管理" == a) {
            var i = Number($(this).attr('i'));

            $("#lotterys").hide();
            $(".menu_sub").hide();
            $(".menu_sub:eq(" + i + ")").show();
            $("#contents").css("top", "91px");

        }
        if ("退出" == a) {
            window.location.href = mulu+"logout";
        }

    });
    $(".header .menu .menu_title li a:eq(0)").click();


    $(".header .nav a").click(function () {
        return;
        $(this).parent().find('a').removeClass("selected");
        var a = $(this);
        a.addClass("selected");
        changegid(a.attr('gid'));
    });
    $(".header .nav a:eq(0)").click();


    $(".header .menu_sub a").click(function () {
        $(this).parent().children().removeClass("selected");
        $(this).addClass("selected");
        var u = $(this).attr('u');
        var type = $(this).attr('type');
        sessionStorage.setItem("subnavid", $(this).index());
        sessionStorage.setItem("subid", $(this).parents('.menu_sub').index()-2);
        frame.window.location.href = mulu+u + "?xtype=" + type;
    });


    $(".topmenu li a").click(function () {
        $(this).parent().find('a').removeClass("selected");
        $(this).addClass("selected");
        //if($(this).html()=='现金管理') return false;
		if($(this).html()=='退出') return false;
        var url = $(this).attr('x');
        // 存储
        sessionStorage.setItem("navid", $(this).index());
        $(".header .menu_sub a").removeClass("selected");
        if (url == 'suser') {
            frame.window.location.href = mulu+url + "?xtype=show&layer=" + $(this).attr('u')
        } else if (url == 'top') {
            frame.window.location.href = mulu+url + "?logout=yes"
        } else if (url == 'admins') {
            frame.window.location.href = mulu+url + "?xtype=list"
        } else if (url == 'class') {
            frame.window.location.href = mulu+url + "?xtype=bigclass"
        } else if (url == 'setatt') {
            frame.bottom.window.location.href = mulu+"zshui?xtype=setattshow"
        } else if (url == 'money') {
            frame.window.location.href = mulu+url + "?xtype=chongzhi"
        } else {
            frame.window.location.href = mulu+url + "?xtype=show"
        }

        $(".panstatus").show();
        $(".otherstatus").hide();
        return false
    });
    var navid=sessionStorage.getItem("navid");
    var subid=sessionStorage.getItem("subid");
    $(".topmenu li a").eq(sessionStorage.getItem("navid")).click();
    if((navid=='4'&&subid=='3')||(navid=='7'&&subid=='5')){
    $(".header .menu_sub").eq(sessionStorage.getItem("subid")).find('a').eq(sessionStorage.getItem("subnavid")).click();
    }

    $("label").css("color", "white");
    if ($(".time0").html() != undefined) {
        time0 = Number($(".time0").html());
        if (time0 < 0) time0 = 0 - time0;
        time0x();
        gntime = setTimeout(getnowtime, 5000)
    }
    if ($(".time1").html() != undefined & 1 == 2) {
        time1 = Number($(".time1").html());
        if (time1 < 0) time1 = 0 - time1;
        time1x()
    }

    kj();
    upl = setTimeout(updatel, 3000);
    $(".qzclose").click(function () {
        $.ajax({
            type: 'POST',
            url: mulu + 'top',
            data: 'xtype=qzclose',
            success: function (m) {
                m=m.msg;
                if (Number(m) == 1) {
                    window.location.href = window.location.href
                }
            }
        })
    });

    getnews();
    $(".more").click(function () {
        frame.window.location.href = mulu+"new";
    })
    $("a#notices").click(function () {
        frame.window.location.href = mulu+"new";
    });
    $(".online").click(function () {
        frame.window.location.href = mulu+"online?xtype=show";
    });
    cztxtime = setTimeout(cztx, 5000);
    cxflytime = setTimeout(cxfly, 3000);
    $(".clqq").click(function () {
        $("a.xjgl").click();
        $("#dialog").dialog("close");
    });

    //frame.window.location.href='new';
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
	if (a.play) {
		a.play()
	}
}

function changegid(gid) {
    $.ajax({
        type: 'POST',
        url: mulu + 'top',
        data: 'xtype=setgame&gid=' + gid,
        success: function (m) {
            m=m.msg;
            if (Number(m) == 1) {
                frame.window.location.href = frame.window.location.href;
            }
        }
    })
}

function cztx() {
    clearTimeout(cztxtime);
    if (frame.window.location.href.indexOf('money') == -1) {
        $.ajax({
            type: 'POST',
            url: mulu + 'money',
            data: 'xtype=getcztx',
            success: function (m) {
                m=m.msg;
                if (Number(m) == 1) {
                    $("#dialog").dialog();
                    playVoice('/js/sound/cash.wav', 'cash-voice');
                }
            }
        });
    }
    cztxtime = setTimeout(cztx, 10000);
}

function cxfly() {
   clearTimeout(cxflytime);
        $.ajax({
            type: 'POST',
            url: mulu + 'fly',
            data: 'xtype=cxfly',
            cache:false,
            success: function (m) {
                m=m.msg;
                if (Number(m) == 1) {
                    playVoice('/js/sound/unonline.wav', 'cash-voice1');
                }else if (Number(m) == 2) {

                    playVoice('/js/sound/moneyerr.wav', 'cash-voice2');
                }
            }
        });

    cxflytime = setTimeout(cxfly, 10000);
}


function playVoice(src, domId) {
    var $dom = $('#' + domId)
    if ($.browser.msie) {
        // IE用bgsound标签处理声音

        if ($dom.length) {
            $dom[0].src = src;
        } else {
            $('<bgsound>', {src: src, id: domId}).appendTo('body');
        }
    } else {
        // IE以外的其它浏览器用HTML5处理声音
        if ($dom.length) {
            $dom[0].play();
        } else {
            $('<audio>', {src: src, id: domId}).appendTo('body')[0].play();
        }
    }
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
        if (fenlei == 100 & i == 6) str += "<span>T</span>";
        str += qiu(upkj[i]);
    }
    $(".upkj").html(str);
    $(".upkj").attr("class", "T" + fenlei);
    $(".T" + fenlei).addClass("upkj");

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
            m=m.msg;
            if (m[0] != 'A') {
                $(".upqishu").html(m[0]);
                $(".upqishu").attr("m", m[1]);
                kj();
                m[1] = m[1].split(',');
                if (m[1][0] != '') {
                    // bofang("kaijiang");
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
            m=m.msg;
            m = m.split('|');
            if (m[0] == 'err') {
                top.window.location.href = top.window.location.href
            }
            if (ngid == 100) {
                if (Number(m[2]) != Number($("label.qishu").html()) | Number(m[3]) != Number($(".panstatus").attr('s')) | Number(m[4]) != Number($(".otherstatus").attr('s'))) {
                    $(".panstatus").attr('s', m[3]);
                    $(".otherstatus").attr('s', m[4]);
                    if (Number(m[3]) == 0) {
                        $(".panstatus").html($(".panstatus").html().replace("关", "开"))
                    } else {
                        $(".panstatus").html($(".panstatus").html().replace("开", "关"))
                    }
                    if (Number(m[4]) == 0) {
                        $(".otherstatus").html($(".otherstatus").html().replace("关", "开"))
                    } else {
                        $(".otherstatus").html($(".otherstatus").html().replace("开", "关"))
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
                        $(".panstatus").html($(".panstatus").html().replace("关", "开"))
                    } else {
                        $(".panstatus").html($(".panstatus").html().replace("开", "关"))
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
            m=m.msg;
            var mlength = m.length;
            if (mlength == 0) return false;
            var str = '';
            for (i = 0; i < mlength; i++) {
                str += '' + m[i]['content'] + '<label>[' + m[i]['time'] + ']</label> '
            }
            $("#notices").html(str);
            setTimeout(getnews, 30000);
            if (m[0]['mc'] != '' & m[0]['mc'] != undefined & m[0]['mc'] != 'undefined') {
                alert(m[0]['mc']);
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