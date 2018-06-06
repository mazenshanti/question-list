var myApp = angular.module('questions', ['ui.router']);
myApp.config(['$stateProvider',function($stateProvider) {
  // An array of state definitions
  var states = [
    { 
      name: 'questionsListView', 
      url: '/questionsListView', 
      component: 'questionsListView',
      resolve: {
        questions: function(questionsService) {
          return questionsService.getAllQuestions();
        }
      }
    },
    { 
      name: 'reload', 
      url: '/reload', 
      component: 'questionsListView',
      resolve: {
        questions: function(questionsService) {
          return questionsService.fetchAllQuestions();
        }
      }
    },
    { 
      name: 'questionEdit', 
      url: '/questionEdit/{questionId}', 
      component: 'questionEdit',
      resolve: {
        question: function(questionsService,$stateParams) {
          return questionsService.getAllQuestions().find(function(question) { 
            return question.id === $stateParams.questionId;
          });
        }
      }
    },
    { 
      name: 'questionDelete', 
      url: '/questionDelete/{questionId}',
      component: 'questionsListView',
      resolve: {
        questions: function(questionsService,$stateParams) {
          return questionsService.deleteQuestion($stateParams.questionId)
        }
      }
    },
    { 
      name: 'addQuestion', 
      url: '/addQuestion',
      component: 'addQuestion'
    },
  ]
  
  // Loop over the state definitions and register them
  states.forEach(function(state) {
    $stateProvider.state(state);
  });
}]);

myApp.controller('addQuestion',function(questionsService,$scope){
  $scope.submit = function(){
    var questions = questionsService.getAllQuestions();
    var temp = {};
    temp.id = $scope.input[0];
    temp.questionText = $scope.input[1];
    temp.questionType = $scope.input[2];
    temp.questionTypeNumber = $scope.input[3];
    temp.answerType = $scope.input[4];
    questions.push(temp);
    questionsService.putAllQuestions(questions);
  };
});

myApp.controller('editQuestion',function(questionsService,$scope){
  $scope.submit = function(){
    var questions = questionsService.getAllQuestions();
    questions.find(function(question) { 
      if(question.id === $scope.$ctrl.question.id){
        question.questionText = $scope.$ctrl.question.questionText;
        question.questionType = $scope.$ctrl.question.questionType;
        question.questionTypeNumber = $scope.$ctrl.question.questionTypeNumber;
        question.answerType = $scope.$ctrl.question.answerType;
        console.log(question.id);
      }
    });
    console.log(questions);
    questionsService.putAllQuestions(questions);
  };
});