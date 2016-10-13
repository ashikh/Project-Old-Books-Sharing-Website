//directive to enable slider/carousel in angular app
(function () {
  'use strict';
  angular
    .module('OldBookShelf')
    .directive('ride', ride);

  function ride() {
    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element, attrs) {

      // DOM ready
      $(function () {
        if (attrs.ride === 'carousel') {
          $(element).carousel({
			  interval: 3000
		  });
        }
      });
    }
  }
})();