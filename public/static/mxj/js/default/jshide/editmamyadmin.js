function myready() {
    changeh(document.documentElement.scrollHeight+500);
	$("select.menu").change(function(){
	   window.location.href= $(this).val();
	});
	$(".s_tb tr").mousemove(function(){$(this).addClass('hover')}).mouseout(function(){$(this).removeClass('hover')});
    $(".edit").click(function() {
        var str = '{';
        var j = 0;
        $(".s_tb tbody tr").each(function(i) {
           
                var val = $(this).find(".val").val();
                var name = $(this).find(".name").val();
                if(val!='' & name!=''){
                   if (j > 0) str += ',';
                   str += '"'+name+'":"' + val + '"';
				   j++;
				}

          

        });
        str += '}';
		console.log(str);
        $.ajax({
            type: 'POST',
            url: mulu + 'zshui',
            data: 'xtype=editma&str=' + str,
            success: function(m) {
            	console.log(m);
				$('#test').html(m)
                if (Number(m) == 1) {
                    window.location.href = window.location.href;

                }

            }

        });


    });


   $(".add").click(function(){
        var str = "<TR><td><INPUT type='text'  class='class name'  value=''  /></td><td class='v'><INPUT type='text'  class='val'  value='' size=100 /></td><td></td><td><input type='button' class='del' value='删除' /></tD></TR>";
		$(".s_tb").append(str);
		$(".s_tb input.name").unbind('blur');
		$(".s_tb input.name").blur(function(){
		    autosc();
		});
	   $("input.del").unbind('click');
       $("input.del").click(function(){
	      $(this).parent().parent().remove();
       });
   });
   autosc();

       $("input.del").click(function(){
	      $(this).parent().parent().remove();
       });
}


function rwuhang(wh){
   //var nayinstr = "甲子金|乙醜金|丙寅火|丁卯火|戊辰木|己巳木|庚午土|辛未土|壬申金|癸酉金|甲戌火|乙亥火|丙子水|丁醜水|戊寅土|己卯土|庚辰金|辛巳金|壬午木|癸未木|甲申水|乙酉水|丙戌土|丁亥土|戊子火|己醜火|庚寅木|辛卯木|壬辰水|癸巳水|甲午金|乙未金|丙申火|丁酉火|戊戌木|己亥木|庚子土|辛醜土|壬寅金|癸卯金|甲辰火|乙巳火|丙午水|丁未水|戊申土|己酉土|庚戌金|辛亥金|壬子木|癸醜木|甲寅水|乙卯水|丙辰土|丁巳土|戊午火|己未火|庚申木|辛酉木|壬戌水|癸亥水|";	
   var ny = new Array('金','金','火','火','木','木','土','土','金','金','火','火','水','水','土','土','金','金','木','木','水','水','土','土','火','火','木','木','水','水','金','金','火','火','木','木','土','土','金','金','火','火','水','水','土','土','金','金','木','木','水','水','土','土','火','火','木','木','水','水');
   //var jiazhi = new Array("甲子","乙醜","丙寅","丁卯","戊辰","己巳","庚午","辛未","壬申","癸酉","甲戌","乙亥","丙子","丁醜","戊寅","己卯","庚辰","辛巳","壬午","癸未","甲申","乙酉","丙戌","丁亥","戊子","己醜","庚寅","辛卯","壬辰","癸巳","甲午","乙未","丙申","丁酉","戊戌","己亥","庚子","辛醜","壬寅","癸卯","甲辰","乙巳","丙午","丁未","戊申","己酉","庚戌","辛亥","壬子","癸醜","甲寅","乙卯","丙辰","丁巳","戊午","己未","庚申","辛酉","壬戌","癸亥");
   var date = new Date();
   var year=date.getFullYear();
   //var bml = jiazhi[year-1984];   
   var w=new Array();
   var tmp;
   var t;
   var index;
   for(var i=1;i<=49;i++){
	   index = year - 1922 - i - 1;
	   tmp = ny[index%60];
	   if(tmp==wh){
		   t = i<10 ? '0'+i : i;
	       w.push(t);
	   }
   }
   return w;
}

