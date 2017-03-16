$(document).ready(function() {
    var projectURL = 'http://www.mcclatchydc.com/news/nation-world/national/article138656403.html';

    setShareURL();

    function setShareURL() {
        var projectURL = 'http://www.mcclatchydc.com/news/nation-world/national/article138656403.html';

        // Facebook
        var facebookURL = "http://www.facebook.com/sharer/sharer.php?u=" + projectURL;
        $('#hc-facebook-share').attr("href", facebookURL);

        // Twitter
        var phrase = "Paul Ryan’s Obamacare replacement bill is in serious trouble";
        // Story headline
            // var metaTitle = $('meta[name=title]').attr('content');
            // var title = metaTitle.split(' | ');
            // var twitterPartial = encodeURI(title[0]);
            // twitterPartial = amperOctoPlus(twitterPartial);
        var twitterURL = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(phrase) + "%20" + projectURL;
        $("#hc-twitter-share").attr("href", twitterURL);

        // Email
        var emailPartial = "mailto:?subject=Paul Ryan’s Obamacare replacement bill is in serious trouble &body=";
        var emailURL = emailPartial + projectURL;
        $("#hc-email-share").attr("href", emailURL);
    }

    // Clean up ampersands, octothorpes, and pluses
    function amperOctoPlus(url) {
        url = url.replace(/%26/g, '%26');
        url = url.replace(/#/g, '%23');
        url = url.replace(/\+/g, '%2B');
        url = url.replace(/@/g, '%40');
        url = url.replace(/:/g, '%3A');
        return url;
    }
});
