function myready() {
    changeh(document.documentElement.scrollHeight+500);;
    $("input:text").addClass('txt1');

    $(".bid").change(function() {
        var bid = $(this).val();
        if (bid == '') return;
       window.location.href = mulu + "play?xtype=show&bid=" + bid;

    });
    $(".sid").change(function() {
        var bid = $(".bid").val();
        var sid = $(this).val();
        if (sid == '') return;
       window.location.href = mulu + "play?xtype=show&bid=" + bid + "&sid=" + sid;

    });
    $(".cid").change(function() {
        var bid = $(".bid").val();
        var sid = $(this).val();
        var cid = $(this).val();
        if (cid == '') return;
       window.location.href = mulu + "play?xtype=show&bid=" + bid + "&sid=" + sid + "&cid=" + cid;

    });

    $("#bid").change(function() {
        var bid = $(this).val();
        if (bid == '') {
            $("#sid").html("<option value=''>小分类</option>");
            return;

        }
        $("#cid").html("<option value=''>分类</option>");
        $.ajax({
            type: 'POST',
            url: mulu + 'class',
            dataType: 'json',
            data: 'xtype=gets&bid=' + bid,
            success: function(m) {
                var ml = m.length;
                str = "<option value=''>小分类</option>";
                for (i = 0; i < ml; i++) {
                    str += "<option value='" + m[i]['sid'] + "'>" + m[i]['name'] + "</option>";

                }
                $("#sid").html(str);
                str = null;
                m = null;

            }

        });

    });

    $("#sid").change(function() {
        var sid = $(this).val();
        var bid = $("#bid").val();
        if (sid == '') {
            $("#cid").html("<option value=''>分类</option>");
            return;

        }

        $.ajax({
            type: 'POST',
            url: mulu + 'class',
            dataType: 'json',
            data: 'xtype=getc&sid=' + sid + "&bid=" + bid,
            success: function(m) {

                var ml = m.length;
                str = "<option value=''>分类</option>";
                for (i = 0; i < ml; i++) {
                    str += "<option value='" + m[i]['cid'] + "'>" + m[i]['name'] + "</option>";

                }
                $("#cid").html(str);
                str = null;
                m = null;

            }

        });

    });


    $("#add").click(function() {
        var bid = $("#bid").val();
        var sid = $("#sid").val();
        var cid = $("#cid").val();
        var name = $("#name").val();
        var peilv1 = $("#peilv1").val();
        var peilv2 = $("#peilv2").val();
        var ztype = $("#ztype").val();
        var znum1 = $("#znum1").val();
        var znum2 = $("#znum2").val();
        if (name == '') {
            alert("请输入名称");
            return false;

        }
        if (bid == '') {
            alert('请选择大分类');
            return false;

        }
        if (sid == '') {
            alert('请选择小分类');
            return false;

        }
        if (cid == '') {
            alert('请选择分类');
            return false;

        }
        if ((Number(peilv1) * 1000) % 1 != 0 | (Number(peilv2) * 1000) % 1 != 0) {
            alert("请输入正确的赔率");
            return false;

        }
        if (ztype == '') {
            alert("请选择奖金类型");
            return false;

        }
        var str = '&bid=' + bid + "&sid=" + sid + "&cid=" + cid + "&name=" + name + "&peilv1=" + peilv1 + "&peilv2=" + peilv2 + "&ztype=" + ztype + "&znum1=" + znum1 + "&znum2=" + znum2;
        $.ajax({
            type: "POST",
            url: mulu + 'play',
            data: 'xtype=addplay' + str,
            success: function(m) {
                if (Number(m) == 1) window.location.href = window.location.href;

            }

        });

    });

    $("#edit").click(function() {

        var str = '{';
        var i = 0;
        $(".s_tb tr").find("td:first").find("input:checkbox").each(function() {
            if ($(this).prop('checked') == true) {
                var bid = $(this).parent().parent().find("td:eq(2)").find("input:text").val();
                var sid = $(this).parent().parent().find("td:eq(3)").find("input:text").val();
                var cid = $(this).parent().parent().find("td:eq(4)").find("input:text").val();
                var name = $(this).parent().parent().find(".names").val();
                var peilv1 = $(this).parent().parent().find(".peilv1").val();
                var peilv2 = $(this).parent().parent().find(".peilv2").val();
                var ztype = $(this).parent().parent().find(".ztype").val();
                var znum1 = $(this).parent().parent().find(".znum1").val();
                var znum2 = $(this).parent().parent().find(".znum2").val();
                var pid = $(this).parent().parent().find("td:eq(1)").html();
                var xsort = $(this).parent().parent().find(".xsort").val();
                var ptype = $(this).parent().parent().find(".ptype").val();
                var ifok;
                if ($(this).parent().parent().find(".ifok").prop('checked') == true) {
                    ifok = 1

                } else {
                    ifok = 0

                }
                if (name == '') {
                    alert("请输入名称");
                    return false;

                }

                if ((Number(peilv1) * 10000) % 1 != 0 | (Number(peilv2) * 10000) % 1 != 0) {
                    //alert("请输入正确的赔率");
                    //return false;

                }

                if (i > 0) str += ',';
                str += '"' + i + '":{"name":"' + name + '","cid":"' + cid + '","xs":"' + xsort + '","bid":"' + bid + '","sid":"' + sid + '","ztype":"' + ztype + '","peilv1":"' + peilv1 + '","ifok":"' + ifok + '","znum1":"' + znum1 + '","znum2":"' + znum2 + '","peilv2":"' + peilv2 + '","pid":"'+pid+'","ptype":"'+ptype+'"}';
                i++

            }

        });
		
        str += '}';
        $.ajax({
            type: "POST",
            url: mulu + 'play',
            data: 'xtype=editplay&str=' + str,
            success: function(m) {
				
                if (Number(m) == 1) window.location.href = window.location.href;

            }

        });



    });

    $("#clickall").click(function() {
        if ($(this).prop('checked') == true) {
            $(".s_tb tr").find("td:first").find("input:checkbox").attr('checked', true);

        } else {
            $(".s_tb tr").find("td:first").find("input:checkbox").attr('checked', false);

        }

    });
    $("#delall").click(function() {
        var idstr = '|';
        $(".s_tb tr").find("td:first").each(function() {
            if ($(this).find("input:checkbox").prop("checked") == true) {
                idstr += $(this).find("input:checkbox").val() + "|";

            }

        });
        del(idstr);

    });

    $(".delone").click(function() {
        var idstr = '|' + $(this).parent().parent().find("td:first").find("input:checkbox").val() + '|';
        del(idstr);

    });

    $(".bid:eq(0)").change(function() {
        var bid = $(this).val();
       window.location.href = mulu + "play?xtype=show&bid=" + bid;

    });
    $(".sid:eq(0)").change(function() {
        var sid = $(this).val();
        var bid = $(".bid:eq(0)").val();
       window.location.href = mulu + "play?xtype=show&bid=" + bid + "&sid=" + sid;

    });
	
    $(".cid:eq(0)").change(function() {
        var cid = $(this).val();
		var sid = $(".sid:eq(0)").val();
        var bid = $(".bid:eq(0)").val();
       window.location.href = mulu + "play?xtype=show&bid=" + bid + "&sid=" + sid+"&cid="+cid;

    });


}


function del(idstr) {
    if (!confirm("确定要删除吗？")) return false;

    $.ajax({
        type: 'POST',
        url: mulu + 'play',
        data: 'xtype=delplay&idstr=' + idstr,
        success: function(m) {
            if (Number(m) == 1) {
                window.location.href = window.location.href;

            }

        }

    });

}