var rtime = Number($("#reloadtime").val());
var r;
var layers;

function myready() {
    $(".nowtb .bt th").addClass('xf');
    $(".nowtb th").attr("rowspan", 2);
    clayer = layername.length;
    if (layer < 8) {
        $(".nowtb tr:eq(0)").append("<th rowspan=2>所属" + layername[layer] + "</th>")
    }
    $(".nowtb tr:eq(0)").append("<th rowspan=2>集团</th>");
    for (i = 0; i < clayer - 1; i++) {
        $(".nowtb tr:eq(0)").append("<th colspan=3>" + layername[i] + "</th>")
    }
    var str = '';
    for (i = 0; i < clayer - 1; i++) {
        str += "<th>占成</th><th>赔率</th><th>退水</th>"
    }
    if (str != '') $(".nowtb").append("<tr class='bt'>" + str + "</tr>");
    $("label").addClass('red');
    $('.textb').datepicker();
    $("#reload").click(function () {
        time()
    });
    $("#zanting").click(function () {
        clearTimeout(r)
    });
    $("input.s").click(function () {
        setdate(Number($(this).attr('d')))
    });
    $(".qishu").change(function () {
        rtime = Number($("#reloadtime").val());
        getnow();
    });
    $(".query").click(function () {
        rtime = Number($("#reloadtime").val());
        getnow();
    });
    $("#username").blur(function () {
        rtime = Number($("#reloadtime").val());
        getnow();
    });
    $(".xtype").change(function () {
        rtime = Number($("#reloadtime").val());
        getnow();
    });
    $(".nowtb th a").click(function () {
        $(".sort").attr("orderby", $(this).attr('class'));
        if ($(this).find("img").attr('s') == 'up') {

            $(this).find("img").attr('src', globalpath + "img/down.gif");
            $(".sort").attr("sorttype", 'DESC');
            $(this).find("img").attr('s', 'down')
        } else {

            $(this).find("img").attr('src', globalpath + "img/up.gif");
            $(".sort").attr("sorttype", 'ASC');
            $(this).find("img").attr('s', 'up')
        }
        getnow();
        rtime = Number($("#reloadtime").val());
    });

    $(".bid").change(function () {
        if ($(this).val() == '') {
            $(".sid").empty();
            $(".cid").empty();
            return
        }
        gets($(this).val())
    });
    $(".sid").change(function () {
        if ($(this).val() == '') {
            $(".cid").empty();
            return
        }
        getc()
    });
    $("#game").change(function () {
        $("input[name='fs']").eq(0).attr("checked", 'checked');
        var val = Number($("#game").val());
        if (val == 999) {
            $(".bid").empty();
            $(".sid").empty();
            $(".cid").empty();
            return;
        }
        getb();
    });
    $("input[name='fs']").change(function () {

        $.ajax({
            type: 'POST',
            url: mulu + 'now',
            data: 'xtype=getqishu&gid=' + val,
            dataType: 'json',
            cache: false,
            success: function (m) {
                var ml = m.length;
                $(".qishu").html('');
                for (i = 0; i < ml; i++) {
                    $(".qishu").append("<option value='" + m[i][0] + "'>" + m[i][0] + "期</option>")
                }
            }
        });

    });
    $("input[name='xinfo']").click(function () {
        getnow();
    });
    $("#z").change(function () {
        getnow()
    });
    $("#reloadtime").change(function () {
        getnow()
    });
    $("#psize").change(function () {
        getnow()
    });
    $(".qishu").change(function () {
        getnow()
    });
    $("input[name='fs']").click(function () {
        getnow()
    });
    time();
    addchange();
    getnow()
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
    getnow();
}

function time() {
    clearTimeout(r);
    rtime--;
    if (rtime == 0) {
        clearTimeout(r);
        getnow();
        rtime = Number($("#reloadtime").val())
    }
    $("label.time").html(rtime);
    r = setTimeout(time, 1000)
}

function addchange() {
    $(".user").unbind("change");
    $(".user").change(function () {
        layers = Number($(this).attr('layer'));
        var uid = $(this).val();
        var wid = Number($(this).find("option:selected").attr('wid'));
        createson(layers, uid, wid)
    })
}

