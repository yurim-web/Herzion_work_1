var aCategory = [];
$(function(){
    var methods = {
        aCategory    : [],
        aSubCategory : {},
        get: function() {
             $.ajax({
                url : '/exec/front/Product/SubCategory',
                dataType: 'json',
                success: function(aData) {
                    if (aData == null || aData == 'undefined') {
                        methods.checkSub();
                        return;
                    }
                    for (var i=0; i<aData.length; i++)
                    {
                        var sParentCateNo = aData[i].parent_cate_no;
                        var sCateNo = aData[i].cate_no;
                        if (!methods.aSubCategory[sParentCateNo]) {
                            methods.aSubCategory[sParentCateNo] = [];
                        }
                        if (!aCategory[sCateNo]) {
                            aCategory[sCateNo] = [];
                        }
                        methods.aSubCategory[sParentCateNo].push( aData[i] );
                        aCategory[sCateNo] = aData[i];
                    }
                    methods.checkSub();
                }
            });
        },
        getParam: function(sUrl, sKey) {
            if (typeof sUrl !== 'string') return;
            var aUrl         = sUrl.split('?');
            var sQueryString = aUrl[1];
            var aParam       = {};
            if (sQueryString) {
                var aFields = sQueryString.split("&");
                var aField  = [];
                for (var i=0; i<aFields.length; i++) {
                    aField = aFields[i].split('=');
                    aParam[aField[0]] = aField[1];
                }
            }
            return sKey ? aParam[sKey] : aParam;
        },

        show: function(overNode, iCateNo) {
             var oParentNode = overNode;
            var aHtml = [];
            var sMyCateList = localStorage.getItem("myCateList");
            if (methods.aSubCategory[iCateNo] != undefined) {
                aHtml.push('<ul class="slideSubMenu">');
                $(methods.aSubCategory[iCateNo]).each(function() {
                    var sNextParentNo = this.cate_no;
                    var sCateSelected = (checkInArray(sMyCateList, this.cate_no) == true) ? ' selected' : '';
                    if (methods.aSubCategory[sNextParentNo] == undefined) {
                        aHtml.push('<li class="noChild" id="cate'+this.cate_no+'">');
                        var sHref = '/product/list.html'+this.param;
                    } else {
                        aHtml.push('<li id="cate'+this.cate_no+'">');
                        var sHref = '#none';
                    }
                    aHtml.push('<a href="/product/list.html'+this.param+'" class="view" cate="'+this.param+'" data-i18n="LIST.PRD_CATE_NO_'+this.cate_no+'" data-i18n-new>'+this.name+'</a>');
                    if (methods.aSubCategory[sNextParentNo] != undefined)  aHtml.push('<a href="'+sHref+'"'+this.param+'" onclick="subMenuEvent(this);" class="cate">상품보기</a>');

                    if (methods.aSubCategory[sNextParentNo] != undefined) {
                        aHtml.push('<ul>');
                        $(methods.aSubCategory[sNextParentNo]).each(function() {
                            var sNextParentNo2 = this.cate_no;
                            var sCateSelected = (checkInArray(sMyCateList, this.cate_no) == true) ? ' selected' : '';
                            if (methods.aSubCategory[sNextParentNo2] == undefined) {
                                aHtml.push('<li class="noChild" id="cate'+this.cate_no+'">');
                                var sHref = '/product/list.html'+this.param;
                            } else {
                                aHtml.push('<li id="cate'+this.cate_no+'">');
                                var sHref = '#none';
                            }
                            aHtml.push('<a href="/product/list.html'+this.param+'" class="view" cate="'+this.param+'" data-i18n="LIST.PRD_CATE_NO_'+this.cate_no+'" data-i18n-new>'+this.name+'</a>');
                            if (methods.aSubCategory[sNextParentNo] != undefined)  aHtml.push('<a href="'+sHref+'"'+this.param+'" onclick="subMenuEvent(this);" class="cate">상품보기</a>');

                            if (methods.aSubCategory[sNextParentNo2] != undefined) {
                                aHtml.push('<ul>');

                                $(methods.aSubCategory[sNextParentNo2]).each(function() {
                                    aHtml.push('<li class="noChild" id="cate'+this.cate_no+'">');
                                    var sCateSelected = (checkInArray(sMyCateList, this.cate_no) == true) ? ' selected' : '';
                                    aHtml.push('<a href="/product/list.html'+this.param+'" class="view" cate="'+this.param+'" onclick="subMenuEvent(this);" data-i18n="LIST.PRD_CATE_NO_'+this.cate_no+'" data-i18n-new>'+this.name+'</a>');
                                    aHtml.push('</li>');
                                });
                                aHtml.push('</ul>');
                            }
                            aHtml.push('</li>');
                        });
                        aHtml.push('</ul>');
                    }
                    aHtml.push('</li>');
                });
                aHtml.push('</ul>');
            }
            $(oParentNode).append(aHtml.join(''));
            if (window.i18nextCafe24) {
            	i18nextCafe24.translate('data-i18n-new');
            }
        },
        close: function() {
            $('.slideSubMenu').remove();
        },
        checkSub: function() {
            $('.cate').each(function(){
                var sParam = $(this).attr('cate');
                if (!sParam) return;
                var iCateNo = Number(methods.getParam(sParam, 'cate_no'));
                var result = methods.aSubCategory[iCateNo];
                if (result == undefined) {
                    if ($(this).closest('#slideProjectList').length) {
                        var sHref = '/product/project.html'+sParam;
                    } else {
                        var sHref = '/product/list.html'+sParam;
                    }

                    $(this).attr('href', sHref);
                    $(this).parent().attr('class', 'noChild');
                }
            });
        }
    };

    methods.get();

    $('#slideCateList li > a.cate').on('click', function(e) {
        var sParam = $(this).attr('cate');
        if (!sParam) return;
        var iCateNo = Number(methods.getParam(sParam, 'cate_no'));
        var hasClass =  $(this).parent().hasClass('selected');

        //if ($(this).parent().attr('class') == 'xans-record- selected') {
        if(hasClass) {
            methods.close();
        } else {
            if (!iCateNo) return;
            $('#aside #slideCateList li').removeClass('selected');
            methods.close();
            methods.show(this.parentNode, iCateNo);
        }
    });

	/* 모바일 슬라이드바 카테고리 중분류체크 */
	jQuery('#slide_add_category li').each(function(){
		if( jQuery(this).children('ul').length == 0 ){
			jQuery(this).addClass('noChild');
		} else {
			jQuery(this).append('<a href="#none" class="cate">상품보기</a>');
		}
    });

	/* 모바일 슬라이드바 카테고리 */
    $('#aside ul a.cate').on('click', function(e){
		$(this).parent().find('li').removeClass('selected');
		$('#slideCateList .categoryList li').removeClass('selected');
		$(this).parent().toggleClass('selected');
		if (!$(this).parent('li').hasClass('noChild')){
			e.preventDefault();
		}
    });

	/* 슬라이드 탭 */
	jQuery("#slide_category").click(function() {
		jQuery(this).addClass("open").siblings().removeClass("open");
		jQuery(".navigation-menu__category").show();
		jQuery(".tab_community").hide();
	});
	jQuery("#slide_community").click(function() {
		jQuery(this).addClass("open").siblings().removeClass("open");
		jQuery(".tab_community").show();
		jQuery(".navigation-menu__category").hide();
	});

    $('#slideCateList h2').on('click', function() {
        var oParentId = $(this).parent().attr('id');
        if (oParentId == 'slideCateList' || oParentId == 'slideMultishopList' || oParentId == 'slideProjectList') {
            ($(this).attr('class') == 'selected') ? $(this).next().hide() : $(this).next().show();
        }
        $(this).toggleClass('selected');
    });

    $('#slideProjectList .icoCategory').on('click', function() {
        var target = $(this).parents('#slideProjectList');
        if(target.find('.categoryList').css("display") == "none"){
            target.find('.categoryList').show();
        }else{
            target.find('.categoryList').hide();
        }

        $(this).parents('.title').toggleClass('selected');
    });

});
function subMenuEvent(obj) {
    $(obj).parent().find('li').removeClass('selected');
    $(obj).parent().toggleClass('selected');
}

function checkInArray(sBookmarkList, iCateNo) {
    if (sBookmarkList == null) return false;
    var aBookmarkList = sBookmarkList.split("|");
    for (var i = 0; i < aBookmarkList.length; i++) {
        if (aBookmarkList[i] == iCateNo) {
            return true;
        }
    }
    return false;
}