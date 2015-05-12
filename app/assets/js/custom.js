/*
 *
 *		CUSTOM.JS
 *
 */

(function($){
	
	// DETECT TOUCH DEVICE //
	function is_touch_device() {
		return !!('ontouchstart' in window) || ( !! ('onmsgesturechange' in window) && !! window.navigator.maxTouchPoints);
	}
	
	
	// SHOW/HIDE MOBILE MENU //
	function show_hide_mobile_menu() {
		
		$("#mobile-menu-button").on("click", function(e) {
            
			e.preventDefault();
			
			$("#mobile-menu").slideToggle(300);
			
        });	
		
	}
	
	
	// MOBILE MENU //
	function mobile_menu() {
		
		if ($(window).width() < 992) {
			
			if ($("#menu").length > 0) {
			
				if ($("#mobile-menu").length < 1) {
					
					$("#menu").clone().attr({
						id: "mobile-menu",
						class: ""
					}).insertAfter("#header");
					
					$("#mobile-menu .megamenu > a").on("click", function(e) {
                        
						e.preventDefault();
						
						$(this).toggleClass("open").next("div").slideToggle(300);
						
                    });
					
					$("#mobile-menu .dropdown > a").on("click", function(e) {
                        
						e.preventDefault();
						
						$(this).toggleClass("open").next("ul").slideToggle(300);
						
                    });
				
				}
				
			}
				
		} else {
			
			$("#mobile-menu").hide();
			
		}
		
	}
	
	
	// STICKY //
	function sticky() {
		
		var sticky_point = 200;
		
		if ($(this).scrollTop() > sticky_point) {  
			$("#header").addClass("header-sticky");
		} else {
			$("#header").removeClass("header-sticky");
		}
		
		if ($(this).scrollTop() > sticky_point){  
			$(".elements-menu").addClass("elements-menu-sticky");
		} else {
			$(".elements-menu").removeClass("elements-menu-sticky");
		}
		
	}
	
	
	// SEARCH //
	function header_search() {
	
		var inputWidth = '240px',
			inputWidthReturn = '34px';
			
		$('#search-form input[type="text"]').focus(function () {
			$(this).val(function () {
				$(this).addClass('open').attr('placeholder', 'Search...');
			}),
			$(this).animate({
				width: inputWidth
			}, "fast");
		});
		$('#search-form input[type="text"]').blur(function () {
			$(this).removeClass('open').animate({
				width: inputWidthReturn
			}, "fast");
			$(this).attr('placeholder', '').val('');
		});
		 
	 }
	
 
	// PROGRESS BARS // 
	function progress_bars() {
		
		$(".progress .progress-bar:in-viewport").each(function() {
			
			if (!$(this).hasClass("animated")) {
				$(this).addClass("animated");
				$(this).animate({
					width: $(this).attr("data-width") + "%"
				}, 2000);
			}
			
		});
		
	}


	// CHARTS //
	function pie_chart() {
		
		$(".pie-chart:in-viewport").each(function() {
			
			$(this).easyPieChart({
				animate: 1500,
				lineCap: "square",
				lineWidth: $(this).attr("data-line-width"),
				size: $(this).attr("data-size"),
				barColor: $(this).attr("data-bar-color"),
				trackColor: $(this).attr("data-track-color"),
				scaleColor: "transparent",
				onStep: function(from, to, percent) {
					$(this.el).find(".pie-chart-details .value").text(Math.round(percent));
				}
			});
			
		});
		
	}
	
	// COUNTER //
	function counter() {
		
		$(".counter .counter-value:in-viewport").each(function() {
			
			if (!$(this).hasClass("animated")) {
				$(this).addClass("animated");
				$(this).jQuerySimpleCounter({
					start: 0,
					end: $(this).attr("data-value"),
					duration: 2000
				});	
			}
		
		});
		
	}
	
	
	// LOAD MORE PROJECTS //
	function load_more_projects() {
	
		var number_clicks = 0;
		
		$(".load-more").on("click", function(e) {
			
			e.preventDefault();
			
			if (number_clicks == 0) {
				$.ajax({
					type: "POST",
					url: $(".load-more").attr("href"),
					dataType: "html",
					cache: false,
					msg : '',
					success: function(msg) {
						$(".isotope").append(msg);	
						$(".isotope").imagesLoaded(function() {
							$(".isotope").isotope("reloadItems").isotope();
							$(".fancybox-portfolio-gallery").attr("rel","group").fancybox({
								prevEffect: 'none',
								nextEffect: 'none'
							});
							$(".fancybox-blog-gallery").attr("rel","group").fancybox({
								prevEffect: 'none',
								nextEffect: 'none'
							});
						});
						number_clicks++;
						$(".load-more").html("No more project");
					}
				});
			}
			
		});
		
	}
	
	
	// SHOW/HIDE GO TOP //
	function show_hide_go_top() {
		
		if ($(window).scrollTop() > $(window).height()/2) {
			$("#go-top").fadeIn(300);
		} else {
			$("#go-top").fadeOut(300);
		}
		
	}
	
	
	// CONTACT TOGGLE //
	function contact_toggle() {
		
		$(".contact-toggle a").on("click", function(e){
			
			e.preventDefault();
			$(".contact-content").slideToggle(300);
			$(".contact-toggle").toggleClass("open");
			
		})
		
	}
	
	
	// SMOOTH SCROLLING //
	function smooth_scrolling() {
		
		$('.elements-menu a[href*=#]:not([href=#])').on("click", function() {
			
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 1000);
				
					return false;
				
				}
			
			}
			
		});
		
	}
	
	
	// GO TOP //
	function go_top() {				
		
		$("#go-top").on("click", function () {
			$("html, body").animate({
				scrollTop: 0
			}, 800);
			return false;
		});
		
	}
	
	// ANIMATIONS //
	function animations() {
		
		animate = new WOW({
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 100,
			mobile: false,
			live: true
		})
		
		animate.init();
		
	}
	
	// DOCUMENT READY //
	$(document).ready(function(){
		
		// MENU //
		$(".menu").superfish({
			delay: 500,
			animation: {
				opacity: 'show',
				height: 'show'
			},
			speed: 'fast',
			autoArrows: true
		});
		
		
		// SHOW/HIDE MOBILE MENU //
		show_hide_mobile_menu();
		
		
		// MOBILE MENU //
		mobile_menu();
		
		
		// SEARCH //
		header_search();
		
		
		// FANCYBOX //
		$(".fancybox").fancybox({});
		
		$(".fancybox-portfolio-gallery").attr("rel","group").fancybox({
			prevEffect: 'none',
			nextEffect: 'none'
		});
		
		$(".fancybox-blog-gallery").attr("rel","group").fancybox({
			prevEffect: 'none',
			nextEffect: 'none'
		});
		
		// REVOLUTION SLIDER //
		$(".banner").revolution({
			delay: 9000,
			startwidth: 1170,
			startheight: 940,
			startWithSlide: 0,
			
			fullScreenAlignForce: "off",
			autoHeight: "off",
			minHeight: "off",
			
			shuffle: "off",
			
			onHoverStop: "on",
			
			thumbWidth: 100,
			thumbHeight: 50,
			thumbAmount: 3,
			
			hideThumbsOnMobile: "off",
			hideNavDelayOnMobile: 1500,
			hideBulletsOnMobile: "off",
			hideArrowsOnMobile: "off",
			hideThumbsUnderResoluition: 0,
			
			hideThumbs: 0,
			hideTimerBar: "on",
			
			keyboardNavigation: "on",
			
			navigationType: "bullet",
			navigationArrows: "solo",
			navigationStyle: "round",
			
			navigationHAlign: "center",
			navigationVAlign: "bottom",
			navigationHOffset: 0,
			navigationVOffset: 60,
			
			soloArrowLeftHalign: "left",
			soloArrowLeftValign: "center",
			soloArrowLeftHOffset: 20,
			soloArrowLeftVOffset: 0,
			
			soloArrowRightHalign: "right",
			soloArrowRightValign: "center",
			soloArrowRightHOffset: 20,
			soloArrowRightVOffset: 0,
			
			
			touchenabled: "off",
			swipe_velocity: "0.7",
			swipe_max_touches: "1",
			swipe_min_touches: "1",
			drag_block_vertical: "false",
			
			stopAtSlide: -1,
			stopAfterLoops: -1,
			hideCaptionAtLimit: 0,
			hideAllCaptionAtLilmit: 0,
			hideSliderAtLimit: 0,
			
			dottedOverlay: "none",
			
			spinned: "spinner4",
			
			fullWidth: "off",
			forceFullWidth: "off",
			fullScreen: "off",
			fullScreenOffsetContainer: "#topheader-to-offset",
			fullScreenOffset: "0px",
			
			panZoomDisableOnMobile: "off",
			
			simplifyAll: "off",
			
			shadow: 0
		});
	
	
		// BxSLIDER //
		$(".services-slider ul").bxSlider({
			mode: 'horizontal',
			speed: 800,
			infiniteLoop: true,
			hideControlOnEnd: false,
			pager: true,
			pagerType: 'full',
			controls: false,
			auto: true,
			pause: 4000,
			autoHover: true,
			useCSS: false,
			slideWidth: 350,
			minSlides: 1,
			maxSlides: 4,
			moveSlides: 1,
			slideMargin: 30
		});
		
		$(".features-slider ul").bxSlider({
			mode: 'fade',
			speed: 800,
			infiniteLoop: true,
			hideControlOnEnd: false,
			pager: true,
			pagerType: 'full',
			controls: true,
			auto: true,
			pause: 4000,
			autoHover: true,
			useCSS: false
		});
		
		$(".testimonial-slider ul").bxSlider({
			mode: 'fade',
			speed: 800,
			infiniteLoop: true,
			hideControlOnEnd: false,
			pager: true,
			pagerType: 'full',
			controls: false,
			auto: true,
			pause: 4000,
			autoHover: true,
			useCSS: false
		});
		
		$(".images-slider ul").bxSlider({
			mode: 'horizontal',
			speed: 500,
			infiniteLoop: true,
			hideControlOnEnd: false,
			pager: false,
			pagerType: 'full',
			controls: true,
			auto: true,
			pause: 4000,
			autoHover: true,
			useCSS: false
		});
		
		$(".images-slider-2 ul").bxSlider({
			mode: 'horizontal',
			speed: 500,
			infiniteLoop: true,
			hideControlOnEnd: false,
			pager: true,
			pagerType: 'full',
			controls: false,
			auto: true,
			pause: 4000,
			autoHover: true,
			useCSS: false
		});
		
		
		// GOOGLE MAPS //
		$(".map").gMap({
			maptype: 'ROADMAP',
			scrollwheel: false,
			zoom: 16,
			markers: [{
				address: 'Getway Center for the Arts, Florida, USA',
				html: 'Wien Office'
			}],
			controls: {
				panControl: true,
				zoomControl: true,
				mapTypeControl: true,
				scaleControl: false,
				streetViewControl: false,
				overviewMapControl: false
			}
		});
		
		
		// ISOTOPE //
		$(".isotope").imagesLoaded( function() {
			
			var container = $(".isotope");
			
			container.isotope({
				itemSelector: '.isotope-item',
				layoutMode: 'masonry',
				transitionDuration: '0.8s'
			});
			
			$(".filter li a").on("click", function () {
				$(".filter li a").removeClass("active");
				$(this).addClass("active");
	
				var selector = $(this).attr("data-filter");
				container.isotope({
					filter: selector
				});
	
				return false;
			});
	
			$(window).resize(function () {
				container.isotope();
			});
			
		});
		
		
		// LOAD MORE PORTFOLIO ITEMS //
		load_more_projects();
		
		
		// PLACEHOLDER //
		$("input, textarea").placeholder();
		
		
		// CONTACT FORM VALIDATE & SUBMIT //
		// VALIDATE //
		$("#contact-form").validate({
			rules: {
				name: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				subject: {
					required: true
				},
				message: {
					required: true,
					minlength: 10
				}
			},
			messages: {
				name: {
					required: "Please enter your name!"
				},
				email: {
					required: "Please enter your email!",
					email: "Please enter a valid email address"
				},
				subject: {
					required: "Please enter the subject!"
				},
				message: {
					required: "Please enter your message!"
				}
			},
				
			// SUBMIT //
			submitHandler: function(form) {
				var result;
				$(form).ajaxSubmit({
					type: "POST",
					data: $(form).serialize(),
					url: "assets/php/send.php",
					success: function(msg) {
						
						if (msg == 'OK') {
							result = '<div class="alert alert-success">Your message was successfully sent!</div>';
							$("#contact-form").clearForm();
						} else {
							result = msg;
						}
						
						$("#alert-area").html(result);
	
					},
					error: function() {
	
						result = '<div class="alert alert-danger">There was an error sending the message!</div>';
						$("#alert-area").html(result);
	
					}
				});
			}
		});
		
		
		// PARALLX //
		if (!is_touch_device()) {
			$(".parallax").parallaxScroll({
				friction: 0
			});
		}
		
		
		// SHOW/HIDE GO TOP
		show_hide_go_top();
		
		
		// GO TOP //
		go_top();
		
		
		// YOUTUBE PLAYER //
		$(".youtube-player").mb_YTPlayer();
		
		
		// CONTACT TOGGLE //
		contact_toggle();
		
		
		// SMOOTH SCROLLING //
		smooth_scrolling();
		
		
		// SCROLLSPY //
		$("body").scrollspy({
			target: '.elements-menu'
		});
		
		
		// ANIMATIONS //
		animations();
		
	});

	
	// WINDOW SCROLL //
	$(window).scroll(function(){
		
		progress_bars();
		pie_chart();
		counter();
		show_hide_go_top();
		sticky();
		
	});
	
	
	// WINDOW RESIZE //
	$(window).resize(function(e) {

		mobile_menu();
		
	});
	
})(window.jQuery);