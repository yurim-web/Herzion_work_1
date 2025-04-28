//window popup script
function winPop(url) {
    window.open(url, "popup", "width=300,height=300,left=10,top=10,resizable=no,scrollbars=no");
}
/**
 * document.location.href split
 * return array Param
 */
function getQueryString(sKey)
{
    var sQueryString = document.location.search.substring(1);
    var aParam       = {};

    if (sQueryString) {
        var aFields = sQueryString.split("&");
        var aField  = [];
        for(var i=0; i<aFields.length; i++){
            aField = aFields[i].split('=');
            aParam[aField[0]] = aField[1];            
        }
    }

    aParam.page = aParam.page ? aParam.page : 1;
    return sKey ? aParam[sKey] : aParam;
};

/**
  *  구매버튼
*/
var globalBuyBtnScrollFunc = function() {
    // 구매버튼 관련변수
    var sFixId = $('#orderFixItem').length > 0  ? 'orderFixItem' : 'fixedActionButton',
        $area = $('#orderFixArea'),
        $item = $('#' + sFixId + '').not($area);

    $(window).scroll(function(){
        try {
             // 구매버튼 관련변수
            var iCurrentHeightPos = $(this).scrollTop() + $(this).height(),
                iButtonHeightPos = $item.offset().top;

            if (iCurrentHeightPos > iButtonHeightPos || iButtonHeightPos < $(this).scrollTop() + $item.height()) {
                if (iButtonHeightPos < $(this).scrollTop() - $item.height()) {
                    $area.fadeIn('fast');
                } else {
                    $area.hide();
                }
            } else {
                $area.fadeIn('fast');
            }
        } catch(e) { }
    });
};

$(function(){
    // tab
    $.eTab = function(ul) {
        $(ul).find('a').on('click', function() {
            var _li = $(this).parent('li').addClass('selected').siblings().removeClass('selected'),
                _target = $(this).attr('href'),
                _siblings = '.' + $(_target).attr('class');
            $(_target).show().siblings(_siblings).hide();
            return false
        });
    }
    if ( window.call_eTab ) {
        call_eTab();
    };
    globalBuyBtnScrollFunc();
});