$(function(){
    if($(".menuCategory > li").length==0){
        $(".ec-base-tab.typeMenu").hide();	//중분류 없으면 영역 숨김 - 정환
    }else {
        $(".menuCategory li").each(function(i){
            var ulElChk = $(this).find('ul').length;
            if(ulElChk == 0){
                $(this).find('.iconWrap').remove();
            }
        });

        var domWidth = $(document).width();
        if(domWidth < 1024){
			if($(".display_tablet_only .menuCategory > li").length==0){
				$(".ec-base-tab.typeMenu").hide();	//Mobile에서 마지막분류 없으면 영역 숨김 - 정환
			}

            $(".menuCategory .iconWrap").on('click', function(e){
                var target = $(this).closest('li');
                var ulEl = returnTarget(target);
                var ulElchk = ulEl.hasClass('active');

                if(ulElchk){
                    var classChk = $(this).closest('ul').hasClass('active');
                    if(!classChk){ heightCheck(ulEl, "out"); }
                    mouseEvent(target, "out");

                    target.find('ul').removeClass('active');
                }else{
                    heightCheck(ulEl, "hover");
                    mouseEvent(target, "hover");
                }
                target.siblings('li').find('ul').removeClass('active');

            });
        }else{
            $(".menuCategory li").hover(function() {
                mouseEvent($(this), "hover");
            }, function(){
                mouseEvent($(this), "out");
            });
        }
    };

    function mouseEvent(_this, str){
        var target = returnTarget(_this);
        str == "hover" ? target.addClass('active') : target.removeClass('active');
    }

    function returnTarget(_this){
        var target = _this.children('ul');
        var ulElChk = target.length;
        if(ulElChk == 0){ target = _this.children('.button').children('ul') }

        return target;
    }

    function heightCheck(ulEl, str){
        if(str == "out"){
            $('.menuCategory.menu').css({"height":""});
        }else{
            var height = ulEl.outerHeight(true);
            var menuHeight = $('.menuCategory .menu li').outerHeight(true);
            var cul = (menuHeight+height)+10;

            $('.menuCategory.menu').css({"height":cul});
        }
    };

});
