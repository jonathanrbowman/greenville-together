gt.home = gt.home || {};

gt.home.formActive = true;
gt.home.activeService = 'request';

gt.home.openForm = function() {
  $('.gt-home__participate__form').addClass('is-open');
  gt.home.formActive = true;
};

gt.home.closeForm = function() {
  $('.gt-home__participate__form').removeClass('is-open');
  gt.home.formActive = false;
};

$(function() {

  $('.js-open-form').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

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
    }
  });

});