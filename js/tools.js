$(document).ready(function() {

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $('body').on('click', '.window-link', function(e) {
        if ($('html').hasClass('menu-open')) {
            $('html').removeClass('menu-open');
            $(window).scrollTop($('.wrapper').data('curScroll'));
        }

        var curLink = $(this);
        $('.window-link').removeClass('last-active');
        curLink.addClass('last-active');
        windowOpen(curLink.attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close, .window-close-btn', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('body').on('click', '.header-menu-link', function(e) {
        if ($('html').hasClass('select-filter-open')) {
            $('html').removeClass('select-filter-open');
            $(window).scrollTop($('.wrapper').data('curScroll'));
        }

        var curScroll = $(window).scrollTop();
        $('html').addClass('menu-open');

        $('.wrapper').data('curScroll', curScroll);
        e.preventDefault();
    });

    $('body').on('click', '.menu-close-link', function(e) {
        $('html').removeClass('menu-open');
        $(window).scrollTop($('.wrapper').data('curScroll'));
        e.preventDefault();
    });

    $('form').each(function() {
        initForm($(this));
    });

    $('.main-filter-slider').each(function() {
        var curSlider = $(this);
        var curRange = curSlider.find('.main-filter-slider-range-inner')[0];
        var curStartFrom = Number(curSlider.find('.main-filter-slider-min').html());
        if (Number(curSlider.find('.main-filter-slider-from').val()) !== 0) {
            curStartFrom = Number(curSlider.find('.main-filter-slider-from').val());
        }
        var curStartTo = Number(curSlider.find('.main-filter-slider-max').html());
        if (Number(curSlider.find('.main-filter-slider-to').val()) !== 0) {
            curStartTo = Number(curSlider.find('.main-filter-slider-to').val());
        }
        noUiSlider.create(curRange, {
            start: [curStartFrom, curStartTo],
            connect: true,
            range: {
                'min': Number(curSlider.find('.main-filter-slider-min').html()),
                'max': Number(curSlider.find('.main-filter-slider-max').html())
            },
            step: Number(curSlider.find('.main-filter-slider-step').html()),
            format: wNumb({
                decimals: 0
            })
        });
        curRange.noUiSlider.on('update', function(values, handle) {
            if (handle == 0) {
                curSlider.find('.main-filter-slider-from').val(values[handle]);
                curSlider.find('.main-filter-slider-text-from span').html(values[handle]);
            } else {
                curSlider.find('.main-filter-slider-to').val(values[handle]);
                curSlider.find('.main-filter-slider-text-to span').html(values[handle]);
            }
        });
    });

    $('.main-family-slider-menu a').click(function(e) {
        var curItem = $(this);
        if (!curItem.hasClass('active')) {
            $('.main-family-slider-menu a.active').removeClass('active');
            curItem.addClass('active');
            var curIndex = $('.main-family-slider-menu a').index(curItem);
            $('.main-family-slider-content.active').removeClass('active');
            $('.main-family-slider-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.main-family-slider').each(function() {
        $('.main-family-slider-content').eq(0).addClass('active');
        $('.main-family-slider-menu a').eq(0).addClass('active');
        $('.main-family-slider-list').each(function() {
            var curSlider = $(this);
            curSlider.find('.main-family-slider-title').html(curSlider.find('.swiper-slide').eq(0).find('.main-family-slider-item').attr('data-title'));
            curSlider.find('.main-family-slider-fraction strong').html(curSlider.find('.swiper-slide').length);
            var swiper = new Swiper(curSlider[0], {
                loop: false,
                slidesPerView: 1,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                on: {
                    realIndexChange: function () {
                        curSlider.find('.main-family-slider-title').html($(swiper.slides[swiper.realIndex]).find('.main-family-slider-item').attr('data-title'));
                        curSlider.find('.main-family-slider-fraction span').html(swiper.realIndex + 1);
                    },
                },
            });
        });
    });

    $('.main-architecture-view-slider').each(function() {
        var curSlider = $(this);
        var newHTML =   '<ul>';
        curSlider.find('.main-architecture-view-slider-item').each(function() {
            newHTML +=      '<li><a href="#">' + $(this).attr('data-title') + '</a></li>';
        });
        newHTML +=      '</ul>';
        curSlider.find('.main-architecture-view-slider-titles').html(newHTML);
        curSlider.find('.main-architecture-view-slider-titles li').eq(0).addClass('active');
        curSlider.find('.main-architecture-view-slider-fraction strong').html(curSlider.find('.main-architecture-view-slider-item').length);
        var swiper = new Swiper(curSlider.find('.swiper')[0], {
            loop: true,
            slidesPerView: 1,
            navigation: {
                nextEl: curSlider.find('.swiper-button-next')[0],
                prevEl: curSlider.find('.swiper-button-prev')[0]
            },
            on: {
                realIndexChange: function () {
                    curSlider.find('.main-architecture-view-slider-fraction span').html(swiper.realIndex + 1);
                    curSlider.find('.main-architecture-view-slider-titles li.active').removeClass('active');
                    curSlider.find('.main-architecture-view-slider-titles li').eq(swiper.realIndex).addClass('active');
                },
            },
        });
        curSlider.find('.main-architecture-view-slider-titles li a').click(function(e) {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                var curIndex = curSlider.find('.main-architecture-view-slider-titles li').index(curLi);
                swiper.slideTo(curIndex);
            }
            e.preventDefault();
        });
    });

    $('.main-architecture-halls-slider').each(function() {
        var curSlider = $(this);
        var curSliderIndex = 0;
        var newHTML =   '<div class="swiper">' +
                            '<div class="swiper-wrapper">';
        var countSlides = curSlider.find('.main-architecture-halls-slider-item').length;
        newHTML +=              '<div class="swiper-slide"><div class="main-architecture-halls-slider-prev-item" style="' + curSlider.find('.main-architecture-halls-slider-item').eq(countSlides - 1).attr('style') + '"></div></div>';
        for (var i = 0; i < countSlides - 1; i++) {
            newHTML +=          '<div class="swiper-slide"><div class="main-architecture-halls-slider-prev-item" style="' + curSlider.find('.main-architecture-halls-slider-item').eq(i).attr('style') + '"></div></div>';
        }
        newHTML +=          '</div>' +
                        '</div>';
        curSlider.find('.main-architecture-halls-slider-prev').html(newHTML);
        curSlider.find('.main-architecture-halls-slider-fraction strong').html(countSlides);
        var swiperPrev = new Swiper(curSlider.find('.main-architecture-halls-slider-prev .swiper')[0], {
            loop: true,
            slidesPerView: 1,
            allowTouchMove: false
        });
        var swiper = new Swiper(curSlider.find('.main-architecture-halls-slider-list .swiper')[0], {
            loop: true,
            slidesPerView: 1,
            navigation: {
                nextEl: curSlider.find('.swiper-button-next')[0],
                prevEl: curSlider.find('.swiper-button-prev')[0]
            },
            on: {
                realIndexChange: function () {
                    curSlider.find('.main-architecture-halls-slider-fraction span').html(swiper.realIndex + 1);
                    curSliderIndex = swiper.realIndex;
                },
                slideNextTransitionStart: function() {
                    swiperPrev.slideNext();
                },
                slidePrevTransitionStart: function() {
                    swiperPrev.slidePrev();
                },
            },
        });
    });

    $('.main-comfort-item-photo, .main-comfort-item-content h3').click(function() {
        var curItem = $(this).parents().filter('.main-comfort-item');
        curItem.toggleClass('open');
    });

    $('.main-neighbors-center-slider').each(function() {
        var curSlider = $(this);
        var newHTML =   '<ul>';
        curSlider.find('.main-neighbors-center-slider-item').each(function() {
            newHTML +=      '<li><a href="#">' + $(this).attr('data-title') + '</a></li>';
        });
        newHTML +=      '</ul>';
        curSlider.find('.main-neighbors-center-slider-titles').html(newHTML);
        curSlider.find('.main-neighbors-center-slider-titles li').eq(0).addClass('active');
        curSlider.find('.main-neighbors-center-slider-fraction strong').html(curSlider.find('.main-neighbors-center-slider-item').length);
        var swiper = new Swiper(curSlider.find('.swiper')[0], {
            loop: true,
            slidesPerView: 1,
            navigation: {
                nextEl: curSlider.find('.swiper-button-next')[0],
                prevEl: curSlider.find('.swiper-button-prev')[0]
            },
            on: {
                realIndexChange: function () {
                    curSlider.find('.main-neighbors-center-slider-fraction span').html(swiper.realIndex + 1);
                    curSlider.find('.main-neighbors-center-slider-titles li.active').removeClass('active');
                    curSlider.find('.main-neighbors-center-slider-titles li').eq(swiper.realIndex).addClass('active');
                },
            },
        });
        curSlider.find('.main-neighbors-center-slider-titles li a').click(function(e) {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                var curIndex = curSlider.find('.main-neighbors-center-slider-titles li').index(curLi);
                swiper.slideTo(curIndex);
            }
            e.preventDefault();
        });
    });

    $('.main-space-right-fraction').each(function() {
        $('.main-space-right-fraction strong').html($('.main-space-right-titles ul li').length);
    });

    $('.main-space-right-titles ul li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.main-space-right-titles ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.main-space-right-titles ul li').index(curLi);
            $('.main-space-right-fraction span').html(curIndex + 1);
            var curType = curLi.attr('data-type');
            $('.main-space-map-placemark').addClass('visible');
            if (curType != '') {
                $('.main-space-map-placemark').removeClass('visible');
                $('.main-space-map-placemark[data-type="' + curType + '"]').addClass('visible');
            }
        }
        e.preventDefault();
    });

    $('.main-space-right-button-prev').click(function(e) {
        var curIndex = $('.main-space-right-titles ul li').index($('.main-space-right-titles ul li.active'));
        curIndex--;
        if (curIndex < 0) {
            curIndex = $('.main-space-right-titles ul li').length - 1;
        }
        $('.main-space-right-titles ul li').eq(curIndex).find('a').trigger('click');
        e.preventDefault();
    });

    $('.main-space-right-button-next').click(function(e) {
        var curIndex = $('.main-space-right-titles ul li').index($('.main-space-right-titles ul li.active'));
        curIndex++;
        if (curIndex > $('.main-space-right-titles ul li').length - 1) {
            curIndex = 0;
        }
        $('.main-space-right-titles ul li').eq(curIndex).find('a').trigger('click');
        e.preventDefault();
    });

    $('.main-space-commercial-slider').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider.find('.swiper')[0], {
            loop: true,
            slidesPerView: 1,
            effect: 'fade',
            autoplay: {
                delay: 500,
                disableOnInteraction: false,
            },
            allowTouchMove: false
        });
    });

    $('.main-production-scheme-item-icon').click(function() {
        var curItem = $(this).parents().filter('.main-production-scheme-item');
        if (curItem.hasClass('open')) {
            curItem.removeClass('open');
        } else {
            $('.main-production-scheme-item.open').removeClass('open');
            curItem.addClass('open');
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.main-production-scheme-item').length == 0) {
            $('.main-production-scheme-item.open').removeClass('open');
        }
    });

    $('.main-progress-list').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider.find('.swiper')[0], {
            loop: false,
            slidesPerView: 1,
            navigation: {
                nextEl: curSlider.find('.swiper-button-next')[0],
                prevEl: curSlider.find('.swiper-button-prev')[0]
            },
            breakpoints: {
                901: {
                    slidesPerView: 4,
                },
            }
        });
    });

    $('[data-fancybox]').fancybox({
        hideScrollbar: false,
        buttons : [
            'close'
        ],
        lang : 'ru',
        i18n : {
            'ru' : {
                CLOSE   : 'Закрыть'
            }
        }
    });

    $('.detail-scheme-switch-mobile').html($('.detail-scheme-switch').html());
    $('.detail-info-mobile').html($('.detail-info').html());
    $('.detail-build-mobile').html($('.detail-left-build').html());
    $('.detail-floor-mobile').html($('.detail-left-floor').html());

    $('.detail-scheme-switch a').click(function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('active')) {
            $('.detail-scheme-switch a.active').removeClass('active');
            $('.detail-scheme-switch-mobile a.active').removeClass('active');
            curLink.addClass('active');
            var curIndex = $('.detail-scheme-switch a').index(curLink);
            $('.detail-scheme-switch-mobile a').eq(curIndex).addClass('active');
            if (curIndex == 0) {
                $('.detail-scheme-inner').addClass('active');
            } else {
                $('.detail-scheme-inner').removeClass('active');
            }
        }
        e.preventDefault();
    });

    $('.detail-scheme-switch-mobile a').click(function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('active')) {
            $('.detail-scheme-switch-mobile a.active').removeClass('active');
            $('.detail-scheme-switch a.active').removeClass('active');
            curLink.addClass('active');
            var curIndex = $('.detail-scheme-switch-mobile a').index(curLink);
            $('.detail-scheme-switch a').eq(curIndex).addClass('active');
            if (curIndex == 0) {
                $('.detail-scheme-inner').addClass('active');
            } else {
                $('.detail-scheme-inner').removeClass('active');
            }
        }
        e.preventDefault();
    });

    $('.detail-help-share .detail-help-item-inner > a').click(function(e) {
        $('.detail-help-share').toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.detail-help-share').length == 0) {
            $('.detail-help-share').removeClass('open');
        }
    });

    $('.detail-block-title').click(function() {
        $(this).parent().toggleClass('open');
    });

    $('.list').each(function() {
        if ($('.list .swiper-slide').length > 4) {
            $('.list-more').addClass('visible');
        }
    });

    $('.list-more a').click(function(e) {
        $('.list').addClass('open');
        e.preventDefault();
    });

});

