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
    src: 'https://maps.googleapis.com/maps/api/js?key='+env.googleApiKey+'&callback=initMap',
});
script[0].setAttribute("async", "");
$('script:first').before(script);

// Another  Way
/*
s = document.createElement('script');
s.src = '//maps.googleapis.com/maps/api/js?key='+env.googleApiKey+'&callback=initMap';
document.getElementsByTagName('head')[0].appendChild(s);
*/

//Google InitMap Function. Good Job
function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}




//Just Ignore this. We're going to use this later.
// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
    // console.log(env.googleApiKey);
});
