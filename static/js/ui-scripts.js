$("#navbar-burger").click(function() {
    $('html, body').animate({
        scrollTop: $("#material-menu").offset().top
    }, 800);
});