$(document).ready(function() {

    //    _____                 _                                               _           _
    //   / ____|               | |                                             (_)         | |
    //  | |       _   _   ___  | |_    ___    _ __ ___      ___    ___   _ __   _   _ __   | |_   ___
    //  | |      | | | | / __| | __|  / _ \  | '_ ` _ \    / __|  / __| | '__| | | | '_ \  | __| / __|
    //  | |____  | |_| | \__ \ | |_  | (_) | | | | | | |   \__ \ | (__  | |    | | | |_) | | |_  \__ \
    //   \_____|  \__,_| |___/  \__|  \___/  |_| |_| |_|   |___/  \___| |_|    |_| | .__/   \__| |___/
    //                                                                             | |
    //                                                                             |_|
    $('#div-gpt-ad-4, .ad, #leaderboard-ad').remove();

    var squareWidth = $('.hc-graphic-square').width();
    $('.hc-graphic-square').css({'height': squareWidth + 'px'});

    // var graphicHeight = ('.hc-graphic').height();
    // $('.hc-graphic-col').css({'height': graphicHeight + 'px'});

    var resizeTimer;

    $(window).on('resize', function(e) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
          console.log('test');
          squareWidth = $('.hc-graphic-square').width();
          $('.hc-graphic-square').css({'height': squareWidth + 'px'});
      }, 250);
    });
});
