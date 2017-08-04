function onProfile() {
    var sec = checkCookie();
    console.log(sec);
    if (sec) {
        $('#profile').html($.session.user);
    } else {
        $('#profile').html('Please login to view profile.');
    }

    
}