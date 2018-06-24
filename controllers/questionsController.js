var questionsController = angular.module('questionsController', ['ngAnimate', 'ngSanitize', 'mgcrea.ngStrap']);

questionsController.controller('questionAdd',['questionsService','$scope','$element','$compile',function(questionsService,$scope,$element,$compile){
  var QAdd = this;

  $scope.modal = {
    "title": "Remove This Question",
    "content": "Are you sure ?"
  };

  $scope.AddContactTypeControl = function() {
    var divElement = angular.element(document.querySelector('#contactTypeDiv'));
    var appendHtml = $compile('<div class="noPadding col-md-12 boarder marginBottom item">'+
            '<span id="handle" class="col-md-1 boardToRight fa fa-arrows-alt"></span>'+
            '<contact-type></contact-type>')($scope);
    divElement.append(appendHtml);
  }

  $scope.remove = function(){
    QAdd.question = undefined;
  }

  $scope.questionTypeOptions = ["Behavioral", "Opnion", "Welcome & Introduction"];
  $scope.answerTypeOptions = ["Multiple Choice - Single Choice", "Free Text"];
  
  $scope.submit = function(){
    if(QAdd.question !== null){
      var questions = questionsService.getAllQuestions();
      var temp = {};
      temp = QAdd.question;
      temp.id = Math.random();
      questions.push(temp);
      questionsService.putAllQuestions(questions);
    }
  };
}]);

questionsController.controller('questionDelete',function(questionsService,$stateParams){
    questionsService.deleteQuestion($stateParams.questionId);
    $state.go('questionsListView');

});

questionsController.controller('questionEdit',['questionsService','$scope','$stateParams','$element','$compile',function(questionsService,$scope,$stateParams,$element,$compile){
  var QEdit = this;
  $scope.AddContactTypeControl = function() {
    var divElement = angular.element(document.querySelector('#contactTypeDiv'));
    var appendHtml = $compile('<div class="noPadding col-md-12 boarder marginBottom item">'+
            '<span id="handle" class="col-md-1 boardToRight fa fa-arrows-alt"></span>'+
            '<contact-type></contact-type>')($scope);
    divElement.append(appendHtml);
  }
  $scope.questionTypeOptions = ["Behavioral", "Opnion", "Welcome & Introduction"];
  $scope.answerTypeOptions = ["Multiple Choice - Single Choice", "Free Text"];

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


questionsController.directive('contactType',['$compile', '$templateRequest', '$sce',function($compile, $templateRequest, $sce) {
  return {
    restrict: "E",
    scope: { answer:"="},
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
        $element.parent().remove();
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


