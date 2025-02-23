function DX(money) {
  //汉字的数字
  var cnNums = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九');
  //基本单位
  var cnIntRadice = new Array('', '拾', '百', '千');
  //对应整数部分扩展单位
  var cnIntUnits = new Array('', '万', '亿', '兆');
  //对应小数部分单位
  var cnDecUnits = new Array('角', '分', '毫', '厘');
  //整数金额时后面跟的字符
  var cnInteger = '整';
  //整型完以后的单位
  var cnIntLast = '元';
  //最大处理的数字
  var maxNum = 999999999999999.9999;
  //金额整数部分
  var integerNum;
  //金额小数部分
  var decimalNum;
  //输出的中文金额字符串
  var chineseStr = '';
  //分离金额后用的数组，预定义
  var parts;
  if (money == '') { return ''; }
  money = parseFloat(money);
  if (money >= maxNum) {
    //超出最大处理数字
    return '';
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  //转换为字符串
  money = money.toString();
  if (money.indexOf('.') == -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0;
    var IntLen = integerNum.length;
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1);
      var p = IntLen - i - 1;
      var q = p / 4;
      var m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        //归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  //小数部分
  if (decimalNum != '') {
    var decLen = decimalNum.length;
    for (var i = 0; i < decLen; i++) {
      var n = decimalNum.substr(i, 1);
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }
  return chineseStr;
}



function json_encode_js(aaa) {
	function je(str) {
		var a = [],
			i = 0;
		var pcs = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		for (; i < str.length; i++) {
			if (pcs.indexOf(str[i]) == -1) a[i] = "\\u" + ("0000" + str.charCodeAt(i).toString(16)).slice(-4);
			else a[i] = str[i]
		}
		return a.join("")
	}
	var i, s, a, aa = [];
	if (typeof(aaa) != "object") {
		alert("ERROR json");
		return
	}
	for (i in aaa) {
		s = aaa[i];
		a = '"' + je(i) + '":';
		if (typeof(s) == 'object') {
			a += json_encode_js(s)
		} else {
			if (typeof(s) == 'string') a += '"' + je(s) + '"';
			else if (typeof(s) == 'number') a += s
		}
		aa[aa.length] = a
	}
	return "{" + aa.join(",") + "}"
}
function getResult(num, n) {
	return Math.round(num * Math.pow(10, n)) / Math.pow(10, n)
}
function getresult(num, n) {
	return num.toString().replace(new RegExp("^(\\-?\\d*\\.?\\d{0," + n + "})(\\d*)$"), "$1") + 0
}
function strlen(sString) {
	var sStr, iCount, i, strTemp;
	iCount = 0;
	sStr = sString.split("");
	for (i = 0; i < sStr.length; i++) {
		strTemp = escape(sStr[i]);
		if (strTemp.indexOf("%u", 0) == -1) {
			iCount = iCount + 1
		} else {
			iCount = iCount + 2
		}
	}
	return iCount
}
function C(arr, num) {
	var r = [];
	(function f(t, a, n) {
		if (n == 0) return r.push(t);
		for (var i = 0, l = a.length; i <= l - n; i++) {
			f(t.concat(a[i]), a.slice(i + 1), n - 1)
		}
	})([], arr, num);
	return r
}
function rpeilv(peilv,ifok){
	if(Number(ifok)!=1) return '--';
	else return peilv;
}
var numtest = /^[0-9]{1,7}$/;
function qiu(ns) {
	if (isNaN(ns)) return ns;
	
	if(fenlei==151){
		var qstr = "";
		qstr += "<span class='b" + ns.substr(0,1) + "'>" + ns.substr(0,1) + "</span>";
		if(ns.substr(1,1)!=''){
		    qstr += "<span class='b" + ns.substr(1,1) + "'>" + ns.substr(1,1) + "</span>";
		}
		if(ns.substr(2,1)!=''){
		    qstr += "<span class='b" + ns.substr(2,1) + "'>" + ns.substr(2,1) + "</span>";
		}
		qstr += "";
		return qstr;
	}else{
	   if(ns<=9  & (fenlei==103 | fenlei==121) & ns.length==1) ns = '0'+ns;	
	   return "<span class='b" + ns + "'>" + ns + "</span>";
	}

}