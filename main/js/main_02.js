
//채널 메인
const channel = new Swiper(".section_channel .swiper, .section_etc_wrap .swiper", {
	slidesPerView: 1,
	navigation : true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	loop: true,
	pagination: {
		el: '.swiper-pagination',
		type: 'custom',
		renderCustom: function (swiper, current, total){
			return current + ' <i></i>' + total;
		}
	}
});
