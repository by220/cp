$(function() {
    // var csrftoken = $('meta[name=csrf-token]').attr('content');

    $.ajaxSetup({
        // beforeSend: function(xhr, settings) {
        //     if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
        //         xhr.setRequestHeader("X-CSRFToken", csrftoken)
        //     }
        // },
        cache: false
    });


    $('marquee').marquee('mymarquee');

    $('.myalert').on("click", function() {
        var $this = $(this);
        layer.alert($this.html(),{
            'title': '提示',
            'maxWidth': 500
        });
    });

});