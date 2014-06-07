var Feeder = (function ($) {
    var jk = {};
    jk.config = {
	    count : 15,
	    cardArray : []
    };
    jk.init = function (options) {
    	jk.config = $.extend(jk.config, options);
    	jk.fetch();
    };
    jk.fetch = function () {
		$.ajaxSetup({ async: true });
    	$.ajax({
			type:     	"GET",
			url:  		jk.config.start_url + jk.config.tag + "/media/recent?" + jk.config.client_id + "&" + jk.config.count,
			dataType: 	"jsonp",
			success: function(data){
				
				jk.config.target.find(".loading").remove();
				
				$.each(data.data, function(index, item) {
					var tpl = {
						id : "el" + index,
						title : (item.length > 0) ? item.caption.text : "",
						img : item.images.low_resolution.url,
						likes : item.likes.count,
						url: item.link
					}
					jk.config.cardArray.push(tpl);
														
				});
				// do some stuff to the feed panels
				jk.view(jk.config.count);

			},
			error: function(data) {
				// console.log(data);
			}
		});
    };
    jk.view = function (limit) {
    	Utilities.sortArray(jk.config.cardArray, "likes", $(".js_target"), false);
    	$.each(jk.config.cardArray, function(index, item) {
    		
    		if (index < limit) {
    			jk.config.target.append(Mustache.to_html($("#card").html(), item));
    		}
    	});
    	
    }
    return jk;
})(jQuery);

var Utilities = (function($) {
	var jk = {};
	
	jk.sortArray = function (array, prop, trgt, asc) {
		array = array.sort(function(a, b) {
	        if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
	        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
	    });
	};
    jk.URLVars = function() {
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
		return vars;
	};
	return jk;
})(jQuery);
/* --------------------------------------------------

	ui
	
-------------------------------------------------- */
var FeederUI = (function ($) {
    var jk = {};
    jk.config = {
    	
    };
    jk.init = function (options) {
    	jk.config = $.extend(jk.config, options);
    	jk.ui.activate();
    };
  	jk.ui = {
  		activate : function () {
  			var _btn = $("a.js_insta");
  			
  			_btn.on("click", this, function(evt) {
  				evt.preventDefault();
  				$(this).remove();
  				jk.loader(jk.config.target);
  				Feeder.init(jk.config);
  			});
  		},
  		paginate : function () {
	  		var _next_button = $("a.button");	  		
	  		var val = parseInt($(".js_count").html()) + 31;
	  		$(".js_count").html(val);
	  		_next_button.on("click", this, function(e) {
	  			e.preventDefault();
	  			jk.loader($(this));
	  			Feeder.init({
		  			start_url : $(this).attr("href"),
		  			target : $(".js_target"),
		  			pagination : $(".js_paginate")
		  		});
		  		
	  		});
	  		
  		},
  		full : function () {
  			$("body").addClass("loaded");
  		
  			var _full_button = $("a.js_full");	
  			_full_button.on("click", this, function(e) {
	  			e.preventDefault();
	  			$(".js_target").html("");
	  			$("body").toggleClass("full");
	  			if ($("body").hasClass("full")) {
	  				Feeder.view(500);
	  			} else {
	  				Feeder.view(50);
	  			}
	  			
	  		});
  		}

  	};
  	jk.loader = function(el) {
   		 var loader = $("<div>").addClass("loading");
		 $(el).append(loader);
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
	var chk = Utilities.URLVars(),
		tag = "firefoodmusic";
		
	if (chk.q) {
		tag = chk.q;
	}
	
	FeederUI.init({
		start_url : "https://api.instagram.com/v1/tags/",
		tag : tag,
		client_id : "client_id=277fa06ca9f641249356582c90c9f401",
		target : $(".js_target"),
		pagination : $(".js_paginate")
	});

});