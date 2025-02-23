// JavaScript Document
/**//********************************************
 *
 * Javascript日期對象
 * 作者：limin_he(limin_he@maxnse.com)
 * 日期：2006-11-02
 *
 ********************************************/
 
 
//構造函數
function ScriptDate(sender)
{
    this.panel = sender;                        //存放對象的容器
    this.sysDate = null;                        //系統日期
    this.year = null;                            //當前年
    this.month = null;                            //當前月
    this.day = null;                            //當前日
    
    this.selYear = null;                        //當前選擇年
    this.selMonth = null;                        //當前選擇月
    this.selDay = null;                            //當前選擇日
    this.selDays = 1;                            //當前選擇的天數
    this.selWeek = null;                        //當前選擇周
    
    this.usabled = 0;                            //有效性(0為全部有效;1為從系統當前日期開始以後有效)
    this.object = null;                            //當前對象
    this.width = 200;                            //當前對象寬(整數)
    this.title = null;                          //當前對象標頭
    this.header = null;                         //當前對象頭
    this.body = null;                           //當前對象主體
    
    
    this.fontsize = "14px";                        //字體大小
    this.tdHeight = "24px";                        //單元格高度
    
    this.titleBGColor = "#FF6C00";                //標題背景色
    this.titleColor = "#FFFFFF";                //標題字體色
    this.titleHeight = "20px";                    //標題高
    this.titlePreYearName = "&lt;&lt;";            //標題上年的文字
    this.titlePreMonthName = "&lt;";            //標題上月的文字
    this.titleNextYearName = "&gt;&gt;";        //標題下年的文字
    this.titleNextMonthName = "&gt;";            //標題下月的文字
    
    this.headerBGColor = "#EFEFEF";                //頭背景色
    this.headerHeight = "20px";                    //標題高
    this.headerColor = "#000000";                //頭字體色
    this.headerfontsize = "12px";                //頭字體大小
    
    this.bodyBGColor = "#ffe4cd";                //主體背景色
    this.bodyColor = "#000000";                    //主體字體色
    this.bodyfontsize = "12px";                    //主缽字體大小
    
    this.unusableBGColor = "#ffffff";            //無效日期的背景色
    this.unusabledColor = "#D6D7D9";            //無效日期的字體色
    
    this.selectColor = "#FFFFFF";                //選擇字體色
    this.selectBGColor = "#FF0000";                //選擇背景色
    
    
    //代理
    this.onClick = null;                        //單擊有效日期時執行的方法
}

//初使化
ScriptDate.prototype.Init = function()
{
    if(this.sysDate==null) this.sysDate = new Date();
    if(this.year==null) 
    {
        this.year = this.sysDate.getFullYear();
    }
    if(this.selYear==null) 
    {
        this.selYear = this.sysDate.getFullYear();
    }
    if(this.month==null) 
    {
        this.month = this.sysDate.getMonth()+1;
    }
    if(this.selMonth==null) 
    {
        this.selMonth = this.sysDate.getMonth()+1;
    }
    if(this.day==null) 
    {   
        this.day = this.sysDate.getDate();
    }
    if(this.selDay==null) 
    {
        this.selDay =this.sysDate.getDate();
    }
    
}

//加載
ScriptDate.prototype.Load = function()
{
    this.Init();
    this.Render();
}



//輸出
ScriptDate.prototype.Render = function()
{
    var div = document.createElement("div");
    div.style.border = "solid 0px #000000";
    div.style.width = this.width.toString() + "px";
    div.style.fontSize = this.fontsize;
    
    this.object = div;
    this.CreateChildControls();
    this.panel.appendChild(this.object);
}

//創建子控件
ScriptDate.prototype.CreateChildControls = function()
{
    this.object.innerHTML = "";
    this.CreateTitle();
    this.CreateHeader();
    this.CreateBody();
}

