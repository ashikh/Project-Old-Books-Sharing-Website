//initialize map on contact page
function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(12.938178,77.622825),
    zoom:15,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("locationMap"),mapProp);
}
google.maps.event.addDomListener(window, 'load', initialize);
/*
<!--[if lte IE8]-->
google.maps.event.attachDomListener(window, 'load', initialize);
<!--[end if]-->
*/
