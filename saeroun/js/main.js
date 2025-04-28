$(document).ready(function(){
    const $window = $(window);
    const $document = $(document);
    const $headerInner = $('.header_inner');
    const $floating = $('#floating');
    const $sectionTab = $('#section_tab');
    const $footer = $('#footer');
    const $darkThemeElements = $('[data-theme="dark"]');
    const $whiteThemeElements = $('[data-theme="white"]');
    const $mainBanner = $('.main_banner');
    const $secElements = $('.sec');
    const $sectionTabLi = $('#section_tab li');

    function throttle(func, delay) {
        let lastCall = 0;
        return function(...args) {
            const now = new Date().getTime();
            if (now - lastCall < delay) return;
            lastCall = now;
            return func(...args);
        };
    }

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    $window.on('resize', throttle(function() {
        ScrollTrigger.update();
    }, 100));

    setTimeout(function() {
        ScrollTrigger.refresh();
    }, 300);

    lenis.on('resize', throttle(() => {
        ScrollTrigger.refresh();
    }, 100));

    function updateThemeAndElements() {
        const currentScroll = $window.scrollTop();
        const windowHeight = $window.height();
        let isInDarkSection = false;
        let isInWhiteSection = false;
        let footerInfluence = false;

        if (currentScroll > 0) {
            $headerInner.add($floating).add($sectionTab).addClass('is-scroll');
        } else {
            $headerInner.add($floating).add($sectionTab).removeClass('is-scroll');
        }

        if (currentScroll < 50) {
            const mainBannerTheme = $mainBanner.attr('data-theme');
            if (mainBannerTheme === 'dark') {
                $headerInner.add($floating).add($sectionTab).addClass('dark');
                return;
            }
        }

        if ($footer.length) {
            const footerTop = $footer.offset().top;
            const footerHeight = $footer.outerHeight();
            const scrollBottom = currentScroll + windowHeight;

            if (scrollBottom > footerTop + (footerHeight * 0.25)) {
                $headerInner.add($floating).add($sectionTab).addClass('dark');
                footerInfluence = true;
            }
        }

        if (footerInfluence) return;

        let currentTheme = null;
        $whiteThemeElements.each(function() {
            const $this = $(this);
            const sectionTop = $this.offset().top;
            const sectionBottom = sectionTop + $this.outerHeight();

            if (currentScroll >= sectionTop - 100 && currentScroll < sectionBottom) {
                isInWhiteSection = true;
                currentTheme = 'white';
                return false;
            }
        });

        if (!currentTheme) {
            $darkThemeElements.not('footer').each(function() {
                const $this = $(this);
                const sectionTop = $this.offset().top;
                const sectionBottom = sectionTop + $this.outerHeight();

                if (currentScroll >= sectionTop - 100 && currentScroll < sectionBottom) {
                    isInDarkSection = true;
                    currentTheme = 'dark';
                    return false;
                }
            });
        }

        if (currentTheme === 'white') {
            $headerInner.add($floating).add($sectionTab).removeClass('dark');
        } else if (currentTheme === 'dark') {
            $headerInner.add($floating).add($sectionTab).addClass('dark');
        } else {
            $headerInner.add($floating).add($sectionTab).removeClass('dark');
        }
    }

    function setupSectionObserver() {
        if ('IntersectionObserver' in window) {
            const options = {
                rootMargin: '-50% 0px -50% 0px',
                threshold: 0
            };

            const sectionObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const currentIndex = $secElements.index(entry.target);
                        $sectionTabLi.removeClass('on');
                        $sectionTabLi.eq(currentIndex).addClass('on');
                    }
                });
            }, options);

            $secElements.each(function() {
                sectionObserver.observe(this);
            });
        } else {
            $window.on('scroll', throttle(secSep, 100));
        }
    }

    function secSep() {
        $secElements.each(function(i) {
            const sectionTop = $(this).offset().top;
            const sectionBottom = sectionTop + $(this).outerHeight();
            const scrollPosition = $window.scrollTop() + $window.height() / 2;

            if (scrollPosition > sectionTop && scrollPosition < sectionBottom) {
                $sectionTabLi.removeClass('on');
                $sectionTabLi.eq(i).addClass('on');
            }
        });
    }

    $document.ready(function() {
        updateThemeAndElements();
        setupSectionObserver();
    });

    $window.on('scroll', throttle(updateThemeAndElements, 100));

    $window.on('resize', throttle(function() {
        updateThemeAndElements();
        ScrollTrigger.refresh();

        if($window.width() <= 1024) {
            $('.main_review_wrap').css('height', 'auto');
            if(typeof ScrollTrigger !== 'undefined') {
                var reviewTrigger = ScrollTrigger.getById("reviewScroller");
                if(reviewTrigger) {
                    reviewTrigger.kill();
                }
            }
            $('.main_review_con.pc_show .review_content ul').css({
                'transform': 'translateX(0)',
                'margin-left': '0'
            });
        }
    }, 100));

    ScrollTrigger.getAll().forEach(st => {
        if((st.vars && st.vars.toggleClass && st.vars.toggleClass.targets === '#floating, #section_tab') ||
           (st.vars && st.vars.onEnter && st.vars.trigger.getAttribute && st.vars.trigger.getAttribute('data-theme') === 'white')) {
            st.kill();
        }
    });

    let searchSPos = 'top center';
    let searchEPos = 'bottom center';

    if($document.width() <= 768) {
        searchSPos = '50px bottom';
        searchEPos = '50px top';
    }

    const $box = $('.main_banner .box');
    if (window.innerWidth >= 1024) {
        gsap.to($box, {
            scrollTrigger: {
                trigger: '.main_banner',
                start: 'top top',
                end: 'bottom center',
                scrub: true,
                onLeave: () => {
                    $headerInner.removeClass('dark');
                },
                onEnterBack: () => {
                    if ($mainBanner.attr('data-theme') === 'dark') {
                        $headerInner.addClass('dark');
                    }
                }
            },
            borderRadius: 40,
            scaleX: 0.965,
        });
    } else if (window.innerWidth < 1024) {
        gsap.to($box, {
            scrollTrigger: {
                trigger: '.main_banner',
                start: 'top top',
                end: 'bottom center',
                scrub: true,
                onLeave: () => {
                    $headerInner.removeClass('dark');
                },
                onEnterBack: () => {
                    if ($mainBanner.attr('data-theme') === 'dark') {
                        $headerInner.addClass('dark');
                    }
                }
            },
            borderRadius: 20,
            scaleX: 0.965,
        });
    }

    $('#section_tab ul li').on('click', function() {
        var i = $(this).index();
        lenis.stop();

        $('html, body').stop().animate({
            scrollTop: $secElements.eq(i).offset().top
        }, 1000, function() {
            lenis.start();
        });
    });

    ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.section_motion .main_text_ani',
                    scrub: true,
                    start: 'bottom top',
                    end: '+=' + (window.innerHeight * 3),
                }
            });
            tl.from('.slide_item:nth-child(1) img', {
                scale: 1.05,
                duration: 0.25
            })
                .to('.slide_item:nth-child(2) .img_box', { y: 0 }, 'about01')
                .from('.slide_item:nth-child(2) img', { scale: 1.2 }, 'about01')
                .to('.slide_item:nth-child(3) .img_box', { y: 0 }, 'about02')
                .from('.slide_item:nth-child(3) img', { scale: 1.2 }, 'about02')
                .to('.slide_item:nth-child(4) .img_box', { y: 0 }, 'about03')
                .from('.slide_item:nth-child(4) img', { scale: 1.2 }, 'about03');

            gsap.set('.slide_item:nth-child(2) .txt, .slide_item:nth-child(3) .txt, .slide_item:nth-child(4) .txt', { opacity: 0 });

            gsap.to('.slide_item:nth-child(2) .txt', {
                scrollTrigger: {
                    trigger: '.section_motion .main_slide_wrap',
                    toggleActions: 'play none none reset',  
                    start: '+=' + (window.innerHeight * 1.9), 
                    end: '+=' + (window.innerHeight * 2.4),
                    scrub: false,
                    onEnter: () => {
                        $('.section_motion .main_slide_wrap').removeClass('index01 index03 index04').addClass('index02');
                        gsap.to('.slide_item:nth-child(2) .txt', { opacity: 1, duration: 0.5 });
                        gsap.set('.slide_item:nth-child(3) .txt, .slide_item:nth-child(4) .txt', { opacity: 0 });
                    },
                    onLeaveBack: () => {
                        $('.section_motion .main_slide_wrap').removeClass('index02').addClass('index01');
                        gsap.set('.slide_item:nth-child(2) .txt', { opacity: 0 });
                    }
                }
            });

            gsap.to('.slide_item:nth-child(3) .txt', {
                scrollTrigger: {
                    trigger: '.section_motion .main_slide_wrap',
                    toggleActions: 'play none none reset',  
                    start: '+=' + (window.innerHeight * 2.9),  
                    end: '+=' + (window.innerHeight * 3.4),
                    scrub: false,
                    onEnter: () => {
                        $('.section_motion .main_slide_wrap').removeClass('index01 index02 index04').addClass('index03');
                        gsap.to('.slide_item:nth-child(3) .txt', { opacity: 1, duration: 0.5 });
                        gsap.set('.slide_item:nth-child(2) .txt, .slide_item:nth-child(4) .txt', { opacity: 0 });
                    },
                    onLeaveBack: () => {
                        $('.section_motion .main_slide_wrap').removeClass('index03').addClass('index02');
                        gsap.set('.slide_item:nth-child(3) .txt', { opacity: 0 });
                        gsap.set('.slide_item:nth-child(4) .txt', { opacity: 0 });

                        gsap.delayedCall(0.05, function() {
                            gsap.to('.slide_item:nth-child(2) .txt', { opacity: 1, duration: 0.3 });
                        });
                    }
                }
            });

            gsap.to('.slide_item:nth-child(4) .txt', {
                scrollTrigger: {
                    trigger: '.section_motion .main_slide_wrap',
                    toggleActions: 'play none none reset',
                    start: '+=' + (window.innerHeight * 3.9), 
                    end: 'bottom top',
                    scrub: false,
                    onEnter: () => {
                        $('.section_motion .main_slide_wrap').removeClass('index01 index02 index03').addClass('index04');
                        gsap.to('.slide_item:nth-child(4) .txt', { opacity: 1, duration: 0.5 });
                        gsap.set('.slide_item:nth-child(2) .txt, .slide_item:nth-child(3) .txt', { opacity: 0 });
                    },
                    onLeaveBack: () => {
                        $('.section_motion .main_slide_wrap').removeClass('index04').addClass('index03');
                        gsap.set('.slide_item:nth-child(4) .txt', { opacity: 0 });
                        gsap.set('.slide_item:nth-child(2) .txt', { opacity: 0 });

                        gsap.delayedCall(0.05, function() {
                            gsap.to('.slide_item:nth-child(3) .txt', { opacity: 1, duration: 0.3 });
                        });
                    }
                }
            });

            ScrollTrigger.create({
                trigger: '.section_motion .main_slide_wrap',
                start: 'top top',
                end: '+=' + (window.innerHeight * 1.0),
                onEnter: () => {
                    $('.section_motion .main_slide_wrap').removeClass('index02 index03 index04').addClass('index01');
                    gsap.set('.slide_item:nth-child(2) .txt, .slide_item:nth-child(3) .txt, .slide_item:nth-child(4) .txt', { opacity: 0 });
                },
                onEnterBack: () => {
                    $('.section_motion .main_slide_wrap').removeClass('index02 index03 index04').addClass('index01');
                    gsap.set('.slide_item:nth-child(2) .txt, .slide_item:nth-child(3) .txt, .slide_item:nth-child(4) .txt', { opacity: 0 });
                }
            });

            ScrollTrigger.create({ 
                trigger: ".main_slide_wrap", 
                start: "top top", 
                end: "bottom bottom", 
                onUpdate: (self) => {
                    const scrollPosition = window.scrollY;
                    const windowHeight = window.innerHeight;
                    const basePosition = $('.section_motion .main_slide_wrap').offset().top;

                    let currentSlide = 1; 

                    if (scrollPosition >= basePosition + (windowHeight * 1.9)) {
                        currentSlide = 2;
                    }

                    if (scrollPosition >= basePosition + (windowHeight * 2.9)) {
                        currentSlide = 3;
                    }

                    if (scrollPosition >= basePosition + (windowHeight * 3.9)) {
                        currentSlide = 4;
                    }

                    const paginationText = document.querySelector('.slide_pagination .current');
                    if (paginationText) {
                        paginationText.textContent = currentSlide;
                    }
                }
            }); 
            ScrollTrigger.refresh();
        }
    });

    $('.text_list li:first-child').addClass('on');

    gsap.to('.main_brain_wrap .brain_wrap', {
        scrollTrigger: {
            trigger: '.main_brain_wrap .brain_wrap',
            start: 'top center',
            end: 'top top',
            scrub: true,
        },
        borderRadius: 0,
        scaleX: 1,
    });

    function brainSc() {
        if($(document).width()>1024) {
            $('.main_brain_wrap .brain_wrap').each(function(i) {
                if ($(window).scrollTop() + $(window).height() > $('.main_brain_wrap .brain_wrap').eq(i).offset().left + $(window).scrollTop()) {
                    $('.text_list li').removeClass('on');
                    $('.text_list li').eq(i).addClass('on');
                }
            })
        }
    }

    var liCount = $('.main_brain_wrap .brain_wrap .content_slide li').length;
    $('.main_brain_wrap .brain_wrap .content_slide li').each(function(index) {
        $(this).addClass('brain_' + (index + 1)); 
    });

    if (window.innerWidth >= 1024) {
        const ani1 = gsap.timeline();

        ani1.from('.content_slide .brain_2', {x: '100%'},'fir')
            .from('.content_slide .brain_3', {x: '100%'},'sec')

        let st = ScrollTrigger.create({
            animation: ani1,
            trigger: '.main_brain_wrap .brain_wrap',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
        })

        $('.text_list li').on('click',function() {
            var i = $(this).index();

            if(i==0) $('html, body').stop().animate({scrollTop: $('.brain_wrap').offset().top}, 1000);
            else if (i==1) gsap.to(window, {duration: 1, scrollTo: ani1.scrollTrigger.labelToScroll('sec')});
            else if (i==2) gsap.to(window, {duration: 1, scrollTo: st.end});
        })

        $(window).on('scroll',function() {
            const currentScroll3 = $(window).scrollTop();
            const startPosition = $('.brain_wrap').offset().top;
            const secondPosition = ani1.scrollTrigger.labelToScroll('sec');
            const endPosition = st.end;

            if (Math.abs(currentScroll3 - startPosition) < 100) {
                $('.text_list li').removeClass('on');
                $('.text_list li').eq(0).addClass('on');
            } else if (Math.abs(currentScroll3 - secondPosition) < 100) {
                $('.text_list li').removeClass('on');
                $('.text_list li').eq(1).addClass('on');
            } else if (Math.abs(currentScroll3 - endPosition) < 100 || currentScroll3 >= endPosition) {
                $('.text_list li').removeClass('on');
                $('.text_list li').eq(2).addClass('on');
            } else if (currentScroll3 > startPosition && currentScroll3 < secondPosition) {
                $('.text_list li').removeClass('on');
                $('.text_list li').eq(0).addClass('on');
            } else if (currentScroll3 > secondPosition && currentScroll3 < endPosition) {
                $('.text_list li').removeClass('on');
                $('.text_list li').eq(1).addClass('on');
            }
        });
    }

    if (window.innerWidth >= 1024) {
        $('.main_text_ani').each(function(){
            const $textBox = $(this).find('.txt_box');
            const $textElements = $textBox.find('p');

            $textElements.addClass('text-line');

            const textAnimation = gsap.timeline({ paused: true })
            .to($textElements, {
                backgroundSize: '200% 100%',
                duration: 0.5,
                stagger: 0.5
            });

            gsap.set($textElements, {
                backgroundSize: '0% 100%'
            });

            ScrollTrigger.create({
                trigger: $textBox,
                start: 'top 85%',
                end: 'bottom 15%',
                animation: textAnimation,
                scrub: true,
                toggleActions: 'restart none none reverse',
                preventOverlaps: true,
                fastScrollEnd: true,
            });
        });
    }

    if($(window).width() > 1024) {
        var reviewUl = $('.main_review_con.pc_show .review_content ul');
        reviewUl.css('margin-left', '80%');
        var reviewWidth = reviewUl.outerWidth(true);
        var containerWidth = $('.main_review_con.pc_show').width();
        if(reviewWidth > containerWidth) {
            var translateX = reviewWidth - containerWidth + 80;
            gsap.to(reviewUl, {
                x: -translateX,
                ease: "power1.inOut",
                scrollTrigger: {
                    id: "reviewScroller",
                    trigger: '.main_review_wrap',
                    start: 'top top',
                    end: '+=200%',
                    scrub: 1.5,
                    pin: true,
                    pinSpacing: true,
                    markers: false,
                    invalidateOnRefresh: true
                }
            });
        }
        $(window).on('scroll', function() {
            if($('.main_review_wrap').length) {
                $('.main_review_con.pc_show .review_content ul li').each(function() {
                    var elementPos = $(this).offset().left;
                    var windowWidth = $(window).width();
                    var scrollPos = $(window).scrollTop();
                    if (scrollPos + windowWidth * 0.7 > elementPos + scrollPos) {
                        $(this).addClass('is-active');
                    } else {
                        $(this).removeClass('is-active');
                    }
                });
            }
        });
    }
    $(window).on('resize', function() {
        if($(window).width() <= 1024) {
            $('.main_review_wrap').css('height', 'auto');
            if(typeof ScrollTrigger !== 'undefined') {
                var reviewTrigger = ScrollTrigger.getById("reviewScroller");
                if(reviewTrigger) {
                    reviewTrigger.kill();
                }
            }
            $('.main_review_con.pc_show .review_content ul').css({
                'transform': 'translateX(0)',
                'margin-left': '0'
            });
        }
    });

    $('.main_news .swiper-slide a .summary .date').each(function() {
        var dateText = $(this).text(); 
        var dateParts = dateText.split('.'); 
        var newDate = dateParts[0] + '.' + dateParts[1];
        $(this).text(newDate);  
    });

    const newsSwiper = new Swiper(".main_news .swiper", {
        slidesPerView: window.innerWidth >= 1024 ? 3 : 2.4,
        loopAdditionalSlides: 1, 
        spaceBetween: window.innerWidth >= 1024 ? 40 : 20,
        scrollbar: {
            el: ".main_news .swiper-scrollbar",
            draggable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1.4,
                spaceBetween: 15
            },
            675: {
                slidesPerView: 2.4,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40
            }
        }
    });

    const mainSwiper = new Swiper(".main_slide_container .swiper", {
        slidesPerView: 1,
        loopAdditionalSlides : 1, 
        pagination: {
            el: ".main_slide_container .swiper-pagination",
        },
    });

    const brainSwiper = new Swiper(".brain_box .swiper", {
        slidesPerView: 1.05,
        slidesOffsetAfter: 30,
        spaceBetween: 15,
        loopAdditionalSlides: 1, 
        pagination: {
            el: ".brain_box .swiper-pagination",
            renderBullet: function (index, className) {
                if (index < this.slides.length) {
                    return '<span class="' + className + '"></span>';
                }
                return '';
            },
        },
        breakpoints: {
            0: {
                spaceBetween: 10,
                slidesOffsetAfter: 20,
            },
            675: {
                spaceBetween: 15,
                slidesOffsetAfter: 30,
            }
        },
        on: {
            init: function() {
                setTimeout(() => {
                    const totalSlides = this.slides.length;
                    if (totalSlides === 3 && this.pagination.bullets.length > 3) {
                        $(this.pagination.bullets).slice(3).hide();
                    }
                }, 0);
            }
        }
    });


    const reviewSwiper = new Swiper(".review_content.swiper", {
        slidesPerView: 'auto',
        slidesOffsetAfter: 40,
        slidesOffsetBefore: 40,
        spaceBetween: 40,
        pagination: {
            el: ".main_review_container .swiper-pagination",
        },
        breakpoints: {
            0: {
                slidesPerView: 'auto',
                slidesOffsetBefore: 20,
                slidesOffsetAfter: 20,
                spaceBetween: 20,
            },
            675: {
                slidesPerView: 'auto',
                slidesOffsetBefore: 40,
                slidesOffsetAfter: 40,
                spaceBetween: 40,
            }
        },
    });

    ScrollTrigger.create({
        trigger: '.sec', 
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: self => {
            const progress = self.progress;
            const activeTabIndex = Math.min(Math.floor(progress * $('#section_tab li').length), $('#section_tab li').length - 1);
            $('#section_tab li').removeClass('on');
            $('#section_tab li').eq(activeTabIndex).addClass('on');
        },
        invalidateOnRefresh: true,
        preventOverlaps: true
    });

    ScrollTrigger.create({
        trigger: '.sec', 
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: self => {
            const progress = self.progress;
            const activeTabIndex = Math.min(Math.floor(progress * $('#section_tab li').length), $('#section_tab li').length - 1);
            $('#section_tab li').removeClass('on');
            $('#section_tab li').eq(activeTabIndex).addClass('on');
        }
    });

    $(window).on('scroll', function() {
        secSep();

        var scrollPosition = $(window).scrollTop();
        if (scrollPosition === 0) {
            $('.header_inner, #floating, #section_tab').removeClass('is-scroll');
        }
        if (scrollPosition > 0) {
            $('.header_inner, #floating, #section_tab').addClass('is-scroll');
        }
    });


    $(window).on('resize', function() {
        ScrollTrigger.refresh();
    });
});