//創建標題
ScriptDate.prototype.CreateTitle = function()
{
    var sender = this;
    var tmpWidth = this.width/7;
    
    var div = document.createElement("div");

    div.style.borderLeft = "solid 1px #000000";
    div.style.borderRight = "solid 1px #000000";
    div.style.borderTop = "solid 1px #000000";
    div.style.borderBottom = "none";
    div.style.backgroundColor = this.titleBGColor;
    div.style.color = this.titleColor;
    div.style.height = this.titleHeight;
    div.style.textAlign = "center";
    div.style.verticalAlign = "middle";
    this.title = div;
    
    //div.appendChild(CreatePreYearButton());
    div.appendChild(CreatePreMonthButton());
    div.appendChild(CreateContent());
    div.appendChild(CreateNextMonthButton());
    //div.appendChild(CreateNextYearButton());
    
    this.object.appendChild(div);
    
    //創建內容
    function CreateContent()
    {
        var label = document.createElement("span");
        label.style.width = (tmpWidth*3).toString() + "px";
        label.innerHTML = sender.year + "-" + sender.month;
        return label;
    }
    //上年按鈕
    function CreatePreYearButton()
    {
        var label = document.createElement("span");
        label.style.width = (tmpWidth-1).toString() + "px";
        var actrl = document.createElement("A");
        actrl.href="#";
        actrl.innerHTML = sender.titlePreYearName;
        actrl.title = sender.titlePreYearName;
        actrl.id = "preyear";
        actrl.onclick = GotoDate;
        actrl.onkeypress = GotoDate;
        label.appendChild(actrl);
        return label;
    }
    //上月按鈕
    function CreatePreMonthButton()
    {
        var label = document.createElement("span");
        label.style.width = (tmpWidth-1).toString() + "px";
        label.style.backgroundColor = "#ffe4cd";
        label.style.color = "#FF6C00";
        var actrl = document.createElement("A");
        actrl.href="#";
        actrl.innerHTML = sender.titlePreMonthName;
        actrl.title = sender.titlePreMonthName;
        actrl.id = "premonth";
        actrl.onclick = GotoDate;
        actrl.onkeypress = GotoDate;
        label.appendChild(actrl);
        return label;
    }
    //下月按鈕
    function CreateNextMonthButton()
    {
        var label = document.createElement("span");
        label.style.width = (tmpWidth-1).toString() + "px";
        label.style.backgroundColor = "#ffe4cd";
        label.style.color = "#FF6C00";
        var actrl = document.createElement("A");
        actrl.href="#";
        actrl.innerHTML = sender.titleNextMonthName;
        actrl.title = sender.titleNextMonthName;
        actrl.id = "nextmonth";
        actrl.onclick = GotoDate;
        actrl.onkeypress = GotoDate;
        label.appendChild(actrl);
        return label;
    }
    //下年按鈕
    function CreateNextYearButton()
    {
        var label = document.createElement("span");
        label.style.width = (tmpWidth-1).toString() + "px";
        var actrl = document.createElement("A");
        actrl.href="#";
        actrl.innerHTML = sender.titleNextYearName;
        actrl.title = sender.titleNextYearName;
        actrl.id = "nextyear";
        label.appendChild(actrl);
        actrl.onclick = GotoDate;
        actrl.onkeypress = GotoDate;
        return label;
    }
    //跳轉日期
    function GotoDate()
    {
        switch(this.id)
        {
            case "preyear":
                sender.year = sender.year-1;
                sender.CreateChildControls();
                break;
            case "premonth":
                if(sender.month==1)
                {
                    sender.year = sender.year-1;
                    sender.month = 12
                    sender.CreateChildControls();
                }
                else
                {
                    sender.month = sender.month-1;
                    sender.CreateChildControls();
                }
                break;
            case "nextmonth":
                if(sender.month==12)
                {
                    sender.year = sender.year+1;
                    sender.month = 1
                    sender.CreateChildControls();
                }
                else
                {
                    sender.month = sender.month+1;
                    sender.CreateChildControls();
                }
                break;
            case "nextyear":
                sender.year = sender.year+1;
                sender.CreateChildControls();
                break;
        }
    }
}

