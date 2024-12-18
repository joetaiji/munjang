$(function () { 

	//공지사항
	var listNoticeLi = $(".list_notice .list_ul>li").length;
	if(listNoticeLi>5) {
		$(".list_notice").addClass("five_more");
		$(".list_notice").append("<button type='button' class='list_notice_more'><span>공지 전체보기</span><i class='xi-angle-down'></i></button>");
	}
	$(".list_notice_more").on("click", function(){
		$(this).toggleClass(AC).parent().toggleClass(AC);
		let txt = $(".list_notice").hasClass(AC) ? " 공지 줄여보기" : " 공지 전체보기";        
		$(this).find("span").text(txt);
		//$(".list_notice").toggleClass(AC);
	})
	

    //상세검색 버튼
    $(".board_detail_search .btn_wrap button").on("click", function(){
        $(this).toggleClass("active").siblings().removeClass("active");
    })

	//관련게시물
	$('.relate_list .list_ul').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrow: true
	});  

	//갤러리 뷰
	$('.gallery_slide .slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrow: true,
		dots: true,
		adaptiveHeight: true
	});
	


    //첨부파일 삭제버튼 
    $attArea = $(".attach_area");
    attName = ".attach_name";
	$attArea.on("click", ".attach_close", function(){
		$(this).closest(attName).remove();
        if(!$(attName).is(attName)){
            $(".attach_list").remove();
        }
        
	});

    

    //리스트 sort
    //clickAC(".sort button");    
    
    //댓글
     $(".commentList .btn-recomment").on("click", function(){
        $(this).closest("li").toggleClass("active");
      });

    // //FAQ
	// $(".list_faq>ul>li").eq(0).addClass("active").find(".question").attr("title", "확장됨");
    // $(".list_faq .question").on("click", function(){
    //     active(this, "accordion");
    // });
	
    
    $(".admin_btn").closest(".btns").addClass("justify-content-between");  
   
});

//갤러리 리스트 슬라이드 옵션
var bizSlickOption = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,       
    infinite: true,
    arrows: true, 
    speed: 1000,
    responsive: [
      {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
      }
    ]
}
function bizSlider(obj){
    $(obj).slick(bizSlickOption);    
}

