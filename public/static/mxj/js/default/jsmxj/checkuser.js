// JavaScript Document

function myready(){
    //setTimeout(xreload,55000); 
	//setTimeout(getopen,10000);
    setTimeout(getlogin,20000);
}

function xreload(){
   window.location.reload();return false;
}

function getopen(){
    $.ajax({type:'POST',url:'makelib.php',dataType:'json',data:'xtype=getopen',cache:false,success:function(m){		
																						
	     if((Number(m[0])!=Number($(".panstatus").attr('s')) | Number(m[1])!=Number($(".otherstatus").attr('s')) ) & (Number(m[0])==0 | Number(m[0])==1)){
			 
			 parent.window.location.reload();
		     parent.window.location.href=parent.window.location.href;
			 return;
		 }
	}});
	setTimeout(getopen,10000);
}


function getlogin(){
    $.ajax({type:'POST',url:'getlogin.php',data:'xtype=getlogin',cache:false,success:function(m){	 	
	     if(Number(m)==1){
			 top.window.location.href= top.window.location.href;
			 return false;
		 }
	}});
	setTimeout(getlogin,20000);
}