//創建頭
ScriptDate.prototype.CreateHeader = function()
{
    var sender = this;
    var tmpWidth = this.width/7;
            
    var table = document.createElement("TABLE");
    table.style.borderLeft = "solid 1px #000000";
    table.style.borderRight = "solid 1px #000000";
    table.style.borderTop = "solid 0px #000000";
    table.style.borderBottom = "solid 0px #000000";
    table.width = this.width.toString() + "px";
    //table.border = "1px";
    table.cellPadding=0;
    table.cellSpacing=0;
    table.rules="none";
    this.header = table;
    this.object.appendChild(table);
    
    var row = table.insertRow(table.rows.length);
    row.style.backgroundColor = this.headerBGColor;
    
    CreateTD(0,"六");
    CreateTD(0,"五");
    CreateTD(0,"四");
    CreateTD(0,"三");
    CreateTD(0,"二");
    CreateTD(0,"一");
    CreateTD(0,"日");
    
    function CreateTD(index,text)
    {
        var cell = row.insertCell(index);
        cell.align = "center";
        cell.valign = "middle";
        cell.style.width = tmpWidth.toString() + "px";
        cell.style.height = sender.headerHeight;
        cell.style.color = sender.headerColor;
        cell.style.fontSize = sender.headerfontsize;
        cell.innerHTML = text;
    }

}

