var route;
var $main = $('#main');

// hide menu items
// $('.loggedIn').addClass('hidden');

//loader functions with callbacks
function loadUrl($selector, url, cb) {
    $selector.load(url, function () {
        if (typeof cb === "function") {
            cb();
        }
    });

}

function routing(route) {
    if (route == '') {
        location.hash = 'home';
    }
    // setActiveRoute(route);
    switch (route) {
        case '#home':
            loadUrl($main, 'templates/home.html', onHome);
            break;
        case '#undefined':
            loadUrl($main, 'templates/home.html', onHome);
            break;
        case '#login':
            loadUrl($main, 'templates/login.html', onLogin);
            break;
        case '#register':
            loadUrl($main, 'templates/register.html', onRegister);
            break;
        case '#profile':
            loadUrl($main, 'templates/profile.html', onProfile);
            break;
        case '#logout':
            loadUrl($main, 'templates/home.html', onLogout);
            break;
        case '#about':
            $main.load('templates/about.html');
            break;

        default:
            $main.load('templates/404.html');
            break;
    }
}




// set active class only for navbar items in header
function setActiveRoute(route) {
    setTimeout(function () {
        $('header').find('a[href="' + route + '"]').parent().addClass('active');
    }, 100);
}

function setMessage(msg, time) {
    $('header').after('<p class="text-center msg"><a>' + msg + '</a></p>');
    setTimeout(function() {
        $('.msg').fadeOut(500, function () {
            $(this).remove();
            $.msg = {};
        })
    }, time);
}

function checkSession() {
    // console.log('session check');
    var isCookiePresent = checkCookie();
    // console.log(isCookiePresent);
    if (isCookiePresent) {
        inMenus();
    } else {
        outMenus();
    }
}

function inMenus() {
    $('.loggedIn').removeClass('hidden');
    $('.loggedOut').addClass('hidden');
}
function outMenus() {
    $('.loggedOut').removeClass('hidden');
    $('.loggedIn').addClass('hidden');
}

