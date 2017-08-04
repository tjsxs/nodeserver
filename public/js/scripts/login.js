function onLogin() {
    $("#loginSubmit").on('click touchstart', function () {
        var cred = {
            username: $('#username').val(),
            password: $('#pass').val()
        }
        console.log(cred);
        var req = $.ajax({
            type: "POST",
            // url: 'http://localhost:3000/authenticate',
            url: 'http://192.168.100.116:3000/authenticate',
            data: cred,
            dataType: 'json'
        });

        req.done(function (res) {
            console.log(res);
            if(res.success){
                // localStorage.setItem('token', res.token);
                // localStorage.setItem('username', res.username);
                $('body .loggoedOut').addClass('hidden');
                $.session.user = cred.username;
                $.session.token = res.token;

                var cdata = JSON.stringify({
                    username: cred.username,
                    token: res.token
                });
                
                setCookie("appData", cdata, 1);
                checkCookie();
                // console.log($.session);
                location.hash = '#profile';
                // show hide menus
                inMenus();
                
            }
        });
        req.fail(function (err) {
            console.log(err);
        });
    });

    // on load
    //show msg if available
    if ($.msg.msg != undefined) {
        setMessage($.msg.msg, 3000);
    }
}