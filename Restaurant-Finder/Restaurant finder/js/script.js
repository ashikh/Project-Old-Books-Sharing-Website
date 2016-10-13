var map, places, infoWindow;
var markers = [];
var autocomplete;
var countryRestrict = {'country': 'in'};
var MARKER_PATH = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker_green';
var hostnameRegexp = new RegExp('^https?://.+?/');
//latitude and longitude values of various places 
var countries = {
  'au': {
    center: {lat: -25.3, lng: 133.8},
    zoom: 4
  },
  'br': {
    center: {lat: -14.2, lng: -51.9},
    zoom: 3
  },
  'ca': {
    center: {lat: 62, lng: -110.0},
    zoom: 3
  },
  'fr': {
    center: {lat: 46.2, lng: 2.2},
    zoom: 5
  },
  'de': {
    center: {lat: 51.2, lng: 10.4},
    zoom: 5
  },
  'in': {
    center: {lat: 20.6, lng: 78.9},
    zoom: 5
  },
  'mx': {
    center: {lat: 23.6, lng: -102.5},
    zoom: 4
  },
  'nz': {
    center: {lat: -40.9, lng: 174.9},
    zoom: 5
  },
  'it': {
    center: {lat: 41.9, lng: 12.6},
    zoom: 5
  },
  'za': {
    center: {lat: -30.6, lng: 22.9},
    zoom: 5
  },
  'es': {
    center: {lat: 40.5, lng: -3.7},
    zoom: 5
  },
  'pt': {
    center: {lat: 39.4, lng: -8.2},
    zoom: 6
  },
  'us': {
    center: {lat: 37.1, lng: -95.7},
    zoom: 3
  },
  'uk': {
    center: {lat: 54.8, lng: -4.6},
    zoom: 5
  }
};
//initialize map on home page
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: countries['in'].zoom,
    center: countries['in'].center,
    mapTypeControl: false,
    panControl: false,
    zoomControl: true,
    streetViewControl: false
  });
//display search results in table
  infoWindow = new google.maps.InfoWindow({
    content: document.getElementById('info-content')
  });
// autocomplete places while entering the input 
  autocomplete = new google.maps.places.Autocomplete(
      (
          document.getElementById('autocomplete')), {
        types: ['(regions)'],
        componentRestrictions: countryRestrict
      });
  places = new google.maps.places.PlacesService(map);

  autocomplete.addListener('place_changed', onPlaceChanged);

  document.getElementById('country').addEventListener(
      'change', setAutocompleteCountry);
}

function onPlaceChanged() {
  var place = autocomplete.getPlace();
  if (place.geometry) {
    map.panTo(place.geometry.location);
    map.setZoom(15);
    search();
  } else {
    document.getElementById('autocomplete').placeholder = 'Enter location';
  }
}
//search place type
function search() {
  var search = {
    bounds: map.getBounds(),
    types: ['restaurant']
  };

  places.nearbySearch(search, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      clearResults();
      clearMarkers();
      for (var i = 0; i < results.length; i++) {
        var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
        var markerIcon = MARKER_PATH + markerLetter + '.png';
        markers[i] = new google.maps.Marker({
          position: results[i].geometry.location,
          icon: markerIcon
        });
        markers[i].placeResult = results[i];
        google.maps.event.addListener(markers[i], 'click', showInfoWindow);
		google.maps.event.addListener(markers[i], 'click', showTable);
        setTimeout(dropMarker(i), i * 10);
        addResult(results[i], i);
      }
    }
  });
document.getElementById('msg').style.display = 'block';
}
//display table with results
function showTable(){
document.getElementById('mainTable').style.display = 'inline-block';
}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    if (markers[i]) {
      markers[i].setMap(null);
    }
  }
  markers = [];
}

//initial latitude and longitude values for all places
function setAutocompleteCountry() {
  var country = document.getElementById('country').value;
  if (country == 'all') {
    autocomplete.setComponentRestrictions([]);
    map.setCenter({lat: 15, lng: 0});
    map.setZoom(2);
  } else {
    autocomplete.setComponentRestrictions({'country': country});
    map.setCenter(countries[country].center);
    map.setZoom(countries[country].zoom);
  }
  clearResults();
  clearMarkers();
}

