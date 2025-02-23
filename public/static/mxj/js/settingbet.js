$(function() {
    $("#settingbet").dialog({
        autoOpen: false,
        modal: true,
        width: 270,
        show: {
            duration: 500
        },
        hide: {
            duration: 500
        }
    })
});
function showsetting() {
    var c = LIBS.cookie("defaultSetting");
    if (c) {
        var a = c.split(",");
        for (i = 0; i < a.length; i++) {
            $(".ds").eq(i).val(a[i])
        }
    }
    var b = LIBS.cookie("settingChecked");
    if (!b) {
        b = 1
    }
    $("input[name='settingbet'][value=" + b + "]").prop("checked", true);
    $("#settingbet").dialog("open")
}
function submitsetting() {
    var b = new Array();
    for (i = 0; i < 8; i++) {
        var a = $(".ds").eq(i).val();
        if (a) {
            b.push(a)
        }
    }
    var c = $("input[name=settingbet]:checked").val();
    if (c == 0) {
        setTimeout(function() {
            parent.showMsg("停用后，如需启用需至快选金额设定视窗点选启用！")
        }, 500)
    }
    LIBS.cookie("defaultSetting", b);
    LIBS.cookie("settingChecked", c);
    $("#settingbet").dialog("close")
}
;