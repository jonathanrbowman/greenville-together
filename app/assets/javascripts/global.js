// greenville together js namespace
const gt = {};

gt.handlingAuthRequest = false;
gt.navOpen = false;

gt.signIn = function(email, password, context = false) {
  gt.handlingAuthRequest = true;
  gt.handleAuthState();
  let requestData = {
    user: {
      email: email,
      password: password,
      remember_me: true
    },
    context: context
  };

  $.ajax({
    url: '/admin/login',
    method: 'POST',
    data: JSON.stringify(requestData),
    contentType: 'application/json',
    dataType: 'json'
  })
  .done(function (data) {
    if (context == 'home_page_prompt') {
      $('.gt-home__participate__form').html(data.html_block);
    } else {
      console.log("this was an unknown sign in");
    }

    $('.js-show-auth').each(function() {
      let classList = $(this).attr('class').split(/\s+/);
      classList.push('js-sign-out');
      classList = classList.filter(className => className !== 'js-show-auth');
      $(this).attr('class', classList.join(' ')).text('Logout');
    });
  })
  .fail(function (data) {
    console.log(data);
  })
  .always(function (data) {
    gt.handlingAuthRequest = false;
    gt.handleAuthState();
  });
};

gt.signUp = function(email, password, passwordConfirmation) {
  gt.handlingAuthRequest = true;
  gt.handleAuthState();
  let requestData = {
    user: {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    }
  };

  $.ajax({
    url: '/admin/users',
    method: 'POST',
    data: JSON.stringify(requestData),
    contentType: 'application/json',
    dataType: 'json'
  })
  .fail(function(data) {
    console.log(data);
  })
  .always(function (data) {
    gt.handlingAuthRequest = false;
    gt.handleAuthState();
  })
  .then(function(data, result) {
    if (result == 'success') {
      gt.signIn(email, password);
    }
  });
};

gt.signOut = function() {
  gt.handlingAuthRequest = true;
  gt.handleAuthState();

  $.ajax({
    url: '/admin/logout',
    method: 'DELETE'
  })
  .done(function() {
    location.reload();
  })
  .fail(function(data) {
    console.log(data);
  })
  .always(function (data) {
    gt.handlingAuthRequest = false;
    gt.handleAuthState();
  });
};

gt.handleAuthState = function() {
  if (gt.handlingAuthRequest) {
    $('.js-sign-in, .js-sign-up').addClass('is-disabled').each(function() {
      $(this).text('One sec...');
    });
  } else {
    $('.js-sign-in, .js-sign-up').removeClass('is-disabled').each(function() {
      $(this).text($(this).attr('data-orig-text'));
    });
  }
};

gt.openNav = function() {
  $(".gt-nav__content").addClass('is-active');
  gt.navOpen = true;
};

gt.closeNav = function() {
  $(".gt-nav__content").removeClass('is-active');
  gt.navOpen = false;
};

$(function() {
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });

  $(document).on('click.signIn', '.js-sign-in', function(e) {
    if (gt.handlingAuthRequest) {
      return false;
    }

    let email = $(this).closest('form').find('input[name=email]').val();
    let password = $(this).closest('form').find('input[name=password]').val();
    let context = $(this).closest('.js-user-not-signed-in').attr('data-context');
    gt.signIn(email, password, context);
  });

  $(document).on('click.signUp', '.js-sign-up', function(e) {
    if (gt.handlingAuthRequest) {
      return false;
    }

    let email = $(this).closest('form').find('input[name=email]').val();
    let password = $(this).closest('form').find('input[name=password]').val();
    let passwordConfirmation = $(this).closest('form').find('input[name=password_confirmation]').val();
    gt.signUp(email, password, passwordConfirmation);
  });

  $(document).on('click.signOut', '.js-sign-out', function(e) {
    console.log('signing out?');
    if (gt.handlingAuthRequest) {
      return false;
    }

    gt.signOut();
  });

  $(document).on('click.openNav', '.js-open-nav', function(e) {
    e.preventDefault();
    e.stopPropagation();
    gt.openNav();
  });

  $(document).on('click.closeNav', '.js-close-nav', function(e) {
    e.preventDefault();
    e.stopPropagation();
    gt.closeNav();
  });

  $(document).on('click.globalCloseNav', function(e) {
    if (gt.navOpen && $(e.target).closest('.gt-nav__content').length <= 0) {
      gt.closeNav();
    }
  });

  $(document).on('click.navStop', '.gt-nav__content', function(e) {
    e.preventDefault();
    e.stopPropagation();
  });

});