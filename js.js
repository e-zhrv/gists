$(function() {
    $('.show_prices').click(function() {
        var abon = $(this).parents('.card').find('h4').text(),
            cid = $(this).parents('.card').attr('id');
        $('#pricesModal').find('input[name="abon"]').val(abon);
        $('#pricesModal').find('input[name="cid"]').val(cid)
    });
    $('form.formsForm').submit(function() {
        var form = $(this),
            modal = form.parents('.modal'),
            height_btn = $("div.no2click").find(".btn_pink").outerHeight(),
            width_btn = $("div.no2click").find(".btn_pink").outerWidth() + parseInt($("div.no2click").css("padding-left")) + parseInt($("div.no2click").css("padding-right"));
        $('div.no2click div', form).show();
        $('div.no2click div').css({
            "width": +width_btn + "px"
        });
        $.post(form.attr('action'), form.serialize(), function(data) {
            if (form.hasClass('pricesForm')) {
                if (!form.hasClass('podolsk')) {
                    var card = form.find('input[name="cid"]').val(),
                        club = $('#pricesModal').find('input[name="club"]').val();

                    /* 01.05.2021 12:00 - 14:00
                    Добавлен функционал отправки в GTM события "Отправлена форма Узнать цену"
                    (для углублённой настройки GA4 и сквозной аналитики) */
                    var city = form.find('input[name="city"]').val();
                    var abon = form.find('input[name="abon"]').val();
                    dataLayer.push({
                        'event': 'js_SubmitForm_OrderPrice',
                        'tarif_id': card,
                        'club': club,
                        'city': city,
                        'card_title': abon
                    });

                    $('.card').find('.buy_box_price').removeClass('hidden');
                    $('.card').find('.show_prices').hide();
                    $('.card').find('.card_popup_open').removeClass('hidden');
                    $('#pricesModal').modal('hide');
                    localStorage.setItem('prices_shown2', 1);
                    var ph = num = h_price = 0;
                    $(".cards_wrapper .buy_box").each(function(index) {
                        if (num != 1) h_price = $(this).find(".buy_box_price").height();
                        if (h_price > ph) ph = h_price;
                        num++
                    });
                    $(".cards_wrapper .buy_box").height($(".cards_wrapper .buy_box").height() + ph);
                    $('.cards_wrapper .buy_box').not('.online_complex').find(".buy_box_price").height(ph)
                }else{

                    /* 01.05.2021 12:00 - 14:00
                    Добавлен функционал отправки в GTM события "Отправлена форма Узнать цену" */
                    dataLayer.push({'event': 'js_SubmitForm_OrderPrice'});

                    form.html(data);
                }
            } else {
                form.html(data);
                if (modal.attr('id') == 'firstVisitModal') {

                    /* 01.05.2021 12:00 - 14:00
                    Добавлены строчки отправки в GTM события "Отправлена форма Бесплатный визит / Тест драйв"
                    (для углублённой настройки GA4 и сквозной/ML аналитики)
                    Отложенный редирект нужен чтобы GTM успел обработать триггер и отправить в аналитики события */
                    var modal_title = $(modal).find('.modal-title').text();
                    dataLayer.push({
                        'event': 'js_SubmitForm_FreeVisit',
                        'card_title': modal_title,
                        'eventCallback' : function() {
                            // Редирект сработает сразу после того как будут выполнены GTM теги связанные с триггером js_SubmitForm_QUIZ
                            console.log('eventCallback redirect');
                            window.location = 'https://alexfitness.ru/fvisit_ok';
                        }
                    });
                    setTimeout(function(){
                        // (запасной вариант) Если по какой-то причине eventCallback не сработает, будет хард редирект через 3 секунды
                        window.location = 'https://alexfitness.ru/fvisit_ok';
                    } , 3000);

                    // Старый редирект
                    //window.location = 'https://alexfitness.ru/fvisit_ok';

                } else if (modal.attr('id') == 'myModal4') {

                    /* 01.05.2021 12:00 - 14:00
                    Добавлены строчки отправки в GTM события "Отправлена форма Заказать звонок / Перезвоните мне"
                    (для углублённой настройки GA4 и сквозной аналитики)
                    Отложенный редирект нужен чтобы GTM успел обработать триггер и отправить в аналитики события */

                    dataLayer.push({
                        'event': 'js_SubmitForm_CallToMe',
                        'eventCallback' : function() {
                            // Редирект сработает сразу после того как будут выполнены GTM теги связанные с триггером js_SubmitForm_QUIZ
                            console.log('eventCallback redirect');
                            window.location = 'https://alexfitness.ru/callback_ok';
                        }
                    });
                    setTimeout(function(){
                        // (запасной вариант) Если по какой-то причине eventCallback не сработает, будет хард редирект через 3 секунды
                        window.location = 'https://alexfitness.ru/callback_ok';
                    } , 3000);

                    // Старый редирект
                    //window.location = 'https://alexfitness.ru/callback_ok'
                }else {
                    dataLayer.push({
                        'event': 'js_SubmitForm_CallToMe_without_popup'
                    });
                }
            }
        });
        return !1
    });
    $('#myModal22, #myModal23').on('shown.bs.modal show.bs.modal', function() {
        $('body').css({
            'padding-right': '0'
        }); /*$('#myModal22').css({'padding-right':'0'})*/
    });
    $('.look_all a').click(function() {
        $('.osnastka li').css({
            'display': 'inline-block',
            'vertical-align': 'top',
            'float': 'none',
            'width': '32%'
        });
        $(this).hide();
        return !1
    });
    if ($('.owl-carousel').length) {
        $('.page').addClass('caution')
    }
})
