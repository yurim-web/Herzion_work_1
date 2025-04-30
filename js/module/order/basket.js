$(function(){
    // 상품리스트 전체선택
    $('#product_select_all').on('click', function() {
        var _status = $(this).data('status');

        $('[id^="basket_chk_id_"]').each(function(){
            var bChecked = $(this).is(":checked");

            if (_status == 'off') {
                if (bChecked === false) $(this).prop('checked', true);
            } else {
                $(this).prop('checked', false);
            }
        });

        $(this).data('status', _status == 'off' ? 'on' : 'off');
        fixedLayerPriceSet();
    });

    // 고정영역에 상품정보 세팅
    var fixedLayerPriceSet = function() {
        var iSumPrice = 0;
        var iCheckPrdCnt = 0;
        $('[id^="basket_chk_id_"]').each(function(){
            if ($(this).prop('checked') == true) {
                var sCheckId = $(this).attr('id');
                var aTemp = sCheckId.split('_');
                var iCheckId = aTemp[3];
                var iQuantity = $('#quantity_id_'+iCheckId).val();
                var iProductPrice = aBasketProductData[iCheckId].product_sum_price * iQuantity;
                iSumPrice = iSumPrice + iProductPrice;
                iCheckPrdCnt = iCheckPrdCnt + 1;
            }
        });
        if (iCheckPrdCnt > 0) {
            var sTotalPrice = SHOP_PRICE_FORMAT.toShopPrice(iSumPrice);
            $('#checked_order_count').html('<strong>' + sprintf(__('%s'),iCheckPrdCnt) + '</strong>' +'개 상품선택').css('padding-bottom','5px');
            $('#checked_order_price').html('결제예정금액 <strong><em><span id="checked_total_order_price">'+sTotalPrice+'</span></em></strong>').css('padding-bottom','5px');

            var sPriceRef = SHOP_PRICE_FORMAT.shopPriceToSubPrice(iSumPrice);
            if (sPriceRef != '') $('#checked_order_price').find('strong').append(sPriceRef);
        } else {
            fixLayerPriceRest();
        }
    };

    // 고정영역 상품합계초기화
    var fixLayerPriceRest = function() {
        $('#checked_order_count, #checked_order_price').html('').css('padding-bottom','0');
    };

    fixLayerPriceRest();

    // 장바구니 체크박스 체크시 상품총합계, 체크한 숫자 구하기
    $('[id^="basket_chk_id_"]').on('click', function(e) {
        fixedLayerPriceSet();
    });
});

// 장바구니 선택상품 삭제
function selBasketDel(id) {
    $('[id^="'+BASKET_CHK_ID_PREFIX+'"]').prop('checked', false);
    $('[id="'+id+'"]').prop('checked', true);
    Basket.deleteBasket();
}

//pc 일때 cart-total 스크롤시 오른쪽 고정 스크립트
function handleScrollEvent() {        
    var cartEl = document.querySelector('.cart-container .cart-total');
    if(cartEl){
        var marginNum = 54;

        if (window.innerWidth >= 1024) {
            var scrollPosition = (window.scrollY-marginNum);
            var divElement = document.querySelector('.xans-order-basketpackage');

            if(divElement){
                var divY = divElement.getBoundingClientRect().top;                
                var divHeight = (divElement.offsetHeight-marginNum);
                var cul = Math.ceil((scrollPosition+divY)-marginNum);
                
                if(scrollPosition > cul){
                    if(divHeight > scrollPosition){
                        cartEl.style.top = (scrollPosition-cul)+'px';
                    }else {
                        cartEl.style.top = (divHeight-cul)+'px';
                    }
                }else{
                    cartEl.style.top = '';
                }
            }
        }else{
            cartEl.style.top = '';
        }
    }
}

handleScrollEvent();

window.addEventListener('scroll', handleScrollEvent);
window.addEventListener('resize', handleScrollEvent);