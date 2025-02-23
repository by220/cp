function myready(){
	$(document).keydown(function(event){ 
	      if(event.keyCode == 13){ 
		     window.location = "/Member/index";
		     return ;
		  }
	});
}