/**
 * Main entry point.
 *
 * the DOM has been localized and the user sees it in their language.
 *
 * @class Main
 */
(function() {
  'use strict';
  document.addEventListener('DocumentLocalized', function() { // l20n ready
    document.body.classList.remove('hidden');

    $(".button-collapse").sideNav();
//    $(".dropdown-button").dropdown();
    var currentLocation = localStorage.getItem('location');
    var source;
    var renderList = function() {
      var item;
      var fragment = '';
      for (var i = 0, len = source.length; i < len; i++) {
        item = source[i];
        //console.log(item.place.text + ':' + item.value);
        fragment += '<li';
        if (currentLocation === item.place.text) {
          fragment += 'active';
            //$('#place').text();
          $('#pm25').text(item.place.text+': '+item.value);
          $('#link').attr('href', item.place.href);
        }
        fragment += '><a href="#" id="' + item.place.text + '">' + item.place.text + '</a></li>';
      }
      $('#nav-mobile').html(fragment);
//      $('#dropdown1').html(fragment);
    }

    $.ajax({
      url:"https://www.kimonolabs.com/api/2l1lfojw?apikey=9qOqwqCs7joi6nZ7ALvsqsZsmtd9N1hC",
      crossDomain: true,
      dataType: "jsonp",
      success: function (response) {
        source = response.results.pm25;
        renderList();
      },
      error: function (xhr, status) {
        //handle errors
      }
    });

    $('#nav-mobile').click(function(evt) {
      console.log(evt.target.id);
      //save to localstorage
      localStorage.setItem('location',evt.target.id);
      currentLocation = evt.target.id;
      //JSON.stringify(testObject));
      renderList();
      $("#sidenav-overlay").trigger("click");
    })
    // document.addEventListener('deviceready', this.onDeviceReady, false); // cordova ready

    // App.init();
  });
}());