function initForm(curForm) {
    curForm.find('input.phoneRU').attr('autocomplete', 'off');
    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('.form-input input, .form-input textarea').focus(function() {
        $(this).parent().addClass('focus');
    });

    curForm.find('.form-input input, .form-input textarea').blur(function(e) {
        $(this).parent().removeClass('focus');
        if ($(this).val() == '') {
            $(this).parent().removeClass('full');
        } else {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('input[autofocus]').trigger('focus');

    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            var curForm = $(form);
            if (!curForm.find('.form-submit button').prop('disabled')) {
                if (curForm.hasClass('ajax-form')) {
                    curForm.find('.form-submit input').prop('disabled', true);
                    curForm.addClass('loading');
                    var formData = new FormData(form);

                    $.ajax({
                        type: 'POST',
                        url: curForm.attr('attr-action'),
                        processData: false,
                        contentType: false,
                        dataType: 'json',
                        data: formData,
                        cache: false
                    }).fail(function(jqXHR, textStatus, errorThrown) {
                        curForm.parent().append('<div class="window-success-title">Сервис временно недоступен, попробуйте позже.</div><div class="window-success-btn"><a href="#" class="btn window-close-btn">Продолжить знакомство</a></div>');
                        curForm.remove();
                    }).done(function(data) {
                        curForm.parent().append('<div class="window-success-title">' + data.message + '</div><div class="window-success-btn"><a href="#" class="btn window-close-btn">Продолжить знакомство</a></div>');
                        curForm.remove();
                    });
                } else {
                    form.submit();
                }
            }
        }
    });
}