function dropMarker(i) {
  return function() {
    markers[i].setMap(map);
  };
}
//characteristics of different details
function addResult(result, i) {
  var results = document.getElementById('results');
  var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
  var markerIcon = MARKER_PATH + markerLetter + '.png';

  var tr = document.createElement('tr');
  tr.style.backgroundColor = (i % 2 === 0 ? '#ff6347' : '#ffffff');
  tr.onclick = function() {
    google.maps.event.trigger(markers[i], 'click');
  };

  var iconTd = document.createElement('td');
  var nameTd = document.createElement('td');
  var icon = document.createElement('img');
  icon.src = markerIcon;
  icon.setAttribute('class', 'placeIcon');
  icon.setAttribute('className', 'placeIcon');
  var name = document.createTextNode(result.name);
  iconTd.appendChild(icon);
  nameTd.appendChild(name);
  tr.appendChild(iconTd);
  tr.appendChild(nameTd);
  results.appendChild(tr);
}


function clearResults() {
  var results = document.getElementById('results');
  while (results.childNodes[0]) {
    results.removeChild(results.childNodes[0]);
  }
}

function showInfoWindow() {
  var marker = this;
  places.getDetails({placeId: marker.placeResult.place_id},
      function(place, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          return;
        }
        infoWindow.close(map, marker);
        buildIWContent(place);
      });
}
//display icon and restaurant name
function buildIWContent(place) {
document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
      'src="' + place.icon + '"/>';
  document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
      '">' + place.name + '</a></b>';
  document.getElementById('name').innerHTML = '<b><a href="' + place.url +
      '">' + place.name + '</a></b>';
  document.getElementById('iw-address').textContent = place.vicinity;
  document.getElementById('address').textContent = place.vicinity;

//display contact number
  if (place.formatted_phone_number) {
    document.getElementById('iw-phone-row').style.display = '';
	document.getElementById('rPhone').style.display = '';
    document.getElementById('iw-phone').textContent =
        place.formatted_phone_number;
	document.getElementById('phone').textContent =
        place.formatted_phone_number;
  } else {
    document.getElementById('iw-phone-row').style.display = 'none';
	document.getElementById('rPhone').style.display = 'none';
  }

//display restaurant rating
  if (place.rating) {
    var ratingHtml = '';
    for (var i = 0; i < 5; i++) {
      if (place.rating < (i + 0.5)) {
        ratingHtml += '&#10025;';
      } else {
        ratingHtml += '&#10026;';
      }
    document.getElementById('iw-rating-row').style.display = '';
	document.getElementById('rRating').style.display = '';
    document.getElementById('iw-rating').innerHTML = ratingHtml;
	document.getElementById('rating').innerHTML = ratingHtml;
    }
  } else {
    document.getElementById('iw-rating-row').style.display = 'none';
	document.getElementById('rRating').style.display = 'none';
  }

//	display restaurant website
  if (place.website) {
    var fullUrl = place.website;
    var website = hostnameRegexp.exec(place.website);
    if (website === null) {
      website = 'http://' + place.website + '/';
      fullUrl = website;
    }
    document.getElementById('iw-website-row').style.display = '';
	document.getElementById('rWebsite').style.display = '';
    document.getElementById('iw-website').textContent = website;
	document.getElementById('website').textContent = website;
  } else {
    document.getElementById('iw-website-row').style.display = 'none';
	document.getElementById('rWebsite').style.display = 'none';
  }
	
//display working hours	
if (place.opening_hours.weekday_text) {
    
	document.getElementById('rOpening').style.display = '';
	document.getElementById('opening').textContent = '';
	var open = document.getElementById('opening');
	for (var i = 0; i < place.opening_hours.weekday_text.length; i++) {
    
	var time = document.createElement('div');
    
	time.innerHTML = place.opening_hours.weekday_text[i];
	
	open.appendChild(time);
            }
  } else {
	document.getElementById('rOpening').style.display = 'none';
  }		
}
