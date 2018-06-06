var questionsController = angular.module('questionsController', ['ui.router']);

questionsController.controller('questionAdd',function(questionsService,$scope){
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

questionsController.controller('questionEdit',function(questionsService,$scope,$stateParams){
  function questionId(question) {
    return question.id === $stateParams.questionId;
  }
  $scope.submit = function(){
    var questions = questionsService.getAllQuestions();
    var question = questions.find(questionId);
    if(question !== null){
      console.log(question)
      var temp = {};
      question.questionText = $scope.input[1];
      question.questionType = $scope.input[2];
      question.questionTypeNumber = $scope.input[3];
      question.answerType = $scope.input[4];
      var index = questions.findIndex(questionId);
      questions.splice(index,1);
      questions.push(question);
      questionsService.putAllQuestions(questions);
    }
  };
});


// questionsController.controller('questionDelete',function(questionsService,$scope){
//   $scope.delete = function(){
//     console.log($scope.questionId);
//     questionsService.putAllQuestions(questionsService.deleteQuestion($scope.questionId));
//   };
// });