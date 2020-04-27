gt.home = gt.home || {};

gt.home.formActive = false;
gt.home.activeService = false;
gt.home.activeSign = 'in';

gt.home.openForm = function() {
  gt.home.formActive = true;
  gt.adjustFormHeight();
};

gt.home.closeForm = function() {
  gt.home.formActive = false;
  gt.adjustFormHeight();
};

gt.showSignIn = function() {
  $(".gt-home__participate__form__auth-wrapper").removeClass('showing-sign-up');
  $(".js-sign-in-sign-up-tab[data-sign-type='in']").addClass('is-active');
  $(".js-sign-in-sign-up-tab[data-sign-type='up']").removeClass('is-active');
  gt.home.activeSign = 'in';
  gt.adjustFormHeight();
};

gt.showSignUp = function() {
  $(".gt-home__participate__form__auth-wrapper").addClass('showing-sign-up');
  $(".js-sign-in-sign-up-tab[data-sign-type='in']").removeClass('is-active');
  $(".js-sign-in-sign-up-tab[data-sign-type='up']").addClass('is-active');
  gt.home.activeSign = 'up';
  gt.adjustFormHeight();
};

gt.adjustFormHeight = function() {
  let form = $('.gt-home__participate__form');

  if (gt.home.formActive) {
    let formHeight = form[0].scrollHeight;

    form.css('height', formHeight + 'px');
  } else {
    form.css('height', 0)
  }
};

$(function() {

  $('.js-open-form').on('click', function(e) {
    let clickedService = $(this).attr('data-service-type');
    if (gt.home.activeService == clickedService) {
      $('.gt-home__participate__request-offer h4').removeClass('is-active');
      gt.home.closeForm();
      gt.home.activeService = null;
    } else {
      $('.gt-home__participate__request-offer h4').removeClass('is-active');
      gt.home.openForm();
      gt.home.activeService = clickedService;
      $(this).addClass('is-active');
      if (gt.home.activeService == 'request') {
        $('.gt-participate').removeClass('offer-active');
      } else {
        $('.gt-participate').addClass('offer-active');
      }
    }
  });

  $('.js-sign-in-sign-up-tab').on('click', function(e) {
    let clickedType = $(this).attr('data-sign-type');

    if (gt.home.activeSign == clickedType) {
      return false;
    }

    if (clickedType == 'in') {
      gt.showSignIn();
    } else {
      gt.showSignUp();
    }
  });

  $(window).on('resize.adjustFormHeight', gt.adjustFormHeight);
});