function debounce(func, wait, immediate) {var timeout;return function() {var context = this, args = arguments;var later = function() {timeout = null;if (!immediate) func.apply(context, args);};var callNow = immediate && !timeout;clearTimeout(timeout);timeout = setTimeout(later, wait);if (callNow) func.apply(context, args);};};

$(document).ready(function() {
  handleScroll();

  if( ! Modernizr.cssvhunit ) {
    $('.section-aux-image').css('height', window.innerHeight + 'px');
    alert();
  }

  $('a[href*="#"]').on('click', function(event){     
      event.preventDefault();
      $('html,body').animate({scrollTop:$(this.hash).offset().top}, 750);
  });
});
window.addEventListener('resize', debounce(function() { handleScroll(); }, 3));
window.addEventListener('scroll', debounce(function() { handleScroll(); }, 3));


function handleScroll() {
  var viewportTop = window.pageYOffset;
  var viewportBot = viewportTop + window.innerHeight;

  $('.section').each(function() {
    var sectionTop = $(this).offset().top;
    var sectionBot = sectionTop + $(this).height();

    if( viewportTop > sectionTop - 10 && viewportTop < sectionBot + 10 ) {
      var hash = $(this).attr('id');
      $('.nav-link.is-current').removeClass('is-current');
      $('.nav').find('a[href="#'+hash+'"]').addClass('is-current');
    }
  });

  $('.sticky').each(function() {
    var sectionTop = $(this).offset().top;
    var sectionBot = sectionTop + $(this).height();

    var sectionContent = $(this).children('.section-content');
    var sectionAux = $(this).children('.section-aux');

    if( viewportBot > sectionBot ) {
      sectionAux.removeClass('is-fixed').addClass('past-fixed');
    } else {
      if( viewportTop > sectionTop ) {
        sectionAux.addClass('is-fixed').removeClass('past-fixed');
      } else {
        sectionAux.removeClass('is-fixed').removeClass('past-fixed');
      }
    }
  });

  $('.blur').each(function() {
    var sectionTop = $(this).offset().top;
    var sectionContent = $(this).children('.section-content');
    var sectionHeight = sectionContent.outerHeight(true);
    var sectionBot = sectionTop + sectionHeight;
    var sectionImage = $(this).children('.section-blur-image');

    var sectionImages = $(this).children('.section-blur-image, .section-blur-bgr');

    var percent = ((viewportTop - sectionTop) / sectionHeight);
    var imgPercent = (((viewportTop + 200) - sectionTop) / (sectionHeight / 3)).toFixed(2);
    var contentPercent = ((viewportTop - sectionTop) / (sectionHeight / 8)).toFixed(2);

    var imageOpacity = 1 - imgPercent;
    var bgrOpacity = contentPercent;

    if( imageOpacity < 0 ) { imageOpacity = 0; }
    if( imageOpacity > 1 ) { imageOpacity = 1; }
    if( bgrOpacity < 0 ) { bgrOpacity = 0; }
    if( bgrOpacity > 1 ) { bgrOpacity = 1; }

    bgrOpacity = 1;

    var val = 5;
    var val2 = -10;
    if( sectionTop < viewportBot && sectionBot > viewportTop ) {
      val = val - (percent * 10);
      val2 = val2 - (percent * 80);
      sectionImages.css('transform', 'scale(1.25) translateY('+val+'%)');
      sectionContent.css('transform', 'translateY('+val2+'%)');
    }


    if( viewportBot > sectionBot ) {
      $(this).removeClass('is-fixed').addClass('past-fixed');
    } else {
      if( viewportTop + 200 > sectionTop ) {
        sectionImage.css('opacity', imageOpacity);
      } else {
        sectionImage.css('opacity', 1);
      }
      if( viewportTop > sectionTop ) {
        $(this).addClass('is-fixed').removeClass('past-fixed');
        sectionContent.css('background-color', 'rgba(236,235,196,'+bgrOpacity+')');
      } else {
        $(this).removeClass('is-fixed').removeClass('past-fixed');
      }
    }

  });
}