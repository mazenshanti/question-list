var questionsController = angular.module('questionsController', []);

questionsController.controller('questionAdd',function(questionsService,$scope){
            console.log(1);

  $scope.submit = function(){
        console.log(QEdit.question);

    if(QEdit.question !== null){
          console.log(1);
      var questions = questionsService.getAllQuestions();
      var temp = {};
      temp = QEdit.question;
      questions.push(temp);
      questionsService.putAllQuestions(questions);
    }
  };
});

questionsController.controller('questionDelete',function(questionsService,$stateParams){
    questionsService.deleteQuestion($stateParams.questionId);
    console.log(allQuestions);
    $state.go('questionsListView');

});

questionsController.controller('questionEdit',function(questionsService,$scope,$stateParams){
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
});


// questionsController.controller('questionDelete',function(questionsService,$scope){
//   $scope.delete = function(){
//     console.log($scope.questionId);
//     questionsService.putAllQuestions(questionsService.deleteQuestion($scope.questionId));
//   };
// });