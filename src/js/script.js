/* --------------------------------------------------

	ui
	
-------------------------------------------------- */
var UI = (function ($) {
    var jk = {};
    jk.config = {
    	winW: $(window).outerWidth(),
    	winH: $(window).innerHeight(),
    	$viewport: $(".viewport"),
    	$_toggles: $(".target a.panel"),
    	$jk_ui_elevator: $(".jk_ui_elevator a"),
    	$menu: $("a.js_menu")
    };
    jk.init = function () {
    	jk.window();
    	jk.viewport();
    	jk.ui.menu();
    	jk.ui.elevator();
    	//jk.ui.toggle();

    };
    jk.viewport = function () {
    	var h = jk.config.winH;  
    	var _nav = $("nav[role='navigation'] a");
    	
    	$(".hero").css({"height" : h + "px"}); 
    	
    	var url = location.pathname;
    	
    	_nav.removeClass("on");
    	
    	$.each(_nav, function(){
	    	var chk = $(this).attr("href");
	    	
	    	if (chk == url)	{
	    		$(this).addClass("on");
	    	}
    	});
    	
    };
    jk.window = function () {
    	var $window = $(window);
    	
    	$window.resize(function () {
    		jk.config.winH = $window.innerHeight();
    		jk.viewport();
    	});
    }
  	jk.ui = {
  		toggle : function () {
	  		var _toggle = $(".target a.panel");	  		
	  		  		
	  		_toggle.on("click", this, function(evt) {
	  			evt.preventDefault();
	  			$(this).toggleClass("on");
	  		});
	  		
  		},
  		menu : function() {
  			jk.config.$menu.on("click", this, function(evt){
  				evt.preventDefault();
  				$("nav[role='navigation']").toggleClass("on");
  			});
  		},
  		elevator : function() {
  			var $_nav = jk.config.$jk_ui_elevator;
  			
  			$_nav.on("click", this, function(e) {
	  			e.preventDefault();
	  			var i = $(this).attr("href"),
	  				offset = jk.config.$jk_ui_elevator.innerHeight() + 60;
	  			jk.scrollPage(i, offset, 260);
	  			$_nav.removeClass("on");
	  			$(this).addClass("on");
  			});
  		}
  	};
  	jk.scrollPage = function (i, o, d) {
		var y = $(i).offset().top - o;
  		$('html, body').animate({
			scrollTop: y
		}, {duration: d, queue: false});
  	};
    return jk;
})(jQuery);

/*
	start it up
*/
// ################################################################################
$(function () {
	
	UI.init();
	

});