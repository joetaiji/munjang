const AC = "active",
    FX = "fixed"    

/*  mobile ------------------------------------------------------------------------------ */
function mobile() {
    return window.innerWidth < 1024 ? 1 : 0 //ipad pro는 넓어서 web화면이 나오게
}

/*  header, top FIXED ----------------------------------------------------------------------------

*   top만 고정                   fix()
*   top과 header 고정            fix(".header")

----------------------------------------------------------------------------------------- */
function fix(elem) {
    $(window).on("scroll", function () {
        let scrollT = $(window).scrollTop()
        if (scrollT > $header.offset().top) $(elem).addClass(FX)
        else if (scrollT == 0) $(elem).removeClass(FX)
        //scrollT > $footer.offset().top - $(window).height() ? $goTop.addClass("stick") : $goTop.removeClass("stick")
    })
    $goTop.add("#skipNav a").on("click", function () {
        $("html,body").stop().animate({
            scrollTop: 0
        }, 800)
    })
}


/*  ACTIVE --------------------------------------------------------------------------

*   addClass와 close버튼으로 닫기                  active(this, "active")
*   toggle  
    - toggle시킬 객체가 바로 위 부모인 경우           active(this, "toggle")
    - toggle시킬 객체가 바로 위 부모가 아닌 경우       active(this, "toggle", 1, ".toggle시킬 클래스명")
    - 링크영역외 클릭을 사용하지 않으려면              active(this, "toggle", 0)  
*   accordion                                       active(this, "accordion")

----------------------------------------------------------------------------------------- */

function clickAC(elem){
    $(elem).on("click", function(){
		$(this).addClass(AC).siblings().removeClass(AC)
	});
    
}
function active(elem, toggle, anyClick, target) {
    let $elem = $(elem)  
    let $elemTarget = target ? $elem.parents(target) : $elem.parent()
    if (toggle == "toggle") { //토글형태
        $elemTarget.toggleClass(AC)
        let txt = $elemTarget.hasClass(AC) ? " 닫기" : " 열기"
        $elem.attr("title", "" + $elem.text() + txt + "")   
    } else if (toggle == "accordion") {       
        anyClick = 0 
        $elemTarget.toggleClass(AC).siblings().removeClass(AC)   
        let txt = $elemTarget.hasClass(AC) ? "확장됨" : "축소됨"
        $elem.attr("title", "" + txt + "").parent().siblings().children("a").attr("title", "축소됨")
    } else { //addClass
        $elemTarget.addClass(AC).siblings().removeClass(AC)
        $elemTarget.find(".close").on("click", function () {
            $elemTarget.removeClass(AC)
            $elem.attr("title", "" + $elem.text() + " 열기")
        })
    }
    //링크영역외 클릭
    if (anyClick) { 
        $("body").on("click", function (e) {   
            if(!$(e.target).hasClass(AC)){  
            $elemTarget.removeClass(AC)
            $elem.attr("title", "" + $elem.text() + " 열기")
            }
        })
    }
    event.stopPropagation()
    event.preventDefault()    
}  
   
