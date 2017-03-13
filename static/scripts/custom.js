$(document).ready(function() {

    // Tammy Perrin [4:44 PM]
    // Typically a tooltip gets attached to some attribute of the element
    //
    // [4:44]
    // in fact, the native browser hover is attached to the title attribute (edited)
    //
    // [4:46]
    // There's a pretty wide variety of ways you can do this, varying from the powertip jquery plugin to adding a CSS :hover that makes some text visible
    //
    // [4:50]
    // The method you suggest is basically what powertip does - it sticks a hidden element that gets populated and shown based on hover events, for assignment to those elements (edited)
    //
    // Tammy Perrin [4:57 PM]
    // So, for example, you could add a data attribute to hold some value you want to display for each image icon, like this:
    //
    // [4:57]
    // var square = '<div class="hc-square" data="' + v.name + '"></div>';
    //
    // [4:58]
    // And then register a listener for the onmouseover event that displays that data
    //
    // [4:58]
    // or just do it in CSS

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
          $('.hc-square').css({'height': squareWidth + 'px'});
      }, 250);
    });

    require.config({
      paths: {
        d3: "http://d3js.org/d3.v3.min"
      }
    });

    // require(["d3"], function(d3) {
    //     $.getJSON('static/scripts/ahca_gop.json', function(data) {
    //         console.log(data);
    //         var opinionNo = data.filter(function(d) {
    //             return d.opinion === 'Leans no';
    //         });
    //
    //         var enterNo = d3.select('#square-no').selectAll('.hc-square')
    //             .data(opinionNo)
    //             .enter().append('div');
    //
    //         enterNo.attr('class', 'hc-square');
    //
    //         var opinionYes = data.filter(function(d) {
    //             return d.opinion === 'Leans yes';
    //         });
    //
    //         var enterYes = d3.select('#square-yes').selectAll('.hc-square')
    //             .data(opinionYes)
    //             .enter().append('div');
    //
    //         enterYes.attr('class', '.hc-square');
    //     });
    //
    // //   d3.select("body").append("h1").text("Successfully loaded D3 version " + d3.version);
    // //   console.log('success');
    // });


    $.getJSON('static/scripts/ahca_gop.json', function(data) {
        // append square in columns, sorted by opinion
        $.each(data, function(k, v) {
           var square = '<div class="hc-square"></div>';

           if (v.opinion === 'Leans no') {
               $('#square-no').append(square);

               $('.hc-square').mouseover( function () {
                   $('.hc-tooltip-head').text(v.firstname + " " + v.lastname);
                   $('#hc-tooltip').show();
               });
           } else if (v.opinion === 'Unclear') {
               $('#square-unclear').append(square);
           } else if (v.opinion === 'Leans yes') {
               $('#square-yes').append(square);
           }
           // set square height equal to the relative width
           var squareWidth = $('.hc-square').width();
           $('.hc-square').css({'height': squareWidth + 'px'});
        });

        // get square count per column
        var countNo = $('#square-no > .hc-square').length;
        var countUnclear = $('#square-unclear > .hc-square').length;
        var countYes = $('#square-yes > .hc-square').length;

        // change count text to square count per column
        $('#hc-count-no').text(countNo);
        $('#hc-count-unclear').text(countUnclear);
        $('#hc-count-yes').text(countYes);

        $('.hc-square').mouseout( function () {
            $('#hc-tooltip').hide();
        });
    });
});
