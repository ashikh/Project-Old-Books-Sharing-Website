function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(12.96065,77.60088),
    zoom:15,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("map"),mapProp);
}
google.maps.event.addDomListener(window, 'load', initialize);
/*
<!--[if lte IE8]-->
google.maps.event.attachDomListener(window, 'load', initialize);
<!--[end if]-->
*/