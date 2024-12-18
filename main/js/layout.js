

$(function () { 

	cssVars({
		include: 'link[rel="stylesheet"],style',
		onlyLegacy: true,
		preserveStatic: true
	});


	//사이트맵 수직선
	$(".gnb2").append("<div class='line_group'></div>");
	for(var i=1;i<8;i++){		
		$(".gnb2 .line_group").append("<span class='line line" + i + "'></span>");
	}

	listOpen(".my_layer_open");	

	layerPopup("[data-id^='sch_layer']") 	//통합검색 열고 닫기

	gnb();	//gnb메뉴	


	listOpen(".side_left_util .btn_more");	//왼쪽사이드 퀵메뉴
	mobile() ? $(".side_left_util").removeClass(AC) : $(".side_left_util").addClass(AC);
	
	listOpen(".sns_wrap .btn_sns"); //SNS열기 

	$(".btn_contrast").on("click", function(){
		$("html").toggleClass("dark-theme");
	});	


	listOpen(".family_site .link_title", 1)		//푸터 관련사이트
	
	accordion(".faq a")

	layerPopup("[data-id^='modal_']") //레이어팝업

	goTop(); //페이지 맨위로


	/*  페이지 스크롤 circle progress bar------------------------------------------------------------- */
	var $circ = $(".animated-circle");
	var $progCount = $(".progress-count");
	var wh = $(window).height();
	var h = $("body").height();
	var sHeight = h - wh;

	$(window).on("load scroll", function () {
		var perc = Math.max(0, Math.min(1, $(window).scrollTop() / sHeight));
		updateProgress(perc);
	}).on("resize", function () {
		setSizes();
		$(window).trigger("scroll");
		//console.log(h, "-", wh);
	});

	function updateProgress(perc) {
		var circle_offset = 275 * perc;
		$circ.css({
			"stroke-dashoffset": 275 - circle_offset
		});
		$progCount.html(Math.round(perc * 100) + "%");
	}

	function setSizes() {
		wh = $(window).height();
		h = $("body").height();
		sHeight = h - wh;
		//console.log("sHeight=", sHeight);
	}

	

})