/*  GNB -----------------------------------------------------------------------------------

*    서브메뉴 전체 다 펼쳐짐     gnb(1)

----------------------------------------------------------------------------------------- */
function gnb(full) {
    const FLM = "fullmenu",
        ALL = "allmenu",
        $topM = $(".topmenu")

    if (full) { //전체메뉴        
        $topM.addClass(FLM)
        $topM.on("mouseenter focusin", function () {
            if (!$wrap.hasClass(ALL)) $header.add($depth1).addClass(AC)
        }).on("mouseleave", function () {
            if (!$wrap.hasClass(ALL)) $header.add($depth1).removeClass(AC)
        })
        $depth1.on("mouseenter focusin", function () {
            $(this).addClass("on")
        }).on("mouseleave focusout", function () {
            $(this).removeClass("on")
        })
    } else { //기본gnb
        $depth1.on("mouseenter focusin", function () {
            if (!$wrap.hasClass(ALL)) {
                $header.addClass(AC)
                $(this).addClass(AC).siblings().removeClass(AC)
            }
        }).on("mouseleave", function () {
            if (!$wrap.hasClass(ALL)) {
                if (!$schLayer.hasClass(AC)) $header.removeClass(AC)
                $(this).removeClass(AC)
            }
        })
    }
    //모바일 & 접근성 탭포커스로 메뉴영역을 벗어났을때
    $topM.find(".depth1>a").on("click keydown", function (e) {
        if (mobile()) {
            active(this, "toggle")            
            $topM.addClass(AC)
        }
        if (e.keyCode == 9 && e.shiftKey) $header.add($depth1).removeClass(AC)
    }).next().find("a:last").on("keydown", function (e) {
        if (e.keyCode == 9) $header.add($depth1).removeClass(AC)
    })  
    //3차뎁스를 갖고있는 상위요소에 클래스부여
    $(".depth3").each(function () {
        $(this).parent().addClass("is-depth3")
    })
    $header.on("click", ".is-depth3>a", function () {
        if (mobile()) active(this, "toggle")
    })
    

    //전체메뉴 및 모바일에서 메뉴열기
    var $clickPoint;
    var $footSns = $(".footer .sns_list").clone(); 
    var $footCopyr = $(".footer .copyright").clone();
    var $sitemapFooter = $("<div class='sitemap_footer'></div>")
    
    $(".btn_allmenu").on("click", function () {
        $wrap.addClass(ALL)
        $topM.attr("tabindex", 0).focus()
        $clickPoint = $(this)
        if (full) $topM.removeClass(FLM)
        $header.addClass(AC)
        if (mobile()) {            
            $depth1.eq(liNum).addClass(AC)
        }   
        $sitemapFooter.append($footSns);
        $sitemapFooter.append($footCopyr);
        $('.allmenu .topmenu').after($sitemapFooter);
		if($(".event_head_pop")) $("body").addClass("not_event")
		$("html").addClass("noscroll");
		$("html,body").stop().animate({scrollTop: 0}, 0)
		$schLayer.removeClass(AC);
    })
    //전체메뉴와 모바일에서 메뉴창닫기
    $(".nav .pop_close").click(function () {
        $wrap.removeClass(ALL)
        $depth1.removeClass(AC)
        $topM.removeClass(AC)
        $clickPoint.focus();
        if (full) $topM.addClass(FLM)
        $header.removeClass(AC)
        $(".header .sitemap_footer").remove();
		$("body").removeClass("not_event")
		$("html").removeClass("noscroll");
    })

    //모바일에서 active 찾아서 활성화
    /* var liNum = "0" //모바일에서 전체메뉴눌렀을때 첫번째 메뉴가 펼쳐져있게 */
    var liNum //펼쳐져 있지 않게
    $depth1.each(function () {
        if ($(this).children("a").hasClass(AC)) liNum = $(this).index(), false
    })

}

/*  TAB Navigation ------------------------------------------------------------------------

*    tab메뉴에 콘텐츠가 포함된 경우         tabs(this)
*    tab메뉴와 콘텐츠가 분리된 경우         tabs(this, 1)

----------------------------------------------------------------------------------------- */
function tabs(elem, cont) {
    $(elem).attr('title', '선택된 탭메뉴').parent().addClass(AC)
        .siblings().removeClass(AC).children().attr('title', '비활성 탭메뉴')
    if (cont) {
        $(elem.hash).show().siblings(cont).hide()
        event.preventDefault()
    }
}

/*  scroll Active, tab FIXED --------------------------------------------------------------

*   스크롤에 따라 콘텐츠 활성화                          scrollAC(".main .section")
*   스크롤에 따라 콘텐츠 활성화, 탭메뉴 고정 및 활성화     scrollAC(".tab_cont", ".depth4.scroll")

----------------------------------------------------------------------------------------- */
function scrollAC(cont, tab) {
    let $cont = $(cont), $tab = $(tab), 
        tabTop, contTop, headH, tabH, scrollT
    if($cont.length){    
        if (tab) tabTop = $tab.offset().top //탭메뉴 top 
        $(window).on("scroll", function () {
            headH = $header.height()
            tabH = $tab.outerHeight(true)
            //scrollTop     
            if ($header.hasClass(FX)) scrollT = $(window).scrollTop() + headH
            else scrollT = $(window).scrollTop()
            //탭메뉴 fixed
            if (tabTop < scrollT) $tab.addClass(FX)
            else $tab.removeClass(FX)
            //콘텐츠 및 탭메뉴 active
            $cont.each(function (i) {
                contTop = $(this)[0].getBoundingClientRect().top +  $(window).height()/2
                //콘텐츠 active
                if (contTop < $(window).height()) $(this).addClass(AC).siblings().removeClass(AC)
                //탭메뉴 active
                if ($header.hasClass(FX)) docT = headH + tabH
                else docT = tabH
                if (contTop <= docT + 10) {
                    $tab.find("li").eq(i).children().attr('title', '선택된 탭메뉴').parent().addClass(AC)
                    .siblings().children().attr('title', '비활성 탭메뉴').parent().removeClass(AC)
                }
            })            
        })
    }

    //탭메뉴 활성화
    $tab.find("li>a").on("click", function (e) {
        if ($header.hasClass(FX)) scrollT = headH + tabH
        else scrollT = tabH
        $("html,body").stop().animate({
            scrollTop: $(this.hash).offset().top - scrollT
        }, 800)
        e.preventDefault()
    })
}

