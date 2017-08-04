function onLogout() {
    
    //show hide menus
    outMenus();
    

    $.sesstion = {}

    location.hash = 'login';
    setMessage('You are loggoed out.', 3000)
    deleteCookie();
} 