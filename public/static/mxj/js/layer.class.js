/************************************* Achievo.Javascript Library ************************** 
* Using jQuery 1.7.1 
* Using cks.js 1.0.1 
* Name : ck.layer.js 
* Create by Angle.Yang on 2012/03/07 [V1.0.0] 
*******************************************************************************************/  
(function ($) {  
  
    $.fn.masklayer = function (settings) {  
        /// <summary>  
        /// 模态窗口，继承 easy-ui.window  
        /// </summary>  
        /// <param name="settings" type="object">扩展了{title:[div中的内容], action:[执行的动作，目前支持"close"], result:[返回结果]}</param>  
        /// <returns type="void" />  
  
        settings = $.extend(true, { title: '加载中...', action: "open" }, settings);  
  
  
        /// <summary>  
        /// 初始化所有 cks 样式的按钮（页面运行时进行初始化）  
        /// </summary>  
        /// <returns type="void" />  
  
        _init = function () {  
            if (settings.action == "open") {  
                if ($("#div_load").length == 0) {  
                    var boardDiv = "<div id='div_load'><\/div>";  
                    $(document.body).append(boardDiv);  
                }  
                if ($("#div_load").length > 0) {  
                    $("#div_load").fix_ie6Select();  
                    $("#div_load").css("display", "block");  
                    $("#div_load").css("height", document.body.offsetHeight);  
                    $("#div_load").html(settings.title);  
                }  
            }  
            else if (settings.action == "close") {  
                if ($("#div_load").length > 0) $("#div_load").css("display", "none");  
            }  
            else if (settings.action = "setTitle") {  
                if ($("#div_load").length > 0) $("#div_load").html(settings.title);  
                else {  
                    var boardDiv = "<div id='div_load'>" + settings.title + "<\/div>";  
                    $(document.body).append(boardDiv);  
                    $("#div_load").fix_ie6Select();  
                    $("#div_load").css("display", "block");  
                    $("#div_load").css("height", document.body.offsetHeight);  
                }  
            }  
        };  
  
  
        return (function () { _init() })();  
  
    };  
})(jQuery);  

$.extend({  
    ceng: {  
        name: "layer.class.js",  
        globalVar: {}, // 内部变量， 外部不得使用(document.body 未初始化时使用；内部变量)  
          
        setMaskTitle: function (title) {  
            /// <summary>  
            /// 修改遮罩层的内容 Angle.Yang 2012.03.07 16:35 Add  
            /// </summary>  
            /// <param name="title" type="string">遮罩层中的提示信息</param>  
            /// <returns type="void" />  
            $.fn.masklayer({ title: title, action: "setTitle" });  
        },  
  
        openMask: function (title) {  
            /// <summary>  
            /// 显示遮罩层DIV Angle.Yang 2012.03.07 16:35 Add  
            /// </summary>  
            /// <param name="title" type="string">遮罩层中的提示信息</param>  
            /// <returns type="void" />  
            $.fn.masklayer({ title: title, action: "open" });  
        },  
  
        closeMask: function () {  
            /// <summary>  
            /// 关闭遮罩层DIV Angle.Yang 2012.03.07 16:35 Add  
            /// </summary>  
            /// <returns type="void" />  
            $.fn.masklayer({ action: "close" });  
        }  
  
    }  
});  