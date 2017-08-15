// initialize WOW
new WOW().init();

// menu ao rolar
$(document).ready(function() {
    $(window).scroll(function() {
        if ($(window).scrollTop() > 200) {
            $("#menu-principal").addClass('navbar-background');
        } else if ($(window).scrollTop() < 200) {
            $("#menu-principal").removeClass('navbar-background');
        }
    })
});

// Navbar 
$(document).ready(function() {
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = this.hash,
            $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 1000, 'swing', function() {
            window.location.hash = target;
        });
    });
});