function windowOpen(linkWindow, dataWindow) {
    if ($('.window').length == 0) {
        var curPadding = $('.wrapper').width();
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
    } else {
        $('.window').append('<div class="window-loading"></div>')
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window-container').length == 0) {
            $('.window').html('<div class="window-container">' + html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');
        } else {
            $('.window-container').html(html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a>');
            $('.window .window-loading').remove();
        }

        $('.window form').each(function() {
            initForm($(this));
            var windowLink = $('.window-link.last-active');
            if (windowLink.length == 1 && typeof windowLink.attr('data-hiddenname') != 'undefined' && typeof windowLink.attr('data-hiddenvalue') != 'undefined') {
                $(this).append('<input type="hidden" name="' + windowLink.attr('data-hiddenname') + '" value="' + windowLink.attr('data-hiddenvalue') + '">');
            }
        });
    });
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
        $('.wrapper').css({'top': 0});
        $(window).scrollTop($('.wrapper').data('curScroll'));
    }
}

var mainNeighborsWhatSwiper;
var listSwiper;

$(window).on('load resize', function() {
    var windowWidth = $(window).width();

    $('.main-comfort-text').each(function() {
        $('.main-comfort-text').css({'min-height': '0'});
        $('.main-comfort-text').css({'min-height': $('.main-comfort-text-inner').height() + 'px'});
    });

    $('.main-architecture-top').each(function() {
        $('.main-architecture-top').css({'min-height': '0'});
        $('.main-architecture-top').css({'min-height': $('.main-architecture-top-container').height() + 'px'});
    });

    if (windowWidth > 900) {
        $('.main-neighbors-what-list .swiper').each(function() {
            var curSlider = $(this);
            if (curSlider.hasClass('swiper-initialized') && mainNeighborsWhatSwiper) {
                mainNeighborsWhatSwiper.destroy();
            }
        });
    } else {
        $('.main-neighbors-what-list .swiper').each(function() {
            var curSlider = $(this);
            if (!curSlider.hasClass('swiper-initialized')) {
                mainNeighborsWhatSwiper = new Swiper(curSlider[0], {
                    slidesPerView: 1,
                    loop: false
                });
            }
        });
    }

    if (windowWidth < 901) {
        $('.list').each(function() {
            var curSlider = $(this);
            if (curSlider.find('.swiper').hasClass('swiper-initialized') && listSwiper) {
                listSwiper.destroy();
            }
        });
    } else {
        $('.list').each(function() {
            var curSlider = $(this);
            if (!curSlider.find('.swiper').hasClass('swiper-initialized')) {
                listSwiper = new Swiper(curSlider.find('.swiper')[0], {
                    slidesPerView: 4,
                    loop: false,
                    navigation: {
                        nextEl: curSlider.find('.swiper-button-next')[0],
                        prevEl: curSlider.find('.swiper-button-prev')[0]
                    },
                    pagination: {
                        el: curSlider.find('.swiper-pagination')[0],
                        type: 'progressbar'
                    },
                });
            }
        });
    }
});

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();

    var windowWidth = $(window).width();

    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    var windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    if (windowScroll > 0) {
        $('header').addClass('fixed');
    } else {
        $('header').removeClass('fixed');
    }

    $('.main-family-slider-container').each(function() {
        var startAnimation = $('.main-family-slider-container').offset().top;
        var stopAnimation = $('.main-family-slider-container').offset().top + windowHeight * 1 / 2;
        var curPercent = 0;
        if (windowScroll + windowHeight > startAnimation) {
            if (windowScroll + windowHeight < stopAnimation) {
                curPercent = 1 - (stopAnimation - (windowScroll + windowHeight)) / (stopAnimation - startAnimation);
            } else {
                curPercent = 1;
            }
        } else {
            curPercent = 0;
        }
        var firstOffset = 0.05 * windowWidth;
        var secondOffset = 0.21 * windowWidth;
        var thirdOffset = 0.42 * windowWidth;
        $('.main-family-slider-item').each(function() {
            var curItem = $(this);
            curItem.find('.main-family-slider-item-photo').eq(0).css({'transform': 'translateY(' + (firstOffset - curPercent * firstOffset) + 'px)'});
            curItem.find('.main-family-slider-item-photo').eq(1).css({'transform': 'translateY(' + (secondOffset - curPercent * secondOffset) + 'px)'});
            curItem.find('.main-family-slider-item-photo').eq(2).css({'transform': 'translateY(' + (thirdOffset - curPercent * thirdOffset) + 'px)'});
        });
    });

    $('.main-project-bottom').each(function() {
        var startAnimation = $('.main-project-bottom').offset().top;
        var stopAnimation = $('.main-project-bottom').offset().top + $('.main-project-bottom').outerHeight();
        var curPercent = 0;
        if (windowScroll + windowHeight > startAnimation) {
            if (windowScroll + windowHeight < stopAnimation) {
                curPercent = 1 - (stopAnimation - (windowScroll + windowHeight)) / (stopAnimation - startAnimation);
            } else {
                curPercent = 1;
            }
        } else {
            curPercent = 0;
        }
        $('.main-project-star svg').css({'transform': 'scale(' + (0.5 + curPercent * 0.5) + ')'});
        $('.main-project-home').css({'bottom': (-4.58 + curPercent * 3.49) + 'vw'});
    });

    $('.main-architecture-top').each(function() {
        if (windowScroll + windowHeight >= $('.main-architecture-top').offset().top + $('.main-architecture-top').outerHeight()) {
            $('.main-architecture-top').addClass('fixed');
            $('.main-architecture-top-container').css({'top': windowHeight - $('.main-architecture-top').outerHeight()});
            if (windowScroll >= $('.main-architecture-bottom').offset().top) {
                $('.main-architecture-top').removeClass('fixed');
                $('.main-architecture-top-container').css({'top': 'auto'});
            }
        } else {
            $('.main-architecture-top').removeClass('fixed');
            $('.main-architecture-top-container').css({'top': 'auto'});
        }
    });

    $('.main-architecture-top-home').each(function() {
        var startAnimation = $('.main-architecture-top').offset().top - windowHeight / 3;
        var stopAnimation = $('.main-architecture-top').offset().top + $('.main-architecture-top').outerHeight() - windowHeight;
        var curPercent = 0;
        if (windowScroll > startAnimation) {
            if (windowScroll < stopAnimation) {
                curPercent = (windowScroll - startAnimation) / (stopAnimation - startAnimation);
            } else {
                curPercent = 1;
            }
        } else {
            curPercent = 0;
        }
        var curOffsetIMG = $('.main-architecture-top-home img').outerHeight() - $('.main-architecture-top').outerHeight();
        $('.main-architecture-top-home img').css({'transform': 'translateY(-' + (curOffsetIMG * curPercent) + 'px)'});
    });

    $('.main-architecture-top-bg').each(function() {
        var startAnimation = $('.main-architecture-top').offset().top - windowHeight;
        var stopAnimation = $('.main-architecture-top').offset().top + $('.main-architecture-top').outerHeight() - windowHeight;
        var curPercent = 0;
        if (windowScroll > startAnimation) {
            if (windowScroll < stopAnimation) {
                curPercent = (windowScroll - startAnimation) / (stopAnimation - startAnimation);
            } else {
                curPercent = 1;
            }
        } else {
            curPercent = 0;
        }
        var curOffsetBG = $('.main-architecture-top-bg img').outerHeight() - $('.main-architecture-top').outerHeight();
        $('.main-architecture-top-bg img').css({'transform': 'translateY(-' + (curOffsetBG * curPercent) + 'px)'});
    });

    $('.main-architecture-halls-slider').each(function() {
        var startAnimation = $('.main-architecture-halls-slider').offset().top;
        var stopAnimation = $('.main-architecture-halls-slider').offset().top + windowHeight * 3 / 4;
        var curPercent = 0;
        if (windowScroll + windowHeight > startAnimation) {
            if (windowScroll + windowHeight < stopAnimation) {
                curPercent = 1 - (stopAnimation - (windowScroll + windowHeight)) / (stopAnimation - startAnimation);
            } else {
                curPercent = 1;
            }
        } else {
            curPercent = 0;
        }
        var leftOffset = 0.05 * windowWidth;
        var rightOffset = 0.21 * windowWidth;
        $('.main-architecture-halls-slider-left').css({'transform': 'translateY(' + (leftOffset - curPercent * leftOffset) + 'px)'});
        $('.main-architecture-halls-slider-right').css({'transform': 'translateY(' + (rightOffset - curPercent * rightOffset) + 'px)'});
    });

    $('.main-architecture-view-slider').each(function() {
        var startAnimation = $('.main-architecture-view-slider').offset().top;
        var stopAnimation = $('.main-architecture-view-slider').offset().top + windowHeight * 3 / 4;
        var curPercent = 0;
        if (windowScroll + windowHeight > startAnimation) {
            if (windowScroll + windowHeight < stopAnimation) {
                curPercent = 1 - (stopAnimation - (windowScroll + windowHeight)) / (stopAnimation - startAnimation);
            } else {
                curPercent = 1;
            }
        } else {
            curPercent = 0;
        }
        var leftOffset = 0.05 * windowWidth;
        var rightOffset = 0.21 * windowWidth;
        $('.main-architecture-view-slider-left').css({'transform': 'translateY(' + (leftOffset - curPercent * leftOffset) + 'px)'});
        $('.main-architecture-view-slider-right').css({'transform': 'translateY(' + (rightOffset - curPercent * rightOffset) + 'px)'});
    });

    $('.main-comfort-header').each(function() {
        var startAnimation = $('.main-comfort-header').offset().top - windowHeight;
        var stopAnimation = $('.main-comfort-header').offset().top + $('.main-comfort-header').outerHeight();
        var curPercent = 0;
        if (windowScroll > startAnimation) {
            if (windowScroll < stopAnimation) {
                curPercent = (windowScroll - startAnimation) / (stopAnimation - startAnimation);
            } else {
                curPercent = 1;
            }
        } else {
            curPercent = 0;
        }
        var curOffset = $('.main-comfort-header-img img').outerHeight() - $('.main-comfort-header-img').outerHeight();
        $('.main-comfort-header-img img').css({'transform': 'translateY(-' + (curOffset * curPercent) + 'px)'});
    });

    $('.main-comfort-text').each(function() {
        var curTop = 0.0843 * windowWidth;
        if (windowScroll + curTop > $('.main-comfort-container').offset().top) {
            $('.main-comfort-text').addClass('fixed');
            if (windowScroll + curTop + $('.main-comfort-text').height() > $('.main-comfort-container').offset().top + $('.main-comfort-container').height()) {
                $('.main-comfort-text-inner').css({'margin-top': ($('.main-comfort-container').offset().top + $('.main-comfort-container').height()) - (windowScroll + curTop + $('.main-comfort-text').height())});
            } else {
                $('.main-comfort-text-inner').css({'margin-top': 0});
            }
        } else {
            $('.main-comfort-text').removeClass('fixed');
            $('.main-comfort-text-inner').css({'margin-top': 0});
        }
    });

    $('.main-neighbors-header').each(function() {
        var startAnimation = $('.main-neighbors-header').offset().top - windowHeight;
        var stopAnimation = $('.main-neighbors-header').offset().top + $('.main-neighbors-header').outerHeight();
        var curPercent = 0;
        if (windowScroll > startAnimation) {
            if (windowScroll < stopAnimation) {
                curPercent = (windowScroll - startAnimation) / (stopAnimation - startAnimation);
            } else {
                curPercent = 1;
            }
        } else {
            curPercent = 0;
        }
        var curOffset = $('.main-neighbors-header-img img').outerHeight() - $('.main-neighbors-header-img').outerHeight();
        $('.main-neighbors-header-img img').css({'transform': 'translateY(-' + (curOffset * curPercent) + 'px)'});
    });

    $('.main-neighbors-center-slider').each(function() {
        var startAnimation = $('.main-neighbors-center-slider').offset().top;
        var stopAnimation = $('.main-neighbors-center-slider').offset().top + windowHeight * 3 / 4;
        var curPercent = 0;
        if (windowScroll + windowHeight > startAnimation) {
            if (windowScroll + windowHeight < stopAnimation) {
                curPercent = 1 - (stopAnimation - (windowScroll + windowHeight)) / (stopAnimation - startAnimation);
            } else {
                curPercent = 1;
            }
        } else {
            curPercent = 0;
        }
        var leftOffset = 0.05 * windowWidth;
        var rightOffset = 0.21 * windowWidth;
        $('.main-neighbors-center-slider-left').css({'transform': 'translateY(' + (leftOffset - curPercent * leftOffset) + 'px)'});
        $('.main-neighbors-center-slider-right').css({'transform': 'translateY(' + (rightOffset - curPercent * rightOffset) + 'px)'});
    });

    $('.main-parking-container').each(function() {
        var startAnimation = $('.main-parking-container').offset().top;
        var stopAnimation = $('.main-parking-container').offset().top + windowHeight * 3 / 4;
        var curPercent = 0;
        if (windowScroll + windowHeight > startAnimation) {
            if (windowScroll + windowHeight < stopAnimation) {
                curPercent = 1 - (stopAnimation - (windowScroll + windowHeight)) / (stopAnimation - startAnimation);
            } else {
                curPercent = 1;
            }
        } else {
            curPercent = 0;
        }
        var leftOffset = 0.05 * windowWidth;
        var rightOffset = 0.21 * windowWidth;
        $('.main-parking-left').css({'transform': 'translateY(' + (leftOffset - curPercent * leftOffset) + 'px)'});
        $('.main-parking-right').css({'transform': 'translateY(' + (rightOffset - curPercent * rightOffset) + 'px)'});
    });

    $('.main-space-header').each(function() {
        var startAnimation = $('.main-space-header').offset().top - windowHeight;
        var stopAnimation = $('.main-space-header').offset().top + $('.main-space-header').outerHeight();
        var curPercent = 0;
        if (windowScroll > startAnimation) {
            if (windowScroll < stopAnimation) {
                curPercent = (windowScroll - startAnimation) / (stopAnimation - startAnimation);
            } else {
                curPercent = 1;
            }
        } else {
            curPercent = 0;
        }
        var curOffset = $('.main-space-header-img img').outerHeight() - $('.main-space-header-img').outerHeight();
        $('.main-space-header-img img').css({'transform': 'translateY(-' + (curOffset * curPercent) + 'px)'});
    });

    $('.main-space-container').each(function() {
        var startAnimation = $('.main-space-container').offset().top;
        var stopAnimation = $('.main-space-container').offset().top + windowHeight * 3 / 4;
        var curPercent = 0;
        if (windowScroll + windowHeight > startAnimation) {
            if (windowScroll + windowHeight < stopAnimation) {
                curPercent = 1 - (stopAnimation - (windowScroll + windowHeight)) / (stopAnimation - startAnimation);
            } else {
                curPercent = 1;
            }
        } else {
            curPercent = 0;
        }
        var leftOffset = 0.05 * windowWidth;
        var rightOffset = 0.21 * windowWidth;
        $('.main-space-left').css({'transform': 'translateY(' + (leftOffset - curPercent * leftOffset) + 'px)'});
        $('.main-space-right').css({'transform': 'translateY(' + (rightOffset - curPercent * rightOffset) + 'px)'});
    });

    $('.main-space-commercial-welcome').each(function() {
        var startAnimation = $('.main-space-commercial-welcome').offset().top - windowHeight;
        var stopAnimation = $('.main-space-commercial-welcome').offset().top + $('.main-space-commercial-welcome').outerHeight();
        var curPercent = 0;
        if (windowScroll > startAnimation) {
            if (windowScroll < stopAnimation) {
                curPercent = (windowScroll - startAnimation) / (stopAnimation - startAnimation);
            } else {
                curPercent = 1;
            }
        } else {
            curPercent = 0;
        }
        var curOffset = $('.main-space-commercial-welcome img').outerHeight() - $('.main-space-commercial-welcome').outerHeight();
        $('.main-space-commercial-welcome img').css({'transform': 'translateY(-' + (curOffset * curPercent) + 'px)'});
    });

    $('.main-space-commercial-content').each(function() {
        var startAnimation = $('.main-space-commercial-content').offset().top;
        var stopAnimation = $('.main-space-commercial-content').offset().top + windowHeight * 3 / 4;
        var curPercent = 0;
        if (windowScroll + windowHeight > startAnimation) {
            if (windowScroll + windowHeight < stopAnimation) {
                curPercent = 1 - (stopAnimation - (windowScroll + windowHeight)) / (stopAnimation - startAnimation);
            } else {
                curPercent = 1;
            }
        } else {
            curPercent = 0;
        }
        var leftOffset = 0.05 * windowWidth;
        var rightOffset = 0.21 * windowWidth;
        $('.main-space-commercial-text').css({'transform': 'translateY(' + (leftOffset - curPercent * leftOffset) + 'px)'});
        $('.main-space-commercial-slider').css({'transform': 'translateY(' + (rightOffset - curPercent * rightOffset) + 'px)'});
    });

    $('.main-production-header').each(function() {
        var startAnimation = $('.main-production-header').offset().top - windowHeight;
        var stopAnimation = $('.main-production-header').offset().top + $('.main-production-header').outerHeight();
        var curPercent = 0;
        if (windowScroll > startAnimation) {
            if (windowScroll < stopAnimation) {
                curPercent = (windowScroll - startAnimation) / (stopAnimation - startAnimation);
            } else {
                curPercent = 1;
            }
        } else {
            curPercent = 0;
        }
        var curOffset = $('.main-production-header-img img').outerHeight() - $('.main-production-header-img').outerHeight();
        $('.main-production-header-img img').css({'transform': 'translateY(-' + (curOffset * curPercent) + 'px)'});
    });

    $('.main-select').each(function() {
        var startAnimation = $('.main-select').offset().top - windowHeight;
        var stopAnimation = $('.main-select').offset().top + $('.main-select').outerHeight() - windowHeight;
        var curPercent = 0;
        if (windowScroll > startAnimation) {
            if (windowScroll < stopAnimation) {
                curPercent = (windowScroll - startAnimation) / (stopAnimation - startAnimation);
            } else {
                curPercent = 1;
            }
        } else {
            curPercent = 0;
        }
        $('.main-select-link').css({'transform': 'translateY(' + (100 - curPercent * 100) + '%)'});
        $('.main-select-img-inner').css({'transform': 'scale(' + (1 + (0.25 - curPercent * 0.25)) + ')'});
    });

    if ($('.select-filter-link').length == 1) {
        if (windowScroll + windowHeight > $('footer').offset().top) {
            $('.select-filter-link').css({'margin-bottom': (windowScroll + windowHeight) - ($('footer').offset().top)});
        } else {
            $('.select-filter-link').css({'margin-bottom': 0});
        }
    }

    if ($('.detail-link').length == 1) {
        if (windowScroll + windowHeight > $('footer').offset().top) {
            $('.detail-link').css({'margin-bottom': (windowScroll + windowHeight) - ($('footer').offset().top)});
        } else {
            $('.detail-link').css({'margin-bottom': 0});
        }
    }

});

