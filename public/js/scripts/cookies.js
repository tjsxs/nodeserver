function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 60 * 2 * 60));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var cData = getCookie("appData");
    if (cData != "") {
        $.session = JSON.parse(cData);
        return JSON.parse(cData);
    } else {
        $.session = {};
        return false;
    }
}
function deleteCookie() {
    document.cookie = 'appData' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}