$(document).ready(function () {
    $wrap = $("#wrap"),
    $header = $(".header"),
    $depth1 = $(".topmenu .depth1"),
    $schLayer = $(".sch_layer"),
    $goTop = $(".go_top"),
    $footer = $(".footer")

    //header fixed
    fix(".header, .event_foot_pop")
    $("#skipNav a").on("click", function(){        
      $("html,body").stop().animate({
          scrollTop: 0
      }, 800)
    })
    
    //gnb
    gnb()

    // site_area
    $(".site_area_mobile .title").on("click", function () {
        active(this, "toggle", 1)
    })
	// 블루닷    
    $(".bluedot").on("click",function(){
        $(this).parent().addClass("active");
        $(this).next().addClass("show");
    });
	$(".layer_bluedot .btn_close").on("click",function(){
		$(".bluedot_wrap").removeClass("active");
        $(".layer_bluedot").removeClass("show");
    });

    //search
    $(".btn_sch_open").on("click", function () {
        $schLayer.add($header).addClass(AC)
		setTimeout(function(){ $schLayer.find("input").focus(); }, 300);
        $wrap.removeClass("allmenu")
        $(".header .sitemap_footer").remove();
    })
    $(".btn_sch_close").on("click", function () {
        $schLayer.add($header).removeClass(AC)
    })

    
	$(".acctoggle_fontsize, .fontsize_btn").click(function(){
		$("html").toggleClass("acc_fontsize");
	});

	//sns
    $(".sns_btn").on("click", function () {
        active(this, "toggle", 1)
    })   
    // 탭메뉴 	
	/* $(".tabs li").each(function(){
		if($(this).hasClass(AC)){ $(this).find("a").attr("title", "활성탭메뉴"); }
	}); */
    $(".tab_nav").on("click", function () {
        tabs(this, ".tab_cont")
    })
	//내용 많은 테이블
	$(".responsive").each(function(){
		$(this).before("<p class='horizontal_scroll mobile'><i class='xi-arrow-left'></i><i class='xi-touch'></i><i class='xi-arrow-right'></i><span class='txt'>좌, 우로 이동 가능합니다.</span></p>");
	})

    //아코디언    
    $(".accordion>li>a").on("click", function(){
        active(this, "accordion") 
    })  
	//팝업레이어
    var $clickSpot;
    $(".btn_popopen").on("click", function(){
        var obj = $(this).data('id');

		$obj = $("."+obj);
        $wrap.addClass("dimm");
		$obj.attr("tabindex", 0).fadeIn().focus();
		$clickSpot = $(this);
        // if($obj.height() % 2 != 0){
        //     $obj.css("height",""+ ($obj.height()+1) +"px");
        // }
    })
    $(".modal_close, .btn_cancel").on("click", function(){
        $(".modal_popup_wrap").fadeOut();
		$clickSpot.focus();
    })

	

    // footer
    $(".relate_site .title").on("click", function () {
        active(this, "toggle", 1)
    })
   

    // 탭갯수를 구해 클래스 부여(반응형)
    var tabLi = $(".content .depth4 li")
    tabLi.each(function () {
        $(this).parent().addClass("num" + tabLi.length + "")
    })
    var tabDepthLi = $(".content .depth5 li")
    tabDepthLi.each(function () {
        $(this).parent().addClass("num" + tabDepthLi.length + "")
    })

    // web accessibility
    $("[class*='xi-']").attr("aria-hidden", "true")
    $("a[target='_blank']").attr("title", "새창으로 열림")


    $('#btnSch').click(function(e) {
        e.preventDefault();
        var query = $('#query').val();

        location.href = "/totalSearch?query=" + query;

    });
});

function urlToClip(){
    var url = '';
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    url = window.document.location.href;
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("URL이 복사되었습니다.");
    return false;
}