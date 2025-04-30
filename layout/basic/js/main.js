/** 캠퍼타운_JS 210806 **/
jQuery(document).ready(function() {

	/* 메인 상품 슬라이드 */
	var special_slide = new Swiper('.special_slide', {
		slidesPerView: 'auto',
		spaceBetween: 20,
		observer: true,
		observeParents: true,
		speed:700,
		scrollbar: {
			el: ".swiper-scrollbar",
			hide: false,
			draggable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next-special_slide',
			prevEl: '.swiper-button-prev-special_slide',
		},
        autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		breakpoints: {
			768: {
				slidesPerView: 'auto',
				spaceBetween: 10,
			},
		}
	});

	/* 메인 탭카테고리 */
	jQuery(".main_product_tab li").bind("click", function() {
		jQuery(this).parent().find('li button').removeClass("active");
		jQuery(this).parents('.main_product_category').find('.content_list .tabcontent').removeClass("active");
		jQuery('button', this).addClass("active");
		var activeTab = jQuery('button', this).attr("data-id");
		jQuery(this).parents('.main_product_category').find('.content_list .tabcontent' + '#' + activeTab).addClass("active");
	});
	jQuery('.main_product_category .main_product_inner .main_product_tab li button, .content_list .tabcontent').removeClass('active'); // 나머지 탭 숨김
	jQuery('.main_product_category .main_product_inner .main_product_tab li:first-child button, .content_list .tabcontent:first-child').addClass('active'); // 첫번째 탭 오픈

	/* 메인 텍스트배너 링크 없을시 영역삭제 */
	jQuery(".main_text_link").each(function(){
		var text_none = jQuery('a', this).text();
		if ( text_none == '' ) {
			jQuery(this).hide();
		}
	});

	EZST.register('image-gallery/2', function () {
		return {
			connect: connect,
			change: change,
		};

		/**
		 * 섹션이 추가되는 경우 / 페이지로딩시 검색되는 섹션도 개념상 추가로 간주
		 * @param  {HTMLElement} section 섹션 최상위 요소
		 * @param  {string} type 타입
		 * @returns void
		 */
		function connect(section, type) {
			_reset(section, type);
		}

		/**
		 * 섹션 설정 변경 하위 추가 또는 삭제등의 변경사항이 생긴 경우
		 * @param  {HTMLElement} section 섹션 최상위 요소
		 * @param  {string} type 타입
		 * @returns void
		 */
		function change(section, type) {
			_reset(section, type);
		}

		/**
		 * 각 섹션 최상위 요소(.section)를 기준으로 기능을 재 초기화 합니다.
		 * @param  {HTMLElement} section 섹션 최상위 요소
		 * @param  {string} type 타입
		 * @returns void
		 */
		function _reset(section, type) {
			// 섹션 초기화 처리
			/* 메인 텍스트갤러리배너 노출설정보다 배너가 적을때 중앙정렬 */
			jQuery(section).find(".main_3dan_banner ul")
				.each(function () {
					var grid_num = parseInt(jQuery(section).find("[data-ez-column]").attr('data-ez-column'), 10);	//설정한 노출개수
				  var li_num = parseInt(jQuery(section).attr('data-ez-item-length'), 10); //등록된 아이템 개수

					if (!document.documentElement.classList.contains('ez-view-type-mobile') && grid_num > li_num) {	// 모바일일때
						jQuery(this).css('justify-content', 'center');
						jQuery('li', this).css('flex', '1');
					} else {
						jQuery(this).css('justify-content', '');
						jQuery('li', this).css('flex', '');
					}

					if (grid_num == '4') { // 설정한 노출 개수가 4개일때
						if (li_num >= grid_num) {	// 등록한 아이템 개수가 노출개수보다 많을때
							jQuery(this).addClass("fs_medium");
						}
					}

					if (grid_num == '5') { // 설정한 노출 개수가 5개일때
						if (li_num >= grid_num) {	// 등록한 아이템 개수가 노출개수보다 많을때
							jQuery(this).addClass("fs_small");
						} else if(li_num == '4') {
							jQuery(this).addClass("fs_medium");
						}
					}

					if (li_num < '4') {	// 배너가 4개 미만이면 더보기 버튼 숨김
						jQuery(this).parent('.main_3dan_banner').find('.main_image_text_gallery_more').hide();
					}
					if (li_num == '1') { // 배너가 1장일때
						jQuery('li a picture img', this).css('width', '100%');
						jQuery('li', this).css('width', '100%');
					}
				});
			/* 메인 텍스트갤러리배너 더보기 */
			jQuery(section).find(".main_image_text_gallery_more_btn")
				.on("click", function (event) {
					jQuery(section)
						.find('ul li')
						.show()
						.animate({ opacity: 1 });
					jQuery(this).parent().hide();
				})
		}
	});
});
