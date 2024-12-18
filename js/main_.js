$(document).ready(function () { 

	/* silde auto_control & custom paging */
	$slick = $('.modal_popup, .event_head_pop, .event_foot_pop, .issue, .sports_center, .popupzone, .section02, .contribute, .etc_site');
	$slickList = $slick.find('.item_list');	
	$slickList.on('init', function (event, slick) {
		$(this).append('<div class="slick-controls"><div class="slick-counter"><span class="current"></span> <i></i> <span class="total"></span></div><div class="control"> <button class="control_pause active"><i class="xi-pause"></i><span class="sr-only">정지</span></button><button class="control_play"><i class="xi-play"></i><span class="sr-only">시작</span></button></div></div>');
		$(this).find('.current').text(slick.currentSlide + 1);
		$(this).find('.total').text(slick.slideCount);
	}).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		$(this).find('.current').text(nextSlide + 1);
	})

	$slick.on("click", ".control_pause", function () {
		$(this).removeClass(AC).siblings("button").addClass(AC)
		$(this).parents(".item_list").slick("slickPause")
	})
	$slick.on("click", ".control_play", function () {
		$(this).removeClass(AC).siblings("button").addClass(AC)
		$(this).parents(".item_list").slick("slickPlay")
	});
	/* $slick.on("click", ".slick-arrow", function () {
		$(this).parents(".item_list").find(".control_pause").removeClass(AC).siblings("button").addClass(AC)
	}) */

	/* event_pop */
	const $modalPop = $(".modal_popup .item_list, .event_head_pop .item_list, .event_foot_pop .item_list")
	$modalPop.slick({
		slidesToShow: 1,
		slidesToScroll: 1,        		
		fade: true,
		autoplay: true,  
		arrows: true,       
		dots:false
	})

	/* issue */
	const $visualIssue = $(".issue .item_list")
	$visualIssue.slick({
		slidesToShow: 1,
		slidesToScroll: 1,        
		vertical: true,
		autoplay: true,         
		dots:false
	})

	/* section active */
	$(window).on("load scroll", function () {
		$(".section").each(function (i) {
			contTop = $(this)[0].getBoundingClientRect().top
			//콘텐츠 active
			if (contTop < $(window).height()/2) {
				//$(this).addClass(AC)
				$(".section_nav").find("li").eq(i).addClass(AC).siblings().removeClass(AC)
			}else{
				$(this).removeClass(AC)
			}
		})
	})
	$(".section_nav").find("li>a").on("click", function (e) {
		$("html,body").stop().animate({
			scrollTop: $(this.hash).offset().top
		}, 800)
		e.preventDefault()
	})


	/* visual 동영상 포함 
	const $visual = $(".visual_section .item_list");	
	$visual.on('init', function (event, slick) {
		setTimeout( function() {
			$('.visual_section .slick-dots').addClass("video");
		});			
	}).slick({
		slidesToScroll: 1,
		infinite: true,        
		arrows: false,
		fade: true,
		slidesToShow: 1,
		pauseOnHover: false,
		autoplay: true,
		speed: 500,
		dots: true,
		autoplaySpeed: 29300,
		customPaging: function(slider, i) { 
			var dotNumber = $(slider.$slides[i]).data('dot-number');
			return '<button class="tab">' + dotNumber + '</button>';            
		}
	}).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		$('.visual_section .slick-dots').removeClass("active video");	
		$("#video").get(0).pause();	
		$("#video").get(0).currentTime = 0;

	}).on('afterChange', function (event, slick, currentSlide, nextSlide) {		
		var vid = $(slick.$slides[currentSlide]).find('video');		
		if (vid.length > 0) {	
			$visual.slick('slickPause');	
			vid.get(0).play();
			vid.on('ended', function() {				
				$visual.slick('slickSetOption', 'autoplaySpeed', 0);				
				if($visual.find(".control_play").hasClass("active")) {
					$visual.slick('slickPause') 
					$(this).get(0).currentTime = 0;
				}else{
					$visual.slick('slickPlay')
				}
			});
			$('.visual_section .slick-dots').addClass("video");
		}else{
			$visual.slick('slickSetOption', 'autoplaySpeed', 4000); 	
			$('.visual_section .slick-dots').addClass(AC);
		}
	})	
	$visual.find('.slick-dots').wrap('<div class="slider_controls"></div>');
	$visual.find('.slider_controls').append('<div class="control"><button class="control_pause active"><i class="xi-pause"></i><span class="sr-only">정지</span></button><button class="control_play"><i class="xi-play"></i><span class="sr-only">시작</span></button></div>');
	$visual.on("click", ".control_pause", function () {
		$(this).removeClass(AC).siblings("button").addClass(AC)
		$(this).parents(".item_list").slick("slickPause")
	})
	$visual.on("click", ".control_play", function () {
		$(this).removeClass(AC).siblings("button").addClass(AC)
		$(this).parents(".item_list").slick("slickPlay")
	});	
	$visual.on("click", ".slick-dots button", function () {
		$(this).parents(".slider_controls").find(".control_pause").removeClass(AC).siblings("button").addClass(AC)
	})
	*/

	/* visual 동영상 없을때 */
	const $visual = $(".visual_section .item_list");	
	$visual.on('init', function (event, slick) {
		setTimeout( function() {
			$('.visual_section .slick-dots').addClass("active");
		});			
	}).slick({
		slidesToScroll: 1,
		infinite: true,        
		arrows: false,
		fade: true,
		slidesToShow: 1,
		pauseOnHover: false,
		autoplay: true,
		speed: 500,
		dots: true,
		autoplaySpeed: 4000,
		customPaging: function(slider, i) { 
			var dotNumber = $(slider.$slides[i]).data('dot-number');
			return '<button class="tab">' + dotNumber + '</button>';            
		}
	}).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		$('.visual_section .slick-dots').removeClass("active");	
	}).on('afterChange', function (event, slick, currentSlide, nextSlide) {	
		$('.visual_section .slick-dots').addClass(AC);
	})
	$visual.find('.slick-dots').wrap('<div class="slider_controls"></div>');
	
	$visual.find('.slider_controls').append('<div class="control"><button class="control_pause active"><i class="xi-pause"></i><span class="sr-only">정지</span></button><button class="control_play"><i class="xi-play"></i><span class="sr-only">시작</span></button></div>');
	$visual.on("click", ".control_pause", function () {
		$(this).removeClass(AC).siblings("button").addClass(AC)
		$(this).parents(".item_list").slick("slickPause")
	})
	$visual.on("click", ".control_play", function () {
		$(this).removeClass(AC).siblings("button").addClass(AC)
		$(this).parents(".item_list").slick("slickPlay")
	});	
	/* $visual.on("click", ".slick-dots button", function () {
		$(this).parents(".slider_controls").find(".control_pause").removeClass(AC).siblings("button").addClass(AC)
	}) */
		
	/* section1 */
	$(".acctoggle_contrast").on("click", function(){
		$("body").toggleClass("contrast");
	});		

	const $sect01Sports = $(".sports_center .item_list")
	$sect01Sports.slick({
		slidesToShow: 1,
		slidesToScroll: 1,        
		autoplay: true,         
		dots:false        
	})	
	
	$(".announce .tabs .tab_nav, .sns .tabs .tab_nav").on("click", function () {
		active(this)
	})  
	$(".announce .tabs>li:last-child>a").unbind("click keydown");

	const $sect01media = $(".media_data .item_list")
	$sect01media.slick({
		slidesToShow: 1,
		slidesToScroll: 1,        
		autoplay: false, 
		arrows: false,        
		dots:true        
	});

	const $sect01Popupzone = $(".popupzone .item_list")
	$sect01Popupzone.slick({
		slidesToShow: 1,
		slidesToScroll: 1,        
		autoplay: true,         
		dots:false        
	})
		

	/* section2 사업안내 */
	const $sect02biz = $(".section02 .item_list")
	$sect02biz.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true, 
		dots:false,
		speed: 500,
		autoplaySpeed: 10000    
	})		
		

	/* section3 */	
	$(".olpark_sns .olpark_sns_open").on("click", function () {
        active(this, "toggle", 1)
    })
	
	const $sect03Contribute = $(".contribute .item_list")
	$sect03Contribute.slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,         
		dots:false		
	})


	/* etc_site */
	const $etcSite = $(".etc_site .item_list")
	$etcSite.slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: true,         
		dots:false,
		variableWidth: true
	})

	


})

