$(document).ready(function() {

    //    _____                 _                                               _           _
    //   / ____|               | |                                             (_)         | |
    //  | |       _   _   ___  | |_    ___    _ __ ___      ___    ___   _ __   _   _ __   | |_   ___
    //  | |      | | | | / __| | __|  / _ \  | '_ ` _ \    / __|  / __| | '__| | | | '_ \  | __| / __|
    //  | |____  | |_| | \__ \ | |_  | (_) | | | | | | |   \__ \ | (__  | |    | | | |_) | | |_  \__ \
    //   \_____|  \__,_| |___/  \__|  \___/  |_| |_| |_|   |___/  \___| |_|    |_| | .__/   \__| |___/
    //                                                                             | |
    //                                                                             |_|

    // removes ads
    // $('#div-gpt-ad-4, .ad, #leaderboard-ad').remove();

    // checks relative width on window resize and matches height to maintain proportional squares
    var resizeTimer;

    $(window).on('resize', function(e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            squareWidth = $('.hc-square').width();
            $('.hc-square').css({
                'height': squareWidth + 'px'
            });
        }, 250);
    });

    $.getJSON('static/scripts/ahca_gop.json', function(data) {
        // append square in columns, sorted by opinion
        $.each(data, function(k, v) {

            // tooltip html
            var tooltip = "<div id='hc-tooltip'><div class='hc-headshot'></div><h5 class='hc-tooltip-head'>" + v.firstname + ' ' + v.lastname + "</h5><div class='hc-tooltip-details'>" + v.reason + "</div></div>";

            // squre and tooltip html in data attribute
            var square = '<div class="hc-square" data-tooltip="' + tooltip + '"></div>';

            if (v.opinion === 'Leans no') {
                $('#square-no').append(square);

                $('.hc-square').mouseover(function() {
                    var dataTooltip = $(this).data('tooltip');
                    $('.hc-graphic').append(dataTooltip);
                });

                $('.hc-square').mouseout(function() {
                    var dataTooltip = $(this).data('tooltip');
                    $('#hc-tooltip').remove();
                });
            } else if (v.opinion === 'Unclear') {
                $('#square-unclear').append(square);
            } else if (v.opinion === 'Leans yes') {
                $('#square-yes').append(square);
            }
            // set square height equal to the relative width
            var squareWidth = $('.hc-square').width();
            $('.hc-square').css({
                'height': squareWidth + 'px'
            });
        });

        // get square count per column
        var countNo = $('#square-no > .hc-square').length;
        var countUnclear = $('#square-unclear > .hc-square').length;
        var countYes = $('#square-yes > .hc-square').length;

        // change count text to square count per column
        $('#hc-count-no').text(countNo);
        $('#hc-count-unclear').text(countUnclear);
        $('#hc-count-yes').text(countYes);

        $('.hc-square').mouseout(function() {
            $('#hc-tooltip').hide();
        });
    });
});
