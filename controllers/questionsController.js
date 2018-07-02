var questionsController = angular.module('questionsController', ['ngAnimate', 'ngSanitize','mgcrea.ngStrap']);


questionsController.controller('questionAdd', ['questionsService','$modal', function (questionsService, $modal) {
    var QAdd = this;
    var counter = 0;
    var counterRemove = 0;
    QAdd.modal = {
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

    QAdd.addAnswer = function (index) {
        if (!QAdd.questions[index].answers) {
            QAdd.questions[index].answers = [];
        }
        var temp = {text: "", id: ""};
        temp.id = counter;
        counter++;
        QAdd.questions[index].answers.push(temp);
    };

    QAdd.Delete = function (index) {
        if (QEdit.question.answers && index) {
            var answers = QEdit.question.answers;
            answers.splice(index, 1);
        }
    };

    // $scope.addQuestion = function(counter) {
    //   console.log(counter);
    //   counter++;
    //   var divElement = angular.element(document.querySelector('#newQuestionDiv'));
    //   var appendHtml = $compile('<new-question questionsCounter=counter></new-question>')($scope);
    //   divElement.append(appendHtml);
    // }

    QAdd.addQuestion = function () {
        var temp = {
            "id": "",
            "questionText": "",
            "questionType": "",
            "answerType": ""
        };
        temp.id = counter;
        counter++;
        QAdd.questions.push(temp);
    };

    QAdd.remove = function (index) {
        if (QAdd.questions && index) {
            if (counterRemove > 1) {
                counterRemove--;
            } else {
                QAdd.questions[index] = undefined;
            }
            var questions = QAdd.questions;
            questions.splice(index, 1);
        }
        QAdd.hide = true;
    };

    QAdd.hideButton = function () {
        QAdd.hide = true;
    };

    QAdd.showButton = function () {
        QAdd.hide = false;
    };


    QAdd.questionTypeOptions = ["Behavioral", "Opnion", "Welcome & Introduction"];
    QAdd.answerTypeOptions = ["Multiple Choice - Single Choice", "Free Text"];

    QAdd.submit = function () {
        if (QAdd.questions !== null) {
            var questions = questionsService.getAllQuestions();
            QAdd.questions.forEach(function (temp) {
                temp.id = "" + Math.floor(Math.random() * 1000);
                questions.push(temp);
            });
            questionsService.putAllQuestions(questions);
        }
    };
}]);

questionsController.controller('questionDelete', function (questionsService, $stateParams) {
    questionsService.deleteQuestion($stateParams.questionId);
});

questionsController.controller('questionEdit', ['questionsService', '$stateParams', '$element', '$compile', '$scope', function (questionsService, $stateParams, $element, $compile, $scope) {
    var QEdit = this;
    if (QEdit.question) {
        var counter = 0;

        function addID() {
            for (answer in QEdit.question.answers) {
                answer.id = counter;
                counter++;
            }
        }

        if (QEdit.question.answers) {
            addID();

            //
            function sortable() {
                $('#sortable').sortable({
                    axis: 'y',
                    tolerance: 'pointer',
                    items: '.item',
                    handle: '#handle',
                    // containment: 'parent',
                    update: function () {
                        $scope.sortedAnswers = $(this).sortable('toArray');
                        // counter = 0;
                        // $(this).find( "div.item" ).each(function() {
                        //     this.ngModel = counter;
                        //     // $(this).attr('style','position: static; top: 0px; left: 0px;');
                        //     counter++;
                        // });
                        console.log($scope.sortedAnswers);
                    },
                    create: function () {
                        $scope.sortedAnswers = $(this).sortable('toArray');
                    }
                });
            }

            sortable();
        }

        QEdit.questionTypeOptions = ["Behavioral", "Opnion", "Welcome & Introduction"];
        QEdit.answerTypeOptions = ["Multiple Choice - Single Choice", "Free Text"];

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


        QEdit.submit = function () {
            var questions = questionsService.getAllQuestions();
            var index = questions.findIndex(questionId);
            questions.splice(index, 1);
            $scope.sortedAnswers.forEach(function (value, i) {
                $scope.sortedAnswers[i] = angular.fromJson(value);
            });
            console.log($scope.sortedAnswers);
            QEdit.question.answers = $scope.sortedAnswers;
            var answers = QEdit.question.answers;
            // $scope.sortedAnswers.forEach(function (value, i) {
            //     answers.forEach(function (answer, j) {
            //         if (value == answer.id) {
            //             answer.id = i;
            //         }
            //     });
            // });
            //
            // answers.sort(function(a, b) {
            //     return a.id - b.id;
            // });
            console.log(answers);

            answers.forEach(function (answer, i) {
                if (answer.text == "") {
                    answers.splice(i, 1);
                }
            });

            questions.push(QEdit.question);
            questionsService.putAllQuestions(questions);
        };

        QEdit.addAnswer = function () {
            if (!QEdit.question.answers) {
                QEdit.question.answers = [];
            }
            var temp = {text: "", id: ""};
            temp.id = counter;
            counter++;
            QEdit.question.answers.push(temp);
        };

        QEdit.Delete = function (index) {
            if (QEdit.question.answers && index) {
                var answers = QEdit.question.answers;
                answers.splice(index, 1);
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

questionsController.directive('newQuestion', function () {
    return {
        restrict: "E",
        scope: {questionsCounter: '<'},
        bindings: {questionsCounter: '<'},
        templateUrl: 'view/newQuestion.html',
        controller: 'questionAdd',
    }
});


questionsController.controller('questionsListView', ['$scope', 'questionsService', function ($scope, questionsService) {
    var QList = this;
    QList.questions = questionsService.getAllQuestions();
    QList.filteredList = [];
    QList.currentPage = 1;
    QList.numPerPage = 2;
    QList.maxSize = 5;

    QList.numPages = function () {
        return Math.ceil(QList.questions.length / QList.numPerPage);
    };

    QList.previous = function () {
        if (QList.currentPage > 1) {
            QList.currentPage--;
        }
    };

    QList.next = function () {
        if (QList.currentPage < QList.numPages()) {
            QList.currentPage++;
        }
    };

    QList.questionTypeOptions = ['Behavioral', 'Opnion', 'Welcome & Introduction'];

    $scope.$watch('QList.currentPage + QList.numPerPage', function () {
        var begin = ((QList.currentPage - 1) * QList.numPerPage);
        var end = begin + QList.numPerPage;
        QList.filteredList = QList.questions.slice(begin, end);
    });
}]);


// questionsController.directive('nothing', function(){
//     function linkfn(scope, element, attrs){
//
//         console.log(scope.sortedAnswers);
//         // scope.$watch(
//         // function () { return $('#sortable').find( "div.item" )[0].id },
//         // function (newValue, oldValue) {
//         //     if (newValue !== oldValue) {
//         //         console.log('nothing');
//         //     }
//         // });
//     }
//   return {
//     restrict: 'EA',
//     link: linkfn
//   };
// });