function createson(layers, uid, wid) {
    if (layer == layers) {
        $("#saveuserid").val(uid);
        getnow();
        return false
    }
    if (uid == '') {
        $(".user").each(function () {
            if (Number($(this).attr('layer')) > layers) {
                $(this).remove()
            }
        });
        if (layers == 1) {
            $("#saveuserid").val($("#topid").val())
        } else {
            $(".user").each(function () {
                if (Number($(this).attr('layer')) == layers) {
                    $("#saveuserid").val($(this).val())
                }
            })
        }
        getnow()
    } else {
        $(".user").each(function () {
            if (Number($(this).attr('layer')) > layers) {
                $(this).remove()
            }
        });
        $("#saveuserid").val(uid);
        $.ajax({
            type: 'POST',
            url: mulu + 'suser',
            dataType: 'json',
            cache: false,
            data: 'xtype=createson&uid=' + uid,
            success: function (m) {
                var str = "<select class=user layer=" + (layers + 1) + ">";
                str += "<option value=''>选择" + layernames['w' + wid][layers] + "</option>";
                var mlength = m.length;
                for (i = 0; i < mlength; i++) {
                    str += "<option value='" + m[i]['userid'] + "' wid='" + m[i]['wid'] + "'>" + m[i]['username'] + "</option>"
                }
                str += "</select>";
                $(".user").parent().append(str);
                addchange();
            }
        });
        getnow()
    }
}

function getnow() {
    var puserid = $("#saveuserid").val();
    var psize = $("#psize").val();
    var qishu = $("#qishu").val();
    var gid = $("#game").val();
    var bid = $(".bid").val();
    var cid = $(".cid").val();
    var sid = $(".sid").val();
    var z = $("#z").val();
    var orderby = $(".sort").attr("orderby");
    var sorttype = $(".sort").attr("sorttype");
    var page = $(".sort").attr("page");
    var xtype = $(".xtype").val();
    var fs = $("input[name='fs']:checked").val();
    var start = $("#start").val();
    var end = $("#end").val();
    if (Number(start.replace('-', '')) > Number(end.replace('-', '')) & fs == '0') {
        alert('开始日期不能大于结束日期！');
        return false
    }
    $(".nowtb tbody").empty();
    if ($("input[name='xinfo']").prop("checked")) {
        var xinfo = 1;
    } else {
        var xinfo = 0;
    }
    if (xinfo == 1) {
        $(".nowtb .bt th").show();
        $(".nowtb").removeClass('w1260');
        $(".nowtb").addClass('w1560');
    } else {
        $(".nowtb .bt th").each(function () {
            if (!$(this).hasClass('xf')) $(this).hide();
        });
        $(".nowtb").addClass('w1260');
        $(".nowtb").removeClass('w1560');
    }
    var melayer = Number($("#topid").attr('layer'));
    var username = $("#username").val();
    var str = "&username=" + username +"&gid=" + gid + "&bid=" + bid + "&sid=" + sid + "&cid=" + cid + "&z=" + z + "&psize=" + psize + "&page=" + page + "&puserid=" + puserid + "&fs=" + fs + "&qishu=" + qishu + "&start=" + start + "&end=" + end + "&xtypes=" + xtype + "&orderby=" + orderby + "&sorttype=" + sorttype + "&xinfo=" + xinfo;

    $.ajax({
        type: 'POST',
        url: mulu + 'nows',
        data: 'xtype=getnow' + str,
        dataType: 'json',
        cache: false,
        success: function (m) {
            //alert(m);return;
            var ml = m['tz'].length;
            var str = '';

            for (i = 0; i < ml; i++) {
                str += "<tr class='c";
                if (Number(m['tz'][i]['z']) == 1) str += " z1";
                if (Number(m['tz'][i]['z']) == 2) str += " z2";
                if (Number(m['tz'][i]['z']) == 3) str += " z3";
                str += "' gid='"+m['tz'][i]['gids']+"'>";
                str += "<td><input type='checkbox' id='" + m['tz'][i]['id'] + "'  value='" + m['tz'][i]['id'] + m['tz'][i]['tid'] + m['tz'][i]['userid'] + "' /></td>";
                str += "<td><a href='javascript:void(0);' class='edit'>修改</a>&nbsp;<a href='javascript:void(0);' class='del'>删除</a></td>";
                str += "<td>" + m['tz'][i]['gid'] + "</td>";
                str += "<td>" + m['tz'][i]['qishu'] + "</td>";
                str += "<td>" + m['tz'][i]['tid'] + "</td>";
                str += "<td>" + m['tz'][i]['xtype'] + "</td>";
                //str += "<td>" + m['tz'][i]['bid'] + "-" + m['tz'][i]['sid'] + "-" + m['tz'][i]['cid'] + ":" + inputs('pid', m['tz'][i]['pid']) + "</td>";
                if((m['tz'][i]['fl']==107 & m['tz'][i]['bids']!=23378805 ) | (m['tz'][i]['fl']==101 & m['tz'][i]['bids']==23378755) ){
                    str += "<td>" + selectsb(m['tz'][i]['fl'],'sid', m['tz'][i]['sid']) + ":" + selects(m['tz'][i]['fl'],'pid', m['tz'][i]['pid']) + "</td>";
                }else{
                    str += "<td>" + m['tz'][i]['bid'] + "-" + m['tz'][i]['sid'] + "-" + m['tz'][i]['cid'] + ":" + inputs('pid', m['tz'][i]['pid']) + "</td>";
                }
                str += "<td>" + m['tz'][i]['abcd'] + "</td>";
                str += "<td>" + m['tz'][i]['ab'] + "</td>";

                str += "<td>" + inputs('zz', m['tz'][i]['z']) + "</td>";
                str += "<td>" + inputs('con', m['tz'][i]['con']) + "</td>";
                if (Number(m['tz'][i]['me']) == 1) {
                    str += "<td>" + inputs('je', m['tz'][i]['je']) + "</td>"
                } else {
                    str += "<td><label>" + m['tz'][i]['zcje'] + "</label>/" + inputs('je', m['tz'][i]['je']) + "</td>"
                }
                str += "<td>" + inputs('peilv1', m['tz'][i]['peilv1']) + '/' + m['tz'][i]['peilv2'] + "</td>";
                str += "<td>" + inputs('points', m['tz'][i]['points']) + "</td>";
                str += "<td>" + m['tz'][i]['user'] + "</td>";
                str += "<td>" + inputs('time', m['tz'][i]['xtime']) + "</td>";
                if (xinfo == 1) {
                    if (melayer < (maxlayer - 1)) str += "<td>" + m['tz'][i]['duser'] + "</td>";
                    for (j = melayer; j < maxlayer; j++) {
                        str += "<td>" + m['tz'][i]['zc' + j] + "</td>";
                        if (j != 0) {
                            str += "<td>" + inputs('pl peilv1' + j, m['tz'][i]['peilv1' + j]) + "</td>";
                            str += "<td>" + inputs('ps points' + j, m['tz'][i]['points' + j]) + "</td>"
                        }
                    }
                }
                str += "</tr>"
            }
            $(".nowtb thead tr.bt").remove();
            $(".nowtb thead").prepend("<tr class='bt'><td colspan=3><a href='javascript:void(0)' class='delall' >删除选中</a>&nbsp;&nbsp;<a href='javascript:void(0)' class='editall' >修改选中</a></td><td colspan=37>" + m['page'] + "</td></tr>");
            $(".nowtb tbody").append(str);
            $(".nowtb .time").removeClass('txts');
            $(".nowtb .time").addClass('txts2');
            $(".nowtb a.page").click(function () {
                $("#page").val(Number($(this).html()));
                getnow()
            });
            changeh(document.documentElement.scrollHeight + 500);
            ;
            str = null;
            m = null;
            addfunc()

        }
    })
}

