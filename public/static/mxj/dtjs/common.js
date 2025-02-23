
if(!window.console){
    window.console = {};
}
if(!window.console.log){
    window.console.log = function(msg){};
}

var odd_index_of = function(ball, title) {
    if ($.inArray(title, ['特碼A', '特碼B']) !== -1) {
        var orders = new Array('01', '11', '21', '31', '41', '特單',
                '02', '12', '22', '32', '42', '特雙',
                '03', '13', '23', '33', '43', '特大',
                '04', '14', '24', '34', '44', '特小',
                '05', '15', '25', '35', '45', '合單',
                '06', '16', '26', '36', '46', '合雙',
                '07', '17', '27', '37', '47', '紅波',
                '08', '18', '28', '38', '48', '藍波',
                '09', '19', '29', '39', '49', '綠波',
                '10', '20', '30', '40', '特尾大', '特尾小');
    } else if ($.inArray(title, ['正碼A', '正碼B']) !== -1) {
        var orders = new Array('01', '11', '21', '31', '41', '總單',
                '02', '12', '22', '32', '42', '總雙',
                '03', '13', '23', '33', '43', '總大',
                '04', '14', '24', '34', '44', '總小',
                '05', '15', '25', '35', '45',
                '06', '16', '26', '36', '46',
                '07', '17', '27', '37', '47',
                '08', '18', '28', '38', '48',
                '09', '19', '29', '39', '49',
                '10', '20', '30', '40');
    } else if ($.inArray(title, ['正1特', '正2特', '正3特', '正4特', '正5特', '正6特']) !== -1) {
        var orders = new Array('01', '11', '21', '31', '41', '單',
                '02', '12', '22', '32', '42', '雙',
                '03', '13', '23', '33', '43', '大',
                '04', '14', '24', '34', '44', '小',
                '05', '15', '25', '35', '45', '合單',
                '06', '16', '26', '36', '46', '合雙',
                '07', '17', '27', '37', '47', '紅',
                '08', '18', '28', '38', '48', '藍',
                '09', '19', '29', '39', '49', '綠',
                '10', '20', '30', '40');
    }
    //return window.odds[orders.indexOf(ball)];
    return window.odds[$.inArray(ball, orders)];
}


var format = function (str, col) {
    col = typeof col === 'object' ? col : Array.prototype.slice.call(arguments, 1);

    return str.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
        if (m == "{{") { return "{"; }
        if (m == "}}") { return "}"; }
        return col[n];
    });
};

var combination = function(arr, start, temp, count, NUM, arr_len, odds, balls_result, odds_result)
{
    for (var i=start; i < arr_len+1-count; i++)
    {
        temp[count - 1] = i;
        if (count - 1 == 0) {
            for (var j=NUM-1; j>=0; j--) {
                balls_result.push(arr[temp[j]]);
                odds_result.push(odds[temp[j]]);
            }
        } else {
            combination(arr, i+1, temp, count-1, NUM, arr_len, odds, balls_result, odds_result);
        }
    }
};


var min = function() {
    if (typeof(arguments[0]) == "string" && arguments[0].indexOf('/') != -1) {
        var numargs = arguments.length;
        var pre = arguments[0];
        var is_two_odd = pre.indexOf('/') !== -1;

        for (var i=1; i<numargs; i++) {
            var cur = arguments[i];
            var pre_val = 0;
            var cur_val = 0;
            if (is_two_odd) {
                pre_val = pre;
                cur_val = cur;
            } else {
                pre_val = parseFloat(pre);
                cur_val = parseFloat(cur);
            }


            if (pre_val > cur_val) {
                pre = cur;
            }
        }

        return pre;

    } else {
        return Math.min.apply(Math, arguments);
    }
};

if(!Array.prototype.indexOf){
   Array.prototype.indexOf = function(val){
       var value = this;
       for(var i =0; i < value.length; i++){
          if(value[i] == val) return i;
       }
      return -1;
   };
}

if (!Object.keys) {
  Object.keys = function(obj) {
    var keys = [];

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        keys.push(i);
      }
    }

    return keys;
  };
}

Array.prototype.unique = function () {
    var r = new Array();
    o:for(var i = 0, n = this.length; i < n; i++)
    {
        for(var x = 0, y = r.length; x < y; x++)
        {
            if(r[x]==this[i])
            {
                //alert('this is a DUPE!');
                continue o;
            }
        }
        r[r.length] = this[i];
    }
    return r;
}

Array.prototype.is_duplicated = function () {
    var r = new Array();
    o:for(var i = 0, n = this.length; i < n; i++)
    {
        for(var x = 0, y = r.length; x < y; x++)
        {
            if(r[x]==this[i])
            {
                return true;
            }
        }
        r[r.length] = this[i];
    }
    return false;
}


Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


function str_replace(str1,str2,str3){   						//replace全部
	while(str1.indexOf(str2)>=0){
		str1=str1.replace(str2,str3);
	}
	return str1;
}


function getCookie(Name) {
   var search = Name + "="
   if (document.cookie.length > 0) { // if there are any cookies
      var offset = document.cookie.indexOf(search)
      if (offset != -1) { // if cookie exists
         offset += search.length
         // set index of beginning of value
         var end = document.cookie.indexOf(";", offset)
         // set index of end of cookie value
         if (end == -1) end = document.cookie.length
         return unescape(document.cookie.substring(offset, end))
      }
   }
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}