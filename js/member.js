$(document).ready(function () {

    //비밀번호 보기
    $(".btn_pw_view").on("click", function(){
        $(this).toggleClass(AC);
        if($(this).prev('input').attr("type") == "password"){
            $(this).prev('input').attr("type","text");
            $(this).find(".sr-only").text("비밀번호 숨기기");
        }else{
            $(this).prev('input').attr("type","password");
            $(this).find(".sr-only").text("비밀번호 보기");
        }
    });
    
    /*
    // 탭메뉴
    $(".tabs .tab_nav").on("click", function () {
        tabs(this, ".tab_cont")
    })

    //아코디언
    $(".btn_view").on("click", function(){
        active(this, "accordion")
        var $txt = $(this).find("span").text();
        if($txt == "내용보기") $txt = "내용닫기";
        else $txt = "내용보기";
        $(this).find("span").text($txt);
    })    

     //팝업레이어
    var $wrap = $("#wrap");
    $(".btn_popopen").on("click", function(){
        $(".modal_foot").remove();
        var obj = $(this).data('id');
        $obj = $("."+obj);
        $obj.fadeIn();
        $wrap.addClass("dimm");
        // if($obj.height() % 2 != 0){
        //     $obj.css("height",""+ ($obj.height()+1) +"px");
        // }
    })
    $(".modal_close, .btn_cancel").on("click", function(){
        $(".modal-popup-wrap").fadeOut();
    }) 

    // footer
    $(".relate_site .title").on("click", function () {
        active(this, "toggle", 1)
    })
    */


})

$(document).on("click", ".modal_close, .btn_cancel", function (){
    $(".modal-popup-wrap").fadeOut();
});

$(document).on("click", ".btn_confirm", function (){
    $("#member_id").val($(".btn_confirm").parent().parent().children().find("strong").text());
    $(".modal_foot").remove();
    $(".modal-popup-wrap").fadeOut();
});

$(document).on("click", ".btn_confirm2", function (){
    $("#member_nick").val($(".btn_confirm2").parent().parent().children().find("strong").text());
    $(".modal_foot").remove();
    $(".modal-popup-wrap").fadeOut();
});
