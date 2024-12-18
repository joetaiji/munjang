
$(function () {	
	//비주얼 배경
	const $visual = $(".view_section .title_area");

	//첨부파일			
	let $fileBox = $(".input-file");
	$.each($fileBox, function(idx){
		let $this = $fileBox.eq(idx),
			$btnUpload = $this.find('[type="file"]'),
			$label = $this.find('.file-label');
		
		$btnUpload.on('change', function() {
			let fileName = $(this).val(),
				$fileText = $(this).siblings('.file-name');
			$fileText.val(fileName);
		})        
		$btnUpload.on('focusin focusout', function(e) {
			e.type == 'focusin' ?
			$label.addClass('file-focus') : $label.removeClass('file-focus');
		})    
	})			
	//배경이미지 선택 레이어 토글
	$(".btn_bgimg").on("click", function(){				
		$(".bg_img").toggleClass("active").siblings(".bg_color").removeClass("active");
	});
	//배경컬러 선택 레이어 토글
	$(".btn_bgcolor").on("click", function(){
		$(".bg_color").toggleClass("active").siblings(".bg_img").removeClass("active");
	});
	//레이어 닫기
	$(".deco_layout .btn_close").on("click", function(){
		$(this).parents(".deco_layout").removeClass("active");
	});			
	//배경색, 글씨색 바꾸기
	$("input[type='color']").on("change", function () {				
		const colorVal = $(this).val();
		if($(this).attr("id")=="bgColor"){
			$visual.css("background",colorVal);
		}else{
			$visual.css("color",colorVal);
		}
		$(this).prev().val(colorVal);
	});
	//샘플이미지 선택
	$(".img_list input[type='radio']").on("change", function () {				
		const chkVal = $(this).val();
		$visual.css("background","url(../main/img/sub/sample_img"+chkVal+".jpg) 50% 50%/cover no-repeat");
	});
	//샘플칼라셋 선택
	$(".color_list input[type='radio']").on("change", function () {	
		const styleBg = $(this).next().css("background-color"),
			styleColor = $(this).next().css("color");
		$visual.css({'background':styleBg, 'color':styleColor});	
		$("#bgColor").val(rgb2hex(styleBg)).prev().val(rgb2hex(styleBg));				
		$("#textColor2").val(rgb2hex(styleColor)).prev().val(rgb2hex(styleColor));
	});				
	//rgb를 hex코드로 변환
	function rgb2hex(rgb) {
		if (  rgb.search("rgb") == -1 ) {
			return rgb;
		} else {
			rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
			function hex(x) {
				return ("0" + parseInt(x).toString(16)).slice(-2);
			}
			return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
		}
	}
});