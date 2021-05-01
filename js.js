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
                    form.html(data);
                }
            } else {
                form.html(data);
                if (modal.attr('id') == 'firstVisitModal') {
                    window.location = 'https://alexfitness.ru/fvisit_ok'
                } else if (modal.attr('id') == 'myModal4') {
                    window.location = 'https://alexfitness.ru/callback_ok'
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
