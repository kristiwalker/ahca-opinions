$(document).ready(function() {

    //    _____                 _                                               _           _
    //   / ____|               | |                                             (_)         | |
    //  | |       _   _   ___  | |_    ___    _ __ ___      ___    ___   _ __   _   _ __   | |_   ___
    //  | |      | | | | / __| | __|  / _ \  | '_ ` _ \    / __|  / __| | '__| | | | '_ \  | __| / __|
    //  | |____  | |_| | \__ \ | |_  | (_) | | | | | | |   \__ \ | (__  | |    | | | |_) | | |_  \__ \
    //   \_____|  \__,_| |___/  \__|  \___/  |_| |_| |_|   |___/  \___| |_|    |_| | .__/   \__| |___/
    //                                                                             | |
    //                                                                             |_|

    ////////////////////////////////////////////////////
    // SET SQUARE HEIGHT EQUAL TO WIDTH ON WINDOW RESIZE
    ////////////////////////////////////////////////////

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

    ////////////////////////////////////////////////////
    // ITERATES THROUGH EACH JSON OBJECT
    ////////////////////////////////////////////////////

    $.getJSON('https://d1at6jy1u029jl.cloudfront.net/data/1-wp6NwpIhMVUwoeUsKrH_JjnmriYFZV3WkbBuk2PWiE.json', function(data) {
        // append square in columns, sorted by opinion
        $.each(data, function(k, v) {

            // tooltip html
            var tooltip = "<div id='hc-tooltip'><div class='hc-headshot'></div><h5 class='hc-tooltip-head'>" + v.firstname + ' ' + v.lastname + "</h5><div class='hc-tooltip-details'>" + v.reason + "</div></div>";

            var photoURL = "url('https://theunitedstates.io/images/congress/original/" + v.id + ".jpg')";

            // squre and tooltip html in data attribute
            var square = '<div id="' + v.id + '" class="hc-square" data-tooltip="' + tooltip + '" data-photo="' + photoURL + '"></div>';

            ////////////////////////////////////////////////////
            // SORTS AND DRAWS SQUARES INTO EACH COLUMN
            ////////////////////////////////////////////////////

            if (v.opinion === 'Leans no') {
                $('#square-no').append(square);
            } else if (v.opinion === 'Unclear') {
                $('#square-unclear').append(square);
            } else if (v.opinion === 'Leans yes') {
                $('#square-yes').append(square);
            }

            ////////////////////////////////////////////////////
            // ADD PHOTO FROM URL AS SQUARE BACKGROUND IMAGE
            ////////////////////////////////////////////////////

            $('.hc-square').each(function() {
                var squareId = $(this).attr('id');

                // if square ID matches ID in JSON, add photo URL to css background-image property
                if (v.id === squareId) {
                    var dataPhoto = $(this).data('photo');
                    $('#' + squareId).css('background-image', dataPhoto);
                }
            });

            setHeight();
        });

        showTooltip();
        countSquares();
    });

    ////////////////////////////////////////////////////
    // SETS SQUARE HEIGHT EQUAL TO RELATIVE WITH
    ////////////////////////////////////////////////////

    function setHeight() {
        var squareWidth = $('.hc-square').width();
        $('.hc-square').css({
            height: squareWidth + 'px',
            // 'background-image': dataPhoto
        });
    }

    ////////////////////////////////////////////////////
    // GETS SQUARE COUNT PER COLUMN & APPENDS AS TEXT
    ////////////////////////////////////////////////////

    // get square count per column
    function countSquares() {
        var countNo = $('#square-no > .hc-square').length;
        var countUnclear = $('#square-unclear > .hc-square').length;
        var countYes = $('#square-yes > .hc-square').length;

        // change count text to square count per column
        $('#hc-count-no').text(countNo);
        $('#hc-count-unclear').text(countUnclear);
        $('#hc-count-yes').text(countYes);
    }

    ////////////////////////////////////////////////////
    // APENDS AND REMOVES TOOLTIPS ON HOVER/TAP
    ////////////////////////////////////////////////////


    function showTooltip() {
        $('.hc-square').mouseover(function() {
            var dataTooltip = $(this).data('tooltip');
            var parentDiv = $(this).closest('div');
            $(parentDiv).append(dataTooltip);

            positionTooltip();

            var dataPhoto = $(this).data('photo');
            $('.hc-headshot').css('background-image', dataPhoto);
        });

        $('.hc-square').mouseout(function() {
            var dataTooltip = $(this).data('tooltip');
            $('#hc-tooltip').remove();
        });
    }

    ////////////////////////////////////////////////////
    // POSITIONS TOOLTIPS IN RELATION TO CORRESPONDING SQUARE
    ////////////////////////////////////////////////////

    // use the pageX position in relation to the window width to position the tooltip to the left or right of the point hovered over.

    function positionTooltip() {
        var selectTooltip = document.getElementById('hc-tooltip');
        var tooltipWidth = $('#hc-tooltip').outerWidth();
        var tooltipHeight = $('#hc-tooltip').outerHeight();
        console.log(event.pageX, "moouse X");
        console.log(event.clientY, "moouse Y");
        var w = $(window).width();
        var xPos = 0 + "px";
        if (event.pageX > w / 2.1) {
            // positions tooltip to the left
            xPos = event.pageX - (tooltipWidth + 70) + "px";
        } else {
            // positions tooltip to the right
            xPos = event.pageX - 20 + "px";
        }

        var yPos = event.pageY - tooltipHeight - 750 + "px";

        // if (w < 768) {
        //     yPos = event.clientY + tooltipHeight + 40 + "px";
        // }
        // console.log(event.clientY);

        // var leftPos = "left"
        $('#hc-tooltip').css({
            left: xPos,
            top: yPos
        });
    }
});
