'use strict';

// Document ready
$(document).on('ready', function(){

  // E-mail Ajax Send
  // Documentation & Example: https://github.com/agragregra/uniMail
  $("form").submit(function() { //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function() {
      alert("Thank you!");
      setTimeout(function() {
        // Done Functions
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });

  // Magnific popup gallery
  $('.gallery').each(function() {
    $(this).magnificPopup({
      delegate: '.gallery-item',
      type: 'image',
      gallery:{
        enabled:true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });

  // Magnific popup one image
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });

  // Magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });

  $("a[href*='#'].anchor").mPageScroll2id({
    offset: '.header'
  });

  $('.facts__carousel').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true, 
    arrows: false
  });

  anime({
    targets: '.path-animate',
    strokeDashoffset: 734,
    easing: 'linear',
    duration: 5000,
    loop: true
  });

  headerScroll();
  readMoreContent();
  formLetter();

  // simpleForm version 2015-09-23 14:30 GMT +2
  simpleForm('form.form-callback');
});

$(window).on('load', function() {
  $(".loader").delay(100).fadeOut("slow", animatedLanding());
});

function animatedLanding(){
  var tl = gsap.timeline();

  var width = $(window).width();

  if (width >= 1600 ) {
    tl
    .from('.roll__wrapper-img', {duration: 2, autoAlpha: 0}, 'first')
    .from('.header__btn', {duration: 1, y: -50, autoAlpha: 0}, 'first')
    .from('.roll__btn', {duration: 1, y: 100, autoAlpha: 0}, 'first')
    .from('.roll__block', {duration: 1, top: '-100%', autoAlpha: 0}, 'first')
    .from('.roll__block', {duration: 1.5, width: 163, left: '50%'}, '-=1')
    .set('.roll__block', {className:"+=roll__block is-roll"})
    .fromTo('.roll__content-wrapper', {clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)'}, {duration: 1.5, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}, 'first')
  ;
  } else if (width >= 1201 && width <= 1599) {
    tl
    .from('.roll__wrapper-img', {duration: 2, autoAlpha: 0}, 'first')
    .from('.header__btn', {duration: 1, y: -50, autoAlpha: 0}, 'first')
    .from('.roll__btn', {duration: 1, y: 100, autoAlpha: 0}, 'first')
    .from('.roll__block', {duration: 1, top: '-100%', autoAlpha: 0}, 'first')
    .from('.roll__block', {duration: 1.5, width: 128, left: '50%'}, '-=1')
    .set('.roll__block', {className:"+=roll__block is-roll"})
    .fromTo('.roll__content-wrapper', {clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)'}, {duration: 1.5, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}, 'first')
  ;
  } else if (width < 1200) {
    tl.kill();
    gsap.set('*', {clearProps:"all"});
  }
}

$(window).on('scroll', function() {
  headerScroll();
});
$(window).on('resize', function() { });

/*
version 2015-09-23 14:30 GMT +2
*/
function simpleForm(form, callback) {
  $(document).on('submit', form, function(e){
    e.preventDefault();
    var formData = {};
    var hasFile = false;
    if ($(this).find('[type=file]').length < 1) {
      formData = $(this).serialize();
    }
    else {
      formData = new FormData();
      $(this).find('[name]').each(function(){

        switch($(this).prop('type')) {

          case 'file':
            if ($(this)[0]['files'].length > 0) {
              formData.append($(this).prop('name'), $(this)[0]['files'][0]);
              hasFile = true;
            }
            break;

          case 'radio':
          case 'checkbox':
            if (!$(this).prop('checked')) {
              break;
            }
            formData.append($(this).prop('name'), $(this).val().toString());
            break;

          default:
            formData.append($(this).prop('name'), $(this).val().toString());
            break;
        }
      });
    }

    $.ajax({
      url: $(this).prop('action'),
      data: formData,
      type: 'POST',
      contentType : hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
      cache       : false,
      processData : false,
      success: function(response) {
        $(form).removeClass('ajax-waiting');
        $(form).find("[type=submit]").prop("disabled", false);
        $(form).html($(response).find(form).html());

        if (typeof callback === 'function') {
          callback(response);
        }
      }
    });

    $(form).addClass('ajax-waiting');
    $(form).find("[type=submit]").prop("disabled", true);

    return false;
  });
}

function headerScroll(){
  var header = $('.header');
  var width = $(window).width();

  if ($(window).scrollTop() > header.height()) {
    header.addClass('is-scroll');
  } else {
    header.removeClass('is-scroll');
  }
}

function readMoreContent() {
  var block = $('.what__content');
  var btn = $('.what__content-link');

  btn.on('click', function(e){
    e.preventDefault();

    if (block.hasClass('is-active')) {
      block.removeClass('is-active')
    } else {
      block.addClass('is-active')
    }
  });
}

function formLetter() {
  var form = $('.payment__add'),
      btnAddLetter = form.find('.payment__add-btn'),
      letter = $('.payment__add-block'),
      formWrapper = form.find('.payment__add-wrapper'),
      formArray = [0]
  ;

  $(document).on('click', '.payment__block-remove', function() {
    formArray.pop();
    $(this).parent().remove();
  });

  btnAddLetter.on('click', function(){
    var number = formArray.length - 1;
    formArray.push(number + 1);
    var block = `<div class="payment__add-block">
        <button class="payment__block-remove" type="button">Удалить</button>
        <div class="payment__block-title">Буква <span>${formArray.length}</span> для</div>
        <div class="payment__block-wrapper">
            <div class="div1">
                <div class="form-group">
                    <input class="form-control" type="text" name="letter-name-${formArray.length}" placeholder="Ваше имя">
                </div>
            </div>
            <div class="div2">
                <div class="form-group">
                    <input class="form-control" type="text" name="letter-lastname-${formArray.length}" placeholder="Фамилия">
                </div>
            </div>
            <div class="div3">
                <div class="form-group">
                    <input class="form-control" type="text" name="letter-mother-${formArray.length}" placeholder="Имя матери">
                </div>
            </div>
        </div>
    </div>`
    formWrapper.append(block);
  });  
}