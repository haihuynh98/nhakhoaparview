const swiperWrapper=document.querySelector('.swiper-wrapper');

// Khởi tạo Swiper
const swiper=new Swiper('.swiper',{
	slidesPerView: 1,
	centeredSlides: true,
	spaceBetween: 0,
	loop: true,
	autoplay: {
		delay: 5000,
		disableOnInteraction: false,
	},
	autoplay: false,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {
		768: {
			slidesPerView: 1,
			centeredSlides: false,
			spaceBetween: 0,
		},
		1024: {
			slidesPerView: 3,
			centeredSlides: true,
			spaceBetween: 30,
		}
	}
});