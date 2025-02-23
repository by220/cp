//additional coding added by david 
var mobileDisabled = false;
	//allow only number input
	$(document).on('keydown', '.submitticketinput1', function(e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

	$(document).on('keydown', '.submitticketinput2', function(e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
	
	$(document).on('click', '.closebtn', function(e) {
		if (!mobileDisabled) {
			$(".uploadbet").fadeOut (100);
			$(".overlay2").fadeOut (100);
			$(".submitbetdetail").html ("");
			if (!$('#click_hold:checked').length) { $(".submitticketinput1").val ("") }
			$(".ticketnum").html ("0");
			$(".tickettotal").html ("0");
		}
	});
	
	$(document).on('click', '.closebtn2, .closebtn3', function(e) {
		if (!mobileDisabled) {
			$(".confirmbet").fadeOut (100);
			$(".overlay2").fadeOut (100);
			$(".submitbetdetail").html ("");
			if (!$('#click_hold:checked').length) { $(".submitticketinput1").val ("") }
			$(".ticketnum").html ("0");
			$(".tickettotal").html ("0");
		}
	});
	
	$(document).on('click', '.delticket', function(e) {
		if (!mobileDisabled) {
			var tickettotal = 0;	
			$(this).parent().parent().parent().remove();
			$('.submitticketinput2').each(function(){
				tickettotal = tickettotal + parseInt($(this).val ());
			});
			$(".tickettotal").html (tickettotal);
			
			$(".ticketnum").html ($('.ticket').length);
		}

	});

	$(document).on('click', '.uploadbetbtn', function(e) {
		if (!mobileDisabled) {
			var errormsg = false;
			$(".submitticketinput2").each(function(){
				var chkvalue = $(this).val ();
				if (chkvalue == "") {
					errormsg = true;
				}
			});
			
			if (errormsg == true) {
				alert ("您输入类型不正确或没有输入实际金额！");
			} else {
				submitBet();
			}
		}
	});	
	
	
	
	function follownumber () {
		var tickettotal = 0;
		var defaultvalue = $("#hold_value").val ();
		var combinationNumber = ($('.bet_panel').attr('combination')) ? $('.bet_panel').attr('combination') : 1;

		$(".submitticketinput2").val (defaultvalue);
		$('.submitticketinput2').each(function(){
			var s = $(this).val ();
			var num = parseInt(s) || 0;
			tickettotal = tickettotal + (num * combinationNumber);
		});
		$(".tickettotal").html (tickettotal);
	}

	function donotnumber () {
		var tickettotal = 0;
		var combinationNumber = ($('.bet_panel').attr('combination')) ? $('.bet_panel').attr('combination') : 1;

		if (!$('#click_hold:checked').length) { $(".submitticketinput1").val ("") }
		$('.submitticketinput2').each(function(){
			var s = $(this).val ();
			var num = parseInt(s) || 0;
			tickettotal = tickettotal + (num * combinationNumber);
		});
		$(".tickettotal").html (tickettotal);
	}
	
	

//display panel submit bet
function displaysubmitbet(gameArray) {
	$('.uploadbet input[name="mobileDrawNumber"]').val($('#drawNumber').html());
	for (var i=0; i < gameArray.length; i++){
		var gametitle = gameArray[i][0];
		var gamename = gameArray[i][1];
		var gameodds = gameArray[i][2];
		var gameid = gameArray[i][3].split('_');
		
		var selectionFields = ""; 
		
		if (gameArray[i].length == 5) {
			gameid[1] = gameArray[i][4];
		}
		
		if (gameArray[i].length == 8) {
			var mcount = gameArray[i][4];
			var multiple = gameArray[i][5];
			var state = gameArray[i][6];
			gameid[1] = gameArray[i][7];
			
			selectionFields += '<input type="hidden" name="multiple" value="' + multiple + '"><input type="hidden" name="state" value="' + state + '">';
			if (mcount != null) {
				selectionFields += '<input type="hidden" name="mcount" value="' + mcount + '">';
			}
		}

		var ticket = '<div class="ticket row textcenter darkred borderbtmred">\
    				  <div class="padding10 clearfix">\
                      <div class="col-xs-4 valign4">\
                      		<span class="black">' + gametitle + '</span><br/>' + gamename +	'<input type="hidden" name="game" value="' + gameid[0] + '">'+selectionFields+'<input type="hidden" name="contents" value="' + gameid[1] + '"></div>\
                      <div class="col-xs-2 red valign2">' + gameodds + '<input type="hidden" name="odds" value="' + gameodds + '"></div>\
         			  <div class="col-xs-6"><input type="number" min="1" name="amount" class="submitticketinput2 marginright10" onKeyUp="donotnumber();" pattern="\\d*"><div class="delticket inlineblock pull-right"><div class="item-deletebtn"></div></i></div></div>\
    				  </div>\
					  </div>';
		$( ".submitbetdetail" ).append(ticket);
	}
	var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	var newheight = h - 310;
	$(".submitbetdetail").css ("height" , newheight + "px");
	$(".confirmbetdetail").css ("height" , newheight + "px");
	$(".ticketnum").html (gameArray.length);
	$(".uploadbet").fadeIn (100);
	$(".overlay2").fadeIn (100);
	if (!$('#click_hold:checked')) { $(".submitticketinput1").val ("") }
	follownumber();
}

function fetchConfirmBet(drawDate, betsCount) {
	$.ajax({
			url : 'lasts',
			type : 'GET',
			data : {'lottery': lottery },
			success : function(res) {
					$(".uploadbet").fadeOut(100);
					$(".confirmbet").fadeIn(100);
					
					var t = "";
					var i = 0;
					for (var k in res) {
					  if (i < betsCount ) {
						  t += '<div class="row borderbtmred "> \
			              <div class="padding10 clearfix"> \
			                    <!-- <div class="col-xs-3"><strong>15-04-15</strong><br>17:51:21</div> -->\
			                    <div class="col-xs-3"><strong>'+res[k].id+'</div> \
			                    <div class="col-xs-4 ticketnumber darkred">'+drawDate+'</div> \
			                    <div class="col-xs-3">'+res[k].t+'<br><span class="red">'+res[k].o+'</span></div> \
			                    <div class="col-xs-2">'+res[k].a+'</div> \
			                </div> \
			            </div>';
			            	i++;
					  } else {
					  	break;
					  }
					}

		            $('.confirmbetdetail').html(t);
			},
			error : function(e) {
				$(".uploadbet").fadeOut(100);
				$(".confirmbet").fadeOut(100);
				alert('请检查下注状况。');
			}
		});
}

function submitBet() {
	document.activeElement.blur();
	var requestBet = {};
	var bets = [];

	$('.ticket').each(function() {
		var bet = new Object;
		var amount = $(this).find('input[name=amount]').val();

		if (amount != "") {
			bet.game = $(this).find('input[name=game]').val();
			bet.contents = $(this).find('input[name=contents]').val();
			bet.odds = $(this).find('input[name=odds]').val();
			bet.amount = amount;
			($(this).find('input[name=mcount]')) ? bet.mcount = $(this).find('input[name=mcount]').val() : '';
			($(this).find('input[name=multiple]')) ? bet.multiple = $(this).find('input[name=multiple]').val() : '';
			($(this).find('input[name=state]')) ? bet.state = $(this).find('input[name=state]').val() : '';
			bets.push(bet);
		}
	});
	if (bets.length == 0) { 
		resetMobileAll();
		$('.closebtn').trigger('click');
	} else {
		requestBet.lottery = lottery;
		requestBet.drawNumber = $('.uploadbet input[name="mobileDrawNumber"]').val(); 
		requestBet.bets = bets;

		$('.submitbet-loading').show();
		$('.uploadbetbtn').addClass('disabled');
		$('.uploadbet input').prop('disabled', true);
		mobileDisabled = true;
		
		$.ajax({
			url : 'bet',
			type : 'POST',
			contentType : 'application/json',
			data : JSON.stringify(requestBet),
			success : function(res) {
				if (res.message) {
					alert(res.message);
				} else {
					fetchConfirmBet(requestBet.drawNumber, bets.length);
					resetMobileAll();
					$('#account .maxLimit').html(LIBS.round(res.account.maxLimit,1));
					$('#account .balance').html(LIBS.round(res.account.balance,1));
					$('#account .betting').html(LIBS.round(res.account.betting,0));
				}
			},
			error : function(e) {
				resetMobileAll();
				alert('投注失败：' + e.code + ",请检查下注状况後重试。");
			},
			complete : function() {
				$('.uploadbetbtn').removeClass('disabled');
				$('.uploadbetbtn').addClass('disabled');
				$('.uploadbet input').prop('disabled', false);
				$('.submitbet-loading').hide();
				mobileDisabled = false;
			}
		});
	}

}

function checkmargin () {
	
	var footer2visibility = $(".navbar-absolute-bottom").css ("display");

	if (footer2visibility == "none") {
		$(".app-body").css ("padding-bottom" , "0px");
	}
}

$(document).on('click', '.closebtnbtmpanel', function(e) {
	$(".navbar-absolute-bottom").fadeOut (100 , function () {
	checkmargin ();	
	});
});

function showMsg(msg) {
	alert(msg);
}

function backBtn() { 
	$('#backBtn').hide();
	$('#menuBtn').show();
	$('#maintitle').html("");
	location.href = hasBack;
}

$(document).on('click, touchstart', '.thisweek, .lastweek', function(e) {
	if ($(this).hasClass('thisweek')) {
		$('#history_thisweek').show();
		$('#history_lastweek').hide();
	} else {
		$('#history_thisweek').hide();
		$('#history_lastweek').show();
	}
});
