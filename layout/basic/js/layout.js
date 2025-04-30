window.addEventListener('load', function(){
	//bottomNav();
    //fixedHeader();
    //handleNav();
    //quickGoTop(); 사용안함 210805 서정환 수정
    //searchLayer(); 사용안함 210804 서정환 수정
    //toggleClass('.xans-layout-info.info__customer', '.xans-layout-info.info__customer .toggle', 'selected'); 사용안함 210805 서정환 수정
    //topBanner(); 사용안함 210804 서정환 수정
	//handleScroll();
});

function handleScroll(){
	var scrollPosition = 0;
	var ticking = false;
	var quickMenu = document.querySelector('#quick');
	var scrollY = window.scrollY || window.pageYOffset;
	//setQuickScrollEvent(scrollY, quickMenu); 사용안함 210805 서정환 수정
	window.addEventListener('scroll', function(e) {
        scrollPosition = window.scrollY || window.pageYOffset;
        if (ticking) return;
        window.requestAnimationFrame(function() {
            fixedHeader()
            //setQuickScrollEvent(scrollPosition, quickMenu) 사용안함 210805 서정환 수정
            ticking = false;
        });
        ticking = true;
	});
}

function toggleClass(element, handler, className){
	var _handler = document.querySelector(handler);
	var _element = document.querySelector(element);

    _handler.addEventListener('click', function(){
        if ( _element.classList.contains(className) ) {
            _element.classList.remove( className );
        } else {
            _element.classList.add( className );
        }
    });
}

function fixedHeader() { // 210804 서정환 수정
    var header = document.getElementById("header");
	var fixed_margin = document.getElementById("contents");
	var scrollY = window.pageYOffset || document.documentElement.scrollTop;
	var header_height = document.getElementById("header").scrollHeight+'px';

	if(scrollY > header.offsetTop) {
        header.classList.add("fixed");
		fixed_margin.style.marginTop  = header_height;
    } else {
        header.classList.remove("fixed");
		fixed_margin.style.marginTop  = '0px';
    }
}

function handleNav() {
    var btnNavs = document.querySelectorAll('.eNavFold');
    var btnClose = document.querySelector('#aside .btnClose');
    var dimmed = document.querySelector('#layoutDimmed');
    var elements = document.getElementsByClassName("test");
    btnNavs.forEach( function(btnNav) {
        btnNav.addEventListener('click', function(){
            document.body.classList.add('expand');
        });
    });
    btnClose.addEventListener('click', function(){
        document.body.classList.remove('expand');
    });
    handleDimmed(dimmed, document.body, 'expand');
}


function searchLayer() {
    var btnSearchs = document.querySelectorAll('.eSearch');
    var btnClose = document.querySelector('.xans-layout-searchheader  .btnClose');
    btnSearchs.forEach( function(btnSearch) {
        btnSearch.addEventListener('click', function(){
            document.body.classList.add('searchExpand');
            var input = document.querySelector('#keyword');
            input.focus();
        });
    });
    btnClose.addEventListener('click', function(){
        document.body.classList.remove('searchExpand');
    });
    var dimmed = document.querySelector('#layoutDimmed');
    handleDimmed(dimmed, document.body, 'searchExpand');
}

function handleDimmed(target, element, className){
    target.addEventListener('click', function(){
        element.classList.remove(className);
    });
}

