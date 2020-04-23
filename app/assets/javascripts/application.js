// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require jquery

// greenville together js namespace
const gt = {};

gt.authenticate = function(email, password) {
  let data = {
    user: {
      email: email,
      password: password,
      remember_me: true
    }
  }

  $.ajax({
    url: '/admin/login',
    method: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(data)
  })
  .done(function (data) { console.log(data); })
  .fail(function (data) { console.log(data); });
};

gt.signUp = function(email, password, passwordConfirmation) {
  let data = {
    user: {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    }
  };

  $.ajax({
    url: '/admin/users',
    method: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(data)
  })
  .done(function(data) {
    gt.authenticate(email, password);
  })
  .fail(function(data) {
    console.log(JSON.parse(data.responseText));
  });
};

$(function() {
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });

  $(".js-sign-in").on('click', function(e) {
    $(this).disabled = true;
    let email = $(this).closest('form').find('input[name=email]').val();
    let password = $(this).closest('form').find('input[name=password]').val();
    gt.authenticate(email, password);
  });

  $(".js-sign-up").on('click', function(e) {
    $(this).disabled = true;
    let email = $(this).closest('form').find('input[name=email]').val();
    let password = $(this).closest('form').find('input[name=password]').val();
    let passwordConfirmation = $(this).closest('form').find('input[name=password_confirmation]').val();
    gt.signUp(email, password, passwordConfirmation);
  });

});