$(document).ready(function() {

    $('.select-params').each(function() {
        updateSelectParams();
    });

    $('.select-filter-group-title').click(function() {
        $(this).parent().toggleClass('open');
    });

    $('.select-filter-building-item').click(function() {
        var curItem = $(this);
        curItem.toggleClass('active');
        $('.select-filter-building input[value="' + curItem.attr('data-id') + '"]').prop('checked', curItem.hasClass('active'));
    });

    $('.select-filter-building-item').each(function() {
        var curItem = $(this);
        if ($('.select-filter-building input[value="' + curItem.attr('data-id') + '"]').prop('checked')) {
            curItem.addClass('active');
        } else {
            curItem.removeClass('active');
        }
    });

    $('.select-filter-slider').each(function() {
        var curSlider = $(this);
        var curRange = curSlider.find('.select-filter-slider-range-inner')[0];
        var curStartFrom = Number(curSlider.find('.select-filter-slider-min').html());
        if (Number(curSlider.find('.select-filter-slider-from').val()) !== 0) {
            curStartFrom = Number(curSlider.find('.select-filter-slider-from').val());
        }
        var curStartTo = Number(curSlider.find('.select-filter-slider-max').html());
        if (Number(curSlider.find('.select-filter-slider-to').val()) !== 0) {
            curStartTo = Number(curSlider.find('.select-filter-slider-to').val());
        }
        noUiSlider.create(curRange, {
            start: [curStartFrom, curStartTo],
            connect: true,
            range: {
                'min': Number(curSlider.find('.select-filter-slider-min').html()),
                'max': Number(curSlider.find('.select-filter-slider-max').html())
            },
            step: Number(curSlider.find('.select-filter-slider-step').html()),
            format: wNumb({
                decimals: 0
            })
        });
        curRange.noUiSlider.on('update', function(values, handle) {
            if (handle == 0) {
                curSlider.find('.select-filter-slider-from').val(values[handle]);
                curSlider.find('.select-filter-slider-text-from span').html(values[handle]);
            } else {
                curSlider.find('.select-filter-slider-to').val(values[handle]);
                curSlider.find('.select-filter-slider-text-to span').html(values[handle]);
            }
        });
    });

    $('.select-filter-container form').each(function() {
        var curForm = $(this);
        var validator = curForm.validate();
        if (validator) {
            validator.destroy();
        }
        curForm.validate({
            ignore: '',
            submitHandler: function(form) {
                updateSelectList();
            }
        });
    });

    $('.select-filter-clear a').click(function(e) {
        $('.select-filter-building-item').each(function() {
            var curItem = $(this);
            $('.select-filter-building input[value="' + curItem.attr('data-id') + '"]').prop('checked', false);
            curItem.removeClass('active');
        });
        $('.select-filter-rooms input').prop('checked', false);
        $('.select-filter-slider').each(function() {
            var curSlider = $(this);
            var curRange = curSlider.find('.select-filter-slider-range-inner')[0];
            curRange.noUiSlider.set([Number(curSlider.find('.select-filter-slider-min').html()), Number(curSlider.find('.select-filter-slider-max').html())]);
        });
        updateSelectList();
        e.preventDefault();
    });

    $('.select-list-more a').click(function(e) {
        var countVisible = $('.select-list-item.visible').length;
        countVisible += listSize;
        $('.select-list-item:lt(' + countVisible + ')').addClass('visible');
        if ($('.select-list-item:not(.visible)').length == 0) {
            $('.select-list-more').removeClass('visible');
        }
        e.preventDefault();
    });

    $('.select-filter-link').click(function(e) {
        var curScroll = $(window).scrollTop();
        $('html').addClass('select-filter-open');
        $('.wrapper').data('curScroll', curScroll);

        e.preventDefault();
    });

    $('.select-filter-close a').click(function(e) {
        $('html').removeClass('select-filter-open');
        $(window).scrollTop($('.wrapper').data('curScroll'));

        e.preventDefault();
    });

});

