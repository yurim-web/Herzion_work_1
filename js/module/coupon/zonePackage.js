$(function(){
    $('.ec-base-tab li a').on('click', function(e){
        $(this).parent().addClass('selected').siblings().removeClass('selected');
    });
});