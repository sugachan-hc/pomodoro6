// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails

import jquery from "jquery"
window.$ = jquery


$(function () {
  $('.notice').fadeOut(4000);  //４秒かけて消えていく
});