var dataSelect = null;

function updateSelectParams() {
    var curForm = $('.select-filter-container form');
    var formData = new FormData(curForm[0]);
    $.ajax({
        type: 'POST',
        url: curForm.attr('action'),
        processData: false,
        contentType: false,
        dataType: 'json',
        data: formData,
        cache: false
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert('Сервис временно недоступен, попробуйте позже.');
    }).done(function(data) {
        dataSelect = data;
        updateSelectList();
    });
}

var listSize = 10;

function updateSelectList() {
    var newData = [];
    if (typeof(dataSelect) != 'undefined') {
        for (var i = 0; i < dataSelect.buildings.length; i++) {
            var curBuild = dataSelect.buildings[i];
            if ($('.select-filter-building input:checked').length == 0 || $('.select-filter-building input[value="' + curBuild.id + '"]:checked').length == 1) {
                for (var k = 0; k < curBuild.flats.length; k++) {
                    var curFlat = curBuild.flats[k];
                    curFlat.buildtitle = curBuild.title;
                    if ($('.select-filter-rooms input:checked').length == 0 || $('.select-filter-rooms input[value="' + curFlat.rooms + '"]:checked').length == 1) {
                        var flatSize = Number(String(curFlat.size).replace(',', '.'));
                        var sizeCorrect = false;
                        var minSize = Number($('.select-filter-size-from').val());
                        var maxSize = Number($('.select-filter-size-to').val());
                        if (flatSize >= minSize && flatSize <= maxSize) {
                            sizeCorrect = true;
                        }

                        var flatPrice = Number(String(curFlat.price).replace(',', '.'));
                        var priceCorrect = false;
                        var minPrice = Number($('.select-filter-price-from').val()) * 1000000;
                        var maxPrice = Number($('.select-filter-price-to').val()) * 1000000;
                        if (flatPrice >= minPrice && flatPrice <= maxPrice) {
                            priceCorrect = true;
                        }

                        if (sizeCorrect && priceCorrect) {
                            newData.push(curFlat);
                        }
                    }
                }
            }
        }
    }

    var htmlList = '';
    var titlePrice = $('.select-list-content').attr('data-titleprice');
    var titleFlat = $('.select-list-content').attr('data-titleflat');
    var titleRoom = $('.select-list-content').attr('data-titleroom');
    var titleSize = $('.select-list-content').attr('data-titlesize');
    var titleEmpty = $('.select-list-content').attr('data-titleempty');
    for (var i = 0; i < newData.length; i++) {
        var curFlat = newData[i];
        htmlList += '<a href="' + curFlat.url + '" class="select-list-item">' +
                        '<div class="select-list-item-build-mobile">' + curFlat.buildtitle + '</div>' +
                        '<div class="select-list-item-scheme"><img src="' + curFlat.preview + '" alt=""></div>' +
                        '<div class="select-list-item-content">' +
                            '<div class="select-list-item-build">' + curFlat.buildtitle + '</div>' +
                            '<div class="select-list-item-params">' +
                                '<div class="select-list-item-param"><em>' + titlePrice + '</em> <span>' + String(curFlat.price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&nbsp;') + '&nbsp;₽</span></div>' +
                                '<div class="select-list-item-param">' + titleFlat + ' <span>' + curFlat.number + '</span></div>' +
                                '<div class="select-list-item-param">' + titleRoom + ' <span>' + curFlat.rooms + '</span></div>' +
                                '<div class="select-list-item-param">' + titleSize + ' <span>' + curFlat.size + ' м<sup>2</sup></span></div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="select-list-item-icon"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-plus"></use></svg></div>' +
                    '</a>';
    }

    $('.select-list-content').html(htmlList);
    $('.select-list-item:lt(' + listSize + ')').addClass('visible');
    if ($('.select-list-item:not(.visible)').length == 0) {
        $('.select-list-more').removeClass('visible');
    } else {
        $('.select-list-more').addClass('visible');
    }

    if (newData.length == 0) {
        $('.select-list-content').html('<div class="select-list-empty">' + titleEmpty + '</div>');
    }

    if ($('html').hasClass('select-filter-open')) {
        $('html').removeClass('select-filter-open');
        $(window).scrollTop($('.wrapper').data('curScroll'));
        $(window).trigger('scroll');
    }
}