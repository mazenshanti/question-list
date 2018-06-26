var questionsController = angular.module('questionsController', ['ngAnimate', 'ngSanitize', 'mgcrea.ngStrap']);


questionsController.controller('questionAdd',['questionsService','$scope','$element','$compile',function(questionsService,$scope,$element,$compile){
  var QAdd = this;
  var counter = 0;
  var counterRemove = 0;
  $scope.modal = {
    "title": "Remove This Question",
    "content": "Are you sure ?"
  };

  var temp = {
    "id": "",
    "questionText": "",
    "questionType": "",
    "answerType": ""
  };
  temp.id = counter;
  counter++;
  counterRemove++;
  QAdd.questions = [];
  QAdd.questions.push(temp);
  console.log(QAdd.questions);

  $scope.addAnswer = function(index) {
    if (!QAdd.questions[index].answers) {
      QAdd.questions[index].answers = [];
    }
    var temp = { text: "", id: "" };
    temp.id = counter;
    counter++;
    QAdd.questions[index].answers.push(temp);
  };

  $scope.Delete = function(index) {
    if(QEdit.question.answers && index){
      var answers = QEdit.question.answers;
      answers.splice(index,1);
    }
  };

  // $scope.addQuestion = function(counter) {
  //   console.log(counter);
  //   counter++;
  //   var divElement = angular.element(document.querySelector('#newQuestionDiv'));
  //   var appendHtml = $compile('<new-question questionsCounter=counter></new-question>')($scope);
  //   divElement.append(appendHtml);
  // }

  $scope.addQuestion = function() {
    var temp = {
      "id": "",
      "questionText": "",
      "questionType": "",
      "answerType": ""
    };
    temp.id = counter;
    counter++;
    QAdd.questions.push(temp);
    console.log(QAdd.questions);
  };

  $scope.remove = function(index){
    if(QAdd.questions && index){
      if(counterRemove > 1){
        counterRemove--;
      }else{
        QAdd.questions[index] = undefined;
      }
        var questions = QAdd.questions;
        questions.splice(index,1);
    }
  }

  $scope.questionTypeOptions = ["Behavioral", "Opnion", "Welcome & Introduction"];
  $scope.answerTypeOptions = ["Multiple Choice - Single Choice", "Free Text"];
  
  $scope.submit = function(){
    if(QAdd.questions !== null){
      var questions = questionsService.getAllQuestions();
      var temp = {};
      QAdd.questions.forEach(function (temp, i) {
        temp.id = ""+Math.floor(Math.random() * 1000);
        questions.push(temp);
      });
      console.log(questions);
      questionsService.putAllQuestions(questions);
    }
  };
}]);

questionsController.controller('questionDelete',function(questionsService,$stateParams){
    questionsService.deleteQuestion($stateParams.questionId);
});

questionsController.controller('questionEdit',['questionsService','$scope','$stateParams','$element','$compile',function(questionsService,$scope,$stateParams,$element,$compile){
  var QEdit = this;
  console.log(QEdit.question);
  if(QEdit.question){
    var counter = 0;

    function addID(){
      for(answer in QEdit.question.answers) {
        answer.id = "answer"+counter;
        counter++;
      }
    }

    if(QEdit.question.answers){
      addID();
    }

    function sortable(){
      var elem = angular.element( document.querySelector( ".sortable" ) );
      var sortedIDs = elem.sortable({
        axis: 'y',
        tolerance: 'pointer',
        items: '.item',
        handle: '#handle',
        // containment: 'parent'
      });
      elem.disableSelection();
    }

    sortable();

    $scope.questionTypeOptions = ["Behavioral", "Opnion", "Welcome & Introduction"];
    $scope.answerTypeOptions = ["Multiple Choice - Single Choice", "Free Text"];

    // $scope.AddContactTypeControl = function() {
    //   var divElement = angular.element(document.querySelector('#contactTypeDiv'));
    //   var appendHtml = $compile('<div class="noPadding col-md-12 boarder marginBottom item">'+
    //           '<span id="handle" class="col-md-1 boardToRight fa fa-arrows-alt"></span>'+
    //           '<contact-type></contact-type>')($scope);
    //   divElement.append(appendHtml);
    // }

    function questionId(question) {
      return question.id === $stateParams.questionId;
    }


    $scope.submit = function(){
      var questions = questionsService.getAllQuestions();
      var index = questions.findIndex(questionId);
      questions.splice(index,1);
      answers = QEdit.question.answers;
      answers.forEach(function (answer, i) {
        if (answer.text == "") {
          answers.splice(i,1);
        }
      });
      // answers.sort(function(a, b) {
      //     return a.id - b.id;
      // });
      questions.push(QEdit.question);
      questionsService.putAllQuestions(questions);
    };

    $scope.addAnswer = function() {
      if (!QEdit.question.answers) {
        QEdit.question.answers = [];
      }
      var temp = { text: "", id: "" };
      temp.id = counter;
      counter++;
      QEdit.question.answers.push(temp);
    };

    $scope.Delete = function(index) {
      if(QEdit.question.answers && index){
        var answers = QEdit.question.answers;
        answers.splice(index,1);
      }
    };

  }
}]);


// questionsController.directive('contactType',['$compile', '$templateRequest', '$sce',function($compile, $templateRequest, $sce) {
//   return {
//     restrict: "E",
//     scope: { answer:"<" },
//     templateUrl: 'view/removeInput.htm',
//     controller: function($scope, $element) {
//       $scope.Delete = function() {
//         // answer.text = "";
//         console.log(answer);
//         $element.parent().remove();
//         $scope.$destroy();
//       }
//     }
//   }
// }]);

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

