var questionsController = angular.module('questionsController', []);

questionsController.controller('questionAdd',['questionsService','$scope','$element','$compile',function(questionsService,$scope,$element,$compile){
  $scope.AddContactTypeControl = function() {
    var divElement = angular.element(document.querySelector('#contactTypeDiv'));
    var appendHtml = $compile('<contact-type></contact-type>')($scope);
    divElement.append(appendHtml);
  };

  $scope.questionTypeOptions = ["Behavioral", "Opnion", "Welcome & Introduction"];
  $scope.answerTypeOptions = ["Multiple Choice - Single Choice", "Free Text"];
  var QAdd = this;
  $scope.submit = function(){
        console.log(QAdd.question);

    if(QAdd.question !== null){
          console.log(1);
      var questions = questionsService.getAllQuestions();
      var temp = {};
      temp = QAdd.question;
      questions.push(temp);
      questionsService.putAllQuestions(questions);
    }
  };
}]);

questionsController.controller('questionDelete',function(questionsService,$stateParams){
    questionsService.deleteQuestion($stateParams.questionId);
    console.log(allQuestions);
    $state.go('questionsListView');

});

questionsController.controller('questionEdit',['questionsService','$scope','$stateParams','$element','$compile',function(questionsService,$scope,$stateParams,$element,$compile){
  $scope.AddContactTypeControl = function() {
    var divElement = angular.element(document.querySelector('#contactTypeDiv'));
    var appendHtml = $compile('<contact-type></contact-type>')($scope);
    divElement.append(appendHtml);
  }
  $scope.questionTypeOptions = ["Behavioral", "Opnion", "Welcome & Introduction"];
  $scope.answerTypeOptions = ["Multiple Choice - Single Choice", "Free Text"];

  var QEdit = this;
  function questionId(question) {
    return question.id === $stateParams.questionId;
  }
  $scope.submit = function(){
    if(QEdit.question !== null){
      var questions = questionsService.getAllQuestions();
      var index = questions.findIndex(questionId);
      questions.splice(index,1);
      questions.push(QEdit.question);
      questionsService.putAllQuestions(questions);
    }
  };
}]);

// questionsController.controller('questionDelete',function(questionsService,$scope){
//   $scope.delete = function(){
//     console.log($scope.questionId);
//     questionsService.putAllQuestions(questionsService.deleteQuestion($scope.questionId));
//   };
// });





questionsController.directive('contactType',['$compile', '$templateRequest', '$sce',function($compile, $templateRequest, $sce) {
  return {
    restrict: "E",
    scope: {},
    link: function(scope, element, attrs) {

      var templateUrl = $sce.getTrustedResourceUrl('view/removeInput.htm');
      $templateRequest(templateUrl).then(function(template) {
        var linkFn = $compile(template);
        var htmlString = linkFn(scope);
        element.append(htmlString);

      }, function() {
        // An error has occurred
      });


    },
    controller: function($scope, $element) {
      $scope.Delete = function() {
        $element.remove();
        $scope.$destroy();
      }
    }
  }
}]);


// questionsController.controller('MainCtrl',function MainCtrl($scope) {
//   $scope.count = 0;
// });

// //Directive that returns an element which adds buttons on click which show an alert on click
// questionsController.directive("addbuttonsbutton", function(){
//   return {
//     restrict: "E",
//     template: "<a href='' addbuttons>+ Add Option</a>",
//   }
// });

// //Directive for adding buttons on click that show an alert on click
// questionsController.directive("addbuttons", function($compile){
//   return function(scope, element, attrs){
//     element.bind("click", function(){
//       scope.count++;
//       angular.element(document.getElementById('space-for-buttons')).append($compile('<contact-type></contact-type>')(scope));
//     });
//   };
// });

// questionsController.directive("contactType", function($compile){
//   return {
//     templateUrl: 'view/removeInput.htm'
//   };
// });


// questionsController.directive('removeOnClick', function() {
//     return {
//         link: function(scope, elt, attrs) {
//             scope.remove = function() {
//                 elt.html('');
//             };
//         }
//     }
// });


