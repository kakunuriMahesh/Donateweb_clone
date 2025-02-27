(function($) {
    "use strict";

    function get_cart() {
        if (window.wc_add_to_cart_params != undefined) {
            $.post({
                url: wc_add_to_cart_params.ajax_url,
                dataType: 'JSON',
                data: {
                    action: 'woomenucart_ajax',
                    nonce: keydesign_menucart_ajax.nonce
                },
                success: function(data, textStatus, XMLHttpRequest) {
                    $('.keydesign-cart-dropdown').html(data.cart);
                    if (data.articles < 1) {
                        $('.keydesign-cart-dropdown').html('<li><span class="empty-cart">Your cart is currently empty</span></li>');
                    }
                    if (data != '') {
                        if ($('.keydesign-cart .badge, .mobile-shopping-cart .badge').length) {
                            if (data.articles > 0) {
                                $('.keydesign-cart .badge, .mobile-shopping-cart .badge').html(data.articles);
                                $('.keydesign-cart .badge, .mobile-shopping-cart .badge').show();
                            } else {
                                $('.keydesign-cart .badge, .mobile-shopping-cart .badge').hide();
                            }
                        } else $('.keydesign-cart .cart-icon-container').append('<span class="badge">' + data.articles + '</span>');
                    }
                }
            });
        }
    }

    $(document).ready(function() {
        $('body').bind("added_to_cart", get_cart);
        $('body').bind("wc_fragments_refreshed", get_cart);
    });

})(jQuery);