//創建內容
ScriptDate.prototype.CreateBody = function()
{
    var sender = this;
    var tmpWidth = this.width/7;
    
    var table = document.createElement("TABLE");
    table.style.border = "solid 1px #000000";
    table.border = "1px";
    table.borderColor = "#000000";
    table.borderColorDark="#FFFFFF";
    table.style.backgroundColor = this.bodyBGColor;
    table.style.fontSize = this.bodyfontsize;
    table.cellPadding=0;
    table.cellSpacing=0;
    table.rules="all";
    this.body = table;
    
    
    //第幾天
    var whoDay = 1;
    //當前月日期
    var curDate = new Date(this.year.toString() + "/" + this.month.toString() + "/" + this.day.toString());
    //上一月日期
    var preDate = new Date(this.year.toString() + "/" + (this.month-1).toString() + "/" + this.day.toString());
    
    //取得當前月的第一天是星期幾
    var firstDayinCurMonth = new Date(this.year.toString() + "/" + this.month.toString() + "/01");
    var firstweek = firstDayinCurMonth.getDay();
    //取得上個月的最大天數
    var preMonthMaxDay = MaxDay(preDate);
    //取得當前月的最大天數
    var curMonthMaxDay = MaxDay(curDate);
    //取得中間占幾行
    var centerRows = 0;
    if(firstweek!=0)
    {
        centerRows = parseInt((curMonthMaxDay-(7-firstweek))/7);
    }
    else
    {
        centerRows = parseInt(curMonthMaxDay/7);
    }

    if(firstweek!=0) CreateStartRow();
    CreateCenterRow();
    CreateStopRow();
    
    this.object.appendChild(table);
    
    
    
    //創建開始行
    function CreateStartRow()
    {
        var row = table.insertRow(table.rows.length);
        var index = 0;
        for(var i=preMonthMaxDay-firstweek+1; i<=preMonthMaxDay; i++,index++)
        {
            var cell = row.insertCell(index);
            cell.align = "center";
            cell.style.color = sender.unusabledColor;
            cell.style.backgroundColor = sender.unusableBGColor;
            cell.style.width = tmpWidth.toString() + "px";
            cell.style.height = sender.tdHeight;
            cell.innerHTML = i.toString();
        }
        for(var i=firstweek; i<7; i++,index++,whoDay++)
        {
            var cell = row.insertCell(index);
            cell.align = "center";
            //指定當前日期是否有效
            var CurTD = true;
            //當前操作日期
            var selDate = new Date(sender.year.toString() + "/" + sender.month.toString() + "/" + whoDay.toString());
            if(sender.usabled==1)
            {
                //usabled==1為從系統當前日期開始以後有效
                if(selDate<ToShortDate(sender.sysDate))
                {
                    //系統天數>當於天 and 當前選擇月=系統月 and 當前選擇年=系統年
                    cell.style.color = sender.unusabledColor;
                    cell.style.backgroundColor = sender.unusableBGColor;
                    CurTD = false;
                }
                else
                {
                    cell.style.color = sender.bodyColor;
                }
            }
            else
            {
                //usabled==0為全部有效
                cell.style.color = sender.bodyColor;
            }
            cell.style.width = tmpWidth.toString() + "px";
            cell.style.height = sender.tdHeight;
            //設置被選中的日期
            var startDate = new Date(sender.selYear.toString() + "/" + sender.selMonth.toString() + "/" + sender.selDay.toString());
            if(sender.selWeek == null)
            {
                //選中結束日期
                var oldstartDate = new Date(sender.selYear.toString() + "/" + sender.selMonth.toString() + "/" + sender.selDay.toString());
                var endDate = AddDate(4,sender.selDays,oldstartDate);
                //alert(startDate + " : " + endDate);
                if(selDate<endDate && selDate>=startDate)
                {
                    //當前操作日期<選中結束日期
                    cell.style.color = sender.selectColor;
                    cell.style.backgroundColor = sender.selectBGColor;
                    cell.selected = true;
                }
            }
            //設置被選中的周
            if(sender.selWeek != null && i==sender.selWeek && CheckTowDate(selDate,startDate)==2)
            {
                if(CurTD)
                {
                    //有效日期內
                    cell.style.color = sender.selectColor;
                    cell.style.backgroundColor = sender.selectBGColor;
                    cell.selected = true;
                }
            }
            cell.innerHTML = whoDay.toString();
            if(CurTD)
            {
                cell.value = selDate;
                cell.onclick = onClick;
                cell.onkeypress = onClick;
                cell.onmouseover = onMouseOver;
                cell.onfocus = onMouseOver;
                cell.onmouseout = onMouseOut;
                cell.onblur = onMouseOut;
                cell.style.cursor = "pointer";
                cell.title = selDate.getFullYear() +'/' +  (selDate.getMonth()+1) + '/' +selDate.getDate();
            }
        }
    }
    //創建中間行
    function CreateCenterRow()
    {
        for(var i=0; i<centerRows; i++)
        {
            var row = table.insertRow(table.rows.length);
            for(var j=0; j<7; j++,whoDay++)
            {
                var cell = row.insertCell(j);
                cell.align = "center";
                //指定當前日期是否有效
                var CurTD = true;
                //當前操作日期
                var selDate = new Date(sender.year.toString() + "/" + sender.month.toString() + "/" + whoDay.toString());
                if(sender.usabled==1)
                {
                    //usabled==1為從系統當前日期開始以後有效
                    if(selDate<ToShortDate(sender.sysDate))
                    {
                        //系統天數>當於天 and 當前選擇月=系統月 and 當前選擇年=系統年
                        cell.style.color = sender.unusabledColor;
                        cell.style.backgroundColor = sender.unusableBGColor;
                        CurTD = false;
                    }
                    else
                    {
                        cell.style.color = sender.bodyColor;
                    }
                }
                else
                {
                    //usabled==0為全部有效
                    cell.style.color = sender.bodyColor;
                }
                cell.style.width = tmpWidth.toString() + "px";
                cell.style.height = sender.tdHeight;
                //設置被選中的日期
                var startDate = new Date(sender.selYear.toString() + "/" + sender.selMonth.toString() + "/" + sender.selDay.toString());
                if(sender.selWeek == null)
                {
                    //選中結束日期
                    var oldstartDate = new Date(sender.selYear.toString() + "/" + sender.selMonth.toString() + "/" + sender.selDay.toString());
                    var endDate = AddDate(4,sender.selDays,oldstartDate);
                    //alert(startDate + " : " + endDate + " : " + selDate);
                    if(selDate<endDate && selDate>=startDate)
                    {
                        //當前操作日期<選中結束日期
                        cell.style.color = sender.selectColor;
                        cell.style.backgroundColor = sender.selectBGColor;
                        cell.selected = true;
                    }
                }
                //設置被選中的周
                if(sender.selWeek != null && j==sender.selWeek && CheckTowDate(selDate,startDate)==2)
                {
                    if(CurTD)
                    {
                        //有效日期內
                        cell.style.color = sender.selectColor;
                        cell.style.backgroundColor = sender.selectBGColor;
                        cell.selected = true;
                    }
                }
                cell.innerHTML = whoDay.toString();
                if(CurTD)
                {
                    cell.value = selDate;
                    cell.onclick = onClick;
                    cell.onkeypress = onClick;
                    cell.onmouseover = onMouseOver;
                    cell.onfocus = onMouseOver;
                    cell.onmouseout = onMouseOut;
                    cell.onblur = onMouseOut;
                    cell.style.cursor = "pointer";
                    cell.title = selDate.getFullYear() +'/' +  (selDate.getMonth()+1) + '/' +selDate.getDate();
                }
            }
        }
    }
    //創建結束行
    function CreateStopRow()
    {
        var row = table.insertRow(table.rows.length);
        var daylen = curMonthMaxDay-whoDay+1;
        for(var i=0; i<daylen; i++,whoDay++)
        {
            var cell = row.insertCell(i);
            cell.align = "center";
            //指定當前日期是否有效
            var CurTD = true;
            //當前操作日期
            var selDate = new Date(sender.year.toString() + "/" + sender.month.toString() + "/" + whoDay.toString());
            if(sender.usabled==1)
            {
                //usabled==1為從系統當前日期開始以後有效
                if(selDate<ToShortDate(sender.sysDate))
                {
                    //系統天數>當於天 and 當前選擇月=系統月 and 當前選擇年=系統年
                    cell.style.color = sender.unusabledColor;
                    cell.style.backgroundColor = sender.unusableBGColor;
                    CurTD = false;
                }
                else
                {
                    cell.style.color = sender.bodyColor;
                }
            }
            else
            {
                //usabled==0為全部有效
                cell.style.color = sender.bodyColor;
            }
            cell.style.width = tmpWidth.toString() + "px";
            cell.style.height = sender.tdHeight;
            //設置被選中的日期
            var startDate = new Date(sender.selYear.toString() + "/" + sender.selMonth.toString() + "/" + sender.selDay.toString());
            if(sender.selWeek == null)
            {
                //選中結束日期
                var oldstartDate = new Date(sender.selYear.toString() + "/" + sender.selMonth.toString() + "/" + sender.selDay.toString());
                var endDate = AddDate(4,sender.selDays,oldstartDate);
                //alert(startDate + " : " + endDate);
                if(selDate<endDate && selDate>=startDate)
                {
                    //當前操作日期<選中結束日期
                    cell.style.color = sender.selectColor;
                    cell.style.backgroundColor = sender.selectBGColor;
                    cell.selected = true;
                }
            }
            //設置被選中的周
            if(sender.selWeek != null && i==sender.selWeek && CheckTowDate(selDate,startDate)==2)
            {
                if(CurTD)
                {
                    //有效日期內
                    cell.style.color = sender.selectColor;
                    cell.style.backgroundColor = sender.selectBGColor;
                    cell.selected = true;
                }
            }
            
            cell.innerHTML = whoDay.toString();
            if(CurTD)
            {
                cell.value = selDate;
                cell.onclick = onClick;
                cell.onkeypress = onClick;
                cell.onmouseover = onMouseOver;
                cell.onfocus = onMouseOver;
                cell.onmouseout = onMouseOut;
                cell.onblur = onMouseOut;
                cell.style.cursor = "pointer";
                cell.title = selDate.getFullYear() +'/' +  (selDate.getMonth()+1) + '/' +selDate.getDate();
                
            }
        }
        var nextday = 1;
        for(var i=daylen;i<7;i++,nextday++)
        {
            var cell = row.insertCell(i);
            cell.align = "center";
            cell.style.color = sender.unusabledColor;
            cell.style.backgroundColor = sender.unusableBGColor;
            cell.style.width = tmpWidth.toString() + "px";
            cell.style.height = sender.tdHeight;
            cell.innerHTML = nextday.toString();
        }
        if(table.rows.length<6)
        {
            //小於6行加一行
            var row = table.insertRow(table.rows.length);
            for(var i=0;i<7;i++,nextday++)
            {
                var cell = row.insertCell(i);
                cell.align = "center";
                cell.style.color = sender.unusabledColor;
                cell.style.backgroundColor = sender.unusableBGColor;
                cell.style.width = tmpWidth.toString() + "px";
                cell.style.height = sender.tdHeight;
                cell.innerHTML = nextday.toString();
            }
        }
    }
    //取得月份的最大天數
    function MaxDay(date)
    {
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12)
            return 31;
        else if(month==4 || month==6 || month==9 || month==11)
            return 30;
        else if(month==2)
        {
            var d = new Date(year+"/2/29");
            if(d.getMonth()==1)    return 29;
            else return 28
        }
    }
    //比羅兩日期的年月日是否相等
    function CheckTowDate(date1,date2)
    {
        if(date1.getFullYear()==date2.getFullYear() && date1.getMonth()==date2.getMonth()  && date1.getDate()==date2.getDate())
            return 1;
        else if(date1.getFullYear()==date2.getFullYear() && date1.getMonth()==date2.getMonth())
            return 2;
        else
            return 0;
    }
    //日期++
    function AddDate(type,lIntval,date)
    {
        switch(type)
        {
            case 6 ://年
                date.setYear(date.getFullYear() + lIntval)
                break;
            case 7 : //季
                date.setMonth(date.getMonth() + (lIntval * 3) )
                break;
            case 5 ://月
                date.setMonth(date.getMonth() + lIntval)
                break;
            case 4 ://天
                date.setDate(date.getDate() + lIntval)
                break
            case 3 ://時
                date.setHours(date.getHours() + lIntval)
                break
            case 2 ://分
                date.setMinutes(date.getMinutes() + lIntval)
                break
            case 1 ://秒
                date.setSeconds(date.getSeconds() + lIntval)
                break;
            default:
        } 
        return new Date(date.getFullYear() +'/' +  (date.getMonth()+1) + '/' +date.getDate()+ ' '+ date.getHours()+':'+date.getMinutes()+':'+date.getSeconds());
    }
    //轉換為日期形式無時間
    function ToShortDate(date)
    {
        return new Date(date.getFullYear() +'/' +  (date.getMonth()+1) + '/' +date.getDate());
    }
    //有效日期單擊事件
    function onClick()
    {
        if(sender.onClick!=null)
        {
            var date = this.value;
            sender.selYear = date.getFullYear();
            sender.selMonth = date.getMonth()+1;
            sender.selDay = date.getDate();
            sender.selWeek = null;
            sender.selDays = 1;
            sender.CreateChildControls();
            sender.onClick(sender.selYear,sender.selMonth,sender.selDay);
        }
    }
    //鼠標移到有效日期上的事件
    function onMouseOver()
    {
        this.style.color = sender.selectColor;
        this.style.backgroundColor = sender.selectBGColor;
    }
    //鼠標從有效日期上移開的事件
    function onMouseOut()
    {
        if(!this.selected)
        {
            this.style.color = sender.bodyColor;
            this.style.backgroundColor = sender.bodyBGColor;
        }
    }

}

//獲得選中的日期
ScriptDate.prototype.SelectDate = function()
{
    var redate = new Array();
    var table = this.body;
    for(var i=0; i<table.rows.length; i++)
    {
        for(var j=0; j<table.rows[i].cells.length; j++)
        {
            if(table.rows[i].cells[j].selected)
            {
                redate.push(table.rows[i].cells[j].value);
            }
        }
    }
    if(redate.length<this.selDays)
    {
        var lastdate = redate[redate.length-1];
        var maxday = this.selDays-redate.length;
        for(var i=1; i<=maxday; i++)
        {
            redate.push(new Date(lastdate.getFullYear().toString() + "/" + (lastdate.getMonth()+2).toString() + "/" + i.toString()));
        }
    }
    return redate;
}    