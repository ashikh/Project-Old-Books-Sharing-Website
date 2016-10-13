//directive to enable affix in angular app
(function () {
  'use strict';

  angular
    .module('OldBookShelf')
    .directive('spy', spy);


  function spy() {
    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element, attrs) {

      // Dom ready
      $(function () {
        if (attrs.spy === 'affix') {
          $(element).affix({
            offset: {
              top: attrs.offsetTop || 170
              // bottom: attrs.offsetBottom || 10
            }
          });
        }
      });
    }
  }
})();