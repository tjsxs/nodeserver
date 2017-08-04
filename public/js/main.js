$(document).ready(function () {
    $.session = {};
    $.msg = {};
    function getScripts(scripts, callback) {
        var progress = 0;
        scripts.forEach(function (script) {
            $.getScript(script, function () {
                if (++progress == scripts.length) callback();
            });
        });
    }

    getScripts([
        "js/scripts/globals.js",
        "js/scripts/home.js",
        "js/scripts/login.js",
        "js/scripts/register.js",
        "js/scripts/profile.js",
        "js/scripts/logout.js",
        "js/scripts/cookies.js"
    ], function () {

        route = location.hash;
        routing(route);
        $('header').find('a[href="' + route + '"]').parent().addClass('active');

        checkSession();

        //for first load, check the url
        $(window).on('hashchange', function () {
            $main.empty();
            routing(location.hash);
            $('header li').removeClass('active');
            $('header').find('a[href="' + location.hash + '"]').parent().addClass('active');
        });

        $('body').css('visibility', 'visible');
    });
});