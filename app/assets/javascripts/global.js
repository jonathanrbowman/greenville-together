// greenville together js namespace
const gt = {};

gt.handlingAuthRequest = false;
gt.navOpen = false;

gt.signIn = function(email, password) {
  gt.handlingAuthRequest = true;
  gt.handleAuthState();
  let requestData = {
    user: {
      email: email,
      password: password,
      remember_me: true
    }
  };

  $.ajax({
    url: '/admin/login',
    method: 'POST',
    data: JSON.stringify(requestData),
    contentType: 'application/json',
    dataType: 'json'
  })
  .done(function (data) {
    console.log(data);
    $('.js-user-not-signed-in').html(
      `<h5 class="gt-link  js-sign-out">Logout</h5>
       <h4 class="gt-heading  gt-heading--light">Thanks, you're signed in now, ${data.user.email}!</h4>`
    );
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
    gt.signIn(email, password);
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