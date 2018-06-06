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

myApp.controller('editQuestion',function(questionsService,$scope,$stateParams){
  function questionId(question) {
    return question.id === $stateParams.questionId;
  }
  $scope.submit = function(){
    var questions = questionsService.getAllQuestions();
    var question = questions.find(questionId);
    console.log(question);
    if(question !== null){
      var temp = {};
      temp.id === $scope.input[0];
      console.log($scope.input[1]);
      temp.questionText = $scope.input[1];
      temp.questionType = $scope.input[2];
      temp.questionTypeNumber = $scope.input[3];
      temp.answerType = $scope.input[4];
      var index = questions.findIndex(questionId);
      questions.splice(index,1);
      questions.push(temp);
      questionsService.putAllQuestions(questions);
    }
  };
});