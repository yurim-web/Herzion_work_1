$(function(){
    $(document).on('click', '.ec-base-tooltip .close', function() {
        $(this).parent().hide();
        $(this).parent().parent().find('span.arrow').hide();
        return false;
    });
});