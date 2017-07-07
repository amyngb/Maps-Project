

//SET ENV Variable so it exists even if a person doesn't inlcude their credentials.
var env = {
    googleApiKey:'',
};
// NOW  Import variables if present (from env.js)
if(window.__env) {
  Object.assign(env, window.__env);
}
//Dynamcally load our script
//One Way
var script = $('<script>', {
    type: 'text/javascript',
    src: 'https://maps.googleapis.com/maps/api/js?key='+env.googleApiKey+'&callback=initMap&libraries=places',
});
script[0].setAttribute("async", "");
$('script:first').before(script);

// Another  Way
/*
s = document.createElement('script');
s.src = '//maps.googleapis.com/maps/api/js?key='+env.googleApiKey+'&callback=initMap&libraries=places';
document.getElementsByTagName('head')[0].appendChild(s);
*/

//Google InitMap Function. Good Job
function initMap() {
    var spartanburg = {lat: 34.950, lng: -81.932};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: spartanburg,
        mapTypeId: 'roadmap'
    });
    var marker = new google.maps.Marker({
        position: spartanburg,
        map: map
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });

}

//Just Ignore this. We're going to use this later.
// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
    // console.log(env.googleApiKey);
});
