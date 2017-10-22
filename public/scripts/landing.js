/* global $ */
// landing page script

$('i').on('click', function(){
    $('html, body').animate({
        scrollTop: $('.info-panel:first').offset().top
    }, 1000);
});