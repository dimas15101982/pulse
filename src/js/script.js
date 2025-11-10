// карусель
$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1200,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [ // настройка карусели под маленький экран
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
    // включение вкладок для фитнеса/для бега/для триатлона
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    // включение кнопки "ПОДРОБНЕЕ" 1 вариант:

    // $('.catalog-item__link').each(function(i) {
    //     $(this).on('click', function(e){
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    // });

    // включение кнопки "НАЗАД" 1 вариант:

    // $('.catalog-item__back').each(function(i) {
    //     $(this).on('click', function(e){
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    // });


    // включение кнопок "ПОДРОБНЕЕ/НАЗАД" 2 вариант:
    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // запуск модального окна "заказать звонок" и "заказать консультацию"
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });
    // закрытие всех модальных окон
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    // // запуск модального окна "купить"
    // // $('.button_mini').on('click', function(){
    // //     $('.overlay, #order').fadeIn('slow');
    // });

    // запуск модального окна "купить" и подставновка названия товара в модальное окно "купить"
    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    // настройка валидации форм ввода данных(имя,телефон,email) - плагин jquery validation

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }

            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя!",
                    minlength: jQuery.validator.format("Введите не менее {0} cимволов!")
                },
                phone: "Пожалуйста, введите свой номер телефона!",
                email: {
                    required: "Пожалуйста, введите адрес электронной почты!",
                    email: "Неправильно введен адрес электронной почты!"
                }
            }
        });
    }
    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

// добавление маски дл яномера телефона в формы
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e){
        e.preventDefault(); // отмена стандартного поведения браузера (перезагрузка)
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

});