

/*  페이지 include ------------------------------------------------------------- */
function includeLayout(){
	var includeArea = $("[data-include]");
	var self, url;
	$.each(includeArea, function(){
		self = $(this);
		url = self.data("include");
		self.load(url, function(){
			self.removeAttr("data-include");
		});
	});
}
includeLayout(); 


setTimeout(function(){
	$(".lnb" + $(".header").data('id')).find("a").addClass("active");

	const $sideL = $(".side_left_util"), 
		  $sideR = $(".side_right_util")
		  
	if(!$sideL.data('type')){ //리스트
		$sideL.find(".btn_like, .btn_bookmark, .btn_fontsize, .btn_setting").remove();
	}
	
	//else if($sideL.data('type') == "view"){ 
		//상세보기, 콘텐츠
	 //$sideL.find(".btn_setting").remove();
		  //}
	
	if(!$sideR.data('type')) $sideR.find(".btn_back_magazine").remove();
	
	
}, 100)

if(!$(".header").data('type')){ 
	if($(".header").data('id') == 6 || $(".header").data('id') == 8 || $(".header").data('id') == 9){
		//문학DB, 나의문장, 회원은 breadcrumbs 없게
	}else{
		$(".main").prepend("<div class='breadcrumbs container'><a href=''><i class='ri-home-2-line'></i><span class='sr_only'>홈</span></a><i class='ri-arrow-right-s-line'></i>1차뎁스<i class='ri-arrow-right-s-line'></i>2차뎁스<i class='ri-arrow-right-s-line'></i><span>현재페이지</span></div>");
	}
}


/* if($(".header").data('id') == 8){
	$(".contents").prepend("<div class='breadcrumbs container'><a href=''><i class='ri-home-2-line'></i><span class='sr_only'>홈</span></a><i class='ri-arrow-right-s-line'></i>1차뎁스<i class='ri-arrow-right-s-line'></i>2차뎁스<i class='ri-arrow-right-s-line'></i><span>현재페이지</span></div>");
} */


