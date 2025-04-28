$(document).ready(function(){
    let lastScrollTop = 0;
    let headerHeight = 0;
    let windowWidth = window.innerWidth;
    let isMobile = windowWidth <= 1024;
    let isMobile2 = windowWidth <= 675;
    
    const $window2 = $(window);
    const $floating2 = $('#floating');
    const $footer2 = $('#footer');
    const $darkThemeElements2 = $('[data-theme="dark"]');
    
    function updateThemeAndElements2() {
        const currentScroll2 = $window2.scrollTop();
        const windowHeight2 = $window2.height();
        
        if ($footer2.length) {
            const footerTop = $footer2.offset().top;
            const footerHeight = $footer2.outerHeight();
            const scrollBottom = currentScroll2 + windowHeight2;

            if (scrollBottom > footerTop + (footerHeight * 0.25)) {
                $floating2.addClass('dark');
            } else {
            	$floating2.removeClass('dark');
            }
        }
    }
    
    updateThemeAndElements2();
    $window2.on('scroll', updateThemeAndElements2);

    /*function updateHeaderScroll() {
        if (isMobile2) {
            $(window).off('scroll.headerHide').on('scroll.headerHide', function() {
                const currentScrollTop = $(this).scrollTop();
                if (currentScrollTop > lastScrollTop && currentScrollTop > headerHeight) {
                    $('#header').css('transform', `translateY(-${headerHeight}px)`);
                } else if (currentScrollTop < lastScrollTop) {
                    $('#header').css('transform', 'translateY(0)');
                }
                lastScrollTop = currentScrollTop;
            });
        } else {
            $(window).off('scroll.headerHide');
            $('#header').css('transform', 'translateY(0)');
        }
    }*/
    
    $(document).ready(function() {
        headerHeight = $('#header').outerHeight();

        // updateHeaderScroll();

        $(window).on('resize', function() {
            isMobile2 = window.innerWidth < 768; 
            headerHeight = $('#header').outerHeight();
            //updateHeaderScroll();
        });
    });
    
    function setupMenuInteraction() {
        if (isMobile) {
            $("#header .header_inner .right a.menu").off().on('click', function(e) {
                e.preventDefault();
                if ($(this).hasClass('open')) {
                    $(this).removeClass('open');
                    $("#header .header_inner .right .menu_hover").removeClass("on");
                    $('html').css('overflow','');
                    $('#header .logo').removeClass('open');
                    $('#header .header_inner .right a.support').removeClass('open');
                } else {
                    $("#header .header_inner .right a.menu").removeClass('open');
                    $(this).addClass('open');
                    $("#header .header_inner .right .menu_hover").addClass("on");
                    $('html').css('overflow', 'hidden');
                    $('#header .logo').addClass('open');
                    $('#header .header_inner .right a.support').addClass('open');
                }
            });
            
            $("#header .header_inner .right a.menu, #header .header_inner .right .menu_hover").off('mouseenter mouseleave');
        } else {
            $("#header .header_inner .right a.menu").off('click');
            
            let hoverTimeout;
            $("#header .header_inner .right a.menu").off('mouseenter mouseleave').on('mouseenter', function(){
                clearTimeout(hoverTimeout);
                $("#header .header_inner .right .menu_hover").addClass("on");
            });
            
            $("#header .header_inner .right .menu_hover").off('mouseenter mouseleave').on('mouseenter', function(){
                clearTimeout(hoverTimeout);
            });
            
            $("#header .header_inner .right a.menu, #header .header_inner .right .menu_hover").on('mouseleave', function(e){
                const toElement = e.toElement || e.relatedTarget;
                const $toElement = $(toElement);
                if($toElement.is("#header .header_inner .right a.menu") || 
                   $toElement.is("#header .header_inner .right .menu_hover")) {
                    return;
                }
                hoverTimeout = setTimeout(function(){
                    $("#header .header_inner .right .menu_hover").removeClass("on");
                }, 100);
            });
            
            $("#header .header_inner .right a.menu").removeClass('open');
            $("#header .header_inner .right .menu_hover").removeClass("on");
            $('html').css('overflow','');
            $('#header .logo').removeClass('open');
        }
    }
    
    function setupSearchButton() {
        $('#floating .search_btn').off('click').on('click', function(){
            $('body').css('overflow', 'hidden');
            if (window.innerWidth <= 520) {
                $('#search_wrap').css('right', '20px');
            } else {
                $('#search_wrap').css('right', '40px');
            }
        });
        
        $('#search_wrap .close').off('click').on('click', function(){
            $('body').css('overflow', 'auto');
            $('#search_wrap').css('right', '-100%');
        });
        
        $(document).off('click.searchClose').on('click.searchClose', function(event){
            if (!$(event.target).closest('#floating .search_btn, #search_wrap').length) {
                $('body').css('overflow', 'auto');
                $('#search_wrap').css('right', '-100%');
            }
        });
    }
    
    function initializeUI() {
        $('input#keyword').attr('placeholder', '검색어를 입력하세요.');
        
        $('#floating .top_btn').off('click').on('click', function(){
            $('html, body').animate({
                scrollTop: 0
            }, 500); 
        });
        
        $('#header .header_inner .right > .lang p').on('click', function(e) {
            e.stopPropagation(); 

            $(this).toggleClass('on');

            var $hiddenItems = $(this).next('ul');
            if($hiddenItems.is(':visible')) {
                $hiddenItems.slideUp(300);
            } else {
                $hiddenItems.slideDown(300);
            }
        });

        $(document).on('click', function(e) {
            if(!$(e.target).closest('.lang').length) {
                $('#header .header_inner .right > .lang p').removeClass('on');
                $('#header .header_inner .right > .lang ul').slideUp(300);
            }
        });
        
        headerHeight = $('#header').outerHeight();
        //updateHeaderScroll();
        setupMenuInteraction();
        setupSearchButton();
    }
    
    function handleResize() {
        const newWindowWidth = window.innerWidth;
        const breakpoint1024Changed = (windowWidth <= 1024 && newWindowWidth > 1024) || 
                                    (windowWidth > 1024 && newWindowWidth <= 1024);
        const breakpoint675Changed = (windowWidth <= 675 && newWindowWidth > 675) || 
                                    (windowWidth > 675 && newWindowWidth <= 675);
        
        windowWidth = newWindowWidth;
        isMobile = windowWidth <= 1024;
        isMobile2 = windowWidth <= 675;
        
        if (breakpoint1024Changed || breakpoint675Changed) {
            initializeUI();
        } else {
            if (isMobile2) {
                //updateHeaderScroll();
            }
            
            headerHeight = $('#header').outerHeight();
        }
    }
    
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
    
    initializeUI();
    
    window.addEventListener('resize', debounce(handleResize, 200));
});