function bottomScroll(){
    var lastScrollTop = 0;
    var delta = 5;
    var fixBox = document.querySelector('.bottom-nav__top');
    var fixBoxHeight = fixBox.offsetHeight;
    var didScroll;

    window.onscroll = function(e) {
        didScroll = true;
    };

    setInterval(function(){
        if(didScroll){
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled(){
        var nowScrollTop = window.scrollY;
        if(Math.abs(lastScrollTop - nowScrollTop) <= delta){
            return;
        }
        if(nowScrollTop > lastScrollTop && nowScrollTop > fixBoxHeight){
            //Scroll down
            var scrollTop = window.scrollTop();
            var innerHeight = window.innerHeight();
            var scrollHeight = $('body').prop('scrollHeight');
            if (scrollTop + innerHeight >= scrollHeight) {
                fixBox.classList.add('bottom-nav--hide');
                return true;
            }
        }else{
            if(nowScrollTop + window.innerHeight < document.body.offsetHeight){
                //Scroll up
                fixBox.classList.remove('bottom-nav--hide');
            }
        }
        lastScrollTop = nowScrollTop;
    }
}

function bottomNav(){
    var lastScrollTop = 0;
    var btnTop = document.querySelector('.bottom-nav__top');
    var fixedButton = document.getElementById("orderFixArea");
    if(fixedButton){
        document.body.classList.add("button--fixed");
    };

	window.addEventListener("scroll", function(){
		var scroll = window.pageYOffset || document.documentElement.scrollTop;
        var nav = document.querySelector('.bottom-nav');
		if (scroll > lastScrollTop){
			nav.classList.add('bottom-nav--hide');
		} else {
			nav.classList.remove('bottom-nav--hide');
		}
		// scroll bottom
		if(scroll === document.body.scrollHeight - document.documentElement.offsetHeight){
			nav.classList.remove('bottom-nav--hide');
		}
		lastScrollTop = scroll <= 0 ? 0 : scroll;

        // top button
        var currentScrollPercentage = getCurrentScrollPercentage();
        if(currentScrollPercentage > 30){
        	btnTop.classList.add('bottom-nav__top--show');
        } else {
			btnTop.classList.remove('bottom-nav__top--show');
        }
	});

    btnTop.addEventListener('click', function(){
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
    });
}

function getOffset(element){
    if (!element.getClientRects().length)
    {
      return { top: 0, left: 0 };
    }

    var rect = element.getBoundingClientRect();
    var win = element.ownerDocument.defaultView;
    return (
    {
      top: rect.top + win.pageYOffset,
      left: rect.left + win.pageXOffset
    });
}

function getQuickPosition(){
	var role = document.querySelector("meta[name='path_role']").getAttribute('content');
	if (role === "MAIN") {
		return getMainQuickPosition();
	} else {
		return getSubQuickPosition();
	}
}

function getMainQuickPosition(){
	var quickMenu = document.querySelector('#quick');
	var collection = document.querySelector('.collection');
	var snsItem = document.querySelector('.snsItem');

	var mainTopSpace = 115;
	var mainFooterSpace = 34;

	var top = collection.offsetTop + collection.clientHeight + mainTopSpace;
    var footTop = getOffset(snsItem).top + mainFooterSpace;
	var maxY = footTop - quickMenu.offsetHeight;

	return [top, maxY]
}

function getSubQuickPosition(){
	var quickMenu = document.querySelector('#quick');
	var footer = document.querySelector("#footer");

	var footerSpace = 60;
	var top = 284;
    var footTop = getOffset(footer).top;
	var maxY = footTop - quickMenu.offsetHeight - footerSpace;

	return [top, maxY]
}

function setQuickScrollEvent(y, quick){
	var header = document.querySelector('#header');
	var position = getQuickPosition();
	var scrollY = y;
	if (scrollY >= position[0] - header.offsetHeight){
		if (scrollY < position[1]) {
			quick.classList.add('fixed');
			quick.removeAttribute('style');
        } else {
			quick.classList.remove('fixed');
			quick.style.position = 'absolute';
			quick.style.top = position[1] + 'px';
        }
	} else {
		quick.style.top = position[0] + 'px';
        quick.classList.remove('fixed');
    }
}

function quickGoTop(){
    var btnTop = document.querySelector('#quick .pageTop');
	btnTop.addEventListener('click', function(){
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
    });
}

function topBanner(){
    var banner = document.querySelector('#topBanner');
    if(!banner) return;
    var btnClose = banner.querySelector('.btnClose');
    btnClose.addEventListener('click', function(){
        banner.classList.add("hidden");
    });
}


function getCurrentScrollPercentage(){
	return (window.scrollY + window.innerHeight) / document.body.clientHeight * 100
}



jQuery(document).ready(function() {

	/* 카테고리가 대량일때 나머지 숨김
	jQuery("#header .inner .top_nav_box .top_category").each(function(){
		var top_category_length = jQuery(' > ul > li',this).length;
		if ( top_category_length > 20 ) {
			jQuery(this).append('<div class="cate_more"></div>');
		}
		jQuery(' > ul > li:lt(20)',this).show();
	}); */

	/* 카테고리가 대량일때 이상일때 출력버튼
	jQuery("#header .inner .top_nav_box .top_category .cate_more").click(function() {
		var cate_more_on = jQuery(this).hasClass('on');
		if ( cate_more_on == false )  {
			jQuery('#header .inner .top_nav_box .top_category > ul > li').show();
			jQuery('#header .inner .top_nav_box .top_category .cate_more').addClass("on");
		} else {
			jQuery('#header .inner .top_nav_box .top_category .cate_more').removeClass("on");
			jQuery('#header .inner .top_nav_box .top_category > ul > li').hide();
			jQuery('#header .inner .top_nav_box .top_category > ul > li:lt(20)').show();
		}
	}); */

	/* 최상단배너 하루동안 닫기 - 서정환 */
    jQuery(".main_top_banner .top_banner_box_inner .top_banner_close .icon").bind("click", function() {
		if(jQuery("#top_banner_box_cloase").is(":checked")){
			jQuery(".main_top_banner").slideUp("fast");
			setCookiem("top_banner_cookie", "top_banner_cookie", 1);
		 } else {
			jQuery(".main_top_banner").slideUp("fast");
		 }
    });
	var main_top_banner_diplay = jQuery(".main_top_banner").attr("data-ez-display");
	if (!getCookiem("top_banner_cookie") && (main_top_banner_diplay == 'visible')) {
		jQuery(".main_top_banner").slideDown("fast");
	}

	/* 최상단배너 닫기버튼 없을시 높이 수정 */
	if(jQuery(".top_banner_close").css("display") == "none"){
		jQuery(".main_top_banner").addClass('close_none');
		if (main_top_banner_diplay == 'visible') {
			jQuery(".main_top_banner").slideDown("fast");
		}
	}

	/* 상단 고객센터 - 서정환 */
	jQuery("#header .inner .toparea .toparea_state .toparea_state_board").click(function() {
		var theme_cl = jQuery(this).attr('class');
		jQuery(this).toggleClass('on');
	});

	/* 상단검색 팝업 - 서정환 */
	jQuery('#header .inner .top_nav_box .top_mypage .eSearch, .bottom-nav__tabBar li .eSearch').bind("click", function() {
		jQuery(".xans-layout-searchheader").css('display', 'block');
		jQuery("#layer_shadow_search").addClass('on');
		jQuery('body').addClass('not_scroll').bind('scroll touchmove mousewheel', function(e){ // 브라우저 스크롤막기
			e.preventDefault();
			e.stopPropagation();
			return false;
		});
	})
	jQuery('.xans-layout-searchheader fieldset .top_search_box .btnClose').bind("click", function() {
		jQuery(".xans-layout-searchheader").css('display', 'none');
		jQuery("#layer_shadow_search").removeClass('on');
		jQuery('body').removeClass('not_scroll').unbind('scroll touchmove mousewheel'); // 브라우저 스크롤풀기
	})

	/* 로그인폼 placeholder 추가 - 서정환 */
	if (jQuery('.xans-member-login').val() != undefined) {
		jQuery('#member_passwd').attr('placeholder', '비밀번호');
	}

	/* 비회원 주문조회페이지 placeholder 추가 - 서정환 */
	setTimeout(function(){
		if (jQuery('.xans-myshop-orderhistorynologin').val() != undefined) {
			jQuery('#order_name').attr('placeholder', '주문자명');
			jQuery('#order_id').attr('placeholder', '주문번호(하이픈(-) 포함)');
			jQuery('#order_password').attr('placeholder', '비회원주문 비밀번호');
		}
	}, 100);

	/* 검색페이지 인풋박스에서 텍스트 삭제 - 서정환 */
	jQuery('#ec-product-searchdata-searchkeyword_form').find('button.btnDelete').bind('click', function() {
		jQuery('#ec-product-searchdata-keyword').val('').focus();
	});

	/* 검색페이지 정렬 텍스트 변경 */
	jQuery("#order_by").each(function(){
		jQuery('option:first-child', this).text('- 정렬방식 -');
	});

	/* 멀티샵 없을경우 숨김 */
	jQuery(".xans-layout-multishoplist").each(function(){
		var multishoplist_count = jQuery('li', this).length;
		if ( multishoplist_count == 1 ) {
			jQuery(this).hide();
		}
	});

	/* 하단 에스크로 사용하면 출력 */
	jQuery("#footer .inner .bt_escrow").each(function(){
		var bt_escrow = jQuery(this).attr("data-ez-escrow");
		if ( !bt_escrow == '' ) {
			var bt_escrow_name = jQuery("a img[data-ez-escrow-id="+ bt_escrow +"]", this).addClass('on');
			jQuery(this).css('display','block');
		}
	});

	/* 로그인페이지 SNS 사용하면 출력 */
	jQuery(".xans-member-login .login__sns .wrap_sns_log a").each(function(){
		var wrap_sns_log = jQuery(this).hasClass('displaynone');
		if( wrap_sns_log == false){
			jQuery(".xans-member-login .login__sns").css('display','block');
		}
	});

	/* 기획전 레이아웃변경에 따른 타겟고정위치 변경 */
	var header_height = document.getElementById("header").scrollHeight;
	if ( (jQuery("#header").hasClass('layout1')) || (jQuery("#header").hasClass('layout2')) || (jQuery("#header").hasClass('layout3')) ) {
		jQuery('.xans-project-list h3 span').css('top',-header_height+50);
	} else {
		jQuery('.xans-project-list h3 span').css('top',-header_height+20);
	}

	/* 모바일에서 쇼핑큐레이션 */
	jQuery('#shoppQbtn').click(function(){
		if (jQuery("#searchContent.xans-product-searchdata").is(":hidden")) {
			jQuery('#searchContent.xans-product-searchdata').slideDown('normal');
			jQuery(this).text('상세검색 닫기');
			jQuery(this).css('margin-top','0');
		} else {
			jQuery('#searchContent.xans-product-searchdata').slideUp('normal');
			jQuery(this).text('상세검색');
		}
	});

	/* 모바일에서 쇼핑큐레이션 없을시 버튼 숨김 */
	jQuery("#searchContent").each(function(){
		var prdCount_count = jQuery("#ec-searchdata-area", this).length;
		if ( prdCount_count == '0' ) {
			jQuery('#shoppQbtn').hide();
		}
	});

	/* 마이페이지 나의게시글 없을때 메시지 표시 */
	jQuery(".xans-myshop-boardpackage").each(function(){
		var boardlist = jQuery(".xans-myshop-boardlist table", this).length;
		if ( boardlist == '0' ) {
			jQuery('.myshop_boardlist_empty').css('display','flex');
		}
	});

	/* 더보기 클릭시 */
	jQuery('.btnMore').click(function(){
		setTimeout(function(){
			ifmore();
		},600)
	});
	setTimeout(function(){
		ifmore();
	},300)

	/* 상단 카테고리 변경 감지 */
	top_category(); // 상단카테고리
	jQuery('#header .xans-layout-category > ul').on('DOMSubtreeModified', function() {
		top_category();
	});

	/* 상단 카테고리 중분류 마우스오버 */
	jQuery('#header .xans-layout-category > ul > li .sub-category li').mouseenter(function() {
		jQuery(this).addClass('on');
	}).mouseleave(function() {
		jQuery(this).removeClass('on');
	});
});

/* 상단 카테고리 */
function top_category(){
	/* 상단 카테고리 마우스오버 */
	jQuery('#header .xans-layout-category > ul > li').mouseenter(function(){
		jQuery(".sub-category-box", this).css('display', 'block');
		jQuery("#layer_shadow").addClass('on');
		jQuery(".xans-layout-searchheader").css('display', 'none');
		jQuery("#layer_shadow_search").removeClass('on');
	}).mouseleave(function(){
		jQuery(".sub-category-box", this).css('display', 'none');
		jQuery("#layer_shadow").removeClass('on');
		jQuery('body').removeClass('not_scroll').unbind('scroll touchmove mousewheel'); // 브라우저 스크롤풀기
	});

	/* 상단 카테고리 확장형 */
	jQuery('#header .xans-layout-category > ul > li').each(function(){
		if( jQuery(this).children('ul').length == 0 ){
		} else {
			jQuery(this).children('ul').addClass('sub-category');
			jQuery(this).children('ul').wrap('<div class="sub-category-box"></div>');
		}
	});
}

/* 최상단배너 쿠키 스크립트 - 서정환 */
function setCookiem(cookie_name, cookie_value, expire_date) {
    var today = new Date();
    var expire = new Date();
    expire.setTime(today.getTime() + 3600000 * 24 * expire_date);
    cookies = cookie_name + '=' + cookie_value + '; path=/;';
    if (expire_date != 0) cookies += 'expires=' + expire.toGMTString();
    document.cookie = cookies;
}

function delCookiem(cookie_name) {
	var _today = new Date();
	var value = '';
	_today.setDate(_today.getDate() - 1);
	document.cookie = cookie_name + "=" + value + '; path=/;' + "; expires=" + _today.toGMTString();
}

function getCookiem(name) {
    lims = document.cookie;
    var index = lims.indexOf(name + "=");
    if (index == -1) {
        return null;
    }
    index = lims.indexOf("=", index) + 1; // first character
    var endstr = lims.indexOf(';', index);
    if (endstr == -1) {
        endstr = lims.length; // last character
    }
    return unescape(lims.substring(index, endstr));
}

/* 더보기 클릭시 */
function ifmore(){
	/* 상품 썸네일 관심상품 출력 & 숨김 */
	setTimeout(function(){
		jQuery('.ec-base-product .prdList .icon__box .wish').each(function(){
			var isstatus = jQuery(this).children('img').attr('icon_status');
			if ( isstatus == 'on' ) {
				jQuery(this).addClass('on');
			}
		});
		jQuery('.ec-base-product .prdList .icon__box .wish').click(function(){
			var isstatus = jQuery(this).children('img').attr('icon_status');
			if ( isstatus == 'off' ) {
				jQuery(this).addClass('on');
			} else {
				jQuery(this).removeClass('on');
			}
		});
	},200)
	jQuery('.ec-base-product .prdList > li').each(function(){
		/* 상품진열 장바구니 사용안할시 숨김 */
		if (jQuery(".icon__box .cart > .ec-admin-icon", this).length == 1) {
		} else {
			jQuery('.icon__box .cart', this).hide();
		}
		/* 상품진열 옵션미리보기 사용안할시 숨김 */
		if (jQuery(".icon__box .option > a", this).length == 1) {
		} else {
			jQuery('.icon__box .option', this).hide();
		}
		/* 상품진열 관심상품 사용안할시 숨김 */
		if (jQuery(".icon__box .wish > .ec-product-listwishicon", this).length == 1) {
		} else {
			jQuery('.icon__box .wish', this).hide();
		}
	});
}