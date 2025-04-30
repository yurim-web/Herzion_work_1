/**
 * 카테고리 리스트 상품 정렬
 */
var aUrl = location.href.split('?');
var sQueryString = aUrl[1];
var orgHeaderHeight = 0;
var selAdd = 0;
var maxTime = 5;

/**
 * 파라미터가 있을경우에만 처리
 */
$(function(){
    if (sQueryString && sQueryString.indexOf('sort_method') > -1) {
        for (var i=0; i<$('#selArray option').length; i++) {
            if ($('#selArray option').eq(i).val().indexOf(sQueryString) > -1) {
                $('#selArray option').eq(i).prop("selected", true);

                orgHeaderHeight = $('#header').outerHeight(true);
                fixedClassCheck();
            }
        }
    }
});

$('#selArray').on('change', function() {
    if ($('#selArray').val()) {
        location.href=$('#selArray').val();
    }
});

function goThumg(url) {
    location.href = url+'?'+sQueryString;
}

function fixedClassCheck(){
    var fixedBol = $('#header').hasClass('fixed');
    if(!fixedBol){
        if(selAdd < maxTime){ setTimeout(fixedClassCheck,100); }
        selAdd++;
    }else{
        var fixedHeader = $('#header').find('.navigation').outerHeight(true),
            scrollValue = $(document).scrollTop(),
            scrollTop = scrollValue - (orgHeaderHeight+fixedHeader);

        if(scrollTop > 0){ $(document).scrollTop(scrollTop); }
    }
}


/* 210820 서정환 */
jQuery(document).ready(function() {
	/* 추천상품 상품순위 */
	jQuery('.xans-product-listrecommend ul .thumbnail .badge').each(function(index) {
		jQuery(this).append('BEST');
		jQuery("span", this).append('0'+(index+1));
	});

	/* 신상품 상품순위 */
	jQuery('.xans-product-listnew ul .thumbnail .badge').each(function(index) {
		jQuery(this).append('NEW');
		jQuery("span", this).append('0'+(index+1));
	});

	/* 상품분류 자동스크롤 출력 */
    var product_scroll = jQuery('.xans-product-normalpackage').hasClass('product_scroll');
	if ( jQuery('.xans-product-listnormal').hasClass('ec-base-product') == true )  { // 리스트에 상품이 없다면
		if(!product_scroll){ // product_scroll 클래스가 없다면
		} else {
			jQuery('.xans-product-normalpackage .more').hide();
			jQuery('.xans-product-normalpackage .more').css('height','0px');
			jQuery('.xans-product-normalpackage .more').css('visibility','hidden');
			var product_stopping = false;
			var product_end = false;
			jQuery(window).scroll(function () {
				var product_cst = jQuery(window).scrollTop();
				var product_csb = product_cst + jQuery(window).height();
				var product_hooker = jQuery('.xans-product-listmore').offset().top;
				if(product_hooker <= product_csb) {
					if(product_stopping === true || product_end === true) return false;
					jQuery('.more .btnMore').trigger('click'); // 더보기 클릭
					product_stopping = true;
				} else {
					product_stopping = false;
				}
			});
		}
	}
});
