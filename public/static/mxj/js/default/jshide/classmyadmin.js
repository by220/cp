function myready() {
    $("input:text").addClass('txt1');
    $("#add").click(function() {
        var name = $("#name").val();
        var bid = $("#bid").val();
        var sid = $("#sid").val();
        var mtype = $("#mtype").val();
        var ftype = $("#ftype").val();
        if (name == '') {
            alert("请输入分类名称");
            return false
        }
        if (bid == '') {
            alert("请选择大分类");
            return false
        }
        if (sid == '') {
            alert("请选择小分类");
            return false
        }
        if (mtype == '') {
           // alert("请选择码类型");
            //return false
        }
        if (ftype == '') {
            //alert("请选择面类型");
            //return false
        }

        $.ajax({
            type: 'POST',
            url: mulu + 'classs',
            data: 'xtype=addc&name=' + name + "&bid=" + bid + "&mtype=" + mtype + "&ftype=" + ftype + "&sid=" + sid,
            success: function(m) {
                if (Number(m) == 1) {
                    window.location.href = window.location.href
                }
            }
        })
    });
    $("#edit").click(function() {
        var str = '{';
        var i = 0;
        $(".s_tb tr").find("td:first").find("input:checkbox").each(function() {
            if ($(this).prop('checked') == true) {
                var name = $(this).parent().parent().find(".name").val();
                var cid = $(this).parent().parent().find(".name").attr('cid');
                var xsort = $(this).parent().parent().find(".xsort").val();
                var bid = $(this).parent().parent().find("td:eq(2)").find("input:text").val();
                var sid = $(this).parent().parent().find("td:eq(3)").find("input:text").val();
                var mtype = $(this).parent().parent().find(".mtype").val();
                var ftype = $(this).parent().parent().find(".ftype").val();
				var dftype = $(this).parent().parent().find(".dftype").val();
                var ifok;
                if ($(this).parent().parent().find(".ifok").prop('checked') == true) {
                    ifok = 1
                } else {
                    ifok = 0
                }
                var abcd;
                if ($(this).parent().parent().find(".abcd").prop('checked') == true) {
                    abcd = 1
                } else {
                    abcd = 0
                }
                var ab;
                if ($(this).parent().parent().find(".ab").prop('checked') == true) {
                    ab = 1
                } else {
                    ab = 0
                }
                var xshow;
                if ($(this).parent().parent().find(".xshow").prop('checked') == true) {
                    xshow = 1
                } else {
                    xshow = 0
                }
                var one;
                if ($(this).parent().parent().find(".one").prop('checked') == true) {
                    one = 1
                } else {
                    one = 0
                }
                if (i > 0) str += ',';
                str += '"' + i + '":{"name":"' + name + '","cid":"' + cid + '","xst":"' + xsort + '","bid":"' + bid + '","sid":"' + sid + '","mtype":"' + mtype + '","ftype":"' + ftype + '","dftype":"' + dftype + '","ifok":"' + ifok + '","abcd":"' + abcd + '","ab":"' + ab + '","xshow":"' + xshow + '","one":"'+one+'"}';
                i++
            }
        });
        str += '}';
   
        $.ajax({
            type: 'POST',
            url: mulu + 'classs',
            data: 'xtype=editc&arr=' + str,
            success: function(m) {
				$("#test").html(m);
                if (Number(m) == 1) {
                    window.location.href = window.location.href
                }
            }
        })
    });
    $("#clickall").click(function() {
        if ($(this).prop('checked') == true) {
            $(".s_tb tr").find("td:first").find("input:checkbox").attr('checked', true)
        } else {
            $(".s_tb tr").find("td:first").find("input:checkbox").attr('checked', false)
        }
    });
    $("#delall").click(function() {
        var idstr = '|';
        $(".s_tb tr").find("td:first").each(function() {
            if ($(this).find("input:checkbox").prop("checked") == true) {
                idstr += $(this).find("input:checkbox").val() + "|"
            }
        });
        del(idstr)
    });
    $(".delone").click(function() {
        var idstr = '|' + $(this).parent().parent().find("td:first").find("input:checkbox").val() + '|';
        del(idstr)
    });
    $(".bid").change(function() {
        var bid = $(this).val();
       window.location.href = mulu + "classs?xtype=class&bid=" + bid
    });
    $(".sid").change(function() {
        var bid = $(".bid").val();
        var sid = $(".sid").val();
       window.location.href = mulu + "classs?xtype=class&bid=" + bid + "&sid=" + sid
    });
	
    $("#bid").change(function() {
        var bid = $(this).val();
		if(bid==''){		    
			$("#sid").html("<option value=''>小分类</option>");
			return;
		}
        $.ajax({
            type: 'POST',
            url: mulu + 'classs',
			dataType:'json',
            data: 'xtype=gets&bid=' + bid,
            success: function(m) {
                 var ml = m.length;
				 str = "<option value=''>小分类</option>";
				 for(i=0;i<ml;i++){
				     str += "<option value='"+m[i]['sid']+"'>"+m[i]['name']+"</option>";
				 }
				 $("#sid").html(str);
				 str = null;
				 m=null;
            }
        });
    });
}
function del(idstr) {
    if (!confirm("确定要删除吗？")) return false;
    $.ajax({
        type: 'POST',
        url: mulu + 'classs',
        data: 'xtype=delc&idstr=' + idstr,
        success: function(m) {
            if (Number(m) == 1) {
                window.location.href = window.location.href
            }
        }
    })
}