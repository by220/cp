function myready() {
    changeh(document.documentElement.scrollHeight+500);

    $(".edit").click(function() {
        var str = '{';
        var j = 0;
        $(".s_tb tr").each(function(i) {
            if (i > 1) {
                var id = $(this).find(".class").val();
                var name = $(this).find(".name").html();
                var abcd;
                if ($(this).find(".abcd").prop("checked") == true) abcd = 1;
                else abcd = 0;
                var ab;
                if ($(this).find(".ab").prop("checked") == true) ab = 1;
                else ab = 0;
				var ifok;
                if ($(this).find(".ifok").prop("checked") == true) ifok = 1;
                else ifok = 0;
                if (j > 0) str += ',';
                str += '"' + j + '":{"name":"' + name + '","class":"' + id + '","abcd":"' + abcd + '","ab":"' + ab + '","ifok":"' + ifok + '"}';
				j++;

            }

        });



        str += '}';

        $.ajax({
            type: 'POST',
            url: mulu + 'classs',
            data: 'xtype=editpan&str=' + str+"&gid="+$(".game").val(),
            success: function(m) {
				$('#test').html(m)
                if (Number(m) == 1) {
                    window.location.href = window.location.href;

                }

            }

        });


    });
	
   $("th.abcd").click(function(){
	   if($("input.abcd:eq(0)").prop("checked")){
	      $("input.abcd").prop("checked",false);
	   }else{
	      $("input.abcd").prop("checked",true);
	   }
   });
   
   $("th.ab").click(function(){
	   if($("input.ab:eq(0)").prop("checked")){
	      $("input.ab").prop("checked",false);
	   }else{
	      $("input.ab").prop("checked",true);
	   }
   });
	
	$(".game").change(function(){
	    window.location.href= "classs?xtype=classpan&gid="+$(".game").val();
	});
    $("input:text").addClass('txt2');




}