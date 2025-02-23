function myready(){
 $("a.games").click(function(){
       $("a.games").removeClass("selected");
       $(this).addClass("selected");
       $("tr.gametr").hide();
       //alert("tr.gametr.g"+$(this).attr("gid"))
       $("tr.gametr.g"+$(this).attr("gid")).show();
   });
   $("a.games:eq(0)").click();
    $(".qd").click(function(){
        $.ajax({
            type:'POST',
            url:"userinfo",
            data:"xtype=setdefaultpan&pan="+$("#abcd").val(),
            success:function(m){
                if(Number(m)==1){
                    alert('ok');
                }
            }
        });
    });
}

