// define globals
var weekly_quakes_endpoint = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var map;
var icon = '/Users/oscarcarrillo/wdi/geoquakes/images/earthquake_360.png';

$(document).ready(function() {
  console.log("Let's get coding!");
  // CODE IN HERE!
  initMap();
  getQuake();


});

function initMap() {
  var firstQuake = {lat: 30.2682, lng: -97.74295};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: firstQuake
  });

  var marker = new google.maps.Marker({
            position: firstQuake,
            map: map,
            icon: icon
  });

}

function getQuake(){
  $.ajax({
    method: 'GET',
    url: weekly_quakes_endpoint,
    dataType: 'json',
    success: onSuccess,
    error: onError
  });
}

  function onSuccess(json){
    //console.log("Inside success");
    for(i = 0; i < json.features.length; i++) {

      var title = json.features[i].properties.title;
      // Features -> Geometry -> Coordinates
      var lat = json.features[i].geometry.coordinates[1];
      var lng = json.features[i].geometry.coordinates[0];

      var coords = {lat: lat , lng: lng };
      //console.log(coords);
      $('#info').append(`<p>${title}<p>`);
      var marker = new google.maps.Marker({
           position: coords,
                map: map,
                icon: icon
      });
      // TODO:  place a marker on the map where this earthquake occured
    }
}

function onError(a, b, c){
  console.log(a);
  console.log(b);
  console.log(c);
}
