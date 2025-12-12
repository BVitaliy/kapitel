//*====================================
//*  FUNCTIONS ON DOCUMENT READY      =
//*====================================
//*  FUNCTIONS CALC, RESIZE, SCROLL   =
//*====================================
//*  ANIMATION                        =
//*====================================
//*  HEADER                           =
//*====================================
//*  POPUPS                           =
//*====================================
//*  KEY FOCUS, TABS, ACCORDION       =
//*====================================
//*  DYNAMIC LOAD JS                  =
//*====================================
//*  OTHER JS                         =
//*====================================

const _functions = {};
let winW, winH, winScr, isTouchScreen, isAndroid, isChrome, isIPhone, isMac, isSafari, isFirefox;

jQuery(function ($) {
    "use strict";

    //*================================
    //*  FUNCTIONS ON DOCUMENT READY  =
    //*================================
    isTouchScreen = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i),
        isAndroid = navigator.userAgent.match(/Android/i),
        isChrome = navigator.userAgent.indexOf('Chrome') >= 0 && navigator.userAgent.indexOf('Edge') < 0,
        isIPhone = navigator.userAgent.match(/iPhone/i),
        isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0,
        isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
        isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;


    if (isTouchScreen) $('html').addClass('touch-screen');
    if (isAndroid) $('html').addClass('android');
    if (isChrome) $('html').addClass('chrome');
    if (isIPhone) $('html').addClass('ios');
    if (isMac) $('html').addClass('mac');
    if (isSafari) $('html').addClass('safari');
    if (isFirefox) $('html').addClass('firefox');




    //*===================================
    //*  FUNCTIONS CALC, RESIZE, SCROLL  =
    //*===================================
    // Function Calculations on page
    _functions.pageCalculations = function () {
        winW = $(window).outerWidth();
        winH = $(window).outerHeight();
    }
    _functions.pageCalculations();

    /* Function on page scroll */
    $(window).on('scroll', function () {
        _functions.scrollCall();
    });


    var prev_scroll = 0;
    _functions.scrollCall = function () {
        winScr = $(window).scrollTop();

        if (winScr > $('header').innerHeight()) {
            $('header').addClass('scrolled');

        } else if (winScr <= $('header').innerHeight()) {
            $('header').removeClass('scrolled');
            prev_scroll = 0;
        }

        prev_scroll = winScr;
    }
    _functions.scrollCall();


    /* Function on page resize */
    _functions.resizeCall = function () {
        setTimeout(function () {
            _functions.pageCalculations();
        }, 100);
    };


    if (!isTouchScreen) {
        $(window).on('resize', function () {
            _functions.resizeCall();
        });

    } else {
        window.addEventListener("orientationchange", function (e) {

            // Portrait
            if (window.orientation == 0) {
                $('html').removeClass('landscape');
            }
            // Landscape
            else {
                $('html').addClass('landscape');
            }

            _functions.resizeCall();
        }, false);
    }




    //*==============
    //*  ANIMATION  =
    //*==============
    const observerFunction = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('|', 'animated')
            observer.unobserve(entry.target)
        })

    }, {
        root: null,
        threshold: 0,
        rootMargin: (window.innerWidth > 767) ? "-50px" : "0%"
    });

    document.querySelectorAll('.section').forEach(block => {
        observerFunction.observe(block)
    });




    //*===========
    //*  HEADER  =
    //*===========
    if (winW > 1199) {
        // hover on header dropdown
        $(document).on('mouseenter', '.h-drop b', function () {
            $(this).closest('.h-drop').addClass('is-active');
        });

        // leave header dropdown
        $(document).on('mouseleave', '.h-drop', function () {
            $(this).removeClass('is-active');
        });

    } else {

        /* Open menu */
        $(document).on('click', '.js-open-menu', function () {
            $('html').toggleClass('overflow-menu');
            $('header').removeClass('hide');
            $('header').toggleClass('open-menu');
        });

        /* Close menu */
        $(document).on('click', '.h-menu-overlay', function () {
            $('html').removeClass('overflow-menu');
            $('header').removeClass('open-menu');
        });
    }

    /* Open Cabinet Dropdown */
    $(document).on('click', 'header .h-cabinet:not(.open-popup)', function () {
        $(this).toggleClass('is-active');
    });

    /* Close Cabinet Dropdown */
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.h-cabinet').length) {
            $('.h-cabinet').removeClass('is-active');
        }
    });




    //*===========
    //*  POPUPS  =
    //*===========
    _functions.scrollWidth = function () {
        let scrWidth = $(window).outerWidth() - $('body').innerWidth();

        $('body, .h-wrap').css({
            "paddingRight": `${scrWidth}px`
        });
    }


    // Popups Functions
    let popupTop = 0;
    _functions.removeScroll = function () {
        _functions.scrollWidth();
        popupTop = winScr;
        $('html').css({
            "top": '-' + winScr,
            "width": "100%"
        }).addClass("overflow-hidden");
    }

    _functions.addScroll = function () {
        _functions.scrollWidth();
        $('html').removeClass("overflow-hidden");
        window.scroll(0, popupTop);
    }

    _functions.openPopup = function (popup) {
        $('.popup-content').removeClass('active');
        $(popup + ', .popup-wrapper').addClass('active');
        _functions.removeScroll();
    };

    _functions.closePopup = function () {
        $('.popup-wrapper, .popup-content').removeClass('active');
        $('.video-popup iframe').remove();
        _functions.addScroll();
    };

    // Close  popup
    $(document).on('click', '.popup-content .close-popup, .popup-content .layer-close', function (e) {
        e.preventDefault();
        _functions.closePopup();
    });

    // Ajax popup
    $(document).on('click', '.open-popup', function (e) {
        const popupWrapper = document.getElementById("popups");

        if (e.target.closest('.open-popup')) {
            let dataRel = e.target.closest('.open-popup').getAttribute('data-rel');
            e.preventDefault();

            if (popupWrapper.hasChildNodes()) {
                _functions.openPopup('.popup-content[data-rel="' + dataRel + '"]');

            } else {
                const ajaxPopup = new XMLHttpRequest();

                ajaxPopup.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        popupWrapper.innerHTML = this.responseText;

                        setTimeout(function () {
                            _functions.initSelect('.popup-wrapper');
                            _functions.initMask()
                            _functions.openPopup('.popup-content[data-rel="' + dataRel + '"]');
                        }, 50);
                    }
                };
                ajaxPopup.open("GET", "inc/popups/_popups.php", true);
                ajaxPopup.send();
            }
        }
    });




    //*===============================
    //*  KEY FOCUS, TABS, ACCORDION  =
    //*===============================
    // Detect if user is using keyboard tab-button to navigate
    // with 'keyboard-focus' class we add default css outlines
    function keyboardFocus(e) {
        if (e.keyCode !== 9) {
            return;
        }

        switch (e.target.nodeName.toLowerCase()) {
            case 'input':
            case 'select':
            case 'textarea':
                break;
            default:
                document.documentElement.classList.add('keyboard-focus');
                document.removeEventListener('keydown', keyboardFocus, false);
        }
    }
    document.addEventListener('keydown', keyboardFocus, false);

    // tabs
    $(document).on('click', '._tab-item', function () {
        let tab = $(this).closest('._tabs').find('._tab');
        let i = $(this).index();

        $(this).addClass('is-active').siblings().removeClass('is-active');
        tab.eq(i).siblings('._tab:visible').stop().finish().fadeOut(function () {
            tab.eq(i).fadeIn(200);
        });
    });

    // accordion
    $(document).on('click', '.accordion-title', function () {
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active').next().slideUp();
        } else {
            $(this).closest('.accordion').find('.accordion-title').not(this).removeClass('is-active').next().slideUp();
            $(this).addClass('is-active').next().slideDown();
        }
    });




    //*====================
    //*  DYNAMIC LOAD JS  =
    //*====================
    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            _functions.videoLoad(entry.target);
            observer.unobserve(entry.target)
        })
    }, {
        root: document,
        rootMargin: "50%",
    });

    document.querySelectorAll(".video").forEach((element) => {
        videoObserver.observe(element);
    });

    _functions.videoLoad = function (block) {
        let videoBlock = $(block).find('video'),
            videoSrc = videoBlock.data('src');
        videoBlock.attr('src', videoSrc);
    };

    //activate autoplay video
    if ($('.video').length) {
        $(this).find('video').attr("autoplay", "");
    }




    

    // // Function to update total-square
    // _functions.updateTotal = function () {
    //     let total = 0;

    //     // Loop through all inputs inside .filters-num-body
    //     $('.filters-num-body .input').each(function () {
    //         let val = parseInt($(this).val()) || 0;
    //         total += val;
    //     });

    //     // Update the total-square element
    //     $('.total-square').text(total);

    //     // Save to localStorage
    //     localStorage.setItem('totalSquare', total);
    // }

    // // Run once on page load
    // $(document).ready(function () {
    //     // If we have saved value in localStorage, show it
    //     let savedTotal = localStorage.getItem('totalSquare');
    //     if (savedTotal !== null) {
    //         $('.total-square').text(savedTotal);
    //     }

    //     // If filters-num-body exists, run updateTotal
    //     if ($('.filters-num-body').length > 0) {
    //         _functions.updateTotal();
    //     }
    // });

    // // Update total whenever any input changes
    // $('.filters-num-body').on('input', '.input', function () {
    //     _functions.updateTotal();
    // });

    // // Also update when incr/decr buttons are clicked
    // $('.filters-num-body').on('click', '.incr, .decr', function () {
    //     _functions.updateTotal();
    // });

    // // Save all values of .input fields into localStorage
    // function saveInputs() {
    //     let inputsData = [];
    //     $('.filters-num-body .input').each(function (index) {
    //         inputsData[index] = $(this).val();
    //     });
    //     localStorage.setItem('filtersInputs', JSON.stringify(inputsData));
    // }

    // // Restore values of .input fields from localStorage
    // function restoreInputs() {
    //     let saved = localStorage.getItem('filtersInputs');
    //     if (saved) {
    //         let inputsData = JSON.parse(saved);
    //         $('.filters-num-body .input').each(function (index) {
    //             if (inputsData[index] !== undefined) {
    //                 $(this).val(inputsData[index]);
    //             }
    //         });
    //     }
    // }

    // // Update the total-square element
    // _functions.updateTotal = function () {
    //     let total = 0;
    //     $('.filters-num-body .input').each(function () {
    //         let val = parseInt($(this).val()) || 0;
    //         total += val;
    //     });
    //     $('.total-square').text(total);
    //     localStorage.setItem('totalSquare', total);
    // }

    
    // // Update total and save inputs whenever any input changes
    // $('.filters-num-body').on('input', '.input', function () {
    //     saveInputs();
    //     _functions.updateTotal();
    // });
    // // Run once on page load
    // $(document).ready(function () {
    //     // Restore input values
    //     restoreInputs();

    //     // Restore total-square value
    //     let savedTotal = localStorage.getItem('totalSquare');
    //     if (savedTotal !== null) {
    //         $('.total-square').text(savedTotal);
    //     }

    //     // If filters-num-body exists, recalculate
    //     if ($('.filters-num-body').length > 0) {
    //         _functions.updateTotal();
    //     }
    // });

});