function getb() {
    var gid = $("#game").val();
    $.ajax({
        type: 'POST',
        url: mulu + 'xxtz',
        dataType: 'json',
        data: 'xtype=getb&gid=' + gid,
        cache: false,
        success: function (m) {
            var ml = m.length;
            $(".bid").empty();
            $(".sid").empty();
            $(".cid").empty();
            str = "<option value=''>全部</option>";
            $(".bid").append(str);
            for (i = 0; i < ml; i++) {
                str = "<option value='" + m[i]['bid'] + "'>" + m[i]['name'] + "</option>";
                $(".bid").append(str)
            }
            getnow();
            str = null;
            m = null
        }
    })
}

function gets() {
    var bid = $(".bid").val();
    var gid = $("#game").val();
    $.ajax({
        type: 'POST',
        url: mulu + 'xxtz',
        dataType: 'json',
        data: 'xtype=gets&bid=' + bid + "&gid=" + gid,
        cache: false,
        success: function (m) {
            var ml = m.length;
            $(".sid").empty();
            $(".cid").empty();
            str = "<option value=''>全部</option>";
            $(".sid").append(str);
            for (i = 0; i < ml; i++) {
                str = "<option value='" + m[i]['sid'] + "'>" + m[i]['name'] + "</option>";
                $(".sid").append(str)
            }
            getnow();
            str = null;
            m = null
        }
    })
}

function getc() {
    var bid = $(".bid").val();
    var sid = $(".sid").val();
    var gid = $("#game").val();
    $.ajax({
        type: 'POST',
        url: mulu + 'xxtz',
        dataType: 'json',
        data: 'xtype=getc&bid=' + bid + "&sid=" + sid + "&gid=" + gid,
        cache: false,
        success: function (m) {
            var ml = m.length;
            $(".cid").empty();
            str = "<option value=''>全部</option>";
            $(".cid").append(str);
            for (i = 0; i < ml; i++) {
                str = "<option value='" + m[i]['cid'] + "'>" + m[i]['name'] + "</option>";
                $(".cid").append(str)
            }
            getnow();
            str = null;
            m = null
        }
    })
}

