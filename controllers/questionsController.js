var questionsController = angular.module('questionsController', ['ngAnimate', 'ngSanitize', 'mgcrea.ngStrap']);


questionsController.controller('questionAdd',['questionsService','$scope','$element','$compile',function(questionsService,$scope,$element,$compile){
  var QAdd = this;

  $scope.modal = {
    "title": "Remove This Question",
    "content": "Are you sure ?"
  };

  $scope.addQuestion = function(counter) {
    console.log(counter);
    counter++;
    var divElement = angular.element(document.querySelector('#newQuestionDiv'));
    var appendHtml = $compile('<new-question questionsCounter=counter></new-question>')($scope);
    divElement.append(appendHtml);
  }

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

questionsController.directive('newQuestion',function() {
  return {
    restrict: "E",
    scope: { questionsCounter: '<' },
    bindings: { questionsCounter: '<' },
    templateUrl: 'view/newQuestion.html',
    controller: 'questionAdd',
  }
});




questionsController.controller('questionsListView',['$scope', 'questionsService', function($scope, questionsService){
  var QList = this;
  QList.questions = questionsService.getAllQuestions();
  $scope.filteredList = [];
  $scope.currentPage = 1;
  $scope.numPerPage = 2;
  $scope.maxSize = 5;
    
  $scope.numPages = function () {
    return Math.ceil(QList.questions.length / $scope.numPerPage);
  };

  $scope.previous = function () {
    if($scope.currentPage > 1) {
      $scope.currentPage--;
    }
  }
  
  $scope.next = function () {
    if($scope.currentPage < $scope.numPages()) {
      $scope.currentPage++;
    }
  }

  $scope.questionTypeOptions = ['Behavioral', 'Opnion', 'Welcome & Introduction'];

  $scope.$watch('currentPage + numPerPage', function() {
    var begin = (($scope.currentPage - 1) * $scope.numPerPage);
    var end = begin + $scope.numPerPage;
    $scope.filteredList = QList.questions.slice(begin, end);
  });
  console.log($scope.numPages());
}]);

