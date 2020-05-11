'use strict';

// Document ready
$(document).on('ready', function(){

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

  $('.btn--svg').each(function(){
    var animation = anime({
      targets: $(this).find('.path-animate').get(0),
      strokeDashoffset: 442,
      easing: 'linear',
      duration: 5000,
      loop: true,
      autoplay: false
    });
    $(this).hover(function(){
      animation.play();
    }, function(){
      animation.pause();
    });
  });

  $("#form").validate();

  headerScroll();
  readMoreContent();
  formLetter();
  donatePayment();
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
      .fromTo('.roll__content-wrapper', {clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)'}, {duration: 1.5, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}, 'first')
    ;
  } else if (width >= 1201 && width <= 1599) {
    tl
      .from('.roll__wrapper-img', {duration: 2, autoAlpha: 0}, 'first')
      .from('.header__btn', {duration: 1, y: -50, autoAlpha: 0}, 'first')
      .from('.roll__btn', {duration: 1, y: 100, autoAlpha: 0}, 'first')
      .from('.roll__block', {duration: 1, top: '-100%', autoAlpha: 0}, 'first')
      .from('.roll__block', {duration: 1.5, width: 128, left: '50%'}, '-=1')
      .fromTo('.roll__content-wrapper', {clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)'}, {duration: 1.5, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}, 'first')
    ;
  } else if (width < 1200) {
    tl.kill();
    gsap.set('.header__btn', {clearProps:"all"});
    gsap.set('.roll__content-wrapper', {clearProps:"all"});
    gsap.set('.roll__btn', {clearProps:"all"});
    gsap.set('.roll__block', {clearProps:"all"});
  }
}

$(window).on('scroll', function() {
  headerScroll();
});
$(window).on('resize', function() { });

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

function donatePayment() {
  var input = $('#donate-custom');
  var row = $('#payment__donate');
  var label = $('#no-donate input[type="checkbox"]')

  input.on('click', function(e){
    row.find('input[type="radio"]').prop("checked", false);
  });

  label.on('click', function(e){
    var _this = $(this);

    if (_this.prop("checked")) {
      row.hide();
    } else {
      row.show();
    }
  });

  input.on('input', function(){
    var _this = $(this);
    if (_this.val().length > 0) {
      _this.addClass('has-donate');
    } else {
      _this.removeClass('has-donate');
    }
  });

  $('#payment__donate input[type="radio"]').on('change', function(){
    input.val('').removeClass('has-donate');
  });
}

jQuery.extend(jQuery.validator.messages, {
  required: "Обязательное поле",
  remote: "Please fix this field.",
  email: "Введите правильный e-mail.",
  url: "Please enter a valid URL.",
  date: "Please enter a valid date.",
  dateISO: "Please enter a valid date (ISO).",
  number: "Please enter a valid number.",
  digits: "Please enter only digits.",
  creditcard: "Please enter a valid credit card number.",
  equalTo: "Пароли не совпадают.",

  accept: "Please enter a value with a valid extension.",
  maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
  minlength: jQuery.validator.format("Please enter at least {0} characters."),
  rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
  range: jQuery.validator.format("Please enter a value between {0} and {1}."),
  max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
  min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});