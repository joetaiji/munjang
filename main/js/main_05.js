$(function () {
    /* ========================= DB ========================= */
	

	// form submit validation
	$("form[name=archive_sch_form]").submit(function(e){
		if($(this).find("[name='dbSearchWord']").val() == "") {
			alert("검색어를 입력 해 주세요.");
			return false;
		}
	});
	
    //DB검색
    $(".option_group").find("input").on("focus", function(){
        const selVal = $(this).next().text();
        $(".option_open").text(selVal);
        $(this).parents(".select_wrap").removeClass(AC);
    })

    //DB카테고리
    $(".db_wrap .snb .is-depth3>a").on("click", function(){
        fn_selectSubCategories(this);
    })
    $(".db_wrap .snb .depth3 .btn_close").on("click", function(){
        $(".is-depth3").removeClass(AC);
        //$(".depth3 .title").text($(this).text());
    })

    //DB 리스트
    $(".board_list .item, .db_list .item").on("click, focus", function(){
        active(this);
    });
    
});

// 정렬 조건 변경
function fn_changeOrderType(obj) {
	$("[name='viewForm'] [name='dbSearchSortType']").val($(obj).val());
	$("[name='viewForm'] [name='currentPageNo']").val("1");
	$("[name='viewForm']").submit();
}


// 페이지 유닛 변경
function fn_changeViewCnt(obj) {
	$("[name='viewForm'] [name='recordCountPerPage']").val($(obj).val());
	$("[name='viewForm'] [name='currentPageNo']").val("1");
	$("[name='viewForm']").submit();
}

// 화면 페이징
function goPage(page) {
	$("[name='viewForm'] [name='currentPageNo']").val(page);
	$("[name='viewForm']").attr("action","/archive");
	$("[name='viewForm']").submit();
}

// 상세 게시글 화면으로 이동
function goView(key, maincategory) {
	// 메인화면 글 인 경우
	if($("[name='viewForm'] [name='maincategory']").val() == "") {
		$("[name='viewForm'] [name='actionType']").val("main");
	}
	$("[name='viewForm'] [name='data_id']").val(key);
	$("[name='viewForm'] [name='maincategory']").val(maincategory);
	$("[name='viewForm']").attr("action","/archive/view");
	$("[name='viewForm']").submit();
}

// 리스트 화면으로 이동
function goList() {
	// 메인화면 글 에서 조회한 경우
	if($("[name='viewForm'] [name='actionType']").val() == "main") {
		$("[name='viewForm'] [name='maincategory']").val("");
	}
	$("[name='viewForm'] [name='data_id']").val("");
	$("[name='viewForm']").attr("action", $("[name='viewForm'] [name='actionUrl']").val());
	$("[name='viewForm']").submit();
}

// 서브 카테고리 조회
function fn_selectSubCategories(obj) {
	event.stopPropagation();
    event.preventDefault();
    
	var mainId = $(obj).attr("data-id");
	
	$.ajax({
        url: "/archive/subCategories",
        type: "POST",
        data: {
			"maincategory" : mainId
			, "_csrf" : $("meta[name='_csrf']").attr('content')
		},
		success: function (fragment) {
            $("ul[subcategories-id='"+ mainId +"']").html(fragment);
        	$(".depth3 .title").text($(obj).text());
        	active(obj);
        },
        error: function (request, status, error) {
            alert("서브카테고리 조회 중 에러가 발생하였습니다.");
        }
    });
}

// 상세 페이지 e-book 보기
// 기존 문예지아카이브즈 기능을 재사용
function fn_ebookView(url) {
	if(url) {
		var width = screen.width;
		var height = screen.height-100;
		//var url = "https://archive.munjang.or.kr/reader?u="+data_id;
		var popup = window.open(url,'popwin','top='+((screen.availHeight - height)/2 - 40) +', left='+(screen.availWidth - width)/2+', width='+width+', height='+height+', toolbar=0, directories=0, status=0, menubar=0, scrollbars=1, resizable=1');
		if(popup) {
			popup.focus();
		}
	} else {
		alert("등록 된 이북이 없습니다.");
	}
}

// 상세 페이지 book 다운로드
// 기존 문예지아카이브즈 기능을 재사용
function fn_downloadBook(maincategory, data_id) {
	if(confirm("다운로드를 진행하시겠습니까?")) {
		//var url = "https://archive.munjang.or.kr/reader?u="+data_id+"&m=attachment";
		var url = "/archive/fileDownload?maincategory="+maincategory+"&data_id="+data_id;
		const link = document.createElement('a');
	
		link.href = url;
		link.click();
	}
	
}

// 서브카테고리 선택 이동
function fn_goSubCategories(maincategory, subcategory) {
	// 파라메터 셋팅
	$("[name='subcategoryForm'] [name='maincategory']").val(maincategory);
	$("[name='subcategoryForm'] [name='subcategory']").val(subcategory);
	
	$("[name='subcategoryForm']").submit();
}

// 메인카테고리 이동
function fn_goMainCategories(maincategory) {
	$("[name='viewForm'] [name='maincategory']").val(maincategory);
	$("[name='viewForm'] [name='subcategory']").val("");
	$("[name='viewForm'] [name='actionType']").val("more");
	$("[name='viewForm']").attr("action","/archive");
	
	$("[name='viewForm']").submit();
}

// 검색 화면 이동
function fn_goSearch() {
	// 파라메터 셋팅
	$("[name='viewForm']").attr("action","/archive/search");
	$("[name='viewForm']").submit();
}


// 문학DB 좋아요 이벤트
function fn_archiveLike(btn) {
	$.ajax({
        url: "/archive/changeLikeInfo",
        type: "POST",
        data: {
			"like_yn" : $(btn).hasClass("active") ? "N" : "Y"
			, "data_id" : $("form[name='viewForm'] [name='data_id']").val()
			, "maincategory" : $("form[name='viewForm'] [name='maincategory']").val()
			, "menu_type" : "M"
			, "like_type" : "M"
			, "_csrf" : $("meta[name='_csrf']").attr('content')
		},
		success: function (response) {
           if(response && !response.error) {
				if(response.data) {
					$("#contents #archiveViewLikeSpan").text(response.data.likeCnt);
				}
           } else {
				alert(response.message);
           }
        },
        error: function (request, status, error) {
            alert("게시글 좋아요 처리 중 에러가 발생하였습니다.");
        }
    });
}


// 수정요청 팝업 종료
function fn_closeFeedbackPop() {
	$("#modal_feedback").removeAttr("tabindex").fadeOut(100).removeClass("opened-layer");
}

// 해쉬태그 클릭
function fn_hashTagSeach(keyword) {
	$("[name='viewForm'] [name='dbSearchSortType']").val("01");
	$("[name='viewForm'] [name='recordCountPerPage']").val("20");
	$("[name='viewForm'] [name='currentPageNo']").val("1");
	$("[name='viewForm'] [name='dbSearchCondi']").val("04");
	$("[name='viewForm'] [name='dbSearchWord']").val(keyword);
	$("[name='viewForm'] [name='maincategory']").val("");
	$("[name='viewForm'] [name='subcategory']").val("");
	$("[name='viewForm'] [name='data_id']").val("");
	$("[name='viewForm']").attr("action", "/archive/search");
	$("[name='viewForm']").submit();
}