function inputs(classes, val) {
    var str = "<input type='text' class='" + classes + " txts' value='" + val + "'  title='" + val + "'  />";
    return str
}
function selects(fl,classes,val){
    if(fl==107){
        arr = [1,2,3,4,5,6,7,8,9,10,'大','小','单','双'];
    }else if(fl==101){
        arr = [0,1,2,3,4,5,6,7,8,9,'大','小','单','双'];
    }
    var str=val+"<select class='"+classes+"' style='width:40px;'>";
    for( var i in arr){
        str += "<option value='"+arr[i]+"' ";
        if(val==arr[i]) str += "selected";
        str += " >"+arr[i]+"</option>";
    }
    str += "</select>";
    return str;
}
function selectsb(fl,classes,val){
    if(fl==107){
        arr = ['冠军','亚军','第三名','第四名','第五名','第六名','第七名','第八名','第九名','第十名'];
    }else if(fl==101){
        arr = ['第一球','第二球','第三球','第四球','第五球'];
    }
    var str=val+"<select class='"+classes+"' style='width:65px;'>";
    for( var i in arr){
        str += "<option value='"+arr[i]+"' ";
        if(val==arr[i]) str += "selected";
        str += " >"+arr[i]+"</option>";
    }
    str += "</select>";
    return str;
}
function addfunc() {
    $(".delall").click(function () {
        var tid = gettid();
        if (strlen(tid) < 16) return false;
        if (!confirm("确定删除注单吗？")) return false;
        $.ajax({
            type: 'POST',
            url: mulu + 'nows',
            data: 'xtype=deltz&tid=' + tid,
            dataType: 'json',
            cache: false,
            success: function (m) {
                if (Number(m) == 1) {
                    $(".nowtb input:checkbox").each(function () {
                        if (tid.indexOf($(this).val()) != -1 & !$(this).hasClass('clickall') & $(this).val() != undefined) {
                            $(this).parent().parent().remove()
                        }
                    })
                }
            }
        })
    });
    $(".del").click(function () {
        $(this).parent().parent().find("input:checkbox").attr("checked", true);
        $(".delall").click()
    });
    $(".edit").click(function () {
        $(this).parent().parent().find("input:checkbox").attr("checked", true);
        $(".editall").click()
    });
    $(".editall").click(function () {
        var str = '{';
        var i = 0;
        $(".nowtb input:checkbox").each(function() {
            if ($(this).prop('checked') == true & !$(this).hasClass('clickall') & $(this).val() != undefined) {
                if (i > 0) str += ',';
                var obj = $(this).parent().parent();
                str += '"' + i + '":{"gid":"' + obj.attr('gid') + '","tid":"' + $(this).val() + '","sid":"' + obj.find(".sid").val() + '","pid":"' + obj.find(".pid").val() + '","z":"' + obj.find(".zz").val() + '","con":"' + obj.find(".con").val() + '","je":"' + obj.find(".je").val() + '","peilv1":"' + obj.find(".peilv1").val() + '","points":"' + obj.find(".points").val() + '","time":"' + obj.find(".time").val() + '"';
                for (j = 1; j < 9; j++) {
                    points = 'points' + j;
                    peilv1 = 'peilv1' + j;
                    str += ',"' + points + '":"' + obj.find("." + points).val() + '"';
                    str += ',"' + peilv1 + '":"' + obj.find("." + peilv1).val() + '"'
                }
                str += '}';
                i++
            }
        });
        str += '}';
        if (strlen(str) < 50) return false;
        $.ajax({
            type: 'POST',
            url: mulu + 'nows',
            data: 'xtype=edittz&str=' + str,
            cache: false,
            success: function (m) {
                if (Number(m) == 1) {
                    alert('ok');
                    var uid = Number($(".nowuser").attr('uid'));
                    getnow()
                }
            }
        })
    });
    $(".clickall").click(function () {
        if ($(this).prop('checked') == true) $(".nowtb input:checkbox").attr("checked", true);
        else $(".nowtb input:checkbox").attr("checked", false)
    })
}

function gettid() {
    var idstr = '|';
    $(".nowtb input:checkbox").each(function () {
        if ($(this).prop('checked') == true & !$(this).hasClass('clickall') & $(this).val() != undefined) {
            idstr += $(this).val() + '|'
        }
    });
    return idstr
}

function getResult(num, n) {
    return Math.round(num * Math.pow(10, n)) / Math.pow(10, n)
}

function getresult(num, n) {
    return num.toString().replace(new RegExp("^(\\-?\\d*\\.?\\d{0," + n + "})(\\d*)$"), "$1") + 0
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