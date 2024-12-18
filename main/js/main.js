/*----------------------------------------------------------------------------
 * main.js
 * -------------------------------------------------------------------------*/


$(function() { 

	//로딩시 시간차
	setTimeout(function(){ 
		$(".visual_section").addClass(AC);
		setTimeout(function(){ 
			$(".header").addClass("start");
			setTimeout(function(){ $(".side_left_util").addClass("start");},400);
		},250);
	},250);
	
	if($(".modal_main_event").length){
		$("html").addClass("noscroll");
	}
	$(".layer-close").on("click", function(){
		$("html").removeClass("noscroll");
	})
	
	//scrollAC("section");

	//수직선
	$("section .container").append("<div class='line_group'></div>");
	for(var i=1;i<8;i++){		
		$(".line_group").append("<span class='line line" + i + "'></span>");
	}

  	//비주얼슬라이드 콘트롤
	$('.visual_section .item_list').on('init', function (event, slick) {
		$(this).after('<div class="control"> <button class="control_pause active"><i class="ri-pause-line"></i><span class="sr-only">정지</span></button><button class="control_play"><i class="ri-play-line"></i><span class="sr-only">시작</span></button></div>');
	})	
	//문학큐레이션 콘트롤
	$('.section1 .item_list').on('init', function (event, slick) {
		$(this).next(".slick-controls").append('<div class="slick-progress"><div class="progress"></div></div><div class="slick-counter"><span class="current">1</span> <i></i> <span class="total">'+slick.slideCount+'</span></div><div class="control"> <button class="control_pause active"><i class="ri-pause-line"></i><span class="sr-only">정지</span></button><button class="control_play"><i class="ri-play-line"></i><span class="sr-only">시작</span></button></div>');
	}).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		$(this).next(".slick-controls").find('.current').text(nextSlide + 1);		
	})

	//슬라이드
	$slider = $('.visual_section, .section1, .section3');
	$sliderList = $slider.find('.item_list');	
	$sliderList.slick({
		fade: false,
		autoplay: true,  
		arrows: true,
		focusOnSelect: true,
		slidesToShow: 4, 
		responsive: [
			{
				breakpoint: 1440,
				settings: {
				  slidesToShow: 2
				}
			},
			{
			  breakpoint: 768,
			  settings: {
				slidesToShow: 1
			  }
			}
		]		
	}).on('afterChange', function (event, slick, currentSlide, nextSlide) {	
		setTimeout( function() {
			$(this).find(".slick-slide").each(function(){ 
				if( $(this).hasClass('slick-active') ){
					$(this).removeAttr("aria-hidden tabindex");
				}
			});	
		},200);
	})
	
	
	//슬라이드 정지
	$slider.on("click", ".control_pause", function () {
		$(this).removeClass(AC).siblings("button").addClass(AC).parents(".container").find(".item_list").slick("slickPause")
		if($(this).parents("section").hasClass("section1")) isPause = true; //section1일때 progress 멈춤
	})
	//슬라이드 시작
	$slider.on("click", ".control_play", function () {
		$(this).removeClass(AC).siblings("button").addClass(AC).parents(".container").find(".item_list").slick("slickPlay")
		if($(this).parents("section").hasClass("section1")) { //section1일때 progress 시작
			isPause = false;
			startProgressbar();
		}
	})

	//슬라이드 이전,다음버튼 클릭시 슬라이드정지
	$slider.on("click", ".slick-prev, .slick-next", function () {
		$(this).parents("section").find(".control_pause").trigger("click");		
	})


	//visual 배경이미지 변화 - 맨앞의 current slide의 img값으로 배경이미지 변화
	$visual = $(".visual_section");
	$visual.append("<div class='bg_img'></div>");
	$visual.find('.item_list').on('afterChange', function (event, slick, currentSlide, nextSlide) {
		$bgImg = $(this).find(".slick-current img").attr("src");
		$visual.find('.bg_img').css("background-image", "url(" + $bgImg + ")")
	})

	//section1 문학큐레이션 progress bar
	var time = 1;
	var $bar,
		$section,
		isPause,
		tick,
		percentTime;
	
	$section = $('.section1');
	$bar = $('.slick-progress .progress');
	function startProgressbar() {
		resetProgressbar();
		percentTime = 0;
		isPause = false;
		tick = setInterval(interval, 20);
	}	
	function interval() {
		if(isPause === false) {
			percentTime += 1 / (time+0.1);
			$bar.css({width: percentTime+"%"});
			if(percentTime >= 100){
				$section.find(".item_list").slick('slickNext');
				startProgressbar();
			}
		}
	}
	function resetProgressbar() {
		$bar.css({ width: 0+'%'});
		clearTimeout(tick);
	}	
	startProgressbar();
	

	//glteen
	/* $glteen = $(".section3");
	$glteen.find('.item_list').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		console.log(currentSlide, nextSlide)
		//$(this).prev().addClass("prev");
	}) */


	

});









































