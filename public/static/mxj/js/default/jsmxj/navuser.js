$(function() {
	var bwc = browserCheck();
	if (bwc == 'qq') {
		$(".notice").html('<div>添加“手机下注”快捷方式到桌面：在浏览器主页添加了网页—长按网站图标—移动到页头“拖到此处，发到手机桌面”—添加成功</div>')
	} else if (bwc == 'uc') {
		$(".notice").html('<div>添加“手机下注”快捷方式到桌面：点击地址栏的星图标<img src="../imgn/mobi/star.png"/>—弹出菜单选择“发送至桌面”—添加成功</div>')
	} else if (bwc == 'chrome') {
		$(".notice").html('<div>添加“手机下注”快捷方式到桌面：请按<img src="../imgn/mobi/list.png"/>，点击“添加到”—选择“主页”—添加成功</div>')
	} else if (bwc == 'oupeng') {
		$(".notice").html('<div>添加“手机下注”快捷方式到桌面：点击地址栏的星图标<img src="../imgn/mobi/star.png"/>—弹出菜单选择“添加到主页”—添加成功</div>')
	}
	$(".logout").click(function() {
		window.location.href = "make.php?logout=yes";
		return false;
	});
	$(".homenav").click(function(){
	    var gid = $(this).attr('gid');
		window.location.href = "make.php?xtype=show&gids="+gid;
		return false;
	});
	$("p.lib").click(function(){
	   window.location.href = mulu + "lib.php?xtype=lib";
		return false;
	});
	$("p.kj").click(function(){
	   window.location.href = mulu + "kj.php?xtype=kj";
		return false;
	});
	$("p.bao").click(function(){
	   window.location.href = mulu + "bao.php?xtype=bao";
		return false;
	});
	$("p.cpass").click(function(){
	   window.location.href = mulu + "cpass.php?xtype=cpass";
		return false;
	});
	$("p.uinfo").click(function(){
	   window.location.href = mulu + "uinfo.php?xtype=uinfo";
		return false;
	});
	$("p.quehuan").click(function(){
	   window.location.href = mulu + "../mobi2/";		
		return false;
	});
});

function browserCheck() {
	var u = window.navigator.userAgent;
	if (u.indexOf('MQQBrowser') > -1) {
		return "qq"
	} else if (u.indexOf('UCBrowser') > -1 || u.indexOf('U3') > -1) {
		return "uc"
	} else if (u.indexOf('Oupeng') > -1) {
		return "oupeng"
	} else if (u.indexOf('iPhone') > -1) {
		return "iphone"
	} else {
		return "chrome"
	}
};