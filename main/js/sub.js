$(function() {

	//로딩시 시간차
	setTimeout(function() {
		$(".side_left_util").addClass("start");
	}, 100);

	/* ========================= 서브 헤더 ========================= */

	if ($header.length) fix(".header", 1); // 스크롤시 헤더 fix;

	//스크롤시 fix된 헤더의 로고부분을 해당콘텐츠 타이틀로 변경
	$logo = $(".logo");
	$logoOrg = $logo.html();
	$etcInfo = $(".title_area .etc_info").clone();
	$(".gnb1").append($etcInfo)
			  .prepend("<button onclick='history.back()' class='btn_back'><i class='ri-arrow-left-line'></i></button>");

	//progress bar 생성
	$("body").append("<div class='progress-container'><div class='progress-bar' id='progressBar'></div></div>");

	//페이지 스크롤
	$(window).on("scroll", function() {
		if ($header.hasClass(FX)) {
			$(".title_area .title_h1").length ? $logo.html($(".title_area .title_h1").text()) : $logo.html($logoOrg);
		} else {
			$logo.html($logoOrg)
		}

		progressBarScroll();//페이지 progress bar
	});

	/* ========================= 서브 비주얼 ========================= */
	//breadcrumbs color
	$cvColor = $(".custom_visual").css("color");
	if (!$(".main").hasClass("my_munjang")) $(".breadcrumbs, .breadcrumbs span").css("color", $cvColor);

	//비주얼영역에 배경이미지가 있는 경우
	$customVisual = $(".custom_visual")
	if ($customVisual.css("background-image") != "none") {
		$customVisual.addClass("dimm");
	}

	//비주얼 텍스트 애니메이션
	$visual = $('.visual');
	if($visual.length){
		//리스트
		$visual.find(".txt1").letterfx({"fx":"fall","words":false,"timing":120,"fx_duration":"1000ms","letter_end":"stay","element_end":"stay"});
		setTimeout(function(){
			$visual.find(".txt2").letterfx({"fx":"fall","words":false,"timing":120,"fx_duration":"1000ms","letter_end":"stay","element_end":"stay"});
		}, 500);
		//콘텐츠
		$visual.find(".font span").letterfx({"fx":"fade","words":false,"timing":120,"fx_duration":"1000ms","letter_end":"stay","element_end":"stay"});
	}


	/* ========================= 서브 snb 메뉴 ========================= */

	if($(".snb_section").length) snb();

	if ($(".snb .depth2 li a.active").offset() != undefined) {
		var snbDepthActive = $(".snb .depth2 li a.active").offset().left - 10;
		console.log(snbDepthActive);
		$(".snb").scrollLeft(snbDepthActive);
	}

	

	/* ========================= 사이드 퀵메뉴 ========================= */
	$detailArea = $(".detail_area, .cont_section, .db_view_cont .cover_area");
	$detailCont = $(".detail_cont");

	$detailCont ? $detailCont = $(".detail_cont") : $detailCont = $detailArea;

	$editArea = $("[data-id='editable']");
	const fontSize = parseFloat($detailCont.css("font-size"));
	$detailCont.find("*").each(function(index, item) {
		item.fontValue = parseFloat($(item).css('font-size'));
	});



	//본문보기설정
	$viewSet = $("#modal_view_setting");
	$bg = $(".page_color .item_list input[type='radio']"); //배경컬러
	$ff = $(".font_family"); //글꼴선택
	$ta = $(".font_align .item_list input[type='radio']"); // 정렬
	$fz = $(".font_size input[type='range']"); //글자크기
	$lh = $(".line_height input[type='range']"); //줄간격
	$pt = $(".page_type input[type='radio']"); //페이지 형태

	//배경컬러
	$bg.on("change", function() {
		const styleBg = $(this).next().css("background-color"),
			styleColor = $(this).next().css("color");
		$detailArea.css({ 'background': styleBg, 'color': styleColor });
		$detailArea.find('p,span').each((_,val) => {
			$(val).css({ 'background': styleBg, 'color': styleColor });
		});
	});

	//글꼴선택
	$ff.on("change", function() {
		const selFont = $(this).val();
		$editArea.css({ 'font-family': selFont });
	});

	//정렬
	$ta.on("change", function() {
		const styleAlign = $(this).val();
		$editArea.css({ 'text-align': styleAlign });
	});


	/* function fontChangeVar(value, min, max){
		var range = max - min;
		var progressW = (value-min)/range*100 +'%';
		$('.rangeField').css('--progressW', progressW);
	} */

	//글자크기
	let zoomVar;
	$fz.on("change", function() {
		zoomVar = parseFloat($(this).val());
		chgFontSize = fontSize + zoomVar;
		$detailCont.css({ 'font-size': fontSize + zoomVar + 'px' });
		$detailArea.css({ 'font-size': fontSize + zoomVar + 'px' });
		$detailCont.find("*").each(function(index, item) {
			const zoomFont = item.fontValue + zoomVar;
			$(this).css({ 'font-size': zoomFont + 'px' });
		})

		$(this).prev().text(chgFontSize);
		//fontChangeVar(rangeField.value,rangeField.min, rangeField.max);
		//output.value=parseInt(fontSize.value)

		$detailArea.find('p,span,b').each((_,val) => {
			$(val).css({ 'font-size': fontSize + zoomVar + 'px' });
		});
	});
	//fontChangeVar(rangeField.value,rangeField.min, rangeField.max);


	//줄간격
	$lh.on("change", function() {
		const styleLineHeight = $(this).val() / 10 + 1.5;
		$editArea.css({ 'line-height': styleLineHeight });
		$(this).prev().text(styleLineHeight);
	});

	const pageEvent = () => {
		if (!$editArea.hasClass('slick-slider') && $pageType == "2") {
			// 일단 높이 800으로 기본 세팅
			// 추후 바뀔 수 있음.
			let wrapper = $editArea.find('.se-contents');
			if (wrapper.children().length == 0) {
				wrapper = $editArea.find('.page_breaking');
			}

			if (wrapper.children().length > 1) {
				let height = 0;
				let div;
				const arr = [];
				let i = 0;
				wrapper.children().each((_, el) => {
					const element = el.cloneNode(true);
					if (height === 0) {
						div = document.querySelector('.se-contents') ?
							document.querySelector('.se-contents').cloneNode(true) : document.querySelector('.page_breaking').cloneNode(true);
						$(div).html('');
						$(div).append(element);
						height += $(el).outerHeight(true);
					} else if (height < 800) {
						$(div).append(element);
						height += $(el).outerHeight(true);
					}

					if (i == wrapper.children().length - 1 || height > 700) {
						arr.push($(div));
						height = 0;
					}
					i++;
				})
				$editArea.append(...arr);
				wrapper.remove();
			}

			$editArea.one('init', function(event, slick) {
				console.log(event, slick);
				$("input[name=StartWidthScroll]").attr("value", 1);
				$("input[name=EndWidthScroll]").attr("value", slick.slideCount);
				$(this).append('<div class="slick-counter"><span class="current">1</span> <i>/</i> <span class="total">' + slick.slideCount + '</span></div>');
			}).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
				$(this).find('.current').text(nextSlide + 1);
				if (typeof fn_slick_custom_event == "function") fn_slick_custom_event(event, slick, currentSlide, nextSlide);
			}).slick({
				fade: true,
				autoplay: false,
				arrows: true,
				dots: false,
				draggable: false,
				infinite: false
			})

			$("html,body").stop().animate({ scrollTop: $(".view_cont").offset().top - 73 }, 800)
		} else if ($pageType == "1") {
			if ($editArea.hasClass('slick-slider')) {
				$editArea.slick("unslick");
			}
			$(".slick-counter").remove();
		}
	}

	//페이지 형태
	let $pageType;
	$pt.on("change", function() {
		$pageType = $(this).val();
		pageEvent();
	});
	$(".page_group").on("click", ".slick-arrow", function() {
		$("html,body").stop().animate({ scrollTop: $(".view_cont").offset().top - 73 }, 800)
	});

	//초기화
	$viewSet
		.find(".btn_reset").on("click", function() {
			// 로컬스토리지 정보 삭제
			window.localStorage.removeItem("saveViewSet");

			$bg.filter("#pageColor1").prop("checked", true).trigger("change");
			$ff.val("Pretendard");
			$ta.filter("#textAlign1").prop("checked", true);
			$fz.val(0).trigger("change");
			$lh.val(5).trigger("change");
			$pt.filter("#pageType1").prop("checked", true).trigger("change");
			$detailArea.add($editArea).removeAttr("style");
		}).end()
		.find(".btn_save").on("click", function() { //설정하기
			// 설정하기 선택 시 localsotrage에 해당 정보 저장
			window.localStorage.removeItem("saveViewSet");
			let saveViewSet = {
				"pageColorVal" : $bg.filter(":checked").val()
				, "fontFamilyVal" : $ff.val()
				, "textAlignVal" : $ta.filter(":checked").val()
				, "fontSizeVal" : $fz.val()
				, "lineHeightVal" : $lh.val()
				, "pageTypeVal" : $pt.filter(":checked").val()
			};
			window.localStorage.setItem("saveViewSet",JSON.stringify(saveViewSet));

			$(this).parents(".opened-layer").fadeOut();
			pageEvent();
		})

	//글담기
	$(".btn_bookmark").on("click", function() {
		$(this).toggleClass(AC);
	});

	//한단계 폰트키우기
	$("body").on("click", ".btn_fontsize", function() {
		$(this).toggleClass(AC);
		$(this).hasClass(AC) ? $fz.val(4).trigger("change") : $fz.val(0).trigger("change");
		/* const sizeVal = $(this).hasClass(AC) ? 4 : -4;
		$detailArea.find("*").each(function(){
			const zoomFont = parseFloat($(this).css("font-size"));
			$(this).css({'font-size' : zoomFont  + sizeVal + 'px'});
		}) */
	})






	//형광펜
	//TODO : 영역이 태그의 중간에 걸쳐서 선택된 경우 경고메세지 띄우기
	$detailCont.prepend("<button class='highlighter' data-id='modal_highlighter'>형광펜 저장<i class='ri-mark-pen-line ml10'></i></button>");
	let range;
	const $highlighter = $(".highlighter");

	$editArea.on("mouseup", function() {
		range = window.getSelection().getRangeAt(0);
		const selection = range.getBoundingClientRect();
		const position = {
			left: selection.left - (document.body.clientWidth - $editArea.width()) / 2,
			top: selection.top + window.pageYOffset - $editArea.offset().top + 60//detail_cont의 padding-top값
		};
		if (range.toString().length) {
			$highlighter.fadeIn().css({ 'left': position.left + 'px', 'top': position.top + 'px' })
		} else {
			$highlighter.fadeOut();
		}
	});
	$highlighter.on("click", function() {
		$(this).fadeOut();
		$("[data-id='highlighter_title']").text(range.toString());	//형광펜 타이틀
	});

	$("#modal_highlighter .btn_save").on("click", function() {
		const mark = document.createElement('mark');
		try {
			range.surroundContents(mark);
		} catch {
			const title = $("[data-id='highlighter_title']").text(range.toString());	//형광펜 타이틀
			const { startContainer, endContainer, startOffset, endOffset } = range;

			$(startContainer).parent().attr('data-id', 'startContainer').attr('data-index', startOffset);
			$(endContainer).parent().attr('data-id', 'endContainer').attr('data-index', endOffset);
			let flag = false;
			let isSpan = false;
			$('.page_group p').each((index, value) => {
				let tag = $(value);
				if (!tag.attr('data-id')) {
					tag = $(value).find('span');
					isSpan = true;
				}

				if (tag.attr('data-id')) {
					const id = tag.attr('data-id');
					let val = '';
					if (id === 'startContainer') {
						flag = true;

						if (startOffset !== 0) {
							val += $(value).text().substring(0, startOffset);
						}
						val += `<mark>${$(value).text().substring(startOffset, $(value).text().length)}</mark>`;
					}

					if (id === 'endContainer') {
						flag = false;
						const length = $(value).text().length;
						val += `<mark>${$(value).text().substring(0, endOffset)}</mark>`;
						if (endOffset < length) {
							val += $(value).text().substring(endOffset, length);
						}
					}

					if (isSpan) {
						const span = document.createElement('span');
						const style = $(value).find('span')[0].style.cssText;
						span.style.cssText = style;
						span.innerHTML = val;
						tag.html(span.outerHTML);
					} else {
						tag.html(val);
					}

				} else if (flag) {
					if (isSpan) {
						const span = document.createElement('span');
						const style = $(value).find('span')[0].style.cssText;
						span.style.cssText = style;
						span.innerHTML = `<mark>${tag.text()}</mark>`;
						tag.html(span.outerHTML);
					} else {
						tag.html(`<mark>${tag.text()}</mark>`);
					}
				}
			})
		}
		$(this).parents(".opened-layer").fadeOut();
	})
	//형광펜 삭제
	$(".detail_cont").on("click", "mark", function() {
		$(this).contents().unwrap();
	})


	//과월호 보기
	$("#modal_back_magazine .btn_view").on("click", function() {
		$(this).parents(".magazine_list").hide().siblings(".magazine_index").show();
	})
	$("#modal_back_magazine .btn_list").on("click", function() {
		$(this).parents(".magazine_index").hide().siblings(".magazine_list").show();
	})


	/* ========================= 리스트 ========================= */
	//상세검색 월별보기
	listOpen(".month_popup", "toggle");
	$bdList = $(".board_list");

	//리스트 목록형태 바꾸기 (썸네일, 갤러리)
	$(".list_type button").on("click", function() {
		$(this).addClass(AC).siblings().removeClass(AC)
		if ($(this).hasClass("list_row")) {
			$bdList.addClass("thumb_list").removeClass("book_list");
		} else {
			$bdList.addClass("book_list").removeClass("thumb_list");
		}
	})

	//서브메인, book 리스트 이미지 없을때 글자 5글자 컷팅
	function listTitle() {
		$(".webzine_list, .book_list, .thumb_list").find(".item").each(function() {
			if (!$(this).find("img").length) {
				let txtStr = $(this).find(".title").text().substr(0, 6);
				$(this).find(".thumb").html("<span class='noimg'>" + txtStr + "</span>");
			}
		});
	}
	listTitle();
	$(".section_glteen_list .category_wrap button").on("click", function() {
		setTimeout(function() { listTitle(); }, 200);
	})

	//월장원 선정
	let varNum;
	$(".btn_best").each(function() {
		$(this).on("click", function(e) {
			varNum = $(this).data("num")
		})
	});
	$(".btn_yes").on("click", function() {
		//$("[data-num='"+varNum+"'").addClass(AC);
		$(".modal-popup-wrap").removeClass("opened-layer")
		$(".modal-popup-wrap").css('display', 'none');
	});
	$(".btn_cancel").on("click", function() {
		$("[data-num='" + varNum + "'").removeClass(AC);
	});


	/* ========================= 상세보기 ========================= */
	$(".view_cont .detail_area .detail_cont p:empty").remove();

	//cont_visual에서 3차뎁스가 있는 경우
	if($(".cont_visual").siblings(".contents").find(".depth3").length) {
		$(".main").addClass("is_depth3");
	}

	//추천콘텐츠 - 썸네일이 있는 경우
	$(".relate_area .cont").each(function() {
		if ($(this).find(".book").length) {
			$(this).parents(".item").addClass("is_thumb");
		}
	})

	//파일업로드
	fileLoad(".input-file");

	/* slide - 자동일때 */
	$autoSlider = $('.alarm');
	$autoSliderList = $autoSlider.find('.item_list');
	$autoSliderList.on('init', function(event, slick) {
		$(this).append('<div class="slick-controls"><div class="slick-counter"><span class="current">1</span> <i>/</i> <span class="total">' + slick.slideCount + '</span></div><div class="control"> <button class="control_pause active"><i class="ri-pause-line"></i><span class="sr-only">정지</span></button><button class="control_play"><i class="ri-play-line"></i><span class="sr-only">시작</span></button></div></div>');
	}).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		$(this).find('.current').text(nextSlide + 1);
	})
	$autoSlider.on("click", ".control_pause", function() {
		$(this).removeClass(AC).siblings("button").addClass(AC)
		$(this).parents(".item_list").slick("slickPause")
	})
	$autoSlider.on("click", ".control_play", function() {
		$(this).removeClass(AC).siblings("button").addClass(AC)
		$(this).parents(".item_list").slick("slickPlay")
	})
	$autoSliderList.slick({
		fade: false,
		vertical: true,
		autoplay: true,
		arrows: true,
		dots: false
	})

	/* slide 자동이 아닐때 */
	$slider = $('.book_list, .db_list, .cover_img, .popular_keyword, .recommand_keyword, .calendar-list');
	//book_list : 문학db 상세/나의문장메인>큐레이션탭-좋아할만한 작품
	//db_list : 나의문장메인>큐레이션탭-좋아하는 작가
	//cover_img : 문학db 작가상세
	//calendar-list : 년도탭
	$sliderList = $slider.find('.item_list');
	$sliderList.each(function(){
		if($(this).find(".list_li").length>2 || $(this).find(".item").length>2){
			$(this).on('init', function (event, slick) {
				$(this).append('<div class="slick-counter"><span class="current">1</span> <i>/</i> <span class="total">'+slick.slideCount+'</span></div>');
			}).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
				$(this).find('.current').text(nextSlide + 1);
			}).slick({
				fade: true,
				autoplay: false,
				arrows: true,
				dots:false
			})
		}
	});

	/* 관련콘텐츠 - 모바일에서만 슬라이드 */
	$relateCont = $(".relate_area .row")
	$relateCont.slick({
		mobileFirst: true,
		fade: false,
		autoplay: false,
		arrows: false,
		dots:false,
		responsive: [
			{
			  breakpoint: 768,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			},
			 {

				breakpoint: 991,
				settings: "unslick"
			}
		]
	})
	//접근성추가
	$relateCont.find(".col-sm-4").each(function(){
		$(this).removeAttr("aria-hidden tabindex");
	});
	//관련콘텐츠
	/* .on('init', function (event, slick) {
		$(this).find(".col-sm-4, .item").attr("tabindex","0");
	})

*/
	/* $(window).on("resize", function () {
		$sect02Slider.slick("resize")
	}).on("load", function () {
		$(".section02 .item_wrap .item").attr("tabindex","0")
	}) */

	tabs(".tab_wrap .tabs>li>button", ".tab_cont") //멘토댓글 탭


	//글작성시 유의사항, 신고하기 열기
	$(".tip .btn_open, .etc .btn_open").each(function() {
		listOpen(this, 1)
	})


	//별점표현
	$(".star_score").each(function() {
		$starScore = $(this).find('span').data('rating');
		$(this).find('i').each(function(idx) {
			if (idx < $starScore) $(this).addClass("active")
		})
	})

	lineOmit(".comment_area .cmt_list .text", 72); //댓글 줄생략

	$(".tabs>li>a, .tabs>li>button").on("click", function() {
		lineOmit(".comment_area .cmt_list .text", 72); //댓글 줄생략
	})



	/* ========================= 웹진 ========================= */

	/* ========================= Ch.문장 ========================= */
	const $mov = $(".youtube_frame"),
		$sideR = $(".side_right_util");
	if ($mov.length) {
		const movBottom = parseInt($mov.offset().top + $mov.height());
		$mov.append("<button class='mov_layer_close'><i class='ri-close-fill'></i><span class='sr-only'>동영상닫기</span></button>");
		$(window).on("scroll", function() {
			let scrollT = $(window).scrollTop()
			if (!$mov.hasClass(FX) && !$mov.hasClass(AC) && scrollT > movBottom) {
				$mov.addClass(FX)
				//$sideR.addClass("up")
				$mov.before("<div class='youtube_frame_blank'></div>")
			} else if (scrollT <= movBottom) {
				$mov.removeClass(FX)
				$('.youtube_frame_blank').remove();
				//$sideR.removeClass("up")
			}
			//console.log(scrollT, movBottom);
		})
	}
	$mov.find(".mov_layer_close").on("click", function() {
		$(this).parent().removeClass(FX).addClass(AC);
		$('.youtube_frame_blank').remove();
		//$sideR.removeClass("up")
	})
	if($(".other_mov").length) $(".mov_box").addClass("mov_thumb");


	/* ========================= DB ========================= */
	//상세보기에서 db타이틀만 두께가 medium이라 공통으로 쓰는 타이틀영역에 클래스 추가
	if($(".db_view_cont").length) $(".title_area .title_h1").addClass("db_title");

	//DB검색
	listOpen(".option_open");
	$(".option_group").find("input").on("focus", function() {
		const selVal = $(this).next().text();
		$(".option_open").text(selVal);
		$(this).parents(".select_wrap").removeClass(AC);
	})

	//DB카테고리
	$(".db_wrap .snb .is-depth3>a").on("click", function() {
		active(this);
		$(".depth3 .title").text($(this).text());
	})
	$(".db_wrap .snb .depth3 .btn_close").on("click", function() {
		$(".is-depth3").removeClass(AC);
		//$(".depth3 .title").text($(this).text());
	})

	//DB 리스트
	$(".board_list .item, .db_list .item").on("click, focus", function() {
		active(this);
	})

	/* ========================= 문학사업 ========================= */
	$bizEng = $('.arco_img .eng');
	if($bizEng.length){
		$bizEng.letterfx({"fx":"fade","words":false,"timing":120,"fx_duration":"1000ms","letter_end":"stay","element_end":"stay"});
		setTimeout(function(){
			$('.arco_img .title').fadeIn();
		},1000);
	}

	/* ========================= 문장소개 ========================= */
	/* history */
	scrollAC(".history_list .item");
	$(window).on("scroll", function () {
		if($(window).scrollTop() == 0){
			$(".history_list .item").eq(0).addClass(AC).siblings().removeClass(AC);
		}
	});



	/* ========================= 게시판 ========================= */
	//faq
	accordion(".list_faq a", 1)

	//모바일일때 게시판 우측 상단 sort
	$(".board_sort .active").on("click", function(e) {
		if (mobile()) {
			$(this).parent().toggleClass(AC)
			e.preventDefault();
		}
	})



	/* ========================= 나의문장 ========================= */

	$(".btn_like").each(function() {
		let varText = !$(this).hasClass(AC) ? " 비활성" : " 활성"
		$(this).attr("title", "좋아요" + varText)
			.on("click", function(e) {
				varText = $(this).hasClass(AC) ? " 비활성" : " 활성"
				$(this).toggleClass(AC).attr("title", "좋아요" + varText)
			})
	});
	$(".btn_follow").each(function() {
		let varHtml = !$(this).hasClass(AC) ? "<i class='ri-add-line'></i><span>팔로우</span>" : "<i class='ri-check-line'></i><span>팔로잉</span>"
		$(this).html(varHtml)
			.on("click", function(e) {
				let target = e.target;
				if (target.dataset['limit'] == "Y") {
					return false;
				} else {
					varHtml = $(this).hasClass(AC) ? "<i class='ri-add-line'></i><span>팔로우</span>" : "<i class='ri-check-line'></i><span>팔로잉</span>"
					$(this).toggleClass(AC).html(varHtml)
				}
			})
	});

	tabs(".curation_set_wrap .tabs>li>button", ".dash_board", "slide") //나의 문장 큐레이션 설정 탭


	//나의문장 큐레이션 해시태그 탭
	$(".tab_category button").on("click", function() {
		$(this).attr("title", "선택된 탭메뉴").addClass(AC)
			.siblings().removeClass(AC).attr("title", "비활성 탭메뉴")
		$("#" + $(this).data('id')).show().siblings().hide()
		event.preventDefault()
	})

	//큐레이션 셋팅
	if ($(".curation_set_wrap").length) {
		const curation = new Swiper(".curation_set_wrap .dash_board .swiper", {
			slidesPerView: 5,
			slidesPerColumn: 4,
			//slidesPerGroup : 4,
			spaceBetween: 20,
			navigation: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			loop: false,
			pagination: {
				el: '.swiper-pagination',
				type: 'custom',
				renderCustom: function(swiper, current, total) {
					return current + ' <i>/</i>' + total;
				}
			},
			breakpoints: {
				768: {
					slidesPerView: 2
				  }
			}
		});
	}


	//알림
	const $btnChk = $(".post_btn").find(".btn_check"),
		$btnAll = $(".btn_all_read");
	$btnAll.on("click", function() {
		$(this).hasClass(AC) ? $btnChk.prop("checked", false) : $btnChk.prop("checked", true);
		$(this).toggleClass(AC);
	})
	$btnChk.on("click", function() {
		if ($(this).prop("checked") == false) {
			$btnAll.removeClass(AC);
		}
	})
	//알림설정
	const $setBtnChk = $(".notify_set .post_btn").find(".btn_check"),
		$btnAllYes = $(".btn_all_notify_yes"),
		$btnAllNo = $(".btn_all_notify_no");
	$btnAllYes.on("click", function() {
		$setBtnChk.prop("checked", true).change();
		try {
			selectionSave();
		} catch (e) {
			console.log(e);
		}
		$(this).addClass(AC);
	})
	$btnAllNo.on("click", function() {
		$setBtnChk.prop("checked", false).change();
		try {
			selectionSave();
		} catch (e) {
			console.log(e);
		}
		$btnAllYes.removeClass(AC);
	})
	$setBtnChk.on("click", function() {
		if ($(this).prop("checked") == false) {
			$btnAll.removeClass(AC);
		}
	})
	//월장원선정
	$(".btn_best").on("click", function() {
		$(this).toggleClass(AC);
	})


	/* ========================= 통합검색 ========================= */
	$(".btn_info").on("click", function() {
		$(this).toggleClass(AC);
	})

	/* 약관동의 모두읽음 처리
	$(".control-all-check").on("click", function(){
		if($(this).is(":checked")){
			$(".control-check").prop("checked", true);
			$(".btn-wrap .btn").removeAttr("disabled");
		}else{
			$(".control-check").prop("checked", false);
			$(".btn-wrap .btn").attr("disabled", "disabled");
		}
	})
	$(".control-check").on("click", function(){
		var checkVal1 =  $("#checkbox_agg1").prop("checked");
		var checkVal2 =  $("#checkbox_agg2").prop("checked");
		var checkVal3 =  $("#checkbox_agg3").prop("checked");
		if( checkVal1 == true && checkVal2 == true && checkVal3 == true){
			$(".control-all-check").prop("checked", true);
			$(".btn-wrap .btn").removeAttr("disabled");
		}else{
			$(".control-all-check").prop("checked", false);
			$(".btn-wrap .btn").attr("disabled", "disabled");
		}
	})	 */



})










