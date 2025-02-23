  var cnews = {+$cnews+};
  var index = 1;
function myready(){
    $(".naviga3").click(function() {
        $(".zhao").removeClass("ivfTfC").addClass("OSUUp");
        $(".menu").removeClass("iJamhB").addClass("efUsXr");
    });
    $(".zhao").click(function() {
        $(".zhao").removeClass("OSUUp").addClass("ivfTfC");
        $(".menu").removeClass("efUsXr").addClass("iJamhB");
    });
    $("a.refresh").click(function() {
        window.location.href = window.location.href;
    });
    if (cnews > 0) {
        $(".prev-btn").click(function() {
            index--;
            if (index < 1) index = 1;
            $("pre").hide();
            $("#r" + index).show();
            $(".total").html(index + "/" + cnews);
        });
        $(".next-btn").click(function() {
            index++;
            if (index > cnews) {
                $(".ReactModalPortal").html('');
                return false;
            }
            $("pre").hide();
            $("#r" + index).show();
            $(".total").html(index + "/" + cnews);
        });
        $(".close-btn").click(function() {
            $(".ReactModalPortal").html('');
        });
        $("#r" + index).show();
        $(".total").html(index + "/" + cnews);
    }
    $(".menu_type a").click(function() {
        var type = $(this).attr("type");
        if (type == 'home') {
            $(".menu").hide();
            $(".zhao").hide();
        } else if (type == "logout") {
           window.location.href = mulu + "home.php?logout=yes";
        } else {
           window.location.href = mulu + "other.php?xtype=show&type=" + type;
        }
    });
    $(".game a").click(function() {
         window.location.href = mulu + "make.php?xtype=show&type=lib&gids="+$(this).attr("gid");
    });
}