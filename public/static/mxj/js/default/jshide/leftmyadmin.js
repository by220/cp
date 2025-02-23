// JavaScript Document

function myready() {
    $(".menu li a").click(function () {
        var url = $(this).attr('x');
		if(url=='' | url==undefined) return;
        if (url == 'user') {
            parent.right.window.location.href = url + "?xtype=show&layer=" + $(this).attr('u');
        } else if (url == 'top') {
            parent.right.window.location.href = url + "?logout=yes";
        } else if (url == 'admins') {
            parent.right.window.location.href = url + "?xtype=list";
        } else if (url == 'class') {
            parent.right.window.location.href = url + "?xtype=bigclass";
        } else if (url == 'setatt') {
            parent.right.window.location.href = "zshui?xtype=setattshow";
        } else {
            parent.right.window.location.href = url + "?xtype=show";
        }
		return false;
    });
}