function rshengxiao(dw){
	var jiazhi = new Array("甲子","乙醜","丙寅","丁卯","戊辰","己巳","庚午","辛未","壬申","癸酉","甲戌","乙亥","丙子","丁醜","戊寅","己卯","庚辰","辛巳","壬午","癸未","甲申","乙酉","丙戌","丁亥","戊子","己醜","庚寅","辛卯","壬辰","癸巳","甲午","乙未","丙申","丁酉","戊戌","己亥","庚子","辛醜","壬寅","癸卯","甲辰","乙巳","丙午","丁未","戊申","己酉","庚戌","辛亥","壬子","癸醜","甲寅","乙卯","丙辰","丁巳","戊午","己未","庚申","辛酉","壬戌","癸亥");
	
	var date = new Date();
	var year=date.getFullYear();
	var dzarr = new Array();
	var bml = jiazhi[year-1984];
	dzarr['子'] = 1;
	dzarr['醜'] = 2;
	dzarr['寅'] = 3;
	dzarr['卯'] = 4;
	dzarr['辰'] = 5;
	dzarr['巳'] = 6;
	dzarr['午'] = 7;
	dzarr['未'] = 8;
	dzarr['申'] = 9;
	dzarr['酉'] = 10;
	dzarr['戌'] = 11;
	dzarr['亥'] = 12;
	bml = dzarr[bml.substr(1,1)];
	var dz,i;
	switch(dw){ 
	    case "鼠": dz='子';i=1;break;
		case "牛": dz='醜';i=2;break;
		case "虎": dz='寅';i=3;break;
		case "兔": dz='卯';i=4;break;
		case "龍": dz='辰';i=5;break;
		case "蛇": dz='巳';i=6;break;
		case "馬": dz='午';i=7;break;
		case "羊": dz='未';i=8;break;
		case "猴": dz='申';i=9;break;
		case "雞": dz='酉';i=10;break;
		case "狗": dz='戌';i=11;break;
		case "豬": dz='亥';i=12;break;	
	}
	var arr = new Array();
	var tmp;
	if(bml>=dzarr[dz]){
	   arr[0] = bml-dzarr[dz]+1;
	}else{
	   arr[0] = bml-dzarr[dz]+13;
	}	
	arr[1] = arr[0]+12;
	arr[2] = arr[0]+24;
	arr[3] = arr[0]+36;
	
	if(bml==i){
	    arr[4] = arr[0]+48;
	}
	if(arr[0]<10) arr[0] = '0' + arr[0];
    return arr;
}
function autosc(){
	
   $("input.name").each(function(){
       var name = $(this).val();
	   $(this).parent().parent().find("td:eq(2)").html("<input type='button' v='"+name+"' value='自动' class='auto btnf' />"); 
   });
   $("input.auto").unbind('click');
   $("input.auto").click(function(){
       var name = $(this).attr('v');
	   var arr =new Array();
	  
	   if(name=='金' | name=='木' | name=='水' | name=='火' | name=='土'){
           	arr = rwuhang(name);
	   }else if(name=='鼠' | name=='牛' | name=='虎' | name=='兔' | name=='龍' | name=='蛇' | name=='馬' | name=='羊' | name=='猴' | name=='雞' | name=='狗' | name=='豬'){
		    arr = rshengxiao(name);
           	
	   }else if(name=='前' | name=='後' | name=='家畜' | name=='野獸'){
		   var arrs = [];
		    arrs = ma[name];
		   al =arrs.length;
		   for(i=0;i<al;i++){
		      arr = arr.concat( rshengxiao(arrs[i]));
		   }
           	arr.sort();

	   }else{
	       arr = ma[name];
		   al =arr.length;
		   for(i=0;i<al;i++){
		      arr[i] = rm(arr[i]);
		   }
	   }
	   $(this).parent().parent().find("input.val").val(arr.join(','));
   });

}
function rm(v){
	if(Number(v)<10) return '0'+v;
	else return v;
}