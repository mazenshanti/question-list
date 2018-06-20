// var questionsDirective = angular.module('questionsDirective', []);

// //Directive that returns an element which adds buttons on click which show an alert on click
// questionsDirective.directive("addbuttonsbutton", function(){
//   return {
//     restrict: "E",
//     template: "<a href='' addbuttons>+ Add Option</a>"
//   }
// });

// //Directive for adding buttons on click that show an alert on click
// questionsDirective.directive("addbuttons", function($compile){
//   return function(scope, element, attrs){
//     element.bind("click", function(){
//       scope.count++;
//       angular.element(document.getElementById('space-for-buttons')).append($compile('<contact-type></contact-type>')(scope));
//     });
//   };
// });

// questionsDirective.directive("contactType", function($compile){
//   return {
//     templateUrl: 'view/removeInput.htm'
//   };
// });


// questionsDirective.directive('removeOnClick', function() {
//     return {
//         link: function(scope, elt, attrs) {
//             scope.remove = function() {
//                 elt.html('');
//             };
//         }
//     }
// });
