$(function () {
	//$(".header").addClass("sub_active");

	/* sub_visual title */
	$(".sub_visual .title").text($(".content_section h3.hidden_h1").text());

	/* snb */
	var $lnb = $(".snb");
	$(window).scroll(function() {
		//if($("#content").height() > $lnb.height()){
			var scrollT = Math.floor($(this).scrollTop()),
				gnbHeight = $(".gnb_area").height(), //header fixed되면서 전체콘텐츠높이에서 gnb높이값을 빼줘야 함.
				contStart = $(".snb_content_wrap").offset().top - gnbHeight,
				contEnd = $("#wrap").height()-($(".footer").height() + $lnb.height() + gnbHeight);
			if (contEnd > scrollT ) {
				if(scrollT > contStart){
					$lnb.addClass("stick"); //.css({"top":$(".gnb_area").height()} + 10);
					//if (mobile()) $lnb.addClass("stick").css({"top":$(".gnb_area").height()})
				}else{
					$lnb.removeClass("stick").removeAttr("style");
				}
			}else{
				$lnb.css({"top":contEnd-scrollT});
			}
		//}
	});

	// 왼쪽서브메뉴가 모바일로 변경되는 형태
    $("#snb .depth2>li.active>a").on("click", function(){
        if ($("html").hasClass("acc_fontsize")||mobile()) active(this, "toggle", 1, ".depth2")

    })
    $("#snb .depth3>li.active>a").on("click", function(){
        if ($("html").hasClass("acc_fontsize")||mobile()) active(this, "toggle", 1, ".depth3")
    })
	$(".depth4 .list>li.active>a").on("click", function(){
        if ($("html").hasClass("acc_fontsize")||mobile()) active(this, "toggle", 1, ".depth4")
    })

	var tabs = $(".depth4 .list, .tabs, .link_tabs");
	tabs.each(function(){
		var tabsLiLength = $(this).find("li").length;
		if(tabsLiLength>4) $(this).addClass("four_more");
		if(tabsLiLength==8) $(this).addClass("eight");
		if(tabsLiLength>9){
			$(this).addClass("ten");
		}
	});
	

	//정책제안 댓글
	$(".comment_list").on('click', '.btn_toggle', function(){
		active(this, "toggle", 1);
	})

	/* 정책제안 입력폼 */
	$hr = $(".hash_area");
	$hi = $(".hash_input");
	//해시태그 추가
	$(".hash_add").on("click", function(){
		$iT = $hi.val();
		// text 수 제한
		if($iT.length > 10){
			alert("10자 이상 텍스트를 작성할 수 없습니다.\n다시 작성 해주세요.");
			$hi.val("");
			return false;
		}
		// '#' Text 막기
		if($iT.indexOf("#") > -1){
			alert("'#'은 사용할 수 없습니다.\n다시 작성 해주세요.");
			$hi.val("");
			return false;
		}
		if($iT){
			$hr.append("<button type='button' class='hash_tag'><span class='tag_span'>#"+$iT+"</span><i class='xi-close-circle ml5'></i><span class='sr-only'>파일삭제</span></button>");
			$hi.val("");
		}
	});
	$hi.on("keyup", function(key){
		if(key.keyCode == 13){
            $(".hash_add").trigger("click");
        }
	});
    //해시태그 삭제
    $hr.on("click", "button", function(){
		$(this).remove();
	});

	//사업안내 슬라이드
	$slick = $('.slider');

	$slick.find('.list').slick({
		arrows: false,
		asNavFor: '.slider .list_thumb'
	});
	$slick.find('.list_thumb').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor:'.slider .list',
  		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3
				}
			}
		]
	});

	//대관서비스 슬라이드
	const $simpleSlider = $('.simple_slider')
    $simpleSlider.on('init', function (event, slick) {
        $(this).append('<div class="slick-counter"><span class="current"></span> <i></i> <span class="total"></span></div>');
        $(this).find('.current').text(slick.currentSlide + 1);
        $(this).find('.total').text(slick.slideCount);
    }).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        dots:false
    }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		$(this).find('.current').text(nextSlide + 1);
	})
    $simpleSlider.append("<div class='control'><button class='control_pause active'><i class='xi-pause'></i><span class='sr-only'>정지</span></button><button class='control_play'><i class='xi-play'></i><span class='sr-only'>시작</span></button></div>");
    $(".control button").on("click",function(){
        $(this).removeClass(AC).siblings().addClass(AC);
        if( $(this).hasClass("control_play")){
            $simpleSlider.slick("slickPlay");
        }else{
            $simpleSlider.slick("slickPause");
        }
    });

	//회원정보입력 아코디언
    $(".btn_view").on("click", function(){
        active(this, "accordion")
		var $txt = $(this).find("span").text();
		if($txt == "내용보기") $txt = "내용닫기";
		else $txt = "내용보기";
		$(this).find("span").text($txt);
    })

	/* history */
	scrollAC(".history_list .item");
	$(window).on("scroll", function () {
		if($(window).scrollTop() == 0){
			$(".history_list .item").eq(0).addClass(AC).siblings().removeClass(AC);
		}
	});

	//header fix때문에 named anchor의 위치조정작업
	//인권경영 운영지침, 나의활동내역
	$(".rule_index a, .my_board .in_tabs a").on("click", function(e){
		e.preventDefault();
		$("html,body").stop().animate({
            scrollTop: ($(this.hash).offset().top - 130)
        }, 0)
	})




  /* breaddcrumbs 4차뎁스 펼쳐지게
	$(".breadcrumbs .current").on("click", function(e){
		$(".current_list").fadeToggle(200);
		e.preventDefault();
	});
	*/

});

