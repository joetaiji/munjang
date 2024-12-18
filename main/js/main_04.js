
const btnPause = ".swiper-button-pause",
	  btnPlay = ".swiper-button-play";

//문학사업 메인
setInterval(function(){
	$(".visual_title span:first").animate( {marginTop: '-8rem'}, 500, function(){
		$(this).detach().appendTo('.visual_title').removeAttr('style');
	});	
},4000);


const bizVisual = new Swiper(".section_biz .swiper", {
	slidesPerView: 3,
	navigation : true,	
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	autoplay:  true,
	pagination: {
		el: '.swiper-pagination',
		type: 'fraction'
	},
	loop: true,
	centeredSlides: true,
	spaceBetween: 290,
	breakpoints: {
		1440: {
			slidesPerView: 1
		  }
	}
});

const $biz = $(".section_biz");
$biz.find(btnPause).on("click", function(){
	$(this).removeClass(AC).siblings().addClass(AC)
	bizVisual.autoplay.stop();	
});
$biz.find(btnPlay).on("click", function(){
	$(this).removeClass(AC).siblings().addClass(AC)
	bizVisual.autoplay.start();
});
$biz.on('mouseover', function(){
	bizVisual.autoplay.stop();
}).on('mouseout', function(){
	bizVisual.autoplay.start();
});