/* 팝업 - 하루동안 열지 않기 */
//get 쿠키
function getCookie(name)
{
    var nameOfCookie = name + "=";
    var x = 0;
    while ( x <= document.cookie.length )
    {
        var y = ( x + nameOfCookie.length );
        if ( document.cookie.substring(x,y) == nameOfCookie )
        {
            if( (endOfCookie = document.cookie.indexOf(";", y)) == -1 )
                endOfCookie = document.cookie.length;
            return unescape(document.cookie.substring(y, endOfCookie)); 
        }
        x = document.cookie.indexOf( " ", x ) + 1;
        if ( x == 0 )
            break;
    }
    return "";		
}

// 레이어 팝업 열기
function openLayer(arg)
{
    var pop = document.getElementById(arg);
    pop.style.display = "block";
}
// 레이어 팝업 닫기
function closeLayer(arg)
{
    var pop = document.getElementById(arg);
    pop.style.display = "none";
}
// set 쿠키
function setCookie( name, value, expiredays ){	
    var todayDate = new Date() ;  
    todayDate.setDate(todayDate.getDate() + expiredays) ;
    document.cookie = name + "=" + escape( value ) + "; path=/" + "; expires=" + todayDate.toGMTString() + ";";		
}
function check_close(id, arg){	
    if (document.getElementById(id).checked) {
        setCookie(arg, "done", 7);
    }else{
        setCookie(arg, "f", 7);
    }
}

