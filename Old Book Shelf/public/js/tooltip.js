//directive to enable tooltip in angular app
(function () {
  'use strict';

  angular
    .module('OldBookShelf')
    .directive('toggle', toggle);


  function toggle() {
    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element, attrs) {

      // Dom ready
      $(function () {
        if (attrs.toggle === 'tooltip') {
          $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
      });
    }
  }
})();