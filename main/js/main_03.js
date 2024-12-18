const btnPause = ".swiper-button-pause",
	  btnPlay = ".swiper-button-play";

//글틴 메인
const glteenVisual = new Swiper(".section_glteen .swiper", {
	slidesPerView: 1,
	navigation : true,	
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	autoplay: true,
	loop: true,
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets'
	}
});
const $secGlteen = $(".section_glteen");
$secGlteen.find(btnPause).on("click", function(){
	$(this).removeClass(AC).siblings().addClass(AC)
	glteenVisual.autoplay.stop();	
});
$secGlteen.find(btnPlay).on("click", function(){
	$(this).removeClass(AC).siblings().addClass(AC)
	glteenVisual.autoplay.start();
});

const glteenNews1 = new Swiper(".glteen_camp .swiper", {
	slidesPerView: 1,
	navigation : true,	
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	autoplay: true,
	direction: 'vertical'
});

const $camp = $(".glteen_camp"),
	  $campList = $camp.find(".item_list");
$camp.find(btnPause).on("click", function(){
	$(this).removeClass(AC).siblings().addClass(AC)
	glteenNews1.autoplay.stop();	
});
$camp.find(btnPlay).on("click", function(){
	$(this).removeClass(AC).siblings().addClass(AC)
	glteenNews1.autoplay.start();
});

$campList.on("mouseover", function(){
	$(this).removeClass(AC).siblings().addClass(AC)
	glteenNews1.autoplay.stop();
}).on("mouseout", function(){
	$(this).removeClass(AC).siblings().addClass(AC)
	glteenNews1.autoplay.start();
});


const glteenNews2 = new Swiper(".glteen_announce .swiper", {
	slidesPerView: 1,
	navigation : true,	
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	autoplay: true,
	direction: 'vertical'
});

const $news = $(".glteen_announce"),
	  $newsList = $news.find(".item_list");
$news.find(btnPause).on("click", function(){
	$(this).removeClass(AC).siblings().addClass(AC)
	glteenNews2.autoplay.stop();	
});
$news.find(btnPlay).on("click", function(){
	$(this).removeClass(AC).siblings().addClass(AC)
	glteenNews2.autoplay.start();
});

$newsList.on("mouseover", function(){
	$(this).removeClass(AC).siblings().addClass(AC)
	glteenNews2.autoplay.stop();
}).on("mouseout", function(){
	$(this).removeClass(AC).siblings().addClass(AC)
	glteenNews2.autoplay.start();
});



