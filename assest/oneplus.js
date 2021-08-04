$(document).ready(function() {
 
    $('.color-choose input').on('click', function() {
        var mobilecolor = $(this).attr('data-image');
   
        $('.active').removeClass('active');
        $('.left-column img[data-image = ' + mobilecolor + ']').addClass('active');
        $(this).addClass('active');
    });
   
  });