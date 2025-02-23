var page = 1;

function myready() {
	changeh(document.documentElement.scrollHeight + 500);
	$(".data_table td").mouseover(function() {
		$(this).parent().addClass("hover")
	}).mouseout(function() {
		$(this).parent().removeClass("hover")
	});
	var pcount = Number($(".page_info").attr('pcount'));
	page = Number($(".page_info").attr('page'));
	var pstr = "<a class='prev'>前一页</a>『";
	for (i = 1; i <= pcount; i++) {
		if (i == page) {
			pstr += "<span class='current'>&nbsp;" + i + "&nbsp;</span>"
		} else {
			pstr += "&nbsp;<a href='javascript:void(0)' class='p'>" + i + "</a>&nbsp;"
		}
	}
	pstr += "』<a class='next'>后一页</a>";
	$(".page_control").html(pstr);
	pstr = null;
	$(".page a").click(function() {
		if ($(this).hasClass('prev')) {
			page -= 1
		} else if ($(this).hasClass('next')) {
			page += 1
		} else {
			page = Number($(this).html())
		}
		if (page < 1) page = 1;
		if (page > pcount) page = pcount;
		geturl()
	})
	$(".back").click(function() {
        window.history.back();
	});
}
function geturl() {
	window.location.href = "suser?xtype=moneylog&uid=" + $(".page_info").attr('uid') + "&page=" + page;
}