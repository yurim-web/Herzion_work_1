$(function(){

    var bCheck1 = $('.xans-member').find('#check_method0');
    var bCheck2 = $('.xans-member').find('#check_method1');

    $(bCheck1).on('click', function() {

        if ($(this).prop('checked') == true) {
            $('.xans-member').find('.ssn_no').show();
            $('.xans-member').find('.email').hide();
        }
    });


    $(bCheck2).on('click', function() {

        if ($(this).prop('checked') == true) {
            $('.xans-member').find('.email').show();
            $('.xans-member').find('.ssn_no').hide();
        }
    });

});