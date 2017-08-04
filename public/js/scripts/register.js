function onRegister() {
    function make_base_auth(user, password) {
        var tok = user + ':' + password;
        var hash = btoa(tok);
        return "Basic " + hash;
    }
    $('#registerSubmit').on('click touchstart', function () {
        var details = {
            username: $('#username').val(),
            name: $('#name').val(),
            email: $('#email').val(),
            pass: $('#pass').val()
        }
        var req = $.ajax({
            type: "POST",
            // url: 'http://localhost:3000/newUser',
            url: 'http://192.168.100.116:3000/newUser',
            data: details,
            dataType: 'json'
        });

        req.done(function (res) {
            $.msg = res;
            // console.log($.msg);
            location.hash = 'login';
        });
        req.fail(function (err) {
            console.log(err);
        });
    });
}