// using "jQuery" here instead of the dollar sign will protect against conflicts with other libraries like MooTools
jQuery(document).ready(function() {

    //Set default Jacked ease
    Jacked.setEase("Expo.easeOut");
	Jacked.setDuration(500);
    Jacked.setEngines({
        firefox: true,
        opera: true,
        safari: true,
		ios: true
    });
    jQuery.easing.def = "easeInOutExpo";
    jQuery.init();

});

// plugin structure used so we can use the "$" sign safely
 (function($) {

    //main vars
    var mainContainer;
	var scrollTop;
	var win;
	var contWidth;
	var prevContWidth;
	var isMobile;
	var isIE;
	var isIE8;
	var firstLoad = true;
	
	
	var circleSize;
	var fullSize;
	var curSingle;
	var curPortfolioTotal;
	var curPortfolio;
	var animateSkills = false;
	
	


    // class constructor / "init" function
    $.init = function() {
		
		
		
		
        // write values to global vars, setup the plugin, etc.
        browser = Jacked.getBrowser();
        isMobile = (Jacked.getMobile() == null) ? false : true;
		isIE8 = Jacked.getIE();
		
		if(isMobile){
			$('html').addClass('mobile');
		}
		if(isIE8){
			$('html').addClass('ie8');
		}
		if(Jacked.getMobile() == "android"){
			$('html').addClass('android');
		}
		
		isIE = browser == 'ie' ? true : false;
		
		//conditional compilation
		var isIE10 = false;
		/*@cc_on
			if (/^10/.test(@_jscript_version)) {
				isIE10 = true;
			}
		@*/
		if(isIE10) isIE = true;
		if(isIE) $('html').addClass('ie');
		
		
		$('.navBtn').click(function() {
				$.scrollTo('#about', 800);						
		});
		
		


		
		//Save DOM elements
		win = $(window);
		win.scrollTop(0);

		mainContainer = $('.container');
        contWidth = mainContainer.width();
		prevContWidth = contWidth;
		
		//handle window events
		$(window).resize(function() {						  
             handleWindowResize();
		});
		handleWindowResize();
		
		
		//if(!isIE8){
			$('.progresscircles').bind('inview', function (event, visible) {
			  if (visible == true) {
				animateSkills = true;
				initSkills();
				$('.progresscircles').unbind('inview');
			  }
			});
		//}

		


		

		//Init
		initMenu()
		initBg();
		initTipsy();
		initAccordion();
		initPortfolio();
		initTabs();
		scaleIframes();
		initTweets();
		//initArcs();
		initInputFields();
		//initNewsletter();
		initContactForm();




    }
	
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
    //MENU
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    function initMenu() {
		
		
		var menu = $('nav.main');
		var menuList = $('nav.main ul');
		var menuBtn = $('nav.main .famenu');
		//var dropDown = $("nav.main select");
		//var menuHasAnimated = false;

		//menu.localScroll(800);
		
		menuBtn.click(function() {
					
            if(menuList.hasClass('open')){
				menuList.removeClass('open');
				$(this).removeClass('closed');
			}
			else{
				menuList.addClass('open');
				$(this).addClass('closed');
			}
			
		});
		
		menuList.find('li').click(function() {
					
           menuList.removeClass('open');
		   menuBtn.removeClass('closed');

		   $.scrollTo($(this).find('a').attr('href'), 1000, {offset: -20});
			
		});


        // Populate dropdown with menu items
		/*
        $("nav.main a").each(function() {

            var el = $(this);
            var optSub = el.parents('ul');
            var len = optSub.length;
            var subMenuDash = '&#45;';
            var dash = Array(len).join(subMenuDash);

            $("<option />", {
                "value": el.attr("href"),
                "html": dash + el.text()
                }).appendTo(dropDown);
			
        });
		
		

        dropDown.change(function() {
			$.scrollTo($(this).find("option:selected").val(), 1000);
        });
		

		//menu scroll
		$(window).scroll(function() {
			
			updateMenuHighlight();
								  
			scrollTop = $(window).scrollTop();

			
			if(scrollTop>= win.height()-49){

				menu.css({
					position: 'fixed',
					top: 0,
					left: 0,
					marginTop: 0
				});
				
				$('.ekoSlider').add($('.logo')).css('visibility','hidden');
				
	
			}
			else{
				
				menu.css({
					position: 'relative',
					marginTop: '-49px'
				});
				
				$('.ekoSlider').add($('.logo')).css('visibility','visible');
				
				
			}
			
		});
		*/


    }
	
	/////////////////////////////////////////////////////////////////////////////
	//MENU HIGHLIGHT WHEN PAGE SCROLL
	/////////////////////////////////////////////////////////////////////////////
	function updateMenuHighlight(){
		
		var topRange = 400;
		var contentTop		=	[];
		var contentBottom	=	[];
		var content	=	[];
		var winTop	=	$(window).scrollTop();
		var rangeTop	=	400;
		var rangeBottom	=	400;

		$('.mainnav a').each(function(){
			if($(this).attr('href').split('#')[0] == ""){
				content.push( $( $(this).attr('href') ) );
				contentTop.push( $( $(this).attr('href') ).offset().top );
				contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
			}
		})

		$.each( contentTop, function(i){

			if ( winTop > contentTop[i] - rangeTop && winTop < contentBottom[i] - rangeBottom ){
				
				//check for and animate skills
                
				
				//highlight menu
				$('.mainnav a')
				.removeClass('selected')
				.eq(i).addClass('selected');
				
				var curPage = $('.mainnav a').eq(i).attr('href').split('#')[1];
				var curAddress = window.location.href.split('#/')[1];

				
				
				
			}

		})
		
		
		
	}
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
    //image background
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
	function initBg(){

			
			$.supersized({
				slides  :  	[ {image : $('section.wrapper').attr('data-backgroundImage')} ]
			});
			

			$('.preloader.main').fadeOut();


	}
	
	
	/////////////////////////////////////////////////////////////////////////////
	//Init skills
	/////////////////////////////////////////////////////////////////////////////
	
	function initSkills(){
		
		if ($('.progresscircles').length) {
			
			$('.progresscircles').find('svg').remove();
			
			$('.progresscircles').each(function(i) {
									   
				var s = $(this);
				var contWidth = s.width();
				var arc = s.find('.arc');
				arc.attr('id', 'arc'+i);
				
				var amount = arc.attr('data-percent');
				var strkw = arc.attr('data-stokewidth');
				var sign = arc.attr('data-sign');
				var fontSize = arc.attr('data-fontSize');
				var circleColor = arc.attr('data-circleColor');
				var strokeInnerColor = arc.attr('data-innerStrokeColor');
				var strokeColor = arc.attr('data-strokeColor');
				var textColor = arc.attr('data-textColor');
				var circleSize = arc.attr('data-size');
				
				
				if(parseInt(circleSize, 10)+parseInt(strkw, 10)>contWidth){
					circleSize = contWidth-strkw;
				}
				
				var fullSize = parseInt(circleSize, 10)+parseInt(strkw, 10);


				var interval;
				

                //Create raphael object
				var r = Raphael('arc'+i, fullSize, fullSize);
				
				//draw inner circle
				r.circle(fullSize/2, fullSize/2, circleSize/2).attr({ stroke: strokeInnerColor, "stroke-width": strkw, fill:  circleColor });
	
				//add text to inner circle
				var title = r.text(fullSize/2, fullSize/2, 0+sign).attr({
					font: fontSize+'px Oswald',
					fill: textColor
				}).toFront();
				
				
				r.customAttributes.arc = function (xloc, yloc, value, total, R) {
					
					
					var alpha = 360 / total * value,
						a = (90 - alpha) * Math.PI / 180,
						x = xloc + R * Math.cos(a),
						y = yloc - R * Math.sin(a),
						path;
					if (total == value) {
						path = [
							["M", xloc, yloc - R],
							["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
						];
					} else {
						path = [
							["M", xloc, yloc - R],
							["A", R, R, 0, +(alpha > 180), 1, x, y]
						];
					}
					return {
						path: path
					};
				};
				
				//make an arc at 150,150 with a radius of 110 that grows from 0 to 40 of 100 with a bounce
				var my_arc = r.path().attr({
					"stroke": strokeColor,
					"stroke-width": strkw,
					arc: [fullSize/2, fullSize/2, 0, 100, circleSize/2]
				});
				
				
				var anim = Raphael.animation({
					arc: [fullSize/2, fullSize/2, amount, 100, circleSize/2]
				}, 1500, "easeInOut");
				
				eve.on("raphael.anim.frame.*", onAnimate);
				

				function onAnimate() {
					var howMuch = my_arc.attr("arc");
					title.attr("text", Math.floor(howMuch[2]) + sign);
				}
				
				if(animateSkills || isIE8){
					my_arc.animate(anim.delay(i*200));
				}
				
				
				
				
			});
			
		}
		
	}
	

	
	
	
	function rgb2hex(rgb) {
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		function hex(x) {
			return ("0" + parseInt(x).toString(16)).slice(-2);
		}
		return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}
	
	
	
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //TWEETS
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    function tweetMouseOver() {
		
		if (mainContainer.find('div').hasClass('tweets')) {

			$(".tweets").find('li').each(function() {
	
				var tw = $(this);
	
				tw.mouseenter(function(e) {
	
					tw.find('.tweet_avatar').jacked({
						backgroundPosition: {
							x: 0,
							y: -10
						}
					}, {
						duration: 500
					})
	
					}).mouseleave(function() {
	
					tw.find('.tweet_avatar').jacked({
						backgroundPosition: {
							x: 0,
							y: 3
						}
					}, {
						duration: 500
					})
	
					});
	
			});
	
		
		}

    }

    function initTweets() {
		
		if ($('.tweets').length) {

			var twitter = $(".tweets").tweet({
				join_text: "auto",
				username: "LGLab",
				avatar_size: 48,
				count: 3,
				auto_join_text_default: "",
				auto_join_text_ed: "",
				auto_join_text_ing: "",
				auto_join_text_reply: "",
				auto_join_text_url: "",
				loading_text: "loading tweets..."
			});
	
			//wait 2 seconds that the tweet loads before we can add mouse over on dynamically generated list items
			setTimeout(tweetMouseOver, 1000);
		
		}

    }
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
    //TABS
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    function initTabs() {

        //check if tabs exists
        if ($('.tabs').length) {

            var coolTabs = $(".tabs");
            var auto = coolTabs.attr('data-autoPlay') == "true" ? true: false;
            var delay = parseInt(coolTabs.attr('data-autoDelay'), 10);

            coolTabs.tabs({
                show: function(event, ui) {
                    var lastOpenedPanel = $(this).data("lastOpenedPanel");
                    if (!$(this).data("topPositionTab")) {
                        $(this).data("topPositionTab", $(ui.panel).position().top)
                        }
                    // do crossfade of tabs
                    $(ui.panel).hide().css('z-index', 2).fadeIn(300, function() {
                        $(this).css('z-index', '');
                        if (lastOpenedPanel) {
                            lastOpenedPanel.toggleClass("ui-tabs-hide").hide();
                        }
                    });

                    $(this).data("lastOpenedPanel", $(ui.panel));
                }
            });

            if (auto) {
                coolTabs.tabs('rotate', delay);
            }

            }
			
			checkTabSize();

    }
	
	function checkTabSize() {
		
		if($('.tabs').length){
			
			$('.tabs').each(function(i) {
									 
				var t = $(this);
				var pw = t.parent().width();
				var list = t.find('ul').first();
				var items = list.find('li');
				var last = list.find('li:last-child');
				var a = t.find('ul li a');
				var itemsw = 0;

				items.each(function(i) {
					var l = $(this);
					var w = textWidth(l.find('a'), 14, true)+30;
					itemsw += w;
					
				});
				
				if(itemsw >= pw){
					
					list.css({
						height: 'auto'
					});
					
					items.css({
						  marginBottom: '2px',
						  float: 'none'
					});
					
					a.css({
						  display: 'block',
						  float: 'none'
					});
					
				}
				else{
					
					list.css({
						height: '37px'
					});
					
					items.not(last).css({
						  borderRight: 'none'
					});
					
					items.css({
						  marginBottom: 0,
						  float: 'left'
					});
					
					a.css({
						  display: 'inline',
						  float: 'left'
					});
					
				}
															
			});
			
		}
		
	}
	
	function textWidth(txt, fontSize, isHtml) {
		
        var html_calc;
		
		if(isHtml){
			html_calc = $('<span>' + txt.html() + '</span>');
		}
		else{
			html_calc = $('<span>' + txt + '</span>');
		}
        html_calc.css('font-size', fontSize + 'px').hide();
        html_calc.prependTo('body');
        var width = html_calc.width();
        html_calc.remove();
        return width;
    }
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
    //ACCORDION
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    function initAccordion() {

        if ($('.acc').length) {
			
			//var accordion;
			
			$('.acc').each(function(i) {
									
				var ac = $(this);
				var as = ac.find('.acc-section');
				var h = ac.find('h4');
				var activeS = null;
				var activeH = null;
				
				//collapse all content
				as.css('display', 'none');
				
				//click
			    h.click(function() {
					
					var c = $(this);
					var s = c.parent().find('.acc-section');
					
					if(!c.hasClass('acc-selected')){
						
						if(activeS){
							activeH.removeClass('acc-selected');
							activeS.slideUp();
						}
						
						c.addClass('acc-selected');
						s.slideDown();
						activeS = s;
						activeH = c;
					}
					else{
						
						c.removeClass('acc-selected');
						s.slideUp();
						activeS = null;
						activeH = null;
						
					}
					
				});
				
				
				
				
			});

        }

    }
	
	
	
	
	
	/////////////////////////////////////////////////////////////////////////////
	//Init progress bars
	/////////////////////////////////////////////////////////////////////////////
	
	function initProgressBars(){
		
		if ($('.progressbars').length) {
			
			$('.progressbars').each(function() {
									   
				var s = $(this);
				var w = s.width()
				
				s.find('.over').each(function(i) {
											  
					var o = $(this);
					var pct = o.attr('data-percentage');
					var tip = o.parent().find('.tooltip');
					var txt = tip.find('span');
					
					tip.css({
						'opacity': 0,
						'left': 0
					});
					
					o.css('width', 0);
					
					
                    tip.delay(100*(i+1)).animate({
					  'opacity': 1
					}, 2000);
					
		
					o.delay(200*(i+1)).animate({
					  width: pct+'%'
					},
					{
					  duration: 2000,
					  step: function(now, fx) {
						var data = fx.elem.id + ' ' + fx.prop + ': ' + now;
						
						var destX = Math.round(now*w/100)-15+'px';
						
						tip.css('left', destX);
						txt.text(Math.round(now)+'%')
					  }
					});
					
					
				});
									
			});
			
		}
		
	}
	
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //TIPSY TOOLTIP
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    function initTipsy() {

        mainContainer.find('.tooltip').each(function() {

            var t = $(this);
			var dir = t.attr('data-tooltipDirection');

            t.css({

            }).tipsy({
                gravity: dir,
                fade: true,
                offset: 5,
                opacity: 1,
                title: 'data-tooltipText'
            });

        });

    }
	
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
    //PORTFOLIO
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    function initPortfolio() {
		
		sglCont = $(".portfolioSingle");
	    mediaCont = sglCont.find('.twothird');
	    txtCont = sglCont.find('.onethird').not('nav');
		

		curSingle = 0;
		curPortfolio;
		curPortfolioTotal;
		
		pHeading = $("<h4 />").appendTo(txtCont);
		pPara = $("<p />").appendTo(txtCont);
		
	
		$("#portfolio figure").each(function(i) {
				
				var fig = $(this);

				//Portfolio single
				fig.click(function() {
							
					$("#portfolio figure").removeClass('selected');
                    var f = $(this);
					f.addClass('selected');
					curSingle = i;
					curPortfolio = f.parent();
					curPortfolioTotal = curPortfolio.find('figure').length;

					
					loadPortfolioSingle(f);
					
				});
				
		});

		
	};
	
	
	
	function scaleIframes() {

        if ($('.scaleframe').length) {
			$('.scaleframe').fitVids();
        }

    }
	
	function emptySinglePortfolio(){
		
		mediaCont.add(txtCont).css('opacity', 0);
		$('<div class="one sPreloader row"><div class="preloader"></div></div>').insertBefore(sglCont);
		sglCont.addClass('hidden').slideUp();
		$.scrollTo($("#portfolio figure").eq(curSingle), 500);
		//$.scrollTo(sglCont.parent().parent().find('.separator').first(), 500, {offset: -30});
		
		//remove previous
		if(sglCont.find('h3').length){
			//sglCont.find('h3').add(sglCont.find('p')).remove();
		}
		if(sglCont.find('img').length){
			sglCont.find('img').remove();
		}
		if(sglCont.find('iframe').length){
			mediaCont.html('');
		}
		if(sglCont.find('.flexslider').length){
			mediaCont.html('');
		}
					
	}
	
	function loadPortfolioSingle(itm){
		
		var f = itm;
		
		var media = f.attr('data-largeMedia');
		var flexAr = media.split(',');
		var type = f.attr('data-mediaType');
		pHeading.html(f.attr('data-largeTitle'));
		pPara.html(f.attr('data-largeDesc'));
		
		if(type == 'image'){
			
			if(flexAr.length > 1){
				loadFlexSlider(flexAr, mediaCont);
			}
			else{
		       loadPortfolioImage(media, mediaCont);
			}
		}
		else if(type == 'youtube'){
			var htm = '<iframe width="640" height="360" src="http://www.youtube.com/embed/' + media + '?hd=1&amp;wmode=opaque&amp;showinfo=0" frameborder="0" allowfullscreen ></iframe>';
			emptySinglePortfolio();
			mediaCont.html(htm);
			scaleIframes();
			$('.sPreloader').remove();
			var pos = calculateSinglePos(curSingle);
			sglCont.remove().insertAfter(pos).removeClass('hidden').slideDown();
			setSingleNav();
			mediaCont.add(txtCont).animate({ opacity: 1 }, 1000);
		}
		else if(type == 'vimeo'){
			var htm = '<iframe width="640" height="360" src="http://player.vimeo.com/video/' + media +'" frameborder="0" allowfullscreen ></iframe>';
			emptySinglePortfolio();
			mediaCont.html(htm);
			scaleIframes();
			$('.sPreloader').remove();
			var pos = calculateSinglePos(curSingle);
			sglCont.remove().insertAfter(pos).removeClass('hidden').slideDown();
			setSingleNav();
			mediaCont.add(txtCont).animate({ opacity: 1 }, 1000);
		}
		
	}
	
	
	function loadPortfolioImage(path, cont) {
        emptySinglePortfolio();
        var img = $("<img />").addClass('scaletofit').appendTo(cont);
        img.attr("src", path);
		
		if($(img)[0].complete){
			img.appendTo(cont);
			$('.sPreloader').remove();
			
			var pos = calculateSinglePos(curSingle);
			sglCont.remove().insertAfter(pos).removeClass('hidden').slideDown();
			setSingleNav();
			mediaCont.add(txtCont).animate({ opacity: 1 }, 1000);
		}
		else{
		   img.load(portfolioImgLoaded);
		}


    }
	
	function portfolioImgLoaded(event) {
		event.stopPropagation();
		$('.sPreloader').remove();
		var pos = calculateSinglePos(curSingle);
		sglCont.remove().insertAfter(pos).removeClass('hidden').slideDown();
		setSingleNav();
		mediaCont.add(txtCont).animate({ opacity: 1 }, 1000);
	}
	
	function loadFlexSlider(ar, cont) {
		
		var fCont = $('<div/>').addClass('flexslider arrowvisible').attr('data-arrows', true).attr('data-thumbnail', false);
		var fList = $('<ul/>').addClass('slides').appendTo(fCont);
	
		for(var i=0;i<ar.length;i++){
			 var li = $('<li/>').appendTo(fList);
			 var img = $('<img/>').attr('src', ar[i]).appendTo(li);
		}
	    emptySinglePortfolio();
		fCont.appendTo(cont);
		
		$('.sPreloader').remove();
		var pos = calculateSinglePos(curSingle);
		sglCont.remove().insertAfter(pos).removeClass('hidden').slideDown();
		setSingleNav();
		mediaCont.add(txtCont).animate({ opacity: 1 }, 1000);
		startPortfolioFlex(fCont);

    }
	
	
	function startPortfolioFlex(target) {
		

				var s = target.css('opacity',0);
				var useArrows = s.attr('data-arrows') == 'true' ? true : false;
				var useThumbs = s.attr('data-thumbnail') == 'true' ? true : false;

	
				s.flexslider({
					animation: "slide",
					video: false,
					directionNav: useArrows,
					controlNav: useThumbs,
					pauseOnAction: true,
					pauseOnHover: true,
					slideshow: true,
					start: function(slider) {
						s.animate({ opacity: 1 }, 1000);
						}
				});


    }
	
	
	function calculateSinglePos(curItem){
		
		var row = Math.floor(curItem/4);
		
		var last = (row+1)*4-1;
		
		if(contWidth < 768) last = curItem;
		
		return($("#portfolio figure").eq(last));

	}
	
	
	function setSingleNav(){
		
	   
		//single navigation
		var sglCont = $(".portfolioSingle");
		var closeBtn = $(".portfolioSingle nav .close");
		var nextBtn = $(".portfolioSingle nav .next");
		var prevBtn = $(".portfolioSingle nav .prev");
		var linkBtn = $(".portfolioSingle nav .link");
		
		closeBtn.click(function() {
				sglCont.slideUp(500, function() {
					if(sglCont.find('iframe').length){
						mediaCont.html('');
					}
				});	   
		});
		
		nextBtn.click(function() {		   
				curSingle = (curSingle < curPortfolioTotal-1) ? curSingle = curSingle+1 : curSingle = 0;
				//emptySinglePortfolio();
				loadPortfolioSingle(curPortfolio.find('figure').eq(curSingle));
				
				$("#portfolio figure").removeClass('selected');
			    curPortfolio.find('figure').eq(curSingle).addClass('selected');
		});
		
		prevBtn.click(function() {		   
				curSingle = (curSingle > 0) ? curSingle = curSingle-1 : curSingle = curPortfolioTotal-1;
				//emptySinglePortfolio();
				loadPortfolioSingle(curPortfolio.find('figure').eq(curSingle));
				$("#portfolio figure").removeClass('selected');
			    curPortfolio.find('figure').eq(curSingle).addClass('selected');
		});
		
		linkBtn.click(function() {
				var u = curPortfolio.find('figure').eq(curSingle).attr('data-url');	
				var t = curPortfolio.find('figure').eq(curSingle).attr('data-target');
				 window.open(u,t);
				
		});
		
	}


	
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //FLEX SLIDER
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    function initFlexSlider() {
		

        if ($('.flexslider').length) {
			
			$('.flexslider').each(function() {
				var s = $(this).css('opacity',0);
				var useArrows = s.attr('data-arrows') == 'true' ? true : false;
				var useThumbs = s.attr('data-thumbnail') == 'true' ? true : false;
				
				
	
				s.flexslider({
					animation: "slide",
					video: false,
					directionNav: useArrows,
					controlNav: useThumbs,
					pauseOnAction: true,
					pauseOnHover: true,
					slideshow: true,
					start: function(slider) {
						s.animate({ opacity: 1 }, 1000);
						}
				});
			});

        }

    }
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
    //CONTACT FORM - INPUT FIELDS - NEWSLETTER
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
	
    function initNewsletter() {

        $('.mailchimp').submit(function() {

                var action = $(this).attr('action');
                var values = $(this).serialize();
				
				$.post(action, values, function(data) {

						  $('.mcresult').hide().html(data).fadeIn();
						  setTimeout(resetMailchimp,5000);
	
                 });

                return false;

            });

    }
	
	function resetMailchimp(){
		
		$('.mcresult').html('');
		$('.mailchimp input[type=submit]').fadeIn(500);
		
		$('.mailchimp input[type=text]').each(function() {
													  
				var ipt = $(this);
				ipt.hide().val(ipt.attr('oValue')).fadeIn();
		});
		
	}
	
	function initInputFields(){
		
            var curVal;
			
			
			$('input[type=text]').each(function() {
					var ipt = $(this);
					ipt.attr('oValue', ipt.val());
					
					ipt.focus(function() {
						curVal = ipt.val();
						ipt.val('');
					});
					
					ipt.blur(function() {
						if (ipt.val() == '') {
							ipt.val(curVal);
						}
					});
					
			});
			
			$('textarea').each(function() {
					var ipt = $(this);
					ipt.attr('oValue', ipt.val());
					
					ipt.focus(function() {
						curVal = ipt.val();
						ipt.val('');
					});
					
					ipt.blur(function() {
						if (ipt.val() == '') {
							ipt.val(curVal);
						}
					});
					
			});
			
		
	}

    function initContactForm() {



            $('#contactform').submit(function() {


                var action = $(this).attr('action');
                var values = $(this).serialize();

                $('#contactform #submit').attr('disabled', 'disabled').after('<img src="images/contact/ajax-loader.gif" class="loader" />');


                $("#message").slideUp(750, function() {

                    $('#message').hide();

                    $.post(action, values, function(data) {
                        $('#message').html(data);
                        $('#message').slideDown('slow');
                        $('#contactform img.loader').fadeOut('fast', function() {
                            $(this).remove()
                            });
                        $('#contactform #submit').removeAttr('disabled');
                        if (data.match('success') != null){
						}

                    });

                });

                return false;

            });

      

    }
	
	
	
	
	
	
	
    /////////////////////////////////////////////////////////////////////////////
	//handleWindowResize
	/////////////////////////////////////////////////////////////////////////////
	function handleWindowResize(){

		
		contWidth = mainContainer.width();
		
		if (contWidth != prevContWidth) {
			
			prevContWidth = contWidth;
			initSkills();
			initProgressBars();

		}
		
	}
	

		

    /////////////////////////////////
    //End document


})(jQuery);