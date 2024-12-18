
//수직선
$("section").append("<div class='line_group'></div>");
for(var i=1;i<4;i++){		
	$(".line_group").append("<span class='line line" + i + "'></span>");
}


//소설, 아르코 슬라이드
const webzine = new Swiper(".section_novel .swiper, .section_arco .swiper",  {
	slidesPerView: 4,
	scrollbar: {
		el: ".swiper-scrollbar",
		hide: true,
		dragSize: "100%"
	},
	breakpoints: {
		768: {
			slidesPerView: 1
		  }
	}
});

//시, 기획 슬라이드
const webzine2 = new Swiper(".section_plan .swiper, .section_poem .swiper", {
	slidesPerView: 3,
	navigation : true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {
		768: {
			slidesPerView: 1
		  }
	}
});



