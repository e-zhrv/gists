$(function(){
    $("#cardModal1 form").validator({'position':'top left','lang':'ru','errorInputEvent':'blur'});
    /*$('#bdate').datepicker({'language':'ru','format':'dd.mm.yyyy','autoclose':true});*/
    $('#bdate').on('changeDate', function(){
        $('#bdate').attr('value',$('#bdate').val());
    });


    $('#abonRenewModal form').submit(function(){
        var form = $(this);
        $('.no2click div', form).show();
        $.post(form.attr('action'), form.serialize(), function(data){
            $('.no2click div', form).hide();
            if(data.status){
                form.find(".btn_check").addClass("hidden");
                //form.find(".btn_renew, .btn_phone").removeClass("hidden");
                $('#abonRenewModal').modal('hide');


                $('.card').find('.buy_box_price').removeClass('hidden');
                $('.card').find('.show_prices').hide();
                $('.card').find('.card_popup_open').removeClass('hidden');

                
                var abon = $('input[name ="abons"]', form).val().split(',');

                $.each(abon, function(index, value){
                    var card = $('#cid' + value );
                    var price = parseInt($('.card_popup_open',card).data('price'));
                    var promo_price = price - (price / 10)
                    promo_price = Math.round(promo_price);
                    var off = parseInt($('.card_popup_open',card).data('price_price')) - promo_price,
                        spare = parseInt($('p.spare',card).text().replace(/(\d+)/,'$1'));
                    $('span.price',card).text(promo_price);
                    $('span.off',card).text(off);
                    $('span.day',card).text(Math.round(promo_price/(spare*30)));
                    $('.card_popup_open',card).attr('data-promo_price',promo_price);
                    $('.card_popup_open',card).removeAttr('data-promo_days');
                    card.find('.buy_box_price small.pink').removeClass('hidden');

                });
/*
                var card = $('#cid' + $('select[name ="abon"]', form).val() );

                var promo_price = data.price
                promo_price = Math.round(promo_price);
                var off = parseInt($('.card_popup_open',card).data('price_price')) - promo_price,
                    spare = parseInt($('p.spare',card).text().replace(/(\d+)/,'$1'));
                $('span.price',card).text(promo_price);
                $('span.off',card).text(off);
                $('span.day',card).text(Math.round(promo_price/(spare*30)));
                $('.card_popup_open',card).attr('data-promo_price',promo_price);
                $('.card_popup_open',card).removeAttr('data-promo_days');
                card.find('.buy_box_price small.pink').removeClass('hidden');
*/
                //console.log(data)
                /*
                form.find(".btn_renew").one("click",function() {
                    $('#cid'+data.cid).find('a.card_popup_open').attr('data-price', data.price).trigger('click'); 
                    $('#abonRenewModal').modal('hide');  
                    console.log("btn_renew")
                })*/
            }else{
                form.find('p.red').text('Для продления Вашего абонемента обратитесь в отдел продаж, нажав на кнопку Заказать звонок.');
                form.find('p.red').css('color','red');
                form.find(".btn_check").addClass("hidden");
                form.find('.btn_phone').removeClass('hidden');  
                      
            }
            console.log(data)
        }, 'json');
        return false;
    });
    
    $(document).on('click','a.card_popup_open',function(){
        try{omnitor.AddToCart(1);}catch(err){}
        try{yaCounter758643.reachGoal('card-2');}catch(err){}

        $('.promokod p').text('');
        if($(this).data('promo_price')){
            $('#site_price').text($(this).data('price'));
            $('#pval').html($(this).data('promo_disc'));
            $('#promo_text').removeClass('hidden');
            $('#total_price').text($(this).data('promo_price'));
            $('#cardModal1 .btn_order span').text($(this).data('promo_price'));
        }else if($(this).data('promo_days')){
            $('#site_price').text($(this).data('price'));
            $('#pval').html('БОНУСНЫХ ДНЕЙ: '+$(this).data('promo_days'));
            $('#promo_text').removeClass('hidden');
            $('#total_price').text($(this).data('price'));
            $('#cardModal1 .btn_order span').text($(this).data('price'));
            $('.pop-price').html('<strong><span id="cpopprice">'+$(this).attr('data-price')+'</span> <span class="glyphicon glyphicon-rub" style="font-size:21px"></span></strong><p style="text-decoration:none;line-height:21px; margin: 0px;"><span style="font-size:11px;text-decoration:none;">БОНУСНЫХ ДНЕЙ:</span><br><span>+'+$(this).data('promo_days')+'</span></p>');
        }else{
            $('#total_price').text($(this).data('price'));
            $('#promo_text').addClass('hidden');
            $('#cardModal1 .btn_order span').text($(this).data('price'));
        }

        $('.head.red').text($(this).attr('data-title'));
        $('#cpoptext').text($(this).attr('data-desc'));
        $('input[name=abonid]').val($(this).attr('data-abonid'));
        //$('input[name=city]').val($(this).attr('data-city'));
        //$('#cpopprice').text($(this).attr('data-price'));
        $('input[name=abon_price]').val($(this).attr('data-price'));
        console.log($(this).data('recurrent'))
        if($(this).data('recurrent') == '1'){
            $('input[name="recurrent"]').val('1');
            $('#order_end').hide();
            $('#order_check').show();
            $('#cardModal1 [href="#sectionB"]').parent().hide();
            $('#cardModal1 [href="#sectionA"]').trigger("click");
        }else{
            $('#order_end').show();
            $('#order_check').hide();
             $('#cardModal1 [href="#sectionB"]').parent().show();
            // $('#cardModal1 [href="#sectionB"]').trigger("click");
        }
    });
    $(document).on('click','#order_check',function(){
        var phone = $('input[name="mcode"]').val()+$('input[name="mphone"]').val();
        $.get(location.pathname+'?action=get_code&mphone='+phone, function(){
            $('#phoneCheckModal').modal('show');
        });
        return false;
    });
    $(document).on('submit','#phoneCheckModal form',function(){
        var form = $(this);
        $.post(form.attr('action'), form.serialize(), function(data){
            if(data == 'ok'){
                $('#order_end').show();
                $('#order_check').hide();
                $('#phoneCheckModal').modal('hide');
            }else{
                $('#phoneCheckModal p').text('Введен не верный код. Попробуйте еще раз.').css({color:'red'});
            }
        });
        return false;
    });

    $('#apply_promo').keydown(function(event){
        if(event.keyCode == 13) {
            sendPromoForm();
            return false;
        }
    });
    $('input.upper').keyup(function(event){
        var that = $(this),
            val = that.val();
        if (val){
            val[0] = val[0].toUpperCase();
            console.log(val[0].toUpperCase() + val.slice(1))
            that.val(val[0].toUpperCase() + val.slice(1));
        }
    });
    $('input.letters').keyup(function(event){
        var that = $(this);
        that.val(that.val().replace(/[^а-яА-ЯЁё\-]/gi, ''));
    });
    $('input.num').keypress(function(event){
        console.log(event)
    });
    $('input[name="Email"]').keyup(function(event){
        var that = $(this);
        that.val(that.val().replace(/[а-яА-ЯЁё]/gi, ''));
    });
    $('input.num').focusout(function(event){
        var that = $(this);
        if(that.val().length == 1 && that.attr('maxlength') == 2){
            that.val('0'+that.val());
        }
    });
    $('input.num').keyup(function(event){
        var that = $(this);
        that.val(that.val().replace(/(\d+)/, '$1'));
        if($(this).val().length >= $(this).attr('maxlength')){
            $(this).val($(this).val().substring(0, $(this).attr('maxlength')));
            $(this).parent().next().find('input').trigger('focus');
            if($(this).attr('id') == 'byear1'){$('#byear1').trigger('blur');}
        }
    });
    $('#cardModal1 [name="phone"]').keyup(function(){
        console.log($('#cardModal1 [name="phone"]').val().length)
        /*if($('#cardModal1 [name="phone"]').val().length == 18){
            $('#cardModal1 [name="Email"]').trigger('focus');
        }*/
    });
    $('input[name="Pol"]').change(function(){
        var form = $(this).parents('form');
        $('input[name="Pol"]',form).parent().removeClass('reqinv');
        $('#cardModal1 input[name="phone"]').trigger('focus');
    });
    $('#apply_promo').on('submit',function(){
        sendPromoForm();
        return false;
    });
    $('#genderSelect button').click(function(){
        var that = $(this);
        $('#genderSelect button').removeClass('active');
        that.addClass('active');
        $('input[name="Pol"]',that.parents('form')).val(that.data('gender'));
    });
    $('#cardModal1').on('shown.bs.modal', function(){
        var wh = $(window).height(),
            mh = $('#cardModal1 .modal-dialog').height(),
            rh = (wh - mh) / 2 + 7.5;
        if(rh > 0){
            $('#cardModal1 .modal-body').css({'padding':rh+'px 0'});
            $('#cardModal1').css({'padding':'0'});
        }
    });
    $('.btn_order').click(function(){
        var form = $(this).parents('form');
        if(!$('input[name="Pol"]:checked',form).val()){
            $('input[name="Pol"]',form).parent().addClass('reqinv');
            return false;
        }else{
            $('input[name="Pol"]',form).parent().removeClass('reqinv');
        }
        
        try{
            form.append('<input type="hidden" name="ua_cid">');
            $('input[name="ua_cid"]').val(gaGetClientId());
            
        }catch(err){}
        if(form.data('validator').checkValidity()){
            $('div.no2click div',form).show();
            try{omnitor.CheckOutComplete();}catch(err){}
            try{yaCounter758643.reachGoal('card-3');}catch(err){}
            try{fbq('track', 'Lead');}catch(err){}
            $.post(form.attr('action')+'?action=order', form.serialize(), function(data){
                if(data){

                    // 01.05.2021 15:00 - 17:00
                    // Добавлены строчки отправки в GTM события "Отправлена форма Купить"
                    // (для углублённой настройки GA4 и сквозной/ML аналитики)
                    // Отложенный редирект нужен чтобы GTM успел обработать триггер и отправить в аналитики события

                    if(data.type != 'error') {
                        console.log('order form success');
                        dataLayer.push({
                            'event': 'js_SubmitForm_Pay',
                            'eventCallback' : function() {
                                // Редирект сработает сразу после того как будут выполнены GTM теги связанные с триггером js_SubmitForm_QUIZ
                                if(data.type == 'url'){
                                    console.log('eventCallback redirect');
                                    localStorage.removeItem('halva');
                                    document.location.href = data.val;
                                }else if(data.type == 'form'){
                                    console.log('eventCallback appendTo');
                                    $(data.val).appendTo('body');
                                }
                            }
                        });
                        setTimeout(function(){
                            // (запасной вариант) Если по какой-то причине eventCallback не сработает, будет хард редирект через 3 секунды
                            if(data.type == 'url'){
                                localStorage.removeItem('halva');
                                document.location.href = data.val;
                                console.log('setTimeout 3000 ms redirect');

                            }else if(data.type == 'form'){
                                $(data.val).appendTo('body');
                                console.log('setTimeout 3000 ms appendTo');
                            }
                        } , 3000);
                    }
                    if(data.type == 'error'){
                        alert(data.val);
                        location.reload();
                        $('div.no2click div',form).hide();
                    }
                }else{
                    $('div.no2click div',form).hide();
                    alert('Ошибка. Попробуйте позже.');
                }
            },'json');
        }else{
            $('input.invalid').parent().addClass('reqinv');
        }
        return false;
    });
    $('.ag_promo').click(function(){
        var promo = $('#cardModal1 [name="promo_name"]').val(),
            price = $('#cardModal1 [name="abon_price"]').val();
        $.post(location.pathname+'?action=check_promo',{'promo':promo}, function(data){
            $.each(data,function(){
                $('input[name=promo]',$('.ag_promo').parent()).val(this.promo_code);
                if(this.cid == 'AO-001102'){

                    var that = this
                    console.log(data)
                    if(that.discount_type == 2){
                        promo_price = price
                    }else if(that.discount_type == 1){
                        promo_price = (price*(100-that.summ))/100;
                    }else{
                        promo_price = price-parseInt(that.summ);
                    }
                    if (promo_price != price){
                        $('#cardModal1 [name="abon_price"]').val(promo_price);
                        $('#cardModal1 [name="promo_name"]').val(promo);
                        $('#cardModal1 [name="promo"]').val(promo);
                        $('#order_end span').text(promo_price);
                    }


                }
            });

        },'json');
    });
});
function sendPromoForm(){
        var form = $('#apply_promo');
        $.post(form.attr('action'),form.serialize(),function(data){
            $('.buy_box_price small.pink').addClass('invisible');
            $('span.promo').addClass('hidden');
            $('div.price strong').each(function(){
                var a = $(this).parents('.card').find('a.card_popup_open').data('price');
                $(this).text(a);
            });
            $.each(data,function(){
                $('input[name=promo]').val(this.promo_code);
                if(this.cid.length || this.cid == ''){
                    if(this.cid == 'all' || this.cid == ''){
                        var that = this
                        console.log(data)
                        if(this.promo_code == 'TREN'){
                            var card = $('#cidAF-002178');
                        }else{
                            var card = $('.card');
                        }
                        card.not('.no_promo').each(function(){
                            var card = $(this),
                            price = parseInt($('.card_popup_open',card).data('price'));
                            $('span.promo',card).removeClass('hidden');
                            $('.card').find('.buy_box_price').removeClass('hidden');
                            $('.card').find('.show_prices').hide();
                            $('.card').find('.card_popup_open').removeClass('hidden');
                            if(that.discount_type == 2){
                                promo_price = price
                                card.find('span.promo span:first').text('+'+that.summ)
                                card.find('span.promo span:first').append(' <span>бонусных дней</span>')
                            }else if(that.discount_type == 1){
                                promo_price = (price*(100-that.summ))/100;
                                $('span.promo span.promo_price',card).replaceWith('<small  class="pink promo_price">-'+that.summ+'%  по промокоду</small>');
                                $('.card_popup_open',card).attr('data-promo_disc','-'+that.summ+'%');
                                card.find('span.promo span span').text(' Р по промокоду')
                            }else{
                                promo_price = price-parseInt(that.summ);
                                $('span.promo span',card).replaceWith('<span>-'+that.summ+' <del>P</del></span>');
                                $('.card_popup_open',card).attr('data-promo_disc','-'+that.summ+'<del>P</del>');
                                card.find('span.promo span span').text(' Р по промокоду')
                            }
                            if (promo_price != price){
                                promo_price = Math.round(promo_price);
                                var off = parseInt($('.card_popup_open',card).data('price_price')) - promo_price,
                                    spare = parseInt($('p.spare',card).text().replace(/(\d+)/,'$1'));
                                $('span.price',card).text(promo_price);
                                $('span.off',card).text(off);
                                $('span.day',card).text(Math.round(promo_price/(spare*30)));
                                $('.card_popup_open',card).attr('data-promo_price',promo_price);
                                $('.card_popup_open',card).removeAttr('data-promo_days');
                                card.find('.buy_box_price small.pink').removeClass('hidden');
                            }else{
                                $('.card_popup_open',card).attr('data-promo_days',that.summ);
                                $('.card_popup_open',card).removeAttr('data-promo_price',that.summ);
                                $('span.pink span.price',card).text($('.card_popup_open',card).attr('data-price'));
                                $('span.off',card).text('');
                                card.find('.buy_box_price small.pink').addClass('hidden');
                            }
                            

                        });
                    }else{
                        var card = $('#cid'+this.cid),
                        price = parseInt($('.card_popup_open',card).data('price'));
                        
                        if(!card.hasClass('no_promo')){
                            $('span.promo',card).removeClass('hidden');
                            card.find('.buy_box_price').removeClass('invisible');
                            card.find('.show_prices').hide();
                            card.find('.card_popup_open').removeClass('hidden');
                            if(this.discount_type == 2){
                                promo_price = price
                                card.find('span.promo span:first').text('+'+this.summ)
                                card.find('span.promo span:first').append(' <span>бонусных дней</span>')
                            }else if(this.discount_type == 1){
                                promo_price = (price*(100-this.summ))/100;
                                $('span.promo span.promo_price',card).replaceWith('<small  class="pink promo_price">-'+this.summ+'%  по промокоду</small>');
                                $('.card_popup_open',card).attr('data-promo_disc','-'+this.summ+'%');
                                card.find('span.promo span span').text(' Р по промокоду')
                            }else{
                                promo_price = price-parseInt(this.summ);
                                $('span.promo span',card).replaceWith('<span>-'+this.summ+' <del>P</del></span>');
                                $('.card_popup_open',card).attr('data-promo_disc','-'+this.summ+'<del>P</del>');
                                card.find('span.promo span span').text(' Р по промокоду')
                            }
                            if (promo_price != price){
                                promo_price = Math.round(promo_price);
                                var off = parseInt($('.card_popup_open',card).data('price_price')) - promo_price,
                                    spare = parseInt($('p.spare',card).text().replace(/(\d+)/,'$1'));
                                $('span.price',card).text(promo_price);
                                $('span.off',card).text(off);
                                $('span.day',card).text(Math.round(promo_price/(spare*30)));
                                $('.card_popup_open',card).attr('data-promo_price',promo_price);
                            }else{
                                $('.card_popup_open',card).attr('data-promo_days',this.summ);
                            }
                            card.find('.buy_box_price small.pink').removeClass('invisible');
                        }
                    }
                }

            });
        },'json');
        return false;
    }
